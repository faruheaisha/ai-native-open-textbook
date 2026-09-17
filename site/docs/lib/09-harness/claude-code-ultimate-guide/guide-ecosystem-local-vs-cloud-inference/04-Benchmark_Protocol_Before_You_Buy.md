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
pageSha256: "f2e4b5214fa3dff1e585370a8d1148d61237a8291d6930ca8396e383ee054416"
contentMode: "local-full"
zh: ""
---

## Benchmark Protocol Before You Buy

A capacity check only answers whether the weights can be loaded. It does not show whether the model remains usable with a real prompt, several users, or the inference backend you plan to run. Test the exact model, quantization, context length, and concurrency target before comparing machines.

| Measurement | What it prevents |
|---|---|
| Weight residency plus runtime and KV-cache headroom | A model that loads successfully but runs out of memory on a long prompt |
| Prefill throughput and time to first token | Hiding slow prompt processing behind a fast decode number |
| Decode throughput | Treating input and generated-token rates as the same metric |
| Single-user and target-concurrency runs | Ignoring one KV cache per active sequence, batching, and queueing |
| Wall power during the same run | Converting a TDP ceiling into a fictional joules-per-token measurement |
| Purchase, electricity, maintenance, and measured utilization | Comparing a hardware purchase with an hourly rental price as if both had the same capacity and operations cost |

The talks indexed during this page's review show why each field matters. In a Devoxx experiment on a Ryzen AI Max+ 395 running a Q4 Qwen 122B model, the speakers separate prefill from decode, identify memory bandwidth as the decode bottleneck, and show that GPU offload trades capacity for transfer cost ([memory bandwidth at 21:58](https://youtube.com/watch?v=DXEsG3Vo6F4&t=1318s), [GPU offload at 28:46](https://youtube.com/watch?v=DXEsG3Vo6F4&t=1726s), [hardware run at 37:05](https://youtube.com/watch?v=DXEsG3Vo6F4&t=2225s)). A RamaLama demo reports roughly 1,300 input tokens/sec and 60-70 output tokens/sec on the same laptop, two numbers that cannot be collapsed into one "tokens/sec" result ([17:24](https://youtube.com/watch?v=CYxwXobrL28&t=1044s)).

One Framework Desktop presentation reports 80-130 W during use, 25-60 tokens/sec on average with peaks near 80-90, and a machine cost that moved from about €2,400 to €3,000 ([power at 15:57](https://youtube.com/watch?v=RTQdC6IgBzc&t=957s), [cost at 16:20](https://youtube.com/watch?v=RTQdC6IgBzc&t=980s), [throughput at 17:25](https://youtube.com/watch?v=RTQdC6IgBzc&t=1045s)). These are speaker-reported field observations, not controlled cross-hardware benchmarks. Use them to define what to measure on your own workload, not to rank the machines in the table below.
