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
pageSha256: "aef6841155626c02fb9a6dea721f06e0f8a2a6d636ea4142e35d172cd3742ad4"
contentMode: "local-full"
zh: ""
---

## System Prompt Customization

| Flag | Description | Example |
|------|-------------|---------|
| `--system-prompt` | Replace entire default prompt | `claude --system-prompt "You are a Python expert"` |
| `--system-prompt-file` | Load prompt from file (print mode) | `claude -p --system-prompt-file ./prompt.txt "query"` |
| `--append-system-prompt` | Append to default prompt | `claude --append-system-prompt "Always use TypeScript"` |
| `--append-subagent-system-prompt` | Append text to every subagent's system prompt (non-interactive) | `claude -p --append-subagent-system-prompt "Cite sources" "query"` |
| `--append-subagent-system-prompt-file` | (v2.1.261) Load that appended text from a file instead, for prompts too long to pass on the command line. Non-interactive only, and **cannot be combined** with `--append-subagent-system-prompt` | `claude -p --append-subagent-system-prompt-file ./subagent-rules.txt "query"` |

### System Prompt Examples

```bash
# Complete custom persona
claude --system-prompt "You are a senior security engineer. Focus on vulnerabilities."

# Append specific instructions
claude --append-system-prompt "Always include unit tests with code examples"

# Load complex prompt from file
claude -p --system-prompt-file ./prompts/code-reviewer.txt "review main.py"
```

### System Prompt Flags Comparison

| Flag | Behavior | Interactive | Print |
|------|----------|-------------|-------|
| `--system-prompt` | Replaces entire default system prompt | ✅ | ✅ |
| `--system-prompt-file` | Replaces with prompt from file | ❌ | ✅ |
| `--append-system-prompt` | Appends to default system prompt | ✅ | ✅ |

**Use `--system-prompt-file` only in print mode. For interactive mode, use `--system-prompt` or `--append-system-prompt`.**
