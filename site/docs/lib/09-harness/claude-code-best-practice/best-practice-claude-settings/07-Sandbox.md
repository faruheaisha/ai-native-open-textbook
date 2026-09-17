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
pageSha256: "52491f2a0e5e5c7307d4aacc8bdccb2faabe5d86f80f61405c402f270257bf51"
contentMode: "local-full"
zh: ""
---

## Sandbox

Configure bash command sandboxing for security.

### Sandbox Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `sandbox.enabled` | boolean | `false` | Enable bash sandboxing |
| `sandbox.failIfUnavailable` | boolean | `false` | Exit with error when sandbox is enabled but cannot start, instead of running unsandboxed. Useful for enterprise policies that require strict sandboxing (v2.1.83) |
| `sandbox.autoAllowBashIfSandboxed` | boolean | `true` | Auto-approve bash when sandboxed. As of v2.1.139, shell-expansion forms (`$VAR`, `$(cmd)`) are correctly recognized so commands containing variable substitution no longer fall back to a prompt when sandbox auto-approval is enabled |
| `sandbox.excludedCommands` | array | `[]` | Commands to run outside sandbox |
| `sandbox.allowUnsandboxedCommands` | boolean | `true` | Allow `dangerouslyDisableSandbox`. When set to `false`, the escape hatch is completely disabled and all commands must run sandboxed (or be in `excludedCommands`). Useful for enterprise policies that require strict sandboxing |
| `sandbox.filesystem.disabled` | boolean | `false` | Skip filesystem isolation while keeping network egress control active. When `true`, the sandbox does not restrict file access but network egress stays confined to `sandbox.network.allowedDomains`. **Only honored from user settings, managed settings, or `--settings`** — ignored in `.claude/settings.json` and `.claude/settings.local.json` (v2.1.216) |
| `sandbox.ignoreViolations` | object | `\{\}` | Map of command patterns to path arrays — suppress violation warnings *(in JSON schema, not on official settings page)* |
| `sandbox.enableWeakerNestedSandbox` | boolean | `false` | **(Linux and WSL2 only)** Enable weaker sandbox for unprivileged Docker environments (reduces security) |
| `sandbox.network.allowUnixSockets` | array | `[]` | **(macOS only)** Specific Unix socket paths accessible in sandbox. Ignored on Linux and WSL2, where the seccomp filter cannot inspect socket paths; use `allowAllUnixSockets` instead |
| `sandbox.network.allowAllUnixSockets` | boolean | `false` | Allow all Unix sockets (overrides `allowUnixSockets`). On Linux and WSL2 this is the only way to permit Unix sockets, since it skips the seccomp filter that otherwise blocks `socket(AF_UNIX, ...)` calls |
| `sandbox.network.allowLocalBinding` | boolean | `false` | Allow binding to localhost ports (macOS) |
| `sandbox.network.allowedDomains` | array | `[]` | Network domain allowlist for sandbox |
| `sandbox.network.strictAllowlist` | boolean | `false` | When `true`, deny all network access to hosts **not** in `allowedDomains` without prompting the user. By default, unlisted hosts prompt for permission; this setting makes the allowlist a hard block. The effective allowlist also includes any `WebFetch(domain:...)` allow rules. Only applies to outbound connections from sandboxed bash commands — Claude Code's own API and WebFetch calls are not affected. **Only honored from user settings, managed settings, or `--settings`** — ignored in `.claude/settings.json` and `.claude/settings.local.json` (v2.1.219) |
| `sandbox.network.deniedDomains` | array | `[]` | Network domain denylist for bash sandbox. Takes precedence over wildcards in `allowedDomains`. Supports glob patterns (e.g., `"*.example.com"`) (v2.1.113) |
| `sandbox.network.httpProxyPort` | number | - | HTTP proxy port 1-65535 (custom proxy) |
| `sandbox.network.socksProxyPort` | number | - | SOCKS5 proxy port 1-65535 (custom proxy) |
| `sandbox.network.allowManagedDomainsOnly` | boolean | `false` | Only allow domains in managed allowlist (managed settings) |
| `sandbox.network.allowMachLookup` | array | `[]` | (macOS only) Additional XPC/Mach service names the sandbox may look up. Supports a single trailing `*` for prefix matching. Needed for tools that communicate via XPC such as the iOS Simulator or Playwright. Example: `["com.apple.coresimulator.*"]` |
| `sandbox.filesystem.allowWrite` | array | `[]` | Additional paths where sandboxed commands can write. Arrays are merged across all settings scopes. Also merged with paths from `Edit(...)` allow permission rules. Prefix: `/` (absolute), `~/` (home), `./` or none (project-relative in project settings, `~/.claude`-relative in user settings). The older `//` prefix for absolute paths still works. **Note:** This differs from [Read/Edit permission rules](#tool-permission-syntax), which use `//` for absolute and `/` for project-relative |
| `sandbox.filesystem.denyWrite` | array | `[]` | Paths where sandboxed commands cannot write. Arrays are merged across all settings scopes. Also merged with paths from `Edit(...)` deny permission rules. Same path prefix conventions as `allowWrite` |
| `sandbox.filesystem.denyRead` | array | `[]` | Paths where sandboxed commands cannot read. Arrays are merged across all settings scopes. Also merged with paths from `Read(...)` deny permission rules. Same path prefix conventions as `allowWrite` |
| `sandbox.filesystem.allowRead` | array | `[]` | Paths to re-allow read access within `denyRead` regions. Overrides matching `denyRead` glob entries, but an exact-path `denyRead` rule still blocks exact matches — `allowRead` does not universally trump every `denyRead` pattern. Arrays are merged across all settings scopes. Same path prefix conventions as `allowWrite` |
| `sandbox.filesystem.allowManagedReadPathsOnly` | boolean | `false` | **(Managed only)** Only `allowRead` paths from managed settings are respected. `allowRead` entries from user, project, and local settings are ignored |
| `sandbox.enableWeakerNetworkIsolation` | boolean | `false` | (macOS only) Allow access to system TLS trust (`com.apple.trustd.agent`); reduces security |
| `sandbox.bwrapPath` | string | - | **(Managed only, Linux/WSL2)** Absolute path to the bubblewrap (`bwrap`) binary. Overrides automatic `PATH` detection. Only honored from managed settings, not user or project settings. Example: `/opt/admin/bwrap` (v2.1.133) |
| `sandbox.socatPath` | string | - | **(Managed only, Linux/WSL2)** Absolute path to the `socat` binary used for the sandbox network proxy. Overrides automatic `PATH` detection. Only honored from managed settings. Example: `/opt/admin/socat` (v2.1.133) |
| `sandbox.allowAppleEvents` | boolean | `false` | **(macOS only)** Opt-in for sandboxed commands to send Apple Events. Required for tools that use `open`, `osascript`, or browser authentication flows that depend on Apple Events IPC. **Warning:** Enabling this removes code-execution isolation — Apple Events can be used to execute code in other applications (v2.1.181) |
| `sandbox.credentials` | object | — | Fine-grained control over which credential files and environment variables are blocked from sandboxed subprocess environments. Object with two arrays: `files` (array of credential file entries — see sub-keys below) and `envVars` (array of `\{name: string, mode: string, injectHosts?: string[]\}` entries — `mode` is `"deny"` (default, strips the var) or `"mask"` (substitutes a placeholder, only honored from user settings/managed/`--settings`; `deny` takes precedence when same var appears with both modes) with `injectHosts` selectively exposing the value to listed hosts only). An individual invalid entry is stripped with a warning; the valid subset is enforced. (v2.1.187; per-entry object shape since v2.1.191; per-entry `mode` and `injectHosts` since v2.1.199) |
| `sandbox.credentials.files[].path` | string | — | Absolute or `~/`-prefixed path to the credential file to protect |
| `sandbox.credentials.files[].mode` | string | `"deny"` | `"deny"` blocks sandboxed reads of the file; `"mask"` intercepts reads and substitutes placeholder values so commands can still run but cannot exfiltrate the raw credential. **`mask` mode only honored from user settings, managed settings, or `--settings`** (v2.1.187 deny; v2.1.221 mask) |
| `sandbox.credentials.files[].extract` | string | — | Regex with a single capture group used to locate credential values within the file for masking. Required when `mode` is `"mask"` and the file is not a well-known format. Example: `"oauth_token:\\s*(\\S+)"` (v2.1.221) |
| `sandbox.credentials.files[].injectHosts` | array | — | Hostnames that receive the real credential value via the TLS-termination proxy even when `mode` is `"mask"`. Requires `sandbox.network.tlsTerminate` to be configured (v2.1.199) |
| `sandbox.credentials.files[].onExtractNoMatch` | string | `"warn"` | Behavior when the `extract` regex matches nothing: `"warn"` (log a warning, allow read), `"deny"` (block the read), or `"error"` (abort the sandboxed command) (v2.1.221) |
| `sandbox.credentials.files[].maskDuplicates` | boolean | `false` | When `true`, also mask occurrences of the extracted credential value that appear in other files and env vars read during the same sandboxed command (v2.1.221) |
| `sandbox.credentials.files[].decode` | string | - | Decode strategy for credential extraction. Set to `"jwt"` to enable JWT-aware masking — the file is decoded as a JWT and individual claims are masked. Use with `maskClaims` to specify which claims to protect (v2.1.224) |
| `sandbox.credentials.files[].maskClaims` | array | - | When `decode` is `"jwt"`, the list of JWT claim names whose values should be masked in sandboxed command output. Example: `["access_token", "id_token"]` (v2.1.224) |
| `sandbox.credentials.awsPairs` | object | - | AWS credential pair masking for sandboxed commands. Masks AWS access key IDs and their corresponding secret access keys as a correlated pair. Object with credential pair entries for AWS SigV4 re-signing in credential-masked environments. Requires `mask` mode on the related credential file (v2.1.224) |
| `sandbox.credentials.sigv4` | object | - | AWS SigV4 re-signing configuration for sandboxed HTTP requests. When configured, the TLS-termination proxy re-signs outbound requests with AWS credentials after credential masking — allowing sandboxed commands to make authenticated AWS API calls without directly accessing raw credentials. Requires `sandbox.network.tlsTerminate` (v2.1.224) |
| `sandbox.network.tlsTerminate` | object | — | TLS termination configuration for sandboxed bash commands. When set, Claude Code acts as a TLS man-in-the-middle for outbound HTTPS from the sandbox, enabling credential masking (`sandbox.credentials` `mask` mode). Set to `\{\}` to generate an ephemeral certificate authority for the session, or set `caCertPath` and `caKeyPath` to provide your own CA. **Only honored from user settings, managed settings, or `--settings`** — ignored in `.claude/settings.json` and `.claude/settings.local.json`. Experimental (v2.1.199) |
| `sandbox.credentials.allowPlaintextInject` | boolean | `false` | Allow `mask` credential substitution to also apply on **plain HTTP requests** (where the upstream identity is unverified and the credential travels in cleartext). When `false` (default), credential injection via `injectHosts` is restricted to TLS-terminated HTTPS connections only, preventing credentials from being sent over unencrypted channels. Use only in trusted local environments where cleartext exposure is acceptable (v2.1.199) |

**Example:**
```json
{
  "sandbox": {
    "enabled": true,
    "autoAllowBashIfSandboxed": true,
    "excludedCommands": ["git", "docker", "gh"],
    "allowUnsandboxedCommands": false,
    "network": {
      "allowUnixSockets": ["/var/run/docker.sock"],
      "allowLocalBinding": true
    }
  }
}
```
