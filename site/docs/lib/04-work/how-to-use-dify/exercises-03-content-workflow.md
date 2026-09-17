---
title: "练习 03：内容改写 Workflow"
sourceId: "04-work/how-to-use-dify"
sourceTitle: "Dify 中文系统教程（How-to-use-dify）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/hijasonxu1/How-to-use-dify"
entryUrl: "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/exercises/03-content-workflow.md"
sourceRel: "exercises/03-content-workflow.md"
rawUrl: "/raw/04-work/how-to-use-dify/exercises/03-content-workflow.md"
sourceSha256: "288a40d34797c70de4baab979401ed653846703337c46d7b220b2a37869f15e2"
pageSha256: "288a40d34797c70de4baab979401ed653846703337c46d7b220b2a37869f15e2"
contentMode: "local-full"
zh: ""
---

# 练习 03：内容改写 Workflow

## 目标

创建一个把原文改写成指定平台风格的 Workflow。

## 输入变量

- raw_text：原文。
- platform：目标平台。
- tone：语气。
- length：目标字数。

## 节点

1. 分析原文重点。
2. 生成改写版本。
3. 检查平台风格。
4. 输出标题、正文、标签。

## 测试

至少测试：

- 短文本。
- 长文本。
- 信息不足文本。
- 不同平台。
- 不同语气。

## 验收标准

- 输出结构稳定。
- 不丢失原文关键信息。
- 风格符合目标平台。
- 信息不足时提醒用户补充。
