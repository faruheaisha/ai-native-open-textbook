---
title: "Deep Wiki: Repository Q&A"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/deep-wiki/commands/ask.md"
sourceRel: ".github/plugins/deep-wiki/commands/ask.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/deep-wiki/commands/ask.md"
sourceSha256: "1a95373a9984c7a23e0a9db28d4999106e8db0bbc3ac6538f9f1a49f6d9c2ae6"
pageSha256: "1a95373a9984c7a23e0a9db28d4999106e8db0bbc3ac6538f9f1a49f6d9c2ae6"
contentMode: "local-full"
zh: ""
---

# Deep Wiki: Repository Q&A

Answer a question about this repository grounded in actual source code.

## Source Repository Resolution (MUST DO FIRST)

Before answering, resolve the source repository context:

1. **Check for git remote**: Run `git remote get-url origin`
2. **Ask the user**: _"Is this a local-only repository, or do you have a source repository URL?"_
   - Remote URL → store as `REPO_URL`, use linked citations: `[file:line](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/deep-wiki/commands/REPO_URL/blob/BRANCH/file/README.md#Lline)`
   - Local → use `(file_path:line_number)`
3. **Determine default branch**: Run `git rev-parse --abbrev-ref HEAD`
4. **Do NOT proceed** until resolved

## Question

$ARGUMENTS

## Process

1. **Detect language** of the question and respond in the **same language**
2. **Search** the codebase for files relevant to the question
3. **Read** those files to gather evidence
4. **Synthesize** an answer grounded entirely in actual code — never invent or guess

## Response Format

```markdown
## [Concise Answer Title]

[1-2 paragraph direct answer]

### How It Works
[Detailed explanation with inline code citations and at least 1 Mermaid diagram when the answer involves architecture, flow, or relationships]

### Key Files
| File | Purpose | Source |
|------|---------|--------|
| `src/path/file.ts` | [Role in the system] | [linked citation] |

### Code Example

[Relevant snippet from actual source, if helpful]

### Related
- [Related concepts or files to explore]
```

## Rules

- ONLY use information from actual source files in this repository
- NEVER invent, guess, or use external knowledge
- ALWAYS cite source files inline using the resolved citation format:
  - **Remote**: `[src/path/file.ts:42](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/deep-wiki/commands/REPO_URL/blob/BRANCH/src/path/file.ts#L42)`
  - **Local**: `(src/path/file.ts:42)`
- Think step by step through complex questions
- If information is insufficient, say so explicitly and suggest which files to examine
