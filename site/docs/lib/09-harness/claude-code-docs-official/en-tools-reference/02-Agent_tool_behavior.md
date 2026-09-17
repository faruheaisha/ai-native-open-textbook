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
sourceRel: "en/tools-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/tools-reference.md"
sourceSha256: "f928a98a3f2e69421eeadeb064439c827340f4b19a28c7ad920c2a0e60b142f9"
pageSha256: "c99aa612caceb200f5fafde41bfdc976832ce35b4700eefac716d0360af6eea8"
contentMode: "local-full"
zh: ""
---

## Agent tool behavior

The Agent tool spawns a subagent in a separate context window. The subagent works through its task autonomously, then returns a single text result to the parent conversation. The parent doesn't see the subagent's intermediate tool calls or outputs, only that final result. With [agent teams](https://code.claude.com/docs/en/agent-teams) enabled, a call that carries a `name` can launch a [teammate](https://code.claude.com/docs/en/agent-teams#how-claude-starts-agent-teams) instead, which reports back through team messages rather than by returning a result.

To cap how many turns a subagent runs, set `maxTurns` in the [subagent definition](https://code.claude.com/docs/en/sub-agents#supported-frontmatter-fields). When the subagent reaches the limit, Claude Code marks the returned result as partial output, and Claude can [resume the subagent](https://code.claude.com/docs/en/sub-agents#resume-subagents) to continue.

The same Agent tool also launches [forked subagents](https://code.claude.com/docs/en/sub-agents#fork-the-current-conversation) wherever [fork mode](https://code.claude.com/docs/en/sub-agents#turn-fork-mode-on-or-off) is on. A fork inherits the full parent conversation instead of starting fresh, runs in the background apart from the [cases that stay in the foreground](https://code.claude.com/docs/en/sub-agents#run-subagents-in-foreground-or-background), and still surfaces permission prompts in your terminal. The rest of this section describes non-fork subagents.

Which tools a non-fork subagent can use depends on the `tools` and `disallowedTools` fields in the [subagent definition](https://code.claude.com/docs/en/sub-agents):

* **Neither field set**: the subagent inherits every [tool available to subagents](https://code.claude.com/docs/en/sub-agents#available-tools).
* **`tools` only**: the subagent gets only the listed tools.
* **`disallowedTools` only**: the subagent gets every parent tool except the listed ones.
* **Both set**: `disallowedTools` takes precedence. A tool listed in both is removed.

In every case, the resolved set is limited to the [tools available to subagents](https://code.claude.com/docs/en/sub-agents#available-tools): a tool that isn't available to subagents is never granted, even when listed in `tools`.

If every entry in a subagent's `tools` list fails to match a usable tool, the Agent tool usually returns an error naming the entries instead of launching the subagent; see [Agent would be spawned with zero tools](https://code.claude.com/docs/en/errors#agent-would-be-spawned-with-zero-tools) for the message and how to fix each entry.

Launching the subagent doesn't itself prompt for permission. Claude Code checks the subagent's own tool calls against your permission rules as it runs.

Where you see a subagent's permission prompts depends on whether it runs in the foreground or the background. Claude Code runs subagents in the background by default, apart from the [cases that run in the foreground](https://code.claude.com/docs/en/sub-agents#run-subagents-in-foreground-or-background).

* **Foreground subagents** show the same permission prompts you would see in the main conversation, at the moment each tool call happens.
* **Background subagents** surface permission prompts in your main session as of v2.1.186. The prompt names which subagent is asking, and pressing Esc denies that one tool call without stopping the subagent. Before v2.1.186, background subagents auto-denied any tool call that would otherwise prompt and continued without that tool.

To [limit what a subagent can reach](https://code.claude.com/docs/en/sub-agents#control-subagent-capabilities) in the first place, narrow its `tools` field, for example by leaving Bash off the list, or set deny rules in your settings.
