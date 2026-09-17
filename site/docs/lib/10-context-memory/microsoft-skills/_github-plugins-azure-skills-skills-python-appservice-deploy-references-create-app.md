---
title: "Create RG + App Service Plan + Web App (Linux, P0v3)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/python-appservice-deploy/references/create-app.md"
sourceRel: ".github/plugins/azure-skills/skills/python-appservice-deploy/references/create-app.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/python-appservice-deploy/references/create-app.md"
sourceSha256: "cee57397c4bf60bc45f039c402a606d028c0ecb71e3ac90b65d9cf5937295e78"
pageSha256: "cee57397c4bf60bc45f039c402a606d028c0ecb71e3ac90b65d9cf5937295e78"
contentMode: "local-full"
zh: ""
---

# Create RG + App Service Plan + Web App (Linux, P0v3)

Creates resources only when missing — every step is `show || create` (idempotent against existing user-supplied names).

> 💡 **Shell note**: Bash blocks below use `\` line continuation, `||`, `2>/dev/null`, `$(…)`. PowerShell equivalents are shown alongside where the bash form doesn't round-trip — substitute `` ` `` for `\`, `2>$null` for `2>/dev/null`, and `$LASTEXITCODE` checks for `||`.

## 1. Resolve Azure context — minimize prompts

**Ask the user at most ONE question (the app name).** Derive everything else. If the user's request already names an RG / Plan / region / subscription (e.g. *"deploy to my-team-rg in westus3"*), use those values verbatim and skip the corresponding derivation — the `show || create` flow below works against existing resources.

### 1a. Subscription
```bash
az account show --query id -o tsv
```
If unset, prompt the user to `az login`. Only call `ask_user` if multiple subscriptions are configured and no default is set.

### 1b. App name
Ask the user **once**:
> "What name would you like for your App Service? (Press Enter to auto-generate one.)"

If empty / "any" / "you choose", call the generator script — it implements the slug rules (lowercase, hyphen-collapse, ≤ 40 chars, `^[a-z][a-z0-9-]\{1,38\}[a-z0-9]$`) and an 8-hex-char GUID suffix:

- Bash / zsh: [`scripts/generate-app-name.sh`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/python-appservice-deploy/scripts/generate-app-name.sh) → `APP_NAME=$(./scripts/generate-app-name.sh [folder])`
- PowerShell: [`scripts/generate-app-name.ps1`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/python-appservice-deploy/scripts/generate-app-name.ps1) → `$appName = & .\scripts\generate-app-name.ps1 [-FolderName <folder>]`

Example: folder `my-flask-app/` → `my-flask-app-a3f9c1d2`.

### 1c. Derived names (use only when user did not specify)
| Resource | Default |
|---|---|
