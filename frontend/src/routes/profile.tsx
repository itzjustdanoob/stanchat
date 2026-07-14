import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { PageShell } from "@/components/SiteHeader";
import { avatarUrl, updateUser, useUser } from "@/lib/auth-store";
import { getUserPosts } from "@/lib/api";
import { FlairChip } from "@/components/FlairChip";
import { Shuffle, Trophy, Flame } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [{ title: "Your profile — StanChat" }],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const user = useUser();
  if (user === null) {
    // wait for hydration; if truly signed out, redirect
    if (typeof window !== "undefined" && !window.localStorage.getItem("stanchat.user")) {
      return <Navigate to="/" />;
    }
    return null;
  }
  const seed = user.avatarSeed ?? user.username;
  const posts = getUserPosts(user.username);

  return (
    <PageShell>
      <Toaster position="top-center" richColors />
      <div className="rounded-3xl border-2 border-ink bg-card p-6 shadow-brutal sm:p-8">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <img
            src={avatarUrl(seed)}
            alt=""
            className="h-24 w-24 rounded-full border-2 border-ink"
          />
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-3xl font-bold">u/{user.username}</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border-2 border-ink bg-background px-3 py-1 font-bold">
                <Flame className="mr-1 inline h-3 w-3 text-primary" /> 1,240 karma
              </span>
              <span className="rounded-full border-2 border-ink bg-background px-3 py-1 font-bold">
                <Trophy className="mr-1 inline h-3 w-3 text-primary" /> 13 achievements
              </span>
            </div>
          </div>
          <button
            onClick={() =>
              updateUser({ avatarSeed: `${user.username}-${Date.now()}` })
            }
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-brutal-sm hover:-translate-y-0.5"
          >
            <Shuffle className="h-3.5 w-3.5" /> Shuffle avatar
          </button>
        </div>
      </div>

      <h2 className="mt-8 font-display text-xl font-bold">Your posts</h2>
      <div className="mt-3 space-y-3">
        {posts.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-ink/30 p-8 text-center text-sm text-muted-foreground">
            You haven't posted yet.{" "}
            <Link to="/" className="font-bold text-ink underline">
              Go to feed
            </Link>
          </div>
        )}
        {posts.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border-2 border-ink bg-card p-4"
          >
            <div className="mb-2 flex items-center gap-2 text-xs">
              <FlairChip id={p.flair} />
              <span className="text-muted-foreground">
                {p.score} pts · {p.commentCount} comments
              </span>
            </div>
            <p className="font-display font-bold">{p.title}</p>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
