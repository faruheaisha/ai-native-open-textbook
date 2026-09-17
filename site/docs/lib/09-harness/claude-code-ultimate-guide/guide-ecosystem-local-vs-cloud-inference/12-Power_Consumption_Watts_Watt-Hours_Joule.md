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
pageSha256: "78ab16c96dcfaeb04b419f673056230f35a68d700403d38cad737431a6fa9234"
contentMode: "local-full"
zh: ""
---

## Power Consumption: Watts, Watt-Hours, Joules per Token

OVHcloud, AWS, Lambda, GMI Cloud, and Hetzner do not expose watts-per-token, kWh-per-1000-tokens, or a per-request energy figure for the GPU instances checked for this page. Anthropic and OpenAI also do not disclose energy-per-token or energy-per-query for Claude Opus 5, Sonnet 5, or GPT-5.6 Sol/Terra/Luna. The tables below separate official power ceilings, vendor measurements, independent measurements, and the small number of per-token energy measurements that are available.

**Official TDP and board power specs** (the ceiling the cooling and power delivery are designed for, not what a workload actually draws):

| Hardware | Power spec | Source |
|---|---|---|
| RTX 5090 | 575 W TDP, 950 W recommended PSU | [TechPowerUp](https://www.techpowerup.com/gpu-specs/geforce-rtx-5090.c4216) |
| RTX PRO 6000 Blackwell Server Edition | 400-600 W | [NVIDIA](https://www.nvidia.com/en-us/data-center/rtx-pro-6000-blackwell-server-edition/) |
| RTX PRO 6000 Blackwell Workstation Edition | 600 W | [NVIDIA](https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-6000-family/) |
| RTX PRO 6000 Blackwell Max-Q | 300 W | [NVIDIA](https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-6000-family/) |
| AMD Ryzen AI Max+ 395 (Ryzen AI Halo SoC) | 55 W nominal, 45-120 W configurable | [TechPowerUp](https://www.techpowerup.com/cpu-specs/ryzen-ai-max-395.c3994) |
| MacBook Pro 14" M5 Pro/M5 Max | 96 W USB-C adapter, 72.4 Wh battery | [Apple tech specs](https://support.apple.com/en-mide/126318) |
| NVIDIA DGX Spark | 240 W USB-PD adapter (ceiling only) | [NVIDIA](https://www.nvidia.com/en-us/products/workstations/dgx-spark/) |

**Whole-system measurements** (the Apple figures are vendor-published; the DGX Spark result is an independent review):

| Hardware | Measured power | Notes |
|---|---|---|
| Mac Studio, M3 Ultra (32-core CPU, 80-core GPU, 512 GB, 16 TB SSD) | 9 W idle, 270 W max | [Apple's own support document](https://support.apple.com/en-us/102027), wall-measured |
| Mac Studio, M1 Ultra (20-core CPU, 48-core GPU, 64 GB, 1 TB SSD) | 13 W idle, 215 W max | Same Apple document, for scale across generations |
| NVIDIA DGX Spark | 40-45 W idle, **60-90 W during typical LLM inference**, under 200 W under combined CPU+GPU stress | [ServeTheHome review](https://www.servethehome.com/nvidia-dgx-spark-review-the-gb10-machine-is-so-freaking-cool/4/), the only independently measured LLM-specific figure on this page |

No independently measured, LLM-specific power figure exists in the sources checked for the RTX 5090, the RTX PRO 6000 Blackwell family, or the Ryzen AI Halo platform. Anyone quoting a watts-per-token number for those specific GPUs today is extrapolating from the TDP, not reporting a measurement, and this page won't manufacture a fake-precise number to fill that gap.

**The one directly measured joules-per-token figure found**, from [ML.Energy's longitudinal analysis](https://ml.energy/blog/measurement/energy/llm-inference-energy-a-longitudinal-analysis/): Llama 3.1 8B on H100, batch size 64, dropped from 0.20 J/token (v2.0, September 2024) to 0.12 J/token (v3.0, December 2025), a 41% reduction from software and kernel improvements alone, same hardware. The 70B and 405B Llama 3.1 models showed comparable reductions (up to 15% and 39% respectively) between the same two software generations, though ML.Energy's public writeup doesn't give the absolute J/token value for those larger sizes. For the 8B measurement, the newer stack produced about 1.67 times as many tokens per joule on the same hardware. That software effect is large enough to invalidate comparisons built from GPU TDP alone.

**[Neuralwatt](https://portal.neuralwatt.com/pricing)** is the one inference provider found that publishes a real per-request energy figure in watt-hours, for GLM-5.2 variants, alongside its per-token pricing. The exact number moves: a check during this page's research showed ≈1.96 Wh for the standard variant and ≈1.17 Wh for the "fast" variant, while an earlier automated search the same day returned ≈2.29 Wh and ≈1.73 Wh for the same two variants. Neuralwatt runs a live energy-pricing page, so treat the exact figure as a snapshot that moves, not a fixed constant, and convert to joules per token only if you know the actual token count of your own requests (Wh × 3600 ÷ tokens).

**To measure your own hardware rather than guess**, [TokenPowerBench](https://github.com/chenxuniu/TokenPowerBench) (open source, MIT-style benchmarking tool, [arXiv paper](https://arxiv.org/html/2512.03024v1)) instruments GPU and system power through software telemetry and computes phase-aware joules-per-token, joules-per-response, and energy-delay-product metrics, without needing external metering hardware. The formula underlying every number on this page is simple: energy per token (joules) equals system power (watts) divided by throughput (tokens per second). Anyone can compute this for their own setup with a wall meter or `nvidia-smi`/`powermetrics` and a stopwatch; nobody should trust a watts-per-token number, including any that later gets added to this page, without knowing whether it came from a spec sheet, a wall measurement, or a guess.
