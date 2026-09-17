---
title: "Global Rules"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/global-rules.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/global-rules.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/global-rules.md"
sourceSha256: "06eb3ddc42c075d1fa656c556ea4ae10e78bc88c6eec7a39f0b387dbb3d0c998"
pageSha256: "06eb3ddc42c075d1fa656c556ea4ae10e78bc88c6eec7a39f0b387dbb3d0c998"
contentMode: "local-full"
zh: ""
---

# Global Rules

> **MANDATORY** — These rules apply to ALL skills. Violations are unacceptable.

## Rule 1: Destructive Actions Require User Confirmation

⛔ **ALWAYS use `ask_user`** before ANY destructive action.

### What is Destructive?

| Category | Examples |
|----------|----------|
| **Delete** | `az group delete`, `azd down`, `rm -rf`, delete resource |
| **Overwrite** | Replace existing files, overwrite config, reset settings |
| **Irreversible** | Purge Key Vault, delete storage account, drop database |
| **Cost Impact** | Provision expensive resources, scale up significantly |
| **Security** | Expose secrets, change access policies, modify RBAC |

### How to Confirm

```
ask_user(
  question: "This will permanently delete resource group 'rg-myapp'. Continue?",
  choices: ["Yes, delete it", "No, cancel"]
)
```

### No Exceptions

- Do NOT assume user wants to delete/overwrite
- Do NOT proceed based on "the user asked to deploy" (deploy ≠ delete old)
- Do NOT batch destructive actions without individual confirmation
