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
pageSha256: "6c9cdc9cf8596fb16e61b4a113a64592af9daa872f7882b622ab2a4723af903e"
contentMode: "local-full"
zh: ""
---

## Why Cloud and Local Tokens/Sec Are Not Comparable

Comparing a cloud API's tokens/sec to a local GPU's tokens/sec is comparing a car's speed on a congested highway to the same car's speed on an empty road. Three concrete mechanisms cause the gap:

**Cloud time-to-first-token can include reasoning that is not streamed to the client.** Sol and Luna's 138-150 second TTFT figures under max-reasoning presets include internal computation before visible output. Local inference does not guarantee a millisecond-scale TTFT: prompt prefill grows with input length, a local reasoning model can still generate reasoning tokens, and weights may need to load or move between host and accelerator memory. Record prefill time and visible decode separately on both paths.

**Cloud infrastructure optimizes aggregate throughput across concurrent users, while a single-user local workstation can reserve the accelerator for one request.** Dynamic batching, shared queues, and paid priority tiers trade individual latency for total system utilization. A self-hosted service with several users reintroduces the same scheduling problem: each active sequence consumes KV cache, continuous batching changes latency and throughput, and requests can queue. The [LLM-D serving talk](https://youtube.com/watch?v=ZcpD1M0Wa8Q&t=899s) demonstrates the static-versus-continuous batching trade-off and later identifies queue size and KV-cache utilization as load-balancing inputs ([47:14](https://youtube.com/watch?v=ZcpD1M0Wa8Q&t=2834s)).

**Cloud frontier models and local models are not disclosed or configured on the same basis.** API providers do not publish enough detail to assert the deployed parameter count, quantization, batching policy, or accelerator topology for every request. A local deployment exposes those choices and commonly uses 4-8 bit quantized weights. The field observations above show the resulting spread: one laptop demo reported roughly 1,300 input tokens/sec but only 60-70 output tokens/sec, while the Framework Desktop talk reported 25-60 output tokens/sec on average. A cloud API's streamed output rate and a local benchmark only become comparable after model, task, context, concurrency, prefill, decode, and latency definitions are aligned.

**Correction from an earlier version of this section**: it previously reported `llmfit system` on a MacBook Pro M5 Max showing "171 GB/s measured RAM bandwidth." That was wrong on both counts. Running the same command three times in a row on the same machine returns exactly 614.0 GB/s every time, zero variance, which is not what a live measurement looks like. `llmfit doctor`'s own hardware diagnostic confirms it: the detected system specs carry no bandwidth field at all. An independent write-up of the tool ([ModelFit's `llmfit` review](https://modelfit.io/blog/llmfit-find-best-llm-for-your-hardware/)) states the same thing directly: `llmfit` maintains a static bandwidth table keyed by chip name and backend, calibrated from public specs and community submissions, not a runtime probe of your machine. Apple's own published theoretical peak for M5 Max is 600-614 GB/s ([Apple Newsroom, Aug 2026](https://www.apple.com/newsroom/2026/08/apple-introduces-new-mac-studio-with-m5-max-and-m5-ultra/)).

A hand-written multi-threaded STREAM-style CPU benchmark on the same machine did produce a real, varying result: 164.7 GB/s median at 8 threads, low variance across repeated runs. Treat that as a floor, not a ceiling. Community STREAM benchmarks on a lower-spec M4 Max (546 GB/s theoretical, below the M5 Max's 600-614) reach 321-402 GB/s with an optimized, BLAS-backed, P-core-pinned implementation; a quick hand-written CPU loop on a faster chip undershooting that is a benchmark-quality artifact, not evidence the hardware is capped.

The more useful check turned out to be cross-referencing your own measured tokens/sec against community numbers for the same model on comparable hardware, rather than chasing an abstract bandwidth figure at all. On this same M5 Max, `Qwen3.6-35B-A3B-4bit` measured 71.5 tok/s mean decode throughput across the context sizes where a paired dense-model comparison ran cleanly. Community-reported figures for the near-identical Qwen 3.5 35B-A3B 4bit put an M4 Max (546 GB/s theoretical) at 55-70 tok/s and an M3 Ultra (800 GB/s theoretical) at 80-110 tok/s; 71.5 tok/s on a 600-614 GB/s chip sits exactly between those two, where the bandwidth gap predicts it should. Real, sustained bandwidth on your actual machine is still the number that predicts your actual tokens/sec. Measuring it credibly takes either a properly optimized micro-benchmark or, more practically, comparing your own tok/s against a same-model community reference, not a CLI tool's spec-sheet lookup.
