---
source_id: SRC-HARNESS-ENGINEERING-ORIGIN
title: Harness Engineering 定义真源（Hashimoto 提出 → OpenAI 普及 → Fowler 概念化 → arXiv 形式化）
publisher: Mitchell Hashimoto / OpenAI / martinfowler.com / arXiv
author: Mitchell Hashimoto；Ryan Lopopolo（OpenAI）；Birgitta Böckeler（Thoughtworks）；Nghi D. Q. Bui（arXiv）
source_tier: T2 / T1 / T2 / T1
source_type: origin_timeline
canonical_url: https://mitchellh.com/writing/my-ai-adoption-journey
published_at: 2025-11-26 … 2026-04-02（见时间线）
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: 站点快照 5 篇已落盘（2026-09-10 第六批补入 Anthropic 原文与 OpenAI 官方 harness 定义文）
status: accepted
license: 未声明（均为站点文章/预印本），cite_only
rights_status: cite_only
language: 英文
---

# Source Record：Harness Engineering 定义真源

> 本记录已由 2026-09-10 的第三轮检索**全面修订**。第一版误把 OpenAI 当作提出者；实读原文后确认**术语由 Mitchell Hashimoto 提出**，早于 OpenAI 文章 6 天。

## 一、完整时间线（已逐条实读原文，除 OpenAI 一条）

| # | 日期 | 来源 | 作者 | 贡献 | 本地状态 |
|---|---|---|---|---|---|
| 1 | **2025-11-26** | `anthropic.com/engineering/effective-harnesses-for-long-running-agents` — "Effective harnesses for long-running agents" | Anthropic | **最早在正式工程文中使用 "harness"**（长时间运行 agent 的会话桥接） | **已落盘**（2026-09-10 第六批，`09-harness/anthropic-engineering-blog/`），内容现可直接引用 |
| 2 | **2026-02-05** | `mitchellh.com/writing/my-ai-adoption-journey` — Step 5: **Engineer the Harness** | **Mitchell Hashimoto** | **首次提出 "harness engineering" 这一名称并给出定义** | **已落盘**（HTML + 正文） |
| 3 | **2026-02-11** | `openai.com/index/harness-engineering/` — "Harness engineering: leveraging Codex in an agent-first world" | Ryan Lopopolo（OpenAI） | **普及**该术语：3 人团队、5 个月、100 万行代码、六大概念 | **该篇仍未落盘**（主站 403）。**但 2026-09-10 第六批已取得 OpenAI 官方 harness 定义原文**：`developers.openai.com/blog/codex-as-a-platform.md`（"That surrounding execution system is the harness."） |
| 4 | **2026-02-17** | `martinfowler.com/articles/exploring-gen-ai/harness-engineering-memo.html` | Birgitta Böckeler | 第一反应备忘录；**明确记录术语可能源自 Hashimoto** | **已落盘** |
| 5 | **2026-03-05**（v3 03-13） | `arxiv.org/abs/2603.05344` — "Building Effective AI Coding Agents for the Terminal: Scaffolding, Harness, Context Engineering, and Lessons Learned" | Nghi D. Q. Bui | **学术形式化**：提出 OPENDEV（Rust 命令行编码 agent） | **已落盘**（摘要 + HTML） |
| 6 | **2026-04-02** | `martinfowler.com/articles/harness-engineering.html` — "Harness engineering for coding agent users" | Birgitta Böckeler | **概念化**：guides/sensors 框架、三类 harness 模板 | **已落盘** |
| 7 | 持续 | `github.com/lopopolo/harness-engineering`（2,684★，CC-BY-4.0） | Ryan Lopopolo | 作者自有文集/现场指南 | 已落盘（前批） |

### 1.1 决定性引文（Hashimoto 原文，已实读）

> "At risk of stating the obvious: agents are much more efficient when they produce the right result the first time… The most sure-fire way to achieve this is to give the agent fast, high quality tools to automatically tell it when it is wrong. **I don't know if there is a broad industry-accepted term for this yet, but I've grown to calling this 'harness engineering.'** It is the idea that **anytime you find an agent makes a mistake, you take the time to engineer a solution such that the agent never makes that mistake again.** … This comes in two forms: **(1) Better implicit prompting (AGENTS.md)** … **(2) Actual, programmed tools** …"

**这是目前最操作化、最可教学的定义**：一次错误 → 一次工程化修复 → 该错误不再发生。两种形态：隐式提示（AGENTS.md）与编程工具（脚本 / 测试 / 截图等）。

> 该句已被中文社区引用（例：Bing 检索到的 runoob.com 页面直接引用了同一英文句），说明它已是社区事实上的定义句。

### 1.2 Fowler 对术语来源的记录（备忘录原文，已实读）

> "The article is titled 'Harness engineering: leveraging Codex in an agent-first world', but only mentions 'harness' once in the text. **Maybe the term was an afterthought inspired by Mitchell Hashimoto's recent blog post.**"

→ 这是**独立第三方对"谁先提出"的直接旁证**，与 Hashimoto 原文的日期（2026-02-05 < 2026-02-11）一致。

## 二、各层内容

### 2.1 Hashimoto 的六步路径（Step 5 的上下文）

Step 1 Drop the Chatbot → Step 2 Reproduce Your Own Work → Step 3 End-of-Day Agents → Step 4 Outsource the Slam Dunks → **Step 5 Engineer the Harness** → Step 6 Always Have an Agent Running。

- 定义 agent："an LLM that can chat and invoke external behavior in a loop"；最低能力：读文件、执行程序、发 HTTP 请求。
- Step 5 的两种形态（见上）。
- Step 6 补充事实："I'm not [yet] running multiple agents, and currently don't really want to." —— **与社区"多 agent 是必然"的叙事相反**，是很好的反例引用。
- 自我声明："This blog post was fully written by hand, in my own words."（在 AI 内容语境下主动声明人类写作）

### 2.2 OpenAI 的六大概念（**该篇仍为转述**；另有官方定义文已落盘）

仓库即记录系统 / 地图而非手册 / 机械化执行 / 智能体可读性 / 吞吐量改变合并理念 / 熵管理。核心事实：3 人团队以"完全不手写代码"为强制约束，5 个月建成 100 万行以上的真实产品。

> ⚠️ **`openai.com/index/harness-engineering/` 这一篇仍为转述**。转述来源：`deusyu/harness-engineering` 的 `README.md` 与 `references/articles.md`（已落盘）；主站 403 至今未破。
>
> ✅ **但 OpenAI 对 harness 的官方定义已取得原文**（2026-09-10 第六批）：`developers.openai.com/blog/codex-as-a-platform.md`《Codex as a platform: build on the open agent harness》给出 "That surrounding execution system is the harness." 与 ARC-AGI-3 的 13.3%→38.3% 量化数据。**卷 09 的 OpenAI 侧论述可改用该文，不必依赖 §2.2 的转述。**

### 2.3 Fowler 的概念框架（原文已读，可直接用于教学）

| | computational（可计算） | inferential（需推理） |
|---|---|---|
| **guide（前馈）** | linter、类型检查、模板、脚手架 | 提示词约定、AGENTS.md、上下文工程 |
| **sensor（反馈）** | 测试、CI、构建、类型错误 | LLM 评审、Agent 自评、代码审查代理 |

三类 harness 模板：**maintainability** / **architecture fitness** / **behaviour**。
配套概念：**harnessability**、**steering loop**、**keep quality left**、**harness templates**。
侧栏论点：**context engineering 被定位为 harness engineering 的关系项**；"隐喻只能走这么远"；Ashby 必要多样性定律。

### 2.4 arXiv 2603.05344（OPENDEV，学术形式化）

- 标题：*Building Effective AI Coding Agents for the Terminal: Scaffolding, Harness, Context Engineering, and Lessons Learned*
- 作者：Nghi D. Q. Bui；提交 2026-03-05，v3 2026-03-13；状态 "Work in progress"
- 系统：**OPENDEV** —— 开源、Rust 实现的命令行编码 agent
- 关键机制（摘要实读）：compound AI system architecture、**workload-specialized model routing**、**dual-agent architecture 分离规划与执行**、**lazy tool discovery**、**adaptive context compaction**（渐进式压缩旧观测）、**automated memory system**（跨会话积累项目知识）、**event-driven system reminders**（对抗指令衰减）
- 摘要自述动机：防止 **context bloat 与 reasoning degradation**
- 教学价值：这是**目前唯一把 harness 的各子系统写成学术架构**的公开论文，可与卷 09 的机制章节逐条对应。
- 许可证：arXiv 预印本；DOI `10.48550/arXiv.2603.05344`

## 三、权利与复用

- Hashimoto / Fowler / arXiv 摘要：均为站点文章或预印本，**未声明可复用许可** → `cite_only`：只引用与转述，不复制正文进入发布物。
- 已落盘的 HTML/TXT 仅作**内部研究快照**，不进入发布物。
- arXiv 正文 PDF 可从 arXiv 获取；引用按学术惯例（作者、标题、arXiv ID、版本、日期）。

## 四、教材价值

- 映射卷册：**09（主）**；10；07；14（研究前沿）。
- 映射 Concepts：Harness Engineering、Harness、Guide、Sensor、Harnessability、Steering Loop、Repo-as-Source-of-Truth、Mechanical Enforcement、Entropy Management、Agent Readability、Context Compaction、Instruction Fade-out。
- 结构复用 S1：**高** —— 三条独立结构可选：Hashimoto 的"六步采纳路径"（读者视角）、Fowler 的 guides/sensors 二维表（概念视角）、OPENDEV 的子系统架构（实现视角）。
- 知识复用 S2：**高**（Hashimoto 与 Fowler 原文已读，可转述）；OpenAI 部分仍受限。
- 建议处理：**CURATE（定义 + Fowler 框架 + OPENDEV 架构）+ INDEX（OpenAI 原文，取得后升级）**。

## 五、质量与风险

- Authority：T1（OpenAI 官方、arXiv 预印本）+ T2（Hashimoto、Thoughtworks 工程师）。**术语出处已可确证**。
- Freshness：2025-11 至 2026-04；社区内容自 2026-03 起爆发。
- **风险 1（已降级，原 P0 → P2）**：`openai.com/index/harness-engineering/` 单篇 403 未落盘，其六大概念仍为转述。但 OpenAI 官方 harness 定义文已于第六批落盘，卷 09 可改用该文；本项降为长期观察（见决策队列 P1-R）。
- **风险 2（术语混淆）**：中文社区严重混用 **harness（运行时框架）** 与 **harness engineering（工程方法）**；中文译名至少出现"驾驭工程"与"驭缰工程"两种。卷 09 必须**固定一种译名并显式声明取舍**。
- **风险 3（溯源错误常见）**：大量中文文章把 harness engineering 说成"Anthropic 实现让 AI 6 小时无人干预生成完整项目"（见掘金 2026-03-30 标题），与已确证的时间线不符 —— **引用他人对术语来源的陈述时必须回原文**。
- **风险 4（预印本）**：arXiv 2603.05344 自标 "Work in progress"，不是同行评审结论。

## 六、提取的 Claims

1. "harness engineering" 这一提法由 **Mitchell Hashimoto** 在 2026-02-05 的博客中提出并命名（"I've grown to calling this 'harness engineering'"）。位置：`mitchellh-my-ai-adoption-journey.txt` Step 5（已落盘实读）。
2. Hashimoto 给出的定义：任何时候发现 agent 犯错，就花时间做一次工程化修复，使该错误不再发生；两种形态是 AGENTS.md 与编程工具。位置：同上。
3. OpenAI 于 2026-02-11 发布 "Harness engineering: leveraging Codex in an agent-first world"，作者 Ryan Lopopolo，文中"harness"仅出现一次。位置：Fowler 备忘录原文（已落盘实读）逐字引用。
4. Fowler 推测该术语可能是受 Hashimoto 博客启发。位置：Fowler 备忘录原文（已落盘实读）。
5. Anthropic 在 2025-11-26 的工程文中已正式使用 "harness"（但未提出 "harness engineering"）。位置：Anthropic 文章头部日期（本轮已访问核验）。
6. arXiv 2603.05344 于 2026-03-05 提交，提出 OPENDEV（Rust 命令行编码 agent），把 harness 与上下文工程写入学架构。位置：arXiv 摘要页（已落盘实读）。
7. Hashimoto 在 2026-02 时**只跑一个 agent**，且明确表示暂不想要多 agent。位置：Step 6 原文（已落盘实读）。
