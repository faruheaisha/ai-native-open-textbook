---
title: "GGUF Quantization Guide"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/inference/.agents/skills/huggingface-local-models/references/quantization.md"
sourceRel: "projects/inference/.agents/skills/huggingface-local-models/references/quantization.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/inference/.agents/skills/huggingface-local-models/references/quantization.md"
sourceSha256: "e3b0959550cb00697124a8425f062bbf9f9ac548257ddf583ec4e0a19c55e817"
pageSha256: "e3b0959550cb00697124a8425f062bbf9f9ac548257ddf583ec4e0a19c55e817"
contentMode: "local-full"
zh: ""
---

# GGUF Quantization Guide

## Hub-first quant selection

Before using generic tables, open the model repo with:

```text
https://huggingface.co/<repo>?local-app=llama.cpp
```

Prefer the exact quant labels and sizes shown in the `Hardware compatibility`
section of the fetched `?local-app=llama.cpp` page text or HTML. Then confirm
the matching filenames in:

```text
https://huggingface.co/api/models/<repo>/tree/main?recursive=true
```

Use the Hub page first, and only fall back to generic heuristics when the repo
page does not expose a clear recommendation.

## Format Comparison

| Format | Size tendency | Speed tendency | Notes |
|--------|---------------|----------------|-------|
| FP16 | largest | slowest | original quality |
| Q8_0 | large | slower | nearly lossless |
| Q6_K | medium-large | medium | strong quality/size choice |
| Q5_K_M | medium | medium-fast | useful for code and technical workloads |
| Q4_K_M | smaller | fast | default balance |
| Q4_K_S | smaller | faster | lower quality than Q4_K_M |
| Q3_K_M | small | faster | acceptable only when memory constrained |
| Q2_K | smallest | fastest | usually too much quality loss |

Default to `Q4_K_M` unless the repo page or hardware profile suggests
otherwise. For code and technical workloads, prefer `Q5_K_M` or `Q6_K` when
memory allows.

## Conversion

Convert only when the repo does not already expose GGUF files.

```bash
