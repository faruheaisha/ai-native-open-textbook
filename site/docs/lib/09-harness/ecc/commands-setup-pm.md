---
title: "Package Manager Setup"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/setup-pm.md"
sourceRel: "commands/setup-pm.md"
rawUrl: "/raw/09-harness/ecc/commands/setup-pm.md"
sourceSha256: "163b3cd106028d21dbd2a91b47f1cf99957e40a78ed9e5e5dc8507e225f73a2d"
pageSha256: "163b3cd106028d21dbd2a91b47f1cf99957e40a78ed9e5e5dc8507e225f73a2d"
contentMode: "local-full"
zh: ""
---

# Package Manager Setup

Configure your preferred package manager for this project or globally.

## Usage

```bash
# Detect current package manager
node scripts/setup-package-manager.js --detect

# Set global preference
node scripts/setup-package-manager.js --global pnpm

# Set project preference
node scripts/setup-package-manager.js --project bun

# List available package managers
node scripts/setup-package-manager.js --list
```

## Detection Priority

When determining which package manager to use, the following order is checked:

1. **Environment variable**: `CLAUDE_PACKAGE_MANAGER`
2. **Project config**: `.claude/package-manager.json`
3. **package.json**: `packageManager` field
4. **Lock file**: Presence of package-lock.json, yarn.lock, pnpm-lock.yaml, or bun.lockb
5. **Global config**: `~/.claude/package-manager.json`
6. **Fallback**: First available package manager (pnpm > bun > yarn > npm)

## Configuration Files

### Global Configuration
```json
// ~/.claude/package-manager.json
{
  "packageManager": "pnpm"
}
```

### Project Configuration
```json
// .claude/package-manager.json
{
  "packageManager": "bun"
}
```

### package.json
```json
{
  "packageManager": "pnpm@8.6.0"
}
```

## Environment Variable

Set `CLAUDE_PACKAGE_MANAGER` to override all other detection methods:

```bash
# Windows (PowerShell)
$env:CLAUDE_PACKAGE_MANAGER = "pnpm"

# macOS/Linux
export CLAUDE_PACKAGE_MANAGER=pnpm
```

## Run the Detection

To see current package manager detection results, run:

```bash
node scripts/setup-package-manager.js --detect
```
