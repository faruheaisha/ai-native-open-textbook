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
pageSha256: "9515a921d3376fb2a5d630efe63a24dcc6ce85d01765d05d291015eecf5dea40"
contentMode: "local-full"
zh: ""
---

## Client-side managed settings

Everything above configures the gateway server. You point developer machines at the gateway separately, on each device, through Claude Code's [managed settings](https://code.claude.com/docs/en/managed-settings). The gateway can't push the login keys itself, because they're what tell the client where the gateway is.

For the CLI, set these keys in the per-OS `managed-settings.json`. The two login keys route each developer's `/login` to your gateway:

```json theme={null}
{
  "forceLoginMethod": "gateway",
  "forceLoginGatewayUrl": "https://claude-gateway.internal.example.com",
  "parentSettingsBehavior": "merge"
}
```

`parentSettingsBehavior: "merge"` keeps Claude Desktop's delivery of the egress allowlist to its embedded Claude Code sessions working; [Deliver policy to Claude Desktop sessions](https://code.claude.com/docs/en/claude-apps-gateway#deliver-policy-to-claude-desktop-sessions) explains the mechanism and where the opt-in must sit.

Deploy the `managed-settings.json` file to each device, typically via your MDM platform. The file path differs by platform. See [where each mechanism stores the policy](https://code.claude.com/docs/en/managed-settings#where-each-mechanism-stores-the-policy).

By default, a registry policy on Windows or a managed-preferences plist on macOS replaces the `managed-settings.json` file rather than merging with it, apart from the [exception keys and cross-source checks above](#precedence-with-other-managed-sources). All three keys in this snippet follow the highest-priority-source rule, so fleets that deliver policy through Group Policy or configuration profiles must put all three in that mechanism instead.

For Claude Desktop, set the `bootstrapUrl` key in Claude Desktop's own [managed configuration](https://claude.com/docs/third-party/claude-desktop/configuration) to `<listen.public_url>/user/bootstrap`. The sign-in flow and per-group policy then match the CLI's once a policy opts in server-side with a `desktop` key; without the opt-in, `/user/bootstrap` returns 404. See [Claude Desktop overlay](#claude-desktop-overlay) for the server-side half.

[`forceLoginGatewayUrl`](https://code.claude.com/docs/en/settings-reference#forcelogingatewayurl), and the `"gateway"` value of [`forceLoginMethod`](https://code.claude.com/docs/en/settings-reference#forceloginmethod), are honored only from a managed source on the machine: `managed-settings.json`, the macOS plist or Windows HKLM registry, or a policy helper. A developer setting them in their own `~/.claude/settings.json` has no effect, and neither does setting them in the gateway payload.
