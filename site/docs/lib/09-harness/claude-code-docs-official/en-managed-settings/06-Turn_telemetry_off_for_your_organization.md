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
sourceRel: "en/managed-settings.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/managed-settings.md"
sourceSha256: "d004e5b69cafe5d2bb7b626e4b76989e9712594969ab0ca8ce430cadf56dcb6b"
pageSha256: "6c8615d003d27544aab561c6e99b00e103fb0c5074cd107ff447ad23ebe3b002"
contentMode: "local-full"
zh: ""
---

## Turn telemetry off for your organization

Claude Code sends Anthropic operational [telemetry](https://code.claude.com/docs/en/data-usage#telemetry-services) by default on sessions that use the Anthropic API, whether directly, through an LLM gateway, or through a custom `ANTHROPIC_BASE_URL`; [Default behaviors by API provider](https://code.claude.com/docs/en/data-usage#default-behaviors-by-api-provider) says which providers send it. To turn it off for every developer without relying on each person's shell, deliver `DISABLE_TELEMETRY` through the `env` block of your managed settings. This example sets `DISABLE_TELEMETRY` for everyone the policy reaches:

```json theme={null}
{
  "env": {
    "DISABLE_TELEMETRY": "1"
  }
}
```

Claude Code applies a value of `1` without showing the user the [approval dialog](https://code.claude.com/docs/en/server-managed-settings#environment-variables-and-the-approval-dialog).

If you turn telemetry off, Claude Code stops sending the usage data that feeds your organization's [analytics dashboard](https://code.claude.com/docs/en/analytics) for the developers the policy reaches. The variable also turns off feature-flag fetching, which makes Remote Control, default auto mode, and the other [features that need feature-flag fetching](https://code.claude.com/docs/en/env-vars#features-that-need-feature-flag-fetching) unavailable for those developers.

[Where and when a policy applies](#where-and-when-a-policy-applies) says which delivery mechanism reaches each surface, and [Platform availability](https://code.claude.com/docs/en/server-managed-settings#platform-availability) says which sessions skip the server-managed settings fetch.

If your organization uses customer-managed encryption keys and routes Claude Code through a gateway, [Configure proxies and gateways](https://code.claude.com/docs/en/third-party-integrations#configure-proxies-and-gateways) says why those sessions need this variable.
