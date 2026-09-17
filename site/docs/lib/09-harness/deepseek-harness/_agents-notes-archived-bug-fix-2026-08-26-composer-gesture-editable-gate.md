---
title: "Agent Note: Composer e2e gestures gate on the contenteditable attribute"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/bug-fix/2026-08-26-composer-gesture-editable-gate.md"
sourceRel: ".agents/notes/archived/bug-fix/2026-08-26-composer-gesture-editable-gate.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/bug-fix/2026-08-26-composer-gesture-editable-gate.md"
sourceSha256: "8d65d5a89a4304054533b6548c13e42c84a6b6e03547ce8012718d088acfbada"
pageSha256: "8d65d5a89a4304054533b6548c13e42c84a6b6e03547ce8012718d088acfbada"
contentMode: "local-full"
zh: ""
---

# Agent Note: Composer e2e gestures gate on the contenteditable attribute

Status: implemented
Archived: 2026-09-04

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-bug-fix-2026-08-26-composer-gesture-editable-gate.zh)

## Problem

Two Playwright gesture semantics silently changed when the composer became a Lexical `contenteditable` ``, and both bit only under CI load. While the input machine is adjudicating or submitting a send — and in every locked state — the composer renders read-only by flipping `contenteditable` to `"false"` on the same element. On that element `fill()` throws immediately (`Element is not an <input>, <textarea> or [contenteditable] element`) instead of waiting through actionability, and `expect.poll(() => input.isEnabled())` is a no-op guard: Playwright's enablement check ignores both `aria-disabled` and `contenteditable` on a ``, so it reports `true` throughout the read-only window. The exposed race is only a few frames wide — the permission-policy scenario stayed green for weeks until a Remote-routed subagent refactor stretched submit settling enough for CI to land inside it.

## Decision

Composer e2e gestures go through `writeComposerDraft` in `apps/web/tests/support.ts`, which waits for the editable attribute on the gesture's own target (`input.and(page.locator('[contenteditable="true"]'))`) before acting and replaces the draft with per-key strokes. Scenario code that must wait for the composer to reopen after a submit gates on the `contenteditable` attribute, never on `isEnabled()`.

## Alternatives considered

- **Waiting inside each scenario** instead of inside the helper: rejected — every new scenario re-discovers the trap the hard way, and the fix that motivated this note was already the second such site.
- **Keeping `fill()` and polling `aria-disabled`** before each call: rejected — it leaves the dropped-edit race `fill()` has directly after trigger-menu and chip interactions (Lexical's internal selection lags the DOM selection inside one task), which the per-key helper also covers.
- **Making the product surface tolerate `fill()`** (accepting synthetic edits while read-only): rejected — the read-only window is deliberate UI truth during submit adjudication; loosening it for tests would change user-visible behavior.

## Consequences

- A bare `input.fill(...)` against `[data-composer-input]` is a latent CI race even when it passes locally; the helper is the supported gesture.
- `isEnabled()` on the composer asserts nothing. Existing polls of it guard nothing and read as coverage they do not provide.
- A running turn by itself keeps the composer editable — that is what queueing types into — so the gate waits only through submit adjudication and locked states, not for turn completion.
