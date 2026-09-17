---
title: "Microsoft Entra Agent ID"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/entra-agent-id/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/entra-agent-id/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/entra-agent-id/SKILL.md"
sourceSha256: "ae56d3b42323dd25ed5ab7988fad3810487d3fbadfcb348b086182305d4e0784"
pageSha256: "ae56d3b42323dd25ed5ab7988fad3810487d3fbadfcb348b086182305d4e0784"
contentMode: "local-full"
zh: ""
---

# Microsoft Entra Agent ID

Create and manage OAuth 2.0-capable identities for AI agents using Microsoft Graph. Every agent instance gets a distinct identity, audit trail, and independently-scoped permission grants.

## Quick Reference

| Property | Value |
|----------|-------|
| Service | Microsoft Entra Agent ID |
| API | Microsoft Graph (`https://graph.microsoft.com/v1.0`) |
| Required role | Agent Identity Developer, Agent Identity Administrator, or Application Administrator |
| Object model | Blueprint (application) → BlueprintPrincipal (SP) → Agent Identity (SP) |
| Runtime exchange | Two-step `fmi_path` exchange (autonomous and OBO) |
| .NET helper | `Microsoft.Identity.Web.AgentIdentities` |
| Polyglot helper | Microsoft Entra SDK for AgentID (sidecar container) |

## When to Use This Skill

- Provisioning a new Agent Identity Blueprint and BlueprintPrincipal
- Creating per-instance Agent Identities under a Blueprint
- Configuring credentials (FIC, Managed Identity, or client secret) on the Blueprint
- Implementing the two-step `fmi_path` runtime token exchange (autonomous or OBO)
- Cross-tenant agent token flows
- Deploying the Microsoft Entra SDK for AgentID sidecar for polyglot agents (Python, Node, Go, Java)
- Granting per-Agent-Identity application (`appRoleAssignments`) or delegated (`oauth2PermissionGrants`) permissions
- Diagnosing Agent ID errors such as `AADSTS82001`, `AADSTS700211`, or `PropertyNotCompatibleWithAgentIdentity`

## MCP Tools

| Tool | Use |
|------|-----|
| `mcp_azure_mcp_documentation` | Search Microsoft Learn for current Agent ID setup, Graph API shapes, and SDK configuration |

There is no dedicated Agent Identity MCP server today. This skill guides direct Microsoft Graph API calls (PowerShell or Python `requests`). Use `mcp_azure_mcp_documentation` to verify request bodies and endpoints against current docs before running.

## Before You Start

Use the `mcp_azure_mcp_documentation` tool to search Microsoft Learn for current Agent ID documentation:
- "Microsoft Entra Agent ID setup instructions"
- "Microsoft Entra SDK for AgentID"

Verify request bodies and endpoints against the installed SDK version — Graph API shapes evolve.

## Conceptual Model

```
Agent Identity Blueprint (application)         ← one per agent type/project
  └── BlueprintPrincipal (service principal)    ← MUST be created explicitly
        ├── Agent Identity (SP): agent-1        ← one per agent instance
        ├── Agent Identity (SP): agent-2
        └── Agent Identity (SP): agent-3
```

| Concept | Description |
|---------|-------------|
| **Blueprint** | Application object that defines a type/class of agent. Holds credentials (secret, certificate, federated identity). |
| **BlueprintPrincipal** | Service principal for the Blueprint in the tenant. Not auto-created. |
| **Agent Identity** | Service-principal-only identity for a single agent instance. Cannot hold its own credentials. |
| **Sponsor** | A User (or Group, for Agent Identity) who is responsible for the identity. Required on creation. |

## Prerequisites

### Required Entra Roles

One of: **Agent Identity Developer**, **Agent Identity Administrator**, or **Application Administrator**.

### PowerShell (interactive setup)

```powershell
# PowerShell 7+
Install-Module Microsoft.Graph.Applications -Scope CurrentUser -Force
```

### Python (programmatic provisioning)

```bash
pip install azure-identity requests
```

## Authentication

> **`DefaultAzureCredential` is not supported.** Azure CLI tokens carry `Directory.AccessAsUser.All`, which Agent Identity APIs hard-reject (403). Use a dedicated app registration with `client_credentials`, or `Connect-MgGraph` with explicit delegated scopes.

### PowerShell (delegated)

```powershell
Connect-MgGraph -Scopes @(
    "AgentIdentityBlueprint.Create",
    "AgentIdentityBlueprint.ReadWrite.All",
    "AgentIdentityBlueprintPrincipal.Create",
    "AgentIdentity.Create.All",
    "User.Read"
)
```

### Python (application)

```python
import os, requests
from azure.identity import ClientSecretCredential

credential = ClientSecretCredential(
    tenant_id=os.environ["AZURE_TENANT_ID"],
    client_id=os.environ["AZURE_CLIENT_ID"],
    client_secret=os.environ["AZURE_CLIENT_SECRET"],
)
token = credential.get_token("https://graph.microsoft.com/.default")

GRAPH = "https://graph.microsoft.com/v1.0"
headers = {
    "Authorization": f"Bearer {token.token}",
    "Content-Type": "application/json",
    "OData-Version": "4.0",
}
```

## Core Workflow

### Step 1: Create Agent Identity Blueprint

Use the typed endpoint. Sponsors must be **Users** at Blueprint creation. This snippet assumes the `requests` client and `headers` dict from the Python authentication block above.

```python
import subprocess
import requests

user_id = subprocess.run(
    ["az", "ad", "signed-in-user", "show", "--query", "id", "-o", "tsv"],
    capture_output=True, text=True, check=True,
).stdout.strip()

blueprint_body = {
    "displayName": "My Agent Blueprint",
    "sponsors@odata.bind": [
        f"https://graph.microsoft.com/v1.0/users/{user_id}"
    ],
}
resp = requests.post(
    f"{GRAPH}/applications/microsoft.graph.agentIdentityBlueprint",
    headers=headers, json=blueprint_body,
)
resp.raise_for_status()

blueprint = resp.json()
app_id = blueprint["appId"]
blueprint_obj_id = blueprint["id"]
```

### Step 2: Create BlueprintPrincipal

> Mandatory. Creating a Blueprint does NOT auto-create its service principal. Skipping this step produces:
> `400: The Agent Blueprint Principal for the Agent Blueprint does not exist.`

```python
sp_body = {"appId": app_id}
resp = requests.post(
    f"{GRAPH}/servicePrincipals/microsoft.graph.agentIdentityBlueprintPrincipal",
    headers=headers, json=sp_body,
)
resp.raise_for_status()
```

Make your provisioning scripts idempotent — always check for the BlueprintPrincipal even when the Blueprint already exists.

### Step 3: Create Agent Identities

Sponsors for an Agent Identity may be **Users or Groups**.

```python
agent_body = {
    "displayName": "my-agent-instance-1",
    "agentIdentityBlueprintId": app_id,
    "sponsors@odata.bind": [
        f"https://graph.microsoft.com/v1.0/users/{user_id}"
    ],
}
resp = requests.post(
    f"{GRAPH}/servicePrincipals/microsoft.graph.agentIdentity",
    headers=headers, json=agent_body,
)
resp.raise_for_status()
agent = resp.json()
agent_sp_id = agent["id"]
```

## Runtime Authentication

Agents authenticate at runtime using credentials configured on the **Blueprint** (not on the Agent Identity — Agent Identities can't hold credentials).

| Option | Use case | Credential on Blueprint |
|--------|----------|------------------------|
| **Managed Identity + WIF** | Production (Azure-hosted) | Federated Identity Credential |
| **Client secret** | Local dev / testing | Password credential |
| **Microsoft Entra SDK for AgentID** | Polyglot / 3P agents | Sidecar container acquires tokens over HTTP |

For the two-step `fmi_path` exchange (parent token → per-Agent-Identity Graph token) that gives each agent instance a distinct `sub` claim and audit trail, see [references/runtime-token-exchange.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-agent-id-references-runtime-token-exchange).

For OBO (agent acting on behalf of a user), see [references/obo-blueprint-setup.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-agent-id-references-obo-blueprint-setup).

For the containerized polyglot auth sidecar (Python, Node, Go, Java — no SDK embedding), see [references/sdk-sidecar.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-agent-id-references-sdk-sidecar).

For MI+WIF and client-secret setup details, see [references/oauth2-token-flow.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-agent-id-references-oauth2-token-flow).

### .NET quick path

For .NET services, use **`Microsoft.Identity.Web.AgentIdentities`** — it handles Federated Identity Credential management and the two-step exchange for you. See the package README at `github.com/AzureAD/microsoft-identity-web` under `src/Microsoft.Identity.Web.AgentIdentities/`.

## Granting Permissions (Per Agent Identity)

Agent Identities support both application permissions (autonomous) and delegated permissions (OBO). Grants are scoped **per Agent Identity**, not to the BlueprintPrincipal.

### Application permissions (autonomous)

```python
graph_sp = requests.get(
    f"{GRAPH}/servicePrincipals?$filter=appId eq '00000003-0000-0000-c000-000000000000'",
    headers=headers,
).json()["value"][0]

user_read_all = next(r for r in graph_sp["appRoles"] if r["value"] == "User.Read.All")

requests.post(
    f"{GRAPH}/servicePrincipals/{agent_sp_id}/appRoleAssignments",
    headers=headers,
    json={
        "principalId": agent_sp_id,
        "resourceId": graph_sp["id"],
        "appRoleId": user_read_all["id"],
    },
).raise_for_status()
```

### Delegated permissions (OBO)

```python
from datetime import datetime, timedelta, timezone

expiry = (datetime.now(timezone.utc) + timedelta(days=3650)).strftime("%Y-%m-%dT%H:%M:%SZ")

requests.post(
    f"{GRAPH}/oauth2PermissionGrants",
    headers=headers,
    json={
        "clientId": agent_sp_id,
        "consentType": "AllPrincipals",
        "resourceId": graph_sp["id"],
        "scope": "User.Read Tasks.ReadWrite Mail.Send",
        "expiryTime": expiry,
    },
).raise_for_status()
```

Browser-based admin consent URLs do not work for Agent Identities — use `oauth2PermissionGrants` for programmatic delegated consent.

## Cross-Tenant Agent Identities

Blueprints can be multi-tenant (`signInAudience: AzureADMultipleOrgs`). When exchanging tokens cross-tenant:

> **Step 1 of the parent token exchange MUST target the Agent Identity's home tenant**, not the Blueprint's. Wrong tenant → `AADSTS700211: No matching federated identity record found`.

See [references/runtime-token-exchange.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-agent-id-references-runtime-token-exchange) for full cross-tenant examples.

## API Reference

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Create Blueprint | `POST` | `/applications/microsoft.graph.agentIdentityBlueprint` |
| Create BlueprintPrincipal | `POST` | `/servicePrincipals/microsoft.graph.agentIdentityBlueprintPrincipal` |
| Create Agent Identity | `POST` | `/servicePrincipals/microsoft.graph.agentIdentity` |
| Add FIC to Blueprint | `POST` | `/applications/\{id\}/microsoft.graph.agentIdentityBlueprint/federatedIdentityCredentials` |
| List Agent Identities | `GET` | `/servicePrincipals/microsoft.graph.agentIdentity` |
| Grant app permission | `POST` | `/servicePrincipals/\{id\}/appRoleAssignments` |
| Grant delegated permission | `POST` | `/oauth2PermissionGrants` |
| Delete Agent Identity | `DELETE` | `/servicePrincipals/\{id\}` |
| Delete Blueprint | `DELETE` | `/applications/\{id\}` |

Base URL: `https://graph.microsoft.com/v1.0`.

## Required Graph Permissions

| Permission | Purpose |
|-----------|---------|
| `AgentIdentityBlueprint.Create` | Create Blueprints |
| `AgentIdentityBlueprint.ReadWrite.All` | Read/update Blueprints |
| `AgentIdentityBlueprintPrincipal.Create` | Create BlueprintPrincipals |
| `AgentIdentity.Create.All` | Create Agent Identities |
| `AgentIdentity.ReadWrite.All` | Read/update Agent Identities |
| `Application.ReadWrite.All` | Blueprint CRUD on application objects |
| `AppRoleAssignment.ReadWrite.All` | Grant application permissions |
| `DelegatedPermissionGrant.ReadWrite.All` | Grant delegated permissions |

Grant admin consent (required for application permissions):

```bash
