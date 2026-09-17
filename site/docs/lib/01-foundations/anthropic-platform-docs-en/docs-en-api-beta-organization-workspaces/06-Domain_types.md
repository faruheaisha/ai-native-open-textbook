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
sourceRel: "docs/en/api/beta/organization/workspaces.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization/workspaces.md"
sourceSha256: "59ead53aa38c708a91f6d122366be8911a47357f3e5c1e6f0e2be4106cc78c73"
pageSha256: "69db2f55c8e27b76af94a51f98ca6e5f6746fe2f9ca9e52378e30087f6dc2423"
contentMode: "local-full"
zh: ""
---

## Domain types

### Beta Allowed Inference Geo

- `BetaAllowedInferenceGeo = "global" or "us"`

  - `"global"`

  - `"us"`

### Beta Data Residency

- `BetaDataResidency object`

  - `allowed_inference_geos: array of string or "unrestricted"`

    Permitted inference geo values. 'unrestricted' means all geos are allowed.

    - `Geos = array of string`

    - `Unrestricted = "unrestricted"`

  - `default_inference_geo: string`

    Default inference geo applied when requests omit the parameter.

  - `workspace_geo: string`

    Geographic region for workspace data storage. Immutable after creation.

### Beta Data Residency Create Config

- `BetaDataResidencyCreateConfig object`

  - `allowed_inference_geos: optional array of BetaAllowedInferenceGeo or "unrestricted" or null`

    Permitted inference geo values. Defaults to 'unrestricted' if omitted, which allows all geos. Use the string 'unrestricted' to allow all geos, or a list of specific geos.

    - `Geos = array of BetaAllowedInferenceGeo`

      - `"global"`

      - `"us"`

    - `Unrestricted = "unrestricted"`

  - `default_inference_geo: optional "global" or "us" or null`

    Default inference geo applied when requests omit the parameter. Defaults to 'global' if omitted. Must be a member of `allowed_inference_geos` unless `allowed_inference_geos` is `"unrestricted"`.

    - `"global"`

    - `"us"`

  - `workspace_geo: optional "us" or null`

    Geographic region for workspace data storage. Immutable after creation. Defaults to 'us' if omitted.

### Beta Data Residency Update Config

- `BetaDataResidencyUpdateConfig object`

  - `allowed_inference_geos: optional array of BetaAllowedInferenceGeo or "unrestricted" or null`

    Permitted inference geo values. Use 'unrestricted' to allow all geos, or a list of specific geos.

    - `Geos = array of BetaAllowedInferenceGeo`

      - `"global"`

      - `"us"`

    - `Unrestricted = "unrestricted"`

  - `default_inference_geo: optional "global" or "us" or null`

    Default inference geo applied when requests omit the parameter. Must be a member of `allowed_inference_geos` unless `allowed_inference_geos` is `"unrestricted"`.

    - `"global"`

    - `"us"`

### Beta No Billing Workspace Role

- `BetaNoBillingWorkspaceRole = "workspace_admin" or "workspace_developer" or "workspace_restricted_developer" or "workspace_user"`

  - `"workspace_admin"`

  - `"workspace_developer"`

  - `"workspace_restricted_developer"`

  - `"workspace_user"`

### Beta Workspace

- `BetaWorkspace object`

  - `type: "workspace"`

    Object type.

    For Workspaces, this is always `"workspace"`.

    default: workspace

  - `id: string`

    ID of the Workspace.

  - `archived_at: string or null`

    RFC 3339 datetime string indicating when the Workspace was archived, or `null` if the Workspace is not archived.

    format: date-time

  - `compartment_id: string`

    Identifier for this Workspace's encryption compartment. When you configure a
    customer-managed encryption key (CMEK) on AWS, reference this value in your
    KMS key-policy condition so the key is scoped to this compartment. On GCP and
    Azure, Anthropic enforces the compartment binding automatically; you do not
    need to reference this value in your key configuration. See the CMEK
    integration guide for the required key configuration; unless your organization
    is on Claude Platform on AWS, it includes a separate value used during key
    validation. On Claude Platform on AWS there is no separate validation value:
    the key is validated against this Workspace's own value when it is attached, so
    if your key policy uses the compartment condition, add this value to it before
    attaching the key.

  - `created_at: string`

    RFC 3339 datetime string indicating when the Workspace was created.

    format: date-time

  - `data_residency: BetaDataResidency`

    Data residency configuration.

    - `allowed_inference_geos: array of string or "unrestricted"`

      Permitted inference geo values. 'unrestricted' means all geos are allowed.

      - `Geos = array of string`

      - `Unrestricted = "unrestricted"`

    - `default_inference_geo: string`

      Default inference geo applied when requests omit the parameter.

    - `workspace_geo: string`

      Geographic region for workspace data storage. Immutable after creation.

  - `display_color: string`

    Hex color code representing the Workspace in the Anthropic Console.

  - `external_key_id: string or null`

    ID of the customer-managed encryption key (CMEK) configuration to use for this
    Workspace. Setting this field requires CMEK to be enabled for your
    organization. When set, data stored for this Workspace is encrypted with the
    referenced key. Create key configurations with the External Keys API. On
    Claude Platform on AWS the value is the AWS KMS key ARN, and the key must be a
    single-Region key in the same AWS account and Region as the Workspace. On that
    platform the key is validated against this Workspace when it is attached, so a
    key-policy problem is reported as an error on this request. This field is write-once:
    once a key is attached to a Workspace it cannot be detached or replaced. To
    rotate key material, rotate the underlying key on your cloud KMS; the
    `external_key_id` stays the same.

  - `name: string`

    Name of the Workspace.

  - `tags: map[string]`

    User-defined tags as string key-value pairs. Keys may not begin with `anthropic`.

### Beta Workspace Member

- `BetaWorkspaceMember object`

  - `type: "workspace_member"`

    Object type.

    For Workspace Members, this is always `"workspace_member"`.

    default: workspace_member

  - `user_id: string`

    ID of the User.

  - `workspace_id: string`

    ID of the Workspace.

  - `workspace_role: BetaWorkspaceRole`

    Role of the Workspace Member.

    - `"workspace_admin"`

    - `"workspace_billing"`

    - `"workspace_developer"`

    - `"workspace_restricted_developer"`

    - `"workspace_user"`

### Beta Workspace Role

- `BetaWorkspaceRole = "workspace_admin" or "workspace_billing" or "workspace_developer" or 2 more`

  - `"workspace_admin"`

  - `"workspace_billing"`

  - `"workspace_developer"`

  - `"workspace_restricted_developer"`

  - `"workspace_user"`
