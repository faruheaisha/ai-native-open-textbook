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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/metrics/capslock-messages.metric.md"
sourceRel: "src/core/metrics/capslock-messages.metric.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/metrics/capslock-messages.metric.md"
sourceSha256: "6a9f97133afff5e593ef8cc6d9edb2f95ae1e9e335cf0b6b24fc84a006d0b696"
pageSha256: "6a9f97133afff5e593ef8cc6d9edb2f95ae1e9e335cf0b6b24fc84a006d0b696"
contentMode: "local-full"
zh: ""
---

# Filter
matches(messageText, "/^[A-Z\\s!?.,]\{20,\}/")

# Metric
count

# Examples
"&#123;&#123;messageText | truncate:80&#125;&#125;"
