---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md"
sourceRel: "guide/ultimate-guide.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ultimate-guide.md"
sourceSha256: "4d290b0171bbaaffd149d5d2e4da964392cb212d7357408df40d8f346f952dbc"
pageSha256: "a2eb6ba5842282ecdc70d39b0a4eda36b3b1f8c73ef1698d3575f2c8b1bad696"
contentMode: "local-full"
zh: ""
---

#### Configuration Hierarchy

Claude Code uses a three-tier configuration system with clear precedence:

```
~/.claude/settings.json          (global user defaults)
          ↓ overridden by
.claude/settings.json            (project settings, team shared)
          ↓ overridden by
.claude/settings.local.json      (machine-specific, personal)
```

**Precedence rules**:
- **Global** (`~/.claude/settings.json`): Applied to all projects unless overridden
- **Project** (`.claude/settings.json`): Shared team configuration, committed to Git
- **Local** (`.claude/settings.local.json`): Machine-specific overrides, gitignored

This hierarchy enables:
- **Team coordination**: Share hooks/rules in `.claude/settings.json`
- **Personal flexibility**: Override settings in `.local.json` without Git conflicts
- **Multi-machine consistency**: Global defaults in `~/.claude/` synced separately

> **Legacy note**: Claude Code still supports `~/.claude.json` for backward compatibility, but `~/.claude/settings.json` is the recommended location. CLI flags (e.g., `--teammate-mode in-process`) override all file-based settings.
