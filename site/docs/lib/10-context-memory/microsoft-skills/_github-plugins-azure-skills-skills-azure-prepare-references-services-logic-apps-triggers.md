---
title: "Logic Apps - Triggers"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/logic-apps/triggers.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/logic-apps/triggers.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/logic-apps/triggers.md"
sourceSha256: "9de7c5db40549a389f328b6d813b67ace99411a418de068f710a28598a7abceb"
pageSha256: "9de7c5db40549a389f328b6d813b67ace99411a418de068f710a28598a7abceb"
contentMode: "local-full"
zh: ""
---

# Logic Apps - Triggers

## HTTP Request

```json
\{
  "triggers": \{
    "manual": \{
      "type": "Request",
      "kind": "Http",
      "inputs": \{
        "schema": \{
          "type": "object",
          "properties": \{
            "orderId": \{ "type": "string" \}
          \}
        \}
      \}
    \}
  \}
\}
```

## Recurrence (Schedule)

```json
\{
  "triggers": \{
    "Recurrence": \{
      "type": "Recurrence",
      "recurrence": \{
        "frequency": "Hour",
        "interval": 1
      \}
    \}
  \}
\}
```

## Service Bus Queue

```json
\{
  "triggers": \{
    "When_a_message_is_received": \{
      "type": "ApiConnection",
      "inputs": \{
        "host": \{
          "connection": \{
            "name": "@parameters('$connections')['servicebus']['connectionId']"
          }
        },
        "method": "get",
        "path": "/@{encodeURIComponent('orders')}/messages/head"
      }
    }
  }
}
```

## Common Actions

### HTTP Action

```json
{
  "HTTP": {
    "type": "Http",
    "inputs": {
      "method": "POST",
      "uri": "https://api.example.com/orders",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": "@triggerBody()"
    }
  }
}
```

### Approval Email

```json
{
  "Send_approval_email": {
    "type": "ApiConnectionWebhook",
    "inputs": {
      "host": {
        "connection": {
          "name": "@parameters('$connections')['office365']['connectionId']"
        \}
      \},
      "body": \{
        "NotificationUrl": "@\{listCallbackUrl()\}",
        "Message": \{
          "To": "approver@example.com",
          "Subject": "Approval Required",
          "Options": "Approve, Reject"
        \}
      \},
      "path": "/approvalmail/$subscriptions"
    \}
  \}
\}
```
