---
title: "Agent Note: 统一的 TUI 呈现与导航"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/architecture/2026-07-28-consolidated-tui-presentation.zh.md"
sourceRel: ".agents/notes/archived/architecture/2026-07-28-consolidated-tui-presentation.zh.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/architecture/2026-07-28-consolidated-tui-presentation.zh.md"
sourceSha256: "01814434482a84ebd7f672eb5c26fc468b568e773452563bf39ba52ad25d054a"
pageSha256: "01814434482a84ebd7f672eb5c26fc468b568e773452563bf39ba52ad25d054a"
contentMode: "local-full"
zh: ""
---

# Agent Note: 统一的 TUI 呈现与导航

Status: implemented
Archived: 2026-08-04

[English](/lib/09-harness/deepseek-harness/_agents-notes-archived-architecture-2026-07-28-consolidated-tui-presentation) | 中文

## Problem

终端 UI 逐步积累了多套彼此干扰的呈现规则：调色板角色互为别名，或在浅色终端中颠倒强调层级；工具卡片的框架、输出和退出标记重复或争夺注意力；注入上下文被当作 XML 解析，无法可靠折叠；`/resume` 即使能通过启动器访问其他工作区，也会排除不属于当前工作区的会话。每个症状看似局部，但持久决策只有一个终端阅读模型：精简且可检查的调色板、以状态为首且正文内收的卡片、与内容无关的记录折叠，以及感知工作区的导航。

## Decision

### 调色板

`paletteSpec(scheme)` 是 SGR 开始码、结束码和用途的唯一表。`createPalette` 从该表派生所有包装器，`/palette` 在运行中的终端打印同一张表。除固定的启动品牌渐变外，组件不自行发出 SGR 序列。每个结束码都重置对应开始码设置的所有 SGR 组。

重复角色被合并：`muted` 并入 `dim`，`added` 并入 `success`，`removed` 并入 `error`，未使用的第二强调色被移除。`dim` 在两种配色方案中都使用 `2;39`，并以 `22;39` 结束，使内收文本相对于终端前景色变暗，而不会在浅色背景上变成固定的深灰色。TypeScript 分别标记颜色和属性，允许属性与颜色组合，同时拒绝会因重置而丢失外层颜色的嵌套颜色。

### 工具卡片

工具卡片由一行带颜色的 `Tool / <name>` 状态标题和一块统一的 dim 正文组成。呈现器标题、终端命令及 cwd 行、输出、XML 文本和折叠标记都使用正文色调。差异颜色继续保留，因为红绿承载语义；信号标记也继续作为错误显示。

`renderUnknownXml` 对未知工具结果显式接收正文样式器。终端呈现器在返回 `TerminalResultView.output` 前解析并移除面向模型的末尾退出或信号标记；TUI 只把结构化状态呈现一次。截断、超时和沙箱信息继续留在正文中，因为状态标记不表达这些事实。

### 注入上下文与折叠
