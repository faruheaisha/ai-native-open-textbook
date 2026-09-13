---
title: "第 13 章：评分量规 — 让 Agent 按验收标准自我迭代"
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

# 第 13 章：评分量规 — 让 Agent 按验收标准自我迭代

> 一个 Agent 可以返回完整代码、停止调用工具，甚至自信地解释“任务已经完成”，结果却仍在边界输入上失败。问题不在于它没有生成结果，而在于系统缺少一条独立、可取证、能把具体差距送回生成环节的验收链路。本章先从这种“看似完成”出发，再搭建一条失败后能够修订、只有明确通过才会放行的运行时闭环。

## 1. 为什么需要运行时验收

假设你让 Agent 实现 `find_duplicates(values)`。一个使用 `set` 记录已见元素的版本，可以通过最常见的整数输入：

```text
find_duplicates([1, 2, 2, 3, 1]) -> [2, 1]
```

但任务还要求支持列表等不可哈希值。相同实现遇到下面的输入时，会直接失败：

```text
find_duplicates([[1], [1]]) -> TypeError: unhashable type: 'list'
```

Agent 已经生成了完整函数，也没有继续调用工具。从生成循环看，这一轮确实结束了；从任务要求看，它却遗漏了明确的边界条件，仍然不能交付。

这类问题不只出现在代码任务中。报告可能具备标题和结论，却缺少必需章节；数据分析可能给出图表，却引用了错误时间范围；配置修改可能语法正确，却没有通过测试。

| 常见做法或现象 | 它实际说明什么 | 仍然存在的风险 |
|---|---|---|
| 模型不再调用工具 | 当前生成循环自然停止 | 不能证明全部要求都已满足 |
| 让模型检查自己的答案 | 模型又做了一次语言判断 | 生成与评审可能共享同一盲点 |
| 失败后笼统地“再试一次” | 获得另一份候选结果 | 新一轮不知道具体哪项失败、证据是什么 |
| 应用拿到了最终消息 | 对话中存在一个候选答案 | 达到上限或评审异常时也可能留下消息 |

因此，“生成结束”是一个运行事件，“通过验收”才是业务结论。只要应用把两者混为一谈，就可能把看似完整、实际未达标的结果交给下游。

### Prompt（提示词）、自检和普通重试还缺少什么

把要求写进 Prompt 很重要，但 Prompt 主要约束生成方向，不能自动证明结果已经满足要求。让模型自检或重试可以提高命中率，也没有形成独立的验收结论。

| 机制 | 能解决什么 | 还缺少什么 |
|---|---|---|
| Prompt（提示词） | 提前声明任务要求和输出形式 | 没有逐项证据，也没有独立放行结论 |
| Self-Check（自检） | 发现部分明显遗漏 | 生成与评审仍可能共享相同判断偏差 |
| Retry（重试） | 重新采样一份候选结果 | 不知道上一轮失败标准和可执行差距 |
| Offline Evaluation（离线评测） | 批量衡量版本、模型和 Prompt 的长期质量 | 不能在当前请求中把反馈送回 Agent 修订 |
| Runtime Acceptance（运行时验收） | 在当前运行中取证、评审并决定修订或结束 | 需要额外的标准、评分角色和状态控制 |

一条可靠的运行时验收链路至少需要五种能力：

1. 用明确标准描述“怎样才算完成”
2. 由独立角色评审候选结果，而不是让生成者直接自我放行
3. 对可确定的事实取得测试、Schema（结构定义）、文件或其他工具证据
4. 把未通过的 Criterion（标准项）和 Gap（差距说明）送回生成环节
5. 设置迭代预算，并在没有明确通过时采用 Fail-Closed（失败关闭）规则

这五项能力共同解决一个问题：让 Agent 不只是“再生成一次”，而是依据本轮证据修正具体差距，并让应用拿到可执行的最终结论。

## 2. Rubric Middleware（评分量规中间件）如何形成验收闭环

Grading Rubrics（评分量规）把“完成”的定义写成一组可检查标准。LLM-as-a-Judge（模型即裁判）由承担独立评审角色的模型，依据明确标准评审候选输出；它可以与工作模型相同，也可以不同。在离线评测中，这种模式通常用于批量打分，在运行时则可以直接驱动当前任务修订。

`RubricMiddleware`（评分量规中间件）把这套模式接到 Deep Agent 的自然停止点之后。Working Model（工作模型）先生成候选结果，Grader Model（评分模型）再依据 Rubric、当前对话和工具证据形成 Verdict（评审结论）。

### 四个角色各自负责什么

| 角色 | 在本章案例中的职责 | 不负责什么 |
|---|---|---|
| Working Model | 编写并修订 `find_duplicates` | 不决定自己是否通过 |
| Rubric | 声明必须满足的验收标准 | 不运行测试 |
| Grader Model | 检查标准、调用工具并形成结论 | 不能替代确定性测试 |
| Evidence Tool | 执行测试并返回结构化事实 | 不直接放行结果 |

![评分量规的角色与证据边界：工作模型生成候选答案，评分量规定义验收标准，运行记录提供上下文，证据工具提供可检查事实，评分模型综合形成评审结论；证据从文本判断、结构化产物到实际执行逐级增强](/mirror/f7/f7e4f82903e8a53a516b5776b94b831406ffe51f.png)

官方文档使用 Mermaid 描述这条主流程。下面的状态机图保留相同逻辑，并进一步区分“循环停止”和“结果通过”：

![RubricMiddleware 运行状态机：工作模型自然停止后进入评分模型；只有 needs_revision 会携带差距说明返回工作模型，satisfied 通过验收门，max_iterations_reached、failed 与 grader_error 都会终止但不代表验收成功](/mirror/56/5662470645afeca6e24712809633228b5f959320.png)

图中的 Agent 和 Model 表示不同层次。Working Agent（工作智能体）是由工作模型、工具和 Middleware 组成的 Deep Agent 运行体；Grader Agent（评分智能体）是 `RubricMiddleware` 管理的评审子智能体，由评分模型和取证工具组成。后文讲模型配置时使用 Working Model 与 Grader Model，讲完整执行单元时才使用 Agent。

整条链路按以下顺序运行：

1. 调用方传入用户任务和非空 Rubric，明确本次运行的验收标准。
2. Working Model 完成当前一轮并自然停止。此时只有候选结果，还没有验收结论。
3. Grader Model 读取 Rubric 与运行记录，并在需要时调用 Evidence Tool（证据工具）取得事实。
4. 结论为 `needs_revision` 时，Middleware 把未通过标准和 Gap 注入对话，Working Model 获得新的生成机会。
5. 修订后应使证据与当前候选对应：若测试或其他事实依赖候选内容，评分工具应重新运行，或提供能证明已有证据仍对应当前版本的依据。
6. 只有 `satisfied` 表示当前证据支持全部标准，应用才可以放行。
7. `max_iterations_reached`、`failed` 和 `grader_error` 都会停止循环，但都不代表验收成功。

这里有一条容易混淆的边界：传给 `RubricMiddleware(tools=[...])` 的工具只供评分模型取证，不会自动成为工作模型的工具。工作模型需要使用的工具，仍要通过 `create_deep_agent(tools=[...])` 提供。

## 3. 准备案例、环境与 Rubric

后续实战始终使用同一个 `find_duplicates` 案例，把前面的总体流程逐段落到代码中。本章会完成一条可以分层验证的评分链路：

1. 把任务要求写成可判定的 Rubric
2. 不使用模型密钥，先验证 Evidence Tool
3. 创建 `RubricMiddleware` 并挂载到 Deep Agent
4. 观察评分失败时怎样反馈差距并触发修订
5. 读取每轮评审结论，只在 `satisfied` 时接收结果

本章按 `deepagents==0.7.1` 核对，`RubricMiddleware` 最低需要 `deepagents>=0.6.5`，目前仍是 Beta API（测试阶段接口）。示例中的模型调用需要有效的 Provider（模型服务商）凭据；测试工具本身可以在没有模型密钥的情况下运行。

以下代码片段按出现顺序共享同一个 Python 运行上下文，后文会直接复用前面定义的模型、任务、工具和 Middleware。案例用于展示装配与验证过程，不额外提供独立代码工程。

### 准备环境与模型

在现有 Python 项目中安装 Deep Agents 和所选模型的 LangChain 集成。下面以 OpenAI 集成为例：

```bash
uv add "deepagents==0.7.1" langchain-openai
```

本章把两个模型角色分开配置。两者可以使用同一模型，也可以为评分选择成本更低、但仍支持 Structured Output（结构化输出）和 Tool Calling（工具调用）的模型。

```python
import os

from langchain.chat_models import init_chat_model

working_model = init_chat_model(os.environ["WORKING_MODEL"])
grader_model = init_chat_model(
    os.environ.get("GRADER_MODEL", os.environ["WORKING_MODEL"])
)
```

环境变量采用 `provider:model-id` 格式，例如：

```bash
