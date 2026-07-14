import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function VoteButtons({
  score,
  userVote,
  onVote,
  orientation = "vertical",
}: {
  score: number;
  userVote: 0 | 1 | -1;
  onVote: (dir: 1 | -1) => void;
  orientation?: "vertical" | "horizontal";
}) {
  const toggle = (dir: 1 | -1) => onVote(userVote === dir ? (0 as 1) : dir);
  return (
    <div
      className={cn(
        "flex items-center gap-0.5 rounded-full border-2 border-ink bg-card p-1",
        orientation === "vertical" && "flex-col",
      )}
    >
      <button
        aria-label="Upvote"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle(1);
        }}
        className={cn(
          "rounded-full p-1 transition-colors",
          userVote === 1
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted",
        )}
      >
        <ArrowBigUp
          className="h-5 w-5"
          fill={userVote === 1 ? "currentColor" : "none"}
        />
      </button>
      <span
        className={cn(
          "min-w-6 text-center font-display text-sm font-bold tabular-nums",
          userVote === 1 && "text-[color:var(--upvote)]",
          userVote === -1 && "text-[color:var(--downvote)]",
        )}
      >
        {score}
      </span>
      <button
        aria-label="Downvote"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle(-1);
        }}
        className={cn(
          "rounded-full p-1 transition-colors",
          userVote === -1
            ? "bg-[color:var(--downvote)] text-white"
            : "hover:bg-muted",
        )}
      >
        <ArrowBigDown
          className="h-5 w-5"
          fill={userVote === -1 ? "currentColor" : "none"}
        />
      </button>
    </div>
  );
}
