---
title: "SDK Package Seam Module owns SDK-to-get-shit-done-cc compatibility"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/adr/0007-sdk-package-seam-module.md"
sourceRel: "docs/adr/0007-sdk-package-seam-module.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/adr/0007-sdk-package-seam-module.md"
sourceSha256: "cbfd97c337484faa3f6a902e11c1c47a9d650a1524c1164f624b5d8e8ac8d74d"
pageSha256: "cbfd97c337484faa3f6a902e11c1c47a9d650a1524c1164f624b5d8e8ac8d74d"
contentMode: "local-full"
zh: ""
---

# SDK Package Seam Module owns SDK-to-get-shit-done-cc compatibility

- **Status:** Accepted
- **Date:** 2026-05-07

We decided to define one explicit SDK Package Seam Module for the `@gsd-build/sdk` → `get-shit-done-cc` transition. During this transition, install-layout probing, legacy `gsd-tools.cjs` discovery, legacy `core.cjs` discovery, and compatibility-only missing-asset diagnostics must live behind one seam instead of leaking across SDK Modules. This keeps callers thin, raises leverage for standalone-SDK testing, and improves locality by making package-readiness bugs land in one place. First tracer-bullet slice: add one compatibility Adapter Module at this seam and migrate current legacy asset callers onto it before broader native replacement work.

Runtime-global skills directory resolution is explicitly out of scope for this seam. That policy varies by runtime (`claude`, `codex`, `cline`, etc.) rather than by legacy package/install layout, so it now lives in a separate Runtime-Global Skills Policy Module consumed by `agent-skills` and `skill-manifest`.
