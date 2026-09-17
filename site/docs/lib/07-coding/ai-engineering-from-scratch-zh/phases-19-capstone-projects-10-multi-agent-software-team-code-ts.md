---
title: "Multi-agent software team (TypeScript skeleton)"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/19-capstone-projects/10-multi-agent-software-team/code/ts/README.md"
sourceRel: "phases/19-capstone-projects/10-multi-agent-software-team/code/ts/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/19-capstone-projects/10-multi-agent-software-team/code/ts/README.md"
sourceSha256: "c80e9dad6bd96ca78cfb915fa87fd72dd4fa0b1be4b7664a82a00c46029394c4"
pageSha256: "c80e9dad6bd96ca78cfb915fa87fd72dd4fa0b1be4b7664a82a00c46029394c4"
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

- Source lesson: `phases/19-capstone-projects/10-multi-agent-software-team/docs/zh.md`
- [MetaGPT](https://github.com/FoundationAgents/MetaGPT) role-based multi-agent framework.
