---
title: "Tasks: daily-news-agent"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/specs/daily-news-agent/tasks.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/specs/daily-news-agent/tasks.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/specs/daily-news-agent/tasks.md"
sourceSha256: "fc102580ab34a4bce6a19c62cb26e403709eb21cc5f51628b07f36714e8e7fd2"
pageSha256: "fc102580ab34a4bce6a19c62cb26e403709eb21cc5f51628b07f36714e8e7fd2"
contentMode: "local-full"
zh: ""
---

# Tasks: daily-news-agent

**Input**: `specs/daily-news-agent/plan.md` + `specs/daily-news-agent/spec.md`  
**Branch**: `daily-news-agent` | **Date**: 2026-05-11  
**TDD**: 所有实现类任务先写 vitest test，测试跑红后再写实现

---

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: 可并行（不同文件，无互相依赖）
- **[US1/US2/US3]**: 对应 spec.md 的用户故事
- **TDD**: 先写测试（跑红）→ 再写实现（跑绿）

---

## Phase 1: Setup（基础设施安装）

**Purpose**: 安装 WeChat 渠道、添加 rss-parser 依赖  
**⚠️ 无依赖，T01/T02 可并行启动**

- [ ] T01 安装 `/add-wechat` 渠道（6 步）：`git fetch origin channels` → `git show origin/channels:src/channels/wechat.ts > src/channels/wechat.ts` → 追加 `import './wechat.js';` 到 `src/channels/index.ts` → `pnpm install wechat-ilink-client@0.1.0` → `pnpm run build` → `.env` 追加 `WECHAT_ENABLED=true` 并 `launchctl kickstart -k gui/$(id -u)/com.nanoclaw`
  - **输入**: channels branch 上的 `src/channels/wechat.ts`
  - **输出**: `src/channels/wechat.ts` 存在，host build 成功，WeChat QR 登录页可访问
  - **TDD**: 否（操作类任务）

- [ ] T02 [P] 安装 rss-parser 依赖：`pnpm install rss-parser@3.13.0`，确认 `pnpm-lock.yaml` 更新且无 `minimumReleaseAgeExclude` bypass
  - **输入**: 当前 `package.json`
  - **输出**: `rss-parser@3.13.0` 出现在 `package.json` dependencies，lockfile 更新
  - **TDD**: 否（依赖安装）

---

## Phase 2: Foundational（阻塞性前置）

**Purpose**: 类型定义、配置常量、数据库 DDL — 所有用户故事均依赖此阶段  
**⚠️ T03 与 T01/T02 无依赖可并行；T04 依赖 T03**

- [ ] T03 [P] 创建 `src/modules/daily-news/types.ts`（`RawNewsItem`/`NewsItem`/`FetchResult`/`DailyDigest`/`DeliveryRecord` 接口）和 `src/modules/daily-news/config.ts`（`RSS_SOURCES`、`CRON_EXPR='0 9 * * *'`、`TIMEZONE='Asia/Shanghai'`、`WECHAT_GROUP_PLATFORM_ID` 占位、`MAX_ITEMS=5`、`MAX_CHARS=500`）
  - **输入**: plan.md §Data Model、§NanoClaw Integration Points
  - **输出**: 两个无副作用文件；`pnpm exec tsc --noEmit` 通过
  - **TDD**: 否（类型/常量，无逻辑）

- [ ] T04 [TDD] 写 Migration 014 测试 → 实现 `src/db/migrations/014-daily-news.ts` daily_news 表 DDL，注册到 `src/db/migrations/index.ts`
  - **输入**: T03 的 `types.ts`（`DeliveryRecord` 字段参考）；plan.md §3 DDL 代码块
  - **输出**: `up()` 创建 `daily_news` 表 + `idx_daily_news_date` + `idx_daily_news_url_date`；`down()` 完全回滚；幂等重跑 `up()` 无报错；`pnpm test` 绿
  - **TDD**: **是**（先写测试用内存 DB 验证 up/down/idempotent，测试跑红后再实现）
  - **依赖**: T03

---

## Phase 3: User Story 1 — 自动每日摘要推送 (P1) 🎯 MVP

**Goal**: 09:00 Asia/Shanghai 自动拉取新闻、生成中文摘要、推送到微信群  
**Independent Test**: 手动触发 scheduled task，60 秒内收到含 5 条中文摘要的微信消息

- [ ] T05 [P] [US1] [TDD] 写 `src/modules/daily-news/dedup.test.ts` → 实现 `src/modules/daily-news/dedup.ts`
  - **输入**: T03 `RawNewsItem` 类型
  - **输出**: `urlHash(url)` 结果稳定可重现；相同 URL 去重保留第一条；不同 URL 不误合并；空数组返回空数组；`pnpm test` 绿
  - **TDD**: **是**（先测试跑红，再实现纯函数）
  - **依赖**: T03；与 T06/T07/T08/T12 可并行

- [ ] T06 [P] [US1] [TDD] 写 `src/modules/daily-news/prompt-builder.test.ts` → 实现 `src/modules/daily-news/prompt-builder.ts`
  - **输入**: T03 `config.ts` 中 `TIMEZONE`/`MAX_ITEMS`；plan.md §schedule_task 代码块
  - **输出**: `getNext9amShanghai()` 始终返回未来时间戳且 ≥ 下一个 09:00；`buildTaskPrompt()` 包含所有必填字段；文章列表截断至 50 条；单条标题截断至 120 字符；边界：setup 恰好在 09:00:00 时推进到次日；`pnpm test` 绿
  - **TDD**: **是**（先测试跑红，再实现）
  - **依赖**: T03；与 T05/T07/T08/T12 可并行

- [ ] T07 [TDD] [US1] 写 `src/modules/daily-news/db.test.ts`（CRUD 部分）→ 实现 `src/modules/daily-news/db.ts`
  - **输入**: T04 migration 014（需要 `daily_news` 表存在）；T03 `DeliveryRecord` 类型
  - **输出**: `insertItems()` 写入正确行；`markFailed()` 将 `failed` 翻转为 1；`getPendingRepush()` 只返回 `failed=1` 的行；`(url, date)` unique constraint 阻止重复插入；`pnpm test` 绿
  - **TDD**: **是**（先测试跑红，再实现）
  - **依赖**: T04（需要表 DDL 存在）

- [ ] T08 [P] [US1] [TDD] 写 `src/modules/daily-news/fetcher.test.ts`（成功路径）→ 实现 `src/modules/daily-news/fetcher.ts` 基础抓取逻辑
  - **输入**: T03 `RawNewsItem`/`FetchResult` 类型；`rss-parser@3.13.0`（T02）；plan.md HN Algolia URL
  - **输出**: `fetchHackerNews()` 返回符合 `RawNewsItem` 结构的数组；`fetchRssSource()` 正确映射 rss-parser 输出；使用 `vitest` mock 模拟 HTTP（不打真实网络）；`pnpm test` 绿
  - **TDD**: **是**（先测试跑红，再实现）
  - **依赖**: T02、T03；与 T05/T06/T07/T12 可并行

- [ ] T09 [US1] [TDD] 写 `src/modules/daily-news/setup.test.ts` → 实现 `src/modules/daily-news/setup.ts`（`registerDailyNewsTask` + `schedule_task` MCP 注册）
  - **输入**: T06 `buildTaskPrompt()`/`getNext9amShanghai()`；T07 `db.ts` insertTask 调用；plan.md §schedule_task 代码块（`recurrence='0 9 * * *'`，`timezone='Asia/Shanghai'`）
  - **输出**: `registerDailyNewsTask()` 以正确 `recurrence='0 9 * * *'` 调用 `insertTask()`；`processAfter > Date.now()`；content JSON 可解析且含 `prompt` 字段；`pnpm test` 绿
  - **TDD**: **是**（先测试跑红，再实现）
  - **依赖**: T06、T07

- [ ] T10 [US1] 实现 `src/modules/daily-news/index.ts`（模块入口：export `registerDailyNewsTask`，注册 delivery hook）
  - **输入**: T08 fetcher、T05 dedup、T06 prompt-builder、T07 db、T09 setup；T12 formatter（如先完成则 wire）
  - **输出**: `import './daily-news/index.js'` 加到 `src/modules/index.ts`（或等价位置）后 `pnpm build` 通过；模块导出正确
  - **TDD**: 否（集成 wire，由 integration test 覆盖）
  - **依赖**: T09（setup 完成）、T08（fetcher 完成）

---

## Phase 4: User Story 2 — 单源失败部分投递 (P2)

**Goal**: 某 RSS 源不可达时跳过该源，仍从其他源投递；全源失败时推送固定提示  
**Independent Test**: mock 其中一个 RSS 源返回 500，验证其他源的条目仍正常投递且 WARN 日志出现

- [ ] T11 [US2] [TDD] 在 `src/modules/daily-news/fetcher.test.ts` 追加重试测试 → 在 `fetcher.ts` 中实现每源 3 次重试 + WARN 级别日志跳过 + 全源失败时 `FetchResult.items=[]` + `warnings` 回传
  - **输入**: T08 已有的 `fetcher.ts`；plan.md §Failure Branch；spec.md CL-01
  - **输出**: 单源失败耗尽 3 次后 `warnings` 包含该源名；第 2 次重试成功时返回正常 items；全源失败时 items 为空（触发固定消息路径）；`pnpm test` 绿
  - **TDD**: **是**（先追加测试跑红，再扩展实现）
  - **依赖**: T08

---

## Phase 5: User Story 3 — 长摘要自动拆分 (P3)

**Goal**: 消息总长 >500 字符时拆为 2 条，不截断任何条目  
**Independent Test**: 构造 >500 字符的 5 条摘要，验证收到恰好 2 条微信消息且所有条目完整

- [ ] T12 [P] [US3] [TDD] 写 `src/modules/daily-news/formatter.test.ts` → 实现 `src/modules/daily-news/formatter.ts`
  - **输入**: T03 `NewsItem`/`DailyDigest` 类型；spec.md FR-010/FR-011；plan.md §formatter
  - **输出**: ≤500 字符 → 恰好 1 条消息；>500 字符 → 恰好 2 条消息（在条目边界分割）；0 条目 → 固定字符串 `"今日 AI 工程领域无显著动态，明日 9:00 再见"`；5 条目所有字段存在；无条目被截断；`pnpm test` 绿
  - **TDD**: **是**（先测试跑红，再实现纯函数）
  - **依赖**: T03；与 T05/T06/T08 可并行（不依赖 T04 ~ T09）

---

## Phase 6: Polish & 运维就绪

**Purpose**: 模块 wire 进 host、开发调试工具、OneCLI 权限确认

- [ ] T13 [P] 实现 `src/modules/daily-news/runner.ts`（手动触发 smoke-runner：一次性执行 fetch → dedup → prompt-build → format 管道，输出到 console，URL 健康检查）
  - **输入**: T08 fetcher、T05 dedup、T06 prompt-builder、T12 formatter
  - **输出**: `pnpm exec tsx src/modules/daily-news/runner.ts` 可运行，打印摘要预览，不需要 WeChat 实际连接
  - **TDD**: 否（开发工具）
  - **依赖**: T05、T06、T08、T12；与 T14 可并行
