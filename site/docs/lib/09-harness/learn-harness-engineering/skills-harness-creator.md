---
title: "harness-creator"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/skills/harness-creator/README.md"
sourceRel: "skills/harness-creator/README.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/skills/harness-creator/README.md"
sourceSha256: "f388d7869cf5e383c811726ee694a686b115dfe2b940df4edb048a9be8e3f498"
pageSha256: "f388d7869cf5e383c811726ee694a686b115dfe2b940df4edb048a9be8e3f498"
contentMode: "local-full"
zh: ""
---

# harness-creator

A compact skill for building and auditing harnesses around AI coding agents.

It helps a repository provide five things agents need: instructions, state, verification, scope boundaries, and lifecycle handoff.

## Install

```bash
npx skills add walkinglabs/learn-harness-engineering --skill harness-creator
```

Or copy `skills/harness-creator/` into your skill path.

## Use

```bash
node skills/harness-creator/scripts/create-harness.mjs --target /path/to/project
node skills/harness-creator/scripts/validate-harness.mjs --target /path/to/project
node skills/harness-creator/scripts/run-benchmark.mjs --target /path/to/project --html /path/to/report.html
```

The scripts use only Node.js built-in modules. They can be run after copying the skill directory into another repository.

## What It Creates

- `AGENTS.md` or `CLAUDE.md`
- `feature_list.json`
- `progress.md`
- `init.sh`
- `session-handoff.md`

`create-harness.mjs` detects common project types and package managers. It supports Node/npm/pnpm/yarn/bun, Python, Go, Rust, Maven, Gradle, and .NET at a basic verification-command level.

## What It Checks

`validate-harness.mjs` scores the five harness subsystems:

1. Instructions
2. State
3. Verification
4. Scope
5. Lifecycle

The score is structural. It tells you whether the harness is present and coherent; it does not replace real before/after agent-session testing.

## Status

- [x] Minimal harness scaffolding
- [x] Five-subsystem validation
- [x] HTML assessment report
- [x] Structural benchmark report
- [x] 10 eval cases
- [x] Generic verification detection for common stacks
- [ ] Optional real before/after agent-session replay

## Files

```text
harness-creator/
├── SKILL.md
├── metadata.json
├── agents/openai.yaml
├── scripts/
│   ├── create-harness.mjs
│   ├── validate-harness.mjs
│   ├── render-assessment-html.mjs
│   ├── run-benchmark.mjs
│   └── lib/harness-utils.mjs
├── templates/
│   ├── agents.md
│   ├── feature-list.json
│   ├── feature-list.schema.json
│   ├── init.sh
│   ├── progress.md
│   └── session-handoff.md
├── references/
└── evals/evals.json
```

## Boundaries

This skill is for harness engineering, not model selection, prompt tuning alone, or app architecture. Keep project-specific facts in the target repository.
