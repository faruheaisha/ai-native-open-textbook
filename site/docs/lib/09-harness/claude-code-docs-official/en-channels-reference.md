---
title: "Channels reference"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/channels-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/channels-reference.md"
sourceSha256: "fe5f5de5df3787bf5eef7ecb3f98d56e2a41760f9c3c75bde5cc11aae7d8bcaa"
pageSha256: "fe5f5de5df3787bf5eef7ecb3f98d56e2a41760f9c3c75bde5cc11aae7d8bcaa"
contentMode: "local-full"
zh: ""
---

# Channels reference

> Build an MCP server that pushes webhooks, alerts, and chat messages into a Claude Code session. Reference for the channel contract: capability declaration, notification events, reply tools, sender gating, and permission relay.

  Channels are in [research preview](https://code.claude.com/docs/en/channels#research-preview). Team and Enterprise organizations must [explicitly enable them](https://code.claude.com/docs/en/channels#enterprise-controls).

A channel is an MCP server that pushes events into a Claude Code session so Claude can react to things happening outside the terminal.

You can build a one-way or two-way channel. One-way channels forward alerts, webhooks, or monitoring events for Claude to act on. Two-way channels like chat bridges also [expose a reply tool](#expose-a-reply-tool) so Claude can send messages back. A channel with a trusted sender path can also opt in to [relay permission prompts](#relay-permission-prompts) so you can approve or deny tool use remotely.

This page covers:

* [Overview](#overview): how channels work
* [What you need](#what-you-need): requirements and general steps
* [Example: build a webhook receiver](#example-build-a-webhook-receiver): a minimal one-way walkthrough
* [Server options](#server-options): the constructor fields
* [Notification format](#notification-format): the event payload and delivery behavior
* [Expose a reply tool](#expose-a-reply-tool): let Claude send messages back
* [Gate inbound messages](#gate-inbound-messages): sender checks to prevent prompt injection
* [Relay permission prompts](#relay-permission-prompts): forward tool approval prompts to remote channels

To use an existing channel instead of building one, see [Channels](https://code.claude.com/docs/en/channels). Telegram, Discord, iMessage, and fakechat are included in the research preview.

## Overview

A channel is an [MCP](https://modelcontextprotocol.io) server that runs on the same machine as Claude Code. Claude Code spawns it as a subprocess and communicates over stdio. Your channel server is the bridge between external systems and the Claude Code session:

* **Chat platforms** (Telegram, Discord): your plugin runs locally and polls the platform's API for new messages. When someone DMs your bot, the plugin receives the message and forwards it to Claude. No URL to expose.
* **Webhooks** (CI, monitoring): your server listens on a local HTTP port. External systems POST to that port, and your server pushes the payload to Claude.

<img src="https://mintcdn.com/claude-code/9FG0ZKj9uKYiHmbi/images/channel-architecture.svg?fit=max&auto=format&n=9FG0ZKj9uKYiHmbi&q=85&s=9a037b7da80184ae49015c0256b21a1f" className="dark:hidden" alt="Architecture diagram showing external systems connecting to your local channel server, which communicates with Claude Code over stdio" width="600" height="220" data-path="images/channel-architecture.svg" />

<img src="https://mintcdn.com/claude-code/_xqph1dUOslCOwsj/images/channel-architecture-dark.svg?fit=max&auto=format&n=_xqph1dUOslCOwsj&q=85&s=ae1e494440806a6a5d74a1279e22e162" className="hidden dark:block" alt="Architecture diagram showing external systems connecting to your local channel server, which communicates with Claude Code over stdio" width="600" height="220" data-path="images/channel-architecture-dark.svg" />

## What you need

The only hard requirement is the [`@modelcontextprotocol/sdk`](https://www.npmjs.com/package/@modelcontextprotocol/sdk) package and a Node.js-compatible runtime. [Bun](https://bun.sh), [Node](https://nodejs.org), and [Deno](https://deno.com) all work. The pre-built plugins in the research preview use Bun, but your channel doesn't have to.

Your server needs to:

1. Declare the `claude/channel` capability so Claude Code registers a notification listener
2. Emit `notifications/claude/channel` events when something happens
3. Connect over [stdio transport](https://modelcontextprotocol.io/docs/concepts/transports#standard-io)

The [Server options](#server-options) and [Notification format](#notification-format) sections cover each of these in detail. See [Example: build a webhook receiver](#example-build-a-webhook-receiver) for a full walkthrough.

During the research preview, custom channels aren't on the [approved allowlist](https://code.claude.com/docs/en/channels#supported-channels). Use `--dangerously-load-development-channels` to test locally. See [Test during the research preview](#test-during-the-research-preview) for details.

## Example: build a webhook receiver

This walkthrough builds a single-file server that listens for HTTP requests and forwards them into your Claude Code session. By the end, anything that can send an HTTP POST, like a CI pipeline, a monitoring alert, or a `curl` command, can push events to Claude.

This example uses [Bun](https://bun.sh) as the runtime for its built-in HTTP server and TypeScript support. You can use [Node](https://nodejs.org) or [Deno](https://deno.com) instead; the only requirement is the [MCP SDK](https://www.npmjs.com/package/@modelcontextprotocol/sdk).

    The permission relay examples later on this page import `zod` directly, so it installs alongside the MCP SDK. Create a new directory and install both:

    ```bash theme=\{null\}
    mkdir webhook-channel && cd webhook-channel
    bun add @modelcontextprotocol/sdk zod
    ```

    Create a file called `webhook.ts`. This is your entire channel server: it connects to Claude Code over stdio, and it listens for HTTP POSTs on port 8788. When a request arrives, it pushes the body to Claude as a channel event.

    ```ts title="webhook.ts" theme=\{null\}
    #!/usr/bin/env bun
    import \{ Server \} from '@modelcontextprotocol/sdk/server/index.js'
    import \{ StdioServerTransport \} from '@modelcontextprotocol/sdk/server/stdio.js'

    // Create the MCP server and declare it as a channel
    const mcp = new Server(
      \{ name: 'webhook', version: '0.0.1' \},
      \{
        // this key is what makes it a channel — Claude Code registers a listener for it
        capabilities: \{ experimental: \{ 'claude/channel': \{\} \} \},
        // Claude Code delivers this to Claude as context when the server connects, so it knows how to handle these events
        instructions: 'Events from the webhook channel arrive as &lt;channel source="webhook" ...>. They are one-way: read them and act, no reply expected.',
      \},
    )

    // Connect to Claude Code over stdio (Claude Code spawns this process)
    await mcp.connect(new StdioServerTransport())

    // Start an HTTP server that forwards every POST to Claude
    Bun.serve(\{
      port: 8788,  // any open port works
      // localhost-only: nothing outside this machine can POST
      hostname: '127.0.0.1',
      async fetch(req) \{
        const body = await req.text()
        await mcp.notification(\{
          method: 'notifications/claude/channel',
          params: \{
            content: body,  // becomes the body of the &lt;channel> tag
            // each key becomes a tag attribute, e.g. &lt;channel path="/" method="POST">
            meta: \{ path: new URL(req.url).pathname, method: req.method \},
          \},
        \})
        return new Response('ok')
      \},
    \})
    ```

    The file does three things in order:

    * **Server configuration**: creates the MCP server with `claude/channel` in its capabilities, which is what tells Claude Code this is a channel. Claude Code delivers the [`instructions`](#server-options) string to Claude as context when the server connects: tell Claude what events to expect, whether to reply, and how to route replies if it should.
    * **Stdio connection**: connects to Claude Code over stdin/stdout. This is standard for any [MCP server](https://modelcontextprotocol.io/docs/concepts/transports#standard-io).
    * **HTTP listener**: starts a local web server on port 8788. Every POST body gets forwarded to Claude as a channel event via `mcp.notification()`. The `content` becomes the event body, and each `meta` entry becomes an attribute on the `<channel>` tag. The listener needs access to the `mcp` instance, so it runs in the same process. You could split it into separate modules for a larger project.

    Add the server to your MCP config so Claude Code knows how to start it. For a project-level `.mcp.json` in the same directory, use a relative path. For user-level config in `~/.claude.json`, use the full absolute path so the server can be found from any project:

    ```json title=".mcp.json" theme=\{null\}
    \{
      "mcpServers": \{
        "webhook": \{ "command": "bun", "args": ["./webhook.ts"] \}
      \}
    \}
    ```

    Claude Code reads your MCP config at startup and spawns each server as a subprocess.

    During the research preview, custom channels aren't on the allowlist, so start Claude Code with the development flag:

    ```bash theme=\{null\}
    claude --dangerously-load-development-channels server:webhook
    ```

    Claude Code first shows a full-screen warning dialog listing the development channels you're loading. Select **I am using this for local development** to continue, or **Exit** to quit.

    The first time you start a session in this project, Claude Code also asks for consent before using the new server from `.mcp.json`. The dialog reports "New MCP server found in this project: webhook". Select **Use this MCP server** to continue.

    After you accept, Claude Code spawns your `webhook.ts` as a subprocess, and the HTTP listener starts automatically on the port you configured, 8788 in this example. You don't need to run the server yourself.

    A dim notice below the startup banner confirms the channel is registered: `Channels (experimental) messages from server:webhook inject directly in this session · restart without --dangerously-load-development-channels to stop`.

    If you see "blocked by org policy," your organization admin needs to [enable channels](https://code.claude.com/docs/en/channels#enterprise-controls) first.

    In a separate terminal, simulate a webhook by sending an HTTP POST with a message to your server. This example sends a CI failure alert to port 8788 (or whichever port you configured):

    ```bash theme=\{null\}
    curl -X POST localhost:8788 -d "build failed on main: https://ci.example.com/run/1234"
    ```

    The payload arrives in Claude's context as a `<channel>` tag:

    ```text theme=\{null\}
    &lt;channel source="webhook" path="/" method="POST">build failed on main: https://ci.example.com/run/1234&lt;/channel>
    ```

    Your terminal renders the event as a one-line summary, `← webhook: build failed on main: https://ci.example.com/run/1234`, rather than the raw tag. You'll then see Claude start responding: reading files, running commands, or whatever the message calls for. This is a one-way channel, so Claude acts in your session but doesn't send anything back through the webhook. To add replies, see [Expose a reply tool](#expose-a-reply-tool).

    If the event doesn't arrive, the diagnosis depends on what `curl` returned:
