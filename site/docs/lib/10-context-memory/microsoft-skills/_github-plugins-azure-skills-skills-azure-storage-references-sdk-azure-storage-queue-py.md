---
title: "Queue Storage — Python SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-queue-py.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-queue-py.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-queue-py.md"
sourceSha256: "a12ff28b4598f8a62ed22f820882afd954bc873788c17c90db5cbe2af0b2f531"
pageSha256: "a12ff28b4598f8a62ed22f820882afd954bc873788c17c90db5cbe2af0b2f531"
contentMode: "local-full"
zh: ""
---

# Queue Storage — Python SDK Quick Reference

> Condensed from **azure-storage-queue-py**. Full patterns (async client,
> base64 encoding, queue properties, message updates)
> in the **azure-storage-queue-py** plugin skill if installed.

## Install
pip install azure-storage-queue azure-identity

## Quick Start

> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/references/auth-best-practices.md) for production patterns.

```python
from azure.storage.queue import QueueClient
from azure.identity import DefaultAzureCredential
queue_client = QueueClient("https://<account>.queue.core.windows.net", "myqueue", DefaultAzureCredential())
```

## Best Practices
- Delete messages after processing to prevent reprocessing
- Set appropriate visibility timeout based on processing time
- Handle `dequeue_count` for poison message detection
- Use async client for high-throughput scenarios
- Use `peek_messages` for monitoring without affecting queue
- Set `time_to_live` to prevent stale messages
- Consider Service Bus for advanced features (sessions, topics)
