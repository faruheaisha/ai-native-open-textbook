# GitHub 课程与 Agent 产品 · 第四批检索记录

- 日期：2026-09-10（第四批）
- 主题：2026 年高质 vibe coding / agent / AI 课程；厂商官方 Skill 目录；办公与通用 Agent 产品的官方使用方法
- 显式排除：Anthropic 官方课程与文档（本轮不扩展）
- 通道：`gh search repos`（stars 排序 + `pushedAt` 过滤）→ `codeload` tarball 定点迁入；官方文档 `llms.txt` / 逐页 `.md` 端点；HTTP 可达性实测
- 前置批次：[`GitHub近期高质量课程与Agent产品-2026-09-10.md`](GitHub近期高质量课程与Agent产品-2026-09-10.md)（第三批，22 条迁入，85 条索引）

---

## 0. 结论先行

1. **新迁入 26 条**：21 个 GitHub 仓库快照 + 5 个官方文档站点快照；`upstream/_快照索引.json` 由 85 → **111 条**。
2. **`llms.txt` + 逐页 `.md` 成为官方文档新发布形态**：千问办公、Manus、扣子、Dify、CodeBuddy 五家官方文档在本轮实测中全部暴露机读端点（文本 + 索引），官方文档第一次可以"像代码一样"被版本化引用。这是本批最重要的方法论发现。
3. **中文 vibe coding 课程已以 CC BY-NC-SA 4.0 为事实默认**：easy-vibe（19,358★）、vibe-vibe（6,023★）、vibefast-docs 三门 2026 课程全部 NC → **许可决策升为 P0**。
4. **厂商官方 Skill 目录三足成形**（本批收录两家）：`openai/skills`（26,845★，逐技能许可）与 `microsoft/skills`（3,006★，MIT，多宿主打包）。
5. **办公 Agent 的方法学材料首次有官方一手来源**：千问办公 102 页帮助中心 + 239 篇 md；Manus 全量 229 KB；扣子 100 篇；Dify 2.98 MB。
6. **两个反面教训**：星数≠内容（`emarco177/langchain-course` 1,649★ 但仓库只剩 4 个文件）；HTTP 200≠抓到内容（阿里云 WAF 挑战页约 2.4 KB，须按体积与特征串甄别）。

---

## 1. 课程增量（2026 年，按"最近推送 + 高星"重扫）

| 本地目录 | 仓库 | Stars | 许可 | 迁入规模 | commit |
|---|---|---|---|---|---|
| `07-coding/easy-vibe/` | datawhalechina/easy-vibe | 19,358 | CC BY-NC-SA 4.0 | 1,893 | `130e9b75` |
| `07-coding/vibe-vibe/` | datawhalechina/vibe-vibe | 6,023 | CC BY-NC-SA 4.0 | 636 | `f2e121d9` |
| `07-coding/fufan-vibe-coding-course/` | fufankeji/FuFan-VibeCodingCourse | 67 | README 称 MIT，无 LICENSE 文件 | 1,002 | `5336ede1` |
| `07-coding/vibefast-docs/` | vibefast-app/vibefast-docs | 51 | CC BY-NC-SA 4.0 | 147 | `2a34bc50` |
| `07-coding/vibe-coding-101-for-engineers/` | goker/vibe-coding-101-for-software-engineers | 35 | 未声明 | 51 | `60d5a7fc` |
| `07-coding/lovable-for-beginners/` | cporter202/lovable-for-beginners | 591 | 未声明 | 20 | `c4bfa59c` |
| `07-coding/fastcampus-ai-agent-vibecoding/` | Koomook/fastcampus-ai-agent-vibecoding | 135 | 未声明 | 683（30 个因路径字符未迁入） | `b24208b4` |
| `07-coding/spec-kit/` | github/spec-kit | 134,654 | MIT | 455 | `c173bf19` |
| `08-agents/deepagents-in-action/` | datawhalechina/deepagents-in-action | 1,992 | 内容 NC / 代码 MIT | 21 | `4097ff94` |
| `08-agents/langchain4j-for-beginners/` | microsoft/LangChain4j-for-Beginners | 496 | MIT | 65 | `9aed2ec2` |
| `08-agents/second-brain-ai-assistant-course/` | decodingai-magazine/second-brain-ai-assistant-course | 3,082 | MIT | 122 | `17ccef57` |
| `08-agents/ed-donner-production/` | ed-donner/production | 448 | MIT | 62 | `daeb3dae` |
| `08-agents/pocket-manus/` | Osly-AI/PocketManus | 304 | MIT | 152 | `8ab0ec5f` |
| `13-local-ai/edgeai-for-beginners/` | microsoft/edgeai-for-beginners | 1,694 | MIT | 165 | `e88f123a` |

**分析**：

- **"vibe coding" 正在被课程作者主动切分**：一半课程是"面向普通人/产品经理"（easy-vibe、vibe-vibe、Lovable），另一半是"面向工程师的纪律"（goker 12 周课、spec-kit 工作流、`shanraisshan/claude-code-best-practice` 的 "from vibe coding to agentic engineering"）。卷 07 的课程叙事应体现这个分叉，而不是把两派混为一谈。
- **机构布局**：Microsoft 除既有 `generative-ai-for-beginners` / `ai-agents-for-beginners` 外，新增 Java 栈（LangChain4j）与 Edge AI 两条线；Datawhale 新增《Deep Agents 实战》（2026-09-04 仍在更新）。
- **NC 决策影响面扩大**：卷 07 的 4 门中文头部课程里 3 门 NC（easy-vibe、vibe-vibe、vibefast），加上前批的 liyupi，**中文 Vibe Coding 主线不可能绕开 NC**。

## 2. 厂商官方 Skill 目录（新品类）

| 本地目录 | 仓库 | Stars | 许可 | 结构 |
|---|---|---|---|---|
| `10-context-memory/openai-skills/` | openai/skills | 26,845 | 逐技能 `LICENSE.txt`（抽样 Apache-2.0） | 39 `.curated` + 5 `.system`（imagegen / openai-docs / plugin-creator / skill-creator / skill-installer） |
| `10-context-memory/microsoft-skills/` | microsoft/skills | 3,006 | MIT | `.github/plugins/azure-*`、deep-wiki、m365-agents-toolkit；含 `.claude` / `.opencode` 多宿主目录与 hooks、tests |

**要点**：Codex 把"**创建/安装技能的能力**"本身也做成了技能（自举）；微软把同一套技能打包给多家宿主（.claude / .opencode 并存）。二者共同把"Skill 是可分发资产"从社区实践升级为厂商行为。

## 3. 办公/通用 Agent 产品：官方文档快照

| 产品 | 入口 | 实测 | 落盘 |
|---|---|---|---|
| 千问办公 | `help.aliyun.com/zh/qwenwork/` | 200；llms.txt 53,835 B；239 个 `.md` | 102 页 HTML + llms.txt + 239 篇 md |
| Manus | `manus.im/docs` | 200；llms-full.txt 228,733 B | 全量 Markdown |
| 扣子 | `docs.coze.cn` | 200；llms.txt 129,702 B（958 条） | llms.txt + 100 篇 md |
| Dify | `docs.dify.ai` | 200；llms-full.txt 2,980,752 B | 全量 Markdown |
| CodeBuddy / WorkBuddy | `copilot.tencent.com` | 200；llms.txt 3,665 B | 官方说明索引 |
| Genspark | `www.genspark.ai` | **403** | ❌ |
| Flowith | `flowith.io` | **000** | ❌ |
| 豆包办公 | `www.doubao.com/help` | 200（SPA，无静态文档） | ❌（以技能档案替代） |

**千问办公官方口径（可教学的一手事实）**：

- 三种入口：钉钉内 / 网页端（qwenwork.cn）/ 桌面客户端；
- 桌面端概念集：文件、技能、连接器、**电脑操控（Computer Use）**、IM、**Hooks**、**"意识"**（`SOUL.md` 协作风格、`AGENTS.md` 工作手册、`USER.md` 画像、长短期记忆）；
- 云端定时任务支持自定义周期表达式，关闭浏览器仍执行；
- 企业版 = 席位 + 积分包，含审计日志（管理日志/AI 日志）、模型策略、连接器访问策略、受信设备/网络。

> `AGENTS.md` 出现在千问办公官方概念里，是本轮最值得注意的"跨厂商约定"信号（与卷 09/10 直接相关）。

## 4. 许可与复用分级

| 级别 | 来源 |
|---|---|
| 可 Fork / Adapt（MIT / Apache-2.0） | spec-kit、LangChain4j、second-brain、ed-donner/production、pocket-manus、edgeai、microsoft/skills、MineContext |
| 仅 Link / Quote（NC） | easy-vibe、vibe-vibe、vibefast-docs、deepagents-in-action（内容部分） |
| 仅 Link / Quote（未声明） | fufan（README 称 MIT 无文件）、vibe-coding-101、lovable-for-beginners、fastcampus、harness-books、advanced-context-engineering、multi-platform-skills-archive（内容源自厂商） |
| 逐技能判断 | openai/skills |
| 自定义条款 | Tencent/workbuddy-bench（声明不适用于欧盟） |
| 官方文档 | 千问办公 / Manus / 扣子 / Dify / CodeBuddy（站点条款；快照仅研究） |

## 5. 反面教训（写入检索纪律）

1. **星数 ≠ 内容**：`emarco177/langchain-course` 1,649★，当前仅 4 个文件（README + LICENSE + 2 图）——课程已迁走。高星仓库迁入前必须看 tree。
2. **HTTP 200 ≠ 抓到内容**：阿里云帮助中心首轮抓取有 62/103 页返回 **WAF 挑战页**（约 2.4 KB，含 `x5secdata`）。判定规则：页面 < 3.5 KB 或含 `x5secdata|_____tmd_____` → 视为失败，二次慢速抓取（5–9 s 间隔 + Cookie 会话）后 62 页全部补齐。
3. **`llms.txt` 也可能是 SPA 回退**：`www.coze.cn/open/docs/llms.txt` 返回 HTML 而不是 Markdown；真正的端点在 `docs.coze.cn/llms.txt`。识别方法：看返回首行是否是 `#` 开头的 Markdown。
4. **`github.com` 的 git 通道在本机不可达**：`git clone` 报 443 无法连接，而 `codeload.github.com` / `api.github.com` 正常——**迁入快照只走 tarball 通道**（已写入工具脚本注释）。

## 6. 待办

| 优先级 | 事项 |
|---|---|
| P0 | 中文课程 NC 许可决策（easy-vibe / vibe-vibe / vibefast / liyupi / deepagents） |
| P1 | ChatGPT Work 在 `help.openai.com` 内定位对应文章并落盘 |
| P1 | 千问办公官方文档与社区来源（绿皮书/学习站/蓝皮书）的**交叉核验清单** |
| P2 | 扣子文档补全（llms.txt 索引 958 条，本轮只取 100 篇） |
| P2 | `Tencent/workbuddy-bench` 任务构成细读（80 个 SWE 任务 + 18 类角色） |
| P3 | 豆包办公 SPA 文档的替代路径（官方公众号/后台接口） |

## 附：本批迁入清单（26）

21 个仓库：easy-vibe、vibe-vibe、fufan-vibe-coding-course、vibefast-docs、vibe-coding-101-for-engineers、lovable-for-beginners、fastcampus-ai-agent-vibecoding、spec-kit、deepagents-in-action、langchain4j-for-beginners、second-brain-ai-assistant-course、ed-donner-production、pocket-manus、harness-books、openai-skills、microsoft-skills、advanced-context-engineering、edgeai-for-beginners、mine-context、workbuddy-bench-official、multi-platform-skills-archive

5 个站点：[qwenwork-official-help](04-work 官方帮助中心)、manus-official-docs、coze-official-docs、dify-official-docs、workbuddy-official-docs
