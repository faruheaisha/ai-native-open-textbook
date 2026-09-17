---
title: "Code Patterns"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/templates/agent_docs/code_patterns.md"
sourceRel: "templates/agent_docs/code_patterns.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/templates/agent_docs/code_patterns.md"
sourceSha256: "518cdd44d01f0a94c7fb00b2921fc12fec941a03b4394fa3d8507a7afa03b228"
pageSha256: "518cdd44d01f0a94c7fb00b2921fc12fec941a03b4394fa3d8507a7afa03b228"
contentMode: "local-full"
zh: ""
---

# Code Patterns

Use this only for project-specific conventions. If a section is unknown, inspect the existing code before filling it in.

## Architecture

- Primary pattern: [feature-based / layered / framework default / other]
- Keep domain logic separate from UI/transport code.
- Reuse existing modules before creating new abstractions.

## Data And State

- Data fetching: [pattern]
- Server state: [pattern]
- Client state: [pattern]
- Forms: [pattern]

## Errors And Validation

- Validate external inputs at boundaries.
- Return user-safe errors to the UI.
- Log developer context server-side.
- Do not swallow errors silently.

## Naming

- Files: [project convention]
- Components/classes: PascalCase
- Functions/variables: camelCase
- Env vars/constants: UPPER_SNAKE_CASE

## AI Tool Patterns

Fill this in only if AI tools/actions exist.

- Keep tools small and server-authorized.
- Validate model inputs and structured outputs.
- Treat retrieved docs, web pages, issues, uploads, and MCP responses as untrusted data.
- Require approval for destructive, external-network, credential-bearing, and production actions.
- Log trace IDs and redact secrets/customer data.
