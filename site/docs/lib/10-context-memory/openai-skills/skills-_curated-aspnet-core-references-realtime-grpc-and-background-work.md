---
title: "Realtime, gRPC, And Background Work"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/aspnet-core/references/realtime-grpc-and-background-work.md"
sourceRel: "skills/.curated/aspnet-core/references/realtime-grpc-and-background-work.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/aspnet-core/references/realtime-grpc-and-background-work.md"
sourceSha256: "ba6cfd463620b608c33ed65bcc4d6b25c4ec921cc77bd2fb9379cb486a11a824"
pageSha256: "ba6cfd463620b608c33ed65bcc4d6b25c4ec921cc77bd2fb9379cb486a11a824"
contentMode: "local-full"
zh: ""
---

# Realtime, gRPC, And Background Work

Primary docs:
- https://learn.microsoft.com/aspnet/core/signalr/introduction
- https://learn.microsoft.com/aspnet/core/grpc/
- https://learn.microsoft.com/aspnet/core/fundamentals/host/hosted-services

## SignalR

Use SignalR when the server must push updates to connected clients in near real time.

Good fits:

- chat
- dashboards
- notifications
- collaborative editing
- live status streams

Guidance:

- model the hub as a communication boundary, not the home of business logic
- use groups and user targeting deliberately
- authenticate connections when data is user-specific
- plan for scale-out if the app may run on multiple instances

Remember that Blazor interactive server rendering already relies on a real-time connection. Do not add a second realtime channel unless the feature truly needs one.

## gRPC

Use gRPC for efficient service-to-service communication, strongly typed contracts, and streaming over HTTP/2.

Prefer gRPC when:

- both ends are under your control
- performance and contract fidelity matter
- streaming is a first-class requirement

Guidance:

- keep `.proto` contracts versioned and stable
- generate client and server types from contracts
- keep auth, logging, and DI integrated with the host
- account for browser interoperability differences before choosing gRPC for public browser clients

## Background Work

Use `IHostedService` or `BackgroundService` for in-process background tasks tied to the application host.

Defaults:

- keep background services small and observable
- create scopes for scoped dependencies
- do not capture scoped services directly in singleton hosted services
- respect cancellation tokens
- avoid long blocking startup paths

If the work is durable, high-volume, or business-critical, consider whether it belongs in an out-of-process queue or worker instead of only inside the web host.
