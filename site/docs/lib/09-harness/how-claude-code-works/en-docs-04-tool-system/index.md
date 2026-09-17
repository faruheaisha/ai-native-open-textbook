---
title: "Chapter 4: Tool System"
sourceId: "09-harness/how-claude-code-works"
sourceTitle: "How Claude Code Works"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works"
entryUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/04-tool-system.md"
sourceRel: "en/docs/04-tool-system.md"
rawUrl: "/raw/09-harness/how-claude-code-works/en/docs/04-tool-system.md"
sourceSha256: "836b93f9427057d0ce100d2a8e9dbf31e47ce1f967ca27b83e65ee708c096fb7"
pageSha256: "22d80ed450a8996ed6190f4ed1b7e8acdb0efa0d8aada2d551f20a2cd6283498"
contentMode: "local-full"
zh: ""
---

# Chapter 4: Tool System

> The tool system is the carrier of Claude Code's capabilities. 60+ built-in tools + MCP extensions = unlimited possibilities.

All of Claude Code's capabilities—file read/write, Shell commands, code search, sub-Agent spawning, MCP external service calls—are exposed to the model through a unified tool system. The model does not directly operate on the filesystem or network; instead, it accomplishes all side-effecting operations by calling tools. The tool system is the sole bridge connecting "model intelligence" to "the real world."

The core architecture of this system is divided into three layers:

- **Design layer**: The `Tool` generic interface (`src/Tool.ts`)—defines the contract every tool must implement: execution logic, input Schema, safety semantic markers (read-only/destructive/concurrency-safe), permission checks, and UI rendering
- **Assembly layer**: `getAllBaseTools()` → `getTools()` → `assembleToolPool()` (`src/tools.ts`)—from compile-time pruning to runtime filtering, ultimately merging built-in tools and MCP tools into a unified tool pool
- **Execution layer**: `StreamingToolExecutor` (`src/services/tools/`)—executes tools concurrently while the model streams output, handling permission checks, Hook callbacks, and result formatting

This design yields two key advantages: adding a new tool only requires implementing the `Tool` interface, with no changes needed to the execution pipeline or permission system; safety semantics (`isReadOnly`, `isDestructive`) are encoded as interface methods rather than external configuration, ensuring that safety properties always stay in sync with the tool implementation.

**Chapter roadmap**: Sections 4.1–4.2 cover interface definition and the assembly pipeline; 4.3 provides a full inventory of built-in tools; 4.4–4.5 explain the execution lifecycle and concurrency control; 4.6–4.7 dive deep into the two most complex tools (BashTool and AgentTool); 4.8–4.10 cover large result handling, MCP integration, and deferred loading; 4.11–4.12 summarize design insights and UI rendering patterns.

## 本篇目录

- [4.1 Tool Interface Definition](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/01-4.1_Tool_Interface_Definition.md)
- [4.2 Tool Registration and Assembly](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/02-4.2_Tool_Registration_and_Assembly.md)
- [4.3 Built-in Tool Inventory](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/03-4.3_Built-in_Tool_Inventory.md)
- [4.4 Tool Execution Lifecycle](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/04-4.4_Tool_Execution_Lifecycle.md)
- [4.5 Concurrency Control](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/05-4.5_Concurrency_Control.md)
- [4.6 BashTool Deep Dive](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/06-4.6_BashTool_Deep_Dive.md)
