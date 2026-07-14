import { useEffect, useState } from "react";

export type Notification = {
  id: string;
  type: "reply" | "upvote" | "mention" | "system";
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
};

const KEY = "stanchat.notifications";
const listeners = new Set<() => void>();

const seed: Notification[] = [
  {
    id: "n1",
    type: "reply",
    title: "@senior_ta replied to your post",
    body: "It's demanding but doable. Sleep is negotiable…",
    createdAt: new Date(Date.now() - 15 * 60_000).toISOString(),
    read: false,
  },
  {
    id: "n2",
    type: "upvote",
    title: "Your post is trending",
    body: "‘Best late-night food spots’ just passed 200 upvotes.",
    createdAt: new Date(Date.now() - 3 * 3600_000).toISOString(),
    read: false,
  },
  {
    id: "n3",
    type: "mention",
    title: "@library_stan mentioned you",
    body: "…and shoutout to you for the study group tip.",
    createdAt: new Date(Date.now() - 26 * 3600_000).toISOString(),
    read: true,
  },
];

function read(): Notification[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) {
      window.localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as Notification[];
  } catch {
    return seed;
  }
}

function write(list: Notification[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(list));
  listeners.forEach((l) => l());
}

export function pushNotification(n: Omit<Notification, "id" | "createdAt" | "read">) {
  const item: Notification = {
    ...n,
    id: `n_${Date.now()}`,
    createdAt: new Date().toISOString(),
    read: false,
  };
  write([item, ...read()]);
}

export function markAllRead() {
  write(read().map((n) => ({ ...n, read: true })));
}

export function markRead(id: string) {
  write(read().map((n) => (n.id === id ? { ...n, read: true } : n)));
}

export function useNotifications() {
  const [list, setList] = useState<Notification[]>([]);
  useEffect(() => {
    setList(read());
    const l = () => setList(read());
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return list;
}
