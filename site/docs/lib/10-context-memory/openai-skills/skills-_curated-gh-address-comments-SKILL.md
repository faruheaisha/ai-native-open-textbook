---
title: "PR Comment Handler"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/gh-address-comments/SKILL.md"
sourceRel: "skills/.curated/gh-address-comments/SKILL.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/gh-address-comments/SKILL.md"
sourceSha256: "77389eefd3fb6584210668ca8e43f4b8de87e7722ddd953474bc9e24cdfaaedd"
pageSha256: "77389eefd3fb6584210668ca8e43f4b8de87e7722ddd953474bc9e24cdfaaedd"
contentMode: "local-full"
zh: ""
---

# PR Comment Handler

Guide to find the open PR for the current branch and address its comments with gh CLI. Run all `gh` commands with elevated network access.

Prereq: ensure `gh` is authenticated (for example, run `gh auth login` once), then run `gh auth status` with escalated permissions (include workflow/repo scopes) so `gh` commands succeed. If sandboxing blocks `gh auth status`, rerun it with `sandbox_permissions=require_escalated`.

## 1) Inspect comments needing attention
- Run scripts/fetch_comments.py which will print out all the comments and review threads on the PR

## 2) Ask the user for clarification
- Number all the review threads and comments and provide a short summary of what would be required to apply a fix for it
- Ask the user which numbered comments should be addressed

## 3) If user chooses comments
- Apply fixes for the selected comments

Notes:
- If gh hits auth/rate issues mid-run, prompt the user to re-authenticate with `gh auth login`, then retry.
