---
title: "Workflow"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/workflow.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/workflow.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/workflow.md"
sourceSha256: "cc68a27d9c87bf73ecd5cabc2a212dcac2d34b9e4a18314946f1e2430e36891a"
pageSha256: "cc68a27d9c87bf73ecd5cabc2a212dcac2d34b9e4a18314946f1e2430e36891a"
contentMode: "local-full"
zh: ""
---

# Workflow

## Mandatory Rules

- You must execute the seven phases in sequential order. Follow the instructions precisely as defined. Do not continue to the next phase until the current phase is complete.
- You must stop on all "gate" conditions and only continue when the conditions have been met.
- Destructive actions require explicit user confirmation.
- **Confirmation gate vs. answer-first.** Always present a plain-language summary of your understanding plus an explicit "confirm before I proceed" checkpoint *before deploying* (Phase 7). In referenced mode you still generate the plan and IaC in the same turn (answer-first) — the gate governs *deployment*, not whether you produce the artifacts. Never end a turn with only a question, and never deploy without an explicit, risk-acknowledged go-ahead.
- **Never claim a gate passed without proof.** When a phase gate depends on a command (validation, security scan), run it and show its actual output/exit status; do not assert success from memory.
- You must read each phase's reference file in full before executing it.
- Never assume knowledge and cut corners or skip research steps.

## Overview

Starting from Phase 1, execute all phases in sequential order. Do not advance to the next phase until the current phase is complete and all of its gate conditions have been met.

## Phase 6 — hardened generation gate (apply inline)

The detailed generation reference files may not be loaded in every environment, so the Phase 6 gate is restated here and is mandatory. After generating the IaC, and **before** offering it or advancing to deploy:

1. **Secure-by-default.** Every resource: private endpoints + public network access disabled on data/PaaS services; managed identity + RBAC (never keys/connection strings); no secrets in code; storage shared-key access disabled; Key Vault soft-delete + purge protection; AKS managed identity with local accounts disabled; TLS 1.2 minimum.
2. **Validate + security-scan, fix until clean.** Bicep: `az bicep build --file infra/main.bicep`. Terraform: `terraform init -backend=false` then `terraform validate`. Then `checkov -d infra/`. Fix in-place and re-run until every command passes. **Paste the actual command output / exit status into your response** — never claim the gate passed without showing it. If a tool is genuinely unavailable, say so and self-review against the secure-by-default list.
3. **Completion self-check.** End Phase 6 with a checklist, each line marked pass/fail: validation clean (output shown); `checkov` no unresolved high/critical; secure-by-default applied; referenced resources wired and none recreated (referenced mode); files under `infra/` with original sources untouched.

> **Referenced workload?** If the user supplies something existing to reference or integrate with — a live Azure resource/resource group/subscription, a Bicep/Terraform/ARM file or infra plan, or a general doc of requirements/context — also read [referenced-workload.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-enterprise-infra-planner-references-referenced-workload) and apply it alongside these phases. If not, run greenfield exactly as below.

| Phase | Action | Reference | Key Gate |
|-------|--------|-----------|----------|
