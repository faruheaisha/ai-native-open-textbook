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
pageSha256: "3af8d1b98abfd7ff4666dbfd4269b49028daf0214542775414683c25ae909d66"
contentMode: "local-full"
zh: ""
---

## Decision Framework

**Light or bursty usage, with no requirement to own the hardware**: start with a managed API (Claude, GPT-5.6) or a specialized inference provider. This avoids idle hardware and maintenance. Check model quality, data handling, and rate limits before comparing token prices alone.

**Sustained usage, 4-8 hours a day**: benchmark the exact model locally and on the rental GPU. If the workload requires an H100-class accelerator, the hourly rental table gives a relevant starting point. If a 20-30B quantized model already meets the quality target on a Mac mini or workstation, the cheaper local system and the H100 are not comparable purchases. AWS's public on-demand prices remain a poor fit for the single-GPU workload modelled on this page, but existing enterprise commitments can change the effective price.

**Heavy or 24/7 usage**: compare a complete purchase TCO with dedicated and elastic rental. At high utilization, elastic hourly list-price spend can cross the hardware purchase price inside a year, but power, cooling, maintenance, availability, and resale value move the result. Hetzner's GEX131 is the counter-example in this snapshot: one year of its 96 GB Max-Q server costs less than the workstation card alone, while also providing a host system. Its lower power envelope means the workload still needs a direct performance test.

**Need genuinely huge models (up to ≈300-400B) locally**: the Mac Studio M5 Ultra 256 GB and dual RTX PRO 6000 Blackwell workstation 192 GB can hold DeepSeek-V4-Flash-0731's weights within the available 100-170 GB third-party estimates. The upper estimate leaves limited runtime and KV-cache headroom on 192 GB, so context and concurrency must be tested. Llama 4 Maverick's 205.7 GB estimate fits only on the 256 GB Mac Studio. GLM-5.2, DeepSeek-V4-Pro, and the multi-trillion-parameter MoE releases require CPU offload or hardware beyond the full-residency configurations covered here.

**Data must remain on hardware your organization owns**: managed APIs and rented cloud hardware do not meet that requirement. Buy local hardware sized and benchmarked against the actual model. If the requirement concerns region, operator access, encryption, or contractual control rather than hardware ownership, a dedicated or sovereign-cloud deployment may still qualify after a security and compliance review.

A practitioner account from two legacy-system RAG projects gives an adjacent example of that trade-off. Susanne Pieterse said both projects started with cloud APIs, then tested self-hosted Llama because the clients would not send private information to a public cloud. The self-hosted path worked, but was slower, less polished, and moved spend toward costly hardware. This is evidence that sovereignty can justify self-hosting despite weaker operating economics. It is not a coding-agent benchmark or a break-even calculation. Source: [Susanne Pieterse, "RAG in the wild," 09:38](https://www.youtube.com/watch?v=_Hbn-WhMiHA&t=578s), published 2026-04-08.
