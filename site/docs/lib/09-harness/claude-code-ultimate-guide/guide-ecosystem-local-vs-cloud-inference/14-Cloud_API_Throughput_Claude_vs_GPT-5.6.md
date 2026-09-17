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
pageSha256: "5e9879f6448685238cc140c9b80a5d0265e8439d84bb4ad77ffd26d9336d6fa1"
contentMode: "local-full"
zh: ""
---

## Cloud API Throughput: Claude vs GPT-5.6

OpenAI's GPT-5.6 family (launched July 9, 2026) ships in three durable capability tiers named after celestial bodies: **Sol** (flagship), **Terra** (balanced mid-tier), **Luna** (fast, cheap). All three are available in ChatGPT, Codex, and the API, and generally available on Amazon Bedrock. Anthropic's current lineup for comparison: **Claude Opus 5** (flagship) and **Claude Sonnet 5** (mid-tier), both defaults in Claude Code.

| Model | Typical throughput | Max-effort/benchmark throughput | Time to first token | Price ($/M tokens, in/out) |
|---|---|---|---|---|
| GPT-5.6 Sol | ≈70 tok/s (OpenRouter P50) | 74.3 tok/s (ArtificialAnalysis) | ≈138.6s in max reasoning mode | $5 / $30 |
| GPT-5.6 Terra | ≈58 tok/s (OpenRouter P50) | n/a | ≈2.48s | $2 / $12 (cut 20% from launch, effective July 30, 2026) |
| GPT-5.6 Luna | ≈112 tok/s (OpenRouter P50) | 140.7 tok/s (ArtificialAnalysis) | ≈150.7s in max reasoning mode | $0.20 / $1.20 (cut 80% from launch, effective July 30, 2026) |
| Claude Sonnet 5 | ≈75.9 tok/s (ArtificialAnalysis, max effort) | n/a | not published | $2 / $10 |
| Claude Opus 5 | **≈26 tok/s average** (LLM-Benchmarks production telemetry, min 5.3, max 60.9) | n/a | ≈2.87s | $5 / $25 (fast mode research preview: $10 / $50) |

Claude Opus 5's ≈26 tok/s average comes from production telemetry across real calls, not a single benchmark preset, a materially lower number than the ≈55-80 tok/s figures reported for Opus 5 under lighter-effort presets on other trackers. Anthropic optimizes Opus 5 for reasoning depth, not raw streaming speed.

On specialized hardware (Cerebras wafer-scale systems, not a standard cloud GPU), Sol reaches roughly **750 tok/s**, about 10x the typical cloud API rate. This confirms the throughput ceiling is set by deployment infrastructure and multi-tenant scheduling, not by the model's architecture alone.

Sources: [OpenRouter Sol](https://openrouter.ai/openai/gpt-5.6-sol), [OpenRouter Terra](https://openrouter.ai/openai/gpt-5.6-terra), [OpenRouter Luna](https://openrouter.ai/openai/gpt-5.6-luna), [ArtificialAnalysis Sol](https://artificialanalysis.ai/models/gpt-5-6-sol), [ArtificialAnalysis Luna](https://artificialanalysis.ai/models/gpt-5-6-luna), [ArtificialAnalysis Sonnet 5](https://artificialanalysis.ai/models/claude-sonnet-5), [LLM-Benchmarks Anthropic](https://llm-benchmarks.com/providers/anthropic), [OpenAI price-performance update](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/), [Cerebras](https://www.cerebras.ai/blog/getting-the-most-out-of-gpt-5-6-sol-terra-and-luna).
