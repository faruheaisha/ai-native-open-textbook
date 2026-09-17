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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/05-eval-and-vision/index.md"
sourceRel: "learn-agent-interview/05-eval-and-vision/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/05-eval-and-vision/index.md"
sourceSha256: "17c863430bb6ecbc29d9475eb7480d07c54a45774e643f928d23fd755ef5d444"
pageSha256: "3ec04cb73053280b22ce19467cb59b56183915835feba8bfc5b8b180706ee51d"
contentMode: "local-full"
zh: ""
---

## Q：独立 Verifier 和 LLM-as-Judge 应该如何分工？

> 来源：阿里千问 C 端算法实习一面（2026-08-10） / [字节中国交易与广告 AI 全栈二面](https://www.nowcoder.com/feed/main/detail/0f77410f8b1b4daca879d5ff99c7ae07)

**新手答**：“规则能判断的用 Verifier，主观内容用大模型评分。”

**高手答**：确定性 Verifier 负责 schema、单元测试、数据库终态、权限和业务不变量；LLM Judge 只处理难以程序化的语义质量，并使用固定 Rubric、盲化顺序和人工校准。高风险结论必须以确定性证据为门禁，Judge 不能覆盖失败的硬校验。两者结果分别记录，出现分歧时定位是规则覆盖不足、Judge 偏差还是任务定义不清。

语音转录等复核任务还要让 Reviewer 输出结构化结果：问题类型、证据时间片或文本 span、建议修订和置信度。格式、敏感词、时间戳连续性等先由规则校验，模型只判断语义遗漏或错配；生成模型与 Reviewer 尽量不要共享同一 Prompt/上下文偏差，分歧样本进入人工抽检并保留可追溯修订链。

**差距在哪**：高手不会把 Judge 分数当事实，也不会要求规则理解所有语义。
