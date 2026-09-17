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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/metrics/weekend-requests.metric.md"
sourceRel: "src/core/metrics/weekend-requests.metric.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/metrics/weekend-requests.metric.md"
sourceSha256: "a4fe2ccc9e0e0f9b2547cfab36a6db74efb9ad6e7997237423e6211d28ccdd80"
pageSha256: "a4fe2ccc9e0e0f9b2547cfab36a6db74efb9ad6e7997237423e6211d28ccdd80"
contentMode: "local-full"
zh: ""
---

# Filter
dayOfWeek(timestamp) == 0 OR dayOfWeek(timestamp) == 6

# Metric
ratio

# Examples
&#123;&#123;messageText | truncate:60&#125;&#125; (&#123;&#123;dayOfWeek(timestamp)&#125;&#125;)
