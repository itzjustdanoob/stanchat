import { useState } from "react";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/lib/api";
import { saveDraft, deleteDraft, type Draft } from "@/lib/drafts";
import { pushNotification } from "@/lib/notifications";
import { useUser } from "@/lib/auth-store";
import { FLAIRS, type FlairId } from "@/lib/flairs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function CreatePostModal({
  open,
  onClose,
  initial,
}: {
  open: boolean;
  onClose: () => void;
  initial?: Draft | null;
}) {
  const user = useUser();
  const qc = useQueryClient();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [flair, setFlair] = useState<FlairId>(initial?.flair ?? "general");

  const mut = useMutation({
    mutationFn: () =>
      createPost({
        title: title.trim(),
        body: body.trim(),
        flair,
        author: user?.username ?? "you",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
      pushNotification({
        type: "system",
        title: "Post published",
        body: `Your post “${title.trim().slice(0, 40)}” is live.`,
      });
      if (initial) deleteDraft(initial.id);
      toast.success("Posted");
      reset();
      onClose();
    },
  });

  const reset = () => {
    setTitle("");
    setBody("");
    setFlair("general");
  };

  if (!open) return null;

  const canPost = title.trim().length >= 4 && body.trim().length >= 4;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl border-2 border-ink bg-card p-6 shadow-brutal-lg sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border-2 border-ink p-1.5 hover:bg-ink hover:text-paper"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="font-display text-2xl font-bold tracking-tight">
          {initial ? "Continue draft" : "New post"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Posting as <span className="font-bold text-ink">@{user?.username ?? "you"}</span>
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Flair
            </label>
            <div className="flex flex-wrap gap-2">
              {FLAIRS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFlair(f.id)}
                  className={cn(
                    "rounded-full border-2 border-ink px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition",
                    flair === f.id
                      ? "text-white shadow-brutal-sm"
                      : "bg-background hover:-translate-y-0.5",
                  )}
                  style={flair === f.id ? { backgroundColor: f.color } : undefined}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="An interesting title"
            maxLength={140}
            className="w-full rounded-xl border-2 border-ink bg-background px-4 py-3 font-display text-lg font-bold outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What's happening on campus?"
            rows={6}
            className="w-full resize-none rounded-xl border-2 border-ink bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              if (!title.trim() && !body.trim()) return onClose();
              saveDraft({ id: initial?.id, title, body, flair });
              toast.success("Saved to drafts");
              onClose();
            }}
            className="rounded-full border-2 border-ink bg-background px-4 py-2 text-xs font-bold uppercase tracking-widest hover:-translate-y-0.5 hover:shadow-brutal-sm"
          >
            Save draft
          </button>
          <button
            disabled={!canPost || mut.isPending}
            onClick={() => mut.mutate()}
            className="rounded-full border-2 border-ink bg-primary px-6 py-2.5 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg disabled:opacity-50"
          >
            {mut.isPending ? "Posting…" : "Post →"}
          </button>
        </div>
      </div>
    </div>
  );
}
