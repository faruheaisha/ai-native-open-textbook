---
title: "GSD Beta Features"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/BETA.md"
sourceRel: "docs/BETA.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/BETA.md"
sourceSha256: "e1b99b21a84c47c17790be0f6e6664b5839ca5463a59e3de682c2fc25f0a3743"
pageSha256: "e1b99b21a84c47c17790be0f6e6664b5839ca5463a59e3de682c2fc25f0a3743"
contentMode: "local-full"
zh: ""
---

# GSD Beta Features

> **Beta features are opt-in and may change or be removed without notice.** They are not covered by the stable API guarantees that apply to the rest of GSD. If a beta feature ships to stable, it will be documented in [COMMANDS.md](/lib/10-context-memory/get-shit-done/docs-COMMANDS) and [FEATURES.md](/lib/10-context-memory/get-shit-done/docs-FEATURES/index) with a changelog entry.

---

## `/gsd-ultraplan-phase` — Ultraplan Integration [BETA]

> **Claude Code only · Requires Claude Code v2.1.91+**
> Ultraplan is itself a Claude Code research preview — both this command and the underlying feature may change.

### What it does

`/gsd-ultraplan-phase` offloads GSD's plan-phase drafting to [Claude Code's ultraplan](https://code.claude.ai) cloud infrastructure. Instead of planning locally in the terminal, the plan is drafted in a browser-based session with:

- An **outline sidebar** for navigating the plan structure
- **Inline comments** for annotating and refining tasks
- A persistent browser tab so your terminal stays free while the plan is being drafted

When you're satisfied with the draft, you save it and import it back into GSD — conflict detection, format validation, and plan-checker verification all run automatically.

### Why use it

| Situation | Recommendation |
|-----------|---------------|
| Long, complex phases where you want to read and comment on the plan before it executes | Use `/gsd-ultraplan-phase` |
| Quick phases, familiar domain, or non-Claude Code runtimes | Use `/gsd-plan-phase` (stable) |
| You have a plan from another source (teammate, external AI) | Use `/gsd-import` |

### Requirements

- **Runtime:** Claude Code only. The command exits with an error on Gemini CLI, Copilot CLI, and other runtimes.
- **Version:** Claude Code v2.1.91 or later (the `$CLAUDE_CODE_VERSION` env var must be set).
- **Cost:** No extra charge for Pro and Max subscribers. Ultraplan is included at no additional cost.

### Usage

```bash
/gsd-ultraplan-phase         # Ultraplan the next unplanned phase
/gsd-ultraplan-phase 2       # Ultraplan a specific phase number
```

| Argument | Required | Description |
|----------|----------|-------------|
| `N` | No | Phase number (defaults to next unplanned phase) |

### How it works

1. **Initialization** — GSD runs the standard plan-phase init, resolving which phase to plan and confirming prerequisites.

2. **Context assembly** — GSD reads `ROADMAP.md`, `REQUIREMENTS.md`, and any existing `RESEARCH.md` for the phase. This context is bundled into a structured prompt so ultraplan has everything it needs without you copying anything manually.

3. **Return-path instructions** — Before launching ultraplan, GSD prints the import command to your terminal so it's visible in your scroll-back buffer after the browser session ends:
   ```
