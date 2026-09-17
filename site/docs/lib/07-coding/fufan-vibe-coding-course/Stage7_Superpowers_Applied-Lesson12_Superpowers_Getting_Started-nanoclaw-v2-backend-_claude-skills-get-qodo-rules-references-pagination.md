---
title: "Fetching Rules with Pagination"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/get-qodo-rules/references/pagination.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/get-qodo-rules/references/pagination.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/get-qodo-rules/references/pagination.md"
sourceSha256: "f0b8001a953e4e2510ba90cd2566f9c5348baa85d1cdecd463846ea559236f3e"
pageSha256: "f0b8001a953e4e2510ba90cd2566f9c5348baa85d1cdecd463846ea559236f3e"
contentMode: "local-full"
zh: ""
---

# Fetching Rules with Pagination

The API returns rules in pages of 50. All pages must be fetched to ensure no rules are missed.

## Algorithm

1. Start with `page=1`, `page_size=50`, accumulate results in an empty list
2. Request: `GET \{API_URL\}/rules?scopes=\{ENCODED_SCOPE\}&state=active&page=\{PAGE\}&page_size=50`
   - Header: `Authorization: Bearer \{API_KEY\}`
3. On non-200 response, handle the error and exit gracefully:
   - `401` — invalid/expired API key
   - `403` — access forbidden
   - `404` — endpoint not found (check `QODO_ENVIRONMENT_NAME`)
   - `429` — rate limit exceeded
   - `5xx` — API temporarily unavailable
   - connection error — check internet connection
4. Parse `rules` array from JSON response body
5. Append page rules to accumulated list
6. If rules returned on this page < 50 → last page, stop
7. Otherwise increment page and repeat from step 2
8. Safety limit: stop after 100 pages (5000 rules max)

## API URL

Construct `\{API_URL\}` from `ENVIRONMENT_NAME` (read from `~/.qodo/config.json`):

| `ENVIRONMENT_NAME` | `\{API_URL\}` |
|---|---|
| set (e.g. `staging`) | `https://qodo-platform.staging.qodo.ai/rules/v1` |

## After Fetching

If total rules == 0, inform the user no rules are configured for the repository scope and exit gracefully.
