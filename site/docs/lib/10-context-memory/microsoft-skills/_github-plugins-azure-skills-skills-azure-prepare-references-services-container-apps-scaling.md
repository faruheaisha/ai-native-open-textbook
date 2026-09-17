---
title: "Container Apps Scaling Patterns"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/scaling.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/scaling.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/scaling.md"
sourceSha256: "016a1aff1e49579be3f176b3b59c05ef3072ced899df5b29028b8e91d972617a"
pageSha256: "016a1aff1e49579be3f176b3b59c05ef3072ced899df5b29028b8e91d972617a"
contentMode: "local-full"
zh: ""
---

# Container Apps Scaling Patterns

## HTTP-based Scaling

Best for APIs and web applications:

```bicep
scale: \{
  minReplicas: 1
  maxReplicas: 10
  rules: [
    \{
      name: 'http-scaling'
      http: \{
        metadata: \{
          concurrentRequests: '100'
        \}
      \}
    \}
  ]
\}
```

## Queue-based Scaling

Best for background workers:

```bicep
scale: \{
  minReplicas: 0
  maxReplicas: 30
  rules: [
    \{
      name: 'queue-scaling'
      azureQueue: \{
        queueName: 'orders'
        queueLength: 10
        auth: [
          \{
            secretRef: 'storage-connection'
            triggerParameter: 'connection'
          \}
        ]
      \}
    \}
  ]
\}
```

## Service Bus Scaling

```bicep
scale: \{
  minReplicas: 0
  maxReplicas: 20
  rules: [
    \{
      name: 'servicebus-scaling'
      custom: \{
        type: 'azure-servicebus'
        metadata: \{
          queueName: 'myqueue'
          messageCount: '5'
        \}
        auth: [
          \{
            secretRef: 'servicebus-connection'
            triggerParameter: 'connection'
          \}
        ]
      \}
    \}
  ]
\}
```

## Recommendations

| Workload | Min Replicas | Max Replicas | Rule Type |
|----------|--------------|--------------|-----------|
| Production API | 1 | 10-20 | HTTP |
| Dev/Test API | 0 | 5 | HTTP |
| Background Worker | 0 | 30+ | Queue/Event |
| Scheduled Job | 0 | 1 | KEDA cron |
