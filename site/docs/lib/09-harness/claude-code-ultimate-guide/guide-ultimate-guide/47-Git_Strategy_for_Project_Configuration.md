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
pageSha256: "4cedd25ff464eb0550638ee4783659216951d56cfe97fbf3a2e2b3079a84417b"
contentMode: "local-full"
zh: ""
---

#### Git Strategy for Project Configuration

**What to commit** (`.claude/` in project):

```gitignore
# .gitignore for project root
.claude/CLAUDE.md           # Personal instructions
.claude/settings.local.json # Machine-specific overrides
.claude/plans/              # Saved plan files (optional)
```

**What to share**:
```bash
git add .claude/settings.json      # Team hooks/permissions
git add .claude/agents/            # Custom agents
git add .claude/commands/          # Slash commands
git add .claude/hooks/             # Automation scripts
git add .claude/rules/             # Team conventions
git add .claude/skills/            # Knowledge modules
```
