---
title: "Resource Evaluation: ICM (Infinite Context Memory)"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/docs/resource-evaluations/icm-infinite-context-memory.md"
sourceRel: "docs/resource-evaluations/icm-infinite-context-memory.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/docs/resource-evaluations/icm-infinite-context-memory.md"
sourceSha256: "c195767dce83c8f768f8fc0ddf2338da1c1a666c1b1ec7a66ed79cfffcd73930"
pageSha256: "c195767dce83c8f768f8fc0ddf2338da1c1a666c1b1ec7a66ed79cfffcd73930"
contentMode: "local-full"
zh: ""
---

# Resource Evaluation: ICM (Infinite Context Memory)

**Date**: 2026-03-14
**URL**: https://github.com/rtk-ai/icm
**Type**: GitHub repository / MCP server
**Score**: 3/5 — Integrated
**Decision**: Added as section after Kairn in `guide/ultimate-guide.md` (~line 11365)

---

## Summary

ICM is a persistent memory MCP server from the rtk-ai team (same authors as RTK/Rust Token Killer). It provides a dual memory architecture: "Memories" (episodic, configurable decay) and "Memoirs" (permanent knowledge graph with 9 typed relation types). Distributed as a single Rust binary with zero external dependencies, installable via Homebrew.

### Key Points

- Single Rust binary, SQLite, zero deps — Homebrew install
- Dual architecture: episodic decay + permanent knowledge graph in one tool
- Hybrid search: BM25 30% + vector similarity 70%
- Auto-deduplication (>85% similarity blocked)
- Auto-extraction: pattern hooks, pre-compaction, session-start
- Supports 14 editors/clients (Claude Code, Cursor, VS Code, Windsurf, Zed, Amp, Cline, etc.)
- 52 stars as of March 2026 (now 508 as of 2026-07-28), 55 commits
- License: Source-Available (free for individuals and teams ≤20; enterprise license required above)

---

## Scoring

| Criterion | Score |
|-----------|-------|
| Relevance to Claude Code users | 4/5 |
| Differentiation from existing content | 3/5 |
| Maturity / adoption signal | 2/5 |
| License openness | 2/5 |
| **Overall** | **3/5** |

---

## Comparison vs Existing Guide Content

| Feature | doobidoo | Kairn | ICM |
|---------|----------|-------|-----|
| Language | Python | Python | Rust (single binary) |
| Install | pip | pip | Homebrew |
| Episodic decay | No | Yes (biological) | Yes (configurable) |
| Permanent knowledge graph | No | Yes | Yes (Memoirs) |
| Auto-extraction | No | No | Yes |
| License | MIT | MIT | Source-Available |

Main differentiator: zero-dependency Rust binary lowers install friction for users who struggle with Python environments. Conceptual overlap with Kairn (knowledge graph + decay) is real but the runtime difference is meaningful.

---

## Benchmarks

All benchmarks below are **vendor-reported by rtk-ai**: not independently verified.

**Storage performance (1000 ops, 384d embeddings)**:
- Store (no embeddings): 34.2 µs/op
- Store (with embeddings): 51.6 µs/op
- FTS5 full-text search: 46.6 µs/op
- Vector search (KNN): 590.0 µs/op
- Hybrid search: 951.1 µs/op

**Agent efficiency (Haiku model, multi-session)**:
- Session 2: 29% fewer turns, 32% less input context, 17% cost reduction
- Session 3: 40% fewer turns, 44% less context, 22% cost reduction

**Knowledge retention (10 questions)**:
- Without ICM: 5%
- With ICM: 68%

Note: The knowledge retention benchmark uses a sample of 10 questions on Haiku — too narrow for generalization.

---

## Fact-Check

| Claim | Status | Source |
|-------|--------|--------|
| Storage: 34.2 µs/op | ✅ | README benchmarks section |
| Hybrid search: ~951 µs/op | ✅ | README benchmarks section |
| 29-40% turn reduction | ✅ present / ⚠️ vendor-reported | README — rtk-ai self-evaluation |
| 68% vs 5% knowledge retention | ✅ present / ⚠️ vendor-reported, n=10 | README |
| Source-Available license, free ≤20 | ✅ | LICENSE file |
| 9 Memoir relation types | ✅ | README full list |
| 14 supported clients | ✅ | `icm init` documentation |
| 52 stars | ✅ | GitHub as of 2026-03-14 (now 508 as of 2026-07-28) |

No hallucinations detected. All figures present in the source README.
