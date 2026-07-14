import { flairById } from "@/lib/flairs";

export function FlairChip({ id }: { id: string }) {
  const f = flairById(id);
  return (
    <span
      className="flair-chip text-white"
      style={{ backgroundColor: f.color }}
    >
      {f.label}
    </span>
  );
}
