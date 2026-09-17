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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/USER-GUIDE.md"
sourceRel: "docs/USER-GUIDE.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/USER-GUIDE.md"
sourceSha256: "4550e970e63aa2066ecde7d4f8350d0d1c104699167310213bc4c5a9ca0fb7e4"
pageSha256: "4651d3cc051315f343bace46add126dc40c669307a902152ed86c6f91e867d36"
contentMode: "local-full"
zh: ""
---

## Troubleshooting

### Programmatic CLI (`gsd-sdk query` vs `gsd-tools.cjs`)

For automation and copy-paste from docs, prefer **`gsd-sdk query`** with a registered subcommand (see [CLI-TOOLS.md — SDK and programmatic access](/lib/10-context-memory/get-shit-done/docs-CLI-TOOLS#sdk-and-programmatic-access) and [QUERY-HANDLERS.md](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/sdk/src/query/QUERY-HANDLERS.md)). The legacy `node $HOME/.claude/get-shit-done/bin/gsd-tools.cjs` CLI remains supported for dual-mode operation.

**CLI-only (not in the query registry):** **graphify**, **from-gsd2** / **gsd2-import** — call `gsd-tools.cjs` (see [QUERY-HANDLERS.md](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/sdk/src/query/QUERY-HANDLERS.md)). **Two different `state` JSON shapes in the legacy CLI:** `state json` (frontmatter rebuild) vs `state load` (`config` + `state_raw` + flags). **`gsd-sdk query` today:** both `state.json` and `state.load` resolve to the frontmatter-rebuild handler — use `node …/gsd-tools.cjs state load` when you need the CJS `state load` shape. See [CLI-TOOLS.md](/lib/10-context-memory/get-shit-done/docs-CLI-TOOLS#sdk-and-programmatic-access) and QUERY-HANDLERS.

### STATE.md Out of Sync

If STATE.md shows incorrect phase status or position, use the state consistency commands (**CJS-only** until ported to the query layer):

```bash
node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" state validate          # Detect drift between STATE.md and filesystem
node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" state sync --verify     # Preview what sync would change
node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" state sync              # Reconstruct STATE.md from disk
```

These commands are new in v1.32 and replace manual STATE.md editing.

### Read-Before-Edit Infinite Retry Loop

Some non-Claude runtimes (Cline, Augment Code) may enter an infinite retry loop when an agent attempts to edit a file it hasn't read. The `gsd-read-before-edit.js` hook (v1.32) detects this pattern and advises reading the file first. If your runtime doesn't support PreToolUse hooks, add this to your project's `CLAUDE.md`:

```markdown
## Edit Safety Rule
Always read a file before editing it. Never call Edit or Write on a file you haven't read in this session.
```

### "Project already initialized"

You ran `/gsd-new-project` but `.planning/PROJECT.md` already exists. This is a safety check. If you want to start over, delete the `.planning/` directory first.

### Context Degradation During Long Sessions

Clear your context window between major commands: `/clear` in Claude Code. GSD is designed around fresh contexts -- every subagent gets a clean 200K window. If quality is dropping in the main session, clear and use `/gsd-resume-work` or `/gsd-progress` to restore state.

### Plans Seem Wrong or Misaligned

Run `/gsd-discuss-phase [N]` before planning. Most plan quality issues come from Claude making assumptions that `CONTEXT.md` would have prevented. You can also run `/gsd-discuss-phase --assumptions [N]` to see what Claude intends to do before committing to a plan.

### Discuss-Phase Uses Technical Jargon I Don't Understand

`/gsd-discuss-phase` adapts its language based on your `USER-PROFILE.md`. If the profile indicates a non-technical owner — `learning_style: guided`, `jargon` listed as a frustration trigger, or `explanation_depth: high-level` — gray area questions are automatically reframed in product-outcome language instead of implementation terminology.

To enable this: run `/gsd-profile-user` to generate your profile. The profile is stored at `~/.claude/get-shit-done/USER-PROFILE.md` and is read automatically on every `/gsd-discuss-phase` invocation. No other configuration is required.

### Execution Fails or Produces Stubs

Check that the plan was not too ambitious. Plans should have 2-3 tasks maximum. If tasks are too large, they exceed what a single context window can produce reliably. Re-plan with smaller scope.

### Lost Track of Where You Are

Run `/gsd-progress`. It reads all state files and tells you exactly where you are and what to do next.

### Need to Change Something After Execution

Do not re-run `/gsd-execute-phase`. Use `/gsd-quick` for targeted fixes, or `/gsd-verify-work` to systematically identify and fix issues through UAT.

### Model Costs Too High

Switch to budget profile: `/gsd-config --profile budget`. Disable research and plan-check agents via `/gsd-settings` if the domain is familiar to you (or to Claude).

### Tuning model cost by phase (`models`) — added in v1.40

If you've heard "use Opus for planning, Sonnet for verification" and want to apply that without learning the agent taxonomy, add a `models` block to `.planning/config.json`:

```json
{
  "model_profile": "balanced",
  "models": {
    "planning": "opus",
    "discuss": "opus",
    "research": "sonnet",
    "execution": "opus",
    "verification": "sonnet",
    "completion": "sonnet"
  }
}
```

The six slots (`planning` / `discuss` / `research` / `execution` / `verification` / `completion`) accept tier aliases (`opus`, `sonnet`, `haiku`, `inherit`). Each slot covers a group of agents — for example, setting `models.research = "sonnet"` applies to `gsd-phase-researcher`, `gsd-codebase-mapper`, `gsd-research-synthesizer`, and the other research agents in one shot.

Need a per-agent exception? Add `model_overrides` alongside — it wins over `models`:

```json
{
  "models": { "research": "sonnet" },
  "model_overrides": {
    "gsd-codebase-mapper": "haiku"
  }
}
```

That gives sonnet to all research agents *except* the codebase mapper, which runs haiku for the cheap-but-broad fan-out scan.

For the full mapping table and resolution-precedence rules, see [Per-Phase-Type Models](/lib/10-context-memory/get-shit-done/docs-CONFIGURATION/index#per-phase-type-models-models--added-in-v140) in the configuration reference.

### Cheap-by-default with `dynamic_routing` — added in v1.40

If you've been paying Opus rates everywhere as insurance against a single hard verification, dynamic routing flips it: every agent starts on a cheaper tier and escalates only when the orchestrator marks a soft failure (verification inconclusive, plan-check FLAG, etc.).

```json
{
  "dynamic_routing": {
    "enabled": true,
    "tier_models": {
      "light":    "haiku",
      "standard": "sonnet",
      "heavy":    "opus"
    },
    "escalate_on_failure": true,
    "max_escalations": 1
  }
}
```

Each agent has a default tier (`light`, `standard`, or `heavy`). On the first attempt, GSD picks `tier_models[default_tier]`. If the orchestrator detects a soft failure, it re-spawns once at the next tier up. `max_escalations` caps total retries so a runaway loop can't burn through your budget.

Concretely:
- `gsd-codebase-mapper` (default `light`) → first attempt = `haiku`. If escalated → `sonnet`.
- `gsd-verifier` (default `standard`) → first attempt = `sonnet`. If escalated → `opus`.
- `gsd-planner` (default `heavy`) → always `opus`. No tier above; can't escalate further.

To turn it off, set `dynamic_routing.enabled: false` (the default) — behavior is identical to today.

For the full agent → tier mapping and resolution-precedence rules, see [Dynamic Routing](/lib/10-context-memory/get-shit-done/docs-CONFIGURATION/index#dynamic-routing-with-failure-tier-escalation-dynamic_routing--added-in-v140) in the configuration reference.

### Trim MCP servers to reduce per-turn cost (the biggest lever GSD doesn't own)

Before tuning `model_profile` or `models.<phase_type>`, audit which **MCP servers** your harness has enabled. Every enabled MCP server injects its tool schema into every turn — heavyweight servers like browser/playwright tools or platform-specific helpers can cost 20k+ tokens each, often dwarfing whatever GSD's resolver can save.

This is a **harness setting**, not a GSD setting. The toggle lives in `.claude/settings.json`:

```json
{
  "enabledMcpjsonServers": ["context7"],
  "disabledMcpjsonServers": ["playwright", "mac-tools"]
}
```

Quick audit before a long phase:

- Are any browser / playwright tools enabled when this phase has no UI work?
- Are any platform-specific tools (Mac-tools, Windows-tools, OS-specific) enabled when not needed?
- Are any project-specific MCPs from a different project still enabled here?

Each disabled server removes its schema from every subsequent turn for the rest of the session. Trimming MCPs **compounds** with `model_profile` tuning — both levers are additive, and MCP savings show up immediately across every subagent the orchestrator spawns.

For the full audit, harness reference, and the composition note with `model_profile`, see [MCP Tool Schema Cost](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/get-shit-done/references/context-budget.md#mcp-tool-schema-cost-harness-concern) in the bundled `context-budget.md` reference.

### Using Non-Claude Runtimes (Codex, OpenCode, Gemini CLI, Kilo)

> **Codex CLI minimum supported version: `0.130.0`** (issue [#3562](https://github.com/gsd-build/get-shit-done/issues/3562)).
>
> Codex CLI [0.130.0](https://github.com/openai/codex/releases/tag/rust-v0.130.0) (released 2026-05-08) removed extra-skills-roots discovery via [openai/codex#21485](https://github.com/openai/codex/pull/21485). From that version onward, Codex only discovers commands from `~/.codex/skills/<name>/SKILL.md` (user root), `<project>/.codex/skills/` (cwd root), and registered plugin roots. The GSD installer writes `~/.codex/skills/gsd-<name>/SKILL.md` directly so `$gsd-help`, `$gsd-new-project`, etc. are discoverable after restart.
>
> **Earlier Codex CLI versions** (pre-0.130.0) had additional skill-root scanning that discovered the GSD agent/workflow files in alternate locations. GSD still installs the `~/.codex/skills/gsd-*` copies on those versions, which can show a duplicate listing alongside the legacy auto-discovered surface — restart Codex after install and either upgrade to ≥ 0.130.0 or accept the duplicate entries until you do.

If you installed GSD for a non-Claude runtime, the installer already configured model resolution so all agents use the runtime's default model. No manual setup is needed. Specifically, the installer sets `resolve_model_ids: "omit"` in your config, which tells GSD to skip Anthropic model ID resolution and let the runtime choose its own default model.

To assign different models to different agents on a non-Claude runtime, add `model_overrides` to `.planning/config.json` with fully-qualified model IDs that your runtime recognizes:

```json
{
  "resolve_model_ids": "omit",
  "model_overrides": {
    "gsd-planner": "o3",
    "gsd-executor": "o4-mini",
    "gsd-debugger": "o3"
  }
}
```

The installer auto-configures `resolve_model_ids: "omit"` for Gemini CLI, OpenCode, Kilo, and Codex. If you're manually setting up a non-Claude runtime, add it to `.planning/config.json` yourself.

#### Switching from Claude to Codex with one config change (#2517)

If you want tiered models on Codex without writing a large `model_overrides` block, set `runtime: "codex"` and pick a profile:

```json
{
  "runtime": "codex",
  "model_profile": "balanced"
}
```

GSD will resolve each agent's tier (`opus`/`sonnet`/`haiku`) to the Codex-native model and reasoning effort defined in the runtime tier map (`gpt-5.4` xhigh / `gpt-5.3-codex` medium / `gpt-5.4-mini` medium). The Codex installer embeds both `model` and `model_reasoning_effort` into each agent's TOML automatically. To override a single tier, add `model_profile_overrides.codex.<tier>`. See [Runtime-Aware Profiles](/lib/10-context-memory/get-shit-done/docs-CONFIGURATION/index#runtime-aware-profiles-2517).

See the [Configuration Reference](/lib/10-context-memory/get-shit-done/docs-CONFIGURATION/index#non-claude-runtimes-codex-opencode-gemini-cli-kilo) for the full explanation.

### Installing for Cline

Cline uses a rules-based integration — GSD installs as `.clinerules` rather than slash commands.

```bash
# Global install (applies to all projects)
npx @opengsd/get-shit-done-redux --cline --global

# Local install (this project only)
npx @opengsd/get-shit-done-redux --cline --local
```

Global installs write to `~/.cline/`. Local installs write to `./.cline/`. No custom slash commands are registered — GSD rules are loaded automatically by Cline from the rules file.

### Installing for CodeBuddy

CodeBuddy uses a skills-based integration.

```bash
npx @opengsd/get-shit-done-redux --codebuddy --global
```

Skills are installed to `~/.codebuddy/skills/gsd-*/SKILL.md`.

### Installing for Qwen Code

Qwen Code uses the same open skills standard as Claude Code 2.1.88+.

```bash
npx @opengsd/get-shit-done-redux --qwen --global
```

Skills are installed to `~/.qwen/skills/gsd-*/SKILL.md`. Use the `QWEN_CONFIG_DIR` environment variable to override the default install path.

### Installing for Prerelease Editions (Next / Nightly / Insiders / Preview)

Many supported runtimes ship a prerelease edition alongside their stable release — Windsurf Next, Cursor Nightly, VS Code Insiders, Codex preview channels, JetBrains EAP, and so on. Prerelease editions read from a sibling configuration directory, so the default install path won't reach them.

GSD does not enumerate prerelease editions as separate named runtimes. They are accommodated through the existing `<RUNTIME>_CONFIG_DIR` environment variables and the free-string runtime policy (see [#2517](https://github.com/gsd-build/get-shit-done/issues/2517)) — installs work, paths resolve, GSD operates. Prerelease editions are **best-effort and not separately tested** as part of release CI.

**Pattern.** Set the runtime's `*_CONFIG_DIR` env var to the prerelease directory before running the installer:

```bash
WINDSURF_CONFIG_DIR=~/.codeium/windsurf-next npx @opengsd/get-shit-done-redux@latest --windsurf --global
```

Select the corresponding stable runtime in the installer prompt. Skills land in the prerelease directory; commands appear in the prerelease editor.

**Env-var reference for supported runtimes:**

| Runtime | Stable default | Override env var |
|---|---|---|
| Claude Code | `~/.claude` | `CLAUDE_CONFIG_DIR` |
| Gemini CLI | `~/.gemini` | `GEMINI_CONFIG_DIR` |
| OpenCode | `XDG_CONFIG_HOME/opencode` | `OPENCODE_CONFIG_DIR` |
| Codex | (per Codex CLI) | `--config-dir` flag |
| Copilot | `~/.copilot` | `COPILOT_CONFIG_DIR` |
| Cursor | `~/.cursor` | `CURSOR_CONFIG_DIR` |
| Windsurf | `~/.codeium/windsurf` | `WINDSURF_CONFIG_DIR` |
| Antigravity | `~/.gemini/antigravity` | `ANTIGRAVITY_CONFIG_DIR` |
| Augment | `~/.augment` | `AUGMENT_CONFIG_DIR` |
| Trae | `~/.trae` | `TRAE_CONFIG_DIR` |
| Qwen Code | `~/.qwen` | `QWEN_CONFIG_DIR` |
| Kilo | `~/.config/kilo` | `KILO_CONFIG_DIR` |
| CodeBuddy | `~/.codebuddy` | `CODEBUDDY_CONFIG_DIR` |
| Cline | `~/.cline` | `CLINE_CONFIG_DIR` |

If your runtime's prerelease channel is not listed, point the matching env var at its config directory and file an issue if the install fails for any reason other than the path mapping.

### Using Claude Code with Non-Anthropic Providers (OpenRouter, Local)

If GSD subagents call Anthropic models and you're paying through OpenRouter or a local provider, switch to the `inherit` profile: `/gsd-config --profile inherit`. This makes all agents use your current session model instead of specific Anthropic models. See also `/gsd-settings` → Model Profile → Inherit.

### Working on a Sensitive/Private Project

Set `commit_docs: false` during `/gsd-new-project` or via `/gsd-settings`. Add `.planning/` to your `.gitignore`. Planning artifacts stay local and never touch git.

### GSD Update Overwrote My Local Changes

Since v1.17, the installer backs up locally modified files to `gsd-local-patches/`. Run `/gsd-update --reapply` to merge your changes back.

### Cannot Update via npm

If `npx @opengsd/get-shit-done-redux` fails due to npm outages or network restrictions, see [docs/manual-update.md](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/manual-update.md) for a step-by-step manual update procedure that works without npm access.

### Surface GSD Update Notifications Without GSD's Statusline

GSD checks for new versions in the background and writes the result to `~/.cache/gsd/gsd-update-check.json`. By default, GSD's statusline (`hooks/gsd-statusline.js`) reads that cache and shows the update indicator. If you use a different statusline (for example `ccstatusline`) or none at all, the update info is invisible.

**Opt-in fix:** during interactive install, when you decline (or keep your existing) statusline, the installer offers a one-time prompt:

```text
Optional: GSD update banner
  1) No banner (default)
  2) Install update banner
```

Choose `2` (or type `y`/`yes`) and the installer registers `hooks/gsd-update-banner.js` as a `SessionStart` hook. From the next session onward, GSD prints a one-line `systemMessage` only when the cache reports an update available:

```text
GSD update available: 1.39.0 → 1.40.0. Run /gsd-update.
```

The banner is silent when no update is available. If the cache file is corrupt, GSD emits one diagnostic line (`GSD update check failed.`) and stays silent for 24 hours so a broken cache does not nag every session.

**Opt-out / removal:** delete the SessionStart hook entry that references `gsd-update-banner.js` from your runtime's `settings.json` (Claude Code: `~/.claude/settings.json`; Gemini: `~/.gemini/settings.json`). `npx @opengsd/get-shit-done-redux --uninstall` removes both the script and the registration in one pass.

The banner is not offered when GSD's statusline is installed — that channel already surfaces update info, so re-prompting would be noise.

### Workflow Diagnostics (`/gsd-forensics`)

When a workflow fails in a way that isn't obvious -- plans reference nonexistent files, execution produces unexpected results, or state seems corrupted -- run `/gsd-forensics` to generate a diagnostic report.

**What it checks:**

- Git history anomalies (orphaned commits, unexpected branch state, rebase artifacts)
- Artifact integrity (missing or malformed planning files, broken cross-references)
- State inconsistencies (ROADMAP status vs. actual file presence, config drift)

**Output:** A diagnostic report written to `.planning/forensics/` with findings and suggested remediation steps.

### Executor Subagent Gets "Permission denied" on Bash Commands

GSD's `gsd-executor` subagents need write-capable Bash access to a project's standard tooling — `git commit`, `bin/rails`, `bundle exec`, `npm run`, `uv run`, and similar commands. Claude Code's default `~/.claude/settings.json` only allows a narrow set of read-only git commands, so a fresh install will hit "Permission to use Bash has been denied" the first time an executor tries to make a commit or run a build tool.

**Fix: add the required patterns to `~/.claude/settings.json`.**

The patterns you need depend on your stack. Copy the block for your stack and add it to the `permissions.allow` array.

#### Required for all stacks (git + gh)

```json
"Bash(git add:*)",
"Bash(git commit:*)",
"Bash(git merge:*)",
"Bash(git worktree:*)",
"Bash(git rebase:*)",
"Bash(git reset:*)",
"Bash(git checkout:*)",
"Bash(git switch:*)",
"Bash(git restore:*)",
"Bash(git stash:*)",
"Bash(git rm:*)",
"Bash(git mv:*)",
"Bash(git fetch:*)",
"Bash(git cherry-pick:*)",
"Bash(git apply:*)",
"Bash(gh:*)"
```

#### Rails / Ruby

```json
"Bash(bin/rails:*)",
"Bash(bin/brakeman:*)",
"Bash(bin/bundler-audit:*)",
"Bash(bin/importmap:*)",
"Bash(bundle:*)",
"Bash(rubocop:*)",
"Bash(erb_lint:*)"
```

#### Python / uv

```json
"Bash(uv:*)",
"Bash(python:*)",
"Bash(pytest:*)",
"Bash(ruff:*)",
"Bash(mypy:*)"
```

#### Node / npm / pnpm / bun

```json
"Bash(npm:*)",
"Bash(npx:*)",
"Bash(pnpm:*)",
"Bash(bun:*)",
"Bash(node:*)"
```

#### Rust / Cargo

```json
"Bash(cargo:*)"
```

**Example `~/.claude/settings.json` snippet (Rails project):**

```json
{
  "permissions": {
    "allow": [
      "Write",
      "Edit",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git merge:*)",
      "Bash(git worktree:*)",
      "Bash(git rebase:*)",
      "Bash(git reset:*)",
      "Bash(git checkout:*)",
      "Bash(git switch:*)",
      "Bash(git restore:*)",
      "Bash(git stash:*)",
      "Bash(git rm:*)",
      "Bash(git mv:*)",
      "Bash(git fetch:*)",
      "Bash(git cherry-pick:*)",
      "Bash(git apply:*)",
      "Bash(gh:*)",
      "Bash(bin/rails:*)",
      "Bash(bin/brakeman:*)",
      "Bash(bin/bundler-audit:*)",
      "Bash(bundle:*)",
      "Bash(rubocop:*)"
    ]
  }
}
```

**Per-project permissions (scoped to one repo):** If you prefer to allow these patterns for a single project rather than globally, add the same `permissions.allow` block to `.claude/settings.local.json` in your project root instead of `~/.claude/settings.json`. Claude Code checks project-local settings first.

**Interactive guidance:** When an executor is blocked mid-phase, it will identify the exact pattern needed (e.g. `"Bash(bin/rails:*)"`) so you can add it and re-run `/gsd-execute-phase`.

### Subagent Appears to Fail but Work Was Done

A known workaround exists for a Claude Code classification bug. GSD's orchestrators (execute-phase, quick) spot-check actual output before reporting failure. If you see a failure message but commits were made, check `git log` -- the work may have succeeded.

### Parallel Execution Causes Build Lock Errors

If you see pre-commit hook failures, cargo lock contention, or 30+ minute execution times during parallel wave execution, this is caused by multiple agents triggering build tools simultaneously. GSD handles this automatically since v1.26 — parallel agents use `--no-verify` on commits and the orchestrator runs hooks once after each wave. If you're on an older version, add this to your project's `CLAUDE.md`:

```markdown
## Git Commit Rules for Agents
All subagent/executor commits MUST use `--no-verify`.
```

To disable parallel execution entirely: `/gsd-settings` → set `parallelization.enabled` to `false`.

### Windows: Installation Crashes on Protected Directories

If the installer crashes with `EPERM: operation not permitted, scandir` on Windows, this is caused by OS-protected directories (e.g., Chromium browser profiles). Fixed since v1.24 — update to the latest version. As a workaround, temporarily rename the problematic directory before running the installer.
