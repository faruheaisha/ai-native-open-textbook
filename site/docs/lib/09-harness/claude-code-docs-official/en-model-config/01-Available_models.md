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
pageSha256: "e6454c4f92adc57598203e69a8cc70f0315368270bb5b0c6be0cdbf12fa71d5c"
contentMode: "local-full"
zh: ""
---

## Available models

For the `model` setting in Claude Code, you can configure either:

* A **model alias**
* A **model name**
  * Anthropic API: a full **[model name](https://platform.claude.com/docs/en/about-claude/models/overview)**
  * Amazon Bedrock: an inference profile ARN
  * Microsoft Foundry: a deployment name
  * Google Cloud's Agent Platform: a version name

For guidance on which model and effort level fit different kinds of work, see [Choosing a Claude model and effort level in Claude Code](https://claude.com/blog/claude-model-and-effort-level-in-claude-code) on the blog.

  `ANTHROPIC_BASE_URL` changes where requests are sent, not which model answers them. To route Claude through an LLM gateway, see [LLM gateways](https://code.claude.com/docs/en/llm-gateway).

### Model aliases

Use a model alias to select model settings without remembering exact version numbers:

| Model alias      | Behavior                                                                                                                                                                                                                                                                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`default`**    | Special value that clears any model override and reverts to the [runtime default for your account](#default-model-setting). Not itself a model alias                                                                                                                                                                                     |
| **`best`**       | Uses the model the [`fable` alias resolves to](#fable-alias-resolution) where Fable is available to you, otherwise the same model as `opus`                                                                                                                                                                                              |
| **`fable`**      | Uses the [Fable model for your provider](#fable-alias-resolution) for your hardest and longest-running tasks                                                                                                                                                                                                                             |
| **`sonnet`**     | Uses the latest Sonnet model for daily coding tasks                                                                                                                                                                                                                                                                                      |
| **`opus`**       | Uses the latest Opus model for complex reasoning tasks                                                                                                                                                                                                                                                                                   |
| **`haiku`**      | Uses the fast and efficient Haiku model for simple tasks                                                                                                                                                                                                                                                                                 |
| **`sonnet[1m]`** | Uses Sonnet with a [1 million token context window](https://platform.claude.com/docs/en/build-with-claude/context-windows#context-window-sizes-by-model) for long sessions. No effect when `sonnet` already resolves to Sonnet 5 with its native 1M window; behind an [LLM gateway](https://code.claude.com/docs/en/llm-gateway), selects the 1M window for Sonnet 5 |
| **`opus[1m]`**   | Uses Opus with a [1 million token context window](https://platform.claude.com/docs/en/build-with-claude/context-windows#context-window-sizes-by-model) for long sessions                                                                                                                                                                 |
| **`opusplan`**   | Special mode that uses `opus` during plan mode, then switches to `sonnet` for execution                                                                                                                                                                                                                                                  |

The version that the `opus` and `sonnet` aliases resolve to depends on the provider:

| Provider                                             | `opus`   | `sonnet`   |
| :--------------------------------------------------- | :------- | :--------- |
| Anthropic API                                        | Opus 5   | Sonnet 5   |
| [Claude Platform on AWS](https://code.claude.com/docs/en/claude-platform-on-aws) | Opus 5   | Sonnet 4.6 |
| Amazon Bedrock, Google Cloud's Agent Platform        | Opus 5   | Sonnet 4.5 |
| Microsoft Foundry                                    | Opus 4.6 | Sonnet 4.5 |

&lt;span id="fable-alias-resolution" />

Unless you set `ANTHROPIC_DEFAULT_FABLE_MODEL`, the `fable` alias resolves to Fable 5.1, except in [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway) sessions, where `fable` and `best` resolve to Fable 5. Before v2.1.257, `fable` resolved to Fable 5 on every provider.

A gateway that isn't configured to serve `claude-fable-5-1` rejects requests for that model. To use Fable 5.1 through a gateway that serves it, select it with `/model claude-fable-5-1`.

Where an alias resolves to an older model, newer models are available by selecting the full model name explicitly or setting `ANTHROPIC_DEFAULT_OPUS_MODEL` or `ANTHROPIC_DEFAULT_SONNET_MODEL`.

Before v2.1.219, `opus` resolved to Opus 4.8 on the Anthropic API from v2.1.154, and on Claude Platform on AWS, Amazon Bedrock, and Google Cloud's Agent Platform from v2.1.207. Before v2.1.207, `opus` resolved to Opus 4.7 on Claude Platform on AWS and to Opus 4.6 on Amazon Bedrock and Google Cloud's Agent Platform.

Aliases point to the recommended version for your provider and update over time. To pin to a specific version, use the full model name, for example `claude-opus-5`, or set the corresponding environment variable like `ANTHROPIC_DEFAULT_OPUS_MODEL`.

  Opus 5 requires Claude Code v2.1.219 or later. Sonnet 5 requires v2.1.197 or later. Opus 4.8 requires v2.1.154 or later. Run `claude update` to upgrade.

### Work with Fable

[Claude Fable 5.1](https://platform.claude.com/docs/en/about-claude/models/overview) and Claude Fable 5 are the most capable models in Claude Code, suited to tasks larger than a single sitting. They sustain long autonomous sessions, investigate before acting, and verify their work more often than smaller models. Fable 5.1 is the newer release.

Neither Fable model is the account-type default on any plan or provider. Select one explicitly:

* **Fable 5.1**: run `/model fable`, or launch with `claude --model fable`. In [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway) sessions, where the alias resolves to Fable 5, run `/model claude-fable-5-1` instead.
* **Fable 5**: select it by model ID. On the Anthropic API, run `/model claude-fable-5` or launch with `claude --model claude-fable-5`. On other providers, use your provider's Fable 5 model ID or [pin it](#pin-models-for-third-party-deployments) with `ANTHROPIC_DEFAULT_FABLE_MODEL`.

If you connect to the Anthropic API directly and your user settings hold `claude-fable-5` or `claude-fable-5[1m]` as the model, for example because you selected Fable in the `/model` picker before v2.1.257, Claude Code changes that saved value to the `fable` or `fable[1m]` alias the first time you run v2.1.257 or later. The startup model line shows `(auto-updated)` once. A `claude-fable-5` value in project, local, or managed settings stays as it is.

Requests that a Fable model's safety classifiers flag, most often in cybersecurity and biology domains, trigger [automatic model fallback](#automatic-model-fallback).

To get the most from Fable:

* **Describe the outcome, not the steps**: hand it the result you want and let it plan the path. To keep it working toward that outcome, [set a goal](https://code.claude.com/docs/en/goal).
* **Hand it ambiguous problems**: root-cause investigations, outage debugging, and architecture decisions are where the extra investigation and verification pay off.
* **Skip the verification reminders**: it verifies its own work with less prompting, so reminders to test or check are usually unnecessary.
* **Size up larger tasks**: give it work you would normally break into pieces. It holds long sessions without losing the thread.

  Fable 5.1 requires Claude Code v2.1.257 or later. If a request for it from an older version fails, see [Claude Code does not support this model](https://code.claude.com/docs/en/errors#claude-code-does-not-support-this-model). Run `claude update` to upgrade. For availability under zero data retention, see [Model availability under ZDR](https://code.claude.com/docs/en/zero-data-retention#model-availability-under-zdr).

On the Anthropic API, the `/model` picker lists a Fable model only after the server reports it available for your organization. When you type `/model fable` or a Fable model ID, Claude Code checks availability with the server directly, so a typed selection can succeed even when the picker doesn't list the entry.

#### Fable and usage credits

Depending on your plan and seat tier, Fable usage can bill to [usage credits](https://support.claude.com/en/articles/12429409-extra-usage-for-paid-claude-plans) instead of drawing on your plan's included limits. When it does, the `/model` picker shows "Requires usage credits" on the Fable row. To manage usage credits, see [Add usage credits to your subscription](https://code.claude.com/docs/en/costs#add-usage-credits-to-your-subscription).

In interactive sessions, Claude Code shows a consent prompt before a Fable request bills usage credits. Members of Enterprise plans with organization billing don't see the prompt. You can continue on Fable using usage credits or switch to your default model. You can also dismiss the prompt:

* In the `/model` picker, you keep your current model.
* Mid-session, Claude Code continues the turn on your default model.

After you choose to continue on Fable using usage credits, Claude Code doesn't show the prompt again.

In a session with [Remote Control](https://code.claude.com/docs/en/remote-control) connected, a [background session](https://code.claude.com/docs/en/agent-view), or an [agent team](https://code.claude.com/docs/en/agent-teams) teammate's session, nobody may be at the terminal, so Claude Code holds the mid-session consent prompt for the [`dialogExpiry`](https://code.claude.com/docs/en/settings-reference#dialogexpiry) deadline, five minutes by default. If nobody has answered by the deadline, Claude Code ends the turn without sending the request and adds a notice to the transcript, which the Remote Control client also shows. Your model selection is unchanged, and Claude Code asks for consent again on your next message.

What you can do while the prompt is waiting depends on the session:

* With Remote Control connected or in a teammate's session, press any key at the terminal to cancel the deadline, and Claude Code waits for your answer.
* In a background session, answer before the deadline.
* If you send a new message from the remote client before anyone has typed at the terminal, Claude Code ends the turn the same way, and your new message starts the next turn. After someone types at the terminal, Claude Code keeps waiting for the answer and queues your new message behind it.

In [non-interactive mode](https://code.claude.com/docs/en/headless) with the `-p` flag and through the Agent SDK, Claude Code never shows the consent prompt. When a Fable request there would bill to usage credits, Claude Code bills it without asking.

### Setting your model

You can configure your model in several ways, listed in order of priority:

1. **During session**: use `/model <alias|name>` to switch immediately, or run `/model` with no argument to open the picker. See [when Claude Code asks you to confirm the switch](https://code.claude.com/docs/en/prompt-caching#switching-models)
2. **At startup**: launch with `claude --model <alias|name>`
3. **Environment variable**: set `ANTHROPIC_MODEL=<alias|name>`
4. **Settings**: configure permanently in your settings file using the `model` field
5. **[Default for new sessions](#set-a-default-model-for-new-sessions)**: set `ANTHROPIC_DEFAULT_MODEL=<alias|name>`

`/model` saves your choice as the default for new sessions by writing the `model` field in your user settings. In the picker:

* `Enter`: switch model and save as your default
* `s`: switch model for this session only

Typing `/model <name>` directly behaves like `Enter`. If you set a model with `/model` in [non-interactive mode](https://code.claude.com/docs/en/headless), with the `-p` flag, your choice applies to the current session only and isn't saved as your default; `/model` in that mode requires Claude Code v2.1.205 or later. Project and managed settings still take precedence and reapply on the next launch. An [organization default model](#organization-default-model) that your admin has configured to override user selection also reapplies on the next launch.

In v2.1.144 through v2.1.152, `/model` applied to the current session only and `d` in the picker saved a default.

The `--model` flag and `ANTHROPIC_MODEL` environment variable apply only to the session you launch with them. To run different models in different terminals at the same time, launch each one with its own `--model` flag rather than switching with `/model`.

Prices in the `/model` picker appear when Claude Code talks to the Anthropic API, directly or through an [LLM gateway](https://code.claude.com/docs/en/llm-gateway) that proxies it, and the price on a row is the price of the model that row selects. On [third-party providers](https://code.claude.com/docs/en/third-party-integrations) such as Amazon Bedrock and on the [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway), your provider or gateway determines what you pay, so picker rows show no price. The price is a display label only; it doesn't affect which model a row selects or what your provider bills. Before v2.1.206, [Claude Platform on AWS](https://code.claude.com/docs/en/claude-platform-on-aws) and gateway sessions showed Anthropic list prices, and a row could show the price of a different model than the one it selected.

Resumed sessions started with `claude --resume`, `--continue`, or the `/resume` picker keep the model they were using when the transcript was saved, regardless of the current `model` setting. If the restored model has been retired or is excluded by [`availableModels`](#restrict-model-selection), the session falls through to the normal precedence order. This prevents another session's `/model` choice from changing the model on resume. On providers that use provider-specific deployment IDs rather than Anthropic model IDs, such as Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry, the transcript model isn't restored at all and the session resolves its model through the normal precedence order.

A model you pick for the new launch with `--model` or `ANTHROPIC_MODEL` still takes precedence over the restored model. As of v2.1.195, so does an [`ANTHROPIC_DEFAULT_OPUS_MODEL`](#environment-variables) family variable. [`ANTHROPIC_DEFAULT_MODEL`](#set-a-default-model-for-new-sessions) can too, under the conditions listed in its section.

When the active model at startup comes from project or managed settings rather than your own selection, the startup header shows which settings file set it. Run `/model` to override; the project or managed setting reapplies on the next launch. On platforms that embed Claude Code and set [`CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST`](https://code.claude.com/docs/en/env-vars), the host's model configuration takes precedence over managed model settings, while a managed `availableModels` allowlist stays in force unless the host supplies its own; [Exceptions to managed settings precedence](https://code.claude.com/docs/en/settings#exceptions-to-managed-settings-precedence) says which keys and variables the host overrides.

If you or your organization configure [PreModelSwitch hooks](https://code.claude.com/docs/en/hooks#premodelswitch), they run before a requested switch applies and can block it or ask you to confirm.

When Claude Code can't tell which PreModelSwitch hooks your organization's [managed plugins](https://code.claude.com/docs/en/settings-reference#enabledplugins) deliver, for example because a managed plugin failed to load, it refuses the switch rather than apply it unchecked, and it checks again on each new attempt. See [Model switch was blocked by a PreModelSwitch hook](https://code.claude.com/docs/en/errors#model-switch-was-blocked-by-a-premodelswitch-hook) for the message and recovery.

When you switch models through the [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) `setModel()` method or from a device connected through [Remote Control](https://code.claude.com/docs/en/remote-control), or an app such as the [Desktop app](https://code.claude.com/docs/en/desktop) that runs the Claude Code CLI switches for you, Claude Code checks that the string is one it recognizes before saving it. This check requires Claude Code v2.1.200 or later. Checking a Remote Control pick requires Claude Code v2.1.260 or later on your machine. On the Anthropic API, Claude Code recognizes:

* a model alias
* an entry from the `/model` picker
* any name that starts with `claude-`
* a value you configured yourself as a [custom model option](#add-a-custom-model-option) or in [`modelOverrides`](#override-model-ids-per-version)

Claude Code rejects an unrecognized string with `Model "<name>" is not a recognized model id.` and the session keeps its current model, instead of saving the string and failing on the next request. See [the error reference](https://code.claude.com/docs/en/errors#model-is-not-a-recognized-model-id) for recovery steps.

The check runs only on the Anthropic API. On Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, [Claude Platform on AWS](https://code.claude.com/docs/en/claude-platform-on-aws), and behind an [LLM gateway](https://code.claude.com/docs/en/llm-gateway) or a custom `ANTHROPIC_BASE_URL`, your provider or gateway defines the model names, so Claude Code passes any string through without checking it. The check also doesn't cover the `--model` flag, the `ANTHROPIC_MODEL` environment variable, or the `model` setting; a mistyped value there produces [There's an issue with the selected model](https://code.claude.com/docs/en/errors#theres-an-issue-with-the-selected-model) on the first request instead. Claude Code can still write the [unrecognized-model diagnostic line](https://code.claude.com/docs/en/errors#unrecognized-model-id-on-a-request) at request time, on every provider.

When the requested model has a scheduled retirement date or is automatically remapped to a newer version, Claude Code shows a warning that names the requested model. Interactive sessions show it as a startup notice. From v2.1.182, the same warning is written to stderr in [non-interactive mode](https://code.claude.com/docs/en/headless) when using the default text output format. The check also covers a `model` set in [subagent frontmatter](https://code.claude.com/docs/en/sub-agents). The stderr warning is suppressed for `--output-format json` and `stream-json`; read the actual model from the `modelUsage` field of the [result message](https://code.claude.com/docs/en/headless#get-structured-output) instead.

For example, start a session on Opus:

```bash theme={null}
claude --model opus
```

Then switch models from within the session:

```text theme={null}
/model sonnet
```

Example settings file:

```json theme={null}
{
    "permissions": {
        "allow": ["Bash(npm run lint)"]
    },
    "model": "opus"
}
```

#### Set a default model for new sessions

Set `ANTHROPIC_DEFAULT_MODEL=<alias|name>` to choose the model your sessions start on by default. Requires Claude Code v2.1.236 or later.

Claude Code starts a new session on the variable's model only when none of these selects a model:

* The `--model` flag
* `ANTHROPIC_MODEL`
* A `model` value in any settings file, including the choice you save with `/model`
* An [organization default model](#organization-default-model)

A choice you save with `/model` takes precedence over the variable on later launches too. With `ANTHROPIC_MODEL` set instead, Claude Code returns to that variable's model on the next launch, whatever you saved with `/model`.

Claude Code also resolves the Default option to the variable's model, unless an organization default model applies. When the Default option resolves to the variable's model, the Default row in the `/model` picker shows the label Set by ANTHROPIC\_DEFAULT\_MODEL.

Claude Code ignores the variable in these cases, and the Default option resolves as if you hadn't set it:

* You set it to `default`, `inherit`, `opusplan`, or `haiku`
* [`enforceAvailableModels`](#enforce-the-allowlist-for-the-default-model) is on
* [`availableModels`](#restrict-model-selection) or [organization model restrictions](#organization-model-restrictions) exclude the model
* The model isn't available to your account

When a new session would start on the variable's model, a session you resume with `claude --resume`, `--continue`, or the `/resume` picker starts on it too. Claude Code doesn't restore the model saved in that session's transcript. Otherwise Claude Code doesn't use the variable when you [resume a session](#setting-your-model).

#### A new session starts on a different model than you picked

When you pick a model with `/model` and your next session starts on something else, these are the usual causes:

* **You chose it for one session.** Pressing `s` in the picker, launching with `--model`, and running `/model` in non-interactive mode all apply to the current session and leave your saved default alone.
* **Something with higher priority sets the model.** A `model` value in project or managed settings, `ANTHROPIC_MODEL` in your shell, or an [organization default](#organization-default-model) your admin set to override user choices applies again at every launch. Your `/model` choice is still saved; it's outranked. When project or managed settings set the model, the startup header names the file.
* **Claude Code couldn't save your choice.** `/model` writes `model` to `~/.claude/settings.json`. If you can't write to that file, for example because another tool generates it or links it to a read-only copy, the model you chose lasts for the session and the next launch reads the old value. Set `model` in the tool that generates the file, or make the file writable. See [A change you made in Claude Code is lost in new sessions](https://code.claude.com/docs/en/settings#a-change-you-made-in-claude-code-is-lost-in-new-sessions).
* **You resumed a session.** A session you resume with `claude --resume` or `--continue` usually [keeps the model it was using](#setting-your-model) rather than your current default.
