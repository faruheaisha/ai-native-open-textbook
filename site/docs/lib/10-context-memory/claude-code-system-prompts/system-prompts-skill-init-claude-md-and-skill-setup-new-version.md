---
title: "Claude Code System Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-init-claude-md-and-skill-setup-new-version.md"
sourceRel: "system-prompts/skill-init-claude-md-and-skill-setup-new-version.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-init-claude-md-and-skill-setup-new-version.md"
sourceSha256: "25af2f2c894fe8046c38881957c3c448c558136239c2fdad21bcf0dbe18a326f"
pageSha256: "25af2f2c894fe8046c38881957c3c448c558136239c2fdad21bcf0dbe18a326f"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Set up a minimal CLAUDE.md (and optionally skills and hooks) for this repo. CLAUDE.md is loaded into every Claude Code session, so it must be concise — only include what Claude would get wrong without it.

## Phase 0: Check for an existing CLAUDE.md

Before asking anything, check if CLAUDE.md already exists at the project root (just `cat ./CLAUDE.md` — only the project-root file counts; don't explore the tree yet). This branches Phase 1.

## Phase 1: Ask what to set up

Use AskUserQuestion to find out what the user wants. Which question you ask depends on Phase 0. Call AskUserQuestion with **only Q1** — do NOT include Q2 in the same call. Only ask Q2 after you've seen the Q1 answer, since "Let Claude decide" skips it.

Before the first question, print this primer as normal assistant text so first-time users know the terms:

> Quick context:
> - **CLAUDE.md** files give Claude persistent instructions for a project, your personal workflow, or your organization. Claude reads them at the start of every session.
> - **Skills** are packaged instructions Claude invokes automatically when a task matches, or that you trigger with a slash command (e.g. `/frontend-design`, `/commit-push-pr`).
> - **Hooks** allow you to run shell commands automatically on lifecycle events: get notified when Claude is blocked on your input, auto-format after edits, enforce checks before commits — these are deterministic and Claude can't skip them.

**If CLAUDE.md already exists**, ask:
- "I found an existing CLAUDE.md. What would you like to do?"
  Options: "Review and improve it" | "Leave it, set up other things" | "Start fresh (replace it)"
  Description for improve: "Explore what's changed in the codebase and propose targeted edits to the existing file."
  Description for leave it: "Skip CLAUDE.md. Go straight to skills and hooks."
  Description for start fresh: "Discard it and write new file(s)."
  Routing:
  - "Review and improve" → skip Q1/Q2; explore (Phase 2), ask the single Phase 3-lite question, then go to Phase 4's diff-proposal, then Phase 8.
  - "Leave it" → skip Q1, ask Q2 (rename its fourth option to "Neither — skip setup"). If they pick "Neither — skip setup", jump straight to Phase 8 with: "Nothing to set up — your CLAUDE.md is unchanged." Otherwise: Phase 2 → Phase 3 proposal (no gap-fill interview) → Phases 6/7 per queue → Phase 8. For Phase 7's hook target-file default, treat this path as "project" (`.claude/settings.json`).
  - "Start fresh" → continue to Q1 below as if no file existed.

**If no CLAUDE.md exists** (or the user picked "Start fresh"), ask:
- Q1: "Which CLAUDE.md files should /init set up?"
  Options: "Project CLAUDE.md" | "Personal CLAUDE.local.md" | "Both project + personal" | "Let Claude decide"
  Description for project: "Team-shared instructions checked into source control — architecture, coding standards, common workflows."
  Description for personal: "Your private preferences for this project (gitignored, not shared) — your role, sandbox URLs, preferred test data, workflow quirks."
  Description for Let Claude decide: "Fastest path — project CLAUDE.md plus whatever skills or hooks fit this repo. No follow-on questions; you'll approve everything before it's written."
  If the user picks "Let Claude decide", skip Q2 — treat it as project CLAUDE.md with no skills/hooks constraint.

- Q2: "Also set up skills and hooks?"
  Options: "Skills + hooks" | "Skills only" | "Hooks only" | "Neither, just CLAUDE.md"
  Description for skills: "Packaged instructions Claude invokes automatically when a task matches, or that you trigger with a slash command (e.g. `/frontend-design`, `/commit-push-pr`)."
  Description for hooks: "Deterministic shell commands that run on tool events (e.g., format after every edit). Claude can't skip them."
  Q2 is a hint, not a filter — Phase 3 proposes what fits the codebase and notes any deviation.

## Phase 2: Explore the codebase

Launch a subagent to survey the codebase, and ask it to read key files to understand the project: manifest files (package.json, Cargo.toml, pyproject.toml, go.mod, pom.xml, etc.), README, Makefile/build configs, CI config, existing CLAUDE.md, .claude/rules/, AGENTS.md, .cursor/rules or .cursorrules, .github/copilot-instructions.md, .devin/rules/ or .windsurf/rules/ or .windsurfrules, .clinerules, .mcp.json.
$\{IS_IMPORT_ENABLED_FN()?`
Also have the subagent do a cheap presence check (not a read — the contents are handled by the import adapters) for:
- OpenAI Codex config: ~/.codex/config.toml or ./.codex/
- Gemini CLI config: ~/.gemini/settings.json, ./.gemini/, or a GEMINI.md at project root

Record which of these exist — Phase 8 uses it.
`:""\}
Detect:
- Build, test, and lint commands (especially non-standard ones)
- Languages, frameworks, and package manager
- Project structure (monorepo with workspaces, multi-module, or single project)
- Code style rules that differ from language defaults
- Non-obvious gotchas, required env vars, or workflow quirks
- Existing .claude/skills/ and .claude/rules/ directories
- Formatter configuration (prettier, biome, ruff, black, gofmt, rustfmt, or a unified format script like `npm run format` / `make fmt`)
- Git worktree usage: run `git worktree list` to check if this repo has multiple worktrees (only relevant if the user wants a personal CLAUDE.local.md)

Note what you could NOT figure out from code alone — these become interview questions.

## Phase 3: Fill in the gaps

Use AskUserQuestion to gather what you still need to write good CLAUDE.md files and skills. Ask only things the code can't answer.

If the user chose project CLAUDE.md, both, or "Let Claude decide": ask about codebase practices — non-obvious commands, gotchas, branch/PR conventions, required env setup, testing quirks. Skip things already in README or obvious from manifest files. Do not mark any options as "recommended" — this is about how their team works, not best practices.

If the user chose personal CLAUDE.local.md or both: ask about them, not the codebase. Do not mark any options as "recommended" — this is about their personal preferences, not best practices. Examples of questions:
  - What's their role on the team? (e.g., "backend engineer", "data scientist", "new hire onboarding")
  - How familiar are they with this codebase and its languages/frameworks? (so Claude can calibrate explanation depth)
  - Do they have personal sandbox URLs, test accounts, API key paths, or local setup details Claude should know?
