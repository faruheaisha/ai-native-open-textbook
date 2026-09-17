---
title: "Plugin Creator"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.system/plugin-creator/SKILL.md"
sourceRel: "skills/.system/plugin-creator/SKILL.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.system/plugin-creator/SKILL.md"
sourceSha256: "3b43cb214f458a1ae13e1b93a69e493241d8e12c5a474afe8ae81ae0507aa216"
pageSha256: "3b43cb214f458a1ae13e1b93a69e493241d8e12c5a474afe8ae81ae0507aa216"
contentMode: "local-full"
zh: ""
---

# Plugin Creator

## Quick Start

1. Run the scaffold script:

```bash
  # Plugin names are normalized to lower-case hyphen-case and must be <= 64 chars.
  # The generated folder and plugin.json name are always the same.
# Run from repo root (or replace .agents/... with the absolute path to this SKILL).
