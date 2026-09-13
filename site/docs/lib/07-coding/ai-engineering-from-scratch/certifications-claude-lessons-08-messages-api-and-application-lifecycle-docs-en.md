---
title: "The Messages API Is a State Machine"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/README.md"
zh: ""
---

# The Messages API Is a State Machine

> The API does not remember your conversation. Your application does, and one misplaced content block can break the entire loop.

**Type:** Build
**Languages:** Python
**Prerequisites:** [Spend Capability Where Failure Is Expensive](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/certifications/claude/lessons/02-model-selection-and-token-economics/README.md), [Turn a Request Into a Testable Contract](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/certifications/claude/lessons/03-prompting-and-task-decomposition/README.md), [Put Each Fact in the Right Kind of Context](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/certifications/claude/lessons/04-context-knowledge-memory-and-caching/README.md)
**Time:** ~120 minutes

## Learning Objectives

- Model a Claude request as an explicit application state transition
- Choose SDK or raw REST separately from synchronous, streaming, or batch delivery
- Construct image and document content blocks with explicit asset boundaries
- Preserve typed response blocks and branch on `stop_reason`
- Enforce session, retry, timeout, retention, and context-budget hygiene
- Test a complete lifecycle without depending on a live API key

## The Failure That Teaches the Protocol

An engineer sends this sequence:

1. User asks, "Where is order A-17?"
2. Claude returns a `tool_use` block with ID `toolu_01`.
3. The application runs `lookup_order`.
4. The application sends only the tool result in a fresh request.

The second request fails, or Claude responds as though it never requested the tool.

Nothing mysterious happened. The Messages API is stateless. The client failed to resend the assistant message containing the original `tool_use` block. A `tool_result` is not a freestanding fact. It answers a specific tool request by ID, inside a conversation sequence owned by your code.

Frameworks make this easy to miss because they maintain the array for you. The certification expects you to reason below that convenience layer. Build the raw state machine once. Every SDK, agent framework, and managed runtime becomes easier to debug afterward.

## One Request, One Transition

A request supplies the model, system instructions, messages, token controls, and optional capabilities. A response supplies content blocks, usage metadata, and a reason generation stopped. Your application decides what happens next.

```json
{
