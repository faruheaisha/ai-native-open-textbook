---
title: "Markdown Docs"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.claude/rules/markdown-docs.md"
sourceRel: ".claude/rules/markdown-docs.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/.claude/rules/markdown-docs.md"
sourceSha256: "8a29bb4c5e2f6d029dc89ceb0976865007a5ec681847a50f34b0b9ec1c9c4580"
pageSha256: "8a29bb4c5e2f6d029dc89ceb0976865007a5ec681847a50f34b0b9ec1c9c4580"
contentMode: "local-full"
zh: ""
---

# Markdown Docs

## Documentation Standards

- Keep files focused and concise — one topic per file
- Use relative links between docs (e.g., `../best-practice/claude-memory.md`), not absolute GitHub URLs
- Include back-navigation link at top of best-practice and report docs (see existing files for pattern)
- When adding a new concept or report, update the corresponding table in README.md (CONCEPTS or REPORTS)

## Structure Conventions

- Best practice docs go in `best-practice/`
- Implementation docs go in `implementation/`
- Reports go in `reports/`
- Tips go in `tips/`
- Changelog tracking goes in `changelog/<category>/`

## Formatting

- Use tables for structured comparisons (see README CONCEPTS table as reference)
- Use badge images from `!/tags/` for visual consistency when linking best-practice or implementation docs
- Keep headings hierarchical — don't skip levels (e.g., don't jump from `##` to `####`)
