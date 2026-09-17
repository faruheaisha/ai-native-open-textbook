---
title: "/epic-unblock"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/epic-unblock.md"
sourceRel: "commands/epic-unblock.md"
rawUrl: "/raw/09-harness/ecc/commands/epic-unblock.md"
sourceSha256: "48c1868f03b6ceda7a923d98c76206a35eefa91774a61a0d9d4c18ea5713a4e7"
pageSha256: "48c1868f03b6ceda7a923d98c76206a35eefa91774a61a0d9d4c18ea5713a4e7"
contentMode: "local-full"
zh: ""
---

# /epic-unblock

Sweep blocked epics whose declared dependencies are complete.

```bash
node scripts/github-coordination.js unblock --repo <owner/repo>
```

What this does:

1. Scans epic issues in the repository.
2. Checks each blocked epic's dependency list.
3. Moves fully unblocked epics to ready.
4. Updates labels, comments, and local snapshots.

Compatibility aliases:

- `/loop-status`
