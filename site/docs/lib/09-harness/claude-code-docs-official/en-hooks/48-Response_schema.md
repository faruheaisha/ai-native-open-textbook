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
pageSha256: "d7e09553cc24682839776cf9581c7f8cdba7ed4bafdef38c3778c483a4e900ea"
contentMode: "local-full"
zh: ""
---

### Response schema

The LLM must respond with JSON containing:

```json theme={null}
{
  "ok": true | false,
  "reason": "Explanation for the decision",
  "impossible": true | false
}
```

| Field        | Description                                                                                                                                                                                                                                      |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`         | `true` to allow. For `false`, see the per-event behavior below                                                                                                                                                                                   |
| `reason`     | Required when `ok` is `false`                                                                                                                                                                                                                    |
| `impossible` | Optional. The model returns it with `ok: false` when it judges the condition can never be satisfied. On `Stop` and `SubagentStop`, Claude Code then lets the turn end instead of feeding the reason back. Agent hooks and other events ignore it |

What happens on `ok: false` depends on the event:

* `Stop` and `SubagentStop`: the reason is fed back to Claude as its next instruction and the turn continues, unless the response also sets `impossible: true`, in which case Claude Code allows the stop and the turn ends
* `PreToolUse`: the tool call is denied; by default the turn ends and the deny reason appears in the chat as a warning line. Set `continueOnBlock: true` to instead return the reason to Claude as the tool error so it can adjust and continue, equivalent to a command hook's `permissionDecision: "deny"`. Before v2.1.210, the deny reason was returned to Claude as the tool error and the turn continued
* `PostToolUse`: by default the turn ends and the reason appears in the chat as a warning line. Set `continueOnBlock: true` to feed the reason back to Claude and continue the turn instead
* `PostToolBatch`, `UserPromptSubmit`, and `UserPromptExpansion`: the turn ends and the reason appears as a warning line. These events end the turn on `decision: "block"` regardless of `continue`
* `PostToolUseFailure` and `TaskCreated`: the reason is returned to Claude as a tool error and the turn continues, regardless of `continueOnBlock`
* `TaskCompleted`: when it fires because a task is marked completed during a turn, the reason is returned to Claude as a tool error and the turn continues, regardless of `continueOnBlock`. When it fires because a teammate stops, it behaves like `TeammateIdle` and halts the teammate by default
* `TeammateIdle`: by default the teammate stops and the reason appears as a warning line. Set `continueOnBlock: true` to feed the reason back to the teammate and keep it working instead
* `PermissionRequest`: `ok: false` has no effect. To deny an approval from a hook, use a [command hook](#command-hook-fields) returning `hookSpecificOutput.decision.behavior: "deny"`
* `PermissionDenied`: `ok: false` has no effect because the denial already happened. The only output this event reads is `hookSpecificOutput.retry`, which prompt and agent hooks can't set. They run on this event, but their output is discarded. Use a [command hook](#command-hook-fields) to return `retry`

If you need finer control on any event, use a [command hook](#command-hook-fields) with the per-event fields described in [Decision control](#decision-control).
