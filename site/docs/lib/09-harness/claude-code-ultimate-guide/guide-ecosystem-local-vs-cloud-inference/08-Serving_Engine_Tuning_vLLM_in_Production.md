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
pageSha256: "f1954701de93256a59f0f729c57bd8f0d90e4f9f6811cb7c68f72cb4d083b670"
contentMode: "local-full"
zh: ""
---

## Serving Engine Tuning: vLLM in Production

The tables above answer what hardware to buy. They say nothing about whether that hardware's throughput actually reaches users: the serving engine and its configuration decide that. [vLLM](https://docs.vllm.ai/) is the default open-source serving engine behind most self-hosted OpenAI-compatible deployments, including the CPU-offload MoE row above. These are the configuration levers with a documented effect, and what the official docs actually say about each, per the [vLLM optimization guide](https://docs.vllm.ai/en/stable/configuration/optimization/) (August 2026 snapshot; vLLM ships new releases roughly every two weeks, so re-check exact defaults before relying on them).

### Compilation optimization levels

Set with `-O` on `vllm serve`, or `compilation_config` in the Python API.

| Level | What it does |
|---|---|
| `-O0` | No optimizations. Fastest startup, lowest runtime performance. |
| `-O1` | Simple compilation, fast fusions, `PIECEWISE` CUDA graphs. |
| `-O2` | Default. Additional compilation ranges, more fusions, `FULL_AND_PIECEWISE` CUDA graphs. |
| `-O3` | Documented as "currently equal to `-O2`", reserved for future experimental optimizations. |

`-O2` being the documented default matches the "production sweet spot" framing that circulates in serving write-ups. What does not hold up: treating `-O3` as a distinct, more aggressive production tier. As of this snapshot, vLLM's own docs state `-O3` is identical to `-O2` in practice.

### Prefix caching

Automatic prefix caching hashes each KV-cache block by its token content plus the tokens preceding it, so a second request sharing a prompt prefix (a fixed system prompt, a repeated few-shot template) reuses already-computed blocks instead of recomputing them. It is on by default in V1; `--prefix-caching-hash-algo` (default `sha256`) is the tunable. vLLM's design docs call it "almost a free lunch" but publish no quantified Time To First Token or cost figure, official or otherwise. Treat any specific percentage attached to this feature (a commonly repeated "30-50% cost cut" among others) as anecdotal until measured on your own shared-prefix workload.

### Chunked prefill

On by default in V1. It splits a long prompt's prefill into chunks and interleaves them with in-flight decode steps from other requests, instead of letting one large prefill block the batch. The tuning knob is `max_num_batched_tokens`: smaller values (around 2048) favor decode latency because fewer prefill chunks slow down token-by-token generation for other requests, while larger values favor time-to-first-token. vLLM's own guidance is `max_num_batched_tokens > 8192` for smaller models on large GPUs.

### KV cache preemption

When KV-cache space runs out for the current batch, vLLM evicts (preempts) a request and recomputes it later, rather than crashing with an out-of-memory error. In V1, the default preemption mode is `RECOMPUTE`, not swap-to-CPU-and-restore, because recomputation has lower overhead in the current architecture. The levers that reduce how often preemption fires: `gpu_memory_utilization` up, `max_num_seqs` down, `tensor_parallel_size` and `pipeline_parallel_size` up (both shard the model and free per-GPU memory for KV cache). Preemption is the correctness fallback for running out of memory; these four settings are what actually keeps you from hitting it.

### Parallelism strategies

Four independent axes, [combinable](https://docs.vllm.ai/en/latest/serving/parallelism_scaling/):

| Mode | Splits | Typical use |
|---|---|---|
| TP (tensor parallel) | Weight matrices across GPUs | Model too large for one GPU's VRAM |
| PP (pipeline parallel) | Layers across GPUs or nodes | Multi-node scaling, usually TP within a node and PP across nodes |
| DP (data parallel) | Full model replicated per GPU/group | Raw concurrency scaling when the model already fits on one GPU/group |
| EP (expert parallel) | MoE expert weights across GPUs | Mixture-of-experts models; each GPU/rank hosts a subset of experts |

A documented production pattern for large MoE models: 1-way tensor parallel, 8-way data-parallel attention, 8-way expert-parallel MoE layers, with attention weights replicated across all 8 GPUs while expert weights are sharded across them. Common convention: TP size equals GPUs per node, PP size equals number of nodes.

### CPU and NUMA: a real bottleneck, but not a vLLM flag on CUDA

Tokenization, chat-template rendering, request scheduling, and multimodal preprocessing all run on CPU before anything reaches the GPU. Under long sequences and large batches, tokenization alone has been measured at up to roughly 80% of added latency in CPU-contended configurations ([arXiv:2603.22774](https://arxiv.org/html/2603.22774v1)). That part holds up: inference is not GPU-only. What does not hold as commonly stated: vLLM's documented CPU-binding and NUMA-pinning feature is scoped to the [`vllm-ascend` plugin](https://docs.vllm.ai/projects/ascend/en/latest/user_guide/feature_guide/cpu_binding.html) (Huawei NPU, ARM servers only): its own docs say explicitly "No action needed on x86_64". For a standard CUDA multi-socket server, such as the dual-RTX-PRO-6000 or dual-RTX-5090 configurations on this page, there is no documented vLLM NUMA engine argument to reach for. The available lever is OS-level `numactl` pinning of the vLLM process, done outside vLLM, not a vLLM setting.

### Multimodal (VLM) serving

Three flags reduce repeated image or video preprocessing for vision-language models:

- `mm_encoder_tp_mode="data"` splits batched multimodal input across TP ranks (data-parallel encoding) while each rank still hosts the full encoder weights.
- `mm_processor_cache_gb` sets the size in GiB of the cache that avoids reprocessing multimodal inputs already seen; defaults to 4 GiB, `0` disables it.
- `mm_processor_cache_type="shm"` moves the cache payload into shared memory accessible across worker processes, keeping only cache keys on the primary process.

### What to tune first

No official vLLM-published priority ranking exists. The order below follows where each feature sits in the request path (prefill/decode scheduling before OOM-avoidance before scale-out), not a benchmarked ranking:

1. Prefix caching and chunked prefill (on by default in V1; confirm they are not disabled)
2. `gpu_memory_utilization` and `max_num_batched_tokens`
3. `max_num_seqs` and KV-cache preemption headroom
4. Parallelism strategy (TP/PP/DP/EP) once single-GPU tuning is exhausted
5. Multimodal cache flags, if serving VLMs
