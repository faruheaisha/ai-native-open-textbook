---
title: "Data Explorer"
sourceId: "08-agents/microsoft-ai-engineering-coach"
sourceTitle: "AI Engineering Coach（微软）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/AI-Engineering-Coach"
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/docs/content/improve/data-explorer.md"
sourceRel: "docs/content/improve/data-explorer.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/docs/content/improve/data-explorer.md"
sourceSha256: "c937f17190f5df829a911488b4585a64e4c788c10e72c6b34986df71ebac3f75"
pageSha256: "c937f17190f5df829a911488b4585a64e4c788c10e72c6b34986df71ebac3f75"
contentMode: "local-full"
zh: ""
---

# Data Explorer

The Data Explorer lets you inspect the raw data your rules run against. It is the fastest way to answer questions like "what values does this field actually take?" or "how many sessions had more than X requests?"

## Layout

The page shows two columns of fields -- one for `SessionRequest` and one for `Session`. Each field row reports:

- The field name and type
- A distribution summary (top values, min/max, or counts where appropriate)
- The sample size (how many rows contain a non-empty value)

All distributions respect the active date and workspace filters, so you can compare datasets across different slices without leaving the page.

## Use it when you are

- **Designing a rule** -- Check that the field you want to key off is actually populated for your harness
- **Debugging a false positive** -- See the real distribution of a threshold before deciding where to set it
- **Exploring harness differences** -- Flip between workspaces or harnesses to see which features show up where
