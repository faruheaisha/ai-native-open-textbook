---
title: "SQLite Schema"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/price-watcher/references/schema.md"
sourceRel: "skills/price-watcher/references/schema.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/price-watcher/references/schema.md"
sourceSha256: "f88991259634845497bc92a5c58b86b8c908aa2e12b26a4329a55106791eb86c"
pageSha256: "f88991259634845497bc92a5c58b86b8c908aa2e12b26a4329a55106791eb86c"
contentMode: "local-full"
zh: ""
---

# SQLite Schema

Use a local SQLite database for persistent state. The helper defaults to `~/.codex/state/price-watcher/price-watcher.sqlite3` unless the user supplies `--db` or sets `PRICE_WATCHER_STATE`.

## Tables

```sql
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  query TEXT NOT NULL,
  normalized_name TEXT,
  target_price REAL,
  created_at TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS sources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  site TEXT NOT NULL,
  url TEXT NOT NULL,
  last_checked_at TEXT,
  UNIQUE(item_id, url)
);

CREATE TABLE IF NOT EXISTS price_checks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  source_id INTEGER NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  price REAL NOT NULL,
  currency TEXT NOT NULL,
  checked_at TEXT NOT NULL
);
```

## Notes

- Store the user's natural-language product query in `items.query`.
- Store a concise canonical product name in `items.normalized_name` once a confident match exists.
- Keep `items.target_price` numeric and currency-neutral in the v1 schema. Report the inferred currency in prose when it matters.
- Allow multiple source rows per item.
- Update `sources.last_checked_at` every time a source is attempted, even if extraction fails and the failure only appears in the Markdown report. Use `sources mark-checked --source-id <id>` when a source was attempted but no price row should be inserted.
- Append to `price_checks`; do not overwrite history.
