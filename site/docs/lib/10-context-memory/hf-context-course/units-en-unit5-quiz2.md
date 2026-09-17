---
title: "Quiz 2: Hooks in Practice"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/units/en/unit5/quiz2.mdx"
sourceRel: "units/en/unit5/quiz2.mdx"
rawUrl: "/raw/10-context-memory/hf-context-course/units/en/unit5/quiz2.mdx"
sourceSha256: "284797f6c0e0ecb1ece459d5010972725311f5575600570bfcfde528ae04c44a"
pageSha256: "284797f6c0e0ecb1ece459d5010972725311f5575600570bfcfde528ae04c44a"
contentMode: "local-full"
zh: ""
---

# Quiz 2: Hooks in Practice

Test your ability to wire hooks into real workflows.

## Question 1: How should the dashboard server be structured?

**选项**

- A. The Gradio app and the FastAPI receiver must run as two separate processes on two separate ports
- B. Mounting Gradio on a FastAPI app with `gr.mount_gradio_app` lets one server serve both the `/event` endpoint and the Gradio UI
- C. You can only receive hook events from Claude Code — Codex, OpenCode, and Pi cannot post JSON
- D. Hook events should be written to a file rather than served over HTTP

**答案解析**

- **A** — They can, but the hands-on example uses `gr.mount_gradio_app(api, ui)` to run them in one process. Simpler, cheaper, and easier to deploy on Spaces.
- **B（正确答案）** — Correct! The FastAPI route `/event` is defined before Gradio is mounted at `/`, so POSTs hit the receiver and everything else lands on the UI.
- **C** — False. All four platforms can POST JSON to an HTTP endpoint: Claude Code uses `type: \
- **D** — File-based logging works, but it's harder to visualize live. HTTP + a polling dashboard gives real-time feedback with minimal code.

## Question 2: How does the Gradio dashboard refresh?

**选项**

- A. The dashboard polls with `gr.Timer(1.0)` because browsers can't receive server-pushed events from Python
- B. Polling with `gr.Timer` re-runs the refresh function every N seconds, which re-reads the shared `events` buffer and re-renders the table and chart
- C. The `gr.Timer` must be nested inside `gr.Row` or it won't fire
- D. The timer is mandatory — Gradio dashboards can't update any other way

**答案解析**

- **A** — Browsers can receive SSE or websockets, but polling a shared in-memory `deque` is the simplest pattern for this kind of dashboard.
- **B（正确答案）** — Correct! Timer is the idiomatic Gradio primitive for periodic refresh.
- **C** — False. Timers are invisible components; they can live anywhere in the Blocks context.
- **D** — False. You could also emit events via `gr.State` + server-side streaming. Timer is just the simplest fit for this use case.

## Question 3: How do hook-based guardrails block dangerous actions?

**选项**

- A. To block a dangerous Bash command in Claude Code, the hook returns HTTP 500
- B. A command hook that exits 2 and prints a reason on stderr is the documented way to block a tool call in Claude Code and Codex
- C. In OpenCode, you block a tool by editing the user's prompt
- D. Guardrails should live in the model's system prompt rather than in hooks

**答案解析**

- **A** — False. HTTP 500 is treated as a non-blocking error. To block, respond 200 with `hookSpecificOutput.permissionDecision = \
- **B（正确答案）** — Correct! Both platforms use the same convention: exit 2 + stderr means block, and the stderr message surfaces to the agent.
- **C** — False. In OpenCode you block by throwing an Error inside `tool.execute.before`.
- **D** — Prompt-based guardrails are useful but unreliable — the model can forget them. Hooks enforce them deterministically.

## Question 4: What makes shell-command hooks safe?

**选项**

- A. Piping `curl --max-time 2` inside a Codex command hook is pointless; the agent never waits for hooks
- B. Shell command hooks can become a shell-injection risk if you interpolate JSON payloads into the command string — piping via `jq -c` and `curl --data-binary @-` is safer
- C. There's no need to worry about hook payloads containing secrets, since the agent's sandbox already redacts them
- D. You must commit `.claude/settings.local.json` to share hooks with teammates

**答案解析**

- **A** — False. Command hooks run synchronously with the tool call. If the dashboard is slow and you don't set a timeout, the agent stalls. `--max-time` is a real protection.
- **B（正确答案）** — Correct! Shape the payload with `jq` and push it via stdin rather than splicing strings into the command line.
- **C** — False. Hook payloads include `tool_input` verbatim — including commands and prompts that may contain secrets. Redact in the dashboard normalizer.
- **D** — False. `.claude/settings.json` is the committed file; `.claude/settings.local.json` is gitignored and for personal overrides.

## Question 5: Why can one dashboard support multiple agents?

**选项**

- A. The same dashboard works for Claude Code, Codex, OpenCode, and Pi because the server normalizes four different payload shapes into one consistent record
- B. The dashboard only works for one platform at a time; you must redeploy it when switching agents
- C. OpenCode events are incompatible with the same receiver because OpenCode plugins can't make HTTP calls
- D. You have to run a separate dashboard per platform, then merge the logs afterwards

**答案解析**

- **A（正确答案）** — Correct! The `_normalize` function maps each platform's field names onto `\{platform, event, tool, args\}` so the UI doesn't need platform-specific branches.
- **B** — False. The normalizer accepts any of the four platforms simultaneously — they just arrive with different platform values from either the body or headers.
- **C** — False. OpenCode plugins can and do call `fetch()` directly from the TS/JS runtime.
- **D** — False. A single receiver handles all four because they can all POST JSON to the same URL.

## Summary

If you got 4-5 correct, you can wire hooks into a real observability and guardrail flow. If not, review the hands-on example, especially the payload normalization and blocking patterns.

## Key Takeaways

- One FastAPI + Gradio process is enough for a lightweight live dashboard
- Hook handlers should fail fast, sanitize payloads, and avoid shell-injection patterns
- A shared receiver works across Claude Code, Codex, OpenCode, and Pi once you normalize the event shape

## What's Next

You've finished Unit 5: Hooks. You now have five end-to-end surfaces for shaping how a code agent works: skills, MCP servers, plugins, subagents, and hooks. The bonus unit goes one level deeper and builds an agent from scratch, so you understand what every one of those surfaces is plugging into.
