---
title: "split-payment"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/evals/fixtures/test-driven-development/README.md"
sourceRel: "evals/fixtures/test-driven-development/README.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/evals/fixtures/test-driven-development/README.md"
sourceSha256: "f7ce058b1d7dd375235d7e917572e72ffefb1493fd39cb3b39039cb2a29b3567"
pageSha256: "f7ce058b1d7dd375235d7e917572e72ffefb1493fd39cb3b39039cb2a29b3567"
contentMode: "local-full"
zh: ""
---

# split-payment

Utility for splitting an amount of money among `n` participants without
losing or inventing cents. Amounts are integer cents throughout; the
library never touches floating point.

## API

`splitCents(totalCents, n)` returns an array of `n` integer cent amounts.
`totalCents` is a non-negative integer, `n` is a positive integer.

## Invariants

Every result must satisfy both invariants, for every input:

1. **Exactness** — the shares sum to exactly `totalCents`. Money is never
   lost or created.
2. **Fairness** — no two shares differ by more than one cent. When the
   total does not divide evenly, the leftover cents go to the earliest
   shares, one cent each.

For example, `splitCents(100, 7)` is `[15, 15, 14, 14, 14, 14, 14]`.

## Tests

```
npm test
```
