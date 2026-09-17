---
title: "A. Prompt 速查清单"
sourceId: "07-coding/vibe-vibe"
sourceTitle: "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/vibe-vibe"
entryUrl: "https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/Basic-old/99-appendix/a-prompt-cheatsheet.md"
sourceRel: "docs/Basic-old/99-appendix/a-prompt-cheatsheet.md"
rawUrl: "/raw/07-coding/vibe-vibe/docs/Basic-old/99-appendix/a-prompt-cheatsheet.md"
sourceSha256: "3163dd053bb0e93f34e84defa58821bca14b9c053eb7165cbca1c13ecdc312da"
pageSha256: "3163dd053bb0e93f34e84defa58821bca14b9c053eb7165cbca1c13ecdc312da"
contentMode: "local-full"
zh: ""
---

# A. Prompt 速查清单

写 Prompt 时的快速参考。详细讲解见[第三章：技法](https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/Basic-old/03-technique/README.md)。

## S.C.A.F.F. 框架速查

| 要素 | 含义 | 一句话提醒 |
|------|------|-----------|
| **S** - Situation | 背景情境 | 你在做什么项目？用什么技术？ |
| **C** - Challenge | 具体挑战 | 现在卡在哪里？要解决什么问题？ |
| **A** - Ask | 明确请求 | 你希望 AI 做什么？输出什么？ |
| **F** - Format | 输出格式 | 要代码？要解释？要列表？ |
| **F** - Filter | 限制条件 | 什么不要做？有什么约束？ |

## 常见场景要点

### 创建项目
- 说清楚：做什么、给谁用、核心功能（3个以内）
- 先从最简单的版本开始

### 修改代码
- 指明位置：哪个文件、哪个函数
- 说清楚：现在是什么样、想改成什么样
- 加一句：「只改这里，其他不动」

### 修复报错
- 复制完整错误信息（比「报错了」有用100倍）
- 说明：做什么操作时出的错

### 解释代码
- 直接贴代码，问「这段代码在做什么」
- 可以追问：「为什么要这样写」

### 优化代码
- 说明优化目标：可读性？性能？减少重复？
- 让 AI 解释改了什么

## 提升效果的小技巧

| 技巧 | 适用场景 |
|------|----------|
| 给 1-2 个示例 | 需要更精确表达时 |
| 让 AI「想一想再回答」 | 复杂逻辑、多步骤任务 |
| 让 AI 自我检查 | 生成的代码不太放心时 |
| 分步骤提问 | 复杂任务分解更清晰 |

## 记住这一条

> **Prompt 的核心是「说清楚」，不是「套模板」。**
>
> 学会框架后，用自己的话表达就好。
