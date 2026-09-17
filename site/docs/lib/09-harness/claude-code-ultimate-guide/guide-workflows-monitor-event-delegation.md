---
title: "Monitor, Channels and Safe Delegation to Codex"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/monitor-event-delegation.md"
sourceRel: "guide/workflows/monitor-event-delegation.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/workflows/monitor-event-delegation.md"
sourceSha256: "19a40333c114ead4a2ac00f3b6b525dfdbcc6ce138bb23439b3131a9b2279ba5"
pageSha256: "19a40333c114ead4a2ac00f3b6b525dfdbcc6ce138bb23439b3131a9b2279ba5"
contentMode: "local-full"
zh: ""
---

# Monitor, Channels and Safe Delegation to Codex

External events are data, not instructions and never authorization. A GitHub webhook, log line, WebSocket frame, or Channel message can tell Claude Code that something happened. It cannot approve a tool call, widen a sandbox, or authorize a write to your repository.

**Official references**: [Monitor](https://code.claude.com/docs/en/tools-reference#monitor-tool), [WebSocket source](https://code.claude.com/docs/en/tools-reference#websocket-source), [plugin monitors](https://code.claude.com/docs/en/plugins-reference#monitors), [Channels](https://code.claude.com/docs/en/channels-reference), [Routines](https://code.claude.com/docs/en/routines), [Codex non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode), [GitHub webhook validation](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries), and [failed webhook deliveries](https://docs.github.com/en/webhooks/using-webhooks/handling-failed-webhook-deliveries).

## Choose the delivery mechanism

| Need | Use | Boundary to keep |
|---|---|---|
| Stream output from one local process | `Monitor` command source (v2.1.98+) | The command follows Bash permissions. |
| Receive a narrow real-time event from a local relay | `Monitor` WebSocket source (v2.1.195+) | The relay validates the original event before it reaches Claude. |
| Start a trusted persistent watcher with a plugin or skill | Plugin monitor (v2.1.105+) | It is unsandboxed and trusted like a hook. |
| Let an MCP integration send or exchange messages | Channels (v2.1.80+, research preview) | Sender allowlisting is required; delivery does not grant tool permissions. |
| Run scheduled, API, or GitHub-triggered cloud automation | [Routines](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index#routines-cloud-automation) | Each matching event starts a separate cloud session. |

Do not use a Monitor as a public webhook endpoint. Put a small verifier or event relay in front of it.

## Monitor sources

### Command source

The original `Monitor` source runs a background command and feeds each output line back to Claude. It supports `timeout_ms` and `persistent`; stop an active monitor with `TaskStop`. The command source and the WebSocket source are mutually exclusive.

Use it for a bounded local producer: tailing an application log, watching a test runner, or turning a trusted polling script into events. It is not a reason to auto-execute the content of a line.

### WebSocket source

The native WebSocket source takes `ws.url` and optional `ws.protocols`, instead of `command`. Text frames become events. Binary frames are represented by a placeholder; a frame over 1 MiB, or closing the socket, stops the monitor.

Claude Code accepts only ASCII `ws://` or `wss://` URLs without credentials or whitespace. It requests a dedicated approval and refuses private, link-local, and metadata-service destinations. These checks narrow the client-side attack surface; they do not authenticate the event producer.

For a GitHub event relay, forward a small typed record, not the webhook body:

```json
{
  "delivery_id": "uuid",
  "repository": "owner/repo",
  "event": "workflow_run",
  "sha": "full-commit-sha",
  "pr_number": 42,
  "url": "https://github.com/owner/repo/actions/runs/123"
}
```

Raw issue text, pull request bodies, review comments, and log output remain untrusted data. Do not interpolate them into a task prompt or shell command.

## Plugin monitors and Channels
