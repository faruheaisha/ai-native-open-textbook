---
title: "Timeline"
sourceId: "08-agents/microsoft-ai-engineering-coach"
sourceTitle: "AI Engineering Coach（微软）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/AI-Engineering-Coach"
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/docs/content/observe/timeline.md"
sourceRel: "docs/content/observe/timeline.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/docs/content/observe/timeline.md"
sourceSha256: "c72dcaa3133c55435522c095891fdb91e62281764bc40f43cc7425d0a22251ca"
pageSha256: "c72dcaa3133c55435522c095891fdb91e62281764bc40f43cc7425d0a22251ca"
contentMode: "local-full"
zh: ""
---

# Timeline

The Timeline view displays your AI coding sessions as a Gantt chart, giving you a visual overview of when you worked and how your sessions overlapped.

![Timeline View](https://gh-proxy.com/https://raw.githubusercontent.com/microsoft/AI-Engineering-Coach/18b1a3d16b586c171426c6a407cc5c2dc073556e/docs/themes/coach/static/screenshots/screen-timeline.png)

## Gantt View

Each row represents a session in a specific workspace. Blocks on the timeline show when requests were made, with density indicated by the visual clustering of marks within each block. The time axis spans the full day from early morning to late night.

Key metrics shown above the chart:

- **Session count** for the selected day
- **Total requests** across all sessions
- **Max concurrent** sessions running at the same time

You can navigate between days using the date selector.

## List View

Switch to the List tab for a tabular view of all sessions. Each row shows the workspace, harness, start time, duration, request count, and estimated lines of code.

## What Sessions Tell You

The Timeline is useful for understanding your work rhythm. Long, thin session bars with few requests might indicate idle sessions wasting context. Dense clusters of activity show focused, productive work. Overlapping sessions across workspaces highlight multitasking patterns.
