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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md"
sourceRel: "guide/ultimate-guide.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ultimate-guide.md"
sourceSha256: "4d290b0171bbaaffd149d5d2e4da964392cb212d7357408df40d8f346f952dbc"
pageSha256: "1602205c6a35ae08d66b85191bcbc6df0d23ca11662b9ece0aa2bdd557552f56"
contentMode: "local-full"
zh: ""
---

#### How Claude Code Handles Caching Automatically

Claude Code manages prompt caching without any configuration on your part. Understanding the mechanics helps you make decisions that keep cache hit rates high and costs low.

**Cache prefix hierarchy**

Every API call Claude Code makes structures content in this fixed order: `tools → system → messages`. Cache matching always starts from the beginning of this prefix. A stable tool list + stable CLAUDE.md + growing conversation history means the first two layers are almost always cache hits, while only new message turns require fresh computation.

**The 20-block lookback: the long-session trap**

Cache matching uses a bounded lookback of approximately 20 blocks. In a long session with many tool calls and exchanges, blocks from early in the conversation fall outside this window and become cache misses. Practical consequence: very long sessions gradually lose cache efficiency at the message layer. The fix is `/compact`: it compresses the conversation history into a single summary block, resetting the lookback window and restoring high hit rates.

**Minimum token thresholds by model**

A block must meet a minimum size to be eligible for caching. Blocks smaller than the threshold are never cached, regardless of how stable they are:

| Model family | Minimum tokens |
|---|---|
| Claude Opus 5, Fable 5 | 512 |
| Claude Sonnet 5, Opus 4.8 | 1,024 |
| Claude Opus 4.7, Opus 4.6, Opus 4.5, Haiku 4.5 | 4,096 |
| Claude Sonnet 4.6 | 2,048 |
| Claude Sonnet 4.5, Sonnet 4, Sonnet 3.7, Opus 4.1, Opus 4 | 1,024 |
| Claude Haiku 3.5, Haiku 3 | 2,048 |

Short CLAUDE.md files (under ~1,000 tokens) may not be cached at all on Sonnet models. If cost optimization matters, make sure your system prompt crosses the threshold for your target model.

**Tool result size and cache economics**

Tool results land in the message history and stay there for the rest of the session. Every subsequent API call re-reads that history, at cache read price (0.1x), but still proportional to size. A `git status` output of 500 tokens costs 500 × 0.1x to read on every turn that follows. The same output at 50 tokens (filtered by a tool like RTK) costs 50 × 0.1x: 90% less, compounding across every turn in the session. Compact tool outputs are not just faster to process; they make the entire cached prefix cheaper to maintain.

The same logic applies to cache writes: a smaller history prefix means cheaper initial writes (1.25x × fewer tokens).

**Monitoring cache performance in your own pipelines**

When building agents or pipelines on top of the Anthropic API, the response `usage` object exposes cache metrics directly:

```python
response = client.messages.create(...)

print(response.usage.cache_creation_input_tokens)  # Tokens written to cache this request
print(response.usage.cache_read_input_tokens)       # Tokens read from cache (hits)
print(response.usage.input_tokens)                  # Non-cached input tokens
```

Calculate your hit rate as `cache_read / (cache_read + cache_creation)` across requests. A ratio above 0.8 means your prompt structure is working well. Low ratios usually mean content in the stable prefix is changing between requests: check for timestamps, random IDs, or dynamic content embedded in your system prompt.

No dedicated monitoring tool exists specifically for Claude Code session cache metrics. Cost tracking via `ccusage` covers overall spend but does not break out cache hit rates. For cache-specific visibility in custom pipelines, parse the response fields above.

**Practical rules**

- Keep CLAUDE.md stable between sessions: edits invalidate the system cache one-shot, then it re-warms on the next request
- Run `/compact` before the conversation gets very long, not after performance degrades
- Avoid dynamic content in stable sections (dates, random values, per-request context)
- Larger CLAUDE.md = more expensive cache write, but also more tokens saved per read, profitable after ~2 hits

**Known cache bugs (v2.1.69+)**

Two active bugs silently break caching on v2.1.69+. Apply these workarounds immediately:

- **--resume/--continue** causes a full cache rebuild (0% hit ratio) on every resume because session JSONL strips deferred tool records before write. Workaround: avoid `--resume` until fixed.
- **Per-session billing header** injects a unique hash as the first system prompt block, causing a cold miss on every session start and subagent call. Workaround: `"CLAUDE_CODE_ATTRIBUTION_HEADER": "false"` in `~/.claude/settings.json`.

See [Known Issues → Prompt Cache Bugs](/lib/09-harness/claude-code-ultimate-guide/guide-core-known-issues) and run `/check-cache-bugs` for a full audit.

> Docs: [prompt caching](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching)
