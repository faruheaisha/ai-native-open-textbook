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
pageSha256: "07a8848c7437fc29a3e2e0b382d8cb5abe3ebba53351934ac48f62b2d7f36ef2"
contentMode: "local-full"
zh: ""
---

## Mobile push notifications

When Remote Control is active, Claude can send push notifications to your phone.

Claude decides when to push. It typically sends one when a long-running task finishes or when it needs a decision from you to continue. You can also request a push in your prompt, for example `notify me when the tests finish`. Beyond the two on/off toggles below, there is no per-event configuration.

To set up mobile push notifications:

    Download the Claude app for [iOS](https://apps.apple.com/us/app/claude-by-anthropic/id6473753684) or [Android](https://play.google.com/store/apps/details?id=com.anthropic.claude).

    Use the same account and organization you use for Claude Code in the terminal.

    Accept the notification permission prompt from the operating system.

    In your terminal, run `/config` and enable **Push when Claude decides** for proactive notifications, **Push when actions required** for permission prompts and questions, or both.

If notifications don't arrive:

* If `/config` shows **No mobile registered**, open the Claude app on your phone so it can refresh its push token. The warning clears the next time Remote Control connects.
* On iOS, Focus modes and notification summaries can suppress or delay pushes. Check Settings → Notifications → Claude.
* On Android, aggressive battery optimization can delay delivery. Exempt the Claude app from battery optimization in system settings.

Claude Code skips mobile push notifications while you are typing in or focused on the connected terminal. As of v2.1.181, you can set [`CLAUDE_CLIENT_PRESENCE_FILE`](https://code.claude.com/docs/en/env-vars) to a marker file path to extend this to any time you are at the machine, even in another window: notifications are skipped while the file exists. Configure a screen-lock listener or similar tool to create the file when your screen unlocks and delete it when your screen locks.
