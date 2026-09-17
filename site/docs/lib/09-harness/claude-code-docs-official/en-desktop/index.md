---
title: "Desktop application"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/desktop.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/desktop.md"
sourceSha256: "3c585962a30144144f6f07cddbab26d1e8ab8f6272e881441abe0a1401514a09"
pageSha256: "31500e36580e980c06b751b1add8f00f3db5cf5c92b5954550262fb74aab505e"
contentMode: "local-full"
zh: ""
---

# Desktop application

> Get more out of Claude Code Desktop: parallel sessions with Git isolation, drag-and-drop pane layout, integrated terminal and file editor, side chats, computer use, Dispatch sessions from your phone, visual diff review, app previews, PR monitoring, connectors, and enterprise configuration.

The Claude Desktop app has three tabs: **Chat** for conversations, **Cowork** for [Dispatch and longer agentic work](https://claude.com/product/cowork), and **Code** for software development. This page is the reference for the Code tab.

    Universal build for Intel and Apple Silicon

    For x64 processors

    apt or .deb for Ubuntu and Debian

For Windows ARM64, download the [ARM64 installer](https://claude.ai/api/desktop/win32/arm64/setup/latest/redirect?utm_source=claude_code\&utm_medium=docs). On Linux, install with apt; see [Claude Desktop on Linux](https://code.claude.com/docs/en/desktop-linux).

After installing, launch Claude, sign in, and click the **Code** tab. The first time you open it on Windows, you need [Git for Windows](https://git-scm.com/downloads/win) installed; restart the app after installing it. For a walkthrough of your first session, see the [Get started guide](https://code.claude.com/docs/en/desktop-quickstart).

In the Code tab, each conversation is a **session**: it has its own chat history, project folder, and code changes, independent of any other session. The sidebar lists your sessions and lets you run several in parallel. Within a session you can:

* [Review and comment on diffs](#review-changes-with-diff-view), then [watch the resulting PR through CI](#monitor-pull-request-status)
* [Preview your running app](#preview-your-app) in the Browser pane while Claude verifies its own changes, and [open external sites](#browse-external-sites) alongside it
* Watch Claude [run and test your iOS app](https://code.claude.com/docs/en/desktop-ios-simulator) in the iOS Simulator pane
* [Arrange panes](#arrange-your-workspace) for the chat, diff, browser, terminal, and file editor side by side
* Ask a [side question](#ask-a-side-question-without-derailing-the-session) that uses the session's context without derailing it
* Let Claude [check on, message, or archive your other sessions](#work-across-sessions)
* [Connect external tools](#connect-external-tools) like GitHub, Slack, and Linear
* Let Claude [open apps and control your screen](#let-claude-use-your-computer)
* Run on your machine, in the [cloud](#run-long-running-tasks-remotely), or over [SSH](#ssh-sessions)

For [scheduled recurring work](https://code.claude.com/docs/en/desktop-scheduled-tasks), [keyboard shortcuts](#keyboard-shortcuts), or [sending tasks from your phone](#sessions-from-dispatch), see the linked pages and sections. If you already use the terminal-based CLI, see the [CLI comparison](#coming-from-the-cli) for what carries over.

## 本篇目录

- [Start a session](https://code.claude.com/docs)
- [Work with code](https://code.claude.com/docs)
- [Arrange your workspace](https://code.claude.com/docs)
- [Let Claude use your computer](https://code.claude.com/docs)
- [Manage sessions](https://code.claude.com/docs)
- [Extend Claude Code](https://code.claude.com/docs)
- [Environment configuration](https://code.claude.com/docs)
- [Enterprise configuration](https://code.claude.com/docs)
- [Coming from the CLI?](https://code.claude.com/docs)
- [Troubleshooting](https://code.claude.com/docs)
