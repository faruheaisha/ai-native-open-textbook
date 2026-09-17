---
title: "LLM Day-to-Day Degradation: Myth vs Reality"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/reports/llm-day-to-day-degradation.md"
sourceRel: "reports/llm-day-to-day-degradation.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/reports/llm-day-to-day-degradation.md"
sourceSha256: "116decc0417e83e78825387b522d03c0c73d10053e93743f569c64454ba08018"
pageSha256: "116decc0417e83e78825387b522d03c0c73d10053e93743f569c64454ba08018"
contentMode: "local-full"
zh: ""
---

# LLM Day-to-Day Degradation: Myth vs Reality

Can a deployed LLM's performance change day-to-day even though the model weights are frozen? A deep-dive into proven causes, infrastructure bugs, and psychological factors.

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

<table width="100%">
<tr>
<td width="50%"><a href="https://x.com/nicksdot/status/2029520949176049704"><img src="/mirror/b0/b01335b8c18b1a345d2f60d40f0d8045fec19930.png" alt="Twitter users reporting day-to-day Claude quality degradation" width="100%" /></a></td>
<td width="50%"><a href="https://x.com/levelsio/status/2029369159893569680"><img src="/mirror/7e/7ec6fec8019d37f7857ff7eb6aeb56c9a76876a6.png" alt="Twitter users reporting day-to-day Claude quality degradation" width="100%" /></a></td>
</tr>
</table>

# 🔥 Claude Code Ops 4.6 Analysis. High Reasoning

When Anthropic launches a model like Opus 4.6, the **model weights** — billions of learned parameters — are frozen. Training is enormously expensive (millions of dollars, weeks of compute). Nobody is retraining the model overnight.

But weights are only one layer of a much larger system. Research reveals at least **7 distinct mechanisms** that can cause real or perceived quality changes, even when model weights are frozen.

| Question | Answer |
|----------|--------|
| Do model weights change after launch? | **No** — confirmed by all providers |
| Can the model behave differently day-to-day? | **Yes** — proven with ±8-14% variance |
| Is it intentional "nerfing"? | **No** — no evidence of deliberate degradation |
| Are infrastructure bugs real? | **Yes** — Anthropic confirmed 3 bugs affecting up to 16% of requests |
| Is some of it psychological? | **Yes** — confirmation bias and honeymoon effects are real |
| Can system prompts/post-training change? | **Yes** — documented across providers |
| Should users trust their perception? | **Partially** — real causes exist, but perception amplifies them |

---

## The Full Inference Stack

The model weights are frozen, but **nine layers above them** can independently affect what you experience:

```
┌──────────────────────────────────────────────┐
│  YOUR SESSION CONTEXT                        │  ← Degrades within session
│  (accumulated errors, long conversations)    │
├──────────────────────────────────────────────┤
│  SYSTEM PROMPT                               │  ← Updated regularly
│  (safety rules, behavior instructions)       │
├──────────────────────────────────────────────┤
│  POST-TRAINING (RLHF / Fine-tuning)         │  ← Can be updated quietly
│  (instruction following, safety alignment)   │
├──────────────────────────────────────────────┤
│  SAMPLING PARAMETERS                         │  ← Can be tuned server-side
│  (temperature, top-p, top-k)                 │
├──────────────────────────────────────────────┤
│  SPECULATIVE DECODING                        │  ← Draft model quality varies
│  (draft model predictions + verification)    │
├──────────────────────────────────────────────┤
│  MoE ROUTING / BATCH COMPOSITION             │  ← ±8-14% variance proven
│  (which experts activate per request)        │
├──────────────────────────────────────────────┤
│  HARDWARE ROUTING                            │  ← TPU vs GPU vs Trainium
│  (which cluster serves your request)         │
├──────────────────────────────────────────────┤
│  QUANTIZATION LEVEL                          │  ← May vary under load
│  (FP16 vs INT8 vs INT4 precision)            │
├──────────────────────────────────────────────┤
│  COMPILER & RUNTIME                          │  ← XLA bugs proven real
│  (XLA:TPU, CUDA, hardware-specific code)     │
├──────────────────────────────────────────────┤
│  MODEL WEIGHTS (FROZEN)                      │  ← These DON'T change
│  (billions of learned parameters)            │
└──────────────────────────────────────────────┘
```

The key mental model: **frozen weights ≠ frozen behavior**. This is like saying "same engine = same driving experience" while ignoring the tires, road conditions, fuel quality, and driver fatigue.

---

## Proven Causes: Infrastructure Bugs

### Anthropic's September 2025 Postmortem

In September 2025, Anthropic published a detailed postmortem revealing **three separate infrastructure bugs** that degraded Claude's quality between August and September 2025. Their official statement:

> "We never reduce model quality due to demand, time of day, or server load. The problems our users reported were due to infrastructure bugs alone."

### Bug #1 — Context Window Routing Error

Sonnet 4 requests were accidentally routed to servers configured for 1M token context windows instead of standard servers.

- **Timeline**: Introduced August 5, worsened August 29 after a load balancing change
- **Peak impact**: 16% of Sonnet 4 requests affected at worst hour (August 31)
- **User impact**: ~30% of Claude Code users had at least one degraded message
- **Insidious detail**: Routing was "sticky" — once you hit a bad server, subsequent requests kept going there
- **Fixed**: September 4–18 (rolled out across platforms)

### Bug #2 — TPU Output Corruption

A misconfiguration on TPU servers caused errors during token generation, assigning high probability to tokens that should rarely appear.

- **Symptoms**: Thai or Chinese characters appearing mid-English response, obvious code syntax errors
- **Affected**: Opus 4.1 and Opus 4 (August 25–28), Sonnet 4 (August 25–September 2)
- **Scope**: Only Claude API; third-party platforms unaffected
- **Fixed**: Rolled back September 2

### Bug #3 — XLA:TPU Compiler Miscompilation (the nastiest)

A code change to fix precision issues accidentally exposed a **latent compiler bug** in Google's XLA:TPU.

- **Root cause**: The approximate top-k operation (used to pick the most likely next tokens) "sometimes returned completely wrong results, but only for certain batch sizes and model configurations"
- **Why it was hard to find**: It changed behavior depending on what operations ran before or after it, and whether debugging tools were enabled
- **Hidden for months**: A previous workaround from December 2024 had been accidentally masking this deeper bug
- **Affected**: Haiku 3.5 confirmed; subset of Sonnet 4 and Opus 3 suspected
- **Resolution**: Switched from approximate to exact top-k; accepted "minor efficiency impact" because "Model quality is non-negotiable"

### Why Detection Was Difficult

Anthropic's own automated evaluations didn't catch the degradation users reported, "in part because Claude often recovers well from isolated mistakes." Each bug produced different symptoms on different platforms at different rates, creating "a confusing mix of reports that didn't point to any single cause."

Key context: Claude runs on **three different hardware platforms** (AWS Trainium, NVIDIA GPUs, Google TPUs), each with different failure modes, compilers, and precision behaviors. Your request might hit different hardware on different days.

---

## Proven Causes: MoE Routing Variance

Modern large models often use a **Mixture-of-Experts (MoE)** architecture, where only a subset of the model's parameters ("experts") activate for each input. A learned router decides which experts to use.

Scale AI's research revealed a critical finding:

> "The combination of Sparse MoE and batched inference creates unpredictable results because the composition of a batch can determine which expert your query gets routed to, and the mix of queries from other users in the same batch is not deterministic."

### Measured Day-to-Day Variance Across Providers

| Provider | Day-to-Day Score Variance |
|----------|--------------------------|
| OpenAI (GPT-4 variants) | ±10–12% |
| Anthropic (Claude variants) | ±8–11% |
| Google (Gemini variants) | ±9–14% |

Concrete example: the same model scored **77% on jailbreak resistance one day and 63% the next**. Same model, same weights, same test — 14 percentage points of swing from infrastructure alone.

This means even with zero bugs and zero changes, the same model can produce noticeably different quality outputs on different days purely due to how requests are batched and routed. An A/B test cannot reliably detect a 5% quality signal when the day-to-day noise is 10–15%.

---

## Proven Causes: System Prompt & Post-Training Updates

### System Prompt Changes

The model weights don't change, but the **system prompt** wrapping those weights can be updated at any time. Analysis of Claude's system prompt evolution shows dozens of iterations, with "hot-fixes" — short instructions added to patch undesired behavior — being added and removed regularly.

Claude 3.7's system prompt contained multiple hot-fix instructions targeting common LLM "gotchas." Claude 4.0's system prompt removed all of them, with the behaviors addressed during post-training through reinforcement learning instead.

### The Post-Training Theory

The most plausible theory for unexplained quality shifts: companies can update **fine-tuning and RLHF** (reinforcement learning from human feedback) without changing the base model weights. This would technically make it truthful to say "the model hasn't changed" while still altering behavior through updated safety guardrails and instruction-following adjustments.

---

## Proven Causes: Silent Model Swaps

OpenAI has been documented multiple times silently changing which model users interact with:

- Removing the model picker overnight, forcing users from GPT-4o to GPT-5
- Making GPT-4o a hidden "legacy model" requiring a manual toggle in settings, with no in-app notification
- An "autoswitcher" bug routing users to wrong models
- Plus subscribers reported models switching to a "restricted version" without consent

Sam Altman acknowledged the rollout was "a little more bumpy than we hoped for." Reddit threads received thousands of upvotes calling the new model a "disaster" and a "downgrade."

This demonstrates that model swaps **do happen** in the industry — sometimes intentionally (product decisions) and sometimes accidentally (routing bugs).
