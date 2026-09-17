---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md"
sourceRel: "guide/ultimate-guide.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ultimate-guide.md"
sourceSha256: "4d290b0171bbaaffd149d5d2e4da964392cb212d7357408df40d8f346f952dbc"
pageSha256: "2e9500d20e6e52fde9e8ce2cfc88e55a824c937e79ae4e538717da0f74e7c708"
contentMode: "local-full"
zh: ""
---

#### 200K vs 1M Context: Performance, Cost & Use Cases

The 1M context window (GA for Max/Team/Enterprise plans; API tier 4 still required for direct API use) is a significant capability jump, but community feedback consistently frames it as a **niche premium tool**, not a default.

**Retrieval accuracy at scale (MRCR v2 8-needle 1M variant)**

| Model | 256K accuracy | 1M accuracy | Source |
|-------|--------------|-------------|--------|
| Opus 4.6 | 93% | 76% | Anthropic blog + [independent analysis](https://www.youtube.com/watch?v=JKk77rzOL34) (Feb 2026) |
| Sonnet 4.5 | — | 18.5% | Anthropic blog (Feb 2026) |
| Sonnet 4.6 | Not yet published | Not yet published | — |
| Opus 4.8 | Not yet published | Not yet published | N/A |
| Opus 5 | Not yet published | Not yet published | N/A |
| Sonnet 5 | Not yet published | Not yet published | N/A |

The benchmark is the "8-needle 1M variant": finding 8 specific facts in a 1M-token document. Opus 4.6 drops from 93% to 76% when scaling from 256K to 1M; Sonnet 4.5 collapses to 18.5%. **Community validation**: a developer loaded ~733K tokens (4 Harry Potter books) and Opus 4.6 retrieved 49/50 documented spells in a single prompt ([HN, Feb 2026](https://news.ycombinator.com/item?id=46905735)). Sonnet 4.6 MRCR not yet published, but community reports suggest it "struggles with following specific instructions and retrieving precise information" at full 1M context.

**Cost per session (approximate)**

Above 200K input tokens on direct API, **all tokens** in the request are charged at premium rates, not just the excess. Note: on Max/Team/Enterprise Claude Code plans, Opus 5 1M is the default at standard rates (no premium) as of v2.1.75 (March 2026).

| Session type | ~Tokens in | ~Tokens out | Sonnet 5 | Opus 5 |
|---|---|---|---|---|
| Bug fix / PR review (≤200K) | 50K | 5K | ~$0.15 | ~$0.38 |
| Module refactoring (≤200K) | 150K | 20K | ~$0.50 | ~$1.25 |
| Full service analysis (>200K, 1M context) | 500K | 50K | ~$2.75 | ~$6.88 |

For comparison: Gemini 1.5 Pro offers a 2M context window at $3.50/$10.50/MTok, significantly cheaper for pure long-context RAG. Community advice: use Gemini for large-document RAG, Claude for reasoning quality and agentic workflows.

**When to use which**

| Scenario | Recommendation |
|----------|---------------|
| Bug fix, PR review, daily coding | Sonnet 5 @ 200K (fast and cheap) |
| Full-repo audit, entire codebase load | Opus 5 @ 1M (worth the cost for precision) |
| Cross-module refactoring | Sonnet 5 @ 1M (weigh cost vs. chunking + RAG) |
| Architecture analysis, Agent Teams | Opus 5 @ 1M (strongest retrieval at scale) |
| Large-document RAG (PDFs, legal, books) | Consider Gemini 1.5 Pro (cheaper at this scale) |

**Key facts**
- Opus 5 max output: **128K tokens** (same as prior Opus generations); Sonnet 5 max output: **128K tokens**
- 1M context ≈ 30,000 lines of code / 750,000 words
- 1M context is **GA for Max/Team/Enterprise Claude Code plans** (v2.1.75, March 2026). API direct use still requires tier 4 or custom rate limits
- API direct use above 200K input tokens: Sonnet 5 doubles to $4/$20/MTok (from promotional pricing); Opus 5 doubles to $10/$37.50/MTok (standard rate applies for Claude Code Max/Team/Enterprise plans)
- If input stays ≤200K, standard pricing applies even with the beta flag enabled
- **Practical workaround**: check context at ~70% and open a new session rather than hitting compaction ([HN pattern](https://news.ycombinator.com/item?id=46902427))
- Community consensus: 200K + RAG is the default; 1M Opus is reserved for cases where loading everything at once is genuinely necessary
