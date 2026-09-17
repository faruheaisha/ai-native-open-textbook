---
title: "Microsoft Agent Skills"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/skill-creator/SKILL.md"
sourceRel: ".github/skills/skill-creator/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/skills/skill-creator/SKILL.md"
sourceSha256: "15ce951aec071c813150e6794628664725c164223108792e15bd3db18e959da0"
pageSha256: "95a5611137f21253f524c59c05a313cb7b1449f37047bae2d6f9a67a4587cd45"
contentMode: "local-full"
zh: ""
---

## Skill Structure

**Quick reference:**

```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter (name, description)
│   └── Markdown instructions
└── Bundled Resources (optional)
    ├── scripts/      — Executable code
    ├── references/   — Documentation loaded as needed
    └── assets/       — Output resources (templates, images)
```

For Azure SDK skills, follow the **Skill Section Order** below. For domain skills, use your judgment to organize logically.

### SKILL.md Essentials

- **Frontmatter**: `name` and `description` (description triggers the skill)
- **Body**: Keep under 500 lines; split large skills into reference files

### Bundled Resources (Optional)

| Type          | When to Include                          | Examples                                                   |
| ------------- | ---------------------------------------- | ---------------------------------------------------------- |
| `scripts/`    | Reused code patterns                     | Auth setup, CLI scripts                                    |
| `references/` | Feature deep-dives and overflow examples | `capabilities.md` index, `non-hero-scenarios.md`, API docs |
| `assets/`     | Output templates                         | Boilerplate code, images                                   |
