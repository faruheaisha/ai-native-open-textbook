# GitHub 近期高质量课程与 Agent 产品使用方法 · 检索记录

- 日期：2026-09-10（第三批检索）
- 范围：GitHub 近期（2026）vibe coding / agent / AI 课程；千问办公与办公类 Agent 产品使用方法；Harness Engineering 与 Agent Skills 两个新品类；社区与技术博客
- 显式排除：Anthropic 官方课程与文档（本轮不扩展）
- 通道：`gh` CLI search repos（stars 排序 + `pushedAt` 过滤）/ codeload tarball / 掘金 API / CSDN API / Bing / 直连站点
- 前置批次：[`社区与技术博客-2026-09-10.md`](社区与技术博客-2026-09-10.md)、[`编程Agent产品与技术博客-2026-09-10.md`](编程Agent产品与技术博客-2026-09-10.md)、[`编程Agent课程补充检索-2026-09-10.md`](编程Agent课程补充检索-2026-09-10.md)

---

## 0. 结论先行

1. **Harness Engineering 已找到可追溯的定义真源**，不是社区自造词：OpenAI 官方文章（2026-02-11，Ryan Lopopolo）+ Martin Fowler 站点两篇（2026-02-17 备忘录、2026-04-02 正式文章，Birgitta Böckeler）。Fowler 两篇原文已落盘。
2. **两个新品类同时成立**：Harness Engineering（工程方法层）与 Agent Skills（能力封装层）。前者给卷 09 提供外部定义，后者给卷 10 提供必须重写的概念边界。
3. **Stanford CS146S 是「Vibe Coding → 工程能力」的最佳主线样本**：官方作业仓库 + 3 个语言版本（中/韩）+ 1 个获授权的中文衍生项目，形成可对照的课程谱系。
4. **千问办公的一手社区资料质量分化严重**：GitHub 上有可用的结构化资料（绿皮书、办公案例指南、实战蓝皮书），CSDN 上大量同名文章是 AI 生成的 SEO 内容，**不可作为教材证据源**。
5. **办公 Agent 产品侧的可靠证据只有三类**：官方帮助中心/发布说明、有运行记录可追溯的社区项目、本项目自测复现。营销页与"保姆级教程"批量改写不构成证据。

---

## 1. 结构性发现一：Harness Engineering 的定义真源

> **本节已修订（同日）**：初稿把 OpenAI 当作术语提出者。后续实读 Mitchell Hashimoto 原文后确认——**术语由 Hashimoto 在 2026-02-05 提出并命名，早于 OpenAI 文章 6 天**。完整时间线见 [`SRC-HARNESS-ENGINEERING-ORIGIN.md`](09-harness/sources/SRC-HARNESS-ENGINEERING-ORIGIN.md)。

### 1.1 已确证的事实链（按时间排序）

| 序 | 日期 | 来源 | 作者 | 贡献 | 获取状态 |
|---|---|---|---|---|---|
| 1 | 2025-11-26 | `anthropic.com/engineering/effective-harnesses-for-long-running-agents` | Anthropic | 最早在正式工程文中使用 "harness" | 未落盘（**仅用于断代**，内容不在本轮收录范围） |
| 2 | **2026-02-05** | `mitchellh.com/writing/my-ai-adoption-journey` Step 5 "Engineer the Harness" | **Mitchell Hashimoto** | **首次提出并命名 "harness engineering"** | **已落盘** |
| 3 | 2026-02-11 | `openai.com/index/harness-engineering/` — "Harness engineering: leveraging Codex in an agent-first world" | Ryan Lopopolo（OpenAI） | **普及**该术语（3 人 / 5 个月 / 100 万行） | **未能落盘**（openai.com 对本机 403） |
| 4 | 2026-02-17 | `martinfowler.com/.../harness-engineering-memo.html` | Birgitta Böckeler | 第一反应备忘录；记录术语可能源自 Hashimoto | **已落盘** |
| 5 | 2026-03-05 | `arxiv.org/abs/2603.05344`（OPENDEV） | Nghi D. Q. Bui | **学术形式化** | **已落盘** |
| 6 | 2026-04-02 | `martinfowler.com/articles/harness-engineering.html` | Birgitta Böckeler | **概念化**：guides/sensors + 三类模板 | **已落盘** |
| 7 | 持续 | `lopopolo/harness-engineering`（2,684★，CC-BY-4.0） | Ryan Lopopolo | 作者自有文集 | 已落盘（前批） |

**决定性引文（Hashimoto 原文，已实读）**：

> "I don't know if there is a broad industry-accepted term for this yet, but **I've grown to calling this 'harness engineering.'** It is the idea that **anytime you find an agent makes a mistake, you take the time to engineer a solution such that the agent never makes that mistake again.**"

两种形态：**(1) 隐式提示（AGENTS.md）；(2) 编程工具（脚本 / 测试 / 截图等）**。

**旁证**：Fowler 备忘录原文（已实读）写道 "Maybe the term was an afterthought inspired by **Mitchell Hashimoto's recent blog post**"。这是独立第三方对"谁先提出"的直接旁证。

**OpenAI 那条的确证方式**：Fowler 备忘录逐字引用了其标题与核心事实（"no manually typed code at all"、5 个月、100 万行），足以确认存在与要点，**但不能替代正文**。

### 1.2 OpenAI 原文的六大概念（转引，待原文核验）

仓库 `deusyu/harness-engineering` 的 `README.md` 与 `references/articles.md`（均为本次已落盘快照）一致转述为：

1. 仓库即记录系统（不在仓库里的东西，对智能体不存在）
2. 地图而非手册（AGENTS.md 是目录页，不是百科）
3. 机械化执行（用 linter / 测试 / CI 把约束变成可执行的门）
4. 智能体可读性（可读性优先于人类习惯的简洁）
5. 吞吐量改变合并理念（合并成本下降后，评审策略随之改变）
6. 熵管理（垃圾回收式清理，对抗代码库熵增）

> 归类：**合理推断（有转述一致性，未原文核验）**。进正文前须取得 OpenAI 原文或以第 4 条 lopopolo 仓库正文交叉确认。

### 1.3 Fowler 的概念框架（原文已读，可用于教学）

Birgitta Böckeler 把 harness 的元素拆成 **guides（前馈）** 与 **sensors（反馈）** 两类，各自再分 **computational（可计算）** 与 **inferential（需要推理）**；并给出三类 harness 模板：

- **Maintainability harness**：可维护性约束
- **Architecture fitness harness**：架构适应度约束
- **Behaviour harness**：行为正确性约束

配套概念：**harnessability**（一个代码库有多容易被 harness 化）、**steering loop**（转向回路）、**keep quality left**（把质量尽可能左移）。
另有侧栏讨论：harness engineering 与 context engineering 的关系；"隐喻只能走这么远"；Ashby 必要多样性定律。

> 教学价值：这是目前**唯一一篇把 harness 拆成可教学维度**的公开文章，且作者是独立第三方（非工具厂商）。可直接作为卷 09 的概念骨架来源。

### 1.4 与已有卷册定位的关系

- 卷 09 的定义不再需要自造：**外部定义 + 本项目取舍**双层结构。
- 需在卷 09 明确区分 **harness（运行时框架）** 与 **harness engineering（围绕它的工程方法）** —— 社区中文内容大量混淆二者。
- 卷 10 的 context engineering 是 harness engineering 的一个子集（Fowler 侧栏专门讨论），**两卷的边界必须在这一层重画**。

---

## 2. 结构性发现二：Agent Skills 已独立成品类

### 2.1 规模证据（检索时点）

| 仓库 | Stars | 许可 | 形态 |
|---|---|---|---|
| `VoltAgent/awesome-agent-skills` | 34,033 | MIT | 1000+ skills 索引（单文件清单） |
| `heilcheng/awesome-agent-skills` | 6,191 | MIT | 教程 + 指南 + 目录 |
| `libukai/awesome-agent-skills` | 5,080 | **无 LICENSE，README 声明 Apache-2.0** | 中文终极指南，含 SKILL.md 规范说明 |
| `alirezarezvani/claude-skills` | 25,797 | 待核 | 380 skills / 30+ agents |
| `microsoft/skills` | 3,006 | 待核 | **微软官方** Skills / MCP servers / Custom Agents |
| `openai/skills` | 26,843 | 待核 | **OpenAI 官方** Codex Skills Catalog |
| `Kulaxyz/self-learning-skills` | 951 | 待核 | 自我改进 skill |

### 2.2 SKILL.md 的规范要素（社区一致表述）

`libukai/awesome-agent-skills`（已抓取 README）给出：YAML frontmatter 必含 `name`、`description`，可选 `license`、`compatibility`、`metadata`、实验性 `allowed-tools`；`name` ≤64 字符、小写字母/数字/连字符、**必须与父目录同名**；可含 `scripts/`、`references/`、`assets/` 等子目录；Agent 分三阶段使用（发现 → 加载 → 执行）。

> 注意：`libukai` 仓库**没有 LICENSE 文件**，README 里的 Apache-2.0 徽章不构成许可文本。按本项目纪律，**只能 INDEX，不能迁入**。

### 2.3 对卷 10 的直接影响

前批已记录"Skill 不再等于提示词模板"需重写定义。本轮补强：
- Skill = **目录 + SKILL.md 协议 + 渐进式加载**，是一个**可分发的能力包格式**，不是一段提示词。
- 与 MCP 的分工需明确：MCP 提供**工具/资源接入协议**，Skill 提供**过程性知识与能力封装**。二者是正交的两层。
- 卷 10 需新增"Skill 的发现 / 加载 / 执行三阶段"与"Skill 的质量与安全边界（见卷 12）"两个单元。

---

## 3. 新增来源总表（本批迁入）

### 3.1 卷 07（Vibe Coding / AI 编码）

| 本地目录 | 仓库 | Stars | 许可 | pinned commit | 快照 |
|---|---|---|---|---|---|
| `cs146s-cn/` | `ShouZhengAI/CS146S_CN` | 1,567 | MIT | `0d65f36f` | 192 文件，blob 校验 PASS |
| `vibe-security-skill/` | `raroque/vibe-security-skill` | 1,006 | MIT | `850938f2` | 15 文件 PASS |
| `vibe-coding-prompt-template/` | `KhazP/vibe-coding-prompt-template` | 3,057 | MIT | `db481763` | 196 文件 |
| `cloudflare-vibesdk/` | `cloudflare/vibesdk` | 5,353 | MIT | `9da158d8` | 420 文件（上限子集） |

**CS146S 谱系（本批最大收获）**：

| 版本 | 仓库 | 语言 | 许可 | Stars |
|---|---|---|---|---|
| 官方作业 | `mihail911/modern-software-dev-assignments` | EN | **无 LICENSE** | 3,950 |
| 中文版 | `ShouZhengAI/CS146S_CN` | ZH | MIT | 1,567 |
| 韩文版 | `team-attention/stanford-cs146s-kr` | KR | 待核 | 291 |
| 中文（RapidAI 赞助） | `BIT-ENGD/cs146s_cn` | ZH | 待核 | 197 |
| **获授权中文衍生** | `AlexAnys/agent-first-dev` | ZH | **CC BY-NC-SA 4.0**（含 Stanford 授权声明） | 32 |

课程主题（`cs146s-cn` README 实读）：MCP、Agent Skills、spec-driven development、loop engineering、software factory；定位是"开发者与 Coding Agent 协作"的新工作方式。
`cs146s-cn` 注意：README 含**付费赞助广告位**（Atlas Cloud / APIMart），引用时须剥离。

### 3.2 卷 08（Agents）

| 本地目录 | 仓库 | Stars | 许可 | pinned commit | 快照 |
|---|---|---|---|---|---|
| `microsoft-ai-engineering-coach/` | `microsoft/AI-Engineering-Coach` | 3,767 | MIT | `18b1a3d1` | 383 文件（4 个符号链接不可解析） |
| `baby-agent/` | `baby-llm/baby-agent` | 479 | Apache-2.0 | `55712911` | 199 文件 |
| `zero2agent/` | `ranxi2001/zero2Agent` | 436 | **MIT（仓库）/ CC BY-NC-SA 4.0（绿皮书 PDF）** | `46e9f7c2` | 348 文件 |
| `awesome-ai-agent-papers/` | `VoltAgent/awesome-ai-agent-papers` | 1,765 | MIT | `4c0c1281` | 4 文件 |
| `agentic-engineering-handbook/` | `keyuchen21/agentic-engineering-handbook` | 187 | MIT | `002d5456` | 25 文件 |

要点：
- **`microsoft/AI-Engineering-Coach`**：微软官方 VS Code 扩展，读本地 AI 会话日志产出练习评分与**45 条反模式规则**（提示质量 / 会话卫生 / 代码评审 / 工具掌握 / 上下文管理五类），并做 instruction-file 审计与"agentic readiness"评分。**卷 08/12 可直接引用的"可观测性证据源"实践样本**，且数据不出本机（隐私设计可讲）。
- **`baby-agent`**：Go 语言手写 agent 原理，明确声明"教学仓库，不建议直接用于生产"——这种**能力边界声明**是本项目应当鼓励的写法。
- **`zero2Agent`**：一仓两许可。仓库 MIT，但《Agent 面试 500 问》绿皮书 PDF 单独声明 CC BY-NC-SA 4.0。**引用时必须分开标注**，这是本轮发现的第二种"仓内混合许可"形态。

### 3.3 卷 09（Harness）

| 本地目录 | 仓库 | Stars | 许可 | pinned commit | 快照 |
|---|---|---|---|---|---|
| `origin-harness-engineering-articles/` | martinfowler.com（站点快照） | — | 站点型，仅引用 | — | 2 篇 HTML + 正文 |
| `deusyu-harness-engineering/` | `deusyu/harness-engineering` | 5,874 | MIT | `858c0da6` | 108 文件 PASS |
| `awesome-harness-engineering-aiboost/` | `ai-boost/awesome-harness-engineering` | 4,114 | **CC0-1.0** | `6015473a` | 10 文件（CLAUDE.md 为符号链接） |
| `awesome-harness-engineering-walkinglabs/` | `walkinglabs/awesome-harness-engineering` | 4,044 | **CC0-1.0** | `cff9b006` | 7 文件 PASS |
| `harness-engineering-from-cc-to-ai-coding/` | `ZhangHanDong/harness-engineering-from-cc-to-ai-coding` | 1,500 | MIT | `e40e0fee` | 157 文件 PASS |
| `better-harness/` | `QoderAI/better-harness` | 2,247 | MIT | `e1538c15` | 461 文件（上限子集） |
| `agentic-harness-engineering/` | `china-qijizhifeng/agentic-harness-engineering` | 875 | MIT | `8b2a55d9` | 214 文件 PASS |
| `harness-engineering-guide-nexu/` | `nexu-io/harness-engineering-guide` | 639 | MIT | `86fec9be` | 97 文件 PASS |
| `agentic-harness-patterns-skill/` | `keli-wen/agentic-harness-patterns-skill` | 302 | MIT | `17549f55` | 34 文件 PASS |

要点：
- **`deusyu/harness-engineering`** 是目前最系统的中文学习档案：79 篇文章索引 + 40 篇译文（含 Fowler 备忘录与全文、Anthropic 多篇工程文、arXiv 论文、LangChain ADLC 等），带**单一真源约定**（`references/articles.md` 为计数唯一权威源，且要求下游缓存同一提交更新）——这套**文档工程纪律**值得本项目借鉴。
- **`ZhangHanDong/harness-engineering-from-cc-to-ai-coding`（《马书》）**：基于 Claude Code `v2.1.88` 发布包与 source map 还原的逆向分析，7 篇 + 4 附录（架构 / 提示工程 / 上下文管理 / 提示词缓存 / 安全与权限 / 高级子系统 / 经验教训）。**明确声明"不代表 Anthropic 官方立场"**。
- **CC0 来源两份**（`ai-boost`、`walkinglabs`）：公共领域，可用于任何用途。这是本批许可最宽松的来源。
- **`QoderAI/better-harness`**：厂商（Qoder）开源 harness 平台，含 `docs/specs`、`references/`、`.agents/skills`。

### 3.4 卷 10（Context / Memory / Skills / MCP）

| 本地目录 | 仓库 | Stars | 许可 | pinned commit | 快照 |
|---|---|---|---|---|---|
| `awesome-agent-skills-voltagent/` | `VoltAgent/awesome-agent-skills` | 34,033 | MIT | `8873794b` | 4 文件 |
| `awesome-agent-skills-heilcheng/` | `heilcheng/awesome-agent-skills` | 6,191 | MIT | `de905685` | 49 文件 |
| `huggingface-mcp-course/` | `huggingface/mcp-course` | 918 | Apache-2.0 | `e706ccc0` | 114 文件 PASS |

`huggingface/mcp-course` 是**机构官方课程**（Hugging Face），Apache-2.0，是卷 10 MCP 单元目前最合适的主干来源。

### 3.5 卷 04（办公与工作流）

| 本地目录 | 仓库 | Stars | 许可 | pinned commit | 快照 |
|---|---|---|---|---|---|
| `agent-guide-office/` | `tangshiyegit/agent-guide` | 20 | MIT | `ae8b2262` | 65 文件（仅 WorkBuddy + Coze 指南） |
| `zhijian-ai-bluebook-workbuddy-harness/` | `zjp1997720/zhijian-ai-bluebook-workbuddy-harness` | 205 | **CC BY-SA 4.0（正文）/ MIT（示例代码）** | `6ac68cd4` | 7 文件（含 54 MB 单文件 book.html） |
| （已存在）`qwenwork-guide/` | `wangxiaoshuai1998/QwenWorkGuide` | 7 | MIT | `002f698a` | 596 文件 PASS |

- `agent-guide-office` 提供 **WorkBuddy 基础入门 8 篇 + 自媒体案例 2 篇 + 办公案例 12 篇 + Coze 指南 37 篇**，是"办公 Agent 具体用法"的可引用结构化样本。
- `zhijian` 蓝皮书主题为"拆解 WorkBuddy 的提示词、记忆、插件、专家、Skill 与安全边界"，含 `PUBLICATION-MANIFEST.json` 与 `CHECKSUMS.sha256`（**发布物清单 + 校验和**，是本轮见到的第三种可追溯性实践）。
- **CC BY-SA 4.0 有传染性**：正文若改编其内容，衍生作品必须以 CC BY-SA 4.0 发布。且其 `LICENSES.md` 明确**品牌资产保留全部权利**。进正文前须做取舍决策。

---

## 4. 许可核验（逐项实读 LICENSE 文件）

### 4.1 通过（可用于 Link / Quote / Adapt / Fork）

MIT：`ShouZhengAI/CS146S_CN`、`raroque/vibe-security-skill`、`KhazP/vibe-coding-prompt-template`、`cloudflare/vibesdk`、`microsoft/AI-Engineering-Coach`、`ranxi2001/zero2Agent`（仓库本体）、`VoltAgent/awesome-ai-agent-papers`、`keyuchen21/agentic-engineering-handbook`、`deusyu/harness-engineering`、`ZhangHanDong/harness-engineering-from-cc-to-ai-coding`、`QoderAI/better-harness`、`china-qijizhifeng/agentic-harness-engineering`、`nexu-io/harness-engineering-guide`、`keli-wen/agentic-harness-patterns-skill`、`VoltAgent/awesome-agent-skills`、`heilcheng/awesome-agent-skills`、`tangshiyegit/agent-guide`

Apache-2.0：`baby-llm/baby-agent`、`huggingface/mcp-course`

CC0-1.0（公共领域）：`ai-boost/awesome-harness-engineering`、`walkinglabs/awesome-harness-engineering`

### 4.2 许可红线（只可 INDEX，不得迁入/改编）

| 来源 | Stars | 实读许可 | 说明 |
|---|---|---|---|
| `AlexAnys/agent-first-dev` | 32 | CC BY-NC-SA 4.0 | 含 Stanford CS146S 授权材料，NC 限制 |
| `jayminwest/agentic-engineering-book` | 199 | CC BY-NC-SA 4.0 | 全文 NC |
| `datawhalechina/easy-vibe` | 19,358 | CC BY-NC-SA 4.0（README 声明，无 LICENSE 文件） | vibe coding 101，热度极高但 NC |
| `datawhalechina/vibe-vibe` | 6,023 | CC BY-NC-SA 4.0（同上） | 中文系统 vibe coding 教程 |
| `datawhalechina/self-harness` | 250 | CC BY-NC-SA 4.0（同上） | Harness 中文教程 |
| `ranxi2001/zero2Agent` 绿皮书 PDF | — | CC BY-NC-SA 4.0 | **仓内混合许可**，仅此文件受限 |

> 累积观感：**datawhalechina 全系为 CC BY-NC-SA 4.0**。这构成一个系统性决策点：本项目若接受 NC 来源，可解锁中文生态里质量最高的一批课程；若不接受，则需为中文主线另找 MIT 替代。**已升级为 P1 决策**。

### 4.3 无 LICENSE 文件（须联系作者或仅 INDEX）

| 来源 | Stars | 备注 |
|---|---|---|
| `mihail911/modern-software-dev-assignments` | 3,950 | **Stanford CS146S 官方作业仓库**，无 LICENSE；仅 INDEX + 指向课程站点 |
| `wquguru/harness-books` | 3,080 | "两本 harness engineering 书"，无 LICENSE |
| `libukai/awesome-agent-skills` | 5,080 | README 声明 Apache-2.0，**无 LICENSE 文件** |
| `Picrew/awesome-agent-harness` | 1,746 | 无 LICENSE |
| `thirdlayerinc/autoagent` | 4,571 | 无 LICENSE |
| `zarazhangrui/codebase-to-course` | 5,536 | 无 LICENSE |
| `EnzeD/vibe-coding` | 4,781 | 无 LICENSE |
| `infometa/workbuddyskills` | 291 | WorkBuddy skills 离线存档，无 LICENSE |
| `6ackpacks/QwenOfficeGuide` | 0 | 千问办公实战蓝皮书站点，无 LICENSE |
| `zhuang-HE/workbuddy-harness` | 36 | 无 LICENSE |
| `ahang1598/doubao-workbuddy-qwenwork-skills` | 26 | 无 LICENSE |

---

## 5. 社区与技术博客

原始转储：[`原始转储/2026-09-10-办公与Agent产品-掘金CSDN.md`](原始转储/2026-09-10-办公与Agent产品-掘金CSDN.md)

### 5.1 主题分布（掘金 / CSDN）

| 主题 | 内容量 | 质量判断 |
|---|---|---|
| WorkBuddy 教程 | 高（30+ 条） | 头部作者有真实案例（PPT/发票/资讯简报/合同审阅/数据看板），中段大量同源改写 |
| 千问办公 | 中（掘金少、CSDN 多） | CSDN 侧**大量 AI 生成的 SEO 文章**（`weixin_29xxxxxx` 类作者，标题模板化），不可作证据 |
| Agent Skills | 很高（40+ 条） | 有若干原理级文章可作线索，需回原始协议核验 |
| Harness Engineering | 很高（30+ 条，2026-03 起集中爆发） | 多为转载/编译，真源应回 OpenAI + Fowler |
| 扣子空间 / 豆包办公 / Manus | 中 | 多为产品体验与横评，缺少可复现方法 |
| QwenWork 教程 | 低 | 真正有深度的少 |

### 5.2 值得追踪的少数几条

- 掘金 `7680972429380812863`（2026-09-03）QwenWork 与主流办公 Agent 的横向能力对比 — 需回原文判断是否有可复现任务集。
- 掘金 `7658599462051086371`（2026-07-05）"豆包和千问同时关了智能体……迁移方案整理" — **平台依赖风险**的一手案例，卷 04 与卷 12 可用。
- 掘金 `7649183428663476287`（2026-06-09）"置身钉内：一个 AI 办公产品的理想、失焦与组织困境" — 产品组织侧一手观察。
- CSDN `brucexia` 的《千问高效办公的方法和技巧》系列 — 是**已出版图书**的推广稿，非同人博客；引用须回图书本体。

### 5.3 噪音判断规则（写入本项目检索纪律）

1. CSDN 中作者名为 `weixin_` + 数字串、且标题为模板化长句的，**默认判为 AI 生成 SEO 内容**，不作证据。
2. 标的日期早于"千问办公"产品存在时间的同名文章（如 2012/2013/2015/2018 年的"千问办公"文章），**一律为自动生成的伪时间戳**。
3. "保姆级教程"批量发布且无运行截图/命令输出的，不进证据链。
4. 社区文章只作**线索**，事实回官方文档（T1）或本项目自测。

---

## 6. 待验证与未决

| 编号 | 事项 | 优先级 |
|---|---|---|
| V-1 | OpenAI `harness-engineering` 原文未能落盘（403），六大概念为转述；需取得原文或经 `lopopolo/harness-engineering` 正文交叉确认。**（2026-09-10 同日补充：术语出处已确认非 OpenAI —— Mitchell Hashimoto 2026-02-05 提出；OpenAI 是普及者。缺的只是原文的六大概念表述，术语断代问题已解决。已落盘 Hashimoto 原文、Fowler 两篇、arXiv 2603.05344 摘要）** | P0（降级为「补全原文表述」） |
| V-2 | OpenAI `openai/skills`（26,843★）与 `microsoft/skills`（3,006★）两份**厂商官方 Skills 目录**尚未核许可与抓取；对卷 10 价值高 | P1 |
| V-3 | 是否接受 CC BY-NC-SA 4.0 来源（datawhalechina 全系 + CC146S 衍生 + agentic-engineering-book） | P1 |
| V-4 | `zhijian` 蓝皮书 CC BY-SA 4.0 的传染性边界（改编正文会触发 SA） | P1 |
| V-5 | 千问办公官方帮助中心的 FAQ（权限 / 积分 / 数据安全表述）尚未逐条核对 | P1 |
| V-6 | `Qwenwork-MKT`（疑似官方营销组织）仓库群的定位未确认 | P2 |
| V-7 | WebMCP（前批遗留）待回 W3C / Chrome 官方核验 | P2 |
| V-8 | CS146S 官方作业仓库无 LICENSE，"课程谱系"能否引用待定 | P2 |

---

## 7. 快照与校验

- 机器可读索引：`upstream/_快照索引.json`（本批 +21 条，累计 **84** 条）
- 本批校验：卷 07 / 08 / 09 / 10 / 04 全部 `bad=0`；`PASS` 项逐字节一致
- 已知非内容性差异：
  - `.gitignore` / `.gitattributes` 等点文件在原批次 filter 中未包含，本批已补 filter 并回填 23 个来源
  - 4 个符号链接在 tarball 通道不可解析：`microsoft/AI-Engineering-Coach` 的 `.claude/skills/{package-extension,update-docs}.md` 与 `.github/instructions/{package-extension,update-docs}.md`；`ai-boost/...` 的 `CLAUDE.md`
  - 上限子集（非错误）：`cloudflare-vibesdk`(420)、`better-harness`(461)、`QoderAI` 相关
- 修正记录：`08-agents/hello-agents` 的 `code/chapter5/HelloAgent_fastgptCase.json` 与 `docs/chapter3/第三章 大语言模型基础.md` 原为**非 pinned commit 版本**，本批按 `4f7682ce` 重取，字节数与上游一致。
- `upstream` 当前文件总数：约 **29,700**；E: 剩余空间 20.9 GB。
