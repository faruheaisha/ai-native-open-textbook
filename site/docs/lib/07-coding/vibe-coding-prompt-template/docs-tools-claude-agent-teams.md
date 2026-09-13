---
title: "Claude Subagents And Skills"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/README.md"
zh: ""
---

# Claude Subagents And Skills

Last verified: 2026-05

Use this when: a generated project will use Claude Code skills, hooks, subagents, or agent teams.

## Quick Answer

Start with one Claude session and `CLAUDE.md`. Add skills for repeatable workflows and subagents for focused review/research/test tasks. Use agent teams only for large tasks with separate ownership.

## Checklist

- [ ] `CLAUDE.md` points to `AGENTS.md` and `agent_docs/`.
- [ ] Repeated workflows live in `.claude/skills/*/SKILL.md`.
- [ ] Repeated roles live in `.claude/agents/*.md`.
- [ ] Shared permissions/hooks live in `.claude/settings.json`.
- [ ] Shell, write, network, MCP, production, billing, and destructive tools stay ask-first unless explicitly approved.
- [ ] Subagents have narrow scope and do not edit overlapping files.

## Example

```text
Read AGENTS.md and agent_docs/testing.md.
Review only the auth diff. Return prioritized findings with file/line references.
Do not edit files.
```

## Links

- [Claude Code subagents](https://code.claude.com/docs/en/sub-agents)
- [Claude Code skills](https://code.claude.com/docs/en/skills)
- [Claude Code hooks](https://code.claude.com/docs/en/hooks)
- [Claude Code permission modes](https://code.claude.com/docs/en/permission-modes)
