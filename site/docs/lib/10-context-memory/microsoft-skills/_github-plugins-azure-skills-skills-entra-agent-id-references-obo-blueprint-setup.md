---
title: "OBO Blueprint Setup"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/entra-agent-id/references/obo-blueprint-setup.md"
sourceRel: ".github/plugins/azure-skills/skills/entra-agent-id/references/obo-blueprint-setup.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/entra-agent-id/references/obo-blueprint-setup.md"
sourceSha256: "83aa3208ced36e82d899a68ad39aef94e95747d04ffea6a653cc6f5cb8e834e2"
pageSha256: "83aa3208ced36e82d899a68ad39aef94e95747d04ffea6a653cc6f5cb8e834e2"
contentMode: "local-full"
zh: ""
---

# OBO Blueprint Setup

To use **OBO (on-behalf-of)** mode — where an agent acts on behalf of a user — the Blueprint must be configured as an OAuth2 API so the user's token can target it as audience.

## Configure the Blueprint as an API

Apply once via `PATCH /applications/\{blueprint_obj_id\}`:

```python
import uuid

scope_id = str(uuid.uuid4())
patch = {
    "identifierUris": [f"api://{blueprint_app_id}"],
    "api": {
        "requestedAccessTokenVersion": 2,
        "oauth2PermissionScopes": [{
            "id": scope_id,
            "adminConsentDescription": "Allow the app to access the agent API on behalf of the user.",
            "adminConsentDisplayName": "Access agent API",
            "userConsentDescription": "Allow the app to access the agent API on your behalf.",
            "userConsentDisplayName": "Access agent API",
            "value": "access_as_user",
            "type": "User",
            "isEnabled": True,
        }],
        "preAuthorizedApplications": [{
            "appId": client_app_id,   # Your front-end or CLI app's appId
            "permissionIds": [scope_id],
        }],
    },
    "optionalClaims": {
        "accessToken": [{
            "name": "idtyp",
            "source": None,
            "essential": False,
            "additionalProperties": ["include_user_token"],
        }]
    },
}
requests.patch(
    f"{GRAPH}/applications/{blueprint_obj_id}",
    headers=headers, json=patch,
).raise_for_status()
```

All four pieces are required:

1. **`identifierUris`** — enables `api://\{appId\}` as audience.
2. **`oauth2PermissionScopes`** — defines the `access_as_user` scope users can consent to.
3. **`preAuthorizedApplications`** — authorizes your client app and skips the consent prompt.
4. **`optionalClaims`** — emits the `idtyp` claim needed for token-type validation.

## Grant Delegated Permissions to Each Agent Identity

Each Agent Identity needs `oauth2PermissionGrants` specifying which Graph delegated permissions it may exercise on behalf of users:

```python
from datetime import datetime, timedelta, timezone

expiry = (datetime.now(timezone.utc) + timedelta(days=3650)).strftime("%Y-%m-%dT%H:%M:%SZ")

requests.post(
    f"{GRAPH}/oauth2PermissionGrants",
    headers=headers,
    json={
        "clientId": agent_sp_id,     # Agent Identity SP object ID
        "consentType": "AllPrincipals",
        "resourceId": graph_sp_id,   # Microsoft Graph SP object ID
        "scope": "User.Read Tasks.ReadWrite",
        "expiryTime": expiry,
    },
).raise_for_status()
```

## Acquire the User Token — Targeting the Blueprint

```python
from azure.identity import InteractiveBrowserCredential

credential = InteractiveBrowserCredential(
    tenant_id=tenant_id,
    client_id=client_app_id,   # Your client app, NOT the Blueprint
    redirect_uri="http://localhost:8400",
)
user_token = credential.get_token(f"api://{blueprint_app_id}/access_as_user")
```

> If the user token targets `https://graph.microsoft.com` instead of the Blueprint, the OBO exchange returns `AADSTS50013: Assertion failed signature validation`.

Then feed `user_token.token` into `exchange_obo(...)` from [runtime-token-exchange.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-agent-id-references-runtime-token-exchange).

## Per-Agent Scoping

Different agents can have different permission boundaries:

```python
AGENT_SCOPES = {
    "it-helpdesk":   "User.Read Tasks.ReadWrite",
    "comms-agent":   "User.Read Mail.Send Calendars.ReadWrite",
    "hr-onboarding": "User.Read User.ReadBasic.All",
}

for agent_name, scopes in AGENT_SCOPES.items():
    grant_delegated(agent_identities[agent_name], scopes)
```

## Key Rules (OBO)

- **User token audience = Blueprint** (`api://\{blueprint_app_id\}/access_as_user`), not Graph.
- **Use `/.default` scope** on the OBO exchange step.
- **`expiryTime` is required** on `oauth2PermissionGrants` for Agent Identity grants.
- **Browser-based admin consent URLs do not work** for Agent Identities — use `oauth2PermissionGrants` API for programmatic consent.
- **`Group.ReadWrite.All`** cannot be granted as a delegated permission to Agent Identities. `Tasks.ReadWrite` alone covers Planner task operations.
- Not every Graph scope is allowed for Agent Identities — test each new scope.
