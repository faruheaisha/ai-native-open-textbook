---
title: "Microsoft Foundry Skill"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/SKILL.md"
sourceSha256: "348bb5fe5d5eebb4d0481e7be64c8ae20268fc9d52f3c9798b6c40daf05a2e92"
pageSha256: "348bb5fe5d5eebb4d0481e7be64c8ae20268fc9d52f3c9798b6c40daf05a2e92"
contentMode: "local-full"
zh: ""
---

# Microsoft Foundry Skill

This skill helps developers work with Microsoft Foundry resources, covering model discovery and deployment, complete dev lifecycle of AI agent, evaluation workflows, and troubleshooting.

## Pre-Execution Requirements

Follow each applicable subsection below before starting its corresponding action or workflow.

### Dependency Check and Setup

**MANDATORY:** As the first step after this skill loads, run the dependency check and setup script below from this skill's root and wait for it to finish before continuing. The script checks first and installs only missing dependencies; it does not reinstall dependencies that are already available.

**You MUST complete this check before reading or entering any sub-skill, workflow, or workflow-specific reference.**

```bash
./scripts/check-and-setup-dependencies.sh     # macOS / Linux
./scripts/check-and-setup-dependencies.ps1    # Windows (pwsh)
```

Strictly follow the script output for subsequent actions.

### Workflow Guidance

**MANDATORY:** Before executing ANY workflow-specific steps, you MUST read the corresponding sub-skill document. Do not call workflow-specific MCP tools for a workflow without reading its skill document. This applies even if you already know the MCP tool parameters — the skill document contains required workflow steps, pre-checks, and validation logic that must be followed. This rule applies on every new user message that triggers a different workflow, even if the skill is already loaded.

### Foundry MCP

**MANDATORY:** Before using Foundry MCP operations, call the Azure MCP `foundry` tool and inspect the available Foundry MCP tools and related parameters. Treat this as the discovery/help step for MCP-based workflows.

### azd

**MANDATORY:** Before executing ANY azd command, you MUST read [azd-guidance](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-azd-guidance-azd-guidance) and strictly follow the shared rules defined in it, especially the `AZURE_DEV_USER_AGENT` setting rules.

## Sub-Skills

This skill includes specialized sub-skills for specific workflows. **When a sub-skill matches the task, strictly follow its workflow:**

| Sub-Skill | When to Use | Reference |
|-----------|-------------|-----------|
| **deploy** | Deploy hosted agents to Foundry, smoke-test a deployment, create or update prompt agents, and manage agent versions and multi-environment deploys. | [deploy](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-deploy-deploy) |
| **cicd** | Set up a CI/CD deployment pipeline for a Foundry agent. | [cicd](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-cicd-cicd) |
| **invoke** | Send messages to an agent, single or multi-turn conversations | [invoke](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-invoke-invoke) |
| **routine** | Schedule or event-trigger Foundry agents with routines; use `azd` for CRUD, enable/disable, manual dispatch, and viewing past runs, or define routines in `azure.yaml`. | [routine](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-routine-routine) |
| **invocations-ws** | Build, deploy, and connect to hosted agents that speak the `invocations_ws` duplex WebSocket protocol — voice agents, real-time streams, and signaling for out-of-band media transports. | [invocations-ws](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-invocations-ws-invocations-ws) |
| **observe** | Evaluate agent quality, run batch evals, analyze failures, optimize prompts, improve agent instructions, compare versions, set up CI/CD monitoring, and enable continuous production evaluation | [observe](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-observe-observe) |
| **trace** | Query traces, analyze latency/failures, correlate eval results to specific responses via App Insights `customEvents` | [trace](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-trace-trace) |
| **troubleshoot** | View hosted agent logs, query telemetry, diagnose failures | [troubleshoot](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-troubleshoot-troubleshoot) |
| **validate** | Use only when the user explicitly asks to use this validation sub-skill or to validate Microsoft Foundry hosted-agent code against best practices. Never invoke it proactively or add it to another workflow. | [validate](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-validate-validate) |
| **create (quick start)** | Create a new hosted Foundry agent from scratch end-to-end — scaffold, provision or use an existing Foundry project, deploy, and smoke-test. Do not use for any work on existing code. For anything not covered by the quickstart, use **create**. | [create/quick-start-hosted.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-quick-start-hosted) |
| **create** | Use when the standard end-to-end happy path (quick start) doesn't fit. Create a new Foundry agent, update code of an existing agent, continue development of an existing agent, wire connections at scaffold time, use advanced setup or A2A (Agent2Agent), or recover from a failed quickstart run. | [create](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-create-hosted) |
| **agent-optimizer** | Make existing Python hosted-agent code optimization-ready, configure eval.yaml, run Agent Optimizer jobs, apply candidates locally, and deploy through azd after review. | [agent-optimizer](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-agent-optimizer-agent-optimizer) |
| **eval-datasets** | Harvest production traces into evaluation datasets, manage dataset versions and splits, track evaluation metrics over time, detect regressions, and maintain full lineage from trace to deployment. Use for: create dataset from traces, dataset versioning, evaluation trending, regression detection, dataset comparison, eval lineage. | [eval-datasets](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-eval-datasets-eval-datasets) |
| **project/create** | Creating a new Microsoft Foundry project for hosting agents and models. Use when onboarding to Foundry or setting up new infrastructure. | [project/create/create-foundry-project.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-project-create-create-foundry-project) |
| **resource/create** | Creating Azure AI Services multi-service resource (Foundry resource) using Azure CLI. Use when manually provisioning AI Services resources with granular control. | [resource/create/create-foundry-resource.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-resource-create-create-foundry-resource) |
| **private-network** | Answer questions about Foundry network isolation **and** deploy Foundry with VNet isolation (BYO VNet, Managed VNet, hybrid). Covers architecture concepts, template selection, deployment, and post-deployment validation. | [resource/private-network/private-network.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-resource-private-network-private-network) |
| **models/deploy-model** | Unified model deployment with intelligent routing. Handles quick preset deployments, fully customized deployments (version/SKU/capacity/RAI), and capacity discovery across regions. Routes to sub-skills: `preset` (quick deploy), `customize` (full control), `capacity` (find availability). | [models/deploy-model/SKILL.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-models-deploy-model-SKILL) |
| **quota** | Managing quotas and capacity for Microsoft Foundry resources. Use when checking quota usage, troubleshooting deployment failures due to insufficient quota, requesting quota increases, or planning capacity. | [quota/quota.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-quota-quota) |
| **rbac** | Managing RBAC permissions, role assignments, managed identities, and service principals for Microsoft Foundry resources. Use for access control, auditing permissions, and CI/CD setup. | [rbac/rbac.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-rbac-rbac) |
| **finetuning** | Fine-tune models on Microsoft Foundry — SFT distillation, DPO preference optimization, RFT with graders and tool calling. Dataset preparation, grader calibration, training, checkpoint selection, deployment, evaluation. Use for: fine-tune, SFT, DPO, RFT, training data, grader, distillation, fine-tuned model, large file upload. | [finetuning/SKILL.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-finetuning-SKILL) |
| **azd-guidance** | Provide shared azd knowledge and guidance for managing Foundry agents. Read this first for any workflows related to azd. | [azd-guidance](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-azd-guidance-azd-guidance) |

> 💡 **Tip:** For a complete onboarding flow: `project/create` (public) or `private-network` (VNet isolation) → `models/deploy-model` → agent workflows (`create` → `deploy` → `invoke`).

> 💡 **Fine-Tuning:** Use `finetuning` for all model customization — SFT distillation, DPO preference optimization, and RFT with graders. Includes quickstart, grader calibration, and training curve analysis.

> 💡 **Model Deployment:** Use `models/deploy-model` for all deployment scenarios — it intelligently routes between quick preset deployment, customized deployment with full control, and capacity discovery across regions.

> 💡 **Prompt Optimization:** For requests like "optimize my prompt" or "improve my agent instructions," load [observe](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-observe-observe) and use the `prompt_optimize` MCP tool through that eval-driven workflow.

## Infrastructure Lifecycle

Match user intent to the correct infrastructure workflow.

| User Intent | Workflow |
|-------------|---------|
| "Create Foundry" / "Set up Foundry" (ambiguous) | Use `AskUserQuestion`: (a) just an AI Services resource, (b) a project with public access, or (c) a project with network isolation? Route: (a) → [resource/create](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-resource-create-create-foundry-resource), (b) → [project/create](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-project-create-create-foundry-project), (c) → [private-network](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-resource-private-network-private-network) |
| Set up Foundry with VNet isolation | [private-network](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-resource-private-network-private-network) |
| Create a Foundry project (public) | [project/create](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-project-create-create-foundry-project) |
| Create a bare Foundry resource | [resource/create](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-resource-create-create-foundry-resource) |

## Agent Development Lifecycle

Match user intent to the correct agent workflow. Read each sub-skill in order before executing.

| User Intent | Workflow (read in order) |
|-------------|------------------------|
| Create a new hosted agent end-to-end (scaffold + deploy + test) | [dependency check and setup](#dependency-check-and-setup) → [azd-guidance](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-azd-guidance-azd-guidance) → [quick-start-hosted](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-quick-start-hosted) (self-contained end-to-end) |
| Anything beyond the standard quickstart (existing code, migration, re-hosting, deployment customization, scaffold-time connections, A2A (Agent2Agent), recovery) | [dependency check and setup](#dependency-check-and-setup) → [azd-guidance](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-azd-guidance-azd-guidance) → [create](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-create-hosted) → [deploy](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-deploy-deploy) → [invoke](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-invoke-invoke) |
| Optimize existing Python hosted agent | [dependency check and setup](#dependency-check-and-setup) → [azd-guidance](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-azd-guidance-azd-guidance) → [agent-optimizer](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-agent-optimizer-agent-optimizer) → scaffold/review → eval.yaml → optimize → apply candidate → deploy → invoke |
| Deploy an agent (code already exists) | [dependency check and setup](#dependency-check-and-setup) → [azd-guidance](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-azd-guidance-azd-guidance) → deploy (includes eval-suite setup) → invoke → observe (evaluate/optimize) |
| Update/redeploy an agent after code changes | [dependency check and setup](#dependency-check-and-setup) → [azd-guidance](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-azd-guidance-azd-guidance) → deploy (includes eval-suite setup) → invoke → observe (evaluate/optimize) |
| Set up a CI/CD deployment pipeline for a hosted agent | [dependency check and setup](#dependency-check-and-setup) → [azd-guidance](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-azd-guidance-azd-guidance) → cicd |
| Invoke/test/chat with an agent | [dependency check and setup](#dependency-check-and-setup) → [azd-guidance](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-azd-guidance-azd-guidance) → invoke |
| Schedule/event-trigger an agent, or CRUD/enable/disable/dispatch a routine | [dependency check and setup](#dependency-check-and-setup) → [azd-guidance](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-azd-guidance-azd-guidance) → routine |
| Optimize / improve agent prompt or instructions | observe (Step 4: Optimize) |
| Evaluate and optimize agent (full loop) | observe |
| Enable continuous evaluation monitoring | observe (Step 6: CI/CD & Monitoring) |
| Troubleshoot an agent issue | [dependency check and setup](#dependency-check-and-setup) → [azd-guidance](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-azd-guidance-azd-guidance) → invoke → troubleshoot |
| Fix a broken agent (troubleshoot + redeploy) | [dependency check and setup](#dependency-check-and-setup) → [azd-guidance](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-azd-guidance-azd-guidance) → invoke → troubleshoot → apply fixes → deploy → invoke |

## Agent: .foundry Workspace Standard

Every agent source folder can keep Foundry-specific cache and overlay state under `.foundry/`:

```text
