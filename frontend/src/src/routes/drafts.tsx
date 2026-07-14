import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Toaster } from "sonner";
import { PageShell } from "@/components/SiteHeader";
import { CreatePostModal } from "@/components/CreatePostModal";
import { FlairChip } from "@/components/FlairChip";
import { deleteDraft, useDrafts, type Draft } from "@/lib/drafts";
import { Trash2, PenSquare } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import { toast } from "sonner";

export const Route = createFileRoute("/drafts")({
  head: () => ({ meta: [{ title: "Drafts — StanChat" }] }),
  component: DraftsPage,
});

function DraftsPage() {
  const drafts = useDrafts();
  const [editing, setEditing] = useState<Draft | null>(null);

  return (
    <PageShell>
      <Toaster position="top-center" richColors />
      <CreatePostModal
        open={!!editing}
        onClose={() => setEditing(null)}
        initial={editing}
      />
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Drafts</h1>
          <p className="text-sm text-muted-foreground">
            Half-baked thoughts, saved for later.
          </p>
        </div>
        <span className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {drafts.length} saved
        </span>
      </div>

      {drafts.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-ink/30 p-12 text-center text-sm text-muted-foreground">
          No drafts yet. Start writing and hit "Save draft".
        </div>
      ) : (
        <ul className="space-y-3">
          {drafts.map((d) => (
            <li
              key={d.id}
              className="rounded-2xl border-2 border-ink bg-card p-5"
            >
              <div className="mb-2 flex items-center gap-2 text-xs">
                <FlairChip id={d.flair} />
                <span className="text-muted-foreground">
                  updated {formatDistanceToNowStrict(new Date(d.updatedAt))} ago
                </span>
              </div>
              <p className="font-display text-lg font-bold">
                {d.title || <span className="italic text-muted-foreground">Untitled</span>}
              </p>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {d.body || "…"}
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setEditing(d)}
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-brutal-sm hover:-translate-y-0.5"
                >
                  <PenSquare className="h-3 w-3" /> Continue
                </button>
                <button
                  onClick={() => {
                    deleteDraft(d.id);
                    toast.success("Draft deleted");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-background px-3 py-1.5 text-xs font-bold uppercase tracking-wider hover:-translate-y-0.5 hover:shadow-brutal-sm"
                >
                  <Trash2 className="h-3 w-3" /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
