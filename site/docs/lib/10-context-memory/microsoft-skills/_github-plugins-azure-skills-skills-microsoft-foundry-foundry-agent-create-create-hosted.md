---
title: "Create Hosted Agent (azd ai)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/create-hosted.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/create-hosted.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/create-hosted.md"
sourceSha256: "5b98352e79d39318c392ebd7abfbf4a4339b85cf8e9a28000fba45024829a835"
pageSha256: "5b98352e79d39318c392ebd7abfbf4a4339b85cf8e9a28000fba45024829a835"
contentMode: "local-full"
zh: ""
---

# Create Hosted Agent (azd ai)

Scaffold or develop a hosted Foundry agent project with the Azure Developer CLI (`azd`) and the `azure.ai.agents` extension. The same flow covers new agents and continued development of existing agents, then drops you into a local inner-loop so you can iterate before deploying.

> **Creating a new agent end-to-end from scratch?** Use [quick-start-hosted.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-quick-start-hosted) instead -- an opinionated happy-path with safe defaults. Stay here for anything not covered by the quickstart.

> **Scope:** `azd ai` is the preferred *code-first* path -- use it when the intent is agent code on disk, in a repo, with infrastructure-as-code and a local inner-loop. If the intent is only to create a remote agent resource (no code on disk), other approaches may apply -- for prompt agents see [create-prompt.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-create-prompt), or use the Foundry MCP tools / portal.

## Quick Reference

| Property | Value |
|----------|-------|
| Agent type | Hosted (container or code) |
| Primary CLI | `azd ai agent` (from extension `azure.ai.agents`) |
| Scaffold command | `azd ai agent init -m <manifestUrl> --deploy-mode code --runtime python_3_13 --entry-point main.py`, pass `--runtime dotnet_10 --entry-point MyAgent.dll` for .NET project (or `--src <dir>` when onboarding existing code) |
| Local run | Follow [local-run](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-local-run) for the service's protocol-specific invocation path |
| Deploy handoff | [deploy/deploy.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-deploy-deploy) |
| Sample catalog | `azd ai agent sample list --output json` |
| Reference docs | [azd-ai-cli](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-azd-guidance-references-azd-ai-cli), [local-run](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-local-run), [toolbox.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-toolbox-toolbox) |

## When to Use This Skill

- Create a new hosted agent from a curated Foundry sample.
- Continue developing on an existing agent project (Python, .NET).
- Add tools (web search, AI Search, MCP, A2A) to a hosted agent.
- Run and iterate on a hosted agent locally before deploying.

For prompt agents (LLM + instructions, no container), use [create-prompt.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-create-prompt). For deploy, use [deploy.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-deploy-deploy).

## Hosted vs Prompt

| | Hosted | Prompt |
|--|--------|--------|
| Custom Python / .NET code? | Yes -> this skill | No -> [create-prompt.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-create-prompt) |
| Tools / RAG / MCP / A2A | Toolbox + connections | Built-in tool configs |
| Local debugging | `azd ai agent run --no-client` | Limited |
| Output | New immutable agent version per `azd deploy` | `agent_update` via MCP / SDK |

## azd Sample Selection Guidance

Use this azd sample selection guidance when the workflow refers to azd sample selection guidance.

List the curated catalog (filter by language if known):

```bash
azd ai agent sample list --language python --output json
```

Capture the selected sample's `manifestUrl`.

> **Important:** Always select the best-matching samples from `azd ai agent sample list` for the capabilities the user explicitly requested. Use advanced tool samples only when the user explicitly asks for external actions, APIs, tools, connectors, or data lookup. Starting with the right sample helps ensure that the implementation follows the established code patterns and best practices for that type of Foundry hosted agent. If `azd ai agent sample list` does not return a suitable sample, choose one from the official [Foundry samples repository](https://github.com/microsoft-foundry/foundry-samples) and construct the manifest URL from its exact `azure.yaml` path, following the URL format returned by `azd ai agent sample list`.

You should pick only one sample for `azd ai agent init`, but you can browse multiple samples relevant to the user's task as code references.

> **Important:** When users want to create or continue working on LangChain/LangGraph agents, you MUST read and follow [LangChain and LangGraph hosting](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-langchain-langgraph-hosting) before selecting a sample or changing agent code.

## Workflow

### Step 1 -- Verify the environment

Run the bundled read-only Copilot app entry preflight without asking for approval; it locates the app's Copilot CLI and reports whether the `microsoft-foundry` canvas plugin needs installation:

```bash
./scripts/check-copilot-app-entry.sh     # macOS / Linux
./scripts/check-copilot-app-entry.ps1    # Windows (pwsh)
```

Act on the summary prefixes:

- `[OK]` -- nothing to do.
- `[WARN]` -- non-blocking; continue.
- `[ACTION]` -- try to resolve by using the exact plugin install command emitted by the preflight; ask before installing in interactive mode, and install directly in non-interactive mode.
  - **On successful installation, you MUST print:** "The `microsoft-foundry` canvas extension is installed and will be available in a new session." Then rerun the preflight.
  - If installation is declined or fails, warn and continue; do not retry.

Then run the bundled verification script before any create/deploy command:

```bash
./scripts/verify-environment.sh     # macOS / Linux
./scripts/verify-environment.ps1    # Windows (pwsh)
```

Do not continue past Step 1 while any `[ACTION]` from environment verification remains. Never run `az login` or `azd auth login` for the user. Missing authentication is a hard stop before any `azd ai agent init`, `azd provision`, `azd deploy`, or other deploy command.

Act on the summary prefixes:

- `[OK]` -- nothing to do.
- `[WARN]` -- non-blocking; continue.
- `[ACTION]` -- resolve first, then rerun the script. If `az` or `azd` is missing, ask before installing in interactive mode; install directly in non-interactive mode. For how to install `azd`, see <https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/install-azd>. In any mode, never run `az login` or `azd auth login`; stop and ask the user to log in manually. Missing `azure.ai.agents` / `azure.ai.projects` extensions may be resolved with `azd extension install <name>`. Failed `az` or `azd` auth checks must stop the workflow until the user logs in manually.

Branch on the agent status reported by `verify-environment`:

- `not_deployed` -> Step 2.
- `active` / `deployed` -> for code changes, continue to Step 4b; for deploy-only requests, use [deploy/deploy.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-deploy-deploy); to add a tool, use [toolbox.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-toolbox-toolbox).

### Step 2 -- Collect necessary information

Before asking, resolve values from the user's request, the workspace,
`azure.yaml`, the Step 1 verification output, and `azd env get-values`. For each
row, do not ask when its **When to skip** condition is met. Ask for all
remaining applicable values in one `AskUserQuestion` round. Do not ask for
values that are already resolved or irrelevant to the requested change.
Populate each question with the default option below.

| Value | When to skip | Default option | Notes |
|-------|--------------|----------------|-------|
