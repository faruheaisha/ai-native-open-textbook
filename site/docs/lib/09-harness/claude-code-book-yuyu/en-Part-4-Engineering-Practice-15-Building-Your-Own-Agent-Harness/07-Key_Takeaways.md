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
pageSha256: "fe692986b71a686851484e126e962a0ad5811dc8ee2b43059cecd23792671213"
contentMode: "local-full"
zh: ""
---

## Key Takeaways

1. **Loop state pattern:** Using `while(true)` + `State` object + `continue` to manage loop state is easier to debug and maintain than recursive calls. Claude Code's core query function implements this pattern in roughly 1700 lines of code, handling over ten state transition paths. Three reasons loops beat recursion: state recovery is more natural, abort is more controllable, and debugging is more intuitive.

2. **Factory function + fail-closed defaults:** The `buildTool` pattern keeps tool definitions concise; defaults choose the most conservative strategy (unsafe, has side effects, requires confirmation), and tools explicitly override to declare safety. This fail-closed strategy ensures new tools don't produce dangerous behavior before passing security review.

3. **Dependency injection isolates I/O:** The `QueryDeps` pattern abstracts all external dependencies into injectable interfaces, enabling core logic reuse across different environments (CLI, SDK, test). The core principle is "the core doesn't know where it's running" -- environment differences are encapsulated in adapters, not handled through conditional logic in core code.

4. **Progressive compression:** Multi-tier compression strategies (snipping, micro-compression, summary) trigger progressively based on token usage rate, avoiding blanket information loss. When choosing a compression strategy, consider "what information matters most" -- information loss is relative, and the key is preserving what's most valuable for the current task.

5. **Circuit breaker protection:** Consecutive failure counting, maximum recovery attempts, and fallback strategies -- these mechanisms ensure the agent degrades gracefully when facing persistent errors, rather than looping infinitely. Claude Code chose 3 consecutive failures as the threshold based on actual observational data: beyond 3 is usually a systemic issue, making retries pointless.

6. **Feature flag-driven progressive releases:** Compile-time feature flags allow new features to be safely released progressively; disabled code is completely absent from the build output. The three-tier flag strategy (compile-time, runtime config, remote feature flags) each suits different release scenarios.

7. **Security defense in depth:** From tool-level (`isDestructive`) to system-level (workspace trust, budget ceiling), each layer provides independent security guarantees. The security threat model for Agent systems is fundamentally different from traditional applications -- the LLM's output itself is an attack vector, requiring defenses at every layer.

8. **Observability is the cornerstone of productionization:** From structured logs to aggregated metrics to distributed tracing, the four layers of observability provide the foundation for debugging, optimization, and compliance in Agent systems. An Agent system without observability is a black box -- when problems arise, you can only guess.

---

**Book Conclusion**

From understanding the Agent Harness concept in Chapter 1 to building a custom implementation with your own hands in this chapter, we've completed a full journey. Claude Code, as the benchmark for industrial-grade Agent Harnesses, demonstrates what this technology looks like in actual production environments: not a simple API call wrapper, but a complete software architecture integrating conversation management, tool orchestration, permission control, context engineering, memory systems, and observability.

Agent Harness represents a new software paradigm -- not the programmer telling the machine what to do at every step, but the programmer building a framework within which the machine makes autonomous decisions. The quality of this framework determines the upper bound of the agent's capabilities and the lower bound of its safety.

Looking back across the entire book, we see a clear design philosophy: **at every decision point, Claude Code chose the safer, more controllable, more observable option.** Loops over recursion (easier to debug), fail-closed defaults (safer), progressive compression (more controllable), circuit breaker protection (more robust). These choices may individually seem conservative, but together they constitute a system that can be trusted in production environments.

Future software developers need to master two abilities simultaneously: traditional deterministic programming, and this new "meta-programming" -- building Harnesses for AI agents. We hope this book provides a solid starting point for your exploration on this path. Remember, the best Harness doesn't limit the agent's capabilities -- it maximizes the agent's potential while ensuring safety.
