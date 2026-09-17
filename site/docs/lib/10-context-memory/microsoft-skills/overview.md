---
title: "Agent Skills"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/README.md"
sourceRel: "README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/README.md"
sourceSha256: "6075bd43893c2f0973609cb0526b21e2fb8a8963e7b2a256b19962842d0438cd"
pageSha256: "6075bd43893c2f0973609cb0526b21e2fb8a8963e7b2a256b19962842d0438cd"
contentMode: "local-full"
zh: ""
---

# Agent Skills

> [!NOTE]
> **Work in Progress** — This repository is under active development. More skills are being added, existing skills are being updated to use the latest SDK patterns, and tests are being expanded to ensure quality. Contributions welcome!

Skills, custom agents, AGENTS.md templates, and MCP configurations for AI coding agents working with Azure SDKs and Microsoft AI Foundry.

> **Blog post:** [Context-Driven Development: Agent Skills for Microsoft Foundry and Azure](https://devblogs.microsoft.com/all-things-azure/context-driven-development-agent-skills-for-microsoft-foundry-and-azure/)

> **🔍 Skill Explorer:** [Browse all 175 skills with 1-click install](https://microsoft.github.io/skills/)

## Quick Start

```bash
npx skills add microsoft/skills
```

Select the skills you need from the wizard. Skills are installed to your chosen agent's directory (e.g., `.github/skills/` for GitHub Copilot) and symlinked if you use multiple agents.


<summary>Alternative installation methods</summary>

**Manual installation (git clone)**

```bash
# Clone and copy specific skills
git clone https://github.com/microsoft/skills.git
cp -r agent-skills/.github/skills/azure-cosmos-db-py your-project/.github/skills/

# Or use symlinks for multi-project setups
ln -s /path/to/agent-skills/.github/skills/mcp-builder /path/to/your-project/.github/skills/mcp-builder

# Share skills across different agent configs in the same repo
ln -s ../.github/skills .opencode/skills
ln -s ../.github/skills .claude/skills
```



---

Coding agents like [Copilot CLI](https://github.com/features/copilot/cli) and [GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-skills) are powerful, but they lack domain knowledge about your SDKs. The patterns are already in their weights from pretraining. All you need is the right activation context to surface them.

> [!IMPORTANT]
> **Use skills selectively.** Loading all skills causes context rot: diluted attention, wasted tokens, conflated patterns. Only copy skills essential for your current project.

---

![Context-Driven Development Architecture](/mirror/3a/3ac420ab660adc218c749c0fb1f3936a8f6bc0fd.webp)

---

## What's Inside

| Resource | Description |
|----------|-------------|
| **[174 Skills](#skill-catalog)** | Domain-specific knowledge for Azure SDK and Foundry development |
| **[Plugins](#plugins)** | Installable plugin packages (deep-wiki, azure and more) |
| **[Custom Agents](#agents)** | Role-specific agents (backend, frontend, infrastructure, planner) |
| **[AGENTS.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/AGENTS.md)** | Template for configuring agent behavior in your projects |
| **[MCP Configs](#mcp-servers)** | Pre-configured servers for docs, GitHub, browser automation |
| **[Documentation](https://microsoft.github.io/skills/#documentation)** | Repo docs and usage guides |

---

## Skill Catalog

> 175 skills across language plugins — see [skill catalog](#skill-catalog) below for the full breakdown

| Language | Count | Suffix |
|----------|-------|--------|
| [Core](#core) | 11 | — |
| [Foundry (Language-Agnostic)](#foundry-language-agnostic) | 11 | — |
| [Python](#python) | 39 | `-py` |
| [.NET](#net) | 28 | `-dotnet` |
| [TypeScript](#typescript) | 25 | `-ts` |
| [Java](#java) | 25 | `-java` |
| [Rust](#rust) | 7 | `-rust` |

---

### Core

> 11 skills — tooling, infrastructure, language-agnostic

| Skill | Description |
|-------|-------------|
| [cloud-solution-architect](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/cloud-solution-architect/README.md) | Design well-architected Azure cloud systems. Architecture styles, 44 design patterns, technology choices, mission-critical design, WAF pillars. |
| [copilot-sdk](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/copilot-sdk/README.md) | Build applications powered by GitHub Copilot using the Copilot SDK. Session management, custom tools, streaming, hooks, MCP servers, BYOK, deployment patterns. |
| [debugview](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/debugview/README.md) | Sysinternals DebugView CLI — capture and analyze usermode/kernel-mode Windows debug output. Bounded execution, filtering, boot logging, remote monitoring. |
| [entra-agent-id](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/entra-agent-id/README.md) | Microsoft Entra Agent ID (preview) — create OAuth2-capable AI agent identities via Microsoft Graph beta API. Blueprints, BlueprintPrincipals, permissions, WIF. |
| [frontend-design-review](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/frontend-design-review/README.md) | Review and create distinctive frontend interfaces. Design system compliance, quality pillars, accessibility, and creative aesthetics. |
| [github-issue-creator](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/github-issue-creator/README.md) | Convert raw notes, error logs, or screenshots into structured GitHub issues. |
| [github-primer-brand](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/github-primer-brand/README.md) | Design GitHub-branded marketing surfaces with `@primer/react-brand`. Color, typography, layout, components, theming, motion, voice, and anti-patterns for landing pages, launch sites, and campaign surfaces. |
| [mcp-builder](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/mcp-builder/README.md) | Build MCP servers for LLM tool integration. Python (FastMCP), Node/TypeScript, or C#/.NET. |
| [podcast-generation](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/podcast-generation/README.md) | Generate podcast-style audio with Azure OpenAI Realtime API. Full-stack React + FastAPI + WebSocket. |
| [skill-creator](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/skill-creator/README.md) | Guide for creating effective skills for AI coding agents. |

---

### Foundry (Language-Agnostic)

> 11 skills — Microsoft Foundry agent platform (preview), language-agnostic via `azd`, `az` CLI, and Foundry MCP

| Skill | Description |
|-------|-------------|
| [microsoft-foundry](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/README.md) | Router skill for the Foundry agent platform — maps user intent onto the right sub-skill and discovery surface (Microsoft Docs MCP, Foundry MCP, `azd ai agent`, `az` CLI). |
| [foundry-projects-resources](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/foundry-projects-resources/README.md) | Provision Foundry resources/projects, configure project connections (key, OAuth, managed identity, agent identity), and set up standard or private-network agent infrastructure. |
| [foundry-models](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/foundry-models/README.md) | Discover, deploy, and manage models on Foundry — preset/customized deployments, capacity discovery, quota management, PTU vs pay-as-you-go. |
| [foundry-hosted-agents](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/foundry-hosted-agents/README.md) | Build, deploy, and manage Foundry hosted agents — containerized agents exposing Responses or Invocations protocols, with per-agent Entra identity and dedicated endpoints. |
| [foundry-toolboxes](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/foundry-toolboxes/README.md) | Curate intent-based Foundry Toolboxes (preview) — a single MCP-compatible endpoint bundling tools (MCP, Web Search, AI Search, Code Interpreter, File Search, OpenAPI, A2A) for any agent to consume. |
| [foundry-workflows](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/foundry-workflows/README.md) | Build multi-agent workflows — declarative orchestration for handing off control between specialist agents, plus the Connected Agents pattern. |
| [foundry-iq-knowledge-bases](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/foundry-iq-knowledge-bases/README.md) | Build Foundry IQ knowledge bases (preview) — multi-source, permission-aware grounding for agents using the agentic retrieval pipeline. |
| [foundry-managed-skills](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/foundry-managed-skills/README.md) | Manage SKILL.md files as a Foundry-side resource (preview) — author behavioral guidelines once, store via the Skills REST API, load into hosted agent containers. |
| [foundry-memory](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/foundry-memory/README.md) | Build personalized Foundry agents with managed long-term memory (preview) — extract, consolidate, and retrieve user-specific context across sessions. |
| [foundry-observability](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/foundry-observability/README.md) | Trace, monitor, and evaluate Foundry hosted agents end-to-end — OpenTelemetry GenAI traces in App Insights, eval-trace correlation, batch evals, regression detection. |
| [foundry-governance](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/foundry-governance/README.md) | Govern Foundry agent fleets at scale — tool catalog visibility, AI Gateway MCP routing/policy, RBAC, agent identity, RAI policies on model deployments. |

---

### Python

> 39 skills • suffix: `-py`

<details>
<summary><strong>Foundry & AI</strong> (5 skills)</summary>

| Skill | Description |
|-------|-------------|
| [agent-framework-azure-ai-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/agent-framework-azure-ai-py/README.md) | Agent Framework SDK — persistent agents, hosted tools, MCP servers, streaming. |
| [azure-ai-contentsafety-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-contentsafety-py/README.md) | Content Safety SDK — detect harmful content in text/images with multi-severity classification. |
| [azure-ai-contentunderstanding-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-contentunderstanding-py/README.md) | Content Understanding SDK — multimodal extraction from documents, images, audio, video. |
| [azure-ai-projects-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-projects-py/README.md) | High-level Foundry SDK — project client, versioned agents, evals, connections, OpenAI-compatible clients. |
| [azure-search-documents-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-search-documents-py/README.md) | AI Search SDK — vector search, hybrid search, semantic ranking, indexing, skillsets. |

</details>

<details>
<summary><strong>M365</strong> (1 skill)</summary>

| Skill | Description |
|-------|-------------|
| [m365-agents-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/m365-agents-py/README.md) | Microsoft 365 Agents SDK — aiohttp hosting, AgentApplication routing, streaming, Copilot Studio client. |

</details>

<details>
<summary><strong>AI Services</strong> (8 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-ai-ml-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-ml-py/README.md) | ML SDK v2 — workspaces, jobs, models, datasets, compute, pipelines. |
| [azure-ai-textanalytics-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-textanalytics-py/README.md) | Text Analytics — sentiment, entities, key phrases, PII detection, healthcare NLP. |
| [azure-ai-transcription-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-transcription-py/README.md) | Transcription SDK — real-time and batch speech-to-text with timestamps, diarization. |
| [azure-ai-translation-document-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-translation-document-py/README.md) | Document Translation — batch translate Word, PDF, Excel with format preservation. |
| [azure-ai-translation-text-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-translation-text-py/README.md) | Text Translation — real-time translation, transliteration, language detection. |
| [azure-ai-vision-imageanalysis-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-vision-imageanalysis-py/README.md) | Vision SDK — captions, tags, objects, OCR, people detection, smart cropping. |
| [azure-ai-voicelive-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-voicelive-py/README.md) | Voice Live SDK — real-time bidirectional voice AI with WebSocket, VAD, avatars. |
| [azure-speech-to-text-rest-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-speech-to-text-rest-py/README.md) | Speech to Text REST API — transcribe short audio (≤60 seconds) via HTTP without Speech SDK. |

</details>

<details>
<summary><strong>Data & Storage</strong> (7 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-cosmos-db-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-cosmos-db-py/README.md) | Cosmos DB patterns — FastAPI service layer, dual auth, partition strategies, TDD. |
| [azure-cosmos-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-cosmos-py/README.md) | Cosmos DB SDK — document CRUD, queries, containers, globally distributed data. |
| [azure-data-tables-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-data-tables-py/README.md) | Tables SDK — NoSQL key-value storage, entity CRUD, batch operations. |
| [azure-storage-blob-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-storage-blob-py/README.md) | Blob Storage — upload, download, list, containers, lifecycle management. |
| [azure-storage-file-datalake-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-storage-file-datalake-py/README.md) | Data Lake Gen2 — hierarchical file systems, big data analytics. |
| [azure-storage-file-share-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-storage-file-share-py/README.md) | File Share — SMB file shares, directories, cloud file operations. |
| [azure-storage-queue-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-storage-queue-py/README.md) | Queue Storage — reliable message queuing, task distribution. |

</details>

<details>
<summary><strong>Messaging & Events</strong> (4 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-eventgrid-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-eventgrid-py/README.md) | Event Grid — publish events, CloudEvents, event-driven architectures. |
| [azure-eventhub-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-eventhub-py/README.md) | Event Hubs — high-throughput streaming, producers, consumers, checkpointing. |
| [azure-messaging-webpubsubservice-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-messaging-webpubsubservice-py/README.md) | Web PubSub — real-time messaging, WebSocket connections, pub/sub. |
| [azure-servicebus-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-servicebus-py/README.md) | Service Bus — queues, topics, subscriptions, enterprise messaging. |

</details>

<details>
<summary><strong>Entra</strong> (2 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-identity-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-identity-py/README.md) | Identity SDK — DefaultAzureCredential, managed identity, service principals. |
| [azure-keyvault-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-keyvault-py/README.md) | Key Vault — secrets, keys, and certificates management. |

</details>

<details>
<summary><strong>Monitoring</strong> (4 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-monitor-ingestion-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-monitor-ingestion-py/README.md) | Monitor Ingestion — send custom logs via Logs Ingestion API. |
| [azure-monitor-opentelemetry-exporter-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-monitor-opentelemetry-exporter-py/README.md) | OpenTelemetry Exporter — low-level export to Application Insights. |
| [azure-monitor-opentelemetry-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-monitor-opentelemetry-py/README.md) | OpenTelemetry Distro — one-line App Insights setup with auto-instrumentation. |
| [azure-monitor-query-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-monitor-query-py/README.md) | Monitor Query — query Log Analytics workspaces and Azure metrics. |

</details>

<details>
<summary><strong>Integration & Management</strong> (5 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-appconfiguration-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-appconfiguration-py/README.md) | App Configuration — centralized config, feature flags, dynamic settings. |
| [azure-containerregistry-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-containerregistry-py/README.md) | Container Registry — manage container images, artifacts, repositories. |
| [azure-mgmt-apicenter-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-mgmt-apicenter-py/README.md) | API Center — API inventory, metadata, governance. |
| [azure-mgmt-apimanagement-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-mgmt-apimanagement-py/README.md) | API Management — APIM services, APIs, products, policies. |
| [azure-mgmt-botservice-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-mgmt-botservice-py/README.md) | Bot Service — create and manage Azure Bot resources. |

</details>

<details>
<summary><strong>Patterns & Frameworks</strong> (3 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-mgmt-fabric-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-mgmt-fabric-py/README.md) | Fabric Management — Microsoft Fabric capacities and resources. |
| [fastapi-router-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/fastapi-router-py/README.md) | FastAPI routers — CRUD operations, auth dependencies, response models. |
| [pydantic-models-py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/pydantic-models-py/README.md) | Pydantic patterns — Base, Create, Update, Response, InDB model variants. |

</details>

---

### .NET

> 29 skills • suffix: `-dotnet`

<details>
<summary><strong>Foundry & AI</strong> (6 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-ai-document-intelligence-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-ai-document-intelligence-dotnet/README.md) | Document Intelligence — extract text, tables from invoices, receipts, IDs, forms. |
| [azure-ai-openai-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-ai-openai-dotnet/README.md) | Azure OpenAI — chat, embeddings, image generation, audio, assistants. |
| [azure-ai-projects-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-ai-projects-dotnet/README.md) | AI Projects SDK — Foundry project client, agents, connections, evals. |
| [azure-ai-voicelive-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-ai-voicelive-dotnet/README.md) | Voice Live — real-time voice AI with bidirectional WebSocket. |
| [azure-mgmt-weightsandbiases-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-mgmt-weightsandbiases-dotnet/README.md) | Weights & Biases — ML experiment tracking via Azure Marketplace. |
| [azure-search-documents-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-search-documents-dotnet/README.md) | AI Search — full-text, vector, semantic, hybrid search. |

</details>

<details>
<summary><strong>M365</strong> (1 skill)</summary>

| Skill | Description |
|-------|-------------|
| [m365-agents-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/m365-agents-dotnet/README.md) | Microsoft 365 Agents SDK — ASP.NET Core hosting, AgentApplication routing, Copilot Studio client. |

</details>

<details>
<summary><strong>Data & Storage</strong> (6 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-mgmt-fabric-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-mgmt-fabric-dotnet/README.md) | Fabric ARM — provision, scale, suspend/resume Fabric capacities. |
| [azure-resource-manager-cosmosdb-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-cosmosdb-dotnet/README.md) | Cosmos DB ARM — create accounts, databases, containers, RBAC. |
| [azure-resource-manager-mysql-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-mysql-dotnet/README.md) | MySQL Flexible Server — servers, databases, firewall, HA. |
| [azure-resource-manager-postgresql-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-postgresql-dotnet/README.md) | PostgreSQL Flexible Server — servers, databases, firewall, HA. |
| [azure-resource-manager-redis-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-redis-dotnet/README.md) | Redis ARM — cache instances, firewall, geo-replication. |
| [azure-resource-manager-sql-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-sql-dotnet/README.md) | SQL ARM — servers, databases, elastic pools, failover groups. |

</details>

<details>
<summary><strong>Messaging</strong> (3 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-eventgrid-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-eventgrid-dotnet/README.md) | Event Grid — publish events, CloudEvents, EventGridEvents. |
| [azure-eventhub-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-eventhub-dotnet/README.md) | Event Hubs — high-throughput streaming, producers, processors. |
| [azure-servicebus-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-servicebus-dotnet/README.md) | Service Bus — queues, topics, sessions, dead letter handling. |

</details>

<details>
<summary><strong>Entra</strong> (3 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-identity-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-identity-dotnet/README.md) | Identity SDK — DefaultAzureCredential, managed identity, service principals. |
| [azure-security-keyvault-keys-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-security-keyvault-keys-dotnet/README.md) | Key Vault Keys — key creation, rotation, encrypt/decrypt, sign/verify. |
| [microsoft-azure-webjobs-extensions-authentication-events-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/microsoft-azure-webjobs-extensions-authentication-events-dotnet/README.md) | Entra Auth Events — custom claims, token enrichment, attribute collection. |

</details>

<details>
<summary><strong>Compute & Integration</strong> (6 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-maps-search-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-maps-search-dotnet/README.md) | Azure Maps — geocoding, routing, map tiles, weather. |
| [azure-mgmt-apicenter-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-mgmt-apicenter-dotnet/README.md) | API Center — API inventory, governance, versioning, discovery. |
| [azure-mgmt-apimanagement-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-mgmt-apimanagement-dotnet/README.md) | API Management ARM — APIM services, APIs, products, policies. |
| [azure-mgmt-botservice-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-mgmt-botservice-dotnet/README.md) | Bot Service ARM — bot resources, channels (Teams, DirectLine). |
| [azure-resource-manager-durabletask-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-durabletask-dotnet/README.md) | Durable Task ARM — schedulers, task hubs, retention policies. |
| [azure-resource-manager-playwright-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-playwright-dotnet/README.md) | Playwright Testing ARM — workspaces, quotas. |

</details>

<details>
<summary><strong>Monitoring & Partner</strong> (3 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-mgmt-applicationinsights-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-mgmt-applicationinsights-dotnet/README.md) | Application Insights — components, web tests, workbooks. |
| [azure-mgmt-arizeaiobservabilityeval-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-mgmt-arizeaiobservabilityeval-dotnet/README.md) | Arize AI — ML observability via Azure Marketplace. |
| [azure-mgmt-mongodbatlas-dotnet](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-mgmt-mongodbatlas-dotnet/README.md) | MongoDB Atlas — manage Atlas orgs as Azure ARM resources. |

</details>

---

### TypeScript

> 25 skills • suffix: `-ts`

<details>
<summary><strong>Foundry & AI</strong> (6 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-ai-contentsafety-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-ai-contentsafety-ts/README.md) | Content Safety — moderate text/images, detect harmful content. |
| [azure-ai-document-intelligence-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-ai-document-intelligence-ts/README.md) | Document Intelligence — extract from invoices, receipts, IDs, forms. |
| [azure-ai-projects-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-ai-projects-ts/README.md) | AI Projects SDK — Foundry client, agents, connections, evals. |
| [azure-ai-translation-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-ai-translation-ts/README.md) | Translation — text translation, transliteration, document batch. |
| [azure-ai-voicelive-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-ai-voicelive-ts/README.md) | Voice Live — real-time voice AI with WebSocket, Node.js or browser. |
| [azure-search-documents-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-search-documents-ts/README.md) | AI Search — vector/hybrid search, semantic ranking, knowledge bases. |

</details>

<details>
<summary><strong>M365</strong> (1 skill)</summary>

| Skill | Description |
|-------|-------------|
| [m365-agents-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/m365-agents-ts/README.md) | Microsoft 365 Agents SDK — AgentApplication routing, Express hosting, streaming, Copilot Studio client. |

</details>

<details>
<summary><strong>Data & Storage</strong> (5 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-cosmos-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-cosmos-ts/README.md) | Cosmos DB — document CRUD, queries, bulk operations. |
| [azure-postgres-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-postgres-ts/README.md) | PostgreSQL — connect to Azure Database for PostgreSQL with pg, pooling, Entra ID auth. |
| [azure-storage-blob-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-storage-blob-ts/README.md) | Blob Storage — upload, download, list, SAS tokens, streaming. |
| [azure-storage-file-share-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-storage-file-share-ts/README.md) | File Share — SMB shares, directories, file operations. |
| [azure-storage-queue-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-storage-queue-ts/README.md) | Queue Storage — send, receive, peek, visibility timeout. |

</details>

<details>
<summary><strong>Messaging</strong> (3 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-eventhub-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-eventhub-ts/README.md) | Event Hubs — high-throughput streaming, partitioned consumers. |
| [azure-servicebus-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-servicebus-ts/README.md) | Service Bus — queues, topics, sessions, dead-letter handling. |
| [azure-web-pubsub-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-web-pubsub-ts/README.md) | Web PubSub — WebSocket real-time features, group chat, notifications. |

</details>

<details>
<summary><strong>Entra & Integration</strong> (4 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-appconfiguration-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-appconfiguration-ts/README.md) | App Configuration — settings, feature flags, Key Vault references. |
| [azure-identity-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-identity-ts/README.md) | Identity SDK — DefaultAzureCredential, managed identity, browser login. |
| [azure-keyvault-keys-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-keyvault-keys-ts/README.md) | Key Vault Keys — create, encrypt/decrypt, sign, rotate keys. |
| [azure-keyvault-secrets-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-keyvault-secrets-ts/README.md) | Key Vault Secrets — store and retrieve application secrets. |

</details>

<details>
<summary><strong>Monitoring & Frontend</strong> (5 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-microsoft-playwright-testing-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-microsoft-playwright-testing-ts/README.md) | Playwright Testing — scale browser tests, CI/CD integration. |
| [azure-monitor-opentelemetry-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-monitor-opentelemetry-ts/README.md) | OpenTelemetry — tracing, metrics, logs with Application Insights. |
| [frontend-ui-dark-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/frontend-ui-dark-ts/README.md) | Frontend UI Dark — Vite + React + Tailwind + Framer Motion dark-themed UI design system. |
| [react-flow-node-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/react-flow-node-ts/README.md) | React Flow nodes — custom nodes with TypeScript, handles, Zustand. |
| [zustand-store-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/zustand-store-ts/README.md) | Zustand stores — TypeScript, subscribeWithSelector, state/action separation. |

</details>

<details>
<summary><strong>Infrastructure & Orchestration</strong> (1 skill)</summary>

| Skill | Description |
|-------|-------------|
| [aspire-ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/aspire-ts/README.md) | .NET Aspire orchestration — AddViteApp, AddNodeApp, AddJavaScriptApp, service discovery, telemetry, deployment. |

</details>

---

### Java

> 26 skills • suffix: `-java`

<details>
<summary><strong>Foundry & AI</strong> (7 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-ai-anomalydetector-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-ai-anomalydetector-java/README.md) | Anomaly Detector — univariate/multivariate time-series analysis. |
| [azure-ai-contentsafety-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-ai-contentsafety-java/README.md) | Content Safety — text/image analysis, blocklist management. |
| [azure-ai-formrecognizer-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-ai-formrecognizer-java/README.md) | Form Recognizer — extract text, tables, key-value pairs from documents. |
| [azure-ai-projects-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-ai-projects-java/README.md) | AI Projects — Foundry project management, connections, datasets. |
| [azure-ai-vision-imageanalysis-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-ai-vision-imageanalysis-java/README.md) | Vision SDK — captions, OCR, object detection, tagging. |
| [azure-ai-voicelive-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-ai-voicelive-java/README.md) | Voice Live — real-time voice conversations with WebSocket. |

</details>

<details>
<summary><strong>Communication</strong> (5 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-communication-callautomation-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-communication-callautomation-java/README.md) | Call Automation — IVR, call routing, recording, DTMF, TTS. |
| [azure-communication-callingserver-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-communication-callingserver-java/README.md) | CallingServer (legacy) — deprecated, use callautomation for new projects. |
| [azure-communication-chat-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-communication-chat-java/README.md) | Chat SDK — threads, messaging, participants, read receipts. |
| [azure-communication-common-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-communication-common-java/README.md) | Common utilities — token credentials, user identifiers. |
| [azure-communication-sms-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-communication-sms-java/README.md) | SMS SDK — notifications, alerts, OTP delivery, bulk messaging. |

</details>

<details>
<summary><strong>Data & Storage</strong> (3 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-cosmos-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-cosmos-java/README.md) | Cosmos DB — NoSQL operations, global distribution, reactive patterns. |
| [azure-data-tables-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-data-tables-java/README.md) | Tables SDK — Table Storage or Cosmos DB Table API. |
| [azure-storage-blob-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-storage-blob-java/README.md) | Blob Storage — upload, download, containers, streaming. |

</details>

<details>
<summary><strong>Messaging</strong> (3 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-eventgrid-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-eventgrid-java/README.md) | Event Grid — publish events, pub/sub patterns. |
| [azure-eventhub-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-eventhub-java/README.md) | Event Hubs — high-throughput streaming, event-driven architectures. |
| [azure-messaging-webpubsub-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-messaging-webpubsub-java/README.md) | Web PubSub — WebSocket messaging, live updates, chat. |

</details>

<details>
<summary><strong>Entra</strong> (3 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-identity-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-identity-java/README.md) | Identity SDK — DefaultAzureCredential, managed identity, service principals. |
| [azure-security-keyvault-keys-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-security-keyvault-keys-java/README.md) | Key Vault Keys — RSA/EC keys, encrypt/decrypt, sign/verify, HSM. |
| [azure-security-keyvault-secrets-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-security-keyvault-secrets-java/README.md) | Key Vault Secrets — passwords, API keys, connection strings. |

</details>

<details>
<summary><strong>Monitoring & Integration</strong> (5 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-appconfiguration-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-appconfiguration-java/README.md) | App Configuration — settings, feature flags, snapshots. |
| [azure-compute-batch-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-compute-batch-java/README.md) | Batch SDK — large-scale parallel and HPC jobs. |
| [azure-monitor-ingestion-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-monitor-ingestion-java/README.md) | Monitor Ingestion — custom logs via Data Collection Rules. |
| [azure-monitor-opentelemetry-exporter-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-monitor-opentelemetry-exporter-java/README.md) | OpenTelemetry Exporter — traces, metrics, logs to Azure Monitor. (Deprecated) |
| [azure-monitor-query-java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-monitor-query-java/README.md) | Monitor Query — Kusto queries, Log Analytics, metrics. (Deprecated) |

</details>

---

### Rust

> 7 skills • suffix: `-rust`

<details>
<summary><strong>Entra</strong> (4 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-identity-rust](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-rust/skills/azure-identity-rust/README.md) | Identity SDK — DeveloperToolsCredential, ManagedIdentityCredential, ClientSecretCredential. |
| [azure-keyvault-certificates-rust](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-rust/skills/azure-keyvault-certificates-rust/README.md) | Key Vault Certificates — create, import, manage certificates. |
| [azure-keyvault-keys-rust](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-rust/skills/azure-keyvault-keys-rust/README.md) | Key Vault Keys — RSA/EC keys, encrypt/decrypt, sign/verify. |
| [azure-keyvault-secrets-rust](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-rust/skills/azure-keyvault-secrets-rust/README.md) | Key Vault Secrets — passwords, API keys, connection strings. |

</details>

<details>
<summary><strong>Data & Storage</strong> (2 skills)</summary>

| Skill | Description |
|-------|-------------|
| [azure-cosmos-rust](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-rust/skills/azure-cosmos-rust/README.md) | Cosmos DB SDK — document CRUD, queries, containers, partitions. |
| [azure-storage-blob-rust](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-rust/skills/azure-storage-blob-rust/README.md) | Blob Storage — upload, download, containers, streaming. |

</details>

<details>
<summary><strong>Messaging</strong> (1 skill)</summary>

| Skill | Description |
|-------|-------------|
| [azure-eventhub-rust](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-rust/skills/azure-eventhub-rust/README.md) | Event Hubs — high-throughput streaming, producers, consumers, batching. |

</details>

---

## Repository Structure

```
AGENTS.md                # Agent configuration template

.github/
├── skills/              # Backward-compat symlinks to plugin skills
├── plugins/             # Language-based plugin bundles (azure-sdk-python, etc.)
│   └── azure-sdk-*/     # Each bundle has skills/, commands/, agents/
├── prompts/             # Reusable prompt templates
├── agents/              # Agent persona definitions
├── scripts/             # Automation scripts (doc scraping)
├── workflows/           # GitHub Actions (daily doc updates)
└── copilot-instructions.md

docs/                    # Generated llms.txt files (daily workflow) - GitHub Pages hosted
├── llms.txt             # Links + summaries
└── llms-full.txt        # Full content

skills/                  # Symlinks for backward compatibility
├── python/              # -> ../.github/skills/*-py
├── dotnet/              # -> ../.github/skills/*-dotnet
├── typescript/          # -> ../.github/skills/*-ts
├── java/                # -> ../.github/skills/*-java
└── rust/                # -> ../.github/skills/*-rust

.vscode/
└── mcp.json             # MCP server configurations
```

---

## Plugins

Plugins are installable packages containing curated sets of agents, commands, and skills. Install via the Copilot CLI:

```bash
# Inside Copilot CLI, run these slash commands:
/plugin marketplace add microsoft/skills
/plugin install deep-wiki@skills
/plugin install azure@skills
```

| Plugin | Description | Commands |
|--------|-------------|----------|
| [deep-wiki](https://github.com/microsoft/skills/tree/main/.github/plugins/deep-wiki) | AI-powered wiki generator with Mermaid diagrams, source citations, onboarding guides, AGENTS.md, and llms.txt | `/deep-wiki:generate`, `/deep-wiki:crisp`, `/deep-wiki:catalogue`, `/deep-wiki:page`, `/deep-wiki:research`, `/deep-wiki:ask`, `/deep-wiki:onboard`, `/deep-wiki:agents`, `/deep-wiki:llms`, `/deep-wiki:changelog`, `/deep-wiki:ado`, `/deep-wiki:build`, `/deep-wiki:deploy` |
| [azure](https://github.com/microsoft/skills/tree/main/.github/plugins/azure-skills) | Microsoft Azure MCP and Skills integration for cloud resource management, deployments, and Azure services. Manage your Azure infrastructure, monitor applications, and deploy resources directly from your development environment. | Skills-based (no slash commands) — auto-triggered by intent matching via `azure` and `foundry-mcp` MCP servers |

---

## MCP Servers

Reference configurations in [`.vscode/mcp.json`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.vscode/mcp.json):

| Category | Servers |
|----------|---------|
| **Documentation** | `microsoft-docs`, `context7`, `deepwiki` |
| **Development** | `github`, `playwright`, `terraform`, `eslint` |
| **Utilities** | `sequentialthinking`, `memory`, `markitdown` |

For full MCP server implementations for Azure services, see **[microsoft/mcp](https://github.com/microsoft/mcp)**.

---

## Additional Resources

### Agents

Role-specific agent personas in [`.github/agents/`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/agents/README.md):

| Agent | Expertise |
|-------|-----------|
| `backend.agent.md` | FastAPI, Pydantic, Cosmos DB, Azure services |
| `frontend.agent.md` | React, TypeScript, React Flow, Zustand, Tailwind |
| `infrastructure.agent.md` | Bicep, Azure CLI, Container Apps, networking |
| `planner.agent.md` | Task decomposition, architecture decisions |
| `presenter.agent.md` | Documentation, demos, technical writing |

Use [`AGENTS.md`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/AGENTS.md) as a template for configuring agent behavior in your own projects.

### Prompts

Reusable prompt templates in [`.github/prompts/`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/prompts/README.md):

| Prompt | Purpose |
|--------|---------|
| [`code-review.prompt.md`](/lib/10-context-memory/microsoft-skills/_github-prompts-code-review.prompt) | Structured code review with security, performance, and maintainability checks |
| [`create-store.prompt.md`](/lib/10-context-memory/microsoft-skills/_github-prompts-create-store.prompt) | Zustand store creation with TypeScript and subscribeWithSelector |
| [`create-node.prompt.md`](/lib/10-context-memory/microsoft-skills/_github-prompts-create-node.prompt) | React Flow custom node creation with handles and Zustand integration |
| [`add-endpoint.prompt.md`](/lib/10-context-memory/microsoft-skills/_github-prompts-add-endpoint.prompt) | FastAPI endpoint creation with Pydantic models and proper typing |

### Documentation

See the docs at <https://microsoft.github.io/skills/#documentation>.

---

## Testing Skills

The test harness validates that skills produce correct code patterns using the [GitHub Copilot SDK](https://github.com/github/copilot-sdk). It evaluates generated code against acceptance criteria defined for each skill.

```bash
# Install test dependencies (from tests directory)
cd tests
pnpm install

# List skills with test coverage
pnpm harness --list

# Run tests for a specific skill (mock mode for CI)
pnpm harness azure-ai-projects-py --mock --verbose

# Run with Ralph Loop (iterative improvement)
pnpm harness azure-ai-projects-py --ralph --mock --max-iterations 5 --threshold 85

# Run unit tests
pnpm test
```

### Test Coverage Summary

**129 skills with 1169 test scenarios** — all skills have acceptance criteria and test scenarios.

| Language | Skills | Scenarios | Top Skills by Scenarios |
|----------|--------|-----------|-------------------------|
| Core | 8 | 83 | `copilot-sdk` (11), `debugview` (11), `podcast-generation` (8) |
| Python | 41 | 331 | `azure-ai-projects-py` (12), `pydantic-models-py` (12), `azure-ai-translation-text-py` (11) |
| .NET | 29 | 290 | `azure-resource-manager-sql-dotnet` (14), `azure-resource-manager-redis-dotnet` (14), `azure-servicebus-dotnet` (13) |
| TypeScript | 25 | 270 | `azure-storage-blob-ts` (17), `azure-servicebus-ts` (14), `aspire-ts` (13) |
| Java | 26 | 195 | `azure-storage-blob-java` (12), `azure-identity-java` (12), `azure-data-tables-java` (11) |

### Adding Test Coverage

See [`tests/README.md`](/lib/10-context-memory/microsoft-skills/tests) for instructions on adding acceptance criteria and scenarios for new skills.

### Vally Evaluations
