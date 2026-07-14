import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, Clock, Flame, Zap, PenSquare } from "lucide-react";
import { fetchPosts } from "@/lib/api";
import { FlairFilter } from "@/components/FlairFilter";
import { PostCard } from "@/components/PostCard";
import { AuthModal } from "@/components/AuthModal";
import { CreatePostModal } from "@/components/CreatePostModal";
import { SiteHeader } from "@/components/SiteHeader";
import { Logo } from "@/components/Logo";
import { useUser } from "@/lib/auth-store";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StanChat — the college forum" },
      {
        name: "description",
        content:
          "The unfiltered college forum. Vote, comment, and share what's really happening on your campus.",
      },
    ],
  }),
  component: Feed,
});

type Sort = "hot" | "new" | "top";

function Feed() {
  const [flair, setFlair] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("hot");
  const [authOpen, setAuthOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const user = useUser();

  const q = useQuery({
    queryKey: ["posts", flair],
    queryFn: () => fetchPosts(flair as never),
  });

  const posts = useMemo(() => {
    const list = [...(q.data ?? [])];
    if (sort === "new")
      list.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    else if (sort === "top") list.sort((a, b) => b.score - a.score);
    else
      list.sort(
        (a, b) =>
          b.score / Math.max(1, hoursOld(b.createdAt)) -
          a.score / Math.max(1, hoursOld(a.createdAt)),
      );
    return list;
  }, [q.data, sort]);

  const openCreate = () => {
    if (!user) return setAuthOpen(true);
    setCreateOpen(true);
  };

  return (
    <div className="min-h-screen text-ink">
      <Toaster position="top-center" richColors />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <CreatePostModal open={createOpen} onClose={() => setCreateOpen(false)} />

      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Hero */}
        <section className="relative mb-10 rounded-3xl border border-ink/10 bg-card px-6 py-10 sm:px-10 sm:py-14">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-background px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <Zap className="h-3 w-3 text-primary" /> Est. Class of 2026
          </span>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1] tracking-tighter sm:text-6xl">
            Campus,{" "}
            <span className="italic font-serif font-normal text-primary">
              unfiltered.
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Real students. Real takes. Where the group chat spills.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-sm font-bold text-paper transition hover:opacity-90"
            >
              <PenSquare className="h-4 w-4" />
              {user ? "Start a post" : "Join with .edu →"}
            </button>
            <a
              href="#feed"
              className="rounded-full border border-ink/20 bg-background px-6 py-3 font-display text-sm font-bold hover:border-ink"
            >
              Browse the feed
            </a>
          </div>
        </section>

        <div id="feed" className="mb-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Filter
            </span>
            <div className="h-px flex-1 bg-ink/20" />
          </div>
          <FlairFilter value={flair} onChange={setFlair} />
          <div className="flex items-center justify-between">
            <div className="inline-flex rounded-full border-2 border-ink bg-card p-1 text-xs shadow-brutal-sm">
              {(
                [
                  { id: "hot", label: "Hot", icon: Flame },
                  { id: "new", label: "New", icon: Clock },
                  { id: "top", label: "Top", icon: TrendingUp },
                ] as const
              ).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSort(id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display font-bold uppercase tracking-wider transition-colors",
                    sort === id
                      ? "bg-ink text-paper"
                      : "text-muted-foreground hover:text-ink",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              ))}
            </div>
            <span className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          </div>
        </div>

        <div className="space-y-5">
          {q.isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-36 animate-pulse rounded-2xl border-2 border-ink/20 bg-card"
              />
            ))}
          {posts.map((p, i) => (
            <PostCard
              key={p.id}
              post={p}
              index={i}
              onRequireAuth={() => setAuthOpen(true)}
            />
          ))}
          {!q.isLoading && posts.length === 0 && (
            <div className="rounded-2xl border-2 border-dashed border-ink/30 p-12 text-center text-sm text-muted-foreground">
              No posts in this flair yet.
            </div>
          )}
        </div>
      </main>

      <footer className="mt-16 border-t border-ink/10 bg-secondary text-ink">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
          <Logo variant="script" className="h-10 w-auto" />
          <span className="font-display text-xs uppercase tracking-widest text-muted-foreground">
            Made for college · Est. 2026
          </span>
          <span className="font-serif text-sm italic text-muted-foreground">
            "the group chat, but public"
          </span>
        </div>
      </footer>
    </div>
  );
}

function hoursOld(iso: string) {
  return (Date.now() - new Date(iso).getTime()) / 3_600_000;
}
