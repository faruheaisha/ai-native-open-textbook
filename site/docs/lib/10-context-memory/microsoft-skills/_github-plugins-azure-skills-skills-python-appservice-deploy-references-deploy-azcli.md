---
title: "Deploy via az CLI"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/python-appservice-deploy/references/deploy-azcli.md"
sourceRel: ".github/plugins/azure-skills/skills/python-appservice-deploy/references/deploy-azcli.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/python-appservice-deploy/references/deploy-azcli.md"
sourceSha256: "4bc99a3a09393cf3ab56edfcc1629de855d09b0ad85a73a8019fa93533c93893"
pageSha256: "4bc99a3a09393cf3ab56edfcc1629de855d09b0ad85a73a8019fa93533c93893"
contentMode: "local-full"
zh: ""
---

# Deploy via `az` CLI

Use this path when there is **no** `azure.yaml` or it doesn't target `appservice`.

> ⛔ **NEVER USE `az webapp up`** — this command is deprecated. Use the explicit create + deploy commands below.

## Prerequisites

- `az login` complete
- Subscription, resource group, region, and app name decided (see [create-app.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-python-appservice-deploy-references-create-app))
- App Service Plan (Linux, P0v3) and Web App (Python runtime) exist (see [create-app.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-python-appservice-deploy-references-create-app))

## 1. Enable server-side build

```bash
az webapp config appsettings set \
  -n <app> -g <rg> \
  --settings SCM_DO_BUILD_DURING_DEPLOYMENT=true
```
```powershell
az webapp config appsettings set `
  -n <app> -g <rg> `
  --settings SCM_DO_BUILD_DURING_DEPLOYMENT=true
```

This tells Oryx to run `pip install -r requirements.txt` during deploy.

## 2. Startup command — skip for Flask/Django, always set for FastAPI

Azure App Service (Oryx) auto-detects **Flask** and **Django** — **do not set a startup command** for these. Skip this step entirely.

For **FastAPI**, always set the uvicorn startup command, regardless of the Python runtime version. This skill does **not** rely on Oryx FastAPI auto-detection, so the behavior is identical on every supported runtime (3.12, 3.13, 3.14, …):

```bash
az webapp config set -n <app> -g <rg> \
  --startup-file "python -m uvicorn main:app --host 0.0.0.0"
```
```powershell
az webapp config set -n <app> -g <rg> `
  --startup-file "python -m uvicorn main:app --host 0.0.0.0"
```

(Replace `main:app` if the FastAPI entry point differs — e.g., `app.main:app`.)

For other frameworks (generic WSGI / ASGI / unknown), **skip this step** and emit the manual-startup warning. See [startup-commands.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-python-appservice-deploy-references-startup-commands).

## 3. Package the code

Zip the project (excluding venv, caches, git, node_modules):

```bash
# bash
zip -r app.zip . \
  -x ".git/*" -x ".venv/*" -x "venv/*" -x "__pycache__/*" \
  -x "*.pyc" -x ".env" -x "node_modules/*"
```

```powershell
# PowerShell
$exclude = @('.git','.venv','venv','__pycache__','node_modules')
$items = Get-ChildItem -Force | Where-Object { $exclude -notcontains $_.Name }
Compress-Archive -Path $items -DestinationPath app.zip -Force
```

## 4. Deploy the zip

```bash
az webapp deploy \
  -n <app> -g <rg> \
  --src-path app.zip \
  --type zip \
  --track-status false
```
```powershell
az webapp deploy `
  -n <app> -g <rg> `
  --src-path app.zip `
  --type zip `
  --track-status false
```

> 💡 `--track-status false` returns once the ZIP is **accepted by the SCM endpoint** — this is **not** the same as "Oryx build succeeded". The server-side `pip install` / startup-command rendering happens asynchronously after the CLI returns. A zero exit code only confirms the upload + a deployment record. If the site never starts, inspect the build outcome via `az webapp log deployment list/show` — that is the only authoritative confirmation that the build itself succeeded.

## 5. Stop. Report the endpoint to the user.

After `az webapp deploy` returns, the skill is done.

> ℹ️ `az webapp deploy` does **not** initiate a cold start by pinging the site. With `--track-status false`, it returns as soon as the SCM endpoint accepts the ZIP; the Oryx build and container restart happen asynchronously on the SCM side. The container only warms up when an inbound HTTP request actually hits `https://<app>.azurewebsites.net` — which is why the post-deploy message tells the user to expect a 2–3 minute wait on their first visit.

> ⛔ **Do NOT run** `az webapp log tail`, `curl`, `Invoke-WebRequest`, `wget`, or any other "verify startup" command. App Service routinely needs **2–3 minutes** to warm the container; a quiet log stream or a 5xx in the first couple of minutes is **not** a failure signal, and running these probes here will mislead the user.

Resolve the host name without hitting the site:

```bash
HOST=$(az webapp show -n <app> -g <rg> --query defaultHostName -o tsv)
echo "https://$HOST"
```
```powershell
$host_ = az webapp show -n <app> -g <rg> --query defaultHostName -o tsv
"https://$host_"
```

Then print the post-deploy message from [post-deploy-message.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-python-appservice-deploy-references-post-deploy-message) and end the turn. The user will run `az webapp log tail -n <app> -g <rg>` themselves if they want to watch logs.

## Common pitfalls

| Pitfall | Fix |
|---------|-----|
| Deployed code missing dependencies | `SCM_DO_BUILD_DURING_DEPLOYMENT=true` not set — re-run step 1 then redeploy |
| Container ping timeout on port 8000 | Wrong startup command — see [startup-commands.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-python-appservice-deploy-references-startup-commands) |
| Zip too large (>500 MB) | Exclude `.venv`, caches; consider `.deployment` `.gitignore`-style file |
| `webapp up` examples in older docs | Replace with `az webapp create` + `az webapp deploy` (this file) |
