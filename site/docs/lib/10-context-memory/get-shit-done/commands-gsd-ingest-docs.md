---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/ingest-docs.md"
sourceRel: "commands/gsd/ingest-docs.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/ingest-docs.md"
sourceSha256: "108ca1cfb4e8d63286670b80c6282a939723e58ae63fb3b5229113558de74732"
pageSha256: "108ca1cfb4e8d63286670b80c6282a939723e58ae63fb3b5229113558de74732"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Build the full `.planning/` setup (or merge into an existing one) from multiple pre-existing planning documents — ADRs, PRDs, SPECs, DOCs — in one pass.

- **Net-new bootstrap** (`--mode new`, default when `.planning/` is absent): produces PROJECT.md + REQUIREMENTS.md + ROADMAP.md + STATE.md from synthesized doc content, delegating final generation to `gsd-roadmapper`.
- **Merge into existing** (`--mode merge`, default when `.planning/` is present): appends phases and requirements derived from the ingested docs; hard-blocks any contradiction with existing locked decisions.

Auto-synthesizes most conflicts using the precedence rule `ADR > SPEC > PRD > DOC` (overridable via manifest). Surfaces unresolved cases in `.planning/INGEST-CONFLICTS.md` with three buckets: auto-resolved, competing-variants, unresolved-blockers. The BLOCKER gate from the shared conflict engine prevents any destination file from being written when unresolved contradictions exist.

**Inputs:** directory-convention discovery (`docs/adr/`, `docs/prd/`, `docs/specs/`, `docs/rfc/`, root-level `\{ADR,PRD,SPEC,RFC\}-*.md`), or an explicit `--manifest <file>` YAML listing `\{path, type, precedence?\}` per doc.

**v1 constraints:** hard cap of 50 docs per invocation; `--resolve interactive` is reserved for a future release.
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/ingest-docs.md
@~/.claude/get-shit-done/references/ui-brand.md
@~/.claude/get-shit-done/references/gate-prompts.md
@~/.claude/get-shit-done/references/doc-conflict-engine.md
&lt;/execution_context>

&lt;context>
$ARGUMENTS
&lt;/context>

&lt;process>
Execute the ingest-docs workflow end-to-end. Preserve all approval gates (discovery, conflict report, routing) and the BLOCKER safety rule.
&lt;/process>
