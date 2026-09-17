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
pageSha256: "c91e47f0807021af5ae3766ae404bb27376369548d9215f49e05cc89fb66445f"
contentMode: "local-full"
zh: ""
---

#### Disaster Recovery

**Restore from backup**:

```bash
# From Git backup
cd ~/claude-config-backup
git clone git@github.com:yourusername/claude-config-private.git
cd claude-config-private

# Recreate symlinks
ln -sf ~/.claude/agents ./agents
ln -sf ~/.claude/commands ./commands
# ... etc

# Restore settings (fill in secrets manually or via .env)
cp settings.template.json ~/.claude/settings.json
# Edit and replace ${VAR_NAME} with actual values
```

**From tarball backup**:
```bash
cd ~/claude-backups
# Find latest backup
ls -lt claude-config-*.tar.gz | head -1

# Extract
tar -xzf claude-config-YYYY-MM-DD_HH-MM-SS.tar.gz -C ~/
```
