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
sourceRel: "en/sandboxing.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/sandboxing.md"
sourceSha256: "9173fa7bfc40900080b167be86897899912ce55ff61ad1072f71a5eab69e80ce"
pageSha256: "b16facb4130311f4275d90cd3088210f00d739757774bac45226eaac02ee1c90"
contentMode: "local-full"
zh: ""
---

## Limitations

Sandboxing reduces risk but is not a complete isolation boundary. Review the limitations below before relying on it as a hard security control.

### Security limitations

* **Network filtering**: the sandbox restricts which domains processes can connect to. By default the built-in proxy does not terminate or inspect TLS on outbound traffic, so the contents of encrypted connections are not examined. The experimental [`network.tlsTerminate`](https://code.claude.com/docs/en/settings-reference#sandbox-network-tlsterminate) setting terminates TLS at the proxy for [`mask` credential substitution](#mask-credentials) but does not add content filtering. You are responsible for ensuring that only trusted domains are allowed in your policy.

  Allowing broad domains such as `github.com` can create paths for data exfiltration. Because the proxy makes its allow decision from the client-supplied hostname without inspecting TLS, code running inside the sandbox can potentially use [domain fronting](https://en.wikipedia.org/wiki/Domain_fronting) or similar techniques to reach hosts outside the allowlist. If your threat model requires stronger guarantees, configure a [custom proxy](#custom-proxy-configuration) that terminates TLS and inspects traffic, and install its CA certificate inside the sandbox. Stronger TLS-aware network isolation is an active area of development.

* **Privilege escalation via Unix sockets**: the `allowUnixSockets` configuration can inadvertently grant access to system services that could lead to sandbox bypasses. For example, allowing access to `/var/run/docker.sock` effectively grants access to the host system through the Docker socket. Consider carefully any Unix sockets that you allow through the sandbox.
* **Filesystem permission escalation**: overly broad filesystem write permissions can enable privilege escalation attacks. Allowing writes to directories containing executables in `$PATH`, system configuration directories, or user shell configuration files such as `.bashrc` or `.zshrc` can lead to code execution in different security contexts when other users or system processes access these files.
* **Linux sandbox strength**: the Linux implementation provides strong filesystem and network isolation but includes an `enableWeakerNestedSandbox` mode that enables it to work inside Docker environments without privileged namespaces, or on Linux hosts where unprivileged user namespaces are disabled by sysctl. This option considerably weakens security and should only be used when additional isolation is otherwise enforced.
* **Apple Events on macOS**: the macOS sandbox blocks Apple Events by default. The `allowAppleEvents` setting lifts this restriction so tools such as `open` and `osascript` work, but it removes code-execution isolation: sandboxed commands can launch other applications unsandboxed with no user prompt, and can send AppleScript commands to running applications, subject to the per-app macOS automation-consent prompt (TCC). It is only honored from user, managed, or CLI settings. Project settings cannot enable it.

### Platform and tool compatibility

* **Platform support**: supports macOS, Linux, and WSL2. WSL1 and native Windows are not supported.
* **Performance overhead**: minimal, but some filesystem operations may be slightly slower.
* **Tool compatibility**: some tools that require specific system access patterns may need configuration adjustments, or may need to be run outside the sandbox.

### Scope

The sandbox isolates Bash subprocesses. Other tools operate under different boundaries:

* **Built-in file tools**: Read, Edit, and Write use the permission system directly rather than running through the sandbox. See [permissions](https://code.claude.com/docs/en/permissions).
* **Computer use**: when Claude opens apps and controls your screen, it runs on your actual desktop rather than in an isolated environment. Per-app permission prompts gate each application. See [computer use in the CLI](https://code.claude.com/docs/en/computer-use) or [computer use in Desktop](https://code.claude.com/docs/en/desktop#let-claude-use-your-computer).
* **Environment variables**: sandboxed Bash commands inherit the parent process environment by default, including any credentials set there. Use [`sandbox.credentials`](#protect-credentials) to unset or mask specific variables for sandboxed commands, or set [`CLAUDE_CODE_SUBPROCESS_ENV_SCRUB`](https://code.claude.com/docs/en/env-vars) to strip credentials from all subprocesses.
* **Subagents**: [subagents](https://code.claude.com/docs/en/sub-agents) run in the same process as the parent session and use the same sandbox configuration. Bash commands inside a subagent are sandboxed when sandboxing is enabled in the parent session.

  Effective sandboxing requires both filesystem and network isolation. Without network isolation, a compromised agent could exfiltrate sensitive files like SSH keys. Without filesystem isolation, whether from a permissive policy or from [disabling the filesystem layer](#disable-filesystem-isolation), a compromised agent could backdoor system resources to gain network access. When you widen the defaults, check that an `allowWrite` path, a broad `allowedDomains` entry, or an `excludedCommands` exception does not undo a restriction on the other side.
