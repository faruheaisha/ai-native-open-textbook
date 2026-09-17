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
pageSha256: "4ea9b7f095922f3f6fb2683777557b35a17255a2037986b1fe1e9e885629abcb"
contentMode: "local-full"
zh: ""
---

## Session Management

| Flag | Description | Example |
|------|-------------|---------|
| `--session-id` | Use specific session ID (UUID) | `claude --session-id "550e8400-..."` |
| `--fork-session` | Create new session when resuming | `claude --resume abc123 --fork-session` |

### Session Examples

```bash
# Continue last conversation
claude -c

# Resume named session
claude -r "feature-auth" "continue implementing login"

# Fork session for experimentation
claude --resume feature-auth --fork-session "try alternative approach"

# Use specific session ID
claude --session-id "550e8400-e29b-41d4-a716-446655440000" "continue"
```

### Session Fork

Create a branch from an existing session for experimentation:

```bash
# Fork a session to try a different approach
claude --resume abc123 --fork-session "try alternative implementation"

# Fork with a custom message
claude -r "feature-auth" --fork-session "test with different architecture"
```

**Use Cases:**
- Try alternative implementations without losing the original session
- Experiment with different approaches in parallel
- Create branches from successful work for variations
- Test breaking changes without affecting the main session

The original session remains unchanged, and the fork becomes a new independent session.

### Project State Cleanup (v2.1.126+)

`claude project purge` deletes all local Claude Code state for a project — transcripts, task lists, debug logs, file-edit history, prompt history lines, and the project's `~/.claude.json` entry. Use `--dry-run` first to preview the deletion; `--all` walks every project on the machine.

```bash
# Preview what would be deleted (safe)
claude project purge ~/work/repo --dry-run

# Delete state for a specific project, no prompts
claude project purge ~/work/repo --yes

# Walk every project interactively
claude project purge --all --interactive
```
