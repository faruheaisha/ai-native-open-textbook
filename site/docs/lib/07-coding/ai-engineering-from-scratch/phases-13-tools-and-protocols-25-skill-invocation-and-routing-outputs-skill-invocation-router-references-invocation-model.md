---
title: "Invocation model"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/13-tools-and-protocols/25-skill-invocation-and-routing/outputs/skill-invocation-router/references/invocation-model.md"
sourceRel: "phases/13-tools-and-protocols/25-skill-invocation-and-routing/outputs/skill-invocation-router/references/invocation-model.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/13-tools-and-protocols/25-skill-invocation-and-routing/outputs/skill-invocation-router/references/invocation-model.md"
sourceSha256: "54b22c45aceecd9b4dea0ed5989d02238f052f2f71653259ff1727671d220a86"
pageSha256: "54b22c45aceecd9b4dea0ed5989d02238f052f2f71653259ff1727671d220a86"
contentMode: "local-full"
zh: ""
---

# Invocation model

| Channel | Initiator | Selection | Typical use |
|---|---|---|---|
| Explicit human | User | Exact discovered name | Deliberate workflow choice |
| Implicit model or agent | Model or autonomous agent | Description relevance plus host policy | Context-sensitive routing |
| Programmatic application | Product runtime | Exact configured name and target allowlist | Deterministic product workflow |
| Skill composition | Another skill or subagent | Exact target, caller identity, and depth policy | Bounded workflow dependency |
| Programmatic harness | Evaluation runtime | Exact configured name and target allowlist | Deterministic evaluation |

Human and model activation form a 2x2: neither, human only, model only, or both. Application, composition, and harness activation are separate channels with their own target, caller, and depth policies.

For implicit routing, apply actor and host-extension eligibility before relevance ranking. A blocked high-scoring skill is not the winner; remove it from the selection set and evaluate the remaining eligible candidates. Abstain if the eligible set is empty or its best score misses the threshold.

Fields such as `user-invocable` or `disable-model-invocation` may be meaningful to a particular host. An adapter may enforce them, but portable documentation must not claim that every runtime recognizes the same fields or values.
