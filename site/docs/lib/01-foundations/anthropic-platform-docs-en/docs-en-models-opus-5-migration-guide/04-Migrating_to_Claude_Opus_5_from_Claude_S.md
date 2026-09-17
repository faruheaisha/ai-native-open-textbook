---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/models/opus-5/migration-guide.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/models/opus-5/migration-guide.md"
sourceSha256: "2c90776b634505f2d6035e2f08ffac4bf934f8e5be4f77391f159416c7bd5cc5"
pageSha256: "a8ab155ebe865df2cc3c0402506961e21b53414121f86d0cf17cdb0b23c5bb62"
contentMode: "local-full"
zh: ""
---

## Migrating to Claude Opus 5 from Claude Sonnet 5

Claude Opus 5 and Claude Sonnet 5 share the same API surface: both run with [adaptive thinking](https://platform.claude.com/docs/en/build-with-claude/thinking) on by default, both default the [effort parameter](https://platform.claude.com/docs/en/build-with-claude/effort) to `high` on the Claude API and Claude Code, both serve a [1M token context window](https://platform.claude.com/docs/en/build-with-claude/context-windows) by default with [128k max output tokens](https://platform.claude.com/docs/en/models/overview), and neither supports [Priority Tier](https://platform.claude.com/docs/en/api/service-tiers#supported-models). Manual extended thinking and non-default sampling parameters return a 400 error on both models, as does assistant prefill.

### Update your model name

```python
model = "claude-sonnet-5"  # Before
model = "claude-opus-5"  # After
```

### What changed

1. **Pricing:** Claude Opus 5 is priced at $5 USD per million input tokens and $25 USD per million output tokens. Claude Sonnet 5 is priced at $2/$10 USD per million input/output tokens. See [Claude pricing](https://platform.claude.com/docs/en/about-claude/pricing) for complete pricing.

2. **Disabling thinking is capped at `high` effort:** On Claude Sonnet 5, `thinking: \{type: "disabled"\}` is accepted at any effort level. On Claude Opus 5, it is accepted only at an [effort](https://platform.claude.com/docs/en/build-with-claude/effort) level of `high` or below; a request that combines `thinking: \{type: "disabled"\}` with effort `xhigh` or `max` returns a 400 error, enforced on each request. Audit requests that disable thinking before you migrate.

3. **Mid-conversation system messages:** Claude Opus 5 accepts `role: "system"` messages immediately after a user turn in the `messages` array (subject to [placement rules](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages#limitations)). This feature is not available on Claude Sonnet 5. If you maintain code paths that rebuild the full message history to update instructions, you can simplify them and preserve [prompt cache](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) hits on earlier turns.

4. **Web fetch is not available:** The [web fetch](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool) tool is available on Claude Sonnet 5 but not on Claude Opus 5.

### Migration checklist

* Update the model name from `claude-sonnet-5` to `claude-opus-5`.
* Audit requests that disable thinking: `thinking: \{type: "disabled"\}` with effort `xhigh` or `max` returns a 400 error on Claude Opus 5. Re-enable thinking or lower the effort to `high` or below.
* If you use [web fetch](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool), plan an alternative: it is not available on Claude Opus 5.
* Re-run [token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting) against Claude Opus 5 rather than reusing counts measured against Claude Sonnet 5, and re-baseline cost and latency on your own workloads; per-token pricing differs.
