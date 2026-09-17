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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/premium-waste.md"
sourceRel: "src/core/rules/premium-waste.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/premium-waste.md"
sourceSha256: "1e18165081d0c511a2770162b797f83538e9bd54424d4d137e91271b0b6a17d0"
pageSha256: "1e18165081d0c511a2770162b797f83538e9bd54424d4d137e91271b0b6a17d0"
contentMode: "local-full"
zh: ""
---

# Description
Detects simple requests (short prompt, no code output) that use premium models unnecessarily.

# When Triggered
&#123;&#123;count&#125;&#125; simple requests (short prompt, no code output) used premium models.

# How to Improve
Use lighter models for quick questions and simple tasks. Reserve premium models for complex code generation.

# Examples
&#123;&#123;extra.model&#125;&#125;: "&#123;&#123;message&#125;&#125;..."

# Detection Logic
```detect
scan: requests
match: modelTier(modelId) >= 1 AND messageLength < thresholds.maxMessageLength AND messageLength > 0 AND aiCode.length == 0
aggregate: count
check: count > thresholds.minSample
examples: {{normalizeModel(modelId)}}: "{{messageText | truncate:50}}"
```
