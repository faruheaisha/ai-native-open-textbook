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
sourceRel: "en/hooks-guide.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/hooks-guide.md"
sourceSha256: "b5632cf6b8c78f04797a91ed590ed7718f6af17cc923a856cbad3b3a2f7138a8"
pageSha256: "9f9d399a9874412a5cc9b3239acafda83adfcd2b7aa77f694abc0f475c1a6acd"
contentMode: "local-full"
zh: ""
---

## Prompt-based hooks

For decisions that require judgment rather than deterministic rules, use `type: "prompt"` hooks. Instead of running a shell command, Claude Code sends your prompt and the hook's input data to a Claude model, Haiku by default, to make the decision. You can specify a different model with the `model` field if you need more capability.

The model's only job is to return its decision as JSON:

* `"ok": true`: the action proceeds
* `"ok": false`: what happens depends on the event:
  * `Stop` and `SubagentStop`: the `reason` is fed back to Claude so it keeps working, unless the response also sets `"impossible": true` to mark the condition as one that can never be satisfied, in which case Claude Code allows the stop and the turn ends
  * `PreToolUse`: the tool call is denied; by default the turn ends and the deny `reason` appears in the chat as a warning line. Set `continueOnBlock: true` on the hook to instead return the `reason` to Claude as the tool error, so it can adjust and continue. Before v2.1.210, the deny `reason` was returned to Claude as the tool error and the turn continued
  * `PostToolUse`: by default the turn ends and the `reason` appears in the chat as a warning line. Set `continueOnBlock: true` to feed the `reason` back to Claude and continue the turn instead
  * `PostToolBatch`, `UserPromptSubmit`, and `UserPromptExpansion`: the turn ends and the `reason` appears in the chat as a warning line

This example uses a `Stop` hook to ask the model whether all requested tasks are complete. If the model returns `"ok": false` because the condition isn't met yet, Claude keeps working and uses the `reason` as its next instruction:

```json theme={null}
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Check if all tasks are complete. If not, respond with {\"ok\": false, \"reason\": \"what remains to be done\"}."
          }
        ]
      }
    ]
  }
}
```

For full configuration options, see [Prompt-based hooks](https://code.claude.com/docs/en/hooks#prompt-based-hooks) in the reference.
