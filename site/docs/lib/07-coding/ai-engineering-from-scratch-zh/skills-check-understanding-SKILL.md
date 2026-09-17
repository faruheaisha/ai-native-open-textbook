---
title: "检查理解程度"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/skills/check-understanding/SKILL.md"
sourceRel: "skills/check-understanding/SKILL.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/skills/check-understanding/SKILL.md"
sourceSha256: "f7c341b72ca05a5a9ef0c22eb97d89a54882633e6fd6c734391e3eda00529f8f"
pageSha256: "f7c341b72ca05a5a9ef0c22eb97d89a54882633e6fd6c734391e3eda00529f8f"
contentMode: "local-full"
zh: ""
---

# 检查理解程度

测试学习者对 AI Engineering from Scratch 已完成阶段的掌握情况。

## 触发方式

当用户说出类似下面的话时启用此 skill：

- `/check-understanding 3` 或 `/check-understanding deep-learning`
- “测验一下我对第 2 阶段的掌握情况”
- “测试第 1 阶段”
- “检查我对 transformer 的理解”
- “我掌握第 3 阶段了吗”
- “我准备好进入下一阶段了吗”

## 输入

接受阶段编号（0-19）或阶段名称作为参数。如果没有参数，列出全部 20 个阶段，并询问用户希望测试哪一阶段。

## 阶段映射

将参数映射到 `phases/` 下正确的阶段目录：

| 输入 | 目录 | 阶段名称 |
|-------|-----------|------------|
| 0, setup, tooling | `00-setup-and-tooling` | 环境设置与工具 |
| 1, math, math-foundations | `01-math-foundations` | 数学基础 |
| 2, ml, ml-fundamentals | `02-ml-fundamentals` | 机器学习基础 |
| 3, deep-learning, dl | `03-deep-learning-core` | 深度学习核心 |
| 4, cv, computer-vision, vision | `04-computer-vision` | 计算机视觉 |
| 5, nlp | `05-nlp-foundations-to-advanced` | NLP：从基础到进阶 |
| 6, speech, audio | `06-speech-and-audio` | 语音与音频 |
| 7, transformers | `07-transformers-deep-dive` | Transformer 深入剖析 |
| 8, generative, gen-ai, genai | `08-generative-ai` | 生成式 AI |
| 9, rl, reinforcement-learning | `09-reinforcement-learning` | 强化学习 |
| 10, llms, llm, llms-from-scratch | `10-llms-from-scratch` | 从零构建 LLM |
| 11, llm-engineering, llm-eng | `11-llm-engineering` | LLM 工程 |
| 12, multimodal | `12-multimodal-ai` | 多模态 AI |
| 13, tools, protocols, mcp | `13-tools-and-protocols` | 工具与协议 |
| 14, agents, agent-engineering | `14-agent-engineering` | Agent 工程 |
| 15, autonomous | `15-autonomous-systems` | 自主系统 |
| 16, multi-agent, swarms | `16-multi-agent-and-swarms` | 多 Agent 与群体 |
| 17, infrastructure, production, infra | `17-infrastructure-and-production` | 基础设施与生产环境 |
| 18, ethics, safety, alignment | `18-ethics-safety-alignment` | 伦理、安全与对齐 |
| 19, capstone, projects | `19-capstone-projects` | 综合项目 |

## 流程

### 第 1 步：解析阶段

解析参数。若为数字，验证它是否在 0 到 19（含）之间。数字超出范围时，告诉用户：`阶段 [N] 不存在。有效阶段为 0-19。`然后展示完整列表供其选择。若为名称或关键词，在上方阶段映射中查找。关键词不匹配任何条目时，告诉用户：`未知阶段“[keyword]”。请从下面列表中选择：`，并展示全部 20 个阶段。未提供参数时，要求用户从完整列表中选择。

### 第 2 步：读取阶段内容
