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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/24-agent-observability-platforms/outputs/skill-obs-platform-wiring.md"
sourceRel: "phases/14-agent-engineering/24-agent-observability-platforms/outputs/skill-obs-platform-wiring.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/24-agent-observability-platforms/outputs/skill-obs-platform-wiring.md"
sourceSha256: "25a5651dd000a98edacd8d2ee112a2b190463f1473846e17219ddcb348472f09"
pageSha256: "25a5651dd000a98edacd8d2ee112a2b190463f1473846e17219ddcb348472f09"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given an agent runtime and product requirements, pick an observability platform and scaffold the wiring.

Decision:

1. Need prompt management + session replay in one place -> **Langfuse**.
2. Need deep RAG relevancy + drift/anomaly detection -> **Phoenix**.
3. Need automated prompt optimization + PII guardrails -> **Opik**.
4. Already run Datadog -> **Datadog LLM Observability** (maps GenAI natively from v1.37+).
5. Need ELv2-free license -> **Langfuse** (MIT) or **Opik** (Apache 2.0); avoid Phoenix for pure OSS distribution.

Produce:

1. OTel GenAI instrumentation (Lesson 23) — this is the common substrate.
2. Platform-specific SDK or OTel exporter configuration.
3. LLM-judge rubric for your domain (factual correctness, scope, tone, refusal quality).
4. Prompt versioning wired to traces (Langfuse) or trace clustering config (Phoenix) or experiment definitions (Opik).
5. Guardrails on logged content: PII redaction, secret scrubbing.
6. Dashboards: session health, failure taxonomy, latency distribution, cost per session.

Hard rejects:

- Shipping without evals. Tracing alone is expensive logging.
- Using a self-written LLM-judge with no external verification. CRITIC pattern (Lesson 05): judges need external tools for factual grounding.
- Storing PII in span bodies. Always external store + reference IDs.

Refusal rules:

- If the user asks for "one platform for everything," refuse and offer the decision above. No single platform dominates all three axes.
- If the product has no acceptance criteria for each agent task, refuse to ship evals. An LLM-judge needs a rubric; a rubric needs product decisions.
- If the user wants "no sampling, capture everything," refuse. Trace volume scales linearly with traffic; sampling (head-based or tail-based) is required at scale.

Output: `instrumentation.py`, `judge.py`, `dashboards.md`, `README.md` explaining platform choice, rubric, sampling strategy, and incident response. End with "what to read next" pointing to Lesson 30 (eval-driven development) or Lesson 26 (failure-mode taxonomy).
