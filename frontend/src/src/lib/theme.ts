import { useEffect, useState } from "react";

const KEY = "stanchat.theme";
type Theme = "light" | "dark";
const listeners = new Set<() => void>();

function read(): Theme {
  if (typeof window === "undefined") return "light";
  const raw = window.localStorage.getItem(KEY);
  if (raw === "dark" || raw === "light") return raw;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function apply(t: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", t === "dark");
}

export function setTheme(t: Theme) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, t);
  apply(t);
  listeners.forEach((l) => l());
}

export function toggleTheme() {
  setTheme(read() === "dark" ? "light" : "dark");
}

export function useTheme(): Theme {
  const [t, setLocal] = useState<Theme>("light");
  useEffect(() => {
    const initial = read();
    apply(initial);
    setLocal(initial);
    const l = () => setLocal(read());
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return t;
}
