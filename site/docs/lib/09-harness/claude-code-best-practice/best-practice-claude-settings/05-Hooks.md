---
title: "Claude Code Best Practice"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/claude-settings.md"
sourceRel: "best-practice/claude-settings.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/best-practice/claude-settings.md"
sourceSha256: "75075e7b44bd6afd58459b40b4d627c415bb3b04514783ad87ee15a97b2e8077"
pageSha256: "507ab6a43f7813704fef95ecfe9811710a5568aef5acde3c26cae07df5da3282"
contentMode: "local-full"
zh: ""
---

## Hooks

Hook configuration (events, properties, matchers, exit codes, environment variables, and HTTP hooks) is maintained in a dedicated repository:

> **[claude-code-hooks](https://github.com/shanraisshan/claude-code-hooks)** — Complete hook reference with sound notification system, all 28 hook events (including `PreModelSwitch` and `PostModelSwitch` added in v2.1.252), HTTP hooks, matcher patterns, exit codes, and environment variables.

Hook-related settings keys (`hooks`, `disableAllHooks` (also disables any custom status line), `allowManagedHooksOnly`, `allowedHttpHookUrls`, `httpHookAllowedEnvVars`) are documented there.

For the official hooks reference, see the [Claude Code Hooks Documentation](https://code.claude.com/docs/en/hooks).
