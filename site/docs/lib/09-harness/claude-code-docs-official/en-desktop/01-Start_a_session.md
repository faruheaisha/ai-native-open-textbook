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
sourceRel: "en/desktop.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/desktop.md"
sourceSha256: "3c585962a30144144f6f07cddbab26d1e8ab8f6272e881441abe0a1401514a09"
pageSha256: "d0fa6cc38de091c800ee5b238489cabefd352964491c49b70314cc7f9a595da5"
contentMode: "local-full"
zh: ""
---

## Start a session

Before you send your first message, configure four things in the prompt area:

* **Environment**: choose where Claude runs. Select **Local** for your machine, **Cloud** for a [cloud session](#cloud-sessions) that continues after you close the app, an [**SSH connection**](#ssh-sessions) for a remote machine you manage, or on Windows a [**WSL distribution**](https://code.claude.com/docs/en/desktop-wsl). See [environment configuration](#environment-configuration).
* **Project folder**: select the folder or repository Claude works in. For cloud sessions, you can add [multiple repositories](#run-long-running-tasks-remotely).
* **Model**: pick a [model](https://code.claude.com/docs/en/model-config#available-models) from the dropdown next to the send button. You can change this during the session.
* **Permission mode**: choose how much autonomy Claude has from the [mode selector](#choose-a-permission-mode). You can change this during the session.

Type your task and press **Enter** to start. Each session tracks its own context and changes independently.
