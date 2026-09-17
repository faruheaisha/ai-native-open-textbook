---
title: "Enterprise network configuration"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/network-config.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/network-config.md"
sourceSha256: "37954df0b7775772198b3ffc6690ff19b520ee8974633a22f1719b8db07aa3fd"
pageSha256: "37954df0b7775772198b3ffc6690ff19b520ee8974633a22f1719b8db07aa3fd"
contentMode: "local-full"
zh: ""
---

# Enterprise network configuration

> Configure Claude Code for enterprise environments with proxy servers, custom Certificate Authorities (CA), and mutual Transport Layer Security (mTLS) authentication.

Claude Code supports various enterprise network and security configurations through environment variables. This includes routing traffic through corporate proxy servers, trusting custom Certificate Authorities (CA), and authenticating with mutual Transport Layer Security (mTLS) certificates for enhanced security.

Set these environment variables before you launch Claude Code. Variables exported in your shell are read once at startup, so a running session doesn't pick up later changes to your shell environment.

  All environment variables shown on this page can also be configured in [`settings.json`](https://code.claude.com/docs/en/settings).

## Proxy configuration

### Environment variables

Claude Code respects standard proxy environment variables. In Claude Desktop sessions where the app manages the provider connection, Claude Code reads them only from managed settings and `~/.claude/settings.json`; see [mTLS authentication](#mtls-authentication) for the scope rules.

```bash theme={null}
# HTTPS proxy (recommended)
export HTTPS_PROXY=https://proxy.example.com:8080

# HTTP proxy (if HTTPS not available)
export HTTP_PROXY=http://proxy.example.com:8080

# Bypass proxy for specific requests - space-separated format
export NO_PROXY="localhost 192.168.1.1 example.com .example.com"
# Bypass proxy for specific requests - comma-separated format
export NO_PROXY="localhost,192.168.1.1,example.com,.example.com"
# Bypass proxy for all requests
export NO_PROXY="*"
```

Lowercase variants also work, and Claude Code uses the first one that's set in the order `https_proxy`, `HTTPS_PROXY`, `http_proxy`, `HTTP_PROXY`.

Claude Code never sends its WebSocket connections to `localhost`, `::1`, or `127.0.0.0/8` through the proxy, so you don't need a loopback entry in `NO_PROXY` for them.

  Claude Code does not support SOCKS proxies.

### Basic authentication

If your proxy requires basic authentication, include credentials in the proxy URL:

```bash theme={null}
export HTTPS_PROXY=http://username:password@proxy.example.com:8080
```

  Avoid hardcoding passwords in scripts. Use environment variables or secure credential storage instead.

  For proxies requiring advanced authentication (NTLM, Kerberos, etc.), consider using an LLM Gateway service that supports your authentication method.

## CA certificate store

By default, Claude Code trusts both its bundled Mozilla CA certificates and your operating system's certificate store. Reading the OS store requires a runtime with `tls.getCACertificates`: the native installer always has it, and npm installs need Node 22.15 or later. On older Node versions, only the bundled set and `NODE_EXTRA_CA_CERTS` apply. Enterprise TLS-inspection proxies work without additional configuration when their root certificate is installed in the OS trust store and the runtime can read it.

`CLAUDE_CODE_CERT_STORE` accepts a comma-separated list of sources. Recognized values are `bundled` for the Mozilla CA set shipped with Claude Code and `system` for the operating system trust store. The default is `bundled,system`.

To trust only the bundled Mozilla CA set:

```bash theme={null}
export CLAUDE_CODE_CERT_STORE=bundled
```

To trust only the OS certificate store:

```bash theme={null}
export CLAUDE_CODE_CERT_STORE=system
```

  `CLAUDE_CODE_CERT_STORE` has no dedicated `settings.json` schema key. Set it via the `env` block in `~/.claude/settings.json` or directly in the process environment.

## Custom CA certificates

If your enterprise environment uses a custom CA, configure Claude Code to trust it directly:

```bash theme={null}
export NODE_EXTRA_CA_CERTS=/path/to/ca-cert.pem
```

## mTLS authentication

For enterprise environments requiring client certificate authentication:

```bash theme={null}
# Client certificate for authentication
export CLAUDE_CODE_CLIENT_CERT=/path/to/client-cert.pem

# Client private key
export CLAUDE_CODE_CLIENT_KEY=/path/to/client-key.pem

# Optional: Passphrase for encrypted private key
export CLAUDE_CODE_CLIENT_KEY_PASSPHRASE="your-passphrase"
```

Claude Code reads the certificate and key files at startup and re-reads them each time it applies settings, such as when your organization changes the `env` block in [managed settings](https://code.claude.com/docs/en/server-managed-settings) mid-session.

To rotate the certificate and key, replace the files at the same paths. Claude Code picks up the replacement in a running session without a restart. When an API request fails with a connection-level error, such as a connection reset or a TLS handshake error, it re-reads both files and retries the request with the new pair. Before v2.1.232, Claude Code didn't re-read on connection errors, so it kept the pair it had already loaded until it next applied settings or you restarted.

Claude Code re-reads the files in response to failed requests, not by watching them for changes:

* **Timing**: Claude Code does nothing at the moment you replace the files. It presents the new pair on the retry after a qualifying failure, or on the next request after it applies settings, whichever comes first.
* **Gateway rejections**: Claude Code re-reads when your gateway resets the connection or rejects the TLS handshake after it stops accepting the old pair. It doesn't re-read when the gateway completes the handshake and answers with an HTTP error. In that case, Claude Code loads the new pair when it next applies settings or when you restart it.
* **Half-written rotations**: when Claude Code re-reads while your rotation is mid-write, such as reading a certificate and key that don't match each other, it keeps the previous pair and re-reads on the next failure.
* **OTLP telemetry exporters**: Claude Code keeps the certificate the [exporters](https://code.claude.com/docs/en/monitoring-usage#mtls-authentication) loaded at first use, so restart Claude Code for a rotated certificate to reach your telemetry collector.
* **Turn the reload off**: set [`CLAUDE_CODE_DISABLE_MTLS_RELOAD_ON_STALE_CONNECTION=1`](https://code.claude.com/docs/en/env-vars#variables) to turn off the connection-error re-read. Claude Code then picks up rotated files only when it next applies settings or at the next startup.

To confirm Claude Code picked up a rotation, [start the session with debug logging](#verify-your-configuration) and look for `Stale connection — reloaded rotated mTLS client material` in the log. Claude Code doesn't log this line when it picks up the rotation while applying settings instead, so a missing line alone doesn't mean the rotation failed.

Replace the files before the current pair expires so Claude Code doesn't load an already-expired pair at the next startup.

In [cloud sessions](https://code.claude.com/docs/en/claude-code-on-the-web), the hosting environment manages the connection to the API, so Claude Code ignores the following variables when they come from a settings file `env` block:

* `CLAUDE_CODE_CLIENT_CERT`
* `CLAUDE_CODE_CLIENT_KEY`
* `CLAUDE_CODE_CLIENT_KEY_PASSPHRASE`
* `NODE_EXTRA_CA_CERTS`
* `NODE_TLS_REJECT_UNAUTHORIZED`
* `CLAUDE_CODE_OAUTH_SCOPES`

Claude Code notes each ignored key in the session's debug log.

In [Claude Desktop](https://code.claude.com/docs/en/desktop) sessions where the app manages the provider connection, such as the Code tab on a [third-party provider](https://code.claude.com/docs/en/third-party-integrations) and Cowork sessions, Claude Code reads these variables and the proxy variables `HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY` only from [managed settings](https://code.claude.com/docs/en/managed-settings) and `~/.claude/settings.json`: it ignores them in a repository's own settings files, so a checked-out repository can't redirect the TLS or proxy path of a session whose credentials come from the app. In a local, SSH, or WSL Code tab session signed in through claude.ai, the app doesn't manage the connection, and Claude Code reads these variables from every settings scope, like any terminal session; [cloud sessions](https://code.claude.com/docs/en/claude-code-on-the-web) follow the cloud-session rules above wherever you start them. Before v2.1.217, Claude Code ignored these variables in every settings file when the app managed the connection.

## Verify your configuration

You usually find out about a wrong proxy address or a bad certificate path from a [connection or certificate error](https://code.claude.com/docs/en/errors#network-and-connection-errors) on a later request, since Claude Code doesn't validate most of these settings when it reads them. The one setting it checks at startup is the proxy URL: when it can't parse the value, such as one missing the `http://` scheme, Claude Code stops launch with an error naming the variable to fix.

To confirm your configuration loaded before you send a request, start Claude Code with debug logging:

```bash theme={null}
claude --debug
```
