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
sourceRel: "en/vs-code.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/vs-code.md"
sourceSha256: "6c14f8a02079b0d1ee1142ff770bcda731b181565c57a600c9377c899fbc9801"
pageSha256: "076a2be8d04b2b318a3a06c1c3e0343778855c5b7ce6ba2fe58c2b1703faab1e"
contentMode: "local-full"
zh: ""
---

## Use a screen reader

The extension's chat panel works with screen readers. You don't need to turn anything on: the extension announces conversation activity for every user, with no visual change. This is separate from the CLI's opt-in [screen reader mode](https://code.claude.com/docs/en/accessibility), which adapts the terminal interface.

Screen reader support in the chat panel requires Claude Code v2.1.236 or later.

During a conversation, the extension announces:

* **Claude's replies**: the extension announces each reply once, when it's complete, and stays silent while text streams in. Your screen reader reads code blocks as a line-count summary, reads links by their label, and reads tables cell by cell; the full reply stays readable in the transcript.
* **Permission requests and questions**: the extension announces a request when its permission prompt appears, naming the tool Claude wants to use. It announces in the same way when Claude asks you a question and when Claude finishes a plan and waits for your review.
* **Status changes**: the extension announces when Claude starts working, when Claude is ready for your input, and when Claude Code starts compacting the conversation.
* **Errors and model prompts**: the extension announces errors in the conversation, and announces when the [usage-credits consent prompt](https://code.claude.com/docs/en/model-config#fable-and-usage-credits) or the [flagged-request prompt](https://code.claude.com/docs/en/model-config#ask-before-switching) appears.

Each turn in the transcript starts with a visually hidden heading labeled with the prompt that started the turn, so you can jump between turns with your screen reader's heading navigation. You can also move focus to the transcript itself with `Tab`, since the extension exposes it as a labeled region, and read it at your own pace. While Claude works, your screen reader reads a text label in place of the progress spinner's animation.

When you reopen a session or switch to another one, the extension announces nothing: restored history, pending permission prompts, and in-progress status stay silent until something new happens.
