import { n as __toESM } from "../_runtime.mjs";
import { a as require_react, i as useQueryClient, n as useQuery, o as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { a as fetchPosts, i as fetchComments, n as addComment, t as Logo, u as votePost } from "./api-BNKbuPXr.mjs";
import { C as Flame, D as ChevronUp, E as Clock, N as ArrowBigUp, O as ChevronDown, P as ArrowBigDown, g as Send, l as SquarePen, m as Share2, o as TrendingUp, t as Zap, y as MessageSquare } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as formatDistanceToNowStrict } from "../_libs/date-fns.mjs";
import { a as SiteHeader, h as useUser, n as CreatePostModal, r as FLAIRS, s as cn, t as AuthModal } from "./SiteHeader-ZlucwNc6.mjs";
import { t as FlairChip } from "./FlairChip-BaY2wV5J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CR-cSpOi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FlairFilter({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: [{
			id: "all",
			label: "All",
			color: "#0e0e10"
		}, ...FLAIRS].map((f) => {
			const active = value === f.id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => onChange(f.id),
				className: cn("rounded-full border-2 border-ink px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-transform", active ? "text-white shadow-brutal-sm -translate-y-0.5" : "bg-card text-ink hover:-translate-y-0.5 hover:shadow-brutal-sm"),
				style: active ? { backgroundColor: f.color } : void 0,
				children: f.label
			}, f.id);
		})
	});
}
function VoteButtons({ score, userVote, onVote, orientation = "vertical" }) {
	const toggle = (dir) => onVote(userVote === dir ? 0 : dir);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-0.5 rounded-full border-2 border-ink bg-card p-1", orientation === "vertical" && "flex-col"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"aria-label": "Upvote",
				onClick: (e) => {
					e.preventDefault();
					e.stopPropagation();
					toggle(1);
				},
				className: cn("rounded-full p-1 transition-colors", userVote === 1 ? "bg-primary text-primary-foreground" : "hover:bg-muted"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowBigUp, {
					className: "h-5 w-5",
					fill: userVote === 1 ? "currentColor" : "none"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("min-w-6 text-center font-display text-sm font-bold tabular-nums", userVote === 1 && "text-[color:var(--upvote)]", userVote === -1 && "text-[color:var(--downvote)]"),
				children: score
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"aria-label": "Downvote",
				onClick: (e) => {
					e.preventDefault();
					e.stopPropagation();
					toggle(-1);
				},
				className: cn("rounded-full p-1 transition-colors", userVote === -1 ? "bg-[color:var(--downvote)] text-white" : "hover:bg-muted"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowBigDown, {
					className: "h-5 w-5",
					fill: userVote === -1 ? "currentColor" : "none"
				})
			})
		]
	});
}
function timeAgo(iso) {
	if (!iso) return "just now";
	const d = new Date(iso);
	if (isNaN(d.getTime())) return "just now";
	return `${formatDistanceToNowStrict(d)} ago`;
}
function PostCard({ post, index, onRequireAuth }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)("");
	const user = useUser();
	const qc = useQueryClient();
	const voteMut = useMutation({
		mutationFn: (dir) => votePost(post.id, dir),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] })
	});
	const commentsQ = useQuery({
		queryKey: ["comments", post.id],
		queryFn: () => fetchComments(post.id),
		enabled: open
	});
	const commentMut = useMutation({
		mutationFn: (body) => addComment(post.id, body, user?.username ?? "you"),
		onSuccess: () => {
			setDraft("");
			qc.invalidateQueries({ queryKey: ["comments", post.id] });
			qc.invalidateQueries({ queryKey: ["posts"] });
		}
	});
	const handleVote = (dir) => {
		if (!user) return onRequireAuth();
		voteMut.mutate(dir === post.userVote ? 0 : dir);
	};
	const handleComment = () => {
		if (!user) return onRequireAuth();
		if (!draft.trim()) return;
		commentMut.mutate(draft.trim());
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group relative rounded-2xl border-2 border-ink bg-card p-5 transition-transform hover:-translate-y-0.5 hover:shadow-brutal sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute -left-3 -top-3 grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-[color:var(--accent)] font-display text-sm font-bold shadow-brutal-sm",
			children: String(index + 1).padStart(2, "0")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden sm:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoteButtons, {
					score: post.score,
					userVote: post.userVote,
					onVote: handleVote
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex flex-wrap items-center gap-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlairChip, { id: post.flair }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold",
								children: ["@", post.author]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
								className: "text-muted-foreground",
								children: timeAgo(post.createdAt)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-bold leading-tight tracking-tight text-ink sm:text-2xl",
						children: post.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground",
						children: post.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sm:hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoteButtons, {
									score: post.score,
									userVote: post.userVote,
									onVote: handleVote,
									orientation: "horizontal"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setOpen((v) => !v),
								className: "inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-3 py-1.5 text-xs font-bold hover:bg-ink hover:text-paper",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-3.5 w-3.5" }),
									post.commentCount,
									open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3 w-3" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									navigator.clipboard?.writeText(`${window.location.origin}/#${post.id}`);
									toast.success("Link copied");
								},
								className: "inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-3 py-1.5 text-xs font-bold hover:bg-ink hover:text-paper",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-3.5 w-3.5" }), "Share"]
							})
						]
					}),
					open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-3 border-t-2 border-dashed border-ink/20 pt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: draft,
									onChange: (e) => setDraft(e.target.value),
									onKeyDown: (e) => e.key === "Enter" && handleComment(),
									placeholder: user ? "Add a comment…" : "Sign in to comment",
									onFocus: () => !user && onRequireAuth(),
									className: "min-w-0 flex-1 rounded-full border-2 border-ink bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleComment,
									className: "inline-flex items-center gap-1 rounded-full border-2 border-ink bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-brutal-sm hover:-translate-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3.5 w-3.5" }), " Post"]
								})]
							}),
							commentsQ.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Loading comments…"
							}),
							commentsQ.data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Be the first to comment."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2",
								children: commentsQ.data?.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "rounded-xl border-2 border-ink/10 bg-background px-4 py-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-1 flex items-center gap-2 text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-ink",
												children: ["@", c.author]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: timeAgo(c.createdAt) })
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-foreground/90",
										children: c.body
									})]
								}, c.id))
							})
						]
					})
				]
			})]
		})]
	});
}
function Feed() {
	const [flair, setFlair] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("hot");
	const [authOpen, setAuthOpen] = (0, import_react.useState)(false);
	const [createOpen, setCreateOpen] = (0, import_react.useState)(false);
	const user = useUser();
	const q = useQuery({
		queryKey: ["posts", flair],
		queryFn: () => fetchPosts(flair)
	});
	const posts = (0, import_react.useMemo)(() => {
		const list = [...q.data ?? []];
		if (sort === "new") list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
		else if (sort === "top") list.sort((a, b) => b.score - a.score);
		else list.sort((a, b) => b.score / Math.max(1, hoursOld(b.createdAt)) - a.score / Math.max(1, hoursOld(a.createdAt)));
		return list;
	}, [q.data, sort]);
	const openCreate = () => {
		if (!user) return setAuthOpen(true);
		setCreateOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				richColors: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthModal, {
				open: authOpen,
				onClose: () => setAuthOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatePostModal, {
				open: createOpen,
				onClose: () => setCreateOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-4 py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "relative mb-10 rounded-3xl border border-ink/10 bg-card px-6 py-10 sm:px-10 sm:py-14",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-background px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3 w-3 text-primary" }), " Est. Class of 2026"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-4 max-w-3xl font-display text-4xl font-bold leading-[1] tracking-tighter sm:text-6xl",
								children: [
									"Campus,",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "italic font-serif font-normal text-primary",
										children: "unfiltered."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-xl text-base leading-relaxed text-muted-foreground",
								children: "Real students. Real takes. Where the group chat spills."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: openCreate,
									className: "inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-sm font-bold text-paper transition hover:opacity-90",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" }), user ? "Start a post" : "Join with .edu →"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#feed",
									className: "rounded-full border border-ink/20 bg-background px-6 py-3 font-display text-sm font-bold hover:border-ink",
									children: "Browse the feed"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						id: "feed",
						className: "mb-6 flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-xs font-bold uppercase tracking-widest text-muted-foreground",
									children: "Filter"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-ink/20" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlairFilter, {
								value: flair,
								onChange: setFlair
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "inline-flex rounded-full border-2 border-ink bg-card p-1 text-xs shadow-brutal-sm",
									children: [
										{
											id: "hot",
											label: "Hot",
											icon: Flame
										},
										{
											id: "new",
											label: "New",
											icon: Clock
										},
										{
											id: "top",
											label: "Top",
											icon: TrendingUp
										}
									].map(({ id, label, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setSort(id),
										className: cn("inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display font-bold uppercase tracking-wider transition-colors", sort === id ? "bg-ink text-paper" : "text-muted-foreground hover:text-ink"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }), label]
									}, id))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-xs font-bold uppercase tracking-widest text-muted-foreground",
									children: [
										posts.length,
										" ",
										posts.length === 1 ? "post" : "posts"
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							q.isLoading && Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-36 animate-pulse rounded-2xl border-2 border-ink/20 bg-card" }, i)),
							posts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, {
								post: p,
								index: i,
								onRequireAuth: () => setAuthOpen(true)
							}, p.id)),
							!q.isLoading && posts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-2xl border-2 border-dashed border-ink/30 p-12 text-center text-sm text-muted-foreground",
								children: "No posts in this flair yet."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-16 border-t border-ink/10 bg-secondary text-ink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
							variant: "script",
							className: "h-10 w-auto"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xs uppercase tracking-widest text-muted-foreground",
							children: "Made for college · Est. 2026"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-serif text-sm italic text-muted-foreground",
							children: "\"the group chat, but public\""
						})
					]
				})
			})
		]
	});
}
function hoursOld(iso) {
	return (Date.now() - new Date(iso).getTime()) / 36e5;
}
//#endregion
export { Feed as component };
