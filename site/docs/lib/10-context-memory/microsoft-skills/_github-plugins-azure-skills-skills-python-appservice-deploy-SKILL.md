---
title: "Python on Azure App Service — Code Deploy"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/python-appservice-deploy/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/python-appservice-deploy/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/python-appservice-deploy/SKILL.md"
sourceSha256: "17a263999dfd82daf0c1aa826e5b7656c21a0dec5d9c458cbf2e32b9418100e3"
pageSha256: "17a263999dfd82daf0c1aa826e5b7656c21a0dec5d9c458cbf2e32b9418100e3"
contentMode: "local-full"
zh: ""
---

# Python on Azure App Service — Code Deploy

Deploys Python (Flask, Django, FastAPI, generic) code to Azure App Service Linux (P0v3, Python 3.14). Creates RG + Plan + Web App if missing. Hand off to `azure-prepare` for VNet, Key Vault, databases, or IaC.

**MCP tools used**: `mcp_azure_mcp_subscription_list`, `mcp_azure_mcp_group_list`, `mcp_azure_mcp_appservice`, `mcp_azure_mcp_azd` (when `azure.yaml` is present).

## Workflow

1. **Resolve context — smart defaults, minimal prompts.** Only the app name is interactive; RG (`<app>-rg`), Plan (`<app>-plan`), region (current `az` default or `eastus2`), subscription are derived. [create-app.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-python-appservice-deploy-references-create-app) §1.
2. **Detect framework** (advisory, never blocks). [detect.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-python-appservice-deploy-references-detect).
3. **Choose path** — `azure.yaml` host: appservice → [deploy-azd.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-python-appservice-deploy-references-deploy-azd); else [deploy-azcli.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-python-appservice-deploy-references-deploy-azcli).
4. **Ensure RG → Plan (`P0v3 --is-linux`) → Web App (`--runtime "PYTHON:3.14"`)** exist. On transient ARM errors, follow [transient-retry.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-python-appservice-deploy-references-transient-retry). [create-app.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-python-appservice-deploy-references-create-app).
5. **Set startup** — Flask/Django: none (Oryx auto-detects). FastAPI: always `python -m uvicorn main:app --host 0.0.0.0`. Other: warn. [startup-commands.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-python-appservice-deploy-references-startup-commands).
6. **Set `SCM_DO_BUILD_DURING_DEPLOYMENT=true`**.
7. **Deploy** — `azd deploy` or `az webapp deploy --type zip --track-status false`.
8. **STOP. Print the post-deploy message** ([post-deploy-message.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-python-appservice-deploy-references-post-deploy-message)) and end the turn.

### Hard rules

- ⛔ **NO POST-DEPLOY VERIFICATION** — after deploy returns, do not run `az webapp log tail`, `curl`, `Invoke-WebRequest`, or any health probe. App Service needs 2–3 min to warm; a quiet log or early 5xx is not failure.
- ⛔ **SHELL SAFETY** — for `--runtime` always use `"PYTHON:3.14"` (colon). Never `"PYTHON|3.14"` (pipe is a shell operator).
- ⛔ **NEVER `az webapp up`** — deprecated. Use Step 7 commands.
- ✅ **URL FORMAT** — present endpoints as `https://...` URLs.

## Error Handling

See [errors.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-python-appservice-deploy-references-errors) for the full symptom → cause → fix matrix. Quick triage: missing plan/app → re-run Step 4; container ping timeout on 8000 → fix startup (Step 5); `ModuleNotFoundError` after deploy → ensure Step 6 ran, redeploy.
