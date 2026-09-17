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
pageSha256: "ba4ff48d5b662e4b4d3bb4a8e81d7ba72d64d643fbbea9e583e061e9ce0c2484"
contentMode: "local-full"
zh: ""
---

## Required sections

### `listen`

The `listen` block controls where the gateway serves: the bind address and port, the externally visible origin, and optional TLS termination.

| Field                  | Required                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `host`                 | No                        | Bind address. Default `0.0.0.0`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `port`                 | No                        | Bind port. Default `8080`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `public_url`           | Unless `host` is loopback | The externally visible `https://` origin, used to build the IdP `redirect_uri` and discovery metadata. Required whenever `host` isn't a loopback address, whether TLS terminates at a proxy such as an ALB, Ingress, or Cloud Run or at the gateway itself through `tls`, because the gateway never derives its own origin from `X-Forwarded-*` headers; they are client-spoofable. Boot fails without it. `trusted_proxies` below governs client-IP resolution only. Also required to enable [telemetry](#telemetry), because the gateway builds the OTLP endpoint it pushes to clients from this URL. |
| `tls.cert` / `tls.key` | No                        | PEM paths if the gateway terminates TLS itself                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `trusted_proxies`      | No                        | CIDRs or IPs of load balancers in front of the gateway. When set, the gateway trusts `X-Forwarded-For` only from these peers and records the real client IP for per-IP rate limiting and audit. Equivalent to nginx `set_real_ip_from`. `X-Forwarded-For` entries written as `ipv4:port` or `[ipv6]:port`, as some load balancers do, are read with the port dropped. An IPv6 address with a port appended and no brackets may be read as a different address or not read at all, so turn off the port option on any proxy that writes that form.                                                       |

### `oidc`

The `oidc` block connects the gateway to your identity provider and decides who can sign in. It names the issuer and OAuth client, maps the claims that carry email and groups, and restricts sign-in by email domain or group.

OpenID Connect (OIDC) is the SSO protocol the gateway uses with your identity provider; see [Identity provider setup](https://code.claude.com/docs/en/claude-apps-gateway-deploy#identity-provider-setup) for what to register on the IdP side.

| Field                           | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `issuer`                        | Yes      | OIDC discovery base. Must serve discovery at `/.well-known/openid-configuration`. Use HTTPS in production; the gateway accepts an `http://` issuer. A loopback issuer such as `http://localhost:8081` is rejected by the [SSRF guard](https://code.claude.com/docs/en/claude-apps-gateway-deploy#threat-model-summary) unless `CLAUDE_GATEWAY_ALLOW_LOOPBACK=1` is set in the gateway's environment.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `client_id` / `client_secret`   | Yes      | From your OAuth client registration                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `allowed_email_domains`         | No       | Reject id\_tokens whose `email` claim isn't in one of these domains, case-insensitive. Defense-in-depth against multi-tenant IdP misconfiguration. Independent of this setting, an id\_token whose `email_verified` claim is explicitly `false` is always rejected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `allowed_groups`                | No       | Restrict sign-in to members of these IdP groups, matched against `groups_claim`. A user in an allowed email domain but in none of these groups is rejected. Requires the IdP to emit the groups claim. Matching is an exact, case-sensitive string comparison against the values in that claim, and the gateway doesn't expand nested groups: to admit members of a sub-group, list the sub-group here or configure the IdP to emit flattened membership.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `groups_claim`                  | No       | Which id\_token claim carries group membership. Default `groups`. Microsoft Entra emits app roles under `roles`. Accepts a flat key or an RFC 6901 JSON Pointer such as `/resource_access/gateway/roles` for nested claims.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `google_groups`                 | No       | Look up the signed-in user's groups through the Google Workspace Admin SDK Directory API, because Google's id\_token carries no groups claim. Set `service_account_json_path` to a service-account key file with domain-wide delegation on the `https://www.googleapis.com/auth/admin.directory.group.readonly` scope, and `admin_email` to a Workspace administrator the service account impersonates; the Directory API requires a real admin subject. Each user's group email addresses become their groups claim, so `allowed_groups` and `managed.policies.match.groups` match on group emails.                                                                                                                                                                                                                                                                                                                                                                                                            |
| `email_claim`                   | No       | Which id\_token claim carries the user's email. Default `email`. Some IdPs, such as ADFS and Entra B2C, emit `upn` or `preferred_username` instead. Accepts a flat key, a JSON Pointer, or a list of fallback keys where the first present key is used.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `scopes`                        | No       | Full override of the OIDC scopes the gateway requests. Default `[openid, profile, email, offline_access]`. Set when your IdP rejects scopes it doesn't recognize, or requires a custom scope to emit groups or email. Must include `openid`. Dropping `offline_access` disables refresh tokens, so developers re-run the browser login every `session.ttl_hours`. See [Identity provider setup](https://code.claude.com/docs/en/claude-apps-gateway-deploy#identity-provider-setup) for per-IdP scope recipes such as Google's refresh-token flow.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `scope_on_refresh`              | No       | Also send `scope`, with the same list as the sign-in request, when the gateway exchanges a refresh token. Default `false`: the refresh request omits `scope`. Most IdPs return an id\_token on every refresh and don't need this. Set `true` when your IdP returns an id\_token on refresh only if asked for `openid` again, which Okta documents for its refresh grant. Without an id\_token, every refresh depends on the IdP's userinfo endpoint accepting the refreshed access token. If you gate sign-in or match policies on groups and your IdP's refresh-time id\_token omits them, also set `userinfo_fallback: true` so the gateway fills them from the userinfo endpoint. An IdP that granted fewer scopes than requested can reject the refresh with `invalid_scope`, including for existing sessions if you add entries to `scopes` while this is on. Unset the key if refreshes start failing at `token_endpoint` after you set it. Requires Claude Code v2.1.260 or later on the gateway server. |
| `extra_auth_params`             | No       | Extra query parameters appended to the IdP authorization request, verbatim. This is the override mechanism for IdP-specific behavior, such as `access_type: offline` for Google refresh tokens, `domain_hint` for some Entra tenants, or `acr_values` for step-up flows. Cannot override the gateway-managed protocol params: `state`, `nonce`, `redirect_uri`, PKCE, `scope`, `response_type`, `response_mode`, and `client_id`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `userinfo_fallback`             | No       | When the id\_token omits email or groups, fetch them from `/userinfo`. Needed for Keycloak lightweight access tokens, the Okta org server, and ADFS minimal tokens. The id\_token stays authoritative; userinfo only fills gaps. Default `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `use_pkce`                      | No       | Send a PKCE (S256) challenge on the authorization request. Default `true`. Set `false` only if your IdP rejects PKCE for this confidential client.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `clock_skew_seconds`            | No       | Tolerate clock drift when validating id\_token time claims. Default `0`, which is strict. Raise if you see "token expired / not yet valid" errors right after sign-in due to host/IdP clock skew.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `token_endpoint_auth_method`    | No       | Override the token-endpoint auth method. Accepts `client_secret_basic` or `client_secret_post`. Auto-negotiated by default.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `id_token_signed_response_alg`  | No       | Expected id\_token signing algorithm. Default `RS256`. Set for IdPs that sign with ES256, PS256, or EdDSA.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `additional_authorized_parties` | No       | Extra `azp` values to accept beyond `client_id`, for Keycloak broker and token-exchange flows                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `discovery_url`                 | No       | Fetch the discovery document from this URL instead of deriving it from `issuer`, for IdPs behind a proxy that rewrites the issuer host. The path must contain `/.well-known/`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `use_proxy`                     | No       | Send the gateway's own IdP requests through the forward proxy in `HTTPS_PROXY` or `HTTP_PROXY`, honoring `NO_PROXY`. Unset or `false`, those requests go direct. Requires v2.1.227 or later; see [IdP requests through a forward proxy](#idp-requests-through-a-forward-proxy) below.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `form_action_origins`           | No       | Additional origins for the `/device` page's `Content-Security-Policy: form-action` directive. The gateway already allows `'self'` and the discovered `authorization_endpoint` origin, but Chrome enforces `form-action` against the entire redirect chain. If your IdP redirects through a second host, such as Azure AD federated to ADFS, hub-spoke Okta, or a corporate SSO interceptor, list every origin the authorization request may redirect through.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `ca_cert_pem`                   | No       | The PEM-encoded CA certificate itself, not a path to a file. It replaces the system trust store for IdP requests only. To load a mounted file, write `$\{file:/etc/gateway/idp-ca.pem\}`. Use for Keycloak or Dex behind corporate PKI.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

#### IdP requests through a forward proxy

The inference upstreams honor `HTTPS_PROXY` and `HTTP_PROXY` on every version. The gateway's own requests to the IdP, discovery, JWKS, token, and userinfo, go direct unless you set `oidc.use_proxy: true`, which requires v2.1.227 or later. When a proxy variable is set, `use_proxy` is unset, and the issuer isn't covered by `NO_PROXY`, the gateway keeps those requests direct and logs a notice at boot asking you to choose; `use_proxy: false` keeps them direct and silences the notice.

With `use_proxy: true`, the pod resolves each IdP endpoint's hostname itself and asks the proxy to `CONNECT` to the resolved IP address, so the proxy must accept `CONNECT` to the IP address of every host the discovery document names, not only the issuer. Use an `http://` proxy URL. `ca_cert_pem` and the [SSRF guard](https://code.claude.com/docs/en/claude-apps-gateway-deploy#threat-model-summary) apply on the proxied path as well.

### `session`

The `session` block shapes the bearer tokens the gateway mints after sign-in: the secret that signs them and how long they live.

| Field        | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jwt_secret` | Yes      | At least 32 bytes of entropy, for example from `openssl rand -base64 32`. Signs the gateway's HS256 bearer tokens. Accepts a single string or an array for rotation: index 0 signs and all entries verify. To rotate, prepend a new secret, wait `ttl_hours`, then drop the old one.                                                                                                                                  |
| `ttl_hours`  | No       | Gateway bearer token lifetime. Default `1`. The CLI silently refreshes before expiry when the IdP issues refresh tokens. A shorter lifetime deprovisions faster; a longer one makes fewer IdP round-trips. If your IdP can't issue refresh tokens because `offline_access` is unavailable, there is no silent refresh, so raise this to `8` or `12` to avoid sending developers back to the browser login every hour. |

### `store`

The `store` block points the gateway at its PostgreSQL database, which holds device grants and rate-limit counters.

| Field             | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `postgres_url`    | Yes      | `postgres://` or `postgresql://` URL. Required: the device-grant rendezvous, where the browser callback writes and the polling CLI reads, needs cross-replica state. The gateway runs its own schema migrations at boot and on upgrade, so the role needs rights to create and alter tables on the target schema. See [Upgrades](https://code.claude.com/docs/en/claude-apps-gateway-deploy#upgrades) and [Postgres](https://code.claude.com/docs/en/claude-apps-gateway-deploy#postgres). |
| `username`        | No       | Overrides the user in `postgres_url`                                                                                                                                                                                                                                                                                                                                                                                               |
| `password`        | No       | Database credential. Set it here rather than in `postgres_url` so the credential stays out of the URL. Accepts any characters and takes precedence over URL credentials.                                                                                                                                                                                                                                                           |
| `max_connections` | No       | Postgres connection-pool size per replica. Default `5`, which is conservative and friendly to shared databases. With [spend limits](#admin) enabled, the hot path does a few operations per inference request, so raise it for a dedicated database under load, and keep replicas × this below the database's `max_connections`.                                                                                                   |

For local development, point `postgres_url` at a throwaway Postgres container, for example `docker run --rm -p 5432:5432 -e POSTGRES_HOST_AUTH_METHOD=trust postgres`.

### `upstreams`

`upstreams` is an ordered list. The gateway forwards inference to the first upstream that resolves the requested model.

On `5xx`, `429`, `401`, `403`, `404`, or timeout the gateway fails over to the next upstream; other `4xx` doesn't, because those errors are attributable to the request rather than the upstream. A `401` or `403` means the gateway's own credential failed against that upstream. A `404` means that upstream doesn't serve the requested model, so a later upstream in the list still can.

If you set `forward_user_identity: true` on an upstream, a `429` it returns to a request that carried the developer's email doesn't fail over. See [how a per-user limit denial reaches the developer](#per-user-identity-headers-for-a-proxy-you-run).

Failover on `404` requires gateway v2.1.198 or later. Earlier releases returned the first `404` to the client even when a later upstream in the list served the model.

Multiple upstreams of the same provider must set a distinct `name:`.

Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, and Microsoft Foundry clients are built once at startup, and their SDKs refresh credentials internally, so rotating cloud credentials doesn't require a restart. Static Anthropic API keys and bearers are read at startup; see [Anthropic API](#anthropic-api).

#### Upstream error messages

The gateway returns one upstream's error response, or its own `502`, depending on how the upstreams answered:

* **An upstream returned a status the gateway doesn't [fail over](#multiple-upstreams) on**: that upstream's response. The gateway tries no further upstreams.
* **Every upstream the gateway tried failed in a way it [fails over on](#multiple-upstreams)**: the last `429`. When none returned a `429`, the gateway prefers, in order, the last `401` or `403`, the last `404`, and the last `501`. When none returned any of those, the gateway's own `502`, `all upstreams failed (N attempted)`, where N counts every entry in [`upstreams`](#upstreams), including entries the gateway skipped because they don't serve the requested model.

When the gateway returns an upstream's response, it keeps the upstream's status code. Whether it keeps the upstream's message depends on the provider. An Anthropic API upstream's error body reaches the developer unchanged.

The Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, and Microsoft Foundry upstreams can name your account IDs, role ARNs, and project IDs in their error text. The gateway records that full text in the [operational log](https://code.claude.com/docs/en/claude-apps-gateway-deploy#logs). What the developer sees from those upstreams depends on the rejection:

* `400` or `413` in Anthropic's standard error envelope: the upstream's own message, such as `prompt is too long`. Claude Platform on AWS, Agent Platform, and Microsoft Foundry return this envelope for model API rejections.
* `400` or `413` in the provider's own shape: a `capability_rejected:` token. When the gateway can't classify the rejection, `upstream rejected the request` on a `400` or `request too large for this upstream` on a `413`.
* Any other status: generic per-status copy, such as `upstream rate limit exceeded` on a `429`.

For example, the gateway replaces Amazon Bedrock's `Input is too long for requested model.` with `capability_rejected: prompt_too_long`. Claude Code [compacts automatically](https://code.claude.com/docs/en/errors#prompt-is-too-long) on that token, as it does on `prompt is too long`.

Keeping a cloud upstream's `400` or `413` message, or replacing it with a `capability_rejected:` token, requires gateway v2.1.233 or later.

#### Anthropic API

The minimal Anthropic upstream is an API key from the [Claude Console](https://platform.claude.com):

```yaml theme={null}
upstreams:
  - provider: anthropic
    auth:
      api_key: ${ANTHROPIC_API_KEY}
    # OR an OAuth bearer (e.g. a Workload-Identity-Federation-exchanged token):
    #   oauth_token: ${file:/var/run/secrets/anthropic-oauth-token}
    # base_url: https://api.anthropic.com   # default; override for a forward proxy
```

The two credential forms differ in the header they send:

* **`api_key`**: sends `x-api-key`. Rotate it in the Claude Console and update the env var.
* **`oauth_token`**: sends `Authorization: Bearer`. Use the bearer form when your org issues short-lived tokens instead of long-lived API keys. The bearer is read once at startup, so refresh by remounting the secret and restarting.

Instead of a static key or bearer, you can use Workload Identity Federation. Create a federation rule by following the [Workload Identity Federation guide](https://platform.claude.com/docs/en/manage-claude/workload-identity-federation), then mount your workload's OIDC JWT as a file, such as a Kubernetes projected service-account token or a CI platform's id-token. The gateway exchanges the JWT for a short-lived bearer and refreshes it automatically. The token file is re-read on every exchange, so rotated projected tokens are picked up without a restart.

```yaml theme={null}
upstreams:
  - provider: anthropic
    auth:
      federation_rule_id: ${ANTHROPIC_FEDERATION_RULE_ID}
      organization_id: ${ANTHROPIC_ORGANIZATION_ID}
      identity_token_file: /var/run/secrets/anthropic/id-token
      # workspace_id: wrkspc_...       # required if the rule covers >1 workspace
      # service_account_id: svac_...   # optional expected-target check
```

&lt;a id="per-user-identity-headers-for-a-proxy-you-run" />

##### Per-user identity headers for a proxy you run

You can point a `provider: anthropic` upstream's `base_url` at a proxy you run instead of at the Anthropic API. To tell that proxy which developer sent each request, set `forward_user_identity: true` on that upstream. The proxy can then attribute spend per developer. Requires a gateway running Claude Code v2.1.233 or later.

For example, for a proxy at `upstream-gateway.internal.example.com`:

```yaml theme={null}
upstreams:
  - provider: anthropic
    base_url: https://upstream-gateway.internal.example.com
    auth:
      api_key: ${PROXY_KEY}
    forward_user_identity: true        # default false
```

The gateway adds these headers to every request it forwards to that upstream.

| Header                        | Value                                                      |
| ----------------------------- | ---------------------------------------------------------- |
| `x-litellm-end-user-id`       | The developer's email, when the IdP supplied one.          |
| `x-claude-gateway-user-id`    | The developer's IdP subject, from the token's `sub` claim. |
| `x-claude-gateway-user-email` | The developer's email, when the IdP supplied one.          |

When the IdP token carries no email, the gateway sends only `x-claude-gateway-user-id` and omits the two email headers. If your IdP puts the email in a different claim, set [`oidc.email_claim`](#oidc) to that claim.

When your proxy answers `429` to a request that carried the developer's email, the gateway returns that response to the developer as-is instead of failing over to the next upstream, so your proxy's per-user budget or rate limit holds. The proxy's other responses follow the ordinary [failover rules](#upstreams). If a developer's IdP token carries no email, the gateway forwards their requests without the email headers, so a `429` to one of those requests counts as upstream capacity and fails over. Before v2.1.267 on the gateway server, every `429` failed over.

Set `forward_user_identity` only on an upstream whose `base_url` is a proxy you operate. The gateway sends developer emails to whatever server that `base_url` names. If the `base_url` is the Anthropic API, which is the default, the gateway refuses to start.

#### Amazon Bedrock

For the client-side Amazon Bedrock deployment that the gateway replaces or fronts, see [Claude Code on Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock). The gateway-side upstream:

```yaml theme={null}
upstreams:
  - provider: bedrock
    region: us-east-1
    auth: {}                           # preferred: AWS default credential chain
    # OR explicit credentials:
    # auth:
    #   aws_access_key_id: ${AWS_AKID}
    #   aws_secret_access_key: ${AWS_SK}
    #   aws_session_token: ${AWS_ST}
    # OR a Bedrock API bearer token:
    # auth:
    #   aws_bearer_token: ${AWS_BEARER_TOKEN}
    # Override the bedrock-runtime endpoint for FIPS or VPC-endpoint deployments:
    # base_url: https://bedrock-runtime-fips.us-east-1.amazonaws.com
```

An empty `auth` block uses the AWS SDK's default credential chain: env vars, `~/.aws/credentials`, ECS task role, EC2 instance metadata, or IRSA on EKS. In production, give the gateway pod an IAM role instead of embedding static keys in a container image.

Explicit credentials must be complete: the gateway fails at boot when `aws_access_key_id` and `aws_secret_access_key` aren't set together, or when `aws_session_token` is set without them. Before v2.1.207, a partial `auth:` block passed validation.

| Setup           | How                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| IAM permissions | Grant the gateway's principal `bedrock:InvokeModel` and `bedrock:InvokeModelWithResponseStream` on both the inference-profile ARNs and the underlying foundation-model ARNs. For the built-in catalog in US regions: `arn:aws:bedrock:<region>:<account>:inference-profile/us.anthropic.*` and `arn:aws:bedrock:*::foundation-model/anthropic.*`. Also grant `bedrock:CountTokens` on the foundation-model ARNs. The gateway uses it, at no charge, to count the input tokens of a request the client abandoned, so [spend limits](#admin) stay accurate. Without it the gateway falls back to a one-token Bedrock request for that count. |
| Model access    | Amazon Bedrock enables model access by default in commercial regions. The remaining account-level gate is Anthropic's one-time use case form: if no one in your AWS account has submitted it, open the Amazon Bedrock console, select an Anthropic model from the Model catalog, and complete the form. See [Submit use case details](https://code.claude.com/docs/en/amazon-bedrock#1-submit-use-case-details) for the AWS Organizations form and the permissions the submitter needs.                                                                                                                                                                                |
| EKS (IRSA)      | Create an IAM role with the policy above and a trust policy for your cluster's OIDC provider scoped to the gateway's service account. Annotate the service account with `eks.amazonaws.com/role-arn: arn:aws:iam::<acct>:role/claude-gateway`. `auth: \{\}` picks it up.                                                                                                                                                                                                                                                                                                                                                                     |
| ECS / EC2       | Attach the IAM role to the task definition or instance profile. `auth: \{\}` picks it up.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Anywhere else   | Pass credentials via the `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_SESSION_TOKEN` env vars, or set them explicitly in `auth:` with `$\{VAR\}` expansion                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Region          | `region:` is the API endpoint region. Cross-region inference profiles route across the geo (US, EU, APAC) regardless of which one you pick. For non-US regions or provisioned-throughput ARNs, add a [`models:`](#models) block with the right per-upstream IDs.                                                                                                                                                                                                                                                                                                                                                                           |

#### Claude Platform on AWS

Claude Platform on AWS serves the first-party Anthropic API on AWS infrastructure at `aws-external-anthropic.<region>.api.aws`. It uses first-party model IDs, honors `anthropic-beta` headers as sent, and serves `count_tokens`, so none of the Bedrock-specific translation applies. The `anthropicAws` provider requires Claude Code v2.1.198 or later; earlier gateway releases reject it at boot.

For the client-side deployment of the same platform, see [Claude Code on Claude Platform on AWS](https://code.claude.com/docs/en/claude-platform-on-aws). The gateway-side upstream:

```yaml theme={null}
upstreams:
  - provider: anthropicAws
    region: us-east-1
    workspace_id: wrkspc_...
    auth:
      api_key: ${ANTHROPIC_AWS_API_KEY}   # sent as x-api-key
    # OR SigV4 via the AWS default credential chain:
    # auth: {}
    # OR explicit SigV4 credentials:
    # auth:
    #   aws_access_key_id: ${AWS_ACCESS_KEY_ID}
    #   aws_secret_access_key: ${AWS_SECRET_ACCESS_KEY}
    # Override the derived endpoint:
    # base_url: https://aws-external-anthropic.us-east-1.api.aws
```

The platform runs in a separate AWS account from Amazon Bedrock and signs SigV4 requests for its own service name, `aws-external-anthropic`, so a Bedrock-scoped IAM role doesn't authorize it. An API key in `auth.api_key` takes precedence when SigV4 credentials are also set. An empty `auth` block uses the AWS SDK's default credential chain, the same chain the [Amazon Bedrock](#amazon-bedrock) upstream uses.

| Field                                                   | Required | Description                                                                                                                                        |
| ------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `region`                                                | Yes      | AWS region, lowercase letters, digits, and hyphens. The gateway derives the endpoint from it as `https://aws-external-anthropic.<region>.api.aws`. |
| `workspace_id`                                          | Yes      | Sent as a header on every request; the platform requires it                                                                                        |
| `auth.api_key`                                          | No       | API key for the platform, sent as `x-api-key`. Not a bearer token: the two auth modes are an API key or SigV4.                                     |
| `auth.aws_access_key_id` / `auth.aws_secret_access_key` | No       | Explicit SigV4 credentials. Setting one without the other fails at boot. `auth.aws_session_token` is accepted alongside them.                      |
| `base_url`                                              | No       | Override the derived endpoint                                                                                                                      |

Because the platform resolves first-party model IDs, the built-in catalog routes to it with no [`models:`](#models) block. When you curate a `models:` list, key the entry `anthropicAws:` with the first-party ID.

#### Google Cloud Agent Platform

For the equivalent client-side setup, see [Claude Code on Google Cloud](https://code.claude.com/docs/en/google-vertex-ai). The gateway-side upstream:

```yaml theme={null}
upstreams:
  - provider: vertex
    region: us-east5
    project_id: example-prod
    auth: {}                           # preferred: Application Default Credentials
    # OR a service account key file:
    # auth: { service_account_json: /secrets/sa.json }
    # Override the aiplatform endpoint for Private Service Connect:
    # base_url: https://us-east5-aiplatform.p.googleapis.com
```

An empty `auth` block uses Application Default Credentials: `GOOGLE_APPLICATION_CREDENTIALS`, GCE metadata, or GKE Workload Identity. Service-account JSON key files are supported but discouraged; use Workload Identity or attach a service account to the GCE or Cloud Run instance.

Set `region: global` to use the [global endpoint for Google Cloud's Agent Platform](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations) instead of a regional one. Google then routes each request to an available region, so you don't track per-region model availability. Setting a specific region pins every request to it.

| Setup                   | How                                                                                                                                                                                                       |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IAM permissions         | Grant the gateway's service account `roles/aiplatform.user` on the project, or a custom role with `aiplatform.endpoints.predict`. Enable Google Cloud's Agent Platform API (`aiplatform.googleapis.com`). |
| Model access            | In Model Garden, enable the Claude models for your project. They publish to specific regions; check the model card for supported regions.                                                                 |
| GKE (Workload Identity) | Bind a GCP service account to the gateway's Kubernetes service account and annotate the KSA with `iam.gke.io/gcp-service-account: claude-gateway@<proj>.iam.gserviceaccount.com`. `auth: \{\}` picks it up. |
| Cloud Run / GCE         | Set the service's service account to one with `roles/aiplatform.user`. `auth: \{\}` picks it up.                                                                                                            |
| Anywhere else           | `auth: \{ service_account_json: /secrets/sa.json \}`, the path to a JSON key file mounted as a secret. The field takes a file path, not the key contents, so no `$\{file:…\}` expansion is involved.          |

#### Microsoft Foundry

For the client-side Microsoft Foundry deployment, see [Claude Code on Microsoft Foundry](https://code.claude.com/docs/en/microsoft-foundry). The gateway-side upstream:

```yaml theme={null}
upstreams:
  - provider: foundry
    resource: example-foundry              # https://example-foundry.services.ai.azure.com
    auth: { use_azure_ad: true }        # preferred: DefaultAzureCredential / Managed Identity
    # OR an API key:
    # auth:
    #   api_key: ${FOUNDRY_API_KEY}
```

`use_azure_ad: true` resolves through `DefaultAzureCredential`: Managed Identity on AKS, ACI, or App Service; the Azure CLI; or environment credentials. API keys work but are project-wide and don't rotate automatically. Microsoft Foundry's endpoint is derived from `resource:`; set the optional `base_url` to override it for sovereign clouds such as Azure Government.

| Setup                   | How                                                                                                                                                                                       |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RBAC                    | Grant the gateway's identity `Azure AI User` or `Cognitive Services User` on the Microsoft Foundry resource                                                                               |
| Deployments             | Microsoft Foundry uses admin-chosen deployment names, not canonical model IDs. Add a [`models:`](#models) block mapping each canonical ID to your deployment name.                        |
| AKS (workload identity) | Federate a User-Assigned Managed Identity with the cluster's OIDC issuer and bind it to the gateway's service account. `use_azure_ad: true` picks it up via `WorkloadIdentityCredential`. |
| ACI / App Service       | Enable system-assigned or user-assigned managed identity on the resource. `use_azure_ad: true` picks it up.                                                                               |
| Anywhere else           | `auth: \{ api_key: "${FOUNDRY_API_KEY}" }`. Quote `${…\}` inside `\{ \}`.                                                                                                                     |

#### Multiple upstreams

The same provider can appear more than once with a distinct `name:`. This covers different regions, different accounts via different credential chains, provisioned throughput versus on-demand, and cross-provider fallback.

The gateway tries upstreams in order. `5xx`, `429`, `401`, `403`, `404`, timeouts, and missing-endpoint (`501`) fail over; other `4xx` doesn't.

`429` is per-upstream capacity, so provisioned-throughput (PT) exhaustion fails over to on-demand. If you set [`forward_user_identity: true`](#per-user-identity-headers-for-a-proxy-you-run) on an upstream, a `429` to a request that carried the developer's email is a per-user denial instead and doesn't fail over.

`404` is per-upstream model availability, so an upstream that hasn't enabled a model doesn't block a later upstream that serves it. An upstream that can't resolve the requested model is skipped without a network round-trip.

This example routes a provisioned-throughput Amazon Bedrock allotment first, overflows to on-demand and a second account, and falls back to the Anthropic API last:

```yaml theme={null}
upstreams:
  # Primary: provisioned throughput in your home region.
  - name: bedrock-pt
    provider: bedrock
    region: us-east-1
    auth: {}
  # Overflow: on-demand cross-region.
  - name: bedrock-od
    provider: bedrock
    region: us-west-2
    auth: {}
  # Different account: a separate Bedrock allotment via assumed-role creds.
  - name: bedrock-acct2
    provider: bedrock
    region: us-east-1
    auth:
      aws_access_key_id: ${ACCT2_AKID}
      aws_secret_access_key: ${ACCT2_SK}
  # Last resort: direct Anthropic API.
  - name: anthropic-fallback
    provider: anthropic
    auth:
      api_key: ${ANTHROPIC_API_KEY}

# Per-upstream model IDs are keyed on the upstream's `name:`.
models:
  - id: claude-opus-4-8
    label: Claude Opus 4.8
    upstream_model:
      bedrock-pt: arn:aws:bedrock:us-east-1:111111111111:provisioned-model/abcdef
      bedrock-od: us.anthropic.claude-opus-4-8
      bedrock-acct2: us.anthropic.claude-opus-4-8
      anthropic-fallback: claude-opus-4-8
```

| Lever                  | How                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Different regions      | One Amazon Bedrock upstream per region, each with its own `region:`. With [`auto_include_builtin_models: true`](#models) the cross-region inference profiles route automatically; for region-pinned deployments use a `models:` block.                                                                                                                                                                                                                                    |
| Different accounts     | One Amazon Bedrock upstream per account, each with its own credentials in `auth:`. The default chain (`auth: \{\}`) uses the pod's identity; for a second account, set explicit credentials or a bearer token.                                                                                                                                                                                                                                                              |
| Provisioned throughput | Map the model to the provisioned-throughput ARN in `models:` for that upstream's name. Other upstreams keep the on-demand ID, so PT capacity is exhausted before failing over.                                                                                                                                                                                                                                                                                            |
| VPC / FIPS endpoints   | Set `base_url:` on the upstream to your VPC endpoint or FIPS endpoint URL                                                                                                                                                                                                                                                                                                                                                                                                 |
| Model-scoped routing   | Only a custom model `id`, one that isn't a built-in Claude model, skips the upstreams absent from its `upstream_model:` map. The gateway tries built-in models on every upstream in order and uses the provider's default ID where the map has no entry, so for built-in models the map changes which ID an upstream receives rather than whether it is tried; an upstream that rejects the ID follows the same [failover rules](#upstreams) as any other upstream error. |

Failing over between cloud providers, or to the direct Anthropic API, changes which agreement, geography, and other terms govern the request.

The CLI applies the same feature gating to gateways regardless of which upstream serves a given request, so failover doesn't send a body field an upstream would reject.
