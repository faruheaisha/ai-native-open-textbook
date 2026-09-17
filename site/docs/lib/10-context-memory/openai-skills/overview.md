---
title: "Agent Skills"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/README.md"
sourceRel: "README.md"
rawUrl: "/raw/10-context-memory/openai-skills/README.md"
sourceSha256: "0f6a07580f3c627253e15a58dd0439e135049ec38eb16cf3587f7e50abc6f590"
pageSha256: "0f6a07580f3c627253e15a58dd0439e135049ec38eb16cf3587f7e50abc6f590"
contentMode: "local-full"
zh: ""
---

# Agent Skills

Agent Skills are folders of instructions, scripts, and resources that AI agents can discover and use to perform at specific tasks. Write once, use everywhere.

Codex uses skills to help package capabilities that teams and individuals can use to complete specific tasks in a repeatable way. This repository catalogs skills for use and distribution with Codex.

Learn more:
- [Using skills in Codex](https://developers.openai.com/codex/skills)
- [Create custom skills in Codex](https://developers.openai.com/codex/skills/create-skill)
- [Agent Skills open standard](https://agentskills.io)

## Installing a skill

Skills in [`.system`](https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.system/README.md) are automatically installed in the latest version of Codex.

To install [curated](https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/README.md) or [experimental](https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.experimental/README.md) skills, you can use the `$skill-installer` inside Codex.

Curated skills can be installed by name (defaults to `skills/.curated`):

```
$skill-installer gh-address-comments
```

For experimental skills, specify the skill folder. For example:

```
$skill-installer install the create-plan skill from the .experimental folder
```

Or provide the GitHub directory URL:

```
$skill-installer install https://github.com/openai/skills/tree/main/skills/.experimental/create-plan
```

After installing a skill, restart Codex to pick up new skills.
