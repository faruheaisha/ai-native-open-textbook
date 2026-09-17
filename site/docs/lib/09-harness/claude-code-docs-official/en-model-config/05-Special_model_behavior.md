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
pageSha256: "7bb34b1787483ee1740888281c280006f29250892780e3cd9afbe8b97f528d4e"
contentMode: "local-full"
zh: ""
---

## Special model behavior

### `default` model setting

The behavior of `default` depends on your account type:

* **Max, Team Premium, Enterprise, and Anthropic API**: defaults to Opus 5
* **Claude Platform on AWS, Amazon Bedrock, and Google Cloud's Agent Platform**: defaults to Opus 5
* **Pro and Team Standard**: defaults to Sonnet 5
* **Microsoft Foundry**: defaults to Sonnet 4.5

Before v2.1.219, `default` resolved to Opus 4.8 on the Anthropic API, Max, Team Premium, and Enterprise pay-as-you-go from v2.1.154, and on Claude Platform on AWS, Amazon Bedrock, and Google Cloud's Agent Platform from v2.1.207. Before v2.1.207, `default` resolved to Opus 4.7 on Claude Platform on AWS and to Sonnet 4.5 on Amazon Bedrock and Google Cloud's Agent Platform.

When an admin has set an [organization default model](#organization-default-model), `default` resolves to that model instead of the account-type default above. Requires Claude Code v2.1.196 or later. `default` can also resolve to the model you set with [`ANTHROPIC_DEFAULT_MODEL`](#set-a-default-model-for-new-sessions), under the conditions listed in its section.

When managed settings [enforce the allowlist for the Default model](#enforce-the-allowlist-for-the-default-model) and the account-type default is not in `availableModels`, `default` resolves to the enforced Default instead of the account-type default above. When both apply, the organization default replaces the account-type default first and enforcement then applies to it: an allowlisted organization default is kept, while one outside the list resolves to the enforced Default.

Fable models are not the account-type default on any plan or provider. Choosing one with `/model` saves it as the selected model in your user settings, so later sessions start on it. For the one-time change Claude Code makes to a saved Fable 5 selection in v2.1.257, see [Work with Fable](#work-with-fable).

### `opusplan` model setting

The `opusplan` model alias provides an automated hybrid approach:

* **In plan mode**: uses `opus` for complex reasoning and architecture decisions
* **In execution mode**: automatically switches to `sonnet` for code generation and implementation

This pairs Opus's reasoning for planning with Sonnet's efficiency for execution.

The plan-mode Opus phase uses the same context window as the `opus` model setting. On subscription tiers where Opus is [automatically upgraded to 1M context](#extended-context), `opusplan` receives the upgrade in plan mode as well. To force 1M context for both phases when you aren't on an auto-upgrade tier, [set the model](#setting-your-model) to `opusplan[1m]`, for example with `/model opusplan[1m]`. Setting it with `/model` requires Claude Code v2.1.265 or later; on earlier versions, use the `--model` flag or the `model` setting instead.

When [`availableModels`](#restrict-model-selection) excludes the newest Opus but permits an older version, for example `["sonnet", "claude-opus-4-6"]`, `opusplan` uses the newest permitted Opus for planning and stays on Sonnet only when every Opus is excluded. A Haiku session that would normally upgrade to Sonnet in plan mode likewise uses the newest permitted Sonnet, and stays on Haiku only when every Sonnet is excluded. Before v2.1.205, plan mode stayed on the session's model whenever the newest version of the upgrade family was excluded, even when the allowlist permitted an older one.

The substitution of an older permitted version applies on the Anthropic API and [Claude Platform on AWS](https://code.claude.com/docs/en/claude-platform-on-aws). On Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, and Mantle, whose deployments use provider-specific model IDs, plan mode stays on the session's model whenever the upgrade model is excluded.

For a hybrid approach where Claude decides mid-task when to consult a second model rather than switching at the plan boundary, see the [advisor tool](https://code.claude.com/docs/en/advisor).

### Fallback model chains

When the primary model is overloaded, unavailable, or returns another non-retryable server error, Claude Code can switch to a fallback model instead of failing the request. Authentication, billing, rate-limit, request-size, and transport errors, and a [denial by your organization's policy check](https://code.claude.com/docs/en/errors#automatic-retries), never trigger a switch; those follow their normal retry and error handling.

Configure one or more fallback models and Claude Code tries them in order, showing a notice when it switches. The switch lasts for the current turn only, so your next message tries the primary model first again. Claude Code caps chains at three models after duplicate removal and ignores extra entries.

Set a chain for one session with the `--fallback-model` flag, which accepts a comma-separated list:

```bash theme={null}
claude --fallback-model sonnet,haiku
```

To persist a chain across sessions, set `fallbackModel` in [settings](https://code.claude.com/docs/en/settings) as an array:

```json theme={null}
{
  "fallbackModel": ["claude-sonnet-5", "claude-haiku-4-5"]
}
```

The `--fallback-model` flag takes precedence over the `fallbackModel` setting. Each entry accepts a model name or alias, and `"default"` expands to the default model.

Claude Code doesn't confirm the chain at startup and `/status` doesn't display it. The notice shown when a switch happens is the first visible sign that a fallback is configured.

When a request fails over, Claude Code tries each entry in order until one accepts it. An entry that can't be reached either, such as a retired model pinned in settings, fails over to the next one the same way. Claude Code removes two kinds of entry before that walk starts:

* **Outside the allowlist**: Claude Code drops any entry not permitted by [`availableModels`](#restrict-model-selection) when it reads the chain.
* **Smaller context window during compaction**: the chain also covers [compaction](https://code.claude.com/docs/en/context-window#what-survives-compaction), but Claude Code won't fall back to a model with a smaller context window than the primary's, since summarizing there would cut off part of the conversation first. If every fallback is smaller, compaction shows the original error and you can retry.

Claude Code also applies the chain to [subagents](https://code.claude.com/docs/en/sub-agents). When a subagent's request fails over, Claude Code tries your configured fallback models in order, and the subagent continues on the model that accepts the request. Your session's model is unchanged. Before v2.1.247, a failure the chain covers ended the subagent instead.

### Automatic model fallback

This section covers content-based fallback from Fable models and Opus 5. For availability-based fallback when a model is overloaded or unavailable, see [Fallback model chains](#fallback-model-chains).

Fable models and Opus 5 run with safety classifiers, which most often flag cybersecurity and biology content. When a classifier flags a request and the flagged category has a fallback model, Claude Code re-runs the request on that model and shows a notice in the transcript. For those two categories, the fallback model depends on which model refused:

* **Fable 5.1 and Fable 5**: biology-flagged requests re-run on Opus 5, and cybersecurity-flagged requests re-run on Opus 4.8.
* **Opus 5**: cybersecurity-flagged requests re-run on Opus 4.8. Biology-flagged requests end with a refusal instead, because Opus 5 runs its own biology classifiers with no fallback model.

On Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry, Claude Code resolves these targets through your deployment instead, and if you set `ANTHROPIC_DEFAULT_OPUS_MODEL`, categories that have a fallback re-run on the pinned model; see [Enable fallback on Bedrock, Agent Platform, and Foundry](#enable-fallback-on-bedrock-agent-platform-and-foundry).

After a fallback, the session continues on the fallback model. To return to your original model, run [`/model`](#setting-your-model).

Category-based fallback requires Claude Code v2.1.219 or later. Before v2.1.219, every flagged Fable 5 request re-ran on your provider's default Opus model, and Opus 5 was not a fallback source.

The fallback model is checked against [`availableModels`](#restrict-model-selection). When it is blocked, no fallback occurs. The refusal is shown as a normal error and the session's model is unchanged.

#### Check what triggered fallback

Fallback can trigger on the first request of a session, before you send anything unusual, because the first request carries workspace context such as your CLAUDE.md content and git status. A repository that contains security or biology material can trip the classifier on that context alone.

To check whether customizations are the trigger, start a session with `claude --safe-mode`, which disables customizations such as CLAUDE.md, skills, MCP servers, and hooks. Git status and directory names are not customizations and are still included.

#### Ask before switching

To decide what happens each time a request is flagged, rather than switching automatically, run `/config` and turn off **Switch models when a message is flagged**, or set [`switchModelsOnFlag`](https://code.claude.com/docs/en/settings-reference#switchmodelsonflag) to `false` in your settings file. A flagged request then pauses the session with two options: switch to the fallback model, or edit the prompt and retry on the current model.

Some cases behave differently:

* When the flagged category has no fallback model, such as a biology flag on Opus 5, Claude Code doesn't show the prompt and the request ends with the refusal.
* If both models flag the same request, you can edit the prompt and retry, or start a new session.
* On mobile [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) sessions, editing and retrying is not supported. Switch models, or continue the session from a desktop browser or the desktop app.
* In [non-interactive mode](https://code.claude.com/docs/en/cli-reference#cli-flags) and SDK integrations that can't show the prompt, a flagged request ends the turn with a refusal instead.
* When the fallback target is blocked by [`availableModels`](#restrict-model-selection), Claude Code doesn't show the prompt. The flagged request ends with the refusal, the same as automatic fallback when the target is blocked.

#### Enable fallback on Bedrock, Agent Platform, and Foundry

On [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock), [Google Cloud's Agent Platform](https://code.claude.com/docs/en/google-vertex-ai), and [Microsoft Foundry](https://code.claude.com/docs/en/microsoft-foundry), model IDs are provider-specific, so automatic fallback only operates when Claude Code can identify both models involved:

* Claude Code must recognize the current model as a fallback source. Fable 5.1 and Fable 5 are recognized when the model ID contains `claude-fable-5`, matches the value of `ANTHROPIC_DEFAULT_FABLE_MODEL`, or is mapped with [`modelOverrides`](#override-model-ids-per-version). Opus 5 is recognized by its provider model ID or a [`modelOverrides`](#override-model-ids-per-version) mapping.
* The fallback model must resolve in your deployment. If you set `ANTHROPIC_DEFAULT_OPUS_MODEL`, flagged requests re-run on that model for every category that has a fallback; a biology flag on Opus 5 still ends with a refusal. If you don't set it, cybersecurity-flagged requests re-run on an Opus 4.8 entry in the provider's model list, and biology-flagged requests from a Fable model on an Opus 5 entry.

If either model can't be identified, Claude Code does not switch automatically. The flagged request ends with a refusal message, and you can switch models with [`/model`](#setting-your-model) and retry. Setting `ANTHROPIC_DEFAULT_FABLE_MODEL` to your Fable model ID enables Fable recognition. Setting `ANTHROPIC_DEFAULT_OPUS_MODEL` to an Opus model ID gives the flagged categories a fallback target, unless the pin names a model outside the Opus family or the model that refused; then Claude Code doesn't switch and the refusal stands.

#### Security research and biology workloads

Workloads in offensive security or biology, including penetration testing, Capture the Flag (CTF) exercises, and biology-adjacent codebases, trigger fallback frequently, often on the first request. For substantive biology work on Fable 5.1 or Fable 5, Claude Code moves the session to Opus 5 at the first flagged request, and later biology-flagged requests end in refusals there, because Opus 5 has no biology fallback. On Opus 5, you get those refusals from the first flagged request.

This is expected routing for these domains, not an account flag. If your organization needs Fable-class capability for this work, ask your Anthropic account team about trusted access programs.

### Adjust effort level

[Effort levels](https://platform.claude.com/docs/en/build-with-claude/effort) control adaptive reasoning, which lets the model decide whether and how much to think on each step based on task complexity. Lower effort is faster and cheaper for straightforward tasks, while higher effort provides deeper reasoning for complex problems.

The available effort levels depend on the model. Models not listed here do not support effort:

| Model                                    | Levels                                  |
| :--------------------------------------- | :-------------------------------------- |
| Fable 5.1 and Fable 5                    | `low`, `medium`, `high`, `xhigh`, `max` |
| Opus 5, Sonnet 5, Opus 4.8, and Opus 4.7 | `low`, `medium`, `high`, `xhigh`, `max` |
| Opus 4.6 and Sonnet 4.6                  | `low`, `medium`, `high`, `max`          |

If you set a level the active model does not support, Claude Code falls back to the highest supported level at or below the one you set. For example, `xhigh` runs as `high` on Opus 4.6. Your organization or your own settings can also cap the levels a model offers; see [Organization effort limits](#organization-effort-limits).

With the [`ultracode`](https://code.claude.com/docs/en/settings-reference#ultracode) setting off, Claude Code resolves the session's effort level in this order, taking the first that applies:

1. An explicit choice: the [`CLAUDE_CODE_EFFORT_LEVEL`](https://code.claude.com/docs/en/env-vars#variables) environment variable, launching with `--effort`, or `/effort` in the session ([a non-interactive `/effort` has narrower effect](#non-interactive-effort))
2. The model's default effort, on Fable 5, Opus 4.8, or Opus 4.7: from the first time you run one of these models, Claude Code holds that model's default effort across sessions, even when your settings resolve a different level. Opus 5 and Fable 5.1 have no such hold. Whether a level you set ends the hold depends on how you set it, for example:
   * **Ends the hold**: confirming a level interactively, with `Enter` in the `/effort` slider or the `/model` picker or with a level typed after `/effort`, or picking a level from a connected device's [Remote Control](https://code.claude.com/docs/en/remote-control#what-connected-devices-see) effort control
   * **Leaves the hold in place for later sessions**: `--effort` at launch, or `s` in the `/effort` slider or the `/model` picker
3. Your settings: the level you saved for the model or an [`effortLevel`](https://code.claude.com/docs/en/settings-reference#effortlevel) key, with the precedence between them and across settings files stated at [`modelSettings`](https://code.claude.com/docs/en/settings-reference#modelsettings)
4. The model's default effort: `high` on every model that supports effort, except that Opus 4.7 defaults to `xhigh` and, when your organization sets a default effort level for its [organization default model](#organization-default-model), that level is the default when you run that model

When you set `low`, `medium`, `high`, or `xhigh` in an interactive session on your machine, you choose how long it lasts by how you confirm it:

* `Enter` in the `/effort` slider or the `/model` picker, or a level typed after `/effort`: save the level as your default and apply it in later sessions
* `s` in the `/effort` slider or the `/model` picker: apply the level to this session only. Requires Claude Code v2.1.257 or later

Claude Code saves the level per model, under the [`modelSettings`](https://code.claude.com/docs/en/settings-reference#modelsettings) key in your user settings, so each model keeps its own saved level.

`max` is the deepest reasoning level. Unless you set it through the `CLAUDE_CODE_EFFORT_LEVEL` environment variable, Claude Code applies `max` to the current session only.

  A level you pick from the effort control on a phone or browser connected through [Remote Control](https://code.claude.com/docs/en/remote-control#what-connected-devices-see) applies to that session only.

&lt;span id="non-interactive-effort" />

When you set a level with `/effort` in a [`-p` run](https://code.claude.com/docs/en/headless), Claude Code applies it to that session only and doesn't save it as your default. On Fable 5, Opus 4.8, and Opus 4.7, that level also neither ends the hold on the model's default effort nor overrides it for the session. While that hold is in effect, a non-interactive `/effort` reports `Not applied`, so pass `--effort` at launch instead.

The `/effort` menu also offers `ultracode`. Ultracode is a Claude Code setting rather than a model effort level: it sends `xhigh` to the model and additionally has Claude orchestrate [dynamic workflows](https://code.claude.com/docs/en/workflows) for substantive tasks. For where it can be set persistently, see the [`ultracode`](https://code.claude.com/docs/en/settings-reference#ultracode) setting.

You can turn on ultracode through any of the following:

* **`/effort`**: run `/effort ultracode`, or select it from the menu
* **`--effort` flag**: launch with `claude --effort ultracode`, which starts the session at `xhigh` effort with ultracode on
* **`ultracode` setting**: set [`"ultracode": true`](https://code.claude.com/docs/en/settings-reference#ultracode) in a settings file, with `--settings`, or in an Agent SDK control request. An [`applyFlagSettings()`](https://code.claude.com/docs/en/agent-sdk/typescript#applyflagsettings) request also accepts `effortLevel: "ultracode"`
* **`/model` picker**: move the effort slider to `ultracode` with the arrow keys while you choose a model. Claude Code turns it on for the current session, even when you save that model as your default

Passing `ultracode` to the `--effort` flag or the Agent SDK `effortLevel` value requires Claude Code v2.1.203 or later. Before v2.1.203, `--effort ultracode` printed `Unknown --effort value 'ultracode'` and the session started at the default effort.

The persisted `effortLevel` setting and the `CLAUDE_CODE_EFFORT_LEVEL` environment variable don't accept `ultracode`. When `CLAUDE_CODE_EFFORT_LEVEL` is set to a level other than `xhigh`, requests run at that level and ultracode's workflow orchestration stays inactive. Selecting ultracode then shows a warning that the environment variable overrides effort for the session.

&lt;span id="when-ultracode-is-available" />

Ultracode is unavailable when:

* [Workflows are turned off](https://code.claude.com/docs/en/workflows#turn-workflows-off)
* The model doesn't support `xhigh` effort
* An [effort cap](#organization-effort-limits) below `xhigh` applies to the model

In those cases `--effort ultracode` starts the session with ultracode off, at the highest effort level the model and any cap allow, up to `xhigh`.

#### Choose an effort level

Each level trades token spend against capability. The default suits most coding tasks; adjust when you want a different balance.

| Level       | When to use it                                                                                                                         |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `low`       | Reserve for short, scoped, latency-sensitive tasks that are not intelligence-sensitive                                                 |
| `medium`    | Reduces token usage for cost-sensitive work that can trade off some intelligence                                                       |
| `high`      | Balances token usage and intelligence. The default on every model except Opus 4.7                                                      |
| `xhigh`     | Deeper reasoning at higher token spend. The default on Opus 4.7                                                                        |
| `max`       | Can improve performance on demanding tasks but may show diminishing returns and is prone to overthinking. Test before adopting broadly |
| `ultracode` | A Claude Code setting that plans a [dynamic workflow](https://code.claude.com/docs/en/workflows) for each substantive task with `xhigh` per-message reasoning      |

The effort scale is calibrated per model, so the same level name does not represent the same underlying value across models.

#### Use ultrathink for one-off deep reasoning

Include `ultrathink` anywhere in your prompt to request deeper reasoning on that turn without changing your session effort setting. Claude Code recognizes the keyword and adds an in-context instruction. The effort level sent to the API is unchanged. Claude Code passes other phrases such as "think", "think hard", and "think more" through as ordinary prompt text and doesn't recognize them as keywords.

#### Set the effort level

You can change effort through any of the following:

* **`/effort`**: run `/effort` with no arguments to open an interactive slider, `/effort` followed by a level name to set it directly, or `/effort auto` to clear your saved level for the active model. You can run it while Claude is working, and once you confirm the [cache warning](https://code.claude.com/docs/en/prompt-caching#changing-effort-level), if Claude Code shows one, Claude Code applies the new level to the next request in the turn
* **In `/model`**: use left/right arrow keys to adjust the effort slider when selecting a model
* **`--effort` flag**: pass a level name to set it for a single session when launching Claude Code
* **Environment variable**: set `CLAUDE_CODE_EFFORT_LEVEL` to a level name or `auto`
* **Settings**: set a per-model level in [`modelSettings`](https://code.claude.com/docs/en/settings-reference#modelsettings), or set [`effortLevel`](https://code.claude.com/docs/en/settings-reference#effortlevel) to `low`, `medium`, `high`, or `xhigh` as the default for models without one. `max` isn't accepted as a level in either key, and `ultracode` has its own [`ultracode`](https://code.claude.com/docs/en/settings-reference#ultracode) key
* **From a connected device**: in a [Remote Control](https://code.claude.com/docs/en/remote-control#what-connected-devices-see) session, pick a level from the effort control on your phone or in your browser. The level applies to the current session only, though it also ends the [hold on the model's default effort](#adjust-effort-level). Requires Claude Code v2.1.234 or later
* **Skill and subagent frontmatter**: set `effort` in a [skill](https://code.claude.com/docs/en/skills#frontmatter-reference) or [subagent](https://code.claude.com/docs/en/sub-agents#supported-frontmatter-fields) markdown file to override the effort level when that skill or subagent runs

Frontmatter effort applies when that skill or subagent is active, overriding the session level but not the environment variable. A [`maxEffortLevel`](https://code.claude.com/docs/en/settings-reference#maxeffortlevel) or [organization effort cap](#organization-effort-limits) still limits the level the skill or subagent runs at.

On Fable 5, Opus 4.8, and Opus 4.7, frontmatter effort also applies while the [hold on the model's default effort](#adjust-effort-level) is in effect. Before v2.1.267, the hold took precedence and Claude Code ignored the frontmatter level while the hold was active.

If you set `effortLevel` in [managed settings](https://code.claude.com/docs/en/managed-settings), Claude Code applies it at the settings step of the [effort resolution order](#adjust-effort-level), and users can still change the level with `/effort` or `--effort`. To keep users at or below a level, set [`maxEffortLevel`](https://code.claude.com/docs/en/settings-reference#maxeffortlevel).

The effort slider appears in `/model` when a supported model is selected. The current effort level is also shown in the session header next to the model name, for example "with low effort", so you can confirm which setting is active without opening `/model`. The footer also briefly shows the effort level at startup and when it changes.

#### Adaptive reasoning and fixed thinking budgets

Adaptive reasoning makes thinking optional on each step, so Claude can respond faster to routine prompts and reserve deeper thinking for steps that benefit from it. If you want Claude to think more or less often than the current level produces, you can say so directly in your prompt or in `CLAUDE.md`; the model responds to that guidance within its effort setting.

Fable models, Sonnet 5, and Opus 4.7 and later always use adaptive reasoning. The fixed thinking budget mode and `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` don't apply to them.

On Opus 4.6 and Sonnet 4.6, you can set `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1` to revert to the previous fixed thinking budget controlled by `MAX_THINKING_TOKENS`. See [environment variables](https://code.claude.com/docs/en/env-vars).

### Extended thinking

Extended thinking is the reasoning Claude emits before responding. On models that support [adaptive reasoning](#adjust-effort-level), the effort level is the primary control for how much thinking happens; the settings below turn thinking on or off and control how it displays. With thinking turned off on the Anthropic API, Claude Code sends effort `high` instead of a higher level to models it knows [don't accept that combination](https://code.claude.com/docs/en/errors#effort-isnt-available-with-thinking-turned-off), such as Opus 5.

| Control                                 | How to set it                                                                                                                                                                                                                                                                                                                                                                          |
| :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Toggle for the current session          | Press `Option+T` on macOS or `Alt+T` on Windows and Linux                                                                                                                                                                                                                                                                                                                              |
| Set the global default                  | Run `/config` and toggle thinking mode. Saved as `alwaysThinkingEnabled` in `~/.claude/settings.json`                                                                                                                                                                                                                                                                                  |
| Disable through an environment variable | Set [`MAX_THINKING_TOKENS=0`](https://code.claude.com/docs/en/env-vars), which turns thinking off on the Anthropic API except on Fable models. On [third-party providers](https://code.claude.com/docs/en/third-party-integrations), Claude Code omits the `thinking` parameter instead, and adaptive-reasoning models may still think. Other values apply only with a [fixed thinking budget](#adaptive-reasoning-and-fixed-thinking-budgets) |

You can't turn thinking off on Fable models. The session toggle, `alwaysThinkingEnabled`, and `MAX_THINKING_TOKENS=0` have no effect there, and a Fable model decides per step how much to think based on the effort level.

Claude Code collapses thinking output by default. Press `Ctrl+O` to toggle verbose mode and see the reasoning as gray italic text. Interactive sessions on the Anthropic API receive redacted thinking blocks by default, so set `showThinkingSummaries: true` in [settings](https://code.claude.com/docs/en/settings) if you want the full summaries available when you expand. You are charged for all thinking tokens generated, even when collapsed or redacted.

### Extended context

Fable 5.1, Fable 5, Sonnet 5, Opus 4.6 and later, and Sonnet 4.6 support a [1 million token context window](https://platform.claude.com/docs/en/build-with-claude/context-windows#context-window-sizes-by-model) for long sessions with large codebases.

Availability varies by model and plan. On the Anthropic API, Fable 5.1, Fable 5, Sonnet 5, and Opus 4.7 and later run with the 1M window by default.

On Max, Team, and Enterprise plans, including both Team Standard and Team Premium seats, Opus is automatically upgraded to 1M context with no additional configuration. Sonnet 4.6 with 1M context is not part of the automatic upgrade and requires [usage credits](https://support.claude.com/en/articles/12429409-extra-usage-for-paid-claude-plans) on every subscription plan, including Max.

| Plan                      | Opus with 1M context                                                                                        | Sonnet 4.6 with 1M context                                                                                  |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Max, Team, and Enterprise | Included with subscription                                                                                  | Requires [usage credits](https://support.claude.com/en/articles/12429409-extra-usage-for-paid-claude-plans) |
| Pro                       | Requires [usage credits](https://support.claude.com/en/articles/12429409-extra-usage-for-paid-claude-plans) | Requires [usage credits](https://support.claude.com/en/articles/12429409-extra-usage-for-paid-claude-plans) |
| API and pay-as-you-go     | Full access                                                                                                 | Full access                                                                                                 |

Claude Code checks these plan requirements only when it connects to the Anthropic API directly. If you point `ANTHROPIC_BASE_URL` at an [LLM gateway](https://code.claude.com/docs/en/llm-gateway#subscriptions-and-gateways) and your saved claude.ai login stays the active credential, Claude Code doesn't check your plan's usage credits. The `[1m]` options stay available in `/model`, and the gateway decides whether the request succeeds. Before v2.1.229, Claude Code rejected `/model sonnet[1m]` in that configuration when it couldn't confirm usage credits on the account.

To turn off 1M context, set `CLAUDE_CODE_DISABLE_1M_CONTEXT=1`. Claude Code removes 1M model variants from the model picker. On models with a native 1M window, such as Sonnet 5 and the Fable models, it also treats the model as having a 200K context window:

* With auto-compaction on, sessions compact at the 200K boundary through [auto-compaction](#set-the-auto-compact-window). Setting the auto-compact window above 200K doesn't lift the hold, because Claude Code caps that window at the model's context window.
* With auto-compaction off, sessions stop at the 200K boundary with the [context-limit error](https://code.claude.com/docs/en/errors#prompt-is-too-long) instead of compacting.

Before v2.1.223, Claude Code held only Sonnet 5, Opus 4.8, and Opus 5 sessions to 200K. See [environment variables](https://code.claude.com/docs/en/env-vars).

The 1M context window uses standard model pricing with no premium for tokens beyond 200K. For plans where extended context is included with your subscription, usage remains covered by your subscription. For plans that access extended context through usage credits, tokens are billed to usage credits.

If your account supports 1M context, the option appears in the `/model` picker in the latest versions of Claude Code. If you don't see it, try restarting your session.

You can also use the `[1m]` suffix with model aliases or full model names:

```text theme={null}
# Use the opus[1m] or sonnet[1m] alias
/model opus[1m]
/model sonnet[1m]

# Or append [1m] to a full model name
/model claude-opus-4-8[1m]
```

#### Sonnet 5 context window

On the Anthropic API, Sonnet 5 always runs with the 1M context window. There is no 200K variant, no `[1m]` suffix to select, and no usage credits required on any plan. Sessions auto-compact before the window fills, at about 967K tokens by default; set [`CLAUDE_CODE_AUTO_COMPACT_WINDOW`](https://code.claude.com/docs/en/env-vars) to choose a different threshold.

Two configurations budget the window at 200K instead:

* **LLM gateway**: when `ANTHROPIC_BASE_URL` points at a [gateway](https://code.claude.com/docs/en/llm-gateway), Claude Code can't verify 1M support. To use the full window, select Sonnet 5 (1M context) in the model picker, which maps to `sonnet[1m]`.
* **`CLAUDE_CODE_DISABLE_1M_CONTEXT=1`**: holds sessions on every model with a native 1M window to a 200K window; see [Extended context](#extended-context) for how the hold is enforced. Useful for deployments that need to cap context.
