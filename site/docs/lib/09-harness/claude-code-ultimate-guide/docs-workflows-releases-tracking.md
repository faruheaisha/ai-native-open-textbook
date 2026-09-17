---
title: "Claude Code Releases Tracking"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/docs/workflows/releases-tracking.md"
sourceRel: "docs/workflows/releases-tracking.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/docs/workflows/releases-tracking.md"
sourceSha256: "185f5e26121497da63c2ac0889f8bccab97d95818a2421795b2aeec4b2398904"
pageSha256: "185f5e26121497da63c2ac0889f8bccab97d95818a2421795b2aeec4b2398904"
contentMode: "local-full"
zh: ""
---

# Claude Code Releases Tracking

This repo maintains a condensed history of official Claude Code releases.

## Files

| File | Role |
|------|------|
| `machine-readable/claude-code-releases.yaml` | Source of truth (YAML) |
| `guide/core/claude-code-releases.md` | Human-readable version (Markdown) |
| `scripts/update-cc-releases.sh` | Script for checking new versions |

## Check for New Versions

```bash
./scripts/update-cc-releases.sh
```

The script:
1. Fetches the official CHANGELOG from GitHub
2. Compares against our tracked version
3. Displays new releases to condense

## Update Workflow

1. **Verify**: `./scripts/update-cc-releases.sh`
2. **Update YAML**: Add new entry in `claude-code-releases.yaml`
   - Update `latest` and `updated`
   - Add entry in `releases` (condensed: 2-4 highlights max)
   - Add to `breaking_summary` if applicable
   - Add to `milestones` if major feature
3. **Update Markdown**: Update `claude-code-releases.md` consistently
4. **Landing sync**: `./scripts/check-landing-sync.sh`
5. **Commit**: `docs: update Claude Code releases (vX.Y.Z)`

## YAML Entry Format

```yaml
- version: "2.1.13"
  date: "2026-01-20"
  highlights:
    - "Main feature"
    - "Other notable feature"
  breaking:
    - "Description of breaking change (if applicable)"
```
