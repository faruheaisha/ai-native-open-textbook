---
title: "御舆：解码 Agent Harness"
sourceId: "09-harness/claude-code-book-yuyu"
sourceTitle: "御舆：解码 Agent Harness"
sourceKind: "工程手册"
licenseLabel: "仅引用"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/lintsinghua/claude-code-book"
entryUrl: "https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/en/Part-4-Engineering-Practice/15-Building-Your-Own-Agent-Harness.md"
sourceRel: "en/Part-4-Engineering-Practice/15-Building-Your-Own-Agent-Harness.md"
rawUrl: "/raw/09-harness/claude-code-book-yuyu/en/Part-4-Engineering-Practice/15-Building-Your-Own-Agent-Harness.md"
sourceSha256: "3a95935e4829f49c45caae2e84380fdbe08a6e5998823e1b403a52762dfd2731"
pageSha256: "9ca32e53ba589f17cf8b876659b069de585cb048ce6bfee8cfff6ef1cffbaffe"
contentMode: "local-full"
zh: ""
---

## Hands-on Exercises

Choose one of the following scenarios and design a complete Agent Harness architecture:

**Scenario A: Code Review Agent**
- Tool set: Git operations, file reading, static analysis, comment posting
- Permission model: Read-only mode + comment writing requires confirmation
- Context strategy: Compress by PR dimension, preserving change summaries
- Hooks: Automatically run lint, type checks, inject results into context

**Scenario B: Operations Monitoring Agent**
- Tool set: Log queries, metric retrieval, deployment operations, alert management
- Permission model: Queries auto-approved, operations require dual confirmation
- Context strategy: Sliding window + priority retention for anomalous events
- Hooks: Webhook notifications, audit log recording

**Scenario C: Documentation Generation Agent**
- Tool set: Code analysis, document templates, version comparison, file writing
- Permission model: Automatic mode (trusted write target directory)
- Context strategy: Project-level memory, cross-session style preference persistence
- Hooks: Format checking, link validation

For your chosen scenario, complete the following design:

1. Draw a component relationship diagram (call relationships between dialog loop, tool system, permission pipeline, context management, memory system, and hook system)
2. Define at least three tools with complete `buildTool` definitions
3. Design the four-stage check logic for the permission pipeline
4. Choose a compression strategy and explain trigger conditions
5. Define at least two hooks and their expected behavior

### Extended Exercise: Implementing a Minimal Agent Harness

Based on the six-step roadmap in this chapter, implement a minimal runnable Agent Harness. The suggested implementation order is:

**Week 1: Dialog Loop + Tool System**
- Implement the core `agentLoop` function
- Implement the `buildTool` factory function
- Define 2-3 basic tools (file reading, file listing, command execution)
- Validation: can complete a simple "read file and answer questions" task

**Week 2: Permission Pipeline + Context Management**
- Implement four-stage permission checks
- Implement a simple snip compression strategy
- Add token counting and budget checks
- Validation: can safely execute operations requiring confirmation; long conversations don't overflow

**Week 3: Memory System + Hook System**
- Implement simple memory extraction and injection
- Implement the Shell command hook executor
- Add session_start and post_tool_use hooks
- Validation: memory persists across sessions; hooks correctly intercept and modify behavior

**Week 4: Testing and Productionization**
- Write unit tests for core components
- Add structured logging
- Implement error recovery and circuit breaker
- Use in a real project and collect feedback
