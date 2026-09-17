---
title: "Clean State Checklist"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/projects/project-05/starter/clean-state-checklist.md"
sourceRel: "projects/project-05/starter/clean-state-checklist.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/projects/project-05/starter/clean-state-checklist.md"
sourceSha256: "da86a75a0f2cb958a473cb24cb92a350da28ee65260fd60da40d65b61e197192"
pageSha256: "da86a75a0f2cb958a473cb24cb92a350da28ee65260fd60da40d65b61e197192"
contentMode: "local-full"
zh: ""
---

# Clean State Checklist

Run this checklist before committing and at the end of each session.

## Build

- [ ] `npm run check` passes with no type errors
- [ ] `npm run build` completes successfully

## Architecture

- [ ] `bash scripts/check-architecture.sh` passes with no violations
- [ ] No `fs` or `path` imports in renderer code
- [ ] No Electron IPC in service code
- [ ] No React imports in services or main process

## Runtime

- [ ] Application starts without errors (`npm run dev`)
- [ ] Structured log output appears in console at startup
- [ ] Document import works (check logs for IMPORT_DOCUMENT event)
- [ ] Indexing works for documents of all sizes
- [ ] Q&A returns answers with citations (check logs for ASK_QUESTION event)

## Data Integrity

- [ ] No empty chunks in indexed documents (verify with GET_CHUNKS)
- [ ] Q&A history persists across restarts
- [ ] Document metadata is consistent with actual files

## Repository

- [ ] No unintended files in git status
- [ ] No sensitive data (.env, credentials) staged
- [ ] Final summary records current state, verification run, and any unresolved risk
- [ ] `AGENTS.md`, `docs/ARCHITECTURE.md`, and this checklist still match the files that actually exist in this starter
