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
sourceRel: "en/desktop.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/desktop.md"
sourceSha256: "3c585962a30144144f6f07cddbab26d1e8ab8f6272e881441abe0a1401514a09"
pageSha256: "a0a3949485ae4e8e01396af0ad282b26194aa568dc81abd57e6c3a258d0371a3"
contentMode: "local-full"
zh: ""
---

## Enterprise configuration

Organizations on Team or Enterprise plans can manage desktop app behavior through admin console controls, managed settings files, and device management policies.

### Admin console controls

These settings are configured through the [admin settings console](https://claude.ai/admin-settings/claude-code):

* **Code in the desktop**: control whether users in your organization can access Claude Code in the desktop app
* **Code in the web**: enable or disable [web sessions](https://code.claude.com/docs/en/claude-code-on-the-web) for your organization
* **Remote Control**: enable or disable [Remote Control](https://code.claude.com/docs/en/remote-control) for your organization
* **Disable Bypass permissions mode**: prevent users in your organization from enabling bypass permissions mode

### Managed settings

Managed settings override project and user settings and apply to Claude Code sessions in Desktop. You can set these keys in your organization's [managed settings](https://code.claude.com/docs/en/managed-settings) file or push them remotely through the admin console.

| Key                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `permissions.disableBypassPermissionsMode` | set to `"disable"` to prevent users from enabling Bypass permissions mode.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `disableAutoMode`                          | set to `"disable"` to remove [Auto](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) mode from the mode selector. Also accepted under `permissions`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `autoMode`                                 | customize what the auto mode classifier trusts and blocks across your organization. See [Configure auto mode](https://code.claude.com/docs/en/auto-mode-config).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `browserExternalPageTools`                 | set to `"disabled"` to prevent Claude from using tools to read or act on external pages in the [Browser pane](#browse-external-sites). Users can still navigate to external sites themselves, and local dev server previews are unaffected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `disableMobileSimulatorTools`              | set to `true` to block Claude's tools for controlling and capturing devices in the [iOS Simulator pane](https://code.claude.com/docs/en/desktop-ios-simulator#turn-off-simulator-access). The pane stays usable for the user's own taps; only Claude's access is removed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `disableBrowserExternalNavigation`         | set to `true` to turn off external browsing in the [Browser pane](#browse-external-sites) entirely. Neither users nor Claude can navigate to external sites, and localhost dev server previews are unaffected. The value must be the JSON boolean `true`; the string `"true"` is ignored.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `sshConfigs`                               | pre-configure [SSH connections](#pre-configure-ssh-connections-for-your-team) that appear in the environment dropdown. Users cannot edit or delete managed connections.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `sshHostAllowlist`                         | restrict [SSH sessions](#restrict-which-ssh-hosts-users-can-connect-to) to hosts whose resolved hostname matches one of these patterns. An empty array disables SSH sessions. Read from managed settings only.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `disableDesktopLocalSessions`              | set to `true` to turn off [Code sessions that run on the device](#local-sessions-on-managed-devices), leaving SSH sessions to other hosts and cloud sessions available. The value must be the JSON boolean `true`. Read from managed settings only. Requires Claude Desktop v1.37937.0 or later.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `managedMcpServers`                        | push MCP server configurations to all users. Available in third-party (3P) Desktop deployments only. In each entry, set a transport of `"http"`, `"sse"`, or `"stdio"`, connection details, and optionally a `toolPolicy` map to restrict which of that server's tools users can invoke. Deliver it through the managed settings file, MDM, or a Claude apps gateway policy's [`desktop` block](https://code.claude.com/docs/en/claude-apps-gateway-config#claude-desktop-overlay), since 3P deployments don't receive admin-console settings. To deliver it through the gateway, you need Claude Code v2.1.232 or later on the gateway server. This is the desktop app's own key; Claude Code reads a [same-named managed setting](https://code.claude.com/docs/en/managed-mcp#provide-servers-through-managed-settings) of its own, with a different entry shape. |

Which managed settings reach a Desktop session depends on where that session runs. Model restrictions such as [`availableModels`](https://code.claude.com/docs/en/model-config#restrict-model-selection) are enforced in Desktop's Claude Code sessions the same way as in the terminal CLI; see [surface coverage](https://code.claude.com/docs/en/model-config#surface-coverage).

* **Local sessions on this machine**: a managed settings file deployed to disk applies. Managed settings pushed remotely through the admin console also reach these sessions on Anthropic's API when the session authenticates with an [eligible login or key](https://code.claude.com/docs/en/server-managed-settings#platform-availability), following the same [settings precedence](https://code.claude.com/docs/en/settings#settings-precedence) as the terminal CLI.
* **[Cloud sessions](#cloud-sessions)**: receive [server-managed settings](https://code.claude.com/docs/en/server-managed-settings); device-deployed files don't reach them, because they run on Anthropic-managed VMs. Sessions routed to a [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments) also read the managed settings file in the runner image. [How Claude Code combines managed sources](https://code.claude.com/docs/en/managed-settings#how-claude-code-combines-managed-sources) says when that file applies.
* **[SSH sessions](#ssh-sessions)**: the session reads the managed settings file from the remote host. Desktop itself reads `sshConfigs`, `sshHostAllowlist`, and `disableDesktopLocalSessions` from the local machine's managed settings.
* **[Cowork](https://claude.com/docs/cowork/overview) sessions**: in a Cowork session on this machine, Claude Code never fetches admin-console settings, even when the user signs in with a Team or Enterprise account, and reads policy deployed to the machine unless your Claude Desktop configuration sets `requireCoworkFullVmSandbox`. Remote Cowork sessions receive neither. See [where and when a policy applies](https://code.claude.com/docs/en/managed-settings#where-and-when-a-policy-applies) for which device files reach Cowork, and [MCP permission rules](https://code.claude.com/docs/en/permissions#mcp) for how `Bash` and `WebFetch` rules apply to Cowork's tools.

In local and SSH sessions, the desktop app delivers each user's connected claude.ai connectors to Claude Code directly. No MCP setting or `managed-mcp.json` reaches those connectors, whichever settings source or file location you use. To block a connector's tools in these sessions, use your organization's [connector tool controls](https://code.claude.com/docs/en/mcp#organization-controls-on-connector-tools). [How connectors reach Claude Code](https://code.claude.com/docs/en/mcp#how-connectors-reach-claude-code) shows which settings govern connectors in each kind of session.

`permissions.disableBypassPermissionsMode` and `disableAutoMode` also work in user and project settings, but placing them in managed settings prevents users from overriding them.

For the permission, plugin, and delivery keys only a managed source can set, see [Keys only managed settings can set](https://code.claude.com/docs/en/managed-settings#managed-only-settings).

### Device management policies

IT teams can manage the desktop app through MDM on macOS or group policy on Windows. Available policies include enabling or disabling the Claude Code feature, controlling auto-updates, and setting a custom deployment URL.

* **macOS**: configure via `com.anthropic.claudefordesktop` preference domain using tools like Jamf or Kandji
* **Windows**: configure via registry at `SOFTWARE\Policies\Claude`

### Network access requirements

Desktop loads its application code and user content from Anthropic CDN hosts.

```text theme={null}
anthropic.com
*.anthropic.com
claude.ai
*.claude.ai
claude.com
*.claude.com
claude.app
*.claude.app
*.claudeusercontent.com
*.claudemcpcontent.com
```

Traffic is HTTPS on port 443 unless you configure a custom port for [OTLP](https://code.claude.com/docs/en/monitoring-usage), an LLM gateway, or an MCP server.

For proxy servers, custom certificate authorities, mTLS, and the domains the standalone CLI needs, see [network configuration](https://code.claude.com/docs/en/network-config).

To reduce the number of firewall wildcards, allow these Anthropic hosts instead. Certain subdomains are dynamically generated and must remain wildcards.

```text theme={null}
anthropic.com
api.anthropic.com
a-api.anthropic.com
a-cdn.anthropic.com
s-cdn.anthropic.com
assets-proxy.anthropic.com
claude.ai
a.claude.ai
a-cdn.claude.ai
assets.claude.ai
downloads.claude.ai
*.livepreview.claude.ai
claude.com
platform.claude.com
*.livepreview.claude.app
*.claudeusercontent.com
*.claudemcpcontent.com
```

If your organization has [IP allowlisting](https://support.claude.com/en/articles/13200993-restrict-access-to-claude-with-ip-allowlisting) enabled for Claude, route `bridge.claudeusercontent.com` through the same proxy egress as `claude.ai` and `api.anthropic.com`. If you can't route it that way, add the egress address your proxy uses for that host to your organization's IP allowlist, but only when that address is dedicated to your organization: a shared proxy egress range also admits the proxy vendor's other customers.

Anthropic checks connections to that host against your organization's IP allowlist using the address they arrive from. If your proxy sends traffic for it out through an address that isn't on that allowlist, Claude in Chrome and other features that connect through the bridge stop working while the rest of the app keeps working.

An [artifact](https://code.claude.com/docs/en/artifacts) that loads a typeface from [Google Fonts](https://code.claude.com/docs/en/artifacts#improve-the-visual-design) also requests `fonts.googleapis.com` and `fonts.gstatic.com`. Both hosts are optional. If you block them, artifacts render in fallback typefaces. Block with a fast rejection rather than a silent drop so the font request fails immediately instead of delaying the page's first render.

Artifacts can also load JavaScript libraries, such as React or a charting package, from `cdnjs.cloudflare.com`, `cdn.jsdelivr.net`, `cdn.tailwindcss.com`, and `code.jquery.com`, and from no other external host. If you block those hosts, the parts of an artifact that depend on a library don't work, and unlike a blocked font, a blocked library has no fallback. Block with a fast rejection here too, so a blocked library request fails at once rather than hanging until it times out.

### Authentication and SSO

Enterprise organizations can require SSO for all users. See [authentication](https://code.claude.com/docs/en/authentication) for plan-level details and [Setting up SSO](https://support.claude.com/en/articles/13132885-setting-up-single-sign-on-sso) for SAML configuration; OIDC setup is covered in the [Claude Enterprise Administrator Guide](https://claude.com/resources/tutorials/claude-enterprise-administrator-guide).

### Data handling

Claude Code processes your code locally in local sessions, or in cloud sessions on Anthropic-managed infrastructure, unless your organization routes them to a [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments). Cloud sessions, including in a self-hosted environment, send conversations and code context to Anthropic's API for processing; local and SSH sessions send them to whichever [model provider](#feature-comparison) your deployment configures, Anthropic's API by default. See [data handling](https://code.claude.com/docs/en/data-usage) for details on data retention, privacy, and compliance.

### Deployment

Desktop can be distributed through enterprise deployment tools:

* **macOS**: distribute via MDM such as Jamf or Kandji using the `.dmg` installer
* **Windows**: deploy via the MSIX package. See [Deploy Claude Desktop for Windows](https://support.claude.com/en/articles/12622703-deploy-claude-desktop-for-windows) for enterprise deployment options including silent installation

For the domains to allowlist in your firewall, see [network access requirements](#network-access-requirements) above. For proxy settings, custom certificate authorities, and LLM gateways, see [network configuration](https://code.claude.com/docs/en/network-config).

For the full enterprise configuration reference, see the [enterprise configuration guide](https://support.claude.com/en/articles/12622667-enterprise-configuration).
