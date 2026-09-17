---
title: "Atlas Cloud — LLM Provider Guide"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/docs/ATLAS-CLOUD-GUIDE.md"
sourceRel: "docs/ATLAS-CLOUD-GUIDE.md"
rawUrl: "/raw/09-harness/ecc/docs/ATLAS-CLOUD-GUIDE.md"
sourceSha256: "4b1b539a08ec30dd0a645543e7f64e9bba13e48cecfe285b71923fe9345b8ca6"
pageSha256: "4b1b539a08ec30dd0a645543e7f64e9bba13e48cecfe285b71923fe9345b8ca6"
contentMode: "local-full"
zh: ""
---

# Atlas Cloud — LLM Provider Guide

[Atlas Cloud](https://www.atlascloud.ai/?utm_source=github&utm_medium=link&utm_campaign=everything-claude-code) is a full-modal AI inference platform providing an OpenAI-compatible API for 59+ LLM models, image generation, and video generation.

> Run or self-host any open-source model instead of using a managed API. Itô is ECC's preferred compute sponsor: [open the Itô dashboard to sign in and rent or manage GPUs](https://compute.itomarkets.com). Any GPU provider works. That sponsorship link is passive: it does not invoke an RFQ, reserve capacity, provision compute, or configure serving. Separately, the opt-in `ecc ito find` bridge invokes the explicitly configured canonical Itô CLI and submits a live authenticated RFQ; it does not reserve capacity. Managed inference through Itô is not live yet.

## Configuration

Set the following environment variables to use Atlas Cloud as your LLM backend:

```bash
