import { useEffect, useState } from "react";

export type User = {
  email: string;
  username: string;
  avatarSeed?: string;
  modMode?: boolean;
} | null;

const KEY = "stanchat.user";
const listeners = new Set<() => void>();

function read(): User {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function setUser(user: User) {
  if (typeof window === "undefined") return;
  if (user) window.localStorage.setItem(KEY, JSON.stringify(user));
  else window.localStorage.removeItem(KEY);
  listeners.forEach((l) => l());
}

export function updateUser(patch: Partial<NonNullable<User>>) {
  const current = read();
  if (!current) return;
  setUser({ ...current, ...patch });
}

export function useUser(): User {
  const [user, setLocal] = useState<User>(null);
  useEffect(() => {
    setLocal(read());
    const l = () => setLocal(read());
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return user;
}

export function avatarUrl(seed: string) {
  const s = encodeURIComponent(seed || "stan");
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${s}&backgroundType=gradientLinear&backgroundColor=ffd166,ff4d1f,4b6cf7`;
}
