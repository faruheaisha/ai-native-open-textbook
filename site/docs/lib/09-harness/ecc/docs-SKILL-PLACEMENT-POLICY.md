---
title: "Skill Placement and Provenance Policy"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/docs/SKILL-PLACEMENT-POLICY.md"
sourceRel: "docs/SKILL-PLACEMENT-POLICY.md"
rawUrl: "/raw/09-harness/ecc/docs/SKILL-PLACEMENT-POLICY.md"
sourceSha256: "c7bf4005573be3e63e4db3e483f6243c2a60c295c5ae78af837b11c117564465"
pageSha256: "c7bf4005573be3e63e4db3e483f6243c2a60c295c5ae78af837b11c117564465"
contentMode: "local-full"
zh: ""
---

# Skill Placement and Provenance Policy

This document defines where generated, imported, and curated skills belong, how they are identified, and what gets shipped.

## Skill Types and Placement

| Type | Root Path | Shipped | Provenance |
|------|-----------|---------|------------|
| Curated | `skills/` (repo) | Yes | Not required |
| Learned | `~/.claude/skills/learned/` | No | Required |
| Imported | `~/.claude/skills/imported/` | No | Required |
| Evolved | `~/.claude/homunculus/evolved/skills/` (global) or `projects/<hash>/evolved/skills/` (per-project) | No | Inherits from instinct source |

Curated skills live in the repo under `skills/`. Install manifests reference only curated paths. Generated and imported skills live under the user home directory and are never shipped.

## Curated Skills
