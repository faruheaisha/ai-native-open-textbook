---
title: "Resource Evaluation: claude-migrate-session Skill"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/docs/resource-evaluations/weller-session-migration-skill.md"
sourceRel: "docs/resource-evaluations/weller-session-migration-skill.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/docs/resource-evaluations/weller-session-migration-skill.md"
sourceSha256: "62d7af408fc22a483576b880516d1232c46a8e6dc2737578b1dcbc3532793066"
pageSha256: "62d7af408fc22a483576b880516d1232c46a8e6dc2737578b1dcbc3532793066"
contentMode: "local-full"
zh: ""
---

# Resource Evaluation: claude-migrate-session Skill

**Author**: Jim Weller (inspired by Alexis Laporte)
**Type**: Community Skill
**Date Evaluated**: 2026-02-09
**Evaluator**: Claude Code Ultimate Guide Team
**Score**: 3/5 (Pertinent - Complément utile)

---

## Executive Summary

A bash skill that automates cross-folder session migration for Claude Code. Addresses a real gap (GitHub issue #1516) but has zero community adoption. Manual filesystem operations are safer and recommended over this automation tool.

---

## Source Information

| Field | Value |
|-------|-------|
| **LinkedIn Post** | https://www.linkedin.com/posts/jwweller_claude-code-skill-that-clones-a-claude-session-activity-7426010179659309056-ZaUH |
| **GitHub Repository** | https://github.com/jimweller/dotfiles/tree/main/dotfiles/claude-code/skills/claude-migrate-session |
| **Publication Date** | February 2026 |
| **Last Updated** | February 2026 |
| **License** | Not specified (personal dotfiles) |
| **Stars/Forks** | 0/0 (as of 2026-02-09) |
| **Issues/PRs** | 0/0 |

---

## What It Does

**Problem solved**: Native `--resume` command is limited to the current working directory. When you move a project or want to fork a session to a new folder, the session becomes inaccessible.

**Solution provided**:
1. **Global search**: Finds sessions across all projects with keyword filtering
2. **Interactive selection**: Filters results, excludes current directory sessions
3. **Automated migration**: Copies `.jsonl` + subagents directory, generates new UUID
