import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Radar, MailCheck, CalendarX2, Plane, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

const FEATURES = [
  {
    icon: Radar,
    title: "盯緊熱門航線",
    subtitle: "Always-on route watching",
    description:
      "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    icon: MailCheck,
    title: "達標自動通知",
    subtitle: "Target-price email alerts",
    description: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
  },
  {
    icon: CalendarX2,
    title: "隨時取消",
    subtitle: "Cancel anytime",
    description: "月訂閱制，不想用隨時停，沒有綁約。",
  },
];

export function LandingPage() {
  usePageMeta({
    title: "Flight Price Notifier — 機票降價通知",
    description:
      "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops. Watching popular routes from Taipei.",
    ogDescription: "Set a route and a target price — we email you when the fare drops.",
    twitterCard: "summary_large_image",
  });

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      {/* ambient glow */}
      <div
        aria-hidden
        className="animate-pulse-soft pointer-events-none absolute -top-48 left-1/2 h-[34rem] w-[54rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />

      <header className="relative z-10 mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Plane className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Flight Price Notifier
          </span>
        </div>
        <Link
          to="/auth"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Sign in / 登入
        </Link>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-24 pt-20 text-center sm:px-6 sm:pt-28">
          <span className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            台北出發・熱門航線票價監控
          </span>
          <h1
            className="animate-fade-in-up mt-8 text-4xl font-extrabold tracking-tight sm:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            Flight Price Notifier
            <span className="mt-3 block bg-gradient-to-r from-primary via-fuchsia-400 to-primary bg-clip-text text-2xl font-bold text-transparent sm:text-4xl">
              機票降價通知
            </span>
          </h1>
          <p
            className="animate-fade-in-up mt-6 max-w-2xl text-lg leading-relaxed text-foreground/90 sm:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            設定航線與目標價，機票降價就通知你
          </p>
          <p
            className="animate-fade-in-up mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base"
            style={{ animationDelay: "200ms" }}
          >
            Set a route and a target price — we email you when the fare drops.
          </p>
          <div
            className="animate-fade-in-up mt-10 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "260ms" }}
          >
            <Link
              to="/sign-up"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:opacity-90 hover:shadow-primary/40"
            >
              開始免費追蹤
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/auth"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent"
            >
              Sign in / 登入
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-28 sm:px-6">
          <Reveal>
            <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
              為什麼選擇我們
            </h2>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              不用自己刷票價 — 把這件事交給我們。
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 120}>
                <article className="glow-card group h-full rounded-2xl p-7 transition-colors hover:border-primary/40">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-primary/80">
                    {feature.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-center px-4 sm:px-6">
          <p className="text-sm text-muted-foreground">
            © 2026 Flight Price Notifier
          </p>
        </div>
      </footer>
    </div>
  );
}
