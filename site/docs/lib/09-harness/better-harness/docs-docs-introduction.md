---
title: "Introduction"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/docs/introduction.md"
sourceRel: "docs/docs/introduction.md"
rawUrl: "/raw/09-harness/better-harness/docs/docs/introduction.md"
sourceSha256: "4334623b1e736530f9880b3e663b57f376bb9e8cb40f8b8ba467a52c01f99ccd"
pageSha256: "4334623b1e736530f9880b3e663b57f376bb9e8cb40f8b8ba467a52c01f99ccd"
contentMode: "local-full"
zh: ""
---

# Introduction

**Better Harness** provides open-source insights for the Agent Work Loop. It
turns project and session evidence into prioritized improvements and verifiable
next steps inside the coding agent you already use.

## Why Better Harness?

AI coding agents change code fast, but the workflow around them is often the
weak point:

- 🎯 **Fuzzy goals** — the agent confidently solves the wrong problem.
- 🧭 **Improvised steps** — work happens on paths nobody can reproduce.
- ✅ **"It works" without proof** — validation is incomplete or missing.
- 🚢 **Speed over safeguards** — review and delivery checks get bypassed.
- 🧠 **Lessons lost** — the same friction comes back on the next task.

Reviewing only the final diff misses these system-level problems. Better
Harness analyzes the workflow around the diff: it gathers project evidence
(and session evidence where supported), evaluates five connected dimensions,
and turns concrete gaps into prioritized findings — each tied to its evidence,
expected outcome, repair boundary, and validation route, so a team can improve
one issue at a time.

## What is open

Better Harness opens three connected layers, not only a slash-command prompt:

- **Engineering practices** — evidence and judgment guidance across
  [Session Evidence, Project Harness, Agent Customize, and Loop Engineering](https://github.com/QoderAI/better-harness/blob/main/references/README.md).
- **Evaluation model** — the task-centered
  [Agent Work Loop](/lib/09-harness/better-harness/docs-docs-concepts-agent-work-loop), including evidence states,
  findings, scoring boundaries, and longitudinal validation.
- **Runnable implementation** — the canonical
  [`/better-harness` workflow](https://github.com/QoderAI/better-harness/blob/main/skills/better-harness/SKILL.md),
  evidence collectors, analyzers, renderers, and thin
  [host adapters](/lib/09-harness/better-harness/docs-docs-hosts-adapter-matrix).

The three layers share the same boundary: configured assets can establish that
a mechanism exists, but only linked task evidence can establish that it was
used or improved an outcome.

## Deliberately honest

Unobserved behavior stays explicit instead of becoming an unsupported score or
claim. Passing a current check proves that the intervention was exercised;
only a comparable later result can prove that the loop improved.

## Next steps

- Check the [prerequisites](/lib/09-harness/better-harness/docs-docs-installation#prerequisites), then install
  Better Harness for your coding agent.
- [Generate your first report](/lib/09-harness/better-harness/docs-docs-your-first-report).
- Understand the [Agent Work Loop](/lib/09-harness/better-harness/docs-docs-concepts-agent-work-loop) behind every
  report.

:::info Source of truth
This site is a curated view. Canonical judgment lives in the
[repository](https://github.com/QoderAI/better-harness) under `skills/`,
`models/`, `references/`, and `docs/`.
:::
