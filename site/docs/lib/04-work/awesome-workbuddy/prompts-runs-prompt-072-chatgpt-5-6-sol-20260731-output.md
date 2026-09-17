---
title: "feature/payment Code Review 预览"
sourceId: "04-work/awesome-workbuddy"
sourceTitle: "办公 Agent 生态清单（awesome-workbuddy）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/staruhub/awesome-workbuddy"
entryUrl: "https://github.com/staruhub/awesome-workbuddy/blob/e32b6c953154e41f6cb4e6b69fd7d933f5cef3d3/prompts/runs/prompt-072-chatgpt-5-6-sol-20260731/output.md"
sourceRel: "prompts/runs/prompt-072-chatgpt-5-6-sol-20260731/output.md"
rawUrl: "/raw/04-work/awesome-workbuddy/prompts/runs/prompt-072-chatgpt-5-6-sol-20260731/output.md"
sourceSha256: "91129e2d4a9207107e4f49fbd9faa0c12f0aa48c6fef7ce2ef305e5df58e44e5"
pageSha256: "91129e2d4a9207107e4f49fbd9faa0c12f0aa48c6fef7ce2ef305e5df58e44e5"
contentMode: "local-full"
zh: ""
---

# feature/payment Code Review 预览

结论：**不能合并。**合成diff有2个必须改、2个建议改，预计修复与补测试1.5人日。

## 必须改1｜SQL注入

~~~python
# 问题代码
row = db.execute(f"SELECT * FROM orders WHERE id='{order_id}'")

# 建议
row = db.execute(
    "SELECT * FROM orders WHERE id = :order_id",
    {"order_id": order_id},
)
~~~

order_id来自请求路径，即便通常是UUID，也不能依赖格式假设替代参数化。

## 必须改2｜并发重复扣款

当前先查 paid 再调用上游，两个请求可同时通过。建议以数据库唯一键锁定 idempotency_key，并把状态迁移做条件更新：

~~~sql
UPDATE payment
SET status = 'processing'
WHERE order_id = :id AND status = 'created';
~~~

只有 affected_rows=1 的请求可调用上游；其他请求读取现有结果。

## 建议改

- 密钥从源码移到密钥管理，立即轮换演示diff中的假密钥；
- 捕获 TimeoutError 时保留上游request_id，不能统一返回“支付失败”。

## 测试要求

并发10次只产生一笔上游调用；超时后重试返回同一结果；数据库提交失败不把订单标成已支付；日志不含卡号与密钥。

真实评审必须读取 diff.patch 和团队规范，逐处给真实行号。本预览不代表任何真实分支已被审核。
