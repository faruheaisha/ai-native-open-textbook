---
title: "Simplify the Debugger workbench"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-09-07-debugger-unified-chrome.md"
sourceRel: "docs/specs/2026-09-07-debugger-unified-chrome.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-09-07-debugger-unified-chrome.md"
sourceSha256: "bd5a51ebda7eee4e77703def72a4dbbcc3d10bd26bf31307a514c0fc977b4efe"
pageSha256: "bd5a51ebda7eee4e77703def72a4dbbcc3d10bd26bf31307a514c0fc977b4efe"
contentMode: "local-full"
zh: ""
---

# Simplify the Debugger workbench

## Traceability
- Spec ID: debugger-unified-chrome
- Status: Implemented

## Intent
Merge Debugger commands and run status into Studio's existing window chrome,
reduce repeated explanation, and make the first request reach an honest terminal state.

## Acceptance Scenarios
- AC-1: Debugger commands appear in the single Studio title bar; saved runs and pane toggles remain keyboard reachable.
- AC-2: One bottom status region carries run status, event count, and a compact timeline; no empty timeline band.
- AC-3: Prompt and activity lead the live workspace; runtime metadata remains available in the inspector without repeated status paragraphs.
- AC-6: Available ACP Agents are selected by default through the existing ACP route; explicit SDK choice remains supported. Qoder streamed prompts use text content blocks.
- AC-4: Failed or prematurely closed streams leave the running state and display the error; pending event batches cannot overwrite that failure.
- AC-5: Wide, compact, and narrow layouts have bounded overflow and no browser errors.

## Non-goals
New hosts, publishing, installation, and changes to unrelated Studio views.

## Plan and Tasks
Reuse the shell toolbar portal and add a status slot. Simplify live chrome and
keep recorded navigation available. Inspect local failure evidence and test the
stream lifecycle at its public boundary. Validate built browser flows and screenshots.

## Test and Review Evidence
- AC-4/6: Harness adapter and executor tests: 38 passed; Studio run store,
  stream lifecycle, and Agent selection tests: 15 passed.
- AC-6: Existing Rust ACP native route test: 1 passed, including permission response.
- AC-1/2/3/5: Built Playwright flows cover default/explicit ACP selection,
  wide/compact/narrow layouts, dark appearance, keyboard focus, project binding,
  failed tool payload disclosure, and saved-run replay.
- Studio and Harness builds passed. Doc link graph: 8 passed. Canvas preview
  health and module endpoints both returned 200.
- Review Readiness: no Story supplied; this is user-requested maintenance. No
  staged changes, release metadata, or generated-code changes belong to this task.
  Concurrent Overview removal edits are outside this spec; shared App/test hunks
  were preserved. Risks: toolbar width and late stream callbacks are covered above.
- Native ACP verification used the existing Rust binary with a fixture Agent.
  The user's running Electron window and authenticated real Agent were not relaunched
  or measured; no installed-host completion claim is made.
AI involvement: Codex implementation and local verification.

## Failure evidence
The screenshot run `run_1788782230814_r6y6ff` retained
`API Error: A.message.content.map is not a function`. The installed SDK documents
streamed user messages with text content blocks; the adapter supplied a string.
Desktop currently supplies a Rust ACP host executable; NSXPC is wired to OXC.
No new ACP transport is introduced.
