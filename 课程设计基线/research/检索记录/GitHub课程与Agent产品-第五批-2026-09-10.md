# GitHub 课程与 Agent 产品 · 第五批检索记录

- 日期：2026-09-10（第五批）
- 主题：近三个月高质 vibe coding / agent / harness 课程；办公 Agent（千问办公、扣子）的官方与社区使用方法
- 显式排除：Anthropic 官方课程与文档（不扩展；仅出现在第三方的中英对照论述里）
- 准入纪律：**本批以"能不能教"为准入标准，不以星数、数量或收录完整度为准入标准**。入库后经复核，3 条内容量不足的仓库被直接删除（见 §5）
- 通道：`gh search repos`（api.github.com）→ codeload tarball 定点迁入；Bing 网页检索 → 站点 `llms.txt` / sitemap 抓取
- 前置批次：[`GitHub课程与Agent产品-第四批-2026-09-10.md`](GitHub课程与Agent产品-第四批-2026-09-10.md)

---

## 0. 结论先行

1. **净增 22 条**（20 个仓库快照 + 2 个官方/社区文档站点快照），`upstream/_快照索引.json` 由 111 → **133 条**。校验 `bad=0`（18/18 来源逐字节一致；`missing` 是过滤式快照的预期结果，见 §6）。
2. **"实验室 harness"三足成形**。本批一次性拿到四家厂商的一手 harness 实现：DeepSeek `dsh`（MIT）、xAI `grok-build`（Apache-2.0）、LangChain `deepagents`（MIT）、AWS 系 Strands `harness-sdk`（Apache-2.0）。加上前批的 Codex 与 Claude Code 生态，卷 09 第一次可以在**同一抽象层上并列比较不同厂商的 harness 设计**，而不是只讲一家。
3. **中文侧出现体系化 Harness 教材**：《御舆：解码 Agent Harness》——15 章 + 4 附录，中英双语全文，四部分递进（基础 → 核心系统 → 高级模式 → 工程实践），末章即"构建你自己的 Agent Harness"。
4. **"harness 是不是束缚"是中文社区的真实分歧，不是翻译细节**。已有作者系统论证反对"马具/驾驭"隐喻（认为它把 agent 退回 workflow 时代），并给出替代理解：**harness 定义的是边界与协作协议，不是每一步的执行**。这直接改变卷 09 的开篇叙事。
5. **千问办公有第二套官方文档站**：`qwenwork.cn/docs`（107 页），前批只拿到阿里云侧的 `help.aliyun.com/zh/qwenwork`。且该站暴露**企业版 Admin OpenAPI 103 个端点**——办公 Agent 的治理面第一次有一手材料可引。
6. **方法学新坑**：codeload tarball 会因 `.gitattributes` 的 `export-ignore` 省略上游 tree 中确实存在的路径（§6）。

---

## 1. 质量分级

分级标准：**A = 能直接支撑一个教学单元的讲解；B = 提供对照、证据或补强；C = 只作发现层索引，不进正文。**

### A 级（可进教学主线）

| 资源 | 本地目录 | 卷 | 许可 | 为什么是 A |
|---|---|---|---|---|
| DeepSeek Harness（`dsh`） | `09-harness/deepseek-harness/` | 09 | MIT | 官方 harness，"一切皆插件"；附 arXiv 2608.25512 的时空可组合性范式论文；`.agents/notes/` 保留 proposed/implemented/archived/**rejected** 的完整设计决策生命周期——**"被否决的方案"在其他 harness 仓库里几乎看不到** |
| 《御舆：解码 Agent Harness》 | `09-harness/claude-code-book-yuyu/` | 09 | 未声明（只 INDEX） | 中文侧目前最完整的 harness 拆解：对话循环 / 工具系统 / 权限管线 / 记忆 / 上下文 / 钩子 / 子智能体 / 协调器 / 技能 / MCP / 流式 / Plan 模式 / 自建 harness，另有源码导航地图、工具清单、功能标志表、术语表 |
| 从零构建编码 Agent | `09-harness/claude-code-from-scratch/` | 09 | MIT | 教材式实现（约 5,000 行 TS），与《御舆》的"读源码"路线互补：一个讲"它怎么设计的"，一个讲"我怎么写出来" |
| 生产编码 Agent 系统提示词存档 | `10-context-memory/claude-code-system-prompts/` | 10 | MIT | 系统提示词与工具描述的一手文本，是"上下文工程"少见的可实证材料 |
| 中文上下文工程与运行空间实践指南 | `10-context-memory/practical-guide-context-engineering/` | 09/10 | 未声明（只 INDEX） | 唯一同时给出 **harness ↔ 上下文工程** 关系论证、并把 OpenAI / Anthropic 两篇工程实践拆成可讲步骤的中文来源 |
| 千问办公官网帮助中心 | `04-work/qwenwork-official-help-cn/` | 04 | 官方文档 | 107 页官方口径（产品/桌面端/工作台/企业旗舰版/SSO/审计），是办公 Agent 的**事实真源**，不是转述 |
| 扣子开源平台 Coze Studio | `04-work/coze-studio/` | 04 | Apache-2.0 | 官方自托管 agent 平台，把"可视化编排"从黑箱变成可读实现 |

### B 级（支撑与对照）

| 资源 | 本地目录 | 卷 | 许可 | 作用 |
|---|---|---|---|---|
| xAI `grok-build` | `09-harness/grok-build/` | 09 | Apache-2.0 | 第三家实验室 harness，用于比较 TUI/扩展点设计取向 |
| LangChain `deepagents` | `09-harness/langchain-deepagents/` | 09 | MIT | "batteries-included"路线的代表 |
| Strands `harness-sdk` | `09-harness/strands-harness-sdk/` | 09 | Apache-2.0 | 云厂商侧 harness SDK；多子包各自许可 |
| `repository-harness` | `09-harness/repository-harness/` | 09 | MIT | 把仓库改造成 agent-ready 工作空间的工程化做法 |
| `meta-skill-harness-revfactory` | `09-harness/meta-skill-harness-revfactory/` | 09/10 | Apache-2.0 | 用 meta-skill 生成领域 agent 团队 |
| `Chachamaru127/claude-code-harness` | `09-harness/claude-code-harness-chachamaru/` | 09 | MIT | 完整度高的 harness 工程配置样例（发布包不含开发目录） |
| `CodexGuide` | `09-harness/codex-guide-freestylefly/` | 09 | MIT | 中文 Codex 使用指南 |
| HF 上下文工程课程 | `10-context-memory/hf-context-course/` | 10 | 未声明 | 机构出品的课程结构可作教学法参照 |
| `Context Engineering` 书稿 | `10-context-memory/context-engineering-book/` | 10 | Apache-2.0 | 成体系的书稿结构 |
| `superpowers-zh` | `10-context-memory/superpowers-zh/` | 10 | MIT | 与 `superpowers` 对照，观察中文社区如何改造 skill 体系 |
| `get-shit-done` | `10-context-memory/get-shit-done/` | 10 | MIT | 高星规格驱动开发系统；可作"prompt 系统 vs 工程系统"的辨析样本 |
| CozeLoop | `04-work/coze-loop/` | 04/08 | Apache-2.0 | Agent 评测与优化的官方平台实现 |
| 千问办公小绿书 | `04-work/qwenwork-xiaolvshu/` | 04 | 第三方社区 | 133 篇社区整理稿；用于**与官方口径交叉核验**，不作真源 |
| `office-agents` | `04-work/office-agents-hewliyang/` | 04 | 未声明 | Office 插件式 agent（BYOK） |

### C 级（只登记，不进正文）

- `agent-systems-handbook`（CC BY-NC-SA 4.0，NC 来源）
- 前几批的 awesome 清单类（`awesome-vibe-coding`、`awesome-context-engineering` 等）：只做发现层，不承担事实责任

---

## 2. 深读要点

### 2.1 OpenAI harness engineering 原文：仍然取不到，但拿到了可追溯的中文二手

- `openai.com` 主站对本机持续 **403**；`web.archive.org`、`archive.ph`、`r.jina.ai` 三个代理通道**均不可达**（连接超时）。
- 替代路径：中文来源 `practical-guide-context-engineering` 把该文拆成了可讲的五步（**转述，非原文**，且作者给出了官方中文版链接 `openai.com/zh-Hans-CN/index/harness-engineering/`，说明该文存在官方中文版）：
  1. 三层代码审查（自身审查 → 本地代码审查 Agent → 云端代码审查 Agent）
  2. 人工 QA（用 Chrome DevTools 协议让 agent 拿到 DOM 快照、截图与导航能力）
  3. 运行日志与性能指标作为上下文输入
  4. 代码文档库：用 `AGENTS.md` 当目录，借"渐进式披露"把是否读取、读什么交给 agent 决定
  5. 代码库结构性规则（顺序约束，由 agent 自己编写的检查器执行）
- 该来源另引了值得直接引用的判断：*"软件开发仍然需要严谨的纪律，但这种严谨更多地体现在框架搭建而非代码本身。"*
- **风险标注**：卷 09 若引用这五步，必须标注为"中文社区转述"，不能署为原文结论。

### 2.2 同一来源对 Anthropic 实践的转述（用于对照，不扩展 Anthropic 取材）

- 架构：任务初始化 Agent + 编码智能体 的两层多智能体。
- 两类故障模式：① 上下文填满后模型失去连贯性，部分模型出现"上下文焦虑"；② 自我评估时 agent 倾向给自己高分，评估模块失效。
- 对应处置：① **上下文重置**（清空而非压缩）＋结构化交接；② **评估者与执行者分离**。
- 这两条与卷 08 的评估章节、卷 09 的长任务章节都直接相关，且属于"可复现的工程结论"而非观点。

### 2.3 harness 隐喻之争（影响卷 09 开篇与译名）

反对"马具/驾驭"阅读的论证链（原文要点）：

- 以 workflow 搭 agent 时，骨架越清晰，agent 越只能沿骨架走，"勉强够用，但不能发挥模型潜力与自主性"；模型升级后，骨架反而变成限制。
- 因此 harness **不应**被理解为对 agent 的束缚。
- 给出的替代理解：**"它真正在做的事情是定义边界和协作协议，而不是控制每一步的执行"**；"不是在限制模型能做什么，而是在创造条件让模型能做到原本做不到的事"。
- 译名备选（作者列出）：驾驭工程 / Agentic 的编排与集成 / 构建 Agent 的工作空间。

> 决策影响：卷 09 正文不宜直接把"驾驭工程"当默认译名使用；至少要在概念章交代这场分歧。

### 2.4 实验室 harness 的架构分歧（可做成对比表）

- **DeepSeek `dsh`**：一切皆插件，由 Cordis 驱动，明确挂靠一篇关于"时空可组合性"的范式论文；设计决策以 `.agents/notes/` 的 proposed/implemented/archived/rejected 四态留档。
- **xAI `grok-build`**：编码 agent harness + TUI，强调全屏、鼠标交互与可扩展。
- **LangChain `deepagents`**：自称 batteries-included。
- **Strands `harness-sdk`**：以 SDK 形态提供，端到端控制。

四者的差异本身就是"harness 要暴露什么给用户"这一教学问题的四种答案。

### 2.5 千问办公：一个产品，两套官方文档，三层治理

- **两套官方站**：阿里云帮助中心 `help.aliyun.com/zh/qwenwork`（前批已收 102 页 + 234 md）与产品官网 `qwenwork.cn/docs`（本批 107 页）。两者覆盖不同侧面，引用时须区分。
- **三层治理**（本批新增，来自 `qwenwork.cn` 的文档结构）：
  - 个人/团队层：套餐、积分、用量、升级降级
  - 企业层：组织与角色、用户组与目录同步、SSO/身份（OIDC / SAML2 / OAuth2 / Azure AD / 钉钉 / 飞书 / 企微）、配额、发票订单
  - 平台治理层：模型策略、连接器策略、技能策略、专家套件策略、Hook 策略、敏感词、可信设备、可信网络、审计日志（管理/AI/用户）
- **103 个 Admin OpenAPI 端点**已登记在 `_快照信息.md`（未逐页落盘，避免堆叠）。

---

## 3. 办公 Agent 来源现状（本批后）

| 产品 | 官方一手 | 社区/第三方 | 状态 |
|---|---|---|---|
| 千问办公 | 阿里云帮助中心（102 页）+ 官网帮助中心（107 页）+ 企业版 OpenAPI | 小绿书（133 篇）、绿皮书（仅登记）、知乎/CSDN 若干 | **足够开写** |
| 扣子 Coze | 官方文档（前批 100 篇）+ 开源实现 Coze Studio + CozeLoop | 工作流合集类仓库（质量参差，不采用） | 足够开写 |
| Manus | 官方文档全量（`llms-full.txt` 229 KB） | 少量评测文章 | 足够开写 |
| Dify | 官方文档全量（2.98 MB） | 教程若干 | 足够开写 |
| 腾讯 CodeBuddy / WorkBuddy | 官方文档 `llms.txt` | Bench 仓库（自定义许可） | 可写，注意许可 |
| 豆包办公 | **未取得**（SPA，无 llms.txt） | 仅媒体稿 | **缺口** |
| Genspark | **403** | 仅评测文章 | **缺口** |
| Flowith | 不可达 | — | **缺口** |

---

## 4. 素材通道（本轮新增可用）

- **Bing 网页检索可用**（去 `setlang`/`cc` 参数；`count`/`first` 参数会显著降低质量）。已知缺陷：部分中文查询会间歇性返回"降级页"（首条为字典/百科类结果），需按首条 URL 特征识别并换词重试。
- **不可达**：`medium.com`、`news.ycombinator.com`、`www.reddit.com`、`x.com`、`github.com`（HTTPS）、`web.archive.org`、`archive.ph`、`r.jina.ai`。
- **可达**：掘金、知乎、CSDN、博客园、机器之心、36氪、InfoQ、开源中国、少数派、人人都是产品经理、微信公众号文章页、gitee、`blog.langchain.dev`。

---

## 5. 入库后被剔除的条目（反堆叠）

| 仓库 | Stars | 剔除原因 |
|---|---|---|
| `cporter202/vibe-coding-for-dummies` | 626 | 全仓 12 个 Markdown，无许可，内容为入门泛论 |
| `DEEP-JLU/Awesome-Graph-Engineering` | 313 | 全仓 8 个文件（README + LICENSE），实质为论文清单占位 |
| `datawhalechina/coze-ai-assistant` | 258 | 过滤媒体后仅 10 个文件，且为 CC BY-NC-SA，无独立教学价值 |

> 判定原则：**快照体积不是价值信号，但"过滤后只剩个位数文本文件"是明确的负信号。**

---

## 6. 方法学：codeload tarball 会被 `export-ignore` 裁剪

- 现象：`Chachamaru127/claude-code-harness` 按 tree 选中 600 个文件，实际只落到 145 个，`absent=455`。
- 原因：该仓库 `.gitattributes` 声明了大量 `export-ignore`（`.claude/`、`tests/`、`go/`、`.github/`、`docs/slides/` 等）。**codeload 提供的是 `git archive` 语义的发布包**，被 export-ignore 的路径不会出现在 tarball 中，但它们**确实存在于 git tree**。
- 后果：校验脚本按 tree 比对时，这类仓库会系统性报 `MISS`，而 `bad=0`。本项目全库中已知含 `.gitattributes` 的来源有 18 个，需逐个确认是否使用 `export-ignore`。
- 处置约定：此类来源在索引 `note` 中显式标注"按上游 export-ignore 语义部分迁入"，并且**不得**把 MISS 当作快照损坏。

---

## 7. 未决与下一步

1. 卷 09 开篇是否交代 harness 隐喻之争；译名是否另择（原 P1-M，本批已具备决策证据）。
2. 卷 09 与卷 10 的边界：本批两处独立中文来源都把 harness 视为"上下文工程的相关上下文/运行空间"，倾向支持重画边界。
3. 18 个含 `.gitattributes` 的来源逐项复核 `export-ignore`。
4. 办公 Agent 三个缺口（豆包办公、Genspark、Flowith）是否值得继续投入。
5. `dsh` 快照当前只覆盖 `.agents/notes/` 子集（上限 900 文件），是否补取 `docs/` 与 `apps/`。
