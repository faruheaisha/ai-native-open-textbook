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
pageSha256: "eb64c78c9126d7dc222dfcfa23048bdb8f9a103ac97dd53ff1526301d38fed21"
contentMode: "local-full"
zh: ""
---

## Environment variables

Use the following environment variables to control the model names that the aliases map to. Each value must be a full model name, or the equivalent identifier for your API provider. To choose the model your sessions start on, set [`ANTHROPIC_DEFAULT_MODEL`](#set-a-default-model-for-new-sessions), which this table omits.

| Environment variable             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ANTHROPIC_DEFAULT_FABLE_MODEL`  | The model to use for `fable`, and the model ID Claude Code recognizes as a Fable model for [automatic model fallback](#automatic-model-fallback) on third-party providers                                                                                                                                                                                                                                                                                                             |
| `ANTHROPIC_DEFAULT_OPUS_MODEL`   | The model to use for `opus`, or for `opusplan` when Plan Mode is active.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | The model to use for `sonnet`, or for `opusplan` when Plan Mode is not active.                                                                                                                                                                                                                                                                                                                                                                                                        |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL`  | The model to use for `haiku`, or [background functionality](https://code.claude.com/docs/en/costs#background-token-usage)                                                                                                                                                                                                                                                                                                                                                                                         |
| `CLAUDE_CODE_SUBAGENT_MODEL`     | The default model for [subagents](https://code.claude.com/docs/en/sub-agents#choose-a-model), [agent team](https://code.claude.com/docs/en/agent-teams#specify-teammates-and-models) teammates, and [workflow](https://code.claude.com/docs/en/workflows) agents that aren't assigned a model another way. Accepts an alias such as `haiku` or a full model name. A per-invocation model or a definition's `model` field, including `inherit`, takes precedence. To change that, set [`CLAUDE_CODE_SUBAGENT_MODEL_FORCE`](https://code.claude.com/docs/en/sub-agents#run-every-subagent-on-one-model) |

Note: `ANTHROPIC_SMALL_FAST_MODEL` is deprecated in favor of
`ANTHROPIC_DEFAULT_HAIKU_MODEL`.

### Pin models for third-party deployments

When deploying Claude Code through [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock), [Google Cloud's Agent Platform](https://code.claude.com/docs/en/google-vertex-ai), [Microsoft Foundry](https://code.claude.com/docs/en/microsoft-foundry), or [Claude Platform on AWS](https://code.claude.com/docs/en/claude-platform-on-aws), pin model versions before rolling out to users.

Without pinning, Claude Code uses model aliases such as `fable`, `opus`, `sonnet`, and `haiku` that resolve to a built-in default model ID for each provider. That default can lag the newest Anthropic release, and the model it points to may not yet be enabled in a user's account. When the default is unavailable, Amazon Bedrock and Google Cloud's Agent Platform users see a notice and the session falls back to an earlier version of the default model, or to the default Sonnet model when the default is an Opus model and no Opus version is available. Microsoft Foundry users see errors instead, because Microsoft Foundry has no equivalent startup check.

On Amazon Bedrock and Google Cloud's Agent Platform, a user who starts the session on a specific Sonnet or Opus version, for example with `--model`, `ANTHROPIC_MODEL`, or the `model` setting, pins that version as the session's default for the matching alias: the startup check skips the built-in default it replaces and shows no fallback notice. Before v2.1.211, the check ran and could show a notice even when a session model was explicitly configured.

  Set the model environment variables to specific version IDs as part of your initial setup. Pinning lets you control when your users move to a new model.

Use the following environment variables with version-specific model IDs for your provider:

| Provider                      | Example                                                              |
| :---------------------------- | :------------------------------------------------------------------- |
| Amazon Bedrock                | `export ANTHROPIC_DEFAULT_OPUS_MODEL='us.anthropic.claude-opus-4-8'` |
| Google Cloud's Agent Platform | `export ANTHROPIC_DEFAULT_OPUS_MODEL='claude-opus-4-8'`              |
| Microsoft Foundry             | `export ANTHROPIC_DEFAULT_OPUS_MODEL='claude-opus-4-8'`              |

Apply the same pattern for `ANTHROPIC_DEFAULT_FABLE_MODEL`, `ANTHROPIC_DEFAULT_SONNET_MODEL`, and `ANTHROPIC_DEFAULT_HAIKU_MODEL`. For current and legacy model IDs across all providers, see [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview). To upgrade users to a new model version, update these environment variables and redeploy.

To enable [extended context](#extended-context) for a pinned model, append `[1m]` to the model ID in `ANTHROPIC_DEFAULT_OPUS_MODEL`, `ANTHROPIC_DEFAULT_SONNET_MODEL`, or `ANTHROPIC_DEFAULT_FABLE_MODEL`:

```bash theme={null}
export ANTHROPIC_DEFAULT_OPUS_MODEL='claude-opus-4-8[1m]'
```

With the `[1m]` suffix, the 1M context window applies to all usage of the pinned alias, including the plan-mode Opus phase of [`opusplan`](#opusplan-model-setting) and [subagents](https://code.claude.com/docs/en/sub-agents#choose-a-model) whose `model` frontmatter names the alias.

* Claude Code strips the suffix before sending the model ID to your provider.
* Only append `[1m]` when the underlying model [supports 1M context](https://platform.claude.com/docs/en/build-with-claude/context-windows#context-window-sizes-by-model).
* The suffix is read per variable, not per model. On Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry, a model ID without `[1m]` in one variable uses 200K context even if another variable sets the same model with the suffix. Sonnet 5 always runs with the 1M window on these providers and never needs the suffix.

  An `availableModels` allowlist delivered through [MDM or a managed settings file](https://code.claude.com/docs/en/managed-settings#delivery-mechanisms) still applies when using third-party providers; [server-managed settings are not delivered there](https://code.claude.com/docs/en/server-managed-settings#platform-availability).

  Filtering matches on a model alias such as `opus`, a version prefix such as `claude-opus-4-8`, or the full provider-form model ID. Provider-specific prefixes such as `us.anthropic.` are not stripped, so to allow a specific model, list its full provider-form ID, or map it through [`modelOverrides`](#override-model-ids-per-version). For a pinned model, that ID is the value you set in its `ANTHROPIC_DEFAULT_*_MODEL` variable. Any `[1m]` suffix is stripped from both the allowlist entry and the requested model before matching.

### Customize pinned model display and capabilities

When you pin a model on a third-party provider, its row in the `/model` picker shows the model's name by default if Claude Code recognizes the pinned ID, and the raw ID otherwise:

* **Recognized**: the exact ID of a model Claude Code knows, such as its Anthropic API ID or your provider's or gateway's form of it, with or without the `[1m]` suffix. Pin `us.anthropic.claude-sonnet-4-5-20250929-v1:0` and the row reads `Sonnet 4.5`.
* **Not recognized**: any other ID, such as an application inference profile ARN or a model version Claude Code doesn't know, unless a [`modelOverrides`](#override-model-ids-per-version) entry maps a model to that exact string. On Microsoft Foundry, deployment names are user-defined, so Claude Code never recognizes a pinned ID there, mapped or not, and the row shows the deployment name by default.

When a row shows the model's name, its default description includes the pinned ID so you can still see which ID is pinned.

Claude Code may also not recognize which features a pinned model supports. You can set the display name and description yourself and declare capabilities with companion environment variables for each pinned model.

These variables take effect on third-party providers such as Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry. The `_NAME` and `_DESCRIPTION` variables also take effect when `ANTHROPIC_BASE_URL` points to an [LLM gateway](https://code.claude.com/docs/en/llm-gateway). They have no effect when connecting directly to `api.anthropic.com`.

| Environment variable                                  | Description                                                                                                                                                                      |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ANTHROPIC_DEFAULT_OPUS_MODEL_NAME`                   | Display name for the pinned Opus model in the `/model` picker. When not set, the row shows the model's name if Claude Code recognizes the pinned ID, and the pinned ID otherwise |
| `ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION`            | Display description for the pinned Opus model in the `/model` picker. When not set, the row shows a default description that begins `Custom Opus model`                          |
| `ANTHROPIC_DEFAULT_OPUS_MODEL_SUPPORTED_CAPABILITIES` | Comma-separated list of capabilities the pinned Opus model supports                                                                                                              |

The same `_NAME`, `_DESCRIPTION`, and `_SUPPORTED_CAPABILITIES` suffixes are available for `ANTHROPIC_DEFAULT_SONNET_MODEL`, `ANTHROPIC_DEFAULT_HAIKU_MODEL`, `ANTHROPIC_DEFAULT_FABLE_MODEL`, and `ANTHROPIC_CUSTOM_MODEL_OPTION`.

Claude Code enables features like [effort levels](#adjust-effort-level) and [extended thinking](#extended-thinking) by matching the model ID against known patterns. Provider-specific IDs such as Amazon Bedrock ARNs or custom deployment names often don't match these patterns, leaving supported features disabled. Set `_SUPPORTED_CAPABILITIES` to tell Claude Code which features the model actually supports:

| Capability value       | Enables                                                                         |
| ---------------------- | ------------------------------------------------------------------------------- |
| `effort`               | [Effort levels](#adjust-effort-level) and the `/effort` command                 |
| `xhigh_effort`         | The `xhigh` effort level                                                        |
| `max_effort`           | The `max` effort level                                                          |
| `thinking`             | [Extended thinking](#extended-thinking)                                         |
| `adaptive_thinking`    | Adaptive reasoning that dynamically allocates thinking based on task complexity |
| `interleaved_thinking` | Thinking between tool calls                                                     |

When `_SUPPORTED_CAPABILITIES` is set, Claude Code enables the listed capabilities and disables the unlisted ones for the matching pinned model. When the variable is unset, Claude Code falls back to built-in detection based on the model ID.

This example pins Opus to an Amazon Bedrock custom model ARN, sets a friendly name, and declares its capabilities:

```bash theme={null}
export ANTHROPIC_DEFAULT_OPUS_MODEL='arn:aws:bedrock:us-east-1:123456789012:custom-model/abc'
export ANTHROPIC_DEFAULT_OPUS_MODEL_NAME='Opus via Bedrock'
export ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION='Opus 4.7 routed through a Bedrock custom endpoint'
export ANTHROPIC_DEFAULT_OPUS_MODEL_SUPPORTED_CAPABILITIES='effort,xhigh_effort,max_effort,thinking,adaptive_thinking,interleaved_thinking'
```

### Override model IDs per version

On platforms that embed Claude Code and set [`CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST`](https://code.claude.com/docs/en/env-vars), the host's model configuration takes precedence over managed model settings, while a managed `availableModels` allowlist stays in force unless the host supplies its own; [Exceptions to managed settings precedence](https://code.claude.com/docs/en/settings#exceptions-to-managed-settings-precedence) says which keys and variables the host overrides.

The family-level environment variables above configure one model ID per family alias. If you need to map several versions within the same family to distinct provider IDs, use the `modelOverrides` setting instead.

`modelOverrides` maps individual Anthropic model IDs to the provider-specific strings that Claude Code sends to your provider's API. When a user selects a mapped model in the `/model` picker, Claude Code uses your configured value instead of the built-in default.

This lets enterprise administrators route each model version to a specific Amazon Bedrock inference profile ARN, Google Cloud's Agent Platform version name, or Microsoft Foundry deployment name for governance, cost allocation, or regional routing.

Set `modelOverrides` in your [settings file](https://code.claude.com/docs/en/settings#where-settings-live):

```json theme={null}
{
  "modelOverrides": {
    "claude-opus-4-7": "arn:aws:bedrock:us-east-2:123456789012:application-inference-profile/opus-prod",
    "claude-opus-4-6": "arn:aws:bedrock:us-east-2:123456789012:application-inference-profile/opus-46-prod",
    "claude-sonnet-4-6": "arn:aws:bedrock:us-east-2:123456789012:application-inference-profile/sonnet-prod"
  }
}
```

Keys must be Anthropic model IDs as listed in the [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview). For dated model IDs, include the date suffix exactly as it appears there. Unknown keys are ignored.

To stop the `[claude-code:unrecognized_model]` [diagnostic line](https://code.claude.com/docs/en/errors#unrecognized-model-id-on-a-request) for an ID such as a gateway alias, add an entry with that ID as its value.

Overrides replace the built-in model IDs that back each entry in the `/model` picker. On Amazon Bedrock, `modelOverrides` entries take precedence over any inference profiles that Claude Code discovers automatically at startup. Claude Code passes values that are already provider-native, such as Amazon Bedrock inference profile ARNs or Microsoft Foundry deployment names, to the provider as-is.

Overrides also apply when you pass an Anthropic model ID directly through `--model`, the `ANTHROPIC_MODEL` environment variable, or an `ANTHROPIC_DEFAULT_*_MODEL` environment variable. On Amazon Bedrock, Google Cloud's Agent Platform, and [Mantle](https://code.claude.com/docs/en/amazon-bedrock#use-the-mantle-endpoint), an Anthropic model ID with no `modelOverrides` entry resolves to the same provider-specific ID as the `/model` picker row for that version, when the provider supports that version. Mantle supports a subset of versions. For an Anthropic model ID outside that subset, Claude Code sends the raw ID to Mantle without mapping it, unless a `modelOverrides` entry covers it. Before v2.1.200, `--model` and the environment-variable values reached the provider as-is without going through the override map.

`modelOverrides` works alongside `availableModels`. The allowlist is evaluated against the Anthropic model ID, not the override value, so an entry like `"opus"` in `availableModels` continues to match even when Opus versions are mapped to ARNs. When `enforceAvailableModels` is set in managed settings, the enforced Default resolves through `modelOverrides` from [managed settings](https://code.claude.com/docs/en/managed-settings#how-claude-code-combines-managed-sources) only. An admin's mapping, such as a version pinned to an inference profile ARN, is honored in the enforced Default. Overrides from user or project settings do not affect it.

When `availableModels` is set in [managed settings](https://code.claude.com/docs/en/managed-settings), only `modelOverrides` from managed settings apply to an Anthropic model ID passed directly through `--model` or the environment variables above. Claude Code ignores overrides in user or project settings for those IDs, and never resolves an ID the managed list excludes through `modelOverrides` from any settings source. This managed-source restriction requires Claude Code v2.1.200 or later. See [Restrict model selection](#restrict-model-selection) for how blocked IDs are handled.

### Prompt caching configuration

Claude Code automatically uses [prompt caching](https://code.claude.com/docs/en/prompt-caching) to optimize performance and reduce costs. You can disable prompt caching globally or for specific model tiers:

| Environment variable            | Description                                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------------------- |
| `DISABLE_PROMPT_CACHING`        | Set to `1` to disable prompt caching for all models. Takes precedence over the per-model settings |
| `DISABLE_PROMPT_CACHING_HAIKU`  | Set to `1` to disable prompt caching for Haiku models only                                        |
| `DISABLE_PROMPT_CACHING_SONNET` | Set to `1` to disable prompt caching for Sonnet models only                                       |
| `DISABLE_PROMPT_CACHING_OPUS`   | Set to `1` to disable prompt caching for Opus models only                                         |
| `DISABLE_PROMPT_CACHING_FABLE`  | Set to `1` to disable prompt caching for Fable models only                                        |

To choose the cache TTL for the main conversation and for subagents separately, see [choose the TTL yourself](https://code.claude.com/docs/en/prompt-caching#choose-the-ttl-yourself). For what triggers a cache miss, see [How Claude Code uses prompt caching](https://code.claude.com/docs/en/prompt-caching).
