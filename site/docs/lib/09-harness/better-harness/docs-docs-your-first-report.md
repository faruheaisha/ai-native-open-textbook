---
title: "Your First Report"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/docs/your-first-report.md"
sourceRel: "docs/docs/your-first-report.md"
rawUrl: "/raw/09-harness/better-harness/docs/docs/your-first-report.md"
sourceSha256: "3b3dbe87c9860097e032bae885fc280555dea3cffd38e405cd2ef3a1cabc3695"
pageSha256: "3b3dbe87c9860097e032bae885fc280555dea3cffd38e405cd2ef3a1cabc3695"
contentMode: "local-full"
zh: ""
---

# Your First Report

Once Better Harness is [installed](/lib/09-harness/better-harness/docs-docs-installation), open the repository
you want to analyze and start a new session or task. Use the invocation shown in
your host's **Verify installation** section—the syntax is host-specific:

- Claude Code, Qoder, Cursor, and Qwen Code use the documented
  `/better-harness` report prompt.
- Codex Desktop uses `@better-harness`; Codex CLI uses
  `$better-harness:better-harness`.
- For GitHub Copilot, first confirm that `copilot skill list` includes
  `better-harness`, then ask Copilot to use that Skill for the analysis. The site
  does not claim an unverified slash-command alias.

Better Harness scopes behavior claims to relevant Task Episodes and the
surrounding project mechanisms. Qoder and Cursor produce host-native Canvas
reports; Claude Code, Codex, Qwen Code, and GitHub Copilot produce
self-contained HTML with paired Markdown. Missing or partial evidence remains
explicit.

See the [sample report](https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/docs/pathname:/demo/better-harness-report/README.md) for
what the HTML output looks like.

## Reading the report

The report combines the five-part Agent Work Loop overview, prioritized
findings, detected agent assets, and an evidence brief. Read it through the
[five work-loop questions](/lib/09-harness/better-harness/docs-docs-concepts-agent-work-loop); session evidence
changes confidence and coverage, not the model.

## From report to action

A report is the start of a loop, not a verdict. Each finding is a row with a
next step, so a score turns into a change:

1. **Draft a bounded fix.** Run `/better-harness repair-plan` to validate one
   finding and draft a scoped repair plan, without writing new report
   artifacts.
2. **Give recurring work an owner.** When a finding looks like repeated work,
   route it through
   [Loop Discovery](https://github.com/QoderAI/better-harness/blob/main/references/loop-engineering/loop-discovery.md)
   to pick the smallest durable owner: a skill, hook, script, automation, or
   rule.
3. **Schedule follow-up.** A schedule-ready finding renders a row-scoped
   `/schedule /better-harness` handoff with cadence, validation, and a stop
   condition.
4. **Confirm movement.** Re-run the analysis to check the change landed and the
   capability signal moved.

## Static-only inspection

From a source checkout, you can inspect repository evidence without reading
local sessions:

```bash
node scripts/better-harness.mjs report --no-sessions
```
