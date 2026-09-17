---
title: "第27章：生产级 AI 编码模式"
sourceId: "09-harness/harness-engineering-from-cc-to-ai-coding"
sourceTitle: "驾驭工程：从 Claude Code 源码到 AI 编码最佳实践"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding"
entryUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding/blob/e40e0feec02b90e308ccbfc7a8911d64118ccca0/book/src/part7/ch27.md"
sourceRel: "book/src/part7/ch27.md"
rawUrl: "/raw/09-harness/harness-engineering-from-cc-to-ai-coding/book/src/part7/ch27.md"
sourceSha256: "d1cdf27dd853a1aec0bac06e14c55f51f695b33ac58662e7db83b25445958c99"
pageSha256: "d1cdf27dd853a1aec0bac06e14c55f51f695b33ac58662e7db83b25445958c99"
contentMode: "local-full"
zh: ""
---

# 第27章：生产级 AI 编码模式

> **定位**：本章从 Claude Code 实际实现中提取 8 个具体的、可直接复用的生产级编码模式。前置依赖：第25章、第26章。适用场景：想获取可直接应用到自己 Agent 项目中的 8 个命名模式的读者。

## 为什么这很重要

前两章提炼的是"原则"——关于如何思考驾驭工程和上下文管理的高层指导。本章不同：我们聚焦于 **8 个具体的、可直接复用的编码模式**。每个模式都从 Claude Code 的实际实现中提取，有明确的问题定义、实现方式和源码证据。

这些模式有一个共同特点：它们看起来简单到不值一提，但在生产环境中被反复验证为必要。"编辑前先读取"——谁会不读就编辑？但 Claude Code 用工具报错来强制执行，因为 AI 模型确实会跳过读取直接编辑。"防御性 Git"——当然不该 force push，但 Claude Code 用整段提示词来强调这一点，因为模型在压力下确实会选择最短路径。

---

## 源码分析

### 27.1 模式一：编辑前先读取（Read Before Edit）

**问题**：AI 模型可能在没有读取文件当前内容的情况下尝试编辑，导致编辑基于过时或错误的假设。

Claude Code 通过**双层保障**来强制这一点：

1. **提示词层**（软约束）：FileEditTool 的描述中明确写着"你必须在对话中至少使用过一次 Read 工具后才能编辑。如果你在未读取文件的情况下尝试编辑，该工具会报错"（详见第8章）
2. **代码层**（硬约束）：FileEditTool 的 `call()` 方法在执行编辑前检查当前对话是否包含对目标文件的 Read 调用。没有则返回错误

双层保障的设计意义在于：提示词是"软约束"——模型大多数时候会遵守，但在特定条件下（上下文过长导致指令被"遗忘"、多轮对话中注意力漂移）可能被忽略。代码层是"硬约束"——即使模型忽略提示词，工具本身也拒绝执行。

| 维度 | 描述 |
|------|------|
| **实现方式** | 提示词指令（软约束）+ 工具代码检查（硬约束） |
| **源码引用** | FileEditTool 提示词（详见第8章） |
| **适用场景** | 任何需要修改现有内容的工具 |
| **反模式** | 仅靠提示词指令，不在代码层强制执行 |

---

### 27.2 模式二：渐进式自主（Graduated Autonomy）

**问题**：AI Agent 需要在"每步都问用户"（效率低）和"什么都不问"（风险高）之间找到平衡。

Claude Code 设计了从最严格到最宽松的权限模式梯度（详见第16章）：

```
default → acceptEdits → plan → bypassPermissions → auto → dontAsk
  │           │           │           │               │       │
  │           │           │           │               │       └── 完全自主
  │           │           │           │               └── 分类器自动决策
  │           │           │           └── 跳过权限检查
  │           │           └── 仅计划不执行
  │           └── 自动接受编辑，其他仍确认
  └── 每步确认
```

关键设计不是模式本身，而是**带回退的自动化**。`auto` 模式使用 YOLO 分类器（详见第17章）自动做出权限决策，但有两个安全阀。拒绝追踪的实现非常简洁：

```typescript
// restored-src/src/utils/permissions/denialTracking.ts:12-15
export const DENIAL_LIMITS = {
  maxConsecutive: 3,
  maxTotal: 20,
} as const

// restored-src/src/utils/permissions/denialTracking.ts:40-44
export function shouldFallbackToPrompting(
  state: DenialTrackingState
): boolean {
  return (
    state.consecutiveDenials >= DENIAL_LIMITS.maxConsecutive ||
    state.totalDenials >= DENIAL_LIMITS.maxTotal
  )
}
```

当分类器连续 3 次或总计 20 次拒绝操作后，系统永久回退到用户手动确认。这意味着即使在最自主的模式下，系统也保留了回退到人类决策的能力。自主不是"全有或全无"，而是连续光谱，且光谱的每个位置都有安全网。

| 维度 | 描述 |
|------|------|
| **实现方式** | 多级权限模式 + 分类器自动决策 + 拒绝追踪回退 |
| **源码引用** | 权限模式（第16章）、YOLO 分类器（第17章）、`denialTracking.ts:12-44` |
| **适用场景** | 任何需要人机协作的 AI Agent 系统 |
| **反模式** | 二元权限：只有"手动"和"自动"，没有中间地带和安全回退 |

---

### 27.3 模式三：防御性 Git（Defensive Git）

**问题**：AI 模型在执行 Git 操作时可能选择"最短路径"，导致数据丢失或难以恢复的状态。

Claude Code 在 BashTool 提示词中嵌入了完整的 Git 安全协议（详见第8章），核心规则包括：

1. **绝不跳过 hooks**（`--no-verify`）：pre-commit hooks 是项目的质量门禁
2. **绝不 amend**（除非用户明确要求）：`git commit --amend` 修改前一个 commit，在 hook 失败后使用会覆盖用户之前的 commit
