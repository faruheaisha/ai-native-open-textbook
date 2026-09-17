---
title: "Output"
sourceId: "08-agents/microsoft-ai-engineering-coach"
sourceTitle: "AI Engineering Coach（微软）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/AI-Engineering-Coach"
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/docs/content/measure/output.md"
sourceRel: "docs/content/measure/output.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/docs/content/measure/output.md"
sourceSha256: "193d9f5e3748ef727540c9630009d4de5e99c4b2d97c47ce058040e1907c1bdb"
pageSha256: "193d9f5e3748ef727540c9630009d4de5e99c4b2d97c47ce058040e1907c1bdb"
contentMode: "local-full"
zh: ""
---

# Output

The Output page shows your **Code Output** -- how much code your AI assistants have generated.

> **Note:** A Token Usage tab exists but is temporarily hidden while we verify that reported numbers align with GitHub's billing data.

## Code Output

![Code Output](https://gh-proxy.com/https://raw.githubusercontent.com/microsoft/AI-Engineering-Coach/18b1a3d16b586c171426c6a407cc5c2dc073556e/docs/themes/coach/static/screenshots/screen-output.png)

The Code Output tab measures how much code your AI assistants have generated:

- **AI-Generated LoC** -- Total estimated lines of code across all sessions
- **Net AI LoC** -- Lines the AI added minus lines the AI removed, across all sessions (can be negative)

The **Daily AI Code Output** chart shows the net new lines of code the AI assistant wrote per day as a bar chart (it aggregates by week or month over longer ranges). Each edit is compared against the previous version of the file, so only added lines are counted -- re-saving an unchanged file or rewriting the same lines is not double-counted. Below it, breakdowns show output split **by language** (TypeScript, CSS, Python, etc.), **by workspace**, **by model**, and **by harness**.

The **Net Code Output** charts complement gross output by accounting for deletions. The default chart diverges added lines (above zero) against removed lines (below zero) with a net line overlaid, so a day where the assistant deleted or rewrote more than it added dips below zero. **Net by Model**, **Net by Workspace**, and **Net by Harness** tabs break the same net figure (added minus removed) down by dimension. This reflects the lasting footprint of AI edits on your files rather than just gross volume.

Time range selectors let you view the last 7 days, 4 weeks, 3 months, 6 months, or all time.
