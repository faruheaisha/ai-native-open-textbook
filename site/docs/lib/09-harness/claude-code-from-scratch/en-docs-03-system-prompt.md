---
title: "3. System Prompt Engineering"
sourceId: "09-harness/claude-code-from-scratch"
sourceTitle: "Claude Code From Scratch"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/Windy3f3f3f3f/claude-code-from-scratch"
entryUrl: "https://github.com/Windy3f3f3f3f/claude-code-from-scratch/blob/0b452360866433fde0dc77cd37ada9d303546592/en/docs/03-system-prompt.md"
sourceRel: "en/docs/03-system-prompt.md"
rawUrl: "/raw/09-harness/claude-code-from-scratch/en/docs/03-system-prompt.md"
sourceSha256: "ccb7ab667e087f27f559461de7ff3b2ff605fea56d6ce22a083bd2ae6a403e2b"
pageSha256: "ccb7ab667e087f27f559461de7ff3b2ff605fea56d6ce22a083bd2ae6a403e2b"
contentMode: "local-full"
zh: ""
---

# 3. System Prompt Engineering

## Chapter Goals

Last chapter the agent got a set of tools, but it still doesn't know who it is, what environment it's working in, or when to be careful — all of which lives in the System Prompt, the first block of text assembled before every model call. This chapter builds it.

Split in two: a static core with identity, rules, and tool preferences, byte-identical across sessions (which makes it cacheable — Chapter 7 leans on that); and a dynamic half assembled each time with the current environment facts — OS, working directory, Git state, and the project's own `CLAUDE.md`.

```mermaid
graph TB
    Template[SYSTEM_PROMPT_TEMPLATE<br/>Inline Markdown Template] --> Static[Static core<br/>cached via cache_control]
    CWD[Working Directory] --> Dynamic[buildDynamicSystemContext<br/>dynamic block]
    Git[Git Info] --> Dynamic
    Memory[Memory System] --> Dynamic
    Skills[Skills Descriptions] --> Dynamic
    Agents[Agent Descriptions] --> Dynamic
    Static --> API[Passed to API<br/>system parameter]
    Dynamic --> API
    ClaudeMD[CLAUDE.md + date] --> Reminder[buildUserContextReminder<br/>system-reminder]
    Reminder --> FirstMsg[Injected into first user message]

    style Static fill:#7c5cfc,color:#fff
    style Dynamic fill:#e8e0ff
    style Reminder fill:#e8e0ff
```

> ▶ **Run this chapter**: `node steps/run.mjs 3` (no API key). Add `--diff` to see what it added over the previous chapter. To run your own prompt against a real model, add `--live` (it reads the key from `.env`; `--py` runs the Python version).

## Our Implementation

Last chapter's agent still used a hard-coded one-line system prompt. This chapter builds `prompt.ts`, giving it a real static core (identity, rules, tool preferences) plus a dynamic environment block. Relative to last chapter, `agent.ts` changes just one line — the hard-coded string becomes `buildSystemPrompt()`:

Run it, and it now works with the full system prompt in place:

```
$ node steps/run.mjs 3
▶ step 3 demo (no API key — local mock model)   sandbox: <sandbox>
  you: Read the file greeting.txt and tell me what it says.

  → read_file({"file_path":"greeting.txt"})
greeting.txt says: hello from step one.
```

### SYSTEM_PROMPT_TEMPLATE

The template is inline in `prompt.ts`. It IS the static core — no interpolation at all, byte-identical across sessions, which is exactly what makes it cacheable:
