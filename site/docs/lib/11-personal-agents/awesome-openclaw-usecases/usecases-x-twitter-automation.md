---
title: "X/Twitter Automation from Chat"
sourceId: "11-personal-agents/awesome-openclaw-usecases"
sourceTitle: "Awesome OpenClaw Usecases"
sourceKind: "实践案例集"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "11-personal-agents"
sourceUrl: "https://github.com/hesamsheikh/awesome-openclaw-usecases"
entryUrl: "https://github.com/hesamsheikh/awesome-openclaw-usecases/blob/659895e58e2105c6db8fbef39f446c8a786a480c/usecases/x-twitter-automation.md"
sourceRel: "usecases/x-twitter-automation.md"
rawUrl: "/raw/11-personal-agents/awesome-openclaw-usecases/usecases/x-twitter-automation.md"
sourceSha256: "182c134209aa098f9fd5f9c608bfeef694c15d870e8c208995f273aed9d95699"
pageSha256: "182c134209aa098f9fd5f9c608bfeef694c15d870e8c208995f273aed9d95699"
contentMode: "local-full"
zh: ""
---

# X/Twitter Automation from Chat

Full X/Twitter automation through natural language — post tweets, reply, like, retweet, follow, DM, search, extract data, run giveaways, and monitor accounts, all from your OpenClaw chat.

## Pain Point

Managing an X/Twitter presence requires jumping between the app, third-party dashboards, and analytics tools. Running giveaways means manual winner picking. Extracting followers, likers, or retweeters requires scraping scripts. There is no single interface that lets you do all of this conversationally.

## What It Does

TweetClaw is an OpenClaw plugin that connects your agent to the X/Twitter API. You interact entirely through chat:

- **Post & engage** — Compose tweets, reply to threads, like, retweet, follow/unfollow, send DMs
- **Search & extract** — Search tweets and users, extract followers, likers, retweeters, quote tweeters, list members
- **Giveaways** — Pick random winners from tweet engagements with configurable filters (minimum followers, account age, keyword requirements)
- **Monitors** — Watch accounts for new tweets or follower changes and get notified

All actions go through a managed API — no browser cookies, no scraping, no credential exposure.

## Prompts

**Install the plugin:**
```text
openclaw plugins install @xquik/tweetclaw
```

**Post a tweet:**
```text
Post a tweet: "Just shipped a new feature — try it out!"
```

**Run a giveaway:**
```text
Pick 3 random winners from the retweeters of this tweet: https://x.com/username/status/123456789. Exclude accounts with fewer than 50 followers.
```

**Extract data:**
```text
Extract all users who liked this tweet and export as CSV: https://x.com/username/status/123456789
```

**Monitor an account:**
```text
Monitor @elonmusk and notify me whenever he posts a new tweet.
```

## Skills Needed

- [@xquik/tweetclaw](https://www.npmjs.com/package/@xquik/tweetclaw) — Install via `openclaw plugins install @xquik/tweetclaw`

## Related Links

- [GitHub Repository](https://github.com/Xquik-dev/tweetclaw)
- [npm Package](https://www.npmjs.com/package/@xquik/tweetclaw)
