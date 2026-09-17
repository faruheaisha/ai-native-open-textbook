---
title: "Chapter 24: Cross-Session Memory -- From Forgetfulness to Persistent Learning"
sourceId: "09-harness/harness-engineering-from-cc-to-ai-coding"
sourceTitle: "驾驭工程：从 Claude Code 源码到 AI 编码最佳实践"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding"
entryUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding/blob/e40e0feec02b90e308ccbfc7a8911d64118ccca0/book-en/src/part6/ch24.md"
sourceRel: "book-en/src/part6/ch24.md"
rawUrl: "/raw/09-harness/harness-engineering-from-cc-to-ai-coding/book-en/src/part6/ch24.md"
sourceSha256: "e21c7be47d464e7de3a04e3e4c90535be6cd80ce57770aa18f57d9a24e4c6277"
pageSha256: "e21c7be47d464e7de3a04e3e4c90535be6cd80ce57770aa18f57d9a24e4c6277"
contentMode: "local-full"
zh: ""
---

# Chapter 24: Cross-Session Memory -- From Forgetfulness to Persistent Learning

> **Positioning**: This chapter analyzes Claude Code's six-layer cross-session memory architecture -- a complete system from raw signal capture to structured knowledge distillation. Prerequisites: Chapter 5. Target audience: readers who want to understand how CC implements a cross-session memory system that evolves from forgetfulness to persistent learning.

## Why This Matters

An AI Agent without memory is essentially a stateless function: each call starts from zero, not knowing who the user is, what was done last time, or which decisions have already been made. Users are forced to repeat the same context in every new session -- "I'm a backend engineer," "this project builds with Bun," "don't mock the database in tests." This repetition wastes time and, more importantly, destroys the continuity of human-machine collaboration.

Claude Code's answer is a **six-layer memory architecture**, from raw signal capture to structured knowledge distillation, from in-session summaries to cross-session persistence, constructing a complete "learning ability." These six subsystems have clear divisions of labor:

| Subsystem | Core File | Frequency | Responsibility |
|-----------|----------|-----------|----------------|
| Memdir | `memdir/memdir.ts` | Every session load | MEMORY.md index + topic files, injected into system prompt |
| Extract Memories | `services/extractMemories/extractMemories.ts` | Every turn end | Fork agent auto-extracts memories |
| Session Memory | `services/SessionMemory/sessionMemory.ts` | Periodic trigger | Rolling session summary, used for compaction |
| Transcript Persistence | `utils/sessionStorage.ts` | Every message | JSONL session record storage and recovery |
| Agent Memory | `tools/AgentTool/agentMemory.ts` | Agent lifecycle | Subagent persistence + VCS snapshots |
| Auto-Dream | `services/autoDream/autoDream.ts` | Daily | Nightly memory consolidation and pruning |

These subsystems were mentioned in passing in previous chapters -- Chapter 9 introduced auto-compaction, Chapter 10 discussed post-compaction file state retention, Chapter 19 analyzed CLAUDE.md loading, Chapter 20 covered fork agent mode, Chapter 23 mentioned KAIROS and TEAMMEM feature flags. But memory's **creation, lifecycle, and cross-session persistence** as a complete system has never been fully analyzed. This chapter fills that gap.

## Source Code Analysis

### 24.1 Memdir Architecture: MEMORY.md Index and Topic Files

Memdir is the storage layer of the entire memory system -- all memories ultimately land as files in this directory structure.

#### Path Resolution

The memory directory location is determined by `getAutoMemPath()` in `paths.ts`, following a three-level priority chain:

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

Resolution order:
1. `CLAUDE_COWORK_MEMORY_PATH_OVERRIDE` environment variable (Cowork space-level mount)
2. `autoMemoryDirectory` setting (restricted to trusted sources only: policy/flag/local/user settings, **excluding** projectSettings to prevent malicious repositories from redirecting write paths)
