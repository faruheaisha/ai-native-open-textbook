---
title: "Troubleshooting: Create Foundry Resource"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/resource/create/references/troubleshooting.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/resource/create/references/troubleshooting.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/resource/create/references/troubleshooting.md"
sourceSha256: "5d8a48b6d39819f9439bdbd35ec15bee6eee3471bfd2ef29731e7f27523ee276"
pageSha256: "5d8a48b6d39819f9439bdbd35ec15bee6eee3471bfd2ef29731e7f27523ee276"
contentMode: "local-full"
zh: ""
---

# Troubleshooting: Create Foundry Resource

## Resource Creation Failures

### ResourceProviderNotRegistered

**Solution:**
1. If you have Owner/Contributor role, register the provider:
   ```bash
   az provider register --namespace Microsoft.CognitiveServices
   ```
2. If you lack permissions, ask a subscription Owner or Contributor to register it
3. Alternatively, ask them to grant you the `/register/action` privilege

### InsufficientPermissions

**Solution:**
```bash
# Check your role assignments
