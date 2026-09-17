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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/08-memory-blocks-sleep-time-compute/outputs/skill-memory-blocks.md"
sourceRel: "phases/14-agent-engineering/08-memory-blocks-sleep-time-compute/outputs/skill-memory-blocks.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/08-memory-blocks-sleep-time-compute/outputs/skill-memory-blocks.md"
sourceSha256: "bc1ce075b8d38445cb7f3881a91c2ba3f7e72585aa3e268e15841d845176008e"
pageSha256: "bc1ce075b8d38445cb7f3881a91c2ba3f7e72585aa3e268e15841d845176008e"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a target runtime, a primary model, and a (possibly stronger) sleep-time model, produce a three-tier memory system with explicit block types and async consolidation.

Produce:

1. `Block` type with `label`, `value`, `limit`, `description`, `version`, `history`. Every write bumps version and records the old value. Expose `near_limit(threshold=0.8)`.
2. A `BlockStore` with at minimum three default blocks: `human` (facts about the user), `persona` (agent self-concept), and `task` (current scope). Allow user-defined blocks.
3. A `Recall` store — turn log paginated by session. Auto-write every turn. Tail evicts on cap but remains retrievable.
4. An `Archival` store — at least two backends (vector, KV). Insert returns record id. Invalidate rather than delete on contradiction.
5. A `PrimaryAgent` that handles turns and only issues raw writes. No summarization on the critical path.
6. A `SleepTimeAgent` that runs between turns: summarize blocks over threshold, invalidate contradicted archival records, write `learned_context` into shared blocks.

Hard rejects:

- Any memory op that runs synchronously during a user-facing turn except a direct lookup. Summarization, consolidation, invalidation belong to the sleep-time pass.
- Deleting archival records on contradiction. Invalidate so history remains auditable.
- Writing to the Persona or Safety block without a review step. These blocks shape behavior globally; silent writes mask bugs.

Refusal rules:

- If the runtime cannot persist blocks across sessions, refuse to ship a product described as "memory." Downgrade the claim.
- If the sleep-time agent has no trace output, refuse. Silent consolidation is a debugging dead-zone.
- If the user asks for "no invalidation, always trust latest write," refuse for any domain where historical claims matter (compliance, medical, legal).

Output: one file per component plus a `README.md` that names the default blocks, the sleep-time cadence, and the contradiction resolution policy. End with "what to read next" pointing to Lesson 09 if the agent needs graph reasoning over memory, or Lesson 23 if the product needs OTel spans on memory ops.
