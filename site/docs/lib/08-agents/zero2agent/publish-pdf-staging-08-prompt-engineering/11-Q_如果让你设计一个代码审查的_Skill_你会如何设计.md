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
pageSha256: "b105d4c821980833b02178bd79d46e03f304c542da53e9648fd2304e9e35b888"
contentMode: "local-full"
zh: ""
---

## Q：如果让你设计一个代码审查的 Skill，你会如何设计？

> 来源：最有料 AI 实习生面经

**新手答**：“写一个 Prompt 让模型去审查代码，列出问题就行。”

**高手答**：

设计一个生产级的代码审查 Skill，需要从**触发条件、执行流程、审查维度、输出格式和质量保障**五个方面系统设计。

**整体架构**：

**1. 触发条件设计**：

```yaml
name: code-review
description: 审查代码变更的正确性、安全性、可维护性
triggers:
  - pattern: "审查代码|review|帮我看看这段代码|代码有没有问题"
    type: regex
  - command: "/review"
    type: explicit
  - event: "git diff 产出变更"
    type: contextual
```

**2. 执行流程——四阶段**：

**阶段一：上下文收集**

不能只看 diff，要理解变更的上下文：
- 读取变更文件的完整内容（不只是改动行）
- 读取项目的 CLAUDE.md 或 .cursorrules（了解项目规范）
- 读取相关的类型定义和接口文件（理解接口契约）
- 查看 git log 了解变更意图

**阶段二：分层审查**

按五个维度从高优先级到低优先级逐层扫描：

| 优先级 | 审查维度 | 检查内容 | 严重程度 |
|--------|---------|---------|---------|
| P0 | 正确性 | 逻辑错误、边界条件、空指针、类型不匹配 | Critical |
| P1 | 安全性 | SQL 注入、XSS、硬编码密钥、权限泄露 | High |
| P2 | 一致性 | 和项目现有模式是否一致、命名规范 | Medium |
| P3 | 可维护性 | 代码重复、过度复杂、缺少注释 | Low |
| P4 | 性能 | N+1 查询、不必要的循环、内存泄漏风险 | Low |

**阶段三：问题输出**

每个问题必须包含：具体位置（文件名 + 行号）、问题描述、严重程度、修复建议

**阶段四：可选自动修复**

对 P3/P4 级别的问题（命名不规范、简单的代码风格问题），可以直接生成修复 diff，让用户一键 apply。

**3. 输出格式设计**：

```text
## 代码审查结果

### [Critical] Critical（必须修复）

**[文件名:行号]** 问题标题
- 问题：具体描述
- 原因：为什么这是个问题
- 修复建议：具体怎么改

### 🟡 Medium（建议修复）
...

### 🟢 Low（可选优化）
...

### 总结
- 审查了 X 个文件，Y 行变更
- 发现 N 个问题（Critical: a, High: b, Medium: c, Low: d）
- 整体评价：一句话总结代码质量
```

**4. 质量保障机制**：

| 机制 | 目的 |
|------|------|
| **False Positive 控制** | 对不确定的问题标注“建议确认”而非“必须修复” |
| **项目规则对齐** | 读取项目配置文件，避免提出违反项目约定的建议 |
| **修复验证** | 如果提供了自动修复，建议跑一次 lint/test 验证 |
| **反馈闭环** | 记录用户采纳/忽略的比例，用于优化审查标准 |

**5. 和传统 Lint 工具的区别**：

Skill 式的代码审查不是替代 ESLint/Pylint，而是补充它们无法覆盖的维度：
- Lint 能抓语法和风格问题，但抓不到**业务逻辑错误**
- Lint 不理解上下文——不知道这段代码的意图是什么，Skill 可以结合 commit message 和上下文理解
- Lint 规则是固定的，Skill 可以根据项目特点动态调整审查标准

**差距在哪**：新手只想到“让模型看代码找问题”——这是最粗暴的方式，没有结构、没有分级、没有上下文。高手设计了完整的四阶段流程（收集→审查→输出→修复），按五个维度分级审查，并考虑了质量保障和反馈闭环。面试官考的是你能不能把一个“让 AI 做 X”的模糊需求转化为一个可工程化、可评测、可迭代的 Skill 设计。
