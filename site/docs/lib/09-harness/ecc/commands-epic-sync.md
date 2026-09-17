---
title: "/epic-sync"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/epic-sync.md"
sourceRel: "commands/epic-sync.md"
rawUrl: "/raw/09-harness/ecc/commands/epic-sync.md"
sourceSha256: "b191bedc4bfafb8a03818042dbc87ed175930e27a042c112c219912626dceb79"
pageSha256: "b191bedc4bfafb8a03818042dbc87ed175930e27a042c112c219912626dceb79"
contentMode: "local-full"
zh: ""
---

# /epic-sync

Run a deterministic sync for epic issues.

```bash
node scripts/github-coordination.js sync --repo <owner/repo>
```

What this does:

1. Reads issue bodies as the canonical epic state.
2. Reconciles the coordination block with labels.
3. Writes a fresh local snapshot for each epic issue.
4. Keeps the SQLite cache aligned with GitHub.

Compatibility aliases:

- `/projects`
- `/work-items sync-github`
