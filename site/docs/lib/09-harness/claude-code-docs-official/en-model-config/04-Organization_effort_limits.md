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
pageSha256: "5dd60f696d2982c2e366989b66525b8121d60a6dbad67df5d20a15ce29713e70"
contentMode: "local-full"
zh: ""
---

## Organization effort limits

Your organization can cap the [effort level](#adjust-effort-level) in two ways. On a Claude Enterprise plan, organization admins set per-role effort limits, described below. On any plan and any provider, including Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry, the [`maxEffortLevel`](https://code.claude.com/docs/en/settings-reference#maxeffortlevel) managed setting caps effort on the client instead. When both apply to a model, the lower cap applies.

Organization admins on Claude Enterprise plans can set a maximum [effort level](#adjust-effort-level) per model for each custom role, alongside role-level [organization model restrictions](#organization-model-restrictions). Levels above the cap aren't offered in the `/effort` picker, and naming a higher level with `--effort` or `/effort` runs at the cap instead. In interactive sessions and plain-text `--print` runs, a warning names the requested and applied levels; with `json` or `stream-json` output or in background agents, the clamp applies silently. Caps are per model, so switching models can change which levels are available. When several of your roles grant the same model, the least restrictive cap applies. Requires Claude Code v2.1.195 or later.

Effort limits are delivered together with [organization model restrictions](#organization-model-restrictions) and reach the same sessions.
