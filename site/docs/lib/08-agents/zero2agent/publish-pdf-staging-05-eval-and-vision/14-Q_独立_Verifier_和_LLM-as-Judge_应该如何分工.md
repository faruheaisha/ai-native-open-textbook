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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/05-eval-and-vision.md"
sourceRel: "publish-pdf/staging/05-eval-and-vision.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/05-eval-and-vision.md"
sourceSha256: "522251cd44ac5841f540eaf4da4f60a49782ca1736e0ab863498790f1cfd6e8e"
pageSha256: "dfdc3932a11038cdcf7a04b3c12eb576438b98691af81d59fcbd36a5b8de0eb0"
contentMode: "local-full"
zh: ""
---

## Q：独立 Verifier 和 LLM-as-Judge 应该如何分工？

> 来源：阿里千问 C 端算法实习一面（2026-08-10）

**新手答**：“规则能判断的用 Verifier，主观内容用大模型评分。”

**高手答**：确定性 Verifier 负责 schema、单元测试、数据库终态、权限和业务不变量；LLM Judge 只处理难以程序化的语义质量，并使用固定 Rubric、盲化顺序和人工校准。高风险结论必须以确定性证据为门禁，Judge 不能覆盖失败的硬校验。两者结果分别记录，出现分歧时定位是规则覆盖不足、Judge 偏差还是任务定义不清。

**差距在哪**：高手不会把 Judge 分数当事实，也不会要求规则理解所有语义。
