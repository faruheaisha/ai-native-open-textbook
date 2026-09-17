---
title: "Digital Brain"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/examples/digital-brain-skill/README.md"
sourceRel: "examples/digital-brain-skill/README.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/examples/digital-brain-skill/README.md"
sourceSha256: "4ac5d0f82bfa76166bad86e703f4e84c3f50d5d9592d356d46db5a6aa2f19855"
pageSha256: "4ac5d0f82bfa76166bad86e703f4e84c3f50d5d9592d356d46db5a6aa2f19855"
contentMode: "local-full"
zh: ""
---

# Digital Brain

> A personal operating system for founders, creators, and builders. Part of the [Agent Skills for Context Engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering) collection.

## Overview

Digital Brain is a structured knowledge management system designed for AI-assisted personal productivity. It provides a complete folder-based architecture for managing:

- **Personal Brand** - Voice, positioning, values
- **Content Creation** - Ideas, drafts, publishing pipeline
- **Knowledge Base** - Bookmarks, research, learning
- **Network** - Contacts, relationships, introductions
- **Operations** - Goals, tasks, meetings, metrics

The system follows context engineering principles: progressive disclosure, append-only data, and module separation to optimize for AI agent interactions.

## Architecture

```
digital-brain/
├── SKILL.md                 # Main skill definition (Claude Code compatible)
├── SKILLS-MAPPING.md        # How context engineering skills apply
│
├── identity/                # Personal brand & voice
│   ├── IDENTITY.md          # Module instructions
│   ├── voice.md             # Tone, style, patterns
│   ├── brand.md             # Positioning, audience
│   ├── values.yaml          # Core principles
│   ├── bio-variants.md      # Platform bios
│   └── prompts/             # Generation templates
│
├── content/                 # Content creation hub
│   ├── CONTENT.md           # Module instructions
│   ├── ideas.jsonl          # Content ideas (append-only)
│   ├── posts.jsonl          # Published content log
│   ├── calendar.md          # Content schedule
│   ├── engagement.jsonl     # Saved inspiration
│   ├── drafts/              # Work in progress
│   └── templates/           # Thread, newsletter, post templates
│
├── knowledge/               # Personal knowledge base
│   ├── KNOWLEDGE.md         # Module instructions
│   ├── bookmarks.jsonl      # Saved resources
│   ├── learning.yaml        # Skills & goals
│   ├── competitors.md       # Market landscape
│   ├── research/            # Deep-dive notes
│   └── notes/               # Quick captures
│
├── network/                 # Relationship management
│   ├── NETWORK.md           # Module instructions
│   ├── contacts.jsonl       # People database
│   ├── interactions.jsonl   # Meeting log
│   ├── circles.yaml         # Relationship tiers
│   └── intros.md            # Introduction tracker
│
├── operations/              # Productivity system
│   ├── OPERATIONS.md        # Module instructions
│   ├── todos.md             # Task list (P0-P3)
│   ├── goals.yaml           # OKRs
│   ├── meetings.jsonl       # Meeting notes
│   ├── metrics.jsonl        # Key metrics
│   └── reviews/             # Weekly reviews
│
├── agents/                  # Automation
│   ├── AGENTS.md            # Script documentation
│   └── scripts/
│       ├── weekly_review.py
│       ├── content_ideas.py
│       ├── stale_contacts.py
│       └── idea_to_draft.py
│
├── references/              # Detailed documentation
│   └── file-formats.md
│
└── examples/                # Usage workflows
    ├── content-workflow.md
    └── meeting-prep.md
```

## Skills Integration

This example demonstrates these context engineering skills:

| Skill | Application |
|-------|-------------|
| `context-fundamentals` | Progressive disclosure, attention budget |
| `memory-systems` | JSONL append-only logs, structured recall |
| `tool-design` | Self-contained automation scripts |
| `context-optimization` | Module separation, just-in-time loading |

See [SKILLS-MAPPING.md](/lib/10-context-memory/agent-skills-for-context-engineering/examples-digital-brain-skill-SKILLS-MAPPING) for detailed mapping of how each skill informs the design.

## Installation

### As a Claude Code Skill

```bash
# User-wide installation
git clone https://github.com/muratcankoylan/digital-brain-skill.git \
  ~/.claude/skills/digital-brain

# Or project-specific
git clone https://github.com/muratcankoylan/digital-brain-skill.git \
  .claude/skills/digital-brain
```

### As a Standalone Template

```bash
git clone https://github.com/muratcankoylan/digital-brain-skill.git ~/digital-brain
cd ~/digital-brain
```

## Quick Start

1. **Define your voice** - Fill out `identity/voice.md` with your tone and style
2. **Set your positioning** - Complete `identity/brand.md` with audience and pillars
3. **Add contacts** - Populate `network/contacts.jsonl` with key relationships
4. **Set goals** - Define OKRs in `operations/goals.yaml`
5. **Start creating** - Ask AI to "write a post" and watch it use your voice

## File Format Conventions

| Format | Use Case | Why |
|--------|----------|-----|
| `.jsonl` | Append-only logs | Agent-friendly, preserves history |
| `.yaml` | Structured config | Human-readable hierarchies |
| `.md` | Narrative content | Editable, rich formatting |
| `.xml` | Complex prompts | Clear structure for agents |

## Usage Examples

### Content Creation
```
User: "Help me write a X thread about AI agents"

Agent Process:
1. Reads identity/voice.md for tone patterns
2. Checks identity/brand.md - confirms "ai_agents" is a pillar
3. References content/posts.jsonl for successful formats
4. Drafts thread matching voice attributes
```

### Meeting Preparation
```
User: "Prepare me for my call with Sarah"

Agent Process:
1. Searches network/contacts.jsonl for Sarah
2. Gets history from network/interactions.jsonl
3. Checks operations/todos.md for pending items
4. Generates pre-meeting brief
```

### Weekly Review
```
User: "Run my weekly review"

Agent Process:
1. Executes agents/scripts/weekly_review.py
2. Compiles metrics from operations/metrics.jsonl
3. Runs agents/scripts/stale_contacts.py
4. Presents summary with action items
```

## Automation Scripts

| Script | Purpose | Run Frequency |
|--------|---------|---------------|
| `weekly_review.py` | Generate review from data | Weekly |
| `content_ideas.py` | Suggest content from knowledge | On-demand |
| `stale_contacts.py` | Find neglected relationships | Weekly |
| `idea_to_draft.py` | Expand idea to draft scaffold | On-demand |

```bash
# Run directly
python agents/scripts/weekly_review.py

# Or with arguments
python agents/scripts/content_ideas.py --pillar ai_agents --count 5
```

## Design Principles

1. **Progressive Disclosure** - Load only what's needed for the current task
2. **Append-Only Data** - Never delete, preserve history for pattern analysis
3. **Module Separation** - Each domain is independent, no cross-contamination
4. **Voice First** - Always read voice.md before any content generation
5. **Platform Agnostic** - Works with Claude Code, Cursor, any AI assistant
