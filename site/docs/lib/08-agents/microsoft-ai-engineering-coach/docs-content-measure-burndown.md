---
title: "Burndown"
sourceId: "08-agents/microsoft-ai-engineering-coach"
sourceTitle: "AI Engineering Coach（微软）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/AI-Engineering-Coach"
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/README.md"
zh: ""
---

# Burndown

> **Temporarily disabled.** This feature is disabled until we can verify that reported numbers align with GitHub's billing data. It will be re-enabled once validated.

The Burndown page visualizes your AI credit consumption against your monthly allowance, with support for browsing past months.

## How It Works

GitHub Copilot plans come with a monthly AI credit budget (e.g., $10/month for Pro, $39/month for Pro+, $19/user for Business, $39/user for Enterprise). AI Engineer Coach tracks your estimated consumption based on token usage and model pricing, then projects whether you are on track to stay within budget.

The burndown chart draws an ideal-pace line from your full monthly budget to zero and overlays your actual consumption. If your actual line drops below the ideal pace, you are ahead of budget. If it is above, you risk running out before the billing cycle resets.

## Month Navigation

Use the **◀ / ▶** arrows to browse previous months. The current month shows a projection line extending to the end of the billing cycle. Past months show the final actual consumption without projection.
