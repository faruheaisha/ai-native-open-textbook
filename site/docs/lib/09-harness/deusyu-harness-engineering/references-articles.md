---
title: "文章索引"
sourceId: "09-harness/deusyu-harness-engineering"
sourceTitle: "Harness Engineering 学习指南"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deusyu/harness-engineering"
entryUrl: "https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/README.md"
zh: ""
---

# 文章索引

> **本文件是文章索引与计数的唯一权威源（single source of truth）。**
>
> **计数规则（machine-checkable）：**
> 一篇文章 = 一个 `### N. {标题}` 形式的编号小节，且不属于本文末尾的"已跟踪产品 / 项目"段落。
> 占位条目（"未找到 / 待补充"）**不写在编号正文里**，而是统一进 `references/AGENTS.md` 的"待补充"列表，避免污染计数。
> 全局连续编号（不按脉络重置），最大编号 = 文章总数。
>
> **下游引用都是本文的冗余缓存：** 根 `README.md` / `README.en.md` 的 badge、`prompts/deep-research-tracker.md` 的去重清单、`references/AGENTS.md` 的概览表。
> 新增/删除文章时，必须**同一次提交**更新本文 + 所有下游缓存。
>
> 当前规模：**79 篇文章**（脉络一 75 + 脉络二 2 + 脉络三 2）+ **1 项已跟踪产品**（不计入文章数）。最近一次同步：2026-08-27。

## 脉络一：AI 时代的 Harness Engineering（大模型护栏与认知工程）

### 1. OpenAI 官方 — 原点与哲学

- **标题：** Harness engineering: leveraging Codex in an agent-first world
- **链接：** [openai.com](https://openai.com/zh-Hans-CN/index/harness-engineering/)
- **作者：** Ryan Lopopolo | **日期：** 2026-02-11
- **核心：** 3 人团队用 Codex 从空仓库到 100 万行代码，零手写代码。提出六大概念：仓库即记录系统、地图而非手册、机械化执行、智能体可读性、吞吐量改变合并理念、熵管理。
- **关联：** 本仓库的学习起点，所有概念笔记的来源

### 2. Martin Fowler / Birgitta Böckeler — 系统性认知与控制论框架

- **标题：** Harness engineering for coding agent users
- **链接：** [martinfowler.com](https://martinfowler.com/articles/harness-engineering.html)
- **翻译：** [works/fowler-harness-engineering-full-translation.md](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/fowler-harness-engineering-full-translation.md)
- **前传备忘录：** [first thoughts](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering-memo.html) | **备忘录翻译：** [works/fowler-harness-engineering-memo-translation.md](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/fowler-harness-engineering-memo-translation.md)
- **作者：** Birgitta Böckeler (Thoughtworks) | **日期：** 2026-04-02（备忘录 2026-02-17）
- **核心：** 控制论视角的 harness 框架——Guides（前馈）× Sensors（反馈）+ Computational（计算性）× Inferential（推理性）的 2×2 矩阵，三个规制维度，Ashby 必要多样性定律

- **核心框架：Guides × Sensors + Computational × Inferential**

|  | 计算性（确定性，CPU） | 推理性（语义，LLM） |
|--|---------|---------|
| **引导器（前馈）** | bootstrap 脚本、OpenRewrite、LSP | AGENTS.md、Skills、architecture.md |
| **传感器（反馈）** | linter、ArchUnit、类型检查、覆盖率 | AI code review、LLM-as-judge |

- **关键原则：**
  - 单独用任何一种都不行——只有反馈 = 反复犯同样的错；只有前馈 = 不知道规则是否生效
  - 计算性控制便宜、确定、每次提交都跑；推理性控制昂贵、概率性、不是每次都跑
  - Harness engineering 是 context engineering 的一种特定形式

- **三个规制维度：**

| 维度 | 成熟度 | 现状 |
|------|--------|------|
| 可维护性 Harness | 最成熟 | 计算性传感器可靠捕获结构问题；LLM 部分解决语义问题；**两者都无法可靠捕获**：误诊、过度工程、误解指令 |
| 架构适应度 Harness | 中等 | 本质是 Fitness Functions——性能 Skills + 可观测性规范 |
| 行为 Harness | **最弱** | "房间里的大象"——功能正确性验证仍依赖 AI 生成的测试，"目前还不够好" |

- **Harnessability（可驾驭性）：**
  - 不是所有代码库都同样适合被 harness
  - 强类型语言天然有类型检查传感器；清晰模块边界支持架构约束；成熟框架（如 Spring）隐式提高成功概率
  - **Ambient Affordances**（Ned Letcher）：环境本身的结构属性使智能体更容易操作
  - 绿地项目可以从第一天融入；遗留系统 = **harness 最需要的地方恰恰是最难构建的地方**

- **Harness 模板：**
  - 企业 80% 的服务可归入几种常见拓扑（API 服务、事件处理、数据仪表板）
  - 服务模板 → harness 模板：引导器 + 传感器的集合，约束智能体到特定拓扑
  - 会面临和服务模板一样的分叉/同步挑战，甚至更严重（非确定性组件更难测试）

- **Ashby 必要多样性定律：**
  - 调节器必须至少拥有与被调节系统同等的多样性
  - LLM 能生成几乎任何东西（高多样性）→ 选定拓扑 = 削减多样性 → 全面 harness 变得可行
  - 定义拓扑结构本身就是一种多样性削减举措

- **人类角色的重新定位：**
  - 人类开发者携带隐性 harness：社会问责感、对复杂性的审美痛感、组织记忆、"我们这里不这么做"的直觉
  - 智能体没有这些——不知道哪个规范是承重的、哪个只是习惯
  - **"好的 harness 不应以完全消除人类输入为目标，而应将人类输入引导到最重要的地方"**

- **质量左移（Shift Quality Left）：**
  - 按速度和成本分布检查：pre-commit 跑便宜传感器，管线跑昂贵传感器
  - 持续漂移传感器：死代码检测、覆盖率质量、依赖扫描、SLO 退化

- **开放挑战：**
  - Harness 连贯性：引导器和传感器增长后可能相互矛盾
  - Harness 覆盖率：类似代码覆盖率，评估 harness 自身的完整性
  - 传感器从未触发时，如何区分高质量 vs 检测不足

- **备忘录独有洞察（正式版未保留）：**
  - "OpenAI 有既得利益让我们相信 AI 可维护的代码"——对数据来源的信任保留
  - "你今天的 harness 是什么？"——务实的起步问题，审视已有实践
  - "代码设计本身就是上下文的重要组成部分"——比框架更本质
  - 最后自嘲预言"harness"一词会被滥用

- **与其他文章的关联：**

| 本文概念 | 对应文章 |
|---------|---------|
| Guides × Sensors 矩阵 | 对 LangChain 组件清单和 HumanLayer 六杠杆的升维——从"有什么"到"如何协同" |
| 行为 Harness 是大象 | 回应自己备忘录中的批评：OpenAI 缺少功能验证 |
| Harnessability | OpenAI 的"无聊技术"选择标准的理论化 |
| Ashby 定律 | 为 Fowler 假说 2（约束越严，自主性越强）提供控制论根基 |
| Harness 模板 | 将备忘录假说 1 从问题升级为具体方案 |
| 人类角色 | 对 Anthropic #7 中人类缺位的直接回应——不应消除人类，应引导人类 |

- **延伸阅读：**
  - [Mitchell Hashimoto: My AI Adoption Journey #Step 5: Engineer the Harness](https://mitchellh.com/writing/my-ai-adoption-journey#step-5-engineer-the-harness)（已升格为 #29）
  - [Context Engineering for Coding Agents](https://martinfowler.com/articles/context-engineering-coding-agents.html)
  - [Humans and Agents in Software Engineering Loops](https://martinfowler.com/articles/humans-and-agents.html)

### 3. LangChain / Viv Trivedy — 解剖与机制

- **标题：** The Anatomy of an Agent Harness
- **链接：** [blog.langchain.com](https://blog.langchain.com/the-anatomy-of-an-agent-harness/)
- **作者：** Vivek Trivedy | **日期：** 2026-03
- **核心：** 给出 harness 的精确定义和完整组件清单

> **Agent = Model + Harness**。Harness = 模型之外的一切代码、配置和执行逻辑。

- **组件清单：**
  - System Prompts / Tools / Skills / MCP
  - 沙箱基础设施（文件系统、浏览器）
  - 编排逻辑（子智能体、handoff、模型路由）
  - Hooks/中间件（compaction、续接、lint 检查）
- **关键洞察：**
  - **Context Rot** — 上下文填满后性能退化，需要 compaction + 工具输出卸载 + 渐进式披露
  - **Ralph Loop** — 拦截退出、重注入提示词、强制在新上下文窗口中继续
  - **Harness 与模型训练耦合** — 模型会 overfit 到特定 harness，换 harness 表现可能暴跌（Terminal Bench 2.0：纯 harness 优化可把排名从 Top 30 拉到 Top 5）

### 4. Anthropic / Prithvi Rajasekaran — Harness 设计实战（长时自主编码）

- **标题：** Harness design for long-running application development
- **链接：** [anthropic.com](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- **作者：** Prithvi Rajasekaran (Anthropic Labs) | **日期：** 2026-03-24
- **核心：** Anthropic 官方工程博客，GAN 启发的三智能体架构实战，从前端设计到全栈自主编码

- **两个核心问题：**
  1. **Context Anxiety** — 模型接近上下文极限时提前收尾（Sonnet 4.5 尤为明显），compaction 不够，需要 context reset
  2. **Self-Evaluation 失败** — 智能体评估自己的工作时倾向于过度称赞，即使质量平庸

- **三智能体架构（GAN 启发）：**

| 智能体 | 职责 |
|--------|------|
| Planner | 1-4 句提示词 → 完整产品规格（刻意高层级，避免细节错误向下游级联） |
| Generator | 按 sprint 逐特性实现，React + Vite + FastAPI + SQLite/PostgreSQL |
| Evaluator | 用 Playwright MCP 实际操作运行中的应用，逐条验证 sprint 合同，打分 + 写详细 critique |

- **Sprint 合同机制：**
  - 每个 sprint 前，Generator 和 Evaluator **协商**"done 长什么样"
  - Generator 提议构建内容和验证标准，Evaluator 审核
  - 双方迭代达成一致后才开始编码
  - 解决了 spec 太高层级 → 实现不可验证的 gap

- **评估标准（前端设计 4 维度）：**
  1. Design Quality — 是否有连贯的视觉身份（权重高）
  2. Originality — 是否有原创设计决策，而非 AI 模板（权重高）
  3. Craft — 排版、间距、对比度等技术执行（默认就好）
  4. Functionality — 可用性独立于美学（默认就好）

- **迭代进化（模型升级后的 Harness 瘦身）：**

| 版本 | 模型 | 架构 | 时长 | 成本 |
|------|------|------|------|------|
| Solo baseline | Opus 4.5 | 单智能体 | 20 min | $9 |
| V1 Harness | Opus 4.5 | Planner + Generator(sprint) + Evaluator(per-sprint) | ~6 hr | $200 |
| V2 Harness | Opus 4.6 | Planner + Generator(无 sprint) + Evaluator(单次 pass) | ~4 hr | $125 |

- **关键经验：**
  - **每个 harness 组件都编码了一个假设**（"模型不能独立做 X"），这些假设需要定期重新压测
  - 新模型发布后应精简 harness：去掉不再承重的部分，添加新能力
  - Evaluator 的价值取决于任务是否处于模型能力边界：边界内 → 开销浪费；边界外 → 真正有帮助
  - "有趣的 harness 组合空间不会随模型改进而缩小——它会移动"

- **与其他文章的关联：**

| Anthropic 概念 | 对应文章 |
|---------------|---------|
| Context Anxiety + Reset | LangChain 的 Context Rot + Ralph Loop |
| Self-Evaluation 失败 → 分离 Evaluator | HumanLayer 的 Sub-Agent 上下文防火墙 |
| Sprint 合同 | OpenAI 的执行计划（exec-plans） |
| 4 维度评分标准 | OpenAI 的 QUALITY_SCORE.md |
| Harness 瘦身原则 | Fowler 的"约束越严，自主性越强" |
| "找最简方案，按需增加复杂度" | HumanLayer 的"简单开始，按需添加" |

### 5. HumanLayer / Kyle — 实践与避坑

- **标题：** Skill Issue: Harness Engineering for Coding Agents
- **链接：** [humanlayer.dev](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents)
- **作者：** Kyle（HumanLayer） | **日期：** 2026-03-12
- **核心：** 最落地的一篇——六个配置杠杆 + 实战经验

- **六个杠杆：**

| # | 杠杆 | 要点 |
|---|------|------|
| 1 | AGENTS.md | 控制在 60 行以内，禁止自动生成 |
| 2 | MCP Servers | 别连不信任的，工具太多会填满上下文 |
| 3 | Skills | 渐进式加载，警惕恶意 skill |
| 4 | Sub-Agents | 上下文防火墙，隔离任务防 context rot |
| 5 | Hooks | 生命周期脚本，成功静默/失败报错 |
| 6 | Back-Pressure | 测试/构建/类型检查 = 自我验证回路 |

- **实战经验：**

| 无效 | 有效 |
|------|------|
| 预设理想配置 | 简单开始，按需添加 |
| 装一堆 skill/MCP "以防万一" | 团队间分发验证过的配置 |
| 每次改动跑全量测试 | 优化迭代速度而非首次成功率 |
| 微调子智能体的工具权限 | 便宜模型做子任务，贵模型做编排 |

- **金句：** "The model is probably fine. It's just a skill issue."

### 6. Anthropic / Lance Martin — 三大模式与性能数据

- **标题：** Harnessing Claude's intelligence
- **链接：** [claude.com](https://claude.com/blog/harnessing-claudes-intelligence)
- **作者：** Lance Martin (Claude Platform Team) | **日期：** 2026-04-02
- **核心：** 三个构建模式——利用 Claude 已知知识、追问"我可以停止做什么"、谨慎设定边界。配合 BrowseComp / Pokemon 等基准数据论证

- **三大模式：**

| 模式 | 核心主张 |
|------|---------|
| Use what Claude knows | 通用工具（bash + editor）优于定制工具，随模型升级自然增强 |
| Ask "what can I stop doing?" | 把编排、上下文管理、持久化三个决策权从 harness 交给模型 |
| Set boundaries carefully | 缓存优化（静态前置）+ 声明式工具提供安全门控与可观测性 |

- **"停止做什么"的三个层次：**

| 层次 | 旧假设 | 新做法 | 数据支撑 |
|------|--------|--------|---------|
| 编排 | 所有工具结果回流上下文 | 给 Claude 代码执行工具，让它自己过滤/管道 | BrowseComp: Opus 4.6 过滤能力 45.3% → 61.6% |
| 上下文管理 | 手工预加载任务指令 | Skills 渐进式披露 + context editing 移除过时内容 + 子 Agent 隔离 | BrowseComp: 子 Agent 提升 2.8% |
| 持久化 | 依赖外部检索基础设施 | Compaction（模型自主总结）+ Memory folder（模型自主写文件） | BrowseComp: Opus 4.6 compaction 达 84%；BrowseComp-Plus: memory folder +6.8% |

- **缓存优化五原则：**

| 原则 | 说明 |
|------|------|
| 静态在前，动态在后 | 稳定内容（系统提示词、工具）放前面 |
