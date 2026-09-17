---
title: "Skill catalog builder"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/13-tools-and-protocols/24-skill-discovery-and-progressive-disclosure/outputs/skill-catalog-builder/SKILL.md"
sourceRel: "phases/13-tools-and-protocols/24-skill-discovery-and-progressive-disclosure/outputs/skill-catalog-builder/SKILL.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/13-tools-and-protocols/24-skill-discovery-and-progressive-disclosure/outputs/skill-catalog-builder/SKILL.md"
sourceSha256: "85b778e99d31b44a6a322d34a0d2afbfc9a4102f448a45b8ef2ada18d0396ad2"
pageSha256: "85b778e99d31b44a6a322d34a0d2afbfc9a4102f448a45b8ef2ada18d0396ad2"
contentMode: "local-full"
zh: ""
---

# Skill catalog builder

Use this skill when an agent host needs deterministic discovery across more than one skill directory.

1. Read `references/discovery-contract.md`.
2. Review the example host policy in `assets/scope-policy.json`; do not assume its order is universal.
3. Run `python3 scripts/build_catalog.py project=PATH user=PATH` with scopes listed from highest to lowest precedence.
4. Inspect the JSON `collisions` and `omitted` arrays before activating a skill.
5. Load only the selected SKILL.md body. Load a direct reference only when that body names it.

Never execute a bundled script during discovery. Never choose an equal-precedence duplicate by incidental filesystem order.

Return the catalog budget, selected entries, collision resolutions, and omissions.
