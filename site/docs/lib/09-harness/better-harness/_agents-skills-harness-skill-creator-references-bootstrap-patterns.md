---
title: "Bootstrap Patterns"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/.agents/skills/harness-skill-creator/references/bootstrap-patterns.md"
sourceRel: ".agents/skills/harness-skill-creator/references/bootstrap-patterns.md"
rawUrl: "/raw/09-harness/better-harness/.agents/skills/harness-skill-creator/references/bootstrap-patterns.md"
sourceSha256: "cc766099ea70ad9b98b1bd1000e4f2e57906d52b5b2217979d459e19967cea33"
pageSha256: "cc766099ea70ad9b98b1bd1000e4f2e57906d52b5b2217979d459e19967cea33"
contentMode: "local-full"
zh: ""
---

# Bootstrap Patterns

Use this after reading the source chain; extract transferable skill shape, not source policy.

## Pattern Extraction

| Source surface    | What to extract                                         | What to leave behind                   |
|-------------------|---------------------------------------------------------|----------------------------------------|
| Entry `SKILL.md`  | Trigger scope, non-goals, first-hop routing             | Long explanation and product names     |
| References        | Evidence boundaries, output contracts, validation gates | Source-only organization policy        |
| Scripts           | Stable commands that prove behavior                     | Exploratory debugging commands         |
| Templates         | Required output fields and reader contract              | Decorative examples                    |
| Tests             | Parser-safe assertions and failure cases                | Snapshot noise                         |
| Plugin/host files | Discovery path and wrapper shape                        | Host-specific implementation detail    |
| Forward-test logs | Repeated model failures to guard against                | Model self-reports without local proof |

For a `harness-analysis`-like source, the reusable shape is:

1. short entrypoint
2. first-hop references
3. deterministic validator
4. visible output contract
5. model smoke that is weaker than local validation

## Minimum Skill Shape

Start with one canonical skill:

```text
skills/<name>/
  SKILL.md
