import { n as __toESM } from "../_runtime.mjs";
import { a as require_react, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { l as SquarePen, s as Trash2 } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as formatDistanceToNowStrict } from "../_libs/date-fns.mjs";
import { c as deleteDraft, i as PageShell, n as CreatePostModal, p as useDrafts } from "./SiteHeader-ZlucwNc6.mjs";
import { t as FlairChip } from "./FlairChip-BaY2wV5J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/drafts-BeZeKdqR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DraftsPage() {
	const drafts = useDrafts();
	const [editing, setEditing] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "top-center",
			richColors: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatePostModal, {
			open: !!editing,
			onClose: () => setEditing(null),
			initial: editing
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex items-end justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold",
				children: "Drafts"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Half-baked thoughts, saved for later."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-display text-xs font-bold uppercase tracking-widest text-muted-foreground",
				children: [drafts.length, " saved"]
			})]
		}),
		drafts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-2xl border-2 border-dashed border-ink/30 p-12 text-center text-sm text-muted-foreground",
			children: "No drafts yet. Start writing and hit \"Save draft\"."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3",
			children: drafts.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-2xl border-2 border-ink bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center gap-2 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlairChip, { id: d.flair }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								"updated ",
								formatDistanceToNowStrict(new Date(d.updatedAt)),
								" ago"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-bold",
						children: d.title || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-muted-foreground",
							children: "Untitled"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 line-clamp-2 text-sm text-muted-foreground",
						children: d.body || "…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setEditing(d),
							className: "inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-brutal-sm hover:-translate-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-3 w-3" }), " Continue"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								deleteDraft(d.id);
								toast.success("Draft deleted");
							},
							className: "inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-background px-3 py-1.5 text-xs font-bold uppercase tracking-wider hover:-translate-y-0.5 hover:shadow-brutal-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" }), " Delete"]
						})]
					})
				]
			}, d.id))
		})
	] });
}
//#endregion
export { DraftsPage as component };
