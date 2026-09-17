---
title: "Entra Agent ID Acceptance Criteria"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/entra-agent-id/acceptance-criteria.md"
sourceRel: "tests/scenarios/entra-agent-id/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/entra-agent-id/acceptance-criteria.md"
sourceSha256: "bbfcf4b00d0adbdcfcc62e2fbf5334662f384dccb0da8ea8ee61c6bc0ac07192"
pageSha256: "bbfcf4b00d0adbdcfcc62e2fbf5334662f384dccb0da8ea8ee61c6bc0ac07192"
contentMode: "local-full"
zh: ""
---

# Entra Agent ID Acceptance Criteria

**Skill**: `entra-agent-id`
**Purpose**: Create and manage OAuth2-capable AI agent identities via Microsoft Graph beta API
**Focus**: Agent Identity Blueprints, BlueprintPrincipals, Agent Identities, authentication, permissions

---

## 1. Authentication

### 1.1 ✅ CORRECT: ClientSecretCredential for Python

```python
from azure.identity import ClientSecretCredential

credential = ClientSecretCredential(
    tenant_id=os.environ["AZURE_TENANT_ID"],
    client_id=os.environ["AZURE_CLIENT_ID"],
    client_secret=os.environ["AZURE_CLIENT_SECRET"],
)
token = credential.get_token("https://graph.microsoft.com/.default")
```

### 1.2 ✅ CORRECT: Connect-MgGraph for PowerShell

```powershell
Connect-MgGraph -Scopes @(
    "AgentIdentityBlueprint.Create",
    "AgentIdentityBlueprint.ReadWrite.All",
    "AgentIdentityBlueprintPrincipal.Create",
    "User.Read"
)
Set-MgRequestContext -ApiVersion beta
```

### 1.3 ❌ INCORRECT: DefaultAzureCredential

```python
# WRONG — Azure CLI tokens contain Directory.AccessAsUser.All which is hard-rejected (403)
from azure.identity import DefaultAzureCredential
credential = DefaultAzureCredential()
```

### 1.4 ❌ INCORRECT: Missing explicit scopes in PowerShell

```powershell
# WRONG — no scopes specified, may not get Agent Identity permissions
Connect-MgGraph
```

---

## 2. Required Headers

### 2.1 ✅ CORRECT: OData-Version header included

```python
headers = {
    "Authorization": f"Bearer {token.token}",
    "Content-Type": "application/json",
    "OData-Version": "4.0",
}
```

### 2.2 ❌ INCORRECT: Missing OData-Version header

```python
# WRONG — Agent Identity API calls may fail without OData-Version
headers = {
    "Authorization": f"Bearer {token.token}",
    "Content-Type": "application/json",
}
```

---

## 3. API Base URL

### 3.1 ✅ CORRECT: Beta endpoint

```python
GRAPH = "https://graph.microsoft.com/beta"
resp = requests.post(f"{GRAPH}/applications", headers=headers, json=body)
```

### 3.2 ❌ INCORRECT: v1.0 endpoint

```python
# WRONG — Agent Identity APIs only exist in /beta, not /v1.0
GRAPH = "https://graph.microsoft.com/v1.0"
```

---

## 4. Blueprint Creation

### 4.2 ❌ INCORRECT: Missing @odata.type

```python
# WRONG — creates a regular application, not an Agent Identity Blueprint
blueprint_body = {
    "displayName": "My Agent Blueprint",
}
```

# WRONG — Blueprint does NOT auto-create its service principal
# Agent Identity creation will fail with:
# "The Agent Blueprint Principal for the Agent Blueprint does not exist."
blueprint = create_blueprint(...)
agent = create_agent_identity(blueprint_app_id=blueprint["appId"])  # 400 error
```

---

## 6. Agent Identity Creation

### 6.1 ✅ CORRECT: Full Agent Identity with blueprint reference

```python
agent_body = {
    "@odata.type": "Microsoft.Graph.AgentIdentity",
    "displayName": "my-agent-instance-1",
    "agentIdentityBlueprintId": app_id,
    "sponsors@odata.bind": [
        f"https://graph.microsoft.com/beta/users/{user_id}"
    ],
}
resp = requests.post(f"{GRAPH}/servicePrincipals", headers=headers, json=agent_body)
```

### 6.2 ❌ INCORRECT: Missing agentIdentityBlueprintId

```python
# WRONG — agent identity must reference its blueprint
agent_body = {
    "@odata.type": "Microsoft.Graph.AgentIdentity",
    "displayName": "my-agent-instance-1",
}
```

---

## 7. Cleanup

### 7.1 ✅ CORRECT: Delete in order (agents first, then blueprint)

```python
# Delete agent identities first
requests.delete(f"{GRAPH}/servicePrincipals/{agent_sp_id}", headers=headers)

# Then delete the blueprint (application)
requests.delete(f"{GRAPH}/applications/{blueprint_obj_id}", headers=headers)
```

### 7.2 ❌ INCORRECT: Delete blueprint without cleaning up agents

```python
# WRONG — orphaned agent identities remain as unmanaged service principals
requests.delete(f"{GRAPH}/applications/{blueprint_obj_id}", headers=headers)
```

---

## 8. Idempotent Provisioning

### 8.1 ✅ CORRECT: Check before create

```python
# Check if blueprint already exists
resp = requests.get(
    f"{GRAPH}/applications?$filter=displayName eq 'My Agent Blueprint'",
    headers=headers,
)
existing = resp.json().get("value", [])
if existing:
    blueprint = existing[0]
else:
    blueprint = create_blueprint(...)

# Always ensure BlueprintPrincipal exists (previous run may have crashed)
ensure_blueprint_principal(blueprint["appId"])
```

### 8.2 ❌ INCORRECT: No existence check

```python
# WRONG — fails on rerun if blueprint already exists with same identifierUris
blueprint = create_blueprint(...)  # May conflict
```
