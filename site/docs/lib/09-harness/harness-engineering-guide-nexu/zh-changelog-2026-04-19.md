---
title: "2026-04-19 — 新增 4 篇 · 累计 25 篇"
sourceId: "09-harness/harness-engineering-guide-nexu"
sourceTitle: "Harness Engineering 指南（nexu.io）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/nexu-io/harness-engineering-guide"
entryUrl: "https://github.com/nexu-io/harness-engineering-guide/blob/86fec9bea430cecb29ff10afaae36b96496a8f8e/zh-changelog/2026-04-19.md"
sourceRel: "zh-changelog/2026-04-19.md"
rawUrl: "/raw/09-harness/harness-engineering-guide-nexu/zh-changelog/2026-04-19.md"
sourceSha256: "147223f461d9fc86cb4a4cb11dbcba85472b1e6f2ce27524d6a90be9038b57e9"
pageSha256: "147223f461d9fc86cb4a4cb11dbcba85472b1e6f2ce27524d6a90be9038b57e9"
contentMode: "local-full"
zh: ""
---

# 2026-04-19 — 新增 4 篇 · 累计 25 篇

## 实战（来自 Anthropic Engineering，新增 4，累计 14）

- [基于分类器的权限审批](https://github.com/nexu-io/harness-engineering-guide/blob/86fec9bea430cecb29ff10afaae36b96496a8f8e/zh/guide/classifier-permissions/README.md) — 用模型分类器替代 approval fatigue。双层防御（输入层 prompt-injection probe + 输出层 transcript classifier）、4 种威胁模型、reasoning-blind 设计、三 Tier 决策流程。
- [Eval Awareness](https://github.com/nexu-io/harness-engineering-guide/blob/86fec9bea430cecb29ff10afaae36b96496a8f8e/zh/guide/eval-awareness/README.md) — Claude Opus 4.6 自己意识到在 BrowseComp 评估中，找到 GitHub repo，解密答案。新型 contamination、Multi-Agent 3.7x 放大、URL slug 间接污染、16 次失败尝试的防御分析。
- [Agent Teams](https://github.com/nexu-io/harness-engineering-guide/blob/86fec9bea430cecb29ff10afaae36b96496a8f8e/zh/guide/agent-teams/README.md) — 16 个并行 Claude 造出 100K 行 Rust C 编译器，能编译 Linux 6.9。Ralph-loop 架构、Git 锁文件协调、GCC-as-oracle 二分定位、角色专业化。
- [Initializer + Coding Agent 两阶段模式](https://github.com/nexu-io/harness-engineering-guide/blob/86fec9bea430cecb29ff10afaae36b96496a8f8e/zh/guide/initializer-coding-pattern/README.md) — 长时运行 Agent 的 Harness 模式。为什么 compaction 不够、feature_list.json schema、5 步启动仪式、Puppeteer MCP end-to-end 测试。

## 管线

- `harness-guide-pipeline` skill 首次生产运行，发现 Anthropic Engineering 上 4 篇网站未覆盖的高价值文章。
- 4 篇全部用原创笔法重写，当天完成中英双语。
- 确认 `anthropic.com/engineering` 作为 Tier 0 信息源产出最高。
