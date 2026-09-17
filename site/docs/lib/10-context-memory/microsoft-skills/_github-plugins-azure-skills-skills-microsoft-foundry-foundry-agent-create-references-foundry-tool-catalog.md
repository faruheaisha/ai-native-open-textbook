---
title: "Foundry Tool Catalog — Project Connections for Remote Tools"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/foundry-tool-catalog.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/foundry-tool-catalog.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/foundry-tool-catalog.md"
sourceSha256: "4300e98615e73d9574d15cd219ce169decc7d575f1f75ec7d950a31a0b77d65d"
pageSha256: "4300e98615e73d9574d15cd219ce169decc7d575f1f75ec7d950a31a0b77d65d"
contentMode: "local-full"
zh: ""
---

# Foundry Tool Catalog — Project Connections for Remote Tools

Reference for wiring a **remote tool** (catalog tile or generic MCP server) into a Foundry project as a `RemoteTool` project connection, so a toolbox can attach to it.

> 🚦 **Toolbox creation gate:** before creating a toolbox/connection, you MUST read the boundary rules in [create-hosted.md → Toolbox creation boundary](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-create-hosted#toolbox-creation-boundary) and follow them, then continue with the rest of this file.

Three catalog backends cooperate: the **asset-gallery** index discovers connectors, the Logic Apps **managedApis** GET supplies OAuth metadata, and the Logic Apps **apiOperations** GET supplies the operation list and input schemas. Skip these calls only for fully BYO `generic_mcp` servers — every catalog-MCP or connector-namespace flow needs all three.

> 📘 For the toolbox MCP endpoint, protocol, and testing, see [use-toolbox-in-hosted-agent.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-use-toolbox-in-hosted-agent).
> 📘 For prompt-agent MCP wiring (without a toolbox), see [tool-mcp.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-tool-mcp).

## When to use this reference

Use when the user mentions any of:

- *Build → Tools → Connect a tool* (any subtab — Configured, Catalog, Custom)
- "Tool connection", "Remote MCP", "Catalog tile", "Custom · Preview"
- A specific catalog tile (GitHub, Box, Pipedrive, monday.com, Microsoft Learn, …)
- `RemoteTool` connection, `gateway_connector`, `catalog_MCP`, `generic_mcp`
- **Connector Namespace** / managed MCP server (powered by the Connector Namespace)
- "Bring my own OAuth App" (BYO `client_id` + `client_secret`) for a catalog connector
- Discovering connector operations (`x-ms-operations` / Logic Apps `apiOperations`) or trigger support (`x-ms-trigger`) via the catalog APIs

Do **not** use for: non-tool connections (Azure OpenAI, AI Search account, Storage), or general toolbox CRUD beyond the attach-and-verify recipe below.

## Inputs to gather upfront

Before generating any PUT body, ask the user in one batched question for:

1. **Subscription id**
2. **Resource group**
3. **Cognitive Services account name** (the Foundry account)
4. **Project name** (under the account)
5. **Connection name** — lowercase, `[a-z0-9-]`, ≤ 24 chars (e.g. `box-1`, `gh-byo`)
6. **Tool scenario in plain language** — e.g. "list my files in Box", "create issues on GitHub". Map this onto operations from the connector's `apiOperations` catalog for `gateway_connector`, or onto the catalog MCP server's `tools/list` for `catalog_MCP` / BYO.
7. **Toolbox name** to attach into for verification (defaults to `default-tb`)
8. **Secrets** (BYO `clientId` / `clientSecret`, `CustomKeys` header value, …) — ask the user to **type these directly into the terminal**, never via tooling that echoes them

The caller's AAD `oid` / `tid` (needed only for the consent-link step) are auto-discovered via `az ad signed-in-user show --query id -o tsv` and `az account show --query tenantId -o tsv`. For a service-principal caller, use `az ad sp show --id <appId>` instead. These values can also be read from the `oid` / `tid` claims on the ARM bearer token; the gateway validates the caller principal owns them.

## ARM endpoint (shared by every variant)

```
PUT https://management.azure.com/subscriptions/{sub}/resourceGroups/{rg}
    /providers/Microsoft.CognitiveServices/accounts/{acct}
    /projects/{proj}/connections/{name}?api-version=2025-04-01-preview
```

### Preflight RBAC

Caller needs **Foundry Project Manager** or **Cognitive Services Contributor** on the project scope. Run this before the first PUT to surface 403s early:

```pwsh
$oid = az ad signed-in-user show --query id -o tsv
$projId = "/subscriptions/$sub/resourceGroups/$rg/providers/Microsoft.CognitiveServices/accounts/$acct/projects/$proj"
az role assignment list --assignee $oid --scope $projId --include-inherited --all `
  --query "[?roleDefinitionName=='Foundry Project Manager' || roleDefinitionName=='Cognitive Services Contributor'].roleDefinitionName" -o tsv
```

Empty output → caller lacks the required role; expect `403 AuthorizationFailed` on PUT until granted.

### Common request template

```pwsh
$tok = az account get-access-token --resource "https://management.azure.com" --query accessToken -o tsv
$h   = @{ Authorization = "Bearer $tok"; "Content-Type" = "application/json" }
$uri = "https://management.azure.com/subscriptions/$sub/resourceGroups/$rg/providers/Microsoft.CognitiveServices/accounts/$acct/projects/$proj/connections/${connName}?api-version=2025-04-01-preview"
Invoke-WebRequest -Method PUT -Headers $h -UseBasicParsing -Body $body -Uri $uri
```

### Body invariants

- `properties.target` is **required** for every `authType` (validation rejects empty). The exact value depends on the variant — see each body shape. For `gateway_connector` specifically, the literal string `"https://placeholder"` is the correct value on PUT #1 and is **rewritten by the platform on PUT #2** to the real gateway URL.
- `properties.group` is server-filled (`GenericProtocol` for `RemoteTool`).
- `properties.credentials` is scrubbed to `null` on GET.
- `properties.peRequirement` defaults to `"NotRequired"`.

Allowed `authType` for `category=RemoteTool` (per `api-version=2025-04-01-preview`):
`None, CustomKeys, OAuth2, ProjectManagedIdentity, DeveloperConnection, UserEntraToken, AgentUserImpersonation, AgenticIdentityToken, AgenticUser, UserTokenAndProjectManagedIdentity`. `ApiKey` is **rejected** for `RemoteTool`. The authoritative list is whatever the [Cognitive Services projects API reference](https://learn.microsoft.com/rest/api/aiservices/) returns for the current API version — if you hit `invalid_payload: unsupported authType`, re-check against the schema for the version you're calling.

## Decision tree

| User scenario | `authType` | `metadata.type` | Notes |
|---|---|---|---|
| Catalog tile tagged "Custom · Preview" (Box, Pipedrive, GitHub, Salesforce, Outlook, …) | `OAuth2` | `gateway_connector` | **Connector-namespace managed MCP.** Powered by the Connector Namespace in your Foundry account; the namespace handles OAuth, token storage, and per-user passthrough. Needs **two** PUTs plus `listConsentLinks` per caller (see [Gateway connector full flow](#gateway-connector-full-flow)). |
| Catalog MCP tile with Microsoft-managed OAuth (no `client_id` needed) | `OAuth2` | `catalog_MCP` | Foundry brokers the OAuth app for you. The Catalog API tile **prepopulates** `target` (server URL); `listConsentLinks` flow same as gateway. |
| Catalog MCP tile with **your own** OAuth App | `OAuth2` | (omit) | Supply your own `client_id` + `client_secret` + raw `authorizationUrl` / `tokenUrl` / `scopes`. Do **not** mix BYO `credentials` with `metadata.type=catalog_MCP`. See [BYO OAuth caveats](#byo-oauth-app-against-a-catalog-mcp-server). |
| Remote MCP, Azure-side identity (project MI calls the server) | `ProjectManagedIdentity` | `catalog_MCP` *(when listed)* or `generic_mcp` | For catalog-listed MCP servers, prefer `catalog_MCP` so `target` is prepopulated. Requires `audience` in `metadata`. See [PMI limitations](#projectmanagedidentity-limitations). |
| Remote MCP, static shared secret / header key | `CustomKeys` | `catalog_MCP` *(when listed)* or `generic_mcp` | Header **name and format** are NOT always `Authorization: Bearer ...`. Read the required header name from the Catalog API entry's `x-ms-connection-parameters` and use that exact name in `credentials.keys`. |
| Remote MCP, user's Entra token forwarded | `UserEntraToken` | `generic_mcp` | Per-user identity passthrough. Not supported when the agent is published to Teams. Pair with `metadata.audience` for the upstream resource URI. |
| Custom OpenAPI / A2A tool (no MCP) | varies | n/a | Use the Custom subtab shapes; outside the MCP toolbox path. See [Custom subtab — OpenAPI / A2A](#custom-subtab--openapi--a2a). |

## Catalog APIs — three backends, three calls

There are **three** read endpoints the portal hits to populate a connection form. Programmatic callers should use the same three.

### 1. Asset-gallery (Foundry's index)

```
POST https://eastus.api.azureml.ms/asset-gallery/v1.0/tools
Headers:
  Authorization: Bearer <token for https://management.azure.com>
  Content-Type: application/json
Body:
{
  "freeTextSearch": "*",
  "filters": [
    { "field": "entityContainerId", "operator": "eq",       "values": ["connectors-registry-prod-bl"] },
    { "field": "type",              "operator": "eq",       "values": ["tools"] },
    { "field": "annotations/name",  "operator": "contains", "values": ["<name>"] }
  ],
  "pageSize": 20
}
```

- **Catalog lives only in `eastus`.** `westus2.api.azureml.ms` returns `totalCount=0` for the same body. `entityId`s are portable across project regions.
- Use this **only to discover the connector's `entityId`** — pull `objectId` out of the returned `entityId` (e.g. `…/objectId/github`). That `objectId` is the `connectorName` you pass to PUTs and the next two catalog calls.
- The response is a **thin index**. `properties.remotes[]`, `xMsSecuritySchemes`, OAuth endpoints, scopes, and operation schemas are **not** included. Direct `GET /asset-gallery/v1.0/tools/\{entityId\}` returns 404. There is no expand/projection flag that surfaces these fields — fetch them from calls 2 and 3 below.

Two registries are indexed here — distinguished by `entityContainerId`:

| Registry | `entityContainerId` | Contents | Pair with |
|---|---|---|---|
| Public catalog | `connectors-registry-prod-bl` | Catalog connector definitions (GitHub, Box, Salesforce, …). | `metadata.type=catalog_MCP` or `gateway_connector` |
| Private MCP entries | `registry-prod-bl` | MCP-server entries used by the portal Connections UI (e.g. `github-mcp-server`). Sometimes carries a canonical MCP URL when the public-catalog row lacks `remotes[]`. | `metadata.type=catalog_MCP` |

Always query both when surfacing "available tools" to a user — the private MCP entries can fill gaps in the public catalog row.

### 2. Logic Apps **managedApis** — OAuth source-of-truth

```
GET https://management.azure.com/subscriptions/{sub}
    /providers/Microsoft.Web/locations/{region}/managedApis/{connectorName}
    ?api-version=2016-06-01
```

`connectorName` is the `objectId` from the asset-gallery `entityId`. Verified response shape for `github` (2026-05-21):

```jsonc
{
  "properties": {
    "displayName": "GitHub",
    "runtimeUrls": ["https://logic-apis-eastus.azure-apim.net/apim/github"],
    "connectionParameters": {
      "token": {
        "type": "oauthSetting",
        "oAuthSettings": {
          "identityProvider": "GitHub",
          "clientId": "faa5f56b825cbc649ae1",          // Microsoft's default OAuth-App id
          "scopes": ["repo","workflow","read:org","admin:org"],
          "redirectMode": "Direct",
          "redirectUrl": "https://logic-apis-eastus.consent.azure-apim.net/redirect"
        }
      }
    }
  }
}
```

**Raw `authorizationUrl` / `tokenUrl` are NOT in this response.** Logic Apps abstracts them via the `identityProvider` string and resolves them inside the gateway. For BYO you must map `identityProvider → endpoints` yourself. Known mappings:

| `identityProvider` | `authorizationUrl` | `tokenUrl` |
|---|---|---|
| `GitHub` | `https://github.com/login/oauth/authorize` | `https://github.com/login/oauth/access_token` |
| `Google` | `https://accounts.google.com/o/oauth2/v2/auth` | `https://oauth2.googleapis.com/token` |
| `Box` | `https://account.box.com/api/oauth2/authorize` | `https://api.box.com/oauth2/token` |
| `AzureActiveDirectory` / `aad3rdPartySNI` | `https://login.microsoftonline.com/common/oauth2/v2.0/authorize` | `https://login.microsoftonline.com/common/oauth2/v2.0/token` |

For `identityProvider` values not in this table (`dynamicscrmonlinecertificate`, `salesforce`, `dropbox`, `oauth2generic`, …), look the provider's well-known OAuth endpoints up in its developer docs — the catalog API does not surface them.

Use the `scopes` array from this response as the default scopes list. The catalog `clientId` is Microsoft's default OAuth App; replace it with your own only when going BYO.

Derive `authType` from `connectionParameters`:

- Any parameter with `type: oauthSetting` → `authType = OAuth2`.
- Else any parameter with `type: securestring` → `authType = CustomKeys`.
- Else → `authType = None` (anonymous) or `ProjectManagedIdentity` if the connector explicitly supports MI.

### 3. Logic Apps **apiOperations** — operation catalog (`gateway_connector` only)

For `gateway_connector` you need the list of operations the connector exposes plus each operation's parameter schema, because that's what gets serialized into `metadata.mcpserverConfigProperties` on PUT #2. Asset-gallery does not carry this.

```
GET https://management.azure.com/subscriptions/{sub}
    /providers/Microsoft.Web/locations/{region}/managedApis/{connectorName}
    /apiOperations?api-version=2016-06-01
```

Returns `value[]` of operations with `name`, `properties.summary` (display name), `properties.description`, `properties.annotation.family`, and `properties.visibility` (`important` / `advanced` / `internal`). Verified 2026-05-21: Box returns 14 operations including `ListRootFolder`, `ListFolder`, `GetFileMetadata`, `GetFileContent`, `DeleteFile`, `CreateFile`, plus several `On*` triggers (not agent-callable).

To get parameter schemas, fetch a single operation with `$expand=properties/inputsDefinition`:

```
GET .../managedApis/{connectorName}/apiOperations/{operationName}
    ?api-version=2016-06-01&$expand=properties/inputsDefinition
```

`properties.inputsDefinition` is a JSON-Schema-shaped object with `type:"object"`, `properties:\{...\}`, and `required:[...]`. Map each entry to one `agentParameters` entry:

| `inputsDefinition.properties[name]` field | → `agentParameters[].schema` field |
|---|---|
| `type` | `type` |
| `description` | `description` |
| `title` | `x-ms-summary` |
| `default` | `default` (omit if absent) |

If `inputsDefinition.properties` is empty / missing, the operation takes no arguments and `agentParameters` is `[]` (e.g. Box `ListRootFolder`).

Skip any operation whose `properties.isWebhook` or `isNotification` is `true` — these are Logic Apps triggers, not agent-callable actions.

**Picking ops from a plain-language scenario.** Match the user's words against `properties.summary` and `properties.description`, then prefer the simplest variant (fewest required parameters) and the one whose `annotation.family` aligns with the user intent. For Box "list my files", `ListRootFolder` (zero params) wins over `ListFolder` (requires `id`); if the user asks to list a specific folder, register both.

## Gateway connector full flow

For Catalog tiles tagged `Custom · Preview` (Box, Pipedrive, GitHub, Salesforce, Outlook, iManage Work, PDF4me, Qdrant, Medallia, Fulcrum, monday.com, SuperMCP, IA-Connect JML, iMIS, Huddo Boards, The Events Calendar, PUG Gamified Engagement, Nitro Sign Enterprise Verified, Soft1, Elfsquad Product Configurator, MintNFT, …).

### Step 1 — Discover

Query the asset-gallery (call #1) for the connector. Extract:

- `objectId` from `entityId` → `connectorName`
- Full `entityId` → `metadata.toolEntityId`

Then call managedApis (call #2) and apiOperations (call #3) for OAuth and operation metadata.

### Step 2 — PUT #1 (create connection)

Verbatim PUT body (captured from the portal's Box wizard, 2026-05-21):

```json
{
  "properties": {
    "authType": "OAuth2",
    "category": "RemoteTool",
    "target": "https://placeholder",
    "credentials": {},
    "connectorName": "box",
    "metadata": {
      "type": "gateway_connector",
      "toolEntityId": "azureml://location/eastus/apiCenter/connectors-registry-prod-bl/type/tools/objectId/box/version/1",
      "connectionproperties": "{\"connectorName\":\"box\"}"
    }
  }
}
```

Spelling traps (case-sensitive):

- `toolEntityId` — NOT `entityId`.
- `connectionproperties` — **lowercase**, value is a **stringified JSON object**, not a nested object. `"\{\"connectorName\":\"box\"\}"` is correct; `\{"connectorName":"box"\}` is rejected.
- `connectorName` appears at top-level under `properties` **and** inside `metadata` and inside `connectionproperties`.

`target = "https://placeholder"` is the **persisted value on PUT #1**, not a stub. There is no follow-up call that rewrites it before PUT #2. Runtime dispatch keys off `metadata.toolEntityId` + `metadata.connectionproperties.connectorName` + OAuth consent state. PUT #2 (register-actions) rewrites `target` to the real gateway URL `https://app-XX.<region>.logic.azure.com/api/connectorGateways/\{envId\}/mcpServerConfigs/\{connectionName\}/mcp`.

### Step 3 — Per-caller consent

For every distinct end-user (or service principal), call `listConsentLinks`:

```
POST .../connections/{name}/listConsentLinks?api-version=2025-04-01-preview
```

Verbatim portal body:

```json
{
  "parameters": [{
    "objectId":      "<caller AAD oid>",
    "parameterName": "token",
    "redirectUrl":   "https://ai.azure.com/nextgen/authConsentPopup",
    "tenantId":      "<caller AAD tid>"
  }]
}
```

Notes:

- The portal sends `redirectUrl=https://int.ai.azure.com/...` from the INT environment; for production (`ai.azure.com`) use `https://ai.azure.com/nextgen/authConsentPopup`. The redirect URL only gates which Foundry origin the OAuth popup closes back into — it does not affect what tokens are minted.
- Returns a per-user OAuth authorization URL (e.g. a `box.com/api/oauth2/authorize?...` link). User navigates → consents → gateway stores the token.
- Cross-tenant calls return `InvalidConsentLinkParameter` (`objectId` + `tenantId` must match the caller principal).

#### Consent link expiry (~1 hour)

Each `listConsentLinks` response mints a short-lived signed token (≈ 1 hour TTL based on `ExpirationTime` in the base64 payload). A `500` from the consent host when clicking the link is most often caused by an **expired or stale link**, not a server outage. Fix: call `listConsentLinks` again to get a fresh link and use it immediately. Do not reuse a link from a previous step or previous session.

#### Portal popup lifecycle (pending-true happy path)

The portal pre-opens a blank popup (`about:blank`) before calling `listConsentLinks`, then drives the flow as follows once the consent URL is in hand. Code-first callers should replicate this:

1. Register listeners on `window.postMessage` **and** `BroadcastChannel('connector-oauth-callback')` to receive completion signals.
2. Navigate the popup to the consent URL.
3. Poll `popup.closed` every 1 second to detect finish / dismiss.
4. When the popup closes, wait **500 ms** grace for any in-flight postMessage / BroadcastChannel messages.
5. If a `\{ pending: true \}` signal arrives (consent completed server-side but no authorization code returned to the opener):
   - Issue a **PUT** to the connection (same body as the original create PUT) to prompt the backend to finalise auth state.
   - If `overallStatus` is `Connected` in the response, done ✅.
   - Otherwise **poll `GET .../connections/\{name\}`** every 2 seconds, up to **15 attempts**, until `overallStatus` flips to `Connected`.
6. If **no signal** before popup close, treat as user-cancelled and surface an error.
7. **Cleanup:** remove listeners, clear polling, force-close the popup if still open.

The `\{ pending: true \}` path is the normal happy-path because the provider closes the popup by redirecting to `ai.azure.com/nextgen/authConsentPopup`, which has no JavaScript opener to post back to. **Don't assume consent is done just because the popup closed.** The "blank Foundry page" seen after authorising in a detached tab is this same redirect arriving without an opener — the gateway token is still stored; retry PUT #2 to confirm.

#### Consent-host hosts

Links served from `logic-apis-df.consent.azure-apim.net` are the **dogfood / INT** consent host (DF = dogfood). Production region traffic goes through `logic-apis-\{region\}.consent.azure-apim.net` (e.g. `logic-apis-eastus.consent.azure-apim.net`). Either host can return DF links depending on which Logic Apps environment the connector is deployed in; the caller cannot force the host.

#### Dogfood OAuth-app runtime allowlist trap

Some connectors (Spotify `spotifyip` confirmed) are backed by a **dogfood-env Microsoft OAuth app** registered in provider "development mode" with a hard-coded test-user allowlist. Consent + `Connected` status work fine code-first for any caller, but `tools/call` at runtime returns:

```json
{ "error": { "code": 403, "source": "...logic-df.azure-apihub.net",
  "innerError": "Check settings on https://developer.spotify.com/dashboard, the user may not be registered." } }
```

Detect by inspecting the consent URL's first 302: if the `redirect_uri` is `https://global-test.consent.azure-apim.net/redirect` (rather than `global.consent...`), the connector is on the dogfood OAuth app. **The connection will still go Connected and `tools/list` will work**; only the actual API invocation fails. Not fixable client-side; requires Microsoft to promote the app or add the caller's email to the provider-side allowlist.

```pwsh
$consentUrl = ($r.Content | ConvertFrom-Json).value[0].link
try { Invoke-WebRequest -Uri $consentUrl -MaximumRedirection 0 -ErrorAction Stop | Out-Null }
catch { $loc = $_.Exception.Response.Headers.Location.ToString() }
if ($loc -match 'global-test\.consent\.azure-apim\.net') {
  Write-Warning "Connector uses dogfood OAuth app; tools/call may 403 with 'user may not be registered' even after Connected."
}
```

### Step 4 — PUT #2 (register actions)

After OAuth, the portal issues a **second PUT** against the **same connection name** to register which connector operations the agent can invoke. **Without this PUT the runtime has no actions to dispatch even though `overallStatus` shows `Authenticated`.**

The body is identical to PUT #1 plus an additional `metadata.mcpserverConfigProperties` field (stringified JSON). Verbatim example for Box connection `box-5`:

```jsonc
{
  "properties": {
    "authType": "OAuth2",
    "category": "RemoteTool",
    "target": "https://placeholder",
    "credentials": {},
    "connectorName": "box",
    "metadata": {
      "type": "gateway_connector",
      "toolEntityId": "azureml://location/eastus/apiCenter/connectors-registry-prod-bl/type/tools/objectId/box/version/1",
      "connectionproperties": "{\"connectorName\":\"box\"}",
      "mcpserverConfigProperties": "{\"description\":\"\",\"state\":\"Enabled\",\"connectors\":[{\"name\":\"box\",\"connectionName\":\"box-5\",\"displayName\":\"box\",\"description\":\"\",\"operations\":[{\"name\":\"GetFileMetadata\",\"displayName\":\"Get file metadata using id\",\"description\":\"\",\"userParameters\":[],\"agentParameters\":[{\"name\":\"id\",\"schema\":{\"type\":\"string\",\"description\":\"The unique identifier of the file in Box.\",\"x-ms-summary\":\"File Id\"}}]}]}]}"
    }
  }
}
```

Decoded `mcpserverConfigProperties` schema:

```jsonc
{
  "description": "",
  "state": "Enabled",
  "connectors": [
    {
      "name":           "<connectorName>",       // same as properties.connectorName
      "connectionName": "<this connection name>",
      "displayName":    "<connectorName>",
      "description":    "",
      "operations": [
        {
          "name":            "<OperationId>",    // operation id from apiOperations
          "displayName":     "<friendly>",
          "description":     "",
          "userParameters":  [],                   // bound at connection time (rare for Custom·Preview)
          "agentParameters": [                     // parameters the agent fills at call time
            {
              "name": "<paramName>",
              "schema": {
                "type":         "string|number|boolean",
                "description":  "...",
                "x-ms-summary": "...",
                "default":      "..."              // optional
              }
            }
          ]
        }
      ]
    }
  ]
}
```

Each operation in `operations[]` corresponds 1:1 to one `apiOperations` entry; `agentParameters[].schema` is translated from `inputsDefinition.properties` per the mapping in [Catalog APIs §3](#3-logic-apps-apioperations--operation-catalog-gateway_connector-only).

The portal lets the user multi-select via checkboxes in the wizard's "Configure actions" page; the selection is serialized into this string. When the selection changes later, the portal **replaces `mcpserverConfigProperties` wholesale** — no merge. Your code must do the same: any time the agent-callable op list changes, re-run PUT #2 with the full new list.

### Step 5 — `overallStatus` flip semantics

Two independent conditions must BOTH be true for `overallStatus` to flip `Unauthenticated` → `Connected`:

1. **PUT #2 issued with non-empty `metadata.mcpserverConfigProperties`** (rewrites `target` to the real gateway URL; target rewrite is visible immediately on PUT #2 regardless of consent state).
2. **OAuth consent completed** (user followed the `listConsentLinks` URL and clicked Authorize). Gateway then stores the token.

Order-independent observations:

- PUT #2 before consent → `target` rewrites, status stays `Unauthenticated`.
- Consent before PUT #2 → status stays `Unauthenticated` until PUT #2 fires; PUT #2 then flips to `Connected` in the same response.

## Body shape — `OAuth2` + `catalog_MCP` (Microsoft-managed OAuth)

Use when the catalog entry is an MCP server and you accept Microsoft's managed OAuth App + consent flow (no BYO secret):

```json
{
  "properties": {
    "authType": "OAuth2",
    "category": "RemoteTool",
    "target": "https://api.githubcopilot.com/mcp",
    "credentials": {},
    "metadata": {
      "type": "catalog_MCP",
      "toolEntityId": "azureml://location/eastus/apiCenter/connectors-registry-prod-bl/type/tools/objectId/github/version/1"
    },
    "peRequirement": "NotRequired"
  }
}
```

For MCP URL discovery when `connectors-registry-prod-bl` lacks `remotes[]`, look up the peer entry in `registry-prod-bl` (e.g. `github-mcp-server`) — its asset-gallery row sometimes carries the canonical MCP URL. Consent uses the same `listConsentLinks` flow as gateway_connector.

## BYO OAuth App against a catalog MCP server
