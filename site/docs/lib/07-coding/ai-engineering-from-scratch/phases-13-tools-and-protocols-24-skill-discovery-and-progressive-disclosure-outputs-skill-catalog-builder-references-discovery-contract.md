---
title: "Discovery contract"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/13-tools-and-protocols/24-skill-discovery-and-progressive-disclosure/outputs/skill-catalog-builder/references/discovery-contract.md"
sourceRel: "phases/13-tools-and-protocols/24-skill-discovery-and-progressive-disclosure/outputs/skill-catalog-builder/references/discovery-contract.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/13-tools-and-protocols/24-skill-discovery-and-progressive-disclosure/outputs/skill-catalog-builder/references/discovery-contract.md"
sourceSha256: "14f19a276f66f304f8024bd92153c57186073be49d536021b8c82c889cc12de3"
pageSha256: "14f19a276f66f304f8024bd92153c57186073be49d536021b8c82c889cc12de3"
contentMode: "local-full"
zh: ""
---

# Discovery contract

Discovery has three disclosure levels:

1. Catalog: read the `name`, `description`, scope, and path required for routing.
2. Activation: load the selected SKILL.md body under an explicit size budget.
3. Execution support: load a directly named file such as `references/schema.md` only when needed.

The host owns scope locations, precedence, collision behavior, and budgets. The catalog builder must keep those choices visible in its output.

A portable one-level reference is a regular file in the skill directory or one immediate subdirectory. Reject absolute paths, `..`, backslashes, symlinks, and deeper chains.
