---
source_id: SRC-QWENWORK-OFFICIAL-HELP-CN
title: 千问办公官网帮助中心（qwenwork.cn/docs）——第二套官方文档 + 企业治理 OpenAPI
publisher: 千问办公（阿里）官网帮助中心
source_tier: T1
source_type: vendor_official_docs
canonical_url: https://qwenwork.cn/docs
published_at: 持续更新（抓取 2026-09-10）
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: 首次收录
status: accepted
license: 站点条款（官方文档）
rights_status: cite_only
language: 中文
---

# Source Record：千问办公官网帮助中心

## 为什么重要

前批只拿到阿里云侧的 `help.aliyun.com/zh/qwenwork`（102 页 HTML + 234 篇 `.md`）。本批发现**同一产品还有第二套官方文档站** `qwenwork.cn/docs`，覆盖面不同：阿里云侧偏"开通与计费"，官网侧偏"产品能力与企业管理"。两者合起来才构成办公 Agent 的完整官方口径。

**更关键的是**：官网侧暴露了**企业版 Admin OpenAPI**（103 个端点），这是本项目首次拿到办公 Agent 的**治理面一手接口清单**。

## 1. 抓取结果

| 项 | 值 |
|---|---|
| 站点 | `https://qwenwork.cn/docs` |
| 发现方式 | Bing 检索 → 站点 `sitemap.xml`（**210 个 URL**） |
| 已落盘 | **107 个文档页**（每页 HTML + 正文文本，共 214 个文件），`fail=0` |
| 未落盘 | 103 个 Admin OpenAPI 端点——**有意只登记不抓取**（避免堆叠），端点清单见 `_快照信息.md` |
| 机读端点 | 该站**不提供** `llms.txt` / `llms-full.txt`（均 404）；但页面为 SSR，可从 `<article class="doc-article">` 提取正文 |

## 2. 三层治理结构（本批最有价值的发现）

官网文档把产品切成三层，可直接映射为卷 04 的教学骨架：

**第一层 · 使用（个人/团队）**
`getting-started/`（入口、桌面工作流、基础工作流、通用设置、隐私与安全）、`web/`（网页端、网盘、网页、平台、定时任务）、`install/`（macOS / Windows / HarmonyOS）、`workspaces/`（设计 / 幻灯片 / 写作）、`features/`（连接器、扩展、模型选择、技能、语音输入）、`pricing/`、`benefits/`

**第二层 · 企业**
`enterprise/admin`、`enterprise/members`、`enterprise/sso`、`enterprise/credits`、`enterprise/flagship/`：
- 组织：`organization-management/`（组织信息、管理员角色）、`user-management/`（用户、用户组、用户同步）
- 身份：`identity-authentication/` —— **OIDC / SAML2 / OAuth2 / Azure AD / 钉钉 / 飞书 / 企微** 七种；`user-sync/` —— 钉钉 / 飞书 / 企微 / Entra ID / OpenLDAP / SCIM / **Windows AD**
- 资产：`ai-asset-management/`（连接器、专家套件、技能）
- 模型：`model-management/`（模型目录、模型策略）
- 用量：`subscription-usage/`（订阅、订单、发票与合同、配额管理）

**第三层 · 平台治理与安全**
`security-control/`（Hooks、IM 频道、敏感词、可信设备、可信网络）、`audit-logs/`（管理 / AI / 用户 三类）、`analytics/`（总览、用量）、`open-platform/`（应用授权、开发者文档）、`personalization/`

**Admin OpenAPI（103 个端点）**覆盖的治理对象：`admin-roles`、`connector-policies`、`connectors`、`departments`、`directory-sync-sources`、`expert-suite-policies`、`expert-suites`、`hook-policies`、`model-policies`、`network-ranges`、`quota-policies`、`sensitive-word-libraries`、`skill-categories`、`skill-policies`、`skills`、`trusted-device-policies`、`user-groups`、`users`。

> 观察：**"策略"是一个独立实体**（connector-/expert-suite-/hook-/model-/quota-/skill-/trusted-device-policies）。即企业不是"开关能力"，而是"为能力挂策略"。这是卷 12（安全）可用的结构判断。

## 3. Hooks：跨厂商事件名收敛（一手证据）

官方 Hooks 页给出**企业 Hook 的 6 个事件**，并明确哪些可阻断操作：

| 事件 | 触发时机 | 可否阻断 |
|---|---|---|
| `SessionStart` | 会话启动、恢复、清空或压缩后重新进入会话 | 不建议用于阻断 |
| `UserPromptSubmit` | 用户提交内容后、内容进入 Agent 前 | **可以** |
| `PreToolUse` | Agent 调用工具前 | **可以** |
| `PostToolUse` | 工具执行完成后 | 不可（工具已执行，无法撤销） |
| `Stop` | Agent 准备结束当前响应时 | **可以阻止 Agent 停止** |
| `Notification` | Agent 产生通知时 | 不建议用于阻断 |

配置形态：企业后台【安全管控】→【Hooks 规则】中按事件填写 JSON 数组，元素为 Hook 组；组内 `matcher` 决定匹配时机（`PreToolUse`/`PostToolUse` 匹配**工具名**，`SessionStart` 匹配 `source`，`Notification` 匹配通知类型；`UserPromptSubmit` 与 `Stop` 不需 `matcher`），`hooks[]` 指定服务（`type: http`、`url`、`timeout`、`headers`）。空数组即不调用。

**对照结论（本批新增，可写进卷 09）**：本仓库同时收录的《御舆》第 8 章列出的 Claude Code 生命周期事件为 `PreToolUse` / `PostToolUse` / `UserPromptSubmit` / `SessionStart` / `Stop` / `Notification` / `SubagentStart` / `SubagentStop` / `PreCompact` / `SessionEnd` 共 10 个。**千问办公的 6 个事件名与 Claude Code 完全一致，且是其子集**——而千问办公是一份中文官方文档。

→ **可教的判断**：hook 事件命名已经跨厂商收敛为一套事实标准；差异不在命名，而在**哪些事件允许阻断执行**的取舍。

## 4. 与阿里云侧官方文档的分工

| | 阿里云帮助中心（前批） | 官网帮助中心（本批） |
|---|---|---|
| 路径 | `help.aliyun.com/zh/qwenwork/` | `qwenwork.cn/docs` |
| 规模 | 102 页 + 234 篇 md | 107 页 |
| 侧重 | 开通、计费、入门、常见问题、公告 | 产品能力、工作台、企业管理、治理、OpenAPI |
| 槽点 | 有 WAF 挑战页，需慢速补抓 | 无 llms.txt；OpenAPI 端点需自行登记 |

**两者不可互相替代**，引用时必须写清是哪一套。

## 5. 复用约束

- 官方文档，受站点条款约束；本快照仅用于**内部研究、事实核对与短文摘引**，须注明来源与抓取日期。
- 产品细节（入口、额度、端点名）属 **Live Facts**，引用前回官方页面核验。
- 图片与交互资产未镜像。
- 抓取过程未对站点做批量探测以外的行为；后续请避免高频访问。

## 6. 关联

- 前批阿里云侧：[`SRC-QWENWORK-OFFICIAL-HELP.md`](SRC-QWENWORK-OFFICIAL-HELP.md)
- 社区侧：[`SRC-AGENT-PRODUCTS-LANDSCAPE.md`](SRC-AGENT-PRODUCTS-LANDSCAPE.md)（小绿书 133 篇为交叉核验用，非真源）
- 跨厂商 hooks 对照：`research/09-harness/sources/SRC-CLAUDE-CODE-BOOK-YUYU.md`
