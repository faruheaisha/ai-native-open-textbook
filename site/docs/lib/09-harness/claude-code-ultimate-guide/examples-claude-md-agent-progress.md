---
title: "Session Progress"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/claude-md/agent-progress.md"
sourceRel: "examples/claude-md/agent-progress.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/claude-md/agent-progress.md"
sourceSha256: "cb7fde199f0f9282cf1abce07d85724e06aff433161edfef39b2798f25f8a0be"
pageSha256: "cb7fde199f0f9282cf1abce07d85724e06aff433161edfef39b2798f25f8a0be"
contentMode: "local-full"
zh: ""
---

# Session Progress

## Last Updated
YYYY-MM-DD — Session N

## Active Feature
feat-XXX: Feature Name

## Done This Session
- [x] Completed item
- [x] Another completed item

## In Progress
- [ ] Current work item
  - Status: brief description of how far along
  - Blocker: none (or describe the blocker)

## Next Steps
1. First action for next session
2. Second action
3. Third action

## Evidence
- lint: clean / N errors
- typecheck: clean / N errors
- unit tests: N/N pass
- integration tests: N/N pass / not yet run
- e2e: pass / not yet run

## Notes for Next Session
Specific file paths, function names, and line numbers that save
reconstruction time. Example: "The wiring point is
src/services/DocumentService.import() at line 67. It expects a
ChunkResult[] type defined in src/types/documents.ts:18."
