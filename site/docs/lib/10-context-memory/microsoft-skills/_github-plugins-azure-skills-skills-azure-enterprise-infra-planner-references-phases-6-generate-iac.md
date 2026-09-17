---
title: "Phase 6: Generate IaC"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/phases/6-generate-iac.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/phases/6-generate-iac.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/phases/6-generate-iac.md"
sourceSha256: "94e1f2e5798bdee5833e245a93c26cd6cb1d7fac470976f98c5e54f7ef1d7067"
pageSha256: "94e1f2e5798bdee5833e245a93c26cd6cb1d7fac470976f98c5e54f7ef1d7067"
contentMode: "local-full"
zh: ""
---

# Phase 6: Generate IaC

> Important: Before continuing this phase, `meta.status` must be set to `approved` as required by Phase 5.

1. Ask the user whether to generate Bicep or Terraform.
2. Generate IaC from the approved plan. Refer to [bicep-generation.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-enterprise-infra-planner-references-bicep-generation) for Bicep or [terraform-generation.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-enterprise-infra-planner-references-terraform-generation) for Terraform.
3. **Apply secure-by-default (mandatory).** Unless the approved plan explicitly overrides a control, every generated resource must use:
   - Private endpoints and `publicNetworkAccess: Disabled` on data/PaaS services — no unnecessary public exposure.
   - Managed identity + RBAC instead of keys/connection strings; no secrets in code (`@secure()` / `sensitive = true`).
   - Storage `allowSharedKeyAccess: false`; Key Vault soft-delete + purge protection; AKS managed identity with local accounts disabled.
   - Minimum TLS 1.2 and encryption in transit.
4. **Validate, security-scan, and fix until clean (mandatory, self-verifying).** No-deploy, purely local:
   - **Bicep:** run `az bicep build --file infra/main.bicep`.
   - **Terraform:** run `terraform init -backend=false` then `terraform validate` in `infra/`.
   - **Security scan:** run `checkov -d infra/` and resolve every high/critical finding.
   - If any command reports errors or unresolved high/critical findings, fix the files in-place and re-run. Repeat until every command exits cleanly.
   - **Prove it:** paste the exact command(s) run and their final exit status / summary into your response. Do not claim the gate passed without showing the output. If a tool is genuinely unavailable, say so explicitly and self-review against the generation correctness checklist and the secure-by-default list above.
5. **Emit the completion self-check.** End Phase 6 with this checklist, each line marked pass/fail with a one-line reason:
   - [ ] Validation ran and exited clean (output shown)
   - [ ] `checkov` ran; no unresolved high/critical findings
   - [ ] Secure-by-default applied (private endpoints, MI/RBAC, TLS 1.2, no secrets)
   - [ ] Referenced resources wired, none recreated (referenced mode only)
   - [ ] Files under `infra/`; original source artifacts untouched

## Gate
