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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/08-prompt-engineering.md"
sourceRel: "publish-pdf/staging/08-prompt-engineering.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/08-prompt-engineering.md"
sourceSha256: "d712b57348415001dc95647a70207bec02aaff7ce2fa002468a87ac72874651a"
pageSha256: "ed4f8235c44dada115c056e59e08d8707c1fa99266cce1ea850269a642d69dec"
contentMode: "local-full"
zh: ""
---

## Q：如何让 Agent 自动沉淀 Skill，同时保证生成的 Skill 准确、无害且不会无限膨胀？

> 来源：电商库存二面（2026-08-17）

**新手答**：“任务成功后让模型总结成 Skill，人工审核后保存。”

**高手答**：

候选 Skill 只能从可验证的成功轨迹产生，并同时保存适用条件、输入输出 schema、依赖工具、权限、反例和来源。生成后先做重复能力检索，再在隔离环境运行正例、边界、对抗和权限测试；涉及写操作、外部网络或凭据的候选必须人工审批。没有稳定增量收益的候选只保留为经验记录，不进入自动路由目录。

发布时绑定版本、owner、评测报告和回滚目标，小流量观察路由准确率、任务成功率、误触发和副作用。后续按使用率、失败率和能力重叠度合并或退役。模型可以提出和改写候选，但不能自行扩大工具权限、覆盖稳定版本或删除审计来源。

**差距在哪**：新手只有“总结 + 审核”，高手补齐候选准入、去重、安全测试、灰度和退役闭环。面试官考的是自进化能否被证据和权限约束。
