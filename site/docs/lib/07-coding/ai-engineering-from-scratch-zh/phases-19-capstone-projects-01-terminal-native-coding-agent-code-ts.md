---
title: "Capstone 19/01 — Terminal-Native Coding Agent (TypeScript)"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/19-capstone-projects/01-terminal-native-coding-agent/code/ts/README.md"
sourceRel: "phases/19-capstone-projects/01-terminal-native-coding-agent/code/ts/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/19-capstone-projects/01-terminal-native-coding-agent/code/ts/README.md"
sourceSha256: "cc0bc44f61c1561c30c4ca29ef947b7a9ad8e49a3c730f0cb4c91adf46bb5aa4"
pageSha256: "cc0bc44f61c1561c30c4ca29ef947b7a9ad8e49a3c730f0cb4c91adf46bb5aa4"
contentMode: "local-full"
zh: ""
---

# Capstone 19/01 — Terminal-Native Coding Agent (TypeScript)

Multi-file TypeScript harness for the plan/act/observe loop described in
`../docs/zh.md`. Offline, deterministic, zero network calls.

## Layout

```text
src/
  index.ts     entry point; runs a scripted demo and the eval, then exits 0
  repl.ts      interactive command parser (run / eval / help / quit)
  harness.ts   the plan-act-observe loop, wired through the hook bus
  hooks.ts     eight-event hook bus plus a destructive-command guard
  model.ts     scripted offline LLM that drives the demo
  tools.ts     read_file + run_shell with zod-validated args
  plan.ts     PlanState (todo rewrite) + Budget (turn / token / dollar ceilings)
  eval.ts      tiny pass/fail counter across three offline tasks
  types.ts     shared shape definitions
tests/
  harness.test.ts
  tools.test.ts
```

## Run

```bash
npm install
npm start                # runs the scripted demo + offline eval, exits 0
npm start -- --repl      # opens the interactive harness REPL
npm test                 # node --test runner via tsx
npm run typecheck        # tsc --noEmit
```

The non-interactive `npm start` path asserts that the eval reports `passed=3
failed=0` and that the scripted run converges to an all-done plan. Any drift
fails the run.
