---
title: "第 15 章：Interpreters — 让 Agent 用代码编排工具与数据"
sourceId: "08-agents/deepagents-in-action"
sourceTitle: "《Deep Agents 实战》"
sourceKind: "实践案例集"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/deepagents-in-action"
entryUrl: "https://github.com/datawhalechina/deepagents-in-action/blob/4097ff944f9ffa1bdfe2dd04f751f4416b058860/README.md"
zh: ""
---

# 第 15 章：Interpreters — 让 Agent 用代码编排工具与数据

> 订单审核 Agent 收到 80 个订单号。它先调用一次查询工具，等结果回来，再调用下一次。几十条工具结果陆续进入上下文，模型还没完成审核，已经开始漏项。查询工具没有问题，真正不合适的是编排方式：循环、筛选和聚合都交给了模型逐轮决定。

普通 Tool Calling 适合少量、彼此独立的调用。任务一旦需要根据结果继续分支、重试或批量处理，模型就要为每一步重新推理，所有中间结果也会返回上下文。Interpreters（解释器）把这部分工作移进代码：模型决定要完成什么，再用 JavaScript 组织具体步骤，只把整理后的结果带回对话。

你会给 Deep Agent 加入 `CodeInterpreterMiddleware`，先运行一段纯内存 JavaScript，再通过 Programmatic Tool Calling（PTC，程序化工具调用）批量读取订单。完成实验后，你应该能判断什么时候使用普通工具调用、Interpreter 或 Sandbox，并能为 PTC 配置最小权限边界。

Interpreters 目前是 Beta API。示例要求 Python 3.11+ 和 `langchain-quickjs>=0.2.0`，接口与生命周期仍可能变化。本章在 Python 3.11.14、`deepagents==0.7.8` 和 `langchain-quickjs==0.3.5` 中核对；只讲解释器和 PTC，动态调度子 Agent 留到下一章。

## 1. 为什么需要 Interpreter

先看订单审核任务的自然写法。Agent 需要读取每个订单，按金额和退款次数筛选风险项，再生成摘要。

普通工具调用大致经历下面的循环：

```text
模型决定查询 A-100 -> 工具返回 A-100 -> 结果进入模型上下文
模型决定查询 A-101 -> 工具返回 A-101 -> 结果进入模型上下文
模型决定查询 A-102 -> 工具返回 A-102 -> 结果进入模型上下文
……
模型整理全部结果 -> 返回风险订单
```

模型可以在同一轮发出一批工具调用，但这批调用在生成完成时已经固定。它不能在同一批中读取第一个结果，再据此决定第二个调用；循环、条件分支和重试通常都需要新的模型轮次。

数据量很小时，这种方式最直接。数据量变大后，问题会逐渐暴露：

1. 模型决定调用次数，难以保证每个输入都被处理。
2. 每个中间结果都进入上下文，占用 token 并干扰后续判断。
3. 排序、分组、去重等确定性工作仍由模型反复完成。
4. 工具调用被拆到更多模型轮次中，延迟和调用成本随之增加。

Interpreter 提供另一条路径：模型生成一段 JavaScript，由 QuickJS 在 Agent 循环内执行。循环、分支和数据转换留在代码中，模型只接收最后的结果。

| 任务形状 | 优先选择 | 原因 |
|---|---|---|
| 一两个简单外部调用 | 普通 Tool Calling | 路径短，额外编排没有收益 |
| 纯内存排序、分组、解析或校验 | Interpreter | JavaScript 可以确定性处理数据 |
| 大量外部工具调用，需要循环或并行 | Interpreter + PTC | 代码控制调用和聚合，只返回必要结果 |
| Shell、安装依赖、运行测试或操作完整文件系统 | Sandbox | 需要独立执行环境和操作系统能力 |
| 大量独立任务需要不同 Agent 角色 | Dynamic Subagents | 每个角色都要运行完整的子 Agent 推理循环 |

Interpreter 不是轻量版 Shell，也不是本地沙箱。它是 Agent 循环里的内存代码运行时。

![普通 Tool Calling 需要模型逐轮调用 Tool 1、Tool 2、Tool 3，中间结果持续进入上下文；Interpreter 与 PTC 通过一次 eval 在 QuickJS 中使用 Promise.all 并行调用 tools.lookupOrder，最后只把汇总结果返回模型](https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/deepagents-in-action/4097ff944f9ffa1bdfe2dd04f751f4416b058860/public/imgs/48-comparison-tool-calling-vs-interpreter.png)

## 2. 准备环境并运行第一段 JavaScript

在已有 Python 项目中安装 Deep Agents、QuickJS 中间件和模型集成：

```bash
uv add "deepagents[quickjs]" langchain-openai
```

如果项目已经声明了其中某个依赖，`uv` 会保留满足条件的现有版本。

检查 Python、Deep Agents 和 QuickJS 中间件是否可以导入：

```bash
uv run python -c "import sys, deepagents, langchain_quickjs; print(sys.version_info[:2]); print(langchain_quickjs.__name__)"
```

```text title="关键输出"
(3, 14)
langchain_quickjs
```

这里展示的是本章实际验证时的版本。你的 Python 次版本可以不同，但不能低于 `(3, 11)`；第二行应为相同的模块名。

后文沿用课程的 OpenAI 兼容环境变量。在当前终端中设置：

```bash
