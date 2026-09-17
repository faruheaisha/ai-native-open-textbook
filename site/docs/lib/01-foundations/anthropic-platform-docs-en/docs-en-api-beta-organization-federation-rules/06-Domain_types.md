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
sourceRel: "docs/en/api/beta/organization/federation/rules.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization/federation/rules.md"
sourceSha256: "6d03bf00771e11cf35da987352488773829bf8b35dc6a7753d42ff09f4b98cff"
pageSha256: "b6ff07997d3da25f35b75c6d444920041434a02688ab98fd16a12bd05660f6d1"
contentMode: "local-full"
zh: ""
---

## Domain types

### Beta Federation Rule

- `BetaFederationRule object`

  Authorization rule binding an external OIDC identity to Anthropic.

  Evaluates the match conditions and mints an OAuth access token for the
  resolved target, scoped to a single workspace where the rule is enabled
  (chosen by the caller at exchange time when the rule is enabled for more
  than one). For rules enabled via `workspace_ids` or
  `applies_to_all_workspaces`, the target service account must be a member
  of that workspace (it is implicitly a member of the default workspace);
  rules carrying only the legacy `workspace_id` binding do not enforce
  this.

  - `type: "federation_rule"`

    default: federation_rule

  - `id: string`

    Tagged ID of the federation rule.

  - `applies_to_all_workspaces: boolean`

    When true, this rule is enabled for every workspace in the org (including ones created after the rule). `workspace_ids` is ignored at exchange time.

  - `archived_at: string or null`

    If set, this rule is archived and rejects token exchange.

    format: date-time

  - `archived_by_actor_id: string or null`

    Tagged ID (`user_`/`svac_`) of the actor that archived this rule.

  - `attributes: map[string] or null`

    CEL expressions extracting named values from claims. Not yet supported; always null.

  - `created_at: string`

    When this rule was created.

    format: date-time

  - `created_by_actor_id: string or null`

    Tagged ID (`user_`/`svac_`) of the actor that created this rule.

  - `description: string or null`

    Optional free-text description.

  - `issuer_id: string`

    Tagged ID of the issuer whose tokens this rule accepts.

  - `issuer_name: string or null`

    Issuer's display name at read time.

  - `match: BetaFederationRuleMatch`

    Conditions the verified JWT must satisfy for this rule to apply. All populated matcher fields must pass.

    - `audience: optional string or null`

      Exact match against the `aud` claim (any element if array). When omitted, the JWT's `aud` must still equal Anthropic's expected audience for the issuer; setting this field overrides that default.

      maxLength: 1024

    - `claims: optional map[string] or null`

      Exact-match `\{claim: value\}` pairs against top-level claims. Only string-valued claims can be matched; use `condition` for non-string claims.

    - `condition: optional string or null`

      CEL expression over claims for logic the structural fields can't express. Must evaluate to a boolean and may reference only the `claims` variable; a constant-true expression (such as `true`) is rejected with 400.

      maxLength: 4096

    - `subject_prefix: optional string or null`

      Match the verified JWT `sub` claim. Exact match unless the value ends with `*`, in which case it is a prefix match. Example: `repo:my-org/my-repo:ref:refs/heads/main`.

      maxLength: 1024

  - `name: string`

    Admin-chosen slug identifier.

  - `oauth_scope: string`

    Space-separated OAuth scopes granted on the minted token.

  - `target: BetaServiceAccountTarget`

    Identity that tokens minted via this rule act as. Currently always a `service_account` target.

    - `type: "service_account"`

    - `service_account_id: string`

      Tagged ID of the service account to mint tokens for.

    - `service_account_name: optional string or null`

      Service account's display name at read time. Ignored on writes.

  - `token_lifetime_seconds: number`

    Lifetime in seconds of access tokens minted via this rule. Minted tokens are capped at `max(60, min(this value, 2 × remaining assertion validity))` seconds.

  - `updated_at: string`

    When this rule was last updated.

    format: date-time

  - `updated_by_actor_id: string or null`

    Tagged ID (`user_`/`svac_`) of the actor that last updated this rule.

  - `workspace_id: string or null`

    Legacy single-workspace binding. Prefer `workspace_ids` and the `/federation_rules/\{federation_rule_id\}/workspaces` sub-resource for managing workspace enablement.

  - `workspace_ids: array of string`

    Tagged IDs of the workspaces this rule is enabled for. May be empty for older rules that only carry the legacy `workspace_id` binding. Ignored at exchange time when `applies_to_all_workspaces` is true (the list may still be non-empty).

### Beta Federation Rule Match

- `BetaFederationRuleMatch object`

  Does the incoming JWT qualify?

  All populated fields must pass; omitted fields are skipped. At least one
  of `subject_prefix` (other than a wildcard-only value like `*`), `claims`,
  or `condition` is required; `audience` alone is not sufficient.

  - `audience: optional string or null`

    Exact match against the `aud` claim (any element if array). When omitted, the JWT's `aud` must still equal Anthropic's expected audience for the issuer; setting this field overrides that default.

    maxLength: 1024

  - `claims: optional map[string] or null`

    Exact-match `\{claim: value\}` pairs against top-level claims. Only string-valued claims can be matched; use `condition` for non-string claims.

  - `condition: optional string or null`

    CEL expression over claims for logic the structural fields can't express. Must evaluate to a boolean and may reference only the `claims` variable; a constant-true expression (such as `true`) is rejected with 400.

    maxLength: 4096

  - `subject_prefix: optional string or null`

    Match the verified JWT `sub` claim. Exact match unless the value ends with `*`, in which case it is a prefix match. Example: `repo:my-org/my-repo:ref:refs/heads/main`.

    maxLength: 1024

### Beta Federation Rule Workspace

- `BetaFederationRuleWorkspace object`

  - `type: "federation_rule_workspace"`

    default: federation_rule_workspace

  - `created_at: string`

    When this workspace was enabled for the rule.

    format: date-time

  - `created_by_actor_id: string or null`

    Tagged ID (`user_...` or `svac_...`) of the actor that enabled this workspace for the rule, if known.

  - `federation_rule_id: string`

    Tagged ID of the federation rule.

  - `workspace_id: string`

    Tagged ID of the workspace this rule is enabled for.

  - `workspace_name: string or null`

    Workspace display name. Populated when listing; null in the enable response.

### Beta Service Account Target

- `BetaServiceAccountTarget object`

  Bind to a fixed service account by ID.

  - `type: "service_account"`

  - `service_account_id: string`

    Tagged ID of the service account to mint tokens for.

  - `service_account_name: optional string or null`

    Service account's display name at read time. Ignored on writes.
