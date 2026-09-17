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
pageSha256: "5f1ff7e58434344d5ef87b2d1b7d09e1191148b71284cf2a8e8e5c4c6dc01b72"
contentMode: "local-full"
zh: ""
---

## Complete example

This full reference config exercises every core section; the [HTTP tuning blocks](#http-tuning) keep their defaults. Copy it, delete what you don't need, and fill in your values. The config in the [Quickstart](https://code.claude.com/docs/en/claude-apps-gateway#quickstart) is a minimal version of this.

```yaml gateway.yaml theme={null}
# Run with:
#   claude gateway --config gateway.yaml
#
# Operational log verbosity is controlled by the CLAUDE_GATEWAY_LOG_LEVEL
# environment variable (debug | info | warn | error; default info). debug
# also logs the claim names in each id_token, for groups_claim diagnosis.
# It does not affect audit events, which are always emitted.

listen:
  host: 0.0.0.0
  port: 8080
  public_url: https://claude-gateway.internal.example.com
  # Omit the tls block when running behind a TLS-terminating ingress.
  # tls:
  #   cert: /certs/gateway.crt
  #   key: /certs/gateway.key
  # trusted_proxies:
  #   - 10.0.0.0/8

oidc:
  issuer: https://example.okta.com
  client_id: 0oa1example2
  client_secret: ${OIDC_CLIENT_SECRET}
  allowed_email_domains:
    - example.com
  # Required when the issuer is the Okta org server, whose id_tokens
  # can omit email and groups; the gateway fills them from /userinfo.
  userinfo_fallback: true
  # allowed_groups: [claude-code-users]
  # Okta emits groups only when the `groups` scope is requested and the
  # app's groups claim filter allows them. The contractors policy below
  # matches on groups, so the scope is requested here.
  scopes: [openid, profile, email, offline_access, groups]
  # extra_auth_params: { access_type: offline, prompt: consent }  # Google
  # groups_claim: groups          # Entra app roles: use `roles`
  # email_claim: email

session:
  jwt_secret: ${GATEWAY_JWT_SECRET}   # openssl rand -base64 32
  # ttl_hours: 1

store:
  postgres_url: ${GATEWAY_POSTGRES_URL}
  # max_connections: 5

# Enables /v1/organizations/spend_limits (mirrors the Anthropic Admin API)
# and per-developer spend enforcement on /v1/messages. Omit to disable.
# Caps themselves are set via the admin API, not here.
# admin:
#   write_keys:
#     - { id: terraform, key: "${GATEWAY_ADMIN_WRITE_KEY_TF}" }
#   read_keys:
#     - { id: reporting, key: "${GATEWAY_ADMIN_READ_KEY}" }
#   admin_groups: [platform-finops]
#   blocked_message: request an increase at https://go.example.com/claude-limits
#   # audit_retention_days: 365
#   # spend_retention_months: 13
#   # identity_retention_days: 90
#   # group_limit_mode: min

# enforcement:
#   fail_closed_on_error: false

# Meter at contracted rates instead of USD list price. Requires admin:.
# With managed:, the same rates also go to signed-in clients.
# Rates below are placeholders, not real contract prices.
# pricing:
#   multiplier: 0.85
#   overrides:
#     - { upstream: anthropic, model: claude-sonnet-4-6, input: 3.30, output: 16.50, cache_read: 0.33, cache_write: 4.125 }

upstreams:
  - provider: anthropic
    auth:
      api_key: ${ANTHROPIC_API_KEY}

  # - provider: bedrock
  #   region: us-east-1
  #   auth: {}

  # - provider: anthropicAws
  #   region: us-east-1
  #   workspace_id: wrkspc_...
  #   auth:
  #     api_key: ${ANTHROPIC_AWS_API_KEY}

  # - provider: vertex
  #   region: us-east5
  #   project_id: example-prod
  #   auth: {}

  # - provider: foundry
  #   resource: example-foundry
  #   auth: { use_azure_ad: true }

auto_include_builtin_models: true
models:
  - id: claude-opus-4-8
    label: Claude Opus 4.8
    upstream_model:
      anthropic: claude-opus-4-8
      # bedrock: us.anthropic.claude-opus-4-8
      # anthropicAws: claude-opus-4-8
      # vertex: claude-opus-4-8
