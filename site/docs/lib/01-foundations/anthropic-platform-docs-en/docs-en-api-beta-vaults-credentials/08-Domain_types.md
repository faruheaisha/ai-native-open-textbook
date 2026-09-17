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
sourceRel: "docs/en/api/beta/vaults/credentials.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/vaults/credentials.md"
sourceSha256: "01fbb0b9dd35e094087654617042ec7cc0dd844a3b09c1d8eefea202c30ed073"
pageSha256: "d873eb9eff7e35da6a1e5c3e0ef5d672316f51b7838170a12e765f6c63e956b1"
contentMode: "local-full"
zh: ""
---

## Domain types

### Beta Managed Agents Credential

- `BetaManagedAgentsCredential object`

  A credential stored in a vault. Sensitive fields are never returned in responses.

  - `type: "vault_credential"`

  - `id: string`

    Unique identifier for the credential.

  - `archived_at: string or null`

    A timestamp in RFC 3339 format

    format: date-time

  - `auth: BetaManagedAgentsMCPOAuthAuthResponse or BetaManagedAgentsStaticBearerAuthResponse or BetaManagedAgentsEnvironmentVariableAuthResponse`

    Authentication details for a credential.

    - `BetaManagedAgentsMCPOAuthAuthResponse object`

      OAuth credential details for an MCP server.

      - `type: "mcp_oauth"`

      - `mcp_server_url: string`

        URL of the MCP server this credential authenticates against.

      - `expires_at: optional string or null`

        A timestamp in RFC 3339 format

        format: date-time

      - `refresh: optional BetaManagedAgentsMCPOAuthRefreshResponse or null`

        OAuth refresh token configuration returned in credential responses.

        - `client_id: string`

          OAuth client ID.

        - `token_endpoint: string`

          Token endpoint URL used to refresh the access token.

        - `token_endpoint_auth: BetaManagedAgentsTokenEndpointAuthNoneResponse or BetaManagedAgentsTokenEndpointAuthBasicResponse or BetaManagedAgentsTokenEndpointAuthPostResponse`

          Token endpoint requires no client authentication.

          - `BetaManagedAgentsTokenEndpointAuthNoneResponse object`

            Token endpoint requires no client authentication.

            - `type: "none"`

          - `BetaManagedAgentsTokenEndpointAuthBasicResponse object`

            Token endpoint uses HTTP Basic authentication with client credentials.

            - `type: "client_secret_basic"`

          - `BetaManagedAgentsTokenEndpointAuthPostResponse object`

            Token endpoint uses POST body authentication with client credentials.

            - `type: "client_secret_post"`

        - `resource: optional string or null`

          OAuth resource indicator.

        - `scope: optional string or null`

          OAuth scope for the refresh request.

    - `BetaManagedAgentsStaticBearerAuthResponse object`

      Static bearer token credential details for an MCP server.

      - `type: "static_bearer"`

      - `mcp_server_url: string`

        URL of the MCP server this credential authenticates against.

    - `BetaManagedAgentsEnvironmentVariableAuthResponse object`

      Environment variable credential details. The secret value is never returned.

      - `type: "environment_variable"`

      - `injection_location: BetaManagedAgentsInjectionLocationResponse`

        Where in the outbound request the secret value is substituted.

        - `body: boolean`

          Whether the placeholder is substituted in the request body.

        - `header: boolean`

          Whether the placeholder is substituted in request header values.

      - `networking: BetaManagedAgentsUnrestrictedCredentialNetworkingResponse or BetaManagedAgentsLimitedCredentialNetworkingResponse`

        Outbound hosts the secret value is substituted on.

        - `BetaManagedAgentsUnrestrictedCredentialNetworkingResponse object`

          The secret is substituted on any host the session's Environment network policy permits egress to.

          - `type: "unrestricted"`

        - `BetaManagedAgentsLimitedCredentialNetworkingResponse object`

          The secret is substituted only on requests to the listed hosts.

          - `type: "limited"`

          - `allowed_hosts: array of string`

            Hostnames on which the secret will be substituted. An entry matches the request host exactly; a `*.`-prefixed entry matches any subdomain of the named domain but not the domain itself.

      - `secret_name: string`

        Name of the environment variable.

  - `created_at: string`

    A timestamp in RFC 3339 format

    format: date-time

  - `metadata: map[string]`

    Arbitrary key-value metadata attached to the credential.

  - `updated_at: string`

    A timestamp in RFC 3339 format

    format: date-time

  - `vault_id: string`

    Identifier of the vault this credential belongs to.

  - `display_name: optional string or null`

    Human-readable name for the credential.

### Beta Managed Agents Credential Networking Params

- `BetaManagedAgentsCredentialNetworkingParams = BetaManagedAgentsUnrestrictedCredentialNetworkingParams or BetaManagedAgentsLimitedCredentialNetworkingParams`

  Substitute the secret on any host the session's Environment network policy permits egress to. The Environment's network policy is the only boundary on where the secret can reach.

  - `BetaManagedAgentsUnrestrictedCredentialNetworkingParams object`

    Substitute the secret on any host the session's Environment network policy permits egress to. The Environment's network policy is the only boundary on where the secret can reach.

    - `type: "unrestricted"`

  - `BetaManagedAgentsLimitedCredentialNetworkingParams object`

    Substitute the secret only on requests to the listed hosts.

    - `type: "limited"`

    - `allowed_hosts: array of string`

      Hostnames on which the secret will be substituted. Each entry is a bare hostname (`api.example.com`), an IPv4 address (`192.0.2.1`), or a `*.`-prefixed wildcard (`*.example.com`). URLs, ports, paths, and IPv6 addresses are not accepted. At most 16 entries.

### Beta Managed Agents Credential Validation

- `BetaManagedAgentsCredentialValidation object`

  Result of live-probing a credential against its configured MCP server.

  - `type: "vault_credential_validation"`

  - `credential_id: string`

    Unique identifier of the credential that was validated.

  - `has_refresh_token: boolean`

    Whether the credential has a refresh token configured.

  - `mcp_probe: BetaManagedAgentsMCPProbe or null`

    The failing step of an MCP validation probe.

    - `http_response: BetaManagedAgentsRefreshHTTPResponse or null`

      An HTTP response captured during a credential validation probe.

      - `body: string`

        Response body. May be truncated and has sensitive values scrubbed.

      - `body_truncated: boolean`

        Whether `body` was truncated.

      - `content_type: string`

        Value of the `Content-Type` response header.

      - `status_code: number`

        HTTP status code.

        format: int32

    - `method: string`

      The MCP method that failed (for example `initialize` or `tools/list`).

  - `refresh: BetaManagedAgentsRefreshObject or null`

    Outcome of a refresh-token exchange attempted during credential validation.

    - `http_response: BetaManagedAgentsRefreshHTTPResponse or null`

      An HTTP response captured during a credential validation probe.

    - `status: "succeeded" or "failed" or "connect_error" or "no_refresh_token"`

      Outcome of a refresh-token exchange attempted during credential validation.

      - `"succeeded"`

      - `"failed"`

      - `"connect_error"`

      - `"no_refresh_token"`

  - `status: BetaManagedAgentsCredentialValidationStatus`

    Overall verdict of a credential validation probe.

    - `"valid"`

    - `"invalid"`

    - `"unknown"`

  - `validated_at: string`

    A timestamp in RFC 3339 format

    format: date-time

  - `vault_id: string`

    Identifier of the vault containing the credential.

### Beta Managed Agents Credential Validation Status

- `BetaManagedAgentsCredentialValidationStatus = "valid" or "invalid" or "unknown"`

  Overall verdict of a credential validation probe.

  - `"valid"`

  - `"invalid"`

  - `"unknown"`

### Beta Managed Agents Deleted Credential

- `BetaManagedAgentsDeletedCredential object`

  Confirmation of a deleted credential.

  - `type: "vault_credential_deleted"`

  - `id: string`

    Unique identifier of the deleted credential.

### Beta Managed Agents Environment Variable Auth Response

- `BetaManagedAgentsEnvironmentVariableAuthResponse object`

  Environment variable credential details. The secret value is never returned.

  - `type: "environment_variable"`

  - `injection_location: BetaManagedAgentsInjectionLocationResponse`

    Where in the outbound request the secret value is substituted.

    - `body: boolean`

      Whether the placeholder is substituted in the request body.

    - `header: boolean`

      Whether the placeholder is substituted in request header values.

  - `networking: BetaManagedAgentsUnrestrictedCredentialNetworkingResponse or BetaManagedAgentsLimitedCredentialNetworkingResponse`

    Outbound hosts the secret value is substituted on.

    - `BetaManagedAgentsUnrestrictedCredentialNetworkingResponse object`

      The secret is substituted on any host the session's Environment network policy permits egress to.

      - `type: "unrestricted"`

    - `BetaManagedAgentsLimitedCredentialNetworkingResponse object`

      The secret is substituted only on requests to the listed hosts.

      - `type: "limited"`

      - `allowed_hosts: array of string`

        Hostnames on which the secret will be substituted. An entry matches the request host exactly; a `*.`-prefixed entry matches any subdomain of the named domain but not the domain itself.

  - `secret_name: string`

    Name of the environment variable.

### Beta Managed Agents Environment Variable Create Params

- `BetaManagedAgentsEnvironmentVariableCreateParams object`

  Parameters for creating an environment variable credential.

  - `type: "environment_variable"`

  - `networking: BetaManagedAgentsCredentialNetworkingParams`

    Outbound hosts the secret value is substituted on.

    - `BetaManagedAgentsUnrestrictedCredentialNetworkingParams object`

      Substitute the secret on any host the session's Environment network policy permits egress to. The Environment's network policy is the only boundary on where the secret can reach.

      - `type: "unrestricted"`

    - `BetaManagedAgentsLimitedCredentialNetworkingParams object`

      Substitute the secret only on requests to the listed hosts.

      - `type: "limited"`

      - `allowed_hosts: array of string`

        Hostnames on which the secret will be substituted. Each entry is a bare hostname (`api.example.com`), an IPv4 address (`192.0.2.1`), or a `*.`-prefixed wildcard (`*.example.com`). URLs, ports, paths, and IPv6 addresses are not accepted. At most 16 entries.

  - `secret_name: string`

    Name of the environment variable. Immutable after create.

    minLength: 1, maxLength: 255

  - `secret_value: string`

    Secret value. Write-only; never returned in responses.

    minLength: 1, maxLength: 4096

  - `injection_location: optional BetaManagedAgentsInjectionLocationParams`

    Where in the outbound request the secret value may be substituted.

    - `body: optional boolean`

      Substitute when the placeholder appears in the request body.

    - `header: optional boolean`

      Substitute when the placeholder appears in a request header value.

### Beta Managed Agents Environment Variable Update Params

- `BetaManagedAgentsEnvironmentVariableUpdateParams object`

  Parameters for updating an environment variable credential. `secret_name` is immutable.

  - `type: "environment_variable"`

  - `injection_location: optional BetaManagedAgentsInjectionLocationUpdateParams`

    Updated injection location.

    - `body: optional boolean`

      Substitute when the placeholder appears in the request body.

    - `header: optional boolean`

      Substitute when the placeholder appears in a request header value.

  - `networking: optional BetaManagedAgentsCredentialNetworkingParams or null`

    Updated networking scope. Full replacement.

    - `BetaManagedAgentsUnrestrictedCredentialNetworkingParams object`

      Substitute the secret on any host the session's Environment network policy permits egress to. The Environment's network policy is the only boundary on where the secret can reach.

      - `type: "unrestricted"`

    - `BetaManagedAgentsLimitedCredentialNetworkingParams object`

      Substitute the secret only on requests to the listed hosts.

      - `type: "limited"`

      - `allowed_hosts: array of string`

        Hostnames on which the secret will be substituted. Each entry is a bare hostname (`api.example.com`), an IPv4 address (`192.0.2.1`), or a `*.`-prefixed wildcard (`*.example.com`). URLs, ports, paths, and IPv6 addresses are not accepted. At most 16 entries.

  - `secret_value: optional string or null`

    Updated secret value.

    minLength: 1, maxLength: 4096

### Beta Managed Agents Injection Location Params

- `BetaManagedAgentsInjectionLocationParams object`

  Where in the outbound request the secret value may be substituted.

  - `body: optional boolean`

    Substitute when the placeholder appears in the request body.

  - `header: optional boolean`

    Substitute when the placeholder appears in a request header value.

### Beta Managed Agents Injection Location Response

- `BetaManagedAgentsInjectionLocationResponse object`

  Where in the outbound request the secret value is substituted.

  - `body: boolean`

    Whether the placeholder is substituted in the request body.

  - `header: boolean`

    Whether the placeholder is substituted in request header values.

### Beta Managed Agents Injection Location Update Params

- `BetaManagedAgentsInjectionLocationUpdateParams object`

  Updated injection location.

  - `body: optional boolean`

    Substitute when the placeholder appears in the request body.

  - `header: optional boolean`

    Substitute when the placeholder appears in a request header value.

### Beta Managed Agents Limited Credential Networking Params

- `BetaManagedAgentsLimitedCredentialNetworkingParams object`

  Substitute the secret only on requests to the listed hosts.

  - `type: "limited"`

  - `allowed_hosts: array of string`

    Hostnames on which the secret will be substituted. Each entry is a bare hostname (`api.example.com`), an IPv4 address (`192.0.2.1`), or a `*.`-prefixed wildcard (`*.example.com`). URLs, ports, paths, and IPv6 addresses are not accepted. At most 16 entries.

### Beta Managed Agents Limited Credential Networking Response

- `BetaManagedAgentsLimitedCredentialNetworkingResponse object`

  The secret is substituted only on requests to the listed hosts.

  - `type: "limited"`

  - `allowed_hosts: array of string`

    Hostnames on which the secret will be substituted. An entry matches the request host exactly; a `*.`-prefixed entry matches any subdomain of the named domain but not the domain itself.

### Beta Managed Agents MCP OAuth Auth Response

- `BetaManagedAgentsMCPOAuthAuthResponse object`

  OAuth credential details for an MCP server.

  - `type: "mcp_oauth"`

  - `mcp_server_url: string`

    URL of the MCP server this credential authenticates against.

  - `expires_at: optional string or null`

    A timestamp in RFC 3339 format

    format: date-time

  - `refresh: optional BetaManagedAgentsMCPOAuthRefreshResponse or null`

    OAuth refresh token configuration returned in credential responses.

    - `client_id: string`

      OAuth client ID.

    - `token_endpoint: string`

      Token endpoint URL used to refresh the access token.

    - `token_endpoint_auth: BetaManagedAgentsTokenEndpointAuthNoneResponse or BetaManagedAgentsTokenEndpointAuthBasicResponse or BetaManagedAgentsTokenEndpointAuthPostResponse`

      Token endpoint requires no client authentication.

      - `BetaManagedAgentsTokenEndpointAuthNoneResponse object`

        Token endpoint requires no client authentication.

        - `type: "none"`

      - `BetaManagedAgentsTokenEndpointAuthBasicResponse object`

        Token endpoint uses HTTP Basic authentication with client credentials.

        - `type: "client_secret_basic"`

      - `BetaManagedAgentsTokenEndpointAuthPostResponse object`

        Token endpoint uses POST body authentication with client credentials.

        - `type: "client_secret_post"`

    - `resource: optional string or null`

      OAuth resource indicator.

    - `scope: optional string or null`

      OAuth scope for the refresh request.

### Beta Managed Agents MCP OAuth Create Params

- `BetaManagedAgentsMCPOAuthCreateParams object`

  Parameters for creating an MCP OAuth credential.

  - `type: "mcp_oauth"`

  - `access_token: string`

    OAuth access token.

    minLength: 1, maxLength: 8192

  - `mcp_server_url: string`

    URL of the MCP server this credential authenticates against.

    minLength: 1, maxLength: 2047

  - `expires_at: optional string or null`

    A timestamp in RFC 3339 format

    format: date-time

  - `refresh: optional BetaManagedAgentsMCPOAuthRefreshParams or null`

    OAuth refresh token parameters for creating a credential with refresh support.

    - `client_id: string`

      OAuth client ID.

      minLength: 1, maxLength: 1024

    - `refresh_token: string`

      OAuth refresh token.

      minLength: 1, maxLength: 8192

    - `token_endpoint: string`

      Token endpoint URL used to refresh the access token.

      minLength: 1, maxLength: 2047

    - `token_endpoint_auth: BetaManagedAgentsTokenEndpointAuthNoneParam or BetaManagedAgentsTokenEndpointAuthBasicParam or BetaManagedAgentsTokenEndpointAuthPostParam`

      Token endpoint requires no client authentication.

      - `BetaManagedAgentsTokenEndpointAuthNoneParam object`

        Token endpoint requires no client authentication.

        - `type: "none"`

      - `BetaManagedAgentsTokenEndpointAuthBasicParam object`

        Token endpoint uses HTTP Basic authentication with client credentials.

        - `type: "client_secret_basic"`

        - `client_secret: string`

          OAuth client secret.

          minLength: 1, maxLength: 512

      - `BetaManagedAgentsTokenEndpointAuthPostParam object`

        Token endpoint uses POST body authentication with client credentials.

        - `type: "client_secret_post"`

        - `client_secret: string`

          OAuth client secret.

          minLength: 1, maxLength: 512

    - `resource: optional string or null`

      OAuth resource indicator.

      minLength: 1, maxLength: 2047

    - `scope: optional string or null`

      OAuth scope for the refresh request.

      minLength: 1, maxLength: 8192

### Beta Managed Agents MCP OAuth Refresh Params

- `BetaManagedAgentsMCPOAuthRefreshParams object`

  OAuth refresh token parameters for creating a credential with refresh support.

  - `client_id: string`

    OAuth client ID.

    minLength: 1, maxLength: 1024

  - `refresh_token: string`

    OAuth refresh token.

    minLength: 1, maxLength: 8192

  - `token_endpoint: string`

    Token endpoint URL used to refresh the access token.

    minLength: 1, maxLength: 2047

  - `token_endpoint_auth: BetaManagedAgentsTokenEndpointAuthNoneParam or BetaManagedAgentsTokenEndpointAuthBasicParam or BetaManagedAgentsTokenEndpointAuthPostParam`

    Token endpoint requires no client authentication.

    - `BetaManagedAgentsTokenEndpointAuthNoneParam object`

      Token endpoint requires no client authentication.

      - `type: "none"`

    - `BetaManagedAgentsTokenEndpointAuthBasicParam object`

      Token endpoint uses HTTP Basic authentication with client credentials.

      - `type: "client_secret_basic"`

      - `client_secret: string`

        OAuth client secret.

        minLength: 1, maxLength: 512

    - `BetaManagedAgentsTokenEndpointAuthPostParam object`

      Token endpoint uses POST body authentication with client credentials.

      - `type: "client_secret_post"`

      - `client_secret: string`

        OAuth client secret.

        minLength: 1, maxLength: 512

  - `resource: optional string or null`

    OAuth resource indicator.

    minLength: 1, maxLength: 2047

  - `scope: optional string or null`

    OAuth scope for the refresh request.

    minLength: 1, maxLength: 8192

### Beta Managed Agents MCP OAuth Refresh Response

- `BetaManagedAgentsMCPOAuthRefreshResponse object`

  OAuth refresh token configuration returned in credential responses.

  - `client_id: string`

    OAuth client ID.

  - `token_endpoint: string`

    Token endpoint URL used to refresh the access token.

  - `token_endpoint_auth: BetaManagedAgentsTokenEndpointAuthNoneResponse or BetaManagedAgentsTokenEndpointAuthBasicResponse or BetaManagedAgentsTokenEndpointAuthPostResponse`

    Token endpoint requires no client authentication.

    - `BetaManagedAgentsTokenEndpointAuthNoneResponse object`

      Token endpoint requires no client authentication.

      - `type: "none"`

    - `BetaManagedAgentsTokenEndpointAuthBasicResponse object`

      Token endpoint uses HTTP Basic authentication with client credentials.

      - `type: "client_secret_basic"`

    - `BetaManagedAgentsTokenEndpointAuthPostResponse object`

      Token endpoint uses POST body authentication with client credentials.

      - `type: "client_secret_post"`

  - `resource: optional string or null`

    OAuth resource indicator.

  - `scope: optional string or null`

    OAuth scope for the refresh request.

### Beta Managed Agents MCP OAuth Refresh Update Params

- `BetaManagedAgentsMCPOAuthRefreshUpdateParams object`

  Parameters for updating OAuth refresh token configuration.

  - `refresh_token: optional string or null`

    Updated OAuth refresh token.

    minLength: 1, maxLength: 8192

  - `scope: optional string or null`

    Updated OAuth scope for the refresh request.

    maxLength: 8192

  - `token_endpoint_auth: optional BetaManagedAgentsTokenEndpointAuthBasicUpdateParam or BetaManagedAgentsTokenEndpointAuthPostUpdateParam`

    Updated HTTP Basic authentication parameters for the token endpoint.

    - `BetaManagedAgentsTokenEndpointAuthBasicUpdateParam object`

      Updated HTTP Basic authentication parameters for the token endpoint.

      - `type: "client_secret_basic"`

      - `client_secret: optional string or null`

        Updated OAuth client secret.

        minLength: 1, maxLength: 512

    - `BetaManagedAgentsTokenEndpointAuthPostUpdateParam object`

      Updated POST body authentication parameters for the token endpoint.

      - `type: "client_secret_post"`

      - `client_secret: optional string or null`

        Updated OAuth client secret.

        minLength: 1, maxLength: 512

### Beta Managed Agents MCP OAuth Update Params

- `BetaManagedAgentsMCPOAuthUpdateParams object`

  Parameters for updating an MCP OAuth credential. The `mcp_server_url` is immutable.

  - `type: "mcp_oauth"`

  - `access_token: optional string or null`

    Updated OAuth access token.

    minLength: 1, maxLength: 8192

  - `expires_at: optional string or null`

    A timestamp in RFC 3339 format

    format: date-time

  - `refresh: optional BetaManagedAgentsMCPOAuthRefreshUpdateParams or null`

    Parameters for updating OAuth refresh token configuration.

    - `refresh_token: optional string or null`

      Updated OAuth refresh token.

      minLength: 1, maxLength: 8192

    - `scope: optional string or null`

      Updated OAuth scope for the refresh request.

      maxLength: 8192

    - `token_endpoint_auth: optional BetaManagedAgentsTokenEndpointAuthBasicUpdateParam or BetaManagedAgentsTokenEndpointAuthPostUpdateParam`

      Updated HTTP Basic authentication parameters for the token endpoint.

      - `BetaManagedAgentsTokenEndpointAuthBasicUpdateParam object`

        Updated HTTP Basic authentication parameters for the token endpoint.

        - `type: "client_secret_basic"`

        - `client_secret: optional string or null`

          Updated OAuth client secret.

          minLength: 1, maxLength: 512

      - `BetaManagedAgentsTokenEndpointAuthPostUpdateParam object`

        Updated POST body authentication parameters for the token endpoint.

        - `type: "client_secret_post"`

        - `client_secret: optional string or null`

          Updated OAuth client secret.

          minLength: 1, maxLength: 512

### Beta Managed Agents MCP Probe

- `BetaManagedAgentsMCPProbe object`

  The failing step of an MCP validation probe.

  - `http_response: BetaManagedAgentsRefreshHTTPResponse or null`

    An HTTP response captured during a credential validation probe.

    - `body: string`

      Response body. May be truncated and has sensitive values scrubbed.

    - `body_truncated: boolean`

      Whether `body` was truncated.

    - `content_type: string`

      Value of the `Content-Type` response header.

    - `status_code: number`

      HTTP status code.

      format: int32

  - `method: string`

    The MCP method that failed (for example `initialize` or `tools/list`).

### Beta Managed Agents Refresh HTTP Response

- `BetaManagedAgentsRefreshHTTPResponse object`

  An HTTP response captured during a credential validation probe.

  - `body: string`

    Response body. May be truncated and has sensitive values scrubbed.

  - `body_truncated: boolean`

    Whether `body` was truncated.

  - `content_type: string`

    Value of the `Content-Type` response header.

  - `status_code: number`

    HTTP status code.

    format: int32

### Beta Managed Agents Refresh Object

- `BetaManagedAgentsRefreshObject object`

  Outcome of a refresh-token exchange attempted during credential validation.

  - `http_response: BetaManagedAgentsRefreshHTTPResponse or null`

    An HTTP response captured during a credential validation probe.

    - `body: string`

      Response body. May be truncated and has sensitive values scrubbed.

    - `body_truncated: boolean`

      Whether `body` was truncated.

    - `content_type: string`

      Value of the `Content-Type` response header.

    - `status_code: number`

      HTTP status code.

      format: int32

  - `status: "succeeded" or "failed" or "connect_error" or "no_refresh_token"`

    Outcome of a refresh-token exchange attempted during credential validation.

    - `"succeeded"`

    - `"failed"`

    - `"connect_error"`

    - `"no_refresh_token"`

### Beta Managed Agents Static Bearer Auth Response

- `BetaManagedAgentsStaticBearerAuthResponse object`

  Static bearer token credential details for an MCP server.

  - `type: "static_bearer"`

  - `mcp_server_url: string`

    URL of the MCP server this credential authenticates against.

### Beta Managed Agents Static Bearer Create Params

- `BetaManagedAgentsStaticBearerCreateParams object`

  Parameters for creating a static bearer token credential.

  - `type: "static_bearer"`

  - `token: string`

    Static bearer token value.

    minLength: 1, maxLength: 8192

  - `mcp_server_url: string`

    URL of the MCP server this credential authenticates against.

    minLength: 1, maxLength: 2047

### Beta Managed Agents Static Bearer Update Params

- `BetaManagedAgentsStaticBearerUpdateParams object`

  Parameters for updating a static bearer token credential. The `mcp_server_url` is immutable.

  - `type: "static_bearer"`

  - `token: optional string or null`

    Updated static bearer token value.

    minLength: 1, maxLength: 8192

### Beta Managed Agents Token Endpoint Auth Basic Param

- `BetaManagedAgentsTokenEndpointAuthBasicParam object`

  Token endpoint uses HTTP Basic authentication with client credentials.

  - `type: "client_secret_basic"`

  - `client_secret: string`

    OAuth client secret.

    minLength: 1, maxLength: 512

### Beta Managed Agents Token Endpoint Auth Basic Response

- `BetaManagedAgentsTokenEndpointAuthBasicResponse object`

  Token endpoint uses HTTP Basic authentication with client credentials.

  - `type: "client_secret_basic"`

### Beta Managed Agents Token Endpoint Auth Basic Update Param

- `BetaManagedAgentsTokenEndpointAuthBasicUpdateParam object`

  Updated HTTP Basic authentication parameters for the token endpoint.

  - `type: "client_secret_basic"`

  - `client_secret: optional string or null`

    Updated OAuth client secret.

    minLength: 1, maxLength: 512

### Beta Managed Agents Token Endpoint Auth None Param

- `BetaManagedAgentsTokenEndpointAuthNoneParam object`

  Token endpoint requires no client authentication.

  - `type: "none"`

### Beta Managed Agents Token Endpoint Auth None Response

- `BetaManagedAgentsTokenEndpointAuthNoneResponse object`

  Token endpoint requires no client authentication.

  - `type: "none"`

### Beta Managed Agents Token Endpoint Auth Post Param

- `BetaManagedAgentsTokenEndpointAuthPostParam object`

  Token endpoint uses POST body authentication with client credentials.

  - `type: "client_secret_post"`

  - `client_secret: string`

    OAuth client secret.

    minLength: 1, maxLength: 512

### Beta Managed Agents Token Endpoint Auth Post Response

- `BetaManagedAgentsTokenEndpointAuthPostResponse object`

  Token endpoint uses POST body authentication with client credentials.

  - `type: "client_secret_post"`

### Beta Managed Agents Token Endpoint Auth Post Update Param

- `BetaManagedAgentsTokenEndpointAuthPostUpdateParam object`

  Updated POST body authentication parameters for the token endpoint.

  - `type: "client_secret_post"`

  - `client_secret: optional string or null`

    Updated OAuth client secret.

    minLength: 1, maxLength: 512

### Beta Managed Agents Unrestricted Credential Networking Params

- `BetaManagedAgentsUnrestrictedCredentialNetworkingParams object`

  Substitute the secret on any host the session's Environment network policy permits egress to. The Environment's network policy is the only boundary on where the secret can reach.

  - `type: "unrestricted"`

### Beta Managed Agents Unrestricted Credential Networking Response

- `BetaManagedAgentsUnrestrictedCredentialNetworkingResponse object`

  The secret is substituted on any host the session's Environment network policy permits egress to.

  - `type: "unrestricted"`
