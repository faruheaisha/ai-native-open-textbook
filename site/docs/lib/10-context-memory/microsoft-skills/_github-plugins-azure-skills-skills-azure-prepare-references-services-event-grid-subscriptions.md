---
title: "Event Grid - Subscriptions"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/event-grid/subscriptions.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/event-grid/subscriptions.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/event-grid/subscriptions.md"
sourceSha256: "50b7545e6807c9e18e2ff5ecb89885661f5723152c66975326212176fd05a9ef"
pageSha256: "50b7545e6807c9e18e2ff5ecb89885661f5723152c66975326212176fd05a9ef"
contentMode: "local-full"
zh: ""
---

# Event Grid - Subscriptions

## Event Subscription

```bicep
resource eventGridSubscription 'Microsoft.EventGrid/topics/eventSubscriptions@2023-12-15-preview' = \{
  parent: eventGridTopic
  name: 'order-processor-subscription'
  properties: \{
    destination: \{
      endpointType: 'WebHook'
      properties: \{
        endpointUrl: 'https://my-api.azurecontainerapps.io/webhooks/orders'
      \}
    \}
    filter: \{
      includedEventTypes: [
        'Order.Created'
        'Order.Updated'
      ]
    \}
    retryPolicy: \{
      maxDeliveryAttempts: 30
      eventTimeToLiveInMinutes: 1440
    \}
  \}
\}
```

## Destination Types

### Webhook

```bicep
destination: \{
  endpointType: 'WebHook'
  properties: \{
    endpointUrl: 'https://my-api.example.com/events'
  \}
\}
```

### Azure Function

```bicep
destination: \{
  endpointType: 'AzureFunction'
  properties: \{
    resourceId: functionApp.id
  \}
\}
```

### Service Bus Queue

```bicep
destination: \{
  endpointType: 'ServiceBusQueue'
  properties: \{
    resourceId: '$\{serviceBus.id\}/queues/events'
  \}
\}
```

### Event Hub

```bicep
destination: \{
  endpointType: 'EventHub'
  properties: \{
    resourceId: eventHub.id
  \}
\}
```

## Filtering

### Event Type Filter

```bicep
filter: \{
  includedEventTypes: [
    'Order.Created'
    'Order.Shipped'
  ]
\}
```

### Subject Filter

```bicep
filter: \{
  subjectBeginsWith: '/orders/priority'
  subjectEndsWith: '.json'
\}
```

### Advanced Filter

```bicep
filter: \{
  advancedFilters: [
    \{
      operatorType: 'NumberGreaterThan'
      key: 'data.amount'
      value: 100
    \}
  ]
\}
```
