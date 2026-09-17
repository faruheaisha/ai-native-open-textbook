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
sourceRel: "en/cloud-environments.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/cloud-environments.md"
sourceSha256: "29998b3dc2a851eaf60b64058c4be0d382bad76c81ed9bdb2cdcdfd5aca7b178"
pageSha256: "1af9a03f62f2a3ea473fbd25dcd1a2ea711431b4a70e6fd4d5b432dbdffb436e"
contentMode: "local-full"
zh: ""
---

## Network access

Each environment sets one network access level, which controls the outbound connections its sessions can make. The default level, **Trusted**, allows package registries and other [allowlisted domains](#default-allowed-domains); **Custom** takes your own domain list.

To change an environment's network access, [open it for editing](#configure-your-environment) and use the **Network access** selector in the dialog. The cloud icon that opens the selector appears on the app surfaces listed under [The Default environment](#the-default-environment) and in the [routine editor](https://code.claude.com/docs/en/routines#environments-and-network-access); personal environments don't have a separate page in your claude.ai account settings.

  MCP connectors you enable on a session or routine work without adding their hosts to **Allowed domains**, because connector traffic travels through Anthropic's servers rather than the session's network. You configure connectors per session or per routine; remove any you don't need to limit which tools Claude can reach. This relies on the same Anthropic-bound channel noted under [Security and isolation](https://code.claude.com/docs/en/claude-code-on-the-web#security-and-isolation).

### Access levels

The **Network access** field in the [environment dialog](#configure-your-environment) takes one of four levels:

| Level       | Outbound connections                                                                         |
| :---------- | :------------------------------------------------------------------------------------------- |
| **None**    | No outbound network access through the session's network                                     |
| **Trusted** | [Allowlisted domains](#default-allowed-domains) only: package registries, GitHub, cloud SDKs |
| **Full**    | Any domain                                                                                   |
| **Custom**  | Your own allowlist, optionally including the defaults                                        |

Whichever level you pick, sessions can still reach these, because each one takes a path that doesn't go through the session's network allowlist:

* GitHub, through its [separate proxy](#github-proxy)
* [MCP connectors](#network-access) you enable, whose traffic travels through Anthropic's servers
* The hosts you listed on the environment's [API credentials](#add-api-credentials), except the [hosts that never get the credential](#requests-that-never-get-the-credential)
* The Anthropic API, for Claude Code's own requests, even at **None**, as noted under [Security and isolation](https://code.claude.com/docs/en/claude-code-on-the-web#security-and-isolation)

### Allow specific domains

To allow domains that aren't in the Trusted list, select **Custom** in the environment's network access settings, then list one domain per line in the **Allowed domains** field. This example allows three hosts an internal project might need.

```text theme={null}
api.example.com
*.internal.example.com
registry.example.com
```

Sessions in this environment can now reach `api.example.com`, any subdomain of `internal.example.com`, and `registry.example.com`, and no other domains through the session's network. [GitHub traffic](#github-proxy), [MCP connector traffic](#network-access), and requests to the hosts of the environment's [API credentials](#add-api-credentials), other than the [hosts that never get the credential](#requests-that-never-get-the-credential), don't go through this allowlist. A leading `*.` matches every subdomain. To keep the [Trusted domains](#default-allowed-domains) too, check **Also include default list of common package managers**; leave it unchecked to allow only what you list.

If your organization uses [artifacts](https://code.claude.com/docs/en/artifacts#availability), you don't need `*.frame.claudeusercontent.com` in the list for sessions to read them. When the list leaves that host out, Claude Code reads artifact content through the session's connection to Anthropic instead. Keep the host in an allowlist in two situations:

* **Sessions in this environment open another organization's public artifacts**: Claude Code fetches those from the host directly, so add it to this list.
* **You're configuring the local CLI or a self-hosted runner**: keep the host in that allowlist. See [network access requirements](https://code.claude.com/docs/en/network-config#network-access-requirements) and the self-hosted [network requirements](https://code.claude.com/docs/en/self-hosted-environments-deploy#network-requirements).

Each environment has its own allowed-domains list; there's no organization-level allowlist that admins can push to every member's environments. [Server-managed settings](https://code.claude.com/docs/en/server-managed-settings) still apply inside cloud sessions, but none of them adds domains to the environment's network allowlist.

### GitHub proxy

In Anthropic-hosted environments, all GitHub operations go through a dedicated proxy that keeps your real GitHub credentials outside the session's VM, independent of the environment's [access level](#access-levels). Sessions in a self-hosted environment authenticate git operations with credentials your deployment provides; [Configure git](https://code.claude.com/docs/en/self-hosted-environments-deploy#configure-git) covers the options, including per-session minted credentials and an opt-in to this same proxy. The proxy provides:

* **Git credentials**: the git client inside the VM uses a scoped credential, which the proxy verifies and swaps for your actual GitHub token.
* **API requests**: requests from the built-in GitHub tools, and from `gh` under the [`proxy-injected` placeholder](#work-with-github-issues-and-pull-requests), go out with your real credentials substituted.
* **Push protection**: `git push` works only against the session's current working branch; cloning, fetching, and PR operations work normally.
* **Repository scope**: GitHub API and release-asset requests reach only repositories attached to the session, so a setup script that downloads release assets from an unattached repository gets a 403.
* **GraphQL restrictions**: the proxy serves only a pinned set of GraphQL operations for pull-request workflows. The proxy rejects everything else on the GraphQL endpoint with a 403 that says `This GraphQL query is not enabled for this session` and names the REST fallback, `gh api repos/\{owner\}/\{repo\}/...`. The restriction applies to every request through the proxy regardless of the credentials you supply, so a `GH_TOKEN` you set gets the same 403. Claude can't reach GitHub APIs that exist only in GraphQL, such as Projects v2, through the proxy.

Committed files from public repositories arrive through `raw.githubusercontent.com`, which the [security proxy](#security-proxy) handles instead. That domain is in the default [Trusted list](#default-allowed-domains), so those files stay reachable unless the environment's [access level](#access-levels) excludes it.

### Security proxy

Cloud sessions in Anthropic-hosted environments run behind an HTTP/HTTPS network proxy for security and abuse prevention purposes; in a [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments-deploy#default-deny-egress), outbound traffic leaves through your own network boundary instead. All outbound internet traffic from an Anthropic-hosted session passes through this proxy, which provides:

* Protection against malicious requests
* Rate limiting and abuse prevention
* Content filtering for enhanced security
* A DNS-level audit trail of requested hostnames
