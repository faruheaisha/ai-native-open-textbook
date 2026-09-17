---
title: "Upgrade Guide"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/docs/upgrade.md"
sourceRel: "docs/upgrade.md"
rawUrl: "/raw/07-coding/spec-kit/docs/upgrade.md"
sourceSha256: "37b3e4078d7e18343ac75d8ea15fb08765c93daf4aac98f037ba8797dca4d396"
pageSha256: "37b3e4078d7e18343ac75d8ea15fb08765c93daf4aac98f037ba8797dca4d396"
contentMode: "local-full"
zh: ""
---

# Upgrade Guide

> You have Spec Kit installed and want to upgrade to the latest version to get new features, bug fixes, or updated slash commands. This guide covers both upgrading the CLI tool and updating your project files.

---

## Quick Reference

| What to Upgrade | Command | When to Use |
|----------------|---------|-------------|
| **CLI Tool (recommended)** | `specify self upgrade` | Latest stable release, in place. Auto-detects whether you installed via `uv tool` or `pipx`. |
| **CLI Tool — pin a version** | `specify self upgrade --tag vX.Y.Z[suffix]` | Upgrade to a specific release tag instead of the latest stable. Suffixes are limited to dev, alpha/beta/rc, and/or build metadata forms. |
| **CLI Tool — manual fallback** | `uv tool install specify-cli --force --from git+https://github.com/github/spec-kit.git@vX.Y.Z` | When `specify self upgrade` isn't available (older installs) or when you want explicit control. |
| **CLI Tool — manual fallback (pipx)** | `pipx install --force git+https://github.com/github/spec-kit.git@vX.Y.Z` | Same as above, for pipx installs. |
| **Project Files** | Run `specify integration upgrade <key>`, then `specify extension update` | Refresh installed integration files and extensions in your project |
| **Both** | Run CLI upgrade, then project update | Recommended for major version updates |

---

## Part 1: Upgrade the CLI Tool

The CLI tool (`specify`) is separate from your project files. Upgrade it to get the latest features and bug fixes.

### Recommended: `specify self upgrade`

The CLI ships with two self-management commands that handle the common case automatically:

```bash
# Check whether a newer release is available (read-only — does not modify anything)
specify self check

# Preview what would run, without actually upgrading
specify self upgrade --dry-run

# Upgrade in place to the latest stable release (auto-detects uv tool vs pipx install)
specify self upgrade

# Or pin a specific release tag (replace vX.Y.Z[suffix] with the tag you want)
specify self upgrade --tag vX.Y.Z[suffix]
```

Bare `specify self upgrade` executes immediately, matching the no-prompt behavior of commands like `pip install -U` and `npm update`. The CLI classifies your runtime into one of: `uv tool`, `pipx`, `uvx (ephemeral)`, source checkout, or unsupported. Only `uv tool` and `pipx` are upgraded automatically; for `uv tool` installs, it runs `uv tool install specify-cli --force --from <git ref>` under the hood so pinned release tags work. The other paths print path-specific guidance and exit 0 without touching anything.

Pinned tags must start with `vMAJOR.MINOR.PATCH`. Optional suffixes are limited to dev, alpha/beta/rc, and/or build metadata forms such as `v1.0.0-rc1`, `v0.8.0.dev0`, `v0.8.0+build.42`, or the combination `v1.0.0-rc1+build.42`; branch names, hash refs, `latest`, and bare versions without `v` are rejected.

Set `SPECIFY_UPGRADE_TIMEOUT_SECS` to cap how long the installer subprocess may run (default: no timeout — interrupt with `Ctrl+C` if needed). If that internal timeout fires, `specify self upgrade` exits 124 and reports that it timed out while waiting for the installer subprocess, including the configured timeout and manual retry command. A real installer exit code 124 is propagated with `Upgrade failed. Installer exit code: 124.`, so scripts should treat exit 124 as ambiguous and inspect the message when they need to distinguish the two cases.

If your installed CLI is older than the release that introduced `specify self upgrade`, use the manual equivalents below. These commands are also useful when you want explicit control over the installer command.

### If you installed with `uv tool install`

Upgrade to a specific release (check [Releases](https://github.com/github/spec-kit/releases) for the latest tag):

```bash
uv tool install specify-cli --force --from git+https://github.com/github/spec-kit.git@vX.Y.Z
```

### If you use one-shot `uvx` commands

Specify the desired release tag:

```bash
uvx --from git+https://github.com/github/spec-kit.git@vX.Y.Z specify init --here --integration copilot
```

`uvx` runs a temporary copy of Spec Kit for that single command. It does not update a persistent `specify` installed with `uv tool install`, `pipx`, or another tool manager. If a newer feature works through `uvx` but your local `specify` still reports an older version, upgrade the persistent CLI with the command that matches your install method.

### If you installed with `pipx`

Upgrade to a specific release:

```bash
pipx install --force git+https://github.com/github/spec-kit.git@vX.Y.Z
```

### Verify the upgrade

```bash
# Confirms the CLI is working and shows installed tools
specify check

# Confirms the installed version against the latest GitHub release
specify self check
```

`specify check` shows the surrounding tool environment; `specify self check` is read-only and tells you whether you're now on the latest release (`Up to date: X.Y.Z`) or if a newer one became available between releases.

---

## Part 2: Updating Project Files

When Spec Kit releases new features (like new slash commands, updated templates, or extension changes), you need to refresh the Spec Kit files that were installed into your project.

### What gets updated?

For existing Spec Kit projects, use the manifest-aware upgrade path first:

- ✅ **Integration command/skill files** (`.claude/skills/`, `.github/prompts/`, `.agents/skills/`, etc.)
- ✅ **Managed shared scripts and templates** (`.specify/scripts/`, `.specify/templates/`) when they are unchanged from the previous managed copy
- ✅ **Installed extensions** when you run `specify extension update`

The integration upgrade command uses the install manifest to detect local edits. If a managed integration file was modified after install, the command stops and asks you to inspect the change or rerun with `--force`.

### What stays safe?

These files are **never touched** by the manifest-aware integration/extension upgrade path:

- ✅ **Your specifications** (`specs/001-my-feature/spec.md`, etc.) - **CONFIRMED SAFE**
- ✅ **Your implementation plans** (`specs/001-my-feature/plan.md`, `tasks.md`, etc.) - **CONFIRMED SAFE**
- ✅ **Your constitution** (`.specify/memory/constitution.md`) when using `specify integration upgrade`
- ✅ **Your source code** - **CONFIRMED SAFE**
- ✅ **Your git history** - **CONFIRMED SAFE**

The `specs/` directory is completely excluded from template packages and will never be modified during upgrades.

### 1. Check installed integrations

Run this inside your project directory:

```bash
specify integration status
```

This reports the default integration, all installed integrations, and any modified or missing managed files. You can also inspect `.specify/integration.json`; installed integrations are listed under `installed_integrations`.

### 2. Upgrade each installed integration

Run this inside your project directory:

```bash
specify integration upgrade <key>
```

Replace `<key>` with an installed integration key such as `copilot`, `claude`, or `codex`. In projects with multiple installed integrations, run the command once per installed key.

**Example:**

```bash
specify integration upgrade claude
specify integration upgrade codex
```

See the [integration reference](/lib/07-coding/spec-kit/docs-reference-integrations#upgrade-an-integration) for options such as `--script`, `--integration-options`, and `--force`.

### 3. Update installed extensions

Run:

```bash
specify extension update
```
