import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/SiteHeader";
import { Sparkles, Check } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "sonner";

export const Route = createFileRoute("/premium")({
  head: () => ({ meta: [{ title: "Premium — StanChat" }] }),
  component: PremiumPage,
});

const PERKS = [
  "Ad-free feed",
  "Custom flair & avatar frames",
  "Early access to new features",
  "Bigger draft library (50 drafts)",
  "Exclusive Premium lounge",
  "Priority mod support",
];

function PremiumPage() {
  return (
    <PageShell>
      <Toaster position="top-center" richColors />
      <div className="rounded-3xl border-2 border-ink bg-gradient-to-br from-[color:var(--accent)] to-primary p-8 text-ink shadow-brutal">
        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-paper px-3 py-1 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="h-3 w-3" /> Premium
        </span>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight">
          Support StanChat.<br />Get the good stuff.
        </h1>
        <p className="mt-2 max-w-md text-sm">
          $4.99/mo · Cancel anytime · Student pricing.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-ink bg-card p-6">
          <p className="font-display text-sm uppercase tracking-widest text-muted-foreground">
            Monthly
          </p>
          <p className="mt-2 font-display text-4xl font-bold">
            $4.99<span className="text-base text-muted-foreground">/mo</span>
          </p>
          <button
            onClick={() => toast.success("Premium coming soon — thanks for supporting!")}
            className="mt-4 w-full rounded-full border-2 border-ink bg-background py-3 font-display text-xs font-bold uppercase tracking-widest hover:-translate-y-0.5 hover:shadow-brutal-sm"
          >
            Start monthly
          </button>
        </div>
        <div className="rounded-2xl border-2 border-ink bg-ink p-6 text-paper shadow-brutal">
          <p className="font-display text-sm uppercase tracking-widest opacity-70">
            Yearly · save 30%
          </p>
          <p className="mt-2 font-display text-4xl font-bold">
            $41.88<span className="text-base opacity-70">/yr</span>
          </p>
          <button
            onClick={() => toast.success("Premium coming soon — thanks for supporting!")}
            className="mt-4 w-full rounded-full border-2 border-paper bg-primary py-3 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground hover:-translate-y-0.5"
          >
            Start yearly
          </button>
        </div>
      </div>

      <h2 className="mt-8 font-display text-xl font-bold">What's included</h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {PERKS.map((p) => (
          <li
            key={p}
            className="flex items-center gap-2 rounded-xl border-2 border-ink bg-card px-4 py-3 text-sm"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-3 w-3" />
            </span>
            {p}
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
