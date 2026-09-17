---
title: "Agent Note: 横幅回归，无边框"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/feature/2026-07-21-tui-borderless-banner.zh.md"
sourceRel: ".agents/notes/archived/feature/2026-07-21-tui-borderless-banner.zh.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/feature/2026-07-21-tui-borderless-banner.zh.md"
sourceSha256: "6c65cd654a1aed704d80b5882aba8ae0a2c1090709d672189847f5d0a6f58122"
pageSha256: "6c65cd654a1aed704d80b5882aba8ae0a2c1090709d672189847f5d0a6f58122"
contentMode: "local-full"
zh: ""
---

# Agent Note: 横幅回归，无边框

Status: implemented
Archived: 2026-07-26

[English](/lib/09-harness/deepseek-harness/_agents-notes-archived-feature-2026-07-21-tui-borderless-banner) | 中文

## Problem

一个中间的无横幅设计删掉了带框的启动横幅：它删除了 `HeaderComponent` 及其扫入动画，把模型移入页脚，丢弃了会话 id，并把 `welcome` 渲染为 transcript 的第一行。用户的裁决把这一切反转：把横幅拿回来——"just remove the border"。令人反感的装饰是那四行盒子边框，而不是它承载的识别信息（模型、会话 id），也不是扫入动效。

## Decision

- `HeaderComponent` 及其从左到右的扫入动画回归，但以**无边框**方式渲染：没有 `╭─╮`/`╰─╯` 边角，也没有 `│` 侧边。每一行都是一个前导空格加上经 `truncateToWidth` 裁剪的内容，因此扫入的宽度裁剪永远不会撕裂转义序列，也不绘制任何固定边框。扫入大约经过 24 帧完成，每帧间隔 15 ms。
