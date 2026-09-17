---
title: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-3/core-skills/agent-teams/index.md"
sourceRel: "docs/zh-cn/stage-3/core-skills/agent-teams/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/zh-cn/stage-3/core-skills/agent-teams/index.md"
sourceSha256: "16b04e2e2af06d66f37900dfc58ad2842159173876171d4d6c99ca4660423bef"
pageSha256: "119370bca0087330fc0717ac95a3ce9895bf4771e5249339633a44c1777b70fb"
contentMode: "local-full"
zh: ""
---

## Agent Teams vs Subagent

在深入 Agent Teams 的架构之前，有必要先澄清一个常见的混淆：**Agent Teams 和 Subagent 有什么区别**？

这两种功能都涉及"多个 AI 协同工作"，但它们的协作模式完全不同，适用于不同的场景。

### 核心区别对比

| 对比维度 | Subagent（子代理） | Agent Teams（团队代理） |
|---------|-------------------|----------------------|
| **拓扑结构** | 星型拓扑——所有子代理向主代理汇报 | 网状拓扑——成员可以互相通信 |
| **通信方式** | 主代理通过 prompt 显式传入信息，子代理完成后返回结果 | 成员之间可以直接通信、讨论和协调 |
| **上下文管理** | 每个子代理都有独立上下文，主代理只传入必要信息 | 每个成员拥有完全独立的上下文 |
| **并行能力** | 可以并行执行，但协作链路仍以主代理为中心 | 真正的并行开发与协作 |
| **任务协调** | 由主代理统一派发和协调 | 成员可以自主认领任务 |
| **成本** | 不低。多个子代理并行时，token 消耗会叠加 | 较高。成员独立运行且通信更频繁 |

### 形象比喻

**Subagent 就像**：一个经理给几个助理分别写任务单。每个助理拿着自己的任务单独立工作，完成后只把结果返回给经理。助理之间不直接交流，经理也看不到助理处理任务时的完整思考过程。

```
你 → 主代理 → 子代理 A："去分析这个文件"
你 → 主代理 → 子代理 B："去搜索那个函数"
         ↓
    子代理 A 完成 → 向主代理汇报结果
    子代理 B 完成 → 向主代理汇报结果
         ↓
    主代理综合结果 → 向你汇报
```

**Agent Teams 就像**：一个项目经理带领一个真正的开发团队。团队成员之间可以直接沟通、讨论、协作，不是所有事情都要通过项目经理中转。

```
你 → Team Lead："做用户认证功能"
         ↓
    Team Lead 创建团队，分配任务
         ↓
    Teammate A："@Teammate B，API 接口设计好了吗？"
    Teammate B："设计好了，格式是这样的..."
    Teammate C："我看了接口，有个问题需要讨论一下..."
         ↓
    团队成员协作完成 → Team Lead 综合结果 → 向你汇报
```

### 什么时候用哪个

**使用 Subagent 的场景**：

- 快速、明确的单一任务（如"搜索这个错误代码"）
- 任务之间没有太多依赖关系
- 需要并行处理，但不需要成员之间持续讨论

**使用 Agent Teams 的场景**：

- 复杂的系统重构，涉及多个模块
- 需要多角度分析和讨论（如安全专家和性能专家辩论方案）
- 需要真正的并行开发（前端、后端、测试同时进行）
- 任务之间需要频繁协调和信息共享

### 简单总结

- **Subagent**：任务分发工具，把大任务拆成小任务，派发给不同的"工人"完成
- **Agent Teams**：真正的协作团队，成员之间可以像真实团队一样交流、讨论、协同工作
