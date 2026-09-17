---
title: "Hermes Agent Tool Mapping"
sourceId: "10-context-memory/superpowers"
sourceTitle: "Superpowers（Claude Code 技能库）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/obra/superpowers"
entryUrl: "https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/skills/using-superpowers/references/hermes-tools.md"
sourceRel: "skills/using-superpowers/references/hermes-tools.md"
rawUrl: "/raw/10-context-memory/superpowers/skills/using-superpowers/references/hermes-tools.md"
sourceSha256: "e2185c976a3c87503910e05e2aea58cc89bc8e569bb624b93df9958ac47a9190"
pageSha256: "e2185c976a3c87503910e05e2aea58cc89bc8e569bb624b93df9958ac47a9190"
contentMode: "local-full"
zh: ""
---

# Hermes Agent Tool Mapping

Skills speak in actions ("dispatch a subagent", "create a todo", "read a file"). On Hermes Agent these resolve to the tools below.

## Tools

| Action skills request | Hermes tool |
|---|---|
| Read a file | `read_file` |
| Create a new file | `write_file` |
| Edit a file (targeted patch) | `patch` |
| Run a shell command | `terminal` |
| Search file contents | `search_files` |
| Find files by name | `terminal` with `find` |
| Fetch a URL / read a webpage | `web_extract(urls=[...])` |
| Search the web | `web_search(query=...)` |
| Dispatch a subagent | `delegate_task(goal=..., context=..., toolsets=[...], role="leaf")` |
| Task tracking | `todo` tool |
| Invoke a skill | `skill_view("skill-name")` |

## Instructions file

When a skill mentions "your instructions file," on Hermes Agent this is **`AGENTS.md`** in the project directory, or **`SOUL.md`** globally at `~/.hermes/SOUL.md`.

## Invoking a skill

Hermes Agent has a `skills` toolset with `skill_view` and `skills_list` tools.
To invoke a superpowers skill, use:

```
skill_view("brainstorming")
skill_view("test-driven-development")
```

If `skill_view` cannot find a superpowers skill (it may not appear in the catalog
until the plugin fully registers it), fall back to reading the SKILL.md directly:

```
