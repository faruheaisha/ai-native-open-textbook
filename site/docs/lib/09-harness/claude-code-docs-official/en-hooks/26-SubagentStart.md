---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/hooks.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/hooks.md"
sourceSha256: "a6f4f82aca2e63d64ba787c2dc8d735ff95ae86fd3a53471b87eb089133cbdca"
pageSha256: "2f80328bcba4a403084520b1decbb93a9f21410943251500b4142097e50c8c46"
contentMode: "local-full"
zh: ""
---

### SubagentStart

Runs when Claude spawns a subagent with the Agent tool, when Claude [resumes a subagent](https://code.claude.com/docs/en/sub-agents#resume-subagents), and each time an in-process [agent team](https://code.claude.com/docs/en/agent-teams) teammate handles a new message. Supports matchers to filter by agent type name. For built-in agents, this is the agent name like `general-purpose`, `Explore`, or `Plan`. For [custom subagents](https://code.claude.com/docs/en/sub-agents), this is the `name` field from the agent's frontmatter, not the filename.

For subagents shipped by a [plugin](https://code.claude.com/docs/en/plugins), the agent type is the plugin-scoped identifier such as `my-plugin:reviewer`, not the bare frontmatter name. The colon places a plugin-scoped name on the regular-expression path, so anchor the matcher with `^` and `$` for an exact match: `^my-plugin:reviewer$`.

#### SubagentStart input

In addition to the [common input fields](#common-input-fields), SubagentStart hooks receive `agent_id` with the unique identifier for the subagent and `agent_type` with the agent name that the matcher filters on.

```json theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "SubagentStart",
  "agent_id": "agent-abc123",
  "agent_type": "Explore"
}
```

SubagentStart hooks can't block subagent creation, but they can inject context into the subagent. In addition to the [JSON output fields](#json-output) available to all hooks, you can return:

| Field               | Description                                                                                                                                             |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `additionalContext` | String added to the subagent's context at the start of its conversation, before its first prompt. See [Add context for Claude](#add-context-for-claude) |

```json theme={null}
{
  "hookSpecificOutput": {
    "hookEventName": "SubagentStart",
    "additionalContext": "Follow security guidelines for this task"
  }
}
```

When the hook runs again for the same subagent, Claude Code injects the returned context only when the subagent's context doesn't already hold the copy from an earlier run. The copy injected at launch stays in place, leaving the subagent's [prompt cache](https://code.claude.com/docs/en/prompt-caching#subagents-and-the-cache) intact. After [auto-compaction](https://code.claude.com/docs/en/sub-agents#auto-compaction) discards that copy, Claude Code injects the next run's context again.
