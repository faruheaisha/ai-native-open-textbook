---
title: "Positioning Notes"
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/docs/positioning-notes.md"
sourceRel: "docs/positioning-notes.md"
rawUrl: "/raw/09-harness/claude-code-harness-chachamaru/docs/positioning-notes.md"
sourceSha256: "f51604274d3894af1371d789671a16ac599d62b3942ee128377a31aec39ead7b"
pageSha256: "f51604274d3894af1371d789671a16ac599d62b3942ee128377a31aec39ead7b"
contentMode: "local-full"
zh: ""
---

# Positioning Notes

最終更新: 2026-03-06

公開向けに短く言うなら、`claude-code-harness` の価値は「skill pack を増やすこと」ではなく、**Plan -> Work -> Review を runtime enforcement と verification 付きで回せること**です。

## Core Message

- Harness は `5 verb skills + TypeScript guardrail engine` を商品本体として扱う
- 価値はコマンド数の多さではなく、`guardrail`, `review`, `consistency`, `evidence` が一体で効くこと
- `commands/` や `mcp-server/` のような legacy / optional bucket は弱みではなく、境界が明文化されていれば運用資産として説明できる

## Public Comparison Language

- 避ける: 「競合より圧倒的に上」「完全勝利」
- 使う: 「runtime enforcement が強い」「verification path が明確」「claims を再現証拠に結びつけている」
- 競合比較では、思想や採用実績を否定せず、Harness の強みを guardrail / evidence / operator clarity に寄せて説明する

## Recommended One-liner

> Claude Code を skill pack で拡張するだけでなく、Plan -> Work -> Review を guardrail と検証付きで運用できるようにするハーネス。

## Proof Points

- TypeScript guardrail engine (`core/`)
- 5 verb skills (`skills/`)
- consistency check と plugin validation
- `/harness-work all` evidence pack
