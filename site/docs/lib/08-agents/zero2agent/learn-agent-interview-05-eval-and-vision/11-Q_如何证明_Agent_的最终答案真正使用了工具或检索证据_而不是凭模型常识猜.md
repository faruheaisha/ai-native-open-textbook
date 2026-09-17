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
pageSha256: "84cb155f1965ca300019f86a611109e690d035ab3680d06d9261b316a01746ea"
contentMode: "local-full"
zh: ""
---

## Q：如何证明 Agent 的最终答案真正使用了工具或检索证据，而不是凭模型常识猜中？

> 来源：Momenta Agent 开发一面、阿里 Agent 开发一面（2026-08-17）

**新手答**：“检查它有没有调用工具，答案正确就算通过。”

**高手答**：

工具调用发生过，不代表模型使用了返回结果。评测样本必须同时包含问题、可用证据、预期引用和证据不足样本，并做三组对照：移除证据后答案应降低置信度或拒答；替换关键证据后结论应随之改变；加入语义相近但错误的干扰证据时，模型仍应选择正确来源。

线上记录 `claim -> evidence_id` 映射，分别统计引用准确率、证据覆盖率、无依据断言率和证据不足时的拒答率。高风险结论再由确定性校验器核对关键字段。只比较最终答案会把“碰巧猜对”和“基于证据推导正确”混在一起。

**差距在哪**：新手只验证结果和调用轨迹，高手用反事实对照验证因果依赖，并把每个结论绑定到可审计证据。面试官考的是评测是否能识别“看过证据但没用证据”的假成功。
