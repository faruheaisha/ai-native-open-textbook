---
title: "我的开发偏好"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/02-memory/personal-CLAUDE.md"
sourceRel: "zh/02-memory/personal-CLAUDE.md"
rawUrl: "/raw/09-harness/claude-howto/zh/02-memory/personal-CLAUDE.md"
sourceSha256: "045a324b3553324db15100f40661cd8e821c2c03e2c643947a744b7de7abb9b7"
pageSha256: "045a324b3553324db15100f40661cd8e821c2c03e2c643947a744b7de7abb9b7"
contentMode: "local-full"
zh: ""
---

# 我的开发偏好

## 关于我
- **经验水平**：8 年全栈开发经验
- **偏好语言**：TypeScript、Python
- **沟通风格**：直接，最好带例子
- **学习风格**：配合代码的可视化图示

## 代码偏好

### 错误处理
我偏好显式的错误处理，使用 `try-catch` 和有意义的错误消息。
避免使用泛化错误。为了便于调试，始终记录错误日志。

### 注释
注释应解释“为什么”，而不是“是什么”。代码本身应该尽量能自解释。
注释应该说明业务逻辑或者不明显的设计决策。

### 测试
我偏好 TDD（测试驱动开发）。
先写测试，再写实现。
重点关注行为，而不是实现细节。

### 架构
我偏好模块化、低耦合的设计。
使用依赖注入提升可测试性。
拆分关注点，例如 Controllers、Services、Repositories。

## 调试偏好
- 使用带前缀的 `console.log`：`[DEBUG]`
- 包含上下文：函数名、相关变量
- 如果有堆栈信息，优先使用
- 日志里始终带时间戳

## 沟通方式
- 用图示解释复杂概念
- 先给具体例子，再讲理论
- 提供修改前 / 修改后的代码片段
- 在结尾总结关键点

## 项目组织
我通常会这样组织项目：

```text
project/
  ├── src/
  │   ├── api/
  │   ├── services/
  │   ├── models/
  │   └── utils/
  ├── tests/
  ├── docs/
  └── docker/
```

## 工具链
- **IDE**：VS Code，带 vim 键位
- **终端**：Zsh + Oh-My-Zsh
- **格式化**：Prettier，行宽 100 字符
- **Linter**：ESLint，airbnb 配置
- **测试框架**：Jest + React Testing Library
