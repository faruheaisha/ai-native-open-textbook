---
source_id: SRC-HARNESS-CONTEXT-BOUNDARY-CN
title: Harness 与上下文工程的边界：中文社区的一手论证 + OpenAI/Anthropic 工程实践的可追溯转述
publisher: WakeUp-Jin（个人作者）
source_tier: T2
source_type: community_engineering_guide
canonical_url: https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering
published_at: 持续更新（快照 2026-07-15 最后推送）
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: 首次收录
status: accepted
license: 未声明（仓库仅 NOTICE.txt，无 LICENSE）
rights_status: cite_only
language: 中文
---

# Source Record：Harness 与上下文工程的边界

## 为什么重要

本项目有一项长期未决问题：**卷 09（Harness）与卷 10（上下文工程）的边界怎么画**。此前只能靠 Fowler 把 context engineering 定位为 harness 的关系项这一条英文线索。本来源同时提供了三样东西：

1. **一条中文社区独立得出的边界论证**（与 Fowler 的方向一致但不是抄的）；
2. **对"驾驭/马具"隐喻的系统性反对**（与《御舆》正面冲突）；
3. **OpenAI 与 Anthropic 两篇工程实践的可追溯中文转述**——2026-09-10 之前，这是卷 09 唯一能拿到该两家原文内容的路径。**第六批起 Anthropic 侧已解除（原文落盘）；OpenAI 侧部分解除（官方 harness 定义文已落盘，`openai.com/index/harness-engineering/` 单篇仍 403）。**

## 1. 基本事实

| 项 | 值 |
|---|---|
| 仓库 | `WakeUp-Jin/Practical-Guide-to-Context-Engineering` |
| Stars | 759（2026-09-10 观测） |
| 推送 | 2026-07-15 |
| 许可 | **无 LICENSE**（实读：仅 `NOTICE.txt`；另有一份 `贡献指南.md`） |
| 快照 commit | `ec349a470e2992adc1d98899a46cb085839c0676` |
| 规模 | 46 个文件；6 万+ 字正文 + 大量原创配图（图未镜像） |
| 目录 | `docs/` 下分：概述 / 工具管理模块 / 会话存储模块 / 记忆模块 / 结构化输出模块 / 上下文管理 / 搜索代理 / Agent 评估 / Agent 形态 / Agent 运行空间 / AI 协作编码与上下文工程 / LLM 模块 / RAG 技术 |

## 2. 核心论证：harness 不做"束缚"，做"边界与协作协议"

原文要点（实读）：

- 反方（"马具说"）：*"Harness 这个词直译是'马具'。一匹马很强壮，但没有马鞍、缰绳、马镫，你骑不了它。"*
- 作者的反对理由：以 workflow 搭 agent 时，"这套骨架被搭建得太清晰了，以至于 Agent 运行只能沿着骨架行走……只能算是勉强够用，但是并不能发挥模型潜力和自主性"；且"随着模型的升级迭代，这套'骨架'反而成为了限制，而不再是帮助"。
- 作者的正面定义（可直接引用）：

  > **"Harness Engineering 真正在做的事情是定义边界和协作协议，而不是控制每一步的执行。"**
  >
  > **"它不是在限制模型能做什么，而是在创造条件让模型能做到原本做不到的事。"**

- 作者同时承认 workflow 的历史价值："Workflow 是有意义的，是作为整个大模型应用开发工程历史中关键的一环。"

## 3. 边界论证：harness 是上下文工程的"相关上下文"

作者的推导链：

1. 把完整的上下文拆成若干类型：系统提示词、用户记忆、工具定义与输出、会话历史记录、结构化输出、用户输入。
2. 承认其中有一类自己始终讲不清——**"相关上下文"**，其特征是"变动性最大，每一个 Agent 或许都有属于自己独特的相关上下文模块设计的架构"。
3. 结论：**"相关上下文就是 Context Engineering 和 Harness Engineering 的通道，也就是 Harness Engineering 的源头"**；各产品/任务的 harness 差异，本质是相关上下文的不同表现。

→ **对卷 09/10 边界的含义**：该来源支持"harness 是上下文工程在具体运行空间中的实现层"这一读法，而不是两个并列学科。这与前批记录的 Fowler 判断同向，可作为重画边界的第二条独立证据。

## 4. OpenAI harness engineering 的可追溯转述（**转述，非原文**）

原文链接（作者给出）：`https://openai.com/zh-Hans-CN/index/harness-engineering/` —— 存在官方中文版的迹象。

**背景（转述）**：OpenAI 团队做的是"构建并发布一个没有使用任何手写代码的内部测试版软件产品"，因此需要为 Codex 构建可长期可靠运行的 harness；团队工作"不再是编写代码，而是设计环境、明确意图并构建反馈循环"。产出：几周内交付百万行代码的项目，且已被数百名内部用户使用。

**五步（转述，本项目重新表述）**：

| 步骤 | 做法 | 对应的工程原则 |
|---|---|---|
| 1 三层代码审查 | 自身审查 → 本地代码审查 Agent → 云端代码审查 Agent；全部通过才进入下一步，否则把审查结果作为上下文注入回 Codex | 反馈回路 |
| 2 人工质量检查（Human QA） | 接入 Chrome DevTools 协议，让 Codex 能读 DOM 快照、截图、导航，从而"看得见" UI | 给 agent 补齐感官 |
| 3 日志与性能 | 把运行日志、性能指标作为上下文输入，使性能优化基于观测而非对代码结构的猜测（实践 → 观察 → 修改） | 观测驱动 |
| 4 代码文档库 | 文档库太大，不能一次注入；以 `AGENTS.md` 充当目录（存路径 + 简述），把"是否读取、读什么"交给 Codex 决定；把计划文档当一等公民，另有设计/架构/质量文档；并设"文档维护 Agent"定期扫描清理 | 渐进式披露 |
| 5 代码库结构性规则 | 例如新增功能的顺序约束"类型 → 配置 → 存储库 → 服务 → 运行时 → 用户界面"，由 Codex 自己编写的自定义检查器来校验 | 结构约束 |

**可直接引用的原句（中文译）**：*"软件开发仍然需要严谨的纪律，但这种严谨更多地体现在框架搭建而非代码本身。用于保持代码库一致性的工具、抽象和反馈循环变得越来越重要。"*

**作者提炼的三条通则**：① 每个步骤都要能提供执行反馈；② 面向具体场景时约束控制有效；③ 给 agent 更多有效上下文的最佳实践目前是"文档渐进式加载"。

## 5. Anthropic 实践（**2026-09-10 起已解除转述：改用原文**）

> **状态变更（2026-09-10 第六批）**：`anthropic.com/engineering/harness-design-long-running-apps` 与 `effective-harnesses-for-long-running-agents` 两篇**原文已落盘**（`upstream/09-harness/anthropic-engineering-blog/`）。本节原有的中文转述**降级为对照材料**，卷 09 引用时**改用原文并署 Anthropic 原文**，不再标注"经中文社区转述"。
> 原文一手细节见 Source Record：`SRC-ANTHROPIC-ENGINEERING.md`。

本节保留的转述（供比对转述与原文的差异）：

- **架构**：任务初始化 Agent + 编码智能体，两层多智能体。→ 原文实为 **Planner / Generator / Evaluator 三 Agent**（`harness-design-long-running-apps`），另有更早的 initializer + coding 两段式（`effective-harnesses-for-long-running-agents`）。**转述只覆盖了较早的那一层。**
- **故障模式一**：随上下文窗口填满失去连贯性；部分模型表现出"上下文焦虑"（原文点名 Sonnet 4.5）→ **上下文重置** + 结构化交接。→ **与原文一致。**
- **故障模式二**：Agent 自评时"自信地给予高度赞扬"，导致评估模块失效 → **评估者与执行者分离**。→ **与原文一致。**

> **转述链暴露的问题**：转述准确复现了两个失败模式，但**丢失了三 Agent 架构与 sprint contract**——而 sprint contract 恰是「harness 隐喻」读法 B 最关键的一手证据。这说明转述可用于"确认方向"，但**不能替代原文做机制描述**。

原文链接：`https://www.anthropic.com/engineering/harness-design-long-running-apps`

- **架构**：任务初始化 Agent + 编码智能体，两层多智能体。
- **故障模式一**：随上下文窗口填满，模型失去连贯性，部分模型表现出"上下文焦虑"（原文点名 Sonnet 4.5）。
  → **处置：上下文重置**——完全清除上下文（而非仅依赖压缩），启动新 Agent，并以**结构化交接**传递前一 Agent 的状态与后续步骤。
- **故障模式二**：让 Agent 评估自己生成的作品时，往往自信地给予高度赞扬，导致评估模块失效。
  → **处置：评估者与执行者分离**（不要用同一个 Agent 既做又评）。

## 6. 使用约束与风险标注

- **§4（OpenAI）仍含转述**：`openai.com/index/harness-engineering/` 单篇至今 403。卷 09 若引用其**五步法**，必须标注为"经中文社区转述整理"，**不得署为 OpenAI 原文结论**。
  - **但 OpenAI 对 harness 的官方定义已取得原文**（第六批）：`developers.openai.com/blog/codex-as-a-platform.md`。**正文的 harness 定义句应改用该文**，只有五步法继续标注转述。
- **§5（Anthropic）已解除转述**：两篇原文已落盘，**引用时改署 Anthropic 原文**，不再标注转述。本节保留的转述文本仅作"转述 vs 原文"的比对样本。
- **转述链教训（已记录）**：§5 的转述准确复现了两类失败模式，却**丢失了三 Agent 架构与 sprint contract**。→ 规则：转述可用于确认方向，**不得用于机制描述**。
- 仓库**无 LICENSE** → 只可索引与引用，不得改编正文。
- 配图未镜像；引用图表须回原仓库取图并单独核权。
- 采纳状态：`accepted` 用于**边界论证与隐喻分歧**；`§4` 的使用条件为"标注转述来源"，`§5` 已解除转述限制。

## 7. 关联

- 冲突来源：[`SRC-CLAUDE-CODE-BOOK-YUYU.md`](SRC-CLAUDE-CODE-BOOK-YUYU.md)
- 原文时间线：[`SRC-HARNESS-ENGINEERING-ORIGIN.md`](SRC-HARNESS-ENGINEERING-ORIGIN.md)
- 决策项：`课程设计基线/04-待验证与决策队列.md` 中的 harness 译名与卷 09/10 边界
