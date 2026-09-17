---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/10-cli/README.md"
sourceRel: "10-cli/README.md"
rawUrl: "/raw/09-harness/claude-howto/10-cli/README.md"
sourceSha256: "d828c0d6684b52e2c08a4547b5e6e526f7b27045e72b6e3e8b73824e05e7f8e5"
pageSha256: "522d2b4a02b1f383902b3b608a0bef1a61f3427ccecb57061a007faffbfab8c4"
contentMode: "local-full"
zh: ""
---

## Models

Claude Code supports multiple models with different capabilities:

| Model | ID | Context Window | Notes |
|-------|-----|----------------|-------|
| Sonnet 5 | `claude-sonnet-5` | 1M tokens | Default on Pro / Team Standard / Enterprise seats (v2.1.197); native 1M-token context window. As of v2.1.219, **Opus 5** is the default Opus model on Max, Team Premium, Enterprise pay-as-you-go, and the Anthropic API; Microsoft Foundry still resolves the `opus` alias to Opus 4.6 |
| Opus 5 | `claude-opus-5` | 1M tokens | Default Opus model on Max, Team Premium, Enterprise pay-as-you-go, Anthropic API, Claude Platform on AWS, Amazon Bedrock, and Google Cloud's Agent Platform (v2.1.219); adaptive effort levels `low → max`, default effort `high` |
| Opus 4.8 | `claude-opus-4-8` | 1M tokens | Previous flagship Opus, still selectable; adaptive effort levels `low → max`; default effort `high` (v2.1.154) |
| Sonnet 4.6 | `claude-sonnet-4-6` | 1M tokens | Balanced speed and capability; default effort for Pro/Max subscribers raised from `medium` to `high` in v2.1.117 |
| Haiku 4.5 | `claude-haiku-4-5` | 200K tokens | Fastest, best for quick tasks; no effort levels |
| Fable 5.1 | `claude-fable-5-1` | — | Current Fable model; the `fable` alias resolves to it (v2.1.257) |
| Fable 5 | `claude-fable-5` | — | Mythos-class model, made safe for general use (v2.1.170) |

### Model Selection

```bash
# Use short names
claude --model opus "complex architectural review"
claude --model sonnet "implement this feature"
claude --model haiku -p "format this JSON"

# Use opusplan alias (Opus plans, Sonnet executes)
claude --model opusplan "design and implement the API"

# Toggle fast mode during session
/fast
```

> **Fable 5.1 and the `fable` alias (v2.1.257)**: Fable 5.1 (`claude-fable-5-1`) ships in **v2.1.257**, and the `fable` alias now resolves to it rather than to Fable 5. The official model-config page says Fable 5.1 "requires Claude Code v2.1.255 or later", but 2.1.255 was never published — v2.1.257 is the first release users can actually install it with. On a Claude apps gateway, `fable` and `best` still resolve to **Fable 5**; pick 5.1 explicitly in `/model` there.

> **Fast Mode runs on Opus 5 and Opus 4.8 (v2.1.219)**: As of v2.1.219, `/fast` applies to **Opus 5 and Opus 4.8** — Opus 4.7 was removed from fast mode. Opus 5's fast mode is billed at $10/$50 per Mtok. Fast mode first moved to Opus 4.8 in v2.1.154 (about 2× the standard rate for ~2.5× the output speed), having flipped from Opus 4.6 to Opus 4.7 in v2.1.142. The `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE` env var was **deprecated in v2.1.154 and removed on 2026-06-01**; fast mode is no longer available on Opus 4.6 — select Opus 5 or Opus 4.8 instead.

### Effort Levels (Opus 5 / Sonnet 5 / Opus 4.8 / Opus 4.7)

Opus 5, Sonnet 5, Opus 4.8, and Opus 4.7 support adaptive reasoning with effort levels, ordered from lightest to heaviest: `low` (○), `medium` (◐), `high` (●), `xhigh`, and `max`. The **default** is `high` on Opus 5, Sonnet 5, Opus 4.8 (since v2.1.154), Opus 4.6, and Sonnet 4.6, and `xhigh` on Opus 4.7. `xhigh` is available on Opus 5, Sonnet 5, Opus 4.8, and Opus 4.7; `max` works on Opus 5, Sonnet 5, Opus 4.8/4.7/4.6 and Sonnet 4.6 (session-only). Haiku 4.5 has no effort levels. On Opus 4.6 / Sonnet 4.6, the default effort for Pro/Max subscribers was raised from `medium` to `high` in v2.1.117.

```bash
# Set effort level via CLI flag
claude --effort high "complex review"

# Set effort level via slash command
/effort high

# Set effort level via environment variable
export CLAUDE_CODE_EFFORT_LEVEL=high   # low, medium, high, xhigh (Opus 5, Sonnet 5, Opus 4.8/4.7), or max — default is high on Opus 5
```

The "ultrathink" keyword in prompts activates deep reasoning. The `/effort` menu also offers `ultracode`, which is **not** a model effort level — it sends `xhigh` and has Claude orchestrate dynamic workflows (session-only).
