---
source_id: SRC-AGENT-PRODUCTS-LANDSCAPE
title: 办公/通用 Agent 产品来源全景（2026-09-10 可达性实测 + 官方文档快照 + GitHub 侧来源）
publisher: 本项目检索
source_tier: T1 / T3（混合）
source_type: landscape_survey
canonical_url: 见下表
published_at: 2026-09-10
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: 首次收录
status: accepted
license: 各来源分别适用
rights_status: mixed_see_table
language: 中文 / 英文
---

# Source Record：办公与通用 Agent 产品来源全景

## 一、官方文档可达性实测（2026-09-10，本机直连）

| 产品 | 官方入口 | 实测 | 快照结论 |
|---|---|---|---|
| **千问办公** | `help.aliyun.com/zh/qwenwork/` + `qwenwork.cn` | 200；`llms.txt` 53,835 字节；239 个逐页 `.md` | ✅ 已落盘（102 页 HTML + llms.txt + 239 篇 md） |
| **Manus** | `manus.im/docs` | 200；`llms.txt` 6,744 + `llms-full.txt` 228,733 字节 | ✅ 已落盘（全量 Markdown） |
| **扣子 Coze** | `docs.coze.cn` | 200；`llms.txt` 129,702 字节（958 条索引） | ✅ 已落盘（llms.txt + 100 篇核心 .md） |
| **Dify** | `docs.dify.ai` | 200；`llms.txt` 2,358 + `llms-full.txt` 2,980,752 字节 | ✅ 已落盘（全量 Markdown） |
| **WorkBuddy / CodeBuddy** | `copilot.tencent.com` | 200；`llms.txt` 3,665 字节 | ✅ 已落盘（官方说明索引） |
| **豆包办公** | `www.doubao.com/help` | 200 但为 SPA（静态正文约 2,197 字符，无可抓文档结构） | ❌ 未快照；以社区来源 + 技能档案代替 |
| **Genspark** | `www.genspark.ai` | **403**（Cloudflare 拦截） | ❌ 未快照 |
| **Flowith** | `flowith.io` / `docs.flowith.io` | **000**（不可达） | ❌ 未快照 |
| **ChatGPT（Work / agent）** | `help.openai.com` | 200（可访问发布说明页）；`openai.com` 主站对本机 403 | ⚠️ 部分（待定位具体文章） |
| **Claude Cowork** | — | 本轮显式排除（Anthropic 不扩展） | — |

> **方法论提示（新）**：`llms.txt` + 逐页 `.md` 正在成为官方文档的新发布形态。本轮 5 家中 4 家（千问办公、Manus、扣子、Dify）都提供该端点，CodeBuddy 提供 llms.txt。对教材工程而言，这意味着**官方文档第一次可以像代码一样被版本化、校验与引用**。

## 二、GitHub 侧来源（办公 Agent 方向）

| 本地目录 | 仓库 | Stars | 许可 | 价值 |
|---|---|---|---|---|
| `04-work/workbuddy-bench-official/` | Tencent/workbuddy-bench | 336 | Tencent 自定义（声明不适用于欧盟） | **腾讯官方** WorkBuddy 基准（含 80 个 repo 级 SWE 任务与 18 类角色；README 实读） |
| `04-work/multi-platform-skills-archive/` | ahang1598/doubao-workbuddy-qwenwork-skills | 26 | 未声明（内容源自厂商产品） | 豆包办公 / WorkBuddy / 千问办公 / ChatGPT agent **内置 skills 与专家团的清单**（上游 22,594 文件 / 620 MB，仅迁入 5 个 README 索引） |
| `04-work/agent-guide-office/`（前批） | tangshiyegit/agent-guide | 20 | MIT | WorkBuddy 23 篇 + Coze 37 篇任务教程 |
| `04-work/qwenwork-guide/`（前批） | wangxiaoshuai1998/QwenWorkGuide | 7 | MIT | 千问办公绿皮书 + 11 类 64 个教育场景 Skill |
| `04-work/zhijian-ai-bluebook-workbuddy-harness/`（前批） | zjp1997720/... | 205 | CC BY-SA 4.0（正文） | WorkBuddy Harness 蓝皮书（证据驱动写法） |
| `04-work/awesome-workbuddy/`（前批） | staruhub/awesome-workbuddy | — | CC0 | 提示词 + 运行记录 |
| `04-work/how-to-use-dify/`（前批） | hijasonxu1/How-to-use-dify | — | 待核 | Dify 使用教程（社区） |

**Manus 侧补充证据**：GitHub 上无结构化使用指南，但存在 Manus Agent Skill 片段——`alanalyzing/lenny-skills`（从 Lenny 播客提炼的 7 个 Manus Agent Skills）、`Jonathonwang001/consulting-ppt-skill`（咨询 PPT 框架 Manus Skill）；另有 `Osly-AI/PocketManus`（MIT，PocketFlow 复刻 Manus 风格 agent，已迁入卷 08）。这组证据说明 **Manus 已具备 Skill 机制，但官方文档不在 GitHub**（→ 已用官方 llms-full.txt 覆盖）。

## 三、结论与缺口

1. **卷 04 的产品对照单元现在可以自建**：千问办公、扣子、Dify、Manus、CodeBuddy 五家已有官方一手材料；
2. **仍有缺口**：Genspark（403）、Flowith（不可达）、豆包办公（SPA 无静态文档）、ChatGPT Work（需在 help.openai.com 内定位文章）；
3. **GitHub 侧的产品使用指南高度集中于"WorkBuddy / 扣子 / 千问办公"三家**，与国内办公 Agent 的市场格局一致；
4. 所有产品细节均为 **Live Facts**，引用前回官方页面核验；快照仅作研究底本。

## 提取的 Claims

1. `manus.im/docs` 提供 `llms-full.txt`（228,733 字节），即整站官方文档的 Markdown 全集。来源：实测抓取。
2. `docs.coze.cn/llms.txt` 含 958 条文档索引，逐页提供 `.md` 端点；本轮迁入 100 篇核心页。来源：实测。
3. `Tencent/workbuddy-bench` 是腾讯官方发布的 WorkBuddy 基准仓库，采用自定义 Tencent 许可并声明"不适用于欧盟"。来源：LICENSE 与 README 实读。
4. `ahang1598/doubao-workbuddy-qwenwork-skills` 自述"按平台同步本机 AI 工具的 skills、experts 和插件市场内容"，覆盖豆包办公模式、WorkBuddy、千问办公与 ChatGPT agent。来源：README.md 实读。
5. Genspark 官方站点对本机返回 403、Flowith 域名不可达（000），本轮无法取得其官方材料。来源：curl/Invoke-WebRequest 实测。
