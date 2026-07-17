import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { T as DollarSign, o as TrendingUp, r as Users, y as MessageSquare } from "../_libs/lucide-react.mjs";
import { i as PageShell } from "./SiteHeader-ZlucwNc6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/earn-DEqDUbcS.js
var import_jsx_runtime = require_jsx_runtime();
var WAYS = [
	{
		icon: MessageSquare,
		title: "Quality posts",
		desc: "Earn $2 per post that hits the top 10 of your campus."
	},
	{
		icon: TrendingUp,
		title: "Weekly bonuses",
		desc: "Top contributors split a $500 pool every Friday."
	},
	{
		icon: Users,
		title: "Referrals",
		desc: "Get $5 for every friend who verifies with a .edu email."
	}
];
function EarnPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl border-2 border-ink bg-card p-8 shadow-brutal",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-[color:var(--accent)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-6 w-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-bold",
					children: "Earn on StanChat"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Get paid for making campus discussion better."
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Balance",
						value: "$24.00"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Pending",
						value: "$8.50"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Lifetime",
						value: "$142.75"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 font-display text-xl font-bold",
			children: "How to earn"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 grid gap-3 sm:grid-cols-3",
			children: WAYS.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border-2 border-ink bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(w.icon, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display font-bold",
						children: w.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: w.desc
					})
				]
			}, w.title))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "mt-6 rounded-full border-2 border-ink bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg",
			children: "Cash out →"
		})
	] });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border-2 border-ink bg-background p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-2xl font-bold",
			children: value
		})]
	});
}
//#endregion
export { EarnPage as component };
