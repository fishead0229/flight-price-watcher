import { Link, useNavigate } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plane } from "lucide-react";
import { AuthCard } from "@/components/auth-card";

export function SignUpPage() {
  usePageMeta({
    title: "Sign Up — Flight Price Notifier",
    description:
      "Create a Flight Price Notifier account and get email alerts when fares from Taipei drop to your target price.",
    ogDescription:
      "Create a Flight Price Notifier account and get email alerts when fares from Taipei drop.",
    twitterCard: "summary",
  });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    // Email confirmation is auto-confirmed for v1 — session is active.
    navigate("/app");
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="註冊後即可開始追蹤航線票價。"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="rounded-lg border border-input bg-secondary px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">Password</span>
          <input
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="rounded-lg border border-input bg-secondary px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        {error && (
          <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-1 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Creating account…" : "Sign up / 註冊"}
        </button>
        <p className="text-center text-sm text-muted-foreground">
          已經有帳號了？{" "}
          <Link to="/auth" className="font-medium text-primary hover:underline">
            Sign in / 登入
          </Link>
        </p>
      </form>
      <Link
        to="/"
        className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <Plane className="h-3.5 w-3.5" />
        Back to home
      </Link>
    </AuthCard>
  );
}
