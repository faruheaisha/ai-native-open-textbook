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
sourceRel: "en/agent-sdk/python.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-sdk/python.md"
sourceSha256: "f49fb09963fda69499dc97a835a8db4970f3cd3070dff7f68ae6b644bd544987"
pageSha256: "f06ef26a152e9f1399688c280c223f37769be754b1d5c381d08d4fc3cf6c22b5"
contentMode: "local-full"
zh: ""
---

## Sandbox Configuration

### `SandboxSettings`

Configuration for sandbox behavior. Use this to enable command sandboxing and configure network restrictions programmatically.

```python theme={null}
class SandboxSettings(TypedDict, total=False):
    enabled: bool
    autoAllowBashIfSandboxed: bool
    excludedCommands: list[str]
    allowUnsandboxedCommands: bool
    network: SandboxNetworkConfig
    ignoreViolations: SandboxIgnoreViolations
    enableWeakerNestedSandbox: bool
```

| Property                    | Type                                                  | Default | Description                                                                                                                                                                                                                             |
| :-------------------------- | :---------------------------------------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`                   | `bool`                                                | `False` | Enable sandbox mode for command execution                                                                                                                                                                                               |
| `autoAllowBashIfSandboxed`  | `bool`                                                | `True`  | Auto-approve bash commands when sandbox is enabled                                                                                                                                                                                      |
| `excludedCommands`          | `list[str]`                                           | `[]`    | Commands that always bypass sandbox restrictions (e.g., `["docker"]`). These run unsandboxed automatically without model involvement                                                                                                    |
| `allowUnsandboxedCommands`  | `bool`                                                | `True`  | Allow the model to request running commands outside the sandbox. When `True`, the model can set `dangerouslyDisableSandbox` in tool input, which falls back to the [permissions system](#permissions-fallback-for-unsandboxed-commands) |
| `network`                   | [`SandboxNetworkConfig`](#sandboxnetworkconfig)       | `None`  | Network-specific sandbox configuration                                                                                                                                                                                                  |
| `ignoreViolations`          | [`SandboxIgnoreViolations`](#sandboxignoreviolations) | `None`  | Configure which sandbox violations to ignore                                                                                                                                                                                            |
| `enableWeakerNestedSandbox` | `bool`                                                | `False` | Enable a weaker nested sandbox for compatibility                                                                                                                                                                                        |

  The sandbox depends on platform support and, on Linux, tools like `bubblewrap` and `socat`. By default, when `enabled` is `True` but the sandbox can't start, commands run unsandboxed with a warning on stderr. This default differs from the TypeScript SDK, where `failIfUnavailable` defaults to `true`.

  Set `"failIfUnavailable": True` in your sandbox settings to stop instead. The key isn't declared on `SandboxSettings` yet, but the SDK forwards it to Claude Code, which honors it. `query()` then reports a `ResultMessage` with `subtype="error_during_execution"` and the reason in `errors`. Because this is a single-shot `query()` call, the SDK raises after yielding that error result, so wrap the loop in a try block to continue past it. See [Handle the result](https://code.claude.com/docs/en/agent-sdk/agent-loop#handle-the-result) for the error contract.

#### Example usage

```python theme={null}
import asyncio

from claude_agent_sdk import query, ClaudeAgentOptions

sandbox_settings = {
    "enabled": True,
    "autoAllowBashIfSandboxed": True,
    "failIfUnavailable": True,
    "network": {"allowLocalBinding": True},
}

async def main():
    try:
        async for message in query(
            prompt="Build and test my project",
            options=ClaudeAgentOptions(sandbox=sandbox_settings),
        ):
            print(message)
    except Exception as error:
        # A single-shot query() raises after yielding an error result,
        # such as when failIfUnavailable is set and the sandbox can't start.
        print(f"Session ended with an error: {error}")

asyncio.run(main())
```

  **Unix socket security**: The `allowUnixSockets` option can grant access to system services that reach outside the sandbox. For example, allowing `/var/run/docker.sock` effectively grants full host system access through the Docker API, bypassing sandbox isolation. Only allow Unix sockets that are strictly necessary and understand the security implications of each.

### `SandboxNetworkConfig`

Network-specific configuration for sandbox mode. These settings apply to sandboxed Bash commands when `enabled` is `True` in the parent [`SandboxSettings`](#sandboxsettings). They do not restrict the WebFetch tool, which uses [permission rules](https://code.claude.com/docs/en/permissions#webfetch) instead.

```python theme={null}
class SandboxNetworkConfig(TypedDict, total=False):
    allowedDomains: list[str]
    deniedDomains: list[str]
    allowManagedDomainsOnly: bool
    allowUnixSockets: list[str]
    allowAllUnixSockets: bool
    allowLocalBinding: bool
    allowMachLookup: list[str]
    httpProxyPort: int
    socksProxyPort: int
```

| Property                  | Type        | Default | Description                                                                                                                                                                                   |
| :------------------------ | :---------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowedDomains`          | `list[str]` | `[]`    | Domain names that sandboxed processes can access                                                                                                                                              |
| `deniedDomains`           | `list[str]` | `[]`    | Domain names that sandboxed processes cannot access. Takes precedence over `allowedDomains`                                                                                                   |
| `allowManagedDomainsOnly` | `bool`      | `False` | Managed-settings only: when set in managed settings, ignore `allowedDomains` and `WebFetch(domain:...)` allow rules from non-managed settings sources. Has no effect when set via SDK options |
| `allowUnixSockets`        | `list[str]` | `[]`    | Unix socket paths that processes can access (e.g., Docker socket)                                                                                                                             |
| `allowAllUnixSockets`     | `bool`      | `False` | Allow access to all Unix sockets                                                                                                                                                              |
| `allowLocalBinding`       | `bool`      | `False` | Allow processes to bind to local ports (e.g., for dev servers)                                                                                                                                |
| `allowMachLookup`         | `list[str]` | `[]`    | macOS only: XPC/Mach service names to allow. Supports a trailing wildcard                                                                                                                     |
| `httpProxyPort`           | `int`       | `None`  | HTTP proxy port for network requests                                                                                                                                                          |
| `socksProxyPort`          | `int`       | `None`  | SOCKS proxy port for network requests                                                                                                                                                         |

  The built-in sandbox proxy enforces the network allowlist based on the requested hostname and does not terminate or inspect TLS traffic, so techniques such as [domain fronting](https://en.wikipedia.org/wiki/Domain_fronting) can potentially bypass it. See [Sandboxing security limitations](https://code.claude.com/docs/en/sandboxing#security-limitations) for details and [Secure deployment](https://code.claude.com/docs/en/agent-sdk/secure-deployment#traffic-forwarding) for configuring a TLS-terminating proxy.

### `SandboxIgnoreViolations`

Configuration for ignoring specific sandbox violations.

```python theme={null}
class SandboxIgnoreViolations(TypedDict, total=False):
    file: list[str]
    network: list[str]
```

| Property  | Type        | Default | Description                                 |
| :-------- | :---------- | :------ | :------------------------------------------ |
| `file`    | `list[str]` | `[]`    | File path patterns to ignore violations for |
| `network` | `list[str]` | `[]`    | Network patterns to ignore violations for   |

### Permissions Fallback for Unsandboxed Commands

When `allowUnsandboxedCommands` is enabled, the model can request to run commands outside the sandbox by setting `dangerouslyDisableSandbox: True` in the tool input. These requests fall back to the existing permissions system, meaning your `can_use_tool` handler will be invoked, allowing you to implement custom authorization logic. Commands listed in `excludedCommands` instead bypass the sandbox automatically, with no model involvement; see [`SandboxSettings`](#sandboxsettings).

The following example logs each unsandboxed request and denies it unless your own authorization logic allows it:

```python theme={null}
import asyncio
from claude_agent_sdk import (
    query,
    ClaudeAgentOptions,
    HookMatcher,
    PermissionResultAllow,
    PermissionResultDeny,
    ToolPermissionContext,
)

def is_command_authorized(command: str | None) -> bool:
    # Replace with your own authorization logic
    return False

async def can_use_tool(
    tool: str, input: dict, context: ToolPermissionContext
) -> PermissionResultAllow | PermissionResultDeny:
    # Check if the model is requesting to bypass the sandbox
    if tool == "Bash" and input.get("dangerouslyDisableSandbox"):
        # The model is requesting to run this command outside the sandbox
        print(f"Unsandboxed command requested: {input.get('command')}")

        if is_command_authorized(input.get("command")):
            return PermissionResultAllow()
        return PermissionResultDeny(
            message="Command not authorized for unsandboxed execution"
        )
    return PermissionResultAllow()

# Required: dummy hook keeps the stream open for can_use_tool
async def dummy_hook(input_data, tool_use_id, context):
    return {"continue_": True}

async def prompt_stream():
    yield {
        "type": "user",
        "message": {"role": "user", "content": "Deploy my application"},
    }

async def main():
    async for message in query(
        prompt=prompt_stream(),
        options=ClaudeAgentOptions(
            sandbox={
                "enabled": True,
                "allowUnsandboxedCommands": True,  # Model can request unsandboxed execution
            },
            permission_mode="default",
            can_use_tool=can_use_tool,
            hooks={"PreToolUse": [HookMatcher(matcher=None, hooks=[dummy_hook])]},
        ),
    ):
        print(message)

asyncio.run(main())
```

  Commands running with `dangerouslyDisableSandbox: True` have full system access. Ensure your `can_use_tool` handler validates these requests carefully.

  If `permission_mode` is set to `bypassPermissions` and `allow_unsandboxed_commands` is enabled, the model can autonomously execute commands outside the sandbox without approval prompts, apart from the [actions no mode auto-approves](https://code.claude.com/docs/en/permission-modes#actions-no-mode-auto-approves). This combination effectively allows the model to escape sandbox isolation silently.
