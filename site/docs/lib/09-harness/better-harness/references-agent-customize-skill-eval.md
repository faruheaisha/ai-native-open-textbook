---
title: "Skill Evaluation Execution"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/references/agent-customize/skill-eval.md"
sourceRel: "references/agent-customize/skill-eval.md"
rawUrl: "/raw/09-harness/better-harness/references/agent-customize/skill-eval.md"
sourceSha256: "cc9575cb6c5b29a4d9aced703f72659e4a326598133acf97a6e789140c9da608"
pageSha256: "cc9575cb6c5b29a4d9aced703f72659e4a326598133acf97a6e789140c9da608"
contentMode: "local-full"
zh: ""
---

# Skill Evaluation Execution

Use this reference to run an evaluation of an existing Skill. Load
[Skill Quality Review](/lib/09-harness/better-harness/references-agent-customize-skill-review) for the Gates, D1-D8 scorecard, target
profiles, and E0-E3 evidence ceilings. Use
[Skill Discovery](/lib/09-harness/better-harness/references-agent-customize-skill-discovery) instead when the question is whether to
create or extend a Skill.

This protocol joins two complementary sources:

- Better Harness `agent-lint` supplies repository-aware, explicit-target E0
  evidence for frontmatter, descriptions, routed references, size, and
  progressive disclosure.
- Plugin Eval supplies a deterministic local `evaluation-result` document for
  structure, estimated context budgets, helper-code checks, and benchmark
  preparation.

Neither source proves selection, task lift, repeatability, safety in use, or a
later improved outcome by itself.

## Resolve the Evaluation Envelope

Record these fields before running commands:

- canonical absolute Skill directory and `SKILL.md` entrypoint;
- target host/client, users, distribution profile, and supported platforms;
- requested mode: static analysis, benchmark preparation, or measured run;
- model, tools, permissions, workspace fixture, and allowed side effects;
- Better Harness commit and Plugin Eval version or resolved script entrypoint.

Use `plugin-eval` when it is on `PATH`. When the plugin is installed but the
command is not linked, invoke its shipped Node entrypoint as
