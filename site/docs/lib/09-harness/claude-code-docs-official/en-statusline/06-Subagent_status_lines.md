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
sourceRel: "en/statusline.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/statusline.md"
sourceSha256: "25714ae87efd73e8e4306f76fde76471ba55cb1a50ce48d4126baa0731d1cbd1"
pageSha256: "c9bf1975331c05c4c47ff6ca7b8ea1348b2054aa16f52a060fbeba34092fcb05"
contentMode: "local-full"
zh: ""
---

## Subagent status lines

The `subagentStatusLine` setting renders a custom row body for each [subagent](https://code.claude.com/docs/en/sub-agents) shown in the agent panel below the prompt. Use it to replace the default `name · description · token count` row with your own formatting.

```json theme={null}
{
  "subagentStatusLine": {
    "type": "command",
    "command": "~/.claude/subagent-statusline.sh"
  }
}
```

The command runs once per refresh tick and receives all visible subagent rows as a single JSON object on stdin. The input includes the [base hook fields](https://code.claude.com/docs/en/hooks#common-input-fields), a `columns` field with the usable row width, and a `tasks` array. Each task has `id`, `name`, `type`, `status`, `description`, `label`, `startTime`, `model`, `effort`, `contextWindowSize`, `tokenCount`, `tokenSamples`, and `cwd`.

The per-task `model` field is the resolved model ID the task runs on. `contextWindowSize` is that model's context window in tokens, computed the same way as the main status line's `context_window.context_window_size`, so you can render a per-row percentage from `tokenCount`. Both fields require Claude Code v2.1.205 or later and are omitted for a task whose model isn't resolved yet.

The per-task `effort` field is the reasoning effort set for that subagent, in its [definition frontmatter](https://code.claude.com/docs/en/sub-agents#supported-frontmatter-fields) or on the individual invocation. The value is either one of the effort level strings `low`, `medium`, `high`, `xhigh`, or `max`, or a numeric token budget. The field reports the configured value as written: if the model doesn't support that level, the effort Claude Code actually applies may differ. The field requires Claude Code v2.1.214 or later and is absent when the subagent inherits the session's effort level.

Write one JSON line to stdout per row you want to override, in the form `\{"id": "<task id>", "content": "<row body>"\}`. The `content` string is rendered as-is, including ANSI colors and OSC 8 hyperlinks. Omit a task's `id` to keep the default rendering for that row; emit an empty `content` string to hide it.

The same trust, `disableAllHooks`, and [`allowManagedHooksOnly`](https://code.claude.com/docs/en/settings-reference#allowmanagedhooksonly) gates that apply to `statusLine` apply here. Plugins can ship a default `subagentStatusLine` in their [`settings.json`](https://code.claude.com/docs/en/plugins-reference#standard-plugin-layout), but unlike hooks, plugin values don't run under `allowManagedHooksOnly` even when the plugin is force-enabled in managed settings `enabledPlugins`.
