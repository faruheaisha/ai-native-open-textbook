---
title: "Terraform Validation"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-validate/references/recipes/terraform/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-validate/references/recipes/terraform/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-validate/references/recipes/terraform/README.md"
sourceSha256: "d8c3ec8867edbff9923bba337bff5dc097a43e122f60ddf5a5b89138b955ab82"
pageSha256: "d8c3ec8867edbff9923bba337bff5dc097a43e122f60ddf5a5b89138b955ab82"
contentMode: "local-full"
zh: ""
---

# Terraform Validation

Validation steps for Terraform deployments.

## Prerequisites

- `./infra/main.tf` exists
- State backend accessible

## Run the preflight script

Run the pre-built validation script instead of executing each check by hand. It runs the
full deterministic preflight sequence in one call and prints a compact **PASS / FAIL / SKIP**
summary plus captured error text for any failed step — jump straight to remediation without
re-parsing raw command output.

| Script | Purpose |
|--------|---------|
| [`scripts/validate-terraform.sh`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-validate/references/recipes/terraform/scripts/validate-terraform.sh) | Bash preflight runner |
| [`scripts/validate-terraform.ps1`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-validate/references/recipes/terraform/scripts/validate-terraform.ps1) | PowerShell preflight runner |

The script runs, in order: Terraform installed → Azure CLI installed → authenticated
(`az account show`) → `terraform init` → `fmt -check` → `validate` → `plan` →
`state list` → Go-style <code v-pre>{{ .Env.* }}</code> template-variable scan → `main.tfvars.json`
JSON-syntax check. A subscription-selection step is added when a subscription id is
supplied. It runs **every** check even if an earlier one fails, and exits non-zero when
any step fails.

**Usage:**

```bash
./scripts/validate-terraform.sh [infra-dir] [subscription-id]   # infra-dir defaults to ./infra
```
```powershell
.\scripts\validate-terraform.ps1 [-InfraDir &lt;path>] [-SubscriptionId &lt;id>]
```

**Examples:**

```bash
./scripts/validate-terraform.sh                 # validate ./infra
./scripts/validate-terraform.sh ./infra 00000000-0000-0000-0000-000000000000
```
```powershell
.\scripts\validate-terraform.ps1 -InfraDir ./infra
```

**Reading the output:** the summary table lists every step as `PASS`, `FAIL`, or `SKIP`
(skipped when a prerequisite such as Terraform or the infra directory is missing). Each
`FAIL` is expanded in a **FAILURE DETAILS** section with the captured error text. Fix
failed steps using the guidance below, then re-run the script.

## Remediation

The script only **runs and reports** — fixing failures is manual. Guidance per step:

### Terraform / Azure CLI not installed

- Terraform: see https://developer.hashicorp.com/terraform/install
- Azure CLI: `mcp_azure_mcp_extension_cli_install(cli-type: "az")`

### Not authenticated / wrong subscription

```bash
az login
