---
title: "source-command-changelog"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/.agents/skills/source-command-changelog/SKILL.md"
sourceRel: ".agents/skills/source-command-changelog/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/.agents/skills/source-command-changelog/SKILL.md"
sourceSha256: "312303c7b3ef16307485fdf62a61e516ee5db1faaac56c3c773a40c87f229e38"
pageSha256: "312303c7b3ef16307485fdf62a61e516ee5db1faaac56c3c773a40c87f229e38"
contentMode: "local-full"
zh: ""
---

# source-command-changelog

Use this skill when the user asks to run the migrated source command `changelog`.

## Command Template

# CHANGELOG Viewer

Display recent entries from CHANGELOG.md with optional count limit.

## Usage

```
/changelog       # Show last 5 entries (default)
/changelog 10    # Show last 10 entries
/changelog all   # Show all entries
```

## What to Display

Read `CHANGELOG.md` and extract the last N version entries with:
- Version number
- Release date
- All sections (Added, Changed, Fixed, etc.)
- Full content per section

## Output Format

```
📋 Recent CHANGELOG Entries

═══════════════════════════════════════════════════════════

## [3.9.11] - 2026-01-20

### Added
- Production Safety Rules (Section 14.3)
  - Critical safety practices for production deployments
  - Rollback procedures and monitoring guidelines

### Documentation
- Enhanced deployment workflow documentation
- Added safety checklist templates

═══════════════════════════════════════════════════════════

## [3.9.10] - 2026-01-19

### Added
- DevOps & SRE Guide with FIRE Framework
  - Fault tolerance patterns
  - Incident response protocols
  - Recovery procedures
  - Escalation guidelines

### Documentation
- New Section 9.18: DevOps & SRE Practices
- 45+ operational best practices

═══════════════════════════════════════════════════════════

[... more entries ...]

───────────────────────────────────────────────────────────
Showing 5 of N total entries
Use /changelog 10 for more, or /changelog all for complete history
```

## Implementation

1. Read CHANGELOG.md
2. Parse entries using regex: `## \[(\d+\.\d+\.\d+)\] - (\d\{4\}-\d\{2\}-\d\{2\})`
3. Extract content between version headers
4. Limit to N entries (default 5)
5. Format with clear separators
6. Add footer with total count

## Special Handling

- Skip `[Unreleased]` section if present at top
- Handle missing dates gracefully
- Preserve markdown formatting in descriptions
- Show section hierarchy (###, bullet points)
