---
title: "Commit and Push Everything"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/01-slash-commands/push-all.md"
sourceRel: "01-slash-commands/push-all.md"
rawUrl: "/raw/09-harness/claude-howto/01-slash-commands/push-all.md"
sourceSha256: "fb88aa31620bfebee13b901581b9c7ce31b532f8a03c01e8e3d0e8d0bbc8ea91"
pageSha256: "fb88aa31620bfebee13b901581b9c7ce31b532f8a03c01e8e3d0e8d0bbc8ea91"
contentMode: "local-full"
zh: ""
---

# Commit and Push Everything

⚠️ **CAUTION**: Stage ALL changes, commit, and push to remote. Use only when confident all changes belong together.

## Workflow

### 1. Analyze Changes
Run in parallel:
- `git status` - Show modified/added/deleted/untracked files
- `git diff --stat` - Show change statistics
- `git log -1 --oneline` - Show recent commit for message style

### 2. Safety Checks

**❌ STOP and WARN if detected:**
- Secrets: `.env*`, `*.key`, `*.pem`, `credentials.json`, `secrets.yaml`, `id_rsa`, `*.p12`, `*.pfx`, `*.cer`
- API Keys: Any `*_API_KEY`, `*_SECRET`, `*_TOKEN` variables with real values (not placeholders like `your-api-key`, `xxx`, `placeholder`)
- Large files: `>10MB` without Git LFS
- Build artifacts: `node_modules/`, `dist/`, `build/`, `__pycache__/`, `*.pyc`, `.venv/`
- Temp files: `.DS_Store`, `thumbs.db`, `*.swp`, `*.tmp`

**API Key Validation:**
Check modified files for patterns like:
```bash
OPENAI_API_KEY=sk-proj-xxxxx  # ❌ Real key detected!
AWS_SECRET_KEY=AKIA...         # ❌ Real key detected!
STRIPE_API_KEY=sk_live_...    # ❌ Real key detected!

# ✅ Acceptable placeholders:
API_KEY=your-api-key-here
SECRET_KEY=placeholder
TOKEN=xxx
