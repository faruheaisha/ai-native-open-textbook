---
title: "4.4 第三轮：让数据活起来"
sourceId: "07-coding/vibe-vibe"
sourceTitle: "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/vibe-vibe"
entryUrl: "https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/Basic-old/04-practice-0-to-1/4.4-data-storage/index.md"
sourceRel: "docs/Basic-old/04-practice-0-to-1/4.4-data-storage/index.md"
rawUrl: "/raw/07-coding/vibe-vibe/docs/Basic-old/04-practice-0-to-1/4.4-data-storage/index.md"
sourceSha256: "c9b26b08a8f04c2c93f8d26b5d4c86f93a72c3e6227e14b7768a90453776c7fb"
pageSha256: "c9b26b08a8f04c2c93f8d26b5d4c86f93a72c3e6227e14b7768a90453776c7fb"
contentMode: "local-full"
zh: ""
---

# 4.4 第三轮：让数据活起来

> **本节目标**：让任务数据保存下来，刷新页面后还在

## 从 4.3 到 4.4：最后一块拼图

在 4.3 节，你已经让待办清单具备了完整的交互能力：添加、删除、标记完成。

但如果你现在刷新一下页面（按 F5），你会发现——**所有任务都消失了**。

这不是 Bug，而是因为目前数据只存在于浏览器的"临时记忆"中。就像在白板上写字，擦掉就没了。

本轮，我们要给待办清单装上"记忆"，让它能记住你的任务。

## 本轮学习收获

经过本轮学习，你将掌握：

- 理解为什么网页需要数据存储
- 使用 localStorage 实现数据持久化
- 验证数据是否正确保存和读取
- 完成一个「刷新不丢数据」的完整应用

## 章节导航

| 小节 | 主题 | 预计时间 |
|------|------|---------|
| [4.4.1](/lib/07-coding/vibe-vibe/docs-Basic-old-04-practice-0-to-1-4.4-data-storage-4.4.1-why-storage) | 为什么需要数据存储 | 3 分钟 |
| [4.4.2](/lib/07-coding/vibe-vibe/docs-Basic-old-04-practice-0-to-1-4.4-data-storage-4.4.2-localstorage) | 使用本地存储（localStorage） | 10 分钟 |
| [4.4.3](/lib/07-coding/vibe-vibe/docs-Basic-old-04-practice-0-to-1-4.4-data-storage-4.4.3-test-persistence) | 测试数据持久化 | 5 分钟 |
| [4.4.4](/lib/07-coding/vibe-vibe/docs-Basic-old-04-practice-0-to-1-4.4-data-storage-4.4.4-final-verification) | 完整功能验证与阶段回顾 | 5 分钟 |

**预计总时间：约 25 分钟**

→ [4.4.1 为什么需要数据存储](/lib/07-coding/vibe-vibe/docs-Basic-old-04-practice-0-to-1-4.4-data-storage-4.4.1-why-storage)
