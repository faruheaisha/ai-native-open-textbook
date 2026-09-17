---
title: "Zero2Agent：从零实现 Agent"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/index.md"
sourceRel: "learn-agent-interview/10-training-and-data/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/10-training-and-data/index.md"
sourceSha256: "60b85a3adcd582f7bde8a1650b86f319915c75ffe2c989d6ec17686177cb35ee"
pageSha256: "9f06424ca48543ab07b173c0fc4fd4535b008ea76174bc3c3592a152db77f6b8"
contentMode: "local-full"
zh: ""
---

## Rerank 模型蒸馏

### Q：对 Rerank 模型进行了蒸馏，蒸馏的数据是什么样的？训练数据大概有多少条？

> 来源：同程Agent开发实习一面

**新手答**：“用大模型打标签，然后训练小模型。”

**高手答**：

Rerank 蒸馏的核心是把大 Cross-Encoder（如 bge-reranker-v2-m3）的排序能力迁移到更快的小模型，兼顾精度和推理速度。

**蒸馏数据构造：**

1. **Query 收集**：从真实用户 query 日志中采样 + 人工构造的边界 case（同义改写、否定表达、多意图混合）
2. **候选文档生成**：对每个 query，用检索系统（BM25 + 向量）召回 Top 50 候选
3. **教师模型打分**：用大 Reranker 对 (query, doc) 对打相关性分数（0-1 连续分或 0/1/2 三档）
4. **构造训练对**：
   - Pointwise：每条 (query, doc, score)
   - Pairwise：同一 query 下，高分 doc vs 低分 doc 的 pair
   - Listwise：同一 query 下完整排序列表

**数据规模参考：**
- 通用场景：5K-10K query × 每个 query 20-50 候选 = 10W-50W 训练对
- 垂直领域：2K-5K query 通常足够（领域术语覆盖比数量重要）
- 关键：正负样本比例控制在 1:3 到 1:5，避免模型学到“全判正”

**学生模型选择：**
- 常用 bge-reranker-base（~100M 参数）或 Qwen2.5-0.5B 加 classification head
- 推理速度需要比教师模型快 5-10x 才有蒸馏的意义

**训练技巧：**
- Loss 用 KL 散度（对齐教师模型的 logits 分布）而非硬标签 CE
- 困难负样本（教师模型打分在 0.4-0.6 的模糊区间）权重加大
- 在目标领域 eval set 上用 NDCG@5 和 MRR 监控

**差距在哪**：面试官问蒸馏数据，考的是你对“数据驱动的模型优化”的实操理解。能说出数据构造流程（query来源 → 候选召回 → 教师打分 → 对构造）和规模量级，说明你做过训练而不只是调 API。
