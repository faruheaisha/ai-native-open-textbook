---
title: "Multi-agent software team (TypeScript skeleton)"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/19-capstone-projects/10-multi-agent-software-team/code/ts/README.md"
sourceRel: "phases/19-capstone-projects/10-multi-agent-software-team/code/ts/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/19-capstone-projects/10-multi-agent-software-team/code/ts/README.md"
sourceSha256: "f0c2194289c9224e328a9cd26953fee532c58f56c4f51e16e78ef25d26cd3270"
pageSha256: "f0c2194289c9224e328a9cd26953fee532c58f56c4f51e16e78ef25d26cd3270"
contentMode: "local-full"
zh: ""
---

# Multi-agent software team (TypeScript skeleton)

Multi-file TypeScript skeleton for the multi-agent software team capstone.
Planner, coder, and reviewer agents share a workspace and rotate through a
coordinator. A worktree stub launches child processes via execFile with a
denylist and a shell-metachar refusal.

## Layout

- `src/index.ts` — demo runner.
- `src/agent.ts` — base `Agent` class plus `PlannerAgent`, `CoderAgent`, `ReviewerAgent`.
- `src/coordinator.ts` — round-robin loop and rotation tracking.
- `src/workspace.ts` — shared in-memory filesystem and message log.
- `src/runtime.ts` — `child_process.execFile` worktree stub with denylist.
- `src/types.ts` — shared types.
- `tests/*.test.ts` — `node --test` style tests via `tsx`.

## Install

```bash
npm install
```

## Run

```bash
npm start
```

## Verify

```bash
npm run typecheck
npm test
```

## Spec references

- Source lesson: `phases/19-capstone-projects/10-multi-agent-software-team/docs/en.md`
- [MetaGPT](https://github.com/FoundationAgents/MetaGPT) role-based multi-agent framework.
