---
title: "Pi Tool Mapping"
sourceId: "10-context-memory/superpowers-zh"
sourceTitle: "superpowers-zh（AI 编程超能力 · 中文增强版）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/jnMetaCode/superpowers-zh"
entryUrl: "https://github.com/jnMetaCode/superpowers-zh/blob/79ea5d262b7a1c7ce76a289390853bca51f940d4/skills/using-superpowers/references/pi-tools.md"
sourceRel: "skills/using-superpowers/references/pi-tools.md"
rawUrl: "/raw/10-context-memory/superpowers-zh/skills/using-superpowers/references/pi-tools.md"
sourceSha256: "e89e2d5c7b89cdd2a511aa7ad3c191290baaaed8913006c30f283ac7c4b091fb"
pageSha256: "e89e2d5c7b89cdd2a511aa7ad3c191290baaaed8913006c30f283ac7c4b091fb"
contentMode: "local-full"
zh: ""
---

# Pi Tool Mapping

Skills speak in actions ("dispatch a subagent", "create a todo", "read a file"). On Pi these resolve to the tools below.

| Action skills request | Pi equivalent |
| --- | --- |
| Invoke a skill | Pi native skills: load the relevant `SKILL.md` with `read`, or let the human use `/skill:name` |
| Read a file | `read` |
| Create a file | `write` |
| Edit a file | `edit` |
| Run a shell command | `bash` |
| Search file contents | `grep` when active; otherwise `bash` with `rg`/`grep` |
| Find files by name | `find` or `bash` with shell globs |
| List files and subdirectories | `ls` when active; otherwise `bash` with `ls` |
| Dispatch a subagent (`Subagent (general-purpose):` template) | Use an installed subagent tool such as `subagent` from `pi-subagents` if available |
| Task tracking ("create a todo", "mark complete") | Use an installed todo/task tool if available, otherwise track tasks in the plan or `TODO.md` |

## Skills

Pi discovers skills from configured skill directories and installed Pi packages. A Superpowers Pi package should expose `skills/` through its `pi.skills` manifest entry. Pi does not expose Claude Code's `Skill` tool, but the agent should still follow the Superpowers rule: when a skill applies, load and follow it before responding.

## Subagents

Pi core does not ship a standard subagent tool. The `pi-subagents` package is a strong optional companion and provides a `subagent` tool with single-agent, chain, parallel, async, forked-context, and resume/status workflows. If no subagent tool is available, do not fabricate `Task` calls; execute sequentially in the current session or explain that the optional subagent capability is not installed.

## Task lists

Pi core does not ship a standard task-list tool. If a todo/task extension is installed, use its documented tool. Otherwise use Superpowers plan files, checklists in Markdown, or a repo-local `TODO.md` for task tracking. Older Superpowers docs may refer to `TodoWrite`; treat that as the task-tracking action above.
