---
title: "Deploy a Foundry Agent"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/deploy/deploy.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/deploy/deploy.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/deploy/deploy.md"
sourceSha256: "54d7725d5f33238cd36fc6c00f468be67ee560d26849f8d32699ac4dd51cba50"
pageSha256: "54d7725d5f33238cd36fc6c00f468be67ee560d26849f8d32699ac4dd51cba50"
contentMode: "local-full"
zh: ""
---

# Deploy a Foundry Agent

Provision Azure resources when needed, deploy the agent, and smoke-test it.
For **hosted agents** (custom container or code), use `azd deploy`.
For **prompt agents** (LLM + instructions, no custom code), use the Foundry MCP `agent_update` tool.

## Quick Reference

| Property | Value |
|----------|-------|
| Hosted (recommended) | `azd provision` when needed, code deploy via `azd deploy` (`codeConfiguration` present), then verify and invoke |
| Hosted (container) | `azd provision` when needed, container deploy via `azd deploy` (remote builds require a Dockerfile and ACR; local builds also require Docker; no `codeConfiguration:` in the `azure.yaml` service block) |
| Prompt MCP | `agent_definition_schema_get`, `agent_update`, `agent_get`, `agent_delete` |
| Versioning | Each successful `azd deploy` creates an immutable agent version |
| Endpoint-only patch | `azd ai agent endpoint update` (no new version) |
| Local dev | [create-hosted](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-create-hosted), [local-run](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-local-run) |

## Hosted vs Prompt

- Shipping Python / .NET code -> **Hosted** (azd workflow below).
- Updating only model / instructions / tools -> **Prompt** (MCP workflow below).

## Deploy Mode Selection -- Hosted agents

Follow the user's explicit deploy mode preference or the existing project configuration. Otherwise, use **code deploy through azd** by default (no Docker/ACR required): the agent's `azure.yaml` service block must contain `codeConfiguration:`, so `azd deploy` will zip the source and let Foundry build it. If `azd deploy` prints `Packaging container` for an agent that does not need container-specific behavior, add or fix `codeConfiguration` and retry.

When the agent depends on Dockerfile behavior, system packages, or a pre-built image, or when the user explicitly asks to build or deploy a container image, mentions Container/Docker Image/Azure Container Registry (ACR), or supplies a pre-built image, use container deploy.

Before running `azd deploy`, inspect the agent's service block in `azure.yaml`.

| Service block state | Deployment path |
|------------------|-----------------|
| `codeConfiguration:` present | **Code deploy** through `azd deploy`; no Docker/ACR build. |
| No `codeConfiguration:` with `language: docker` | **Container deploy** through `azd deploy`. |

`codeConfiguration:` example in the `azure.yaml` service block:

```yaml
services:
