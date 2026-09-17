---
title: "Azure API Management SDK Acceptance Criteria"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-mgmt-apimanagement-py/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-mgmt-apimanagement-py/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-mgmt-apimanagement-py/acceptance-criteria.md"
sourceSha256: "6f786efe248117a35daafa20772d9b20e36d1966762c17dbbc558180aaef55f7"
pageSha256: "6f786efe248117a35daafa20772d9b20e36d1966762c17dbbc558180aaef55f7"
contentMode: "local-full"
zh: ""
---

# Azure API Management SDK Acceptance Criteria

**SDK**: `azure-mgmt-apimanagement`
**Repository**: https://github.com/Azure/azure-sdk-for-python
**Commit**: Latest stable v10.x
**Purpose**: Skill testing acceptance criteria for validating generated code correctness

---

## 1. Correct Import Patterns

### 1.1 Client Imports

#### ✅ CORRECT: ApiManagementClient with DefaultAzureCredential
```python
from azure.mgmt.apimanagement import ApiManagementClient
from azure.identity import DefaultAzureCredential
import os

client = ApiManagementClient(
    credential=DefaultAzureCredential(),
    subscription_id=os.environ["AZURE_SUBSCRIPTION_ID"]
)
```

#### ❌ INCORRECT: Missing subscription_id
```python
from azure.mgmt.apimanagement import ApiManagementClient
client = ApiManagementClient(credential=DefaultAzureCredential())
# subscription_id is required parameter
```

#### ❌ INCORRECT: Hardcoded subscription ID
```python
client = ApiManagementClient(
    credential=DefaultAzureCredential(),
    subscription_id="12345-67890-abcde"  # Don't hardcode
)
```

### 1.2 Model Imports

#### ✅ CORRECT: Models from azure.mgmt.apimanagement.models
```python
from azure.mgmt.apimanagement.models import (
    ApiManagementServiceResource,
    ApiManagementServiceSkuProperties,
    ApiCreateOrUpdateParameter,
    ProductContract,
    SubscriptionCreateParameters,
    PolicyContract,
    NamedValueCreateContract,
    BackendContract,
)
```

#### ❌ INCORRECT: Models from wrong location
```python
from azure.mgmt.apimanagement import ApiManagementServiceResource  # Wrong
from azure.mgmt.apimanagement.operations import ProductContract    # Wrong
```

#### ✅ CORRECT: Enum imports
```python
from azure.mgmt.apimanagement.models import (
    SkuType,
    ContentFormat,
    Protocol,
)
```

---

## 2. Client Creation Patterns

### 2.1 Authentication

#### ✅ CORRECT: DefaultAzureCredential (recommended)
```python
from azure.identity import DefaultAzureCredential
from azure.mgmt.apimanagement import ApiManagementClient
import os

client = ApiManagementClient(
    credential=DefaultAzureCredential(),
    subscription_id=os.environ["AZURE_SUBSCRIPTION_ID"]
)
```

#### ✅ CORRECT: Using environment variables
```python
client = ApiManagementClient(
    credential=DefaultAzureCredential(),
    subscription_id=os.environ.get("AZURE_SUBSCRIPTION_ID")
)
```

#### ❌ INCORRECT: Hardcoded credentials
```python
from azure.mgmt.apimanagement import ApiManagementClient
client = ApiManagementClient(
    credential="my-secret-key",
    subscription_id="12345-67890"
)
```

#### ❌ INCORRECT: Missing environment variable check
```python
subscription_id = os.environ["AZURE_SUBSCRIPTION_ID"]  # Can raise KeyError
# Should be os.environ.get() or handled gracefully
```

---

## 3. APIM Service Operations

### 3.1 Service Creation

#### ✅ CORRECT: Create APIM service with LRO
```python
from azure.mgmt.apimanagement.models import (
    ApiManagementServiceResource,
    ApiManagementServiceSkuProperties,
    SkuType,
)

service = client.api_management_service.begin_create_or_update(
    resource_group_name="my-rg",
    service_name="my-apim",
    parameters=ApiManagementServiceResource(
        location="eastus",
        publisher_email="admin@example.com",
        publisher_name="My Organization",
        sku=ApiManagementServiceSkuProperties(
            name=SkuType.DEVELOPER,
            capacity=1
        )
    )
).result()
```

#### ✅ CORRECT: Alternative with async LRO (if async)
```python
service = await client.api_management_service.begin_create_or_update(
    resource_group_name="my-rg",
    service_name="my-apim",
    parameters=ApiManagementServiceResource(...)
).result()
```

#### ❌ INCORRECT: Missing .result() on LRO
```python
service = client.api_management_service.begin_create_or_update(
    resource_group_name="my-rg",
    service_name="my-apim",
    parameters=ApiManagementServiceResource(...)
)
# This returns PollerLRO, not the service resource
```

#### ❌ INCORRECT: Not passing required parameters
```python
client.api_management_service.begin_create_or_update(
    service_name="my-apim",
    # Missing resource_group_name and parameters
)
```

### 3.2 Service Operations

#### ✅ CORRECT: List APIM services
```python
services = client.api_management_service.list_by_resource_group(
    resource_group_name="my-rg"
)

for service in services:
    print(f"{service.name}: {service.id}")
```

#### ✅ CORRECT: Get specific service
```python
service = client.api_management_service.get(
    resource_group_name="my-rg",
    service_name="my-apim"
)
```

#### ✅ CORRECT: Delete service
```python
poller = client.api_management_service.begin_delete(
    resource_group_name="my-rg",
    service_name="my-apim"
)
poller.result()  # Wait for completion
```

---

## 4. API Management

### 4.1 API Creation from OpenAPI

#### ✅ CORRECT: Import API from OpenAPI JSON
```python
from azure.mgmt.apimanagement.models import (
    ApiCreateOrUpdateParameter,
    ContentFormat,
    Protocol,
)

api = client.api.begin_create_or_update(
    resource_group_name="my-rg",
    service_name="my-apim",
    api_id="my-api",
    parameters=ApiCreateOrUpdateParameter(
        display_name="My API",
        path="myapi",
        protocols=[Protocol.HTTPS],
        format=ContentFormat.OPENAPI_JSON,
        value='{"openapi": "3.0.0", ...}'
    )
).result()
```

#### ✅ CORRECT: Import API from URL
```python
api = client.api.begin_create_or_update(
    resource_group_name="my-rg",
    service_name="my-apim",
    api_id="petstore",
    parameters=ApiCreateOrUpdateParameter(
        display_name="Petstore API",
        path="petstore",
        protocols=[Protocol.HTTPS],
        format=ContentFormat.OPENAPI_LINK,
        value="https://petstore.swagger.io/v2/swagger.json"
    )
).result()
```

#### ❌ INCORRECT: Missing format parameter
```python
api = client.api.begin_create_or_update(
    resource_group_name="my-rg",
    service_name="my-apim",
    api_id="my-api",
    parameters=ApiCreateOrUpdateParameter(
        display_name="My API",
        path="myapi",
        value='{"openapi": "3.0.0", ...}'
        # Missing format and protocols
    )
).result()
```

### 4.2 API Operations

#### ✅ CORRECT: List APIs
```python
apis = client.api.list_by_service(
    resource_group_name="my-rg",
    service_name="my-apim"
)

for api in apis:
    print(f"{api.name}: {api.display_name}")
```

#### ✅ CORRECT: List API operations
```python
operations = client.api_operation.list_by_api(
    resource_group_name="my-rg",
    service_name="my-apim",
    api_id="my-api"
)

for op in operations:
    print(f"{op.name}: {op.display_name}")
```

#### ✅ CORRECT: Delete API
```python
client.api.delete(
    resource_group_name="my-rg",
    service_name="my-apim",
    api_id="my-api"
)
```

---

## 5. Product Management

### 5.1 Product Creation

#### ✅ CORRECT: Create product
```python
from azure.mgmt.apimanagement.models import ProductContract

product = client.product.create_or_update(
    resource_group_name="my-rg",
    service_name="my-apim",
    product_id="premium",
    parameters=ProductContract(
        display_name="Premium",
        description="Premium tier with unlimited access",
        subscription_required=True,
        approval_required=False,
        state="published"
    )
)
```

#### ✅ CORRECT: Add API to product
```python
client.product_api.create_or_update(
    resource_group_name="my-rg",
    service_name="my-apim",
    product_id="premium",
    api_id="my-api"
)
```

#### ❌ INCORRECT: Missing required product fields
```python
product = client.product.create_or_update(
    resource_group_name="my-rg",
    service_name="my-apim",
    product_id="premium",
    parameters=ProductContract(
        # Missing display_name
        description="Premium tier"
    )
)
```

### 5.2 Product Operations

#### ✅ CORRECT: List products
```python
products = client.product.list_by_service(
    resource_group_name="my-rg",
    service_name="my-apim"
)

for product in products:
    print(f"{product.name}: {product.display_name}")
```

#### ✅ CORRECT: Delete product
```python
client.product.delete(
    resource_group_name="my-rg",
    service_name="my-apim",
    product_id="premium"
)
```

---

## 6. Subscription Management

### 6.1 Subscription Creation

#### ✅ CORRECT: Create subscription
```python
from azure.mgmt.apimanagement.models import SubscriptionCreateParameters

subscription = client.subscription.create_or_update(
    resource_group_name="my-rg",
    service_name="my-apim",
    sid="my-subscription",
    parameters=SubscriptionCreateParameters(
        display_name="My Subscription",
        scope="/products/premium",
        state="active"
    )
)
```

#### ✅ CORRECT: Get subscription with keys
```python
subscription = client.subscription.get(
    resource_group_name="my-rg",
    service_name="my-apim",
    sid="my-subscription"
)

print(f"Primary key: {subscription.primary_key}")
print(f"Secondary key: {subscription.secondary_key}")
```

#### ❌ INCORRECT: Missing scope parameter
```python
subscription = client.subscription.create_or_update(
    resource_group_name="my-rg",
    service_name="my-apim",
    sid="my-subscription",
    parameters=SubscriptionCreateParameters(
        display_name="My Subscription",
        # Missing scope - indicates product or API scope
    )
)
```

### 6.2 Subscription Operations

#### ✅ CORRECT: List subscriptions
```python
subscriptions = client.subscription.list(
    resource_group_name="my-rg",
    service_name="my-apim"
)

for sub in subscriptions:
    print(f"{sub.name}: {sub.display_name}")
```

#### ✅ CORRECT: Regenerate subscription keys
```python
client.subscription.regenerate_primary_key(
    resource_group_name="my-rg",
    service_name="my-apim",
    sid="my-subscription"
)

client.subscription.regenerate_secondary_key(
    resource_group_name="my-rg",
    service_name="my-apim",
    sid="my-subscription"
)
```

---

## 7. Policy Management

### 7.1 API Policy Creation

#### ✅ CORRECT: Set API-level policy with rate limiting
```python
from azure.mgmt.apimanagement.models import PolicyContract

policy_xml = """<policies>
    <inbound>
    </inbound>
    <backend>
    </backend>
    <outbound />
</policies>"""

client.api_policy.create_or_update(
    resource_group_name="my-rg",
    service_name="my-apim",
    api_id="my-api",
    policy_id="policy",
    parameters=PolicyContract(
        value=policy_xml,
        format="xml"
    )
)
```

#### ✅ CORRECT: Set operation-level policy
```python
operation_policy = client.api_operation_policy.create_or_update(
    resource_group_name="my-rg",
    service_name="my-apim",
    api_id="my-api",
    operation_id="get-user",
    policy_id="policy",
    parameters=PolicyContract(
        value=policy_xml,
        format="xml"
    )
)
```

#### ❌ INCORRECT: Policy XML missing required sections
```python
invalid_policy = """<policies>
    <inbound>
    </inbound>
</policies>"""
