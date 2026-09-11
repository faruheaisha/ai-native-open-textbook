---
title: "回滚策略 — Harness Change Rollback"
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

# 回滚策略 — Harness Change Rollback

> 对应 AHE 演化循环中的 Verify 步骤：当修改的预测被证伪时，如何安全回滚。

---

## 什么时候需要回滚

根据 Change Manifest 中 `verification.verdict` 的取值：

| Verdict | 含义 | 动作 |
|---------|------|------|
| **keep** | 所有预测正确，修改有效 | 保留修改，无需回滚 |
| **revert** | 修改无效或导致回归 | **立即回滚** |
| **partial** | 部分预测正确，部分错误 | 回滚出问题的部分，保留有效的部分 |

### 触发 revert 的具体条件

满足以下任意一条时，verdict 应为 revert：

1. **预期修复的任务未修复** — `expected_fixes` 中的所有任务本轮仍然 fail
2. **观察到回归** — `at_risk_regressions` 中的任务本轮 fail（原本是 pass 的）
3. **新引入的失败** — 不在预期范围内但新出现的 fail 任务达到 2+ 个
4. **严重度 P0 的回归** — 即使只有 1 个 P0 任务回归，也应 revert

---

## 回滚方式

### 方式 1：git revert（推荐）

如果 Harness 文件在版本控制中：

```bash
# 查看修改涉及的文件
cat manifests/change_20260521_103000.json | python3 -c "
import sys, json
m = json.load(sys.stdin)
for c in m['changes']:
    print(c['file_path'])
"

# 对每个修改的文件执行 git revert
