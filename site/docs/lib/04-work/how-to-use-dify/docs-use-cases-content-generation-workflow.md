---
title: "案例：内容生成工作流"
sourceId: "04-work/how-to-use-dify"
sourceTitle: "Dify 中文系统教程（How-to-use-dify）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/hijasonxu1/How-to-use-dify"
entryUrl: "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/README.md"
zh: ""
---

# 案例：内容生成工作流

## 目标

把一段原始信息改写成适合指定平台的内容。

## 推荐类型

Workflow。

原因：

- 输入一次，输出一次。
- 步骤固定。
- 适合批量生成。

## 输入

| 字段 | 类型 | 示例 |
| --- | --- | --- |
| raw_text | 段落 | 产品上线说明 |
| platform | 选择 | 小红书、公众号、Twitter |
| tone | 选择 | 专业、轻松、销售、科普 |
| length | 数字 | 300 |

## 流程

1. 分析原文重点。
2. 根据平台生成初稿。
3. 检查是否符合平台风格。
4. 输出标题、正文、标签和修改说明。

## 输出格式

```text
标题：

正文：

标签：

修改说明：
```

## 常见错误

- Prompt 没有限制平台风格。
- 输出没有固定结构。
- 让一个节点同时分析、生成、审核。
- 没有测试不同输入长度。
