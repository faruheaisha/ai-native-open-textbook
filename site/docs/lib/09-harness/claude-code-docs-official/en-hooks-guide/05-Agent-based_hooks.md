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
pageSha256: "6c3a43f139ba4832421a6c0715656d079fe5c29051047ea6873bf44571a79f91"
contentMode: "local-full"
zh: ""
---

## Agent-based hooks

  Agent hooks are experimental. Behavior and configuration may change in future releases. For production workflows, prefer [command hooks](https://code.claude.com/docs/en/hooks#command-hook-fields).

When verification requires inspecting files or running commands, use `type: "agent"` hooks. Unlike prompt hooks, which make a single LLM call, agent hooks spawn a subagent that can read files, search code, and use other tools to verify conditions before returning a decision.

Agent hooks use the `"ok"` / `"reason"` response format with a longer default timeout of 60 seconds and up to 50 tool-use turns. They don't support the prompt-hook `impossible` field. On `ok: false`, Claude Code handles an agent hook the way it handles a prompt hook with `continueOnBlock: true` on the same event, so on `PreToolUse` and `PostToolUse` the turn continues; agent hooks have no `continueOnBlock` field. See [agent hook configuration](https://code.claude.com/docs/en/hooks#agent-hook-configuration) for the fields, including the `$ARGUMENTS` placeholder that Claude Code replaces with the hook's JSON input.

This example verifies that tests pass before allowing Claude to stop:

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

Use prompt hooks when the hook input data alone is enough to make a decision. Use agent hooks when you need to verify something against the actual state of the codebase.

For full configuration options, see [Agent-based hooks](https://code.claude.com/docs/en/hooks#agent-based-hooks) in the reference.
