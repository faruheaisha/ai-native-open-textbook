---
title: "Claude Code Best Practice"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/claude-settings.md"
sourceRel: "best-practice/claude-settings.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/best-practice/claude-settings.md"
sourceSha256: "75075e7b44bd6afd58459b40b4d627c415bb3b04514783ad87ee15a97b2e8077"
pageSha256: "6f2c0b2e8811621b318c7d81a785cd531ddc78f236a8439be8411173ddc72792"
contentMode: "local-full"
zh: ""
---

## Model Configuration

### Model Aliases

| Alias | Description |
|-------|-------------|
| `"default"` | Recommended for your account type |
| `"sonnet"` | Latest Sonnet model (Claude Sonnet 5 on the Anthropic API — native 1M-token context, introduced v2.1.197; Claude Sonnet 4.6 on Bedrock/Vertex/Foundry) |
| `"opus"` | Latest Opus model (**Claude Opus 5** (`claude-opus-5`) on the Anthropic API as of v2.1.219 — 1M-token context native; Opus 4.8 on Bedrock, Vertex, and Claude Platform on AWS as of v2.1.207). Opus 5 and Opus 4.8 are the fast-mode models (Opus 4.7 removed from fast mode in v2.1.219). Opus 5 supports `ultracode` effort; Opus 4.8 defaults to `high` and supports `xhigh` |
| `"haiku"` | Fast Haiku model |
| `"sonnet[1m]"` | Sonnet with 1M token context |
| `"opus[1m]"` | Opus with 1M token context (default on Max, Team, and Enterprise since v2.1.75) |
| `"opusplan"` | Opus for planning, Sonnet for execution |
| `"fable"` | Claude Fable 5 — long-horizon reasoning model. Anthropic API only (v2.1.170+). Fable 5 includes 1M context by default; the `[1m]` suffix is auto-stripped, so `fable[1m]` is redundant (v2.1.173) |

**Example:**
```json
{
  "model": "opus"
}
```

> **Note (v2.1.144):** `/model` changes the model for the **current session only**. Press `d` in the `/model` picker to also set the selection as your default. The `model` setting and `ANTHROPIC_MODEL` continue to control the persistent default.

### Model Overrides

Map Anthropic model IDs to provider-specific model IDs for Bedrock, Vertex, or Foundry deployments.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `effortLevel` | string | - | Persist the effort level across sessions. Accepts `"low"`, `"medium"`, `"high"`, `"xhigh"` (Fable 5, Opus 5, Sonnet 5, Opus 4.7, Opus 4.8, v2.1.111). **`"max"` and `"ultracode"` are session-only and are not accepted here** — set them via `/effort` or `--settings` for a single session but do not write them to `settings.json`. Written automatically when you run `/effort <level>`. The default effort is `high` on every model that supports effort, except Opus 4.7 which defaults to `xhigh`. Unsupported levels fall back to the highest supported level on the active model. **As of v2.1.243, `/effort` saves defaults per-model via `modelSettings`** — use `modelSettings` when you want different effort defaults per model |
| `modelSettings` | object | - | Per-model saved effort levels and configuration, keyed by model alias or ID. Each entry contains `effortLevel` and optionally other per-model overrides. `/effort` writes to this key as of v2.1.243, enabling different default effort levels on different models. **Does not merge across settings files** — the highest-precedence file that defines it supplies the entire object. Example: <code v-pre>\{"opus": \{"effortLevel": "xhigh"\}, "sonnet": \{"effortLevel": "high"}}</code> |
| `modelPicker` | object | - | Curate and order the `/model` picker with labeled, ordered rows. Overrides the default model list when set. **Does not merge across settings files** — the highest-precedence file that defines it supplies the entire list. Example: `[\{"id": "opus", "label": "Opus 5 (reasoning)"\}, \{"id": "sonnet", "label": "Sonnet 5 (balanced)"\}]` (v2.1.242+) |
| `modelPricing` | object | - | **(Managed only)** Contracted per-model rates and discount multipliers applied to usage cost reporting. Allows organizations to configure accurate cost attribution when using negotiated pricing tiers rather than public list prices (v2.1.243+) |
| `fallbackModel` | array | - | Up to 3 fallback model IDs tried sequentially when the primary model is unavailable (e.g., rate-limited or capacity issue). Each entry is a model ID or alias; `"default"` expands to the account default. Claude Code attempts the primary model first; if it fails, each fallback is tried in order. Stops at the first successful response. **Unlike most array settings, this key does not merge across settings files** — the highest-precedence file that defines it supplies the entire chain; entries beyond 3 (after deduplication) are silently ignored (v2.1.166) |
| `modelOverrides` | object | - | Map model picker entries to provider-specific IDs (e.g., Bedrock inference profile ARNs). Each key is a model picker entry name, each value is the provider model ID |

**Example:**
```json
{
  "modelOverrides": {
    "claude-opus-4-6": "arn:aws:bedrock:us-east-1:123456789:inference-profile/anthropic.claude-opus-4-6-v1:0",
    "claude-sonnet-4-6": "arn:aws:bedrock:us-east-1:123456789:inference-profile/anthropic.claude-sonnet-4-6-v1:0"
  }
}
```

### Effort Level

The `/model` command exposes an **effort level** control that adjusts how much reasoning the model applies per response. Use the ← → arrow keys in the `/model` UI to cycle through effort levels.

| Effort Level | Description |
|-------------|-------------|
| Ultracode | Session-only: triggers the ultracode workflow in addition to xhigh reasoning depth. Activated via `/effort ultracode` — **not a valid `effortLevel` value in settings.json** (v2.1.203+) |
| Max | Session-only: maximum reasoning depth on models that support it (Fable 5, Opus 5, Sonnet 5, Opus 4.8, Opus 4.7, Opus 4.6, Sonnet 4.6). **Not a valid `effortLevel` value in settings.json** |
| XHigh | Extended high reasoning depth. Available on Fable 5, Opus 5, Sonnet 5, Opus 4.7, Opus 4.8 (v2.1.111). Default on Opus 4.7 across all plans; on other supported models the default is `high` |
| High (default on all effort-supporting models except Opus 4.7) | Full reasoning depth, best for complex tasks |
| Medium | Balanced reasoning, good for everyday tasks |
| Low | Minimal reasoning, fastest responses |

**How to use:**
1. Run `/effort low`, `/effort medium`, or `/effort high` to set directly (v2.1.76+)
2. Or run `/model` → select a model → use **← →** arrow keys to adjust
3. The setting persists via the `effortLevel` key in `settings.json`. **As of v2.1.243, `/effort` saves per-model defaults via `modelSettings`** — the global `effortLevel` remains the fallback when `modelSettings` has no entry for the active model

**Note:** Effort level is available for Opus 4.6, Sonnet 4.6, Opus 4.7, and Opus 4.8 on Max and Team plans. The default was changed from High to Medium in v2.1.68, then changed back to **High** for API-key, Bedrock/Vertex/Foundry, Team, and Enterprise users in v2.1.94. In v2.1.117, the default was also raised from `medium` to `high` for Pro/Max subscribers on Opus 4.6 and Sonnet 4.6, bringing all tiers into alignment on `high`. v2.1.111 introduced **`xhigh`** (Opus 4.7 only at the time) and made it the default effort level on Opus 4.7 across all plans. **v2.1.154** added **Opus 4.8** as the latest Opus on the Anthropic API; it supports `xhigh` but defaults to `high`. As of v2.1.75, 1M context window for Opus 4.6 is available by default on Max, Team, and Enterprise plans.

**Effort env propagation:** Inside skill files, use `${CLAUDE_EFFORT}` to reference the current effort level (v2.1.120). As of v2.1.133, the same `$CLAUDE_EFFORT` variable is also injected into the environment of Bash tool subprocesses and hook handlers, so shell scripts and hook commands can adapt their behavior based on the active effort tier without reading a separate config file.

### Model Environment Variables

Configure via `env` key:

```json
{
  "env": {
    "ANTHROPIC_MODEL": "sonnet",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "custom-haiku-model",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "custom-sonnet-model",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "custom-opus-model",
    "CLAUDE_CODE_SUBAGENT_MODEL": "haiku",
    "MAX_THINKING_TOKENS": "10000"
  }
}
```
