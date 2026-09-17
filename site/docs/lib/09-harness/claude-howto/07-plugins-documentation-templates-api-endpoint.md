---
title: "[METHOD] /api/v1/[endpoint]"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/07-plugins/documentation/templates/api-endpoint.md"
sourceRel: "07-plugins/documentation/templates/api-endpoint.md"
rawUrl: "/raw/09-harness/claude-howto/07-plugins/documentation/templates/api-endpoint.md"
sourceSha256: "674b1aeaa38ab21010043e26a686471066b313771d8e8814d92e1b09d98692f8"
pageSha256: "674b1aeaa38ab21010043e26a686471066b313771d8e8814d92e1b09d98692f8"
contentMode: "local-full"
zh: ""
---

# [METHOD] /api/v1/[endpoint]

## Description
Brief explanation of what this endpoint does.

## Authentication
Required authentication method (e.g., Bearer token).

## Parameters

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | string | Yes | Resource ID |

### Query Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| page | integer | No | Page number (default: 1) |
| limit | integer | No | Items per page (default: 20) |

### Request Body
```json
{
  "field": "value"
}
```

## Responses

### 200 OK
```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "Example"
  }
}
```

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input"
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

## Examples

### cURL
```bash
curl -X GET "https://api.example.com/api/v1/endpoint" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

### JavaScript
```javascript
const response = await fetch('/api/v1/endpoint', {
  headers: {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json'
  }
});
const data = await response.json();
```

### Python
```python
import requests

response = requests.get(
    'https://api.example.com/api/v1/endpoint',
    headers={'Authorization': 'Bearer token'}
)
data = response.json()
```

## Rate Limits
- 1000 requests per hour for authenticated users
- 100 requests per hour for public endpoints

## Related Endpoints
- [GET /api/v1/related](#)
- [POST /api/v1/related](#)

---

**Last Updated**: August 4, 2026
**Claude Code Version**: 2.1.220
**Sources**:
- https://code.claude.com/docs/en/plugins
**Compatible Models**: Claude Fable 5, Claude Opus 5, Claude Sonnet 5, Claude Sonnet 4.6, Claude Opus 4.8, Claude Haiku 4.5
