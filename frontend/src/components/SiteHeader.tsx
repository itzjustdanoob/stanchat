import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { Logo } from "./Logo";
import { AuthModal } from "./AuthModal";
import { CreatePostModal } from "./CreatePostModal";
import { NotificationsMenu } from "./NotificationsMenu";
import { ProfileMenu } from "./ProfileMenu";
import { useUser } from "@/lib/auth-store";

export function SiteHeader() {
  const user = useUser();
  const [auth, setAuth] = useState(false);
  const [create, setCreate] = useState(false);

  return (
    <>
      <AuthModal open={auth} onClose={() => setAuth(false)} />
      <CreatePostModal open={create} onClose={() => setCreate(false)} />
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center">
            <Logo className="h-8 w-auto sm:h-9" />
          </Link>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <button
                  onClick={() => setCreate(true)}
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-card px-3 py-1.5 text-xs font-bold uppercase tracking-wider hover:-translate-y-0.5 hover:shadow-brutal-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Create</span>
                </button>
                <NotificationsMenu />
                <ProfileMenu />
              </>
            ) : (
              <button
                onClick={() => setAuth(true)}
                className="rounded-full border-2 border-ink bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen text-ink">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10">{children}</main>
    </div>
  );
}
