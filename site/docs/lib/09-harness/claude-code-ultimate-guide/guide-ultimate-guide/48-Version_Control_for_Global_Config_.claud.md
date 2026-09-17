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
pageSha256: "f8d58cbe6827b89e96f53adaff5b265df266609f7509aeffda4dd0236b0257b2"
contentMode: "local-full"
zh: ""
---

#### Version Control for Global Config (~/.claude/)

Your `~/.claude/` directory contains **global configuration** (settings, MCP servers, session history) that should be backed up but contains secrets.

**Recommended approach** (inspired by [Martin Ratinaud](https://www.linkedin.com/posts/martinratinaud_claudecode-devtools-buildinpublic-activity-7424055660247629824-hBsL), 504 sessions):

```bash
# 1. Create Git repo for global config
mkdir ~/claude-config-backup
cd ~/claude-config-backup
git init

# 2. Symlink directories (not files with secrets)
ln -s ~/.claude/agents ./agents
ln -s ~/.claude/commands ./commands
ln -s ~/.claude/hooks ./hooks
ln -s ~/.claude/skills ./skills

# 3. Copy settings template (without secrets)
cp ~/.claude/settings.json ./settings.template.json
# Manually replace secrets with ${VAR_NAME} placeholders

# 4. .gitignore for secrets
cat > .gitignore << EOF
# Never commit these
.env
settings.json           # Contains resolved secrets
mcp.json               # Contains API keys
*.local.json

# Session history (large, personal)
projects/
EOF

# 5. Commit and push to private repo
git add .
git commit -m "Initial Claude Code global config backup"
git remote add origin git@github.com:yourusername/claude-config-private.git
git push -u origin main
```

**Why symlinks?**
- Changes in `~/.claude/agents/` immediately reflected in Git repo
- No manual sync needed
- Works across macOS/Linux (Windows: use junction points)
