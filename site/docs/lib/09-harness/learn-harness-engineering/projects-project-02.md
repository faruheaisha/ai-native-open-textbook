---
title: "Project 02: Agent-Readable Workspace"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/projects/project-02/README.md"
sourceRel: "projects/project-02/README.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/projects/project-02/README.md"
sourceSha256: "9f3ea6b62f08e7598109d6bfa8f959bca0bd3a09f64a34a24854f86b8ea5fa4b"
pageSha256: "9f3ea6b62f08e7598109d6bfa8f959bca0bd3a09f64a34a24854f86b8ea5fa4b"
contentMode: "local-full"
zh: ""
---

# Project 02: Agent-Readable Workspace

Demonstrate how repository readability and explicit continuity artifacts reduce context loss during multi-session development.

## Directory Guide

| Directory | Meaning |
|------|------|
| `starter/` | **Starting point**: based on the P1 solution, with document import, detail view, and persistence still to implement. The harness is weak: AGENTS.md is minimal and there is no session handoff. |
| `solution/` | **Reference implementation**: all new features are implemented, with complete workspace documentation (ARCHITECTURE.md, PRODUCT.md, session-handoff.md). |

## How to Use

```sh
# Requires at least 2 agent sessions to complete
cd starter
npm install
# Session A: implement document import and the detail view
# Session B: implement persistence (observe whether the agent quickly regains context)

cd ../solution
npm install
# Rerun with the complete harness and compare session recovery speed
```

## Exact Task Contract

Start from `starter/`. The starter already contains the Project 01 shell and a
minimal harness. The work is to add the Project 02 product slice and the
workspace documentation that makes a second session recover quickly.

| Feature / artifact | Starter state | Solution evidence |
|------|------|------|
| Document import | Import flow is incomplete across renderer, preload, IPC, and `DocumentService` | `src/renderer/components/ImportPanel.tsx`, `src/main/ipc-handlers.ts`, `src/services/document-service.ts` |
| Document detail | Detail panel does not load and render full file content through IPC | `src/renderer/components/DocumentDetail.tsx`, `IPC_CHANNELS.GET_DOCUMENT_CONTENT` |
| Basic persistence | Imported documents are not fully restored after restart | `src/services/persistence-service.ts`, `documents-meta.json` handling |
| Agent-readable state | No final handoff file in starter | `session-handoff.md`, expanded `docs/ARCHITECTURE.md`, expanded `docs/PRODUCT.md` |

Run this as a two-session exercise. Stop Session A before all three product
features are complete, then start Session B from only the repository state. The
main comparison is how much faster Session B can resume when `session-handoff.md`
and the docs exist.

## Features Covered

- Document import flow (file picker plus IPC transfer)
- Document detail view (metadata plus content display)
- Basic persistence (imported documents remain after restart)

## Related Lectures

- [Lecture 03: Why the Repository Must Become the System of Record](https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/en/lectures/lecture-03-why-the-repository-must-become-the-system-of-record/index.md)
- [Lecture 04: Why One Giant Instruction File Fails](https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/en/lectures/lecture-04-why-one-giant-instruction-file-fails/index.md)
