---
title: "Continue local sessions from any device with Remote Control"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/remote-control.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/remote-control.md"
sourceSha256: "24ef9e60eeae3360065480ea2b2ba103f3bef9e6e470ada18c41fcd2be67bbbe"
pageSha256: "a33ee88f25a96422ac56e9563a1cee11f433cbfb60a46b5ff57b21e6b9686814"
contentMode: "local-full"
zh: ""
---

# Continue local sessions from any device with Remote Control

> Continue a local Claude Code session from your phone, tablet, or any browser using Remote Control. Works with claude.ai/code and the Claude mobile app.

  Remote Control is available on all plans. On Team and Enterprise, it is off by default until an Owner enables the Remote Control toggle in [Claude Code admin settings](https://claude.ai/admin-settings/claude-code).

Remote Control connects [claude.ai/code](https://claude.ai/code) or the Claude app for [iOS](https://apps.apple.com/us/app/claude-by-anthropic/id6473753684) and [Android](https://play.google.com/store/apps/details?id=com.anthropic.claude) to a Claude Code session running on your machine. Start a task at your desk, then pick it up from your phone on the couch or a browser on another computer.

When you start a Remote Control session on your machine, Claude keeps running locally the entire time, so your code execution and filesystem access stay on your machine. With Remote Control you can:

* **Use your full local environment remotely**: your filesystem, [MCP servers](https://code.claude.com/docs/en/mcp), tools, and project configuration all stay available, and typing `@` autocompletes file paths from your local project.
* **Work from both surfaces at once**: the conversation and the progress of [subagents](https://code.claude.com/docs/en/sub-agents) and [dynamic workflows](https://code.claude.com/docs/en/workflows) stay in sync across all connected devices, so you can send messages from your terminal, browser, and phone interchangeably.
* **Send images and files from your phone or browser**: attach a photo or file in the Claude app or at claude.ai/code, with or without a caption. Claude sees attached photos directly as part of your message. Claude Code downloads other files to your machine and passes them to Claude as `@` file references.
* **Survive interruptions**: if your laptop sleeps or your network drops, Claude Code reconnects automatically when your machine comes back online. While the connection is rebuilding, Claude Code queues messages, permission prompts, and status updates from subagents and workflows, and delivers them once the connection recovers.

Unlike [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web), which runs on cloud infrastructure, Remote Control sessions run directly on your machine and interact with your local filesystem. The web and mobile interfaces are a window into that local session.

This page covers setup, how to start and connect to sessions, and how Remote Control compares to Claude Code on the web.

## 本篇目录

- [Requirements](https://code.claude.com/docs)
- [Start a Remote Control session](https://code.claude.com/docs)
- [Connection and security](https://code.claude.com/docs)
- [Trusted Devices](https://code.claude.com/docs)
- [Remote Control vs Claude Code on the web](https://code.claude.com/docs)
- [Mobile push notifications](https://code.claude.com/docs)
- [Limitations](https://code.claude.com/docs)
- [Troubleshooting](https://code.claude.com/docs)
- [Choose the right approach](https://code.claude.com/docs)
- [Related resources](https://code.claude.com/docs)
