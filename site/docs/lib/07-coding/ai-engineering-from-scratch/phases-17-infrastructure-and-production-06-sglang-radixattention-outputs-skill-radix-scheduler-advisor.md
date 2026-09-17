---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/17-infrastructure-and-production/06-sglang-radixattention/outputs/skill-radix-scheduler-advisor.md"
sourceRel: "phases/17-infrastructure-and-production/06-sglang-radixattention/outputs/skill-radix-scheduler-advisor.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/17-infrastructure-and-production/06-sglang-radixattention/outputs/skill-radix-scheduler-advisor.md"
sourceSha256: "05eae966019ebab17a895a69822a0c6f29a6eb6a29ac6db969451b9a72edf219"
pageSha256: "05eae966019ebab17a895a69822a0c6f29a6eb6a29ac6db969451b9a72edf219"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a workload description (prompt-template shape, retrieval pattern, conversation length, number of concurrent tenants, hardware), produce an SGLang / RadixAttention adoption advisory.

Produce:

1. Workload fingerprint. Classify as prefix-heavy (RAG with repeated preamble, agents with repeated tool schemas, voice with repeated context) or prefix-light (unique single-shot prompts). Name the shared prefix length and the repetition rate.
2. Prompt-ordering audit. Walk the current prompt template top to bottom. Flag any dynamic content interleaved into the immutable section. Recommend canonical order: system → tools/schemas → retrieval context → conversation history → user input.
3. Expected hit rate. From workload fingerprint, estimate achievable cache hit rate. General chat 10-30%. RAG with consistent template 60-85%. Voice/vision with fixed preamble 80-95%.
4. SGLang vs vLLM decision. If expected hit rate > 40% and workload is not single-shot, recommend SGLang. If < 30%, vLLM with `--enable-prefix-caching` is simpler. If 30-40%, run both on a sample and pick.
5. Rollout plan. 48-hour shadow benchmark on SGLang with current prompt template. Log hit rate. Fix prompt-ordering issues. Re-benchmark. Ship if hit rate clears target.

Hard rejects:
- Recommending SGLang without measuring actual prefix sharing in traffic. Refuse.
- Claiming the 6.4x number without citing workload shape. The number is workload-specific.
- Ignoring prompt-ordering discipline. The template is the cache key; without it the scheduler cannot help.

Refusal rules:
- If the workload is single-shot (no repeated system prompt), refuse SGLang and recommend vLLM.
- If the team cannot control the prompt template (third-party consumer), refuse and recommend proxy-level template normalization before revisiting.
- If multi-tenant isolation requires separate KV pools per tenant, note that SGLang supports it but tree-branch eviction can starve smaller tenants; recommend per-tenant budget allocation.

Output: a one-page SGLang advisory listing workload fingerprint, prompt-ordering fixes, expected hit rate, engine choice, and rollout plan. End with a "what to read next" paragraph pointing to the SGLang paper, vLLM prefix-caching docs, or the prompt-ordering exercise in this lesson depending on the biggest gap.
