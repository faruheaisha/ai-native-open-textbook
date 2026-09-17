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
pageSha256: "92c082104f7aa6f829c3d4d36ce21019311e98256d03f331ba46bffff7231c35"
contentMode: "local-full"
zh: ""
---

## Organization default model

Organization admins on Claude Enterprise plans can set a default model for Claude Code members from the claude.ai admin console, for the whole organization or per custom role. When one is set, the Default option resolves to that model. Requires Claude Code v2.1.196 or later.

The Default row in the `/model` picker shows the organization default's name with the label Org default. The label reads Org default whether the admin set the default for the whole organization or for your role. A role default covers members of that custom role and takes precedence over the organization-wide default; when several of your roles set different defaults, the most capable model applies.

The organization default is a starting point, not a restriction. These selections take precedence over it:

* the `--model` flag and the `ANTHROPIC_MODEL` environment variable
* a `model` value in [managed settings](https://code.claude.com/docs/en/managed-settings) or supplied through `--settings`
* a `model` value in your user, project, or local settings, including a model you save with `/model`

Admins can also configure the organization default to override user selection. With override on, it takes precedence over the `model` value in user, project, and local settings, so a model you save with `/model` applies for the current session and the organization default returns on the next launch. When your selection differs, `/model` shows `Your organization's default (<model>) applies on restart`. The `--model` flag, `ANTHROPIC_MODEL`, managed settings, and `--settings` still take precedence even with override on. Override is available to a limited set of organizations; ask your Anthropic account team about availability.

To limit which models members can select, use [organization model restrictions](#organization-model-restrictions) or [`availableModels`](#restrict-model-selection) instead.

Claude Code reads the organization default once at startup, so a default the admin changes mid-session takes effect on the next launch.

When the organization default doesn't override user selection, the first interactive launch after the admin changes it clears the `model` key from your user settings once, so the new default applies. It changes nothing else in the file, and a model you save with `/model` after that launch is kept.

The organization default passes through these restriction checks before it is adopted:

* [`availableModels`](#restrict-model-selection) on its own doesn't apply to the organization default, so an organization default outside the allowlist still applies. When [`enforceAvailableModels`](#enforce-the-allowlist-for-the-default-model) is also set, an organization default outside the allowlist is remapped to the first allowlist entry, like any other Default
* an organization default that [organization model restrictions](#organization-model-restrictions) deny for your account is replaced by the newest allowed model in its family, or a lower-cost family when every version of it is restricted
* an organization default that isn't available to your account at all is skipped, and the Default option resolves as it would [without an organization default](#default-model-setting)

As of v2.1.199, when the organization default is a different model family from your account type's usual default, the `/model` picker keeps a separate row for that usual family, so you can still switch to it for a session. In v2.1.196 through v2.1.198 that row is missing from the picker.

The organization default reaches only sessions authenticated with the Anthropic API. To set a default anywhere else, including [LLM gateway](https://code.claude.com/docs/en/llm-gateway) deployments, use the `model` key in [managed settings](https://code.claude.com/docs/en/managed-settings) instead.
