---
title: "Remediation Patterns for Common azqr Findings"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compliance/references/azqr-remediation-patterns.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compliance/references/azqr-remediation-patterns.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compliance/references/azqr-remediation-patterns.md"
sourceSha256: "30380928a7932ec44efc026002aa313abe9df0642623eb70b72a9c4969be8244"
pageSha256: "30380928a7932ec44efc026002aa313abe9df0642623eb70b72a9c4969be8244"
contentMode: "local-full"
zh: ""
---

# Remediation Patterns for Common azqr Findings

This document provides remediation templates for frequently identified compliance issues.

## Storage Account Issues

### Enable Private Endpoints

**Issue:** Storage account accessible via public endpoint

**Azure CLI:**
```bash
# Create private endpoint
az network private-endpoint create \
  --name pe-storage \
