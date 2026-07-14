export const FLAIRS = [
  { id: "admissions", label: "Admissions", color: "var(--flair-admissions)" },
  { id: "campus", label: "Campus Life", color: "var(--flair-campus)" },
  { id: "career", label: "Career", color: "var(--flair-career)" },
  { id: "housing", label: "Housing", color: "var(--flair-housing)" },
  { id: "events", label: "Events", color: "var(--flair-events)" },
  { id: "general", label: "General", color: "var(--flair-general)" },
] as const;

export type FlairId = (typeof FLAIRS)[number]["id"];

export const flairById = (id: string) =>
  FLAIRS.find((f) => f.id === id) ?? FLAIRS[5];
