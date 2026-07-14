import { useState } from "react";
import { Bell, Check, MessageSquare, Sparkles, TrendingUp, AtSign } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import { Dropdown } from "./Dropdown";
import {
  markAllRead,
  markRead,
  useNotifications,
  type Notification,
} from "@/lib/notifications";

const iconFor = (t: Notification["type"]) => {
  switch (t) {
    case "reply":
      return MessageSquare;
    case "upvote":
      return TrendingUp;
    case "mention":
      return AtSign;
    default:
      return Sparkles;
  }
};

function timeAgo(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return `${formatDistanceToNowStrict(d)} ago`;
}

export function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const notifs = useNotifications();
  const unread = notifs.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-card hover:-translate-y-0.5 hover:shadow-brutal-sm"
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full border-2 border-ink bg-primary px-1 font-display text-[10px] font-bold text-primary-foreground">
            {unread}
          </span>
        )}
      </button>

      <Dropdown open={open} onClose={() => setOpen(false)} className="w-[340px]">
        <div className="flex items-center justify-between border-b-2 border-ink px-4 py-3">
          <span className="font-display text-sm font-bold uppercase tracking-wider">
            Notifications
          </span>
          {unread > 0 && (
            <button
              onClick={markAllRead}
              className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-ink"
            >
              <Check className="h-3 w-3" /> Mark all read
            </button>
          )}
        </div>
        <ul className="max-h-[380px] overflow-y-auto">
          {notifs.length === 0 && (
            <li className="p-6 text-center text-xs text-muted-foreground">
              You're all caught up.
            </li>
          )}
          {notifs.map((n) => {
            const Icon = iconFor(n.type);
            return (
              <li key={n.id}>
                <button
                  onClick={() => markRead(n.id)}
                  className="flex w-full items-start gap-3 border-b border-ink/10 px-4 py-3 text-left hover:bg-muted"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-background">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-ink">
                      {n.title}
                    </p>
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                      {n.body}
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                      {timeAgo(n.createdAt)}
                    </p>
                  </div>
                  {!n.read && (
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </Dropdown>
    </div>
  );
}
