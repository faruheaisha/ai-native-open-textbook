---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/FEATURES.md"
sourceRel: "docs/FEATURES.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/FEATURES.md"
sourceSha256: "61edc3296bf4ef591d33619cc636f09ee0f1c5e7f6efa257be1536b819f28e69"
pageSha256: "7a50f84cf2cde5bdf3f81e46a0e06803ef9fd38c6a9a7ddb74a0d43076e527eb"
contentMode: "local-full"
zh: ""
---

## Infrastructure Features

### 34. Git Integration

**Purpose:** Atomic commits, branching strategies, and clean history management.

**Requirements:**
- REQ-GIT-01: Each task MUST get its own atomic commit
- REQ-GIT-02: Commit messages MUST follow structured format: `type(scope): description`
- REQ-GIT-03: System MUST support 3 branching strategies: `none`, `phase`, `milestone`
- REQ-GIT-04: Phase strategy MUST create one branch per phase
- REQ-GIT-05: Milestone strategy MUST create one branch per milestone
- REQ-GIT-06: Complete-milestone MUST offer squash merge (recommended) or merge with history
- REQ-GIT-07: System MUST respect `commit_docs` setting for `.planning/` files
- REQ-GIT-08: System MUST auto-detect `.planning/` in `.gitignore` and skip commits

**Commit Format:**
```
type(phase-plan): description

# Examples:
docs(08-02): complete user registration plan
feat(08-02): add email confirmation flow
fix(03-01): correct auth token expiry
```

---

### 35. CLI Tools

**Purpose:** Programmatic utilities for workflows and agents, replacing repetitive inline bash patterns.

**Requirements:**
- REQ-CLI-01: System MUST provide atomic commands for state, config, phase, roadmap operations
- REQ-CLI-02: System MUST provide compound `init` commands that load all context for each workflow
- REQ-CLI-03: System MUST support `--raw` flag for machine-readable output
- REQ-CLI-04: System MUST support `--cwd` flag for sandboxed subagent operation
- REQ-CLI-05: All operations MUST use forward-slash paths on Windows

**Command Categories:** State (11 subcommands), Phase (5), Roadmap (3), Verify (8), Template (2), Frontmatter (4), Scaffold (4), Init (12), Validate (2), Progress, Stats, Todo

---

### 36. Multi-Runtime Support

**Purpose:** Run GSD across multiple AI coding agent runtimes.

**Requirements:**
- REQ-RUNTIME-01: System MUST support Claude Code, OpenCode, Gemini CLI, Kilo, Codex, Copilot, Antigravity, Trae, Cline, Augment Code, CodeBuddy, Qwen Code
- REQ-RUNTIME-02: Installer MUST transform content per runtime (tool names, paths, frontmatter)
- REQ-RUNTIME-03: Installer MUST support interactive and non-interactive (`--claude --global`) modes
- REQ-RUNTIME-04: Installer MUST support both global and local installation
- REQ-RUNTIME-05: Uninstall MUST cleanly remove all GSD files without affecting other configurations
- REQ-RUNTIME-06: Installer MUST handle platform differences (Windows, macOS, Linux, WSL, Docker)

**Runtime Transformations:**

| Aspect | Claude Code | OpenCode | Gemini | Kilo | Codex | Copilot | Antigravity | Trae | Cline | Augment | CodeBuddy | Qwen Code |
|--------|------------|----------|--------|-------|-------|---------|-------------|------|-------|---------|-----------|-----------|
| Commands | Slash commands | Slash commands | Slash commands | Slash commands | Skills (TOML) | Slash commands | Skills | Skills | Rules | Skills | Skills | Skills |
| Agent format | Claude native | `mode: subagent` | Claude native | `mode: subagent` | Skills | Tool mapping | Skills | Skills | Rules | Skills | Skills | Skills |
| Hook events | `PostToolUse` | N/A | `AfterTool` | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| Config | `settings.json` | `opencode.json(c)` | `settings.json` | `kilo.json(c)` | TOML | Instructions | Config | Config | `.clinerules` | Config | Config | Config |

---

### 37. Hook System

**Purpose:** Runtime event hooks for context monitoring, status display, and update checking.

**Requirements:**
- REQ-HOOK-01: Statusline MUST display model, current task, directory, and context usage
- REQ-HOOK-02: Context monitor MUST inject agent-facing warnings at threshold levels
- REQ-HOOK-03: Update checker MUST run in background on session start
- REQ-HOOK-04: All hooks MUST respect `CLAUDE_CONFIG_DIR` env var
- REQ-HOOK-05: All hooks MUST include 3-second stdin timeout guard
- REQ-HOOK-06: All hooks MUST fail silently on any error
- REQ-HOOK-07: Context usage MUST normalize for autocompact buffer (16.5% reserved)
- REQ-HOOK-08: Update banner MUST be opt-in and silent unless an update is available (PR #2795)

**Statusline Display:**
```text
[⬆ /gsd-update │] model │ [current task │] directory [█████░░░░░ 50%]
```

Color coding: <50% green, <65% yellow, <80% orange, ≥80% red with skull emoji

**Update Banner (opt-in, when GSD statusline isn't used):**

When the user declines (or keeps a non-GSD) statusline, the installer offers a SessionStart banner that surfaces update availability without occupying statusline real estate. The banner reads `~/.cache/gsd/gsd-update-check.json` (written by `gsd-check-update-worker.js`) and emits one line only when an update is available:

```text
GSD update available: 1.39.0 → 1.40.0. Run /gsd-update.
```

The banner is silent when up-to-date and rate-limits "check failed" diagnostics to once per 24 hours. Removed cleanly by `npx @opengsd/get-shit-done-redux --uninstall` or by deleting the SessionStart entry that references `gsd-update-banner.js`.

### 38. Developer Profiling

**Command:** `/gsd-profile-user [--questionnaire] [--refresh]`

**Purpose:** Analyze Claude Code session history to build behavioral profiles across 8 dimensions, generating artifacts that personalize Claude's responses to the developer's style.

**Dimensions:**
1. Communication style (terse vs verbose, formal vs casual)
2. Decision patterns (rapid vs deliberate, risk tolerance)
3. Debugging approach (systematic vs intuitive, log preference)
4. UX preferences (design sensibility, accessibility awareness)
5. Vendor/technology choices (framework preferences, ecosystem familiarity)
6. Frustration triggers (what causes friction in workflows)
7. Learning style (documentation vs examples, depth preference)
8. Explanation depth (high-level vs implementation detail)

**Generated Artifacts:**
- `USER-PROFILE.md` — Full behavioral profile with evidence citations
- `CLAUDE.md` profile section — Auto-discovered by Claude Code

**Flags:**
- `--questionnaire` — Interactive questionnaire fallback when session history is unavailable
- `--refresh` — Re-analyze sessions and regenerate profile

**Pipeline Modules:**
- `profile-pipeline.cjs` — Session scanning, message extraction, sampling
- `profile-output.cjs` — Profile rendering, questionnaire, artifact generation
- `gsd-user-profiler` agent — Behavioral analysis from session data

**Requirements:**
- REQ-PROF-01: Session analysis MUST cover at least 8 behavioral dimensions
- REQ-PROF-02: Profile MUST cite evidence from actual session messages
- REQ-PROF-03: Questionnaire MUST be available as fallback when no session history exists
- REQ-PROF-04: Generated artifacts MUST be discoverable by Claude Code (CLAUDE.md integration)

### 39. Execution Hardening

**Purpose:** Three additive quality improvements to the execution pipeline that catch cross-plan failures before they cascade.

**Components:**

**1. Pre-Wave Dependency Check** (execute-phase)
Before spawning wave N+1, verify key-links from prior wave artifacts exist and are wired correctly. Catches cross-plan dependency gaps before they cascade into downstream failures.

**2. Cross-Plan Data Contracts — Dimension 9** (plan-checker)
New analysis dimension that checks plans sharing data pipelines have compatible transformations. Flags when one plan strips data that another plan needs in its original form.

**3. Export-Level Spot Check** (verify-phase)
After Level 3 wiring verification passes, spot-check individual exports for actual usage. Catches dead stores that exist in wired files but are never called.

**Requirements:**
- REQ-HARD-01: Pre-wave check MUST verify key-links from all prior wave artifacts before spawning next wave
- REQ-HARD-02: Cross-plan contract check MUST detect incompatible data transformations between plans
- REQ-HARD-03: Export spot-check MUST identify dead stores in wired files

---

### 40. Verification Debt Tracking

**Command:** `/gsd-audit-uat`

**Purpose:** Prevent silent loss of UAT/verification items when projects advance past phases with outstanding tests. Surfaces verification debt across all prior phases so items are never forgotten.

**Components:**

**1. Cross-Phase Health Check** (progress.md Step 1.6)
Every `/gsd-progress` call scans ALL phases in the current milestone for outstanding items (pending, skipped, blocked, human_needed). Displays a non-blocking warning section with actionable links.

**2. `status: partial`** (verify-work.md, UAT.md)
New UAT status that distinguishes between "session ended" and "all tests resolved". Prevents `status: complete` when tests are still pending, blocked, or skipped without reason.

**3. `result: blocked` with `blocked_by` tag** (verify-work.md, UAT.md)
New test result type for tests blocked by external dependencies (server, physical device, release build, third-party services). Categorized separately from skipped tests.

**4. HUMAN-UAT.md Persistence** (execute-phase.md)
When verification returns `human_needed`, items are persisted as a trackable HUMAN-UAT.md file with `status: partial`. Feeds into the cross-phase health check and audit systems.

**5. Phase Completion Warnings** (phase.cjs, transition.md)
`phase complete` CLI returns verification debt warnings in its JSON output. Transition workflow surfaces outstanding items before confirmation.

**Requirements:**
- REQ-DEBT-01: System MUST surface outstanding UAT/verification items from ALL prior phases in `/gsd-progress`
- REQ-DEBT-02: System MUST distinguish incomplete testing (partial) from completed testing (complete)
- REQ-DEBT-03: System MUST categorize blocked tests with `blocked_by` tags
- REQ-DEBT-04: System MUST persist human_needed verification items as trackable UAT files
- REQ-DEBT-05: System MUST warn (non-blocking) during phase completion and transition when verification debt exists
- REQ-DEBT-06: `/gsd-audit-uat` MUST scan all phases, categorize items by testability, and produce a human test plan
