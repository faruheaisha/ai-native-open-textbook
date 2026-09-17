---
title: "32 - 微调效果评估与模型部署"
sourceId: "08-agents/ai-agents-from-zero"
sourceTitle: "从零构建 AI Agent（didilili）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/didilili/ai-agents-from-zero"
entryUrl: "https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/32-微调效果评估与模型部署.md"
sourceRel: "32-微调效果评估与模型部署.md"
rawUrl: "/raw/08-agents/ai-agents-from-zero/32-微调效果评估与模型部署.md"
sourceSha256: "684d1ea13ea85129e744239460f2bd2dee1029f47397cd58408d28783a731116"
pageSha256: "def5f2ccc7435f31d8d77c575837a1d56bdf48766e50be3b8e9b6f2fd695bfac"
contentMode: "local-full"
zh: ""
---

# 32 - 微调效果评估与模型部署

---

**本章课程目标：**

- 能让原始模型与微调模型回答相同问题，说明比较条件是否公平。
- 能用一条样本算清精确率、召回率与 F1，再结合格式和实际错误读懂整份报告。
- 能根据证据决定继续改进还是采用模型，并安排下一轮数据检查与回归验证。
- 能区分 Adapter、合并模型和接口服务，完成导出核查；需要时再选做部署。

**学习建议：** 围绕“这次微调是否值得采用，依据是什么”展开学习：先看一条回答，再看一批结果，最后决定怎样改进和交付。英文参数和命令用于完成这些检查，首次阅读不要求记住它们。

先按正文理解第 1～4 节，亲手计算第 4.2 节的图书馆样本；进阶对照和故障说明需要时再展开。跟做时，有 Adapter 就完成第 2～3 节的加载与预测；暂时没有 GPU，可直接用课程附带的两组预测完成第 4.4 节，只需要 Python 3。两条路线都要在第 4.6 节写出自己的评估结论。

第 5 节学习怎样交付模型文件，第 6 节再认识程序如何调用它。安装 vLLM 按环境条件选做；接口返回后怎样检查、失败后怎样处理，仍值得读懂。

---

## 本篇目录

- [1、模型验证的任务与准备](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/01-1_模型验证的任务与准备.md)
- [2、模型加载与单条验证](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/02-2_模型加载与单条验证.md)
- [3、批量预测与结果保存](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/03-3_批量预测与结果保存.md)
- [4、关键词评分与结果分析](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/04-4_关键词评分与结果分析.md)
- [5、模型合并与导出](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/05-5_模型合并与导出.md)
- [6、vLLM 部署与接口调用（选做）](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/06-6_vLLM_部署与接口调用_选做.md)
