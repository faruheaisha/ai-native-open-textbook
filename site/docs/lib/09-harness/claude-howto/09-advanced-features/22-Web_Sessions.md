---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/README.md"
sourceRel: "09-advanced-features/README.md"
rawUrl: "/raw/09-harness/claude-howto/09-advanced-features/README.md"
sourceSha256: "988281137b2d4521b357f46ae4fdd619ac2b8be6a7500cb14375141641efbc65"
pageSha256: "90e7c6bea3f31d1efddbb027c25981a8eb82dd1613411976510d25f6d1856057"
contentMode: "local-full"
zh: ""
---

## Web Sessions

Web Sessions allow you to run Claude Code directly in the browser at claude.ai/code, or create web sessions from the CLI.

### Creating a Web Session

```bash
# Create a new web session from the CLI
claude --remote "implement the new API endpoints"
```

This starts a Claude Code session on claude.ai that you can access from any browser.

### Resuming Web Sessions Locally

If you started a session on the web and want to continue it locally:

```bash
# Resume a web session in the local terminal — opens a picker of your web sessions
claude --teleport
```

Or from within an interactive REPL:

```text
/teleport
```

`/tp` is an alias for `/teleport`. Both require a claude.ai subscription. Cloud sessions
show a `/teleport` hint explaining how to continue locally (v2.1.223).

> **Changelog-sourced**: the v2.1.223 changelog shows an argument form,
> `claude --teleport <session id>`, that jumps straight to a known session. The CLI
> reference documents only the bare picker form, so prefer `claude --teleport` unless
> you already have a session ID in hand.

### Use Cases

- Start work on one machine and continue on another
- Share a session URL with team members
- Use the web UI for visual diff review, then switch to terminal for execution
