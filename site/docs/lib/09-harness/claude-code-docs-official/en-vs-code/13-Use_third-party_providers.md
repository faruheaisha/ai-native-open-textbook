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
pageSha256: "f189384d144c660a09d7e857afa9e6c2e0542037d5a18ad6b78f424337ab4d7f"
contentMode: "local-full"
zh: ""
---

## Use third-party providers

By default, Claude Code connects directly to Anthropic's API. If your organization uses Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry to access Claude, configure the extension to use your provider instead:

    Open the [Disable Login Prompt setting](https://code.claude.com/docs) and check the box.

    You can also open VS Code settings (`Cmd+,` on Mac or `Ctrl+,` on Windows/Linux), search for "Claude Code login", and check **Disable Login Prompt**.

    Follow the setup guide for your provider:

    * [Claude Code on Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock)
    * [Claude Code on Google Cloud's Agent Platform](https://code.claude.com/docs/en/google-vertex-ai)
    * [Claude Code on Microsoft Foundry](https://code.claude.com/docs/en/microsoft-foundry)

    These guides cover configuring your provider in `~/.claude/settings.json`, which ensures your settings are shared between the VS Code extension and the CLI.

On a third-party provider, the extension doesn't offer features that require a claude.ai account, such as usage tracking, [voice dictation](https://code.claude.com/docs/en/voice-dictation), and the Web tab for [cloud sessions](#resume-cloud-sessions-from-claude-ai). A claude.ai sign-in left over from an earlier `/login` stays unused: the extension doesn't send it with any request.
