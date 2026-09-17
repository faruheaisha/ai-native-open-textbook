---
title: "Read current Cursor composer context usage"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-08-28-cursor-composer-context-usage.md"
sourceRel: "docs/specs/2026-08-28-cursor-composer-context-usage.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-08-28-cursor-composer-context-usage.md"
sourceSha256: "7da80aa0215d126f4e01e3934abf1d1300346060aa5660e8c2b499a9ec4a66bb"
pageSha256: "7da80aa0215d126f4e01e3934abf1d1300346060aa5660e8c2b499a9ec4a66bb"
contentMode: "local-full"
zh: ""
---

# Read current Cursor composer context usage

## Traceability

- Spec ID: cursor-composer-context-usage
- Status: Implemented
- Refs: `docs/specs/2026-08-28-harness-inspector-usage-context.md`

## Intent

Make Cursor Session reports use the current, composer-matched Context Usage
state that Cursor persists in `state.vscdb`. A saved Context Usage Canvas is an
optional historical snapshot and must not override newer composer state or be
presented as current after the Session continued.

The portable report continues to omit prompt text, context item text, absolute
host paths, raw composer payloads, and unrelated application state.

## Acceptance Scenarios
