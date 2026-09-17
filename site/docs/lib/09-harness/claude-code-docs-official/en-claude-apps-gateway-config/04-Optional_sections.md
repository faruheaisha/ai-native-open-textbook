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
sourceRel: "en/claude-apps-gateway-config.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/claude-apps-gateway-config.md"
sourceSha256: "3257bfe37d57f4673a2bd0a0cd20daf9780ff3a718ac81280970d97368c04245"
pageSha256: "05551c842383a36dcbb4901cf2f5a48e71033f3f9f8ce9ddfa4244c3afc6a2d0"
contentMode: "local-full"
zh: ""
---

## Optional sections

### `admin`

Optional. Enables `/v1/organizations/spend_limits`, which mirrors Anthropic's public Admin API, and per-developer spend enforcement on `/v1/messages`. See [Spend limits](https://code.claude.com/docs/en/claude-apps-gateway-spend-limits) for how caps are set and enforced; this section covers the `gateway.yaml` keys that turn the feature on and tune it.

```yaml theme={null}
admin:
  # Named static API keys for the admin endpoints, sent as x-api-key.
  # The id appears in the audit log as admin-key:<id> so each key is
  # attributable. Array for rotation: add the new key, roll clients,
  # remove the old.
  write_keys:
    - { id: terraform, key: "${GATEWAY_ADMIN_WRITE_KEY_TF}" }
    - { id: ci,        key: "${GATEWAY_ADMIN_WRITE_KEY_CI}" }
  read_keys:
    - { id: reporting, key: "${GATEWAY_ADMIN_READ_KEY}" }
  # IdP groups granted full admin via the normal gateway JWT (no API key).
  admin_groups: [platform-finops]
  blocked_message: request an increase at https://go.example.com/claude-limits
```

| Field                     | Required | Description                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `write_keys`              | No       | Array of `\{id, key\}`. An `x-api-key` matching one of these can list, set, and delete spend limits. Key values must be at least 32 characters; `id`s must be unique across `read_keys` and `write_keys`.                                                                                                                                                      |
| `read_keys`               | No       | Array of `\{id, key\}`. Read-only: every `GET` endpoint, including listing caps, fetching one by ID, and reading [`/effective`](https://code.claude.com/docs/en/claude-apps-gateway-spend-limits#/effective) and [`/audit`](https://code.claude.com/docs/en/claude-apps-gateway-spend-limits#/audit).                                                                                                              |
| `admin_groups`            | No       | IdP group names. A gateway JWT whose `groups` claim includes one of these has full admin access, read and write, and audits as `oidc:<sub>`. Use this for human admins; use API keys for machines. An empty entry in this list stops the gateway at boot. See [Matcher values that stop the gateway at boot](#matcher-values-that-stop-the-gateway-at-boot). |
| `blocked_message`         | No       | Appended verbatim to the `429 billing_error` a blocked developer sees. Write the whole instruction, such as a URL or a Slack channel. When unset, the gateway sends only the default message. See [How enforcement works](https://code.claude.com/docs/en/claude-apps-gateway-spend-limits#how-enforcement-works).                                                                       |
| `audit_retention_days`    | No       | Default `365`. Older `admin_audit` rows are swept.                                                                                                                                                                                                                                                                                                           |
| `spend_retention_months`  | No       | Default `13`. `spend` counter rows older than this are swept. The default keeps a full year plus the current partial month for year-over-year reporting.                                                                                                                                                                                                     |
| `identity_retention_days` | No       | Default `90`. Last-seen TTL for `principal_emails` rows, which hold each developer's email, display name, and groups (PII). Deliberately shorter than spend retention so a deprovisioned identity ages out while its anonymous spend counters remain.                                                                                                        |
| `group_limit_mode`        | No       | `min` (default) or `max`. When a developer is in several groups with caps, `min` enforces the most restrictive and `max` the least. Used by both enforcement and `/effective`.                                                                                                                                                                               |

### `enforcement`

The `enforcement` block controls how spend-limit checks behave when the store is unavailable.

| Field                  | Required | Description                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fail_closed_on_error` | No       | Default `false`. Spend enforcement fails open on a Postgres outage, so inference stays up. Set `true` to fail closed: over-cap developers are blocked, but so is everyone else if the store is unreachable. Requires an [`admin:`](#admin) block: spend enforcement only runs when `admin` is configured, and the gateway refuses to start if you set this `true` without one. |

### `pricing`

The `pricing` block tells the spend meter what to charge instead of USD list price, so caps and [`/effective`](https://code.claude.com/docs/en/claude-apps-gateway-spend-limits#/effective) reflect your contracted rates. Amounts stay in USD and remain an estimate, not an invoice. Two prerequisites:

* Claude Code v2.1.227 or later on the gateway server. Earlier versions reject the unknown key at boot.
* An [`admin:`](#admin) block or, in v2.1.268 or later, a [`managed:`](#managed) block with at least one policy. The gateway refuses to start with `pricing` set and neither block, because nothing would read it.

```yaml theme={null}
pricing:
  multiplier: 0.85
  overrides:
    - upstream: bedrock-eu
      model: claude-sonnet-4-6
      input: 3.30
      output: 16.50
      cache_read: 0.33
      cache_write: 4.125
```

| Field        | Required | Description                                                                                                                                                                |
| ------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `multiplier` | No       | Default `1`. The meter multiplies every metered amount by this, whether list-priced or overridden, so `0.85` bills 85% of the price. Must be greater than 0 and at most 1. |
| `overrides`  | No       | Rows of `\{upstream, model, input, output, cache_read, cache_write\}` in USD per million tokens. All four rates are required. Each must be greater than 0 and at most 10000. |

How the meter matches an override row:

* A row replaces list price for requests that `upstream`, an [`upstreams[].name`](#upstreams), serves for `model`. That includes the higher [fast mode](https://code.claude.com/docs/en/fast-mode#understand-the-cost-tradeoff) rate, so fast and standard requests meter at the same four rates.
* A built-in ID such as `claude-sonnet-4-6`, matched like [`models[].id`](#models), covers every dated form, regional Amazon Bedrock form, or Google Cloud's Agent Platform form the meter prices as that model. Any other string, such as an alias or an inference-profile ARN, matches the ID the client sent or the string sent upstream, case-insensitively.
* Where rows overlap, the meter picks the most specific row rather than the first row: a row whose `model` is the exact model string sent upstream, then a row matching the exact ID the client sent, then a row naming the built-in model.
* An unknown upstream name fails boot, and so do two rows for one upstream that name the same model, including two spellings of one built-in model. The gateway warns at boot about a row no requestable model can use.
* Web-search requests stay at the \$0.01 list price; the multiplier still applies to them.

For per-region rates, give each region its own named upstream and one row per upstream.

#### Send the rates to signed-in clients

With v2.1.268 or later on the gateway server, the gateway also puts the rates from `pricing` into the [`managed`](#managed) policies it serves, as the [`modelPricing`](https://code.claude.com/docs/en/settings-reference#modelpricing) managed setting. Developers matched by a policy then see the `pricing` rates for the first upstream that serves each model ID in `/usage`, the status line, and OpenTelemetry. A developer who matches no policy receives no managed settings, so their figures stay at list price. Clients apply the setting in Claude Code v2.1.242 or later.

* What the gateway adds: unless a policy's `cli` block already sets `modelPricing`, the gateway adds the `multiplier` and, for every model ID a client can request, the override row of the first upstream that serves that ID. A rate that only a failover upstream charges stays on the gateway.
* Opt one policy out: set `modelPricing` to `\{\}` in that policy's `cli` block, and its developers stay at list price.
* Keep a policy's own rates: a policy whose `cli` block sets `modelPricing` with its own `multiplier` or `overrides` keeps that `modelPricing` whole, and the gateway adds no rates of its own to it.

### `models`

The `models` block is an optional admin-curated model list, served at `/v1/models` and used to translate model IDs per upstream. It is required for non-US Amazon Bedrock regions, Amazon Bedrock provisioned-throughput ARNs, and Microsoft Foundry deployment names.

```yaml theme={null}
auto_include_builtin_models: true   # false: expose only the list below
models:
  - id: claude-opus-4-8
    label: Claude Opus 4.8
    # description: optional text shown in clients that surface it
    upstream_model:
      anthropic: claude-opus-4-8
      bedrock: us.anthropic.claude-opus-4-8   # or an inference-profile ARN
      foundry: your-opus-deployment-name
```

Each key under `upstream_model` must match the `name` of a configured upstream, which defaults to the provider name. A key that matches no upstream fails boot, so omit the lines for providers you don't use.

### `managed`

The `managed` block defines role-based access policies keyed on IdP groups or email domain. Policies are evaluated in order; the first match is selected, then merged onto the `match: \{\}` catch-all base described below. They are served per-user at `GET /managed/settings` with ETag/304 caching.

```yaml theme={null}
managed:
  policies:
    # Specific groups first.
    - match: { groups: [eng-contractors] }
      cli:
        availableModels: [claude-sonnet-4-6]
        permissions: { deny: ["WebFetch", "WebSearch"] }
    # Default catch-all last: matches everyone who authenticated.
    - match: {}
      cli:
        availableModels: [claude-opus-4-8, claude-sonnet-4-6, claude-haiku-4-5]
```

A `match: \{\}` catch-all, conventionally listed last, is treated as a base layer. Every other policy inherits any key it doesn't set from the catch-all, so per-role entries only need to list what differs from the org default. The merge rules depend on the key type:

* **Allow-lists**: `availableModels` and `permissions.allow`. A specific policy's list fully replaces the base's.
* **Deny-lists and hook arrays**: `permissions.deny`, `permissions.ask`, `disabledMcpjsonServers`, `deniedMcpServers`, `blockedMarketplaces`, and every `hooks` event-type array. These take the union of base and policy, so an org-wide deny or audit hook can't be accidentally dropped by a per-role override.
* **Record-typed keys**: `env`, `modelOverrides`, and `skillOverrides`. These shallow-merge, so a per-role `env` block overrides keys it sets and inherits the rest from the base.

`availableModels` is also enforced server-side at `/v1/messages`, so a denied model returns `400` regardless of what the client sends.

The gateway validates the `model` value itself before it relays a request, so a malformed value never reaches an upstream. It rejects the request with a `400` in two cases:

* When the value is missing or empty, the gateway rejects the request with the message `model is required`. That check requires a gateway running Claude Code v2.1.228 or later.
* When the value is present but isn't a string, the gateway rejects the request with the message `model must be a string`. Requires a gateway running Claude Code v2.1.221 or later.

| Matcher                                             | Behavior                                                                                                                         |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `match: \{\}`                                         | Matches every authenticated user. Start with one of these and add group-scoped policies above it later.                          |
| `match: \{ groups: [a, b] \}`                         | Matches if the JWT's `groups` claim contains any of the listed groups. Case-sensitive: groups must match the IdP's exact casing. |
| `match: \{ email_domain: example.com \}`              | Matches the part after the last `@` in the JWT's `email` claim, case-insensitive. Accepts one domain per policy.                 |
| `match: \{ groups: [a], email_domain: example.com \}` | Both conditions must match                                                                                                       |

An authenticated user who matches no policy gets the gateway's defaults, which means every model in the catalog and no managed settings. Add a `match: \{\}` catch-all last if you want a guaranteed default policy.

  The gateway keeps no user directory of its own. It authorizes each request from the user's IdP token, reading group membership from the token's `groups` claim and evaluating policies against it. There is no roster to enumerate and no accounts to pre-create, and therefore no SCIM endpoint, because there is nothing for SCIM to sync into.

  Run user and group lifecycle management at the source of truth, which is your IdP's native SCIM provisioning or a dedicated identity-governance platform. Membership and deprovisioning governed there flow into the gateway automatically through the token. If you want SCIM provisioning of Claude accounts themselves, that is a [Claude for Enterprise](https://code.claude.com/docs/en/admin-setup) capability.

  Two propagation clocks apply:

  * **Policy contents**: editing a policy and redeploying reaches connected clients on their next managed-settings poll, within an hour, apart from the [changes that apply only at the next launch](https://code.claude.com/docs/en/server-managed-settings#fetch-and-caching-behavior)
  * **Group membership**: changing a user's group membership changes which policy matches them. This takes effect on the next session re-mint, meaning the next silent refresh, bounded by `session.ttl_hours`.

#### Matcher values that stop the gateway at boot

At boot, the gateway checks the `match` block of every policy and the [`admin_groups`](#admin) list. Any of these values stops the gateway with an error that names the field:

* An empty `groups` list
* An empty entry in `groups` or in `admin_groups`
* An empty `email_domain`
* An `email_domain` that contains `@`, whitespace, or a comma. The gateway trims the value and strips one leading `@` before this check. Write one bare domain, such as `example.com`.

Before v2.1.232, the gateway started with these values. Each value had this effect:

* An empty `email_domain`: the gateway skipped the domain check, so a policy with an empty `email_domain` and no `groups` list matched every authenticated user
* An empty `groups` list: the policy matched no one
* An `email_domain` containing `@`, whitespace, or a comma: the policy matched no one
* An empty entry in `groups` or in `admin_groups`: the entry matched a user only when that user's IdP `groups` claim also contained an empty entry. In `admin_groups`, that match granted admin access. If your `admin_groups` list never contained an empty entry, no one gained admin access this way.

#### What goes in `cli`

Each `cli` value is a complete Claude Code `managed-settings.json` document, the same schema you would deploy via MDM or `/etc/claude-code/managed-settings.json`, expressed here as YAML. The CLI applies the delivered document at the managed tier, above user and project settings, in place of server-managed settings. It therefore ignores the settings [restricted to OS-level policy sources](https://code.claude.com/docs/en/server-managed-settings#current-limitations), such as `policyHelper` and `wslInheritsWindowsSettings`.

The gateway validates each document against the CLI's settings schema at boot, so an unrecognized top-level key fails boot with an error naming every offending key. Deliberately open parts of the schema still accept arbitrary values, because newer clients may recognize entries the gateway's schema doesn't. These open keys are `env`, `pluginConfigs`, and keys nested under `permissions`.

Because validation uses the schema bundled with the gateway's installed version, putting a top-level settings key introduced by a newer Claude Code release into managed config requires upgrading the gateway first. Smoke-test a new policy on one client before rolling it out.

The full key reference is in [Claude Code settings](https://code.claude.com/docs/en/settings-reference#all-settings). The keys most operators reach for first:

```yaml theme={null}
managed:
  policies:
    - match: {}
      cli:
        # Model access (also enforced server-side at /v1/messages)
        availableModels: [claude-opus-4-8, claude-sonnet-4-6, claude-haiku-4-5]

        # Permission policy
        permissions:
          deny:
            - "WebFetch"
            - "Read(./.env)"
            - "Read(./secrets/**)"
          disableBypassPermissionsMode: disable   # blocks --dangerously-skip-permissions
        allowManagedPermissionRulesOnly: true     # ignore user/project permission rules

        # Environment pushed into the CLI process. DISABLE_UPDATES blocks
        # background and manual updates; DISABLE_AUTOUPDATER stops only
        # background updates.
        env:
          DISABLE_UPDATES: "1"                    # pin versions via your own distribution

        # Org-wide hooks. Hook commands run on developer machines, not the
        # gateway, so the path must exist on every client OS in the policy.
        hooks:
          PostToolUse:
            - matcher: "Edit|Write"
              hooks:
                - { type: command, command: /usr/local/bin/audit-edit.sh }
```

| Key                                        | Enforced by   | Effect                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `availableModels`                          | Gateway + CLI | Model allowlist. Also checked at `/v1/messages`, so a patched client can't bypass it.                                                                                                                                                                                                                                                                       |
| `permissions.allow` / `.deny`              | CLI           | Tool and command rules. See [Permissions](https://code.claude.com/docs/en/permissions).                                                                                                                                                                                                                                                                                                 |
| `permissions.disableBypassPermissionsMode` | CLI           | Set to `disable` to block [`bypassPermissions`](https://code.claude.com/docs/en/permission-modes#skip-all-checks-with-bypasspermissions-mode), the mode that skips permission prompts, and the `--dangerously-skip-permissions` flag                                                                                                                                                    |
| `allowManagedPermissionRulesOnly`          | CLI           | When `true`, managed settings become the only settings source of permission rules. The [`allowManagedPermissionRulesOnly`](https://code.claude.com/docs/en/settings-reference#allowmanagedpermissionrulesonly) entry lists every source Claude Code then ignores.                                                                                                                       |
| `env`                                      | CLI           | Environment variables merged into the CLI process. Use for telemetry, auto-update, and model-name overrides.                                                                                                                                                                                                                                                |
| `hooks`                                    | CLI           | Org-wide [hooks](https://code.claude.com/docs/en/hooks)                                                                                                                                                                                                                                                                                                                                 |
| `managedMcpServers`                        | CLI           | Remote MCP servers [provided to every matching developer](https://code.claude.com/docs/en/managed-mcp#provide-servers-through-managed-settings) alongside the servers they add themselves, `http` and `sse` only. See [MCP servers in a policy](#mcp-servers-in-a-policy). Requires Claude Code v2.1.259 or later on the gateway server and on clients. Earlier clients ignore the key. |

Because these settings arrive over the network, the CLI shows each developer a security approval dialog before applying the settings listed below:

* `hooks`
* `env` variables that require the developer's approval, such as proxy and base-URL variables
* shell-execution settings such as `apiKeyHelper` and `statusLine`
* the sandbox binary settings `sandbox.bwrapPath`, `sandbox.socatPath`, and `sandbox.ripgrep`
* Sandbox settings that intercept traffic, inject credentials, or weaken isolation, such as `sandbox.network.tlsTerminate` and the proxy port settings. [Security approval dialogs](https://code.claude.com/docs/en/server-managed-settings#security-approval-dialogs) lists them all.

[Approval memory](https://code.claude.com/docs/en/server-managed-settings#approval-memory) covers how long an approval lasts and when the dialog appears again.

Claude Code applies some delivered `env` variables without showing the developer the approval dialog, such as model selection settings and numeric limits. Other delivered variables can require the developer's approval before they take effect; a non-empty proxy, base-URL, or `OTEL_EXPORTER_OTLP_ENDPOINT` value always does. When a delivered variable needs approval, the dialog names it.

[Environment variables and the approval dialog](https://code.claude.com/docs/en/server-managed-settings#environment-variables-and-the-approval-dialog) has the details, including four privacy toggles whose delivered value decides whether they need approval. Before v2.1.218, Claude Code applied fewer variables without asking the developer, so more delivered variables triggered the dialog.

The gateway's [telemetry](#telemetry) configuration pushes `OTEL_EXPORTER_OTLP_ENDPOINT`, so setting `telemetry.forward_to` triggers the dialog on each interactive client. The dialog protects the developer's machine from a compromised or hostile gateway, not the organization from the developer.

A non-interactive run with the `-p` flag can't show the dialog. It applies the pushed settings for that run only and doesn't record them as approved, so the developer's next interactive session still shows the dialog. Before v2.1.207, a non-interactive run saved the settings as approved and no later interactive session showed the dialog for them.

If a developer declines, Claude Code exits that session rather than applying the policy. When you push a new hook, or any env var that triggers the dialog, to a broad policy, Claude Code therefore shows the dialog to every matching developer. It shows the dialog in a running session on the next hourly poll, and otherwise at the developer's next startup.

The `cli` key was named `settings` in earlier releases. That spelling is still accepted as an alias, but new deployments should use `cli`.

#### MCP servers in a policy

To provide MCP servers to the Claude Code clients a policy matches, set [`managedMcpServers`](https://code.claude.com/docs/en/managed-mcp#provide-servers-through-managed-settings) in that policy's `cli` block. You need Claude Code v2.1.259 or later on the gateway server and on clients.

The gateway checks each entry at boot with [the same rules Claude Code applies on the client](https://code.claude.com/docs/en/managed-mcp#what-an-entry-can-contain), and if an entry fails a check, the gateway refuses to start and names the entry.

If you write a `$\{VAR\}` reference in `gateway.yaml`, the gateway resolves it from its environment at boot through [secret expansion](#secret-expansion) before it runs the entry checks, so every matching client receives the literal value and can read it. The [header guidance for provided servers](https://code.claude.com/docs/en/managed-mcp#provide-servers-through-managed-settings) applies to the expanded value.

The gateway rejects the `.mcp.json` spelling `mcpServers` in a `cli` block, and its boot error names `managedMcpServers` as the key to use. Before v2.1.259, the gateway rejected any MCP server definition in a `cli` block.

#### Claude Desktop overlay

If your organization also deploys [Claude Desktop](https://code.claude.com/docs/en/desktop), the same gateway serves both clients. Point `bootstrapUrl`, in Claude Desktop's [managed configuration](https://claude.com/docs/third-party/claude-desktop/configuration), at `<listen.public_url>/user/bootstrap`. Claude Desktop derives the OAuth issuer from that URL, runs the same device-code sign-in against this gateway, and fetches its configuration from the response.

  Requires Claude Code v2.1.203 or later on the gateway server, and an explicit opt-in: `/user/bootstrap` returns 404 unless the policy matching the user carries a `desktop` key. An empty `desktop: \{\}` opts a policy in, and a `desktop` key on the `match: \{\}` base layer opts in every policy that inherits it. The audit log records each request as `desktop_bootstrap.serve` or `desktop_bootstrap.denied`.

The gateway derives much of the response from the matched policy's `cli` block and from top-level gateway config:

* The model list, from `availableModels`
* Disabled tools, from bare tool-name `permissions.deny` entries. If you set `disabledBuiltinTools` in the policy's `desktop` block, the gateway serves the union of your value and the derived list, so you can disable more tools this way but can't re-enable one you disabled through `permissions.deny`
* The egress allowlist, from `sandbox.network.allowedDomains`. If you set `coworkEgressAllowedHosts` in the policy's `desktop` block, the gateway uses that value instead of the derived list
* An OTLP endpoint that points at the gateway itself, and the signed-in user's identity attributes. The gateway relays the exports it receives at that endpoint to your `forward_to` destinations. It includes the endpoint and the attributes when you set both [`telemetry.forward_to`](#telemetry) and `listen.public_url`.

  Claude Desktop exports every signal with one encoding: `http/protobuf`, or `http/json` when you set `OTEL_EXPORTER_OTLP_PROTOCOL` or one of its per-signal variants to `http/json` in the policy's `env`. Before Claude Code v2.1.261 on the gateway server, the response set `http/json` regardless, so a collector that accepts only protobuf rejected Claude Desktop's exports

To set `disabledBuiltinTools`, `coworkEgressAllowedHosts`, or Claude Desktop's own `managedMcpServers` setting in a policy's `desktop` block, you need Claude Code v2.1.232 or later on the gateway server. Claude Desktop's `managedMcpServers` takes an array value rather than an object.

The gateway omits keys with no Claude Desktop equivalent, such as `hooks` and scoped permission rules like `Bash(npm *)`, from the bootstrap response.

Add the optional `desktop` block alongside `cli` to set Claude Desktop settings directly. Write settings from Claude Desktop's [managed configuration reference](https://claude.com/docs/third-party/claude-desktop/configuration) as flat key names. Leave out keys Claude Desktop reads only from MDM or local files, such as `bootstrapUrl`; the gateway rejects them at boot. Before v2.1.232, the gateway accepted a fixed list of 11 feature-gate keys, such as `chatTabEnabled` and `disableAutoUpdates`, and rejected every other key at boot. Before v2.1.227, the gateway also rejected `chatTabEnabled` and `chatAdvancedFileAnalysisEnabled` at boot.

```yaml theme={null}
managed:
  policies:
    - match: { groups: [eng-contractors] }
      cli:
        availableModels: [claude-sonnet-4-6]
      desktop:
        isLocalDevMcpEnabled: false
        disableAutoUpdates: true
        banner: { text: "Contractor build: internal use only" }
```

Every key is optional; Claude Desktop applies its own default for any key you omit. The gateway validates each `desktop` block at boot against the configuration schema Claude Desktop itself uses, so a mistake surfaces at gateway start as an error naming the key rather than reaching every connected desktop. The gateway fails at boot when a block contains:

* An unknown key
* A recognized key whose value Claude Desktop would reject or silently drop, such as an empty value or a misspelled sub-key inside a nested entry. Before v2.1.260, the gateway silently dropped a misspelled field inside a nested object of a `managedMcpServers` or `orgPluginSettings` entry instead of failing at boot.
* A key the gateway computes itself: the inference connection, the model list, and the OTLP relay. Configure those through [`upstreams`](#upstreams), [`models`](#models), and the [`telemetry`](#telemetry) section's `forward_to`.
* A legacy alias of a current key. In the boot error, the gateway names the canonical key to write.

If you use a deprecated value or entry shape, such as a `managedMcpServers` entry without `transport`, the gateway starts and logs a warning that names the replacement.

The gateway validates a `desktop` block against the schema bundled with its installed version, as it does the `cli` block. To deliver a setting introduced by a newer Claude Desktop release, upgrade the gateway first. For example, `userPluginMarketplacesEnabled` and `userPluginUploadsEnabled` need Claude Code v2.1.260 or later on the gateway server and Claude Desktop 1.37937.0 or later on members' machines.

If you set `orgPluginSettings` in a policy's `desktop` block, the gateway serves it in the array form that Claude Desktop 1.15200.0 and later reads. Older desktops ignore the array and enforce no plugin tool policy, so update members to 1.15200.0 or later before you rely on it.

The gateway fills in keys a policy's `desktop` block doesn't set from the `match: \{\}` catch-all's `desktop` block, the same way it fills in a policy's `cli` block from the base. If you set `disabledBuiltinTools` or `builtinToolPolicy` in both the base and a role policy, the gateway keeps the base's restriction:

* `disabledBuiltinTools`: the gateway uses the union of the base's list and the policy's list
* `builtinToolPolicy`: if you set a tool to a value other than `allow` in the base, the gateway keeps that value even if you set `allow` for the same tool in a role policy

For every other key, if you set it in the role policy, the gateway uses the role policy's value. The gateway replaces an array or a nested object such as `banner` whole, so if you set `banner.text` in a role policy, the gateway drops the base's `banner.backgroundColor`.

If you don't deploy Claude Desktop, leave `desktop` out of your policies entirely; the gateway then returns 404 from `/user/bootstrap` for every user.

#### Precedence with other managed sources

If a device also has an MDM-delivered policy or a local `managed-settings.json`, gateway-delivered settings rank first. [Precedence within the managed tier](https://code.claude.com/docs/en/managed-settings#precedence-within-the-managed-tier) on the managed settings page says when the local sources apply, and has the [keys Claude Code reads from every admin source](https://code.claude.com/docs/en/managed-settings#keys-read-from-every-admin-source) regardless of which source it selected, such as the sandbox lock keys, `forceRemoteSettingsRefresh`, and the per-variable `env` merge. A [`policyHelper`](https://code.claude.com/docs/en/settings-reference#policyhelper) configured in an MDM profile or the managed settings file runs only when the gateway delivers no settings; the entry says what its output replaces.

Embedding hosts such as [Claude Desktop](https://code.claude.com/docs/en/desktop) can supply policy through the SDK `managedSettings` option. [Parent settings from embedding hosts](https://code.claude.com/docs/en/managed-settings#parent-settings-from-embedding-hosts) says when Claude Code applies it, and [Restrict parent settings](https://code.claude.com/docs/en/claude-apps-gateway#restrict-parent-settings) lists which allow-direction settings still apply without the `allowManaged*Only` locks.

Gateway policies apply to every Claude Code invocation on the machine, including non-interactive `claude -p` runs and sessions spawned by the Agent SDK. If the gateway is unreachable at startup, signed-in sessions exit with an error rather than running without their policy.

### `telemetry`

The CLI sends metrics, logs, and, when enabled, traces to the gateway, which relays them verbatim to each configured destination. The exports use OpenTelemetry Protocol (OTLP) over HTTP. To skip the relay and have sessions export straight to your collector, [name the collector in a policy](#export-directly-to-your-collector). See [Monitoring usage](https://code.claude.com/docs/en/monitoring-usage) for the metrics and events the CLI emits.

The CLI stamps each export with the authenticated user's identity, read from the gateway-issued JWT: the `user.id`, `user.email`, and `user.groups` attributes. Per-developer cost and usage attribution therefore works with no developer-side configuration.

[Claude Desktop](#claude-desktop-overlay) and Cowork sessions signed in through the gateway stamp their telemetry with `user.email` and `user.groups` alongside `enduser.id`, so you can cover terminal, Desktop, and Cowork usage with one query on `user.email` or `user.groups`. `user.groups` is the comma-separated IdP group list.

Like all OpenTelemetry data from Claude Code, these attributes go only to destinations your organization configures, never to Anthropic.

If a user's group list is longer than 255 characters once percent-encoded, or a group name contains a comma or equals sign, the gateway leaves `user.groups` off that user's Desktop and Cowork telemetry rather than truncating it. That user's terminal sessions still carry the full list.

You need Claude Code v2.1.265 or later on the gateway server for `user.email` and `user.groups` on Desktop and Cowork telemetry, and Claude Desktop 1.24012 or later on each developer's machine for `user.groups`.

```yaml theme={null}
telemetry:
  forward_to:
    - url: https://otel-collector.internal.example.com
      headers:
        Authorization: ${OTLP_TOKEN}
      # Per-signal opt-in. Default: metrics only.
      metrics: true
      logs: false
      traces: false
    - url: https://api.datadoghq.com/api/v2/otlp
      headers:
        DD-API-KEY: ${DD_API_KEY}
```

  Each destination opts into `metrics`, `logs`, and `traces` independently, and the default is metrics only. The signals differ in sensitivity:

  * **Metrics**: aggregate counters such as token counts, request counts, and latency
  * **Logs and traces**: can carry full bash commands, tool inputs, and file paths, covering anything Claude Code does on a developer's machine

  Enable logs and traces only on destinations with the access controls and retention policy that data warrants.

Each `forward_to` URL must use `https://`, with one exception for a collector on the gateway's own loopback interface:

* `http://localhost:<port>` passes config validation, but the [SSRF guard](https://code.claude.com/docs/en/claude-apps-gateway-deploy#threat-model-summary) blocks every export with `ECONNREFUSED_SSRF` unless you set `CLAUDE_GATEWAY_ALLOW_LOOPBACK=1` in the gateway's environment
* `http://127.0.0.1:<port>` or `http://[::1]:<port>` fails boot unless that variable is set

For an in-cluster collector, expose it over HTTPS at its own internal address, or run it as a sidecar with the variable set.

Telemetry is off in the CLI by default. When you set both `telemetry.forward_to` and `listen.public_url`, the gateway turns it on for connected clients by pushing six environment variables through `/managed/settings`:

* `CLAUDE_CODE_ENABLE_TELEMETRY=1`
* `OTEL_METRICS_EXPORTER`, `OTEL_LOGS_EXPORTER`, and `OTEL_TRACES_EXPORTER`, each set to `otlp` if at least one `forward_to` destination enables that signal and to `none` otherwise
* `OTEL_EXPORTER_OTLP_ENDPOINT=<public_url>`
* `OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf`

Before Claude Code v2.1.265 on the gateway server, the gateway pushed all three exporter selectors as `otlp`, including for signals no destination opted into.

The pushed endpoint is built from the public URL, so metrics and logs need no OTEL configuration from developers or policies.

Developers signed in through `/login` can't redirect exports with their own OTEL configuration:

* **Locally set variables**: Claude Code applies the pushed variables at the managed tier, so each one overrides the value a developer sets for it locally.
* **Locally configured endpoints**: with OTLP/HTTP export enabled, the CLI ignores any locally configured endpoint, whether or not the gateway pushed the telemetry variables. Its exports go to the gateway unless a policy [names your collector as the endpoint](#export-directly-to-your-collector).

Without a `forward_to` destination for a signal, the gateway accepts and discards it. If developers already export Claude Code telemetry to one of your collectors, add it as a `forward_to` destination, with logs or traces enabled if they export those, so it keeps receiving their data after they sign in. To skip the relay instead, [name the collector in a policy](#export-directly-to-your-collector).

[Traces](https://code.claude.com/docs/en/monitoring-usage#traces-beta) also require `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` on each client. Set it in a managed policy's `env` block, since the gateway doesn't push it. Developers approve it in the same [security approval dialog](#managed) that the pushed endpoint already triggers.

Set it to `1` only in the policies whose groups you want traced. A policy that doesn't set it inherits the value from your `match: \{\}` catch-all policy if that policy sets one, per the [merge rules](#managed). To keep a group's clients from sending traces even when a developer sets the variable locally, set it to `0` in that group's policy.

Both protobuf and JSON OTLP encodings are relayed, and any OpenTelemetry-compatible backend works as a destination.

#### Export directly to your collector

To have sessions signed in through `/login` send telemetry straight to your collector instead of through the relay, set `OTEL_EXPORTER_OTLP_ENDPOINT` to the collector's `https://` base URL in the `env` block of a [managed policy](#managed). Claude Code appends `/v1/metrics`, `/v1/logs`, or `/v1/traces` to the URL you set, such as `https://otel-collector.example.com:4318`, and exports each signal there over OTLP/HTTP. Requires Claude Code v2.1.265 or later on each developer's machine. Earlier clients export through the relay.

To authenticate to the collector, set `OTEL_EXPORTER_OTLP_HEADERS` in the same `env` block. Sessions never send the developer's gateway session token to a collector named this way.

When you add or change this endpoint in a policy, Claude Code asks each developer to approve it in the [security approval dialog](#managed) before applying it in an interactive session.

Claude Code checks the endpoint before it exports a signal directly, and keeps that signal on the relay when a check fails. The checks include:

* The endpoint comes from the gateway itself. If you set the same variable in an MDM profile or a local `managed-settings.json`, exports stay on the relay.
* The URL uses `https://`, or `http://` to a loopback address
* The URL resolves to a path ending in `/v1/<signal>`, with no query or fragment. Claude Code builds that path itself from the generic variable. It uses a per-signal variable such as `OTEL_EXPORTER_OTLP_METRICS_ENDPOINT` as written, so include the full path there.
* The URL isn't the gateway's own host. An endpoint addressed to the gateway keeps the relay path and its session token.
* Neither you nor the developer has configured [`otelHeadersHelper`](https://code.claude.com/docs/en/settings-reference#otelheadershelper) in any settings source. With a helper configured, every signal stays on the relay.

The endpoint you name changes only where exports go. You still choose which signals export at all with the `OTEL_*_EXPORTER` selectors.

The endpoint alone doesn't turn export on, so also set the variables that do, unless the gateway already pushes them:

* If the gateway already [pushes the telemetry variables](#telemetry), they cover enablement, selectors, and protocol, and your explicit endpoint overrides the pushed `<public_url>` value. Set an `OTEL_*_EXPORTER` selector to `otlp` yourself only for a signal that no `forward_to` destination enables.
* If it doesn't, also set `CLAUDE_CODE_ENABLE_TELEMETRY=1`, the `OTEL_*_EXPORTER` selectors, and `OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf`.

When the developer signs out, or signs in to a different gateway, exports to the collector stop and Claude Code drops each remaining batch rather than sending it.

#### When a destination fails

The gateway doesn't buffer, retry, or store telemetry, so it drops an export that doesn't reach a destination rather than delivering it late. Each destination succeeds or fails on its own, and the exporting client receives a success response either way, so a failed delivery appears only in the gateway's log.

After five consecutive failed deliveries to a destination, the gateway pauses forwarding to it in 30-second stretches, logging each pause, until a delivery succeeds. Any error response, timeout, or connection error counts as a failed delivery, except `400`, `413`, `415`, `422`, and `431`, which mean the collector refused that export's payload as malformed or too large.

A refused payload neither advances nor resets the failure count: the gateway keeps forwarding to the destination and logs a warning naming it and the status, on the destination's first refusal and every hundredth after.

### HTTP tuning

Four optional top-level blocks, `access_control`, `limits`, `timeouts`, and `rate_limits`, tune the HTTP surface. The defaults suit most deployments.

| Block            | Key                                            | Default  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------- | ---------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `access_control` | `allow_cidrs` / `deny_cidrs`                   | empty    | Inbound IP allow/deny by client address, after `trusted_proxies` resolution. `deny_cidrs` is checked first; a client it matches is rejected even if `allow_cidrs` also matches. If `allow_cidrs` is non-empty the gateway is default-deny. `/healthz` and `/readyz` are exempt from `allow_cidrs`. When a trusted proxy sends an `X-Forwarded-For` entry that isn't an IP address, the real client is unknown and the gateway logs a warning once naming what to check. Where either list applies to the request, it refuses it with `403` and audit reason `xff_unparseable`. Where neither does, it serves the request and uses the proxy's own address as the client IP for per-IP rate limits and audit. |
| `limits`         | `max_request_bytes`                            | 32 MiB   | Max inbound request body; oversize requests get `413` before the body is buffered. Raise for large file or image requests.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `limits`         | `max_request_header_bytes`                     | unset    | When set, oversize headers return `431`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `limits`         | `max_url_length`                               | unset    | When set, an over-long URL returns `414`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `timeouts`       | `upstream_ttfb_ms`                             | 120000   | Max wait for the upstream's response headers (time to first byte). The response body then streams with no wall-clock cap. Applies to the direct Anthropic upstream path; every other provider is bounded by its provider SDK's own timeout.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `rate_limits`    | `device_authorization.max` / `.window_seconds` | 30 / 600 | Per-IP rate limit on the unauthenticated device-authorization endpoint. Raise for a large org behind a shared egress IP or NAT. These limits apply only to the device-grant sign-in flow, not to `/v1/messages` inference. See [User-code brute-force resistance](https://code.claude.com/docs/en/claude-apps-gateway-deploy#user-code-brute-force-resistance).                                                                                                                                                                                                                                                                                                                                                                          |
| `rate_limits`    | `device_verify.max` / `.window_seconds`        | 10 / 600 | Per-IP rate limit on `user_code` submissions at `/device`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
