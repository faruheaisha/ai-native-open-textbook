---
title: "Migrating From ECC 1.x (everything-claude-code) To 2.0"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/docs/MIGRATION-1X-TO-2.0.md"
sourceRel: "docs/MIGRATION-1X-TO-2.0.md"
rawUrl: "/raw/09-harness/ecc/docs/MIGRATION-1X-TO-2.0.md"
sourceSha256: "79e509e8a38ebe07d43959c95bbed34f3d21a5a2fbf55541a1c7437f32b5a2cb"
pageSha256: "79e509e8a38ebe07d43959c95bbed34f3d21a5a2fbf55541a1c7437f32b5a2cb"
contentMode: "local-full"
zh: ""
---

# Migrating From ECC 1.x (everything-claude-code) To 2.0

ECC 2.0 renamed the repo (`affaan-m/everything-claude-code` → `affaan-m/ECC`) and the plugin identifier (`everything-claude-code@everything-claude-code` → `ecc@ecc`). If you installed 1.x, follow this guide to upgrade cleanly. See also the [Naming + Migration Note](/lib/09-harness/ecc/overview#naming--migration-note) in the README.

## TL;DR

```bash
# 1. Install 2.0
/plugin marketplace add https://github.com/affaan-m/ECC
/plugin install ecc@ecc

# 2. Remove the old plugin
/plugin uninstall everything-claude-code@everything-claude-code
```

Then remove any leftover 1.x folders (see below) and restart the session.

## "I now see two ECC plugins"

Expected. `ecc@ecc` and `everything-claude-code@everything-claude-code` are treated as separate plugins by Claude Code. Uninstall the old one; keep only `ecc@ecc`. Running both duplicates skills, commands, and hook executions.

## Leftover folders after uninstalling 1.x

`/plugin uninstall` removes the plugin from the active list, but can leave the old directory in the Claude plugin cache and any manual copies in your home directory.

Safe to delete after the old plugin no longer appears in `/plugin` list:

- The old plugin folder under the Claude plugins directory (e.g. `~/.claude/plugins/...everything-claude-code...`)
- A 1.x manual install in your home folder (a cloned `everything-claude-code/` directory), **if** you are not using it as a working checkout
- Old manually-copied surfaces under `~/.claude/` (`skills/`, `commands/`, `agents/` entries that came from 1.x) — the 2.0 plugin provides current versions

Do NOT delete `~/.claude/rules/` content you copied intentionally, or personal memory/state files.

## Does removing 1.x affect my existing projects?

No. ECC is a harness layer: skills, commands, agents, hooks. It does not alter your project code or git history. Everything ECC produced in your repos (commits, files, PRs) is untouched. Your next session simply loads 2.0 surfaces instead of 1.x ones. Slash-command namespaces changed from `everything-claude-code:*` to `ecc:*`.

## One install path only

Do not stack the plugin install with the manual installer (`install.sh` / `install.ps1` / `npx ecc-universal install --profile full`). Pick one path; stacking creates duplicate skills and duplicate hook runs. If you already stacked, see [Reset / Uninstall ECC](/lib/09-harness/ecc/overview#reset--uninstall-ecc).

## Using 2.0 across harnesses (Codex, Antigravity/agy, OpenCode, Cursor)

2.0 is cross-harness. Use the manual installer with a target:

```bash
npx ecc-universal install --profile core --target codex      # Codex CLI
npx ecc-universal install --profile core --target opencode   # OpenCode
npx ecc-universal install --profile core --target cursor     # Cursor
```

Run `npx ecc-universal consult "<what you need>" --target <harness>` to preview which components fit before installing. Harness-specific guides: [ANTIGRAVITY-GUIDE.md](/lib/09-harness/ecc/docs-ANTIGRAVITY-GUIDE), [HERMES-SETUP.md](/lib/09-harness/ecc/docs-HERMES-SETUP), [QWEN-GUIDE.md](/lib/09-harness/ecc/docs-QWEN-GUIDE), [JOYCODE-GUIDE.md](/lib/09-harness/ecc/docs-JOYCODE-GUIDE).
