---
title: "Microsoft Entra Agent ID"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/entra-agent-id/SKILL.md"
sourceRel: ".github/skills/entra-agent-id/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/skills/entra-agent-id/SKILL.md"
sourceSha256: "f002fdcfca1affe824a0e39dee0ebe000473a38663a4182d8b0484520ac36c38"
pageSha256: "f002fdcfca1affe824a0e39dee0ebe000473a38663a4182d8b0484520ac36c38"
contentMode: "local-full"
zh: ""
---

# Microsoft Entra Agent ID

Create and manage OAuth2-capable identities for AI agents using Microsoft Graph beta API.

> **Preview API** — All Agent Identity endpoints are under `/beta` only. Not available in `/v1.0`.

## Before You Start

Search `microsoft-docs` MCP for the latest Agent ID documentation:
- Query: "Microsoft Entra agent identity setup"
- Verify: API parameters match current preview behavior

## Conceptual Model

```
Agent Identity Blueprint (application)        ← one per agent type/project
  └── BlueprintPrincipal (service principal)   ← MUST be created explicitly
        ├── Agent Identity (SP): agent-1       ← one per agent instance
        ├── Agent Identity (SP): agent-2
        └── Agent Identity (SP): agent-3
```

## Prerequisites

### PowerShell (recommended for interactive setup)

```powershell
# Requires PowerShell 7+
Install-Module Microsoft.Graph.Beta.Applications -Scope CurrentUser -Force
```

### Python (for programmatic provisioning)

```bash
pip install azure-identity requests
```

### Required Entra Roles

One of: **Agent Identity Developer**, **Agent Identity Administrator**, or **Application Administrator**.

## Environment Variables

```bash
