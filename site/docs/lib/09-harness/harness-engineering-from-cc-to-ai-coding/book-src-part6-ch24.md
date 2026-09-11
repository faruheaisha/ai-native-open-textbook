---
title: "第24章：跨会话记忆 — 从遗忘到持久学习"
sourceId: "09-harness/harness-engineering-from-cc-to-ai-coding"
sourceTitle: "驾驭工程：从 Claude Code 源码到 AI 编码最佳实践"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding"
entryUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding/blob/e40e0feec02b90e308ccbfc7a8911d64118ccca0/README.md"
zh: ""
---

# 第24章：跨会话记忆 — 从遗忘到持久学习

> **定位**：本章分析 Claude Code 的六层跨会话记忆架构——从原始信号捕获到结构化知识蒸馏的完整系统。前置依赖：第5章。适用场景：想了解 CC 如何实现从遗忘到持久学习的跨会话记忆系统的读者。

## 为什么这很重要

一个没有记忆的 AI Agent 本质上是一个无状态函数：每次调用都从零开始，不知道用户是谁、上次做了什么、哪些决策已经做过。用户被迫在每个新会话中重复相同的上下文——"我是后端工程师"、"这个项目用 Bun 构建"、"不要用 mock 测试数据库"。这种重复不仅浪费时间，更破坏了人机协作的连续性。

Claude Code 对此的回答是一套**六层记忆架构**，从原始信号捕获到结构化知识蒸馏，从会话内摘要到跨会话持久化，构建了一个完整的"学习能力"。这六个子系统分工明确：

| 子系统 | 核心文件 | 频率 | 职责 |
|--------|---------|------|------|
| Memdir | `memdir/memdir.ts` | 每次会话加载 | MEMORY.md 索引 + 主题文件，注入系统提示词 |
| Extract Memories | `services/extractMemories/extractMemories.ts` | 每轮结束 | Fork agent 自动提取记忆 |
| Session Memory | `services/SessionMemory/sessionMemory.ts` | 定期触发 | 滚动会话摘要，用于压缩 |
| Transcript Persistence | `utils/sessionStorage.ts` | 每消息 | JSONL 会话记录存储与恢复 |
| Agent Memory | `tools/AgentTool/agentMemory.ts` | Agent 生命周期 | 子 Agent 持久化 + VCS 快照 |
| Auto-Dream | `services/autoDream/autoDream.ts` | 每日 | 夜间记忆整合与修剪 |

这些子系统在前面的章节中各有零散提及——第9章介绍了自动压缩，第10章讨论了压缩后的文件状态保留，第19章分析了 CLAUDE.md 加载，第20章覆盖了 fork agent 模式，第23章提到了 KAIROS 和 TEAMMEM feature flag。但记忆的**创建、生命周期、跨会话持久化**作为一个整体系统，从未被完整分析过。本章填补这个空白。

## 源码分析

### 24.1 Memdir 架构：MEMORY.md 索引与主题文件

Memdir 是整个记忆系统的存储层——所有记忆最终都以文件形式落入这个目录结构。

#### 路径解析

记忆目录的位置由 `paths.ts` 中的 `getAutoMemPath()` 决定，遵循三级优先链：

```typescript
// restored-src/src/memdir/paths.ts:223-235
export const getAutoMemPath = memoize(
  (): string => {
    const override = getAutoMemPathOverride() ?? getAutoMemPathSetting()
    if (override) {
      return override
    }
    const projectsDir = join(getMemoryBaseDir(), 'projects')
    return (
      join(projectsDir, sanitizePath(getAutoMemBase()), AUTO_MEM_DIRNAME) + sep
    ).normalize('NFC')
  },
  () => getProjectRoot(),
)
```

解析顺序：
1. `CLAUDE_COWORK_MEMORY_PATH_OVERRIDE` 环境变量（Cowork 空间级挂载）
2. `autoMemoryDirectory` 设置（仅限受信任来源：policy/flag/local/user settings，**排除** projectSettings 以防恶意仓库重定向写入路径）
