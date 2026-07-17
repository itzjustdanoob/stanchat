import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { k as Check, u as Sparkles } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { i as PageShell } from "./SiteHeader-ZlucwNc6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/premium-CCjTrxmL.js
var import_jsx_runtime = require_jsx_runtime();
var PERKS = [
	"Ad-free feed",
	"Custom flair & avatar frames",
	"Early access to new features",
	"Bigger draft library (50 drafts)",
	"Exclusive Premium lounge",
	"Priority mod support"
];
function PremiumPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "top-center",
			richColors: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl border-2 border-ink bg-gradient-to-br from-[color:var(--accent)] to-primary p-8 text-ink shadow-brutal",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-paper px-3 py-1 text-xs font-bold uppercase tracking-widest",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), " Premium"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-4 font-display text-4xl font-bold leading-tight",
					children: [
						"Support StanChat.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Get the good stuff."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-md text-sm",
					children: "$4.99/mo · Cancel anytime · Student pricing."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border-2 border-ink bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm uppercase tracking-widest text-muted-foreground",
						children: "Monthly"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-display text-4xl font-bold",
						children: ["$4.99", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-base text-muted-foreground",
							children: "/mo"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => toast.success("Premium coming soon — thanks for supporting!"),
						className: "mt-4 w-full rounded-full border-2 border-ink bg-background py-3 font-display text-xs font-bold uppercase tracking-widest hover:-translate-y-0.5 hover:shadow-brutal-sm",
						children: "Start monthly"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border-2 border-ink bg-ink p-6 text-paper shadow-brutal",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm uppercase tracking-widest opacity-70",
						children: "Yearly · save 30%"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-display text-4xl font-bold",
						children: ["$41.88", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-base opacity-70",
							children: "/yr"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => toast.success("Premium coming soon — thanks for supporting!"),
						className: "mt-4 w-full rounded-full border-2 border-paper bg-primary py-3 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground hover:-translate-y-0.5",
						children: "Start yearly"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 font-display text-xl font-bold",
			children: "What's included"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 grid gap-2 sm:grid-cols-2",
			children: PERKS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-2 rounded-xl border-2 border-ink bg-card px-4 py-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" })
				}), p]
			}, p))
		})
	] });
}
//#endregion
export { PremiumPage as component };
