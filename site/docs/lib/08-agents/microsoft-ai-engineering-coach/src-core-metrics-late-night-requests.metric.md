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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/metrics/late-night-requests.metric.md"
sourceRel: "src/core/metrics/late-night-requests.metric.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/metrics/late-night-requests.metric.md"
sourceSha256: "32041f091c3d3471352bf848488369ad2732b61ee2b3eddea894d9a91bbb465e"
pageSha256: "32041f091c3d3471352bf848488369ad2732b61ee2b3eddea894d9a91bbb465e"
contentMode: "local-full"
zh: ""
---

# Filter
hour(timestamp) >= 22 OR hour(timestamp) < 6

# Metric
ratio

# Examples
&#123;&#123;messageText | truncate:60&#125;&#125; at &#123;&#123;hour(timestamp)&#125;&#125;:00
