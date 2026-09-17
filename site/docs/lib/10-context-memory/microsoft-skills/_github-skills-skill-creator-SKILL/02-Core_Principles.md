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
pageSha256: "1b30d6cb4276e8baa20f8baa16b208b4cd62c6ba57aeebb94ca319afb2b9be38"
contentMode: "local-full"
zh: ""
---

## Core Principles

### 1. Concise is Key

The context window is a shared resource. Challenge each piece: "Does this justify its token cost?"

**For domain/procedural skills**: Agents are already capable. Only add what they don't already know.

**For SDK/API skills**: Users MUST provide SDK package name, documentation URL, or repository reference. The skill cannot be created without this context.

### 2. Fresh Documentation First

**Azure SDKs change constantly.** Skills should instruct agents to verify documentation:

```markdown
## Before Implementation

Search `microsoft-docs` MCP for current API patterns:

- Query: "[SDK name] [operation] python"
- Verify: Parameters match your installed SDK version
```

### 3. Degrees of Freedom

Match specificity to implementation constraints. High freedom when approaches vary; low freedom when precise execution is required:

| Freedom    | When                             | Example          |
| ---------- | -------------------------------- | ---------------- |
| **High**   | Multiple valid approaches        | Text guidelines  |
| **Medium** | Preferred pattern with variation | Pseudocode       |
| **Low**    | Must be exact                    | Specific scripts |

### 4. Progressive Disclosure

Skills load in three levels:

1. **Metadata** (~100 words) — Always in context
2. **SKILL.md body** (<5k words) — When skill triggers
3. **References** (unlimited) — As needed

**Keep SKILL.md under 500 lines.** Split into reference files when approaching this limit.
