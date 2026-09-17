---
title: "Lesson 17 - Personal AI Tutor (TypeScript web app)"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/19-capstone-projects/17-personal-ai-tutor/code/ts/README.md"
sourceRel: "phases/19-capstone-projects/17-personal-ai-tutor/code/ts/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/19-capstone-projects/17-personal-ai-tutor/code/ts/README.md"
sourceSha256: "fe11cc56b3f2c5e9a580e6071d3074c5e5538c0c07def0f44b3425a766bd1d68"
pageSha256: "fe11cc56b3f2c5e9a580e6071d3074c5e5538c0c07def0f44b3425a766bd1d68"
contentMode: "local-full"
zh: ""
---

# Lesson 17 - Personal AI Tutor (TypeScript web app)

TypeScript half of the capstone. Python side ships the learner model and
tutor policy; this project exposes the web-app surface: a curriculum DAG
walker, a BKT-style learner model, and an FSRS-lite spaced-repetition
scheduler behind two HTTP routes.

## Layout

```text
src/
  index.ts       entry: demo (default) or HTTP server (--serve)
  server.ts      Hono routes (GET /lesson/next, POST /lesson/:id/submit)
  curriculum.ts  DAG fixture + Kahn topo sort + next-lesson picker
  mastery.ts     MasteryStore (per-lesson BKT-ish update)
  repetition.ts  scheduleNextDue (interval doubling / halving, clamped)
  types.ts       Lesson, Mastery, Pick
tests/
  curriculum.test.ts  topo order, BKT update, FSRS scheduling
```

## Run

```bash
npm install
npm run typecheck
npm test
npm start            # self-terminating curriculum walk
npm run serve        # HTTP server on :8090
```
