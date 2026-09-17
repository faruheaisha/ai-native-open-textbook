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
sourceRel: "en/claude-apps-gateway-deploy.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/claude-apps-gateway-deploy.md"
sourceSha256: "09270d8f4e207724e6aae6f48b9a970996cef9e8db5702abe212c1240143bdb0"
pageSha256: "a58ae5c59abd766ba7d66eca660701d7f72938434aa3425be8c8841e81c0024a"
contentMode: "local-full"
zh: ""
---

## Security

This section answers the questions a security review asks: what data flows through the gateway and where it goes, which attacks the design defends against, and which answers belong in a compliance questionnaire.

### Data flow

| Data                                                                                              | Path                                                                                                                                                                                                                                                                        | Sent to Anthropic by the gateway                   |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Inference (prompts, completions)                                                                  | CLI → gateway → your upstream                                                                                                                                                                                                                                               | Only if the Anthropic API is a configured upstream |
| Telemetry (OTLP metrics, plus [opt-in logs and traces](https://code.claude.com/docs/en/claude-apps-gateway-config#telemetry)) | CLI → gateway → your collector                                                                                                                                                                                                                                              | Never                                              |
| Identity (email, groups, sub)                                                                     | IdP → gateway → JWT → CLI; the CLI stamps it on OTLP exports. If you turn on [`forward_user_identity`](https://code.claude.com/docs/en/claude-apps-gateway-config#per-user-identity-headers-for-a-proxy-you-run), the gateway also sends the developer's email and IdP subject as headers to your proxy | Never                                              |
| Managed settings                                                                                  | Your gateway YAML → CLI                                                                                                                                                                                                                                                     | Never                                              |
| Audit log                                                                                         | Gateway stderr → your aggregator                                                                                                                                                                                                                                            | Never                                              |

### Threat model summary

The gateway sits inside your network perimeter, but individual developer laptops aren't treated as trusted. The design accounts for this in three ways:

* Developers hold short-lived JWTs instead of raw upstream keys. The CLI-to-gateway leg uses the RFC 8628 device grant, and the gateway's authorization-code exchange with the IdP runs PKCE in the default configuration, so an intercepted IdP authorization code is useless.
* The device-verification page enforces same-origin POST and a per-IP rate limit per RFC 8628 §5.1. See [User-code brute-force resistance](#user-code-brute-force-resistance).
* Outbound requests go through a server-side request forgery (SSRF) guard that resolves DNS, blocks link-local and cloud-metadata addresses plus loopback by default, and pins the connection to the resolved IP, so operator-influenced URLs such as the IdP and OTLP destinations can't be redirected to cloud metadata endpoints. RFC 1918 private ranges are deliberately allowed, because IdPs and OTLP collectors commonly live on private IPs. Set `CLAUDE_GATEWAY_ALLOW_LOOPBACK=1` in the gateway's environment only when something the gateway must reach legitimately lives on loopback, such as a local-development IdP or a sidecar OTLP collector on `localhost`. The variable relaxes the loopback block for every operator-configured URL and also skips the boot-time warning that checks whether the pod can reach the cloud metadata endpoint, so prefer giving the collector its own internal address.

If you add your own egress controls, the gateway must reach the metadata server whenever it uses instance-metadata credentials such as workload identity.

Two threats are out of scope because they are your infrastructure to secure:

* **A compromised gateway host**: the host both holds the upstream credential and distributes [managed settings](https://code.claude.com/docs/en/claude-apps-gateway-config#managed) to every connected developer, so control over the gateway's configuration is comparable to control over your MDM. The CLI's [approval dialog](https://code.claude.com/docs/en/server-managed-settings#approval-memory) for shell-capable settings limits silent changes but doesn't replace host security.
* **A malicious OIDC provider**: the provider signs the id\_tokens the gateway trusts, so it can assert any identity. Vetting and securing your IdP is your responsibility.

### User-code brute-force resistance

The `user_code` a developer types into the `/device` verification page is 8 characters drawn from a 20-character alphabet, which yields 20⁸ or about 2.56×10¹⁰ combinations, and it expires after 10 minutes.

The gateway applies per-IP rate limits on the device-grant endpoints, configurable via [`rate_limits`](https://code.claude.com/docs/en/claude-apps-gateway-config#http-tuning). Raise the limits if many developers sign in from a single shared corporate NAT address. The limits apply only to the sign-in flow, not to inference.

### Compliance posture

* **Data residency**: the gateway's own data plane sends nothing to Anthropic unless the Anthropic API is a configured upstream; when it is, your existing data-handling agreement applies to the inference path. Telemetry, audit, identity, and settings go only to the destinations you configure.
* **Host-process traffic**: the host process is the Claude Code CLI. `claude gateway` runs under the same third-party rules as Amazon Bedrock and Google Cloud's Agent Platform deployments and sends nothing to Anthropic. Before v2.1.227, the host process sent startup telemetry such as product version and platform, which setting `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1` in the container environment turned off. Those releases also sent one `HEAD` request at boot, with no body or credentials, to `/api/hello` on `https://api.anthropic.com`, or on `ANTHROPIC_BASE_URL` when the environment set it, unless the environment also set a proxy variable such as `HTTPS_PROXY` or an mTLS client certificate. They ignored the response, so blocking that request at the egress firewall didn't affect the gateway.
* **Client analytics**: the CLI disables its own usage analytics and error reporting while signed in to a gateway. Before the first sign-in, the CLI still sends startup events to Anthropic, including on machines whose managed settings force gateway sign-in. To keep those off too, deliver [`DISABLE_TELEMETRY`](https://code.claude.com/docs/en/managed-settings#turn-telemetry-off-for-your-organization) in the same [client-side managed settings](https://code.claude.com/docs/en/claude-apps-gateway-config#client-side-managed-settings) that force gateway sign-in.
* **Error reporting**: the CLI turns error reporting off whenever its model requests go to any endpoint other than Anthropic's first-party API, such as Amazon Bedrock or a custom `ANTHROPIC_BASE_URL`.
* **Client machines**: developers' CLIs still send WebFetch hostname checks and version checks to Anthropic unless `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1` and `skipWebFetchPreflight: true` are set. See [data usage](https://code.claude.com/docs/en/data-usage).
* **Survey ratings**: while signed in to a gateway, the CLI disables the Anthropic-bound rating upload together with the analytics streams, so it doesn't send ratings to Anthropic.
* **Transcript sharing**: choosing Yes on a survey's transcript-share prompt writes a local file under `~/.claude/feedback-bundles/` instead of uploading to Anthropic.
* **Client updates**: update checks are separate from gateway traffic. Pin versions through your own distribution and set `DISABLE_UPDATES` if laptops must not fetch releases. `DISABLE_AUTOUPDATER` stops only background updates while `claude update` still works.
* **TLS**: serve `public_url` over HTTPS in production, either from the gateway's own listener via `listen.tls` or from a TLS-terminating ingress in front of plain-HTTP replicas, with `listen.public_url` set in both cases. The gateway doesn't refuse plain HTTP. The IdP must serve HTTPS in production, and Postgres supports `?sslmode=require`. Set `Strict-Transport-Security` at your ingress.
* **Vulnerability disclosure**: follow [Reporting security issues](https://code.claude.com/docs/en/security#reporting-security-issues)
