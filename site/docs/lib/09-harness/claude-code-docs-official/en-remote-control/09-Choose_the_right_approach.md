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
sourceRel: "en/remote-control.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/remote-control.md"
sourceSha256: "24ef9e60eeae3360065480ea2b2ba103f3bef9e6e470ada18c41fcd2be67bbbe"
pageSha256: "78e217ade7e1b2ca93aa7de54fcd0b51644bde8eea37657306e0a23b66bb60bf"
contentMode: "local-full"
zh: ""
---

## Choose the right approach

Claude Code offers several ways to work when you're not at your terminal. They differ in what triggers the work, where Claude runs, and how much you need to set up.

|                                                          | Trigger                                                                                        | Claude runs on                                                                               | Setup                                                                                                                                | Best for                                                      |
| :------------------------------------------------------- | :--------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ |
| [Dispatch](https://code.claude.com/docs/en/desktop#sessions-from-dispatch)           | Message a task from the Claude mobile app                                                      | Your machine (Desktop)                                                                       | [Pair the mobile app with Desktop](https://support.claude.com/en/articles/13947068)                                                  | Delegating work while you're away, minimal setup              |
| [Remote Control](https://code.claude.com/docs/en/remote-control)                     | Drive a running session from [claude.ai/code](https://claude.ai/code) or the Claude mobile app | Your machine (CLI or VS Code)                                                                | Run `claude remote-control`                                                                                                          | Steering in-progress work from another device                 |
| [Channels](https://code.claude.com/docs/en/channels)                                 | Push events from a chat app like Telegram or Discord, or your own server                       | Your machine (CLI)                                                                           | [Install a channel plugin](https://code.claude.com/docs/en/channels#quickstart) or [build your own](https://code.claude.com/docs/en/channels-reference)                                      | Reacting to external events like CI failures or chat messages |
| [Slack](https://code.claude.com/docs/en/slack)                                       | Mention `@Claude` in a team channel                                                            | Anthropic cloud                                                                              | [Install the Slack app](https://code.claude.com/docs/en/slack#setting-up-claude-code-in-slack) with [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) enabled | PRs and reviews from team chat                                |
| [Self-hosted environments](https://code.claude.com/docs/en/self-hosted-environments) | Start a [cloud session](https://code.claude.com/docs/en/claude-code-on-the-web) and pick your organization's environment   | Your organization's infrastructure                                                           | [Deploy runners](https://code.claude.com/docs/en/self-hosted-environments-quickstart), on Team and Enterprise plans                                              | Cloud sessions that must run inside your network              |
| [Scheduled tasks](https://code.claude.com/docs/en/scheduled-tasks)                   | Set a schedule                                                                                 | [CLI](https://code.claude.com/docs/en/scheduled-tasks), [Desktop](https://code.claude.com/docs/en/desktop-scheduled-tasks), or [cloud](https://code.claude.com/docs/en/routines) | Pick a frequency                                                                                                                     | Recurring automation like daily reviews                       |
