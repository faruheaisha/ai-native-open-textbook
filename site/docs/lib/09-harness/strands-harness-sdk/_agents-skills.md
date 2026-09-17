---
title: "Agent Skills"
sourceId: "09-harness/strands-harness-sdk"
sourceTitle: "Strands Harness SDK"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/strands-agents/harness-sdk"
entryUrl: "https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/.agents/skills/README.md"
sourceRel: ".agents/skills/README.md"
rawUrl: "/raw/09-harness/strands-harness-sdk/.agents/skills/README.md"
sourceSha256: "0d8364b4b7e278dc64cbf73e3b45c19cd53281523c4acc389a28935b37b16223"
pageSha256: "0d8364b4b7e278dc64cbf73e3b45c19cd53281523c4acc389a28935b37b16223"
contentMode: "local-full"
zh: ""
---

# Agent Skills

Skills for this repository. See [agentskills.io](https://agentskills.io/home) for the general format.

## PR workflow

| Skill | Purpose |
|-------|---------|
| **pr-writer** | Generates PR titles and descriptions following our Conventional Commits format, PR template, and `team/PR.md` writing guidelines. Captures design decisions from the conversation so reviewers get the "why" without reading the full thread. |
| **pr-create** | Orchestrates the full PR creation flow: description generation, pre-flight checks from CONTRIBUTING.md, conditional push, and `gh pr create --draft`. Prevents common agent mistakes like creating non-draft PRs or using incompatible flags. |
| **pr-feedback** | Fetches all unresolved PR comments (inline threads, reviews, issue-level) via a bundled script using GitHub's GraphQL API. Surfaces reaction data and author replies to distinguish "agreed to fix" from "open discussion", then presents a prioritized list for selective addressing. |

## Documentation

| Skill | Purpose |
|-------|---------|
| **docs-writer** | Drafts or rewrites documentation pages following the project's voice and structure guidelines. |
| **docs-reviewer** | Reviews drafts for voice consistency, structure, and terminology before PR submission. |
| **docs-audit** | Assesses published pages for quality, accuracy, and voice compliance. |
| **docs-planner** | Identifies documentation gaps and prioritizes the backlog. |

## Code review

| Skill | Purpose |
|-------|---------|
| **strands-review** | Local preview of the `/strands review` GitHub Action. Runs the same Task Reviewer SOP so you can anticipate what the remote agent will flag before pushing. |

## Local checks

| Skill | Purpose |
|-------|---------|
| **pre-push** | Mirrors the `ci.yml` merge gate locally. A bundled script detects which areas changed (python/typescript/docs) using CI's exact path filters, auto-fixes what's mechanical (format, lint `--fix`, lockfile sync) scoped to changed files, then runs that area's checks. Run it to get push-ready before pushing or opening a PR (pairs with **pr-create** / **pr-writer**). |

## Adding a new skill
