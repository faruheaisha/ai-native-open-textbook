---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/CONTEXT.md"
sourceRel: "CONTEXT.md"
rawUrl: "/raw/10-context-memory/get-shit-done/CONTEXT.md"
sourceSha256: "5339f8a1f2c77cfdd65b419f1126cfd9d409f8ad3b5dbe31a8b51a34aff5d7d5"
pageSha256: "38c45c2cbf7a10f9afac090da515d7f9bd0fa9772b05db7c847a5db01a23d20d"
contentMode: "local-full"
zh: ""
---

## Shell Command Projection Module (expanded glossary entry, 2026-05-13)

Module owning all OS-facing I/O for the tool: runtime-aware command-text rendering (hook commands, PATH action lines, shim scripts), subprocess dispatch (run-git, run-npm, run-tool, probeTty), and platform file I/O (platformWriteSync, platformReadSync, platformEnsureDir). Single seam for platform-conditional logic — one place to fix any shell or file write regression across Windows, macOS, and Linux. Lives in `get-shit-done/bin/lib/shell-command-projection.cjs`. See ADR-0009 (superseded "does not execute" constraint) and ADR-0010 (superseded File Operation Engine).

Invariants:
- Result shape: all run-* return `\{ exitCode, stdout, stderr \}`; never throw on non-zero exit code.
- Platform policy owned at the seam: `shell: process.platform === 'win32'` lives only in run-npm; probeTty returns `null` on Windows.
- Normalization policy: platformWriteSync owns full `normalizeMd` for `.md`; CRLF-to-LF + trailing newline for all others; callers must NOT pre-call `normalizeMd`.
- `_normalizeMd` is re-implemented inline (not imported from `core.cjs`) to avoid circular dep.
- `atomicWriteFileSync`, `safeReadFile`, `normalizeMd` remain in `core.cjs` exports until Phase 4 (#3468).

Migration plan: Phase 1 (#3465) seam additions complete; Phase 2 (#3466) targets 6 subprocess files; Phase 3 (#3467) targets 15 fs files (215 call sites); Phase 4 (#3468) removes compat exports.
