---
title: "Claude Skills Meta-Skill"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-skills/SKILL.md"
sourceRel: "i18n/zh/skills/claude-skills/SKILL.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/claude-skills/SKILL.md"
sourceSha256: "f660d6a166c5231e5ec6bedb8797752ddcdb0ffe14137773ebe6ec92bdc3f6de"
pageSha256: "f660d6a166c5231e5ec6bedb8797752ddcdb0ffe14137773ebe6ec92bdc3f6de"
contentMode: "local-full"
zh: ""
---

# Claude Skills Meta-Skill

Turn scattered domain material into a Skill that is reusable, maintainable, and reliably activatable:
- `SKILL.md` as the entrypoint (triggers, constraints, patterns, examples)
- `references/` for long-form evidence and navigation
- optional `scripts/` and `assets/` for scaffolding and templates

## When to Use This Skill

Trigger this meta-skill when you need to:
- Create a new Skill from scratch from docs/specs/repos
- Refactor an existing Skill (too long, unclear, inconsistent, misfires)
- Design reliable activation (frontmatter + triggers + boundaries)
- Extract a clean Quick Reference from large material
- Split long content into navigable `references/`
- Add a quality gate and a validator

## Not For / Boundaries

This meta-skill is NOT:
- A domain Skill by itself (it builds domain Skills)
- A license to invent external facts (if the material does not prove it, say so and add a verification path)
- A substitute for required inputs (if inputs are missing, ask 1-3 questions before proceeding)

## Quick Reference

### Deliverables (What You Must Produce)

Your output MUST include:
