---
title: "大模型应用开发 -上下文工程与运行空间实践指南"
landing: true
tier: 2
sourceId: "10-context-memory/practical-guide-context-engineering"
sourceTitle: "大模型应用开发 -上下文工程与运行空间实践指南"
sourceKind: "工程手册"
licenseLabel: "仅引用"
lang: "中文"
volume: "10-context-memory"
sourceUrl: "https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering"
entryUrl: "https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/README.md"
sourceRel: ""
contentMode: "local-full"
zh: ""
---

# 大模型应用开发 -上下文工程与运行空间实践指南

&emsp;&emsp;上下文工程（Context Engineering）正是在这样的背景下提出的一种系统化方法论。它关注如何在有限的上下文窗口中，选择、组织并注入与用户任务高度相关的信息，从而让大模型在合理的边界内做出最佳推理与执行。

## 课时

- **📖 内容导航**
  - **一、全局认知**
    - [上下文工程](/lib/10-context-memory/practical-guide-context-engineering/docs-概述-上下文工程.md)
    - [Harness Engineering](/lib/10-context-memory/practical-guide-context-engineering/docs-概述-Harness_Engineering.md)
    - [基于上下文工程的 Agent 后端设计](/lib/10-context-memory/practical-guide-context-engineering/docs-前言-从零到一_基于上下文工程的_Agent_后端设计.md)
  - **二、大模型应用开发基础技术**
    - [RAG 策略](/lib/10-context-memory/practical-guide-context-engineering/docs-RAG技术-RAG策略-.md)
    - [搜索代理](/lib/10-context-memory/practical-guide-context-engineering/docs-搜索代理-搜索代理.md)
    - [为你的Agent集成Skill系统](/lib/10-context-memory/practical-guide-context-engineering/docs-工具管理模块-为你的Agent集成Skill系统.md)
  - **三、上下文核心模块**
    - [工具管理概述](/lib/10-context-memory/practical-guide-context-engineering/docs-工具管理模块-工具管理.md)
    - [工具调度与权限模块的开发](/lib/10-context-memory/practical-guide-context-engineering/docs-工具管理模块-工具调度与权限模块的开发.md)
    - [Bash工具实现和安全权限设计细节](/lib/10-context-memory/practical-guide-context-engineering/docs-工具管理模块-Bash工具实现和安全权限设计细节.md)
    - [Agent Bash 工具工程化：后台运行与沙盒权限设计](/lib/10-context-memory/practical-guide-context-engineering/docs-工具管理模块-Agent_Bash_工具工程化_后台运行与沙盒权限设计.md)
    - [Agent文件检索核心：Grep和Glob工具的详细设计](/lib/10-context-memory/practical-guide-context-engineering/docs-工具管理模块-Agent文件系统检索核心_Grep和Glob工具.md)
    - [Write和Edit工具的实现细节](/lib/10-context-memory/practical-guide-context-engineering/docs-工具管理模块-Write和Edit工具的实现细节.md)
    - [ClaudeCode逆向工程（Kode）的工具定义和管理](/lib/10-context-memory/practical-guide-context-engineering/docs-工具管理模块-ClaudeCode逆向工程_Kode_的工具定义和管理_-TS版本.md)
    - [助手Agent记忆模块的设计](/lib/10-context-memory/practical-guide-context-engineering/docs-记忆模块-助手Agent记忆模块的设计.md)
    - [Redis缓存后端存储设计-读穿｜写穿](/lib/10-context-memory/practical-guide-context-engineering/docs-会话存储模块-Redis缓存后端存储设计-读穿_写穿.md)
    - [多后端存储设计-备份降级策略](/lib/10-context-memory/practical-guide-context-engineering/docs-会话存储模块-多后端存储设计-备份降级策略/index.md)
    - [JSON结构化输出的方法](/lib/10-context-memory/practical-guide-context-engineering/docs-结构化输出模块-JSON结构化输出的方法.md)
    - [LLM输出格式成本：为什么JSON比TSV成本更高](/lib/10-context-memory/practical-guide-context-engineering/docs-结构化输出模块-LLM_输出格式成本_为什么_JSON_比_TSV_成本更高.md)
    - [学习和整理PI的LLM模块设计](/lib/10-context-memory/practical-guide-context-engineering/docs-LLM模块-学习和整理PI的LLM模块.md)
    - [LLM服务层的实现设计](/lib/10-context-memory/practical-guide-context-engineering/docs-LLM模块-LLM服务层的实现设计.md)
    - [Cipher的LLM 服务架构分析文档](/lib/10-context-memory/practical-guide-context-engineering/docs-LLM模块-Cipher的LLM_服务架构分析文档_-TS版本.md)
  - **四、上下文管理：跨模块的全局策略**
    - [上下文管理策略](/lib/10-context-memory/practical-guide-context-engineering/docs-上下文管理-上下文管理.md)
    - [上下文压缩调度：工具裁剪与历史记录压缩](/lib/10-context-memory/practical-guide-context-engineering/docs-上下文管理-上下文压缩调度_工具裁剪与历史记录压缩.md)
    - [上下文压缩指令：ClaudeCode与Gemini的压缩指令解析](/lib/10-context-memory/practical-guide-context-engineering/docs-上下文管理-上下文压缩指令_ClaudeCode与Gemini的压缩提示词解析.md)
    - [Token 压缩策略](/lib/10-context-memory/practical-guide-context-engineering/docs-上下文管理-Token压缩策略.md)
  - **五、Agent 运行空间**
    - [两种世界的交互形态：协同Agent与自主Agent](/lib/10-context-memory/practical-guide-context-engineering/docs-Agent形态-两种世界的交互形态_协同Agent与自主Agent.md)
    - [智能体系统构建策略：单智能体和多智能体](/lib/10-context-memory/practical-guide-context-engineering/docs-Agent形态-智能体系统构建策略-单智能体和多智能体.md)
    - [多智能体的协作方式-Agent Team和Agent Room](/lib/10-context-memory/practical-guide-context-engineering/docs-Agent形态-多智能体的协作方式-Agent_Team和Agent_Room.md)
    - [Agent的评估](/lib/10-context-memory/practical-guide-context-engineering/docs-Agent评估-Agent的评估.md)
    - [实现Agent的评估器-TS版本](/lib/10-context-memory/practical-guide-context-engineering/docs-Agent评估-实现Agent的评估器-TS版本.md)
    - [揭秘 AI 代理的评估 - 多种Agent的评估方法](/lib/10-context-memory/practical-guide-context-engineering/docs-Agent评估-评估多种类型Agent的方法.md)
    - [定时任务与KAIROS模式](/lib/10-context-memory/practical-guide-context-engineering/docs-Agent运行空间-让Agent从被动变为主动_定时任务和KAIROS模式.md)
    - [给Agent接入Browser-use的设计思路](/lib/10-context-memory/practical-guide-context-engineering/docs-Agent运行空间-给Agent接入Browser_use的设计思路.md)
  - **六、实践与案例**
    - [ReasonCode 项目介绍](/lib/10-context-memory/practical-guide-context-engineering/docs-ReasonCode开发设计文档-首页_ReasonCode项目介绍.md)
    - [AI协作编码 - Anthropic 黑客马拉松冠军 - ClaudeCode配置整理和补充](/lib/10-context-memory/practical-guide-context-engineering/docs-AI协作编码与上下文工程-Anthropic_黑客马拉松冠军-_ClaudeCode配置整理和补充.md)
    - [编程Agent的工程实践：来自OpenAI与Anthropic的实战经验](/lib/10-context-memory/practical-guide-context-engineering/docs-AI协作编码与上下文工程-编程Agent的工程实践_来自OpenAI与Anthropic的实战经验.md)
    - [构建ClaudeCode的经验教训：我们如何运行Skills.md](/lib/10-context-memory/practical-guide-context-engineering/docs-AI协作编码与上下文工程-构建ClaudeCode的经验教训_我们如何运行Skills.md)
  - **附录**
    - [更新日记](/lib/10-context-memory/practical-guide-context-engineering/docs-更新日记-更新日记.md)
- **🤝 如何贡献**
  - [详细贡献指南](/lib/10-context-memory/practical-guide-context-engineering/贡献指南.md)
- **文档**
  - [大模型应用开发 -上下文工程与运行空间实践指南](/lib/10-context-memory/practical-guide-context-engineering/docs-guide.md)
  - **会话存储模块**
    - [大模型应用开发 -上下文工程与运行空间实践指南](/lib/10-context-memory/practical-guide-context-engineering/docs-会话存储模块-多后端存储设计-备份降级策略/01-一_为什么需要多后端.md)
    - [大模型应用开发 -上下文工程与运行空间实践指南](/lib/10-context-memory/practical-guide-context-engineering/docs-会话存储模块-多后端存储设计-备份降级策略/02-二_架构设计.md)
    - [大模型应用开发 -上下文工程与运行空间实践指南](/lib/10-context-memory/practical-guide-context-engineering/docs-会话存储模块-多后端存储设计-备份降级策略/03-三_工作原理.md)
    - [大模型应用开发 -上下文工程与运行空间实践指南](/lib/10-context-memory/practical-guide-context-engineering/docs-会话存储模块-多后端存储设计-备份降级策略/04-四_主备数据库同步.md)
    - [大模型应用开发 -上下文工程与运行空间实践指南](/lib/10-context-memory/practical-guide-context-engineering/docs-会话存储模块-多后端存储设计-备份降级策略/05-五_代码层实现细节.md)
    - [大模型应用开发 -上下文工程与运行空间实践指南](/lib/10-context-memory/practical-guide-context-engineering/docs-会话存储模块-多后端存储设计-备份降级策略/06-六_最佳实践.md)
- **record**
  - [大模型应用开发 -上下文工程与运行空间实践指南](/lib/10-context-memory/practical-guide-context-engineering/record-README_Table.md)

开始学习 → [两种世界的交互形态：协同Agent与自主Agent](docs-Agent形态-两种世界的交互形态_协同Agent与自主Agent.md)
