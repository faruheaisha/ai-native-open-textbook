---
title: "Setup Package Manager Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.opencode/commands/setup-pm.md"
sourceRel: ".opencode/commands/setup-pm.md"
rawUrl: "/raw/09-harness/ecc/.opencode/commands/setup-pm.md"
sourceSha256: "06cee35a4eed343da268112357030d69621b6bf70c18a702dd9d88e358739ba7"
pageSha256: "06cee35a4eed343da268112357030d69621b6bf70c18a702dd9d88e358739ba7"
contentMode: "local-full"
zh: ""
---

# Setup Package Manager Command

Configure your preferred package manager: $ARGUMENTS

## Your Task

Set up package manager preference for the project or globally.

## Detection Order

1. **Environment variable**: `CLAUDE_PACKAGE_MANAGER`
2. **Project config**: `.claude/package-manager.json`
3. **package.json**: `packageManager` field
4. **Lock file**: Auto-detect from lock files
5. **Global config**: `~/.claude/package-manager.json`
6. **Fallback**: First available

## Configuration Options

### Option 1: Environment Variable
```bash
export CLAUDE_PACKAGE_MANAGER=pnpm
```

### Option 2: Project Config
```bash
# Create .claude/package-manager.json
echo '{"packageManager": "pnpm"}' > .claude/package-manager.json
```

### Option 3: package.json
```json
{
  "packageManager": "pnpm@8.0.0"
}
```

### Option 4: Global Config
```bash
# Create ~/.claude/package-manager.json
echo '{"packageManager": "yarn"}' > ~/.claude/package-manager.json
```

## Supported Package Managers

| Manager | Lock File | Commands |
|---------|-----------|----------|
| npm | package-lock.json | `npm install`, `npm run` |
| pnpm | pnpm-lock.yaml | `pnpm install`, `pnpm run` |
| yarn | yarn.lock | `yarn install`, `yarn run` |
| bun | bun.lockb | `bun install`, `bun run` |

## Verification

Check current setting:
```bash
node scripts/setup-package-manager.js --detect
```

---

**TIP**: For consistency across team, add `packageManager` field to package.json.
