import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/SiteHeader";
import { DollarSign, Users, MessageSquare, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/earn")({
  head: () => ({ meta: [{ title: "Earn — StanChat" }] }),
  component: EarnPage,
});

const WAYS = [
  { icon: MessageSquare, title: "Quality posts", desc: "Earn $2 per post that hits the top 10 of your campus." },
  { icon: TrendingUp, title: "Weekly bonuses", desc: "Top contributors split a $500 pool every Friday." },
  { icon: Users, title: "Referrals", desc: "Get $5 for every friend who verifies with a .edu email." },
];

function EarnPage() {
  return (
    <PageShell>
      <div className="rounded-3xl border-2 border-ink bg-card p-8 shadow-brutal">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-[color:var(--accent)]">
            <DollarSign className="h-6 w-6" />
          </span>
          <div>
            <h1 className="font-display text-3xl font-bold">Earn on StanChat</h1>
            <p className="text-sm text-muted-foreground">
              Get paid for making campus discussion better.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat label="Balance" value="$24.00" />
          <Stat label="Pending" value="$8.50" />
          <Stat label="Lifetime" value="$142.75" />
        </div>
      </div>

      <h2 className="mt-8 font-display text-xl font-bold">How to earn</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {WAYS.map((w) => (
          <div key={w.title} className="rounded-2xl border-2 border-ink bg-card p-5">
            <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-background">
              <w.icon className="h-4 w-4" />
            </span>
            <p className="mt-3 font-display font-bold">{w.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{w.desc}</p>
          </div>
        ))}
      </div>

      <button className="mt-6 rounded-full border-2 border-ink bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg">
        Cash out →
      </button>
    </PageShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border-2 border-ink bg-background p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-bold">{value}</p>
    </div>
  );
}
