---
title: "Project 06: Runtime Observability and Debugging (Capstone)"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/projects/project-06/README.md"
sourceRel: "projects/project-06/README.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/projects/project-06/README.md"
sourceSha256: "cd25cfc3814f1dbd34af4b2c200196aa91819e525cfb3e26ff2b3f52e7ca82e4"
pageSha256: "cd25cfc3814f1dbd34af4b2c200196aa91819e525cfb3e26ff2b3f52e7ca82e4"
contentMode: "local-full"
zh: ""
---

# Project 06: Runtime Observability and Debugging (Capstone)

Capstone project: build and benchmark a complete harness, then run cleanup loops to verify quality and maintainability.

## Directory Guide

| Directory | Meaning |
|------|------|
| `starter/` | **Starting point**: complete product code, but the harness is intentionally weakened (only basic AGENTS.md, with no feature_list.json, session handoff, or clean-state checklist). |
| `solution/` | **Reference implementation**: maximum harness, with all artifact files present, high quality-document scores, benchmark scripts, and cleanup scanners. |

## How to Use

```sh
cd starter
npm install
# Run the app and record weak-harness behavior manually.
# The starter intentionally does not include benchmark.sh or cleanup-scanner.sh.

cd ../solution
npm install
# Run the same benchmark with the complete harness
# Execute cleanup loops
# Compare score changes in quality-document.md

# Run benchmark tests
./scripts/benchmark.sh

# Run cleanup scan
./scripts/cleanup-scanner.sh
```

`npm run dev` must be run from `projects/project-06/solution` after
`npm install`. It builds the main process and renderer before opening Electron;
if the build fails, fix the printed TypeScript/Vite error first. A blank or
unavailable window without a build error is usually an Electron display
environment issue (for example, running without a desktop session), not a
product failure. Include the terminal output and OS/Node version when
reporting a reproducible startup problem.

## Exact Task Contract

Project 06 is a capstone comparison between a complete product with weak harness
surface and the same product hardened with full harness artifacts. Unlike earlier
projects, the starter already contains most product functionality. The gap is the
operating system around the code.

| Area | Starter state | Solution evidence |
|------|------|------|
| Product behavior | Import, indexing, QA, history, feedback, reset mostly exist | Same features plus stronger validation and persistence evidence |
| Harness files | Basic `AGENTS.md`, no `feature_list.json`, no `session-handoff.md`, no clean-state checklist | `AGENTS.md`, `CLAUDE.md`, `feature_list.json`, `init.sh`, `session-handoff.md`, `clean-state-checklist.md` |
| Quality tracking | Initial `quality-document.md` only | Higher-scored `quality-document.md`, `evaluator-rubric.md` |
| Benchmarking | No benchmark or cleanup scripts | `scripts/benchmark.sh`, `scripts/cleanup-scanner.sh`, `scripts/check-architecture.sh` |
| Reliability docs | Minimal docs | `docs/ARCHITECTURE.md`, `docs/PRODUCT.md`, `docs/RELIABILITY.md` |

Do not expect the starter to contain the benchmark commands shown for the
solution. For the weak-harness run, record manual baseline observations; for the
solution run, use the checked-in benchmark and cleanup scripts.

## Features Covered

- Import documents
- Build or refresh the index
- Answer questions with citations
- Runtime feedback
- Readable, restartable repository state

## Related Lectures

- [Lecture 11: Why Observability Belongs Inside the Harness](https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/en/lectures/lecture-11-why-observability-belongs-inside-the-harness/index.md)
- [Lecture 12: Why Every Session Must Leave a Clean State](https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/en/lectures/lecture-12-why-every-session-must-leave-a-clean-state/index.md)
