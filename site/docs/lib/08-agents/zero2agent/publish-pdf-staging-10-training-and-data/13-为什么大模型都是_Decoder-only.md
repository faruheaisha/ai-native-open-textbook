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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/10-training-and-data.md"
sourceRel: "publish-pdf/staging/10-training-and-data.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/10-training-and-data.md"
sourceSha256: "72b8ac45ccf488f6af62cdf704acc8a12a82f64f686774cbef90d5410e88bd0d"
pageSha256: "37f822eb74c28dff9e6d91f64eb539e9bd1b6b470c90791aa828ffe5fc5f1f3a"
contentMode: "local-full"
zh: ""
---

## 为什么大模型都是 Decoder-only

### Q：为什么现在的大模型都是 Decoder-only 架构？

> 来源：淘天 AI Agent 暑期实习一面

**新手答**：“因为 GPT 用的就是 Decoder。”

**高手答**：

Decoder-only 成为主流不是巧合，而是在**生成任务上效率、扩展性和通用性的最优解**。

**三种架构对比：**

| 架构 | 代表 | 核心特点 | 局限 |
|------|------|---------|------|
| Encoder-only | BERT | 双向注意力，擅长理解 | 不能生成，只能做分类/匹配 |
| Encoder-Decoder | T5, BART | 理解+生成分离 | 参数效率低（两套注意力），预训练目标复杂 |
| Decoder-only | GPT, LLaMA, Qwen | 因果注意力，自回归生成 | 单向，理解任务需要更多参数弥补 |

**Decoder-only 胜出的核心原因：**

1. **统一的训练目标**：只需“预测下一个 token”，所有任务（问答、翻译、推理、代码）都能统一为自回归生成。训练简单、数据利用率高
2. **扩展性最好**：同样的参数预算下，Decoder-only 的有效参数全部用于生成，不需要分给 Encoder。Scaling Law 实验表明它在大参数量级上收益最明显
3. **KV Cache 高效**：因果注意力天然支持 KV Cache——生成新 token 时，前面的 KV 不需要重算。Encoder-Decoder 的 cross-attention 需要额外维护 Encoder 输出
4. **In-Context Learning 能力**：Decoder-only 通过超长上下文自然涌现出 few-shot 能力，不需要额外训练。这是 Encoder 架构做不到的
5. **工程简洁性**：只有一种注意力机制、一种前向计算路径，推理框架（vLLM、TGI）优化更简单

**为什么 BERT 类模型没消失？**

在特定任务上（Embedding、Rerank、分类），Encoder 架构仍然更高效——同样参数量下双向注意力对理解任务更强。所以 Agent 系统中通常是“Decoder 做生成 + Encoder 做理解”的组合。

**差距在哪**：面试官考的是你对架构选择背后的 trade-off 理解。只说“因为 GPT 用了”是循环论证。能从训练目标统一性、扩展性、KV Cache 效率三个角度解释，说明你理解架构设计的动机而非只记结论。
