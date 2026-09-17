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
pageSha256: "079c5eadc35708d63f0daef77fd116a9d9c4043bc7af6b8a9e5c763ddca0ae9a"
contentMode: "local-full"
zh: ""
---

### Agent hook configuration

Set `type` to `"agent"` and provide a `prompt` string, using `$ARGUMENTS` as a placeholder for the hook input JSON. The configuration fields are the same as [prompt hooks](#prompt-hook-configuration), except that agent hooks have a longer default timeout of 60 seconds and no `continueOnBlock` field.

The response schema is `\{ "ok": true \}` to allow or `\{ "ok": false, "reason": "..." \}` to block. On `ok: false`, Claude Code handles an agent hook the way it handles a [prompt hook with `continueOnBlock: true`](#response-schema) on the same event; agent hooks have no `continueOnBlock` field, and don't support the prompt-hook `impossible` field.

This `Stop` hook verifies that all unit tests pass before allowing Claude to finish:

```json theme={null}
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "agent",
            "prompt": "Verify that all unit tests pass. Run the test suite and check the results. $ARGUMENTS",
            "timeout": 120
          }
        ]
      }
    ]
  }
}
```

## Run hooks in the background

By default, hooks block Claude's execution until they complete. For long-running tasks like deployments, test suites, or external API calls, set `"async": true` to run the hook in the background while Claude continues working. Async hooks can't block or control Claude's behavior: response fields like `decision`, `permissionDecision`, and `continue` have no effect, because the action they would have controlled has already completed.
