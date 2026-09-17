---
title: "How Claude Code uses prompt caching"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/prompt-caching.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/prompt-caching.md"
sourceSha256: "6c2732ed8266f03faadfed47d5f583557b6a590b00424025a8dee0c7b23a7cf4"
pageSha256: "6c2732ed8266f03faadfed47d5f583557b6a590b00424025a8dee0c7b23a7cf4"
contentMode: "local-full"
zh: ""
---

# How Claude Code uses prompt caching

> Claude Code manages prompt caching automatically. See why a model switch triggers a slow uncached turn, what `/compact` costs, why CLAUDE.md edits don't apply mid-session, and how to check your cache hit rate.

Prompt caching makes Claude Code faster and more cost-efficient. Without caching, the API would reprocess your full history on every turn. With caching, it reuses what it already processed, bills the re-read at the [cached token rate](https://platform.claude.com/docs/en/about-claude/pricing), and fully processes only what changed.

Claude Code handles prompt caching for you, unless you [disable it](#disable-prompt-caching). It is still useful to know how prompt caching works, because some actions invalidate the cache and make the next response slower and more expensive while it rebuilds. This page covers which actions those are, why some settings wait for a restart to apply, and how to check cache performance when usage looks high.

## How the cache is organized

Each time you send a message in Claude Code, it makes a new API request. The model doesn't remember anything between requests, so Claude Code re-sends the full context: the system prompt, your project context, every prior message and tool result, and your new message. New content is appended at the end, which means most of each request is identical to the one before it. Prompt caching is how the API avoids reprocessing the part that didn't change.

The API caches by matching the start of each request, called the prefix, against content it recently processed. On a normal turn, the prefix is the entire previous request and only the latest exchange is new. The match is exact, so a change anywhere in the prefix recomputes everything after it. There is no per-file or per-segment caching. See [how prompt caching works](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#how-prompt-caching-works) in the API reference for the underlying mechanism.

<img src="https://mintcdn.com/claude-code/VbDJw--l6T9a9Wvm/images/prompt-caching-prefix.svg?fit=max&auto=format&n=VbDJw--l6T9a9Wvm&q=85&s=f2e8f0b8298a50305fe428ca3f1d1594" className="dark:hidden" alt="Four turns shown as growing horizontal bars. Each turn's request contains everything from the previous turn plus the latest exchange appended at the end. On turns two and three, the unchanged prefix is read from cache and only the new exchange is processed. On turn four, the system prompt changed, so the prefix no longer matches and the entire request is reprocessed and written." width="720" height="454" data-path="images/prompt-caching-prefix.svg" />

<img src="https://mintcdn.com/claude-code/_xqph1dUOslCOwsj/images/prompt-caching-prefix-dark.svg?fit=max&auto=format&n=_xqph1dUOslCOwsj&q=85&s=297dc1c639f0915cae858d0c4b6f3be5" className="hidden dark:block" alt="Four turns shown as growing horizontal bars. Each turn's request contains everything from the previous turn plus the latest exchange appended at the end. On turns two and three, the unchanged prefix is read from cache and only the new exchange is processed. On turn four, the system prompt changed, so the prefix no longer matches and the entire request is reprocessed and written." width="720" height="454" data-path="images/prompt-caching-prefix-dark.svg" />

To get the most out of prefix matching, Claude Code orders each request so content that rarely changes between turns comes first:

| Layer           | Content                                         | Changes when                                    |
| --------------- | ----------------------------------------------- | ----------------------------------------------- |
| System prompt   | Core instructions, tool definitions             | The set of loaded tool definitions changes      |
| Project context | CLAUDE.md, auto memory, unscoped rules          | Session starts, or after `/clear` or `/compact` |
| Conversation    | Your messages, Claude's responses, tool results | Every turn                                      |

A change to the conversation layer leaves the system prompt and project context cached. A change to the system prompt invalidates everything, because all later content now sits behind a different prefix. The third column gives common triggers rather than an exhaustive list, and the sections below cover the full set.

The prefix-match rule explains most of the behaviors on this page. [Plan mode](https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode) and [skill loading](https://code.claude.com/docs/en/skills), for example, append their instructions as conversation messages, so the cached prefix stays intact.

Two settings don't appear in the layer table but still affect what stays cached:

* **Model**: each model has its own cache. Switching models recomputes the entire request even when the content is identical. See [Switching models](#switching-models) below.
* **Effort level**: on most models, each effort level has its own cache, so changing effort mid-session recomputes the entire request. On Fable 5.1 with an API key or a Claude subscription, the cache stays intact by default. See [Changing effort level](#changing-effort-level) below.

  Pick your model and effort level at the top of a session, then save `/compact` for natural breaks between tasks. The fewer changes you make mid-task, the higher your cache hit rate.

### Where the cache lives

Caching happens server-side, in whichever infrastructure serves your model. Where that is depends on how you authenticate:

* **API key, Claude subscription, or [Claude Platform on AWS](https://code.claude.com/docs/en/claude-platform-on-aws)**: the cache lives in Anthropic's infrastructure, accessed through the [Claude API](https://platform.claude.com/docs)
* **Amazon Bedrock or Google Cloud's Agent Platform**: the cache lives in your cloud provider's serving infrastructure
* **Microsoft Foundry**: depends on the deployment's [hosting option](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry#hosting-options). Hosted on Azure deployments are served on Azure infrastructure; Hosted on Anthropic deployments are served on Anthropic's infrastructure
* **Custom `ANTHROPIC_BASE_URL` or [LLM gateway](https://code.claude.com/docs/en/llm-gateway)**: the cache lives wherever your requests are forwarded, and whether caching works depends on the gateway

Claude Code also appends system context mid-conversation, such as file-change notices, and marks that block for caching on every provider and connection.

At the provider's own endpoint, Amazon Bedrock and its [Mantle endpoint](https://code.claude.com/docs/en/amazon-bedrock#use-the-mantle-endpoint), Google Cloud's Agent Platform, and Microsoft Foundry cache the block the same way the Claude API does.

When your requests pass through an [LLM gateway](https://code.claude.com/docs/en/llm-gateway), a custom `ANTHROPIC_BASE_URL`, or a cloud provider base-URL override such as [`ANTHROPIC_BEDROCK_BASE_URL`](https://code.claude.com/docs/en/env-vars), what stays cached depends on how the gateway handles the [`cache_control` markers](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#explicit-cache-breakpoints) Claude Code sends:

* **Forwards them unchanged**: the block and your conversation cache the same as at the provider's own endpoint.
* **Rejects the marked request with a `400` error naming `cache_control`**: Claude Code re-sends the request with the marker moved off the block and onto your last conversation message, and keeps it there for the rest of the conversation. The block bills as uncached input; your conversation stays cached.
* **Removes the markers while returning success**: your entire conversation history bills as uncached input on every turn. A gateway that converts block-form system content to a plain string drops the marker the same way.

For what each provider stores and processes, see [data usage](https://code.claude.com/docs/en/data-usage). Wherever the cache lives, entries expire after a period of inactivity, and [Cache lifetime](#cache-lifetime) below covers the TTL and how to extend it.

## Actions that invalidate the cache

These actions cause the next request to miss part or all of the cache. You see a one-time slower, more expensive turn, after which the new prefix is cached. Most of them are avoidable mid-task once you know they have a cost. A model switch can feel free until you notice the slower turn that follows.

* [Switching models](#switching-models)
* [Changing effort level](#changing-effort-level)
* [Turning on fast mode](#turning-on-fast-mode)
* [Connecting or disconnecting an MCP server](#connecting-or-disconnecting-an-mcp-server)
* [Enabling or disabling a plugin](#enabling-or-disabling-a-plugin)
* [Denying an entire tool](#denying-an-entire-tool)
* [Compacting the conversation](#compacting-the-conversation)
* [Accumulating many images](#accumulating-many-images)
* [Upgrading Claude Code](#upgrading-claude-code)

### Switching models

Each model has its own cache. Switching with [`/model`](https://code.claude.com/docs/en/model-config#setting-your-model) means the next request reads the entire conversation history with no cache hits, even though the content is identical.

When you run `/model` at the terminal, Claude Code asks you to confirm the switch only while the cache is still warm. The cache stays warm for one [cache TTL](#cache-lifetime) after Claude Code last sent a request in this conversation or Claude last responded. Once that time passes, the cache has expired, so Claude Code switches without asking.

Before v2.1.238, Claude Code didn't check the cache TTL and asked even after the cache had expired.

You can also require this confirmation or skip it with a [PreModelSwitch hook](https://code.claude.com/docs/en/hooks#premodelswitch-decision-control).

The [`opusplan` model setting](https://code.claude.com/docs/en/model-config#opusplan-model-setting) resolves to Opus during plan mode and Sonnet during execution, so each plan-mode toggle is a model switch and starts a fresh cache.

[Automatic model fallback](https://code.claude.com/docs/en/model-config#automatic-model-fallback) on Fable models and Opus 5 is also a model switch. When a safety classifier flags a request in a category that has a fallback model, Claude Code re-runs the request on that model and the session continues there.

When a skill or command's frontmatter names a [`model`](https://code.claude.com/docs/en/skills#frontmatter-reference) other than the session's current model, that turn is also a model switch: the next request reads the entire conversation history with no cache hits. The session model resumes on your next prompt. A `context: fork` skill sets the [forked subagent's model](https://code.claude.com/docs/en/skills#run-skills-in-a-subagent) instead.

### Changing effort level

On most models, changing the [effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) mid-session means the next request reads the entire conversation history with no cache hits. While the cache is still warm, Claude Code asks you to confirm the change first.

On Fable 5.1 with an API key or a Claude subscription, changing effort keeps the cache, and Claude Code applies the new level without asking. This doesn't apply on Amazon Bedrock, Google Cloud's Agent Platform, or a [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway), or when you set [`CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS`](https://code.claude.com/docs/en/llm-gateway-protocol#disable-pre-release-capabilities) or your organization has a HIPAA configuration.

Before v2.1.260, changing effort on Fable 5.1 with an API key or a Claude subscription also invalidated the cache.

### Turning on fast mode

Enabling [fast mode](https://code.claude.com/docs/en/fast-mode) adds a request header that is part of the cache key, so the first request Claude Code sends with fast mode on reads the entire conversation history with no cache hits. Claude Code sets that header once when a turn starts and keeps it for the whole turn, so when you turn fast mode on while Claude is working, the cache miss from the header happens on the first request of your next turn. Those uncached input tokens are billed at [fast mode rates](https://code.claude.com/docs/en/fast-mode#understand-the-cost-tradeoff), which is why turning it on at the start of a session costs less than turning it on deep into a long one. If your current model doesn't support fast mode, enabling fast mode also [switches your model](#switching-models), and that switch starts a fresh cache on its own from the next request in the running turn.

The cost applies once per conversation. After the first fast mode turn, Claude Code keeps sending the header and varies only the request's speed setting, which is not part of the cache key. Turning fast mode off, the [automatic fallback to standard speed](https://code.claude.com/docs/en/fast-mode#handle-rate-limits) after a rate limit, and turning it back on later all keep the cache. If you [run out of usage credits](https://code.claude.com/docs/en/fast-mode#handle-rate-limits) mid-session, Claude Code retries each rejected fast mode request at standard speed the same way, so this fallback also keeps the cache. `/clear` and `/compact` reset this, since they rebuild the cache at those points anyway.

### Connecting or disconnecting an MCP server

Tool definitions sit in the system prompt layer, so the cache invalidates when the set of tool definitions in the request changes between turns. Toggling the [advisor tool](https://code.claude.com/docs/en/advisor) is an exception: its definition sits after the cache breakpoint, so enabling or disabling `/advisor` keeps the cached prefix intact. Whether an [MCP server](https://code.claude.com/docs/en/mcp) change does this depends on whether its tools are deferred by [tool search](https://code.claude.com/docs/en/mcp#scale-with-mcp-tool-search) or loaded into the prefix:

* **Deferred tools**, the default on supported models: a server connecting, disconnecting, or changing its tool list only appends new content and doesn't disturb anything already cached.
* **Tools loaded into the prefix**: any change to them invalidates the cache. This happens when [tool search is unavailable or disabled](https://code.claude.com/docs/en/mcp#configure-tool-search), such as on Google Cloud's Agent Platform models earlier than the Claude 4.5 generation, with a custom `ANTHROPIC_BASE_URL` gateway, or on a Microsoft Foundry [deployment hosted on Azure](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry#hosting-options) once Claude Code detects that the deployment rejects tool search. It also happens for a server or tool marked [`alwaysLoad`](https://code.claude.com/docs/en/mcp#exempt-a-server-from-deferral), and for definitions kept upfront by [threshold-based loading](https://code.claude.com/docs/en/mcp#configure-tool-search).

When tools load into the prefix, the most common cause of an invalidation is a server connecting or disconnecting mid-session, which can happen without any action on your part: a stdio server's process exits, an HTTP session expires, or a server [reconnects automatically after a transient failure](https://code.claude.com/docs/en/mcp#automatic-reconnection). A connected server can also push a [dynamic tool update](https://code.claude.com/docs/en/mcp#dynamic-tool-updates) that changes its tool list.

Editing your MCP config does not by itself change the cache. The new config takes effect only after a restart, which is when the server connects or disconnects.

### Enabling or disabling a plugin

When you enable or disable a [plugin](https://code.claude.com/docs/en/plugins), what the change costs depends on which component types the plugin provides. The cases below cover each component type, when Claude Code applies the change, and what happens when you disable a plugin again in the same session.

#### Plugin components that keep the cache

Claude Code never invalidates the cache for a plugin's skills, commands, agents, hooks, monitors, or themes. It appends their content after the existing conversation, so the next request pays for that content and still reads everything before it from the cache.

#### Plugins that provide MCP servers

When you enable or disable a plugin that provides [MCP servers](https://code.claude.com/docs/en/plugins-reference#mcp-servers), Claude Code follows the same rules as when you [connect or disconnect an MCP server](#connecting-or-disconnecting-an-mcp-server):

* If Claude Code defers the server's tools, it keeps the cache.
* If Claude Code loads them into the prefix, the next request re-reads the entire conversation.

#### Code intelligence plugins

When you enable a [code intelligence plugin](https://code.claude.com/docs/en/discover-plugins#code-intelligence), Claude gets the [LSP tool](https://code.claude.com/docs/en/tools-reference#lsp-tool-behavior).

#### When plugin changes apply

A change you make in the `/plugin` menu goes through [`/reload-plugins`](https://code.claude.com/docs/en/discover-plugins#apply-plugin-changes-without-restarting), which Claude Code runs for you when you close the menu. You pay the cost, whether appended announcements or a full re-read, on the first turn after the change applies. Claude Code can also apply a change on its own:

* For a plugin with a `command` source, Claude Code [can reload the plugin itself](https://code.claude.com/docs/en/plugin-marketplaces#when-claude-code-re-runs-the-command).
* When you [install a plugin from the `/plugin` interface](https://code.claude.com/docs/en/discover-plugins#install-plugins), Claude Code can activate it during the install. The install summary tells you whether it did.
* When you [move the session with `/cd`](https://code.claude.com/docs/en/permissions#move-the-session-to-another-directory) on v2.1.246 or later, Claude Code applies the plugins the new directory's settings enable as part of the move, without the full re-read warning that holds a `/reload-plugins`.
* In interactive sessions, when you add or remove a plugin in a [folder of plugins](https://code.claude.com/docs/en/plugins#test-your-plugins-locally) you passed with `--plugin-dir`, the change applies right away. If applying it would trigger a full re-read, Claude Code holds the change instead and shows a notice to run `/reload-plugins`. Requires Claude Code v2.1.265 or later.

When `/reload-plugins` runs and the reload would trigger a full re-read, Claude Code shows a warning and doesn't apply the reload. Run `/reload-plugins --force` to apply it anyway.

`/reload-plugins` also runs in sessions without an interactive terminal, such as the desktop app, the Agent SDK, and [non-interactive mode](https://code.claude.com/docs/en/headless) with `-p`, when you type it into the session directly. Requires Claude Code v2.1.260 or later.

In those sessions the reload applies everything except plugin MCP server changes, which [take effect in your next session](https://code.claude.com/docs/en/discover-plugins#apply-plugin-changes-without-restarting) and so never cost a full re-read mid-session.

#### Plugins you enable and then disable in one session

When you disable a plugin you enabled earlier in the session, Claude Code restores the previous request shape. If that prefix is still within its [cache lifetime](#cache-lifetime), the next request reads the older cache entry instead of rebuilding.

### Denying an entire tool

Adding a bare tool name like `Bash` or `WebFetch` as a [deny rule](https://code.claude.com/docs/en/permissions#manage-permissions) removes that tool from Claude's context entirely. Claude Code loads built-in tool definitions into the system prompt layer, so adding or removing one of these rules mid-session invalidates the cache. Claude Code applies the change on the next request, whether you add the rule through `/permissions` or by [editing a settings file directly](https://code.claude.com/docs/en/settings#when-edits-take-effect). That includes a rule you add through `/permissions` in the middle of a turn.

Only a deny rule that matches in the tool-name position has this effect: a bare tool name, the equivalent `Bash(*)` form, or a [tool-name glob](https://code.claude.com/docs/en/permissions#tool-name-wildcards) like `"*"`. A glob that matches only MCP tools, such as `"mcp__*"`, removes those tools the same way but leaves the cache intact when the matched tools are [deferred](#connecting-or-disconnecting-an-mcp-server), the default, since deferred definitions were never in the cached prefix. Scoped deny rules like `Bash(rm *)`, and all allow and ask rules, don't change which tools Claude sees. Claude Code checks them when Claude attempts a call, leaving the prefix intact.

### Compacting the conversation

[Compaction](https://code.claude.com/docs/en/context-window#what-survives-compaction) replaces your message history with a summary. By design, this invalidates the conversation layer, since the next request has a new, shorter history that doesn't share a prefix with the old one. Claude Code reuses the system prompt layer unless the conversation was [resumed while keeping a system prompt that would otherwise have changed](#resuming-a-session); in that case the first compaction switches to the current prompt and that layer rebuilds once. It reloads project context from disk, which cache-hits only if CLAUDE.md and memory are unchanged since the session started.

To produce the summary, Claude Code sends a separate request with the same system prompt, tools, and history as your conversation, plus a summarization instruction appended as a final user message. While the cache is warm, that request reads your prefix from the cache, so a mid-session `/compact` costs a fraction of what the context size suggests and spends most of its time generating the summary.

After a break longer than the [cache lifetime](#cache-lifetime), there is no cache left to read, so the summarization request reprocesses the full history as uncached input. This is why `/compact` costs the most when you [resume an old session](https://code.claude.com/docs/en/sessions#resume-from-a-summary). In both the warm and cold cases, the turn after compaction rebuilds the conversation cache for only the much shorter summary, so that turn is not the slow part.

  Compaction works in your favor when the context you discard is content you no longer need. To choose when its overhead happens, run `/compact` at a natural break in your work, such as between tasks, instead of waiting for auto-compaction to trigger mid-task. If you've gone down a path you want to abandon entirely, [`/rewind`](#rewinding-the-conversation) to an earlier turn instead. Rewinding truncates back to a prefix that is already cached, rather than building a new one as compaction does.

### Accumulating many images

The API limits how many images and PDFs each request can carry. For the current numbers, see [Request limits](https://platform.claude.com/docs/en/build-with-claude/vision#request-limits) in the API docs. Claude Code also caps the total size of the images and PDFs in a request, so large screenshots reach the limit with fewer images than small ones.

When the next request would pass either limit, Claude Code removes a batch of the oldest images and PDFs from what it sends, which leaves room for more before it needs to remove any again. Claude can no longer see the removed images. If Claude needs one of them again, share it again.

Removing images changes the messages that held them, so the next request reprocesses the conversation from the earliest of those messages onward. Because Claude Code removes a batch at a time, you see one slower turn per batch rather than one with each new screenshot.

### Upgrading Claude Code

A new Claude Code version typically updates the system prompt or tool definitions, so the first conversation you start after an upgrade builds its cache from the top. [Auto-update](https://code.claude.com/docs/en/setup#auto-updates) downloads new versions in the background but applies them on the next launch, never mid-session, so you see this as an uncached first turn after restarting rather than a surprise during a session. Set `DISABLE_AUTOUPDATER=1` to control when upgrades apply.

  For what it costs to resume a conversation you started before the upgrade, see [Resuming a session](#resuming-a-session).

## Actions that keep the cache

These actions either append to the end of the conversation or don't touch the request at all. Some of them, such as editing CLAUDE.md, keep the cache for the same reason the change doesn't reach the running session until `/clear`, `/compact`, or a restart.

* [Editing files in your repository](#editing-files-in-your-repository)
* [Editing CLAUDE.md mid-session](#editing-claude-md-mid-session)
* [Changing permission mode](#changing-permission-mode)
* [Changing output style](#changing-output-style)
* [Invoking skills and commands](#invoking-skills-and-commands)
* [Running `/recap`](#running-%2Frecap)
* [Rewinding the conversation](#rewinding-the-conversation)
* [Spawning a subagent](#subagents-and-the-cache)

### Editing files in your repository
