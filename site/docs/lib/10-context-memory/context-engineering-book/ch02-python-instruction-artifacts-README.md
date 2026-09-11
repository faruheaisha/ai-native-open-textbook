---
title: "Instruction artifacts"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/README.md"
zh: ""
---

# Instruction artifacts

This folder contains examples of instruction artifacts, which are files that store project-specific or environment-specific directives for AI agents.

## Examples

- `task-tracker/`: A sample Python project demonstrating the use of portable and agent-specific instruction artifacts:
    - `AGENTS.md`: Portable Markdown format for coding-agent guidance.
    - `CLAUDE.md`: Anthropic's convention for Claude Code.

## Purpose

Instruction artifacts transform implicit team or project instructions into explicit agent-readable guidance. They reduce repetition, improve consistency across sessions, and make it easier to align agent behavior with the norms of a specific environment.

For more details on how to use these files with different AI agents, refer to the artifact adapters inside the `task-tracker` folder.
