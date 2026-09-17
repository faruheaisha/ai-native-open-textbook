---
title: "Quiz 2: Multi-Agent Workflows"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/units/en/unit4/quiz2.mdx"
sourceRel: "units/en/unit4/quiz2.mdx"
rawUrl: "/raw/10-context-memory/hf-context-course/units/en/unit4/quiz2.mdx"
sourceSha256: "3bc07f7bb96a237e7bdad2456ab6cd234e9dd4130f5d9fb38ebb3e6641f48b5e"
pageSha256: "3bc07f7bb96a237e7bdad2456ab6cd234e9dd4130f5d9fb38ebb3e6641f48b5e"
contentMode: "local-full"
zh: ""
---

# Quiz 2: Multi-Agent Workflows

Test your ability to design and implement multi-agent workflows.

## Question 1: When is the overhead of subagents worth it?

**选项**

- A. Always spawn as many subagents as possible for maximum parallelism
- B. Use subagents when tasks are independent and parallelizable, and the overhead is justified by the task complexity
- C. Subagents are only for research tasks; never use for implementation
- D. Subagents should always share the same context window as the parent

**答案解析**

- **A** — More subagents means more token usage, latency, and coordination overhead. Use subagents selectively.
- **B（正确答案）** — Correct! Subagent workflows consume more tokens than single-agent runs. Only use them when the parallelism benefit outweighs the overhead.
- **C** — False. Worker subagents can implement fixes, write code, and make changes. Codex even has a built-in 'worker' agent type for this.
- **D** — Subagents run as isolated instances with their own context. They communicate results back to the parent, not share context directly.

## Question 2: How do parent agents share context with subagents?

**选项**

- A. Subagents can directly access the parent agent's memory and variables
- B. Pass small context in the task description; for large data, write to a file and reference the path
- C. Use global variables that all subagents can read
- D. There's no way to share data between parent and subagent

**答案解析**

- **A** — False. Subagents are isolated. They receive context from the parent via their task description and report results back.
- **B（正确答案）** — Correct! Subagents can't access parent memory. Use task descriptions for small context and files for larger data.
- **C** — Subagents are separate instances. Global variables don't cross agent boundaries.
- **D** — False. The parent passes context in the task description, and subagents report results back. File system can also be used.

## Question 3: How should you design for subagent failure?

**选项**

- A. If a subagent fails, the entire workflow always fails
- B. Design for failure: use timeouts, handle partial results, and have fallback strategies
- C. Assume all subagents will succeed; don't add error handling since it's just overhead
- D. If a subagent fails, immediately spawn 5 more to retry the same task

**答案解析**

- **A** — Not necessarily. Good design handles failures gracefully — retry, skip, or use partial results.
- **B（正确答案）** — Correct! Subagents can timeout, produce errors, or return unexpected results. Robust workflows handle these cases.
- **C** — Risky. Network issues, token limits, and unexpected errors are common in multi-agent workflows.
- **D** — Wasteful. Diagnose the failure first, then retry selectively. Brute-force retries waste tokens.

## Question 4: How do Claude Code and Codex expose subagents?

**选项**

- A. Claude Code: use /agent spawn. Codex: use codex-agent spawn. They're identical.
- B. Claude Code: conversational invocation + custom agents in .claude/agents/. Codex: natural language requests + custom agents as TOML files in .codex/agents/.
- C. Claude Code doesn't support subagents. Only Codex does.
- D. Both platforms use the exact same subagent API and configuration format

**答案解析**

- **A** — Neither command exists. Claude Code uses conversational invocation; Codex uses natural language requests to spawn agents.
- **B（正确答案）** — Correct! Both platforms use natural language to trigger subagent creation, but configure custom agents differently — Claude Code with markdown files, Codex with TOML files.
- **C** — False. Claude Code has robust subagent support via the Agent tool, conversational invocation, and custom agents.
- **D** — No. Claude Code uses markdown-based agent definitions; Codex uses TOML. The invocation style is conversational for both but with different capabilities.

## Question 5: What built-in agent types does Codex provide?

**选项**

- A. Codex has three built-in agent types: default (general), worker (implementation), and explorer (read-heavy codebase exploration)
- B. Codex has no built-in agent types; you must always define custom agents
- C. Codex only supports one agent at a time; there's no parallelism
- D. Codex subagents require a separate codex-agent binary to manage

**答案解析**

- **A（正确答案）** — Correct! These three built-in types cover the most common subagent use cases without requiring custom agent definitions.
- **B** — False. Codex ships with default, worker, and explorer agents that can be used immediately.
- **C** — False. Codex supports up to max_threads (default 6) concurrent agent threads.
- **D** — False. Subagents are managed through Codex itself — use /agent to switch between threads, or ask Codex in natural language.

---

## Summary

If you got 4-5 correct, you're ready to design multi-agent workflows without reaching for subagents unnecessarily. If you missed several, review the platform-specific invocation patterns and failure-handling guidance.

## Key Takeaways

- Use subagents when the task shape justifies isolation or parallelism
- Pass only the context a child agent needs, and use files when the payload is too large for a prompt
- Design for retries, partial results, and platform-specific invocation details from the start

## Next Steps

You've finished Unit 4: Subagents. Next up is Unit 5, where you'll add deterministic lifecycle hooks around those same agent workflows.
