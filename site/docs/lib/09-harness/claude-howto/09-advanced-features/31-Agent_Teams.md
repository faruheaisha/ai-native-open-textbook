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
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/README.md"
sourceRel: "09-advanced-features/README.md"
rawUrl: "/raw/09-harness/claude-howto/09-advanced-features/README.md"
sourceSha256: "988281137b2d4521b357f46ae4fdd619ac2b8be6a7500cb14375141641efbc65"
pageSha256: "762472dafdcbad23055e03ab69f5625134845a9d70a1e9419d2b0ec92251c8a7"
contentMode: "local-full"
zh: ""
---

## Agent Teams

Agent Teams is an experimental feature that enables multiple Claude Code instances to collaborate on a task. It is disabled by default.

### Enabling Agent Teams

Enable via environment variable or settings:

```bash
# Environment variable
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

Or add to your settings JSON:

```json
{
  "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
}
```

### How Agent Teams Work

- A **team lead** coordinates the overall task and delegates subtasks to teammates
- **Teammates** work independently, each with their own context window
- A **shared task list** enables self-coordination between team members
- Use subagent definitions (`.claude/agents/` or `--agents` flag) to define teammate roles and specializations

### Display Modes

Agent Teams support two display modes, configured with the `--teammate-mode` flag:

| Mode | Description |
|------|-------------|
| `in-process` (default) | Teammates run within the same terminal process |
| `tmux` | Each teammate gets a dedicated split pane (requires tmux or iTerm2) |
| `auto` | Automatically selects the best display mode |

```bash
# Use tmux split panes for teammate display
claude --teammate-mode tmux

# Explicitly use in-process mode
claude --teammate-mode in-process
```

### Use Cases

- Large refactoring tasks where different teammates handle different modules
- Parallel code review and implementation
- Coordinated multi-file changes across a codebase

> **Note**: Agent Teams is experimental and may change in future releases. See [code.claude.com/docs/en/agent-teams](https://code.claude.com/docs/en/agent-teams) for the full reference.
