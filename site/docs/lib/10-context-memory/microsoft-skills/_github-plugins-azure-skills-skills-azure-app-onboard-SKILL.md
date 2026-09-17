---
title: "Azure App Onboard"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-app-onboard/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-app-onboard/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-app-onboard/SKILL.md"
sourceSha256: "fbfac0fb1c9498081369aa3d90ab3012b6406e3571bb81c6371b6c7c2c157ecf"
pageSha256: "fbfac0fb1c9498081369aa3d90ab3012b6406e3571bb81c6371b6c7c2c157ecf"
contentMode: "local-full"
zh: ""
---

# Azure App Onboard

> ⛔ **Every repo goes through the full pipeline (Steps 1–10). No exceptions.** Do not skip steps, refuse, or short-circuit based on what you recognize. Follow the Workflow table below sequentially — read each step's references before acting.

## Quick Reference

| Property | Value |
|----------|-------|
| Best for | Developers who know what to build but not which Azure services to use |
| Inputs | Business idea or existing codebase, budget/scale preferences (optional) |
| Outputs | Architecture plan, cost estimate, IaC files, deployed Azure resources |
| Phases | Discover → Architect → Scaffold → Deploy (self-contained, no external skill calls) |

## When to Use This Skill

- Deploy existing code without knowing which Azure services to use
- Check if your existing code is ready to deploy to Azure
- Move an existing app to Azure without rewriting or with minimal changes
- Get cost estimates before committing to infrastructure
- Understand architecture decisions and rejected alternatives
- Get answers to Azure architecture or service selection questions (e.g., "What database should I use?")
- Get guided Azure onboarding without prior experience

## When NOT to Use

| Scenario | Use Instead |
|----------|-------------|
| Run `azd up` or execute an existing deployment | `azure-deploy` |
| Optimize existing Azure spend | `azure-cost` |
| Generate Bicep/Terraform for a known architecture | `azure-prepare` |
| Validate infrastructure or run preflight checks | `azure-validate` |
| Troubleshoot a running Azure deployment | `azure-diagnostics` |
| Deploy to or manage AKS/Kubernetes directly | `azure-kubernetes` |
| Look up or list existing Azure resources | `azure-resource-lookup` |

## Pipeline Rules

> ⛔ **You MUST read [`references/pipeline-rules.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-references-pipeline-rules) at the start of every AppOnboard session.** It contains approval gates, phase lifecycle, session artifacts, deploy-as-is, and security baseline rules.

## Workflow

> ⛔ **Deploy recovery:** After deploy gate approval OR before any `az deployment`/`az webapp deploy`/`az acr build` — if you haven't read `deploy/SKILL.md`, read `.copilot-azure/sessions/\{id\}/deploy-checklist.md` first, then `deploy/SKILL.md`. ⛔ NEVER invoke `\{"skill": "azure-deploy"\}` — that is a DIFFERENT skill for a DIFFERENT workflow.

> ⛔ **Post-scaffold transition (MANDATORY):** Immediately after `scaffold-manifest.json` is written, YOUR NEXT ACTION MUST be Step 8 (Deploy Approval Gate) — NOT a summary report, NOT a "here are the generated files" message, NOT a completion signal. Confirm `context.json` has `completedPhases: [...,"scaffold"]` + `currentPhase: "deploy"` (update it yourself if the scaffold subagent didn't). Re-read [approval-gates.md § Deploy Gate](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-references-approval-gates) if evicted from context (scaffold reference loading is heavy), then present the exact prompt: **"🚀 Ready to deploy? (Yes / Run manually / Edit plan / Cancel)"**. This gate is the LAST content in your response — wait for the user's reply.

| # | Step | Action | Reference |
|---|------|--------|-----------|
| 1 | **Session check + Azure login** | Create/resume session, verify Azure CLI auth, resolve subscription + user identity | ⛔ **You MUST read [session-protocol.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-references-session-protocol)** |
| 2 | **Scope triage** | Check azd markers, triage question. Empty workspace or code-only (no infra) → Step 3 directly. | ⛔ Read [intent-gathering.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-references-intent-gathering) § Scope Triage |
| 3 | **Prereq scan** | ⛔ Skip if `completedPhases` includes `"prereq"`. Otherwise: invoke `\{"skill": "azure-app-onboard-prereq"\}`. Write `prereq-output.json`, update `context.json`. **Halt if:** `overallHealth: "blocked"` OR `routeToSkill` set. | |
| 4 | **Gather intent** | Present prereq results, confirm stack + Azure services, ask remaining questions. | ⛔ Read [intent-gathering.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-references-intent-gathering) § After Prereq Returns |
| 5 | **Plan architecture** | Write `prepare-plan.json`. | ⛔ **You MUST read [prepare/SKILL.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-prepare-SKILL)** |
| 6 | **Scaffold approval gate** | Display plan for user approval BEFORE generating any files. | ⛔ Read [approval-gates.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-references-approval-gates) § Scaffold Gate |
| 7 | **Scaffold** | Generate IaC, self-review. Write `scaffold-manifest.json`. Update `context.json`. | ⛔ **You MUST read [scaffold/SKILL.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-scaffold-SKILL)** |
| 8 | **Deploy approval gate** | Display validation summary. ⛔ After approval: FIRST read deploy-checklist.md → deploy/SKILL.md. NEVER `\{"skill": "azure-deploy"\}`. | ⛔ Read [approval-gates.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-references-approval-gates) § Deploy Gate |
| 9 | **Deploy** | Execute IaC, health-check. Write `deploy-result.json`. | ⛔ **You MUST read [deploy/SKILL.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-deploy-SKILL)** |
| 10 | **Handoff** | Surface deployment identity, cleanup commands, next steps. | ⛔ **You MUST read [`handoff-protocol.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-references-handoff-protocol)** |

## Error Handling

| Error | Remediation |
|-------|-------------|
| Phase fails | Halt, report phase + error. User decides: retry, skip, abort. |
| MCP server unavailable | Skip affected checks, add disclaimer to `costEstimate.assumptions[]` and every approval gate. |
| Missing RBAC | Report required role + `az role assignment` command. |

> **Shared references:** [MCP tools](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-references-mcp-tool-reference) (cross-phase tool parameters) | [IaC resources](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-references-iac-resources) (Azure resource docs for troubleshooting)
