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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/late-night-coding.md"
sourceRel: "src/core/rules/late-night-coding.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/late-night-coding.md"
sourceSha256: "b643c3cda79adcac7e0a5b60dcce4ae256b182d5706f059199b6c1ef9d010348"
pageSha256: "b643c3cda79adcac7e0a5b60dcce4ae256b182d5706f059199b6c1ef9d010348"
contentMode: "local-full"
zh: ""
---

# Description
Detects requests made between midnight and early morning. Late-night coding correlates with more bugs and lower quality output.

# When Triggered
&#123;&#123;count&#125;&#125; requests were made between midnight and &#123;&#123;extra.lateNightHour&#125;&#125;am. Late-night coding correlates with more bugs and lower quality.

# How to Improve
Consider establishing healthier work hours. Quality drops significantly when fatigued.

# Examples
&#123;&#123;extra.timestamp&#125;&#125;: "&#123;&#123;message&#125;&#125;..."

# Detection Logic
```detect
scan: requests
match: timestamp > 0 AND hour(timestamp) >= 0 AND hour(timestamp) < thresholds.lateNightHour
aggregate: count
check: count > thresholds.minSample
examples: "{{messageText | truncate:50}}"
```
