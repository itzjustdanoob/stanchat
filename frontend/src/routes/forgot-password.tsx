import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, MailCheck } from "lucide-react";
import { requestPasswordReset } from "@/lib/api";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — StanChat" },
      {
        name: "description",
        content: "Request a password reset link for your StanChat account.",
      },
    ],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await requestPasswordReset(email);
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-ink">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to StanChat
        </Link>

        <div className="rounded-3xl border-2 border-ink bg-card p-6 shadow-brutal-lg sm:p-8">
          <Logo className="h-8 w-auto" />
          <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">
            Reset your password
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            We'll email you a reset link.
          </p>

          {sent ? (
            <div className="mt-6 space-y-3 rounded-2xl border-2 border-dashed border-ink/30 p-6 text-center">
              <MailCheck className="mx-auto h-8 w-8 text-primary" />
              <p className="font-display font-bold">Check your inbox</p>
              <p className="text-xs text-muted-foreground">
                If an account exists for <strong>{email}</strong>, a reset link
                is on its way.
              </p>
              <Link
                to="/"
                className="inline-block rounded-full border-2 border-ink bg-primary px-5 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-brutal-sm hover:-translate-y-0.5"
              >
                Back home
              </Link>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-3">
              <input
                type="email"
                placeholder="you@school.edu"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border-2 border-ink bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl border-2 border-ink bg-ink py-3 font-display text-sm font-bold uppercase tracking-widest text-paper shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send reset link →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
