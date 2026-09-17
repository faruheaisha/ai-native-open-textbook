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
pageSha256: "5e6fbc74553796318f164fd1eac90e7a519dfe8d70a04529466cde2047614f87"
contentMode: "local-full"
zh: ""
---

## Restrict model selection

Enterprise administrators can use `availableModels` in [managed or policy settings](https://code.claude.com/docs/en/managed-settings) to restrict which models users can select. Entries match a model family such as `sonnet`, a version prefix such as `claude-sonnet-4-5`, or a full model ID such as `claude-sonnet-4-5-20250929`. A version prefix also matches later model IDs that extend it with another segment, so `claude-fable-5` permits both Fable 5 and Fable 5.1, while `claude-fable-5-1` permits Fable 5.1 only.

On platforms that embed Claude Code and set [`CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST`](https://code.claude.com/docs/en/env-vars), the host's model configuration takes precedence over managed model settings, while a managed `availableModels` allowlist stays in force unless the host supplies its own; [Exceptions to managed settings precedence](https://code.claude.com/docs/en/settings#exceptions-to-managed-settings-precedence) says which keys and variables the host overrides.

When `availableModels` is set, the allowlist applies everywhere a user can specify a model:

* **Main session model**: `/model`, the `--model` flag, the `ANTHROPIC_MODEL` environment variable, the `model` setting, [`ANTHROPIC_DEFAULT_MODEL`](#set-a-default-model-for-new-sessions), and the model restored when [resuming a session](#setting-your-model)
* **Alias resolution**: the `ANTHROPIC_DEFAULT_OPUS_MODEL`, `ANTHROPIC_DEFAULT_SONNET_MODEL`, `ANTHROPIC_DEFAULT_HAIKU_MODEL`, and `ANTHROPIC_DEFAULT_FABLE_MODEL` environment variables cannot redirect an allowed alias to a model outside the list
* **Fast mode**: `/fast` refuses to toggle when it would implicitly switch to an Opus model outside the list, with the message "is not in your organization's allowed models"
* **Subagent and teammate models**: the `model` field in [subagent](https://code.claude.com/docs/en/sub-agents#choose-a-model) frontmatter, the Agent tool's `model` parameter, [agent team](https://code.claude.com/docs/en/agent-teams#specify-teammates-and-models) teammate models, `CLAUDE_CODE_SUBAGENT_MODEL`, and, on v2.1.197 and earlier, the model picker in the `/agents` wizard&#x20;
* **Skill and command models**: the `model` frontmatter in [skills and commands](https://code.claude.com/docs/en/skills)
* **Advisor model**: the configured [`advisorModel`](https://code.claude.com/docs/en/advisor) setting and the `--advisor` flag
* **Background agent model**: the model selected in the [dispatch picker](https://code.claude.com/docs/en/agent-view)

On the Anthropic API and [Claude Platform on AWS](https://code.claude.com/docs/en/claude-platform-on-aws), a model family alias, `opus`, `sonnet`, `haiku`, or `fable`, resolves to its usual model when the allowlist permits that model. When the allowlist blocks that model, Claude Code substitutes the newest version of the family that the allowlist permits and shows a notice naming both the requested and substituted models. With `["sonnet", "claude-opus-4-6"]`, for example, both `/model opus` and `--model opus` select Claude Opus 4.6, the newest permitted Opus. Before v2.1.205, an alias whose newest released version was outside the list was rejected or replaced like any other blocked selection, even when the list permitted an older version.

The substitution needs a permitted version to land on: when the allowlist permits no version of the alias's family, the alias follows the rejection and replacement behavior below like any other blocked value.

Claude Code handles any other blocked selection according to where the model was set:

* **`/model`**: Claude Code rejects the switch with an error
* **`--model` flag, `ANTHROPIC_MODEL`, or the `model` setting**: Claude Code replaces the value at startup with a warning naming both the requested and substituted models, and the session starts on the default model
* **[`ANTHROPIC_DEFAULT_MODEL`](#set-a-default-model-for-new-sessions)**: Claude Code ignores the variable
* **Subagent or teammate override**: Claude Code runs the subagent or teammate on a fallback model rather than failing the request. See [Choose a model](https://code.claude.com/docs/en/sub-agents#choose-a-model) for the subagent fallback and [Specify teammates and models](https://code.claude.com/docs/en/agent-teams#specify-teammates-and-models) for the teammate fallback.

  In interactive sessions, Claude Code warns you when it substitutes a subagent's model, by this fallback or by the newest-permitted-version substitution above, naming the requested and substituted models; it doesn't report a teammate's fallback.

  Where the newest-permitted-version substitution above operates, a blocked family alias follows it instead. Before v2.1.222, an alias fell back like any other blocked value on every provider
* **Skill or command override**: Claude Code ignores the override, including a blocked family alias, and the skill or command runs on the session model. A skill or command that [runs in a subagent](https://code.claude.com/docs/en/skills#run-skills-in-a-subagent) follows the subagent behavior above instead
* **`advisorModel` setting**: the advisor is disabled for the session
* **`--advisor` flag**: Claude Code exits with an error at launch. In a [background session](https://code.claude.com/docs/en/agent-view), it starts the session without the advisor instead of exiting

Claude Code hides excluded models from the `/model` picker. A full model ID in the list that has no built-in picker row, such as an older version that the list pins, appears in the `/model` picker as its own labeled row, unless Claude Code replaces the built-in options with a [`modelPicker`](https://code.claude.com/docs/en/settings-reference#modelpicker) lineup. Before v2.1.199, such an ID was selectable only by typing `/model <id>`.

Model changes that Claude Code makes on your behalf are checked the same way:

* **[Fallback model chains](#fallback-model-chains)**: entries outside the allowlist are dropped
* **Plan-mode upgrades**: on the Anthropic API and Claude Platform on AWS, an upgrade such as [`opusplan`](#opusplan-model-setting) to an excluded model uses the newest permitted version of the upgrade family. On providers with provider-specific model IDs, and when no version is permitted, the upgrade is skipped and planning continues on the session's model
* **[Automatic model fallback](#automatic-model-fallback)**: a fallback whose target is excluded does not run, so the flagged request ends with a refusal instead
* **[Auto mode classifier](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode)**: the classifier's Claude Sonnet 5 default applies only when the allowlist permits Sonnet 5. When it's excluded, the classifier runs on the session's model, which the allowlist already governs, or on an Opus model when the session runs on a [Fable model](#work-with-fable). On providers other than the Anthropic API, that Opus fallback runs on the provider's default Opus model without consulting the allowlist. Requires Claude Code v2.1.210 or later
* **[Fast mode](https://code.claude.com/docs/en/fast-mode)**: enabling fast mode is refused when the model the session would run on afterward is outside the allowlist

```json theme={null}
{
  "availableModels": ["sonnet", "haiku"]
}
```

### Surface coverage

Every surface enforces the allowlist it receives. Which delivery mechanism reaches each surface differs:

| Delivery mechanism                                                            | CLI and IDE | Desktop local sessions | Web, mobile, and cloud sessions                                                                                                                                                                                                                           | Agent SDK and non-interactive | Cowork                  |
| :---------------------------------------------------------------------------- | :---------- | :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------- | :---------------------- |
| [Server-managed settings](https://code.claude.com/docs/en/server-managed-settings) from the admin console | Enforced    | Enforced               | Enforced                                                                                                                                                                                                                                                  | Enforced                      | Not delivered           |
| [MDM or managed settings files](https://code.claude.com/docs/en/managed-settings#delivery-mechanisms)     | Enforced    | Enforced               | Not delivered in Anthropic-hosted environments; in [self-hosted environments](https://code.claude.com/docs/en/self-hosted-environments), enforced from the runner image per [how Claude Code combines managed sources](https://code.claude.com/docs/en/managed-settings#how-claude-code-combines-managed-sources) | Enforced                      | Enforced where deployed |

* Cloud sessions, on [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) or in the Desktop app, run on Anthropic-managed VMs by default: settings deployed to your device do not reach them, so deliver the allowlist through server-managed settings. Sessions your organization routes to a [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments) run on your own compute and also read the managed settings file in the runner image. [How Claude Code combines managed sources](https://code.claude.com/docs/en/managed-settings#how-claude-code-combines-managed-sources) says when that file applies. A mid-session model switch in a cloud session is rejected when the requested model is excluded by the allowlist. Server-side rejection at session creation applies to [organization model restrictions](#organization-model-restrictions), not the `availableModels` settings key.
* Cowork, the agentic-work tab in the Claude Desktop app, runs its sessions on Claude Code but, by design, does not receive server-managed settings from the claude.ai admin console. A managed settings file applies to Cowork sessions when it is present where the session runs; remote Cowork sessions run on Anthropic-managed VMs, where a device-deployed file is not present.
* Sessions on [third-party providers](https://code.claude.com/docs/en/server-managed-settings#platform-availability) such as Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, and [Claude Platform on AWS](https://code.claude.com/docs/en/claude-platform-on-aws) do not receive server-managed settings, so deliver the allowlist through MDM or managed settings files there.
* Server-managed delivery also requires the session to authenticate with an [eligible login or key](https://code.claude.com/docs/en/server-managed-settings#platform-availability). Fleets that generate keys only through an [`apiKeyHelper`](https://code.claude.com/docs/en/settings-reference#apikeyhelper) script should deliver the allowlist through MDM or managed settings files.
* The Desktop Code tab also hosts [SSH sessions](https://code.claude.com/docs/en/desktop#ssh-sessions), which read the managed settings file from the remote host they run on. See [Desktop managed settings](https://code.claude.com/docs/en/desktop#managed-settings).
* The model pickers on claude.ai and in the Desktop app hide or grey out models excluded by your organization's allowlist. The picker state is a convenience for users; enforcement happens in the session.

### Default model behavior

On its own, `availableModels` leaves the Default option on the system's [runtime default](#default-model-setting) for the account until you also set [`enforceAvailableModels`](#enforce-the-allowlist-for-the-default-model). If that default is a model you intend to restrict, set `enforceAvailableModels` as well.

An empty `availableModels` array never engages the Default-model enforcement: with `availableModels: []`, named model selections are blocked but the Default model for the account type remains usable regardless of `enforceAvailableModels`.

### Enforce the allowlist for the Default model

Set `enforceAvailableModels: true` alongside a non-empty `availableModels` in managed settings to extend the allowlist to the Default option. This requires Claude Code v2.1.175 or later.

```json theme={null}
{
  "availableModels": ["sonnet", "haiku"],
  "enforceAvailableModels": true
}
```

The Default option resolves to the account-type default, or to the [organization default model](#organization-default-model) when an admin has set one. When that model is not in the allowlist, the Default option instead resolves to the first `availableModels` entry that names an allowed, available model, and the `/model` picker's Default row shows that model. This applies everywhere the default is reached: session startup, selecting Default in `/model`, the `"default"` keyword in [fallback model chains](#fallback-model-chains), and the fallback used when an excluded selection is dropped.

`enforceAvailableModels` remaps the Default option only when `availableModels` is non-empty. With `availableModels: []`, the Default model for the account type remains usable, so the setting cannot lock users out of every model. When `availableModels` is non-empty but no entry resolves to an allowed and available model, enforcement is skipped and Default resolves to the account-type default, with a warning visible only under `--debug`. Keep at least one guaranteed-available entry in the list to avoid this.

Deploy both keys together in the highest-ranked managed source you deliver. By default Claude Code reads only that source, so a pair placed in a managed settings file is ignored when the admin console delivers any settings; under the opt-in merge in [how Claude Code combines managed sources](https://code.claude.com/docs/en/managed-settings#how-claude-code-combines-managed-sources), Claude Code still ignores a `modelOverrides` map from a source ranked below the one that sets `availableModels`.

### Control the model users run on

The `model` setting is an initial selection, not enforcement. It sets which model is active when a session starts, but users can still open `/model` and pick Default, which resolves to the system's [runtime default](#default-model-setting) regardless of what `model` is set to, unless [`enforceAvailableModels`](#enforce-the-allowlist-for-the-default-model) redirects it.

To fully control the model experience, combine these settings:

* **`availableModels`**: restricts which named models users can switch to
* **`enforceAvailableModels`**: extends the `availableModels` allowlist to the Default option, so Default cannot resolve to a model outside the list
* **`model`**: sets the initial model selection when a session starts
* **`ANTHROPIC_DEFAULT_SONNET_MODEL`** / **`ANTHROPIC_DEFAULT_OPUS_MODEL`** / **`ANTHROPIC_DEFAULT_HAIKU_MODEL`** / **`ANTHROPIC_DEFAULT_FABLE_MODEL`**: control what the `sonnet`, `opus`, `haiku`, and `fable` aliases resolve to, and which version the [account-type default](#default-model-setting) uses

This example starts users on Sonnet 4.5, limits the picker to Sonnet and Haiku, and ensures Default resolves to a model on the allowlist rather than the tier default:

```json theme={null}
{
  "model": "claude-sonnet-4-5",
  "availableModels": ["claude-sonnet-4-5", "haiku"],
  "enforceAvailableModels": true,
  "env": {
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-4-5"
  }
}
```

Without `enforceAvailableModels` or the `env` block, a user who selects Default in the picker gets the [runtime default](#default-model-setting) rather than the version pinned in `model`. The two settings cover different scopes: `enforceAvailableModels` makes Default obey the allowlist, while the `env` block pins which version a permitted alias such as `sonnet` resolves to. Use `enforceAvailableModels` alone when restricting model families is enough; add the `env` block when you also need to pin a specific version.

### Merge behavior

When the managed settings Claude Code applies define `availableModels`, that list alone applies, apart from a [host platform that supplies its own](https://code.claude.com/docs/en/settings#exceptions-to-managed-settings-precedence): entries in user, project, or local settings cannot extend it, and Claude Code never merges `availableModels` across managed sources either; [how Claude Code combines managed sources](https://code.claude.com/docs/en/managed-settings#how-claude-code-combines-managed-sources) says which source's list applies. Otherwise, lists from user, project, and local settings are [concatenated and deduplicated](https://code.claude.com/docs/en/settings#settings-precedence) like other array settings. Before Claude Code v2.1.175, entries from lower-precedence scopes merged into the managed list instead of being replaced by it.

Within the effective list, an entry naming a specific model in a family, whether a version prefix or a full model ID, disables that family's wildcard entry: `["sonnet", "claude-sonnet-4-5"]` allows only Sonnet 4.5 versions, not every Sonnet model.

### Mantle model IDs

When the [Amazon Bedrock Mantle endpoint](https://code.claude.com/docs/en/amazon-bedrock#use-the-mantle-endpoint) is enabled, entries in `availableModels` that start with `anthropic.` are added to the `/model` picker as custom options and routed to the Mantle endpoint. This is an exception to the alias matching described in [Pin models for third-party deployments](#pin-models-for-third-party-deployments). The setting still restricts the picker to listed entries, and a Mantle ID embeds a family name, so it counts as a specific entry and disables that family's wildcard: alongside any Mantle IDs, list the version prefixes or full IDs you want to keep selectable. See [Merge behavior](#merge-behavior).

### Organization model restrictions

Organization admins on Claude Enterprise plans restrict which models members can run by disabling individual models in the claude.ai admin console. This restriction is delivered with the account's entitlements when Claude Code authenticates, separate from any `availableModels` list in settings, and the server enforces the same restriction independently when a session is created. Requires Claude Code v2.1.187 or later.

The restriction applies when a member signs in or uses their own API key. Organization-scoped credentials, such as organization service keys, are not tied to a user, so the restriction does not apply to them.

The Claude Console has no model restriction control. Organizations without a Claude Enterprise plan, including those whose members authenticate through the Anthropic API, restrict models with [`availableModels`](#restrict-model-selection) in [managed settings](https://code.claude.com/docs/en/managed-settings) instead, adding [`enforceAvailableModels`](#enforce-the-allowlist-for-the-default-model) to cover the Default option. These settings are enforced by Claude Code itself, not by the server.

A restricted model is hidden from the `/model` picker. Selecting it by name with `--model`, the `ANTHROPIC_MODEL` environment variable, or the `model` setting shows the notice `Model "<name>" is restricted by your organization's settings. Using <model> instead.` and the session starts on an allowed model. Typing `/model <name>` for a restricted model is rejected with `Model '<name>' is restricted by your organization's settings. Run /model to choose a different model.` and the session keeps its current model.

A [model family alias](#restrict-model-selection) such as `opus` resolves to its usual model when the organization permits it. When the organization restricts that model, Claude Code substitutes the newest version of the family that the organization permits, with the same substitution notice. `/model <alias>` is rejected only when every version of its family is restricted; an alias set with `--model`, `ANTHROPIC_MODEL`, or the `model` setting is still replaced at startup in that case. Before v2.1.205, a family alias was substituted or rejected based on its newest released version alone, even when an older version was allowed.

Restrictions apply org-wide or per role:

* Disabling a model at the organization level removes it for every member.
* Role-level access grants different models to different custom roles, and a member who holds several roles can use any model that one of their roles grants.
* Haiku models are always available and can't be disabled, so every member keeps at least one usable model.
* An access change takes effect on new requests within about a minute; the `/model` picker reflects it the next time a session starts.

Both restrictions apply together: a model is selectable only when it is permitted by `availableModels` and not restricted by the organization. Organization restrictions reach sessions on the Anthropic API and [LLM gateway](https://code.claude.com/docs/en/llm-gateway) deployments only; on any other provider, use `availableModels` instead.
