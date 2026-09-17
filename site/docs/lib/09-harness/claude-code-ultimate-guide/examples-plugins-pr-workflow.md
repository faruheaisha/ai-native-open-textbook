---
title: "PR Workflow Plugin"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/plugins/pr-workflow/README.md"
sourceRel: "examples/plugins/pr-workflow/README.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/plugins/pr-workflow/README.md"
sourceSha256: "af33fb456e6e5676850a1a757feedf1224d24899299114415614c84bb9b4a2f4"
pageSha256: "af33fb456e6e5676850a1a757feedf1224d24899299114415614c84bb9b4a2f4"
contentMode: "local-full"
zh: ""
---

# PR Workflow Plugin

Automated pull request review and validation system.

## Install

```bash
bash install.sh
```

## Components

- **code-reviewer agent**: Automated code quality and security checks
- **/review-pr command**: Analyze PRs and provide detailed feedback
- **/pr command**: Quick PR preparation workflow
- **pre-pr-check hook**: Validate changes before PR creation

## Quick Start

```bash
# Review an existing PR
/review-pr 123

# Prepare a new PR
/pr

# Check what will be submitted
/validate-changes
```

## Features

✓ Code quality analysis
✓ Security scanning
✓ Test coverage verification
✓ Compliance checks
✓ Automated suggestions
✓ Team notifications

## See Also

- `guide/workflows/code-review.md` — Full review workflow documentation
- `/security-check` — Security-specific PR review
