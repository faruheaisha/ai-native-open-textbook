---
title: "Antigravity Setup and Usage Guide"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/docs/ANTIGRAVITY-GUIDE.md"
sourceRel: "docs/ANTIGRAVITY-GUIDE.md"
rawUrl: "/raw/09-harness/ecc/docs/ANTIGRAVITY-GUIDE.md"
sourceSha256: "b583c42dd6c87c63127b1dd29926f84d6819fc298f74ef74f8ef02aaefec2ef9"
pageSha256: "b583c42dd6c87c63127b1dd29926f84d6819fc298f74ef74f8ef02aaefec2ef9"
contentMode: "local-full"
zh: ""
---

# Antigravity Setup and Usage Guide

Google Antigravity 2.0 discovers workspace customizations from the project-local
`.agents/` directory. ECC's Antigravity target installs native rules, workflows,
skills, and custom agents into that directory.

Native Antigravity 2.0 installation requires ECC 2.2.0 or newer. ECC 2.1.0 uses
the legacy `.agent/` adapter and does not provide the native layout described
below.

## Quick start

Verify that 2.2.0 is readable from the registry, then run the pinned package
from the project you want to configure:

```bash
npm view ecc-universal version
npx ecc-universal@2.2.0 install --profile minimal --target antigravity
```

### Source checkout alternative

```bash
# Run every command below from the project you want to configure.
# Keep the ECC source checkout separate and use its absolute path.
ECC_ROOT="/absolute/path/to/ECC"

# Install the minimal profile
"$ECC_ROOT/install.sh" --profile minimal --target antigravity

# Compatibility syntax: common rules plus only these language packs
"$ECC_ROOT/install.sh" --target antigravity typescript python go
```

PowerShell uses the same project-root working-directory contract:

```powershell
$EccRoot = "C:\absolute\path\to\ECC"

& "$EccRoot\install.ps1" --profile minimal --target antigravity
& "$EccRoot\install.ps1" --target antigravity typescript python go
```

Start a new Antigravity conversation after installing so the agent receives the
updated skill inventory.

## Native install mapping

| ECC source | Antigravity destination | Purpose |
|---|---|---|
| `rules/` | `.agents/rules/` | Workspace rules, flattened with collision-safe names |
| `commands/` | `.agents/workflows/` | User-invoked slash workflows |
| `skills/<name>/` | `.agents/skills/<name>/` | Agent Skills with a required `SKILL.md` |
| `agents/<name>.md` | `.agents/agents/<name>.md` | Custom main agents and subagents |

ECC does not copy the repository's `.agents/` directory wholesale. That source
tree is Codex packaging and contains Codex-specific marketplace metadata. An
