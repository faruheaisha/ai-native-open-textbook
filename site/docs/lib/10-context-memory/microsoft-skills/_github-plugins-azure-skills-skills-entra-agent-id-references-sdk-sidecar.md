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
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/entra-agent-id/references/sdk-sidecar.md"
sourceRel: ".github/plugins/azure-skills/skills/entra-agent-id/references/sdk-sidecar.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/entra-agent-id/references/sdk-sidecar.md"
sourceSha256: "ca709e93fe7cbffe2251102edeb4edb9046d7dc71da693cd7cc486909024ebc7"
pageSha256: "ca709e93fe7cbffe2251102edeb4edb9046d7dc71da693cd7cc486909024ebc7"
contentMode: "local-full"
zh: ""
---

# Microsoft Entra SDK for AgentID: Polyglot Agent Authentication

Containerized companion service that handles token management for AI agents over HTTP — any language, any framework.

Image: `mcr.microsoft.com/entra-sdk/auth-sidecar:1.0.0-azurelinux3.0-distroless`. See [GitHub releases](https://github.com/AzureAD/microsoft-identity-web/releases) for tags.

For code patterns, deployment manifests, security hardening, and troubleshooting, see [sdk-sidecar-deployment.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-agent-id-references-sdk-sidecar-deployment).

## Architecture

```
Client App → Your Agent (Python/Node/Go/Java)
          → Microsoft Entra SDK for AgentID (localhost:5000)
          → Microsoft Entra ID
                                            ↓
                                   Downstream APIs
```

The SDK runs as a companion container in the same pod or Docker network. Your agent calls it over HTTP — no SDK embedding required.

### Agent Integration (3P and Custom Agents)

Third-party and custom agents authenticate using the Blueprint → BlueprintPrincipal → Agent Identity hierarchy. The SDK acquires tokens on their behalf:

```
                                    GET /AuthorizationHeaderUnauthenticated/graph
                                    ?AgentIdentity={agent-app-id}
  ┌──────────────────┐            ┌─────────────────────────────┐
  │  Agent           │ ─────────▶ │  Microsoft Entra SDK for    │
  │  (any language)  │ ◀───────── │  AgentID (:5000)            │
  │                  │  { authorizationHeader: "Bearer eyJ..." }│
  └────────┬─────────┘            └──────────────┬──────────────┘
           │ Authorization: Bearer <JWT>                        │ OAuth 2.0
           ▼                                                    ▼
  ┌──────────────────────┐                      ┌──────────────────────────┐
  │  Downstream APIs     │                      │  Microsoft Entra ID      │
  │  · Microsoft Graph   │                      │  · Blueprint             │
  │  · Custom APIs       │                      │  · AgentIdentity         │
  │  · Azure Services    │                      │                          │
  └──────────────────────┘                      └──────────────────────────┘
```

## SDK Configuration

### Core Settings

```yaml
env:
- name: AzureAd__Instance
  value: "https://login.microsoftonline.com/"
- name: AzureAd__TenantId
