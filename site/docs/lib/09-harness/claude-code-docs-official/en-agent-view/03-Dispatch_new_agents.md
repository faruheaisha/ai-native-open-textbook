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
pageSha256: "0029898853c4f4b353eee8a271def43d74e7a19a51ec66eecc33d98437596243"
contentMode: "local-full"
zh: ""
---

## Dispatch new agents

You can dispatch new background sessions from agent view, send or copy an existing interactive session to the background, or start one directly from the shell.

### From agent view

Type a prompt in the input at the bottom of agent view and press `Enter` to start a new background session. The session is named automatically from the prompt; rename it later with `Ctrl+R`.

The automatic name is a short label written by a [Haiku-class model](https://code.claude.com/docs/en/model-config). A name the session gets later also appears on its row, including the [generated title](https://code.claude.com/docs/en/sessions#name-your-sessions) the session gets when you [accept a plan](https://code.claude.com/docs/en/permission-modes#review-and-approve-a-plan) in that session.

Paste an image into the prompt to include a screenshot or diagram with the task.

Pasted text longer than 800 characters or more than three lines collapses to a `[Pasted text #N]` placeholder so the input stays on one line; the full text is sent when you dispatch. To review or edit the collapsed text before dispatching, paste the same text again and the placeholder expands back into the input.

Prefix or mention parts of the prompt to control how the session starts:

| Input                                      | Effect                                                                                                                                                         |
| :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
