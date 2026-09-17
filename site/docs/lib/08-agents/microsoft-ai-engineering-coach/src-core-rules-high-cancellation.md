---
title: "Description"
sourceId: "08-agents/microsoft-ai-engineering-coach"
sourceTitle: "AI Engineering Coach（微软）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/AI-Engineering-Coach"
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/high-cancellation.md"
sourceRel: "src/core/rules/high-cancellation.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/high-cancellation.md"
sourceSha256: "fd48d47f0fea3d7ad05df315eb0fa11184be16f3db9fead1104302d12a5b66e5"
pageSha256: "fd48d47f0fea3d7ad05df315eb0fa11184be16f3db9fead1104302d12a5b66e5"
contentMode: "local-full"
zh: ""
---

# Description
Detects a high rate of cancelled requests, which wastes premium quota and indicates unclear prompting.

# When Triggered
&#123;&#123;count&#125;&#125; of &#123;&#123;total&#125;&#125; requests cancelled (&#123;&#123;pct&#125;&#125;). This wastes premium quota.

# How to Improve
Write clearer, more specific prompts. Wait for responses instead of cancelling prematurely.

# Examples
"&#123;&#123;message&#125;&#125;..."

# Detection Logic
```detect
scan: requests
match: isCanceled == true
aggregate: ratio
check: ratio > thresholds.maxCancelRate
examples: "{{messageText | clip:80}}"
```
