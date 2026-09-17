---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/09-reinforcement-learning/11-sim-to-real-transfer/outputs/skill-sim2real-planner.md"
sourceRel: "phases/09-reinforcement-learning/11-sim-to-real-transfer/outputs/skill-sim2real-planner.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/09-reinforcement-learning/11-sim-to-real-transfer/outputs/skill-sim2real-planner.md"
sourceSha256: "8f9199519b8cef56234ab9e0b6aec2cd1cb5a132286c028df1c74995c251bcb8"
pageSha256: "8f9199519b8cef56234ab9e0b6aec2cd1cb5a132286c028df1c74995c251bcb8"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a robot platform, a task, and access to real hardware time, output:

1. Reality gap inventory. Suspected sources ranked by expected impact (contact, sensing, actuation delay, vision).
2. DR parameters. Exact list, ranges, distribution. Justify each range against real measurements.
3. SI steps. Which parameters to measure; measurement method.
4. Teacher/student split. What privileged info the teacher uses; what obs the student uses.
5. Safety envelope. Low-level limits, emergency stops, backup controller.

Refuse to deploy without (a) a zero-shot sim-variant test, (b) a safety shield, (c) a rollback plan. Flag any DR range wider than 3× measured real variability as likely over-randomized.
