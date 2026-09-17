---
title: "快速自测（不计分）[[quiz2]]"
sourceId: "08-agents/huggingface-agents-course"
sourceTitle: "Hugging Face Agents Course（智能体课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/huggingface/agents-course"
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit1/quiz2.mdx"
sourceRel: "units/zh-CN/unit1/quiz2.mdx"
rawUrl: "/raw/08-agents/huggingface-agents-course/units/zh-CN/unit1/quiz2.mdx"
sourceSha256: "716a679cf2cb9a0bd2c625188217334468fc649b145ec1f86ba160c805364458"
pageSha256: "716a679cf2cb9a0bd2c625188217334468fc649b145ec1f86ba160c805364458"
contentMode: "local-full"
zh: ""
---

# 快速自测（不计分）[[quiz2]] 


什么？！还有测验？我们理解，我们理解... 😅 但这个简短的不计分测验旨在**帮助您巩固刚学习的关键概念**。

本测验涵盖大型语言模型（LLMs）、消息系统和工具——这些是理解和构建 AI 智能体的核心组件。

### 问题1：以下哪项最能描述 AI 工具？


**选项**

- A. 仅生成文本响应的流程
- B. 允许智能体执行特定任务并与外部环境交互的可执行流程或外部 API
- C. 存储智能体对话的功能

**答案解析**

- **A**
- **B（正确答案）** — 工具是可执行函数，智能体可用其执行特定任务并与外部环境交互
- **C**


---

### 问题2： AI 智能体如何将工具作为"行动"在环境中使用？


**选项**

- A. 通过被动等待用户指令
- B. 仅使用预编程响应
- C. 在适当时要求 LLM 生成工具调用代码并代表模型运行工具

**答案解析**

- **A**
- **B**
- **C（正确答案）** — 智能体可调用工具，并根据获得的信息进行规划与重新规划


---

### 问题3：什么是大语言模型（LLM）？


**选项**

- A. 使用预定义答案进行回复的简单聊天机器人
- B. 通过大量文本训练的深度学习模型，能理解并生成类人语言
- C. 遵循严格预定义命令的基于规则 AI


---

### 问题4：以下哪项最能描述特殊标记（special tokens）在 LLMs 中的作用？


**选项**

- A. 存储在模型词汇表中用于提升文本生成质量的附加词汇
- B. 用于实现特定功能，例如标记序列结束（EOS）或区分聊天模型中的不同消息角色
- C. 随机插入用于提高响应多样性的标记


---

### 问题5： AI 聊天模型如何处理用户消息的内部流程？


**选项**

- A. 直接将消息作为结构化命令解析且不做转换
- B. 通过将系统消息、用户消息和助手消息拼接成格式化提示
- C. 根据历史对话随机生成响应


---


都明白了吗？很好！现在让我们**深入完整的智能体流程，开始构建你的第一个 AI 智能体！**
