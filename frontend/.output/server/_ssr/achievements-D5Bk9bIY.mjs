import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { S as Lock, a as Trophy } from "../_libs/lucide-react.mjs";
import { i as PageShell, s as cn } from "./SiteHeader-ZlucwNc6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/achievements-D5Bk9bIY.js
var import_jsx_runtime = require_jsx_runtime();
var ACHIEVEMENTS = [
	{
		id: 1,
		name: "First Post",
		desc: "Publish your first post",
		unlocked: true
	},
	{
		id: 2,
		name: "Upvoter",
		desc: "Give 10 upvotes",
		unlocked: true
	},
	{
		id: 3,
		name: "Commentator",
		desc: "Leave 25 comments",
		unlocked: true
	},
	{
		id: 4,
		name: "Trendsetter",
		desc: "A post reaches 100 upvotes",
		unlocked: true
	},
	{
		id: 5,
		name: "Freshman",
		desc: "Join StanChat",
		unlocked: true
	},
	{
		id: 6,
		name: "Sophomore",
		desc: "Stick around for 6 months",
		unlocked: true
	},
	{
		id: 7,
		name: "Night Owl",
		desc: "Post after midnight",
		unlocked: true
	},
	{
		id: 8,
		name: "Bookworm",
		desc: "50 posts in Admissions",
		unlocked: true
	},
	{
		id: 9,
		name: "Dorm Room DJ",
		desc: "5 posts in Events",
		unlocked: true
	},
	{
		id: 10,
		name: "Career Coach",
		desc: "Comment on 20 Career posts",
		unlocked: true
	},
	{
		id: 11,
		name: "Roommate",
		desc: "Post in Housing",
		unlocked: true
	},
	{
		id: 12,
		name: "Class President",
		desc: "Reach 1000 karma",
		unlocked: true
	},
	{
		id: 13,
		name: "Prof's Pet",
		desc: "Post pinned by mod",
		unlocked: true
	},
	{
		id: 14,
		name: "Viral",
		desc: "Post reaches 1000 upvotes",
		unlocked: false
	},
	{
		id: 15,
		name: "Legendary",
		desc: "10,000 karma",
		unlocked: false
	},
	{
		id: 16,
		name: "Alumni",
		desc: "Active for 4 years",
		unlocked: false
	}
];
function AchievementsPage() {
	const unlocked = ACHIEVEMENTS.filter((a) => a.unlocked).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex items-end justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold",
			children: "Achievements"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted-foreground",
			children: [
				unlocked,
				" of ",
				ACHIEVEMENTS.length,
				" unlocked"
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-full border-2 border-ink bg-primary px-4 py-2 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-brutal-sm",
			children: ["Level ", Math.floor(unlocked / 3)]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4",
		children: ACHIEVEMENTS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex flex-col items-center rounded-2xl border-2 border-ink p-4 text-center", a.unlocked ? "bg-card shadow-brutal-sm" : "bg-muted opacity-60"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("mb-2 grid h-12 w-12 place-items-center rounded-full border-2 border-ink", a.unlocked ? "bg-[color:var(--accent)]" : "bg-background"),
					children: a.unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-sm font-bold",
					children: a.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-[11px] leading-tight text-muted-foreground",
					children: a.desc
				})
			]
		}, a.id))
	})] });
}
//#endregion
export { AchievementsPage as component };
