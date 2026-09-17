---
title: "3. Memory & Settings"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md"
sourceRel: "guide/ultimate-guide.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ultimate-guide.md"
sourceSha256: "4d290b0171bbaaffd149d5d2e4da964392cb212d7357408df40d8f346f952dbc"
pageSha256: "48b32cb87e2b98d2a60129bfbd24ae588d14d8073c8ea932905a6438194c5f65"
contentMode: "local-full"
zh: ""
---

# 3. Memory & Settings

_Quick jump:_ [Memory Files (CLAUDE.md)](#31-memory-files-claudemd) · [.claude/ Folder Structure](#32-the-claude-folder-structure) · [Settings & Permissions](#33-settings--permissions) · [Precedence Rules](#34-precedence-rules)

---

## 📌 Section 3 TL;DR (90 seconds)

**The Memory Hierarchy** (most important concept):

```
~/.claude/CLAUDE.md          → Global (all projects)
/project/CLAUDE.md           → Project (team, committed to git)
/project/.claude/            → Local overrides (personal, not committed)
```

**Rule**: More specific beats more general (local > project > global)

**Quick Actions**:
- Team instructions → Create `/project/CLAUDE.md`
- Personal preferences → Use `/project/.claude/settings.local.json`
- Global shortcuts → Add to `~/.claude/CLAUDE.md`

**Read this section if**: You work on multiple projects or in a team
**Skip if**: Single project, solo developer (can configure as you go)

---

**Reading time**: 15 minutes
**Skill level**: Week 1
**Goal**: Customize Claude Code for your project

## 3.1 Memory Files (CLAUDE.md)

CLAUDE.md files are persistent instructions read at every session start. Three levels: `~/.claude/CLAUDE.md` (global) → `/project/CLAUDE.md` (project) → `/project/.claude/CLAUDE.md` (local/personal). All merge additively; more specific file wins on conflict.

**Minimum viable**: project name, one-sentence description, and `## Commands` block. Claude auto-detects stack, directory structure, and conventions. Add a line only when Claude makes the same mistake twice, not preemptively.

**The anchoring risk**: stale CLAUDE.md entries bias every session toward outdated patterns. Treat pruning as maintenance. Structure around WHAT/WHY/HOW for larger projects.

> **Full coverage**: See [Memory Systems: CLAUDE.md](/lib/09-harness/claude-code-ultimate-guide/guide-core-memory-systems/index#21-claudemd-three-levels) for the three-level hierarchy diagram, discoverability filter, ETH Zürich research findings (developer-written +4% vs LLM-generated -3%), and team sharing patterns.

### CLAUDE.md as Compounding Memory

> **"You should never have to correct Claude twice for the same mistake."**
> — Boris Cherny, creator of Claude Code

**The Mental Model**: CLAUDE.md matters as a configuration file, but it matters more as an **organizational learning system** where every error compounds into permanent team knowledge.

**How it works**:
1. **Claude makes an error** (e.g., uses `npm` instead of `pnpm`)
2. **You add a rule** to CLAUDE.md: `"Always use pnpm, never npm"`
3. **Claude reads CLAUDE.md** at session start → never repeats error
4. **Knowledge compounds** over time as team catches and documents edge cases

**The compounding effect**:
```
Week 1: 5 rules  →  5 mistakes prevented
Week 4: 20 rules → 20 mistakes prevented
Month 3: 50 rules → 50 mistakes prevented + faster onboarding
```

**Practical example** (Boris Cherny's team):
- CLAUDE.md grew to **2.5K tokens** (≈500 words) over months
- Captured project-specific conventions, architectural decisions, and "gotchas"
- New team members benefit from accumulated tribal knowledge instantly
- Claude becomes increasingly aligned with team standards over time

**Anti-pattern**: Preemptively documenting everything. Instead, treat CLAUDE.md as a **living document** that grows through actual mistakes caught during development.
