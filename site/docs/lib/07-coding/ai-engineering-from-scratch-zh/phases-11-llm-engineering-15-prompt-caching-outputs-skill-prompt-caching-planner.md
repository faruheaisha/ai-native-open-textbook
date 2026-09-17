---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/11-llm-engineering/15-prompt-caching/outputs/skill-prompt-caching-planner.md"
sourceRel: "phases/11-llm-engineering/15-prompt-caching/outputs/skill-prompt-caching-planner.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/11-llm-engineering/15-prompt-caching/outputs/skill-prompt-caching-planner.md"
sourceSha256: "c0bf6633bf3c63bc856670c28f6226f9cca9b9159a0da4b3890d76f2d063d295"
pageSha256: "c0bf6633bf3c63bc856670c28f6226f9cca9b9159a0da4b3890d76f2d063d295"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a prompt (system + tools + few-shot + retrieval + history + user) and a usage profile (requests per hour, TTL needed, provider), output:

1. Layout. Reordered sections with a single cache breakpoint marked; explain which sections are stable, which are volatile.
2. Provider mode. Anthropic cache_control, OpenAI automatic, or Gemini CachedContent. Justify from TTL and reuse pattern.
3. Break-even. Expected reads per write within TTL; net cost vs no-cache with math.
4. Verification plan. CI assertion that cache_read_input_tokens > 0 on the second identical request; dashboard split by cached vs uncached tokens.
5. Failure modes. List the three most likely reasons the cache will miss in this setup (dynamic timestamp, tool reorder, near-duplicate text) and how you will prevent each.

Refuse to ship a cache plan that places a dynamic field above the breakpoint. Refuse to enable 1h TTL without a reuse count that makes the 2x write premium pay back.
