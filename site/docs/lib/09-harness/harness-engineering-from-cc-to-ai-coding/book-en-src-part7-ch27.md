---
title: "Chapter 27: Production-Grade AI Coding Patterns"
sourceId: "09-harness/harness-engineering-from-cc-to-ai-coding"
sourceTitle: "驾驭工程：从 Claude Code 源码到 AI 编码最佳实践"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding"
entryUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding/blob/e40e0feec02b90e308ccbfc7a8911d64118ccca0/book-en/src/part7/ch27.md"
sourceRel: "book-en/src/part7/ch27.md"
rawUrl: "/raw/09-harness/harness-engineering-from-cc-to-ai-coding/book-en/src/part7/ch27.md"
sourceSha256: "b18b27aa3332504aa329bcf1d89f5d8dba74305b189e89d4cdc2c52e6512896b"
pageSha256: "b18b27aa3332504aa329bcf1d89f5d8dba74305b189e89d4cdc2c52e6512896b"
contentMode: "local-full"
zh: ""
---

# Chapter 27: Production-Grade AI Coding Patterns

## Why This Matters

The preceding two chapters distilled "principles" — high-level guidance on how to think about harness engineering and context management. This chapter is different: we focus on **8 specific, directly reusable coding patterns**. Each pattern is extracted from Claude Code's actual implementation, with clear problem definitions, implementation approaches, and source code evidence.

These patterns share a common trait: they look simple enough to seem trivial, but have been repeatedly validated as necessary in production environments. "Read before edit" — who would edit without reading? But Claude Code enforces it with tool errors, because AI models do indeed skip reading and edit directly. "Defensive Git" — of course you shouldn't force push, but Claude Code emphasizes it with entire prompt paragraphs, because models under pressure do indeed choose the shortest path.

---

## Source Code Analysis

### 27.1 Pattern One: Read Before Edit

**Problem**: AI models may attempt to edit files without reading the current contents, causing edits based on stale or incorrect assumptions.

Claude Code enforces this through a **dual-layer safeguard**:

1. **Prompt layer** (soft constraint): FileEditTool's description explicitly states "You must use your Read tool at least once in the conversation before editing. This tool will error if you attempt an edit without reading the file" (see Chapter 8 for details)
2. **Code layer** (hard constraint): FileEditTool's `call()` method checks whether the current conversation contains a Read call for the target file before executing an edit. If not, it returns an error

The design significance of the dual-layer safeguard is: prompts are "soft constraints" — the model follows them most of the time, but under certain conditions (context too long causing instructions to be "forgotten," attention drift in multi-turn conversations) they may be ignored. The code layer is a "hard constraint" — even if the model ignores the prompt, the tool itself refuses to execute.

| Dimension | Description |
|-----------|-------------|
| **Implementation** | Prompt instruction (soft constraint) + tool code check (hard constraint) |
| **Source reference** | FileEditTool prompt (see Chapter 8 for details) |
| **Applicable scenario** | Any tool that needs to modify existing content |
| **Anti-pattern** | Relying solely on prompt instructions without enforcing at the code layer |

---

### 27.2 Pattern Two: Graduated Autonomy

**Problem**: AI Agents need to find a balance between "asking the user at every step" (low efficiency) and "never asking" (high risk).

Claude Code designed a permission mode gradient from most restrictive to most permissive (see Chapter 16 for details):

```
default → acceptEdits → plan → bypassPermissions → auto → dontAsk
  │           │           │           │               │       │
  │           │           │           │               │       └── Full autonomy
  │           │           │           │               └── Classifier auto-decides
  │           │           │           └── Skip permission checks
  │           │           └── Plan only, don't execute
  │           └── Auto-accept edits, confirm others
  └── Confirm every step
```

The key design isn't the modes themselves, but **automation with fallback**. `auto` mode uses the YOLO classifier (see Chapter 17 for details) to automatically make permission decisions, but has two safety valves. The denial tracking implementation is remarkably concise:

```typescript
// restored-src/src/utils/permissions/denialTracking.ts:12-15
export const DENIAL_LIMITS = {
  maxConsecutive: 3,
  maxTotal: 20,
} as const

// restored-src/src/utils/permissions/denialTracking.ts:40-44
export function shouldFallbackToPrompting(
  state: DenialTrackingState
): boolean {
  return (
    state.consecutiveDenials >= DENIAL_LIMITS.maxConsecutive ||
    state.totalDenials >= DENIAL_LIMITS.maxTotal
  )
}
```

When the classifier denies operations 3 consecutive times or 20 times total, the system permanently falls back to manual user confirmation. This means even in the most autonomous mode, the system retains the ability to fall back to human decision-making. Autonomy is not "all or nothing," but a continuous spectrum, with a safety net at every position.

| Dimension | Description |
|-----------|-------------|
| **Implementation** | Multi-level permission modes + classifier auto-decision + denial tracking fallback |
| **Source reference** | Permission modes (Chapter 16), YOLO classifier (Chapter 17), `denialTracking.ts:12-44` |
| **Applicable scenario** | Any AI Agent system requiring human-machine collaboration |
| **Anti-pattern** | Binary permissions: only "manual" and "automatic," with no middle ground or safety fallback |

---

### 27.3 Pattern Three: Defensive Git

**Problem**: AI models may choose the "shortest path" when executing Git operations, leading to data loss or hard-to-recover states.

Claude Code embeds a complete Git Safety Protocol in the BashTool prompt (see Chapter 8 for details), with core rules including:

1. **Never skip hooks** (`--no-verify`): pre-commit hooks are the project's quality gates
2. **Never amend** (unless the user explicitly requests it): `git commit --amend` modifies the previous commit, and using it after a hook failure would overwrite the user's previous commit
