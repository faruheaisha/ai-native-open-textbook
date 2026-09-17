---
title: "Azure Bot Service Management SDK Acceptance Criteria"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-mgmt-botservice-py/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-mgmt-botservice-py/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-mgmt-botservice-py/acceptance-criteria.md"
sourceSha256: "2cfd22ec6641b9b2bd7c93af73a809c8db6c56c4f7ef61469ecd06d84972c27a"
pageSha256: "2cfd22ec6641b9b2bd7c93af73a809c8db6c56c4f7ef61469ecd06d84972c27a"
contentMode: "local-full"
zh: ""
---

# Azure Bot Service Management SDK Acceptance Criteria

**SDK**: `azure-mgmt-botservice`
**Repository**: https://github.com/Azure/azure-sdk-for-python
**Purpose**: Skill testing acceptance criteria for validating generated code correctness

---

## 1. Correct Import Patterns

### 1.1 Client Imports

#### ✅ CORRECT: Client with Credential
```python
from azure.mgmt.botservice import AzureBotService
from azure.identity import DefaultAzureCredential
```

#### ✅ CORRECT: Model Imports for Bot
```python
from azure.mgmt.botservice.models import Bot, BotProperties, Sku
```

#### ✅ CORRECT: Channel Model Imports
```python
from azure.mgmt.botservice.models import (
    BotChannel,
    MsTeamsChannel,
    MsTeamsChannelProperties,
    DirectLineChannel,
    DirectLineChannelProperties,
    DirectLineSite,
    WebChatChannel,
    WebChatChannelProperties,
    WebChatSite,
)
```

#### ✅ CORRECT: Connection Setting Imports
```python
from azure.mgmt.botservice.models import (
    ConnectionSetting,
    ConnectionSettingProperties,
)
```

### 1.2 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Importing directly from azure.botservice
```python
# WRONG - incorrect module path
from azure.botservice import AzureBotService
```

#### ❌ INCORRECT: Hardcoded credentials
```python
# WRONG - credentials should use DefaultAzureCredential
client = AzureBotService(
    subscription_id=subscription_id,
    credentials="hardcoded-key"
)
```

#### ❌ INCORRECT: Missing subscription_id
```python
# WRONG - subscription_id is required
client = AzureBotService(credential=credential)
```

---

## 2. Client Creation Patterns

### 2.1 ✅ CORRECT: Standard Client Creation
```python
from azure.identity import DefaultAzureCredential
from azure.mgmt.botservice import AzureBotService
import os

credential = DefaultAzureCredential()
client = AzureBotService(
    credential=credential,
    subscription_id=os.environ["AZURE_SUBSCRIPTION_ID"]
)
```

### 2.2 ✅ CORRECT: Using Context Manager (Best Practice)
```python
from azure.identity import DefaultAzureCredential
from azure.mgmt.botservice import AzureBotService
import os

credential = DefaultAzureCredential()
with AzureBotService(
    credential=credential,
    subscription_id=os.environ["AZURE_SUBSCRIPTION_ID"]
) as client:
    # Use client here
    bots = client.bots.list_by_resource_group(resource_group_name="my-group")
```

### 2.3 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Using old API path
```python
# WRONG - should use client.bots, not client.list_bots
client.list_bots(resource_group_name="my-group")
```

#### ❌ INCORRECT: Missing context manager
```python
# WRONG - client should be closed after use
client = AzureBotService(credential=credential, subscription_id=sub_id)
bots = client.bots.list()
# Missing: client.close() or use 'with' statement
```

---

## 3. Bot Creation Patterns

### 3.1 ✅ CORRECT: Basic Bot Creation
```python
from azure.mgmt.botservice.models import Bot, BotProperties, Sku

bot = client.bots.create(
    resource_group_name=resource_group,
    resource_name=bot_name,
    parameters=Bot(
        location="global",
        sku=Sku(name="F0"),  # Free tier
        kind="azurebot",
        properties=BotProperties(
            display_name="My Chat Bot",
            description="A conversational AI bot",
            endpoint="https://my-bot-app.azurewebsites.net/api/messages",
