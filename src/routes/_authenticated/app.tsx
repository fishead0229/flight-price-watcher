import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Plane, LogOut, Radar } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: "Dashboard — Flight Price Notifier" },
      {
        name: "description",
        content: "Your route-watching dashboard for Flight Price Notifier.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AppDashboard,
});

function AppDashboard() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();

  async function handleSignOut() {
    await navigate({ to: "/", replace: true });
    await supabase.auth.signOut();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Plane className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold tracking-tight">
              Flight Price Notifier
            </span>
          </Link>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3.5 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-12 sm:px-6">
        <h1 className="animate-fade-in-up text-2xl font-bold tracking-tight sm:text-3xl">
          Hi {user.email}
        </h1>

        <div
          className="glow-card animate-fade-in-up mt-8 flex flex-col items-center rounded-2xl p-10 text-center sm:p-16"
          style={{ animationDelay: "120ms" }}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <Radar className="h-7 w-7" />
          </span>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground">
            你的航線追蹤儀表板即將上線 —
            下一個里程碑會加上訂閱航線的功能。
          </p>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Your dashboard is coming soon. Route-subscription will be added in
            the next milestone.
          </p>
        </div>
      </main>
    </div>
  );
}
