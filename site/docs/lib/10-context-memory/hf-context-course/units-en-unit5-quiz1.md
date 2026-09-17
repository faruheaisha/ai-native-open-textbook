---
title: "Quiz 1: Hook Fundamentals"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/units/en/unit5/quiz1.mdx"
sourceRel: "units/en/unit5/quiz1.mdx"
rawUrl: "/raw/10-context-memory/hf-context-course/units/en/unit5/quiz1.mdx"
sourceSha256: "3557f3c0398f50a0c8993d8d82cc476ea9da60e5d1b294882fa793db6fead7d6"
pageSha256: "3557f3c0398f50a0c8993d8d82cc476ea9da60e5d1b294882fa793db6fead7d6"
contentMode: "local-full"
zh: ""
---

# Quiz 1: Hook Fundamentals

Test your understanding of hooks, the events they cover, and how they differ across Claude Code, Codex, OpenCode, and Pi.

## Question 1: What is a hook?

**选项**

- A. A hook is a model prompt that reminds the agent to run a command
- B. A hook is a user-defined handler that runs at a deterministic point in the agent's lifecycle, independent of the model's cooperation
- C. A hook is a way to package skills, MCP servers, and agents into a distributable bundle
- D. A hook is a kind of subagent that runs in parallel with the main agent

**答案解析**

- **A** — That's a skill, not a hook. Hooks are runtime handlers — the runtime calls them regardless of what the model chose to do.
- **B（正确答案）** — Correct! Hooks fire on events like PreToolUse and Stop, and they run whether or not the model 'wanted' them to.
- **C** — That's a plugin. Some plugin systems (like Claude Code's) can bundle hooks, but a hook is not the same as a plugin.
- **D** — Subagents are isolated model instances. Hooks are runtime callbacks — much lighter weight and not model calls by default.

## Question 2: How do hook surfaces differ across platforms?

**选项**

- A. Claude Code uses PascalCase JSON events (PreToolUse, Stop); Codex uses a smaller PascalCase JSON set behind a feature flag; OpenCode uses TS/JS plugin modules; Pi uses TS/JS extensions with lower_snake_case events like tool_call
- B. All four platforms use the exact same settings.json format for hook events
- C. OpenCode exposes hooks through JSON configuration, like Claude Code
- D. Only Claude Code supports HTTP hooks; Codex, OpenCode, and Pi cannot send events to an HTTP receiver

**答案解析**

- **A（正确答案）** — Correct! The four platforms share the same lifecycle but differ in syntax and surface.
- **B** — False. Only Claude Code uses settings.json. Codex uses hooks.json, OpenCode uses code-first plugins, and Pi uses extensions.
- **C** — False. OpenCode has no JSON event config — plugins are TS/JS modules exporting hook handlers as object keys.
- **D** — Close but not quite. Claude Code's 'http' handler type is unique, but Codex command hooks can call curl, and OpenCode and Pi extensions can call fetch() — all can deliver events to HTTP.

## Question 3: Which lifecycle events matter most?

**选项**

- A. PreToolUse fires after the tool returns, so you can log the result
- B. UserPromptSubmit fires when the user submits a prompt, before the model sees it — ideal for injecting extra context
- C. Stop fires only at session end, not per turn
- D. PostToolUse in Codex fires for every possible tool path, just like in Claude Code

**答案解析**

- **A** — False. PreToolUse fires *before* the tool call. PostToolUse is the 'after' event.
- **B（正确答案）** — Correct! This is the right event for prepending or modifying the prompt. Claude Code and Codex support UserPromptSubmit directly; Pi's nearest equivalent is before_agent_start.
- **C** — False. Stop fires at the end of each turn; SessionEnd (Claude Code) is the session-level event.
- **D** — False. Codex PreToolUse and PostToolUse cover supported tool calls such as Bash, apply_patch, and MCP tools, but the surface is narrower than Claude Code's.

## Question 4: How do hooks block or modify actions?

**选项**

- A. A Claude Code command hook exits with code 2 and writes a reason to stderr to block the action
- B. A Claude Code hook returns HTTP 500 to block the action
- C. An OpenCode hook writes to stdin to block a tool call
- D. Hooks cannot block or modify tool calls; they are observe-only

**答案解析**

- **A（正确答案）** — Correct! Exit 2 + stderr is the documented blocking signal; on PreToolUse it blocks the tool call, on UserPromptSubmit it erases the prompt.
- **B** — False. Non-2xx responses from HTTP hooks are treated as non-blocking errors, not as explicit block signals.
- **C** — False. OpenCode hooks block by throwing an Error. There is no stdin — they are TS/JS functions, not processes.
- **D** — False. All four platforms support influencing the agent: Claude Code and Codex via exit codes or JSON output, OpenCode via mutating `output` or throwing, and Pi via returned values or event mutation.

## Question 5: When should you use hooks instead of skills?

**选项**

- A. Hooks replace skills: once you have hooks, you don't need to write skills anymore
- B. Hooks are the right surface when you need deterministic behavior — like 'always run the linter after an Edit' — that shouldn't depend on the model remembering
- C. Hooks are mainly for user interface theming
- D. Hooks only make sense for single-agent workflows

**答案解析**

- **A** — False. Skills teach the model *when* and *how* to do something; hooks fire around every step regardless of what the model chose. They complement each other.
- **B（正确答案）** — Correct! That's exactly what hooks are for: turning conventions into code so the runtime enforces them.
- **C** — False. A few events (like Claude Code's Notification) relate to UI, but hooks are mostly about observability, guardrails, and automation.
- **D** — False. SubagentStart / SubagentStop (Claude Code) and session.* events (OpenCode) make hooks useful in multi-agent workflows too.

---

## Summary

If you got 4-5 correct, you understand the core hook model well enough to start wiring real guardrails and observability. If not, review the event lifecycle and the platform comparison before continuing.

## Key Takeaways

- Hooks are deterministic runtime handlers, not prompts or plugins
- Claude Code, Codex, OpenCode, and Pi expose similar lifecycle moments with different configuration surfaces
- Hooks are the right tool when behavior must happen every time rather than relying on the model to remember

## Next Steps

Next, wire hooks into a real dashboard so you can see agent activity live.
