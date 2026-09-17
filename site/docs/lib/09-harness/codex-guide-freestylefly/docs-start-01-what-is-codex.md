---
title: "Codex 是什么"
sourceId: "09-harness/codex-guide-freestylefly"
sourceTitle: "Codex 实践指南（CodexGuide）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/freestylefly/CodexGuide"
entryUrl: "https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/docs/start/01-what-is-codex.md"
sourceRel: "docs/start/01-what-is-codex.md"
rawUrl: "/raw/09-harness/codex-guide-freestylefly/docs/start/01-what-is-codex.md"
sourceSha256: "5fa80dfe7255f622cb31b117b23d2f825ba1a2bf7ed2731c6d6f4873dc0d0261"
pageSha256: "5fa80dfe7255f622cb31b117b23d2f825ba1a2bf7ed2731c6d6f4873dc0d0261"
contentMode: "local-full"
zh: ""
---

# Codex 是什么

Codex 是一个具备多个产品形态的Agent。涵盖桌面端APP，CLI，Web云端，IDE。

![Codex 使用入口地图](https://cdn.canghecode.com/codexguide/docs/.vuepress/public/images/codex-surfaces.svg?v=20260611)

## 入口对照表

| 入口 | 更适合 | 典型任务 | 学习优先级 |
| --- | --- | --- | --- |
| [CLI](/lib/09-harness/codex-guide-freestylefly/docs-start-10-cli-installation) | 本地快速迭代 | 修 bug、补测试、跑命令、解释仓库 | 新手优先 |
| [桌面 App](/lib/09-harness/codex-guide-freestylefly/docs-start-05-app-overview) | 本地多任务工作台 | 多 agent、Skills、Automations、插件协作 | 进阶优先 |
| [Cloud / Web](/lib/09-harness/codex-guide-freestylefly/docs-start-14-cloud) | 较长任务和并行任务 | 仓库任务、PR、后台分析 | 团队优先 |
| [IDE](/lib/09-harness/codex-guide-freestylefly/docs-start-13-ide-vscode) | 编辑器上下文 | 局部修改、解释、代码审查 | 日常高频 |
| [ChatGPT 中的 Codex](/lib/09-harness/codex-guide-freestylefly/docs-start-01-what-is-codex) | 面向仓库的任务分派 | 连接 GitHub、理解仓库、协作推进 | 按账号能力选择 |

## 如何选择入口

- 任务需要频繁看命令输出：选 CLI。
- 任务需要多个 agent 并行、Skills 或 Automations：选择桌面 App。
- 任务时间较长、希望后台跑、可能生成 PR：选 Cloud / Web。
- 你正在编辑具体文件：选 IDE。
- 你想从对话里分派仓库级任务：选 ChatGPT 中的 Codex。

## 第一次学习建议

1. 从 CLI 建立最小闭环。
2. 用桌面 App 体验本地多任务和技能沉淀。
3. 再进入 Cloud / Web，学习长任务、PR 与团队协作。
4. 阅读 [CLI 选项](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/start/12-cli-options.md) 和 [config.toml](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/advanced/09-config-toml.md)，补上配置基本功。
5. 把高频模板沉淀到 `AGENTS.md`、案例库和团队规范。

## 入口和配置的关系

| 配置主题 | 主要影响入口 | 学习页 |
| --- | --- | --- |
| `AGENTS.md` | CLI / 桌面 App / Cloud | [AGENTS.md](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/advanced/02-agents-md.md) |
| CLI 选项 | CLI | [CLI 选项与命令](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/start/12-cli-options.md) |
| `config.toml` | CLI | [配置文件 config.toml](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/advanced/09-config-toml.md) |
| Skills | App / CLI | [技能与插件](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/advanced/03-skills-plugins-mcp.md) |
| Worktrees | 桌面 App | [桌面 App](/lib/09-harness/codex-guide-freestylefly/docs-start-05-app-overview) |
| Environments | Cloud / App | [Cloud / Web](/lib/09-harness/codex-guide-freestylefly/docs-start-14-cloud) |
| Sandbox 与 Approvals | 全部入口 | [沙盒与审批](https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/advanced/07-sandbox-approvals.md) |

## 下一步

下一步：[Codex 桌面 App 下载与安装](/lib/09-harness/codex-guide-freestylefly/docs-start-02-app-installation)。
