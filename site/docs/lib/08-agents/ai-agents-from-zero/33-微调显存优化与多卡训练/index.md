---
title: "33 - 微调显存优化与多卡训练"
sourceId: "08-agents/ai-agents-from-zero"
sourceTitle: "从零构建 AI Agent（didilili）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/didilili/ai-agents-from-zero"
entryUrl: "https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/33-微调显存优化与多卡训练.md"
sourceRel: "33-微调显存优化与多卡训练.md"
rawUrl: "/raw/08-agents/ai-agents-from-zero/33-微调显存优化与多卡训练.md"
sourceSha256: "4c4ffedf1d752a78d0ec78acd54c7d26c347d65d4dcbe2c3cd65be7ab086cd9a"
pageSha256: "71a04334ae6b0fd49adef6f6ca6d2e8eb214cc8abd8ecd682c2a720e327e291a"
contentMode: "local-full"
zh: ""
---

# 33 - 微调显存优化与多卡训练

---

**本章课程目标：**

- 能根据报错发生的阶段，选择第一步检查，分清权重、批次计算与参数更新的显存压力。
- 能调整常见单卡设置，说明省下哪部分显存、可能付出什么代价。
- 能解释多卡的分工与 ZeRO 的分片对象，按实际数据并行份数计算有效批次。
- 能用相同工作量下的显存与耗时记录，决定继续训练、调整方案还是停止试验。

**本章围绕一个问题展开：资源不够时，先查什么，怎样调整才值得？** 第 1～2 节先解决常见单卡问题；第 3～4 节理解多卡怎样协作；第 5 节把这些知识用于试跑和选择。

首次学习要能说清排查顺序，并读懂第 2.6 节的真实资源对照。多卡部分先掌握“各张卡分别做什么、存什么”，不要求立即配置多卡。量化、DeepSpeed 和大模型试跑的完整操作按需展开，没有相应硬件也可以用课程记录完成判断练习。

---

## 本篇目录

- [1、训练资源问题的判断](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/01-1_训练资源问题的判断.md)
- [2、单卡显存排查与优化](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/02-2_单卡显存排查与优化.md)
- [3、多 GPU 的分工方式](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/03-3_多_GPU_的分工方式.md)
- [4、DeepSpeed 与 ZeRO](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/04-4_DeepSpeed_与_ZeRO.md)
- [5、大模型试跑与结果判断](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/05-5_大模型试跑与结果判断.md)
