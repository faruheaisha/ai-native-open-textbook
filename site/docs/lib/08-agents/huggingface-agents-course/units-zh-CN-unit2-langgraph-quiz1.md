---
title: "测试你对 LangGraph 的理解"
sourceId: "08-agents/huggingface-agents-course"
sourceTitle: "Hugging Face Agents Course（智能体课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/huggingface/agents-course"
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit2/langgraph/quiz1.mdx"
sourceRel: "units/zh-CN/unit2/langgraph/quiz1.mdx"
rawUrl: "/raw/08-agents/huggingface-agents-course/units/zh-CN/unit2/langgraph/quiz1.mdx"
sourceSha256: "2fda03199f7bba99822fc97cfaa9c6886ec07bd14e1ad71c0a42bf5d07b6c038"
pageSha256: "2fda03199f7bba99822fc97cfaa9c6886ec07bd14e1ad71c0a42bf5d07b6c038"
contentMode: "local-full"
zh: ""
---

# 测试你对 LangGraph 的理解

让我们通过快速测验来测试你对 `LangGraph` 的理解！这将帮助你巩固目前学到的关键概念。

本测验为可选项目，不计入评分。

### Q1: LangGraph 的主要目的是什么？
哪个描述最能体现 LangGraph 的设计目标？


**选项**

- A. 构建包含 LLM 应用的流程控制的框架
- B. 提供与不同 LLM 模型交互接口的库
- C. 用于工具调用的 Agent 库

**答案解析**

- **A（正确答案）** — 正确！LangGraph 专门设计用于帮助构建和管理使用 LLM 应用的流程控制。
- **B** — 这更符合 LangChain 的定位，它提供了模型交互的标准接口。LangGraph 专注于流程控制。
- **C** — 虽然 LangGraph 可以与 agent 配合使用，但其主要目的是『流程编排』。


---

### Q2: 在"控制 vs 自由"的权衡中，LangGraph 的定位是什么？
哪个陈述最能体现 LangGraph 在 agent 设计中的方法？


**选项**

- A. LangGraph 最大化自由，允许 LLM 完全自主决策
- B. LangGraph 在保持对执行流程强控制的同时，仍利用 LLM 能力进行决策

**答案解析**

- **A** — 实际上 LangGraph 更注重控制而非自由，它为 LLM 工作流提供结构化的框架。
- **B（正确答案）** — 正确！当你需要对 agent 执行流程进行控制时，LangGraph 通过结构化工作流提供可预测的行为。


---

### Q3: State 在 LangGraph 中扮演什么角色？
选择对 LangGraph 中 State 最准确的描述。


**选项**

- A. State 是 LLM 的最新生成结果
- B. State 仅用于追踪执行期间的错误
- C. State 代表在 agent 应用中流转的信息
- D. State 仅在与外部 API 交互时相关

**答案解析**

- **A** — State 是用户自定义的类，其字段由用户定义，值可以由 LLM 填充
- **B** — State 的作用远不止错误追踪，不过该功能确实有用。
- **C（正确答案）** — 正确！State 是 LangGraph 的核心，包含步骤间决策所需的所有信息。你可以定义需要计算的字段，节点可以通过修改这些值来决定流程分支。
- **D** — State 是所有 LangGraph 应用的基础，不局限于外部 API 的使用场景。


### Q4: LangGraph 中的条件边（Conditional Edge）是什么？
选择最准确的描述。


**选项**

- A. 根据条件评估决定后续执行节点的边
- B. 仅在特定条件发生时才会跟随的边
- C. 需要用户确认才能继续的边

**答案解析**

- **A（正确答案）** — 正确！条件边允许你的图谱基于当前状态做出动态路由决策，实现工作流中的分支逻辑。
- **B** — 条件边是根据应用输出控制流程的，而不是基于输入。
- **C** — 条件边基于程序设定的条件，不需要用户交互确认。


---

### Q5: LangGraph 如何帮助解决 LLM 的幻觉问题？
选择最佳答案。


**选项**

- A. 通过限制 LLM 响应完全消除幻觉
- B. 提供可验证和校验 LLM 输出的结构化工作流
- C. 对幻觉问题没有影响

**答案解析**

- **A** — 没有任何框架能完全消除 LLM 的幻觉问题，LangGraph 也不例外。
- **B（正确答案）** — 正确！通过包含验证步骤、校验节点和错误处理路径的结构化工作流，LangGraph 有助于减少幻觉的影响。
- **C** — LangGraph 的结构化方法能有效缓解幻觉问题，但会牺牲一定的响应速度。


恭喜完成测验！🎉 如果有答错的问题，建议回顾前文内容加强理解。接下来我们将探索 LangGraph 的更高级功能，学习如何构建更复杂的 agent 工作流。
