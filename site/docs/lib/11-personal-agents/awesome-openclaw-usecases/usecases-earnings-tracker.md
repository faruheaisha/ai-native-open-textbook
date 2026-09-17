---
title: "AI-Powered Earnings Tracker"
sourceId: "11-personal-agents/awesome-openclaw-usecases"
sourceTitle: "Awesome OpenClaw Usecases"
sourceKind: "实践案例集"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "11-personal-agents"
sourceUrl: "https://github.com/hesamsheikh/awesome-openclaw-usecases"
entryUrl: "https://github.com/hesamsheikh/awesome-openclaw-usecases/blob/659895e58e2105c6db8fbef39f446c8a786a480c/usecases/earnings-tracker.md"
sourceRel: "usecases/earnings-tracker.md"
rawUrl: "/raw/11-personal-agents/awesome-openclaw-usecases/usecases/earnings-tracker.md"
sourceSha256: "c9047a497849eb261e0b2bd5ae88e01b581da500220722053aa970f610df7b51"
pageSha256: "c9047a497849eb261e0b2bd5ae88e01b581da500220722053aa970f610df7b51"
contentMode: "local-full"
zh: ""
---

# AI-Powered Earnings Tracker

Following earnings season across dozens of tech companies means checking multiple sources and remembering report dates. You want to stay on top of AI/tech earnings without manually tracking every company.

This workflow automates earnings tracking and delivery:

• Weekly Sunday preview: scans the upcoming earnings calendar and posts relevant tech/AI companies to Telegram
• You pick which companies you care about, and OpenClaw schedules one-shot cron jobs for each earnings date
• After each report drops, OpenClaw searches for results, formats a detailed summary (beat/miss, key metrics, AI highlights), and delivers it

## Skills you Need

- `web_search` (built-in)
- Cron job support in OpenClaw
- Telegram topic for earnings updates

## How to Set it Up

1. Create a Telegram topic called "earnings" for updates.
2. Prompt OpenClaw:
```text
Every Sunday at 6 PM, run a cron job to:
1. Search for the upcoming week's earnings calendar for tech and AI companies
2. Filter for companies I care about (NVDA, MSFT, GOOGL, META, AMZN, TSLA, AMD, etc.)
3. Post the list to my Telegram "earnings" topic
4. Wait for me to confirm which ones I want to track

When I reply with which companies to track:
1. Schedule one-shot cron jobs for each earnings date/time
2. After each report drops, search for earnings results
3. Format a summary including: beat/miss, revenue, EPS, key metrics, AI-related highlights, guidance
4. Post to Telegram "earnings" topic

Keep a memory of which companies I typically track so you can auto-suggest them each week.
```
