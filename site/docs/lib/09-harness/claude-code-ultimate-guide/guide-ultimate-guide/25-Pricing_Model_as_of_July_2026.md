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
pageSha256: "8b439921baea9d2c729e609b8ce2cc0554355e53bb0b8ba90726932376881c3a"
contentMode: "local-full"
zh: ""
---

#### Pricing Model (as of July 2026)

The default model depends on your subscription: **Max/Team Premium** subscribers get **Opus 5** by default, while **Pro/Team Standard** subscribers get **Sonnet 5**. If Opus usage hits the plan threshold, it auto-falls back to Sonnet.

> **Model lineup (July 2026)**: Claude Opus 5 (`claude-opus-5`) is the current standard production Opus, with a native 1M-token context window. Claude Sonnet 5 (`claude-sonnet-5`) is the default model overall, also with a native 1M-token context window. Claude Opus 4.8 (`claude-opus-4-8`) remains supported as the previous-generation Opus and is the default on Bedrock, Vertex AI, and Claude Platform on AWS. Claude Fable 5 (`claude-fable-5`, Mythos-class) is the most capable model available, exceeding any previously GA Anthropic model ([announcement](https://www.anthropic.com/news/claude-fable-5-mythos-5)). Opus 4.7 and 4.6 are previous-generation; for workflows where Opus 4.6's lower token footprint is intentional, see [Pinning Opus 4.6](#pinning-opus-46-community-hack) in the OpusPlan section.

| Model | Input (per 1M tokens) | Output (per 1M tokens) | Context Window | Notes |
|-------|----------------------|------------------------|----------------|-------|
| **Fable 5** | $10.00 | $50.00 | 1M tokens | Mythos-class, most capable; [specs](https://claude.com/pricing) |
| **Opus 5** | $5.00 | $25.00 | 1M tokens | Current default for Max/Team Premium; effort defaults to high |
| Opus 5 (fast mode) | $10.00 | $50.00 | 1M tokens | Fast mode: 2.5x faster, 2x price |
| **Sonnet 5** | $2.00 | $10.00 | 1M tokens | Default (all plans); promotional pricing through 2026-08-31, then $3.00 / $15.00 |
| **Opus 4.8** | $5.00 | $25.00 | 1M tokens | Previous generation; default on Bedrock/Vertex/Claude-Platform-on-AWS; effort defaults to high (introduced xhigh) |
| Opus 4.8 (fast mode) | See official docs | See official docs | 1M tokens | Fast mode: 2.5x faster, 2x price |
| Sonnet 4.6 | $3.00 | $15.00 | 200K tokens | Previous generation |
| Sonnet 4.5 | $3.00 | $15.00 | 200K tokens | Legacy |
| Opus 4.7 | $5.00 | $25.00 | 200K tokens | Previous generation |
| Opus 4.7 (1M context) | $5.00 | $25.00 | 1M tokens | Previous generation |
| Opus 4.6 (standard) | $5.00 | $25.00 | 200K tokens | Previous generation |
| Opus 4.6 (1M context) | $5.00 | $25.00 | 1M tokens | Previous generation |
| Haiku 4.5 | $1.00 | $5.00 | 200K tokens | Budget option |

> **Pricing note**: Fast mode covers Opus 5 and Opus 4.8, running at 2.5x speed for 2x the standard price (Opus 4.7 was dropped from fast mode as of v2.1.219, 2026-07-24). Use the `effort` parameter to control spend.

**Reality check**: A typical 1-hour session costs **$0.10 - $0.50** depending on usage patterns.

> **Model retirement (April 2026)**: `claude-3-haiku-20240307` (Claude 3 Haiku) was retired on **April 20, 2026**. If your CLAUDE.md, agent definitions, or scripts still hardcode this model ID, migrate to `claude-haiku-4-5-20251001` (Haiku 4.5) immediately. Source: [platform.claude.com/docs/en/about-claude/model-deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations)
