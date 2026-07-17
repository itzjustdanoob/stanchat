import { n as __toESM } from "../_runtime.mjs";
import { a as require_react, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { l as requestPasswordReset, t as Logo } from "./api-BNKbuPXr.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as ArrowLeft, b as MailCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forgot-password-BOpBTbIx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ForgotPassword() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [sent, setSent] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await requestPasswordReset(email);
			setSent(true);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center px-4 text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "mb-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest hover:text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), "Back to StanChat"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border-2 border-ink bg-card p-6 shadow-brutal-lg sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "h-8 w-auto" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-display text-2xl font-bold tracking-tight",
						children: "Reset your password"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "We'll email you a reset link."
					}),
					sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-3 rounded-2xl border-2 border-dashed border-ink/30 p-6 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailCheck, { className: "mx-auto h-8 w-8 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display font-bold",
								children: "Check your inbox"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"If an account exists for ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: email }),
									", a reset link is on its way."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "inline-block rounded-full border-2 border-ink bg-primary px-5 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-brutal-sm hover:-translate-y-0.5",
								children: "Back home"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "mt-6 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							placeholder: "you@school.edu",
							required: true,
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "w-full rounded-xl border-2 border-ink bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading,
							className: "w-full rounded-xl border-2 border-ink bg-ink py-3 font-display text-sm font-bold uppercase tracking-widest text-paper shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg disabled:opacity-60",
							children: loading ? "Sending…" : "Send reset link →"
						})]
					})
				]
			})]
		})
	});
}
//#endregion
export { ForgotPassword as component };
