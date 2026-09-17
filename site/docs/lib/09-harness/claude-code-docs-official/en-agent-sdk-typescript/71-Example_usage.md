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
sourceRel: "en/agent-sdk/typescript.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-sdk/typescript.md"
sourceSha256: "305f751e4d47db29303c15a79aa95777deff6625785b12533072bc0548010547"
pageSha256: "9a4956ed1e934dc3728e81e5ccb151a8a2547dcc256d733a56b8a9c0a79bbaa4"
contentMode: "local-full"
zh: ""
---

#### Example usage

```typescript theme={null}
import { query } from "@anthropic-ai/claude-agent-sdk";

try {
  for await (const message of query({
    prompt: "Build and test my project",
    options: {
      sandbox: {
        enabled: true,
        autoAllowBashIfSandboxed: true,
        network: {
          allowLocalBinding: true
        }
      }
    }
  })) {
    if ("result" in message) console.log(message.result);
  }
} catch (error) {
  // A single-shot query() throws after yielding an error result,
  // such as when the sandbox can't start (failIfUnavailable defaults to true).
  console.log(`Session ended with an error: ${error}`);
}
```

  **Unix socket security:** The `allowUnixSockets` option can grant access to system services that reach outside the sandbox. For example, allowing `/var/run/docker.sock` effectively grants full host system access through the Docker API, bypassing sandbox isolation. Only allow Unix sockets that are strictly necessary and understand the security implications of each.

### `SandboxNetworkConfig`

Network-specific configuration for sandbox mode. These settings apply to sandboxed Bash commands when `enabled` is `true` in the parent [`SandboxSettings`](#sandboxsettings). They do not restrict the WebFetch tool, which uses [permission rules](https://code.claude.com/docs/en/permissions#webfetch) instead.

```typescript theme={null}
type SandboxNetworkConfig = {
  allowedDomains?: string[];
  deniedDomains?: string[];
  strictAllowlist?: boolean;
  allowManagedDomainsOnly?: boolean;
  allowLocalBinding?: boolean;
  allowUnixSockets?: string[];
  allowAllUnixSockets?: boolean;
  httpProxyPort?: number;
  socksProxyPort?: number;
};
```

| Property                  | Type       | Default     | Description                                                                                                                                                                                                                                                                                                                                                     |
| :------------------------ | :--------- | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowedDomains`          | `string[]` | `[]`        | Domain names that sandboxed processes can access                                                                                                                                                                                                                                                                                                                |
| `deniedDomains`           | `string[]` | `[]`        | Domain names that sandboxed processes cannot access. Takes precedence over `allowedDomains`                                                                                                                                                                                                                                                                     |
| `strictAllowlist`         | `boolean`  | `false`     | Deny sandboxed commands access to hosts outside the [network allowlist](https://code.claude.com/docs/en/sandboxing#network-isolation) instead of prompting. Enforced for sandboxed commands only; in-process tools such as WebFetch aren't gated by it. Only honored from user, managed, or CLI `--settings` settings; project settings are ignored. Requires Claude Code v2.1.219 or later |
| `allowManagedDomainsOnly` | `boolean`  | `false`     | Managed-settings only. When set in [managed settings](https://code.claude.com/docs/en/managed-settings), only `allowedDomains` entries and `WebFetch(domain:...)` allow rules from managed settings are honored, and allow entries from user, project, or local settings are ignored. Has no effect when set via SDK options                                                                |
| `allowLocalBinding`       | `boolean`  | `false`     | Allow processes to bind to local ports (e.g., for dev servers)                                                                                                                                                                                                                                                                                                  |
| `allowUnixSockets`        | `string[]` | `[]`        | Unix socket paths that processes can access (e.g., Docker socket)                                                                                                                                                                                                                                                                                               |
| `allowAllUnixSockets`     | `boolean`  | `false`     | Allow access to all Unix sockets                                                                                                                                                                                                                                                                                                                                |
| `httpProxyPort`           | `number`   | `undefined` | HTTP proxy port for network requests                                                                                                                                                                                                                                                                                                                            |
| `socksProxyPort`          | `number`   | `undefined` | SOCKS proxy port for network requests                                                                                                                                                                                                                                                                                                                           |

  The built-in sandbox proxy enforces `allowedDomains` based on the requested hostname and does not terminate or inspect TLS traffic, so techniques such as [domain fronting](https://en.wikipedia.org/wiki/Domain_fronting) can potentially bypass it. See [Sandboxing security limitations](https://code.claude.com/docs/en/sandboxing#security-limitations) for details and [Secure deployment](https://code.claude.com/docs/en/agent-sdk/secure-deployment#traffic-forwarding) for configuring a TLS-terminating proxy.

### `SandboxFilesystemConfig`

Filesystem-specific configuration for sandbox mode.

```typescript theme={null}
type SandboxFilesystemConfig = {
  allowWrite?: string[];
  denyWrite?: string[];
  denyRead?: string[];
};
```

| Property     | Type       | Default | Description                                 |
| :----------- | :--------- | :------ | :------------------------------------------ |
| `allowWrite` | `string[]` | `[]`    | File path patterns to allow write access to |
| `denyWrite`  | `string[]` | `[]`    | File path patterns to deny write access to  |
| `denyRead`   | `string[]` | `[]`    | File path patterns to deny read access to   |

### Permissions Fallback for Unsandboxed Commands

When `allowUnsandboxedCommands` is enabled, the model can request to run commands outside the sandbox by setting `dangerouslyDisableSandbox: true` in the tool input. These requests fall back to the existing permissions system, meaning your `canUseTool` handler is invoked, allowing you to implement custom authorization logic. Commands listed in `excludedCommands` instead bypass the sandbox automatically, with no model involvement; see [`SandboxSettings`](#sandboxsettings).

In the example below, `isCommandAuthorized` stands in for an authorization check you define.

```typescript theme={null}
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Deploy my application",
  options: {
    sandbox: {
      enabled: true,
      allowUnsandboxedCommands: true // Model can request unsandboxed execution
    },
    permissionMode: "default",
    canUseTool: async (tool, input) => {
      // Check if the model is requesting to bypass the sandbox
      if (tool === "Bash" && input.dangerouslyDisableSandbox) {
        // The model is requesting to run this command outside the sandbox
        console.log(`Unsandboxed command requested: ${input.command}`);

        if (isCommandAuthorized(input.command)) {
          return { behavior: "allow" as const, updatedInput: input };
        }
        return {
          behavior: "deny" as const,
          message: "Command not authorized for unsandboxed execution"
        };
      }
      return { behavior: "allow" as const, updatedInput: input };
    }
  }
})) {
  if ("result" in message) console.log(message.result);
}
```

  Commands running with `dangerouslyDisableSandbox: true` have full system access. Ensure your `canUseTool` handler validates these requests carefully.

  If `permissionMode` is set to `bypassPermissions` and `allowUnsandboxedCommands` is enabled, the model can autonomously execute commands outside the sandbox without approval prompts, apart from the [actions no mode auto-approves](https://code.claude.com/docs/en/permission-modes#actions-no-mode-auto-approves). This combination effectively allows the model to escape sandbox isolation silently.

## See also

* [SDK overview](https://code.claude.com/docs/en/agent-sdk/overview) - General SDK concepts
* [Python SDK reference](https://code.claude.com/docs/en/agent-sdk/python) - Python SDK documentation
* [CLI reference](https://code.claude.com/docs/en/cli-reference) - Command-line interface
* [Common workflows](https://code.claude.com/docs/en/common-workflows) - Step-by-step guides
