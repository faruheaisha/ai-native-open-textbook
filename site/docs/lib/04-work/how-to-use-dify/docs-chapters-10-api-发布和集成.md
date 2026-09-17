---
title: "10 API 发布和集成"
sourceId: "04-work/how-to-use-dify"
sourceTitle: "Dify 中文系统教程（How-to-use-dify）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/hijasonxu1/How-to-use-dify"
entryUrl: "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/docs/chapters/10-api-发布和集成.md"
sourceRel: "docs/chapters/10-api-发布和集成.md"
rawUrl: "/raw/04-work/how-to-use-dify/docs/chapters/10-api-发布和集成.md"
sourceSha256: "11575b83941f7e19ceccf67125d9944713f678c1adc1010e0d4007b5ad222c53"
pageSha256: "11575b83941f7e19ceccf67125d9944713f678c1adc1010e0d4007b5ad222c53"
contentMode: "local-full"
zh: ""
---

# 10 API 发布和集成

## 学习目标

你将理解如何把 Dify 应用从 Demo 发布成可被系统调用的能力。

## 发布方式

Dify 应用通常可以通过以下方式被使用：

- Web App：用户直接打开页面使用。
- API：由网站、系统、脚本或自动化平台调用。
- 嵌入：接入现有产品页面。
- Workflow as Tool：被其他 Dify 应用复用。
- MCP Server：特定 Workflow 可作为 MCP Server 暴露。

实际可用方式取决于应用类型和 Dify 版本，请以官方界面为准。

## API 集成前要确认

- 应用是否已经发布。
- API Key 是否只给可信系统使用。
- 输入参数是否稳定。
- 输出格式是否稳定。
- 是否需要流式输出。
- 是否需要记录 user_id。
- 是否有调用频率和成本限制。

## 输入设计

不要让 API 接收一大段混乱文本。尽量拆成字段：

```json
{
  "query": "如何申请退款？",
  "user_type": "paid_customer",
  "language": "zh-CN"
}
```

这样比只有一个 `text` 字段更容易做分支和统计。

## 输出设计

如果要给前端展示，可以输出自然语言。

如果要给系统继续处理，应输出结构化结果：

```json
{
  "answer": "你可以在订单页面申请退款。",
  "confidence": "high",
  "need_human": false,
  "category": "refund"
}
```

## 安全原则

- 不要把 API Key 写进前端代码。
- 不要把内部密钥放进 Prompt。
- 不要允许用户直接控制危险工具参数。
- 不要把敏感知识库暴露给不可信用户。
- 记录调用日志，但避免记录敏感个人信息。

## 上线流程

1. 本地测试应用。
2. 准备测试集。
3. 发布测试版本。
4. 用真实 API 调用测试。
5. 接入灰度用户。
6. 观察日志和反馈。
7. 再扩大使用范围。

## 常见错误

- Demo 没测完就接入生产。
- 前端直接暴露 API Key。
- 输出格式不稳定，导致下游解析失败。
- 忽略错误状态和超时。
- 没有成本控制。
