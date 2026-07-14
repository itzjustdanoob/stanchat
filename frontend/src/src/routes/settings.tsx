import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/SiteHeader";
import { useUser, updateUser, setUser } from "@/lib/auth-store";
import { useTheme, setTheme } from "@/lib/theme";
import { Toaster, toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — StanChat" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const user = useUser();
  const theme = useTheme();

  return (
    <PageShell>
      <Toaster position="top-center" richColors />
      <h1 className="font-display text-3xl font-bold">Settings</h1>
      <p className="text-sm text-muted-foreground">
        Manage your account and preferences.
      </p>

      <Section title="Account">
        {user ? (
          <>
            <Row label="Username" value={`@${user.username}`} />
            <Row label="Email" value={user.email} />
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setUser(null);
                  toast.success("Signed out");
                }}
                className="rounded-full border-2 border-ink bg-background px-4 py-2 text-xs font-bold uppercase tracking-widest hover:-translate-y-0.5 hover:shadow-brutal-sm"
              >
                Sign out
              </button>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Not signed in.
          </p>
        )}
      </Section>

      <Section title="Display">
        <div className="flex items-center justify-between">
          <span className="text-sm">Theme</span>
          <div className="inline-flex rounded-full border-2 border-ink bg-background p-1 text-xs">
            {(["light", "dark"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={cn(
                  "rounded-full px-3 py-1 font-bold uppercase tracking-wider",
                  theme === t ? "bg-ink text-paper" : "text-muted-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {user && (
        <Section title="Moderation">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold">Mod Mode</p>
              <p className="text-xs text-muted-foreground">
                Show mod tools on posts and comments.
              </p>
            </div>
            <button
              onClick={() => updateUser({ modMode: !user.modMode })}
              className={cn(
                "relative h-6 w-11 rounded-full border-2 border-ink transition-colors",
                user.modMode ? "bg-primary" : "bg-muted",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-4 w-4 rounded-full bg-paper transition-transform",
                  user.modMode ? "translate-x-5" : "translate-x-0.5",
                )}
              />
            </button>
          </div>
        </Section>
      )}

      <Section title="Notifications">
        <Row label="Replies to your posts" value="On" />
        <Row label="Mentions" value="On" />
        <Row label="Weekly digest" value="Off" />
      </Section>
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-2xl border-2 border-ink bg-card p-6">
      <h2 className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-ink/10 pb-2 last:border-0 last:pb-0">
      <span className="text-sm">{label}</span>
      <span className="text-sm font-bold">{value}</span>
    </div>
  );
}
