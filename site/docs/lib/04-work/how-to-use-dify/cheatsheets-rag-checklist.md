---
title: "Dify 知识库 RAG 调试清单"
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

# Dify 知识库 RAG 调试清单

## 文档质量

- 文档是否有清晰标题？
- 每段是否只表达一个主题？
- 是否混入过期内容？
- 是否有重复、矛盾、无意义页眉页脚？
- 是否包含表格、图片、扫描件等难以解析的内容？

## 知识库描述

好的知识库描述应该说明：

- 包含什么内容。
- 适合回答什么问题。
- 不包含什么内容。
- 适用对象和边界。

示例：

```text
本知识库包含 2026 年版产品帮助文档，覆盖账号注册、套餐价格、功能限制、发票、售后和常见故障。适合回答用户使用产品前后的操作问题。不包含公司内部策略、未来路线图、未公开折扣和人工客服个人承诺。
```

## 检索设置

- Top K 太低：可能漏掉关键段落。
- Top K 太高：可能引入噪声。
- Score Threshold 太高：可能什么都搜不到。
- Score Threshold 太低：可能召回不相关内容。
- Rerank 模型：适合提高最终排序质量，但会增加成本和延迟。

## Prompt 约束

必须明确：

- 只能根据知识库回答。
- 没有依据时说不知道。
- 不要编造价格、政策、承诺、日期。
- 必要时引用依据或说明来源。

## 测试问题

至少准备：

- 5 个资料内问题。
- 5 个资料外问题。
- 3 个模糊问题。
- 3 个容易诱导模型编造的问题。
- 3 个需要综合多个段落的问题。
