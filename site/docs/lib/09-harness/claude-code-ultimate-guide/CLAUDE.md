---
title: "Claude Code Ultimate Guide - Project Context"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/README.md"
zh: ""
---

# Claude Code Ultimate Guide - Project Context

## Purpose

This repository is the **comprehensive documentation for Claude Code** (Anthropic's CLI tool). It teaches users how to use Claude Code effectively through guides, examples, and templates.

**Meta-note**: This repo documents Claude Code, so its own configuration should be exemplary.

## Repository Structure

```
guide/                    # Core documentation
├── ultimate-guide.md     # Main guide (~26K lines, the reference)
├── cheatsheet.md         # 1-page printable summary
├── cowork.md             # Cowork redirect page
├── core/                 # Architecture, methodologies, releases, known-issues, visual-reference
├── security/             # security-hardening, sandbox-isolation, sandbox-native, production-safety, data-privacy
├── ecosystem/            # ai-ecosystem, mcp-servers-ecosystem, third-party-tools, remarkable-ai
├── roles/                # ai-roles, adoption-approaches, learning-with-ai, agent-evaluation
├── ops/                  # devops-sre, observability, ai-traceability
├── diagrams/             # Mermaid visual diagrams
└── workflows/            # Step-by-step workflow guides

examples/                 # Production-ready templates
├── agents/               # Custom agent templates
├── commands/             # Slash command templates
├── hooks/                # Event hook examples (bash/powershell)
├── skills/               # Skill module templates
└── scripts/              # Utility scripts (audit, health check)

machine-readable/         # For LLM consumption
├── reference.yaml        # Condensed index (~43K tokens)
└── llms.txt              # AI indexation file

whitepapers/              # Focused whitepapers (FR + EN)
├── fr/                   # 10 source files in French (.qmd)
└── en/                   # 10 translated files in English (.qmd)
# Published at: https://cc.bruniaux.com/whitepapers/

tools/                    # Interactive utilities
├── audit-prompt.md       # Setup audit prompt
└── onboarding-prompt.md  # Personalized learning prompt

docs/                     # Public documentation (tracked)
└── resource-evaluations/ # External resource evaluations (167 files)

claudedocs/               # Claude working documents (gitignored)
├── resource-evaluations/ # Research working docs (prompts, private audits)
└── *.md                  # Analysis reports, plans, working docs
```

## Key Files

| File | Purpose |
|------|---------|
| `VERSION` | Single source of truth for version (currently 3.42.0) |
| `guide/ultimate-guide.md` | The main reference (search here first) |
| `guide/cheatsheet.md` | Quick reference for daily use |
| `machine-readable/reference.yaml` | LLM-optimized index with line numbers |
| `CHANGELOG.md` | All changes with detailed descriptions |

## Commands

### Version Management
```bash
# Check version consistency across all docs
./scripts/sync-version.sh --check

# Fix version mismatches (updates from VERSION file)
./scripts/sync-version.sh

# Bump version
echo "3.7.0" > VERSION && ./scripts/sync-version.sh
```

### Whitepaper, Recap Cards & Guide Export

Full build commands (PDF/EPUB/recap-card), stack details, ebook versioning, and Typst template sync rules:

@docs/workflows/whitepaper-build.md

### Before Committing
```bash
# Verify versions are synchronized
./scripts/sync-version.sh --check
```

### Slash Commands (Maintenance)

Custom slash commands available in this project:

| Command | Description |
|---------|-------------|
