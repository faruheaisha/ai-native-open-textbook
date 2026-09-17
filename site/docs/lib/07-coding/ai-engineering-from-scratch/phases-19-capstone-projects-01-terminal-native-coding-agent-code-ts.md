---
title: "Capstone 19/01 — Terminal-Native Coding Agent (TypeScript)"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/19-capstone-projects/01-terminal-native-coding-agent/code/ts/README.md"
sourceRel: "phases/19-capstone-projects/01-terminal-native-coding-agent/code/ts/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/19-capstone-projects/01-terminal-native-coding-agent/code/ts/README.md"
sourceSha256: "c0d929f165f34a1d4e05abc47c726de95a609bf5233a155622f13debe93d8e83"
pageSha256: "c0d929f165f34a1d4e05abc47c726de95a609bf5233a155622f13debe93d8e83"
contentMode: "local-full"
zh: ""
---

# Capstone 19/01 — Terminal-Native Coding Agent (TypeScript)

Multi-file TypeScript harness for the plan/act/observe loop described in
`../docs/en.md`. Offline, deterministic, zero network calls.

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
