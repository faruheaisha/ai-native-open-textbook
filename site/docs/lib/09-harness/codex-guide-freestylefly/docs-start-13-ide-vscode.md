---
title: "在 VS Code 中使用 Codex"
sourceId: "09-harness/codex-guide-freestylefly"
sourceTitle: "Codex 实践指南（CodexGuide）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/freestylefly/CodexGuide"
entryUrl: "https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/docs/start/13-ide-vscode.md"
sourceRel: "docs/start/13-ide-vscode.md"
rawUrl: "/raw/09-harness/codex-guide-freestylefly/docs/start/13-ide-vscode.md"
sourceSha256: "81b000bbbdf639cc7a95169c83a8a80e7f116b4b7ac59b03165a23a8fa86f6a3"
pageSha256: "81b000bbbdf639cc7a95169c83a8a80e7f116b4b7ac59b03165a23a8fa86f6a3"
contentMode: "local-full"
zh: ""
---

# 在 VS Code 中使用 Codex

本章介绍如何在 VS Code 代码编辑器中安装 Codex 插件，并通过插件完成开发任务。相比桌面 App，在 VS Code 中使用 Codex 可以更直接地看到文件目录结构和修改前后的对比，适合习惯在编辑器里工作的开发者。

## 安装 Codex 插件

打开 VS Code，点击左侧边栏的「扩展」图标，在搜索框中输入 **Codex**，选择第一个结果，点击「安装」即可。

::: tip
这里安装的是 OpenAI 官方发布的 ChatGPT 插件，其中集成了 Codex 的对话与代码辅助能力。
:::

![搜索并安装 Codex 插件](https://cdn.canghecode.com/codexguide/docs/images/vscode-codex-extension-marketplace.png)

## 打开插件对话窗口

安装完成后，在 VS Code 中打开任意一个项目文件，右上角会出现 ChatGPT 的图标。点击该图标，右侧边栏就会展开 Codex 的对话窗口。

![文件右上角的插件图标](https://cdn.canghecode.com/codexguide/docs/images/vscode-codex-extension-icon.png)

![展开后的对话窗口](https://cdn.canghecode.com/codexguide/docs/images/vscode-codex-chat-panel.png)

## 开始使用

对话窗口打开后，直接输入需求，Codex 就会开始辅助完成开发任务，用法与 Codex 桌面 App 基本一致。

**使用 `@` 指定文件：**

在对话框中输入 `@` 后选择具体文件，Codex 会直接定位到该文件进行分析或修改，比让它全局搜索更快、更准确。建议在任务目标明确时优先使用 `@` 指定相关文件。

![使用 @ 指定文件](https://cdn.canghecode.com/codexguide/docs/images/vscode-codex-file-reference.png)

## App 与 VS Code 插件怎么选

| | Codex 桌面 App | VS Code 插件 |
|---|---|---|
| 适合场景 | 多任务管理、Skills、Automations | 边写代码边调用，贴近编辑器工作流 |
| 文件结构可见性 | 需要切换界面 | 直接在编辑器里查看 |
| 修改前后对比 | 独立查看 | 可结合编辑器 diff 查看 |
| 推荐用户 | 需要并行任务或插件协作 | 日常编码开发者 |

根据自己的使用习惯选择即可，两者可以配合使用。

## 下一步

下一步：[Codex Cloud：使用云端模式](/lib/09-harness/codex-guide-freestylefly/docs-start-14-cloud)。
