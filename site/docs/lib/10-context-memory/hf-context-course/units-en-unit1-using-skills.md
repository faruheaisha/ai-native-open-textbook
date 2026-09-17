---
title: "Using Skills with Code Agents"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/units/en/unit1/using-skills.mdx"
sourceRel: "units/en/unit1/using-skills.mdx"
rawUrl: "/raw/10-context-memory/hf-context-course/units/en/unit1/using-skills.mdx"
sourceSha256: "7ecba1bddc7abb2f1ca9ee798e3c85738d6906f99a21ef7706aaaa01fa7cc146"
pageSha256: "7ecba1bddc7abb2f1ca9ee798e3c85738d6906f99a21ef7706aaaa01fa7cc146"
contentMode: "local-full"
zh: ""
---

# Using Skills with Code Agents

The Agent Skills Specification keeps the SKILL.md format consistent across agents. What differs is where each agent looks for skills on disk and how you install them.

## Where Skills Live

Each agent discovers skills from known directories. You create a skill by placing a `SKILL.md` file in a named subdirectory at one of these paths:

| Scope | Path | Applies to |
|-------|------|------------|
| Personal | `~/.claude/skills/<name>/SKILL.md` | All your projects |
| Project | `.claude/skills/<name>/SKILL.md` | This project only |

Claude Code also watches for changes — adding, editing, or removing a skill takes effect within the current session without restarting.

| Scope | Path |
|-------|------|
| Repository | `.agents/skills/<name>/SKILL.md` |
| User | `~/.agents/skills/<name>/SKILL.md` |
| Admin | `/etc/codex/skills/<name>/SKILL.md` |

Codex discovers skills from all three locations; when the same skill name appears in more than one, the repository copy is used first, then the user copy, then the admin copy.

**Project-local paths:**
- `.opencode/skills/<name>/SKILL.md`
- `.claude/skills/<name>/SKILL.md`
- `.agents/skills/<name>/SKILL.md`

**Global paths:**
- `~/.config/opencode/skills/<name>/SKILL.md`
- `~/.claude/skills/<name>/SKILL.md`
- `~/.agents/skills/<name>/SKILL.md`

OpenCode walks up from the current working directory to the git root, checking each level.

| Scope | Path |
|-------|------|
| Project | `.pi/skills/<name>/SKILL.md` |
| Shared repo tree | `.agents/skills/<name>/SKILL.md` |
| User | `~/.pi/agent/skills/<name>/SKILL.md` |
| Shared user | `~/.agents/skills/<name>/SKILL.md` |

Pi scans the Pi-specific paths plus the shared `.agents/skills/` tree, so the same skill can work in Pi and other harnesses without duplication.

## Installing a Skill

We'll use the [hf-cli](https://github.com/huggingface/skills) skill as a real-world example. It gives agents access to the Hugging Face Hub CLI for downloading, uploading, and managing repositories.

The Hugging Face CLI also provides a cross-agent skill installer. Use it when you want the same skill in more than one agent or want a shared install flow:

```bash
# Project-local install
hf skills add

# Agent-specific symlinks
hf skills add --claude
hf skills add --codex --opencode --global
```

Skills are distributed as plugins via marketplaces. Inside a Claude Code session, add a marketplace, then install the plugin that contains the skill:

```text
/plugin marketplace add huggingface/skills
/plugin install hf-cli@huggingface-skills
```
