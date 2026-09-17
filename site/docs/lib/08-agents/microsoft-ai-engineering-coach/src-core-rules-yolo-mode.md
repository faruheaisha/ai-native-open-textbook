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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/yolo-mode.md"
sourceRel: "src/core/rules/yolo-mode.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/yolo-mode.md"
sourceSha256: "e464319d4e30bb0f081e0b8720ef32ad2ecae8b261c37c6a4fb8b0a9612128f7"
pageSha256: "e464319d4e30bb0f081e0b8720ef32ad2ecae8b261c37c6a4fb8b0a9612128f7"
contentMode: "local-full"
zh: ""
---

# Description
Detects when the vast majority of tool actions are auto-approved, meaning the agent runs virtually unsupervised.

# When Triggered
&#123;&#123;count&#125;&#125; of &#123;&#123;total&#125;&#125; tool actions (&#123;&#123;pct&#125;&#125;) were auto-approved. The agent is running virtually unsupervised.

# How to Improve
Disable blanket auto-approve. Review file edits, terminal commands, and web searches individually. Use session-scoped approval only for trusted, low-risk tools.

# Examples
Auto-approved: &#123;&#123;extra.tools&#125;&#125;

# Detection Logic
```detect
scan: requests
match: toolConfirmations.length > 0
aggregate: count
yolo: yoloStats(matched)
emitCount: yolo.autoApproved
emitTotal: yolo.totalConfirmations
check: yolo.ratio > thresholds.autoApproveRate AND yolo.totalConfirmations >= thresholds.minConfirmations
```
