---
title: "ECC —— Harness 性能优化系统"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/hookify-list.md"
sourceRel: "commands/hookify-list.md"
rawUrl: "/raw/09-harness/ecc/commands/hookify-list.md"
sourceSha256: "b513140d7a93527d5d8beabd4cb1aacaa296c00ac96586bc946466014f31a3cc"
pageSha256: "b513140d7a93527d5d8beabd4cb1aacaa296c00ac96586bc946466014f31a3cc"
contentMode: "local-full"
zh: ""
---

# ECC —— Harness 性能优化系统

Find and display all hookify rules in a formatted table.

## Steps

1. Find all `.claude/hookify.*.local.md` files
2. Read each file's frontmatter:
   - `name`
   - `enabled`
   - `event`
   - `action`
   - `pattern`
3. Display them as a table:

| Rule | Enabled | Event | Pattern | File |
|------|---------|-------|---------|------|

4. Show the rule count and remind the user that `/hookify-configure` can change state later.
