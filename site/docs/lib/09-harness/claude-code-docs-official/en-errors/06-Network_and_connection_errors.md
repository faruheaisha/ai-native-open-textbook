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
sourceRel: "en/errors.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/errors.md"
sourceSha256: "b8944f28bfea74456c2960ba67f375c1d39afd34fb474e956bea3d64744e6604"
pageSha256: "29d629a14da70ac2556c9bd20aa276338185e33c83acaf332f933e8207172cfb"
contentMode: "local-full"
zh: ""
---

## Network and connection errors

Most of these errors mean a network request from Claude Code failed to reach its destination, or something between Claude Code and the API altered the response on its way back; where an entry also has a local cause, such as a failed archive write, its body says so. They usually originate in your local network, proxy, or firewall, or in the cloud environment's network policy.

### Unable to connect to API

The TCP connection to the API failed or never completed. For the common connection error codes, the message names the kind of failure and keeps the code in parentheses:

```text theme={null}
Unable to connect to API. Check your internet connection
Connection refused — a firewall or proxy may be blocking it (ConnectionRefused)
Can't reach the API server — check your internet or DNS (ENOTFOUND)
No internet route — check your connection or VPN (EHOSTUNREACH)
Couldn't connect through your proxy (ERR_PROXY_TUNNEL)
Connection dropped (ECONNRESET)
fetch failed
Request timed out. Check your internet connection and proxy settings
```

A code Claude Code doesn't recognize appears as `Unable to connect to API` followed by the code in parentheses. Some of these messages can show more than one code: `Connection refused` can show `ConnectionRefused` or `ECONNREFUSED`, for example, and `Can't reach the API server` can show `ENOTFOUND` or `FailedToOpenSocket`.

Before v2.1.227, each of these coded messages read `Unable to connect to API` followed by the code, for example `Unable to connect to API (ECONNREFUSED)`.

Common causes include no internet access, a VPN that blocks `api.anthropic.com`, or a required corporate proxy that is not configured.

**What to do:**

* Confirm you can reach the API host from the same shell by running `curl -I https://api.anthropic.com`. On Windows PowerShell use `curl.exe -I https://api.anthropic.com` so the built-in `Invoke-WebRequest` alias is not used.
* If you are behind a corporate proxy, set `HTTPS_PROXY` before launching Claude Code and see [Network configuration](https://code.claude.com/docs/en/network-config)
* If you route through an LLM gateway or relay, set [`ANTHROPIC_BASE_URL`](https://code.claude.com/docs/en/env-vars) to its address. See [Connect Claude Code to an LLM gateway](https://code.claude.com/docs/en/llm-gateway-connect) for setup.
* Ensure your firewall allows the hosts listed in [Network access requirements](https://code.claude.com/docs/en/network-config#network-access-requirements)
* Intermittent failures are [retried automatically](#automatic-retries); persistent failures point to a local network issue

If `curl` succeeds but Claude Code still fails, the cause is usually something between the runtime and the network rather than the network itself:

* On Linux and WSL, check `/etc/resolv.conf` for an unreachable nameserver. WSL in particular can inherit a broken resolver from the host.
* On macOS, a VPN client that was disconnected or uninstalled can leave a tunnel interface or routing rule behind. Check `ifconfig` for stale `utun` interfaces and remove the VPN's network extension in System Settings.
* Docker Desktop and similar container runtimes can intercept outbound traffic. Quit them and retry to rule this out.

### Unable to connect to Anthropic services

During first-run setup, Claude Code checks that it can reach `api.anthropic.com` and `platform.claude.com` before showing the sign-in step. When either check fails, Claude Code prints the reason and exits.

```text theme={null}
Unable to connect to Anthropic services
Failed to connect to api.anthropic.com: ECONNREFUSED
Connection to api.anthropic.com timed out after 10 seconds
A proxy is configured via HTTPS_PROXY. Check that it allows connections to the host above.
```

Claude Code sends the check through the same [proxy configuration](https://code.claude.com/docs/en/network-config) as API requests and gives each probe 10 seconds. When the failed probe went through a proxy, the message names the environment variable that configured it, such as `HTTPS_PROXY`. Before v2.1.222, the check used a different proxy transport with no timeout: behind a proxy URL with the `https://` scheme, it could stall on `Checking connectivity...` indefinitely and then fail even though API requests through the same proxy succeed.

Claude Code skips this check when a [managed settings file, MDM policy, or policy helper](https://code.claude.com/docs/en/managed-settings) sets [`forceLoginMethod`](https://code.claude.com/docs/en/settings-reference#forceloginmethod) to `"gateway"`, or sets [`forceLoginGatewayUrl`](https://code.claude.com/docs/en/settings-reference#forcelogingatewayurl) without `forceLoginMethod`. With either configuration, Claude Code opens the sign-in step on the **Cloud gateway** screen rather than an Anthropic sign-in method. Claude Code also skips the check when a managed settings source on the machine exists but can't be read, since that source may hold the gateway configuration. Before v2.1.247, Claude Code ran the check under this configuration too, and exited with this error when Anthropic's endpoints were unreachable.

**What to do:**

* If the message names a proxy variable, check that its value points at the right proxy and ask your network team to allow HTTPS connections through it to the host in the message. See [Network configuration](https://code.claude.com/docs/en/network-config).
* Work through the checks in [Unable to connect to API](#unable-to-connect-to-api). The `curl` test and firewall guidance there apply to this check too.
* If your organization signs in through a [cloud gateway](https://code.claude.com/docs/en/claude-apps-gateway) and this error appears on first run, update to Claude Code v2.1.247 or later.
* If your network is open and the failure persists, Claude Code may not be [available in your country](https://www.anthropic.com/supported-countries)

### Socket is closed

`Socket is closed` means the connection carrying a streaming response was closed while the response was still arriving. The most common cause is a corporate proxy on Windows dropping an established tunnel mid-response.

Depending on how far the response had progressed, Claude Code retries the request, keeps what Claude produced, or ends the turn. See [Automatic retries](#automatic-retries).

Before v2.1.214, Claude Code didn't retry this failure, and the turn stopped with an error containing `Socket is closed`.

**What to do:**

* If you see this error, update to v2.1.214 or later with `claude update`, then send your message again
* If turns keep failing behind the same proxy after updating, work through [Unable to connect to API](#unable-to-connect-to-api) and check the proxy setup in [Network configuration](https://code.claude.com/docs/en/network-config)

### API returned an empty or malformed response

Claude Code shows this error when its non-streaming retry of a failed streaming request gets an HTTP success status but the body isn't a Claude API message: commonly an HTML error or sign-in page, an empty body, or JSON in another format. A proxy, gateway, or network sign-in page answering in the API's place is the usual source. Claude Code doesn't retry the request, and the turn ends with this error.

```text theme={null}
API returned an empty or malformed response (HTTP 200) — check for a proxy or gateway intercepting the request.
```

After that opening, the message reports what came back and which request failed:

* A `Response:` clause with the content type, the kind of body, such as `body is an HTML page` or `empty body`, its size in bytes, and whether the response carried an Anthropic request id. When the response names a recognizable server, such as `nginx` or `cloudflare`, or carries intermediary headers, such as `cf-ray` or `via`, the clause lists those too.
* A sentence naming the failed streaming request's id and the failure that triggered the retry. When a stream had opened before the failure, it also reports how many stream events arrived and, if any did, how long the stream had been silent when the attempt failed.

Before v2.1.234, the message ended after `intercepting the request`.

**What to do:**

* Read the `Response:` clause to see which system answered. An HTML body, no Anthropic request id, or a named server such as `nginx` or `cloudflare` means that something between Claude Code and the API replied in its place
* If you route through an [LLM gateway](https://code.claude.com/docs/en/llm-gateway-connect#troubleshoot-gateway-errors), test the route with a direct request and fix the hop that returns the non-API response
* On a network with a sign-in page, such as guest Wi-Fi, complete the sign-in in a browser, then retry
* If only the non-streaming route through your gateway is broken, set [`CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK=1`](https://code.claude.com/docs/en/env-vars#variables) so a request that fails mid-stream goes to the normal retry path instead of this fallback, except when the streaming endpoint itself returns `404`, where Claude Code still falls back

### Streaming response ended before any complete data was received

A streaming response from your model provider completed without delivering any usable data, so Claude Code re-sent the request without streaming to finish the turn. Claude Code shows the warning once per session, in interactive sessions only. Before v2.1.239, Claude Code silently retried without streaming.

```text theme={null}
Streaming response ended before any complete data was received. Retrying without streaming. If this keeps happening, check any proxy or gateway between Claude Code and your model provider.
```

Claude Code sends each affected request twice: the empty streaming attempt and the retry. The usual cause is a proxy or gateway that consumes or transforms the streaming response body on its way back.

**What to do:**

* Configure any proxy or gateway between Claude Code and your model provider to pass streaming response bodies and their headers through unmodified
* On [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock), see [Streaming errors behind a gateway or proxy](https://code.claude.com/docs/en/amazon-bedrock#streaming-errors-behind-a-gateway-or-proxy) for the header and body requirements

### Bedrock streaming response has an unexpected content-type

A gateway or proxy between Claude Code and [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock) is transforming the streaming response body or its `Content-Type` header. Amazon Bedrock streams responses as `application/vnd.amazon.eventstream`. Rather than decode a body it can't read, Claude Code rejects a successful streaming response that reports a different content-type. Claude Code doesn't retry the request.

```text theme={null}
Bedrock streaming response has content-type "text/event-stream"; expected "application/vnd.amazon.eventstream". A gateway or proxy between Claude Code and Bedrock is likely transforming the response body — Bedrock's binary event-stream format must be passed through unmodified. Set CLAUDE_CODE_DISABLE_BEDROCK_CONTENT_TYPE_GUARD=1 to suppress this check while the gateway is being fixed.
```

Before v2.1.208, the same misconfiguration surfaced as `API Error: Truncated event message received` after the whole response had been buffered.

**What to do:**

* Configure the gateway to pass the `InvokeModelWithResponseStream` response body and its `Content-Type` header through unmodified. An intermediary that re-emits the stream as server-sent events is a common cause.
* Setting [`CLAUDE_CODE_DISABLE_BEDROCK_CONTENT_TYPE_GUARD=1`](https://code.claude.com/docs/en/env-vars) hides this error, but Claude Code doesn't decode a binary body under a rewritten header, so those requests fall back to a slower non-streaming path. See [Streaming errors behind a gateway or proxy](https://code.claude.com/docs/en/amazon-bedrock#streaming-errors-behind-a-gateway-or-proxy).

### SSL certificate errors

A proxy or security appliance on your network is intercepting TLS traffic with its own certificate, and Claude Code does not trust it.

```text theme={null}
Unable to connect to API: SSL certificate verification failed. Check your proxy or corporate SSL certificates
Unable to connect to API: Self-signed certificate detected. Check your proxy or corporate SSL certificates
```

As of v2.1.199, a certificate validation failure isn't retried, so this error appears on the first attempt instead of after the full [retry budget](#automatic-retries). Earlier versions spent a few minutes retrying before showing it. Transient TLS conditions, such as a handshake timeout, still retry.

During `/login` and the startup connectivity check, the same failure is reported with the OpenSSL code and the fix inline:

```text theme={null}
SSL certificate error (UNABLE_TO_GET_ISSUER_CERT_LOCALLY). If you are behind a corporate proxy or TLS-intercepting firewall, set NODE_EXTRA_CA_CERTS to your CA bundle path, or ask IT to allowlist *.anthropic.com. Run `claude doctor` for details.
```

On [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock), the requests Claude Code itself sends to AWS, such as the STS and SSO role-credential calls, model discovery, and the setup wizard's checks, depend on the same certificate configuration. See [Certificate errors behind a TLS-inspecting proxy](https://code.claude.com/docs/en/amazon-bedrock#certificate-errors-behind-a-tls-inspecting-proxy).

**What to do:**

* Export your organization's CA bundle and point Claude Code at it with `NODE_EXTRA_CA_CERTS=/path/to/ca-bundle.pem`
* See [Network configuration](https://code.claude.com/docs/en/network-config#custom-ca-certificates) for full setup instructions
* Don't set `NODE_TLS_REJECT_UNAUTHORIZED=0`, which disables certificate validation entirely

### Host not allowed in a cloud session

An outbound HTTP request from a cloud session or routine was blocked by the environment's network policy.

```text theme={null}
HTTP 403
x-deny-reason: host_not_allowed
```

You may also see a TLS certificate that doesn't match the destination's real certificate. Cloud sessions route outbound traffic through a proxy that enforces the network policy, so a mismatched certificate means the proxy terminated the connection, not the destination.

This is not a client-side network problem. Cloud sessions and [routines](https://code.claude.com/docs/en/routines) run inside a sandboxed VM whose outbound traffic through the session's network is filtered to the [cloud environment's](https://code.claude.com/docs/en/cloud-environments) allowlist; [GitHub operations](https://code.claude.com/docs/en/cloud-environments#github-proxy) and MCP connector traffic use separate channels, which is why they can keep working while other hosts are blocked. The **Default** environment uses **Trusted** access, which permits the [default allowlist](https://code.claude.com/docs/en/cloud-environments#default-allowed-domains) of package registries, cloud provider APIs, container registries, and common development domains and blocks other domains on that path.

**What to do:**

* Open the routine for editing, or start a cloud session. Select the cloud icon showing your environment's name, such as **Default**, to open the selector. Hover over your environment and click the settings icon.
* In the **Update cloud environment** dialog, change **Network access** from **Trusted** to **Custom**, then add the blocked domain to **Allowed domains**. Enter one domain per line. Check **Also include default list of common package managers** to keep the [default allowlist](https://code.claude.com/docs/en/cloud-environments#default-allowed-domains) alongside your custom domains. Select **Full** instead if you want unrestricted access.
* Click **Save changes**. The next run uses the updated allowlist.

See [Network access](https://code.claude.com/docs/en/cloud-environments#network-access) for access levels and the default allowlist. Local CLI sessions are not affected by this policy.

<h3 id="the-proxy-refused-the-connection">
  The proxy refused the connection
</h3>

You see this message when Claude reads an [artifact](https://code.claude.com/docs/en/artifacts) through the proxy you set in `HTTPS_PROXY` or a related [proxy variable](https://code.claude.com/docs/en/network-config#environment-variables). Artifact content comes from `*.frame.claudeusercontent.com`, so Claude Code first sends the proxy a `CONNECT` request asking it to open a tunnel to that host. When the proxy refuses, nothing reaches the host, and the message carries the proxy's HTTP status:

```text theme={null}
artifact content fetch failed (proxy refused the connection: HTTP 407)
artifact content fetch failed (proxy refused the connection: HTTP 403)
the proxy refused the connection to the artifact's content host (HTTP 502)
```

The status is the proxy's answer to the `CONNECT`. The host never answered, so each status points at a different fix:

* `HTTP 407`: the proxy requires credentials it didn't get. Put them in the proxy URL, as [Basic authentication](https://code.claude.com/docs/en/network-config#basic-authentication) shows.
* `HTTP 403`: the proxy refuses to tunnel to `*.frame.claudeusercontent.com`. Ask whoever runs the proxy to allow that host, which [Network access requirements](https://code.claude.com/docs/en/network-config#network-access-requirements) lists.
* Any other status, such as `HTTP 502`: the proxy didn't open the tunnel for its own reason, such as failing to reach the host. Look the status up in the proxy's logs.
* `unreadable reply` in place of a status: whatever is at the proxy address didn't answer with an HTTP status line. Check that the address is an HTTP proxy.

**What to do:**

* Check the address and credentials in the proxy variable, as [Proxy configuration](https://code.claude.com/docs/en/network-config#proxy-configuration) describes, then run `curl -x http://proxy.example.com:8080 -I https://api.anthropic.com` from the shell you start Claude Code in, using your own proxy URL. On Windows PowerShell, run `curl.exe`. If this probe fails the same way, fix the proxy setup first. If it succeeds, the refusal is specific to the artifact host.
* If your network lets Claude Code reach the artifact host directly, add `.frame.claudeusercontent.com` to [`NO_PROXY`](https://code.claude.com/docs/en/network-config#environment-variables). Keep the entry that narrow: a broader `.claudeusercontent.com` entry also bypasses the proxy for `bridge.claudeusercontent.com`, which organizations with [IP allowlisting](https://code.claude.com/docs/en/network-config#organization-ip-allowlists-and-proxy-egress) need to keep on the proxy.

Before v2.1.238, Claude Code reported a refused tunnel as a generic network error.

<h3 id="the-cloud-environments-service-returned-an-empty-or-unexpected-response">
  The cloud environments service returned an empty or unexpected response
</h3>

Claude Code requests your [cloud environments](https://code.claude.com/docs/en/cloud-environments) list at several points, such as when you create a cloud session from the CLI or run [`/remote-env`](https://code.claude.com/docs/en/cloud-environments#select-an-environment-from-the-cli). When it can't read the server's answer, it shows one of these messages:

```text theme={null}
The cloud environments service returned an empty response (HTTP 200 with no body). This is usually temporary — try again in a moment.
The cloud environments service returned a response in an unexpected format (HTTP 200 with a non-JSON body). This is usually temporary — try again in a moment.
The cloud environments service returned a response in an unexpected format (HTTP 200 without a usable environments list). This is usually temporary — try again in a moment.
```

The server accepted the request but answered with a body that isn't the environments list: empty, not JSON, or JSON without the list. This usually accompanies a service-side disruption and clears on its own. Depending on the surface that requested the list, Claude Code may add a prefix, such as `couldn't list environments:` in the `/remote-env` dialog.

**What to do:**

* Retry the action. Claude Code requests the list again each time
* If the message keeps appearing, check [status.claude.com](https://status.claude.com) for active incidents

Before v2.1.236, Claude Code showed a raw JavaScript TypeError instead of these messages.

<h3 id="couldnt-reconnect-to-your-remote-control-session">
  Couldn't reconnect to your Remote Control session
</h3>

```text theme={null}
Couldn't reconnect to your Remote Control session. Retry, or start a fresh session without --resume.
```

Resuming with `claude --resume` or `claude --continue` reconnects to the [Remote Control](https://code.claude.com/docs/en/remote-control) session recorded in that conversation. This message means the reconnection failed for a reason that may be temporary, such as a network interruption or a server error, so Claude Code can't confirm whether the remote session still exists. Your local session keeps running without Remote Control.

**What to do:**

* Run `/remote-control` to retry the connection
* Start a new session with `claude --remote-control` to create a new Remote Control session
* For other Remote Control startup messages, see [Troubleshoot Remote Control](https://code.claude.com/docs/en/remote-control#troubleshooting)

If the server reports instead that the previous session is gone, you don't see this message. Claude Code starts a new session in its place or shows [`Previous session is unavailable — run /remote-control to start a new one`](https://code.claude.com/docs/en/remote-control#previous-session-is-unavailable), depending on [the conversation's reconnection record](https://code.claude.com/docs/en/remote-control#resume-outcomes). From v2.1.227 through v2.1.231, Claude Code showed a message that starts with `Remote Control could not resume the previous session under the current login` instead, and [earlier versions behaved differently again](https://code.claude.com/docs/en/remote-control#reconnect-history).

<h3 id="sessions-ended-while-this-machine-was-offline">
  Sessions ended while this machine was offline
</h3>

Claude Code shows this message in the terminal running [`claude remote-control`](https://code.claude.com/docs/en/remote-control#start-a-remote-control-session) after your machine was offline long enough that the server cleaned up the Remote Control environment your machine was serving. The sessions in that environment ended, and you can't resume them. The count is the number of sessions that ended.

```text theme={null}
2 sessions ended while this machine was offline — the environment was cleaned up on the server and can't be resumed.
```

**What to do:**

* When Claude Code lists kept worktrees under this message, pick up any uncommitted work from them
* Run `claude remote-control` to start a fresh environment

<h3 id="couldnt-share-the-transcript">
  Couldn't share the transcript
</h3>

After you agree to share your session transcript from a survey prompt, such as the [session quality survey](https://code.claude.com/docs/en/data-usage#session-quality-surveys), Claude Code uploads it to Anthropic, or saves a local archive instead on third-party providers, on [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway) sessions, and when no Anthropic credentials are available. This message means the share didn't complete.

```text theme={null}
Couldn't share the transcript.
```

The upload must fit an 8 MiB limit. On a long session, Claude Code progressively drops parts of the share, the last request's model settings first, then the structured conversation and subagent transcripts, and shows this message only when no reduced version can be sent or a network or server error stops the upload. When Claude Code saves a local archive instead, the message means it couldn't write the archive.

**What to do:**

* Run `/feedback` to send the transcript with a description of what happened. See [Report an error](#report-an-error) if `/feedback` is unavailable in your environment
* If other requests are failing too, check your network connection and see [Unable to connect to API](#unable-to-connect-to-api)
