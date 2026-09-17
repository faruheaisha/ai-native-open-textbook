---
title: ".pi — Pi Coding Agent Integration"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.pi/README.md"
sourceRel: ".pi/README.md"
rawUrl: "/raw/09-harness/ecc/.pi/README.md"
sourceSha256: "0196e47160da4cf4e697e13d0c405ff91c877aa18620075a6be931835a6f7d75"
pageSha256: "0196e47160da4cf4e697e13d0c405ff91c877aa18620075a6be931835a6f7d75"
contentMode: "local-full"
zh: ""
---

# .pi — Pi Coding Agent Integration

This directory contains the **Pi adapter** for ECC — a thin extension that connects the
[@earendil-works/pi-coding-agent](https://github.com/earendil-works/pi-coding-agent)
terminal coding agent to ECC's canonical skills, prompts, and lifecycle hooks.

## Design Principle

ECC's canonical assets—skills, agents, commands, and hooks—**remain the single source of truth**.
This adapter contains **only the integration logic**. No copies, no duplication.

## What This Provides

- **ECC's skills** from `./skills/` — available in Pi as `/skill:<name>`
- **ECC's commands** from `./commands/` — available in Pi as `/<name>`
- **ECC's engineering rules** from `./rules/common/` — injected into Pi's system
  prompt on every turn, so coding style, testing, security, git workflow, and
  code-review standards apply in Pi as they do in other harnesses
- **Session lifecycle hooks** — ECC's SessionStart and SessionEnd hooks, run through ECC's own
  `run-with-flags.js`, so `ECC_HOOK_PROFILE` and `ECC_DISABLED_HOOKS` keep working under Pi
- **Session context injection** — whatever ECC's SessionStart hook returns as
  `additionalContext` is folded into Pi's system prompt for the next turn
- **`/ecc-doctor`** — diagnostic command to verify the integration

Verified against Pi 0.84.1: a global install exposes 285 skills and 94 commands, resolved
directly from `skills/` and `commands/`, with no generated copies.

## Installation

### Option 1: Global Installation (Recommended)

```bash
# Install ECC as a Pi package
pi install git:github.com/affaan-m/ECC

# Or from a local checkout
pi install /path/to/ECC

# Or project-local only
pi install -l /path/to/ECC

# Verify
pi list
```

Then inside Pi, run `/ecc-doctor` to confirm skills, commands, and hooks are available.

To uninstall:

```bash
pi remove git:github.com/affaan-m/ECC
```

### Option 2: Zero-Install (Existing Claude Code Users)

If you already have ECC installed for Claude Code, point Pi at the same canonical directories
from `~/.pi/agent/settings.json`:

```json
{
  "skills": ["~/.claude/skills"],
  "prompts": ["~/.claude/commands"]
}
```

This gives you skills and commands directly. It does **not** include the lifecycle hook adapter
or `/ecc-doctor` — use Option 1 for the full integration.

## How It Works

The `extensions/index.ts` file handles:

1. **Skill and command mounting** — Pi reads `./skills` and `./commands` directly via the
   `pi` key in `package.json`. No transformation is needed: ECC's `SKILL.md` files already
   follow the Agent Skills standard Pi implements, and ECC's command frontmatter
   (`description`, `argument-hint`) is already Pi's prompt-template format
2. **Lifecycle hooks** — Maps Pi's `session_start` to ECC's `session:start` hook
   (`scripts/hooks/session-start.js`) and Pi's `session_shutdown` to ECC's `session:end:marker`
   hook (`scripts/hooks/session-end-marker.js`), both invoked through
   `scripts/hooks/run-with-flags.js` so ECC's profile and disable flags are honored
3. **Rule injection** — Reads ECC's portable engineering rules from the canonical
   `rules/common/` directory at runtime and appends them to the system prompt inside an
