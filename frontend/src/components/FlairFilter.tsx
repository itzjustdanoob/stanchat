import { FLAIRS } from "@/lib/flairs";
import { cn } from "@/lib/utils";

export function FlairFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const options = [{ id: "all", label: "All", color: "#0e0e10" }, ...FLAIRS];
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((f) => {
        const active = value === f.id;
        return (
          <button
            key={f.id}
            onClick={() => onChange(f.id)}
            className={cn(
              "rounded-full border-2 border-ink px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-transform",
              active
                ? "text-white shadow-brutal-sm -translate-y-0.5"
                : "bg-card text-ink hover:-translate-y-0.5 hover:shadow-brutal-sm",
            )}
            style={active ? { backgroundColor: f.color } : undefined}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
