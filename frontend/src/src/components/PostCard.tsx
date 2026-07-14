import { useState } from "react";
import { MessageSquare, Share2, ChevronDown, ChevronUp, Send } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FlairChip } from "./FlairChip";
import { VoteButtons } from "./VoteButtons";
import {
  addComment,
  fetchComments,
  votePost,
  type Post,
} from "@/lib/api";
import { useUser } from "@/lib/auth-store";
import { toast } from "sonner";

function timeAgo(iso: string | null | undefined): string {
  if (!iso) return "just now";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "just now";
  return `${formatDistanceToNowStrict(d)} ago`;
}

export function PostCard({
  post,
  index,
  onRequireAuth,
}: {
  post: Post;
  index: number;
  onRequireAuth: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const user = useUser();
  const qc = useQueryClient();

  const voteMut = useMutation({
    mutationFn: (dir: 1 | -1 | 0) => votePost(post.id, dir),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });

  const commentsQ = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
    enabled: open,
  });

  const commentMut = useMutation({
    mutationFn: (body: string) => addComment(post.id, body, user?.username ?? "you"),
    onSuccess: () => {
      setDraft("");
      qc.invalidateQueries({ queryKey: ["comments", post.id] });
      qc.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleVote = (dir: 1 | -1) => {
    if (!user) return onRequireAuth();
    voteMut.mutate(dir === post.userVote ? 0 : dir);
  };

  const handleComment = () => {
    if (!user) return onRequireAuth();
    if (!draft.trim()) return;
    commentMut.mutate(draft.trim());
  };

  return (
    <article className="group relative rounded-2xl border-2 border-ink bg-card p-5 transition-transform hover:-translate-y-0.5 hover:shadow-brutal sm:p-6">
      <span className="absolute -left-3 -top-3 grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-[color:var(--accent)] font-display text-sm font-bold shadow-brutal-sm">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex gap-4">
        <div className="hidden sm:block">
          <VoteButtons
            score={post.score}
            userVote={post.userVote}
            onVote={handleVote}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
            <FlairChip id={post.flair} />
            <span className="font-semibold">@{post.author}</span>
            <span className="text-muted-foreground">·</span>
            <time className="text-muted-foreground">{timeAgo(post.createdAt)}</time>
          </div>
          <h2 className="font-display text-xl font-bold leading-tight tracking-tight text-ink sm:text-2xl">
            {post.title}
          </h2>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {post.body}
          </p>

          <div className="mt-4 flex items-center gap-2">
            <div className="sm:hidden">
              <VoteButtons
                score={post.score}
                userVote={post.userVote}
                onVote={handleVote}
                orientation="horizontal"
              />
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-3 py-1.5 text-xs font-bold hover:bg-ink hover:text-paper"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              {post.commentCount}
              {open ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(
                  `${window.location.origin}/#${post.id}`,
                );
                toast.success("Link copied");
              }}
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-3 py-1.5 text-xs font-bold hover:bg-ink hover:text-paper"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>
          </div>

          {open && (
            <div className="mt-4 space-y-3 border-t-2 border-dashed border-ink/20 pt-4">
              <div className="flex gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleComment()}
                  placeholder={user ? "Add a comment…" : "Sign in to comment"}
                  onFocus={() => !user && onRequireAuth()}
                  className="min-w-0 flex-1 rounded-full border-2 border-ink bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleComment}
                  className="inline-flex items-center gap-1 rounded-full border-2 border-ink bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-brutal-sm hover:-translate-y-0.5"
                >
                  <Send className="h-3.5 w-3.5" /> Post
                </button>
              </div>
              {commentsQ.isLoading && (
                <p className="text-xs text-muted-foreground">Loading comments…</p>
              )}
              {commentsQ.data?.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  Be the first to comment.
                </p>
              )}
              <ul className="space-y-2">
                {commentsQ.data?.map((c) => (
                  <li
                    key={c.id}
                    className="rounded-xl border-2 border-ink/10 bg-background px-4 py-3 text-sm"
                  >
                    <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-bold text-ink">@{c.author}</span>
                      <span>·</span>
                      <time>{timeAgo(c.createdAt)}</time>
                    </div>
                    <p className="text-foreground/90">{c.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
