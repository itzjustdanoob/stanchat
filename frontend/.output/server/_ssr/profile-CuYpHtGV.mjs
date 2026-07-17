import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { o as getUserPosts } from "./api-BNKbuPXr.mjs";
import { _ as Navigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Flame, a as Trophy, d as Shuffle } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { f as updateUser, h as useUser, i as PageShell, o as avatarUrl } from "./SiteHeader-ZlucwNc6.mjs";
import { t as FlairChip } from "./FlairChip-BaY2wV5J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-CuYpHtGV.js
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const user = useUser();
	if (user === null) {
		if (typeof window !== "undefined" && !window.localStorage.getItem("stanchat.user")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
		return null;
	}
	const seed = user.avatarSeed ?? user.username;
	const posts = getUserPosts(user.username);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "top-center",
			richColors: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-3xl border-2 border-ink bg-card p-6 shadow-brutal sm:p-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-start gap-5 sm:flex-row sm:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: avatarUrl(seed),
						alt: "",
						className: "h-24 w-24 rounded-full border-2 border-ink"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "font-display text-3xl font-bold",
								children: ["u/", user.username]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: user.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full border-2 border-ink bg-background px-3 py-1 font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "mr-1 inline h-3 w-3 text-primary" }), " 1,240 karma"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full border-2 border-ink bg-background px-3 py-1 font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "mr-1 inline h-3 w-3 text-primary" }), " 13 achievements"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => updateUser({ avatarSeed: `${user.username}-${Date.now()}` }),
						className: "inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-brutal-sm hover:-translate-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { className: "h-3.5 w-3.5" }), " Shuffle avatar"]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 font-display text-xl font-bold",
			children: "Your posts"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 space-y-3",
			children: [posts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border-2 border-dashed border-ink/30 p-8 text-center text-sm text-muted-foreground",
				children: [
					"You haven't posted yet.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "font-bold text-ink underline",
						children: "Go to feed"
					})
				]
			}), posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border-2 border-ink bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center gap-2 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlairChip, { id: p.flair }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								p.score,
								" pts · ",
								p.commentCount,
								" comments"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display font-bold",
						children: p.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 line-clamp-2 text-sm text-muted-foreground",
						children: p.body
					})
				]
			}, p.id))]
		})
	] });
}
//#endregion
export { ProfilePage as component };
