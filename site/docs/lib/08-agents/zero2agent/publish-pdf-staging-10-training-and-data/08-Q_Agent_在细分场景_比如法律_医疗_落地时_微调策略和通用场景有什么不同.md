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
pageSha256: "73f4c794e81aeb01c8591ea0c66ba255be09e8a9e08ae91bf6eb0d89ee95bd61"
contentMode: "local-full"
zh: ""
---

## Q：Agent 在细分场景（比如法律、医疗）落地时，微调策略和通用场景有什么不同？

> 来源：字节TikTok AI应用开发一面

**新手答**：”收集领域数据做 SFT 就行了。”

**高手答**：
垂直领域微调和通用场景的核心差异在于”数据稀缺 + 风险更高 + 合规约束”三重挑战叠加。

**数据层面的差异**：

1. **数据来源受限**：法律/医疗数据有隐私法规约束（HIPAA、数据本地化），不能直接用公开爬取的数据，需要合规脱敏或使用合成数据
2. **标注成本极高**：需要领域专家（律师、医生）标注，而非众包平台。10 条高质量专家标注的数据往往比 1000 条普通标注更有价值
3. **负样本同样重要**：需要收集”模型错误输出”作为 DPO 的 rejected 样本——领域错误往往有特定模式（比如引用错法条、混淆药物剂量），需要专门构造

**训练策略差异**：

1. **优先 RAG + Prompt，慎用 SFT**：垂直领域知识更新快（新判例、新药审批），SFT 难以频繁更新，RAG 更灵活
2. **SFT 聚焦格式和推理链，而非知识注入**：让模型学会”如何推理法律条文”而不是”记住哪些法条”，后者用 RAG 解决
3. **RLHF/DPO 的 reward 设计更复杂**：通用场景用”有帮助/无害”二分，医疗场景需要”临床准确性 + 安全性 + 合规性”多维度奖励
4. **安全对齐要求更高**：需要额外的拒绝训练（模型应该说”请咨询专业医生”而不是直接给诊断）

**部署差异**：
- 垂直领域更依赖混合策略：小参数专用模型（领域微调 7B/13B）+ RAG + 规则过滤，而非单一大模型
- 需要”置信度输出”——让模型在不确定时明确说”我不确定，建议核实”，通用模型往往不需要这个

**差距在哪**：面试官考的是你对”微调不是万能的”的理解——垂直领域的核心挑战不是模型能力不够，而是数据稀缺、合规约束和高风险容错。高手会在 RAG vs 微调的选择上有清晰的判断标准。
