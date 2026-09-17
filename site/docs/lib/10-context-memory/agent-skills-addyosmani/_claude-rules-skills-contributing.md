---
title: "Adding or changing a skill"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/.claude/rules/skills-contributing.md"
sourceRel: ".claude/rules/skills-contributing.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/.claude/rules/skills-contributing.md"
sourceSha256: "6f8ff659388c3b957322ac46f788ff16d996e5c751f71a6c1e59e4761c437bbd"
pageSha256: "6f8ff659388c3b957322ac46f788ff16d996e5c751f71a6c1e59e4761c437bbd"
contentMode: "local-full"
zh: ""
---

# Adding or changing a skill

This repo already covers most of the development lifecycle, so most new-skill ideas overlap an existing skill or an open PR. Before creating a new `skills/<name>/` directory or significantly reworking an existing one:

- Run the pre-flight checks in [CONTRIBUTING.md](https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/CONTRIBUTING.md#before-proposing-a-new-skill): search the catalog, check open PRs (`gh pr list --state open`), and justify the gap.
- Prefer extending an existing skill over adding a near-duplicate. If the idea overlaps an existing skill, edit that skill instead of adding a new directory.
- Keep the `SKILL.md` within [docs/skill-anatomy.md](/lib/10-context-memory/agent-skills-addyosmani/docs-skill-anatomy), and never duplicate content between skills, reference the other skill instead.

CONTRIBUTING.md is the single source of truth for the full workflow; this rule points to it rather than restating its checklist.
