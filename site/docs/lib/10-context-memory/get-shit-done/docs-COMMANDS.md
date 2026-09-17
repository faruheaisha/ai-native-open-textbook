---
title: "GSD Command Reference"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/COMMANDS.md"
sourceRel: "docs/COMMANDS.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/COMMANDS.md"
sourceSha256: "61ac26a8265d7ee0bc2bf3086f57e0b48f695623f185351275a76a2ab76a81e9"
pageSha256: "61ac26a8265d7ee0bc2bf3086f57e0b48f695623f185351275a76a2ab76a81e9"
contentMode: "local-full"
zh: ""
---

# GSD Command Reference

> Command syntax, flags, options, and examples for stable commands. For feature details, see [Feature Reference](/lib/10-context-memory/get-shit-done/docs-FEATURES/index). For workflow walkthroughs, see [User Guide](/lib/10-context-memory/get-shit-done/docs-USER-GUIDE/index).

---

## Command Syntax

- **Claude Code / Copilot / OpenCode / Kilo:** `/gsd-command-name [args]` (hyphen form)
- **Gemini CLI:** `/gsd:command-name [args]` (colon form — Gemini namespaces commands under `gsd:`)
- **Codex:** `$gsd-command-name [args]`

The hyphen and colon forms are *runtime-specific spellings of the same command*. Whichever runtime you're on, the installer writes the correct form into your runtime's command directory.

---

## Namespace Meta-Skills

Six namespace routers ship as the first-stage entry points in v1.40. They keep the eager skill-listing token cost low (~120 tokens for 6 routers vs ~2,150 for a flat 86-skill listing) while the full surface remains directly invocable. The model selects a namespace, then routes to the concrete sub-skill. See [#2792](https://github.com/gsd-build/get-shit-done/issues/2792).

| Command | Routes to |
|---------|-----------|
| `/gsd-workflow` | Phase pipeline — discuss / plan / execute / verify / phase / progress |
| `/gsd-project` | Project lifecycle — milestones, audits, summary |
| `/gsd-quality` | Quality gates — code review, debug, audit, security, eval, ui |
| `/gsd-context` | Codebase intelligence — map, graphify, docs, learnings |
| `/gsd-manage` | Management — config, workspace, workstreams, thread, update, ship, inbox |
| `/gsd-ideate` | Exploration & capture — explore, sketch, spike, spec, capture |

The namespace skills are **additive** — every existing concrete command (e.g. `/gsd-plan-phase`, `/gsd-code-review --fix`) is still invocable directly.

---

## Core Workflow Commands

### `/gsd-new-project`

Initialize a new project with deep context gathering.

| Flag | Description |
|------|-------------|
| `--auto @file.md` | Auto-extract from document, skip interactive questions |

**Prerequisites:** No existing `.planning/PROJECT.md`
**Produces:** `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, `config.json`, `research/`, `CLAUDE.md`

```bash
/gsd-new-project                    # Interactive mode
/gsd-new-project --auto @prd.md     # Auto-extract from PRD
```

---

### `/gsd-workspace`

Manage GSD workspaces — create, list, or remove isolated workspace environments with repo copies and independent `.planning/` directories.

| Flag | Description |
|------|-------------|
| `--new` | Create a new workspace (use with `--name`, `--repos`, etc.) |
| `--list` | List active GSD workspaces and their status |
| `--remove <name>` | Remove a workspace and clean up git worktrees |
| `--name <name>` | Workspace name (used with `--new`) |
| `--repos repo1,repo2` | Comma-separated repo paths or names (used with `--new`) |
| `--path /target` | Target directory (default: `~/gsd-workspaces/<name>`) |
| `--strategy worktree\|clone` | Copy strategy (default: `worktree`) |
| `--branch <name>` | Branch to checkout (default: `workspace/<name>`) |
| `--auto` | Skip interactive questions |

**Use cases:**
- Multi-repo: work on a subset of repos with isolated GSD state
- Feature isolation: `--repos .` creates a worktree of the current repo

**Produces:** `WORKSPACE.md`, `.planning/`, repo copies (worktrees or clones)

```bash
/gsd-workspace --new --name feature-b --repos hr-ui,ZeymoAPI
/gsd-workspace --new --name feature-b --repos . --strategy worktree  # Same-repo isolation
/gsd-workspace --list
/gsd-workspace --remove feature-b
```

---

### `/gsd-discuss-phase`

Gather phase context through adaptive questioning before planning.

| Argument | Required | Description |
|----------|----------|-------------|
| `N` | No | Phase number (defaults to current phase) |

| Flag | Description |
|------|-------------|
| `--all` | Skip area selection — discuss all gray areas interactively (no auto-advance) |
| `--auto` | Auto-select recommended defaults for all questions |
| `--batch` | Group questions for batch intake instead of one-by-one |
| `--analyze` | Add trade-off analysis during discussion |
| `--power` | File-based bulk question answering from a prepared answers file |
| `--assumptions` | Surface Claude's implementation assumptions about the phase without an interactive session |

**Prerequisites:** `.planning/ROADMAP.md` exists
**Produces:** `\{phase\}-CONTEXT.md`, `\{phase\}-DISCUSSION-LOG.md` (audit trail)

```bash
/gsd-discuss-phase 1                # Interactive discussion for phase 1
/gsd-discuss-phase 1 --all          # Discuss all gray areas without selection step
/gsd-discuss-phase 3 --auto         # Auto-select defaults for phase 3
/gsd-discuss-phase --batch          # Batch mode for current phase
/gsd-discuss-phase 2 --analyze      # Discussion with trade-off analysis
/gsd-discuss-phase 1 --power        # Bulk answers from file
/gsd-discuss-phase 3 --assumptions  # Surface Claude's assumptions before planning
```

---

### `/gsd-ui-phase`

Generate UI design contract for frontend phases.

| Argument | Required | Description |
|----------|----------|-------------|
| `N` | No | Phase number (defaults to current phase) |

**Prerequisites:** `.planning/ROADMAP.md` exists, phase has frontend/UI work
**Produces:** `\{phase\}-UI-SPEC.md`

```bash
/gsd-ui-phase 2                     # Design contract for phase 2
```

---

### `/gsd-plan-phase`

Research, plan, and verify a phase.

| Argument | Required | Description |
|----------|----------|-------------|
| `N` | No | Phase number (defaults to next unplanned phase) |

| Flag | Description |
|------|-------------|
| `--auto` | Skip interactive confirmations |
| `--research` | Force re-research even if RESEARCH.md exists |
| `--skip-research` | Skip domain research step |
| `--research-phase <N>` | Research-only mode: spawn researcher for phase `<N>`, write RESEARCH.md, exit before planner. Replaces the deleted `gsd-research-phase` standalone command (#3042). |
| `--view` | Research-only modifier: when used with `--research-phase`, print existing RESEARCH.md to stdout and exit (no spawn). |
| `--gaps` | Gap closure mode (reads VERIFICATION.md, skips research) |
| `--skip-verify` | Skip plan checker verification loop |
| `--prd <file>` | Use a PRD file instead of discuss-phase for context |
