---
title: "Microsoft Entra SDK for AgentID: Polyglot Agent Authentication"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/entra-agent-id/references/sdk-sidecar.md"
sourceRel: ".github/skills/entra-agent-id/references/sdk-sidecar.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/skills/entra-agent-id/references/sdk-sidecar.md"
sourceSha256: "d3c9b7946756c188a02682cf324fceacf7ba789b8af8dfecbbdc16706e5ee1de"
pageSha256: "d3c9b7946756c188a02682cf324fceacf7ba789b8af8dfecbbdc16706e5ee1de"
contentMode: "local-full"
zh: ""
---

# Microsoft Entra SDK for AgentID: Polyglot Agent Authentication

Containerized companion service that handles token management for AI agents via HTTP — any language, any framework.

> **Preview** — Image: `mcr.microsoft.com/entra-sdk/auth-sidecar:<tag>`. Check [GitHub releases](https://github.com/AzureAD/microsoft-identity-web/releases) for tags.

## Architecture

```
Client App → Your Agent (Python/Node/Go/Java) → Microsoft Entra SDK for AgentID (localhost:5000) → Microsoft Entra ID
                                                                    ↓
                                                              Downstream APIs
```

The Microsoft Entra SDK for AgentID runs as a companion container in the same pod or Docker network. Your agent calls it over HTTP — no SDK embedding required.

### Agent Integration (3P and Custom Agents)

Third-party and custom agents authenticate using the Blueprint → BlueprintPrincipal → AgentIdentity hierarchy. The Microsoft Entra SDK for AgentID acquires tokens for these agent identities — whether you are building your own custom agent or integrating a third-party agent:

```
                        GET /AuthorizationHeaderUnauthenticated/graph
                              ?AgentIdentity={agent-app-id}
┌──────────────────┐   ─────────────────────────────────▶  ┌─────────────────────────────┐
│  Agent           │                                       │  Microsoft Entra SDK        │
│  (any language)  │   ◀─────────────────────────────────  │  for AgentID (:5000)        │
│                  │    { authorizationHeader:             │                             │
└────────┬─────────┘      "Bearer eyJ..." }                │  · AzureAd Config (Tenant,  │
         │                                                 │    ClientId, FIC)           │
         │                                                 │  · Agent Identity Params    │
         │                                                 │  · Downstream API Scopes    │
         │                                                 │  · Token Cache              │
         │                                                 └──────────────┬──────────────┘
         │                                                                │
         │ Authorization: Bearer <JWT>                                    │ OAuth 2.0
         ▼                                                                ▼
┌──────────────────────┐                                   ┌──────────────────────────┐
│  Downstream APIs     │                                   │  Microsoft Entra ID      │
│  · Microsoft Graph   │                                   │  · Blueprint             │
│  · Custom APIs       │                                   │  · AgentIdentity         │
│  · Azure Services    │                                   │                          │
└──────────────────────┘                                   └──────────────────────────┘
```

## Microsoft Entra SDK for AgentID Configuration

### Core Settings

```yaml
env:
- name: AzureAd__Instance
  value: "https://login.microsoftonline.com/"
- name: AzureAd__TenantId
