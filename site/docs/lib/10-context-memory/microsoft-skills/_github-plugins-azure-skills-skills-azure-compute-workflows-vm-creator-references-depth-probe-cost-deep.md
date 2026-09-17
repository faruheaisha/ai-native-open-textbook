---
title: "Cost-deep branch"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/depth-probe/cost-deep.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/depth-probe/cost-deep.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/depth-probe/cost-deep.md"
sourceSha256: "0ce8ded123259950c3a9a4f8c066c2bd9d2286c6337fd3da6adfa3de87715dc3"
pageSha256: "0ce8ded123259950c3a9a4f8c066c2bd9d2286c6337fd3da6adfa3de87715dc3"
contentMode: "local-full"
zh: ""
---

# Cost-deep branch

| Topic | Question | Default |
|---|---|---|
| Spot vs regular | "Spot eligible (interruptible)?" | `regular` unless dev / batch |
| Spot max price | "Max spot price ($/hr) or pay up to on-demand?" | `-1` (= on-demand cap) |
| Reservations | "1-yr / 3-yr reservation?" | Skip — recommend post-deploy when usage is known |
| Hybrid Benefit | "Bring Windows Server / RHEL / SLES license?" | Ask only if OS is Windows or RHEL |
| Autoscale floor/ceiling (VMSS) | "Min / max instances?" | `min=1, max=3` for web tier; `min=0, max=10` for batch |
| Schedule shutdown | "Auto-shutdown nightly?" | Offer for dev / sandbox workloads |
| Disk tier | "OS disk tier: Premium SSD / Standard SSD / Standard HDD?" | Premium SSD |

## Notes

- Spot interruption rates vary by region and SKU; mention the user can check before committing via the Azure portal "Spot eviction rate" view.
- Reservations and savings plans need 30+ days of usage telemetry to recommend confidently — don't push them on a brand-new workload.
- Auto-shutdown via DevTest Labs is the cheapest scheduled-stop option for single VMs; for VMSS, scale-to-zero is better.
