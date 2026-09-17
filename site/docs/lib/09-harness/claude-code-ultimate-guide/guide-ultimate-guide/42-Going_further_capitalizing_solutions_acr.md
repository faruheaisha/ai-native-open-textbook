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
pageSha256: "6d2bf6397d4d985c257d60b30ff3797a927207aeae05ecab2f5cdbec94dd8670"
contentMode: "local-full"
zh: ""
---

#### Going further: capitalizing solutions across PRs

CLAUDE.md captures behavioral rules. For solved technical problems, a complementary pattern from [Every.to's Compound Engineering](https://every.to/guides/compound-engineering): a `docs/solutions/` directory that turns each non-trivial problem into searchable documentation.

```
docs/solutions/
├── auth-token-refresh-race-condition.md
├── ios-storekit2-receipt-validation.md
└── kotlin-coroutine-timeout-pattern.md
```

Each file documents: the problem, the solution, why it works, and edge cases. Claude reads these files when similar patterns appear: the third time a related issue surfaces, the fix is already there. The distinction with CLAUDE.md is intentional: CLAUDE.md contains rules, `docs/solutions/` contains solved problems with their full context.
