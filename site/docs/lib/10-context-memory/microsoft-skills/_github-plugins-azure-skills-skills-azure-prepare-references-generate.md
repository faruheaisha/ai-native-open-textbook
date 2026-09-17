---
title: "Artifact Generation"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/generate.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/generate.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/generate.md"
sourceSha256: "797d9d4ab55633336081cf56bb0123d21e25380d85946c149fb63bb0934aa169"
pageSha256: "797d9d4ab55633336081cf56bb0123d21e25380d85946c149fb63bb0934aa169"
contentMode: "local-full"
zh: ""
---

# Artifact Generation

Generate infrastructure and configuration files based on selected recipe.

## ⛔ CRITICAL: Check for .NET Aspire Projects FIRST

**MANDATORY: Before generating any files, detect .NET Aspire projects:**

```bash
# Method 1: Find AppHost project files
find . -name "*.AppHost.csproj" -o -name "*AppHost.csproj"

# Method 2: Search for Aspire packages
grep -r "Aspire\.Hosting\|Aspire\.AppHost\.Sdk" . --include="*.csproj"
```

**If Aspire is detected:**
1. ⛔ **STOP** - Do NOT manually create `azure.yaml`
2. ⛔ **STOP** - Do NOT manually create `infra/` files
