---
title: "Description"
sourceId: "08-agents/microsoft-ai-engineering-coach"
sourceTitle: "AI Engineering Coach（微软）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/AI-Engineering-Coach"
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/cache-hit-starvation.md"
sourceRel: "src/core/rules/cache-hit-starvation.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/cache-hit-starvation.md"
sourceSha256: "5bc32ca93a521172c298cecb3761e9f7ac388bb266dc0a24836342deea82becc"
pageSha256: "5bc32ca93a521172c298cecb3761e9f7ac388bb266dc0a24836342deea82becc"
contentMode: "local-full"
zh: ""
---

# Description
Detects requests with large prompts (>5K input tokens) where almost none of the prompt is being served from the model's prompt cache. Low cache hit rates mean every request pays full price for the same prefixes — usually caused by churning instructions, frequent compaction, or unstable system prompts.

# When Triggered
&#123;&#123;count&#125;&#125; requests had prompts >&#123;&#123;extra.minPromptTokens&#125;&#125; tokens but only &#123;&#123;extra.cachePctLabel&#125;&#125; of input tokens came from cache. Each long-prompt request is paying full price for context the model has seen before.

# How to Improve
Stabilize the front of your prompts: keep custom instructions short and stable, avoid frequent compaction, prefer file references over pasted code, and avoid clearing chat mid-task. Within a session, repeated prefixes get cached and re-used for free.

# Examples
&#123;&#123;promptTokens&#125;&#125; prompt tokens · &#123;&#123;coalesce(cacheReadTokens, 0)&#125;&#125; cached

# Detection Logic
```detect
scan: requests
match: promptTokens > thresholds.minPromptTokens
aggregate: count
totalPrompt: sumField(matched, "promptTokens")
totalCache: sumField(matched, "cacheReadTokens")
cacheRate: totalCache / totalPrompt
cachePctLabel: cacheRate | pct:1
emitCount: count
emitTotal: count
check: count > thresholds.minSample AND cacheRate < thresholds.minCacheRate
examples: {{promptTokens}} prompt tokens, {{coalesce(cacheReadTokens, 0)}} cached
```
