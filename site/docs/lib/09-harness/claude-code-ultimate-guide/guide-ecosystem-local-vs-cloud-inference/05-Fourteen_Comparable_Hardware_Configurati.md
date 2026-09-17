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
pageSha256: "43e6b90fa97e4bd5cb46532f2c87b57e1ccd91d1e947e74cbc26829958e4c739"
contentMode: "local-full"
zh: ""
---

## Fourteen Comparable Hardware Configurations

Bare GPUs are not comparable to laptops or appliances. The table below only lists complete systems: CPU, memory, GPU, and storage together, sorted by increasing price. For workstation builds around a bare Nvidia GPU (no fixed CPU from the vendor), the CPU column shows one realistic example, not a spec. The first three rows are the entry tier a reader specifically asked for: machines with a GPU (dedicated or unified) capped around 16-32 GB, cheap enough to try local inference without committing to a €4,000+ build.

![Sixteen gigabytes is enough to start: RTX 5060 Ti workstation at about 1,500 euros or Mac mini M6 at 1,049 euros both run gpt-oss-20b comfortably](/mirror/96/9672a992815f43b638af2d8628b43089ce6ecb98.webp)

| # | Configuration | CPU | System memory | GPU | Storage | Price (Aug 2026) |
|---|---|---|---|---|---|---|
| 1 | Mac mini, Apple M6 | Apple M6, 12 cores (2 super + 4 performance + 6 efficiency) | 16-32 GB unified | Integrated GPU, 12 cores, 170 GB/s bandwidth | 256 GB-2 TB SSD | €1,049 (16 GB/256 GB base) / ≈€1,500 est. at 32 GB max (+$400 BTO) |
| 2 | Workstation, 1x RTX 5060 Ti 16 GB | *Example*: AMD Ryzen 5 7600, 6 cores | 32-64 GB DDR5 (host only) | RTX 5060 Ti, 4,608 CUDA cores, 16 GB GDDR7 dedicated, 448 GB/s | 1-2 TB NVMe | ≈€1,300-1,600 (GPU alone: $429 MSRP, ≈€590-730 street Aug 2026) |
| 3 | Mac mini, Apple M5 Pro | Apple M5 Pro, 15 or 18 cores | 24-64 GB unified | Integrated GPU, 16 or 20 cores, 307 GB/s bandwidth | 512 GB-8 TB SSD | €1,999 (24 GB/512 GB base) / ≈€3,000 est. at 64 GB max (+$1,000 BTO) |
| 4 | AMD Ryzen AI Halo | Ryzen AI Max+ 395, Zen 5, 16 cores/32 threads | 128 GB unified LPDDR5x | Radeon 8060S integrated, 40 CU RDNA 3.5, no dedicated VRAM | 2 TB SSD | ≈$3,999 (≈€3,700-4,000) |
| 5 | NVIDIA DGX Spark | Grace, 20 Arm cores (10x Cortex-X925 + 10x Cortex-A725) | 128 GB unified LPDDR5x | GB10 Blackwell, 6,144 CUDA cores (48 SM), no dedicated VRAM | 4 TB NVMe (included) | ≈$4,699 (≈€4,180-4,700) |
| 6 | MacBook Pro, Apple M5 Pro | Apple M5 Pro, 15 or 18 cores | 48 GB unified | Integrated GPU, 20 cores | 2 TB SSD | ≈€4,500-5,000 |
| 7 | Workstation, 1x RTX 5090 | *Example*: AMD Ryzen 9 9950X, 16 cores | 64-128 GB DDR5 (host only) | RTX 5090, 21,760 CUDA cores, 32 GB GDDR7 dedicated | 2-4 TB NVMe | ≈€5,000-6,000 |
| 8 | MacBook Pro, Apple M5 Max | Apple M5 Max, 18 cores | 128 GB unified | Integrated GPU, 40 cores | 2 TB SSD | ≈€5,500-6,500 |
| 9 | AMD Ryzen AI Max PRO 400 ("Gorgon Halo") | Ryzen AI Max+ PRO 495, Zen 5, 16 cores/32 threads, up to 5.2 GHz | 192 GB unified + 160 GB dedicated graphics memory | Radeon 8065S integrated, 40 CU RDNA 3.5 | 2-4 TB (estimated) | Unannounced, ≈€5,000-10,000 est. (Q3 2026 launch, no independent benchmark exists) |
| 10 | Workstation pair, 2x NVIDIA DGX Spark | 2x Grace, 20 Arm cores each (10x Cortex-X925 + 10x Cortex-A725) | 256 GB unified LPDDR5x combined (2x128 GB) | 2x GB10 Blackwell, 12,288 CUDA cores combined (96 SM), no dedicated VRAM, no NVLink | 2x 4 TB NVMe (included) | ≈$9,398 (≈€8,360-9,400), twice the single-unit price above |
| 11 | Workstation, dual RTX 5090 | *Example*: AMD Threadripper 7960X, 24 cores | 128-256 GB DDR5 (host only) | 2x RTX 5090, 43,520 CUDA cores combined, 64 GB GDDR7 combined, no NVLink | 4 TB NVMe | ≈€8,000-12,000 |
| 12 | Mac Studio, Apple M5 Ultra | Apple M5 Ultra, 36 cores | 256 GB unified | Integrated GPU, 80 cores | 4 TB SSD | ≈€12,000 |
| 13 | Workstation, RTX PRO 6000 Blackwell | *Example*: AMD Threadripper PRO 7975WX, 32 cores | 128-256 GB DDR5 ECC (host only) | RTX PRO 6000, 24,064 CUDA cores, 96 GB GDDR7 ECC dedicated | 4 TB NVMe | ≈€16,000-18,000 (the card alone is ≈€14,000) |
| 14 | Workstation, dual RTX PRO 6000 Blackwell | *Example*: AMD Threadripper PRO 7995WX, 96 cores | 256 GB+ DDR5 ECC (host only) | 2x RTX PRO 6000, 48,128 CUDA cores combined, 192 GB GDDR7 combined, no NVLink | 4-8 TB NVMe | ≈€30,000-32,000+ |

Sources: Nvidia RTX 5090 and RTX PRO 6000 Blackwell core counts and VRAM confirmed via [Central Computer](https://www.centralcomputer.com/pny-nvidia-rtx-pro-6000-graphics-card-96gb-gddr6-24-064-cuda-cores-pci-express-5-0-x16-600w-vcnrtxpro6000b-pb.html) and [Schneider Digital](https://shop.schneider-digital.com/en/graphics-cards/nvidia/rtx-pro-blackwell-series/nvidia-rtx-pro-6000-blackwell-workstation-edition-96gb-pcie-5.0-x16) (card price ≈€14,000). RTX 5060 Ti 16 GB specs and MSRP from [VideoCardz](https://videocardz.com/newz/nvidia-announces-geforce-rtx-5060-ti-at-429-16gb-and-379-8gb-299-rtx-5060-launches-next-month), street price range from [BestValueGPU's August 2026 tracker](https://bestvaluegpu.com/history/new-and-used-rtx-5060-ti-16gb-price-history-and-specs/). GB10 specs from [Arm Learning Paths](https://learn.arm.com/learning-paths/laptops-and-desktops/dgx_spark_llamacpp/1_gb10_introduction/) and [NVIDIA DGX Spark](https://www.nvidia.com/en-us/products/workstations/dgx-spark/). Radeon 8060S CU count from [TechPowerUp](https://www.techpowerup.com/342635/amd-readies-ryzen-ai-max-388-8c-16t-and-full-40-cu-radeon-8060s-gpu). Apple M5 Pro/Max chip specs (core counts, memory bandwidth, confirmed 24/48/64 GB tiers) from [Apple's own tech specs page](https://support.apple.com/en-mide/126318). Apple has not published M5 Ultra specs; the 256 GB / 36-core / 80-core figures come from pre-launch reporting, not an Apple source. Mac mini M6 and M5 Pro were announced August 25, 2026 (shipping September 22, 2026): chip specs and memory tiers from [9to5Mac's launch coverage](https://9to5mac.com/2026/08/25/apple-announces-new-mac-mini-heres-everything-new/), French base pricing from [MacGeneration](https://www.macg.co/mac/2026/08/de-700-eu-1-050-eu-en-moins-de-deux-ans-le-tarif-du-mac-mini-nen-finit-plus-de-bouger-310595), USD BTO memory upgrade pricing (the basis for the EUR "est." figures above, since Apple's French config-by-config EUR pricing wasn't independently reachable) from [Daring Fireball's configuration breakdown](https://daringfireball.net/2026/08/configurations_and_pricing_for_new_mac_minis_and_mac_studios).
