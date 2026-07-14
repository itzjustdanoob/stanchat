import type { FlairId } from "./flairs";

const API_BASE = "https://stanchat.me/api";

export interface Post {
  id: string;
  title: string;
  body: string;
  author: string;
  flair: FlairId;
  score: number;
  userVote: 0 | 1 | -1;
  commentCount: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  body: string;
  score: number;
  createdAt: string;
}

// ---- Mock data (used as fallback when API is unreachable) ----
const now = Date.now();
const ago = (h: number) => new Date(now - h * 3600_000).toISOString();

const mockPosts: Post[] = [
  {
    id: "1",
    title: "Just got my acceptance letter — is the CS program really that intense?",
    body: "Committed yesterday and I'm hearing wild things about the first-year workload. What should I be prepping over the summer?",
    author: "future_frosh",
    flair: "admissions",
    score: 342,
    userVote: 0,
    commentCount: 87,
    createdAt: ago(2),
  },
  {
    id: "2",
    title: "Best late-night food spots within walking distance of North Campus?",
    body: "The dining hall closes at 9 and I am dying. Please share your go-to spots that won't destroy my meal plan.",
    author: "hungry_at_midnight",
    flair: "campus",
    score: 218,
    userVote: 1,
    commentCount: 64,
    createdAt: ago(5),
  },
  {
    id: "3",
    title: "How do I answer 'Why this company?' when I honestly just need any offer",
    body: "Final round on Thursday. Every prep guide says be specific but I applied to like 200 places. Help.",
    author: "job_hunt_ghost",
    flair: "career",
    score: 512,
    userVote: 0,
    commentCount: 143,
    createdAt: ago(9),
  },
  {
    id: "4",
    title: "PSA: The off-campus houses on Elm are being flipped — lease early",
    body: "Landlord confirmed rents are jumping ~18% next year. If you were planning to move off campus, get ahead of it.",
    author: "housing_watch",
    flair: "housing",
    score: 189,
    userVote: -1,
    commentCount: 41,
    createdAt: ago(14),
  },
  {
    id: "5",
    title: "Spring concert lineup dropped — thoughts?",
    body: "Solid headliner but the openers feel random. Anyone know how the presale works this year?",
    author: "concert_kid",
    flair: "events",
    score: 97,
    userVote: 0,
    commentCount: 28,
    createdAt: ago(20),
  },
  {
    id: "6",
    title: "Unpopular opinion: the library on a Sunday morning is elite",
    body: "Empty desks, sunlight, no one talking. Fight me.",
    author: "library_stan",
    flair: "general",
    score: 74,
    userVote: 1,
    commentCount: 19,
    createdAt: ago(28),
  },
];

const mockComments: Record<string, Comment[]> = {
  "1": [
    { id: "c1", postId: "1", author: "senior_ta", body: "It's demanding but doable. Sleep is negotiable, curiosity isn't.", score: 42, createdAt: ago(1) },
    { id: "c2", postId: "1", author: "alum22", body: "Learn git, python, and how to ask good questions. You'll be fine.", score: 28, createdAt: ago(1.5) },
  ],
};

async function tryFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// In-memory mock store so votes/comments feel live
let posts = [...mockPosts];
const comments: Record<string, Comment[]> = { ...mockComments };

export async function fetchPosts(flair?: FlairId | "all"): Promise<Post[]> {
  const remote = await tryFetch<any[]>(
    `/posts${flair && flair !== "all" ? `?flair=${flair}` : ""}`,
  );
  const list = remote ? remote.map(normalizePost) : posts;
  return flair && flair !== "all" ? list.filter((p) => p.flair === flair) : list;
}

export async function fetchComments(postId: string): Promise<Comment[]> {
  const remote = await tryFetch<any[]>(`/posts/${postId}/comments`);
  return remote ? remote.map(normalizeComment) : (comments[postId] ?? []);
}

function normalizePost(p: any): Post {
  const created = p.createdAt ?? p.created_at ?? p.created ?? new Date().toISOString();
  return {
    id: String(p.id ?? ""),
    title: p.title ?? "",
    body: p.body ?? p.content ?? "",
    author: p.author ?? p.username ?? "anon",
    flair: (p.flair ?? "general") as FlairId,
    score: Number(p.score ?? 0),
    userVote: (p.userVote ?? 0) as 0 | 1 | -1,
    commentCount: Number(p.commentCount ?? p.comment_count ?? 0),
    createdAt: isNaN(new Date(created).getTime()) ? new Date().toISOString() : created,
  };
}

function normalizeComment(c: any): Comment {
  const created = c.createdAt ?? c.created_at ?? new Date().toISOString();
  return {
    id: String(c.id ?? ""),
    postId: String(c.postId ?? c.post_id ?? ""),
    author: c.author ?? c.username ?? "anon",
    body: c.body ?? c.content ?? "",
    score: Number(c.score ?? 0),
    createdAt: isNaN(new Date(created).getTime()) ? new Date().toISOString() : created,
  };
}

export async function votePost(
  postId: string,
  dir: 1 | -1 | 0,
): Promise<Post | null> {
  await tryFetch(`/posts/${postId}/vote`, {
    method: "POST",
    body: JSON.stringify({ direction: dir }),
  });
  posts = posts.map((p) => {
    if (p.id !== postId) return p;
    const delta = dir - p.userVote;
    return { ...p, score: p.score + delta, userVote: dir };
  });
  return posts.find((p) => p.id === postId) ?? null;
}

export async function addComment(postId: string, body: string, author = "you") {
  const c: Comment = {
    id: `c_${Date.now()}`,
    postId,
    author,
    body,
    score: 1,
    createdAt: new Date().toISOString(),
  };
  await tryFetch(`/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({ body }),
  });
  comments[postId] = [c, ...(comments[postId] ?? [])];
  posts = posts.map((p) =>
    p.id === postId ? { ...p, commentCount: p.commentCount + 1 } : p,
  );
  return c;
}

export async function login(email: string, _password: string) {
  await tryFetch(`/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password: _password }),
  });
  return { email, username: email.split("@")[0] };
}

export async function register(email: string, _password: string, username: string) {
  await tryFetch(`/auth/register`, {
    method: "POST",
    body: JSON.stringify({ email, password: _password, username }),
  });
  return { email, username };
}

export async function requestPasswordReset(email: string) {
  await tryFetch(`/auth/forgot-password`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  return { ok: true };
}

export async function createPost(input: {
  title: string;
  body: string;
  flair: FlairId;
  author: string;
}): Promise<Post> {
  const remote = await tryFetch<any>(`/posts`, {
    method: "POST",
    body: JSON.stringify(input),
  });
  const p: Post = remote
    ? normalizePost(remote)
    : {
        id: `p_${Date.now()}`,
        title: input.title,
        body: input.body,
        author: input.author,
        flair: input.flair,
        score: 1,
        userVote: 1,
        commentCount: 0,
        createdAt: new Date().toISOString(),
      };
  posts = [p, ...posts];
  return p;
}

export function getUserPosts(username: string): Post[] {
  return posts.filter((p) => p.author === username);
}
