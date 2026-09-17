---
title: "Vibe Coding CN"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/README.md"
sourceRel: "i18n/zh/skills/claude-code-guide/references/README.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/claude-code-guide/references/README.md"
sourceSha256: "0c4f6b41406effc977fe7e18af5e564c48b822bf38aaf59045d5bdc58ab2ef06"
pageSha256: "fc406665891e061459e89fb12cada5417a910b367bc7831bc4337b79c5717351"
contentMode: "local-full"
zh: ""
---

## Critical Verification Patterns

### Always Verify Completeness
Never trust operations without verification:

```bash
# Document merging - always verify
"Merge documents A and B"
"Verify merge completeness - check no information was lost"

# Code changes - always test
"Apply performance optimization"
"Run tests to confirm no regression"

# Multi-file operations - always validate
"Create 10 components"
"Verify all components created correctly"
```

### Common Pitfalls to Avoid
#### 1. 需求捕获不完整
❌ **错误**: 仅凭第一印象行事
✅ **正确**: 分析整个消息，捕获所有需求

#### 2. 未经验证的操作  
❌ **错误**: 相信合并/编辑已成功
✅ **正确**: 始终验证完整性和正确性

#### 3. 上下文不足
❌ **错误**: 向代理提供最少的上下文
✅ **正确**: 提供丰富的上下文，包括模式和惯例

#### 4. 串行而非并行
❌ **错误**: 独立任务一次只做一项
✅ **正确**: 批量处理独立任务（最多10项）

#### 5. 忽视错误模式
❌ **错误**: 失败后重复相同的尝试
✅ **正确**: 从错误中学习并调整策略
