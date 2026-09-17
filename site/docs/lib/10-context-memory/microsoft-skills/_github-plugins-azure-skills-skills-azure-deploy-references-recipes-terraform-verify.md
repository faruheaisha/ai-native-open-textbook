---
title: "Terraform Verification"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/terraform/verify.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-deploy/references/recipes/terraform/verify.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/terraform/verify.md"
sourceSha256: "ea364f0aff7df880afabd11493cd426e8ea2c914b0f67595b0b8c2b0f556be0f"
pageSha256: "ea364f0aff7df880afabd11493cd426e8ea2c914b0f67595b0b8c2b0f556be0f"
contentMode: "local-full"
zh: ""
---

# Terraform Verification

```bash
terraform output
terraform output -json
```

## Health Check

```bash
curl -s https://$(terraform output -raw api_url)/health | jq .
```

## Resource Check

```bash
az resource list --resource-group $(terraform output -raw resource_group_name) --output table
```

## Report Results to User

> ⛔ **MANDATORY** — You **MUST** present the deployed endpoint URLs to the user in your response.

Extract endpoints from Terraform outputs:

```bash
terraform output -raw api_url
```

Present a summary including all service URLs as fully-qualified `https://` links. If a Terraform output returns a bare hostname (e.g. `myapp.azurewebsites.net`), always prepend `https://`. Do NOT end your response without including them.
