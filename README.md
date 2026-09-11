# AI 原生开放教材 · AI-Native Open Textbook

一套把社区里最好的 AI / Agent 课程**重新编排**成学习路径的中文开放教材，并附带一个可直接阅读全文的网页站点。

本站不生产课程，只做三件事：**筛选**高质来源、**翻译**英文正文、**按学习路径编排**。每一页正文都与上游逐字一致，页面顶部标注出处、锚定 commit、许可与原文入口。

| 指标 | 数量 |
|---|---|
| 收录来源 | 143 条 |
| 已完整上架课程（正文可站内直读） | 107 门 |
| 站内正文页 | 2500 篇 |
| 学习路径 | 8 条 |
| 资料类型 | 12 类 |
| 许可分级 | 可转载 104 · 限非商用 9 · 仅引用 30 |

---

## 1. 八条学习路径

按「先能用起来，再理解原理，最后自己造」的顺序排列。

| # | 学习路径 | 卷目录 | 适合谁 |
|---|---|---|---|
| 01 | AI 基础与模型认知 | [`01-foundations`](site/docs/lib/01-foundations) | 想先建立大模型与生成式 AI 的基本认知 |
| 02 | 办公与知识工作 | [`04-work`](site/docs/lib/04-work) | 想立刻用 Agent 处理文档、表格、流程与知识库 |
| 03 | AI 编程与 Vibe Coding | [`07-coding`](site/docs/lib/07-coding) | 想用 AI 写代码、做产品、跑通从需求到上线 |
| 04 | 智能体工程 | [`08-agents`](site/docs/lib/08-agents) | 想自己搭 Agent、做 RAG、做多智能体系统 |
| 05 | Harness 与编码 Agent | [`09-harness`](site/docs/lib/09-harness) | 想弄懂 Claude Code / Codex 这类编码 Agent 内部怎么运作 |
| 06 | 上下文、记忆与技能 | [`10-context-memory`](site/docs/lib/10-context-memory) | 想提升上下文工程、记忆机制与技能体系 |
| 07 | 个人智能体 | [`11-personal-agents`](site/docs/lib/11-personal-agents) | 想搭自己的个人助理与自动化工作流 |
| 08 | 本地与端侧 AI | [`13-local-ai`](site/docs/lib/13-local-ai) | 想在本机 / 边缘设备上跑模型 |

站点首页提供了同样的入口：`/paths/<卷>`；上表「卷目录」一列就是仓库内可直接点开的正文目录。

## 2. 十二种资料类型

检索时按用途分类，而不是按来源堆叠。

| 类型 | 说明 |
|---|---|
| 系统课程 | 有完整章节结构、按周或按模块推进的课程 |
| 课时教程 | 围绕一个主题的连续课时 |
| 工程手册 | 面向落地的系统性方法、规范与工程实践 |
| 实践案例集 | 真实使用场景与结果复盘 |
| 源码研读 | 直接读实现，理解系统怎么被造出来 |
| 官方文档 | 厂商官方产品与平台文档 |
| 官方博客 | 厂商工程博客与技术文章 |
| 官方资料集 | Cookbook、示例集合一类的官方材料 |
| 技能与配置库 | Skills、配置模板、规则文件 |
| 清单与速查 | Awesome 清单、速查表、索引 |
| 产品仓库 | 产品本体或评测集仓库 |
| 其他材料 | 暂不属于以上分类的补充材料 |

## 3. 难度分级

`curation.json` 里对每门课程做了人工分级，**只影响排序与标记，不改动正文**：

- **1 级 · 主线必读**：建议按顺序精读
- **2 级 · 进阶**：值得精读的进阶材料
- **3 级 · 参考**：工具、索引与查阅型材料

## 4. 目录结构

```
.
├── catalog/                  来源总表（143 条来源的结构化索引）
│   └── catalog.json
├── curation.json             人工编排：学习路径、分级、标题、入口、上架规则
├── translations/             逐段中文释义（按卷 / 课程组织）
│   └── <卷>/<课程>.json
├── derived/                  为网页排版而做的结构化派生稿（站内全文的来源之一）
│   └── <卷>/<来源>/
├── upstream/                 上游仓库只读快照（约 1.26 GB，不入库）
├── 课程设计基线/              编排规范、检索记录、待验证与决策队列
├── scripts/                  目录构建、正文构建、校验工具
└── site/                     网页站点（VitePress）
    ├── package.json
    └── docs/
        ├── index.md          首页
        ├── paths/            8 条学习路径页
        ├── library/          课程库（按分类与分级浏览）
        ├── method/           方法与可信度说明
        ├── sources/          来源总表（出处、许可、锚定 commit）
        ├── lib/<卷>/<课程>/   课程正文（构建产物）
        └── .vitepress/       导航、主题与组件
```

在 GitHub 上直接点开：[`catalog/`](catalog) · [`curation.json`](curation.json) · [`NOTICE.md`](NOTICE.md) · [`LICENSES/`](LICENSES) · [`site/docs/lib/`](site/docs/lib) · [`课程设计基线/`](课程设计基线)

## 5. 许可与署名

教材里混合了两种性质的内容，许可必须分开看：

- **本项目自身的代码与编排**（构建脚本、站点主题、目录结构、分类与分级）：MIT，见 [`LICENSE`](LICENSE)。
- **第三方课程内容**：仍归原作者所有，按各自上游许可使用。完整逐条清单见 [`NOTICE.md`](NOTICE.md)。

按上游许可分三级：

| 级别 | 含义 | 本仓库的处理 |
|---|---|---|
| 可转载 | MIT / Apache-2.0 / CC0 / CC-BY / CC-BY-SA 等 | 收录全文，保留署名与许可声明 |
| 限非商用 | CC BY-NC / CC BY-NC-SA / 厂商自定义 | 收录全文，**仅限非商业的教育与学习用途** |
| 仅引用 | 官方文档与博客站点条款、未声明许可 | **不收录正文**，只登记来源并提供原文入口 |

> 本仓库定位为教育与学习资料汇编，不用于商业用途。若你是某份内容的权利人并希望调整收录方式，请提 Issue，我们会立即处理。

## 6. 本地运行

需要 Node 20 或更高版本。

```bash
cd site
npm ci                # 首次安装依赖
npm run docs:dev      # 开发预览（会先重建目录与正文）
npm run docs:build    # 生产构建
npm run docs:preview  # 预览构建产物
```

构建链路的两个脚本：

| 命令 | 作用 |
|---|---|
| [`node scripts/build-catalog.mjs`](scripts/build-catalog.mjs) | 由 `upstream/` 快照重建 `catalog/catalog.json` |
| [`node scripts/build-site-content.mjs`](scripts/build-site-content.mjs) | 依据 `catalog` + `curation` + `derived` + `translations` 生成 `site/docs/lib/**` |
| [`node scripts/build-notice.mjs`](scripts/build-notice.mjs) | 依据 `catalog/catalog.json` 重建 `NOTICE.md`（第三方署名与许可清单） |

`upstream/` 是上游仓库的只读快照，体积约 1.26 GB，未纳入版本控制。仅重建站内正文时不需要它 —— 站内正文的来源已在 `derived/` 与 `translations/` 中固化。

## 7. 内容是怎么进来的

1. **检索与筛选**：只收录社区公认高质的课程、官方文档与工程手册，宁缺毋滥。
2. **锚定快照**：每条来源记录仓库地址与该次收录的 commit，保证可复现。
3. **许可核验**：逐条读取上游 LICENSE，判定可转载 / 限非商用 / 仅引用。
4. **正文搬运**：原文原样搬运，不做改写、不做摘要替代。
5. **逐段释义**：英文材料提供逐段中文释义，可在页面上按需展开或收起。
6. **编排上站**：按学习路径、资料类型、难度分级组织，并保留外链原文入口。

## 8. 来源总表

- 站点内：[`site/docs/sources/index.md`](site/docs/sources/index.md)（143 条，含许可与原文入口）
- 结构化数据：[`catalog/catalog.json`](catalog/catalog.json)
- 第三方署名与本仓库的许可说明：[`NOTICE.md`](NOTICE.md)

---

本项目仅做编排与呈现，全部课程内容的著作权归各上游作者与组织所有。