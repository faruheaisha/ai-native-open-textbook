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
pageSha256: "953fa6f7993e73672d46dcebf700590c71caa58d09ca8cbc1d25afd466e6aa32"
contentMode: "local-full"
zh: ""
---

## Q：用户的某个需求，你会沉淀为 Skill 还是长期记忆？判断标准是什么？

> 来源：字节TikTok AI应用开发一面

**新手答**：”重复用的东西存起来，不重复的不用存。”

**高手答**：
Skill 和长期记忆是两个维度完全不同的存储机制，选择标准要从”什么类型的知识”来判断：

**核心判断维度**：

| 维度 | 沉淀为 Skill | 沉淀为长期记忆 |
|------|-------------|----------------|
| **知识类型** | 操作流程/推理模式/行为约束 | 用户偏好/事实信息/历史上下文 |
| **使用者** | 所有用户或某类任务通用 | 特定用户专属 |
| **触发方式** | 意图匹配主动加载 | 检索召回被动注入 |
| **更新频率** | 低（功能级更新） | 高（每次对话可能更新） |
| **存储形态** | Markdown 文档/Prompt 模板 | 向量库/KV 存储 |

**典型案例**：

- “用户每次写代码都喜欢加详细注释” → **长期记忆**（用户个性化偏好，每次写代码时召回注入）
- “处理 SQL 注入问题的标准排查步骤” → **Skill**（通用操作流程，遇到安全类任务时加载）
- “用户的项目使用 PostgreSQL + FastAPI 技术栈” → **长期记忆**（用户上下文，每次技术问题时提供）
- “回答法律问题时必须加免责声明” → **Skill**（行为约束，法律意图触发时强制加载）

**边界模糊时的判断原则**：
1. **个性化程度**：越个性化（跟这个用户强绑定）越应该是记忆，越通用越应该是 Skill
2. **是否需要推理**：如果存储的内容本身包含”如何处理”的逻辑，是 Skill；如果只是”事实或偏好”，是记忆
3. **更新触发点**：用户行为更新 → 记忆；工程师迭代 → Skill

**差距在哪**：面试官考的是你对 Skill 和记忆这两个抽象的本质理解——不是”都存起来”，而是理解它们在 Agent Runtime 里扮演的角色不同（行为约束 vs 上下文注入），从而做出正确的架构决策。
