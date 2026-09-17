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
sourceRel: "en/sub-agents.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/sub-agents.md"
sourceSha256: "73532b0b6accc67223319be1b24adec1e3b41a9d96a580770694ce718437d2bc"
pageSha256: "08ac49f9c59e0986b1708a97ff6288a3ddec85ecc728613b1d6b2db009d4bb18"
contentMode: "local-full"
zh: ""
---

## Built-in subagents

Claude Code includes built-in subagents that Claude automatically uses when appropriate. Each inherits the parent conversation's permissions; most run with a restricted tool set.

Explore and Plan skip your CLAUDE.md files and the parent session's git status to keep research fast and inexpensive. Every other built-in and [custom subagent](#configure-subagents) loads both. For the full breakdown of what reaches a subagent, see [what loads at startup](#what-loads-at-startup).

    A fast, read-only agent optimized for searching and analyzing codebases.

    * **Model**: inherits from the main conversation, capped at Opus on the Claude API, so Explore never runs on a more expensive model than the one you already chose for the session, unless you set `CLAUDE_CODE_SUBAGENT_MODEL` and [force it onto every subagent](#run-every-subagent-on-one-model)
    * **Tools**: read-only tools; Write and Edit are denied
    * **Purpose**: file discovery, code search, codebase exploration

    As of v2.1.198, Explore inherits the main conversation's model instead of always running on Haiku. On the Claude API, the inherited model is capped at Opus: a main conversation on a higher tier runs Explore on Opus, and a main conversation on Sonnet or Haiku runs Explore on that same model. On any other provider, such as [Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, or Claude Platform on AWS](https://code.claude.com/docs/en/third-party-integrations), Explore inherits the main conversation's model directly.

    A [user or project subagent](#choose-the-subagent-scope) named `Explore` overrides the built-in and keeps its own `model` field, so define one with `model: haiku` to keep exploration on a lower-cost model.

    Claude delegates to Explore when it needs to search or understand a codebase without making changes. This keeps exploration results out of your main conversation context.

    When invoking Explore, Claude specifies a thoroughness level: **quick** for targeted lookups, **medium** for balanced exploration, or **very thorough** for comprehensive analysis.

    A research agent used during [plan mode](https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode) to gather context before presenting a plan.

    * **Model**: inherits from the main conversation, unless you set `CLAUDE_CODE_SUBAGENT_MODEL` and [force it onto every subagent](#run-every-subagent-on-one-model)
    * **Tools**: read-only tools; Write and Edit are denied
    * **Purpose**: codebase research for planning

    When you're in plan mode and Claude needs to understand your codebase, it delegates research to the Plan subagent so that exploration output stays in a separate context window while the main conversation remains read-only.

    A capable agent for complex, multi-step tasks that require both exploration and action.

    * **Model**: the [`CLAUDE_CODE_SUBAGENT_MODEL`](#choose-a-model) model if you set one and nothing assigns a model another way, otherwise the main conversation's model; [Choose a model](#choose-a-model) states the full order, and [Run every subagent on one model](#run-every-subagent-on-one-model) shows how to make the variable override those sources
    * **Tools**: every tool [available to subagents](#available-tools)
    * **Purpose**: complex research, multi-step operations, code modifications

    Claude delegates to general-purpose when the task requires both exploration and modification, complex reasoning to interpret results, or multiple dependent steps.

    Claude Code includes additional helper agents for specific tasks. These are typically invoked automatically, so you don't need to use them directly.

    | Agent             | Model                                                                                           | When Claude uses it                                                                                                                                                                                                                                                                                                                  |
    | :---------------- | :---------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | claude            | None of its own; follows the [model order](#choose-a-model) when Claude spawns it as a subagent | When a task doesn't fit a more specialized agent. A catch-all with every tool [available to subagents](#available-tools). Also the default agent for a dispatched [background session](https://code.claude.com/docs/en/agent-view); [which permission mode it starts in](https://code.claude.com/docs/en/agent-view#permission-mode-model-and-effort) depends on how the session was started |
    | statusline-setup  | Sonnet                                                                                          | When you run `/statusline` to configure your status line                                                                                                                                                                                                                                                                             |
    | claude-code-guide | Haiku                                                                                           | When you ask questions about Claude Code features                                                                                                                                                                                                                                                                                    |

Built-in subagents are registered by default in interactive sessions. To restrict them:

* To block a specific built-in type, add it to `permissions.deny` as shown in [Disable specific subagents](#disable-specific-subagents).
* To prevent Claude from delegating to any subagent, deny the `Agent` tool itself with [`permissions.deny`](https://code.claude.com/docs/en/permissions#tool-specific-permission-rules).
* To remove only the built-in `Explore` and `Plan` subagents, set [`CLAUDE_CODE_DISABLE_EXPLORE_PLAN_AGENTS=1`](https://code.claude.com/docs/en/env-vars). Claude reads and explores files directly instead of delegating to them. Requires Claude Code v2.1.198 or later.
* In [non-interactive mode](https://code.claude.com/docs/en/headless) and the [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview), set [`CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS=1`](https://code.claude.com/docs/en/env-vars) to remove all built-in types and supply only your own.

An Agent tool call that omits `subagent_type` fails with [`subagent_type is required`](https://code.claude.com/docs/en/errors#subagent-type-is-required) when the session has no `general-purpose` subagent to fall back on.

Beyond these built-in subagents, you can create your own with custom prompts, tool restrictions, permission modes, hooks, and skills. The following sections show how to get started and customize subagents.
