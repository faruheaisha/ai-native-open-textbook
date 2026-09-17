---
title: "熵管理与垃圾回收（Entropy & Garbage Collection）"
sourceId: "09-harness/deusyu-harness-engineering"
sourceTitle: "Harness Engineering 学习指南"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deusyu/harness-engineering"
entryUrl: "https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/concepts/03-entropy-and-garbage-collection.md"
sourceRel: "concepts/03-entropy-and-garbage-collection.md"
rawUrl: "/raw/09-harness/deusyu-harness-engineering/concepts/03-entropy-and-garbage-collection.md"
sourceSha256: "151f690cd4b816b250a456fbb9818f41816e3bf81b8d4921babf9572d5855781"
pageSha256: "151f690cd4b816b250a456fbb9818f41816e3bf81b8d4921babf9572d5855781"
contentMode: "local-full"
zh: ""
---

# 熵管理与垃圾回收（Entropy & Garbage Collection）

> 六大核心概念之一（概念 6，编号见 [00-overview.md](/lib/09-harness/deusyu-harness-engineering/concepts-00-overview)；文件名编号是阅读顺序，不是概念编号）。

## 问题

智能体会复现仓库中已存在的模式——**包括坏模式**。

随着时间推移，不可避免地产生漂移（drift）：
- 重复的辅助函数散落各处
- 不一致的错误处理风格
- 基于猜测的数据结构（YOLO 式探测）
- 过时的文档与实际代码不符

## 失败方案：人工清理

> 团队每周五花 20% 时间清理"AI 残渣"。不出所料，不具备可扩展性。

## 成功方案：编码 + 自动化

### "黄金规则"（Golden Rules）

带主观意见的机械规则，编码进仓库：

1. **共享实用程序包 > 手写辅助工具** — 不变式集中管理
2. **不做 YOLO 探测** — 在边界验证数据，或使用类型化 SDK
3. **偏好自有实现的关键子集** — 与自有遥测集成、100% 测试覆盖、行为完全可预测

### 垃圾回收流程

```
定期后台 Codex 任务
  → 扫描偏差
  → 更新质量评分
  → 发起重构 PR
  → 大多数 1 分钟内审查 + 自动合并
```

## 类比

技术债 = 高息贷款

- ✅ 每天小额偿还（持续垃圾回收）
- ❌ 累积到痛苦时一次性清偿（重写/大重构）

## 关键洞察

> 人类的品味一旦被捕捉（编码为规则），就会持续应用于每一行代码。

品味的传播路径：
```
人类审查评论 → 文档更新 → lint 规则 → 自动应用于所有代码
```
