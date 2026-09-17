---
title: "Durable Task Scheduler"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/durable-task-scheduler/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/durable-task-scheduler/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/durable-task-scheduler/README.md"
sourceSha256: "ebf7add46cb899604fc1f5562d7e378cba78b6f338b990622b01616a31b13ec4"
pageSha256: "ebf7add46cb899604fc1f5562d7e378cba78b6f338b990622b01616a31b13ec4"
contentMode: "local-full"
zh: ""
---

# Durable Task Scheduler

Build reliable, fault-tolerant workflows using durable execution with Azure Durable Task Scheduler.

## When to Use

- Long-running workflows requiring state persistence
- Distributed transactions with compensating actions (saga pattern)
- Multi-step orchestrations with checkpointing
- Fan-out/fan-in parallel processing
- Workflows requiring human interaction or external events
- Stateful entities (aggregators, counters, state machines)
- Multi-agent AI orchestration
- Data processing pipelines

## Framework Selection

| Framework | Best For | Hosting |
|-----------|----------|---------|
| **Durable Functions** | Serverless event-driven apps | Azure Functions |
| **Durable Task SDKs** | Any compute (containers, VMs) | Azure Container Apps, Azure Kubernetes Service, App Service, VMs |

> **💡 TIP**: Use Durable Functions for serverless with built-in triggers. Use Durable Task SDKs for hosting flexibility.

## Quick Start - Local Emulator

```bash
# Start the emulator (see https://mcr.microsoft.com/v2/dts/dts-emulator/tags/list for available versions)
docker pull mcr.microsoft.com/dts/dts-emulator:latest
docker run -d -p 8080:8080 -p 8082:8082 --name dts-emulator mcr.microsoft.com/dts/dts-emulator:latest

# Dashboard available at http://localhost:8082
```

## Workflow Patterns

| Pattern | Use When |
|---------|----------|
| **Function Chaining** | Sequential steps, each depends on previous |
| **Fan-Out/Fan-In** | Parallel processing with aggregated results |
| **Async HTTP APIs** | Long-running operations with HTTP polling |
| **Monitor** | Periodic polling with configurable timeouts |
| **Human Interaction** | Workflow pauses for external input/approval |
| **Saga** | Distributed transactions with compensation |
| **Durable Entities** | Stateful objects (counters, accounts) |

## Connection & Authentication

| Environment | Connection String |
|-------------|-------------------|
| Local Development (Emulator) | `Endpoint=http://localhost:8080;Authentication=None;TaskHub=default` |
| Azure (System-Assigned MI) | `Endpoint=https://<scheduler>.durabletask.io;Authentication=ManagedIdentity;TaskHub=default` |
