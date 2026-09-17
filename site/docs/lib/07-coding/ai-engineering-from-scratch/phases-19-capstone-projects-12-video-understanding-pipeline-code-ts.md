---
title: "Lesson 12 - Video Understanding Pipeline (TypeScript UI)"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/19-capstone-projects/12-video-understanding-pipeline/code/ts/README.md"
sourceRel: "phases/19-capstone-projects/12-video-understanding-pipeline/code/ts/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/19-capstone-projects/12-video-understanding-pipeline/code/ts/README.md"
sourceSha256: "6e73c161096162d7a83bf33de271fbbaf5b113777a63fe81ac3079dc7e4b35f7"
pageSha256: "6e73c161096162d7a83bf33de271fbbaf5b113777a63fe81ac3079dc7e4b35f7"
contentMode: "local-full"
zh: ""
---

# Lesson 12 - Video Understanding Pipeline (TypeScript UI)

TypeScript half of the capstone. The Python side (`code/main.py`) owns the
multi-vector index and temporal grounding. This project ships the dashboard
half: a Hono app over the four pipeline stages (chunk, embed, index, qa).

## Layout

```text
src/
  index.ts     entry: demo (default) or HTTP server (--serve)
  server.ts    Hono routes (/, /jobs, /job/:id) + HTML index
  jobs.ts     JobStore + fixture seeder
  stages.ts    stage advance + overall status
  types.ts     Stage, StageState, Job
tests/
  stages.test.ts  job state transitions + store
```

## Run

```bash
npm install
npm run typecheck
npm test
npm start              # self-terminating demo
npm run serve          # HTTP server on :8123
```
