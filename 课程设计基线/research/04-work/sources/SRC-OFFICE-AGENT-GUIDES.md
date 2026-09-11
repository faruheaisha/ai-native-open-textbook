---
source_id: SRC-OFFICE-AGENT-GUIDES
title: 办公 Agent 使用方法来源（WorkBuddy / Coze 案例指南 + WorkBuddy Harness 蓝皮书）
publisher: 各开源作者
source_tier: T3
source_type: community_practice_guide
canonical_url: https://github.com/tangshiyegit/agent-guide
published_at: 2026 年内
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: 见表
status: accepted
license: MIT / CC BY-SA 4.0（正文）
rights_status: mixed_see_table
language: 中文
---

# Source Record：办公 Agent 使用方法来源

本批新增两条"办公 Agent 具体怎么用"的结构化来源，与已有的 `qwenwork-guide`（千问办公绿皮书）、`workbuddy-guide`、`doubaowork-bluebook`、`awesome-workbuddy` 构成卷 04 的社区来源集群。

## 总表

| 本地目录 | 仓库 | Stars | 许可 | pinned commit | 规模 |
|---|---|---|---|---|---|
| `agent-guide-office/` | `tangshiyegit/agent-guide` | 20 | MIT | `ae8b2262` | 65 文件（仅迁入 WorkBuddy + Coze 指南） |
| `zhijian-ai-bluebook-workbuddy-harness/` | `zjp1997720/zhijian-ai-bluebook-workbuddy-harness` | 205 | **CC BY-SA 4.0（正文）/ MIT（示例代码）** | `6ac68cd4` | 7 文件（含 54 MB 单文件 `book.html`） |

## 1. tangshiyegit/agent-guide（MIT）——"办公案例"结构化最好的一份

- **站点**：`tangshiye.cn`（VuePress）
- **仓库结构**：`src/WorkBuddy指南`（23 篇）+ `src/Coze指南`（37 篇）+ `src/编程_架构设计`（760 篇通用编程，**与本项目无关，未迁入**）
- **WorkBuddy 指南目录（快照实读）**：
  - 基础入门 8 篇：初始化、专家/专家团/Skill 的区别、整理散乱图片、连接器整理会议纪要、数据分析、手机版远程控制电脑、自动化任务、**"越用越蠢？这 8 大焚决拿好"**（上下文与模型管理）
  - 自媒体案例 2 篇：WorkBuddy + ima 的 AI 写作工作流；小红书图文与 60 秒短视频脚本
  - 办公案例 12 篇：生成高质量 PPT、整理桌面发票、每日资讯简报、生成 Word/PPT、处理文件、定时发送邮件简报、**零代码制作本地应用**、分析数据并生成图表、**创建自己的 Skill**、一句话管理腾讯会议、自动送邮箱的资讯简报、零基础数据看板
- **教学价值**：这是把"办公 Agent 的使用"从**功能列表**变成**任务-产物**对的样本（每一项都有具体交付物：PPT/发票归档/看板/简报）。卷 04 的任务单元可直接以此为选题池。
- **注意**：README 明确"在线阅读请访问站点，GitHub 仓库主要用于保存与同步源码"——**站点可能是唯一完整版本**，引用时须标注访问日期。

## 2. zjp1997720/zhijian-ai-bluebook-workbuddy-harness（CC BY-SA 4.0 正文）

- **定位（仓库 description）**："拆解 WorkBuddy 的提示词、记忆、插件、专家、Skill 与安全边界。"
- **作者/出版物署名**：`book.html` 头部为 `大鹏主编｜智见 AI 出品`；书名《WorkBuddy Harness：证据驱动的 AI Agent 技术与实践》。
- **可追溯性实践（本批第三个高价值样本）**：仓库含
  - `PUBLICATION-MANIFEST.json`（发布物清单）
  - `CHECKSUMS.sha256`（发布物校验和）
  - `CHANGELOG.md`
  - `LICENSES.md`（**分资产许可声明**）
- **许可结构（`LICENSES.md` 实读）**：
  - 原创正文 + 确定性知识图：**CC BY-SA 4.0**（有传染性）
  - 原创示例代码：MIT
  - **品牌资产（名称、Logo、"智见小蓝"角色设定）：保留全部权利，不随正文或代码开放**
  - 含**独立性声明**："除非另有说明，与 WorkBuddy 及相关厂商无隶属或官方合作关系。"
- **本项目的处理建议**：
  1. 正文若**改编**其内容 → 衍生作品须以 CC BY-SA 4.0 发布，与卷册当前许可策略可能冲突；
  2. 建议**只做转述引用**（不改编），或把该来源限定在"证据驱动的写法"这一方法论层面的示范；
  3. 品牌资产不得使用；
  4. `book.pdf`（42 MB）未迁入，`book.html`（54 MB）已迁入作为内容证据。

## 3. 与已有来源的关系

| 来源 | 覆盖产品 | 形态 | 许可 |
|---|---|---|---|
| `qwenwork-guide/`（已有） | **千问办公** | 绿皮书四部分 + 11 类 64 个教育场景 Skill | MIT |
| `workbuddy-guide/`（已有） | WorkBuddy | 实战蓝皮书 600+ 篇 | 待核 |
| `doubaowork-bluebook/`（已有） | 豆包工作 | 蓝皮书 | 待核 |
| `awesome-workbuddy/`（已有） | WorkBuddy | 提示词 + **运行记录（run.json / output.md / client_report.md）** | CC0 |
| `agent-guide-office/`（本批） | WorkBuddy + Coze | 案例教程 23 + 37 篇 | MIT |
| `zhijian-ai-bluebook-.../`（本批） | WorkBuddy | 技术蓝皮书（证据驱动） | CC BY-SA 4.0 |

**覆盖缺口**：ChatGPT Work、Claude Cowork、Manus、Genspark、Flowith 等产品的**结构化使用方法**在本轮 GitHub 检索中未找到同等质量的来源。卷 04 若需要这些产品的对照单元，须自建（官方文档 + 自测）。

## 权利与复用

- MIT：可自由使用，保留声明。
- CC BY-SA 4.0：可引用与转述；**改编触发 SA**；品牌资产不可用。
- 所有来源的**产品功能细节**（按钮位置、积分规则、入口名称）均为 Live Facts，引用前回官方帮助中心核验。

## 教材价值

- 映射卷册：**04（主）**；08（专家团 / Skill / 连接器机制）；12（安全边界）。
- 映射 Concepts：Office Agent、Skill、Expert/Expert Team、Connector、Automation、Local App、Data Dashboard、Context Management、Skill Authoring、Evidence-Driven Writing。
- 结构复用 S1：**高** —— `agent-guide-office` 的"基础入门 → 场景案例（自媒体 / 办公）"两段式，是本项目卷 04 可直接借用的编排。
- 知识复用 S2：中（大量产品细节需核验）。
- 案例/资产复用 S3：中高（案例可作选题池），但**每一项都需本项目自行复现**。
- 建议处理：**CURATE（任务-产物对）+ INDEX（产品细节）**。

## 质量与风险

- Authority：个人/团队开源，无厂商背书（`zhijian` 主动声明无隶属关系，是良好实践）。
- Freshness：2026 年内。
- **风险 1**：办公 Agent 产品迭代快，教程里的入口、名称、额度极易失效。
- **风险 2**：`agent-guide` 的完整内容在站点，仓库是源码；站点若下线则来源消失 → **已落盘的快照是可引用性的保障**。
- **风险 3**：`zhijian` 的 CC BY-SA 4.0 与卷册许可策略需先决策，未决策前不得改编。
- **风险 4**：社区教程普遍缺"失败案例"，容易造成能力夸大印象；教学时必须配自测与限制说明。

## 提取的 Claims

1. `tangshiyegit/agent-guide` 含 WorkBuddy 指南 23 篇与 Coze 指南 37 篇，覆盖 PPT、发票归档、数据看板、邮件简报、自定义 Skill 等办公场景。来源：仓库 tree 与 README（已落盘）。
2. `zhijian-ai-bluebook-workbuddy-harness` 正文为 CC BY-SA 4.0，示例代码为 MIT，品牌资产保留全部权利，且声明与厂商无隶属关系。来源：`LICENSES.md`（已落盘）。
3. 该蓝皮书自称"拆解 WorkBuddy 的提示词、记忆、插件、专家、Skill 与安全边界"。来源：仓库 description。
4. 两份来源均为 2026 年内发布，作者与厂商的官方关系未在仓库内声明。来源：README / LICENSES.md。
