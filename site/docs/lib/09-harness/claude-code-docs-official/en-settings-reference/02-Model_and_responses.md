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
sourceRel: "en/settings-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/settings-reference.md"
sourceSha256: "811cfad7d21b8ebbbd64aeb288e903c6720594286d2a21d2b787639b7ab0ac1b"
pageSha256: "96faf99308e106aacaa9ea1ee07fcafbe976a3578012d1c942724b505ae17f50"
contentMode: "local-full"
zh: ""
---

## Model and responses

Choose which models Claude Code uses and how it responds. For how these settings interact with the `/model` command and environment variables, see [Model configuration](https://code.claude.com/docs/en/model-config).

### `advisorModel`

Pick which model answers when Claude calls the server-side [advisor tool](https://code.claude.com/docs/en/advisor). Unset it to turn the advisor off. The advisor must be at least as capable as your main model; when it isn't, Claude Code sends requests without the advisor. See [Choose an advisor model](https://code.claude.com/docs/en/advisor#choose-an-advisor-model).

You don't usually edit this key by hand. Run `/advisor` to open a picker that shows the current choice, the models that can advise, and **No advisor**. Claude Code saves your pick to this key in `~/.claude/settings.json`. If you pick from a [Remote Control](https://code.claude.com/docs/en/remote-control) client or in a session attached to a remote worker, the pick applies to that session only and doesn't change this key.

If your account requires the [usage-credits consent](https://code.claude.com/docs/en/advisor#fable-advisor-and-usage-credits), accept it first by running `/model fable`. Until you do, picking Fable in `/advisor` saves nothing and Claude Code tells you to run `/model fable` first.

* **Scope**: [`Any file`](#scopes)
* **Type**: string, one of the aliases `"fable"`, `"opus"`, or `"sonnet"`, which resolve to Claude Code's current default version of that model family, or a full model ID such as `"claude-opus-5"`
* **Default**: unset, so the advisor is off
* **Per-session overrides**: `--advisor` takes precedence over this key for one session. [`CLAUDE_CODE_DISABLE_ADVISOR_TOOL`](https://code.claude.com/docs/en/env-vars) turns the advisor off, and this key can't turn it back on

```json settings.json theme={null}
{
  "advisorModel": "opus"
}
```

The key has no effect on providers where the advisor [isn't available](https://code.claude.com/docs/en/advisor#requirements), such as Amazon Bedrock and Claude Platform on AWS. `"fable"` requires [Fable access](https://code.claude.com/docs/en/advisor#choose-an-advisor-model).

### `alwaysThinkingEnabled`

Turn [extended thinking](https://code.claude.com/docs/en/model-config#extended-thinking) off for every session by setting this to `false`. Thinking is on by default, so `true` changes nothing. Most people set this through `/config` rather than by editing the file.

On models that always think, such as the Fable models, `false` has no effect. On [third-party providers](https://code.claude.com/docs/en/third-party-integrations) Claude Code omits the `thinking` parameter instead of turning thinking off, so adaptive-reasoning models may still think. With thinking turned off on the Anthropic API, Claude Code sends effort `high` instead of a higher level to models it knows [don't accept that combination](https://code.claude.com/docs/en/errors#effort-isnt-available-with-thinking-turned-off), such as Opus 5.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: no effect; thinking is already on
  * `false`: Claude Code turns extended thinking off for every session
* **Default**: unset, so thinking is on for models that support it
* **Per-session overrides**: [`MAX_THINKING_TOKENS`](https://code.claude.com/docs/en/env-vars) takes precedence over this key for one session: `0` turns thinking off, under the same model and provider limits as `false`, and a positive value turns thinking on even when this key is `false`. On adaptive-reasoning models the number itself is ignored

```json settings.json theme={null}
{
  "alwaysThinkingEnabled": false
}
```

### `availableModels`

Restrict which models people can select for the main session, [subagents](https://code.claude.com/docs/en/sub-agents), [skills](https://code.claude.com/docs/en/skills), and the [advisor](https://code.claude.com/docs/en/advisor). A managed list constrains `/model`, `--model`, and the `model` key in a developer's own files; a model outside it can't be selected. On its own this doesn't touch the Default option; pair it with [`enforceAvailableModels`](#enforceavailablemodels) for that.

* **Scope**: [`Any file`](#scopes). Deploy it in managed settings to enforce it for an organization.
* **Type**: array of model aliases or IDs
* **Default**: unset, so every model is available

This example lets people select only Sonnet and Haiku models:

```json settings.json theme={null}
{
  "availableModels": ["sonnet", "haiku"]
}
```

See [Restrict model selection](https://code.claude.com/docs/en/model-config#restrict-model-selection).

### `effortLevel`

Set a default [effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) for models you haven't saved a level for. Lower levels are faster and cheaper on straightforward tasks, and higher levels reason more deeply on complex problems.

When you run `/effort low`, `medium`, `high`, or `xhigh` in an interactive session on your machine, Claude Code saves the level for the active model under [`modelSettings`](#modelsettings) rather than writing this key. Before v2.1.251, `/effort` wrote this key.

Within the same settings file, Claude Code uses a model's saved level rather than this key. [`modelSettings`](#modelsettings) states the cross-file precedence.

In a session attached to a remote worker, `/effort` applies to that session only. In a `-p` run or the Agent SDK it also applies to that session only, [unless a hold on the model's default effort is in effect](https://code.claude.com/docs/en/model-config#non-interactive-effort). [Adjust effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) lists the interactive picks that also apply to that session only. The message that `/effort` prints says which happened.

* **Scope**: [`Any file`](#scopes)
* **Type**: string, one of:
  * `"low"`: the least reasoning, for short, scoped, latency-sensitive tasks that aren't intelligence-sensitive
  * `"medium"`: reduces token usage for cost-sensitive work that can trade off some intelligence
  * `"high"`: balances token usage and intelligence
  * `"xhigh"`: deeper reasoning at higher token spend
* **Default**: unset
* **Per-session overrides**: `--effort` takes precedence over this key for one session, and [`CLAUDE_CODE_EFFORT_LEVEL`](https://code.claude.com/docs/en/env-vars) takes precedence over both

```json settings.json theme={null}
{
  "effortLevel": "xhigh"
}
```

On Opus 4.7, Opus 4.8, and Fable 5, Claude Code holds that model's default effort, organization-set or built-in; [Adjust effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) states which ways of setting a level end the hold and which leave it in place. Once the hold ends, Claude Code resolves effort by the precedence stated at [`modelSettings`](#modelsettings).

### `enforceAvailableModels`

The `/model` picker has a **Default** option that resolves to your [organization default model](https://code.claude.com/docs/en/model-config#organization-default-model) when one applies, and otherwise to your account type's default. An [`availableModels`](#availablemodels) allowlist limits the models you can name, but on its own it leaves **Default** alone, so **Default** can still resolve to a model outside the list. This key closes that gap. Requires Claude Code v2.1.175 or later.

When your organization deploys any managed settings, Claude Code reads this key from the managed source alone and ignores it in your other files.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: when **Default** would resolve to a model outside `availableModels`, Claude Code resolves it to the first available model in the list
  * `false`: **Default** resolves as usual, even to a model outside `availableModels`
* **Default**: `false`

This example restricts named selections to Sonnet and Haiku models and makes **Default** resolve to the first of them that is available:

```json settings.json theme={null}
{
  "availableModels": ["sonnet", "haiku"],
  "enforceAvailableModels": true
}
```

This key has no effect when `availableModels` is unset or empty. See [Enforce the allowlist for the Default model](https://code.claude.com/docs/en/model-config#enforce-the-allowlist-for-the-default-model). Requires Claude Code v2.1.175 or later.

### `fallbackModel`

Name backup models for Claude Code to try, in order, when your primary model is overloaded or unavailable. Claude Code switches to the next available model in the chain for the rest of the turn and shows a notice. Without a chain, Claude Code retries the same model and then surfaces the server's error, and you retry or switch models yourself.

A switch means one turn with a cold [prompt cache](https://code.claude.com/docs/en/prompt-caching#switching-models) on the fallback model; your next message tries the primary model first again.

* **Scope**: [`Any file`](#scopes)
* **Type**: array of model aliases or IDs; `"default"` expands to the default model
* **Default**: unset, so a failed request isn't retried on another model
* **Per-session overrides**: `--fallback-model` takes precedence over this key for one session

This example tries Sonnet 5 first, then Haiku 4.5, when your primary model fails:

```json settings.json theme={null}
{
  "fallbackModel": ["claude-sonnet-5", "claude-haiku-4-5"]
}
```

Unlike most array settings, this key doesn't merge across settings files: the highest-precedence file that defines it supplies the whole chain. If your project file sets `["claude-sonnet-5"]` and your user file sets `["claude-haiku-4-5"]`, the chain is `["claude-sonnet-5"]` only. Claude Code keeps at most three distinct allowed models from the list and ignores the rest. See [Fallback model chains](https://code.claude.com/docs/en/model-config#fallback-model-chains).

### `fastMode`

Turn [fast mode](https://code.claude.com/docs/en/fast-mode) on for sessions where it's available, for interactive work like rapid iteration or live debugging where you want speed at a higher cost per token. You don't usually edit this key by hand: running `/fast` writes `fastMode: true` to `~/.claude/settings.json`, and running it again to turn fast mode off removes the key. Fast mode runs only on Opus 5 and Opus 4.8: turning it on from another model switches you to Opus, and switching to an unsupported model turns it off. See [Switch models while fast mode is on](https://code.claude.com/docs/en/fast-mode#switch-models-while-fast-mode-is-on).

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code turns fast mode on for sessions where it's available
  * `false`: fast mode stays off
* **Default**: unset, so fast mode is off
* **Per-session overrides**: [`CLAUDE_CODE_DISABLE_FAST_MODE`](https://code.claude.com/docs/en/env-vars) turns fast mode off for one session, and this key can't turn it back on

```json settings.json theme={null}
{
  "fastMode": true
}
```

### `fastModePerSessionOptIn`

Normally, running `/fast` saves [`fastMode`](#fastmode) to a person's user settings, so fast mode is on at the start of every later session. Set this key to `true` to stop that: a saved `fastMode: true` no longer turns fast mode on at session start, and each person has to run `/fast` in each session they want it. Claude Code leaves the `fastMode` key in their file, so turning this key off restores the old behavior. Owners on Team or Enterprise plans can deploy it organization-wide through [server-managed settings](https://code.claude.com/docs/en/server-managed-settings).

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: a saved `fastMode: true` no longer turns fast mode on at session start, so each person runs `/fast` in each session they want it; a `fastMode: true` passed with `--settings` still counts for that session unless managed settings set this key
  * `false`: a saved `fastMode: true` turns fast mode on at the start of every later session
* **Default**: `false`

```json settings.json theme={null}
{
  "fastModePerSessionOptIn": true
}
```

See [Require per-session opt-in](https://code.claude.com/docs/en/fast-mode#require-per-session-opt-in).

### `language`

Have Claude respond in a language other than English by default. There is no fixed list for responses: Claude Code adds the value verbatim to the system prompt as an instruction to always respond in that language, so any language name Claude can read works. Claude Code doesn't check the value, so a misspelled name reaches Claude as written rather than producing an error. The same value sets the language for [voice dictation](https://code.claude.com/docs/en/voice-dictation#change-the-dictation-language), which does have a fixed list of [supported dictation languages](https://code.claude.com/docs/en/voice-dictation#change-the-dictation-language), and for auto-generated session titles.

* **Scope**: [`Any file`](#scopes)
* **Type**: string, any language name, such as `"japanese"`, `"spanish"`, or `"french"`; Claude Code doesn't validate it
* **Default**: unset; session titles then match the language of your conversation

```json settings.json theme={null}
{
  "language": "japanese"
}
```

### `maxEffortLevel`

Cap the [effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) a session can use, leaving lower levels available. Any higher level runs at the cap instead, including one from `/effort`, the `/model` picker, `--effort`, [`CLAUDE_CODE_EFFORT_LEVEL`](https://code.claude.com/docs/en/env-vars), a skill's or subagent's `effort` frontmatter, or the model's own default. Claude Code applies the cap itself before each request, so it holds on every provider, including Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry. Requires Claude Code v2.1.267 or later.

* **Scope**: [`Any file`](#scopes). Deploy it in managed settings to enforce it for an organization. When several scopes set a cap, the lowest applies, so a cap set in one scope can't be raised from another
* **Type**: string, one of `"low"`, `"medium"`, `"high"`, `"xhigh"`, or `"max"`. A `"max"` value sets no cap
* **Default**: unset, so no cap applies
* **Effect on ultracode**: a cap below `xhigh` makes [ultracode](#ultracode) unavailable on the models the cap applies to
* **Per-model caps**: add `maxEffortLevel` to a model's [`modelSettings`](#modelsettings) entry. That entry replaces this key for the model only within the settings source that sets both, such as your user settings or one [managed source](https://code.claude.com/docs/en/managed-settings#how-claude-code-combines-managed-sources). Set `"max"` there to exempt the model from that source's cap; Claude Code still applies caps from other sources

This example caps every model at `medium` and exempts Sonnet 4.6:

```json settings.json theme={null}
{
  "maxEffortLevel": "medium",
  "modelSettings": {
    "claude-sonnet-4-6": {
      "maxEffortLevel": "max"
    }
  }
}
```

When your organization also sets an [effort limit](https://code.claude.com/docs/en/model-config#organization-effort-limits) for a model, the lower of the two caps applies.

### `model`

Set the model every new session uses, so you don't have to pick one with `/model` each time. Setting it here doesn't stop you from switching mid-session. If your admin set an [organization default model](https://code.claude.com/docs/en/model-config#organization-default-model) to override user selection, you get that model even when you set this key in user, project, or local settings.

* **Scope**: [`Any file`](#scopes)
* **Type**: string, a model alias or full model ID
* **Default**: unset, so Claude Code uses your account's default model
* **Per-session overrides**: `--model` takes precedence over [`ANTHROPIC_MODEL`](https://code.claude.com/docs/en/env-vars), and both take precedence over this key for one session, including over a managed `model`; an [`availableModels`](#availablemodels) list still applies to the pick

```json settings.json theme={null}
{
  "model": "claude-sonnet-5"
}
```

A value here outranks [`ANTHROPIC_DEFAULT_MODEL`](https://code.claude.com/docs/en/model-config#set-a-default-model-for-new-sessions), which Claude Code uses only when nothing else selects a model.

### `modelOverrides`

Map Anthropic model IDs to provider-specific model IDs, such as Amazon Bedrock inference profile ARNs. Each model picker entry then uses its mapped value when calling the provider API. Administrators use this on [Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry](https://code.claude.com/docs/en/model-config#override-model-ids-per-version) to route each model version to a specific inference profile, version name, or deployment for governance, cost allocation, or regional routing.

* **Scope**: [`Any file`](#scopes)
* **Type**: object mapping model ID to provider model ID
* **Default**: unset

This example routes every call for Opus 4.6 to the named Bedrock inference profile:

```json settings.json theme={null}
{
  "modelOverrides": {
    "claude-opus-4-6": "arn:aws:bedrock:us-east-1:123456789012:inference-profile/example"
  }
}
```

See [Override model IDs per version](https://code.claude.com/docs/en/model-config#override-model-ids-per-version).

### `modelPicker`

List the models the `/model` picker offers, in the order you write them and under labels you choose, so the picker lists the models your organization runs, after the built-in lineup or instead of it. Each row's `model` is taken verbatim, so it accepts anything `--model` accepts: an alias such as `opus`, an Anthropic model ID, or a provider-format ID for Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, or an LLM gateway. Requires Claude Code v2.1.242 or later.

* **Scope**: [`User or managed`](#scopes). Claude Code reads the key from managed settings, `--settings`, and user settings, and ignores it in project and local settings so a repository you clone can't relabel the picker. The highest of those three that sets the key supplies the whole lineup, and Claude Code never combines lineups from two sources.
* **Type**: object with an `options` array of rows and an optional `replaceBuiltInOptions` Boolean
* **Default**: unset, so the picker shows the built-in lineup

This example adds two Bedrock deployments after the built-in lineup, under names your team recognizes:

```json managed-settings.json theme={null}
{
  "modelPicker": {
    "options": [
      { "model": "us.anthropic.claude-opus-4-8", "label": "Opus (production)" },
      {
        "model": "us.anthropic.claude-sonnet-4-6",
        "label": "Sonnet (production)",
        "description": "Day-to-day work"
      }
    ]
  }
}
```

&lt;span id="modelpicker-options" />

&lt;span id="modelpicker-replacebuiltinoptions" />

#### Fields for `modelPicker`

The key takes two fields, one for the rows themselves and one for whether they replace the built-in lineup or add to it.

| Field                   | Type                                                                                  | What it does                                                                                                                                                                                                                                                                  |
| :---------------------- | :------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options`               | array of rows, each with a required `model` and an optional `label` and `description` | The rows the picker shows, in this order, except that a grayed-out row moves to the bottom. Without a `label`, Claude Code titles the row with the built-in name for a model it knows, or the model ID otherwise, and without a `description` it writes a generic second line |
| `replaceBuiltInOptions` | Boolean, default `false`                                                              | Set it to `true` to show only these rows, **Default**, and a row for the model the session is already using. Leave it unset to add these rows after the built-in lineup                                                                                                       |

With `replaceBuiltInOptions` on, Claude Code hides every other row: the built-in lineup, the rows it adds for [`availableModels`](#availablemodels) entries, the models [gateway discovery](https://code.claude.com/docs/en/llm-gateway-protocol#model-discovery) found, and [`ANTHROPIC_CUSTOM_MODEL_OPTION`](https://code.claude.com/docs/en/model-config#add-a-custom-model-option). With it off, Claude Code skips a listed model that the built-in lineup already covers. A label changes what the picker shows, not which model Claude Code runs.

An [`availableModels`](#availablemodels) allowlist still applies to these rows. Before you add a listed model to the allowlist, read [Merge behavior](https://code.claude.com/docs/en/model-config#merge-behavior): a specific model ID narrows its family's wildcard entry. Claude Code also checks each row against the session before it shows the picker:

* **Dropped**: a row Claude Code can't serve, such as a retired model or a model your organization has no access to
* **Grayed out**: a row you can't select yet, shown with the reason
* **No row survives**: Claude Code keeps the built-in lineup, filtered by the allowlist as usual

Claude Code drops a row it can't parse and keeps the rest. See [Fix a broken settings file](https://code.claude.com/docs/en/settings#fix-a-broken-settings-file).

### `modelPricing`

Report spend at the rates your organization pays instead of list price. Set it when your organization has contracted rates, so the dollar figures developers see match your bill. Claude Code applies the rates in `/usage`, the [status line](https://code.claude.com/docs/en/statusline), the Agent SDK's `total_cost_usd`, the [`--max-budget-usd`](https://code.claude.com/docs/en/cli-reference) limit, and the [OpenTelemetry](https://code.claude.com/docs/en/monitoring-usage) cost metric and events. You supply the rates: Claude Code doesn't read them from your contract or the Claude Console. Requires Claude Code v2.1.242 or later.

* **Scope**: [`Managed`](#scopes). Deploy the key through server-managed settings, an MDM policy, a `managed-settings.json` file, or a [policy helper](https://code.claude.com/docs/en/managed-settings#compute-the-policy-with-a-helper-program). Claude Code ignores it in user, project, and local settings, in `--settings`, and on Windows in the user-writable [HKCU registry](https://code.claude.com/docs/en/managed-settings#where-each-mechanism-stores-the-policy). With server-managed settings, each session reports costs at list price until that session's [settings fetch](https://code.claude.com/docs/en/server-managed-settings#fetch-and-caching-behavior) has confirmed the setting. A host application that embeds Claude Code and sets [`CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST`](https://code.claude.com/docs/en/env-vars) can supply a table of its own through the SDK [`managedSettings`](https://code.claude.com/docs/en/agent-sdk/typescript#options) option, which Claude Code uses only when no managed source sets the key and only in Claude Code v2.1.246 or later.
* **Type**: object with an optional `multiplier` and an optional `overrides` map
* **Default**: unset, so Claude Code reports list price unless a host application supplies a table

This example sets contracted rates for Sonnet 4.6 and then reduces every figure, the Sonnet row included, by 15%. Set `multiplier` alone for a flat discount, `overrides` alone for per-model rates, or both:

```json managed-settings.json theme={null}
{
  "modelPricing": {
    "multiplier": 0.85,
    "overrides": {
      "claude-sonnet-4-6": {
        "input": 2.4,
        "output": 12,
        "cacheRead": 0.24,
        "cacheWrite": 3
      }
    }
  }
}
```

For the steps, including how to confirm the rates are in effect, see [Report spend at your contracted rates](https://code.claude.com/docs/en/costs#report-spend-at-your-contracted-rates).

&lt;span id="modelpricing-multiplier" />

&lt;span id="modelpricing-overrides" />

#### Fields for `modelPricing`

| Field        | Type                                                                                                    | What it does                                                                                                                                                                                                        |
| :----------- | :------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `multiplier` | number greater than 0 and at most 1                                                                     | Scales every cost Claude Code computes, whether or not an `overrides` row covers it                                                                                                                                 |
| `overrides`  | map of model ID to a rate object with `input`, `output`, `cacheRead`, and `cacheWrite`, each 0 to 10000 | The USD-per-million-token rates for that model, all four required. `cacheWrite` covers both five-minute and one-hour cache writes. See [Which models a row applies to](#which-models-a-modelpricing-row-applies-to) |

Claude Code uses a row's rates exactly as you wrote them, without adding the fast-mode surcharge or the [US-only-inference rate](https://platform.claude.com/docs/en/about-claude/pricing). If you also set `multiplier`, Claude Code applies it on top of the row's rates. Claude Code drops a row with a rate it can't parse, or a `multiplier` it can't parse, and keeps the rest; see [Fix a broken settings file](https://code.claude.com/docs/en/settings#fix-a-broken-settings-file).

#### Which models a `modelPricing` row applies to

Claude Code decides which models a row applies to from the row's key:

* **A built-in model's ID**: a key Claude Code itself uses for a built-in model, whether that key is the model's own ID, such as `claude-sonnet-4-6`, or its Bedrock, Agent Platform, or Foundry ID. Claude Code applies the row to every dated snapshot ID and provider-specific ID of that model.
* **Any other key**: a key that isn't a built-in model's ID, such as a gateway model alias. Claude Code applies the row to that one ID only. When a model ID matches one of your keys exactly and also falls under a row keyed by a built-in model's ID, Claude Code uses the exact match.
* **A Bedrock application inference profile**: once Claude Code has resolved the profile to the model it routes to, through your [`modelOverrides`](#modeloverrides) map or the [`bedrock:GetInferenceProfile` lookup](https://code.claude.com/docs/en/amazon-bedrock#iam-configuration), Claude Code applies that model's row to the profile.

### `modelSettings`

Save an [effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) for each model you use. In an interactive session on your machine, when you save `low`, `medium`, `high`, or `xhigh` as your default with `/effort` or the `/model` picker's effort slider, Claude Code writes that level here under the model you're using, so you rarely edit this key yourself. The [`effortLevel`](#effortlevel) entry lists the sessions where `/effort` applies to that session only. Requires Claude Code v2.1.251 or later.

Edit the key by hand to change or remove a level you saved.

A model's `effortLevel` here takes precedence over the top-level [`effortLevel`](#effortlevel) in the same settings file. Across files, Claude Code resolves each model separately: the highest-precedence [settings file](https://code.claude.com/docs/en/settings#settings-precedence) that sets either an `effortLevel` for that model or the top-level `effortLevel` decides, so an `effortLevel` in managed settings outranks a level you saved in user settings. [Adjust effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) lists what else can override a saved level, such as `--effort` at launch.

To cap one model's effort rather than set its level, add a [`maxEffortLevel`](#maxeffortlevel) field to that model's entry. The field requires Claude Code v2.1.267 or later.

* **Scope**: [`Any file`](#scopes)
* **Type**: object mapping a model name to an object with an `effortLevel` field, one of `"low"`, `"medium"`, `"high"`, or `"xhigh"`, a [`maxEffortLevel`](#maxeffortlevel) field, or both
* **Default**: unset

Claude Code writes each entry under the model's canonical name, such as `claude-opus-5`, and matches that model's alias, date-suffixed, `[1m]`, and recognized provider-specific IDs to the same entry.

This example keeps Opus 5 at `medium` while other models use their own saved or default levels:

```json settings.json theme={null}
{
  "modelSettings": {
    "claude-opus-5": {
      "effortLevel": "medium"
    }
  }
}
```

Run `/effort auto` to clear your saved level for the model you're using. Claude Code leaves the other entries and any top-level `effortLevel` in place.

### `outputStyle`

Select an [output style](https://code.claude.com/docs/en/output-styles) by name. An output style is a saved set of instructions that changes Claude's role, tone, and output format, such as the built-in Explanatory and Learning styles or one you wrote yourself.

If you change this key during a session, Claude uses the new style starting with your next message. For what that message costs in prompt caching, see [Changing output style](https://code.claude.com/docs/en/prompt-caching#changing-output-style). Before v2.1.251, the edit applied only after you ran `/clear` or started a new session.

* **Scope**: [`Any file`](#scopes)
* **Type**: string, the name of a [built-in](https://code.claude.com/docs/en/output-styles#built-in-output-styles) or [custom](https://code.claude.com/docs/en/output-styles#create-a-custom-output-style) output style
* **Default**: unset, so Claude Code uses the default style

This example selects the built-in Explanatory style, which adds educational insights between tasks:

```json settings.json theme={null}
{
  "outputStyle": "Explanatory"
}
```

### `promptCacheTtl`

Choose how long the [prompt cache](https://code.claude.com/docs/en/prompt-caching) holds the main conversation. This key applies to your interactive, `-p`, and Agent SDK turns, together with the helpers Claude Code runs inline with them. The one-hour lifetime keeps the cache warm across longer breaks, and the API [bills each cache write at a higher rate](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#pricing) than at the five-minute lifetime. Requires Claude Code v2.1.242 or later.

* **Scope**: [`Any file`](#scopes)
* **Type**: string, one of:
  * `"5m"`: the cache holds for five minutes
  * `"1h"`: the cache holds for an hour
* **Default**: unset, so each main-conversation request gets [its default lifetime](https://code.claude.com/docs/en/prompt-caching#which-ttl-each-request-gets)
* **Per-session overrides**: [`FORCE_PROMPT_CACHING_5M`](https://code.claude.com/docs/en/env-vars) takes precedence over everything else, then [`CLAUDE_CODE_PROMPT_CACHE_TTL`](https://code.claude.com/docs/en/env-vars), then this key, and last [`ENABLE_PROMPT_CACHING_1H`](https://code.claude.com/docs/en/env-vars)

This example keeps the main conversation on the one-hour lifetime and leaves subagents on five minutes:

```json settings.json theme={null}
{
  "promptCacheTtl": "1h",
  "subagentPromptCacheTtl": "5m"
}
```

For what each lifetime costs, see [Cache lifetime](https://code.claude.com/docs/en/prompt-caching#cache-lifetime).

### `showThinkingSummaries`

See summaries of Claude's [extended thinking](https://code.claude.com/docs/en/model-config#extended-thinking) in interactive sessions. Set it if you want the full summaries when you expand thinking with `Ctrl+O`. When unset or `false`, the Anthropic API redacts thinking blocks and Claude Code shows a collapsed stub; third-party providers don't redact.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: you see full thinking summaries when you expand thinking with `Ctrl+O`
  * `false`: the Anthropic API redacts thinking blocks and Claude Code shows a collapsed stub
* **Default**: `false`

```json settings.json theme={null}
{
  "showThinkingSummaries": true
}
```

Redaction changes only what you see, not what the model generates. To reduce thinking spend, [lower the budget or disable thinking](https://code.claude.com/docs/en/model-config#extended-thinking) instead.

### `subagentPromptCacheTtl`

Choose how long the [prompt cache](https://code.claude.com/docs/en/prompt-caching) holds the requests Claude Code makes outside the main conversation. This key applies to [subagents](https://code.claude.com/docs/en/sub-agents), [workflows](https://code.claude.com/docs/en/workflows), and Claude Code's own background and helper requests, such as compaction and session titles. The one-hour lifetime keeps the cache warm across longer breaks, and the API [bills each cache write at a higher rate](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#pricing) than at the five-minute lifetime. Requires Claude Code v2.1.242 or later.

* **Scope**: [`Any file`](#scopes)
* **Type**: string, one of:
  * `"5m"`: the cache holds for five minutes
  * `"1h"`: the cache holds for an hour
* **Default**: unset, so each of these requests gets [its default lifetime](https://code.claude.com/docs/en/prompt-caching#which-ttl-each-request-gets)
* **Per-session overrides**: [`FORCE_PROMPT_CACHING_5M`](https://code.claude.com/docs/en/env-vars) takes precedence over everything else, then [`CLAUDE_CODE_SUBAGENT_PROMPT_CACHE_TTL`](https://code.claude.com/docs/en/env-vars), then this key, then [`ENABLE_PROMPT_CACHING_1H`](https://code.claude.com/docs/en/env-vars), which asks for the one-hour lifetime on every request. For where a subagent's own frontmatter value ranks, see [Choose the TTL yourself](https://code.claude.com/docs/en/prompt-caching#choose-the-ttl-yourself)

This example gives subagents and the other requests outside the main conversation the one-hour lifetime:

```json settings.json theme={null}
{
  "subagentPromptCacheTtl": "1h"
}
```

This key covers the requests [`promptCacheTtl`](#promptcachettl) doesn't, so set both to choose a lifetime for every request Claude Code makes. For how a subagent's cache differs from the main conversation's, see [Subagents and the cache](https://code.claude.com/docs/en/prompt-caching#subagents-and-the-cache).

### `switchModelsOnFlag`

Choose what happens when a [safety classifier flags a request](https://code.claude.com/docs/en/model-config#automatic-model-fallback): switch to the fallback model and continue, or pause so you can choose between switching and editing the prompt.

* **Scope**: [`Any file`](#scopes). Appears in `/config` as **Switch models when a message is flagged**.
* **Type**: Boolean
  * `true`: Claude Code switches to the fallback model and continues
  * `false`: in an interactive session Claude Code pauses so you can choose between switching and editing the prompt; where no dialog can show, such as a `-p` run, the flagged request ends as an error
* **Default**: `true`, switch automatically

```json settings.json theme={null}
{
  "switchModelsOnFlag": false
}
```

See [Ask before switching](https://code.claude.com/docs/en/model-config#ask-before-switching).

### `ultracode`

Start sessions with [ultracode](https://code.claude.com/docs/en/workflows#let-claude-decide-with-ultracode) on. With it on, Claude plans a workflow for each substantive task instead of waiting for you to ask. Claude plans workflows only when [dynamic workflows](https://code.claude.com/docs/en/workflows) are enabled for you, your model supports `xhigh` effort, and no [effort cap](https://code.claude.com/docs/en/model-config#organization-effort-limits) below `xhigh` applies. Either way, `ultracode: true` runs the session at `xhigh` effort, or at the cap when an effort cap is lower. Claude Code reads this key but never writes it: `/effort ultracode` turns ultracode on for the current session only.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: sessions start at `xhigh` effort, with ultracode on when dynamic workflows are enabled for you, your model supports `xhigh`, and no effort cap is below `xhigh`
  * `false`: sessions start with ultracode off
* **Default**: unset, so ultracode is off
* **Per-session overrides**: `/effort ultracode` turns ultracode on for one session without this key. So does `--effort ultracode`, which requires Claude Code v2.1.203 or later

```json settings.json theme={null}
{
  "ultracode": true
}
```

Ultracode runs the session at `xhigh` effort and takes precedence over `effortLevel` and [`modelSettings`](#modelsettings) entries. If an [effort cap](https://code.claude.com/docs/en/model-config#organization-effort-limits) below `xhigh` applies to the model, such as a [`maxEffortLevel`](#maxeffortlevel) setting, the session runs at the cap instead and ultracode stays off. Claude then doesn't plan workflows on its own, and `/effort` doesn't offer `ultracode`. An Agent SDK `apply_flag_settings` control request also accepts the key.
