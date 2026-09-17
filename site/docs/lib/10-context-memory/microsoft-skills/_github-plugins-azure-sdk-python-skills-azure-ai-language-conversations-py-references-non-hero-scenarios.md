---
title: "azure-ai-language-conversations-py non-hero scenarios"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-language-conversations-py/references/non-hero-scenarios.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-ai-language-conversations-py/references/non-hero-scenarios.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-ai-language-conversations-py/references/non-hero-scenarios.md"
sourceSha256: "71db8bac4317c7335b39358cc638d8387103771bccd0adbab6cba51db8dedc62"
pageSha256: "71db8bac4317c7335b39358cc638d8387103771bccd0adbab6cba51db8dedc62"
contentMode: "local-full"
zh: ""
---

# azure-ai-language-conversations-py non-hero scenarios

These scenarios are intentionally separate from hero flows in `SKILL.md`.
They cover secondary/advanced patterns typically used after the primary end-to-end path is working.

## Operational hardening

### Retry Policy

Configure retries for transient service errors:

```python
import os
from azure.identity import DefaultAzureCredential
from azure.ai.language.conversations import ConversationAnalysisClient
from azure.core.pipeline.policies import RetryPolicy

retry_policy = RetryPolicy(retry_total=3, retry_backoff_factor=2)
credential = DefaultAzureCredential()

with ConversationAnalysisClient(
    os.environ["AZURE_CONVERSATIONS_ENDPOINT"],
    credential,
    retry_policy=retry_policy,
) as client:
    result = client.analyze_conversation(
        task={
            "kind": "Conversation",
            "analysisInput": {
                "conversationItem": {
                    "participantId": "1",
                    "id": "1",
                    "modality": "text",
                    "language": "en",
                    "text": "Set an alarm for 7am tomorrow",
                },
                "isLoggingEnabled": False,
            },
            "parameters": {
                "projectName": os.environ["AZURE_CONVERSATIONS_PROJECT"],
                "deploymentName": os.environ["AZURE_CONVERSATIONS_DEPLOYMENT"],
            },
        }
    )
```

### Entity Extraction and Confidence Filtering

Access predicted entities and skip low-confidence results:

```python
import os
from azure.identity import DefaultAzureCredential
from azure.ai.language.conversations import ConversationAnalysisClient

MIN_CONFIDENCE = 0.7

credential = DefaultAzureCredential()

with ConversationAnalysisClient(
    os.environ["AZURE_CONVERSATIONS_ENDPOINT"], credential
) as client:
    result = client.analyze_conversation(
        task={
            "kind": "Conversation",
            "analysisInput": {
                "conversationItem": {
                    "participantId": "1",
                    "id": "1",
                    "modality": "text",
                    "language": "en",
                    "text": "Book a flight to London next Monday",
                },
                "isLoggingEnabled": False,
            },
            "parameters": {
                "projectName": os.environ["AZURE_CONVERSATIONS_PROJECT"],
                "deploymentName": os.environ["AZURE_CONVERSATIONS_DEPLOYMENT"],
                "verbose": True,
            },
        }
    )

    prediction = result["result"]["prediction"]
    top_intent = prediction["topIntent"]
    confidence = next(
        i["confidenceScore"]
        for i in prediction["intents"]
        if i["category"] == top_intent
    )

    if confidence < MIN_CONFIDENCE:
        print(f"Low confidence ({confidence:.2f}) — ask for clarification")
    else:
        print(f"Intent: {top_intent} ({confidence:.2f})")
        for entity in prediction.get("entities", []):
            print(f"  Entity: {entity['category']} = {entity['text']}")
```

### Orchestration Workflow Routing

When the CLU project is an orchestration project, route to the target skill:

```python
result = client.analyze_conversation(
    task={
        "kind": "Conversation",
        "analysisInput": {
            "conversationItem": {
                "participantId": "1",
                "id": "1",
                "modality": "text",
                "language": "en",
                "text": "What's the weather like today?",
            },
            "isLoggingEnabled": False,
        },
        "parameters": {
            "projectName": os.environ["AZURE_ORCHESTRATION_PROJECT"],
            "deploymentName": os.environ["AZURE_ORCHESTRATION_DEPLOYMENT"],
        },
    }
)

prediction = result["result"]["prediction"]
top_intent = prediction["topIntent"]

# Orchestration: prediction['intents'] is a dict keyed by intent name
intent_data = prediction["intents"].get(top_intent, {})
target_kind = intent_data.get("targetProjectKind")  # e.g. "Luis" or "Conversation"
print(f"Routed to: {top_intent} ({target_kind})")
```

### Async Client

Use the async client for concurrent request handling:

```python
import os
from azure.identity.aio import DefaultAzureCredential
from azure.ai.language.conversations.aio import ConversationAnalysisClient

async def analyze_async(text: str) -> dict:
    async with DefaultAzureCredential() as credential:
        async with ConversationAnalysisClient(
            os.environ["AZURE_CONVERSATIONS_ENDPOINT"], credential
        ) as client:
            result = await client.analyze_conversation(
                task={
                    "kind": "Conversation",
                    "analysisInput": {
                        "conversationItem": {
                            "participantId": "1",
                            "id": "1",
                            "modality": "text",
                            "language": "en",
                            "text": text,
                        },
                        "isLoggingEnabled": False,
                    },
                    "parameters": {
                        "projectName": os.environ["AZURE_CONVERSATIONS_PROJECT"],
                        "deploymentName": os.environ["AZURE_CONVERSATIONS_DEPLOYMENT"],
                    },
                }
            )
            return result["result"]["prediction"]
```
