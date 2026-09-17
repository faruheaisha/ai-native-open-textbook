---
title: "案例：客服知识库机器人"
sourceId: "04-work/how-to-use-dify"
sourceTitle: "Dify 中文系统教程（How-to-use-dify）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/hijasonxu1/How-to-use-dify"
entryUrl: "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/docs/use-cases/customer-service-rag.md"
sourceRel: "docs/use-cases/customer-service-rag.md"
rawUrl: "/raw/04-work/how-to-use-dify/docs/use-cases/customer-service-rag.md"
sourceSha256: "f8f13158c0cc80b3ae260951074e9a6cc625989d0eb147d05f50fc9bb17dc1cc"
pageSha256: "f8f13158c0cc80b3ae260951074e9a6cc625989d0eb147d05f50fc9bb17dc1cc"
contentMode: "local-full"
zh: ""
---

# 案例：客服知识库机器人

## 目标

做一个可以回答公开产品问题的客服助手。

## 适合场景

- 产品功能咨询。
- 价格和套餐说明。
- 注册、登录、发票、退款流程。
- 常见故障排查。

## 不适合场景

- 投诉最终裁决。
- 法律承诺。
- 未公开优惠。
- 需要访问用户隐私数据的问题。

## 推荐类型

Chatflow。

原因：

- 客服场景通常需要多轮对话。
- 用户问题经常不完整。
- 需要知识库回答。
- 信息不足时需要追问。

## 基础流程

1. Start：接收用户问题。
2. LLM：判断意图和是否需要澄清。
3. IF/ELSE：信息不足时先追问。
4. Knowledge Retrieval：检索客服知识库。
5. LLM：基于资料生成回答。
6. Answer：返回答案。

## Prompt 核心规则

```text
你是客服知识库助手。

规则：
1. 只根据知识库内容回答。
2. 如果资料中没有明确答案，请回答“根据当前资料无法确认”。
3. 不承诺退款、赔偿、折扣或人工处理结果。
4. 如果用户问题缺少关键信息，请先追问。
5. 必要时建议联系人工客服。
```

## 测试问题

- 如何申请退款？
- 发票在哪里下载？
- 你们有没有隐藏折扣？
- 我的账号被封了，你能解封吗？
- 登录失败应该怎么办？

## 验收标准

- 资料内问题回答准确。
- 资料外问题不会编造。
- 敏感问题会转人工。
- 回答简短清楚。
