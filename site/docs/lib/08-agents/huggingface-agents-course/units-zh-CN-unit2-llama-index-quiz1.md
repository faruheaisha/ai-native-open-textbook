---
title: "小测验（不计分） [[quiz1]]"
sourceId: "08-agents/huggingface-agents-course"
sourceTitle: "Hugging Face Agents Course（智能体课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/huggingface/agents-course"
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit2/llama-index/quiz1.mdx"
sourceRel: "units/zh-CN/unit2/llama-index/quiz1.mdx"
rawUrl: "/raw/08-agents/huggingface-agents-course/units/zh-CN/unit2/llama-index/quiz1.mdx"
sourceSha256: "8283968bf6cfa9341a0e02b6a47601e2818b655f136cef452b80322bb83c94ae"
pageSha256: "8283968bf6cfa9341a0e02b6a47601e2818b655f136cef452b80322bb83c94ae"
contentMode: "local-full"
zh: ""
---

# 小测验（不计分） [[quiz1]]

到目前为止，我们已经讨论了 LlamaIndex 的关键组件和工具。
是时候做个小测验了，因为**自我测试**是最好的学习方式，也能[避免能力错觉](https://www.coursera.org/lecture/learning-how-to-learn/illusions-of-competence-BuFzf)。
这将帮助您发现**哪些知识需要加强**。

本测验为可选项目，不计入成绩。

### Q1: 什么是 QueryEngine？
以下哪项最能描述 QueryEngine 组件？


**选项**

- A. 仅处理静态文本且不具备检索能力的系统
- B. 在 RAG 过程中负责查找和检索相关信息组件
- C. 仅存储向量嵌入而不具备搜索功能的工具
- D. 仅用于评估响应质量的组件

**答案解析**

- **A** — QueryEngine 必须能够检索和处理相关信息
- **B（正确答案）** — 这准确描述了 QueryEngine 的核心功能
- **C** — QueryEngine 的功能不仅限于存储嵌入 - 它需要主动搜索和检索信息
- **D** — 质量评估不属于 QueryEngine 的主要检索功能


---

### Q2: FunctionTools 的作用是什么？
为什么 FunctionTools 对 Agent 很重要？


**选项**

- A. 用于处理大量数据存储
- B. 将 Python 函数转换为 Agent 可使用的工具
- C. 允许 Agent 创建随机函数定义
- D. 仅处理文本数据

**答案解析**

- **A** — FunctionTools 的主要目的不是数据存储
- **B（正确答案）** — FunctionTools 通过封装 Python 函数使其可供 Agent 使用
- **C** — FunctionTools 有明确的功能封装目的，而非创建随机函数
- **D** — FunctionTools 可以处理各种类型的函数，不限于文本处理


---

### Q3: LlamaIndex 中的 Toolspecs 是什么？
Toolspecs 的主要目的是什么？


**选项**

- A. 它们是冗余的组件，不提供实际功能
- B. 社区创建的工具集合，用于扩展 Agent 能力
- C. 专门用于内存管理
- D. 仅支持文本处理

**答案解析**

- **A** — Toolspecs 在 LlamaIndex 生态中具有重要作用
- **B（正确答案）** — Toolspecs 允许社区共享和复用工具
- **C** — Toolspecs 的核心是提供工具，而非内存管理
- **D** — Toolspecs 可以包含多种类型的工具，不限于文本处理


---

### Q4: 创建工具时需要什么？
创建工具时必须包含哪些信息？


**选项**

- A. 必须定义函数、名称和描述
- B. 仅需名称
- C. 仅需描述
- D. 仅需函数

**答案解析**

- **A** — 虽然这些构成完整工具，但名称和描述可从函数和文档字符串解析
- **B** — 仍需函数和描述/文档字符串来确保工具文档完整性
- **C** — 必须包含函数才能使智能体执行具体操作
- **D（正确答案）** — 名称和描述默认取自所提供函数的名称和文档字符串


---

恭喜完成测验 🥳！如果有错误，请重新阅读章节巩固知识。如果全部正确，您已准备好深入学习这些组件的构建了！
