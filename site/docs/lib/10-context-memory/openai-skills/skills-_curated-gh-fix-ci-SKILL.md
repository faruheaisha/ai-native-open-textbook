---
title: "Gh Pr Checks Plan Fix"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/gh-fix-ci/SKILL.md"
sourceRel: "skills/.curated/gh-fix-ci/SKILL.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/gh-fix-ci/SKILL.md"
sourceSha256: "7b326b4a2f0f5f85122144628ec02077e48841e0e0e82efce88b3415bcfb7c26"
pageSha256: "7b326b4a2f0f5f85122144628ec02077e48841e0e0e82efce88b3415bcfb7c26"
contentMode: "local-full"
zh: ""
---

# Gh Pr Checks Plan Fix

## Overview

Use gh to locate failing PR checks, fetch GitHub Actions logs for actionable failures, summarize the failure snippet, then propose a fix plan and implement after explicit approval.
- If a plan-oriented skill (for example `create-plan`) is available, use it; otherwise draft a concise plan inline and request approval before implementing.

Prereq: authenticate with the standard GitHub CLI once (for example, run `gh auth login`), then confirm with `gh auth status` (repo + workflow scopes are typically required).

## Inputs

- `repo`: path inside the repo (default `.`)
- `pr`: PR number or URL (optional; defaults to current branch PR)
- `gh` authentication for the repo host

## Quick start
