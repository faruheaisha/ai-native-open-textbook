---
title: "Release Notes Generator"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/release-notes-generator/SKILL.md"
sourceRel: "examples/skills/release-notes-generator/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/release-notes-generator/SKILL.md"
sourceSha256: "c5a968fe89fac688ed7342e95f6df7e3704f45d2cf5ca6de673c8c2f7cfcf75f"
pageSha256: "c5a968fe89fac688ed7342e95f6df7e3704f45d2cf5ca6de673c8c2f7cfcf75f"
contentMode: "local-full"
zh: ""
---

# Release Notes Generator

Generate comprehensive release notes in 3 formats from git commits.

## Workflow

1. **Analyze git history** since last release tag or specified version
2. **Fetch PR details** (titles, descriptions, labels) via `gh api`
3. **Categorize changes** into features, bug fixes, improvements, security, breaking changes
4. **Generate 3 outputs**: CHANGELOG.md section (technical), PR release body (semi-technical), Slack message (user-friendly)
5. **Transform language** from technical jargon to accessible messaging
6. **Alert on migrations** if database migrations are detected

## How to Use

### Basic Usage

```
Generate release notes since last release
```

```
Create release notes for version 0.18.0
```

### With Specific Range

```
Generate release notes from v0.17.0 to HEAD
```

### Preview Only

```
Preview release notes without writing files
```

## Output Formats

### 1. CHANGELOG.md Section

Technical format for developers:

```markdown
## [0.18.0] - 2025-12-08

### Objective
[1-2 sentence summary]

### New Features
#### [Feature Name] (#PR)
- **Description**: ...
- **Impact**: ...

### Bug Fixes
- **[Module]**: Description (#issue, [error-tracker] ISSUE-XX)

### Technical Improvements
#### Performance / UI/UX / Architecture
- [Description]

### Database Migrations
[If applicable]

### Statistics
- PRs: X
- Features: Y
- Bugs: Z
```

### 2. PR Release Body

Uses template from `.github/PULL_REQUEST_TEMPLATE/release.md`:
- Objective summary
- Features with specs links
- Bug fixes with error tracker references
- Improvements by category
- Migration instructions
- Deployment checklist

### 3. Slack Announcement

Product-focused format from `.github/COMMUNICATION_TEMPLATE/slack-release.md`:
- **PR link** included for traceability
- Non-technical language
- Focus on user impact (end-users, admins, stakeholders)
- Emojis for readability
- Statistics summary

## Workflow Integration

This skill integrates with the release workflow:

```
