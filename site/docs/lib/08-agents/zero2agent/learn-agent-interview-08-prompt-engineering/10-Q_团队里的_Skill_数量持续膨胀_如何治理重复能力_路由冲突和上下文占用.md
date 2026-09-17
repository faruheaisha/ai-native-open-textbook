---
title: "Zero2Agent：从零实现 Agent"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/08-prompt-engineering/index.md"
sourceRel: "learn-agent-interview/08-prompt-engineering/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/08-prompt-engineering/index.md"
sourceSha256: "d742947505870bddb5c387683d51215ba6095898b0fc5efb77e32ec65ffd84c1"
pageSha256: "c5574a1b19faa5bb236f617147df34053ee7b4b0e3a3b74466a932fb2ee16ed3"
contentMode: "local-full"
zh: ""
---

## Q：团队里的 Skill 数量持续膨胀，如何治理重复能力、路由冲突和上下文占用？

> 来源：[电商 Agent 三面](https://www.nowcoder.com/feed/main/detail/b6b453976c2d4e43a872054d695c2fe2)【电商库存二面（2026-08-17）】

**新手答**：“把 Skill 描述写清楚，太多就合并。”

**高手答**：

先建立带 owner、版本、输入输出 schema、权限、SLO、依赖和生命周期状态的 Skill 注册表。新增 Skill 必须先检索已有能力并通过重复度、路由混淆和增量收益评测；相近能力优先合并公共内核，用参数或场景适配层区分，而不是复制 Prompt。

运行时采用分层披露：先按租户、领域和任务类型召回少量候选，再精排并只注入当前步骤需要的描述。持续监控 Top-1 路由准确率、候选重叠率、无调用率、Token 占用和失败回退；低价值 Skill 先标记 deprecated、停止新路由、排空在途任务，再删除。每次变更都要版本化、灰度并可回滚。

**差距在哪**：新手只优化一段描述，高手把 Skill 当作需要准入、发现、评测、发布和退役的能力资产。面试官考的是团队规模扩大后能否避免能力目录失控。
