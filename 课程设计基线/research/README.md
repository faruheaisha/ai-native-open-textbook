# 研究工作区总览

状态：`working`（14 卷调研设计 v1.0 已建立）  
最后更新：2026-09-10  
规程依据：[03-研究与编撰规程.md](../03-研究与编撰规程.md)、[SOURCE_OF_TRUTH.md](../SOURCE_OF_TRUTH.md)、[06-全系列制作与集成路线.md](../06-全系列制作与集成路线.md)

`research/` 是正文之前的证据层：每一卷在这里回答“这一卷教什么、凭什么这么教、可以复用哪些来源、还缺什么证据”。它不是教材正文；读者正文的唯一真源是 [`../../content/`](../../content/)。上游原始材料保存在 [`../../upstream/`](../../upstream/)。

## 与其它区域的关系

| 区域 | 回答什么问题 |
|---|---|
| `upstream/` | 原始材料长什么样、是哪一个版本 |
| `research/` | 来源是否可靠、可以怎样复用、映射到哪一卷哪一章 |
| `content/` | 读者最终读到什么 |

## 目录结构

| 产物 | 位置 | 作用 |
|---|---|---|
| 卷调研设计 | `research/<卷目录>/卷XX-调研设计.md` | Volume Contract、Outcomes、Knowledge Matrix 骨架、候选来源、CEP 队列、Canonical Case、跨卷接口、开放问题、首批核验队列 |
| Chapter Evidence Packet | `research/<卷目录>/CEP-XX-YY-*.md` | 单章术语、来源、分歧、综合等级与编辑决策 |
| Source Record | `research/<卷目录>/sources/SRC-*.md` | 单一来源的身份、版本、许可、可复用级别与 Claim 提取 |
| Case Asset Pack | `research/<卷目录>/cases/CASE-*.md` | 案例的输入、轨迹、失败、验收与 EVL 等级 |
| 主张-证据账本 | `research/<卷目录>/主张-证据账本.md` | 正文主张 ↔ 证据 ↔ 强度的对照 |
| 迁移映射 | `research/<卷目录>/上游课程迁移映射.md` | 上游课程单元 → 章节的复用模式与许可红线 |
| 出版对标 | [`publication/呈现范式对标.md`](./publication/呈现范式对标.md) | 双载体呈现范式的对标结论 |

## 14 卷调研设计

| 卷 | 课程 | 调研设计 | 波次 | 当前状态 |
|---|---|---|---|---|
| 01 | AI Foundations, Products & Interaction / AI 基础、产品形态与交互方式 | [卷01-调研设计.md](./01-foundations/卷01-调研设计.md) | Wave 3 | design v1.0 |
| 02 | AI Models, Architectures & Evaluation / AI 模型、架构与测评 | [卷02-调研设计.md](./02-models/卷02-调研设计.md) | Wave 3 | design v1.0 |
| 03 | AI Ecosystem, Access & Economics / AI 生态、模型访问与成本 | [卷03-调研设计.md](./03-ecosystem/卷03-调研设计.md) | Wave 3 | design v1.0 |
| 04 | AI Knowledge Work & Personal Knowledge Systems / AI 知识工作、办公与个人知识系统 | [卷04-调研设计.md](./04-work/卷04-调研设计.md) | Wave 2（标杆卷） | design v1.0 + 2 份来源记录（含 20 章 CEP 队列） |
| 05 | AI Research & AI for Science / AI 科研、科学工作流与 AI for Science | [卷05-调研设计.md](./05-science/卷05-调研设计.md) | Wave 4 | design v1.0 |
| 06 | Creative AI, Design & Media Production / AI 创意、设计与多媒体生产 | [卷06-调研设计.md](./06-creative/卷06-调研设计.md) | Wave 4 | design v1.0 |
| 07 | Coding & Shipping in the Agent Era / Agent 时代的软件开发与产品交付 | [卷07-调研设计.md](./07-coding/卷07-调研设计.md) | Wave 4 | design v1.0 |
| 08 | AI Agents & Agentic Workflows / AI Agent 基础与 Agentic Workflow | [卷08-Knowledge-Matrix.md](./08-agents/卷08-Knowledge-Matrix.md)、[README](./08-agents/README.md) | Wave 1（标杆卷） | 全卷矩阵 + 2 个 CEP + 12 份来源记录 + 案例包（EVL-1） |
| 09 | Harness Engineering / Agent Harness 与软件工程执行系统 | [卷09-调研设计.md](./09-harness/卷09-调研设计.md) | Wave 5 | design v1.0（含与卷 08 去重边界） |
| 10 | Context, Memory & Agent Extensions / Context、Memory、长期任务与 Agent 扩展 | [卷10-调研设计.md](./10-context-memory/卷10-调研设计.md) | Wave 5 | design v1.0（含与卷 04 去重边界） |
| 11 | Personal & Persistent Agents / 个人 Agent、长期助理与持续自动化 | [卷11-调研设计.md](./11-personal-agents/卷11-调研设计.md) | Wave 5 | design v1.0（含与卷 06 去重边界） |
| 12 | AI Security, Reliability & Governance / AI 安全、可靠性与控制 | [卷12-调研设计.md](./12-security/卷12-调研设计.md) | Wave 6 | design v1.0 |
| 13 | Local AI, Self-hosting & Serving / 本地 AI、自部署与推理服务 | [卷13-调研设计.md](./13-local-ai/卷13-调研设计.md) | Wave 6 | design v1.0 |
| 14 | Frontier AI — AGI, Self-Improving Systems & AI Scientists / 前沿 AI、AGI、自进化系统与 AI Scientist | [卷14-调研设计.md](./14-frontier/卷14-调研设计.md) | Wave 6 | design v1.0（含与卷 05 去重边界） |

每份调研设计包含同一套骨架：Volume Contract（承诺 / 非承诺 / 前置）→ 能力结果（Outcomes）→ Knowledge Matrix 骨架 → 候选来源 → 章节证据包队列 → Canonical Case 候选 → 跨卷接口 → 开放问题与风险 → 首批核验队列。

## 制作波次

| 波次 | 卷册 | 主要目的 |
|---|---|---|
| Wave 0 | 全局规范 | 课程宪法、证据模型、双载体、模板 |
| Wave 1 | 08 | Agent 标杆卷：Tool / Workflow / Agent / Eval 术语基线 |
| Wave 2 | 04 | 办公与 PKM 标杆卷：Task / Artifact / Workspace / Knowledge 基线 |
| Wave 3 | 01、02、03 | AI 基础、模型、生态与成本 |
| Wave 4 | 05、06、07 | 科研、设计媒体、编程交付 |
| Wave 5 | 09、10、11 | Harness、Context/Memory/Extensions、长期 Agent |
| Wave 6 | 12、13、14 | 安全可靠、本地部署、前沿 |
| Wave 7 | 01–14 全集 | 跨卷编辑、网站整合、PDF 合集 |

## 研究纪律速查

- 综合等级：`C0` 原始资料推荐 → `C1` 多来源并列 → `C2` 对照分析 → `C3` 教材综合模型；证据不足只允许 C0–C2，不伪造统一答案。
- 案例证据等级：`EVL-0` 未验证线索 → `EVL-1` 社区证据 → `EVL-2` 高可信社区 → `EVL-3` 官方演示 → `EVL-4` 多来源确认 → `EVL-5` 团队独立复现 → `EVL-6` 课堂验证。核心实验与安全案例优先复现。
- 复用模式：`BUILD`（自建）、`CURATE`（精选引用）、`ADAPT`（改编，遵守许可）、`INDEX`（只登记，不镜像）。
- 外部社交与未授权内容默认 `Index, not Mirror`：只保存标题、作者、URL、日期、摘要、Claim、案例结构与权利状态。
- 来源分歧必须保留为 `Source View`，不为目录整齐强行统一；动态事实（价格、版本、榜单、界面）与稳定正文分离。
- Knowledge Matrix 每条须标注成熟度（Fundamental / Established / Developing / Emerging / Frontier）与本卷深度。

## 当前进度（2026-09-10）

- 14 卷调研设计全部落地；卷 08 与卷 04 为标杆卷，其余 12 卷为 `research design v1.0`，进入波次生产时逐章深化。
- 卷 08：全卷 Knowledge Matrix、2 个 Chapter Evidence Packet（`C2`）、12 份 Source Record、设计级 Case Asset Pack（`EVL-1`），正文已产出卷首与前两章草稿。
- 卷 04：任务地图、PKM 生命周期、来源课程矩阵、20 章 CEP 队列；已迁入两份真实案例集快照并建立 Source Record。
- 第二批收录（2026-09-10）：Microsoft Generative AI for Beginners、Anthropic Cookbook、OpenAI Agents SDK、鱼皮 ai-guide、Vibe Coding CN、Qclaw 六份快照，全部完成 Git blob 校验（见 `upstream/` 各区台账）。
- 上游快照：卷 08 六份来源（四门课程 + Cookbook + Agents SDK），卷 04 两份案例集（WorkBuddyGuide `814ec83` MIT；DoubaoWork Guide `ad7338e` MIT），卷 07 两份 Vibe Coding 教程，卷 11 Qclaw，卷 01 Microsoft GenAI。

## 下一步

1. 卷 08 第 3 章证据包，并复现首个 Canonical Case（`EVL-1 → EVL-5`）。
2. 卷 04 首章 `CEP-04-01`；为 7 个投稿案例建立案例卡片候选。
3. 媒体核权：两份案例集的截图、品牌标志与个人数据逐项确认。
4. 术语回查：14 卷中英文卷名与 Canonical Concept Registry 首讲位置。

## 已知缺口

- `Source Record` 模板中的 `source_tier`（T1–T3）尚无成文定义，各卷使用时需先补齐判据。
- 除卷 08、04、07、11 与卷 01 的 Microsoft GenAI 外，其余卷的候选来源仍为线索级，未建立 Source Record。
- 14 卷的 Knowledge Matrix 目前为骨架，尚未逐章深化到可写作粒度。
- Datawhale `easy-vibe`、`vibe-vibe`、`hello-claw` 及豆包蓝皮书媒体尚未完成权利确认；`liyupi/ai-guide` 为 NC/SA，需先确定本项目许可策略。
