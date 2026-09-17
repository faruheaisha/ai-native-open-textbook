---
title: "Project: [Project Name]"
sourceId: "07-coding/vibe-coding-101-for-engineers"
sourceTitle: "Vibe Coding 101 for Software Engineers"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/goker/vibe-coding-101-for-software-engineers"
entryUrl: "https://github.com/goker/vibe-coding-101-for-software-engineers/blob/60d5a7fc465fc10be3b4478486a9535f1045f607/course-materials/templates/claude-md-template.md"
sourceRel: "course-materials/templates/claude-md-template.md"
rawUrl: "/raw/07-coding/vibe-coding-101-for-engineers/course-materials/templates/claude-md-template.md"
sourceSha256: "fcab53970171feb271aca2696765c45486453a4d766af875dbb4d29c955db7ad"
pageSha256: "fcab53970171feb271aca2696765c45486453a4d766af875dbb4d29c955db7ad"
contentMode: "local-full"
zh: ""
---

# Project: [Project Name]

## Commands
- `npm run dev` or equivalent
- `npm test` or equivalent
- `npm run build` or equivalent

## Project Structure
- `src/`: application code
- `tests/`: automated tests
- `docs/`: specs and notes

## Technical Decisions
- Language/runtime:
- Framework:
- Data storage:
- Deployment target:

## Code Style
- Follow existing patterns in this repo
- Keep functions small and testable
- Prefer explicit names over abbreviations
- Do not add dependencies without approval

## Testing Rules
- Write tests for new behavior
- Keep existing tests passing
- Cover edge cases and error paths

## Boundaries
### Always
- Explain the plan before large changes
- Verify behavior against the PRD
- Keep commits focused and atomic

### Ask First
- Before schema changes
- Before introducing new dependencies
- Before changing API contracts

### Never
- Never commit secrets
- Never bypass failing tests
- Never implement features outside the PRD scope
