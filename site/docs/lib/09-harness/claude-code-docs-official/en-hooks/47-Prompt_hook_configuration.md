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
pageSha256: "9928306d8e2d81acb1e8111d65543ff2c889bf56e0a67762819b6122f24f7b03"
contentMode: "local-full"
zh: ""
---

### Prompt hook configuration

Set `type` to `"prompt"` and provide a `prompt` string instead of a `command`. Use the `$ARGUMENTS` placeholder to inject the hook's JSON input data into your prompt text.

This `Stop` hook asks the LLM to evaluate whether all tasks are complete before allowing Claude to finish:

```json theme={null}
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Evaluate if Claude should stop: $ARGUMENTS. Check if all tasks are complete."
          }
        ]
      }
    ]
  }
}
```

| Field             | Required | Description                                                                                                                                                                                               |
| :---------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`            | yes      | Must be `"prompt"`                                                                                                                                                                                        |
| `prompt`          | yes      | The prompt text to send to the LLM. Use `$ARGUMENTS` as a placeholder for the hook input JSON. If `$ARGUMENTS` is not present, input JSON is appended to the prompt                                       |
| `model`           | no       | Model to use for evaluation. Defaults to a fast model                                                                                                                                                     |
| `timeout`         | no       | Timeout in seconds. Default: 30                                                                                                                                                                           |
| `continueOnBlock` | no       | On the events it applies to, `true` feeds an `ok: false` reason back to Claude and continues instead of ending the turn. Default: `false`. See [Response schema](#response-schema) for per-event behavior |
