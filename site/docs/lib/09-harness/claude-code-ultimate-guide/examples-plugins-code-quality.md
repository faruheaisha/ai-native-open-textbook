---
title: "Code Quality Suite Plugin"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/plugins/code-quality/README.md"
sourceRel: "examples/plugins/code-quality/README.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/plugins/code-quality/README.md"
sourceSha256: "ccfc21fc2438045a78074245798fa341f531607bb4ccbe022751c6e0afebbb49"
pageSha256: "ccfc21fc2438045a78074245798fa341f531607bb4ccbe022751c6e0afebbb49"
contentMode: "local-full"
zh: ""
---

# Code Quality Suite Plugin

Code analysis, refactoring, and clean code enforcement.

## Install

```bash
bash install.sh
```

## Components

- **refactoring-specialist agent**: Automated code improvement
- **clean-code-reviewer agent**: Code quality standards enforcement
- **/refactor command**: Safe refactoring with validation
- **/optimize command**: Performance optimization

## Quick Start

```bash
# Refactor a file or folder
/refactor src/auth/

# Analyze code quality
/audit-codebase

# Get design pattern suggestions
/design-patterns
```

## Features

✓ Complexity analysis
✓ Refactoring suggestions
✓ Design pattern guidance
✓ Performance optimization
✓ Maintainability scoring

---

See `guide/workflows/` for methodology documentation.
