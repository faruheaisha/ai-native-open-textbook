---
title: "vibefast.app Quickstart"
sourceId: "07-coding/vibefast-docs"
sourceTitle: "VibeFast 文档"
sourceKind: "官方文档"
licenseLabel: "限非商用"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/vibefast-app/vibefast-docs"
entryUrl: "https://github.com/vibefast-app/vibefast-docs/blob/2a34bc50576f3f74fda6196ca9bebf851187bcf9/quickstart.md"
sourceRel: "quickstart.md"
rawUrl: "/raw/07-coding/vibefast-docs/quickstart.md"
sourceSha256: "ef7f8b84a35c66f9ac4490cba6247f956ae60d54b713286e50bf09839d1a5add"
pageSha256: "ef7f8b84a35c66f9ac4490cba6247f956ae60d54b713286e50bf09839d1a5add"
contentMode: "local-full"
zh: ""
---

# vibefast.app Quickstart

[English](/lib/07-coding/vibefast-docs/quickstart) · [繁中](/lib/07-coding/vibefast-docs/quickstart-zh) · [日本語](/lib/07-coding/vibefast-docs/quickstart-jp) · [Español](/lib/07-coding/vibefast-docs/quickstart-es) · [Português (BR)](/lib/07-coding/vibefast-docs/quickstart-pt-br)

**Updated:** March 2026  
**Reading time:** about 5 minutes

-----

## From Clone to Live in 3 Commands

```bash
git clone https://github.com/vibefast-app/vibefast.git my-app
cd my-app && npm install
npm run setup
```

That’s it.

`npm run setup` is the core of the vibefast.app template experience. It handles everything you’d otherwise do manually:

- Log into Cloudflare and verify your account
- Create a D1 database, run bootstrap SQL, build all tables automatically
- Generate a JWT secret and write it to your Workers environment
- Deploy both the frontend (Remix) and backend (Workers API) to production simultaneously

When the terminal finishes, you’ll see two live URLs — one for the frontend, one for the backend API. Your app is already running on Cloudflare’s global edge network across 300+ locations.

-----

## Requirements

Before you start, make sure you have:

- **Node.js 20+**
- **npm 10+**
- **A Cloudflare account** (free tier is enough)
- macOS users: `jq` installed (`brew install jq`)

No Cloudflare account yet? [Sign up free here](https://dash.cloudflare.com/sign-up) — no credit card required.

-----

## Want to See It Running First?

Don't take the description at face value.

[vibefast.app](https://vibefast.app) is built entirely on the vibefast.app template — the marketing homepage, blog, pricing page, user login, and live backend are all real features from this template running in production.

**Sign up for a free account** and once you're logged in, you'll be able to explore:

- Analytics inside the live backend
- Blog and Media workflows running on the production site
- Sample Business and User views in limited-access mode
- Your registration number — which user you are

The auth flow you just went through, the live backend UI, and the page speed — that's exactly what you're buying. Not a demo. The real thing.

![vibefast.app traffic analytics dashboard](/mirror/43/4302f7125ca960a39e196582027ac18897d44a5c.png)

-----

## What You Can Do in the First Hour

The vibefast.app template is designed with one goal: **buyers should be able to go from setup to a customized, live app within their first hour.**

### 0–10 Minutes: Install and Deploy

```bash
npm install
npm run setup
```

When this finishes, you have:

- A complete web app running on Cloudflare
- A D1 database with users, posts, and orders tables already created
- Frontend and backend Workers both live in production
- A URL you can open right now

### 10–15 Minutes: Local Development

```bash
npm run dev
```

One command starts both frontend and backend. Open the local URL printed in your terminal and you’ll see:

- A complete marketing homepage
- A pricing page
- A blog system
- User registration and login
- An admin backend entry point

These aren’t placeholder screens. Every feature is wired together and working.

![vibefast.app signup flow](/mirror/db/dbd387f96ee797383f2a0c24c9e1d54635f55a67.png)

### 15–40 Minutes: Stripe, Resend, and Branding

Add your Stripe API key and Resend API key to the config, run `npm run deploy`, then:

1. Register an account using your configured admin email
1. Open `/admin` and confirm you can access the live backend
1. Run a Stripe test payment and confirm the webhook fires
1. Confirm the purchase confirmation and admin notification emails both arrive

Once the end-to-end flow works, your app is ready.

Branding is straightforward — the vibefast.app template centralizes all the copy you’ll want to change in a single config file: site name, domain, pricing copy, homepage copy, SEO settings. Change them, run `npm run deploy`, everything updates.

![vibefast.app blog editor](/mirror/f2/f2240444df40db94f045b6166af3216e0a394d42.png)

-----

## Command Reference

|Command                  |What it does                                                             |
|-------------------------|-------------------------------------------------------------------------|
|`npm run setup`          |First-time setup: creates database, generates secret, deploys all Workers|
|`npm run dev`            |Start local development (frontend + backend simultaneously)              |
|`npm run deploy`         |Deploy to production (frontend + backend simultaneously)                 |
|`npm run deploy:frontend`|Deploy frontend only                                                     |
|`npm run deploy:backend` |Deploy backend only                                                      |
|`npm run build`          |Build all packages                                                       |
|`npm run typecheck`      |TypeScript type check across the entire project                          |

-----

## Want to Go Deeper on the Architecture?

- [Why Cloudflare Is the Best Choice for Vibe Coding](/lib/07-coding/vibefast-docs/en-05-the-best-way-to-vibecoding-on-cloudflare-en) — Direct comparison with Next.js + Vercel
- [Cloudflare Workers vs. Traditional Servers](/lib/07-coding/vibefast-docs/en-06-cloudflare-workers-vs-traditional-server-en) — The practical benefits of edge architecture

-----

## Ready?

**Early bird $99 — price goes up to $199 on August 1, 2026.**  
One-time payment. Lifetime access. Private GitHub repo. All future updates included.

👉 **[vibefast.app](https://vibefast.app)**
