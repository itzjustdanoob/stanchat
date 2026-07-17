import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Shirt,
  FileEdit,
  Shield,
  Sun,
  Moon,
  LogOut,
  Settings as SettingsIcon,
  User as UserIcon,
} from "lucide-react";
import { Dropdown } from "./Dropdown";
import { avatarUrl, setUser, updateUser, useUser } from "@/lib/auth-store";
import { useTheme, toggleTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const user = useUser();
  const theme = useTheme();
  const navigate = useNavigate();

  if (!user) return null;
  const seed = user.avatarSeed ?? user.username;

  const close = () => setOpen(false);
  const go = (to: string) => { close(); navigate({ to }); };

  const rowClass = "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-muted";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-ink bg-card hover:-translate-y-0.5 hover:shadow-brutal-sm"
        aria-label="Account"
      >
        <img src={avatarUrl(seed)} alt="" className="h-full w-full" />
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-[color:var(--flair-campus)]" />
      </button>

      <Dropdown open={open} onClose={close} className="w-[300px] overflow-hidden">
        <button onClick={() => go("/profile")} className="flex w-full items-center gap-3 border-b-2 border-ink px-4 py-3 text-left hover:bg-muted">
          <img src={avatarUrl(seed)} alt="" className="h-10 w-10 shrink-0 rounded-full border-2 border-ink" />
          <div className="min-w-0">
            <p className="font-display text-sm font-bold">View Profile</p>
            <p className="truncate text-xs text-muted-foreground">u/{user.username}</p>
          </div>
        </button>

        <div className="py-1">
          <button className={rowClass} onClick={() => go("/profile")}>
            <UserIcon className="h-4 w-4" /> Profile
          </button>
          <button className={rowClass} onClick={() => { updateUser({ avatarSeed: `${user.username}-${Date.now()}` }); }}>
            <Shirt className="h-4 w-4" /> Edit Avatar
          </button>
          <button className={rowClass} onClick={() => go("/drafts")}>
            <FileEdit className="h-4 w-4" /> Drafts
          </button>
        </div>

        <div className="border-t-2 border-dashed border-ink/20 py-1">
          <div className={cn(rowClass, "cursor-default hover:bg-transparent")}>
            <Shield className="h-4 w-4" /> Mod Mode
            <button
              onClick={() => updateUser({ modMode: !user.modMode })}
              className={cn("ml-auto relative inline-flex h-5 w-9 items-center rounded-full border-2 border-ink transition-colors", user.modMode ? "bg-primary" : "bg-muted")}
              aria-label="Toggle mod mode"
            >
              <span className={cn("inline-block h-3 w-3 rounded-full bg-paper transition-transform", user.modMode ? "translate-x-4" : "translate-x-0.5")} />
            </button>
          </div>
          <button className={rowClass} onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            Display Mode
            <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {theme === "dark" ? "Dark" : "Light"}
            </span>
          </button>
          <button className={rowClass} onClick={() => { setUser(null); close(); navigate({ to: "/" }); }}>
            <LogOut className="h-4 w-4" /> Log Out
          </button>
        </div>

        <div className="border-t-2 border-dashed border-ink/20 py-1">
          <Link to="/settings" onClick={close} className={rowClass}>
            <SettingsIcon className="h-4 w-4" /> Settings
          </Link>
        </div>
      </Dropdown>
    </div>
  );
}
