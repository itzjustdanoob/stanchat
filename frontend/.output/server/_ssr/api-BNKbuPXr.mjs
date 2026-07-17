import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-BNKbuPXr.js
var import_jsx_runtime = require_jsx_runtime();
var stanchat_logo_top_png_asset_default = {
	version: 1,
	asset_id: "d0db19a1-0463-48a9-ac5c-21ee12254943",
	project_id: "cf5fc3c5-fa12-424e-8456-a06d7d0bd89b",
	url: "/__l5e/assets-v1/d0db19a1-0463-48a9-ac5c-21ee12254943/stanchat-logo-top.png",
	r2_key: "a/v1/cf5fc3c5-fa12-424e-8456-a06d7d0bd89b/d0db19a1-0463-48a9-ac5c-21ee12254943/stanchat-logo-top.png",
	original_filename: "stanchat-logo-top.png",
	size: 24636,
	content_type: "image/png",
	created_at: "2026-07-13T10:01:41Z"
};
var stanchat_logo_script_png_asset_default = {
	version: 1,
	asset_id: "1742911e-5a96-4379-99ff-46c771dc002c",
	project_id: "cf5fc3c5-fa12-424e-8456-a06d7d0bd89b",
	url: "/__l5e/assets-v1/1742911e-5a96-4379-99ff-46c771dc002c/stanchat-logo-script.png",
	r2_key: "a/v1/cf5fc3c5-fa12-424e-8456-a06d7d0bd89b/1742911e-5a96-4379-99ff-46c771dc002c/stanchat-logo-script.png",
	original_filename: "stanchat-logo-script.png",
	size: 33318,
	content_type: "image/png",
	created_at: "2026-07-13T10:01:41Z"
};
function Logo({ className = "h-8 w-auto", variant = "block" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: (variant === "script" ? stanchat_logo_script_png_asset_default : stanchat_logo_top_png_asset_default).url,
		alt: "StanChat",
		className,
		draggable: false
	});
}
var API_BASE = "https://stanchat.me/api";
var now = Date.now();
var ago = (h) => (/* @__PURE__ */ new Date(now - h * 36e5)).toISOString();
var mockPosts = [
	{
		id: "1",
		title: "Just got my acceptance letter — is the CS program really that intense?",
		body: "Committed yesterday and I'm hearing wild things about the first-year workload. What should I be prepping over the summer?",
		author: "future_frosh",
		flair: "admissions",
		score: 342,
		userVote: 0,
		commentCount: 87,
		createdAt: ago(2)
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
		createdAt: ago(5)
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
		createdAt: ago(9)
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
		createdAt: ago(14)
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
		createdAt: ago(20)
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
		createdAt: ago(28)
	}
];
var mockComments = { "1": [{
	id: "c1",
	postId: "1",
	author: "senior_ta",
	body: "It's demanding but doable. Sleep is negotiable, curiosity isn't.",
	score: 42,
	createdAt: ago(1)
}, {
	id: "c2",
	postId: "1",
	author: "alum22",
	body: "Learn git, python, and how to ask good questions. You'll be fine.",
	score: 28,
	createdAt: ago(1.5)
}] };
async function tryFetch(path, init) {
	try {
		const res = await fetch(`${API_BASE}${path}`, {
			...init,
			headers: {
				"Content-Type": "application/json",
				...init?.headers ?? {}
			}
		});
		if (!res.ok) return null;
		return await res.json();
	} catch {
		return null;
	}
}
var posts = [...mockPosts];
var comments = { ...mockComments };
async function fetchPosts(flair) {
	const remote = await tryFetch(`/posts${flair && flair !== "all" ? `?flair=${flair}` : ""}`);
	const list = remote ? remote.map(normalizePost) : posts;
	return flair && flair !== "all" ? list.filter((p) => p.flair === flair) : list;
}
async function fetchComments(postId) {
	const remote = await tryFetch(`/posts/${postId}/comments`);
	return remote ? remote.map(normalizeComment) : comments[postId] ?? [];
}
function normalizePost(p) {
	const created = p.createdAt ?? p.created_at ?? p.created ?? (/* @__PURE__ */ new Date()).toISOString();
	return {
		id: String(p.id ?? ""),
		title: p.title ?? "",
		body: p.body ?? p.content ?? "",
		author: p.author ?? p.username ?? "anon",
		flair: p.flair ?? "general",
		score: Number(p.score ?? 0),
		userVote: p.userVote ?? 0,
		commentCount: Number(p.commentCount ?? p.comment_count ?? 0),
		createdAt: isNaN(new Date(created).getTime()) ? (/* @__PURE__ */ new Date()).toISOString() : created
	};
}
function normalizeComment(c) {
	const created = c.createdAt ?? c.created_at ?? (/* @__PURE__ */ new Date()).toISOString();
	return {
		id: String(c.id ?? ""),
		postId: String(c.postId ?? c.post_id ?? ""),
		author: c.author ?? c.username ?? "anon",
		body: c.body ?? c.content ?? "",
		score: Number(c.score ?? 0),
		createdAt: isNaN(new Date(created).getTime()) ? (/* @__PURE__ */ new Date()).toISOString() : created
	};
}
async function votePost(postId, dir) {
	await tryFetch(`/posts/${postId}/vote`, {
		method: "POST",
		body: JSON.stringify({ direction: dir })
	});
	posts = posts.map((p) => {
		if (p.id !== postId) return p;
		const delta = dir - p.userVote;
		return {
			...p,
			score: p.score + delta,
			userVote: dir
		};
	});
	return posts.find((p) => p.id === postId) ?? null;
}
async function addComment(postId, body, author = "you") {
	const c = {
		id: `c_${Date.now()}`,
		postId,
		author,
		body,
		score: 1,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	await tryFetch(`/posts/${postId}/comments`, {
		method: "POST",
		body: JSON.stringify({ body })
	});
	comments[postId] = [c, ...comments[postId] ?? []];
	posts = posts.map((p) => p.id === postId ? {
		...p,
		commentCount: p.commentCount + 1
	} : p);
	return c;
}
async function login(email, _password) {
	await tryFetch(`/auth/login`, {
		method: "POST",
		body: JSON.stringify({
			email,
			password: _password
		})
	});
	return {
		email,
		username: email.split("@")[0]
	};
}
async function register(email, _password, username) {
	await tryFetch(`/auth/register`, {
		method: "POST",
		body: JSON.stringify({
			email,
			password: _password,
			username
		})
	});
	return {
		email,
		username
	};
}
async function requestPasswordReset(email) {
	await tryFetch(`/auth/forgot-password`, {
		method: "POST",
		body: JSON.stringify({ email })
	});
	return { ok: true };
}
async function createPost(input) {
	const remote = await tryFetch(`/posts`, {
		method: "POST",
		body: JSON.stringify(input)
	});
	const p = remote ? normalizePost(remote) : {
		id: `p_${Date.now()}`,
		title: input.title,
		body: input.body,
		author: input.author,
		flair: input.flair,
		score: 1,
		userVote: 1,
		commentCount: 0,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	posts = [p, ...posts];
	return p;
}
function getUserPosts(username) {
	return posts.filter((p) => p.author === username);
}
//#endregion
export { fetchPosts as a, register as c, fetchComments as i, requestPasswordReset as l, addComment as n, getUserPosts as o, createPost as r, login as s, Logo as t, votePost as u };
