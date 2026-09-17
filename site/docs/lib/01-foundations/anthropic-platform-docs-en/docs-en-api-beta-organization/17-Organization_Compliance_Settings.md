---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/organization.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization.md"
sourceSha256: "94290dadf163628ee70a57296045d482832b0d0670488cc9c3f0586427471f41"
pageSha256: "41951c7af0815780f0da34ef290291be087202a7020d9c35570a93875793d8e1"
contentMode: "local-full"
zh: ""
---

## Organization › Compliance Settings

### Get Compliance Settings

**GET** `/v1/organizations/compliance_settings`

Retrieve your organization's Compliance Settings.

Compliance Settings is a singleton resource: there is exactly one per
organization, addressed without an identifier. The `state` field reflects
whether the Compliance API is enabled. An organization with a parent
organization reads the state inherited from the parent's configuration.

#### Returns

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

#### Example

```bash
curl https://api.anthropic.com/v1/organizations/compliance_settings \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

##### Response (200)

```json
{
  "state": {
    "type": "enabled"
  },
  "type": "compliance_settings"
}
```

### Update Compliance Settings

**POST** `/v1/organizations/compliance_settings`

Update your organization's Compliance Settings.

Setting `state` to `enabled` turns on the Compliance API and begins
capturing organization activity events. Setting it to `disabled` turns
both off. `state` reflects whether the Compliance API is enabled.

A request that sets `state` to its current value succeeds and leaves the
resource unchanged. A `disabled` request stays in effect until a later
`enabled` request or the organization's next provisioning action that
enables Access Transparency: enabling Access Transparency also enables
the Compliance API, which serves its activity events, so such
provisioning (including re-runs) re-enables the Compliance API even
after a `disabled` request. Automated provisioning never disables
compliance settings.

#### Body parameters

- `state: BetaComplianceSettingsStateParam`

  Desired state. Accepts the string shorthand "enabled" or "disabled" in place of the object form; the response always returns the canonical object form.

  - `BetaComplianceSettingsStateEnabledParam object`

    - `type: "enabled"`

  - `BetaComplianceSettingsStateDisabledParam object`

    - `type: "disabled"`

#### Returns

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

#### Example

```bash
curl https://api.anthropic.com/v1/organizations/compliance_settings \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d '{
          "state": {
            "type": "enabled"
          }
        }'
```

##### Response (200)

```json
{
  "state": {
    "type": "enabled"
  },
  "type": "compliance_settings"
}
```
