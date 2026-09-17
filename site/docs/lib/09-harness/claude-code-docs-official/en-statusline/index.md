---
title: "Customize your status line"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/statusline.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/statusline.md"
sourceSha256: "25714ae87efd73e8e4306f76fde76471ba55cb1a50ce48d4126baa0731d1cbd1"
pageSha256: "d8b4a6ade2ca1a10974e437cb30199e6890fd6add9546edd7a7f7d7a7a7bc434"
contentMode: "local-full"
zh: ""
---

# Customize your status line

> Configure a custom status bar to monitor context window usage, costs, and git status in Claude Code

The status line is a customizable bar at the bottom of Claude Code that runs any shell script you configure. It receives JSON session data on stdin and displays whatever your script prints, giving you a persistent, at-a-glance view of context usage, costs, git status, or anything else you want to track.

Status lines are useful when you:

* Want to monitor context window usage as you work
* Need to track session costs
* Work across multiple sessions and need to distinguish them
* Want git branch and status always visible

The status line renders in its own row above the built-in footer badges and does not replace them. With a custom status line configured, Claude Code stops showing most of the footer's keyboard hints, including `esc to interrupt`, the `? for shortcuts` fallback, and the `hold space to speak` [voice dictation](https://code.claude.com/docs/en/voice-dictation) hint. To add clickable link badges to the footer when an ID appears in the conversation, without writing a script, configure [`footerLinksRegexes`](https://code.claude.com/docs/en/settings-reference#footerlinksregexes) instead.

Here's an example of a [multi-line status line](#display-multiple-lines) that displays git info on the first line and a color-coded context bar on the second.

  <img src="https://mintcdn.com/claude-code/nibzesLaJVh4ydOq/images/statusline-multiline.png?fit=max&auto=format&n=nibzesLaJVh4ydOq&q=85&s=60f11387658acc9ff75158ae85f2ac87" alt="A multi-line status line showing model name, directory, git branch on the first line, and a context usage progress bar with cost and duration on the second line" width="776" height="212" data-path="images/statusline-multiline.png" />

This page walks through [setting up a basic status line](#set-up-a-status-line), explains [how the data flows](#how-status-lines-work) from Claude Code to your script, lists [all the fields you can display](#available-data), and provides [ready-to-use examples](#examples) for common patterns like git status, cost tracking, and progress bars.

## 本篇目录

- [Set up a status line](https://code.claude.com/docs)
- [Build a status line step by step](https://code.claude.com/docs)
- [How status lines work](https://code.claude.com/docs)
- [Available data](https://code.claude.com/docs)
- [Examples](https://code.claude.com/docs)
- [Subagent status lines](https://code.claude.com/docs)
- [Tips](https://code.claude.com/docs)
- [Troubleshooting](https://code.claude.com/docs)
