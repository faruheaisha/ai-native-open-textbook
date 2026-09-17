---
title: "Wiki Q&A"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/deep-wiki/skills/wiki-qa/SKILL.md"
sourceRel: ".github/plugins/deep-wiki/skills/wiki-qa/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/deep-wiki/skills/wiki-qa/SKILL.md"
sourceSha256: "e509864c9561b98dc3f6e9d8bf80824f07a1fe78978dea9ed849959c34b6f7b4"
pageSha256: "e509864c9561b98dc3f6e9d8bf80824f07a1fe78978dea9ed849959c34b6f7b4"
contentMode: "local-full"
zh: ""
---

# Wiki Q&A

Answer repository questions grounded entirely in source code evidence.

## When to Activate

- User asks a question about the codebase
- User wants to understand a specific file, function, or component
- User asks "how does X work" or "where is Y defined"

## Source Repository Resolution (MUST DO FIRST)

Before answering any question, you MUST determine the source repository context:

1. **Check for git remote**: Run `git remote get-url origin` to detect if a remote exists
2. **Ask the user**: _"Is this a local-only repository, or do you have a source repository URL (e.g., GitHub, Azure DevOps)?"_
   - Remote URL provided → store as `REPO_URL`, use **linked citations**: `[file:line](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/deep-wiki/skills/wiki-qa/REPO_URL/blob/BRANCH/file/README.md#Lline)`
   - Local-only → use **local citations**: `(file_path:line_number)`
3. **Determine default branch**: Run `git rev-parse --abbrev-ref HEAD`
4. **Do NOT proceed** until source repo context is resolved

## Procedure

1. Resolve source repo context (see above)
2. Detect the language of the question; respond in the same language
3. Search the codebase for relevant files
4. Read those files to gather evidence
5. Synthesize an answer with inline linked citations

## Response Format

- Use `##` headings, code blocks with language tags, tables, bullet lists
- Cite sources inline using resolved format:
  - **Remote**: `[src/path/file.ts:42](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/deep-wiki/skills/wiki-qa/REPO_URL/blob/BRANCH/src/path/file.ts#L42)`
  - **Local**: `(src/path/file.ts:42)`
- Include a "Key Files" table mapping files to their roles (with linked citations in the "File" column)
- **Include at least 1 Mermaid diagram** when the answer involves architecture, data flow, or relationships — a diagram makes the answer 10x more useful
- **Use tables** for any structured data in the answer (component lists, API endpoints, config options, comparisons)
- If information is insufficient, say so and suggest files to examine

## Rules

- ONLY use information from actual source files
- NEVER invent, guess, or use external knowledge
- Think step by step before answering
