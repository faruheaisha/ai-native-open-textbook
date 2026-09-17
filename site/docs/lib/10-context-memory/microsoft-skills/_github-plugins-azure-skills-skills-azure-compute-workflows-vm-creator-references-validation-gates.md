---
title: "Validation Gates"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/validation-gates.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/validation-gates.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/validation-gates.md"
sourceSha256: "d4a0fd3342cf05c740d20403ea70f13323c27cab83412ec61a6e2c38f5718c6b"
pageSha256: "d4a0fd3342cf05c740d20403ea70f13323c27cab83412ec61a6e2c38f5718c6b"
contentMode: "local-full"
zh: ""
---

# Validation Gates

Step 4 of the create-flow runs four read-only checks before the Plan Card is shown. Required path: Azure MCP. Fallback: CLI patterns in [mcp-tools.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-vm-creator-references-mcp-tools). Do **not** substitute generic guidance tools (`get_azure_bestpractices`, `pricing`) — they don't validate quota, SKU availability, or region support.

## Checks

| Check | MCP tool | What to verify |
|---|---|---|
| SKU exists in region | `compute_vm_list-skus` (`location`, `minVCpus`, `minMemoryGb`, optional `familyPrefix`) | At least one matching SKU, no `restrictions` in target zone |
| Image is current | `compute_vm_list-images` (alias or `publisher`/`offer`/`sku`) | Alias resolves to a published URN |
| vCPU quota | `compute_vm_check-quota` (`location`, `family`) | `currentValue + requestedVCPUs ≤ limit` |
| Region availability | `compute_vm_recommend-region` (workload hints) | Region exists and supports the family |

## Outcomes

| Result | Action |
|---|---|
| ✅ Sufficient | Proceed to Step 5 (Plan Card) |
| ⚠️ Near limit (>80%) | Proceed but flag in Plan Card; suggest quota increase |
| ❌ Insufficient / SKU missing | Propose alternate SKU or region; do not generate output |

## Common failures

| Symptom | Cause | Fix |
|---|---|---|
| `compute_vm_list-skus` returns empty | Filter too narrow; SKU not in region | Drop `familyPrefix`; lower `minVCpus`; try another region |
| Quota at limit | Subscription cap | Smaller SKU / different family / different region / quota-increase request |
| Image URN unresolved | Wrong alias; deprecated image | Switch to `publisher`/`offer`/`sku`/`version` form; check Marketplace |
| Region rejects family | Family not GA in region | Use `compute_vm_recommend-region` to find a region that supports the family |

## When Azure MCP is not connected

Warn the user that pre-flight checks are reduced. Use the CLI equivalents in [mcp-tools.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-vm-creator-references-mcp-tools):

- `az vm list-skus --location <region> --output table`
- `az vm image list --location <region> --offer ubuntu-24_04-lts --all`
- `az vm list-usage --location <region> --output table`

These don't gate the artifact generation — they're informational. Surface their output verbatim so the user can self-check.
