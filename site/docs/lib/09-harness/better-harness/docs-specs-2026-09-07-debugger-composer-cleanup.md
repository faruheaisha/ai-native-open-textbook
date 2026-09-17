---
title: "Simplify the live run dialog"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-09-07-debugger-composer-cleanup.md"
sourceRel: "docs/specs/2026-09-07-debugger-composer-cleanup.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-09-07-debugger-composer-cleanup.md"
sourceSha256: "681969e4c5fc392179ed9d9e3413885d530c064a2624196827bfb36b57a6b488"
pageSha256: "681969e4c5fc392179ed9d9e3413885d530c064a2624196827bfb36b57a6b488"
contentMode: "local-full"
zh: ""
---

# Simplify the live run dialog

## Traceability
- Spec ID: debugger-composer-cleanup
- Status: Implemented

## Intent
Make the live run dialog compact and give its styles one owner instead of
scattered selector, textarea, and layout overrides.

## Acceptance Scenarios
- AC-1: One short title, project scope, Agent choice, task input, Cancel and Run.
- AC-2: Dialog styling lives in one feature stylesheet; controls reuse shared
  button, typography, color, and focus tokens. No unused legacy composer rules.
- AC-3: Escape and Cancel close the dialog, focus stays inside while open and
  returns to the launcher on close; blank input cannot submit.
- AC-4: Wide, compact and narrow layouts fit, including dark appearance, with
  no browser errors. Existing ACP choice and launch behavior is preserved.

## Non-goals
Other dialogs, unrelated workbench styles, new execution behavior, or release changes.

## Plan and Tasks
Extract LiveRunComposer and its stylesheet. Use native modal dialog behavior,
shared control defaults, one form gap/padding owner, and localized short labels.
Update browser assertions to the resulting user-facing contract.

## Test and Review Evidence
- TypeScript emit, app bundle and final no-emit typecheck passed. The initial
  clean build collided with a concurrent dist writer; validation used non-clean
  TypeScript compilation and the normal app bundler.
- Dialog keyboard/viewport browser test passed at 1440, 1024 and 390px with
  dark/light screenshots, blank-input guard, Tab cycling, Escape/Cancel, and
  launcher focus restoration. Default and explicit ACP launch tests passed.
- Localization resources/components: 5 tests passed. Doc link graph: 8 passed.
  Canvas preview health/module smoke: HTTP 200.
- Review Readiness: user-requested maintenance, no external Story supplied.
  Scoped component/CSS/build-copy/localization/test changes; existing worktree
  changes are preserved. No staged changes or release metadata belong to this task.
  Source and browser evidence do not establish a relaunched desktop result.
- AI involvement: Codex.
