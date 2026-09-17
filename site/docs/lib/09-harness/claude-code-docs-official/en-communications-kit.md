---
title: "Communications kit"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/communications-kit.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/communications-kit.md"
sourceSha256: "91defabfdba853124b55f2e8d5ffe60b96343c6f2726099c7efc5b12e715d42e"
pageSha256: "91defabfdba853124b55f2e8d5ffe60b96343c6f2726099c7efc5b12e715d42e"
contentMode: "local-full"
zh: ""
---

# Communications kit

> Launch announcements, drip-campaign messages, and FAQ responses for rolling Claude Code out to your engineering organization.

This page is for administrators and engineering leads rolling Claude Code out to a team. It provides copy-ready launch announcements, a tips-and-tricks drip campaign, and one-line FAQ responses for the questions you will be asked most.

  Treat everything here as draft copy, not finished copy. Rewrite each message in your organization's voice, swap the example tasks for real bugs and modules from your own codebase, and replace the `[bracketed placeholders]` before sending. The announcements that drive adoption are the ones that read like someone at your company wrote them.

## Launch communications

One announcement in two formats, plus two optional variants. Pick whichever fits your rollout and rewrite it from there.

### Before you send

Work through this checklist before the announcement goes out. Each item closes a gap that otherwise turns into a launch-day support thread.

| Item                                                                                             | Why it matters                                                                      |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `#claude-code` channel created and linked in the message                                         | Gives questions one place to land                                                   |
| Install command tested on at least one machine in your environment                               | Catches proxy or firewall issues before everyone hits them at once                  |
| Security and data-handling link ready ([Data usage](https://code.claude.com/docs/en/data-usage) or your internal equivalent) | "Where does my code go?" will be the first reply                                    |
| One concrete first task chosen, a real bug or file in your codebase                              | Generic examples don't convert; "fix the flaky test in `auth_test.go`" does         |
| A named owner for the channel for the first 48 hours                                             | Unanswered launch-day questions kill momentum                                       |
| A C-suite sponsor lined up to send or co-sign the announcement                                   | Exec-sent launches consistently see higher first-week adoption than admin-sent ones |

### The announcement

Use this as your standard org-wide rollout message. It covers what Claude Code is, gives a two-minute install path, hands readers one concrete task to try, and answers "where does my code go?" before anyone has to ask.

    ```text theme=\{null\}
    Subject: Claude Code is live for [Engineering / your team]

    Team,

    As of today you have access to Claude Code, an AI coding agent that runs in
    your terminal, reads your actual codebase, and works through real tasks end
    to end: debugging, refactors, tests, PRs. It is not autocomplete and it is
    not a chat window. It edits files, runs your commands, and asks permission
    before anything risky.

    Get running in two minutes:

        curl -fsSL https://claude.ai/install.sh | bash
