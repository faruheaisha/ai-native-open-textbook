---
title: "Filter"
sourceId: "08-agents/microsoft-ai-engineering-coach"
sourceTitle: "AI Engineering Coach（微软）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/AI-Engineering-Coach"
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/metrics/short-messages.metric.md"
sourceRel: "src/core/metrics/short-messages.metric.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/metrics/short-messages.metric.md"
sourceSha256: "7d6f170d763fe3512d743b881d75b4ea8ce2f8e8a7ad969c3b270d3cac93860b"
pageSha256: "7d6f170d763fe3512d743b881d75b4ea8ce2f8e8a7ad969c3b270d3cac93860b"
contentMode: "local-full"
zh: ""
---

# Filter
messageLength < 30 AND messageLength > 0

# Metric
ratio

# Examples
"&#123;&#123;messageText | truncate:80&#125;&#125;" (&#123;&#123;messageLength&#125;&#125; chars)
