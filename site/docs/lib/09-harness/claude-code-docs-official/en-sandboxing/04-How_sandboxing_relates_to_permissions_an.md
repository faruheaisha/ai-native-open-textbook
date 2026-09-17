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
sourceRel: "en/sandboxing.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/sandboxing.md"
sourceSha256: "9173fa7bfc40900080b167be86897899912ce55ff61ad1072f71a5eab69e80ce"
pageSha256: "e4215e59bfd59d98c816f80d671fbcb6555230055bd044a11424e67c39f365eb"
contentMode: "local-full"
zh: ""
---

## How sandboxing relates to permissions and permission modes

Sandboxing, [permission rules](https://code.claude.com/docs/en/permissions), and [permission modes](https://code.claude.com/docs/en/permission-modes) are complementary layers. The sections below cover how the sandbox interacts with each.

### Permission rules

Permission rules and sandboxing control different things:

* **Permission rules** control which tools Claude Code can use and are evaluated before any tool runs. They apply to every tool: Bash, Read, Edit, WebFetch, MCP, and others, except that a deny or ask rule can't block [`EndConversation`](https://code.claude.com/docs/en/tools-reference#endconversation-tool-behavior) while any other tool remains.
* **Sandboxing** provides OS-level enforcement that restricts what Bash commands can access at the filesystem and network level. It applies only to Bash commands and their child processes.

The two layers also differ in how they are enforced. Claude Code evaluates permission decisions before a command runs, based on the command string and, in auto mode, a separate classifier's judgment about whether the command is safe. The operating system enforces the sandbox boundary on the running process, so it holds regardless of what the model chose to run and even if an allowed command does more than its name suggests.

Filesystem and network restrictions are configured through both sandbox settings and permission rules:

| Setting or rule                                                  | What it does                                                                                      |
| :--------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `sandbox.filesystem.allowWrite`                                  | Grants subprocess write access to paths outside the working directory                             |
| `sandbox.filesystem.denyWrite` and `sandbox.filesystem.denyRead` | Block subprocess access to specific paths                                                         |
| `sandbox.filesystem.allowRead`                                   | Re-allows reading specific paths within a `denyRead` region                                       |
| [`sandbox.filesystem.disabled`](#disable-filesystem-isolation)   | Turns the filesystem layer off entirely while keeping network isolation                           |
| `Edit` allow rules                                               | Grant write access to specific paths, the same way `sandbox.filesystem.allowWrite` does           |
| `Read` and `Edit` deny rules                                     | Block access to specific files or directories                                                     |
| `WebFetch(domain:...)` allow and deny rules                      | Control domain access                                                                             |
| Sandbox `allowedDomains`                                         | Controls which domains Bash commands can reach                                                    |
| Sandbox `deniedDomains`                                          | Blocks specific domains even when a broader `allowedDomains` wildcard would otherwise permit them |

Paths and domains from both sandbox settings and permission rules are merged into the final sandbox configuration.

The [claude-code repository's examples directory](https://github.com/anthropics/claude-code/tree/main/examples/settings) includes starter settings configurations for common deployment scenarios, including sandbox-specific examples. Use these as starting points and adjust them to fit your needs.

### Permission modes

`/sandbox` is not a [permission mode](https://code.claude.com/docs/en/permission-modes). Permission modes decide whether a tool call runs and whether you are prompted first, while the sandbox restricts what a Bash command can access once it runs. They differ in what they control and what replaces the per-action prompt:

|                                                                    | What it controls                            | What replaces the prompt                                                                                                                                                                     |
| :----------------------------------------------------------------- | :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/sandbox`                                                         | What a Bash command can access once it runs | The sandbox boundary itself, in [auto-allow mode](#sandbox-modes)                                                                                                                            |
| [Auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) | Whether each tool call runs                 | A classifier that reviews actions                                                                                                                                                            |
| `--dangerously-skip-permissions`                                   | Whether each tool call runs                 | Nothing. [Protected path](https://code.claude.com/docs/en/permission-modes#protected-paths) checks are also skipped; the [actions no mode auto-approves](https://code.claude.com/docs/en/permission-modes#actions-no-mode-auto-approves) still apply |

The sandbox's [auto-allow mode](#sandbox-modes) is separate from [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode): auto-allow approves Bash commands because the sandbox boundary contains them, while auto mode uses a classifier to review actions. The two work independently and can be combined. To choose an isolation boundary for unattended runs, see [Sandbox environments](https://code.claude.com/docs/en/sandbox-environments#how-isolation-relates-to-permission-modes). For a table of common permission mode and sandbox pairings with the flags that start each one, see [Common setups](https://code.claude.com/docs/en/permission-modes#common-setups).
