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
pageSha256: "37f806b86e34bd3f5afa784b70d50bb68f2c261fd72c5e4007775f1ef8473770"
contentMode: "local-full"
zh: ""
---

## Table of Contents

- [Data Snapshot Date](#data-snapshot-date)
- [Sizing Local Hardware with llmfit](#sizing-local-hardware-with-llmfit)
- [Benchmark Protocol Before You Buy](#benchmark-protocol-before-you-buy)
- [Fourteen Comparable Hardware Configurations](#fourteen-comparable-hardware-configurations)
- [What Actually Fits: Named Models](#what-actually-fits-named-models)
- [Which Local Machine for Which Usage](#which-local-machine-for-which-usage)
- [Serving Engine Tuning: vLLM in Production](#serving-engine-tuning-vllm-in-production)
- [Coding Agent Setup: Apple Silicon with MLX](#coding-agent-setup-apple-silicon-with-mlx)
- [Cloud GPU Rental Pricing](#cloud-gpu-rental-pricing)
- [One-Year Cost Projections](#one-year-cost-projections)
- [Power Consumption: Watts, Watt-Hours, Joules per Token](#power-consumption-watts-watt-hours-joules-per-token)
- [Energy Efficiency by Model Architecture](#energy-efficiency-by-model-architecture)
- [Cloud API Throughput: Claude vs GPT-5.6](#cloud-api-throughput-claude-vs-gpt-56)
- [Why Cloud and Local Tokens/Sec Are Not Comparable](#why-cloud-and-local-tokenssec-are-not-comparable)
- [Decision Diagram](#decision-diagram)
- [Decision Framework](#decision-framework)
- [Sizing Self-Hosted Inference for a Team](#sizing-self-hosted-inference-for-a-team)
- [Switching Providers at the CLI Level](#switching-providers-at-the-cli-level)
