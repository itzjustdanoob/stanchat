import { useEffect, useState } from "react";
import type { FlairId } from "./flairs";

export type Draft = {
  id: string;
  title: string;
  body: string;
  flair: FlairId;
  updatedAt: string;
};

const KEY = "stanchat.drafts";
const listeners = new Set<() => void>();

function read(): Draft[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function write(list: Draft[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(list));
  listeners.forEach((l) => l());
}

export function saveDraft(d: Omit<Draft, "id" | "updatedAt"> & { id?: string }) {
  const list = read();
  const id = d.id ?? `d_${Date.now()}`;
  const item: Draft = {
    id,
    title: d.title,
    body: d.body,
    flair: d.flair,
    updatedAt: new Date().toISOString(),
  };
  const next = list.some((x) => x.id === id)
    ? list.map((x) => (x.id === id ? item : x))
    : [item, ...list];
  write(next);
  return item;
}

export function deleteDraft(id: string) {
  write(read().filter((d) => d.id !== id));
}

export function useDrafts() {
  const [list, setList] = useState<Draft[]>([]);
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
