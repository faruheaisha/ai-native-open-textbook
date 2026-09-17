---
title: "Azure Fabric Management SDK Acceptance Criteria"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-mgmt-fabric-py/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-mgmt-fabric-py/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-mgmt-fabric-py/acceptance-criteria.md"
sourceSha256: "5e6abff2d0f68700f97c7e62080b2305c3afc191bada983a0283b9eff847db28"
pageSha256: "5e6abff2d0f68700f97c7e62080b2305c3afc191bada983a0283b9eff847db28"
contentMode: "local-full"
zh: ""
---

# Azure Fabric Management SDK Acceptance Criteria

**SDK**: `azure-mgmt-fabric`
**Repository**: https://github.com/Azure/azure-sdk-for-python
**Purpose**: Skill testing acceptance criteria for validating generated code correctness

---

## 1. Correct Import Patterns

### 1.1 Client Imports

#### ✅ CORRECT: FabricMgmtClient with DefaultAzureCredential (Recommended)
```python
from azure.mgmt.fabric import FabricMgmtClient
from azure.identity import DefaultAzureCredential
import os

credential = DefaultAzureCredential()
client = FabricMgmtClient(
    credential=credential,
    subscription_id=os.environ["AZURE_SUBSCRIPTION_ID"]
)
```

#### ✅ CORRECT: Async Client with async DefaultAzureCredential
```python
from azure.mgmt.fabric.aio import FabricMgmtClient
from azure.identity.aio import DefaultAzureCredential
```

### 1.2 Model Imports

#### ✅ CORRECT: Capacity and SKU Models
```python
from azure.mgmt.fabric.models import (
    FabricCapacity,
    FabricCapacityProperties,
    CapacitySku,
    CheckNameAvailabilityRequest,
)
```

#### ✅ CORRECT: Resource Update Models
```python
from azure.mgmt.fabric.models import (
    FabricCapacityUpdate,
    CapacitySku,
)
```

### 1.3 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Wrong module path
```python
# WRONG - incorrect module path
from azure.mgmt import FabricMgmtClient

# WRONG - missing models module
from azure.mgmt.fabric import FabricCapacity
```

#### ❌ INCORRECT: Hardcoded credentials
```python
# WRONG - hardcoded credentials should never be used
client = FabricMgmtClient(
    credential={"subscription_id": "...", "client_id": "..."}
)
```

---

## 2. Client Creation Patterns

### 2.1 ✅ CORRECT: Basic Client Creation
```python
from azure.mgmt.fabric import FabricMgmtClient
from azure.identity import DefaultAzureCredential
import os

credential = DefaultAzureCredential()
client = FabricMgmtClient(
    credential=credential,
    subscription_id=os.environ["AZURE_SUBSCRIPTION_ID"]
)
```

### 2.2 ✅ CORRECT: Context Manager Usage
```python
with FabricMgmtClient(
    credential=credential,
    subscription_id=subscription_id
) as client:
    capacities = client.fabric_capacities.list_by_subscription()
    for capacity in capacities:
        print(capacity.name)
```

### 2.3 ✅ CORRECT: Explicit Close
```python
client = FabricMgmtClient(
    credential=credential,
    subscription_id=subscription_id
)
try:
    capacities = client.fabric_capacities.list_by_subscription()
finally:
    client.close()
```

### 2.4 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Missing subscription_id
```python
# WRONG - subscription_id is required
client = FabricMgmtClient(credential=credential)
```

#### ❌ INCORRECT: Not closing client
```python
# WRONG - client should be used with context manager or explicitly closed
client = FabricMgmtClient(credential=credential, subscription_id=sub_id)
capacities = client.fabric_capacities.list_by_subscription()
# Missing: client.close() or using 'with' statement
```

#### ❌ INCORRECT: Wrong parameter names
```python
# WRONG - using 'client_id' instead of 'subscription_id'
client = FabricMgmtClient(
    credential=credential,
    client_id=subscription_id
)
```

---

## 3. Fabric Capacity Creation Patterns

### 3.1 ✅ CORRECT: Create Fabric Capacity with SKU
```python
from azure.mgmt.fabric import FabricMgmtClient
from azure.mgmt.fabric.models import FabricCapacity, CapacitySku

capacity = client.fabric_capacities.begin_create_or_update(
    resource_group_name=resource_group,
    capacity_name=capacity_name,
    resource=FabricCapacity(
        location="eastus",
        sku=CapacitySku(
            name="F2",
            tier="Fabric"
        )
    )
).result()
```

### 3.2 ✅ CORRECT: Create with Properties
```python
from azure.mgmt.fabric.models import (
    FabricCapacity,
    FabricCapacityProperties,
    CapacitySku,
)

capacity = client.fabric_capacities.begin_create_or_update(
    resource_group_name=resource_group,
    capacity_name=capacity_name,
    resource=FabricCapacity(
        location="eastus",
        sku=CapacitySku(name="F4", tier="Fabric"),
        properties=FabricCapacityProperties(),
    )
).result()
```

### 3.3 ✅ CORRECT: Create with Tags
```python
capacity = client.fabric_capacities.begin_create_or_update(
    resource_group_name=resource_group,
    capacity_name=capacity_name,
    resource=FabricCapacity(
        location="eastus",
        sku=CapacitySku(name="F2", tier="Fabric"),
        tags={"environment": "production", "team": "analytics"}
    )
).result()
```

### 3.4 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Missing .result() on LRO
```python
# WRONG - LRO (long-running operation) must be awaited with .result()
capacity = client.fabric_capacities.begin_create_or_update(
    resource_group_name=resource_group,
    capacity_name=capacity_name,
    resource=FabricCapacity(...)
)
# Missing: .result()
```

#### ❌ INCORRECT: Missing SKU tier
```python
# WRONG - tier is required
capacity = client.fabric_capacities.begin_create_or_update(
    resource_group_name=resource_group,
    capacity_name=capacity_name,
    resource=FabricCapacity(
        location="eastus",
        sku=CapacitySku(name="F2")  # Missing tier
    )
).result()
```

---

## 4. Capacity Read Patterns

### 4.1 ✅ CORRECT: Get Capacity
```python
capacity = client.fabric_capacities.get(
    resource_group_name=resource_group,
    capacity_name=capacity_name
)

print(f"Capacity: {capacity.name}")
print(f"SKU: {capacity.sku.name}")
print(f"State: {capacity.properties.state}")
```

### 4.2 ✅ CORRECT: List by Resource Group
```python
capacities = client.fabric_capacities.list_by_resource_group(
    resource_group_name=resource_group
)

for capacity in capacities:
    print(f"Capacity: {capacity.name} - SKU: {capacity.sku.name}")
```

### 4.3 ✅ CORRECT: List by Subscription
```python
all_capacities = client.fabric_capacities.list_by_subscription()

for capacity in all_capacities:
    print(f"Capacity: {capacity.name} in {capacity.location}")
```

### 4.4 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Not iterating list results
```python
# WRONG - list_by_resource_group returns iterable, not list
capacities = client.fabric_capacities.list_by_resource_group(resource_group)
print(len(capacities))  # Will fail - no len() on iterator
```

---

## 5. Capacity Update Patterns

### 5.1 ✅ CORRECT: Update SKU
```python
from azure.mgmt.fabric.models import FabricCapacityUpdate, CapacitySku

updated = client.fabric_capacities.begin_update(
    resource_group_name=resource_group,
    capacity_name=capacity_name,
    properties=FabricCapacityUpdate(
        sku=CapacitySku(name="F4", tier="Fabric")
    )
).result()
```

### 5.2 ✅ CORRECT: Update Tags
```python
updated = client.fabric_capacities.begin_update(
    resource_group_name=resource_group,
    capacity_name=capacity_name,
    properties=FabricCapacityUpdate(
        tags={"environment": "staging"}
    )
).result()
```

### 5.3 ✅ CORRECT: Update Both SKU and Tags
```python
updated = client.fabric_capacities.begin_update(
    resource_group_name=resource_group,
    capacity_name=capacity_name,
    properties=FabricCapacityUpdate(
        sku=CapacitySku(name="F8", tier="Fabric"),
        tags={"environment": "production"}
    )
).result()
```

### 5.4 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Using FabricCapacity instead of FabricCapacityUpdate
```python
# WRONG - update uses FabricCapacityUpdate, not FabricCapacity
updated = client.fabric_capacities.begin_update(
    resource_group_name=resource_group,
    capacity_name=capacity_name,
    resource=FabricCapacity(...)  # Should be FabricCapacityUpdate
).result()
```

---

## 6. Capacity Control Patterns

### 6.1 ✅ CORRECT: Suspend Capacity
```python
client.fabric_capacities.begin_suspend(
    resource_group_name=resource_group,
    capacity_name=capacity_name
).result()

print("Capacity suspended")
```

### 6.2 ✅ CORRECT: Resume Capacity
```python
client.fabric_capacities.begin_resume(
    resource_group_name=resource_group,
    capacity_name=capacity_name
).result()

print("Capacity resumed")
```

### 6.3 ✅ CORRECT: Delete Capacity
```python
client.fabric_capacities.begin_delete(
    resource_group_name=resource_group,
    capacity_name=capacity_name
).result()

print("Capacity deleted")
```

### 6.4 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Not waiting for LRO completion
```python
# WRONG - assigning poller without calling .result()
poller = client.fabric_capacities.begin_suspend(resource_group_name=rg, capacity_name=name)
# poller.result() must be called to wait for completion
```

---

## 7. Validation Patterns

### 7.1 ✅ CORRECT: Check Name Availability
```python
from azure.mgmt.fabric.models import CheckNameAvailabilityRequest

result = client.fabric_capacities.check_name_availability(
    location="eastus",
    body=CheckNameAvailabilityRequest(
        name="my-new-capacity",
        type="Microsoft.Fabric/capacities"
    )
)

if result.name_available:
    print("Name is available")
else:
    print(f"Name not available: {result.reason}")
```

### 7.2 ✅ CORRECT: List Available SKUs
```python
skus = client.fabric_capacities.list_skus()

for sku in skus:
    print(f"SKU: {sku.name} - Tier: {sku.tier}")
```

### 7.3 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Missing type in CheckNameAvailabilityRequest
```python
# WRONG - type is required
result = client.fabric_capacities.check_name_availability(
    location="eastus",
    body=CheckNameAvailabilityRequest(name="my-capacity")
)
```

---

## 8. Error Handling Patterns

### 8.1 ✅ CORRECT: Handle Errors
```python
from azure.core.exceptions import ResourceNotFoundError, ResourceExistsError

try:
    capacity = client.fabric_capacities.get(
        resource_group_name=resource_group,
        capacity_name=capacity_name
    )
except ResourceNotFoundError:
    print(f"Capacity {capacity_name} not found")
except Exception as e:
    print(f"Error: {e}")
```

### 8.2 ✅ CORRECT: Check Before Create
```python
from azure.core.exceptions import ResourceExistsError

result = client.fabric_capacities.check_name_availability(
    location="eastus",
    body=CheckNameAvailabilityRequest(
        name=capacity_name,
        type="Microsoft.Fabric/capacities"
    )
)

if not result.name_available:
    print(f"Cannot create: {result.reason}")
else:
    capacity = client.fabric_capacities.begin_create_or_update(...).result()
```

### 8.3 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Bare except
```python
# WRONG - empty except blocks hide real errors
try:
    capacity = client.fabric_capacities.get(...)
except:
    pass
```

---

## 9. Long-Running Operation (LRO) Patterns

### 9.1 ✅ CORRECT: Wait for LRO Completion
```python
import time

poller = client.fabric_capacities.begin_create_or_update(
    resource_group_name=resource_group,
    capacity_name=capacity_name,
    resource=FabricCapacity(...)
)

# Synchronous wait
capacity = poller.result()

# Or manual polling
while not poller.done():
    print(f"Status: {poller.status()}")
    time.sleep(5)

capacity = poller.result()
```

### 9.2 ✅ CORRECT: Set LRO Timeout
```python
capacity = client.fabric_capacities.begin_create_or_update(
    resource_group_name=resource_group,
    capacity_name=capacity_name,
    resource=FabricCapacity(...)
).result(timeout=300)  # Wait up to 5 minutes
```

### 9.3 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Ignoring LRO completion
```python
# WRONG - assigning poller without calling .result()
poller = client.fabric_capacities.begin_delete(resource_group_name=rg, capacity_name=name)
# Code continues immediately without waiting for deletion
```

---

## 10. Async Patterns

### 10.1 ✅ CORRECT: Full Async Example
```python
import asyncio
from azure.mgmt.fabric.aio import FabricMgmtClient
from azure.identity.aio import DefaultAzureCredential

async def main():
    credential = DefaultAzureCredential()
    client = FabricMgmtClient(
        credential=credential,
        subscription_id=os.environ["AZURE_SUBSCRIPTION_ID"]
    )
    
    async with client:
        capacity = await client.fabric_capacities.get(
            resource_group_name=resource_group,
            capacity_name=capacity_name
        )
        print(f"Capacity: {capacity.name}")

asyncio.run(main())
```

### 10.2 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Missing await on async operations
```python
# WRONG - missing await for async calls
async def bad_example():
    capacity = client.fabric_capacities.get(...)  # Missing await
```

#### ❌ INCORRECT: Mixing sync and async
```python
# WRONG - using sync client with async context
from azure.mgmt.fabric import FabricMgmtClient  # Should be .aio

async with FabricMgmtClient(...) as client:
    ...
```

---

## 11. Environment Variables

### Required Variables
```bash
