---
title: "Event Grid - Bicep Patterns"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/event-grid/bicep.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/event-grid/bicep.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/event-grid/bicep.md"
sourceSha256: "8acd231b4fa51ff5f4307d73b505cf5dff410c425d90030326f621311778771d"
pageSha256: "8acd231b4fa51ff5f4307d73b505cf5dff410c425d90030326f621311778771d"
contentMode: "local-full"
zh: ""
---

# Event Grid - Bicep Patterns

## Custom Topic

```bicep
resource eventGridTopic 'Microsoft.EventGrid/topics@2023-12-15-preview' = \{
  name: '${resourcePrefix}-egt-${uniqueHash\}'
  location: location
  properties: \{
    inputSchema: 'EventGridSchema'
    publicNetworkAccess: 'Enabled'
  \}
\}
```

## System Topic (Azure Resource Events)

```bicep
resource storageSystemTopic 'Microsoft.EventGrid/systemTopics@2023-12-15-preview' = \{
  name: '${resourcePrefix}-storage-topic'
  location: location
  properties: {
    source: storageAccount.id
    topicType: 'Microsoft.Storage.StorageAccounts'
  }
}
```

## Event Domain

```bicep
resource eventDomain 'Microsoft.EventGrid/domains@2023-12-15-preview' = {
  name: '${resourcePrefix\}-domain'
  location: location
  properties: \{
    inputSchema: 'EventGridSchema'
  \}
\}
```

## Publishing Events

### Node.js

```javascript
const \{ EventGridPublisherClient, AzureKeyCredential \} = require("@azure/eventgrid");

const client = new EventGridPublisherClient(
  process.env.EVENTGRID_TOPIC_ENDPOINT,
  "EventGrid",
  new AzureKeyCredential(process.env.EVENTGRID_TOPIC_KEY)
);

await client.send([\{
  eventType: "Order.Created",
  subject: "/orders/12345",
  dataVersion: "1.0",
  data: \{ orderId: "12345" \}
\}]);
```

### Python

```python
from azure.eventgrid import EventGridPublisherClient, EventGridEvent
from azure.core.credentials import AzureKeyCredential

client = EventGridPublisherClient(
    os.environ["EVENTGRID_TOPIC_ENDPOINT"],
    AzureKeyCredential(os.environ["EVENTGRID_TOPIC_KEY"])
)

client.send([EventGridEvent(
    event_type="Order.Created",
    subject="/orders/12345",
    data=\{"orderId": "12345"\},
    data_version="1.0"
)])
```
