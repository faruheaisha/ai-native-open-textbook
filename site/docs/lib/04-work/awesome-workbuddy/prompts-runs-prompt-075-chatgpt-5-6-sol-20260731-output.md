---
title: "对外 API 文档预览"
sourceId: "04-work/awesome-workbuddy"
sourceTitle: "办公 Agent 生态清单（awesome-workbuddy）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/staruhub/awesome-workbuddy"
entryUrl: "https://github.com/staruhub/awesome-workbuddy/blob/e32b6c953154e41f6cb4e6b69fd7d933f5cef3d3/prompts/runs/prompt-075-chatgpt-5-6-sol-20260731/output.md"
sourceRel: "prompts/runs/prompt-075-chatgpt-5-6-sol-20260731/output.md"
rawUrl: "/raw/04-work/awesome-workbuddy/prompts/runs/prompt-075-chatgpt-5-6-sol-20260731/output.md"
sourceSha256: "d0321b623067ed0b61ed3301428ac432684bd5a8eb96e43a4a68959e522df699"
pageSha256: "d0321b623067ed0b61ed3301428ac432684bd5a8eb96e43a4a68959e522df699"
contentMode: "local-full"
zh: ""
---

# 对外 API 文档预览

## 鉴权

所有请求使用 Bearer Token；Token只放Authorization头，不写URL。示例：

~~~bash
curl -X POST https://api.example.test/v1/orders   -H "Authorization: Bearer $API_TOKEN"   -H "Idempotency-Key: demo-001"   -H "Content-Type: application/json"   -d '{"customer_id":"cus_123","amount":19900,"currency":"CNY"}'
~~~

## 创建订单

**POST /v1/orders**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| customer_id | string | 是 | 客户ID |
| amount | integer | 是 | 最小货币单位，必须>0 |
| currency | string | 是 | ISO货币代码 |

成功响应：

~~~json
{"id":"ord_123","status":"created","amount":19900,"currency":"CNY"}
~~~

| HTTP | error_code | 含义 | 建议 |
|---:|---|---|---|
| 400 | invalid_amount | 金额非法 | 修正请求 |
| 401 | unauthorized | Token无效 | 刷新凭证 |
| 409 | idempotency_conflict | 幂等键对应不同参数 | 换键前核订单 |
| 429 | rate_limited | 超过限流 | 按Retry-After重试 |

分页使用cursor，不以页码保证稳定；5xx采用指数退避，写操作必须复用幂等键。真实文档必须读取 api/ 路由并让每个示例在测试环境实际跑通，本预览URL和字段均为合成。
