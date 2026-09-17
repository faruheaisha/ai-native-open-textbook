---
title: "superpowers-zh（AI 编程超能力 · 中文增强版）"
sourceId: "10-context-memory/superpowers-zh"
sourceTitle: "superpowers-zh（AI 编程超能力 · 中文增强版）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/jnMetaCode/superpowers-zh"
entryUrl: "https://github.com/jnMetaCode/superpowers-zh/blob/79ea5d262b7a1c7ce76a289390853bca51f940d4/RELEASE-NOTES.md"
sourceRel: "RELEASE-NOTES.md"
rawUrl: "/raw/10-context-memory/superpowers-zh/RELEASE-NOTES.md"
sourceSha256: "f7ce0934f1a3133903b4d4b2d98eb816f9f841cd224aec8c1ff101aecf21eea2"
pageSha256: "342851ed858a7345f2d831fd21bf11d33966845cc2456b75c6f0fff2853cfccd"
contentMode: "local-full"
zh: ""
---

## Upgrade Instructions

### Fresh Install

```bash
# In Claude Code
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

The plugin handles everything automatically.

### Upgrading from v1.x

1. **Backup your personal skills** (if you have any):
   ```bash
   cp -r ~/.config/superpowers/skills ~/superpowers-skills-backup
   ```

2. **Update the plugin:**
   ```bash
   /plugin update superpowers
   ```

3. **On next session start:**
   - Old installation will be backed up automatically
   - Fresh skills repo will be cloned
   - If you have GitHub CLI, you'll be offered the option to fork

4. **Migrate personal skills** (if you had any):
   - Create a branch in your local skills repo
   - Copy your personal skills from backup
   - Commit and push to your fork
   - Consider contributing back via PR
