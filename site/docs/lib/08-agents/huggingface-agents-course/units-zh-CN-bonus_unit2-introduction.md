---
title: "AI 智能体(AI Agent)的可观测性与评估"
sourceId: "08-agents/huggingface-agents-course"
sourceTitle: "Hugging Face Agents Course（智能体课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/huggingface/agents-course"
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/bonus_unit2/introduction.mdx"
sourceRel: "units/zh-CN/bonus_unit2/introduction.mdx"
rawUrl: "/raw/08-agents/huggingface-agents-course/units/zh-CN/bonus_unit2/introduction.mdx"
sourceSha256: "697c70b31ded96ee2170fb1d892f6832c10b49bdb64f8344adb49f1c25cf2422"
pageSha256: "697c70b31ded96ee2170fb1d892f6832c10b49bdb64f8344adb49f1c25cf2422"
contentMode: "local-full"
zh: ""
---

# AI 智能体(AI Agent)的可观测性与评估

![Bonus Unit 2 Thumbnail](https://langfuse.com/images/cookbook/huggingface-agent-course/agent-observability-and-evaluation.png)

欢迎来到 **附加单元 2**！在本章中，你将探索用于观测、评估、并最终提升你的AI智能体性能的高级策略。

---

## 📚 我应该在什么时候学习这个附加单元？

如果你符合以下情况，那么这个附加单元非常适合你：
- **开发和部署 AI 智能体：** 你希望确保你的智能体在生产环境中能够可靠地运行。
- **需要详细的洞察：** 你希望诊断问题、优化性能或理解你的智能体的内部工作原理。
- **旨在减少运营开销：** 通过监控智能体成本、延迟和执行细节，你可以高效地管理资源。
- **寻求持续改进：** 你对将实时用户反馈和自动化评估集成到你的 AI 应用中感兴趣。

简而言之，对于每个想要将他们的智能体带到用户面前的人！

---

## 🤓 你将学到什么

在本单元中，你将学习：
- **检测你的智能体：** 学习如何通过 OpenTelemetry 将可观测性工具与 *smolagents* 集成。
- **监控指标：** 追踪性能指标，例如 token 使用量（成本）、延迟和错误追踪。
- **实时评估：** 理解用于实时评估的技术，包括收集用户反馈和利用 LLM 作为评判者。
- **离线分析：** 使用基准数据集（例如 GSM8K）来测试和比较智能体性能。

---

## 🚀 准备好开始了吗？

在下一节中，你将学习智能体可观测性与评估的基础知识。之后，就该看它在实践中的应用了！
