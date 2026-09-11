---
source_id: SRC-QWENWORK-LEARN-STATION
title: 千问办公学习站「职场AI三千问」
publisher: 第三方整理站（站点页脚自述“内容整理自官方帮助中心，仅供学习参考”）
author: 未署名（未在 GitHub 找到对应仓库）
source_tier: T2
source_type: compiled_learning_site_and_case_library
canonical_url: https://learn.qwenwork.host/
published_at: null
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: 站点快照（无 commit 可锚定，按抓取日期）
status: accepted_index_only
license: 未声明
rights_status: no-license-declared; official-help-center-content-upstreamed; media-rights-unknown
language: zh-CN
---

# Source Record：千问办公学习站「职场AI三千问」

## 身份核验

- 官方/原始身份依据：站点页脚写明“职场AI三千问 · 千问办公学习站 · 内容整理自官方帮助中心，仅供学习参考”；页面出现 `qwenwork.cn/app` 深链与“立即体验千问办公”入口，但**不是官方域名**，也未找到 GitHub 仓库。
- 版本或发布日期：无版本号；正文含“产品新鲜事”第 1 期（9 月 3 日）与第 2 期（9 月 9 日），可判断站点在 2026-09 持续更新。
- 是否仍维护：是（每周上新栏目）。
- 替代/迁移关系：上游是官方帮助中心（`help.aliyun.com/zh/qwenwork`）与产品上新信息；本站是二次整理与编排，出问题时以官方为准。

## 本地快照

- 本地路径：`upstream/04-work/qwenwork-learn-station/`
- 抓取日期：2026-09-10；方式：同域 BFS 抓取 `.html`（35 个页面）+ 站点自带 `assets/`（JS/CSS）+ 案例库数据文件
- 案例库数据：`cases/assets/cases-data.js`（97.5 KB）——51 个案例、20 类任务、44 个视频的完整结构化数据（含可粘贴 Prompt 原文）
- 未抓取：图片、封面、One Page 长图、直播视频、外部媒体
- 校验：静态页为直接 HTTP 取回原文；案例数据文件为站点前端实际加载版本

## 内容范围

- 解决的问题：把千问办公的能力说明、常见任务、场景实战、课程与真实案例整理成一个可直接导航的学习站。
- 站点结构：
  - `docs/getting-started/` 新手入门（「千问办公」是什么、快速上手）
  - `docs/features/` 核心功能 15 篇（钉钉深度集成、模型选择、设置、语音输入、应用快照、意识、专家套件、技能、连接器、定时任务、我的网页、个人空间、企业版、工作区等）
  - `docs/tasks/` 常见任务 6 篇（内容生成、数据分析、钉钉集成、多媒体、信息调研、做网站与应用）
  - `docs/scenarios/` 场景实战 5 篇（电商、闪购、营销、咨询、教育），另附 2 份真实交付物 HTML（品牌经营周报、转化率归因诊断报告）
  - `docs/faq.html` 22 问（能力边界、任务失败排查、积分消耗、权限与连接器、文件与数据安全、内容质量与专业责任）
  - `courses/` 课程内容：系列一「AI 办公必修课」、系列二「问点新东西」（产品开箱演示 90 分钟、9 个钉钉隐藏玩法）、系列三「岗位提效实战课」（师生提效实战课），含直播回放与 One Page 速览
  - `cases/` 用户实战案例精选：51 个案例，覆盖 18–20 类高频任务
  - `whatsnew/` 产品新鲜事：每周上新的能力清单（连接器/技能/专家套件上架数量、钉钉玩法、多人工作台等）
- 不覆盖的内容：不是官方文档的完整镜像；不含 API 参考；案例多为用户投稿，效果未独立验证。

## 权利与复用

- 正文许可：**未声明**。按 INDEX 处理：只做链接与短摘引，注明来源与抓取日期。
- 代码许可：站点前端资源（`content-runtime.js`、`site.css` 等）未声明许可。
- 图片/GIF/视频许可：未镜像；站点媒体与直播回放权利未知。
- Attribution 要求：引用需注明“职场AI三千问 · 千问办公学习站”，并说明其自述来源为官方帮助中心。
- Share-alike / Noncommercial：未知。
- 允许操作：Link / Quote（短）；**不做 Adapt / Mirror**，直到获得授权。
- 补充：页面内引用的官方帮助中心内容，其权利归阿里云/千问办公，按官方条款处理。

## 教材价值

- 映射卷册：04（主）；06（多媒体素材案例）；10（技能、连接器、专家套件的能力体系）；11（定时任务与长期任务）。
- 映射 Concepts：Skill、Connector、Expert Suite、Scheduled Task、Agent Loop、Artifact、Verification、Human-in-the-loop。
- 映射 Tasks：Document、Analysis、Research、Creation、Automation、Knowledge、Shop Operations（电商/闪购）。
- 结构复用 S1：高——「功能 → 常见任务 → 场景 → 案例库 → 每周上新」是一个可直接借鉴的教材信息架构，尤其适合“任务优先”的卷 04。
- 知识复用 S2：中高——FAQ 里的边界、积分、权限、安全、专业责任问题列表，可作为课程风险提示章节的问题清单来源（须回官方核实）。
- 案例/资产复用 S3：中——51 个案例含 Prompt 与交付物，可作为 Canonical Case 的候选；但许可未声明，只能作为研究线索，不能直接改写进正文。
- 建议处理：INDEX（研究与线索）+ 授权后转 CURATE。

## 质量与风险

- Authority：第三方整理，非官方；但内容可以逐条回溯到官方帮助中心与产品上新公告。
- Freshness：高漂移；产品周更。任何引用必须带抓取日期，并在正文写“以官方为准”。
- Educational Value：高——案例库结构完整（任务、角色、交付物、Prompt、演示视频）。
- Reproducibility：中——依赖千问办公产品环境与账号权限；部分案例需要企业数据。
- Maintenance：活跃。
- 已知错误/过时项：案例库数据文件中的统计与前端展示数量可能变化；页面“案例库”首屏为空是因为数据为客户端加载，需读 `cases-data.js`。
- 厂商 Claim 与独立证据的区别：站点整体为千问办公生态视角；FAQ 中的安全与权限回答是产品侧说法，课程中须标注为“产品自述”并另行验证。

## 提取的 Claims

1. 案例库收录 51 个用户案例、20 类任务、44 个视频。位置：`cases/assets/cases-data.js` 顶部 `QW_STATS`。
2. 20 类任务标签包含看板搭建、活动策划、店铺运营、做网站 & 应用、数据分析、信息调研、教育、做多媒体素材、钉钉集成、Excel 搭建、生成 word/excel/ppt、备课、论文、招聘、产品生图、竞品分析、人才培养、制作视频、电商、量化投资。位置：同文件 `QW_TASKS`。
3. 案例数据源自钉钉 AI 表格「千问办公 · 案例库」。位置：`cases/index.html` 页脚自述。
4. 产品新鲜事第 1 期称“近 3 周上线 200+ 连接器和技能（连接器 43、专家套件 9、技能 155）”。位置：`whatsnew/index.html`。属于产品侧声明，须回官方核实。
5. 站点自述内容整理自官方帮助中心、仅供学习参考。位置：`index.html` 页脚。