---
title: "15 Hidden & Under-Utilized Features in Claude Code — From Boris Cherny"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-15-tips-30-mar-26.md"
sourceRel: "tips/claude-boris-15-tips-30-mar-26.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/tips/claude-boris-15-tips-30-mar-26.md"
sourceSha256: "89c6c8f760ddbb2c0734f431b8d4dc5368c1fbbb7679c95cee765692c19375a9"
pageSha256: "89c6c8f760ddbb2c0734f431b8d4dc5368c1fbbb7679c95cee765692c19375a9"
contentMode: "local-full"
zh: ""
---

# 15 Hidden & Under-Utilized Features in Claude Code — From Boris Cherny

A summary of tips shared by Boris Cherny ([@bcherny](https://x.com/bcherny)), creator of Claude Code, on March 30, 2026.

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Context

Boris shared a bunch of his favorite hidden and under-utilized features in Claude Code, focusing on the ones he uses the most.

<a href="https://x.com/bcherny/status/2038454336355999749"><img src="/mirror/ec/ecd362538525f8563758fac0b60f10c0e0211299.png" alt="Boris Cherny intro tweet" width="50%" /></a>

---

## 1/ Claude Code Has a Mobile App

Did you know Claude Code has a mobile app? Boris writes a lot of his code from the iOS app — it's a convenient way to make changes without opening a laptop.

- Download the Claude app for iOS/Android
- Navigate to the **Code** tab on the left
- You can review changes, approve PRs, and write code directly from your phone

<a href="https://x.com/bcherny/status/2038454337811386436"><img src="/mirror/a6/a69bad9c9d95fa50b613d48103a48776ba0ca222.png" alt="Claude Code mobile app" width="50%" /></a>

---

## 2/ Move Sessions Between Mobile/Web/Desktop and Terminal

Run `claude --teleport` or `/teleport` to continue a cloud session on your machine. Or run `/remote-control` to control a locally running session from your phone/web.

- **Teleport**: pulls a cloud session down to your local terminal
- **Remote Control**: lets you control a local session from any device
- Boris has **"Enable Remote Control for all sessions"** set in his `/config`

<a href="https://x.com/bcherny/status/2038454339933548804"><img src="/mirror/2a/2aee65e79ec77b554b55316fcc24cf7b636653d8.png" alt="Teleport and Remote Control" width="50%" /></a>

---

## 3/ /loop and /schedule — Two of the Most Powerful Features

Use these to schedule Claude to run automatically at a set interval, for up to a week at a time. Boris has a bunch of loops running locally:

- `/loop 5m /babysit` — auto-address code review, auto-rebase, and shepherd PRs to production
- `/loop 30m /slack-feedback` — automatically put up PRs for Slack feedback every 30 mins
- `/loop /post-merge-sweeper` — put up PRs to address code review comments he missed
- `/loop 1h /pr-pruner` — close out stale and no longer necessary PRs
- ...and lots more!

Experiment with turning workflows into skills + loops. It's powerful.

<a href="https://x.com/bcherny/status/2038454341884154269"><img src="/mirror/92/922c98e7f105e53fc6123c5946b728628b7c82c0.png" alt="/loop and /schedule" width="50%" /></a>

---

## 4/ Use Hooks to Deterministically Run Logic

Use hooks to run logic as part of the agent lifecycle. For example:

- **Dynamically load** in context each time you start Claude (`SessionStart`)
- **Log every bash command** the model runs (`PreToolUse`)
- **Route permission prompts** to WhatsApp for you to approve/deny (`PermissionRequest`)
- **Poke Claude** to keep going whenever it stops (`Stop`)

<a href="https://x.com/bcherny/status/2038454343519932844"><img src="/mirror/38/387844c5e3167c6af76c08c9a285e18078564ab5.png" alt="Use hooks" width="50%" /></a>

---

## 5/ Cowork Dispatch

Boris uses Dispatch every day to catch up on Slack and emails, manage files, and do things on his laptop when he's not at a computer. When he's not coding, he's dispatching.

- Dispatch is a **secure remote control** for the Claude Desktop app
- It can use your MCPs, browser, and computer, with your permission
- Think of it as a way to delegate non-coding tasks to Claude from anywhere

<a href="https://x.com/bcherny/status/2038454345419936040"><img src="/mirror/dc/dcc8277f99d72a62c073a596c5b692261150b486.png" alt="Cowork Dispatch" width="50%" /></a>

---

## 6/ Use the Chrome Extension for Frontend Work

The most important tip for using Claude Code: **give Claude a way to verify its output.** Once you do that, Claude will iterate until the result is great.

- Think of it like asking someone to build a website but they aren't allowed to use a browser — the result probably won't look good
- Give Claude a browser and it will write code and iterate until it looks good
- Boris uses the Chrome extension every time he works on web code — it tends to work more reliably than other similar MCPs

<a href="https://x.com/bcherny/status/2038454347156398333"><img src="/mirror/5b/5b7b7b162b25d78815612744e880794785b975d8.png" alt="Chrome extension for frontend" width="50%" /></a>

---

## 7/ Use the Claude Desktop App to Auto-Start and Test Web Servers

Along the same vein, the Desktop app bundles in the ability for Claude to **automatically run your web server and even test it in a built-in browser.**

- You can set up something similar in CLI or VSCode using the Chrome extension
- Or just use the Desktop app for the integrated experience

<a href="https://x.com/bcherny/status/2038454348804714642"><img src="/mirror/79/7997a4d9117de187e88f11c7945c3adafc862c6d.png" alt="Desktop app web server testing" width="50%" /></a>

---

## 8/ Fork Your Session

People often ask how to fork an existing session. Two ways:

1. Run `/branch` from your session
