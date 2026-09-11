---
title: "案例：内部运营助手"
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

# 案例：内部运营助手

## 目标

做一个可以查询制度、生成摘要、必要时创建工单的内部助手。

## 推荐类型

Agent 或 Chatflow + 工具。

如果任务主要是问答，用 Chatflow。  
如果任务需要根据问题决定调用不同工具，可以用 Agent。

## 工具设计

| 工具 | 用途 | 限制 |
| --- | --- | --- |
| search_policy | 查询公司制度 | 只读 |
| create_ticket | 创建工单 | 创建前必须确认 |
| query_status | 查询工单状态 | 需要工单号 |

## Agent 规则

```text
你是内部运营助手。

规则：
1. 涉及制度问题时，先调用 search_policy。
2. 创建工单前，必须让用户确认标题、描述、紧急程度。
3. 如果信息不足，请追问。
4. 不要代表管理者做最终审批。
5. 不要泄露无关内部信息。
```

## 风险

- 工具权限过大。
- 没有确认就提交工单。
- 对制度做过度解释。
- 混用公开资料和内部资料。

## 验收标准

- 工具调用有明确理由。
- 创建类操作前有确认。
- 资料不足时不编造。
- 日志可追踪。
