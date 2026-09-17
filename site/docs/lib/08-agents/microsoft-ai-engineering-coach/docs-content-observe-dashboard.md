---
title: "Dashboard"
sourceId: "08-agents/microsoft-ai-engineering-coach"
sourceTitle: "AI Engineering Coach（微软）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/AI-Engineering-Coach"
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/docs/content/observe/dashboard.md"
sourceRel: "docs/content/observe/dashboard.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/docs/content/observe/dashboard.md"
sourceSha256: "ed11672a040daabd74ade442c655f3dbb46134bcc99b443cfc4a5ce3e7127235"
pageSha256: "ed11672a040daabd74ade442c655f3dbb46134bcc99b443cfc4a5ce3e7127235"
contentMode: "local-full"
zh: ""
---

# Dashboard

The Dashboard is the landing page of AI Engineer Coach. It brings together the most important metrics and recommendations into a single view.

![AI Engineer Coach Dashboard](https://gh-proxy.com/https://raw.githubusercontent.com/microsoft/AI-Engineering-Coach/18b1a3d16b586c171426c6a407cc5c2dc073556e/docs/themes/coach/static/screenshots/screen-dashboard.png)

## Practice Scores

Five score cards are displayed at the top of the dashboard, each computed from the anti-pattern detection system:

| Score | What it measures |
|---|---|
| **Prompt Quality** | How well you provide context to the AI (file references, open editors, specificity) |
| **Session Hygiene** | Whether you start fresh sessions, avoid overly long conversations, and use devcontainers |
| **Code Review** | How carefully you review, validate, and sandbox AI-generated output |
| **Tool Mastery** | How broadly you use available AI features (slash commands, plan mode, model selection) |
| **Context Management** | How efficiently your sessions use the available context window |

Each score ranges from 0 to 100 and includes week-over-week and month-over-month trend indicators. Clicking a card navigates to the detailed Anti-Patterns view for that category.

## Skill Finder

The dashboard includes an inline preview of the Skill Finder. It scans your prompt history for repeated patterns and surfaces two types of findings:

- **Custom Opportunities** -- Repeated prompts that could be turned into reusable skills or instructions
- **Community Matches** -- Matching picks from the community-maintained skill catalog

## Daily Activity

A bar chart shows requests, sessions, lines of code, and active workspaces over the selected time range. Tabs let you switch between these metrics. Below the chart, donut charts break down activity by workspace and by harness (VS Code, Claude, etc.).
