---
title: "Agent Note: Tool-row file-open failures stay visible"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/bug-fix/2026-08-18-tool-row-file-open-failure.md"
sourceRel: ".agents/notes/archived/bug-fix/2026-08-18-tool-row-file-open-failure.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/bug-fix/2026-08-18-tool-row-file-open-failure.md"
sourceSha256: "d2bb45deb00fe0225754af56371acbf73625a644c47b3ffaa9e56a6bd881283b"
pageSha256: "d2bb45deb00fe0225754af56371acbf73625a644c47b3ffaa9e56a6bd881283b"
contentMode: "local-full"
zh: ""
---

# Agent Note: Tool-row file-open failures stay visible

Status: implemented
Archived: 2026-09-04

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-bug-fix-2026-08-18-tool-row-file-open-failure.zh)

## Problem

Tool-row path clicks already call `session/openWorkspacePath` through the chat view's injected `openFile`. The inject swallowed every Host or OS refusal, so a missing desktop opener, a remote or non-loopback carrier, or a path the Host cannot hand off left the row looking successful. The reader had no reason and no second try.

The [file-open-in-OS decision](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/feature/2026-07-28-tool-call-file-open-in-os.md) still owns the link gesture and the Host handoff. This note owns only the refusal.

## Decision

The inject returns the `workspaces.openPath` promise. The chat view wraps that opener: a rejection opens an in-page Modal with the thrown text (or the unknown-open fallback when that text is empty) and a Retry that repeats the same path; Cancel, Escape, the close control, and a mask click dismiss it. A later settlement after dismiss is ignored, so a cancelled in-flight refusal cannot reopen the dialog.

The dialog lives on the view that owns the Host call, not on each tool row. Produced-file chips and closing-message mentions use the same wrapper because they already share that opener. The produced-files folder action opens `.`, and that refusal uses the folder title and unknown-open copy.

The Host message is shown as thrown. The chat view's `openFile` adapter prefixes `path open failed: ` onto the Remote error; the dialog does not unwrap that prefix.

## Alternatives considered

- **Per-row inline error.** The Host call is conversation-owned and several entries share one opener; a row-local banner would duplicate the same refusal next to every click target.
- **Toast without retry.** The product ask is the reason *and* a retry entry. The workspace folder-adoption dialog already pairs those two.
- **Chat-store remount persistence.** A failed open is transient view state. The chat store survives view remounts, so a leftover dialog would return after a tab switch that cannot usefully retry the original gesture.

## Consequences

A silent Host refusal is no longer a success from the reader's seat. Headless or remote deployments that click a path now see why the desktop handoff did not happen. The view holds one extra request-generation counter so dismiss and retry stay race-safe.

## Testing

Package specs cover inject rejection, the dialog copy (Error, non-Error, empty, workspace folder), retry of the same path, cancel, and a settlement that arrives after dismiss. `apps/web/tests/seeded-history.e2e.ts` stubs `session/openWorkspacePath` to fail over a cold-resumed read row, pins the assembled dialog in `file-open-failure.expected.md`, and asserts the English reason plus a second call with the same payload.
