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
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/Agents.md"
sourceRel: "Agents.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/Agents.md"
sourceSha256: "652b197d978b45228bf5d5b2b6e434699aeabacef811e54ee6146fe32f223303"
pageSha256: "652b197d978b45228bf5d5b2b6e434699aeabacef811e54ee6146fe32f223303"
contentMode: "local-full"
zh: ""
---

# Agent Skills

A repository of skills, prompts, and MCP configurations for AI coding agents working with Azure SDKs and Microsoft AI Foundry services.

## ⚠️ Fresh Information First

**Azure SDKs and Foundry APIs change constantly. Never work with stale knowledge.**

Before implementing anything with Azure/Foundry SDKs:

1. **Search official docs first** — Use the Microsoft Docs MCP (`microsoft-docs`) to get current API signatures, parameters, and patterns
2. **Verify SDK versions** — Check `pip show <package>` for installed versions; APIs differ between versions
3. **Don't trust cached knowledge** — Your training data is outdated. The SDK you "know" may have breaking changes.

```
# Always do this first
1. Search Microsoft Learn for current docs
2. Check Context7 for indexed Foundry documentation (updated daily)
3. Verify against actual installed package version
```

**If you skip this step and use outdated patterns, you will produce broken code.**

---

## Core Principles

These principles reduce common LLM coding mistakes. Apply them to every task.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

**The test:** Would a senior engineer say this is overcomplicated? If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

**The test:** Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution (TDD)

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

| Instead of... | Transform to... |
|---------------|-----------------|
| "Add validation" | "Write tests for invalid inputs, then make them pass" |
| "Fix the bug" | "Write a test that reproduces it, then make it pass" |
| "Refactor X" | "Ensure tests pass before and after" |

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

## Clean Architecture

Follow these layered boundaries when building features:

```
┌─────────────────────────────────────┐
│           Presentation              │  ← Routers, API endpoints
├─────────────────────────────────────┤
│           Application               │  ← Use cases, orchestration
├─────────────────────────────────────┤
│             Domain                  │  ← Entities, business rules
├─────────────────────────────────────┤
│          Infrastructure             │  ← Database, external APIs
└─────────────────────────────────────┘
```

**Rules:**

- Dependencies point inward (outer layers depend on inner layers)
- Domain layer has no external dependencies
- Infrastructure implements interfaces defined in inner layers
- Each layer should be testable in isolation

---

## SDK Quick Reference

| Package | Purpose | Install |
|---------|---------|---------|
| `azure-ai-projects` | Foundry project client, agents, evals, connections | `pip install azure-ai-projects` |
| `azure-ai-agents` | Standalone agents client (use via projects) | `pip install azure-ai-agents` |
| `azure-search-documents` | Azure AI Search SDK | `pip install azure-search-documents` |
| `azure-identity` | Authentication | `pip install azure-identity` |

### Authentication Pattern

Always use `DefaultAzureCredential` for production:

```python
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

credential = DefaultAzureCredential()
client = AIProjectClient(
    endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
    credential=credential
)
```

### Environment Variables

```bash
AZURE_AI_PROJECT_ENDPOINT=https://<resource>.services.ai.azure.com/api/projects/<project>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4o-mini
```

---

## Skills

Skills are domain-specific knowledge packages in `.github/skills/`. Each has a `SKILL.md` with:

- **YAML frontmatter** (`name`, `description`) — triggers skill loading
- **Markdown body** — loaded only when skill activates

> **⚠️ Temporary duplication note:** Skills in `.github/skills/` are duplicated from `.github/plugins/*/skills/` to support `npx skills add microsoft/skills` installation. The plugin directories remain the canonical source. This duplication is temporary until the skills installer supports symlinks/pointer files.

### Quick Start

```bash
# Install skills using skills.sh
npx skills add microsoft/skills
```

### Skill Catalog

> Location: `.github/skills/` • 133 skills • See [README.md#skill-catalog](/lib/10-context-memory/microsoft-skills/overview#skill-catalog)

| Language | Skills | Suffix | Examples |
|----------|--------|--------|----------|
| **Core** | 6 | — | `mcp-builder`, `skill-creator`, `copilot-sdk` |
| **Python** | 41 | `-py` | `azure-ai-projects-py`, `azure-cosmos-py`, `azure-ai-ml-py` |
| **.NET** | 29 | `-dotnet` | `azure-ai-projects-dotnet`, `azure-resource-manager-cosmosdb-dotnet`, `azure-security-keyvault-keys-dotnet` |
| **TypeScript** | 25 | `-ts` | `azure-ai-projects-ts`, `azure-storage-blob-ts`, `aspire-ts` |
| **Java** | 26 | `-java` | `azure-ai-projects-java`, `azure-cosmos-java`, `azure-eventhub-java` |

### Skill Selection

Only load skills relevant to the current task. Loading all skills causes context rot — diluted attention and conflated patterns.

### Creating New Skills

> **Detailed guide:** Load the `/skill-creator` skill for comprehensive instructions.

**Prerequisites:** User MUST provide SDK context:

- SDK package name (e.g., `azure-ai-agents`)
- Documentation URL or GitHub repository
- Target language (py/dotnet/ts/java)

**Quick workflow:**
