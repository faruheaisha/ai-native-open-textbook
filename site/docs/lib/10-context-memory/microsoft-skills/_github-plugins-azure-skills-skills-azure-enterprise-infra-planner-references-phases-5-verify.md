---
title: "Phase 5: Verify Plan"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/phases/5-verify.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/phases/5-verify.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/phases/5-verify.md"
sourceSha256: "d139b7c65d0aa69ef3d04647649475a31fd7faa0a52cbabbee8033f544165349"
pageSha256: "d139b7c65d0aa69ef3d04647649475a31fd7faa0a52cbabbee8033f544165349"
contentMode: "local-full"
zh: ""
---

# Phase 5: Verify Plan

Thoroughly and objectively verify the generated plan based on the following checklists:
- [verification.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-enterprise-infra-planner-references-verification)
- [pairing-checks.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-enterprise-infra-planner-references-pairing-checks)

Other mandatory areas to check:
- Goal coverage — does every user requirement map to a resource?
- Dependency completeness — every `dependencies[]` entry resolves
- Pairing constraints — SKU compatibility, subnet conflicts, storage pairing

You must fix any issue in-place in the plan JSON.

## Gate
- Every item in **both** checklists pass (or have been fixed).
- Present plan to user and wait for manual and explicit approval before proceeding.
  - Edit `meta.status` to `approved` if approved.
  - Otherwise, ask the user for improvements, and return to Phase 2, 3, or 4 based on the nature of their request.
