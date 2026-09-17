---
title: "Connect Claude Code to an LLM gateway"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/llm-gateway-connect.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/llm-gateway-connect.md"
sourceSha256: "0cafc66560349ebf8837d5dcbe5175ca626418f41718389be93cec2d67e89225"
pageSha256: "0cafc66560349ebf8837d5dcbe5175ca626418f41718389be93cec2d67e89225"
contentMode: "local-full"
zh: ""
---

# Connect Claude Code to an LLM gateway

> Point Claude Code at your organization's LLM gateway. Check whether your admin already configured it, or set the base URL and credential yourself, then verify the connection and fix gateway errors.

An [LLM gateway](https://code.claude.com/docs/en/llm-gateway) is a proxy your organization runs between Claude Code and the model provider. When your organization uses one, Claude Code authenticates to the gateway with a credential your organization issues instead of your personal claude.ai login.

This page is for developers running Claude Code through a gateway their organization operates. It covers two paths: [checking whether your administrator already configured it for you](#check-for-an-existing-configuration), and [configuring it yourself](#configure-claude-code-yourself) when they haven't.

  * To deploy a gateway for your organization, see [Roll out an LLM gateway](https://code.claude.com/docs/en/llm-gateway-rollout)
  * For what Claude Code sends to a gateway, see the [gateway compatibility guide](https://code.claude.com/docs/en/llm-gateway-protocol)

## Check for an existing configuration

Administrators can distribute the gateway address and credential through [managed settings](https://code.claude.com/docs/en/managed-settings), device management, or an [`apiKeyHelper`](#rotate-credentials-with-apikeyhelper), so Claude Code picks them up at startup with nothing for you to set. To check whether your organization already did this:

    Run `claude`. If it opens to the login screen instead of a session, no gateway credential was distributed; [configure it yourself](#configure-claude-code-yourself) below.

    If Claude Code started a session without showing the login screen, run `/status`, which opens on the **Status** tab, and check two lines:

    * `Anthropic base URL`: this line only appears when a gateway address is set. If it isn't there, Claude Code isn't pointed at the gateway; [configure it yourself](#configure-claude-code-yourself) below.
    * `Auth token` or `API key`: a line naming `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_API_KEY`, or an `apiKeyHelper` confirms a gateway credential is active. A `Login method` line naming a claude.ai account instead means the credential wasn't distributed; [set it yourself](#set-the-credential-variable).

    Close the `/status` menu and send any prompt in Claude Code. A normal response from Claude, with no error, confirms the gateway connection works.

If both lines in the `/status` menu look right but the message to Claude fails, see the [troubleshooting table](#troubleshoot-gateway-errors).

## Configure Claude Code yourself

To configure Claude Code for the gateway yourself, you need from your gateway team:

* The gateway's base URL
* A credential: a key or token string, or a command that fetches one
  * If your gateway team didn't say which kind of credential it is, the [credential variable section](#set-the-credential-variable) below covers what to try

The sections below cover the configuration in order:

* [Set the credential variable](#set-the-credential-variable) and [set the base URL](#set-the-base-url-and-credential): the two variables every gateway connection needs
* [Verify the connection](#verify-the-connection): confirm it works before persisting anything
* [Configure each surface](#configure-each-surface): if you are using a surface besides the Claude Code CLI, such as VS Code, see how to configure it with your gateway credentials
* [Additional configuration](#additional-configuration): variables some gateways need beyond the base URL and credential, such as a custom header, a credential helper, model discovery, a provider-format base URL, or turning off traffic outside the gateway path. Set these only if your administrator named them or your network restricts egress

### Set the credential variable

To authenticate Claude Code to the gateway, set your credential in an environment variable. Which variable depends on what your gateway team told you:

| Set the credential in                                   | Use when                                                        |
| :------------------------------------------------------ | :-------------------------------------------------------------- |
| `ANTHROPIC_AUTH_TOKEN`                                  | Your gateway team said "bearer token" or "Authorization header" |
| `ANTHROPIC_API_KEY`                                     | Your gateway team said "API key" or "x-api-key"                 |
| [`apiKeyHelper`](#rotate-credentials-with-apikeyhelper) | The credential rotates or comes from a vault                    |

If you weren't told which kind, use `ANTHROPIC_AUTH_TOKEN`; the [verification request](#verify-the-connection) below shows how to tell if you need to switch.

### Set the base URL and credential

Set the gateway's base URL and the credential variable you picked above as environment variables. The examples use `ANTHROPIC_AUTH_TOKEN`; swap it for `ANTHROPIC_API_KEY` if that's [the variable you picked](#set-the-credential-variable). You can set them [in your shell](#set-as-shell-environment-variables), which lasts for one terminal session, or [in a Claude Code settings file](#set-in-a-settings-file), which persists everywhere Claude Code runs.

For your first connection, start with shell exports and run the [verification request](#verify-the-connection) before moving the values to a settings file.

#### Set as shell environment variables

Replace the values with the ones your gateway team gave you:

    ```bash theme=\{null\}
    export ANTHROPIC_BASE_URL=https://llm-gateway.example.com
    export ANTHROPIC_AUTH_TOKEN=sk-gateway-key
    ```

    ```powershell theme=\{null\}
    $env:ANTHROPIC_BASE_URL = "https://llm-gateway.example.com"
    $env:ANTHROPIC_AUTH_TOKEN = "sk-gateway-key"
    ```

Shell exports apply only to that terminal session and programs started from it. An editor launched from the dock or Start menu won't see them. To make the values persist across new terminals, add the same lines to your shell profile, such as `~/.zshrc`, `~/.bashrc`, or your PowerShell `$PROFILE`.

If you export the gateway only in your shell, it doesn't reliably reach background agents hosted by the [supervisor](https://code.claude.com/docs/en/agent-view#how-background-sessions-are-hosted); see [how each background session sources its gateway](https://code.claude.com/docs/en/agent-view#llm-gateway). Use a settings file for any gateway that background agents must always route through.

#### Set in a settings file

To make the configuration apply everywhere Claude Code runs, including [background agents](https://code.claude.com/docs/en/agent-view#how-background-sessions-are-hosted), set the variables in the `env` block of a [settings file](https://code.claude.com/docs/en/settings) instead of relying on your shell. Settings files have different scopes:

* `~/.claude/settings.json` applies to all your projects. On Windows the path is `%USERPROFILE%\.claude\settings.json`
* `.claude/settings.local.json` applies to one project. Claude Code adds it to your global gitignore when it saves a setting there; if you create it by hand or have Claude write it, add it to your gitignore yourself first so you don't accidentally commit your credential

  Don't put the credential in a project's `.claude/settings.json`. That file is committed and shared with everyone who clones the repository.

The `env` block looks the same in either file:

```json theme={null}
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://llm-gateway.example.com",
    "ANTHROPIC_AUTH_TOKEN": "sk-gateway-key"
  }
}
```

When both a shell export and a settings-file `env` block set the same variable, the settings-file value applies. Run `/status` to see which base URL and credential source Claude Code is using.

### Verify the connection

With the variables exported in your shell, send a one-token request to the gateway directly. This confirms the URL and credential work before you open Claude Code, so a failure points at the gateway rather than your configuration. The commands below read the shell variables, so they need the [shell exports](#set-as-shell-environment-variables) even if you also put the values in a settings file.

    ```bash theme=\{null\}
    curl -X POST "$ANTHROPIC_BASE_URL/v1/messages" \
      -H "Authorization: Bearer $ANTHROPIC_AUTH_TOKEN" \
      -H "anthropic-version: 2023-06-01" \
      -H "content-type: application/json" \
      -d '\{"model": "claude-sonnet-4-6", "max_tokens": 1, "messages": [\{"role": "user", "content": "."\}]\}'
    ```

    ```powershell theme=\{null\}
    Invoke-RestMethod -Method Post -Uri "$env:ANTHROPIC_BASE_URL/v1/messages" `
      -Headers @{ "Authorization" = "Bearer $env:ANTHROPIC_AUTH_TOKEN"; "anthropic-version" = "2023-06-01" \} `
      -ContentType "application/json" `
      -Body '\{"model": "claude-sonnet-4-6", "max_tokens": 1, "messages": [\{"role": "user", "content": "."\}]\}'
    ```

If your gateway expects keys in the `x-api-key` header, replace the `Authorization` header with `x-api-key: $ANTHROPIC_API_KEY` in the Bash command, or the `"Authorization"` hashtable entry with `"x-api-key" = "$env:ANTHROPIC_API_KEY"` in the PowerShell command.

A JSON response that starts with `\{"id":"msg_` and includes a `"content":[...]` field means the gateway is reachable and the credential works. An error naming an unknown model still proves the URL and credential work, since the gateway authenticated the request before rejecting the model name; you don't need to find a model your gateway serves for this test. A `401` means the credential was rejected: if you guessed the variable, switch to the other one and re-export.

#### Confirm in Claude Code

Start `claude` from the same shell so it inherits the exports, send a message, and run `/status`.

On the **Status** tab, the `Anthropic base URL` line should show your gateway address, which confirms requests are routing there; if the line isn't there, the variable didn't reach the session. An `Auth token` or `API key` line naming the variable you set confirms the gateway credential is active rather than a saved claude.ai login.

If the message fails, or `/status` doesn't show the gateway URL, see the [troubleshooting table](#troubleshoot-gateway-errors) below.

### How the credential variable maps to a header

Each variable sends the credential in a different HTTP header: `ANTHROPIC_AUTH_TOKEN` in `Authorization: Bearer`, `ANTHROPIC_API_KEY` in `x-api-key`, and `apiKeyHelper` in both. A credential in the wrong variable reaches the gateway in a header it doesn't read, and the request fails with `401`. If the verification request returned `401`, switch to the other variable and try again.

### Conflicts with an existing login

A gateway credential variable takes precedence over a saved claude.ai login or Console key. Your claude.ai login stays saved and unused while the variable is set; unset the variable and Claude Code goes back to it. With `ANTHROPIC_AUTH_TOKEN`, the variable takes precedence immediately. With `ANTHROPIC_API_KEY`, you are prompted once in interactive mode to approve the key before it takes over.

Run `/status` to confirm which credential source is active. If startup shows an auth-conflict warning naming two sources, see the first row of the [troubleshooting table](#troubleshoot-gateway-errors) for which one to drop. To clear a saved login so only the gateway credential remains, run `/logout`.

## Configure each surface

The CLI reads the environment variables and settings files above. The other surfaces are the VS Code extension, the desktop app, GitHub Actions, the Agent SDK, and the cloud surfaces such as Slack and the web; the sections below cover whether those settings reach each one.

### VS Code extension

Set the gateway variables for the [VS Code extension](https://code.claude.com/docs/en/vs-code) in `claudeCode.environmentVariables`, in VS Code's own user settings opened with the **Preferences: Open User Settings (JSON)** command. The extension checks credentials from this setting before launching, so it's the reliable place for the gateway credential; values in `~/.claude/settings.json` reach the spawned process but not the extension's own login check.

```json theme={null}
{
  "claudeCode.environmentVariables": [
    { "name": "ANTHROPIC_BASE_URL", "value": "https://llm-gateway.example.com" },
    { "name": "ANTHROPIC_AUTH_TOKEN", "value": "sk-gateway-key" }
  ]
}
```

### Desktop app

The desktop app reads gateway routing from its [third-party inference configuration](https://claude.com/docs/third-party/claude-desktop/gateway), not from `ANTHROPIC_BASE_URL` or `settings.json`. That configuration can come from your organization or from a form in the app itself:

* **Distributed by an administrator**: if your organization has [deployed the configuration](https://code.claude.com/docs/en/llm-gateway-rollout#distribute-through-managed-settings), the desktop app routes through the gateway with no setup on your part
* **Configured locally**: for devices without an administrator-distributed configuration, open Help → Troubleshooting → Enable Developer Mode, which restarts the app with a Developer menu. Then open Developer → Configure Third-Party Inference and enter your gateway base URL. An administrator-distributed configuration takes precedence and makes this form read-only

With the gateway configuration active, the desktop app runs sessions on your local machine only: the environment picker doesn't offer SSH sessions or Anthropic-hosted cloud environments, and [Remote Control](https://code.claude.com/docs/en/remote-control) is unavailable. To use Claude Code on a remote host through the gateway, run the CLI on that host with [`ANTHROPIC_BASE_URL` and the gateway credential](#set-the-base-url-and-credential) set there.

If the desktop app shows `Gateway was unreachable`, the app couldn't reach the configured base URL at startup; check the URL and network path with the [curl test above](#verify-the-connection).

### GitHub Actions

[Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions) reads `ANTHROPIC_BASE_URL` and `ANTHROPIC_CUSTOM_HEADERS` from the workflow's `env` block. Pass the credential as the action's `anthropic_api_key` input; the action sets it as `ANTHROPIC_API_KEY`, so it reaches the gateway in the `x-api-key` header.

For an `x-api-key` gateway, set the base URL in `env` and pass the gateway key as the input:

```yaml theme={null}
env:
  ANTHROPIC_BASE_URL: https://llm-gateway.example.com

steps:
  - uses: anthropics/claude-code-action@v1
    with:
      anthropic_api_key: ${{ secrets.GATEWAY_API_KEY }}
```

For a bearer-token gateway, pass the same secret twice: as the `anthropic_api_key` input and as `ANTHROPIC_AUTH_TOKEN` in the workflow `env` block. The action requires `anthropic_api_key`, `CLAUDE_CODE_OAUTH_TOKEN`, or workload identity federation before it launches Claude Code, and it doesn't read `ANTHROPIC_AUTH_TOKEN`, so the input is there only to satisfy that launch check. The env variable is what puts the key in the `Authorization` header the gateway reads; the copy in `x-api-key` is ignored:

```yaml theme={null}
env:
  ANTHROPIC_BASE_URL: https://llm-gateway.example.com
  ANTHROPIC_AUTH_TOKEN: ${{ secrets.GATEWAY_API_KEY }}

steps:
  - uses: anthropics/claude-code-action@v1
    with:
      anthropic_api_key: ${{ secrets.GATEWAY_API_KEY }}
```

For the action's other authentication options, including `CLAUDE_CODE_OAUTH_TOKEN` and workload identity federation, see [Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions) and the action's [README](https://github.com/anthropics/claude-code-action#readme).

### Agent SDK

The [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) has no gateway-specific options; it passes environment variables to the Claude Code process it spawns. Each SDK accepts an `env` option that sets the spawned process's environment, and the TypeScript and Python SDKs treat it differently:

* TypeScript: the spawned process inherits the parent environment by default, but setting `options.env` replaces the environment entirely. Spread `process.env` into it to keep your gateway variables.
* Python: `ClaudeAgentOptions(env=...)` merges on top of the inherited environment, so gateway variables set in the parent process carry through without spreading.

  ```ts TypeScript theme={null}
  const result = query({
    prompt: "...",
    options: {
      env: {
        ...process.env,
        ANTHROPIC_BASE_URL: "https://llm-gateway.example.com",
        ANTHROPIC_AUTH_TOKEN: process.env.GATEWAY_KEY,
      },
    },
  })
  ```

  ```python Python theme={null}
  options = ClaudeAgentOptions(
      env={
          "ANTHROPIC_BASE_URL": "https://llm-gateway.example.com",
          "ANTHROPIC_AUTH_TOKEN": os.environ["GATEWAY_KEY"],
      }
  )
  ```

### Slack, web, and Remote Control

[Claude Code in Slack](https://code.claude.com/docs/en/slack) and [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) are Anthropic-hosted products that always use Anthropic's API; they aren't part of a gateway deployment. Gateway variables set in a cloud session's environment configuration are not applied. If your traffic must stay on the gateway, don't enable these surfaces for those users.

[Remote Control](https://code.claude.com/docs/en/remote-control) and [voice dictation](https://code.claude.com/docs/en/voice-dictation) both rely on a claude.ai identity: Remote Control to pair a live session with your account, and voice dictation to reach the claude.ai transcription endpoint. They are unavailable while `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, or an `apiKeyHelper` is active. Remote Control is also disabled while `ANTHROPIC_BASE_URL` points at a non-Anthropic host, so signing in with claude.ai isn't enough on its own. Before v2.1.196, a non-Anthropic base URL didn't block Remote Control.

To restore either feature, log in with claude.ai and unset the gateway variables that feature checks. The Remote Control section of `claude doctor` names what is currently blocking Remote Control.

* Voice dictation: unset the gateway credential
* Remote Control: unset the gateway credential and `ANTHROPIC_BASE_URL`

## Additional configuration

These settings cover cases beyond the base URL and credential. Set them only if your administrator's instructions, your network's egress rules, or the [troubleshooting table](#troubleshoot-gateway-errors) call for one.

### Send additional headers

Some gateways route or tag requests using a custom header in addition to the credential, for example a tenant identifier or a routing key. To send one, set [`ANTHROPIC_CUSTOM_HEADERS`](https://code.claude.com/docs/en/env-vars) with one `Name: Value` pair per line. The example below adds a routing header named `X-Org-Route`:

    ```bash theme=\{null\}
    export ANTHROPIC_CUSTOM_HEADERS="X-Org-Route: prod"
    ```

    ```powershell theme=\{null\}
    $env:ANTHROPIC_CUSTOM_HEADERS = "X-Org-Route: prod"
    ```

You can also set `ANTHROPIC_CUSTOM_HEADERS` in the `env` block of a settings file. Use `\n` between pairs there, since JSON strings can't span multiple lines:

```json theme={null}
{
  "env": {
    "ANTHROPIC_CUSTOM_HEADERS": "X-Org-Route: prod\nX-Tenant: example"
  }
}
```

Routing and tenant header names like these count as [headers that need approval](https://code.claude.com/docs/en/server-managed-settings#environment-variables-and-the-approval-dialog). When the headers come from a project settings file, Claude Code applies them under the [rules for when it applies `env` values](https://code.claude.com/docs/en/settings-reference#when-claude-code-applies-env-values).

### Add gateway models to the model picker

With model discovery enabled, Claude Code queries the gateway for its model list at startup and adds those names to the `/model` picker alongside the built-in entries. If you or your administrator set `replaceBuiltInOptions` in a [`modelPicker`](https://code.claude.com/docs/en/settings-reference#modelpicker) lineup, Claude Code hides the discovered names too. It keeps a row for the model the session is already using.

Enable it if your gateway serves model names that aren't in Claude Code's built-in list and you want to select them from the picker. If the built-in models are what you use, you don't need discovery; your administrator may also have already enabled it through managed settings.

To enable it, set `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1` in your shell or in the `env` block of `~/.claude/settings.json`.

Discovered models appear as additional `/model` entries. Each entry shows the description your gateway supplies for the model, or `From gateway` when it doesn't supply one.
