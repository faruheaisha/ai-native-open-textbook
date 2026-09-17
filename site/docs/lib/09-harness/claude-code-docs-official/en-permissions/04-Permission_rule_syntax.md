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
pageSha256: "ef3e3b3560c6cb94c4a705a22a19f0604ba2a39f1f77b9a393855b51a72c4f53"
contentMode: "local-full"
zh: ""
---

## Permission rule syntax

Permission rules follow the format `Tool` or `Tool(specifier)`. Parentheses inside the specifier are literal, so a command or path that contains them needs no escaping.

### Match all uses of a tool

To match all uses of a tool, use only the tool name without parentheses:

| Rule       | Effect                         |
| :--------- | :----------------------------- |
| `Bash`     | Matches all Bash commands      |
| `WebFetch` | Matches all web fetch requests |
| `Read`     | Matches all file reads         |

`Bash(*)` is equivalent to `Bash` and matches all Bash commands. As a deny rule, both forms remove the tool from Claude's context.

### Use specifiers for fine-grained control

Add a specifier in parentheses to match specific tool uses:

| Rule                           | Effect                                                   |
| :----------------------------- | :------------------------------------------------------- |
| `Bash(npm run build)`          | Matches the exact command `npm run build`                |
| `Read(./.env)`                 | Matches reading the `.env` file in the current directory |
| `WebFetch(domain:example.com)` | Matches fetch requests to example.com                    |

### Match by input parameter

Deny and ask rules can match a top-level input parameter on any built-in tool with `Tool(param:value)`.

To match a parameter on an MCP tool, pass a deny rule with [`--disallowedTools`](https://code.claude.com/docs/en/cli-reference#cli-flags). When Claude Code loads a settings file, it skips any `mcp__` rule that has parentheses. Claude Code lists the skipped rule in the invalid-settings dialog when an interactive session starts, and in [`claude doctor`](https://code.claude.com/docs/en/debug-your-config#check-resolved-settings) output.

A parameter rule matches when Claude calls the tool with that parameter set to that exact value. An allow rule for one parameter value wouldn't establish that the call is safe overall, so allow rules continue to use each tool's own specifier syntax. This works for any scalar parameter the tool accepts:

| Rule                           | Matches                                      |
| :----------------------------- | :------------------------------------------- |
| `Agent(model:opus)`            | Agent calls that request the Opus model tier |
| `Agent(isolation:worktree)`    | Agent calls that request a git worktree      |
| `Bash(run_in_background:true)` | Bash calls that run in the background        |

Parameter matching follows these rules:

* The parameter name must be a direct field of the tool's input, such as `model` on the Agent tool. Fields nested inside an object or array are not matchable
* Each rule names one parameter. To gate on both `model` and `isolation`, write two rules, `Agent(model:opus)` and `Agent(isolation:worktree)`, rather than combining them in one rule
* The value supports `*` as a wildcard that matches any sequence of characters, so `Agent(isolation:*)` matches any explicit isolation value. Without `*` the match is exact
* A parameter the model omits is never matched, so `Agent(model:*)` doesn't match a call that leaves `model` unset
* The value is compared against the literal input Claude sends, before any normalization. `Agent(model:opus)` matches the alias `opus` but not a full model ID. Run with [`--verbose`](https://code.claude.com/docs/en/cli-reference) to see the exact parameter names and values in each tool call
* Whitespace around the colon is ignored

You can't match a tool's primary content field this way: `command` for Bash and PowerShell, `file_path` for Read, Edit, and Write, `path` for Grep and Glob, `notebook_path` for NotebookEdit, and `url` for WebFetch. A rule like `Bash(command:rm *)` would be bypassable by a compound command, so Claude Code ignores it and emits a startup warning. Use `Bash(rm *)`, `Read(./path)`, or `WebFetch(domain:host)` instead.

### Wildcard patterns

A `*` in a Bash rule matches any text, including spaces, so one rule covers a family of commands. A rule with no `*` matches one exact command.

  Put the `*` after the subcommand. In `git log --oneline main`, `git` is the program and `log` is the subcommand, the word that determines what the program does. Claude Code matches everything before the first `*` as written, so those words are what limit the rule: `Bash(git log *)` allows only `git log` commands, and `Bash(git *)` allows every git command. Claude Code [warns at startup](https://code.claude.com/docs/en/errors#has-a-wildcard-before-the-rest-of-the-command) about an allow rule with a `*` before the subcommand, such as `Bash(git * main)`.

Write the command you want Claude to run without asking, and replace the parts that vary with `*`. With this configuration, Claude Code runs npm scripts and git commits without asking and refuses commands that begin with `git push`. A push written another way, such as `git -C . push`, isn't matched; see [what a Bash rule doesn't match](#bash-rule-limits).

```json theme={null}
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git commit *)"
    ],
    "deny": [
      "Bash(git push *)"
    ]
  }
}
```

A `*` can go anywhere in the rule: at the start, in the middle, or at the end. Each row shows a rule, commands it matches, and nearby commands it doesn't match:

| You write              | Matches                                                                              | Doesn't match                          |
| :--------------------- | :----------------------------------------------------------------------------------- | :------------------------------------- |
| `Bash(npm run build)`  | `npm run build`                                                                      | `npm run build --watch`                |
| `Bash(npm run *)`      | `npm run build`, `npm run test --watch`, `npm run`                                   | `npm install`                          |
| `Bash(git log * main)` | `git log --oneline main`, `git log -5 main`, `git log --output=<file> main`          | `git log main`, `git push origin main` |
| `Bash(git * main)`     | `git merge main`, `git push origin main`, `git -c core.fsmonitor=<script> diff main` | `git log`                              |
| `Bash(* --version)`    | `node --version`, `bash -c 'echo hi' --version`                                      | `node -v`                              |
| `Bash(ls *)`           | `ls -la`, `ls`                                                                       | `lsof`                                 |
| `Bash(ls*)`            | `ls -la`, `lsof`                                                                     |                                        |
| `Bash(* --help *)`     | `npm --help x`                                                                       | `npm --help`                           |

Three matching rules produce those rows:

* **The `*` stands in for whatever text is in its place.** In `Bash(git * main)`, it stands in for the subcommand, so Claude Code matches every git subcommand and every option before it. That includes `-c`, which makes git run a program you name. In `Bash(* --version)`, the `*` stands in for the program, so any program matches.
* **A `*` at the end, with a space before it, also matches the bare command.** `Bash(ls *)` matches `ls`, and `Bash(git log *)` matches `git log`. That holds only when the trailing `*` is the rule's only wildcard: `Bash(* --help *)` matches `npm --help x` but not `npm --help`.
* **The space before a trailing `*` is part of the rule.** `Bash(ls *)` requires a space after `ls`, so `lsof` doesn't match. `Bash(ls*)` has no space, so it matches `lsof` too.

The `:*` suffix is an equivalent way to write a trailing wildcard, so `Bash(ls:*)` matches the same commands as `Bash(ls *)`.

The permission dialog writes the space-separated form when you select "Yes, and don't ask again" for a command prefix. The `:*` form is only recognized at the end of a pattern. In a pattern like `Bash(git:* push)`, the colon is treated as a literal character and won't match git commands.

### Tool name wildcards

Deny and ask rules also accept glob patterns in the tool-name position. The pattern must match the full tool name: `"*"` matches every tool, and `"mcp__*"` matches every MCP tool across all servers. A tool matched by a bare-name glob deny rule is removed from Claude's context, the same as a bare tool name, including the [`EndConversation`](https://code.claude.com/docs/en/tools-reference#endconversation-tool-behavior) exception: a glob deny can't remove it while any other tool remains, and a glob ask never prompts for it. This configuration denies every MCP tool:

```json theme={null}
{
  "permissions": {
    "deny": [
      "mcp__*"
    ]
  }
}
```

Allow rules accept tool-name globs only after a literal `mcp__<server>__` prefix. The server segment must be glob-free so the rule names a specific server you configured. `mcp__puppeteer__*` matches every tool from the `puppeteer` server, and `mcp__github__get_*` matches its `get_` tools. An unanchored allow glob such as `"*"`, `"B*"`, or `"mcp__*"` is skipped with a warning and doesn't auto-approve anything.

A deny or ask rule whose tool name matches no known tool produces a startup warning to catch typos. Tool names containing `_` or `*` are exempt from the check.

The label shown for a tool in the transcript and permission dialog can differ from its canonical name. For example, the tool labeled `Stop Task` in the transcript has the canonical name `TaskStop`. Permission rules and [hook matchers](https://code.claude.com/docs/en/hooks) don't match the label, so a rule written as `Stop Task` doesn't match. For deny and ask rules, the startup warning above catches the mismatch. Use the canonical names listed in the [tools reference](https://code.claude.com/docs/en/tools-reference).
