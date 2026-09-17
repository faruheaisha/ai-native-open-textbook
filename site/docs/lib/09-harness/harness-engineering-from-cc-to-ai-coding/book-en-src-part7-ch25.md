---
title: "Chapter 25: Harness Engineering Principles"
sourceId: "09-harness/harness-engineering-from-cc-to-ai-coding"
sourceTitle: "驾驭工程：从 Claude Code 源码到 AI 编码最佳实践"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding"
entryUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding/blob/e40e0feec02b90e308ccbfc7a8911d64118ccca0/book-en/src/part7/ch25.md"
sourceRel: "book-en/src/part7/ch25.md"
rawUrl: "/raw/09-harness/harness-engineering-from-cc-to-ai-coding/book-en/src/part7/ch25.md"
sourceSha256: "3cf869d0c2ef87a4509e83c98c6c873cc18752c27daa9c469178d24c28d1509e"
pageSha256: "3cf869d0c2ef87a4509e83c98c6c873cc18752c27daa9c469178d24c28d1509e"
contentMode: "local-full"
zh: ""
---

# Chapter 25: Harness Engineering Principles

## Why This Matters

In the preceding six parts, we dissected every subsystem of Claude Code at the source code level — tool registration, Agent Loop, system prompts, context compaction, prompt caching, permission security, and the skill system. These analyses revealed a wealth of implementation details, but if we stop at the level of "how it works," we would waste the most valuable output of reverse engineering: **reusable engineering principles**.

This chapter distills 6 core Harness Engineering principles from the source code analyses in the preceding 23 chapters. Each principle has clear source code traceability, applicable scenarios, and anti-pattern warnings. The common theme across these principles is: **in AI Agent systems, the best way to control behavior is not to write more code, but to design better constraints**.

---

## Claude Code's Position in the Agent Loop Architecture Spectrum

Before distilling principles, it's worth answering a meta-question: **What type of Agent architecture is Claude Code?**

Academics categorize Agent Loops into six patterns: monolithic loop (ReAct-style reasoning-action interleaving), hierarchical agents (goal-task-execution three-tier), distributed multi-agent (multi-role collaboration), reflection/metacognitive loop (Reflexion-style self-improvement), tool-augmented loop (external tool-driven state updates), and learning/online update loop (memory persistence and strategy iteration). Most frameworks (LangGraph, AutoGen, CrewAI) choose one or two patterns as their core abstraction.

What makes Claude Code unique is: **it is not a pure implementation of any single pattern, but a pragmatic hybrid of all six**.

```
┌─────────────────────────────────────────────────────────────┐
│           Claude Code Architecture Spectrum Position         │
├──────────────────────┬──────────────────────────────────────┤
│ Academic Pattern     │ CC Implementation                    │
├──────────────────────┼──────────────────────────────────────┤
│ Monolithic Loop      │ queryLoop() — core Agent Loop (ch03) │
│ Tool-Augmented Loop  │ 40+ tools in ReAct-style (ch02-04)  │
│ Hierarchical Agent   │ Coordinator Mode layers (ch20)      │
│ Distributed Multi-   │ Team parallel + Ultraplan remote     │
│   Agent              │   delegation (ch20)                  │
│ Reflection (weak)    │ Advisor Tool + stop hooks (ch21)    │
│ Learning (weak)      │ Cross-session memory + CLAUDE.md    │
│                      │   persistence (ch24)                │
└──────────────────────┴──────────────────────────────────────┘
```

This hybrid is not a design mistake, but a pragmatic choice. CC's core is a monolithic `queryLoop()` (pattern one), but on top of that:

- **Tool augmentation** is the default behavior — each iteration may invoke tools, obtain observations, and update state, which is exactly the "reasoning-action interleaving" of ReAct
- **Hierarchical agents** are enabled on demand — Coordinator Mode splits "planning" and "execution" into different tiers, with the upper tier only making decisions and the lower tier only executing
- **Distributed multi-agent** is enabled on demand — Team mode lets multiple Agents collaborate through `SendMessageTool`, and Ultraplan offloads planning to remote containers
- **Reflection** is implicit — there is no explicit Reflexion memory, but Advisor Tool provides a "critic" role, and stop hooks provide "post-execution checks"
- **Learning** is persistent — cross-session memory (`~/.claude/memory/`) and CLAUDE.md allow the Agent to accumulate experience across sessions, but without updating model weights

This "simple by default, complex on demand" architectural philosophy permeates all the principles distilled in this chapter.

---

## Source Code Analysis

### 25.1 Principle One: Prompts as the Control Plane

**Definition**: Guide model behavior through system prompt segments rather than hardcoding restrictions in code logic.

The vast majority of Claude Code's behavior guidance is achieved through prompts, not through if/else branches in code. The most typical example is the minimalism directive:

```typescript
// restored-src/src/constants/prompts.ts:203
"Don't create helpers, utilities, or abstractions for one-time operations.
Don't design for hypothetical future requirements. The right amount of
complexity is what the task actually requires — no speculative abstractions,
but no half-finished implementations either. Three similar lines of code
is better than a premature abstraction."
```

This text is not a code comment — it is an actual instruction sent to the model. Claude Code does not detect at the code level whether the model is over-engineering (which is technically nearly impossible), but instead directly tells the model "don't do this" through natural language.

The same pattern pervades the entire system prompt architecture (see Chapter 5 for details). `systemPromptSections.ts` organizes system prompts into multiple composable sections, each with a clear cache scope (`scope: 'global'` or `null`). This design means behavior adjustments only require modifying text — no code changes, no test changes, no release process needed.

Tool prompts are the quintessential embodiment of this principle (see Chapter 8 for details). BashTool's Git Safety Protocol — "never skip hooks, never amend, prefer specific file git add" — is expressed entirely through prompt text. If the team someday decides to allow amend, they only need to delete one line of prompt text, without touching any execution logic.
