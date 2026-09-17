---
title: "Manage sessions"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/sessions.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/sessions.md"
sourceSha256: "ded87757c4421ed8ccafabba28b541781ee3d0e360f4b543acc3b04c02b8ec93"
pageSha256: "ded87757c4421ed8ccafabba28b541781ee3d0e360f4b543acc3b04c02b8ec93"
contentMode: "local-full"
zh: ""
---

# Manage sessions

> Name, resume, branch, and switch between Claude Code conversations. Covers `--continue`, `--resume`, `--from-pr`, the `/resume` picker, session naming, exporting transcripts, and where transcripts are stored.

A session is a saved conversation tied to a project directory. Claude Code stores it locally as you work, so you can resume where you left off, branch to try a different approach, or switch between tasks.

The [desktop app](https://code.claude.com/docs/en/desktop#work-in-parallel-with-sessions), [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web), and the [VS Code extension](https://code.claude.com/docs/en/vs-code#resume-past-conversations) each maintain their own session history. This page covers the CLI.

## Resume a session

Sessions are saved continuously to [local transcript files](#export-and-locate-session-data) as you work, so you can return to one after exiting or running `/clear`. Use these entry points:

| Command                             | What it does                                                                                                           |
| :---------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `claude --continue`                 | Reopens the most recent conversation in the current directory                                                          |
| `claude --resume`                   | Opens the [session picker](#use-the-session-picker)                                                                    |
| `claude --resume <name>`            | Resumes the named session directly                                                                                     |
