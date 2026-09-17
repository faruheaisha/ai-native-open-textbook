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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/metrics/slow-responses.metric.md"
sourceRel: "src/core/metrics/slow-responses.metric.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/metrics/slow-responses.metric.md"
sourceSha256: "bf2a1d0bfdc8b05e73b63eedb6a7f4f27cb65514aeeb0456423a0d1a50e36596"
pageSha256: "bf2a1d0bfdc8b05e73b63eedb6a7f4f27cb65514aeeb0456423a0d1a50e36596"
contentMode: "local-full"
zh: ""
---

# Filter
totalElapsed > 30000

# Metric
count

# Examples
"&#123;&#123;messageText | truncate:60&#125;&#125;" took &#123;&#123;totalElapsed&#125;&#125;ms (&#123;&#123;modelId&#125;&#125;)
