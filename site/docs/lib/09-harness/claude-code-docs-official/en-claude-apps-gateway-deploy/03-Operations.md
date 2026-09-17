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
pageSha256: "7929b73e129e31c8283461e699fce89d726dd5893bc3c9ac6478d0958dc9b76b"
contentMode: "local-full"
zh: ""
---

## Operations

Once the gateway is serving traffic, day-to-day operation is reading its logs, probing its health, and rotating its secrets on your schedule. The subsections cover each, plus what Postgres holds and how upgrades and rollbacks behave.

### Logs

The gateway writes two streams to stderr, both JSON-friendly:

* **Audit events**: single-line JSON per security-relevant event. Pipe stderr to your log aggregator. The events emitted include `config.load`, `session.mint`, `session.refresh`, `device.authorize`, `device.verify`, `device.callback`, `auth.denied`, `access.denied`, `inference`, `managed.serve`, `desktop_bootstrap.serve`, `desktop_bootstrap.denied`, `spend.blocked`, `admin.denied`, `admin.limit.upsert`, and `admin.limit.delete`. Fields vary by event:
  * Successful mint and refresh events carry `sub`, `email`, `client_ip`, and the result
  * `auth.denied` and `access.denied` carry the reason and client IP, plus the request path for `auth.denied`, since no user identity exists at those denials. Two `access.denied` reasons change what the event carries:
    * `xff_unparseable`: the event also carries the `X-Forwarded-For` entry that couldn't be read
    * `client_ip_unknown`: the event carries no client IP, because the connection had no peer address while an `access_control` list was set
  * `inference` records which upstream served the request and the response status
  * `desktop_bootstrap.denied` records a rejected Claude Desktop bootstrap fetch with the reason (`not_configured`, `policy_not_opted_in`, or `no_policy_matched`) and the user's identity
  * `admin.denied` records a rejected admin-API auth attempt with the client IP, method, path, and a reason, without the presented key material: `invalid_key` when an `x-api-key` was presented but matched no configured key, `bearer_rejected` when only an `Authorization` header was presented and it didn't verify as a gateway session in `admin.admin_groups`, or `no_credentials` when neither header was presented
* **Operational logs**: human-readable `[gateway]`-prefixed lines for boot, warnings, and upstream errors. The `CLAUDE_GATEWAY_LOG_LEVEL` environment variable controls verbosity and accepts `debug`, `info`, `warn`, or `error`, with `info` as the default. At `debug`, each sign-in and refresh also logs the names, not the values, of the claims in the id\_token, plus the names of the userinfo claims when `userinfo_fallback` supplied any, so you can diagnose `email_claim` and `groups_claim` settings without logging PII. It doesn't affect audit events, which are always emitted.

### Health

The gateway serves `GET /healthz` as a liveness probe and `GET /readyz` as a readiness probe; `/readyz` verifies the store is reachable. Both are exempt from `access_control.allow_cidrs`, so probes keep working on a locked-down listener.

The OAuth discovery document at `/.well-known/oauth-authorization-server` also returns `200` only after config load, OIDC discovery, upstream client construction, and Postgres migration all succeed, so it doubles as an end-to-end boot check.

### Outage behavior

If Postgres goes down, the gateway itself keeps serving signed-in developers and new sign-ins fail. Whether developers actually keep working depends on how your orchestrator handles readiness:

* **Existing sessions**: bearer tokens validate locally with the JWT secret, session refreshes don't touch the store, and the gateway process can still serve inference
* **New sign-ins**: fail until Postgres recovers, because the device flow and its rate-limit counters live in Postgres
* **[Spend-limit enforcement](https://code.claude.com/docs/en/claude-apps-gateway-spend-limits#postgres-availability)**: fails open by default during the outage, so inference still flows; flip it to fail closed if you'd rather block than run unmetered
* **Readiness**: `/readyz` reports not-ready during the outage, so orchestrators that gate traffic on readiness remove every replica from rotation at once. In that topology all traffic, including inference the gateway could still serve, fails at the load balancer until Postgres recovers. The liveness probe on `/healthz` keeps passing, so replicas aren't restarted. Point the readiness probe at `/healthz` instead if you'd rather signed-in developers keep working through a store outage; the cost is that new sign-ins fail against a replica that still reports ready.

If your IdP goes down, existing sessions work until `ttl_hours`, and new logins and refreshes fail. Set a longer `ttl_hours` if your IdP has frequent maintenance windows.

### JWT secret rotation

Rotate the signing secret in three steps so existing sessions stay valid:

1. Generate a new secret. Prepend it to the `session.jwt_secret` array.
2. Roll the deployment. New tokens sign with the new secret; old tokens still verify.
3. After `ttl_hours` plus a margin, remove the old secret and roll again.

Rotation is also the only way to force sessions out before they expire: bearer tokens validate locally against the JWT secret, so there is no per-session revocation. Replacing the secret outright, without keeping the old one in the array, invalidates every outstanding session at once. For individual offboarding, deprovision the user in your IdP; their session ends within `ttl_hours`.

### Postgres

The gateway holds five data tables plus a `_migrations` table, all created by its boot-time migrations:

| Table              | Contents                                                                      | Retention                                                       |
| ------------------ | ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `kv`               | Device grants (10-minute TTL) and rate-limit counters                         | TTL per row                                                     |
| `spend`            | Per-principal period-to-date spend counters, in cents                         | `admin.spend_retention_months`, default 13                      |
| `spend_limits`     | Configured spend caps                                                         | Until deleted via the API                                       |
| `admin_audit`      | Admin API mutation trail                                                      | `admin.audit_retention_days`, default 365                       |
| `principal_emails` | Each principal's last-seen email, display name, and IdP groups. Contains PII. | `admin.identity_retention_days` since last activity, default 90 |

A 30-second loop expires `kv` rows past their TTL, and an hourly sweep enforces the retention windows on the spend tables, so nothing grows without bound. Without [spend limits](https://code.claude.com/docs/en/claude-apps-gateway-spend-limits) configured, only `kv` is written. The gateway applies its own schema migrations at boot and on every upgrade, so its database role needs rights to create and alter tables. Point it at a database or schema dedicated to the gateway to keep that grant narrow.

With spend limits in use, a lost database means lost spend tracking and caps, not only developer re-logins, so run regular backups. To erase one departed developer immediately rather than waiting on retention, run `DELETE FROM principal_emails WHERE principal = '<sub>'` directly; that removes the only table holding their email, name, and groups. `spend` and `admin_audit` rows reference the pseudonymous OIDC `sub` only.

### Upgrades

Replicas are stateless, so a rolling restart is safe at any time. The gateway runs schema migrations at boot, which means deploying the new binary self-migrates the database. Concurrent replicas serialize on a Postgres advisory lock, so only one applies each migration.

Migrations are append-only, so rolling back to a prior binary that knows fewer migrations is safe; it ignores the extra rows. Rollback also re-validates the YAML against the older binary's schema, so a config that adopted a key introduced by the newer release fails boot on the older one. Remove the new key before rolling back.

Because you pin the gateway's version in your own image, fixes in new Claude Code releases, including security fixes, reach your deployment only when you update the pin and redeploy. Include the gateway in the same patching cadence you use for other services that hold production credentials.
