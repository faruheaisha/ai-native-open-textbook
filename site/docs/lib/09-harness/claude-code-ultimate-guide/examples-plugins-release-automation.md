---
title: "Release Automation Plugin"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/plugins/release-automation/README.md"
sourceRel: "examples/plugins/release-automation/README.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/plugins/release-automation/README.md"
sourceSha256: "af72ce2f86a9a3e4f270269c75cb42fcf1a5ef99fe180d419f6e37c969cc8a4e"
pageSha256: "af72ce2f86a9a3e4f270269c75cb42fcf1a5ef99fe180d419f6e37c969cc8a4e"
contentMode: "local-full"
zh: ""
---

# Release Automation Plugin

Semantic versioning, changelog generation, and release management.

## Install

```bash
bash install.sh
```

## Components

- **/release command**: Semantic version bumping and tagging
- **/changelog command**: Generate release notes from commits
- **release-notes-generator skill**: Automated release documentation
- **version-sync hook**: Keep version consistent across files

## Quick Start

```bash
# Bump version and create release
/release patch      # v1.0.0 → v1.0.1
/release minor      # v1.0.1 → v1.1.0
/release major      # v1.1.0 → v2.0.0

# Generate changelog
/changelog 10       # Last 10 releases

# The hook auto-syncs VERSION across docs
```

## Features

✓ Semantic versioning
✓ Automated changelog
✓ Git tagging
✓ Release notes
✓ Version consistency

---

See `guide/workflows/releases-tracking.md` for version management.
