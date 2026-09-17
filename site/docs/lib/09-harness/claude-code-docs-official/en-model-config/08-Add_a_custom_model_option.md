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
sourceRel: "en/model-config.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/model-config.md"
sourceSha256: "a8b6116a31f02c7ae380d0a2e8d33a5293115aefe25fb82599fd77af15b7432f"
pageSha256: "cf5fc0f020075d1b0017034f1d4fcb8ab4fcb79473029389de9408585811407f"
contentMode: "local-full"
zh: ""
---

## Add a custom model option

Use `ANTHROPIC_CUSTOM_MODEL_OPTION` to add a single custom entry to the `/model` picker without replacing the built-in aliases. This is useful for testing model IDs that Claude Code does not list by default. For LLM gateway deployments, Claude Code can populate the picker from the gateway's `/v1/models` endpoint when `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1` is set, so this variable is needed only when discovery is disabled or does not return the model you want. See [gateway model discovery](https://code.claude.com/docs/en/llm-gateway-protocol#model-discovery).

To list several models instead, in your own order and under labels you choose, set [`modelPicker`](https://code.claude.com/docs/en/settings-reference#modelpicker). Its entry says which rows the picker keeps when that lineup replaces the built-in one.

This example sets all three variables to make a gateway-routed Opus deployment selectable. Claude Code reads environment variables at startup, so run the exports before launching `claude`, or restart an existing session to pick them up:

```bash theme={null}
export ANTHROPIC_CUSTOM_MODEL_OPTION="my-gateway/claude-opus-5"
export ANTHROPIC_CUSTOM_MODEL_OPTION_NAME="Opus via Gateway"
export ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION="Custom deployment routed through the internal LLM gateway"
```

`ANTHROPIC_CUSTOM_MODEL_OPTION_NAME` and `ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION` are optional:

* If you omit the name, the entry shows the model's name when Claude Code [recognizes the ID](#customize-pinned-model-display-and-capabilities), and the model ID otherwise.
