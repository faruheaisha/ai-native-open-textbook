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
sourceRel: "docs/en/api/beta/environments.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/environments.md"
sourceSha256: "35b12aca43048a47ae3ffe0d7307919481cab27bb85044f02ab5a683eaa0ac48"
pageSha256: "b1271505b13a382cd69688a9aee6fccd3b39f05fedda3b8d04e004f4038e4483"
contentMode: "local-full"
zh: ""
---

## Domain types

### Beta Cloud Config

- `BetaCloudConfig object`

  `cloud` environment configuration.

  - `type: "cloud"`

    Environment type

  - `networking: BetaUnrestrictedNetwork or BetaLimitedNetwork`

    Network configuration policy.

    - `BetaUnrestrictedNetwork object`

      Unrestricted network access.

      - `type: "unrestricted"`

        Network policy type

    - `BetaLimitedNetwork object`

      Limited network access.

      - `type: "limited"`

        Network policy type

      - `allow_mcp_servers: boolean`

        Permits outbound access to MCP server endpoints configured on the agent, beyond those listed in the `allowed_hosts` array.

      - `allow_package_managers: boolean`

        Permits outbound access to public package registries (PyPI, npm, etc.) beyond those listed in the `allowed_hosts` array.

      - `allowed_hosts: array of string`

        Specifies domains the container can reach.

  - `packages: BetaPackages`

    Package manager configuration.

    - `type: optional "packages"`

      Package configuration type

      default: packages

    - `apt: array of string`

      Ubuntu/Debian packages to install

    - `cargo: array of string`

      Rust packages to install

    - `gem: array of string`

      Ruby packages to install

    - `go: array of string`

      Go packages to install

    - `npm: array of string`

      Node.js packages to install

    - `pip: array of string`

      Python packages to install

### Beta Cloud Config Params

- `BetaCloudConfigParams object`

  Request params for `cloud` environment configuration.

  Fields default to null; on update, omitted fields preserve the
  existing value.

  - `type: "cloud"`

    Environment type

  - `networking: optional BetaUnrestrictedNetwork or BetaLimitedNetworkParams or null`

    Network configuration policy. Omit on update to preserve the existing value.

    - `BetaUnrestrictedNetwork object`

      Unrestricted network access.

      - `type: "unrestricted"`

        Network policy type

    - `BetaLimitedNetworkParams object`

      Limited network request params.

      Fields default to null; on update, omitted fields preserve the
      existing value.

      - `type: "limited"`

        Network policy type

      - `allow_mcp_servers: optional boolean or null`

        Permits outbound access to MCP server endpoints configured on the agent, beyond those listed in the `allowed_hosts` array. Defaults to `false`.

      - `allow_package_managers: optional boolean or null`

        Permits outbound access to public package registries (PyPI, npm, etc.) beyond those listed in the `allowed_hosts` array. Defaults to `false` on creation. Must be `true` when `packages` are specified.

      - `allowed_hosts: optional array of string or null`

        Specifies domains the container can reach.

  - `packages: optional BetaPackagesParams or null`

    Specify packages (and optionally their versions) available in this environment.

    When versioning, use the version semantics relevant for the package manager, e.g. for `pip` use `package==1.0.0`. You are responsible for validating the package and version exist. Unversioned installs the latest.

    Under `limited` networking, requires `networking.allow_package_managers` to be `true`.

    - `type: optional "packages"`

      Package configuration type

      default: packages

    - `apt: optional array of string or null`

      Ubuntu/Debian packages to install

    - `cargo: optional array of string or null`

      Rust packages to install

    - `gem: optional array of string or null`

      Ruby packages to install

    - `go: optional array of string or null`

      Go packages to install

    - `npm: optional array of string or null`

      Node.js packages to install

    - `pip: optional array of string or null`

      Python packages to install

### Beta Environment

- `BetaEnvironment object`

  Unified Environment resource for both cloud and self-hosted environments.

  - `type: "environment"`

    The type of object (always 'environment')

    default: environment

  - `id: string`

    Environment identifier (e.g., 'env_...')

  - `archived_at: string or null`

    RFC 3339 timestamp when environment was archived, or null if not archived

  - `config: BetaCloudConfig or BetaSelfHostedConfig`

    Environment configuration (either Anthropic Cloud or self-hosted)

    - `BetaCloudConfig object`

      `cloud` environment configuration.

      - `type: "cloud"`

        Environment type

      - `networking: BetaUnrestrictedNetwork or BetaLimitedNetwork`

        Network configuration policy.

        - `BetaUnrestrictedNetwork object`

          Unrestricted network access.

          - `type: "unrestricted"`

            Network policy type

        - `BetaLimitedNetwork object`

          Limited network access.

          - `type: "limited"`

            Network policy type

          - `allow_mcp_servers: boolean`

            Permits outbound access to MCP server endpoints configured on the agent, beyond those listed in the `allowed_hosts` array.

          - `allow_package_managers: boolean`

            Permits outbound access to public package registries (PyPI, npm, etc.) beyond those listed in the `allowed_hosts` array.

          - `allowed_hosts: array of string`

            Specifies domains the container can reach.

      - `packages: BetaPackages`

        Package manager configuration.

        - `type: optional "packages"`

          Package configuration type

          default: packages

        - `apt: array of string`

          Ubuntu/Debian packages to install

        - `cargo: array of string`

          Rust packages to install

        - `gem: array of string`

          Ruby packages to install

        - `go: array of string`

          Go packages to install

        - `npm: array of string`

          Node.js packages to install

        - `pip: array of string`

          Python packages to install

    - `BetaSelfHostedConfig object`

      Configuration for self-hosted environments.

      - `type: "self_hosted"`

        Environment type

  - `created_at: string`

    RFC 3339 timestamp when environment was created

  - `description: string or null`

    User-provided description for the environment; null when unset

  - `metadata: map[string]`

    User-provided metadata key-value pairs

  - `name: string`

    Human-readable name for the environment

  - `updated_at: string`

    RFC 3339 timestamp when environment was last updated

  - `scope: optional "organization" or "account"`

    The visibility scope for this environment. 'organization' means visible to all accounts. 'account' means visible only to the owning account.

    - `"organization"`

    - `"account"`

### Beta Environment Delete Response

- `BetaEnvironmentDeleteResponse object`

  Response after deleting an environment.

  - `type: "environment_deleted"`

    The type of response

    default: environment_deleted

  - `id: string`

    Environment identifier

### Beta Limited Network

- `BetaLimitedNetwork object`

  Limited network access.

  - `type: "limited"`

    Network policy type

  - `allow_mcp_servers: boolean`

    Permits outbound access to MCP server endpoints configured on the agent, beyond those listed in the `allowed_hosts` array.

  - `allow_package_managers: boolean`

    Permits outbound access to public package registries (PyPI, npm, etc.) beyond those listed in the `allowed_hosts` array.

  - `allowed_hosts: array of string`

    Specifies domains the container can reach.

### Beta Limited Network Params

- `BetaLimitedNetworkParams object`

  Limited network request params.

  Fields default to null; on update, omitted fields preserve the
  existing value.

  - `type: "limited"`

    Network policy type

  - `allow_mcp_servers: optional boolean or null`

    Permits outbound access to MCP server endpoints configured on the agent, beyond those listed in the `allowed_hosts` array. Defaults to `false`.

  - `allow_package_managers: optional boolean or null`

    Permits outbound access to public package registries (PyPI, npm, etc.) beyond those listed in the `allowed_hosts` array. Defaults to `false` on creation. Must be `true` when `packages` are specified.

  - `allowed_hosts: optional array of string or null`

    Specifies domains the container can reach.

### Beta Packages

- `BetaPackages object`

  Packages (and their versions) available in this environment.

  - `type: optional "packages"`

    Package configuration type

    default: packages

  - `apt: array of string`

    Ubuntu/Debian packages to install

  - `cargo: array of string`

    Rust packages to install

  - `gem: array of string`

    Ruby packages to install

  - `go: array of string`

    Go packages to install

  - `npm: array of string`

    Node.js packages to install

  - `pip: array of string`

    Python packages to install

### Beta Packages Params

- `BetaPackagesParams object`

  Specify packages (and optionally their versions) available in this environment.

  When versioning, use the version semantics relevant for the package manager, e.g. for `pip` use `package==1.0.0`. You are responsible for validating the package and version exist. Unversioned installs the latest.

  Under `limited` networking, requires `networking.allow_package_managers` to be `true`.

  - `type: optional "packages"`

    Package configuration type

    default: packages

  - `apt: optional array of string or null`

    Ubuntu/Debian packages to install

  - `cargo: optional array of string or null`

    Rust packages to install

  - `gem: optional array of string or null`

    Ruby packages to install

  - `go: optional array of string or null`

    Go packages to install

  - `npm: optional array of string or null`

    Node.js packages to install

  - `pip: optional array of string or null`

    Python packages to install

### Beta Self Hosted Config

- `BetaSelfHostedConfig object`

  Configuration for self-hosted environments.

  - `type: "self_hosted"`

    Environment type

### Beta Self Hosted Config Params

- `BetaSelfHostedConfigParams object`

  Request params for `self_hosted` environment configuration.

  - `type: "self_hosted"`

    Environment type

### Beta Unrestricted Network

- `BetaUnrestrictedNetwork object`

  Unrestricted network access.

  - `type: "unrestricted"`

    Network policy type
