---
title: "Judgment Ledger v1"
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/docs/judgment-ledger.md"
sourceRel: "docs/judgment-ledger.md"
rawUrl: "/raw/09-harness/claude-code-harness-chachamaru/docs/judgment-ledger.md"
sourceSha256: "9282d1966d15423f2abd59b1a7540e3e37de5532dfc79fa7b40f94fd1abb518f"
pageSha256: "9282d1966d15423f2abd59b1a7540e3e37de5532dfc79fa7b40f94fd1abb518f"
contentMode: "local-full"
zh: ""
---

# Judgment Ledger v1

Phase 98.1 adds an append-only JSONL ledger for human judgment decisions recorded via `judgment-card.v1`. Records are project-scoped, searchable, and recallable into Decision Cards as `similar_past_decisions`.

## Schema

- **File**: `templates/schemas/judgment-ledger.v1.json`
- **Format**: one JSON object per line (JSONL)
- **Required fields**: `id`, `project`, `decided_at` (ISO8601), `question`, `answer`, `rationale`, `card_ref`, `tags`
- **Validation**: `additionalProperties: false` (draft-07)
- **Default path**: `.claude/state/judgment-ledger.jsonl` (override with `HARNESS_JUDGMENT_LEDGER`)

## Append

- **Go**: `go/internal/judgmentledger.Append` / `AppendFailOpen`
- **Shell**: `scripts/judgment-ledger.sh append --project … --question … --answer … --card-ref …`
- **Wiring**: `scripts/judgment-card.sh record-answer` calls `judgment-ledger.sh append` after harness-mem checkpoint (when configured)
- Records receive a UUID when `--id` is omitted; `decided_at` defaults to UTC now

## Search

- **Ranking**: string-match (case-insensitive substring on full query, else whitespace token hits across `question`, `answer`, `rationale`, `tags`)
- **Scope**: project filter (exact `project` field match)
- **Limit**: max **3** results (Lead decision, Phase 98.1.5)
- **Go**: `judgmentledger.Search(path, project, query, limit)`
- **Shell**: `scripts/judgment-ledger.sh search --project … --query …` (one JSON object per line)

## Recall

- **Purpose**: populate `judgment-card.v1` → `similar_past_decisions` (max 3)
- **Shape**: `\{ summary, decision, outcome, decided_at, mem_id \}` where `mem_id` is `judgment-ledger:<id>`
- **Go**: `judgmentledger.RecallSimilar`
- **Shell**: `scripts/judgment-ledger.sh recall --project … --question …` (JSON array)
- **Card helper**: `scripts/judgment-card.sh recall <card.json> --project …` merges recall output into the card JSON

## Project Scope

- Every read path (`LoadByProject`, `Search`, `RecallSimilar`, shell `search`/`recall`) filters by the `project` field
- Cross-project leakage is structurally excluded (no opt-in cross-project mode in v1)

## Fail-Open

- Ledger writes must **never** block judgment flows
- **Go**: `AppendFailOpen` swallows errors (no panic, no return value)
- **Shell**: `append` exits **0** on I/O failure and prints one stderr warning (`append skipped`)
- Schema validation failures on explicit append still exit **1** (caller supplied invalid record)
- Matches breezingmem / orchestrationledger fail-open conventions used elsewhere in Harness

## Tests

```bash
cd go && go test ./internal/judgmentledger/...
bash tests/schema/test-judgment-ledger-schema.sh
bash tests/test-judgment-ledger.sh
bash tests/test-judgment-ledger-wiring.sh
bash tests/test-judgment-ledger-recall.sh
# optional: bats tests/bats/judgment-ledger.bats
```
