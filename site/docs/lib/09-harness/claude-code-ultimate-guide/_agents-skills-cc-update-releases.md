---
title: "Update Claude Code Releases"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/.agents/skills/cc/update-releases.md"
sourceRel: ".agents/skills/cc/update-releases.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/.agents/skills/cc/update-releases.md"
sourceSha256: "f00ae4801ede0a61fcf4c408e18ba50f2a1361948ceb714c1e6d4f011d08fd88"
pageSha256: "f00ae4801ede0a61fcf4c408e18ba50f2a1361948ceb714c1e6d4f011d08fd88"
contentMode: "local-full"
zh: ""
---

# Update Claude Code Releases

Fetch the latest Claude Code releases from the official GitHub CHANGELOG and sync both:
1. **Guide YAML**: `/Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide/machine-readable/claude-code-releases.yaml`
2. **Landing TS**: `/Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide-landing/src/data/releases.ts`

## Step 1: Parse Arguments

- `--since <version>` — process only versions strictly newer than this
- `--dry-run` — show planned changes, don't write anything
- No args — auto-detect from `latest:` field in current YAML

## Step 2: Read Current State

Read the guide YAML to get:
- `latest`: current latest version (e.g. "2.1.66")
- Full list of already-tracked versions

## Step 3: Fetch Official CHANGELOG

Use WebFetch to retrieve:
`https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md`

Parse all `## X.Y.Z` blocks. For each block, extract:
- Version string (semver, no "v" prefix)
- All bullet points as the highlights list

## Step 4: Fetch Dates from npm Registry

For each new version detected, get the publish date from npm:

```bash
npm view @anthropic-ai/claude-code time --json 2>/dev/null
```

Parse the JSON to get ISO dates, convert to:
- YAML format: `YYYY-MM-DD`
- Landing format: `Mon D, YYYY` (e.g. `Mar 5, 2026`)

If npm fetch fails for a version, use today's date and note it.

## Step 5: Identify New Versions

Compare CHANGELOG versions against YAML. Versions in CHANGELOG but not in YAML are new.

If `--since <version>` was passed, only consider versions > that version.

Display to the user:
```
Current latest: v2.1.66
New versions found: N
  - 2.1.67 (Mar 5, 2026): [first highlight]
  - 2.1.68 (Mar 6, 2026): [first highlight]
```

If no new versions → display "Already up to date. Latest: vX.Y.Z" and exit.

If `--dry-run`, show the full planned diff for both files and exit without writing.

Ask: **"Update guide YAML + landing releases.ts? (y/n)"**

## Step 6: Update Guide YAML

Prepend new versions to the `releases:` array (newest first). Format each entry:

```yaml
- version: "X.Y.Z"
  date: "YYYY-MM-DD"
  highlights:
    - "Regular improvement"
    - "Fixed: bug description"
  breaking: []  # or list breaking changes if present
```

Update top-level fields:
```yaml
latest: "X.Y.Z"  # newest version
updated: "YYYY-MM-DD"  # today
```

## Step 7: Update Landing releases.ts

Prepend new releases to the `releases` array. Format each entry:

```typescript
{
  version: 'vX.Y.Z',
  date: 'Mon D, YYYY',
  highlights: [
    'Improvement description',
    'Fixed: bug description',
  ],
  latest: true,         // only on the newest version
},
```

**HTML formatting rules:**
- New slash commands → `<code>/command</code>`
- New env vars → `<code>ENV_VAR=value</code>`
- Technical terms → `<code>term</code>`
- Bugfixes start with → `Fixed: description`

**`latest` flag:** Set `latest: true` only on the newest version. Remove `latest: true` from the previous entry that had it.

**`initiallyVisible` logic:**
- `false` if: single bugfix/patch

## Step 8: Handle Breaking Changes

If any new version's highlights mention: "removed", "deprecated", "renamed", "migrated", "security fix", "breaking" → check if it should be added to `breakingChanges` in `releases.ts`.

If yes, append to `breakingChanges`:
```typescript
{ badge: 'Type', description: 'What changed with <code>code</code> (vX.Y.Z)' }
```

Badge options: `Security`, `Removed`, `OAuth`, `Install`, `Syntax`, `Behavior`

## Step 9: Summary

Show final summary:

```
✅ Guide YAML updated: +N versions (latest: vX.Y.Z)
✅ Landing releases.ts updated: +N releases
⚠️  Breaking changes added: [list if any, else "none"]

Next steps:
  cd /Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide
  git diff machine-readable/claude-code-releases.yaml

  cd /Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide-landing
  pnpm build  # validate before pushing
```
