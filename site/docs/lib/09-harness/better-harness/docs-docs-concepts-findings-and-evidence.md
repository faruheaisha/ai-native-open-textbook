---
title: "Findings & Evidence"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/docs/concepts/findings-and-evidence.md"
sourceRel: "docs/docs/concepts/findings-and-evidence.md"
rawUrl: "/raw/09-harness/better-harness/docs/docs/concepts/findings-and-evidence.md"
sourceSha256: "342dfff4104e77e15eab6c486b6fcbdfd127c618b277877e6c23696b12a5c2d5"
pageSha256: "342dfff4104e77e15eab6c486b6fcbdfd127c618b277877e6c23696b12a5c2d5"
contentMode: "local-full"
zh: ""
---

# Findings & Evidence

Better Harness is deliberately honest: every claim in a report is bounded by
what was actually observed. This page explains the boundaries that make a
report trustworthy.

## The evidence boundary

Three evidence domains stay independent until unified analysis:

- **Session evidence** — what agents actually did in relevant Task Episodes,
  where the host supports a real local session source.
- **Project evidence** — repository mechanisms: instructions, validation,
  hooks, delivery gates, and reusable knowledge routes.
- **Agent assets** — configured Skills, commands, rules, MCP tools, and
  instruction files.

The shared boundary across all three: **configured assets can establish that a
mechanism exists, but only linked task evidence can establish that it was used
or improved an outcome.**

## What a finding contains

Each finding turns one supported gap into an actionable row:

- **Impact** — why the gap matters for the work loop;
- **Evidence** — the visible source the finding is bounded by;
- **Expected output** — what "fixed" looks like;
- **Scoped repair** — a bounded fix plan draft for review;
- **Acceptance checks** — how to validate the repair landed.

Missing or partial evidence stays explicit in the report instead of becoming
an unsupported score or claim.

## The project lens: five software capabilities

Alongside the task-centered Agent Work Loop, the independent project-evidence
pass uses a static lens:

| Capability | Question it answers |
| --- | --- |
| Context Map | Can the agent find the right context, boundary, risk area, and next step? |
| Environment Readiness | Can the project set up, run, reset, and diagnose without guesswork? |
| Fast Feedback | Do relevant checks return useful feedback quickly after a change? |
| Quality Gates | Are architecture, security, schema, migration, and drift rules enforced? |
| Change Safety | Are risky actions, acceptance, and recovery controlled? |

Unobserved task behaviour is never treated as missing repository capability.

## Confidence

Reports rate confidence Low/Medium/High, bound to how much was actually
executed versus only read. Static-only first passes stay Low/Medium; passing a
current check proves the intervention was exercised, and only a comparable
later result can prove the loop improved.

## Going deeper

- One-page overview:
  [`docs/concepts.md`](https://github.com/QoderAI/better-harness/blob/main/docs/concepts.md)
- Model routing and advanced lenses:
  [`models/routing.md`](https://github.com/QoderAI/better-harness/blob/main/models/routing.md)
