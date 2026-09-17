---
title: "29 - 微调数据准备与对话模板"
sourceId: "08-agents/ai-agents-from-zero"
sourceTitle: "从零构建 AI Agent（didilili）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/didilili/ai-agents-from-zero"
entryUrl: "https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/29-微调数据准备与对话模板.md"
sourceRel: "29-微调数据准备与对话模板.md"
rawUrl: "/raw/08-agents/ai-agents-from-zero/29-微调数据准备与对话模板.md"
sourceSha256: "b9a4d379b02b8a6f9a7c37fc1c60265008f90b21add269ed6804648cafe5e934"
pageSha256: "05506ad5e6cc3153ff9c970b306c057415a66d6635ba7c9826677bd85b453b9f"
contentMode: "local-full"
zh: ""
---

# 29 - 微调数据准备与对话模板

---

**本章课程目标：**

- 能分清 JSONL 的文件组织方式与 Alpaca、ShareGPT 的样本结构，找到任务、输入和参考答案。
- 能对照原文审核答案，处理格式、重复与标注分歧，并判断数据还缺少哪些场景。
- 能说明训练集、验证集和测试集的用途，完成清洗与固定划分，检查数据泄漏和处理报告。
- 能解释字段映射、对话模板和分词器各自的职责，分清训练与推理时提供的内容。
- 能整理后续训练所需的数据与配套记录，并说明自动检查和人工审核各完成了什么。

**学习建议：** 先按第 1～3 节用一条图书馆样本认清任务、文章和答案，审核内容并比较两种数据结构；再到第 5 节清洗、划分数据，最后理解第 6 节的输入转换。第 3.3 节工具调用与第 4 节文档问答为选读，按需要练习；第 6 节代码等第 31 章环境准备好后再运行。章末先独立作答，再逐题核对参考思路。

---

## 本篇目录

- [1、认识微调数据](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/01-1_认识微调数据.md)
- [2、数据来源与质量要求](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/02-2_数据来源与质量要求.md)
- [3、常见微调数据格式](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/03-3_常见微调数据格式.md)
- [4、用 Easy Dataset 制作问答数据](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/04-4_用_Easy_Dataset_制作问答数据.md)
- [5、关键词数据清洗与划分](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/05-5_关键词数据清洗与划分.md)
- [6、对话模板与模型输入](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/06-6_对话模板与模型输入.md)
