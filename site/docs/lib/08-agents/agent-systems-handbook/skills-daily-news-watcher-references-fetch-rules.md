---
title: "Fetch Rules"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/daily-news-watcher/references/fetch-rules.md"
sourceRel: "skills/daily-news-watcher/references/fetch-rules.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/daily-news-watcher/references/fetch-rules.md"
sourceSha256: "4fcdfd4c41d9d5325245264b83b343f5dfe09406596a1b37c4d5ff2d48f47133"
pageSha256: "4fcdfd4c41d9d5325245264b83b343f5dfe09406596a1b37c4d5ff2d48f47133"
contentMode: "local-full"
zh: ""
---

# Fetch Rules

Readable rules that govern how `daily_news_watcher.py` fetches and processes
sources. Keep this file legible to people and agents.

## Source Acceptance

- Only public URLs. Refuse `file://`, internal hostnames, and URLs that require
  authentication headers.
- Prefer `rss` and `atom` feeds. Fall back to `webpage` only when no feed is
  discoverable.
- Reject paywalled sources. If a publication requires login, do not attempt to
  bypass it; record the source as `webpage` and skip article extraction.

## Fetch Behavior

- Use a single identifying `User-Agent`:
  `daily-news-watcher/0.1 (+https://github.com/Prompthon-IO/agentic-lab)`.
- Timeout each request at 15 seconds. On timeout, record the failure on the
  `runs` row and continue with the next source.
- Cap each source at 25 articles per run to keep reports readable.
- Honor obvious rate limits: do not refetch a source whose `last_checked_at`
  is within the same minute.

## Filtering

- `--hours N` filters articles whose `published_at` falls inside the last N
  hours. If `published_at` is missing, fall back to `fetched_at`.
- `--topic T` is an inclusive case-insensitive match against the article
  title, summary, and the source's `tags` column.

## Deduplication

- URL canonical form: lowercase host, strip default ports, drop trailing
  slashes, remove `utm_*`, `gclid`, `fbclid`, `mc_cid`, `mc_eid` query params.
- Content hash: SHA-256 of the normalized `title + "\n" + summary`.
- Skip an article if either its canonical URL or its content hash already
  exists in the `articles` table.

## Summarization

- Extract a short snippet: strip HTML, collapse whitespace, take the first
  ~280 characters at a sentence boundary when possible.
- The deterministic snippet is intentionally rough. Codex is expected to
  rewrite the snippets in its final reply.

## Safety And Privacy

- Never store cookies, auth headers, or browser session data.
- Never bypass paywalls, captchas, or access controls.
- Local artifacts under `~/.codex/state/daily-news-watcher/` are not committed
  to git unless the user explicitly asks for sample artifacts.
- Failures are recorded per-source. One failing source must not abort the
  whole run.
