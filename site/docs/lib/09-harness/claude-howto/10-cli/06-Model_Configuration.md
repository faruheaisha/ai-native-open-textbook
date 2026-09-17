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
pageSha256: "3e5e2dc5fe3f6375d3ddbd8410e2a7ca1c4d01acf87fdd0de76fa2eaa838a3b4"
contentMode: "local-full"
zh: ""
---

## Model & Configuration

| Flag | Description | Example |
|------|-------------|---------|
| `--model` | Set model (sonnet, opus, haiku, or full name) | `claude --model opus` |
| `--fallback-model` | Automatic model fallback when the primary is overloaded/unavailable; configure up to three via the `fallbackModel` setting. Applies to interactive sessions too since v2.1.166 (previously print mode only) | `claude -p --fallback-model sonnet "query"` |
| `--agent` | Specify agent for session | `claude --agent my-custom-agent` |
| `--agents` | Define custom subagents via JSON | See [Agents Configuration](#agents-configuration) |
| `--effort` | Set effort level (low, medium, high, xhigh, max) | `claude --effort xhigh` |

### Model Selection Examples

```bash
# Use Opus 5 for complex tasks
claude --model opus "design a caching strategy"

# Use Haiku 4.5 for quick tasks
claude --model haiku -p "format this JSON"

# Full model name
claude --model claude-sonnet-4-6-20250929 "review this code"

# With fallback for reliability
claude -p --model opus --fallback-model sonnet "analyze architecture"

# Use opusplan (Opus plans, Sonnet executes)
claude --model opusplan "design and implement the caching layer"
```

> **Gateway model discovery (v2.1.129+, opt-in)**: When `ANTHROPIC_BASE_URL` points at an Anthropic-compatible gateway, set `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1` to populate `/model` from the gateway's `/v1/models` endpoint. Without the env var, `/model` falls back to the built-in static list. The flag is opt-in (changed in v2.1.129) because the discovery call can surface models a user may not be entitled to use; v2.1.126 made it implicit and that behavior was reverted.

> **Org default model (v2.1.196)**: When an org admin sets a default model, `/model` labels it as "Org default" (or "Role default").
