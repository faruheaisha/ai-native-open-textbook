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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/01-architecture-design/index.md"
sourceRel: "learn-agent-interview/01-architecture-design/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/01-architecture-design/index.md"
sourceSha256: "27323a2663d0a83175728db159268a6a57cdca2097344c6d6c8c0210cc6da232"
pageSha256: "bf6b4025e79564fa0b77a6e5c47a92106e3af3c02c013e24fea6bef513b0267e"
contentMode: "local-full"
zh: ""
---

## Q：Skill 和 Workflow 的区别是什么？什么场景该用 Skill 而不是 Workflow？

> 来源：快手AI应用开发一面 【[快手 AI 全栈一面](https://www.nowcoder.com/feed/main/detail/a30242712e8d456c839ff4223470f491)同题】

**新手答**：“Skill 就是一个功能模块，Workflow 是流程编排，两个差不多吧。”

**高手答**：

Workflow 是面向**业务流程**的编排，适合步骤稳定、分支明确、有审批和状态流转的任务，比如“提交理赔申请 → 校验材料 → 人工审核 → 打款”。它强调的是顺序、状态、重试和完整性。

Skill 是面向**能力复用**的封装，适合被不同 Agent、不同流程按需调用。它有明确的输入输出契约，强调可组合、可编排。

```mermaid
graph TB
    subgraph Workflow["Workflow（面向流程）"]
        W1[提交申请] --> W2[校验材料]
        W2 --> W3[人工审核]
        W3 --> W4[打款]
    end
    subgraph Skill["Skill（面向能力）"]
        S1[药品目录匹配]
        S2[解析发票]
        S3[生成拒赔解释]
    end
    W2 -.->|调用| S1
    W2 -.->|调用| S2
    W3 -.->|调用| S3
```

关键判断标准：

| 维度 | Workflow | Skill |
|------|----------|-------|
| 目的 | 完成端到端业务流程 | 完成一个稳定业务能力 |
| 复用 | 流程间很难复用 | 跨流程、跨 Agent 复用 |
| 接口 | 状态机 + 审批点 | 稳定 Input/Output Schema |
| 典型例 | 理赔审核全流程 | 药品目录匹配能力 |

以理赔场景为例：门诊理赔、住院理赔、药品理赔三条 Workflow 都需要“药品目录匹配”能力。如果做成 Workflow 节点，三条流程各复制一份，改一处要改三处。做成 Skill 后只维护一份，任何流程按需调用。

Skill 的定义更像一个稳定接口：

```json
{
  "skillName": "medical_catalog_match",
  "input": {
    "drugName": "string",
    "diagnosisCode": "string"
  },
  "output": {
    "covered": "boolean",
    "matchedRuleId": "string",
    "reason": "string"
  }
}
```

**差距在哪**：新手分不清 Skill 和 Workflow，混为一谈或者觉得 Skill 只是小功能。高手能清晰说出两者的设计目标不同——Workflow 关注流程完整性和状态流转，Skill 关注能力复用和可组合性。面试官考的是你对**系统解耦和能力沉淀**的理解：什么时候该固化流程，什么时候该抽取通用能力。
