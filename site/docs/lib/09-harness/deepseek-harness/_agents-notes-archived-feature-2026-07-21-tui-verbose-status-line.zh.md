---
title: "Agent Note: 运行状态行展示轮次阶段与已用时长"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/feature/2026-07-21-tui-verbose-status-line.zh.md"
sourceRel: ".agents/notes/archived/feature/2026-07-21-tui-verbose-status-line.zh.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/feature/2026-07-21-tui-verbose-status-line.zh.md"
sourceSha256: "203c2abac99cedf7afa2540c925367ba66f00b61b926d1cc86472a603ad2bb07"
pageSha256: "203c2abac99cedf7afa2540c925367ba66f00b61b926d1cc86472a603ad2bb07"
contentMode: "local-full"
zh: ""
---

# Agent Note: 运行状态行展示轮次阶段与已用时长

Status: implemented
Archived: 2026-07-26

[English](/lib/09-harness/deepseek-harness/_agents-notes-archived-feature-2026-07-21-tui-verbose-status-line) | 中文

## 问题

在轮次运行期间，[全屏 TUI](/lib/09-harness/deepseek-harness/_agents-notes-archived-feature-2026-07-17-dedicated-full-screen-tui-front-door) 只显示一个静态的 "Working" loader 动画。它既不表明当前步骤已耗时多久，也不表明 agent（智能体）正在做什么——等待模型、思考、流式输出回复，还是运行工具——因此运行缓慢或卡住的轮次与运行很快的轮次无从区分。

## 决策

- 轮次运行期间，编辑器上方的状态行显示一个派生的阶段标签及已用时长，并保留末尾的 `— Enter sends steering, Esc cancels` 提示。四个阶段及其标签为 `waiting` → "Waiting for the first token"、`thinking` → "Thinking"、`responding` → "Responding"、`executing` → "Executing tools"。
- 阶段是 TUI 从实时会话事件派生出的呈现状态，而非它自有的会话事件或 agent 状态。`step/start` 进入 `waiting`；`assistant/chunk` 的 reasoning 分片或 reasoning 块开始（`block-start`）进入 `thinking`；text 分片或 text 块开始进入 `responding`；`tool/call` 进入 `executing`。该事件映射可合并扩展，因此其余任何事件类型都落入默认分支，保持阶段不变。
