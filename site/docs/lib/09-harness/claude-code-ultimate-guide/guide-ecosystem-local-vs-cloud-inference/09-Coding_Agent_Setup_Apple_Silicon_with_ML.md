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
pageSha256: "187dcfc60c7b6213484b1f5f6b5ccb876a39a732807ea8844a37e57078cb0bcd"
contentMode: "local-full"
zh: ""
---

## Coding Agent Setup: Apple Silicon with MLX

vLLM does not target Apple Silicon; on a Mac, the equivalent decision (model, runtime, memory budget) runs through [MLX](https://github.com/ml-explore/mlx), Apple's own array framework, and the ecosystem built on it. This section covers what to run and how, for the specific case of a local coding agent on a unified-memory Mac (the 96-128 GB configs on this page: MacBook Pro M5 Max, Mac Studio, Mac mini M5 Pro).

### Model choice: one MoE for daily use, one dense model in reserve

| Model | Architecture | License | Context | Published benchmarks |
|---|---|---|---|---|
| [`Qwen/Qwen3.6-35B-A3B`](https://huggingface.co/Qwen/Qwen3.6-35B-A3B) | MoE, 35B total / ≈3B active (256 experts, 8 routed + 1 shared per token) | Apache 2.0 | 262,144 native, extensible to ≈1.01M | SWE-Bench Verified 73.4, LiveCodeBench v6 80.4, MMLU-Pro 85.2, GPQA 86.0 (model card) |
| [`Qwen/Qwen3.8-27B`](https://huggingface.co/Qwen/Qwen3.8-27B) | Dense, ≈27B | Apache 2.0 | 262,144 native | Same architecture as the April 2026 `Qwen3.6-27B`, all gains from post-training: Terminal-Bench 2.1 73.0 (vs 63.4), SWE-Bench Pro 61.7 (vs 53.5), LiveCodeBench v6 90.3 (vs 83.9) |

Both figures are pulled directly from each model's HuggingFace card, verified in this session. `Qwen3.8-27B` is already this page's reference dense model (see the hardware table above); it supersedes the older `Qwen3.6-27B` dense release that circulates in some August 2026 write-ups (including a widely shared local-Mac-inference report reviewed while writing this section) as the "quality" pairing for `Qwen3.6-35B-A3B`. Since `Qwen3.8-27B` is strictly better on every benchmark where a comparison exists and is already the model this page uses elsewhere, use it instead of `Qwen3.6-27B` as the dense fallback: same weight footprint, no reason to run the older one.

The MoE-for-speed, dense-for-depth split matches this page's [MoE CPU-offload discussion](#what-actually-fits-named-models) at a smaller scale: `Qwen3.6-35B-A3B` activates ≈3B parameters per token, so it decodes closer to a 3B model's speed while retaining a 35B model's trained capacity, at the cost of ≈20-26 GB of resident weights (4-6-bit) instead of a 3B model's ≈2 GB. On a 96-128 GB unified-memory Mac, both models fit simultaneously with room left for a large KV cache, meaning you can keep the MoE model loaded for everyday agent turns and swap in the dense model for a harder single request rather than choosing one permanently.

### Runtime comparison: what is verified, what is vendor-reported, what is neither

Four runtimes expose an OpenAI-compatible local API on Apple Silicon. They are not interchangeable in practice, and the size of the gap between them is the single biggest lever in this section, larger than model choice for a given quality target.

| Runtime | What it is | Verified in this session |
|---|---|---|
| [MLX](https://github.com/ml-explore/mlx) / [`mlx-lm`](https://github.com/ml-explore/mlx-lm) | Apple's own array framework; `mlx-lm` provides model loading, quantization, and an OpenAI-compatible server via `mlx_lm.server` | Current release is v0.31.3 (checked directly against the GitHub releases page); speculative decoding exists in the codebase (a v0.31.2 changelog entry references a fix to it), confirming the feature is real and current, though the specific speedup and draft-acceptance percentages that circulate for it come from third-party blogs, not an official MLX benchmark, and were not independently reproduced here |
| [`llama.cpp`](https://github.com/ggml-org/llama.cpp) (Metal backend) | `llama-server` built with `-DGGML_METAL=ON`; the same OpenAI-compatible server used on CUDA elsewhere on this page | MTP speculative decoding on Metal is documented as a **net loss**: [GitHub issue #23752](https://github.com/ggml-org/llama.cpp/issues/23752), open and unresolved at time of writing, measured Qwen3.5-9B-Q4_K_M dropping from a 25.3 tok/s non-speculative baseline to 19.3-22.4 tok/s (-11% to -24%) across every MTP draft-length setting tested, with the issue's own conclusion being that draft-evaluation overhead exceeds the speculative gain on Metal. **Caveat**: that issue's hardware is a 2021 MacBook Pro M1 Max, not an M5 Max; the mechanism (draft overhead on Metal) is architectural and plausibly generalizes, but the magnitude has not been independently confirmed on current-generation Apple Silicon |
| [LM Studio](https://lmstudio.ai/) (`mlx-engine`) | LM Studio's own MLX-based backend on Mac | [LM Studio's own blog post](https://lmstudio.ai/blog/mlx-engine-agentic-workloads) on `mlx-engine` v1.8.5, an official first-party source, reports on an M3 Max/36 GB: 82% less extra RAM in parallel long-prompt workloads (6.47 GB down to 1.18 GB), parallel-chat throughput up 2.2x (15.24 to 33.97 output tok/s), and a repeated-image prompt going from 23.79s to 6.88s (uncached prompt tokens dropping from ≈3,730 to 145) thanks to disk-backed KV-cache restoration. These are vendor-published, not independently reproduced, but the source is LM Studio's own engineering blog, not a third-party aggregator |
| [Ollama](https://ollama.com/) | General-purpose runtime, switched to an MLX backend on Mac | Real (documented in Ollama's own release notes), but the specific "1.6-2x faster, 1,100 to 1,851 tok/s prefill" figures attached to this switch in circulating write-ups trace to a third-party review blog, not Ollama's own benchmarks; not independently reproduced here |

Net practical takeaway, consistent with what all four rows point toward: prefer an MLX-native server (`mlx_lm.server`, LM Studio's `mlx-engine`, or a dedicated MLX server like [oMLX](https://omlx.ai/) or [vMLX](https://vmlx.net/)) over `llama.cpp`'s Metal backend for a Mac coding-agent loop, specifically because of the confirmed MTP regression on Metal and the confirmed prefix-cache handling on MLX-based engines. Do not enable `llama.cpp`'s speculative decoding on Metal without benchmarking your own model and hardware first; issue #23752 shows it can make things worse.

### A caution about Apple Silicon "benchmark" sites

Researching this section surfaced a cluster of content sites that appeared through 2026 and specialize in Apple-Silicon LLM throughput numbers (domain names withheld here since none of it should be relied on): several explicitly label their own headline tok/s figures as "estimates extrapolated from chip-family data," not measured runs, while presenting them in a table indistinguishable from measured results at a glance. One source cited in an initial pass of research for this section, presented as "Apple's own scalable inference paper" reporting a 5.8x TTFT improvement (245ms to 42ms) from prefix caching, does not exist as described: the underlying arXiv paper (2601.19139) is an independent submission (not from Apple) whose abstract reports different figures entirely (21-87% throughput gains, a 24.7x video-cache speedup, and a 21.7s-to-under-1s multimodal latency drop, no 245ms/42ms TTFT numbers at all). Treat any specific M5-Max tok/s figure you find outside a lab's own model card, an official runtime's release notes, or a reproducible community benchmark repo (like `omlx.ai`'s published run pages, which are vendor-published but at least link a specific model, quantization, and context length per number) as unverified until you measure it yourself with the [Benchmark Protocol](#benchmark-protocol-before-you-buy) above.

### Memory budget and context length

Unified memory is shared between CPU, GPU, and NPU; macOS caps how much of it the GPU can address at once via `iogpu.wired_limit_mb`. Community Apple-Silicon LLM guides (not an Apple-published figure) converge on treating roughly 60-70% of total RAM as safely usable for model weights plus KV cache before memory pressure and swap set in; on a 128 GB machine that is a practical ceiling around 90 GB for model+KV, leaving headroom for macOS, Docker, an IDE, and a browser. `Qwen3.6-35B-A3B` at 4-6-bit (≈20-26 GB weights) leaves generous room under that ceiling for a large KV cache; a dense 70B model at Q4/Q5 (≈40-50 GB weights) leaves much less. This matches the general pattern already documented above: [context length materially reduces throughput](#benchmark-protocol-before-you-buy) as KV cache grows, so treat 32k-64k tokens as the practical working context for a continuous agent loop on a 128 GB Mac with other apps running, and reserve longer contexts for occasional large-codebase analysis rather than every-turn agent use.

### Running it as a persistent local API

```bash
# Install (Python 3.12, isolated venv recommended)
pip install mlx-lm

# Serve an OpenAI-compatible endpoint at http://127.0.0.1:8080/v1
mlx_lm.server \
  --model mlx-community/Qwen3.6-35B-A3B-4bit \
  --port 8080
```

To keep it running as a background service that survives a reboot and restarts on crash, a `launchd` user agent is the macOS equivalent of a systemd unit:

```xml

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>local.mlx-llm</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/mlx_lm.server</string>
    <string>--model</string><string>mlx-community/Qwen3.6-35B-A3B-4bit</string>
    <string>--port</string><string>8080</string>
  </array>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key>
  <dict><key>SuccessfulExit</key><false/></dict>
</dict>
</plist>
```

```bash
launchctl load ~/Library/LaunchAgents/local.mlx-llm.plist
launchctl start local.mlx-llm
```

`RunAtLoad` starts the server at login; `KeepAlive` with `SuccessfulExit: false` restarts it if the process crashes. Swap the `ProgramArguments` for `llama-server` or `mlx-openai-server launch` to run a different runtime under the same supervision pattern. Point your coding agent's OpenAI-compatible base URL at `http://127.0.0.1:8080/v1`.
