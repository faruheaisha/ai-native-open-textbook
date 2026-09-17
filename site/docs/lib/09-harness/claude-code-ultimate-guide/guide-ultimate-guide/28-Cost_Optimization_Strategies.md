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
pageSha256: "c76f5f3a2e59ae2dac88c33a90bd38026fd7fe1446ecc67577499ddb36c5d62c"
contentMode: "local-full"
zh: ""
---

#### Cost Optimization Strategies

**Strategy 1: Be specific in queries**

```bash
# ❌ Expensive - reads entire file
"Check auth.ts for issues"
# ~5K tokens if file is large

# ✅ Cheaper - targets specific location
"Check the login function in auth.ts:45-60"
# ~500 tokens
```

**Strategy 2: Use `/compact` proactively**

```bash
# Without /compact - conversation grows
Context: 10% → 30% → 50% → 70% → 90%
Cost per message increases as context grows

# With /compact at 70%
Context: 10% → 30% → 50% → 70% → [/compact] → 30% → 50%
Frees significant context space for subsequent messages
```

**Strategy 3: Choose the right model**

```bash
# Use Haiku for simple tasks (4x cheaper input, 3.75x cheaper output)
claude --model haiku "Fix this typo in README.md"

# Use Sonnet (default) for standard work
claude "Refactor this module"

# Use Opus only for critical/complex tasks
claude --model opus "Design the entire authentication system"
```

**Strategy 4: Limit MCP servers**

```json
// ❌ Expensive - 5 MCP servers loaded
{
  "mcpServers": {
    "serena": {...},
    "context7": {...},
    "sequential": {...},
    "playwright": {...},
    "postgres": {...}
  }
}
// ~10K tokens overhead per session

// ✅ Cheaper - load only what you need
{
  "mcpServers": {
    "serena": {...}  // Only for this project
  }
}
// ~2K tokens overhead
```

**Strategy 5: Batch operations**

```bash
# ❌ Expensive - 5 separate prompts
"Read file1.ts"
"Read file2.ts"
"Read file3.ts"
"Read file4.ts"
"Read file5.ts"

# ✅ Cheaper - single batched request
"Read file1.ts, file2.ts, file3.ts, file4.ts, file5.ts and analyze them together"
# Shared context, single response
```

**Strategy 6: Use prompt caching for repeated context (API)**

If you call the Anthropic API directly (e.g., for custom agents or pipelines), prompt caching cuts costs by up to 90% on repeated prefixes.

```python
# Mark stable sections with cache_control
response = client.messages.create(
    model="claude-sonnet-4-6-20250514",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": "<your large system prompt / codebase context>",
            "cache_control": {"type": "ephemeral"}  # Cache this prefix
        }
    ],
    messages=[{"role": "user", "content": "Fix the bug in auth.ts"}]
)
```

**Prompt caching economics**:

| Operation | Cost multiplier | TTL |
|-----------|-----------------|-----|
| Cache write | 1.25x base price | 5 minutes (default) |
| Cache write (extended) | 2x base price | 1 hour |
| Cache read (hit) | 0.1x base price | — |
| Latency reduction | Up to 85% for long prompts | — |

**Break-even**: 2 cache hits with 5-minute TTL. After that, pure savings.

**Rules**:
- Max **4 cache breakpoints** per request
- Cache key = exact prefix match (single character change = cache miss)
- Place breakpoints after large stable sections: system prompt, tool definitions, codebase context
- For Claude Code itself: caching is handled automatically by the CLI. This applies to API-based workflows you build on top of Claude

> Docs: [prompt caching](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching)
