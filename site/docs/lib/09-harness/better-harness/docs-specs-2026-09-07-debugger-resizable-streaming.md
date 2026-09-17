---
title: "Resize Debugger panes and share streamed messages"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-09-07-debugger-resizable-streaming.md"
sourceRel: "docs/specs/2026-09-07-debugger-resizable-streaming.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-09-07-debugger-resizable-streaming.md"
sourceSha256: "0d5d56b48b3332df3cd0563c6a7674517f411008470f7f29fd57144a01a15d0e"
pageSha256: "0d5d56b48b3332df3cd0563c6a7674517f411008470f7f29fd57144a01a15d0e"
contentMode: "local-full"
zh: ""
---

# Resize Debugger panes and share streamed messages

## Traceability
- Spec ID: debugger-resizable-streaming
- Status: Implemented

## Intent
Remove the two pane visibility commands, tighten tree disclosure spacing, resize
all three panes through two boundaries, and prove incremental activity display.

## Acceptance Scenarios
- AC-1: The title bar has no Execution Tree or Inspector visibility toggles.
- AC-2: Tree disclosure uses one compact target and reduced indentation; no fake
  expandable live rows with handlers that do nothing.
- AC-3: Both pane boundaries support pointer drag, Left/Right, Home/End, and
  double-click reset; panes remain bounded as the container changes size.
  Narrow layouts stack the activity, tree, and inspector with local overflow.
- AC-4: Debugger and Compare render assistant messages through one shared
  component using the existing shared streaming hook. A partial reply is visible
  before a second gated chunk and before run completion.
- AC-5: Browser tests cover resizing, incremental text, focus, bounded overflow,
  and screenshots at wide, compact, and narrow sizes.

## Non-goals
New ACP protocols, fabricated reasoning events, or changes to Compare's separate
layout redesign. Preserve that concurrent work.

## Plan and Tasks
Own layout in ResizableDebuggerPanes; remove collapsed-pane state and CSS.
Extract StreamingMessage, keep surface-specific tool presentation, and use a
controlled ACP fixture to verify visible deltas before completion.

## Test and Review Evidence
- Studio TypeScript emit/app build and final no-emit typecheck passed.
- Six ACP browser flows passed, including both pane boundaries, three widths,
  default/explicit Agent launch, shared dialog interaction, and Compare.
- The gated two-chunk test confirmed text was visible before the second chunk
  and completion in both surfaces. The local test used `acp-v1-rust` with the
  existing native host and fixture Agent; when that binary is absent the same
  test explicitly identifies its stdio fallback.
- Streaming projection, run store, and localization: 14 tests passed.
  Documentation-link graph: 8 passed. Screenshots retained outside shared test-results.
- Review Readiness: user-requested maintenance; no external Story supplied.
  The worktree also contains concurrent staged/unstaged Studio changes. This
  scope preserves the separate Compare redesign and reuses its streaming hook.
  Runtime and UI evidence is from local builds and fixture runs, not a restarted
  installed application or a measured authenticated production Agent.
- AI involvement: Codex. No commit performed by this task.
