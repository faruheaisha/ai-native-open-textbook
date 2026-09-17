---
title: "09 调试和评估"
sourceId: "04-work/how-to-use-dify"
sourceTitle: "Dify 中文系统教程（How-to-use-dify）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/hijasonxu1/How-to-use-dify"
entryUrl: "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/docs/chapters/09-调试和评估.md"
sourceRel: "docs/chapters/09-调试和评估.md"
rawUrl: "/raw/04-work/how-to-use-dify/docs/chapters/09-调试和评估.md"
sourceSha256: "c77aa9c356c6ef402c29f96f0d8ab810d3bf23c2c9daace49d6b3dd8dc8277ee"
pageSha256: "c77aa9c356c6ef402c29f96f0d8ab810d3bf23c2c9daace49d6b3dd8dc8277ee"
contentMode: "local-full"
zh: ""
---

# 09 调试和评估

## 学习目标

你将学会用测试问题、节点输出和对比记录来提高 Dify 应用质量。

## 为什么要调试

AI 应用不是“能回答一次”就算完成。你需要确认：

- 常见问题能答对。
- 资料外问题不会乱编。
- 输入异常时有合理提示。
- 输出格式稳定。
- 成本和延迟可接受。

## 测试集

每个应用至少准备：

- 10 个正常问题。
- 5 个边界问题。
- 5 个资料外问题。
- 3 个恶意或诱导问题。
- 3 个格式要求问题。

## 记录表

| 编号 | 输入 | 预期 | 实际 | 问题 | 调整 |
| --- | --- | --- | --- | --- | --- |
| 001 | 如何退款？ | 根据政策回答 | 答对 | 无 | 保持 |
| 002 | 内部折扣是多少？ | 拒答 | 编造 | 边界弱 | 强化 Prompt |

## 调试顺序

1. 先看输入是否正确。
2. 再看检索是否正确。
3. 再看 Prompt 是否明确。
4. 再看模型是否适合。
5. 最后再调参数。

不要一开始就换模型。很多问题来自文档、变量和 Prompt。

## 多模型对比

官方文档提到，可以在预览中对多个模型进行 Debug，对比不同模型输出。对 Agent 来说，官方建议选择推理能力强、原生支持工具调用的模型。

对比时记录：

- 准确性。
- 格式稳定性。
- 拒答能力。
- 延迟。
- 成本。

## 评估标准

| 指标 | 合格标准 |
| --- | --- |
| 准确性 | 资料内问题大多数正确 |
| 忠实度 | 不编造资料外内容 |
| 稳定性 | 相同问题多次回答差异不大 |
| 可用性 | 用户看得懂下一步 |
| 成本 | 单次调用成本可接受 |
| 延迟 | 用户等待时间可接受 |

## 常见错误

- 只测试自己知道答案的问题。
- 不测试资料外问题。
- 不记录调整过程。
- 每次同时改 Prompt、参数、知识库，无法定位原因。
- 把模型偶然答对当成稳定可用。
