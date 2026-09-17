---
title: "代码优化"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/01-slash-commands/optimize.md"
sourceRel: "zh/01-slash-commands/optimize.md"
rawUrl: "/raw/09-harness/claude-howto/zh/01-slash-commands/optimize.md"
sourceSha256: "f02217f5e9aed56d852f7e2ba1f6321a5ea56139079db17f421c0b95632f11f7"
pageSha256: "f02217f5e9aed56d852f7e2ba1f6321a5ea56139079db17f421c0b95632f11f7"
contentMode: "local-full"
zh: ""
---

# 代码优化

按优先级审查提供的代码，重点关注以下问题：

1. **性能瓶颈** - 识别 O(n²) 操作和低效循环
2. **内存泄漏** - 查找未释放的资源、循环引用
3. **算法改进** - 建议更好的算法或数据结构
4. **缓存机会** - 识别重复计算
5. **并发问题** - 查找竞态条件或线程问题

请按以下格式输出：
- 问题严重性（Critical/High/Medium/Low）
- 代码位置
- 解释
- 推荐修复方案，附代码示例
