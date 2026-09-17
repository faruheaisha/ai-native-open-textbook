---
title: "Quiz 1: MCP Fundamentals"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/units/en/unit1/quiz1.mdx"
sourceRel: "units/en/unit1/quiz1.mdx"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/units/en/unit1/quiz1.mdx"
sourceSha256: "abb236913798c51a06373a6788f66c84d97d2a890926a27a99997771dc7ea612"
pageSha256: "abb236913798c51a06373a6788f66c84d97d2a890926a27a99997771dc7ea612"
contentMode: "local-full"
zh: "on"
---

# Quiz 1: MCP Fundamentals

Test your knowledge of the core concepts of Model Context Protocol.

<div class="tb-zh"><p>检测你对 Model Context Protocol 核心概念的掌握程度。</p></div>

### Q1: What is the primary purpose of Model Context Protocol (MCP)?

**选项**

- A. To limit the training data of AI models
- B. To enable AI models to connect with external data sources, tools, and environments
- C. To replace prompting when using Large Language Models
- D. To create a new programming language for AI

<div class="tb-zh"><p>A. 限制 AI 模型的训练数据；B. 让 AI 模型能够连接外部数据源、工具与运行环境；C. 在使用大语言模型时取代提示词；D. 为 AI 创造一门新的编程语言</p></div>

**答案解析**

- **A** — MCP aims to expand, not limit, the contexts AI models can access.
- **B（正确答案）** — Correct! MCP's main goal is to facilitate interoperability.
- **C** — MCP is a protocol that enhances prompting, not a replacement for it.
- **D** — MCP is a protocol, not a programming language.

<div class="tb-zh"><p>A — MCP 意在扩展而非限制 AI 模型能访问的上下文；B（正确答案）— 正确！MCP 的主要目标是促进互操作性；C — MCP 是增强提示词的协议，而非取代提示词；D — MCP 是一种协议，不是编程语言。</p></div>

### Q2: What problem does MCP primarily aim to solve?

**选项**

- A. The lack of AI models
- B. The high cost of training LLMs
- C. The M×N Integration Problem
- D. The difficulty in creating new AI algorithms

<div class="tb-zh"><p>A. 缺少 AI 模型；B. 训练 LLM 成本高昂；C. M×N 集成问题；D. 难以创造新的 AI 算法</p></div>

**答案解析**

- **A** — MCP addresses integration challenges, not the availability of AI models themselves.
- **B** — While MCP can improve efficiency, its primary focus is not on reducing training costs directly.
- **C（正确答案）** — Correct! MCP standardizes connections to avoid M×N custom integrations.
- **D** — MCP facilitates using existing algorithms and tools, not creating new ones from scratch.

<div class="tb-zh"><p>A — MCP 解决的是集成难题，而非 AI 模型本身是否可得；B — MCP 虽能提升效率，但它的重心并不直接是降低训练成本；C（正确答案）— 正确！MCP 通过标准化连接来避免 M×N 的定制集成；D — MCP 帮助使用已有的算法与工具，而不是从零创造新算法。</p></div>

### Q3: Which of the following is a key benefit of MCP?

**选项**

- A. Reduced AI model accuracy
- B. Increased complexity in AI development
- C. Standardization and interoperability in the AI ecosystem
- D. Isolation of AI models from external systems

<div class="tb-zh"><p>A. AI 模型准确率下降；B. AI 开发的复杂度上升；C. AI 生态的标准化与互操作性；D. 把 AI 模型与外部系统隔离</p></div>

**答案解析**

- **A** — MCP aims to enhance AI capabilities, which should ideally lead to improved or maintained accuracy, not reduced.
- **B** — MCP aims to simplify integration, thereby reducing complexity.
- **C（正确答案）** — Correct! This is a primary goal and benefit of MCP.
- **D** — MCP promotes connection and interaction, not isolation.

<div class="tb-zh"><p>A — MCP 意在增强 AI 能力，理想情况下会带来准确率的提升或保持，而非下降；B — MCP 意在简化集成，从而降低复杂度；C（正确答案）— 正确！这是 MCP 的首要目标与收益；D — MCP 促进连接与交互，而不是隔离。</p></div>

### Q4: In MCP terminology, what is a "Host"?

**选项**

- A. The external program exposing capabilities
- B. The user-facing AI application
- C. A read-only data source
- D. A pre-defined template for interactions

<div class="tb-zh"><p>A. 暴露能力的外部程序；B. 面向用户的 AI 应用；C. 只读数据源；D. 预定义的交互模板</p></div>

**答案解析**

- **A** — This describes an MCP Server.
- **B（正确答案）** — Correct! The Host is the application users interact with.
- **C** — This describes a type of MCP Capability (Resource).
- **D** — This describes a type of MCP Capability (Prompt).

<div class="tb-zh"><p>A — 这描述的是 MCP Server；B（正确答案）— 正确！Host 就是用户与之交互的应用；C — 这描述的是一类 MCP 能力（Resource）；D — 这描述的是一类 MCP 能力（Prompt）。</p></div>

### Q5: What does "M×N Integration Problem" refer to in the context of AI applications?

**选项**

- A. The difficulty of training M models with N datasets
- B. The challenge of connecting M AI applications to N external tools without a standard
- C. The problem of managing M users across N applications
- D. The complexity of developing M features for N different user segments

<div class="tb-zh"><p>A. 用 N 个数据集训练 M 个模型的难度；B. 在没有标准的情况下把 M 个 AI 应用连接到 N 个外部工具的挑战；C. 在 N 个应用中管理 M 个用户的问题；D. 为 N 类不同用户群体开发 M 个功能的复杂度</p></div>

**答案解析**

- **A** — This relates to model training, not the integration problem MCP addresses.
- **B（正确答案）** — Correct! MCP provides the standard to solve this M*N complexity.
- **C** — This is a user management or identity problem, not the focus of MCP.
- **D** — This relates to product development strategy, not system integration in the way MCP defines.

<div class="tb-zh"><p>A — 这涉及模型训练，而非 MCP 所解决的集成问题；B（正确答案）— 正确！MCP 提供了解决 M×N 复杂度的标准；C — 这属于用户管理或身份问题，不是 MCP 的重点；D — 这涉及产品开发策略，而不是 MCP 所定义的系统集成。</p></div>

Congrats on finishing this Quiz 🥳! If you need to review any elements, take the time to revisit the chapter to reinforce your knowledge.

<div class="tb-zh"><p>恭喜你完成这份自测 🥳！如果需要回顾某些内容，不妨花点时间重读该章，巩固所学。</p></div>
