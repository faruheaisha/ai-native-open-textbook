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
sourceRel: "en/agent-view.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-view.md"
sourceSha256: "b77a9b549bf450a86bfbd7947ccc8bdd95b574bc0e043fa6fd281fc792690b1f"
pageSha256: "cacaacdc363a907d7b883ddac832c310562a8eeec8fb900c62ecacb903b7aaae"
contentMode: "local-full"
zh: ""
---

## Manage sessions from the shell

Every background session has a short ID you can use from the shell. The ID is printed when you start a session with `claude --bg`, and each session's ID is its directory name under `~/.claude/jobs/`. These commands are useful for scripting or when you don't want to open agent view.

| Command                                                    | Purpose                                                                                                                                                                                                                                                                                                                                          |
| :--------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `claude agents`                                            | Open agent view                                                                                                                                                                                                                                                                                                                                  |
| `claude agents --cwd <path>`                               | Open agent view scoped to sessions started under `<path>`                                                                                                                                                                                                                                                                                        |
| `claude agents --json`                                     | Print sessions as a JSON array and exit. See [List sessions as JSON](#list-sessions-as-json)                                                                                                                                                                                                                                                     |
| `claude attach <id>`                                       | Attach to a session in this terminal                                                                                                                                                                                                                                                                                                             |
| `claude logs <id>`                                         | Print the session's recent output                                                                                                                                                                                                                                                                                                                |
| `claude stop <id>`                                         | Stop a session. Also accepts `claude kill`                                                                                                                                                                                                                                                                                                       |
| `claude respawn <id>`                                      | Restart a session, running or stopped, e.g. to pick up an updated Claude Code binary. The restarted session resumes its saved conversation; when none is on disk, it runs its original prompt again as a new conversation                                                                                                                        |
| `claude respawn --all`                                     | Restart every running session, e.g. to move all sessions onto an updated Claude Code binary at once                                                                                                                                                                                                                                              |
| `claude rm <id>`                                           | Remove a session from the list, along with a worktree Claude created for it when that's safe to delete; see [What deleting a session removes](#what-deleting-a-session-removes). The conversation transcript stays on your local machine and remains available through `claude --resume`                                                         |
