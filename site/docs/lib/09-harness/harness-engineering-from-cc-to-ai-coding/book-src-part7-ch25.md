---
title: "第25章：驾驭工程原则"
sourceId: "09-harness/harness-engineering-from-cc-to-ai-coding"
sourceTitle: "驾驭工程：从 Claude Code 源码到 AI 编码最佳实践"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding"
entryUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding/blob/e40e0feec02b90e308ccbfc7a8911d64118ccca0/README.md"
zh: ""
---

# 第25章：驾驭工程原则

> **定位**：本章从前 23 章的源码分析中提炼出 6 条驾驭工程（Harness Engineering）核心原则。前置依赖：建议先读完第一至第五篇。适用场景：想从 CC 源码中提取可复用的 AI Agent 工程原则的读者——本章是全书模式提炼的起点。

## 为什么这很重要

在前六篇中，我们从源码层面剖析了 Claude Code 的每一个子系统——工具注册、Agent Loop、系统提示词、上下文压缩、提示词缓存、权限安全、技能系统。这些分析揭示了大量的实现细节，但如果只停留在"它是怎么做的"层面，就浪费了逆向工程最有价值的产出：**可复用的工程原则**。

本章从前 23 章的源码分析中提炼出 6 条驾驭工程（Harness Engineering）核心原则。每条原则都有明确的源码回溯、适用场景和反模式警示。这些原则的共同主题是：**在 AI Agent 系统中，控制行为的最佳方式不是编写更多代码，而是设计更好的约束**。

---

## Claude Code 在 Agent Loop 架构谱系中的位置

在提炼原则之前，有必要先回答一个元问题：**Claude Code 是什么类型的 Agent 架构？**

学术界将 Agent Loop 归纳为六类模式：单体循环（ReAct 式推理-行动交错）、分层代理（目标-任务-执行三层）、分布式多代理（多角色协作）、反思/元认知循环（Reflexion 式自我改进）、工具增强循环（外部工具驱动状态更新）、学习/在线更新循环（记忆持久化与策略迭代）。大多数框架（LangGraph、AutoGen、CrewAI）选择一到两种模式作为核心抽象。

Claude Code 的独特之处在于：**它不是上述任何一种模式的纯实现，而是六种模式的实用主义混合体**。

```
┌─────────────────────────────────────────────────────────────┐
│                 Claude Code 架构谱系定位                      │
├──────────────────────┬──────────────────────────────────────┤
│ 学术模式              │ CC 对应实现                           │
├──────────────────────┼──────────────────────────────────────┤
│ 单体循环              │ queryLoop() — 核心 Agent Loop（ch03）│
│ 工具增强循环           │ 40+ 工具的 ReAct 式交错（ch02-04）    │
│ 分层代理              │ Coordinator Mode 战略/执行分层（ch20） │
│ 分布式多代理           │ Team 并行 + Ultraplan 远程委托（ch20）│
│ 反思循环（弱形式）     │ Advisor Tool + stop hooks 反馈（ch21）│
│ 学习循环（弱形式）     │ 跨会话记忆 + CLAUDE.md 持久化（ch24） │
└──────────────────────┴──────────────────────────────────────┘
```

这种混合不是设计失误，而是务实选择。CC 的核心是一个单体 `queryLoop()`（模式一），但在此基础上：

- **工具增强**是默认行为——每次迭代都可能调用工具、获取观测、更新状态，这正是 ReAct 的"推理-行动交错"
- **分层代理**按需启用——Coordinator Mode 将"规划"和"执行"拆分到不同层级，高层只决策、低层只执行
- **分布式多代理**按需启用——Team 模式让多个 Agent 通过 `SendMessageTool` 协作，Ultraplan 将规划卸载到远程容器
- **反思**是隐式的——没有显式的 Reflexion 记忆，但 Advisor Tool 提供了"批评者"角色，stop hooks 提供了"执行后检查"
- **学习**是持久化的——跨会话记忆（`~/.claude/memory/`）和 CLAUDE.md 使 Agent 能跨会话积累经验，但不更新模型权重

这种"默认简单、按需复杂"的架构哲学贯穿了本章提炼的所有原则。

---

## 源码分析

### 25.1 原则一：提示词即控制面

**定义**：用系统提示词段落引导模型行为，而非用代码逻辑硬编码限制。

Claude Code 的行为引导绝大多数通过提示词实现，而非通过代码中的 if/else 分支。最典型的例子是极简主义指令：

```typescript
// restored-src/src/constants/prompts.ts:203
"Don't create helpers, utilities, or abstractions for one-time operations.
Don't design for hypothetical future requirements. The right amount of
complexity is what the task actually requires — no speculative abstractions,
but no half-finished implementations either. Three similar lines of code
is better than a premature abstraction."
```

这段文本不是代码注释——它是发送给模型的实际指令。Claude Code 没有在代码层面检测模型是否过度工程化（这在技术上几乎不可能），而是通过自然语言直接告诉模型"不要这么做"。

同样的模式贯穿整个系统提示词架构（详见第5章）。`systemPromptSections.ts` 将系统提示词组织为多个可组合的段落，每个段落都有明确的缓存范围（`scope: 'global'` 或 `null`）。这种设计使得行为调整只需修改文本，不需要改代码、改测试、走发布流程。

工具提示词是这一原则的精华体现（详见第8章）。BashTool 的 Git 安全协议——"绝不跳过 hooks、绝不 amend、优先指定文件 git add"——完全由提示词文本表达。如果某天团队决定允许 amend，只需删除一行提示词文本，无需触碰任何执行逻辑。
