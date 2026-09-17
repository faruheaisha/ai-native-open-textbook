---
title: "多门店预约系统表结构预览"
sourceId: "04-work/awesome-workbuddy"
sourceTitle: "办公 Agent 生态清单（awesome-workbuddy）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/staruhub/awesome-workbuddy"
entryUrl: "https://github.com/staruhub/awesome-workbuddy/blob/e32b6c953154e41f6cb4e6b69fd7d933f5cef3d3/prompts/runs/prompt-078-chatgpt-5-6-sol-20260731/output.md"
sourceRel: "prompts/runs/prompt-078-chatgpt-5-6-sol-20260731/output.md"
rawUrl: "/raw/04-work/awesome-workbuddy/prompts/runs/prompt-078-chatgpt-5-6-sol-20260731/output.md"
sourceSha256: "a1e1529ebe58d6fda7c5128d486330efc401e3fea4716e0ad732657c2c999ad0"
pageSha256: "a1e1529ebe58d6fda7c5128d486330efc401e3fea4716e0ad732657c2c999ad0"
contentMode: "local-full"
zh: ""
---

# 多门店预约系统表结构预览

合成量级：200家门店、日活5万、热门时段峰值每秒300次抢号。

~~~mermaid
erDiagram
  STORE ||--o{ SERVICE : offers
  STORE ||--o{ SLOT : owns
  USER ||--o{ APPOINTMENT : books
  SERVICE ||--o{ APPOINTMENT : selected
  SLOT ||--o{ APPOINTMENT : reserves
~~~

## 核心建表摘录

~~~sql
CREATE TABLE appointment (
  id BIGINT UNSIGNED PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  slot_id BIGINT UNSIGNED NOT NULL,
  service_id BIGINT UNSIGNED NOT NULL,
  status VARCHAR(20) NOT NULL,
  idempotency_key VARCHAR(64) NOT NULL,
  created_at DATETIME(3) NOT NULL,
  UNIQUE KEY uk_user_slot (user_id, slot_id),
  UNIQUE KEY uk_idempotency (idempotency_key),
  KEY idx_slot_status (slot_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
~~~

设计决定：slot独立存容量与版本号；appointment保留取消记录而非物理删除；价格快照写预约，避免服务改价影响历史。

## 并发

- 抢号：条件更新 available_count>0，affected_rows=1才成功；
- 重复提交：客户端幂等键+唯一索引；
- 超卖：数据库事务为最终门禁，缓存只做削峰；
- 支付超时：预约进入pending并设过期任务释放名额。

正式SQL还需读取需求、确认取消政策、分库需求和数据保留期。本预览不应直接部署生产。
