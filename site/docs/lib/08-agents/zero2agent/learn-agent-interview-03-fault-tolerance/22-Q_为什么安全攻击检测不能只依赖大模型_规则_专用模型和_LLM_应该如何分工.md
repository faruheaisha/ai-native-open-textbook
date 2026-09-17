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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/03-fault-tolerance/index.md"
sourceRel: "learn-agent-interview/03-fault-tolerance/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/03-fault-tolerance/index.md"
sourceSha256: "ec931d48d76195508909df9d726fa4662052593581a0a4b80cae3e9b5dc97699"
pageSha256: "a6d075eadb68810d29ea3ac338a65b5d18fe30abeef87c5dcf0e49741ef2745a"
contentMode: "local-full"
zh: ""
---

## Q：为什么安全攻击检测不能只依赖大模型？规则、专用模型和 LLM 应该如何分工？

> 来源：[字节中国交易与广告 Agent 一面](https://www.nowcoder.com/feed/main/detail/6dede073825e4ab493fcbce7f598a6c8)（2026-08-24）

**新手答**：“大模型有幻觉、速度慢，所以攻击检测应该使用规则。”

**高手答**：

安全检测首先是确定性执行边界，而不是开放式问答。已知攻击特征、协议合法性、权限、路径和参数约束由 WAF、签名、Schema、allowlist 和速率限制硬拦；统计或专用分类模型负责异常流量、变体和行为序列；LLM 更适合解释告警、关联上下文、生成调查摘要和辅助规则运营，不能单独决定是否放行高风险请求。

只用 LLM 有四个风险：输出非确定且难以证明无漏报；Prompt Injection 可能反向操纵检测器；延迟和成本难以承受高 QPS；模型升级会让安全边界漂移。即便使用 LLM 判别，也要输入最小化、固定结构化输出、隔离不可信内容，并在模型不可用时 fail closed 或回退到确定性策略。

评测按攻击类型、混淆变体、正常高相似流量和对抗样本分层，关注漏报率、误报率、检测延迟、吞吐和规则覆盖。新模型先 shadow，只生成旁路判定，与现有规则和人工结论比较；证明增量价值后才逐步参与低风险处置，关键阻断仍保留可审计的确定性依据。

**差距在哪**：新手在“规则或大模型”之间二选一，高手按确定性、泛化、解释和处置风险分层，并把 LLM 放在不能绕过硬边界的位置。
