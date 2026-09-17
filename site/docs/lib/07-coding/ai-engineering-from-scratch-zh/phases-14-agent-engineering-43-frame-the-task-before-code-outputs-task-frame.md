---
title: "Task Frame: Prevent duplicate email addresses during signup"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/43-frame-the-task-before-code/outputs/task-frame.md"
sourceRel: "phases/14-agent-engineering/43-frame-the-task-before-code/outputs/task-frame.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/43-frame-the-task-before-code/outputs/task-frame.md"
sourceSha256: "898acb93ea277754465316f6731ca16f8cedf98e4b0966e714cd2f25e21c0587"
pageSha256: "898acb93ea277754465316f6731ca16f8cedf98e4b0966e714cd2f25e21c0587"
contentMode: "local-full"
zh: ""
---

# Task Frame: Prevent duplicate email addresses during signup

Status: READY

## Repository facts
- Account writes use AccountStore (`app/accounts.py:18`)
- Duplicate errors use status 409 (`tests/test_accounts.py:44`)

## Allowed paths
- `app/accounts.py`
- `tests/test_accounts.py`

## Forbidden paths
- `migrations/**`
- `deploy/**`

## Acceptance evidence
- `python3 -m unittest tests.test_accounts`

## Unknowns
- Whether email comparison is case-insensitive
