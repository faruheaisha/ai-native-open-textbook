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
pageSha256: "64b86d13855520105fd321695730e66ae664095622765a06185fd43ee6c29ef2"
contentMode: "local-full"
zh: ""
---

## Configure tools with permission rules and hooks

For the most part, Claude decides when to use these tools and you don't need to name them yourself when interacting with Claude. You reference tool names directly when defining permissions and other configuration:

* in [`permissions.allow`](https://code.claude.com/docs/en/settings-reference#permissions-allow) and [`permissions.deny`](https://code.claude.com/docs/en/settings-reference#permissions-deny) in settings, and the `/permissions` interface
* in the `--allowedTools` and `--disallowedTools` [CLI flags](https://code.claude.com/docs/en/cli-reference)
* in the Agent SDK's [`allowedTools` and `disallowedTools`](https://code.claude.com/docs/en/agent-sdk/permissions#allow-and-deny-rules) options
* in a [subagent's `tools` or `disallowedTools`](https://code.claude.com/docs/en/sub-agents#supported-frontmatter-fields) frontmatter
* in a [skill's `allowed-tools`](https://code.claude.com/docs/en/skills#frontmatter-reference) frontmatter
* in a hook's [`if` condition](https://code.claude.com/docs/en/hooks-guide#filter-by-tool-name-and-arguments-with-the-if-field)

All of these accept the same rule format, `ToolName(specifier)`. The specifier depends on the tool, and several tools share a format:

| Rule format                    | Applies to                | Details                                                          |
| :----------------------------- | :------------------------ | :--------------------------------------------------------------- |
| `Bash(npm run *)`              | Bash, Monitor             | [Command pattern matching](https://code.claude.com/docs/en/permissions#bash)                 |
| `PowerShell(Get-ChildItem *)`  | PowerShell                | [Command pattern matching](https://code.claude.com/docs/en/permissions#powershell)           |
| `Read(~/secrets/**)`           | Read, Grep, Glob, LSP     | [Path pattern matching](https://code.claude.com/docs/en/permissions#read-and-edit)           |
| `Edit(/src/**)`                | Edit, Write, NotebookEdit | [Path pattern matching](https://code.claude.com/docs/en/permissions#read-and-edit)           |
| `Skill(deploy *)`              | Skill                     | [Skill name matching](https://code.claude.com/docs/en/skills#restrict-claude’s-skill-access) |
| `Agent(Explore)`               | Agent                     | [Subagent type matching](https://code.claude.com/docs/en/permissions#agent-subagents)        |
| `WebFetch(domain:example.com)` | WebFetch                  | [Domain matching](https://code.claude.com/docs/en/permissions#webfetch)                      |
| `WebSearch`                    | WebSearch                 | No specifier; allow or deny the tool as a whole                  |

Tools not listed here, such as `ExitPlanMode` or `ShareOnboardingGuide`, accept only the bare tool name with no specifier.

An `Edit(...)` allow rule also grants read access to the same path, so you don't need a matching `Read(...)` rule. A `Read(...)` deny rule also blocks the Edit and Write tools on the same path, including creating a new file there, because both tools change content Claude has to be able to read back. The `Read` deny check requires Claude Code v2.1.208 or later on edits, and v2.1.228 or later on writes.

Hook `matcher` fields use bare tool names, not the parenthesized rule format. See [matcher patterns](https://code.claude.com/docs/en/hooks#matcher-patterns) for the matching rules. For the field names each tool passes to `tool_input` in hooks, see the [PreToolUse input reference](https://code.claude.com/docs/en/hooks#pretooluse-input).
