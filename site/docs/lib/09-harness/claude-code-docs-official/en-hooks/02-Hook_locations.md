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
sourceRel: "en/hooks.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/hooks.md"
sourceSha256: "a6f4f82aca2e63d64ba787c2dc8d735ff95ae86fd3a53471b87eb089133cbdca"
pageSha256: "0ac7a809b5f410f19625b2403cb933521d3a81a9f54e42b90e83a7b438ab4fa2"
contentMode: "local-full"
zh: ""
---

### Hook locations

Where you define a hook determines its scope:

| Location                                 | Scope                                                                                                            | Shareable                                             |
| :--------------------------------------- | :--------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------- |
| `~/.claude/settings.json`                | All your projects                                                                                                | No, local to your machine                             |
| `.claude/settings.json`                  | Single project                                                                                                   | Yes, can be committed to the repo                     |
| `.claude/settings.local.json`            | Single project                                                                                                   | No, gitignored when Claude Code saves a setting to it |
| Managed policy settings                  | Organization-wide                                                                                                | Yes, admin-controlled                                 |
| [Plugin](https://code.claude.com/docs/en/plugins) `hooks/hooks.json` | When plugin is enabled                                                                                           | Yes, bundled with the plugin                          |
| [Skill](https://code.claude.com/docs/en/skills) frontmatter          | The rest of the session once the skill is invoked. See [Hooks in skills and agents](#hooks-in-skills-and-agents) | Yes, defined in the skill file                        |
| [Subagent](https://code.claude.com/docs/en/sub-agents) frontmatter   | While that subagent is running                                                                                   | Yes, defined in the subagent file                     |

Cloud sessions on [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) don't read your local `~/.claude/settings.json`; hooks there come from the repo and from your organization's server-managed settings. In a [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments-configuration#permissions-and-tool-approval), Claude Code also runs the hooks the operator seeded from the runner host's `~/.claude/`, and it runs the hooks in the runner image's managed settings file when that file is among the [managed sources Claude Code applies](https://code.claude.com/docs/en/managed-settings#how-claude-code-combines-managed-sources), which by default means only when neither server-managed settings nor an MDM-delivered Claude Code policy supplies the managed tier. See [what carries over from your setup](https://code.claude.com/docs/en/cloud-environments#what-carries-over-from-your-setup) for which files reach a cloud session.

For details on settings file resolution, see [settings](https://code.claude.com/docs/en/settings).

Hooks from settings files, managed policy settings, and plugins also run inside [subagents](https://code.claude.com/docs/en/sub-agents). When a subagent calls a tool, tool events such as `PreToolUse` and `PostToolUse` fire the same configured hooks as in the main conversation, and the input carries the `agent_id` and `agent_type` [common input fields](#common-input-fields) that identify the subagent.

Enterprise administrators can use `allowManagedHooksOnly` to restrict which hooks run:

* Your user, project, local, and plugin hooks are blocked. Hooks from plugins force-enabled in managed settings `enabledPlugins` are exempt
* Claude Code also narrows your [`statusLine`](https://code.claude.com/docs/en/statusline), [`fileSuggestion`](https://code.claude.com/docs/en/settings-reference#filesuggestion), and [`subagentStatusLine`](https://code.claude.com/docs/en/statusline#subagent-status-lines) settings to managed settings
* Claude Code also disables plugins with a [`command` source](https://code.claude.com/docs/en/plugin-marketplaces#command-sources), including plugins force-enabled in managed settings `enabledPlugins`, unless [`disableCommandPluginSources`](https://code.claude.com/docs/en/settings-reference#disablecommandpluginsources) is explicitly set to `false`. `command` sources require Claude Code v2.1.229 or later
* Claude Code also blocks marketplace [`headersHelper` commands](https://code.claude.com/docs/en/plugin-marketplaces#authenticate-archive-downloads) unless [`disableCommandPluginSources`](https://code.claude.com/docs/en/settings-reference#disablecommandpluginsources) is explicitly set to `false`, except for a marketplace that managed settings themselves declare

See [what runs under `allowManagedHooksOnly`](https://code.claude.com/docs/en/settings-reference#what-runs-under-allowmanagedhooksonly).

Hook entries merge across settings levels rather than replacing each other: user, project, and local settings add their own hooks without removing managed ones, and the [`disableAllHooks`](#disable-or-remove-hooks) setting can't disable managed hooks from outside managed settings.

The [HTTP hook allowlists](https://code.claude.com/docs/en/settings-reference#hook-and-skill-settings) apply to hooks from every source, including managed policy settings:

* `allowedHttpHookUrls`: when defined at any settings level, Claude Code runs an HTTP hook handler only if its URL matches the merged allowlist
* `httpHookAllowedEnvVars`: when defined, Claude Code interpolates only the environment variables on that list into hook headers
