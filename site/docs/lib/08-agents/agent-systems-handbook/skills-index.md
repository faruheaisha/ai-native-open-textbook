---
title: "Agent Systems Handbook（智能体系统手册）"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/README.md"
zh: ""
---

# Agent Systems Handbook（智能体系统手册）

import SupportCTA from "/snippets/support-cta.mdx";

This directory collects Codex-compatible skills that are useful for everyday
workflows and personal operations. Each skill should be usable as an
installable package with a human-facing `README.md`, an agent-facing
`SKILL.md`, and only the supporting resources it needs.

## Specialization IDs

Specialization IDs use two letters followed by a two-digit sequence number. The first letter identifies the category: **G = General**, **P = Professional**. The second identifies the format: **W = Workshop-type** short course, **T = Internship** with real-project engagement.

| ID | Specialization | Category and format |
| --- | --- | --- |
| `GW01` | [Setup and Examples](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/reading-paths/environment-setup/README.md) | General · Workshop-type |
| `GW02` | [Professional AI Agent Course](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/professional-ai-agent-course/README.md) | General · Workshop-type |
| `PT01` | [AI-Native Internship](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/specializations/ai-native-internship/README.md) | Professional · Internship (real-project engagement) |

## GW02 · Professional AI Agent Course

The [Professional AI Agent Course](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/professional-ai-agent-course/README.md) composes twelve focused capabilities for Lessons 2–5. Each package link opens the complete skill codebase. Start with the [shared setup and classroom guide](https://github.com/Prompthon-IO/agent-systems-handbook/blob/develop/skills/course-support/README.md); production course persistence is a separately tracked backend dependency.

| Lesson | Skill package | Course capability |
| --- | --- | --- |
| 2 | [`local-document-organizer`](https://github.com/Prompthon-IO/agent-systems-handbook/tree/develop/skills/local-document-organizer) | Organize files |
| 2 | [`personal-knowledge-capture`](https://github.com/Prompthon-IO/agent-systems-handbook/tree/develop/skills/personal-knowledge-capture) | Understand sources |
| 2 | [`personal-workflow-automation`](https://github.com/Prompthon-IO/agent-systems-handbook/tree/develop/skills/personal-workflow-automation) | Automate tool steps |
| 3 | [`web-builder`](https://github.com/Prompthon-IO/agent-systems-handbook/tree/develop/skills/web-builder) | Build a local site |
| 3 | [`webapp-testing`](https://github.com/Prompthon-IO/agent-systems-handbook/tree/develop/skills/webapp-testing) | Test behavior |
| 3 | [`vercel-deploy`](https://github.com/Prompthon-IO/agent-systems-handbook/tree/develop/skills/vercel-deploy) | Deploy a preview |
| 4 | [`business-data-structuring`](https://github.com/Prompthon-IO/agent-systems-handbook/tree/develop/skills/business-data-structuring) | Structure a dataset |
| 4 | [`crm-operations`](https://github.com/Prompthon-IO/agent-systems-handbook/tree/develop/skills/crm-operations) | Operate CRM objects |
| 4 | [`business-data-analysis`](https://github.com/Prompthon-IO/agent-systems-handbook/tree/develop/skills/business-data-analysis) | Analyze evidence |
| 5 | [`content-strategy`](https://github.com/Prompthon-IO/agent-systems-handbook/tree/develop/skills/content-strategy) | Plan content |
| 5 | [`prompthon-social-campaign-manager`](https://github.com/Prompthon-IO/agent-systems-handbook/tree/develop/skills/prompthon-social-campaign-manager) | Distribute through canonical Social operations |
| 5 | [`ai-search-visibility`](https://github.com/Prompthon-IO/agent-systems-handbook/tree/develop/skills/ai-search-visibility) | Discover visibility gaps |

## PT01 · AI-Native Internship

The [PT01 · AI-Native Internship specialization](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/specializations/ai-native-internship/README.md) is a separate three-phase pathway: 4–6 private two-hour coaching sessions based on the student's existing skill proficiency, a formal GitHub open-source contribution, and supervised real-project engagement subject to readiness and project matching. Coaching covers flexible content areas rather than a fixed session-by-session syllabus. Its curriculum and deliverables are documented separately from the GW02 skill packages.

## Additional Practitioner Skills

| Skill | Package path | What it demonstrates |
| --- | --- | --- |
| Agent Runtime Cache Benchmark | [`skills/agent-runtime-cache-benchmark/README.md`](https://github.com/Prompthon-IO/agent-systems-handbook/blob/main/skills/agent-runtime-cache-benchmark/README.md) | Local-first comparison of cold and warm agent runs, cache-break detection from structured run artifacts, and report-driven prompt-cache tuning |
| Daily News Watcher | [`skills/daily-news-watcher/README.md`](https://github.com/Prompthon-IO/agent-systems-handbook/blob/main/skills/daily-news-watcher/README.md) | SQLite-backed persistent news monitoring, RSS/Atom + optional Playwright fetching, URL+hash deduplication, and per-run Markdown reports |
| Garbage Collector | [`skills/garbage-collector/README.md`](https://github.com/Prompthon-IO/agent-systems-handbook/blob/main/skills/garbage-collector/README.md) | Preview-first local cleanup, readable CSV rules, reversible duplicate cleanup, and explicit approval before destructive actions |
| Presentation Template Designer | [`skills/presentation-template-designer/README.md`](https://github.com/Prompthon-IO/agent-systems-handbook/blob/main/skills/presentation-template-designer/README.md) | Brief-first layout planning, portable template manifests, deterministic validation, editable-backend selection, and explicit privacy boundaries before generation or upload |
| Prompt Cache Agent Harness | [`skills/prompt-cache-agent-harness/README.md`](https://github.com/Prompthon-IO/agent-systems-handbook/blob/main/skills/prompt-cache-agent-harness/README.md) | Claude prompt-cache layer planning, captured usage metadata review, cache-read/write reporting, and optional caller-supplied input-cost estimates |
| Safety Escalation Review | [`skills/safety-escalation-review/README.md`](https://github.com/Prompthon-IO/agent-systems-handbook/blob/main/skills/safety-escalation-review/README.md) | Local evidence review, redacted escalation memos, and human-owned safety handoff checklists without external reporting |

## Skill Package Shape

Each shared skill should keep the package itself small:

```text
