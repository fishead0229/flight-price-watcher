# Flight Price Watcher

Build a SaaS landing page + authenticated app shell for Flight Price Notifier (機票降價通知), a product that watches popular flight routes from Taipei and emails the user when the cheapest fare drops to or below their target price — targeted at budget-driven travelers who don't care exactly when they fly, they just want a ticket under their budget.

The site must include:

A public landing page (/) with:

Hero section: product name "Flight Price Notifier" prominently displayed, value prop 「設定航線與目標價，機票降價就通知你」 (English subtitle: "Set a route and a target price — we email you when the fare drops."), and a primary CTA button labeled "Sign in / 登入" in the top-right header.

Features section with exactly 3 feature cards:

Card 1: 「盯緊熱門航線 (Always-on route watching)」 — 持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。

Card 2: 「達標自動通知 (Target-price email alerts)」 — 低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。

Card 3: 「隨時取消 (Cancel anytime)」 — 月訂閱制，不想用隨時停，沒有綁約。

Footer with copyright 「© 2026 Flight Price Notifier」.

Authentication using Lovable's built-in Supabase-style auth (use whatever auth backend Lovable provides by default — Lovable Cloud is fine for this v1; we'll swap to a user-owned Supabase project in a later step):

Sign Up page with email + password

Sign In page with email + password

Sign Out functionality

Email confirmation can be disabled for simplicity in this v1

An authenticated app shell at /app that the user lands on after signing in:

Greets the signed-in user by email: 「Hi {user.email}」

A placeholder message: 「你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。」 (English: "Your dashboard is coming soon. Route-subscription will be added in the next milestone.")

A Sign Out button in the header

Design requirements:

Modern, professional dark theme (purple/violet accent on a near-black background)

Use Inter or a similar sans-serif font

Mobile responsive

Tasteful subtle animations (fade-in on scroll is fine; don't overdo it)

Out of scope for this v1: route-subscription form, target-price input, fare display, payment, custom database tables (do NOT create a subscriptions or profiles table — only use Supabase's default auth.users). Those come in later milestones. Stick to landing page + auth + placeholder dashboard.

## Tech stack

Plain [Vite](https://vite.dev) + React single-page app (no SSR), [React Router](https://reactrouter.com) for client-side routing, Tailwind CSS v4, and Supabase for auth. `vite build` emits a fully static site to `dist/`; `vercel.json` rewrites every path to `index.html` so deep links such as `/app` resolve client-side.

## Routes

| Path | Page |
| --- | --- |
| `/` | Landing page |
| `/auth` (alias `/sign-in`) | Sign in |
| `/sign-up` | Sign up |
| `/app` | Authenticated dashboard (redirects to `/auth` when signed out) |

## Development

```sh
npm install
npm run dev        # local dev server
npm run build      # static build → dist/
npm run preview    # serve the production build locally
npm run typecheck  # tsc --noEmit
```

## Environment variables

Set these (in `.env` locally, and in the Vercel project settings for deployments):

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

## Deploying to Vercel

Import the repo in Vercel; the `vite` framework preset is picked up from `vercel.json` (build command `npm run build`, output directory `dist`). No serverless functions or edge runtime are needed.
