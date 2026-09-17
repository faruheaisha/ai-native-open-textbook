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
pageSha256: "0052534f656b1c524a2935c7007e09a00c15314c8e31d88973a53212603fbaad"
contentMode: "local-full"
zh: ""
---

## Q：Skill 分层体系怎么设计？为什么这么分层？

> 来源：字节跳动 Agent 二面（Coding Agent）

**新手答**：“按功能分类，比如代码生成一类、文档处理一类。”

**高手答**：

Skill 分层不是简单的“功能分类”，而是一个**按抽象层级递进的知识架构**——不同层级的 Skill 服务于不同阶段的 Agent 决策。

**三层 Skill 体系设计**：

**各层的职责和设计原则**：

| 层级 | 职责 | 触发方式 | 生命周期 | 示例 |
|------|------|---------|---------|------|
| **基础层** | 通用行为约束，适用于所有任务 | 始终加载（Session 级） | 整个会话有效 | 输出格式、错误处理、安全红线 |
| **能力层** | 通用能力模式，跨领域复用 | 按任务类型自动加载 | 任务执行期间有效 | 文件操作规范、搜索策略、测试方法 |
| **领域层** | 特定领域的专业知识和流程 | 意图匹配或显式触发 | 单次任务有效 | 代码审查标准、文档写作规范 |

**为什么要分层？——解决三个工程问题**：

**1. 上下文预算管理**

所有 Skill 同时加载会撑爆上下文窗口。分层后：
- 基础层常驻（约 500 token），成本固定
- 能力层按需加载（约 1000 token），只在需要时注入
- 领域层精确触发（约 2000 token），匹配到才加载

总注入量从“全部 Skill × N”降低到“基础 + 1-2 个能力 + 1 个领域”。

**2. 优先级与冲突解决**

不同 Skill 的指令可能冲突。分层提供了天然的优先级：

```text
冲突示例：
  基础层："输出必须是中文"
  领域层（代码审查）："代码注释保持英文"
  
解决：领域层在特定上下文中覆盖基础层
优先级：领域层 > 能力层 > 基础层（更具体的覆盖更通用的）
```

**3. 复用与组合**

领域 Skill 可以复用能力层的通用模式：

```text
"代码审查 Skill"复用了：
  - 能力层的"文件操作 Skill"（知道怎么读取代码文件）
  - 能力层的"搜索与检索 Skill"（知道怎么定位相关代码）
  - 基础层的"输出格式约束"（知道怎么结构化输出结果）
```

这种分层复用避免了在每个领域 Skill 中重复定义通用行为。

**实际 Skill 分层设计示例（Coding Agent）**：

```text
基础层：
  ├── output-format.md    — 结构化输出格式（JSON/Markdown）
  ├── safety-rules.md     — 安全红线（不删除、不推送、不暴露密钥）
  └── error-handling.md   — 遇到错误时的标准处理流程

能力层：
  ├── file-operations.md  — 读/写/编辑文件的规范和最佳实践
  ├── search-strategy.md  — 代码搜索的渐进式策略（grep→read→分析）
  ├── test-verify.md      — 修改后验证的标准流程
  └── git-workflow.md     — Git 操作规范

领域层：
  ├── code-review.md      — 代码审查的具体标准和输出格式
  ├── refactor.md         — 重构的安全策略和验证步骤
  ├── new-feature.md      — 新功能开发的架构评估和实现流程
  └── bug-fix.md          — Bug 修复的排查方法和回归验证
```

**差距在哪**：新手按“功能”做扁平分类——这会导致 Skill 之间大量重复定义、上下文预算失控、冲突无法解决。高手按“抽象层级”分层——基础层管约束、能力层管方法、领域层管专业知识——层级之间有明确的优先级和复用关系。面试官考的是你能不能把 Skill 从“一堆文件”设计成“一个有架构的知识系统”。
