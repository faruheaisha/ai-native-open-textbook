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
pageSha256: "e7ba0e569ccc43efc6babb0cbb0c082f555510d9e216d1f9aedb785357c9a4df"
contentMode: "local-full"
zh: ""
---

## Q：可演进能力为什么应封装为 Skill，而不是不断塞进 Prompt？Skill 的知识进化流水线如何治理？

> 来源：小红书 Agent 开发实习一面（2026-08-24）

**新手答**：“Prompt 太长会浪费 Token，Skill 可以按需加载，也方便复用和更新。”

**高手答**：

全局 Prompt 适合身份、不可变规则和通用行为；持续演进的领域能力具有触发条件、知识、步骤、工具、权限和验收标准，需要独立 owner、版本与评测。把它们都塞进 Prompt 会造成注意力竞争、规则冲突、缓存失效和全局回归，且无法回答“哪次变更导致哪个能力退化”。Skill 将变化隔离成可按需披露、独立测试和回滚的能力包，但低频事实仍应放 RAG，确定性操作仍应由代码/工具实现，不能把所有内容都包装成 Skill。

知识进化应是一条受控流水线：从成功与失败 trace、用户纠正和权威文档产生候选变更；先绑定来源、适用范围与时效，再做去重、冲突和权限分析；由模型起草 Skill diff，但通过正例、反例、边界、安全和全局路由回归后才进入评审。发布时绑定版本、依赖、评测报告和回滚目标，经过 shadow 与小流量灰度；线上监控路由准确率、任务成功率、Token、工具副作用和人工接管率。

反馈不能直接改生产文本。它先进入证据队列，达到样本量与置信门槛后形成提案；低使用、重叠或过期 Skill 走 deprecated、停止新路由、排空任务再退役。每个答案与动作保留 Skill 版本和证据谱系，才能审计知识从哪里来、何时生效、是否应撤回。

**差距在哪**：新手只看到 Token 节省，高手会按知识、行为和工具边界选择载体，并把 Skill 进化设计成有证据、评测、灰度、回滚和退役的发布系统。
