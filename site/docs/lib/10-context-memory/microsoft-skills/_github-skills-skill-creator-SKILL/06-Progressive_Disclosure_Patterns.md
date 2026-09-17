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
pageSha256: "1eb077db9fa32a3f70246fdb294ebb4f017406d1b4e208b0c3a5daec707efac0"
contentMode: "local-full"
zh: ""
---

## Progressive Disclosure Patterns

### Pattern 1: High-Level Guide with References

```markdown
# SDK Name

## Quick Start

[Minimal example]

## Advanced Features

- **Streaming**: See [references/streaming.md](references/streaming.md)
- **Tools**: See [references/tools.md](references/tools.md)
```

### Pattern 2: Language Variants

```
azure-service-skill/
├── SKILL.md (overview + language selection)
└── references/
    ├── python.md
    ├── dotnet.md
    ├── go.md
    ├── java.md
    └── typescript.md
```

### Pattern 3: Feature Organization

```
azure-ai-agents/
├── SKILL.md (core workflow)
└── references/
    ├── tools.md
    ├── streaming.md
    ├── async-patterns.md
    └── error-handling.md
```
