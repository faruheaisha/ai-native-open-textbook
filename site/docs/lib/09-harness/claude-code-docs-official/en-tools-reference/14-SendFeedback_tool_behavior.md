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
pageSha256: "9c55d2231b86dde4125627131ee361fe814e9e5c365df57b8e7c29fda48a5fa2"
contentMode: "local-full"
zh: ""
---

## SendFeedback tool behavior

Claude-drafted feedback is a feedback report about Claude Code that Claude writes for you. It requires Claude Code v2.1.238 or later. Claude Code saves each draft on your machine under `~/.claude/feedback/drafts/`, and nothing reaches Anthropic until you send it. Claude drafts one with the SendFeedback tool when:

* A tool or command keeps failing
* It can't help with something you asked for
* You point out a mistake it made, or it notices one
* You ask it to file feedback

### What you see when Claude drafts

After Claude queues a draft, you see a card above your prompt with the draft's title. Press `1` to review the draft, press `2` twice to send it as written, or press `0` to dismiss it. A dismissed draft stays in your queue. After you dismiss a card, Claude Code asks whether to turn Claude-drafted feedback off. It stops asking once you've declined twice.

By default, you see at most three cards in a session; Anthropic can adjust that limit from the server without a release. After the limit, and whenever you set [`feedbackDrafts`](https://code.claude.com/docs/en/settings-reference#feedbackdrafts) to `quiet`, you see only a count of queued drafts in the prompt footer.

### Review and edit a draft

Run `/feedback` with no argument to open your queue. It lists every queued draft from all your sessions, including drafts whose cards you dismissed or never saw. Select a draft to open it for review, where you can:

* Edit the title, area, and details
* Set **Send transcript** to `yes` or `no`. When the transcript from the session where Claude queued the draft is still available, it starts at `yes`, which sends that conversation to Anthropic; `no` sends the report only
* Send the draft, discard it, or leave it in the queue for later

To write a report yourself instead, press `w` for the standard feedback dialog. `/feedback` with text after it, and `/bug`, open that dialog directly.

### Send a draft

When you send a draft, Claude Code submits it the same way as a `/feedback` report, with the same [retention](https://code.claude.com/docs/en/data-usage#feedback-using-the-/feedback-command), and deletes the draft from your machine. When you send from the card, it shows `✓ Sent`; when you send from the queue, it closes with a receipt ID.

The report carries:

* Your title, area, and details
* Environment info, such as your Claude Code version, operating system, and model
* The IDs of recent API requests
* The conversation transcript, when you left **Send transcript** at `yes` in the review screen. Sending from the card never includes the transcript

Claude Code keeps your working directory in the local draft so it can find the transcript, and doesn't send the directory.

In [organizations with zero data retention](https://code.claude.com/docs/en/zero-data-retention#features-disabled-under-zdr), Claude Code leaves the tool out, as it does for `/feedback`. If a session in such an organization still offers the tool, drafts stay on your machine, and sending fails with `Feedback collection is not available for organizations with custom data retention policies.`

### Discard or keep a draft

When you discard a draft, Claude Code deletes it from your machine. A draft you leave in the queue expires after 30 days, or after [`cleanupPeriodDays`](https://code.claude.com/docs/en/settings-reference#cleanupperioddays) when that's shorter. The queue holds 10 drafts across all your sessions, and when Claude queues an eleventh, Claude Code deletes the oldest. When you run `/exit` with drafts from the session still in the queue, Claude Code asks whether to review them or discard them before exiting.

### Turn Claude-drafted feedback off

Set **Claude-drafted feedback** to `off` in `/config`, which writes the [`feedbackDrafts`](https://code.claude.com/docs/en/settings-reference#feedbackdrafts) setting, or set [`CLAUDE_CODE_SEND_FEEDBACK=0`](https://code.claude.com/docs/en/env-vars) for one session. With either, Claude can't queue drafts. To keep drafting on without cards, set `feedbackDrafts` to `quiet` instead. Administrators can set `feedbackDrafts` in [managed settings](https://code.claude.com/docs/en/managed-settings), which takes precedence over your own setting.

### Sessions without Claude-drafted feedback

Claude Code includes the tool in interactive terminal sessions on your own machine that use the Claude API rather than a cloud provider. It leaves the tool out of:

* Non-interactive `-p` runs and [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) sessions, which have no screen to review the queue on
* Cloud sessions such as [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web), which can't write to the queue on your machine
* Sessions on [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock), [Claude Platform on AWS](https://code.claude.com/docs/en/claude-platform-on-aws), [Google Cloud's Agent Platform](https://code.claude.com/docs/en/google-vertex-ai), or [Microsoft Foundry](https://code.claude.com/docs/en/microsoft-foundry)
* Sessions where you set [`CLAUDE_CODE_SEND_FEEDBACK=0`](https://code.claude.com/docs/en/env-vars) or [`DISABLE_FEEDBACK_COMMAND=1`](https://code.claude.com/docs/en/env-vars), set `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` to any non-empty value, or turned off [feature-flag fetching](https://code.claude.com/docs/en/env-vars#features-that-need-feature-flag-fetching)
* Organizations that have turned off product feedback, and [organizations with zero data retention](https://code.claude.com/docs/en/zero-data-retention#features-disabled-under-zdr)
