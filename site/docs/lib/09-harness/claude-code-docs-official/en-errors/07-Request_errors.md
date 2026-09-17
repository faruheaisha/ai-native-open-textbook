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
sourceRel: "en/errors.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/errors.md"
sourceSha256: "b8944f28bfea74456c2960ba67f375c1d39afd34fb474e956bea3d64744e6604"
pageSha256: "d9978aed30da559ea9b0e3a06904b349db31ce2979f61a9adbd28199c33ff807"
contentMode: "local-full"
zh: ""
---

## Request errors

These errors relate to the content of your request. Most come back from the API after it rejected the request; a few are produced locally by Claude Code before any request is sent.

### Prompt is too long

The conversation plus attached files exceeds the model's context window.

```text theme={null}
Prompt is too long
```

In an interactive session, Claude Code shows this error as:

```text theme={null}
Context limit reached · /compact or /clear to continue
```

The line names only `/clear` when [`DISABLE_COMPACT`](https://code.claude.com/docs/en/env-vars) is set. Longer forms of the error, such as the compaction-failed form below, keep the `Prompt is too long ·` wording. In `-p` output and the transcript, the text stays `Prompt is too long`.

When you turned auto-compact off in your [user settings](https://code.claude.com/docs/en/settings-reference#autocompactenabled), the line also says so:

```text theme={null}
Context limit reached · /compact or /clear to continue · auto-compact is off · /config to turn it on
```

The **Auto-compact** toggle in `/config` writes `autoCompactEnabled` to user settings. The hint appears only when a `/config` change would take effect. For example, it doesn't appear when [`DISABLE_AUTO_COMPACT`](https://code.claude.com/docs/en/env-vars) or [`DISABLE_COMPACT`](https://code.claude.com/docs/en/env-vars) turned auto-compact off. It also doesn't appear when a higher-precedence scope, such as project or managed settings, set `autoCompactEnabled` to `false`. Before v2.1.235, the line carried no auto-compact hint.

Amazon Bedrock reports this condition as `Input is too long for requested model.`, which Claude Code handles the same way. Before v2.1.217, Claude Code didn't recognize the Bedrock wording, so auto-compact never triggered on it and `/compact` failed with the same error.

A [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway-config#upstream-error-messages) reports this condition as `capability_rejected: prompt_too_long` when a cloud upstream rejects the request in the provider's own error shape. Claude Code treats the token the same as `Prompt is too long`. Before v2.1.228, Claude Code didn't recognize the token, so auto-compact didn't trigger on it.

When automatic compaction ran on this turn and failed on an underlying error, such as an unavailable model or an authentication failure, the message names that error after a separator:

```text theme={null}
Prompt is too long · automatic compaction failed: <the underlying error>
```

Resolve the named error first; `/compact` fails on the same error until you do. Before v2.1.229, a failed automatic compaction surfaced `Prompt is too long` without the cause.

A single-exchange conversation has no earlier turns to summarize. When automatic compaction would have run on one, Claude Code skips the attempt and explains what fills the request instead. When the API doesn't report token counts in its error, the message reads:

```text theme={null}
Prompt is too long · this conversation is a single exchange and cannot be compacted — the request size comes mostly from system prompt, tool definitions, or attachments.
```

When the API reports token counts in its error, Claude Code compares them with its own estimate of the conversation's size to tell which is most of the request: the conversation's own content, or the system prompt, tool definitions, and attachment content that Claude Code sends with it. When the conversation's own content is most of the request, the message reads:

```text theme={null}
Prompt is too long · the request is ~<request tokens> tokens (limit <limit>) and this conversation's own content is most of it. A single-exchange conversation cannot be compacted; start with less content (smaller files or pasted text).
```

When most of the request is outside the conversation, the message reads:

```text theme={null}
Prompt is too long · the request is ~<request tokens> tokens (limit <limit>) but this conversation is only ~<conversation tokens> tokens — the rest is system prompt, tool definitions, and attachment content. A single-exchange conversation cannot be compacted; reduce attached files/tools or start with less context.
```

Before v2.1.162, Claude Code attempted the compaction anyway and surfaced the bare `Prompt is too long` when it failed.

**What to do:**

* In a multi-turn conversation, run `/compact` to summarize earlier turns and free space, or `/clear` to start fresh. A single-exchange conversation can't be compacted, so shrink the request instead
* Run `/context` to see a breakdown of what is consuming the window: system prompt, tools, memory files, and messages
* Disable MCP servers you are not using with `/mcp disable <name>` to remove their tool definitions from context
* Trim large `CLAUDE.md` memory files, or move instructions into [path-scoped rules](https://code.claude.com/docs/en/memory#path-specific-rules) that load only when relevant
* Subagents inherit every MCP tool definition from the parent session, which can fill their context window before the first turn. Disable MCP servers you are not using before spawning subagents.
* Auto-compact is on by default and normally prevents this error. If you turned it off in `/config` or with [`DISABLE_AUTO_COMPACT`](https://code.claude.com/docs/en/env-vars), turn it back on. If you keep it off, run `/compact` yourself before the window fills.

See [Explore the context window](https://code.claude.com/docs/en/context-window) for an interactive view of how context fills up.

### Context exceeds the token limit

`/context` shows this warning at the top of its output when the conversation has grown past the model's context window. Requests fail with [`Prompt is too long`](#prompt-is-too-long) until you free space. An interactive session shows that error as the `Context limit reached` line.

```text theme={null}
Context exceeds the 200k-token limit by 94k tokens — run /compact or /clear to continue.
```

When the limit you exceeded is a compaction window smaller than the model's context window, such as the 200K boundary on 1M-context models, the warning reads differently. Requests still succeed past a compaction window; run the named command to bring usage back under it.

```text theme={null}
Context is 94k tokens past the 200k-token compaction window — run /compact to reduce usage.
```

Both forms name `/clear` instead of `/compact` when you have set [`DISABLE_COMPACT`](https://code.claude.com/docs/en/env-vars).

**What to do:**

* In a multi-turn conversation, run `/compact` to summarize earlier turns and free space. To start fresh instead, run `/clear`
* For more ways to reduce usage, see [Prompt is too long](#prompt-is-too-long)

Before v2.1.216, `/context` showed usage above 100% with no warning line explaining what that meant or how to recover.

### Error during compaction: Conversation too long

`/compact` itself failed because there is not enough free context to hold the summary it produces.

```text theme={null}
Error during compaction: Conversation too long. Press esc twice to go up a few messages and try again.
```

This can happen when the window is already full at the moment auto-compact triggers, or when you run `/compact` after seeing [`Prompt is too long`](#prompt-is-too-long). In an interactive session, that error is the `Context limit reached` line.

**What to do:**

* Press Esc twice to open the message list and step back several turns. This drops the most recent messages from context. Then run `/compact` again.
* If stepping back doesn't free enough space, run `/clear` to start a fresh session. Your previous conversation is preserved and can be reopened with `/resume`.

This message and other `/compact` failures display in error styling. Before v2.1.216, they rendered in the same dim style as successful command output, so you could read a failed compaction as a success.

### Request too large

The raw request body exceeded the API's 32MB limit before tokenization, usually because of large pasted content, tool results, or attachments. This limit is separate from the [context window](#prompt-is-too-long).

```text theme={null}
Request too large (max 32MB). Accumulated images and attachments in the conversation pushed the request over the limit. Run /compact, or double press esc to go back and remove attachments.
```

When the request went straight to the Claude API and the API itself rejected it, Claude Code measures the conversation and words the message by whether recovery can work. Through a proxy, gateway, or cloud provider you get the general message. The measured forms:

* `Request too large (max 32MB; 20.1MB of about 33.4MB is images or documents).`: images or documents pushed the request over the limit. Claude Code retries with them stripped.
* `Request too large for the API's 32MB request limit`: the messages alone are over the limit, so the message says `compacting cannot make it fit` and Claude Code doesn't retry. In [non-interactive mode](https://code.claude.com/docs/en/headless), the message tells you to reduce the input or start a new session instead.

Before v2.1.212, conversations with enough accumulated images failed on every turn with `Request too large (max 32MB). Double press esc to go back and try with a smaller file.` Before v2.1.229, Claude Code showed the attachment advice for every rejection, even when compacting couldn't help.

**What to do:**

* If the message says `compacting cannot make it fit`, press Esc twice to step back past the turn that added the large content, or run `/clear` to start fresh
* Otherwise, run `/compact`, which drops accumulated images and attachments
* Reference large files by path instead of pasting their contents, so Claude can read them in chunks
* For images, see [Image was too large](#image-was-too-large) below

### Image was too large

A pasted or attached image exceeds the API's size or dimension limits.

```text theme={null}
Image was too large. Double press esc to go back and try again with a smaller image.
API Error: 400 ... image dimensions exceed max allowed size
```

Claude Code replaces the unprocessable image with a text placeholder and retries, so subsequent messages succeed. On versions before 2.1.142, a pasted image could remain in the conversation and repeat the same error on every subsequent message. To recover on those versions, press Esc twice and step back past the turn where the image was added.

**What to do:**

* Resize the image before pasting. The API accepts images up to 8000 pixels on the longest edge for a single image, or 2000 pixels when many images are in context.
* Take a tighter screenshot of the relevant region instead of the full screen

### Unable to resize image

Claude Code couldn't downscale an attached image before sending it to the API.

```text theme={null}
Unable to resize image — image processing is unavailable and dimensions could not be read from the file header. Please convert the image to PNG, JPEG, GIF, or WebP.
Unable to resize image — dimensions exceed the 2000x2000px limit and image processing failed. Please resize the image to reduce its pixel dimensions.
Unable to resize image (… raw, … base64). The image exceeds the … API limit and compression failed. Please resize the image manually or use a smaller image.
Unable to resize image — could not verify image dimensions are within the 2000x2000px API limit.
Unable to resize image — it is a CMYK JPEG, which Claude Code cannot decode, and at …px it is over the 2000x2000px limit, so it cannot be sent. Re-save it as an RGB PNG or JPEG and try again.
Unable to resize image — it is an animated WebP whose first frame Claude Code cannot decode, and at …px it is over the 2000x2000px limit, so it cannot be sent. Save its first frame as a PNG or JPEG and try again.
Unable to resize image — its pixels could not be decoded (the file may be damaged, or use an encoding Claude Code cannot read), and it is over the … API limit (… raw, … base64), so it cannot be sent. Re-save it as a PNG or JPEG and try again.
```

Claude Code normally resizes large images automatically. These errors mean the image couldn't be decoded or resized to fit within the API limits.

**What to do:**

* If the message asks you to convert the image, convert it to PNG, JPEG, GIF, or WebP and attach it again. Claude Code can verify dimensions for these formats from the file header, without decoding the image.
* If the message reports a dimension or size limit, resize or recompress the image below that limit before attaching.
* If the message names a cause, such as a CMYK JPEG, an animated WebP, or a possibly damaged file, re-save the image in the format the message suggests and attach it again.

### PDF errors

The PDF you attached couldn't be processed. The messages are shown here in their non-interactive form; in an interactive session they instead prompt you to double press esc and try again.

```text theme={null}
PDF too large (max 100 pages, 20MB). Try reading the file a different way (e.g., extract text with pdftotext).
PDF is password protected. Try using a CLI tool to extract or convert the PDF.
The PDF file was not valid. Try converting it to text first (e.g., pdftotext).
```

**What to do:**

* For oversized PDFs, ask Claude to read a page range with the Read tool instead of attaching the whole file, or extract text with a tool like `pdftotext` and reference the output file by path
* For protected or invalid PDFs, remove the password or re-export the file from its source application, then try again

### Extra inputs are not permitted

A proxy or LLM gateway between Claude Code and the API stripped the `anthropic-beta` request header, so the API rejected fields that depend on it.

```text theme={null}
API Error: 400 ... Extra inputs are not permitted ... context_management
API Error: 400 ... Unexpected value(s) for the `anthropic-beta` header
```

Claude Code sends beta-only fields such as `context_management` and `effort` alongside an `anthropic-beta` header that enables them. When a gateway forwards the body but drops the header, the API sees fields it doesn't recognize.

**What to do:**

* Configure your gateway to forward the `anthropic-beta` header. See [feature pass-through](https://code.claude.com/docs/en/llm-gateway-protocol#feature-pass-through) for what gateways must forward.
* As a fallback, set [`CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1`](https://code.claude.com/docs/en/env-vars) before launching. [Disable pre-release capabilities](https://code.claude.com/docs/en/llm-gateway-protocol#disable-pre-release-capabilities) covers the exact scope.

### Tool input schema is invalid

A tool in the request declared an `input_schema` that fails the API's JSON Schema validation, so the API rejected the whole request. The number after `tools.` is the failing tool's position in the request's tool list, not a name you can look up.

```text theme={null}
API Error: 400 ... tools.N.custom.input_schema: JSON schema is invalid
API Error: 400 ... tools.N.custom.input_schema.properties: Property keys should match pattern '^[a-zA-Z0-9_.-]{1,64}$'
```

The first form means the schema isn't valid JSON Schema draft 2020-12. The second means a top-level property name doesn't match the pattern the message quotes.

Claude Code [excludes MCP tools whose input schema would fail this validation](https://code.claude.com/docs/en/mcp#tools-with-invalid-input-schemas) when it loads a server's tools, so requests normally never include one.

On a [deployment where flag fetching is off](https://code.claude.com/docs/en/env-vars#features-that-need-feature-flag-fetching), or on a machine whose flags have never arrived, Claude Code records in the server's log which tool would be rejected but sends it anyway, so this error can still occur.

The error can also occur for a tool whose schema declares a JSON Schema dialect other than draft 2020-12 in `$schema`. Claude Code doesn't check those schemas against the JSON Schema meta-schema, though the top-level property-name check still applies.

Before v2.1.216, no deployment ran the exclusion checks.

**What to do:**

* If your Claude Code version is earlier than v2.1.216, run `claude update`.
* Remove or [disable](https://code.claude.com/docs/en/mcp#disable-a-server-without-removing-it) the MCP server that declares the invalid schema. The error names the tool only by position. On v2.1.216 or later, check each server's log for a line naming a tool whose input schema would be rejected. If no log names one, disable servers one at a time.
* If you maintain the server, fix the tool's `input_schema`. The schema must be valid JSON Schema, and top-level property names must be 1 to 64 characters long and use only ASCII letters and digits, `_`, `.`, and `-`. See [Tools with invalid input schemas](https://code.claude.com/docs/en/mcp#tools-with-invalid-input-schemas).

<h3 id="theres-an-issue-with-the-selected-model">
  There's an issue with the selected model
</h3>

The configured model name was not recognized or your account lacks access to it. As of v2.1.160 the trailing hint, shown here in its interactive form, varies by surface.

```text theme={null}
There's an issue with the selected model (claude-...). It may not exist or you may not have access to it. Run /model to pick a different model.
```

**What to do:**

* **Interactive CLI**: run `/model` to pick from models available to your account.
* **Non-interactive mode (`-p`)**: pass `--model` with a valid alias or ID, or set [`ANTHROPIC_MODEL`](https://code.claude.com/docs/en/env-vars). The error text shows `Run --model` on this surface.
* **Agent SDK**: the error text omits the hint because the model is set programmatically. Set [`model` on `Options`](https://code.claude.com/docs/en/agent-sdk/typescript#options) in TypeScript or [`ClaudeAgentOptions(model=...)`](https://code.claude.com/docs/en/agent-sdk/python#claudeagentoptions) in Python, and handle the structured `model_not_found` error to surface your own retry or model picker.
* Use an alias such as `sonnet` or `opus` instead of a full versioned ID. Aliases resolve to a maintained default so they don't go stale. See [Model configuration](https://code.claude.com/docs/en/model-config).
* If the wrong model keeps coming back in the CLI, a stale ID is set somewhere. Check the places you can set a model in [priority order](https://code.claude.com/docs/en/model-config#setting-your-model) and remove the stale value.
* A newly launched model can be available on the Anthropic API before Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry offers it. If you pinned a new model ID on one of those providers and see this error, check your provider's model catalog for availability in your region, and keep the previous version pinned until the new one appears there.
* Claude Code reports an expired claude.ai login as [Login expired](#login-expired), not as this error. Before v2.1.206, an expired login that could no longer be refreshed failed every model with this error; run `/login` if you see that on an older version.
* For Google Cloud's Agent Platform deployments, see [Google Cloud's Agent Platform troubleshooting](https://code.claude.com/docs/en/google-vertex-ai#troubleshooting).

### Model is not a recognized model id

The model string you passed to a model switch isn't a model alias, a model ID this Claude Code version knows, or an ID that starts with `claude-`. The usual causes are a typo in the ID, a display name such as `Sonnet 5` where the ID `claude-sonnet-5` is expected, or an alias that only newer Claude Code versions recognize. Claude Code rejects the switch immediately. Before v2.1.200, Claude Code saved the string and failed on the next request with [There's an issue with the selected model](#theres-an-issue-with-the-selected-model).

```text theme={null}
Model "claud-sonnet-5" is not a recognized model id. Did you mean 'claude-sonnet-5'?
```

The trailing hint names the closest matching alias or model ID. When nothing is close enough, it reads `Run /model to see available models.` instead.

Claude Code produces this error locally at the moment the switch is requested, before any API request is made. It applies when a model is set through the [Agent SDK](https://code.claude.com/docs/en/agent-sdk/typescript) `setModel()` method, by an app such as the [Desktop app](https://code.claude.com/docs/en/desktop) that runs the Claude Code CLI for you, or when you pick a model from a device connected through [Remote Control](https://code.claude.com/docs/en/remote-control). Before v2.1.260, the check didn't cover Remote Control picks, so Claude Code applied the pick and the next request failed with [There's an issue with the selected model](#theres-an-issue-with-the-selected-model).

**What to do:**

* Run `/model` with no argument to open the picker and choose from the models available to your account, then pass the alias or ID shown there
* If you used an alias that a newer Claude Code version supports, run `claude update`. A full ID that starts with `claude-` passes this local check even when the model is newer than your Claude Code version. The server can still require a minimum version for that model; see [Claude Code does not support this model](#claude-code-does-not-support-this-model).
* A model saved before v2.1.200 isn't repaired by this check. If a stale value keeps coming back, remove it from the locations listed under [Setting your model](https://code.claude.com/docs/en/model-config#setting-your-model).
* The check runs only on the Anthropic API. On any other provider or gateway, including a custom `ANTHROPIC_BASE_URL`, the provider defines the model names, so Claude Code accepts any string and passes it through. Claude Code can still write the [unrecognized-model diagnostic line](#unrecognized-model-id-on-a-request) at request time, on every provider.

### Model not found

You picked a model with `/model <name>` and Claude Code couldn't confirm that a model with that name exists. When the name isn't a [model alias](https://code.claude.com/docs/en/model-config#model-aliases) or another spelling Claude Code accepts locally, `/model` verifies it with a minimal API request, and this error is usually your API endpoint's answer. A name that can't be a model ID at all, such as one containing spaces, gets the same message.

```text theme={null}
Model 'claude-opus-9' not found
```

On providers with provider-specific model IDs, the message may add a `Try '...' instead` suggestion that names your provider's ID for a fallback model.

**What to do:**

* Run `/model` with no argument and pick from the models available to your account, or use a [model alias](https://code.claude.com/docs/en/model-config#model-aliases) such as `sonnet`, which resolves to a maintained default
* If you typed a full ID, check it against your provider's model catalog. A newly launched model can be available on the Anthropic API before your provider or region offers it.
* Before v2.1.265, `/model` also rejected the `opusplan[1m]` alias spelling with this error. On those versions, update Claude Code, or set the model in [settings](https://code.claude.com/docs/en/model-config#setting-your-model) or with `--model` instead.

### Claude Opus is not available with the Claude Pro plan

Your active subscription plan does not include the model you selected.

```text theme={null}
Claude Opus is not available with the Claude Pro plan. If you have updated your subscription plan recently, run /logout and /login for the plan to take effect.
```

**What to do:**

* Run `/model` and select a model your plan includes
* If you upgraded your plan recently and still see this, run `/logout` then `/login`. The stored token reflects your plan at the time you signed in, so upgrading on the web does not take effect in an existing session until you re-authenticate.
* See [claude.com/pricing](https://claude.com/pricing) for which models each plan includes

### Claude Code does not support this model

The API refused the request with a 400 because your Claude Code version is below a required minimum. Either the model you selected requires a newer version, which the server checks per model, or your organization's policy requires one. The 400 carries the error code `claude_code_version_too_old`, and the message says which minimum applies.

```text theme={null}
API Error: 400 Claude Code 2.1.219 does not support this model; version 2.1.255 or newer is required. Run 'claude update', or update the Claude desktop app, then try again.
```

The organization-policy wording reads:

```text theme={null}
API Error: 400 Claude Code 2.1.240 is older than the minimum version required by your organization's policy. Run 'claude update', or update the Claude desktop app, to continue.
```

**What to do:**

* Run `claude update`, or update the Claude desktop app, then start a new session
* For the per-model wording, you can keep working in the current session by switching to another model with `/model`
* For the organization-policy wording, update before you continue

<h3 id="model-is-restricted-by-your-organizations-settings">
  Model is restricted by your organization's settings
</h3>

Your organization admin has disabled this model in the claude.ai admin console, or it is excluded by an [`availableModels`](https://code.claude.com/docs/en/model-config#restrict-model-selection) allowlist in managed settings. When the restricted model was set with `--model`, `ANTHROPIC_MODEL`, or the `model` setting, Claude Code substitutes an allowed model and continues. Typing `/model <name>` for a restricted model is rejected with `Run /model to choose a different model.` and the session keeps its current model.

```text theme={null}
Model "claude-opus-4-8" is restricted by your organization's settings. Using claude-sonnet-4-6 instead.
```

A notice prefixed with an agent, skill, or command name means the restriction applied to that [subagent's requested model](https://code.claude.com/docs/en/sub-agents#choose-a-model): the subagent runs on the substituted model and your session's model is unchanged. Before v2.1.223, Claude Code showed the notice only for subagents launched with the Agent tool.

Claude Code treats a model family alias, one of `opus`, `sonnet`, `haiku`, or `fable`, as a request for that family rather than for its newest version. On the Anthropic API and on [Claude Platform on AWS](https://code.claude.com/docs/en/claude-platform-on-aws), a restricted family alias resolves to the newest version of the family that your organization and the `availableModels` allowlist permit, and the substitution notice names that version. Claude Code rejects `/model <alias>` only when every version of the family is restricted. Before v2.1.205, a family alias was substituted or rejected based on its newest version alone, even when an older version of the same family was allowed.

**What to do:**

* Run `/model` to pick from the models your organization allows. Restricted models are hidden from the picker.
* If the restricted model was set in `--model`, `ANTHROPIC_MODEL`, the `model` field of a settings file, or the `model` frontmatter of a [subagent](https://code.claude.com/docs/en/sub-agents#choose-a-model), skill, or command, remove or update that value so the notice doesn't recur
* If you need access to the restricted model, ask your organization admin to enable it. See [Organization model restrictions](https://code.claude.com/docs/en/model-config#organization-model-restrictions).

### Model switch was blocked by a PreModelSwitch hook

A [PreModelSwitch hook](https://code.claude.com/docs/en/hooks#premodelswitch) didn't approve the model switch you or a client requested, so the session keeps its current model. When the switch came from an [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) host or [Remote Control](https://code.claude.com/docs/en/remote-control) rather than a command you typed, the message reads `Model switch blocked by a PreModelSwitch hook` without naming the target model.

```text theme={null}
Model switch to Opus 4.6 was blocked by a PreModelSwitch hook: Opus 4.6 is retired for this project. Use a newer model.
```

The reason after the colon says what refused the switch:

* **A reason a hook wrote**: a PreModelSwitch hook supplied that reason when it [denied the switch or asked for confirmation](https://code.claude.com/docs/en/hooks#premodelswitch-decision-control). Address what it asks, or pick a model your hooks allow.
* **`PreModelSwitch hook <name> did not respond before its timeout`**: a hook that doesn't answer before its [timeout](https://code.claude.com/docs/en/hooks#timeouts) blocks the switch. Fix the hanging command or raise that hook's `timeout`, then switch again.
* **`confirmation required, and this session cannot ask`**: a hook answered `ask` without a reason, and a control request has no way to show the confirmation prompt. A `/model` command in a [`-p` run](https://code.claude.com/docs/en/headless) reports the same condition with `(run /model interactively to confirm)` after the reason. Make the switch from an interactive session, or change the hook's decision for this model.
* **`so organization-managed PreModelSwitch hooks could not be checked`**: Claude Code couldn't tell which PreModelSwitch hooks your organization's [managed plugins](https://code.claude.com/docs/en/settings-reference#enabledplugins) deliver, for example because a managed plugin failed to load. One of those hooks might block the switch, so Claude Code refuses rather than apply the switch unchecked. The start of the reason names what failed. Claude Code re-checks on every switch attempt, so a failure that has since cleared stops blocking; if it keeps failing, run `claude --debug` and switch again to capture the details, then fix the plugin or ask your admin to fix it.
* **`a PreModelSwitch hook failed before answering`** or **`PreModelSwitch hooks were cancelled (the control stream closed) before answering`**: the hook run ended without a verdict, and Claude Code doesn't treat that as approval. Run `claude --debug` to see what failed, then switch again.

Before v2.1.260, the managed-plugin refusal read `plugin hooks could not be loaded, so PreModelSwitch hooks could not be checked; see the debug log`. Claude Code retried the plugin load once and then refused later switches in the session, even when your organization managed no plugins. Restart the session to run the plugin load again on those versions.

<h3 id="couldnt-save-it-as-your-default">
  Couldn't save it as your default
</h3>

You picked a model to save as your default, for example with `/model <name>` or `Enter` in the `/model` picker, and Claude Code couldn't write the pick to your user settings file, `~/.claude/settings.json`. The switch itself applied, so the current session runs on the model you picked, but your default is unchanged and the next session starts on the old value.

```text theme={null}
Set model to Fable 5.1 for this session only · couldn't save it as your default: ~/.claude/settings.json can't be written (EROFS)
```

The reason after the file path says what failed:

* **`can't be written (<code>)`**: the write failed with the operating system error code in parentheses, such as `EROFS` when the file, or the file it links to, sits on a filesystem that refuses writes. Make the file writable and switch again. If another tool generates the file, set the `model` key in that tool instead; see [A change you made in Claude Code is lost in new sessions](https://code.claude.com/docs/en/settings#a-change-you-made-in-claude-code-is-lost-in-new-sessions).
* **`isn't valid JSON`**: the file on disk doesn't parse, and Claude Code leaves it untouched rather than overwrite content it can't read back. Fix the syntax error, then switch again; see [Fix a broken settings file](https://code.claude.com/docs/en/settings#fix-a-broken-settings-file).

A notice ending `couldn't confirm it was saved as your default (~/.claude/settings.json is still being written)` means the write hadn't finished after three seconds. It continues in the background, so the default may still be saved; check which model your next session starts on, or run `/model <name>` again.

Before v2.1.265, the notice said the model was `saved as your default for new sessions` even when the write failed.

### thinking.type.enabled is not supported for this model

Your Claude Code version is older than the minimum for the selected model. The CLI sent a thinking configuration the model no longer accepts.

```text theme={null}
API Error: 400 ... "thinking.type.enabled" is not supported for this model. Use "thinking.type.adaptive" and "output_config.effort" to control thinking behavior.
```

**What to do:**

* Run `claude update` and restart Claude Code. Opus 4.7 needs v2.1.111 or later. Opus 4.8 needs v2.1.154 or later. Sonnet 5 needs v2.1.197 or later. Opus 5 needs v2.1.219 or later
* If you can't upgrade, run `/model` and select Opus 4.6 or Sonnet 4.6 instead
* If you hit this in the [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview), upgrade the SDK package instead. Opus 4.8 needs TypeScript SDK v0.3.154 or later and Python SDK v0.2.88 or later. Sonnet 5 needs TypeScript SDK v0.3.197 or later. Opus 5 needs TypeScript SDK v0.3.219 or later

<h3 id="effort-isnt-available-with-thinking-turned-off">
  Effort isn't available with thinking turned off
</h3>

You turned [extended thinking](https://code.claude.com/docs/en/model-config#extended-thinking) off and ran at an [effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) above `high`. The model doesn't accept that combination, so the API rejected the request.

```text theme={null}
API Error: Effort 'xhigh' isn't available with thinking turned off on this model · run /effort high to continue, or turn thinking back on (unset MAX_THINKING_TOKENS=0)
```

**What to do:**

* [Lower the effort level](https://code.claude.com/docs/en/model-config#set-the-effort-level) to `high` or below.
* Turn thinking back on, for example by unsetting [`MAX_THINKING_TOKENS`](https://code.claude.com/docs/en/env-vars) or removing [`"alwaysThinkingEnabled": false`](https://code.claude.com/docs/en/settings-reference#alwaysthinkingenabled) from your settings.

Before v2.1.242, Claude Code showed the API's own message: `API Error: 400 output_config.effort 'xhigh' is not supported when thinking is disabled on this model. Use effort 'high' or below, or enable thinking.` Before v2.1.251, Claude Code sent the request at the effort level you set, so Opus 5 rejected every request above `high` with thinking turned off. Claude Code now sends effort `high` instead to models it knows reject the combination, such as Opus 5, so on v2.1.251 or later this error reaches you only from a model Claude Code doesn't know rejects it.

### Thinking budget exceeds output limit

The configured extended thinking budget exceeds the maximum response length, so there is no room left for the actual answer.

```text theme={null}
API Error: 400 ... max_tokens must be greater than thinking.budget_tokens
```

Claude Code adjusts these values automatically on the Anthropic API. You typically see this error on Amazon Bedrock or Google Cloud's Agent Platform when [`MAX_THINKING_TOKENS`](https://code.claude.com/docs/en/env-vars) is set higher than the provider's output limit, or when plan mode raises the thinking budget.

**What to do:**

* Lower `MAX_THINKING_TOKENS`, or raise [`CLAUDE_CODE_MAX_OUTPUT_TOKENS`](https://code.claude.com/docs/en/env-vars) above the thinking budget
* See [Extended thinking](https://code.claude.com/docs/en/model-config#extended-thinking) for how the budget interacts with output length

### Tool use or thinking block mismatch

The conversation history reached the API in an inconsistent state, usually after a tool call was interrupted or a turn was edited mid-stream.

```text theme={null}
API Error: 400 due to tool use concurrency issues. Run /rewind to recover the conversation.
API Error: 400 ... unexpected `tool_use_id` found in `tool_result` blocks
API Error: 400 ... thinking blocks ... cannot be modified
```

All three variants mean the same thing: the sequence of `tool_use`, `tool_result`, and `thinking` blocks in history no longer matches what the API expects.

**What to do:**

* If you are using Opus 4.7 or Opus 4.8, run `claude update` first. Versions before v2.1.156 can trigger this error during normal tool use, and `/rewind` doesn't clear it.
* Run `/rewind`, or press Esc twice, to step back to a checkpoint before the corrupted turn and continue from there. See [Checkpointing](https://code.claude.com/docs/en/checkpointing) for how checkpoints are created and restored.

### Unsupported tool content removed

When Claude Code connects directly to the Anthropic API and loads or previews a saved session, it removes tool content the Anthropic API doesn't accept and leaves this line where removed content sat between two thinking blocks:

```text theme={null}
[Unsupported tool content removed]
```

Such content reaches a session file when something other than the Anthropic API answered in the API's format, typically a third-party proxy set through [`ANTHROPIC_BASE_URL`](https://code.claude.com/docs/en/env-vars) that translates another provider's tool calls. Claude Code removes it only when the session connects directly to the Anthropic API, and loads the saved history as it is when the session runs through a proxy or on another provider. Before v2.1.246, Claude Code sent the tool use and its result back to the API, and every turn of the resumed session failed with a 400 error such as `messages.1.content.0.server_tool_use.name: Input should be 'web_search', 'web_fetch', ...`.

**What to do:**

* None needed when you see the placeholder line. The session continues without the removed content.
* If every turn of a resumed session fails with the 400 error instead, run `claude update` and resume the session again. Versions before v2.1.246 don't remove the content.

### Usage Policy refusal

The API declined to respond because content in the conversation triggered a [Usage Policy](https://www.anthropic.com/legal/aup) check. The message includes a Request ID you can quote to support if you believe the refusal is incorrect.

```text theme={null}
API Error: Opus 4.6 can't help with this. Start a new session to continue.

Send feedback with /feedback or learn more: https://www.anthropic.com/legal/aup
```

The message names the model that declined, or `Claude` when no model is recorded.

The check evaluates the full conversation, not only your latest prompt, so sending a new message in the same session usually re-triggers the same refusal. The same applies after exiting and reopening the session with `--continue` or `--resume`, since the transcript on disk still contains the triggering content. On [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock), [Google Cloud's Agent Platform](https://code.claude.com/docs/en/google-vertex-ai), and [Microsoft Foundry](https://code.claude.com/docs/en/microsoft-foundry), this message also covers requests the model's safety measures flagged as a cybersecurity topic. See [Safety measures flagged a cybersecurity topic](#safety-measures-flagged-a-cybersecurity-topic).

Before v2.1.219, the message read `Claude Code is unable to respond to this request, which appears to violate our Usage Policy (https://www.anthropic.com/legal/aup). Please double press esc to edit your last message or start a new session for Claude Code to assist with a different task.`

**What to do:**

* Press Esc twice or run `/rewind` to step back to a checkpoint before the turn that triggered the refusal, then rephrase or take a different approach. See [Checkpointing](https://code.claude.com/docs/en/checkpointing).
* If you can't identify which turn caused it, run `/clear` to start a fresh conversation in the same project. Your previous conversation is preserved on disk and remains available in `/resume`.
* In [non-interactive mode](https://code.claude.com/docs/en/headless) (`-p`), where rewind is unavailable, retry with a rephrased prompt in a new session without `--continue`. Policy checks vary by model, so switching to a different model with `--model` may also resolve the refusal in some cases.

### Safety measures flagged a cybersecurity topic

The model's safety measures flagged content in the conversation as a cybersecurity topic. The message names the model that flagged the request:

```text theme={null}
API Error: Opus 4.8's safeguards flagged this message. Our intentionally broad safeguards allow us to deliver more capabilities faster, but can sometimes flag legitimate cybersecurity work. Apply to the Cyber Verification Program to reduce these interruptions. Send feedback with /feedback or learn more: https://support.claude.com/en/articles/14604842-real-time-cyber-safeguards-on-claude
```

The message links to the [Cyber Verification Program](https://support.claude.com/en/articles/14604842-real-time-cyber-safeguards-on-claude), which grants access for legitimate cybersecurity work.

On [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock), [Google Cloud's Agent Platform](https://code.claude.com/docs/en/google-vertex-ai), and [Microsoft Foundry](https://code.claude.com/docs/en/microsoft-foundry), a cybersecurity flag produces the [Usage Policy refusal](#usage-policy-refusal) message instead.

The safeguard itself is server-side and predates v2.1.203; client releases since then have changed only the message's wording.
From v2.1.203 through v2.1.218, the message read `<model> has safety measures that flagged this message for a cybersecurity topic. To learn about the Cyber Verification Program and apply for access, visit our help center:` followed by the same help-center link, and interactive sessions appended `If you were not engaging in a cybersecurity topic, please send feedback via /feedback.`
Before v2.1.203, it read `<model>'s safeguards flagged this message for a cybersecurity topic. If your work requires this access, you can apply for an exemption:` followed by an exemption form link.

**What to do:**

* If your work requires this content, apply for access through the [Cyber Verification Program](https://support.claude.com/en/articles/14604842-real-time-cyber-safeguards-on-claude)
* If your request wasn't about a cybersecurity topic, run `/feedback` to report the false positive
* To keep working in the same session, press Esc twice or run `/rewind` to step back to a checkpoint before the turn that triggered the flag, then take a different approach. See [Checkpointing](https://code.claude.com/docs/en/checkpointing).
