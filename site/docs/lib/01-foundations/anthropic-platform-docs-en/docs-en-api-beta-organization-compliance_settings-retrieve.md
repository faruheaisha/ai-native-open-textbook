---
title: "Get Compliance Settings"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/organization/compliance_settings/retrieve.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization/compliance_settings/retrieve.md"
sourceSha256: "fe547749530134fc9c6db4f74d28a7a43faef5e72e237a4f35094ca8f50e4907"
pageSha256: "fe547749530134fc9c6db4f74d28a7a43faef5e72e237a4f35094ca8f50e4907"
contentMode: "local-full"
zh: ""
---

# Get Compliance Settings

**GET** `/v1/organizations/compliance_settings`

Retrieve your organization's Compliance Settings.

Compliance Settings is a singleton resource: there is exactly one per
organization, addressed without an identifier. The `state` field reflects
whether the Compliance API is enabled. An organization with a parent
organization reads the state inherited from the parent's configuration.

## Returns

- `BetaComplianceSettings object`

  - `type: "compliance_settings"`

    default: compliance_settings

  - `state: BetaComplianceSettingsState`

    Whether the Compliance API is enabled for this organization.

    - `BetaComplianceSettingsStateEnabled object`

      - `type: "enabled"`

        default: enabled

    - `BetaComplianceSettingsStateDisabled object`

      - `type: "disabled"`

        default: disabled

## Example

```bash
curl https://api.anthropic.com/v1/organizations/compliance_settings \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

### Response (200)

```json
{
  "state": {
    "type": "enabled"
  },
  "type": "compliance_settings"
}
```
