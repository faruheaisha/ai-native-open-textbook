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
pageSha256: "06d157685947e8814539f296fd6c4d68ed49c770264a98484a0ebcf1be1b5719"
contentMode: "local-full"
zh: ""
---

## Monitor tool

The Monitor tool lets Claude watch something in the background and react when it changes, without pausing the conversation. Ask Claude to:

* Tail a log file and flag errors as they appear
* Poll a PR or CI job and report when its status changes
* Watch a directory for file changes
* Track output from any long-running script you point it at
* Connect to a WebSocket feed and report each message as it arrives

For most watches, Claude writes a small script, runs it in the background, and receives each output line as it arrives. For a server that already pushes events, Claude can open a [WebSocket](#websocket-source) instead of running a script.

You keep working in the same session and Claude interjects when an event arrives.

Stop a monitor by asking Claude to cancel it or by ending the session. When you stop a [subagent](https://code.claude.com/docs/en/sub-agents) that started monitors, for example from `/tasks`, those monitors stop with it.

When Monitor runs a command, it uses the same [permission rules as Bash](https://code.claude.com/docs/en/permissions#tool-specific-permission-rules), so `allow` and `deny` patterns you have set for Bash apply here too. While [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) is active, Claude Code sets aside allow rules that name `Monitor` itself, along with the other [broad allow rules it drops](https://code.claude.com/docs/en/permission-modes#how-the-classifier-evaluates-actions), so the classifier reviews Monitor commands the same way it reviews Bash commands.

The [WebSocket source](#websocket-source) has its own approval prompt, which the classifier also decides in auto mode.

The tool is not available on Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry. It is also not available when `DISABLE_TELEMETRY` or `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` is set.

Plugins can declare monitors that start automatically when the plugin is active, instead of asking Claude to start them. See [plugin monitors](https://code.claude.com/docs/en/plugins-reference#monitors).

### WebSocket source

  The WebSocket source requires Claude Code v2.1.195 or later.

When a server already pushes events over a WebSocket, Claude can connect to it directly instead of writing a polling script. Each kind of socket activity either becomes an event or ends the watch:

* **Text messages**: each one becomes one event, even when the message spans multiple lines.
* **Binary messages**: not passed through. Claude receives a placeholder line such as `[binary frame, 512 bytes]` instead.
* **Messages larger than 1 MiB**: the watch ends, so subscribe to a filtered feed where one exists.
* **Socket close**: the watch ends and Claude receives the close code.

A WebSocket watch takes a `ws` input in place of `command`, and a single Monitor call can't combine the two. The `ws` input has two fields:

| Field       | Required | Description                                                                                                                                    |
| :---------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`       | Yes      | The endpoint to connect to. Must be a `ws://` or `wss://` URL with no embedded credentials or whitespace, using ASCII characters only          |
| `protocols` | No       | WebSocket subprotocol names to offer during the handshake. Each entry must be a valid subprotocol token, and the list can't contain duplicates |

The `timeout_ms` and `persistent` inputs behave the same as they do for a command: the watch ends at the deadline unless `persistent` is set, and `TaskStop` cancels it early.

Opening a WebSocket prompts for approval; in [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) the classifier decides instead. The prompt doesn't offer an option to skip future prompts for the same host.

Claude Code denies URLs that point at a private, link-local, or cloud-metadata address, including hostnames that resolve to one. It also denies hosts in `sandbox.network.deniedDomains`, and when [`allowManagedDomainsOnly`](https://code.claude.com/docs/en/settings-reference#sandbox-network-allowmanageddomainsonly) is set in managed settings, any host outside the managed allowlist.
