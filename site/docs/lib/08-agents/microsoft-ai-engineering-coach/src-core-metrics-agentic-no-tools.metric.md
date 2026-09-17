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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/metrics/agentic-no-tools.metric.md"
sourceRel: "src/core/metrics/agentic-no-tools.metric.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/metrics/agentic-no-tools.metric.md"
sourceSha256: "61223bcc044fd53757bc3249a574a74ec614b9978b86d7a7b24b617fd7fb021b"
pageSha256: "61223bcc044fd53757bc3249a574a74ec614b9978b86d7a7b24b617fd7fb021b"
contentMode: "local-full"
zh: ""
---

# Filter
agentMode == "agent" AND toolsUsed.length == 0

# Metric
ratio

# Examples
"&#123;&#123;messageText | truncate:80&#125;&#125;" (&#123;&#123;agentMode&#125;&#125;, &#123;&#123;modelId&#125;&#125;)
