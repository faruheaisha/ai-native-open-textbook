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
pageSha256: "60286d519023738752eb985823bd6025266b9537c5d5b43638e9d35c39c9e27a"
contentMode: "local-full"
zh: ""
---

## Output & Format

| Flag | Description | Options | Example |
|------|-------------|---------|---------|
| `--output-format` | Specify output format (print mode) | `text`, `json`, `stream-json` | `claude -p --output-format json "query"` |
| `--input-format` | Specify input format (print mode) | `text`, `stream-json` | `claude -p --input-format stream-json` |
| `--verbose` | Enable verbose logging | | `claude --verbose` |
| `--include-partial-messages` | Include streaming events | Requires `stream-json` | `claude -p --output-format stream-json --include-partial-messages "query"` |
| `--forward-subagent-text` | Forward subagent text output into the stream. As of v2.1.219, subagents spawned at depth 2 or deeper are forwarded too, keyed by their spawning `Agent` `tool_use` id (this is how you observe the nesting enabled by default via `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`) | Requires `stream-json` | `claude -p --output-format stream-json --forward-subagent-text "query"` |
| `--json-schema` | Get validated JSON matching schema | | `claude -p --json-schema '\{"type":"object"\}' "query"` |
| `--max-budget-usd` | Maximum spend for print mode. Since v2.1.217, hitting the cap also halts running background subagents and denies new spawns (previously background agents kept running past the cap) | | `claude -p --max-budget-usd 5.00 "query"` |

### Output Format Examples

```bash
# Plain text (default)
claude -p "explain this code"

# JSON for programmatic use
claude -p --output-format json "list all functions in main.py"

# Streaming JSON for real-time processing
claude -p --output-format stream-json "generate a long report"

# Structured output with schema validation
claude -p --json-schema '{"type":"object","properties":{"bugs":{"type":"array"}}}' \
  "find bugs in this code and return as JSON"
```
