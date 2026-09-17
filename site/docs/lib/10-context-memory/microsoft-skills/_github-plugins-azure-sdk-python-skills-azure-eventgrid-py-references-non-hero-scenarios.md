---
title: "azure-eventgrid-py non-hero scenarios"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-eventgrid-py/references/non-hero-scenarios.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-eventgrid-py/references/non-hero-scenarios.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-eventgrid-py/references/non-hero-scenarios.md"
sourceSha256: "b952ad88139ec27ff4810c0593a2f213740ac7392c4cb9b03be9251c59587e54"
pageSha256: "b952ad88139ec27ff4810c0593a2f213740ac7392c4cb9b03be9251c59587e54"
contentMode: "local-full"
zh: ""
---

# azure-eventgrid-py non-hero scenarios

These scenarios are intentionally separate from hero flows in `SKILL.md`.
They cover secondary/advanced patterns typically used after the primary end-to-end path is working.

## Async Client

```python
from azure.core.messaging import CloudEvent
from azure.eventgrid.aio import EventGridPublisherClient
from azure.identity.aio import DefaultAzureCredential

async def publish_events():
    async with DefaultAzureCredential() as credential:
        async with EventGridPublisherClient(endpoint, credential) as client:
            event = CloudEvent(
                type="MyApp.Events.Test",
                source="/myapp",
                data={"message": "hello"}
            )
            await client.send(event)

import asyncio
asyncio.run(publish_events())
```

## Namespace Topics (Event Grid Namespaces)

For Event Grid Namespaces (pull delivery):

```python
from azure.core.messaging import CloudEvent
from azure.eventgrid import EventGridPublisherClient
from azure.identity import DefaultAzureCredential

# Namespace endpoint (different from custom topic)
namespace_endpoint = "https://<namespace>.<region>.eventgrid.azure.net"
topic_name = "my-topic"

with DefaultAzureCredential() as credential:
    with EventGridPublisherClient(
        endpoint=namespace_endpoint,
        credential=credential,
        namespace_topic=topic_name,
    ) as client:
        event = CloudEvent(
            type="MyApp.Events.Test",
            source="/myapp",
            data={"message": "hello from namespace"}
        )
        client.send(event)
```
