---
title: "Intake"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/intake.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/intake.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/intake.md"
sourceSha256: "fcc87a339f53c720880fa90a422a1ddf0e8725409b5348f9ecc3c0e15fcc0601"
pageSha256: "fcc87a339f53c720880fa90a422a1ddf0e8725409b5348f9ecc3c0e15fcc0601"
contentMode: "local-full"
zh: ""
---

# Intake

Collect all inputs in one pass, tiered by priority. Extract implicit answers from the user’s message before asking. Use `AskUserQuestion` for unanswered items — batch related questions.

---

## Tier 1 — Core

### 1.0 Verify Subscription

Run:

```bash
az account show --query "{Name:name, Id:id, State:state}" -o table
```

Confirm with user. Switch if needed:

```bash
