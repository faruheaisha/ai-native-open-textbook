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
pageSha256: "5f7bb64b9d38fdd90fc12c71552aa76986675f6e4fbe00679def227f491363ed"
contentMode: "local-full"
zh: ""
---

#### Backup Strategies

| Strategy | Pros | Cons | Use Case |
|----------|------|------|----------|
| **Git remote (private)** | Full version history, branching | Requires Git knowledge | Developers, power users |
| **Cloud sync (Dropbox/iCloud)** | Automatic, cross-device | No version history, sync conflicts | Solo users, simple setup |
| **Cron backup script** | Automated, timestamped | No cross-machine sync | Disaster recovery only |
| **Third-party tools** | `claudebot backup --config` | Dependency on external tool | Quick setup |

**Example: Automated backup with cron**:

```bash
# ~/claude-config-backup/backup.sh
#!/bin/bash
BACKUP_DIR=~/claude-backups
DATE=$(date +%Y-%m-%d_%H-%M-%S)

# Create timestamped backup
mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_DIR/claude-config-$DATE.tar.gz" \
    ~/.claude/agents \
    ~/.claude/commands \
    ~/.claude/hooks \
    ~/.claude/skills \
    ~/.claude/settings.json

# Keep only last 30 days
find "$BACKUP_DIR" -name "claude-config-*.tar.gz" -mtime +30 -delete

echo "Backup created: $BACKUP_DIR/claude-config-$DATE.tar.gz"
```

Schedule with cron:
```bash
# Backup daily at 2 AM
crontab -e
0 2 * * * ~/claude-config-backup/backup.sh >> ~/claude-backups/backup.log 2>&1
```
