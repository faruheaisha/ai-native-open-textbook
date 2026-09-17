---
title: "Pipeline Rules — Runtime Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-app-onboard/references/pipeline-rules-runtime.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-app-onboard/references/pipeline-rules-runtime.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-app-onboard/references/pipeline-rules-runtime.md"
sourceSha256: "d6691f967d57661ff69f8ab449c812ac3510da331bc69d379f0804ea1a23d538"
pageSha256: "d6691f967d57661ff69f8ab449c812ac3510da331bc69d379f0804ea1a23d538"
contentMode: "local-full"
zh: ""
---

# Pipeline Rules — Runtime Reference

Known platform bugs and deploy timing. Read before deploy completion or on scaffold/deploy error.

For core pipeline rules (approval gates, phase lifecycle, session artifacts, security baseline), see [pipeline-rules.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-references-pipeline-rules).

## Known Platform Bugs

| Bug | Symptom | Workaround |
|-----|---------|------------|
| SWA CLI Windows path with spaces | `StaticSitesClient.exe` fails when workspace path contains spaces | Use a short, space-free temp path on FIRST attempt (e.g., `C:\temp\swadeploy` on Windows, `/tmp/swa-deploy` on macOS/Linux) — do NOT wait for retry. Copy app content to the temp path before running `swa deploy`. |
| `az deployment sub validate` HTTP stream | "HTTP response stream consumed" error (Azure CLI bug, also affects `create` in CLI 2.75.0+) | `validate`: use `az deployment sub what-if` instead. `create`: use `az rest --method PUT` on deployment URI as fallback. |
| `az quota list` extension error | `PermissionError: [WinError 5]` blocks extension commands | Use `az rest` instead (see [sku-quota-validation.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-prepare-references-sku-quota-validation)) |
| Managed identity sidecar OOM on free/basic-tier Linux | `503 Service Unavailable` with `Microsoft.Azure.WebSites.DataProtection` or `/msi/token` timeout | Avoid managed identity on free/basic-tier Linux compute (F1, B1) — use connection strings or upgrade to S1+ |
| `Compress-Archive` path flattening | PowerShell's `Compress-Archive -Path $files.FullName` uses absolute paths, flattening directory structure | Use `System.IO.Compression.ZipFile` with relative paths instead |
| AADSTS530084 (Terraform) | Token protection conditional access policy breaks `azurerm` provider auth; regular `az` CLI commands work fine | Re-scaffold as Bicep |
| Secret values with shell special chars | Passwords containing `$`, `` ` ``, `!`, `'`, `"` break when passed as inline CLI args (`--parameters key=val`) | **ALWAYS pass secrets via `main.parameters.json` or `terraform.tfvars`** — never as inline `--parameters` args. For deploy-phase secret seeding (`az keyvault secret set`), use `--file` with a temp file or pipe from stdin to avoid shell interpolation. |
| `az acr task logs` encoding crash | `UnicodeEncodeError` on Windows from Unicode chars in build logs | Use `--no-format` + strip non-ASCII, or REST API `listLogSasUrl` |
| `create` tool nested path failure | `"Parent directory does not exist"` when creating files in `.copilot-azure/sessions/\{id\}/` | Run `New-Item -ItemType Directory -Path \{parent\} -Force` before `create`. Platform tool limitation — agent always recovers. |
| Windows PowerShell `az rest` 415 error | `az rest --method put --body '\{json\}'` returns `415 Unsupported Media Type` on Windows PowerShell | Add `--headers "Content-Type=application/json"` to every `az rest --method put` call |

## Deploy Timing

- **F1 App Service cold-start:** After IaC creation, F1 plans need 30–120 seconds before the Kudu sidecar is ready. Deploying code immediately after `az deployment group create` returns causes 504 Gateway Timeout. Wait for sidecar readiness before code deployment.
- **Identity tag resolution:** Resolve `deployed-by` once at session start via `az ad signed-in-user show`. Without this, resources may receive inconsistent tag values (display name, UPN, or hardcoded strings) across different runs.

## Shell Rules

⛔ Shell variables do NOT persist between tool calls. Generate secrets inline within the command that consumes them — never store in `$env:` for later use. Use synchronous shells for all deploy-phase operations.
