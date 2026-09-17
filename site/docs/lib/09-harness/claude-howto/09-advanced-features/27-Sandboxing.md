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
pageSha256: "03016a26e1276c31d46052cdad79f1288be2834a7d171e956523d963e23ec3f1"
contentMode: "local-full"
zh: ""
---

## Sandboxing

Sandboxing provides OS-level filesystem and network isolation for Bash commands executed by Claude Code. This is complementary to permission rules and provides an additional security layer.

### Enabling Sandboxing

**Slash command**:
```
/sandbox
```

**CLI flags**:
```bash
claude --sandbox       # Enable sandboxing
claude --no-sandbox    # Disable sandboxing
```

### Configuration Settings

| Setting | Description |
|---------|-------------|
| `sandbox.enabled` | Enable or disable sandboxing |
| `sandbox.failIfUnavailable` | Fail if sandboxing cannot be activated |
| `sandbox.filesystem.allowWrite` | Paths allowed for write access |
| `sandbox.filesystem.allowRead` | Paths allowed for read access |
| `sandbox.filesystem.denyRead` | Paths denied for read access |
| `sandbox.network.allowedDomains` | Domains Bash-launched processes are allowed to reach (supports `*.` wildcard) |
| `sandbox.network.deniedDomains` | Domains to block even when `allowedDomains` wildcard would otherwise permit them (v2.1.113+) |
| `sandbox.network.strictAllowlist` | (v2.1.219) Deny non-allowlisted hosts for sandboxed commands without prompting |
| `sandbox.enableWeakerNetworkIsolation` | Enable weaker network isolation on macOS |
| `sandbox.bwrapPath` | (v2.1.133+, Linux/WSL) Path to the `bubblewrap` binary. Default: `$PATH` lookup. |
| `sandbox.socatPath` | (v2.1.133+, Linux/WSL) Path to the `socat` binary. Default: `$PATH` lookup. |
| `sandbox.credentials` | (v2.1.187+) Block sandboxed commands from reading credential files and secret environment variables. |
| `sandbox.allowAppleEvents` | (v2.1.181+, macOS) Opt in to let sandboxed commands send Apple Events. |
| `sandbox.filesystem.disabled` | (v2.1.216+) Skip filesystem isolation entirely while keeping network isolation enforced — useful when file sandboxing breaks tooling but network egress control must stay active. Only honored from user settings, managed settings, or `--settings`; project settings can't set it. |

**Linux/WSL binary paths** (v2.1.133+) — point Claude Code at non-standard install locations:

```json
{
  "sandbox": {
    "bwrapPath": "/opt/bubblewrap/bin/bwrap",
    "socatPath": "/opt/socat/bin/socat"
  }
}
```

Example of `deniedDomains` overriding a broad wildcard (v2.1.113+):

```json
{
  "sandbox": {
    "network": {
      "allowedDomains": ["*.example.com"],
      "deniedDomains": ["evil.example.com"]
    }
  }
}
```

The wildcard lets everything on `example.com` through, but `deniedDomains` still blocks the specifically-named host.

> **Note** (v2.1.243): the sandboxed Bash tool's permission prompt **no longer lists the allowed network hosts**. Claude simply attempts the request, and you approve each new host as it comes up — so do not expect the prompt to show you the allowlist up front. The same release also stopped dropping network-violation details when the blocked command happens to exit `0`, so a silent-looking success now still reports what was blocked.

### Credential Masking (v2.1.221, v2.1.224)

> **Changelog-sourced**: these `sandbox.credentials` options come from the v2.1.221 and
> v2.1.224 changelog entries; the settings reference does not yet detail them.

Before v2.1.221, `sandbox.credentials` could only `deny` a credential file — a sandboxed
command that needed the credential simply failed. `mode: "mask"` keeps the command working
without exposing the secret: the sandboxed process reads a **sentinel** copy of the file,
and the sandbox proxy substitutes the real value on the way out to the network.

```json
{
  "sandbox": {
    "network": { "tlsTerminate": true },
    "credentials": {
      "files": [
        { "path": "~/.aws/credentials", "mode": "mask" }
      ]
    }
  }
}
```

| Capability | Since | What it does |
|---|---|---|
| `mode: "mask"` for credential **files** | v2.1.221 | Sandboxed commands read a sentinel; the proxy swaps in the real value on egress. **Linux and WSL only** — on macOS file masking falls back to `deny`. |
| `extract` / `onExtractNoMatch` | v2.1.224 | Mask one field inside a structured environment value instead of the whole variable, and decide what happens when the pattern doesn't match. |
| `decode: "jwt"` with `maskClaims` | v2.1.224 | Decode a JWT and mask only the named claims, leaving the rest readable. |
| `awsPairs` / `sigv4` | v2.1.224 | Re-sign AWS SigV4 requests at the proxy after substituting the real access key. |

**Two constraints that are easy to miss:**

- All masking requires `network.tlsTerminate` — the proxy has to see inside the request to
  substitute the value.
- These options are honored **only** from user settings, managed settings, or `--settings`.
  Project settings cannot turn masking on or change what gets masked.

### Example Configuration

```json
{
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "filesystem": {
      "allowWrite": ["/Users/me/project"],
      "allowRead": ["/Users/me/project", "/usr/local/lib"],
      "denyRead": ["/Users/me/.ssh", "/Users/me/.aws"]
    },
    "enableWeakerNetworkIsolation": true
  }
}
```

### How It Works

- Bash commands run in a sandboxed environment with restricted filesystem access
- Network access can be isolated to prevent unintended external connections
- Works alongside permission rules for defense in depth
- On macOS, use `sandbox.enableWeakerNetworkIsolation` for network restrictions (full network isolation is not available on macOS)

### Use Cases

- Running untrusted or generated code safely
- Preventing accidental modifications to files outside the project
- Restricting network access during automated tasks
