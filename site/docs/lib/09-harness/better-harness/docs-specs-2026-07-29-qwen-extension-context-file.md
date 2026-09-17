---
title: "Qwen Extension Dangling Context File Reference"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-07-29-qwen-extension-context-file.md"
sourceRel: "docs/specs/2026-07-29-qwen-extension-context-file.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-07-29-qwen-extension-context-file.md"
sourceSha256: "565e49993c6725b0d91f2b33e78c26723be2098f36695a40bc2158dd0dcdebb3"
pageSha256: "565e49993c6725b0d91f2b33e78c26723be2098f36695a40bc2158dd0dcdebb3"
contentMode: "local-full"
zh: ""
---

# Qwen Extension Dangling Context File Reference

Remove the `contextFileName` declaration from `qwen-extension.json` because it
references a `QWEN.md` file that does not exist in the repository and is not
included in the published npm package.

## Traceability

- Spec ID: 2026-07-29-qwen-extension-context-file
- Story: none; justified maintenance on the Qwen host manifest
- Status: Implemented

## Intent

`qwen-extension.json` declares `"contextFileName": "QWEN.md"`, but no `QWEN.md`
exists at the repository root, and `package.json` `files` does not include one,
so the published package cannot ship it either.

The reference is user-visible: Qwen Code `0.21.1` announces it before the
install confirmation in both registration paths — `qwen extensions link
