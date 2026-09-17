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
pageSha256: "65226ac28e769ed5121a52bdf843a07d6eb29ff8e851a92363e7d18b82259f9f"
contentMode: "local-full"
zh: ""
---

### PostModelSwitch

Runs after the session's model changes. Use it to give Claude model-specific guidance without editing every CLAUDE.md, for example an organization-wide instruction that applies on certain models.

PostModelSwitch requires Claude Code v2.1.251 or later. It can't block, because the model has already changed. Claude Code runs PostModelSwitch hooks after any of these changes:

* A switch you or a client requested
* An [automatic model fallback](https://code.claude.com/docs/en/model-config#automatic-model-fallback), which changes the session's model
* A setting such as [`opusplan`](https://code.claude.com/docs/en/model-config#opusplan-model-setting) entering or leaving plan mode
* Claude Code restoring the model when you resume a session

Claude Code doesn't run PostModelSwitch hooks when a model from a [fallback model chain](https://code.claude.com/docs/en/model-config#fallback-model-chains) serves a turn, because that substitution lasts one turn and leaves the session's model unchanged.

The matcher follows the same rules as [PreModelSwitch](#premodelswitch): Claude Code compares it against the canonical name of the model the session switched to.

This example adds guidance whenever the session's model changes to any Opus model:

```json theme={null}
{
  "hooks": {
    "PostModelSwitch": [
      {
        "matcher": ".*opus.*",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'On Opus, delegate implementation work to subagents and keep this conversation for planning and review.'"
          }
        ]
      }
    ]
  }
}
```

To confirm the hook works, switch to an Opus model from a session running a different model, for example run `/model opus` from a Sonnet session, then ask Claude what guidance it has about the current model.

#### PostModelSwitch input

PostModelSwitch hooks receive the same fields as [PreModelSwitch](#premodelswitch-input), with `hook_event_name` set to `"PostModelSwitch"` and two more `source` values: `"auto"` for an automatic fallback or other change Claude Code made on its own, and `"resume"` for the model restored when you resume a session.

`requested_model` is `null` when `source` is `"auto"`. When `source` is `"resume"`, it is the saved model setting Claude Code restored.

#### PostModelSwitch decision control

Claude Code takes your hook's [plain-text stdout](#exit-code-0) on exit 0, or `additionalContext` from JSON output, and delivers it to Claude with the next request after the switch. In addition to the [JSON output fields](#json-output) available to all hooks, you can return:

| Field               | Description                                                                                                   |
| :------------------ | :------------------------------------------------------------------------------------------------------------ |
| `additionalContext` | String added to Claude's context with the next request. See [Add context for Claude](#add-context-for-claude) |

If the hook hasn't finished within five seconds after you send the next prompt, Claude Code sends that request without the output and attaches it to the following request instead. If the model changes several times before the next request, Claude Code delivers only the output for the last switch's target model.
