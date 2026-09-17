---
title: "Harness Skill Creator"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/.agents/skills/harness-skill-creator/SKILL.md"
sourceRel: ".agents/skills/harness-skill-creator/SKILL.md"
rawUrl: "/raw/09-harness/better-harness/.agents/skills/harness-skill-creator/SKILL.md"
sourceSha256: "2a419ab35cf735570b054357c39cf7374c879006637da916bc5121e0a956b654"
pageSha256: "2a419ab35cf735570b054357c39cf7374c879006637da916bc5121e0a956b654"
contentMode: "local-full"
zh: ""
---

# Harness Skill Creator

Create the smallest skill that makes another agent repeat one harness job with
evidence, validation, and clear ownership.

## Workflow

1. Resolve source, target, and host: canonical `skills/<name>/`, `.agents/skills/` wrapper, or both.
2. Inspect the source chain before designing: entry `SKILL.md`, first-hop
   references, scripts, validators, templates, specs, tests, plugin manifests,
   and any real smoke evidence.
3. Load `references/bootstrap-patterns.md` after the first inventory. Use it to
   extract patterns, not product-specific rules.
4. Draft the minimum viable skill map:
   - skill name and trigger sentence
   - one job the skill owns
