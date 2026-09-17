---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/agent-view.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-view.md"
sourceSha256: "b77a9b549bf450a86bfbd7947ccc8bdd95b574bc0e043fa6fd281fc792690b1f"
pageSha256: "42e3e437dfc8c524b8bc5f38d46b27845aa0d52ab141493c8e5ed301a003d01f"
contentMode: "local-full"
zh: ""
---

## Quick start

This walkthrough covers the core agent view loop: dispatch a task, watch its row update as Claude works, peek to check on it and reply, and attach for the full conversation. The session you dispatch keeps running after you close agent view, so you can leave and come back to it.

    From your shell, run:

    ```bash theme=\{null\}
    claude agents
    ```

    If you haven't yet accepted the [workspace trust dialog](https://code.claude.com/docs/en/permissions#project-allow-rules-and-workspace-trust) for the directory, Claude Code shows it before agent view opens, the same dialog `claude` shows. Accept to save trust for the workspace and continue. If you decline, Claude Code exits without opening agent view.

    Agent view opens with an input at the bottom and a table that fills in as sessions start. Press `Esc` to return to your shell; if you opened agent view by backgrounding a session with `←`, `Esc` returns to that conversation instead. Your sessions keep running while you're away and reappear the next time you open agent view.

    Type a prompt describing a task and press `Enter`. A new background session starts on that task and appears as a row showing whether it's working, waiting on you, or done. The new session uses the model shown in the agent view header. [Which permission mode it starts in](#permission-mode-model-and-effort) depends on how you opened agent view.

    Every prompt you enter here starts its own new session. Typing another prompt and pressing `Enter` launches a second session alongside the first rather than sending a follow-up to it. You can run several in parallel this way.

    Each session uses your subscription quota independently, so see [Limitations](#limitations) before dispatching many at once.

    Select a row with the arrow keys and press `Space` to open the peek panel. It shows the session's most recent output, or the question it's waiting on, rather than the full transcript. Type a reply and press `Enter` to send it without leaving agent view.

    Press `Enter` or `→` on a row to attach when you want the full conversation. The session takes over the terminal as a full interactive Claude Code session. Press `←` on an empty prompt to detach and return to the table.

    This step needs a running session. If you followed the earlier steps you don't have one open in this terminal, so open a regular `claude` session in another terminal and send it a message first.

    To move a session you already have open into agent view, run `/bg` inside it, or press `←` on an empty prompt to background it and open agent view in one step. In a fresh session with no messages yet, `/bg` asks you to send a message first, while `←` works right away. The session keeps running and appears as a row alongside the ones you dispatched.

You can use `claude agents` as your primary entry point instead of `claude`: dispatch every task from agent view, attach when you want the full conversation, and press `←` to return to the table.

Inside a regular `claude` session, the prompt footer's `←` hint counts the background agents that are waiting on you, such as `← 2 agents`, and returns to `← for agents` when none need input. Counts above 99 show as `99+`. The count refreshes about every ten seconds while the terminal is focused and immediately when focus returns. It briefly changes color when it moves and when an agent completes, and when a background session finishes while none need your input it briefly shows the number completed, such as `← 2 done`. Both flashes are off when the [`prefersReducedMotion` setting](https://code.claude.com/docs/en/settings-reference#prefersreducedmotion) is on, and the hint is hidden in [screen reader mode](https://code.claude.com/docs/en/accessibility).
