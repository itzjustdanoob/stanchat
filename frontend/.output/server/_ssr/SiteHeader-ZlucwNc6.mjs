import { n as __toESM } from "../_runtime.mjs";
import { a as require_react, i as useQueryClient, o as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { c as register, r as createPost, s as login, t as Logo } from "./api-BNKbuPXr.mjs";
import { h as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Bell, T as DollarSign, _ as Plus, a as Trophy, c as Sun, f as Shirt, h as Settings, i as User, j as AtSign, k as Check, n as X, o as TrendingUp, p as Shield, u as Sparkles, v as Moon, w as FilePen, x as LogOut, y as MessageSquare } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as formatDistanceToNowStrict } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteHeader-ZlucwNc6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY$3 = "stanchat.user";
var listeners$3 = /* @__PURE__ */ new Set();
function read$3() {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(KEY$3);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}
function setUser(user) {
	if (typeof window === "undefined") return;
	if (user) window.localStorage.setItem(KEY$3, JSON.stringify(user));
	else window.localStorage.removeItem(KEY$3);
	listeners$3.forEach((l) => l());
}
function updateUser(patch) {
	const current = read$3();
	if (!current) return;
	setUser({
		...current,
		...patch
	});
}
function useUser() {
	const [user, setLocal] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setLocal(read$3());
		const l = () => setLocal(read$3());
		listeners$3.add(l);
		return () => {
			listeners$3.delete(l);
		};
	}, []);
	return user;
}
function avatarUrl(seed) {
	return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seed || "stan")}&backgroundType=gradientLinear&backgroundColor=ffd166,ff4d1f,4b6cf7`;
}
function AuthModal({ open, onClose }) {
	const [mode, setMode] = (0, import_react.useState)("login");
	const [email, setEmail] = (0, import_react.useState)("");
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	if (!open) return null;
	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			setUser(mode === "login" ? await login(email, password) : await register(email, password, username || email.split("@")[0]));
			toast.success(mode === "login" ? "Welcome back" : "Account created");
			onClose();
		} catch {
			toast.error("Something went wrong");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md rounded-3xl border-2 border-ink bg-card p-6 shadow-brutal-lg sm:p-8",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "absolute right-4 top-4 rounded-full border-2 border-ink p-1.5 hover:bg-ink hover:text-paper",
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "h-8 w-auto" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-2xl font-bold tracking-tight",
							children: mode === "login" ? "Welcome back." : "Join the group chat."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: mode === "login" ? "Sign in to vote, comment, and post." : "Verified with your .edu email."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "space-y-3",
					children: [
						mode === "register" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Username",
							value: username,
							onChange: (e) => setUsername(e.target.value),
							required: true,
							className: "w-full rounded-xl border-2 border-ink bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							placeholder: "you@school.edu",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							required: true,
							className: "w-full rounded-xl border-2 border-ink bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							placeholder: "Password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							required: true,
							minLength: 6,
							className: "w-full rounded-xl border-2 border-ink bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading,
							className: "w-full rounded-xl border-2 border-ink bg-primary py-3 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg disabled:opacity-60",
							children: loading ? "Please wait…" : mode === "login" ? "Sign in →" : "Create account →"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center justify-between text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setMode(mode === "login" ? "register" : "login"),
						className: "font-bold text-ink hover:underline",
						children: mode === "login" ? "Create account" : "I have an account"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/forgot-password",
						onClick: onClose,
						className: "text-muted-foreground hover:text-ink hover:underline",
						children: "Forgot password?"
					})]
				})
			]
		})
	});
}
var KEY$2 = "stanchat.drafts";
var listeners$2 = /* @__PURE__ */ new Set();
function read$2() {
	if (typeof window === "undefined") return [];
	try {
		return JSON.parse(window.localStorage.getItem(KEY$2) ?? "[]");
	} catch {
		return [];
	}
}
function write$1(list) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(KEY$2, JSON.stringify(list));
	listeners$2.forEach((l) => l());
}
function saveDraft(d) {
	const list = read$2();
	const id = d.id ?? `d_${Date.now()}`;
	const item = {
		id,
		title: d.title,
		body: d.body,
		flair: d.flair,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	write$1(list.some((x) => x.id === id) ? list.map((x) => x.id === id ? item : x) : [item, ...list]);
	return item;
}
function deleteDraft(id) {
	write$1(read$2().filter((d) => d.id !== id));
}
function useDrafts() {
	const [list, setList] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setList(read$2());
		const l = () => setList(read$2());
		listeners$2.add(l);
		return () => {
			listeners$2.delete(l);
		};
	}, []);
	return list;
}
var KEY$1 = "stanchat.notifications";
var listeners$1 = /* @__PURE__ */ new Set();
var seed = [
	{
		id: "n1",
		type: "reply",
		title: "@senior_ta replied to your post",
		body: "It's demanding but doable. Sleep is negotiable…",
		createdAt: (/* @__PURE__ */ new Date(Date.now() - 15 * 6e4)).toISOString(),
		read: false
	},
	{
		id: "n2",
		type: "upvote",
		title: "Your post is trending",
		body: "‘Best late-night food spots’ just passed 200 upvotes.",
		createdAt: (/* @__PURE__ */ new Date(Date.now() - 3 * 36e5)).toISOString(),
		read: false
	},
	{
		id: "n3",
		type: "mention",
		title: "@library_stan mentioned you",
		body: "…and shoutout to you for the study group tip.",
		createdAt: (/* @__PURE__ */ new Date(Date.now() - 26 * 36e5)).toISOString(),
		read: true
	}
];
function read$1() {
	if (typeof window === "undefined") return seed;
	try {
		const raw = window.localStorage.getItem(KEY$1);
		if (!raw) {
			window.localStorage.setItem(KEY$1, JSON.stringify(seed));
			return seed;
		}
		return JSON.parse(raw);
	} catch {
		return seed;
	}
}
function write(list) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(KEY$1, JSON.stringify(list));
	listeners$1.forEach((l) => l());
}
function pushNotification(n) {
	write([{
		...n,
		id: `n_${Date.now()}`,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		read: false
	}, ...read$1()]);
}
function markAllRead() {
	write(read$1().map((n) => ({
		...n,
		read: true
	})));
}
function markRead(id) {
	write(read$1().map((n) => n.id === id ? {
		...n,
		read: true
	} : n));
}
function useNotifications() {
	const [list, setList] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setList(read$1());
		const l = () => setList(read$1());
		listeners$1.add(l);
		return () => {
			listeners$1.delete(l);
		};
	}, []);
	return list;
}
var FLAIRS = [
	{
		id: "admissions",
		label: "Admissions",
		color: "var(--flair-admissions)"
	},
	{
		id: "campus",
		label: "Campus Life",
		color: "var(--flair-campus)"
	},
	{
		id: "career",
		label: "Career",
		color: "var(--flair-career)"
	},
	{
		id: "housing",
		label: "Housing",
		color: "var(--flair-housing)"
	},
	{
		id: "events",
		label: "Events",
		color: "var(--flair-events)"
	},
	{
		id: "general",
		label: "General",
		color: "var(--flair-general)"
	}
];
var flairById = (id) => FLAIRS.find((f) => f.id === id) ?? FLAIRS[5];
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function CreatePostModal({ open, onClose, initial }) {
	const user = useUser();
	const qc = useQueryClient();
	const [title, setTitle] = (0, import_react.useState)(initial?.title ?? "");
	const [body, setBody] = (0, import_react.useState)(initial?.body ?? "");
	const [flair, setFlair] = (0, import_react.useState)(initial?.flair ?? "general");
	const mut = useMutation({
		mutationFn: () => createPost({
			title: title.trim(),
			body: body.trim(),
			flair,
			author: user?.username ?? "you"
		}),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["posts"] });
			pushNotification({
				type: "system",
				title: "Post published",
				body: `Your post “${title.trim().slice(0, 40)}” is live.`
			});
			if (initial) deleteDraft(initial.id);
			toast.success("Posted");
			reset();
			onClose();
		}
	});
	const reset = () => {
		setTitle("");
		setBody("");
		setFlair("general");
	};
	if (!open) return null;
	const canPost = title.trim().length >= 4 && body.trim().length >= 4;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/60 p-4 backdrop-blur-sm sm:items-center",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-2xl rounded-3xl border-2 border-ink bg-card p-6 shadow-brutal-lg sm:p-8",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "absolute right-4 top-4 rounded-full border-2 border-ink p-1.5 hover:bg-ink hover:text-paper",
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold tracking-tight",
					children: initial ? "Continue draft" : "New post"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: ["Posting as ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-bold text-ink",
						children: ["@", user?.username ?? "you"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted-foreground",
							children: "Flair"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: FLAIRS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setFlair(f.id),
								className: cn("rounded-full border-2 border-ink px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition", flair === f.id ? "text-white shadow-brutal-sm" : "bg-background hover:-translate-y-0.5"),
								style: flair === f.id ? { backgroundColor: f.color } : void 0,
								children: f.label
							}, f.id))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: title,
							onChange: (e) => setTitle(e.target.value),
							placeholder: "An interesting title",
							maxLength: 140,
							className: "w-full rounded-xl border-2 border-ink bg-background px-4 py-3 font-display text-lg font-bold outline-none focus:ring-2 focus:ring-primary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: body,
							onChange: (e) => setBody(e.target.value),
							placeholder: "What's happening on campus?",
							rows: 6,
							className: "w-full resize-none rounded-xl border-2 border-ink bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							if (!title.trim() && !body.trim()) return onClose();
							saveDraft({
								id: initial?.id,
								title,
								body,
								flair
							});
							toast.success("Saved to drafts");
							onClose();
						},
						className: "rounded-full border-2 border-ink bg-background px-4 py-2 text-xs font-bold uppercase tracking-widest hover:-translate-y-0.5 hover:shadow-brutal-sm",
						children: "Save draft"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: !canPost || mut.isPending,
						onClick: () => mut.mutate(),
						className: "rounded-full border-2 border-ink bg-primary px-6 py-2.5 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg disabled:opacity-50",
						children: mut.isPending ? "Posting…" : "Post →"
					})]
				})
			]
		})
	});
}
function Dropdown({ open, onClose, children, align = "right", className }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onDoc = (e) => {
			if (ref.current && !ref.current.contains(e.target)) onClose();
		};
		const onEsc = (e) => e.key === "Escape" && onClose();
		document.addEventListener("mousedown", onDoc);
		document.addEventListener("keydown", onEsc);
		return () => {
			document.removeEventListener("mousedown", onDoc);
			document.removeEventListener("keydown", onEsc);
		};
	}, [open, onClose]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: cn("absolute top-full z-50 mt-2 rounded-2xl border-2 border-ink bg-card shadow-brutal", align === "right" ? "right-0" : "left-0", className),
		children
	});
}
var iconFor = (t) => {
	switch (t) {
		case "reply": return MessageSquare;
		case "upvote": return TrendingUp;
		case "mention": return AtSign;
		default: return Sparkles;
	}
};
function timeAgo(iso) {
	const d = new Date(iso);
	if (isNaN(d.getTime())) return "";
	return `${formatDistanceToNowStrict(d)} ago`;
}
function NotificationsMenu() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const notifs = useNotifications();
	const unread = notifs.filter((n) => !n.read).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOpen((v) => !v),
			"aria-label": "Notifications",
			className: "relative inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-card hover:-translate-y-0.5 hover:shadow-brutal-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full border-2 border-ink bg-primary px-1 font-display text-[10px] font-bold text-primary-foreground",
				children: unread
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dropdown, {
			open,
			onClose: () => setOpen(false),
			className: "w-[340px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b-2 border-ink px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-sm font-bold uppercase tracking-wider",
					children: "Notifications"
				}), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: markAllRead,
					className: "inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }), " Mark all read"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "max-h-[380px] overflow-y-auto",
				children: [notifs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "p-6 text-center text-xs text-muted-foreground",
					children: "You're all caught up."
				}), notifs.map((n) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => markRead(n.id),
						className: "flex w-full items-start gap-3 border-b border-ink/10 px-4 py-3 text-left hover:bg-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(iconFor(n.type), { className: "h-3.5 w-3.5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-bold text-ink",
										children: n.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "line-clamp-2 text-xs text-muted-foreground",
										children: n.body
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground",
										children: timeAgo(n.createdAt)
									})
								]
							}),
							!n.read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" })
						]
					}) }, n.id);
				})]
			})]
		})]
	});
}
var KEY = "stanchat.theme";
var listeners = /* @__PURE__ */ new Set();
function read() {
	if (typeof window === "undefined") return "light";
	const raw = window.localStorage.getItem(KEY);
	if (raw === "dark" || raw === "light") return raw;
	return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function apply(t) {
	if (typeof document === "undefined") return;
	document.documentElement.classList.toggle("dark", t === "dark");
}
function setTheme(t) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(KEY, t);
	apply(t);
	listeners.forEach((l) => l());
}
function toggleTheme() {
	setTheme(read() === "dark" ? "light" : "dark");
}
function useTheme() {
	const [t, setLocal] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		const initial = read();
		apply(initial);
		setLocal(initial);
		const l = () => setLocal(read());
		listeners.add(l);
		return () => {
			listeners.delete(l);
		};
	}, []);
	return t;
}
function ProfileMenu() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const user = useUser();
	const theme = useTheme();
	const navigate = useNavigate();
	if (!user) return null;
	const seed = user.avatarSeed ?? user.username;
	const close = () => setOpen(false);
	const go = (to) => {
		close();
		navigate({ to });
	};
	const rowClass = "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-muted";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOpen((v) => !v),
			className: "relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-ink bg-card hover:-translate-y-0.5 hover:shadow-brutal-sm",
			"aria-label": "Account",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: avatarUrl(seed),
				alt: "",
				className: "h-full w-full"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-[color:var(--flair-campus)]" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dropdown, {
			open,
			onClose: close,
			className: "w-[300px] overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => go("/profile"),
					className: "flex w-full items-center gap-3 border-b-2 border-ink px-4 py-3 text-left hover:bg-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: avatarUrl(seed),
						alt: "",
						className: "h-10 w-10 shrink-0 rounded-full border-2 border-ink"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm font-bold",
							children: "View Profile"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: ["u/", user.username]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: rowClass,
							onClick: () => go("/profile"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }), " Profile"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: rowClass,
							onClick: () => {
								updateUser({ avatarSeed: `${user.username}-${Date.now()}` });
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shirt, { className: "h-4 w-4" }), " Edit Avatar"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: rowClass,
							onClick: () => go("/drafts"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePen, { className: "h-4 w-4" }), " Drafts"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: rowClass,
							onClick: () => go("/achievements"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-4 w-4" }),
								" Achievements",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-auto text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
									children: "13 unlocked"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: rowClass,
							onClick: () => go("/earn"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-4 w-4" }),
								" Earn",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-auto text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
									children: "Earn cash"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: rowClass,
							onClick: () => go("/premium"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " Premium"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t-2 border-dashed border-ink/20 py-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn(rowClass, "cursor-default hover:bg-transparent"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4" }),
								" Mod Mode",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => updateUser({ modMode: !user.modMode }),
									className: cn("ml-auto relative inline-flex h-5 w-9 items-center rounded-full border-2 border-ink transition-colors", user.modMode ? "bg-primary" : "bg-muted"),
									"aria-label": "Toggle mod mode",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("inline-block h-3 w-3 rounded-full bg-paper transition-transform", user.modMode ? "translate-x-4" : "translate-x-0.5") })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: rowClass,
							onClick: toggleTheme,
							children: [
								theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" }),
								"Display Mode",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-auto text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
									children: theme === "dark" ? "Dark" : "Light"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: rowClass,
							onClick: () => {
								setUser(null);
								close();
								navigate({ to: "/" });
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Log Out"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t-2 border-dashed border-ink/20 py-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/settings",
						onClick: close,
						className: rowClass,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" }), " Settings"]
					})
				})
			]
		})]
	});
}
function SiteHeader() {
	const user = useUser();
	const [auth, setAuth] = (0, import_react.useState)(false);
	const [create, setCreate] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthModal, {
			open: auth,
			onClose: () => setAuth(false)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatePostModal, {
			open: create,
			onClose: () => setCreate(false)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-40 border-b-2 border-ink bg-paper/90 backdrop-blur",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "flex items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "h-8 w-auto sm:h-9" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setCreate(true),
							className: "inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-card px-3 py-1.5 text-xs font-bold uppercase tracking-wider hover:-translate-y-0.5 hover:shadow-brutal-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Create"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsMenu, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileMenu, {})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setAuth(true),
						className: "rounded-full border-2 border-ink bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal",
						children: "Sign in"
					})
				})]
			})
		})
	] });
}
function PageShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto max-w-4xl px-4 py-10",
			children
		})]
	});
}
//#endregion
export { SiteHeader as a, deleteDraft as c, setUser as d, updateUser as f, useUser as h, PageShell as i, flairById as l, useTheme as m, CreatePostModal as n, avatarUrl as o, useDrafts as p, FLAIRS as r, cn as s, AuthModal as t, setTheme as u };
