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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/06-multi-agent-collab.md"
sourceRel: "publish-pdf/staging/06-multi-agent-collab.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/06-multi-agent-collab.md"
sourceSha256: "45cd341f24a023f5affe2db1b6c5c8527844255ad74a8e55796c4ce86d984b7e"
pageSha256: "6400d07f205c256b37337954d0906f16063e14cf8f7213a803039d563b91bdb2"
contentMode: "local-full"
zh: ""
---

## Q：校验 Agent 和推理 Agent 结论冲突时怎么处理？

> 来源：商汤/大模型算法应用实习二面

**新手答**：“以校验 Agent 的结论为准。”

**高手答**：

不能简单“以谁为准”——需要根据**冲突类型**选择不同的仲裁策略。

**冲突分类与处理**：

| 冲突类型 | 特征 | 处理策略 | 示例 |
|---------|------|---------|------|
| 事实性冲突 | 校验 Agent 有外部证据 | 校验 Agent 赢，推理 Agent 重来 | 推理说“2024年GDP是X”，校验查到实际是Y |
| 逻辑性冲突 | 推理链有漏洞 | 让推理 Agent 补充推理步骤，校验再验证 | 推理跳过了某个前置条件的检查 |
| 不确定性冲突 | 双方都有道理 | 上升到仲裁层 | 对同一数据的不同合理解读 |

**工程实现——争议仲裁流程**：

**争议报告结构**：

```text
{
  "conflict_type": "factual | logical | uncertain",
  "reasoning_agent_claim": "推理Agent的结论 + 推理链",
  "verification_agent_claim": "校验Agent的结论 + 证据来源",
  "overlap": "双方同意的部分",
  "disagreement": "具体分歧点"
}
```

**防止震荡**：推理 Agent 和校验 Agent 互相否定进入死循环时，设置**最大争议轮次**（通常 2-3 轮）后强制走仲裁。每一轮争议都必须产生新的证据或论点，如果第二轮的论点和第一轮相同，直接判定为“不确定性冲突”走仲裁。

**差距在哪**：面试官考的是多 Agent 系统中“冲突解决”机制的设计——这是分布式系统中的经典共识问题在 AI 领域的映射。简单“以谁为准”无法处理灰区情况，分类仲裁 + 争议报告 + 震荡防护才是完整方案。
