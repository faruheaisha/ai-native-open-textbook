---
title: "Run Claude Code programmatically"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/headless.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/headless.md"
sourceSha256: "8c3d88d22cbde5db709f29f43c225e08fbdf0d347098e87a84d2b399fbde80b5"
pageSha256: "8c3d88d22cbde5db709f29f43c225e08fbdf0d347098e87a84d2b399fbde80b5"
contentMode: "local-full"
zh: ""
---

# Run Claude Code programmatically

> Use the Agent SDK to run Claude Code programmatically from the CLI, Python, or TypeScript.

The [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) gives you the same tools, agent loop, and context management that power Claude Code. It's available as a CLI for scripts and CI/CD, or as [Python](https://code.claude.com/docs/en/agent-sdk/python) and [TypeScript](https://code.claude.com/docs/en/agent-sdk/typescript) packages for full programmatic control.

To run Claude Code in non-interactive mode, pass `-p` with your prompt and the [CLI options](https://code.claude.com/docs/en/cli-reference) you need:

```bash theme={null}
claude -p "Find and fix the bug in auth.py" --allowedTools "Read,Edit,Bash"
```

This page covers using the Agent SDK via the CLI (`claude -p`). For the Python and TypeScript SDK packages with structured outputs, tool approval callbacks, and native message objects, see the [full Agent SDK documentation](https://code.claude.com/docs/en/agent-sdk/overview).

## Basic usage

Add the `-p` (or `--print`) flag to any `claude` command to run it non-interactively. Not every [CLI option](https://code.claude.com/docs/en/cli-reference) combines with `-p`. Claude Code rejects `--bg`, and rejects `--cloud` with a task description, with an error naming the conflict; `--cloud` with a session ID and `-p` instead [queues a message into that cloud session](https://code.claude.com/docs/en/claude-code-on-the-web#send-follow-ups-from-the-cli) and exits. Options you'll combine with `-p` often include:

* `--continue` for [continuing conversations](#continue-conversations)
* `--allowedTools` for [auto-approving tools](#auto-approve-tools)
* `--output-format` for [structured output](#get-structured-output)

This example asks Claude a question about your codebase and prints the response:

```bash theme={null}
claude -p "What does the auth module do?"
```

Claude Code exits with code 0 on success and a non-zero code when the run fails, so your scripts can branch on the exit status. If you pass an invalid flag, Claude Code reports the error to stderr before the run starts. When a failure happens inside the run, such as missing authentication, Claude Code prints the failure as the result on stdout.

### Start faster with bare mode

Add `--bare` to reduce startup time by skipping auto-discovery of hooks, skills, custom commands, [subagents](https://code.claude.com/docs/en/sub-agents), plugins, MCP servers, auto memory, and CLAUDE.md. Without it, `claude -p` loads the same [context](https://code.claude.com/docs/en/how-claude-code-works#the-context-window) an interactive session would, including anything configured in the working directory or `~/.claude`.

Bare mode is useful for CI and scripts where you need the same result on every machine. A hook in a teammate's `~/.claude` or an MCP server in the project's `.mcp.json` won't run, because bare mode never reads them. A directory you name with `--add-dir` is a partial exception: bare mode loads skills from its `.claude/skills/` folder, but still skips its `.claude/commands/` and `.claude/agents/` folders. [Skills from additional directories](https://code.claude.com/docs/en/skills#skills-from-additional-directories) covers what does and doesn't load.

Without `--bare`, a `-p` session runs the hooks in a project's `.claude/settings.json` and connects the servers in its `.mcp.json`, even in a folder you've never trusted. A `-p` session shows no workspace trust dialog and no per-server approval prompt. [What runs before you trust a folder](https://code.claude.com/docs/en/permissions#what-runs-before-you-trust-a-folder) covers each kind of repository content under `-p` and how to keep it out.

This example runs a one-off summarize task in bare mode and pre-approves the Read tool so the call completes without a permission prompt. Set `ANTHROPIC_API_KEY` before running it, because bare mode doesn't use your subscription login:

```bash theme={null}
claude --bare -p "Summarize README.md" --allowedTools "Read"
```

In bare mode, Claude Code never reads OAuth credentials or the system keychain. For the Anthropic API, set `ANTHROPIC_API_KEY` in the environment, with a key created in the [Claude Console](https://platform.claude.com), or supply an `apiKeyHelper` in the `--settings` JSON. Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry continue to read their own provider credentials as usual.

In bare mode Claude has access to the Bash, file read, and file edit tools. Pass any context you need with a flag:

| To load                 | Use                                                     |
| ----------------------- | ------------------------------------------------------- |
| System prompt additions | `--append-system-prompt`, `--append-system-prompt-file` |
