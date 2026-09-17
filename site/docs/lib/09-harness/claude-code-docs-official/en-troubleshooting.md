---
title: "Troubleshooting"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/troubleshooting.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/troubleshooting.md"
sourceSha256: "8c42670f513efbb5b1f402ac1873a4b94462aa16e58dad79866ee88ab6792d1a"
pageSha256: "8c42670f513efbb5b1f402ac1873a4b94462aa16e58dad79866ee88ab6792d1a"
contentMode: "local-full"
zh: ""
---

# Troubleshooting

> Fix high CPU or memory usage, hangs, auto-compact thrashing, and search problems in Claude Code, and find the right page for other issues.

This page covers performance, stability, and search problems once Claude Code is running. For other issues, start with the page that matches where you're stuck:

| Symptom                                                                                                                                              | Go to                                                                                    |
| :--------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| `command not found`, install fails, PATH issues, `EACCES`, TLS errors                                                                                | [Troubleshoot installation and login](https://code.claude.com/docs/en/troubleshoot-install)                          |
| Update or install download fails with `The connection dropped while downloading the update` or `aborted`                                             | [Error reference](https://code.claude.com/docs/en/errors#the-connection-dropped-while-downloading-the-update)        |
| Login loops, OAuth errors, `403 Forbidden`, "organization disabled", Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry credentials | [Troubleshoot installation and login](https://code.claude.com/docs/en/troubleshoot-install#login-and-authentication) |
| Settings not applying, hooks not firing, MCP servers not loading                                                                                     | [Debug your configuration](https://code.claude.com/docs/en/debug-your-config)                                        |
| Session started in auto mode, or Claude edits files and runs commands without asking                                                                 | [Which mode a session starts in](https://code.claude.com/docs/en/permission-modes#which-mode-a-session-starts-in)    |
| `API Error: 5xx`, `529 Overloaded`, `429`, request validation errors                                                                                 | [Error reference](https://code.claude.com/docs/en/errors)                                                            |
| `model not found` or `you may not have access to it`                                                                                                 | [Error reference](https://code.claude.com/docs/en/errors#theres-an-issue-with-the-selected-model)                    |
| VS Code extension not connecting or detecting Claude                                                                                                 | [VS Code integration](https://code.claude.com/docs/en/vs-code#fix-common-issues)                                     |
| `Claude Code process exited with code 1` in VS Code or an SDK app                                                                                    | [Error reference](https://code.claude.com/docs/en/errors#claude-code-process-exited-with-code-n)                     |
| JetBrains plugin or IDE not detected                                                                                                                 | [JetBrains integration](https://code.claude.com/docs/en/jetbrains#troubleshooting)                                   |
| High CPU or memory, slow responses, hangs, search not finding files                                                                                  | [Performance and stability](#performance-and-stability) below                            |

If you're not sure which applies, run `/doctor` inside Claude Code for an automated check of your installation, settings, extensions, and context usage; it proposes fixes it can apply after you confirm. If `claude` won't start at all, run `claude doctor` from your shell instead. Run `/mcp` to check MCP server status.

## Performance and stability

These sections cover issues related to resource usage, responsiveness, and search behavior.

### High CPU or memory usage

Claude Code is designed to work with most development environments, but may consume significant resources when processing large codebases. If you're experiencing performance issues:

1. Use `/compact` regularly to reduce context size. If it returns `Not enough messages to compact.`, the conversation has too few turns to summarize; that can happen even with a full context when a single large paste filled it
2. Close and restart Claude Code between major tasks
3. Consider adding large build directories to your `.gitignore` file
4. Restart with [`claude --safe-mode`](https://code.claude.com/docs/en/cli-reference#cli-flags) to check whether a plugin, MCP server, or hook is the source. It disables all customizations for the session; if usage drops, see [Debug your configuration](https://code.claude.com/docs/en/debug-your-config#test-against-a-clean-configuration) to find which one
