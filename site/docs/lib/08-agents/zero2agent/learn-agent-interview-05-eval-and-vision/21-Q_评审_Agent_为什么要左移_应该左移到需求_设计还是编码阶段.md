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
pageSha256: "48dad0b58a6a5507c539cf21608c481f55a0e69097aeb5f9a3c66b066d0b3556"
contentMode: "local-full"
zh: ""
---

## Q：评审 Agent 为什么要左移？应该左移到需求、设计还是编码阶段？

> 来源：字节社招一面（2026-08-23）

**新手答**：“越早发现问题成本越低，所以需求阶段就开始评审。”

**高手答**：不同风险放在不同阶段：需求阶段检查目标、边界和验收；设计阶段检查依赖、权限和回滚；编码阶段检查实现、测试和变更影响。左移不能让概率模型阻塞所有需求，低置信度建议只提示，高风险硬规则才门禁。每阶段使用独立证据和责任人，并通过缺陷逃逸率、误报率和交付周期判断左移是否过度。

**差距在哪**：新手只说“更早”，高手按缺陷类型和证据成熟度设计分层门禁。
