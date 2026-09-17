---
title: "Task Frame: Prevent duplicate email addresses during signup"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/43-frame-the-task-before-code/outputs/task-frame.md"
sourceRel: "phases/14-agent-engineering/43-frame-the-task-before-code/outputs/task-frame.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/43-frame-the-task-before-code/outputs/task-frame.md"
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
