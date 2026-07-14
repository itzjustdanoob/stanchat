import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/SiteHeader";
import { Trophy, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/achievements")({
  head: () => ({ meta: [{ title: "Achievements — StanChat" }] }),
  component: AchievementsPage,
});

const ACHIEVEMENTS = [
  { id: 1, name: "First Post", desc: "Publish your first post", unlocked: true },
  { id: 2, name: "Upvoter", desc: "Give 10 upvotes", unlocked: true },
  { id: 3, name: "Commentator", desc: "Leave 25 comments", unlocked: true },
  { id: 4, name: "Trendsetter", desc: "A post reaches 100 upvotes", unlocked: true },
  { id: 5, name: "Freshman", desc: "Join StanChat", unlocked: true },
  { id: 6, name: "Sophomore", desc: "Stick around for 6 months", unlocked: true },
  { id: 7, name: "Night Owl", desc: "Post after midnight", unlocked: true },
  { id: 8, name: "Bookworm", desc: "50 posts in Admissions", unlocked: true },
  { id: 9, name: "Dorm Room DJ", desc: "5 posts in Events", unlocked: true },
  { id: 10, name: "Career Coach", desc: "Comment on 20 Career posts", unlocked: true },
  { id: 11, name: "Roommate", desc: "Post in Housing", unlocked: true },
  { id: 12, name: "Class President", desc: "Reach 1000 karma", unlocked: true },
  { id: 13, name: "Prof's Pet", desc: "Post pinned by mod", unlocked: true },
  { id: 14, name: "Viral", desc: "Post reaches 1000 upvotes", unlocked: false },
  { id: 15, name: "Legendary", desc: "10,000 karma", unlocked: false },
  { id: 16, name: "Alumni", desc: "Active for 4 years", unlocked: false },
];

function AchievementsPage() {
  const unlocked = ACHIEVEMENTS.filter((a) => a.unlocked).length;
  return (
    <PageShell>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Achievements</h1>
          <p className="text-sm text-muted-foreground">
            {unlocked} of {ACHIEVEMENTS.length} unlocked
          </p>
        </div>
        <div className="rounded-full border-2 border-ink bg-primary px-4 py-2 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-brutal-sm">
          Level {Math.floor(unlocked / 3)}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {ACHIEVEMENTS.map((a) => (
          <div
            key={a.id}
            className={cn(
              "flex flex-col items-center rounded-2xl border-2 border-ink p-4 text-center",
              a.unlocked ? "bg-card shadow-brutal-sm" : "bg-muted opacity-60",
            )}
          >
            <div
              className={cn(
                "mb-2 grid h-12 w-12 place-items-center rounded-full border-2 border-ink",
                a.unlocked ? "bg-[color:var(--accent)]" : "bg-background",
              )}
            >
              {a.unlocked ? (
                <Trophy className="h-5 w-5" />
              ) : (
                <Lock className="h-5 w-5" />
              )}
            </div>
            <p className="font-display text-sm font-bold">{a.name}</p>
            <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
              {a.desc}
            </p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
