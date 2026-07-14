import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { login, register } from "@/lib/api";
import { setUser } from "@/lib/auth-store";
import { Logo } from "./Logo";
import { toast } from "sonner";

export function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const u =
        mode === "login"
          ? await login(email, password)
          : await register(email, password, username || email.split("@")[0]);
      setUser(u);
      toast.success(mode === "login" ? "Welcome back" : "Account created");
      onClose();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border-2 border-ink bg-card p-6 shadow-brutal-lg sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border-2 border-ink p-1.5 hover:bg-ink hover:text-paper"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6">
          <Logo className="h-8 w-auto" />
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight">
            {mode === "login" ? "Welcome back." : "Join the group chat."}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login"
              ? "Sign in to vote, comment, and post."
              : "Verified with your .edu email."}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-3">
          {mode === "register" && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-xl border-2 border-ink bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          )}
          <input
            type="email"
            placeholder="you@school.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border-2 border-ink bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full rounded-xl border-2 border-ink bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl border-2 border-ink bg-primary py-3 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg disabled:opacity-60"
          >
            {loading
              ? "Please wait…"
              : mode === "login"
                ? "Sign in →"
                : "Create account →"}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-xs">
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="font-bold text-ink hover:underline"
          >
            {mode === "login" ? "Create account" : "I have an account"}
          </button>
          <Link
            to="/forgot-password"
            onClick={onClose}
            className="text-muted-foreground hover:text-ink hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
