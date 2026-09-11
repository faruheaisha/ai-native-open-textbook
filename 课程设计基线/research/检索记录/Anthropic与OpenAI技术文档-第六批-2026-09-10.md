# 第六批：Anthropic 与 OpenAI 官方技术文档提取（2026-09-10）

本批的产出单位不是"找到多少内容"，而是**打通了两条长期阻断的通道**。在此之前，本项目对 Anthropic 与 OpenAI 的一手技术文档实际上处于"引用不到原文"的状态。

## 一、本批解决的问题

| 此前状态 | 本批结果 |
|---|---|
| Anthropic 全站不可达；卷 09 关于 context reset / 评估者分离 / 两段式 harness 的全部认知只能来自中文转述 | **全站可达**。两篇关键工程文原文落盘，转述链解除 |
| `openai.com`、`platform.openai.com`、`help.openai.com` 持续 403；Codex 侧只能用社区材料 | **找到可达替代通道**（`developers.openai.com` / `learn.chatgpt.com`，全站 Markdown 化），六套官方文档落盘 |
| 卷 09 隐喻之争被登记为阻断项 P0-D | 两种读法并列成文，**阻断解除** |

## 二、通道实测（2026-09-10，全部 `-NoProxy` + 完整浏览器 UA）

### Anthropic

| 端点 | 状态 | 说明 |
|---|---|---|
| `www.anthropic.com/engineering` | 200（177 KB） | 无 llms.txt，走 sitemap |
| `www.anthropic.com/sitemap.xml` | 200（69 KB） | 529 URL，`/engineering` 27 条 |
| `www.anthropic.com/llms.txt` | **404** | — |
| `docs.anthropic.com/llms.txt` | **200**（67.8 KB） | 628 条英文链接 |
| `docs.anthropic.com/llms-full.txt` | 200（34.7 MB） | 有意未迁入 |
| `docs.anthropic.com/sitemap.xml` | 200（411 KB） | — |
| `platform.claude.com/llms.txt` | 200 | 与 docs.anthropic.com 一致（镜像） |
| `docs.claude.com/llms.txt` | 200 | 同上（镜像） |
| `code.claude.com/docs/llms.txt` | **200**（45.5 KB） | 202 条（Claude Code 产品文档） |
| `code.claude.com/docs/llms-full.txt` | 200（8.9 MB） | 已迁入 |
| `code.claude.com/docs/sitemap.xml` | 200（261 KB） | — |

> **发现路径**：抓 `docs.claude.com/en/docs/claude-code/overview.md` 时，页面头部自带 "Fetch the complete documentation index at: https://code.claude.com/docs/llms.txt"。**官方文档自己指路**——这是可复用的方法：抓任意一页后先读它的头部元信息。

> **并发限制**：`www.anthropic.com` 对并发敏感。4 线程时 27 条全部失败；**降至 2 线程 + 1500 ms 间隔后全部通过**。其余 Anthropic 子域（docs / platform / code.claude.com）用 6 线程无问题。

### OpenAI

| 端点 | 状态 | 说明 |
|---|---|---|
| `developers.openai.com/llms.txt` | **200**（5.85 KB） | 站点总索引，列出 **11 个文档集入口** + 常用任务 |
| `developers.openai.com/codex/llms.txt` | 200（26 KB，160 条） | Codex 文档 |
| `learn.chatgpt.com/llms.txt` | 200 | 与上条同内容 |
| `developers.openai.com/blog/llms.txt` | 200（6.3 KB，29 条） | 开发者博客 |
| `developers.openai.com/cookbook/llms.txt` | 200（12.4 KB，51 条） | Cookbook |
| `developers.openai.com/api/llms.txt` | 200（794 B） | 路由索引 |
| `developers.openai.com/api/docs/llms.txt` | 200（41.8 KB，227 条） | API 指南 |
| `developers.openai.com/api/reference/llms.txt` | 200（36 KB，216 条） | API 端点参考 |
| `developers.openai.com/plugins/llms.txt` | 200（4.9 KB，30 条） | 插件 / Apps SDK |
| `developers.openai.com/learn/llms.txt` | 200（22.7 KB，138 条） | 学习资源 |
| `developers.openai.com/showcase/llms.txt` | 200（33.2 KB，78 条） | 展示馆 |
| `openai.com/llms.txt` | **403** | 主站仍不可达 |
| `openai.com/index/harness-engineering/` | **403** | 该篇原文仍不可得 |
| `platform.openai.com/docs/overview` | **403** | 旧文档域仍不可达 |
| `help.openai.com/en/` | **403** | — |
| `developers.openai.com/index/harness-engineering` | 404 | 该路由不存在 |
| `developers.openai.com/blog/harness-engineering.md` | 404 | 该篇不在开发者博客域 |
| `openai.com` 中文版 / `developers.openai.com/sitemap.xml` | 403 / 404 | — |

> **关键机制**：`developers.openai.com` 与 `learn.chatgpt.com` 是**全站 Markdown 化的文档站**——任意页面 URL 追加 `.md` 即得纯 Markdown。这绕开了 `platform.openai.com/docs` 的 403。

## 三、落盘结果（9 个新快照）

| # | 目录 | 来源 | 规模 | 许可/权利 |
|---|---|---|---|---|
| 1 | `09-harness/claude-code-docs-official/` | `code.claude.com/docs` | 202 页官方 MD + llms-full | 官方文档 · cite_only |
| 2 | `09-harness/anthropic-engineering-blog/` | `www.anthropic.com/engineering` | 25 篇（HTML + 提取文本） | 官方博客 · cite_only |
| 3 | `01-foundations/anthropic-platform-docs-en/` | `platform.claude.com/docs` | 628 页官方 MD | 官方文档 · cite_only |
| 4 | `09-harness/openai-codex-docs-official/` | `learn.chatgpt.com/docs` | 149 页官方 MD + llms-full | 官方文档 · cite_only |
| 5 | `09-harness/openai-developer-blog/` | `developers.openai.com/blog` | 27 篇官方 MD + llms-full | 官方博客 · cite_only |
| 6 | `08-agents/openai-cookbook-docs/` | `developers.openai.com/cookbook` | 49 篇官方 MD + llms-full | 官方文档 · 代码样例须逐篇核许可 |
| 7 | `11-personal-agents/openai-plugins-docs/` | `developers.openai.com/plugins` | 26 页官方 MD | 官方文档 · cite_only |
| 8 | `01-foundations/openai-api-docs-en/` | `developers.openai.com/api/docs` | 226 页官方 MD + llms-full | 官方文档 · cite_only |
| 9 | `01-foundations/openai-api-reference-en/` | `developers.openai.com/api/reference` | 211 页官方 MD（**排除 4 个超大 schema 页**） | 官方文档 · reference grade |

**合计约 1,330 个新文件 / 约 70 MB。** 抓取零失败（除声明为 404 的导航页）。

### 有意未迁入的四项（均已在 `_快照信息.md` 记录理由与 URL）

1. Anthropic 11 个翻译版（各 249 页）：英文子集，2.7 倍冗余。
2. Anthropic `llms-full.txt`（34.7 MB）：同一批 628 页的单文件拼接，逐页 `.md` 已完整覆盖且更可定位。
3. OpenAI `showcase` 正文（78 条）与 `learn` 逐页（138 条）：画廊与视频链接为主，教学价值低，仅登记索引。
4. `openai-api-reference-en` 的 4 个 15–23 MB 机器生成 schema 转储页：无人类阅读价值，且显著拖慢全文检索。

## 四、本轮取得的一手结论（可直接进入正文）

### 4.1 OpenAI 官方 harness 定义（首次拿到原文）

> "A capable agent is more than a prompt and a model response. It needs a way to understand a task, maintain context over time, inspect relevant information, call tools, expose progress, handle failures, request human approval when necessary, and return a useful result. **That surrounding execution system is the harness.**"
> —— `developers.openai.com/blog/codex-as-a-platform.md`

量化效果：ARC-AGI-3 上 retained reasoning + context compaction 把 GPT-5.6 Sol 从 **13.3% → 38.3%**，输出 token 降至六分之一。

### 4.2 Anthropic 的两类失败模式与处置（原文，非转述）

- **上下文**：context anxiety（点名 Sonnet 4.5）→ **context reset**（清空 + 结构化交接）；与 compaction 的区别是"compaction 不给干净的起点"。
- **评估**：agent 自评会"自信地赞扬"，即使人类看来质量平庸 → **评估者与执行者分离**；原文直言 "Out of the box, Claude is a poor QA agent."
- **协议优先**：每个 sprint 之前生成器与评估器**先谈判出 sprint contract**，"在任何代码写出之前"先定义什么算完成。
- **成本-质量**：完整 harness 6 小时 / $200，比单 Agent 贵 20 倍以上，"但输出质量的差异立刻可见"。
- **部件会退役**：Opus 4.5 自行消除了 context anxiety，于是作者**完全移除了 context resets**。

### 4.3 跨厂商概念对照（厂商自己做的）

OpenAI 官方 Cookbook 中有一篇 **《Migrate from the Claude Agent SDK to the OpenAI Agents SDK》**，逐项对应 tool / guardrails / handoffs / approvals / sandbox 边界。这是**厂商撰写的术语对照表**，比第三方对比更可靠，对卷 09 的"多 harness 对照"章节价值很高。

### 4.4 长期任务的两种答案

| | Anthropic 公开做法 | OpenAI 公开做法 |
|---|---|---|
| 主手段 | **context reset**（清空 + 交接物） | **compaction + 持久目标**（Goals） |
| 状态载体 | `claude-progress.txt` + git history + 特性清单（JSON） | repository harness、分阶段计划、审批门 |
| 来源 | `effective-harnesses-for-long-running-agents`、`harness-design-long-running-apps` | `blog/skills-shell-tips.md`、`blog/run-long-horizon-tasks-with-codex.md`、`cookbook/.../using_goals_in_codex.md` |

→ 这是卷 09 / 10 一等的辨析素材：**同一问题，两家给出不同工程答案，且都有实测支撑。**

## 五、方法学记录（可复用的检索纪律）

1. **先找机读端点，再抓页面。** 顺序：`llms.txt` → `llms-full.txt` → `sitemap.xml` → 逐页 `.md`。本批 9 个快照中 8 个走这条路径，命中率与效率远高于逐页抓 HTML。
2. **先读一页的头部元信息。** Claude Code 文档的 llms.txt 地址就是从页面头部发现的。
3. **同一站点不同子域的策略可能完全不同。** `openai.com` 403 ≠ `developers.openai.com` 不可达；`platform.openai.com` 403 ≠ `platform.claude.com` 不可达。**不要因主站不可达就放弃整个厂商。**
4. **并发要按站点分别标定。** 本批实测：Anthropic 主站 2 线程 + 1500 ms；Anthropic 文档域 6 线程；OpenAI 文档域 6 线程。**同一厂商不同子域的限流策略也不同。**
5. **单文件导出（llms-full.txt）与逐页文件不是二选一。** 逐页优于单文件（可引用、可定位、可增量）；单文件保留作为对照与兜底。**超大单文件（数十 MB 级）应评估后再决定是否迁入。**
6. **体量阈值要有记录。** 本批对 >10 MB 的机器生成页面做了有记录的排除，并写清 URL 与理由——**"排除"必须可追溯，否则等同于漏抓。**

## 六、关联

- 隐喻两读并列：`research/09-harness/harness隐喻-两读并列.md`
- Source Records：`research/09-harness/sources/SRC-CLAUDE-CODE-DOCS-OFFICIAL.md`、`SRC-ANTHROPIC-ENGINEERING.md`、`SRC-OPENAI-DEVELOPER-DOCS.md`、`research/01-foundations/sources/SRC-ANTHROPIC-PLATFORM-DOCS-EN.md`
- 决策队列更新：P0-D 关闭、P0-E 降级、新增 P1-R/S/T、P2-O/P
- 索引：`upstream/_快照索引.json`（133 → 142）

---

## 追加：`claude.com` 站点发现（同日收尾）

第六批收尾时，从 `claude-code-docs-official/en/overview.md` 的**延伸阅读**里发现一条外链指向 `claude.com/blog` —— 一个**完全没被覆盖的 Anthropic 官方内容域**。

### 探测结果

| 端点 | 结果 |
|---|---|
| `claude.com/llms.txt` | **200**（4,146 B）——但只是**站点导航**（产品 / 定价 / 联系方式），**不是可枚举的文档集索引** |
| `claude.com/sitemap.xml` | **200**（1.3 MB / **3,151 条 URL**）——唯一可用的完整清单 |
| `claude.com/blog/<slug>.md` | **404** —— 无 Markdown 孪生地址 |
| `claude.com/blog/<slug>` | **200**（单篇 HTML 约 500 KB，正文提取后 4–23 K 字符） |

### 落盘

`upstream/09-harness/anthropic-blog-official/`：**59 篇精选**（HTML + 提取正文 txt），121 文件 / 29.8 MB。

### ★ 方法学修正（已写入 `upstream/README.md`）

1. **`llms.txt` 存在 ≠ 它是抓取清单。** 要打开看内容是"链接清单"还是"页面简介"——前者可枚举，后者不可。不可枚举时必须回退 `sitemap.xml`。
2. **有可用 `llms.txt` 时也该瞄一眼 `sitemap.xml`**，对比条目数与目录分布，避免漏掉整块内容域（本次 `claude.com` 就是这样被发现的）。
3. **官方文档页面的"延伸阅读 / Learn more"小节本身就是高质量来源清单**，比外部搜索可靠。**这条路径成本最低、命中率最高，应固化为常规动作。**

### 取舍

从 4,000+ 条 URL 里只取 59 篇（25%），**按教学价值筛选**：卷 09 占 26 篇、卷 08 占 15 篇、卷 10 占 6 篇、卷 04/11 占 12 篇。不录的是厂商营销、客户故事、公告、活动页、目录页（plugins 336 / connectors 797）、非英文 locale（约 1,235）。**未录清单可从 `_sitemap.xml` 完整复原，需要时按 slug 现取，不必重新检索。**

### 为何值得单独记一笔

这是本轮**第三条**"从已落盘材料里找出来的新来源"（前两条是 Claude Code 文档的 `llms.txt` 自指路径、OpenAI 的 `developers.openai.com` 全站 Markdown 化）。**结论：抓完一批后回读一手材料的"引用与延伸阅读"，比继续外部搜索的产出更高。**
