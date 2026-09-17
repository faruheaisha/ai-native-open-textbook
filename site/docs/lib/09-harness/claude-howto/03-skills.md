---
title: "Agent Skills Guide"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/03-skills/README.md"
sourceRel: "03-skills/README.md"
rawUrl: "/raw/09-harness/claude-howto/03-skills/README.md"
sourceSha256: "a3fb45b4fb3f83a262c92fe7d66acdc5ab61d96a97ea45c5ffce01a99a64dcf0"
pageSha256: "a3fb45b4fb3f83a262c92fe7d66acdc5ab61d96a97ea45c5ffce01a99a64dcf0"
contentMode: "local-full"
zh: ""
---

# Agent Skills Guide

Agent Skills are reusable, filesystem-based capabilities that extend Claude's functionality. They package domain-specific expertise, workflows, and best practices into discoverable components that Claude automatically uses when relevant.

## Overview

**Agent Skills** are modular capabilities that transform general-purpose agents into specialists. Unlike prompts (conversation-level instructions for one-off tasks), Skills load on-demand and eliminate the need to repeatedly provide the same guidance across multiple conversations.

### Key Benefits

- **Specialize Claude**: Tailor capabilities for domain-specific tasks
- **Reduce repetition**: Create once, use automatically across conversations
- **Compose capabilities**: Combine Skills to build complex workflows
- **Scale workflows**: Reuse skills across multiple projects and teams
- **Maintain quality**: Embed best practices directly into your workflow

Skills follow the [Agent Skills](https://agentskills.io) open standard, which works across multiple AI tools. Claude Code extends the standard with additional features like invocation control, subagent execution, and dynamic context injection.

> **Note**: Custom slash commands have been merged into skills. `.claude/commands/` files still work and support the same frontmatter fields. Skills are recommended for new development. When both exist at the same path (e.g., `.claude/commands/review.md` and `.claude/skills/review/SKILL.md`), the skill takes precedence.

## How Skills Work: Progressive Disclosure

Skills leverage a **progressive disclosure** architecture—Claude loads information in stages as needed, rather than consuming context upfront. This enables efficient context management while maintaining unlimited scalability.

### Three Levels of Loading

```mermaid
graph TB
    subgraph "Level 1: Metadata (Always Loaded)"
        A["YAML Frontmatter"]
        A1["~100 tokens per skill"]
        A2["name + description"]
    end

    subgraph "Level 2: Instructions (When Triggered)"
        B["SKILL.md Body"]
        B1["Under 5k tokens"]
        B2["Workflows & guidance"]
    end

    subgraph "Level 3: Resources (As Needed)"
        C["Bundled Files"]
        C1["Effectively unlimited"]
        C2["Scripts, templates, docs"]
    end

    A --> B
    B --> C
```

| Level | When Loaded | Token Cost | Content |
|-------|------------|------------|---------|
| **Level 1: Metadata** | Always (at startup) | ~100 tokens per Skill | `name` and `description` from YAML frontmatter |
| **Level 2: Instructions** | When Skill is triggered | Under 5k tokens | SKILL.md body with instructions and guidance |
| **Level 3+: Resources** | As needed | Effectively unlimited | Bundled files executed via bash without loading contents into context |

This means you can install many Skills without context penalty—Claude only knows each Skill exists and when to use it until actually triggered.

## Skill Loading Process

```mermaid
sequenceDiagram
    participant User
    participant Claude
    participant System
    participant SkillInst as Skill Instructions
    participant SkillRes as Skill Resources

    User->>Claude: "Review this code for security issues"
    Claude->>System: Check available skills (metadata)
    System-->>Claude: Skill descriptions loaded at startup
    Claude->>Claude: Match request to skill description
    Claude->>SkillInst: Read code-review-specialist/SKILL.md
    SkillInst-->>Claude: Level 2: Instructions loaded
    Claude->>Claude: Determine: Need templates?
    Claude->>SkillRes: Read templates/checklist.md
    SkillRes-->>Claude: Level 3: Template loaded
    Claude->>Claude: Execute skill instructions
    Claude->>User: Comprehensive code review
```

## Skill Types & Locations

| Type | Location | Scope | Shared | Best For |
|------|----------|-------|--------|----------|
| **Enterprise** | Managed settings | All org users | Yes | Organization-wide standards |
