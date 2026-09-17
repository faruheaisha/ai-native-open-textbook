---
title: "Checkpointing with Azure Event Hubs"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-eventhub-py/references/checkpointing.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-eventhub-py/references/checkpointing.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-eventhub-py/references/checkpointing.md"
sourceSha256: "a82569bf0a846a6bbc46ef6abc71eac7ec67d203400d9652fabe9f23603b69d9"
pageSha256: "a82569bf0a846a6bbc46ef6abc71eac7ec67d203400d9652fabe9f23603b69d9"
contentMode: "local-full"
zh: ""
---

# Checkpointing with Azure Event Hubs

Patterns for reliable event processing with checkpoint stores.

## Why Checkpointing?

Checkpointing tracks which events have been processed, enabling:
- **Resume after failure** — Pick up where you left off
- **Scalable consumers** — Multiple consumers share work without duplication
- **At-least-once delivery** — Ensure no events are lost

## Blob Checkpoint Store (Recommended)

```python
from azure.eventhub import EventHubConsumerClient
from azure.eventhub.extensions.checkpointstoreblob import BlobCheckpointStore
from azure.identity import DefaultAzureCredential

credential = DefaultAzureCredential()

# Create checkpoint store
checkpoint_store = BlobCheckpointStore(
    blob_account_url="https://<account>.blob.core.windows.net",
    container_name="checkpoints",
    credential=credential
)

# Consumer with checkpoint store
consumer = EventHubConsumerClient(
    fully_qualified_namespace="<namespace>.servicebus.windows.net",
    eventhub_name="my-eventhub",
    consumer_group="$Default",
    credential=credential,
    checkpoint_store=checkpoint_store
)
```

## Async Blob Checkpoint Store

```python
from azure.eventhub.aio import EventHubConsumerClient
from azure.eventhub.extensions.checkpointstoreblob.aio import BlobCheckpointStore
from azure.identity.aio import DefaultAzureCredential

async def create_consumer():
    credential = DefaultAzureCredential()
    
    checkpoint_store = BlobCheckpointStore(
        blob_account_url="https://<account>.blob.core.windows.net",
        container_name="checkpoints",
        credential=credential
    )
    
    consumer = EventHubConsumerClient(
        fully_qualified_namespace="<namespace>.servicebus.windows.net",
        eventhub_name="my-eventhub",
        consumer_group="$Default",
        credential=credential,
        checkpoint_store=checkpoint_store
    )
    
    return consumer
```

## Checkpoint Strategies

### After Every Event (Most Reliable)

```python
async def on_event(partition_context, event):
    """Checkpoint after every event - highest reliability, highest overhead."""
    try:
        await process_event(event)
        await partition_context.update_checkpoint(event)
    except Exception as e:
        # Don't checkpoint on failure - event will be reprocessed
        print(f"Processing failed: {e}")
```

### Batch Checkpointing (Balanced)

```python
class BatchCheckpointer:
    def __init__(self, batch_size: int = 100):
        self.batch_size = batch_size
        self.counts: dict[str, int] = {}
    
    async def on_event(self, partition_context, event):
        partition_id = partition_context.partition_id
        
        await process_event(event)
        
        self.counts[partition_id] = self.counts.get(partition_id, 0) + 1
        
        if self.counts[partition_id] >= self.batch_size:
            await partition_context.update_checkpoint(event)
            self.counts[partition_id] = 0
            print(f"Checkpointed partition {partition_id}")
```

### Time-Based Checkpointing

```python
import asyncio
from datetime import datetime, timedelta

class TimedCheckpointer:
    def __init__(self, interval_seconds: float = 30.0):
        self.interval = interval_seconds
        self.last_checkpoint: dict[str, datetime] = {}
        self.last_event: dict[str, any] = {}
    
    async def on_event(self, partition_context, event):
        partition_id = partition_context.partition_id
        now = datetime.utcnow()
        
        await process_event(event)
        self.last_event[partition_id] = event
        
        last = self.last_checkpoint.get(partition_id)
        if not last or (now - last).total_seconds() >= self.interval:
            await partition_context.update_checkpoint(event)
            self.last_checkpoint[partition_id] = now
            print(f"Timed checkpoint for partition {partition_id}")
```

### Hybrid Checkpointing (Batch + Time)

```python
class HybridCheckpointer:
    def __init__(self, batch_size: int = 100, interval_seconds: float = 30.0):
        self.batch_size = batch_size
        self.interval = interval_seconds
        self.counts: dict[str, int] = {}
        self.last_checkpoint: dict[str, datetime] = {}
    
    async def on_event(self, partition_context, event):
        partition_id = partition_context.partition_id
        now = datetime.utcnow()
        
        await process_event(event)
        
        self.counts[partition_id] = self.counts.get(partition_id, 0) + 1
        last = self.last_checkpoint.get(partition_id)
        
        should_checkpoint = (
            self.counts[partition_id] >= self.batch_size or
            (last and (now - last).total_seconds() >= self.interval)
        )
        
        if should_checkpoint:
            await partition_context.update_checkpoint(event)
            self.counts[partition_id] = 0
            self.last_checkpoint[partition_id] = now
```

## Checkpoint on Batch Complete

```python
async def on_event_batch(partition_context, events):
    """Process batch and checkpoint once at the end."""
    if not events:
        return
    
    for event in events:
        await process_event(event)
    
    # Checkpoint only the last event
    await partition_context.update_checkpoint(events[-1])
    print(f"Processed {len(events)} events, checkpointed partition {partition_context.partition_id}")

async with consumer:
    await consumer.receive_batch(
        on_event_batch=on_event_batch,
        max_batch_size=100,
        max_wait_time=5.0
    )
```

## Manual Checkpoint Management

```python
from azure.eventhub.extensions.checkpointstoreblob import BlobCheckpointStore

async def inspect_checkpoints(checkpoint_store: BlobCheckpointStore):
    """List all checkpoints for debugging."""
    checkpoints = await checkpoint_store.list_checkpoints(
        fully_qualified_namespace="<namespace>.servicebus.windows.net",
        eventhub_name="my-eventhub",
        consumer_group="$Default"
    )
    
    for cp in checkpoints:
        print(f"Partition: {cp['partition_id']}")
        print(f"  Offset: {cp['offset']}")
        print(f"  Sequence: {cp['sequence_number']}")
```

## Checkpoint Data Structure

Blob checkpoint stores data in this format:

```
Container: checkpoints
