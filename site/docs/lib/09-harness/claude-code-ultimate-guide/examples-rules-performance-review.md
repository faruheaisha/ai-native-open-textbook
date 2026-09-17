---
title: "Performance Review Criteria"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/rules/performance-review.md"
sourceRel: "examples/rules/performance-review.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/rules/performance-review.md"
sourceSha256: "d0ea57b796ce9e0229940422e181e355b884a10712ca6c3be2f8f3dbe7a139a1"
pageSha256: "d0ea57b796ce9e0229940422e181e355b884a10712ca6c3be2f8f3dbe7a139a1"
contentMode: "local-full"
zh: ""
---

# Performance Review Criteria

When reviewing performance, evaluate these dimensions:

## Database Access
- Are there N+1 query patterns (loop with individual queries)?
- Are queries using appropriate indexes?
- Is data fetched at the right granularity (not over-fetching)?
- Are bulk operations used where possible?

## Memory
- Are large datasets streamed rather than loaded entirely in memory?
- Are there potential memory leaks (event listeners, unclosed connections)?
- Is object allocation minimized in hot paths?

## Caching
- What data is expensive to compute and stable enough to cache?
- Are cache invalidation strategies defined?
- Is caching applied at the right layer (application, database, CDN)?

## Complexity
- Are there O(n^2) or worse algorithms that could be optimized?
- Are hot paths identified and optimized?
- Is unnecessary work being done (redundant computations, unused data transforms)?
- Are expensive operations deferred or lazy-loaded where possible?
