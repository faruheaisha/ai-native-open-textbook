---
title: "Evaluation Overview — Iteration 3"
sourceId: "09-harness/agentic-harness-engineering"
sourceTitle: "Agentic Harness Engineering（论文与实现）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/china-qijizhifeng/agentic-harness-engineering"
entryUrl: "https://github.com/china-qijizhifeng/agentic-harness-engineering/blob/8b2a55d97590363fe50c3cc6b5e833b020a4bb4c/README.md"
zh: ""
---

# Evaluation Overview — Iteration 3

## Summary
- **Date:** 2026-05-21
- **Total tasks:** 12
- **Passed:** 8 (66.7%)
- **Failed:** 4 (33.3%)

## Failure Clusters

| Failure Pattern | Count | % of Failures | Most Affected Component |
|----------------|-------|---------------|------------------------|
| 搜索结果截断 | 2 | 50% | tool_descriptions |
| 工具参数错误 | 1 | 25% | tool_descriptions |
| 上下文溢出 | 1 | 25% | middleware |

## Root Cause Distribution

| Component | Failure Count | % | Recommended Action |
|-----------|--------------|---|-------------------|
| Tool Descriptions | 3 | 75% | 补齐 search 工具分页参数；修复 file_write 路径编码说明 |
| Middleware | 1 | 25% | 添加 long_tool_output 中间件 |

## Detail Reports

- [T-042: Search results exceed 50](https://github.com/china-qijizhifeng/agentic-harness-engineering/blob/8b2a55d97590363fe50c3cc6b5e833b020a4bb4c/skills/agentic-harness-engineering/references/examples/trace-sample/detail/task-t042-search-truncation.md)
- [T-057: File write path encoding](https://github.com/china-qijizhifeng/agentic-harness-engineering/blob/8b2a55d97590363fe50c3cc6b5e833b020a4bb4c/skills/agentic-harness-engineering/references/examples/trace-sample/detail/task-t057-file-encoding.md)
- [T-063: Context overflow on large response](https://github.com/china-qijizhifeng/agentic-harness-engineering/blob/8b2a55d97590363fe50c3cc6b5e833b020a4bb4c/skills/agentic-harness-engineering/references/examples/trace-sample/detail/task-t063-context-overflow.md)
- [T-071: Search query too specific](https://github.com/china-qijizhifeng/agentic-harness-engineering/blob/8b2a55d97590363fe50c3cc6b5e833b020a4bb4c/skills/agentic-harness-engineering/references/examples/trace-sample/detail/task-t071-search-specificity.md)

## Recommended Priority

1. **T-042 / T-071 fix** — search 工具补充分页参数 → 预期修复 2 个失败
2. **T-057 fix** — file_write 补充路径编码说明 → 预期修复 1 个失败
3. **T-063 fix** — 添加 long_tool_output middleware → 预期修复 1 个失败

## Change Manifest

See `manifests/change_20260521_103000.json` for the full falsifiable change manifest.
