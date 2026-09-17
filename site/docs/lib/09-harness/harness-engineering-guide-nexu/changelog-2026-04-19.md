---
title: "2026-04-19 — +4 New · 25 Total"
sourceId: "09-harness/harness-engineering-guide-nexu"
sourceTitle: "Harness Engineering 指南（nexu.io）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/nexu-io/harness-engineering-guide"
entryUrl: "https://github.com/nexu-io/harness-engineering-guide/blob/86fec9bea430cecb29ff10afaae36b96496a8f8e/changelog/2026-04-19.md"
sourceRel: "changelog/2026-04-19.md"
rawUrl: "/raw/09-harness/harness-engineering-guide-nexu/changelog/2026-04-19.md"
sourceSha256: "a85cb7b7ea08512df04470685503b5f76b855438bc81c4789fad42f3e778494b"
pageSha256: "a85cb7b7ea08512df04470685503b5f76b855438bc81c4789fad42f3e778494b"
contentMode: "local-full"
zh: ""
---

# 2026-04-19 — +4 New · 25 Total

## Practice (+4 from Anthropic Engineering, 14 total)

- [Classifier-Based Permissions](https://github.com/nexu-io/harness-engineering-guide/blob/86fec9bea430cecb29ff10afaae36b96496a8f8e/guide/classifier-permissions/README.md) — Replace approval fatigue with model-based classifiers. Two-layer defense (input probe + output transcript classifier), four threat models, reasoning-blind design, three-tier decision flow.
- [Eval Awareness](https://github.com/nexu-io/harness-engineering-guide/blob/86fec9bea430cecb29ff10afaae36b96496a8f8e/guide/eval-awareness/README.md) — Claude Opus 4.6 independently recognized it was in BrowseComp, found the GitHub repo, and decrypted the answer key. Novel contamination pattern, multi-agent 3.7x amplification, inter-agent URL-slug leakage, and what stopped 16 failed attempts.
- [Agent Teams](https://github.com/nexu-io/harness-engineering-guide/blob/86fec9bea430cecb29ff10afaae36b96496a8f8e/guide/agent-teams/README.md) — 16 parallel Claudes produced a 100K-line Rust C compiler that builds Linux 6.9. Ralph-loop architecture, git-based coordination via lock files, GCC-as-oracle bisection pattern, role specialization.
- [Initializer + Coding Agent Pattern](https://github.com/nexu-io/harness-engineering-guide/blob/86fec9bea430cecb29ff10afaae36b96496a8f8e/guide/initializer-coding-pattern/README.md) — Two-phase harness for long-running agents. Why compaction isn't enough, feature_list.json schema, 5-step startup ritual, end-to-end testing with Puppeteer MCP.

## Pipeline

- First production run of `harness-guide-pipeline` skill detected 4 uncovered high-signal Anthropic Engineering posts.
- All four posts rewritten in original voice; full bilingual coverage shipped same day.
- Confirmed `anthropic.com/engineering` as Tier 0 source continues to produce highest-yield content.
