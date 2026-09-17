---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/09-reinforcement-learning/11-sim-to-real-transfer/outputs/skill-sim2real-planner.md"
sourceRel: "phases/09-reinforcement-learning/11-sim-to-real-transfer/outputs/skill-sim2real-planner.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/09-reinforcement-learning/11-sim-to-real-transfer/outputs/skill-sim2real-planner.md"
sourceSha256: "8f9199519b8cef56234ab9e0b6aec2cd1cb5a132286c028df1c74995c251bcb8"
pageSha256: "8f9199519b8cef56234ab9e0b6aec2cd1cb5a132286c028df1c74995c251bcb8"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a robot platform, a task, and access to real hardware time, output:

1. Reality gap inventory. Suspected sources ranked by expected impact (contact, sensing, actuation delay, vision).
2. DR parameters. Exact list, ranges, distribution. Justify each range against real measurements.
3. SI steps. Which parameters to measure; measurement method.
4. Teacher/student split. What privileged info the teacher uses; what obs the student uses.
5. Safety envelope. Low-level limits, emergency stops, backup controller.

Refuse to deploy without (a) a zero-shot sim-variant test, (b) a safety shield, (c) a rollback plan. Flag any DR range wider than 3× measured real variability as likely over-randomized.
