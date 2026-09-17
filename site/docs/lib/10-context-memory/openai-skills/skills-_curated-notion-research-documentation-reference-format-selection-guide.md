---
title: "Format Selection Guide"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/notion-research-documentation/reference/format-selection-guide.md"
sourceRel: "skills/.curated/notion-research-documentation/reference/format-selection-guide.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/notion-research-documentation/reference/format-selection-guide.md"
sourceSha256: "6280f5219e141b3e284fbe47e550a1bed1831de044eb0b1b145b43ac86f38133"
pageSha256: "6280f5219e141b3e284fbe47e550a1bed1831de044eb0b1b145b43ac86f38133"
contentMode: "local-full"
zh: ""
---

# Format Selection Guide

Choose the right output format for your research needs.

## Decision Tree

```
Is this comparing multiple options?
  ├─ YES → Use Comparison Format
  └─ NO ↓

Is this time-sensitive or simple?
  ├─ YES → Use Quick Brief
  └─ NO ↓

Does this require formal/extensive documentation?
  ├─ YES → Use Comprehensive Report
  └─ NO → Use Research Summary (default)
```

## Format Overview

| Format | Length | When to Use | Template |
|--------|--------|-------------|----------|
| [Research Summary](/lib/10-context-memory/openai-skills/skills-_curated-notion-research-documentation-reference-research-summary-format) | 500-1000 words | Most research requests (default) | [Template](/lib/10-context-memory/openai-skills/skills-_curated-notion-research-documentation-reference-research-summary-template) |
| [Comprehensive Report](/lib/10-context-memory/openai-skills/skills-_curated-notion-research-documentation-reference-comprehensive-report-format) | 1500+ words | Formal docs, strategic decisions | [Template](/lib/10-context-memory/openai-skills/skills-_curated-notion-research-documentation-reference-comprehensive-report-template) |
| [Quick Brief](/lib/10-context-memory/openai-skills/skills-_curated-notion-research-documentation-reference-quick-brief-format) | 200-400 words | Time-sensitive, simple topics | [Template](/lib/10-context-memory/openai-skills/skills-_curated-notion-research-documentation-reference-quick-brief-template) |
| [Comparison](/lib/10-context-memory/openai-skills/skills-_curated-notion-research-documentation-reference-comparison-format) | 800-1200 words | Evaluating options | [Template](/lib/10-context-memory/openai-skills/skills-_curated-notion-research-documentation-reference-comparison-template) |

## Formatting Guidelines

### Headings
- Use `#` for title
- Use `##` for major sections
- Use `###` for subsections
- Keep heading hierarchy consistent

### Lists
- Use `-` for bullet points
- Use `1.` for numbered lists
- Keep list items parallel in structure

### Emphasis
- Use `**bold**` for key terms and section labels
- Use `*italic*` for emphasis
- Use sparingly for maximum impact
