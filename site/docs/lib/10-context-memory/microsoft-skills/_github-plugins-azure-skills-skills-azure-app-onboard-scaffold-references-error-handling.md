---
title: "Error Handling — Scaffold Sub-Skill"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-app-onboard/scaffold/references/error-handling.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-app-onboard/scaffold/references/error-handling.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-app-onboard/scaffold/references/error-handling.md"
sourceSha256: "02f0c51c47f6f2a1a5227fe23ed9b17a1c3ffef3a8e27ab3e4a24ccd3219ffc7"
pageSha256: "02f0c51c47f6f2a1a5227fe23ed9b17a1c3ffef3a8e27ab3e4a24ccd3219ffc7"
contentMode: "local-full"
zh: ""
---

# Error Handling — Scaffold Sub-Skill

| Error | Remediation |
|-------|-------------|
| `prepare-plan.json` missing | Trigger prepare backfill via `azure-app-onboard` orchestrator. Do not generate IaC without a plan. |
| Existing Azure IaC (`.bicep`, `azure.yaml`, or `.tf` with `azurerm` provider) | ⛔ Never delete/overwrite; move to `.copilot-azure/sessions/<id>/replaced-files/` (mirror path), tell the user their original was preserved at that backup location, then scaffold. |
| Existing non-Azure IaC (`.tf` with GCP/AWS provider) | Generate Azure TF alongside — see [terraform-patterns.md § Non-Azure IaC coexistence](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-scaffold-references-terraform-patterns). Do NOT halt. |
| MCP tool unavailable | Fall back to reference patterns. Flag generated IaC as "unverified against best practices." |
| Self-review finds FLAGGED items | Include in `scaffold-manifest.json.selfReview.findings[]`. Surface at approval gate. |
| Self-healing exhausted (3 attempts) | Pause auto-healing. Present diagnosis: (1) explain error pattern, (2) propose specific next fix, (3) ask user: "Yes, try that" / "I have a suggestion" / "Stop." If user continues, auto-heal for 5 more, then ask every 5 thereafter. If user stops, write `validationResult` with `status: "Failed"` and all errors. Do NOT proceed to deploy. |
| Schema summary exceeds token limit | Use sub-agent pattern: compress each schema to ≤500 tokens. |
| `context.json` malformed | Halt. Report: "Session state corrupted — consider starting a fresh session." |
