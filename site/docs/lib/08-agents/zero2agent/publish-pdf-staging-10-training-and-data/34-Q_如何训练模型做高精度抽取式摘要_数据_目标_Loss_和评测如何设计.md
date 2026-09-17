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
pageSha256: "12c516ae65171afbf704a73d1d84843a2d1499a8a533e02632c5e1ea6dc8f4fe"
contentMode: "local-full"
zh: ""
---

## Q：如何训练模型做高精度抽取式摘要？数据、目标、Loss 和评测如何设计？

> 来源：百度大模型实习 Agent 面经（2026-03-11）

**新手答**：“把文档中的重要句子标成 1，其他句子标成 0，用二分类 Loss 训练，再用 ROUGE 评测。”

**高手答**：

先固定任务口径：抽取式摘要是选择原文句子，还是抽取连续证据 span；输出预算按句数、字数或压缩率控制；“高精度”是要求选出的内容尽量都关键，允许低置信度时少选或拒答。三种口径对应不同标签和解码方式，不能拿生成式摘要直接当逐句真值。

数据要来自目标领域并按文档长度、结构、主题、噪声和压缩率分层。标注员先写摘要要覆盖的事实单元，再勾选最小支持句/span；多人标注并保留分歧，区分核心、可选和冗余证据。训练集加入标题党句、位置偏置、同义重复、局部相关但结论错误的困难负例；长文档按完整文档切分 train/dev/test，防止同一文档的相邻 chunk 泄漏。机器生成标签只能做弱监督，必须用人工金标集校准。

模型可用层级 Encoder：先编码 Token 和句子，再做跨句上下文建模，输出句子分数；连续 span 则用 start/end pointer 或 token tagging。Loss 不只是一项 BCE：

| 目标 | 可选 Loss / 约束 | 解决的问题 |
|------|-----------------|------------|
| 句子相关性 | 加权 BCE 或 focal loss | 正负样本严重不平衡 |
| 排序质量 | pairwise / listwise ranking loss | 核心句应排在次要句前 |
| span 边界 | start/end cross-entropy 或 CRF loss | 抽取边界不精确 |
| 覆盖与去冗余 | coverage reward + redundancy penalty | 重复选相似句、漏掉关键事实 |

若目标优先高精度，应在验证集上校准概率阈值，并允许 `abstain`；再在满足长度预算的候选中做去冗余选择，而不是固定 Top-K。类别权重、负采样和阈值要联合调，避免模型靠“什么都不选”获得虚假的高精度。

评测至少分四层：句/span 的 Precision、Recall、F1 和边界 Exact Match；固定预算下的 Precision@K、Recall@K 与 PR-AUC；摘要层的 ROUGE、事实单元覆盖率和重复率；人工评审关键信息、可读性、上下文完整性及是否因断章取义改变含义。结果按领域、长度、压缩率和首尾位置切片，并在真实 Agent 下游任务中 A/B 测试答案正确率、证据命中率和成本。抽取自原文不等于事实可靠，选错上下文同样会误导下游。

**差距在哪**：新手把任务简化成句子二分类，高手先明确句级/span 级目标，再把标注一致性、不平衡、排序、覆盖、阈值校准和下游效果串成闭环。面试官考的是能否真正把“高精度”变成可训练、可验收的指标。
