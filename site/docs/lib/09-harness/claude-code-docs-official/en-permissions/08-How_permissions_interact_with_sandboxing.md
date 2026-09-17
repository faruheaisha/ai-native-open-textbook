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
sourceRel: "en/permissions.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/permissions.md"
sourceSha256: "6cc02236c28e33b38f1977f95d5c1b3c8805c0ad97cb377866cd1de1c5cb8cbc"
pageSha256: "c91b54ca7e001a971855188255b2cd03367547b38f64b7729ec16ea06796d520"
contentMode: "local-full"
zh: ""
---

## How permissions interact with sandboxing

Permissions and [sandboxing](https://code.claude.com/docs/en/sandboxing) are complementary security layers:

* **Permissions** control which tools Claude Code can use and which files or domains it can access. They apply to Bash, Read, Edit, WebFetch, MCP, and every other tool, except that a deny or ask rule can't block [`EndConversation`](https://code.claude.com/docs/en/tools-reference#endconversation-tool-behavior) while any other tool remains.
* **Sandboxing** provides OS-level enforcement that restricts the Bash tool's filesystem and network access. It applies only to Bash commands and their child processes.

Use both for defense-in-depth, since sandbox restrictions still apply even if a prompt injection bypasses Claude's decision-making. Paths and domains from both sandbox settings and permission rules are [merged into the final sandbox configuration](https://code.claude.com/docs/en/sandboxing#permission-rules).

When you enable sandboxing and leave `autoAllowBashIfSandboxed` at its default of `true`, sandboxed Bash commands run without prompting even if your permissions include a bare `Bash` ask rule, or the [equivalent `Bash(*)` form](#match-all-uses-of-a-tool): the sandbox boundary substitutes for that whole-tool prompt.

In [plan mode](https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode), Claude Code skips this substitution. Without an ask rule, the [built-in read-only commands](#read-only-commands) still run without prompting, and any other shell command goes through the regular permission flow while you are still planning; see [plan mode](https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode) for how Claude Code gates commands there. With a bare `Bash` ask rule, every Bash command prompts, including sandboxed read-only commands, the same as outside sandboxing. Before v2.1.212, the substitution applied in plan mode as well.

These checks still apply:

* Content-scoped ask rules like `Bash(git push *)` still force a prompt
* Explicit deny rules still apply
* `rm` or `rmdir` commands that target a [critical path](https://code.claude.com/docs/en/permission-modes#critical-paths) still go through the regular permission flow

Commands that won't run sandboxed, such as excluded commands, respect the bare `Bash` ask rule as usual. See [sandbox modes](https://code.claude.com/docs/en/sandboxing#sandbox-modes) to change this behavior.

&lt;span id="managed-only-settings" />
