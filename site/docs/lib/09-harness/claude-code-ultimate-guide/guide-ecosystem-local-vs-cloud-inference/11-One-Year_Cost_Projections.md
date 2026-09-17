---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/local-vs-cloud-inference.md"
sourceRel: "guide/ecosystem/local-vs-cloud-inference.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/local-vs-cloud-inference.md"
sourceSha256: "00496bd48f05d6c0aec914f5f08a661c246e97789034e76fdb1c297813f7a5d6"
pageSha256: "b2b10e6cb084d51157fad0bc086a13bfb96335191e89a2b98772411ff8254f88"
contentMode: "local-full"
zh: ""
---

## One-Year Cost Projections

`annual cost = price/hour × hours/day × 365`. Three usage patterns, same GPU class (H100/H200), across providers.

This is a rental-spend model, not a complete total-cost-of-ownership calculation. It excludes persistent storage, data transfer, reserved-use discounts, local electricity and cooling, maintenance time, financing, resale value, downtime, and the cost of keeping spare capacity. It also does not make an H100 rental performance-equivalent to a cheaper local Mac or Ryzen system.

| Provider / GPU | 4h/day | 8h/day | 24/7 |
|---|---|---|---|
| OVH H100 80 GB | ≈€4,088 | ≈€8,176 | ≈€24,528 |
| GMI Cloud H100 80 GB | ≈$2,920 (≈€2,716) | ≈$5,840 (≈€5,431) | ≈$17,520 (≈€16,294) |
| GMI Cloud H200 | ≈$3,796 (≈€3,530) | ≈$7,592 (≈€7,061) | ≈$22,776 (≈€21,182) |
| Decentralized H100 (≈$3/h) | ≈$4,380 | ≈$8,760 | ≈$26,280 |
| Lambda H100 80 GB | ≈$6,263 (≈€5,825) | ≈$12,527 (≈€11,650) | ≈$37,580 (≈€34,955) |
| AWS H200 spot | ≈$4,925 (≈€4,580) | ≈$9,850 (≈€9,161) | ≈$29,547 (≈€27,479) |
| AWS H200 on-demand | ≈$11,552 (≈€10,743) | ≈$23,104 (≈€21,487) | ≈$69,309 (≈€64,457) |
| AWS H100 (≈$10/h estimate) | ≈$14,600 (≈€13,578) | ≈$29,200 (≈€27,156) | ≈$87,600 (≈€81,468) |

Hetzner's GEX131 (RTX PRO 6000 Blackwell 96 GB) doesn't fit this hourly-prorated format since it bills a flat €889/month regardless of hours used, but at 12 months of straight rental (€10,668/year) it is worth comparing directly against buying: see below.

Cross-referenced against the hardware table above:

**At light usage (4h/day), OVH's H100 rental spend for one year (≈€4,088) lands near the purchase price of a Ryzen AI Halo or DGX Spark (≈€3,700-4,700).** This is a cash-spend crossover, not a performance comparison. The H100, Ryzen, and DGX systems differ in memory, throughput, software support, and availability. Buying only becomes the lower-cost choice if the local machine can run the same workload at the required service level after power and operations are included.

**Hetzner's 96 GB dedicated rental costs less for one year than buying the workstation card alone, but the hardware variants are not equivalent.** A full year of GEX131 rental costs €10,668. Hetzner lists an RTX PRO 6000 Blackwell Max-Q at up to 300 W, while the ≈€14,000 purchase comparison uses the Workstation Edition rated at 600 W. Both expose 96 GB, but the power envelope can affect sustained throughput. The card-only spend crosses €10,668 after about 15.7 months; comparing against the complete €16,000-18,000 workstation moves the nominal crossing to roughly 18-20 months before local electricity, maintenance, and resale value. The supported conclusion is narrower than "rent always beats buy": GEX131 is a strong one-year option when 96 GB of accelerator memory is sufficient, but benchmark the exact workload before treating it as performance-equivalent to the workstation card.

![Annual spend comparison: about 14,000 euros for an RTX PRO 6000 Workstation card versus 10,668 euros for one year of a Hetzner GEX131 with an RTX PRO 6000 Max-Q](/mirror/47/47c3e92fca40c12e8b491aaf3232b1fa6bb07e98.webp)

*Spend comparison only. The rental uses the 300 W Max-Q variant; the purchase price uses the 600 W Workstation Edition. The graphic does not establish equivalent throughput.*

**GMI Cloud is the cheapest elastic (per-second, not dedicated) H100/H200 option found on this page, undercutting even OVHcloud.** At 24/7, GMI's listed H100 price produces ≈€16,294/year, versus ≈€24,528/year from OVH's listed H100 price. The accelerator name matches, but host CPU, storage, networking, availability, and service terms may differ.

**AWS on-demand list prices are not competitive in this snapshot for a single-GPU, workstation-shaped inference workload.** Even at 4h/day, the estimated AWS H100 spend (≈€13,578/year) approaches the purchase price of one RTX PRO 6000 workstation. At 24/7, the estimate reaches ≈€81,468/year. Enterprise discounts, existing AWS commitments, regional availability, managed services, and network locality can change that decision; the table only supports a conclusion about the public prices and workload shape compared here.
