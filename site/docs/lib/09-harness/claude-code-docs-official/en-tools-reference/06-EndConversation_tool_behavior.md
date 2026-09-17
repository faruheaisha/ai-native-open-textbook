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
sourceRel: "en/tools-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/tools-reference.md"
sourceSha256: "f928a98a3f2e69421eeadeb064439c827340f4b19a28c7ad920c2a0e60b142f9"
pageSha256: "3c8c1f00138e63b7edb10e911e8b64d0bd00a0708532d41e7ac793a624cf1f89"
contentMode: "local-full"
zh: ""
---

## EndConversation tool behavior

The EndConversation tool ends the current session. Claude uses it only in two situations:

* as a last resort against sustained abusive input, after attempts to redirect the conversation have failed and after a clear warning in an earlier message
* when you explicitly ask to see the tool demonstrated and confirm that you want the session to end

General frustration, profanity, or a task going badly don't qualify, and neither do requests for harmful content, which Claude declines instead of ending the session. Claude Code follows the same approach as claude.ai, which can [end a rare subset of chats](https://www.anthropic.com/research/end-subset-conversations).

After Claude ends an interactive session, the session locks. New prompts and most commands return `Claude ended this conversation. Start a new session (or /clear) to continue.`, and only `/clear`, `/resume`, `/help`, `/exit`, and `/feedback` still run. Claude Code records the end in the session's transcript, so resuming an ended session restores the lock; the session's history isn't deleted.

Resuming an ended session in [non-interactive mode](https://code.claude.com/docs/en/headless) with the `-p` flag errors and exits with code 1, so a script doesn't read the ended run as a success.

The tool never prompts for permission, and [PreToolUse hooks](https://code.claude.com/docs/en/hooks#pretooluse) don't run for it. While any other tool remains, you can't block it either: [deny and ask rules](https://code.claude.com/docs/en/permissions#tool-specific-permission-rules) naming `EndConversation` have no effect, and neither `--disallowedTools` nor a `--tools` list can remove it. The exemption is deliberate: the tool does nothing except end the conversation, never reading or modifying files or data, and a safeguard of this kind holds only if the session it applies to can't turn it off. When your deny rules remove every other tool and also match `EndConversation`, as `"*"` does, Claude Code removes it too rather than leaving it as the only tool, unless an allow rule names `EndConversation` explicitly. A deny list that removes every other tool without matching `EndConversation` leaves it in place.

[Subagents](https://code.claude.com/docs/en/sub-agents) never get the tool. Background tasks that share the main conversation's tool list see it, but calling it there ends nothing.

The tool appears only when all of the following hold:

* **Version**: Claude Code v2.1.213 or later.
* **Model**: the session's model is Claude Opus 4.8, Claude Sonnet 5, Claude Fable 5, or a later version of one of those families.
* **Surface**: an interactive terminal session, including a `claude` session in an IDE's integrated terminal, which is how the [JetBrains plugin](https://code.claude.com/docs/en/jetbrains) runs it. Other surfaces don't include the tool, such as:
  * non-interactive `-p` runs
  * sessions through the [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) TypeScript and Python packages
  * the [VS Code extension](https://code.claude.com/docs/en/vs-code) panel, which bundles its own CLI
  * [GitHub Actions](https://code.claude.com/docs/en/github-actions)
  * [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web)
* **Startup mode**: not a [`--bare`](https://code.claude.com/docs/en/headless#start-faster-with-bare-mode) session. Bare mode loads only shell and file tools, so the tool is never registered there.
* **Provider**: not available on [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock), [Claude Platform on AWS](https://code.claude.com/docs/en/claude-platform-on-aws), [Google Cloud's Agent Platform](https://code.claude.com/docs/en/google-vertex-ai), or [Microsoft Foundry](https://code.claude.com/docs/en/microsoft-foundry), or on sessions signed in through a [cloud gateway](https://code.claude.com/docs/en/claude-apps-gateway).
