---
title: "Vibe Coding CN"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/api.md"
sourceRel: "i18n/zh/skills/timescaledb/references/api.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/api.md"
sourceSha256: "3e08a12386bc1c2c2965dda885ab8b9b9b30d35e89d8c00a2f2d70066d208a6e"
pageSha256: "a7d1ae8f566f589394ac0032dac0bd452c843ea2664c9c16f2496246641cfbf5"
contentMode: "local-full"
zh: ""
---

## Service VPC Operations

### Attach Service to VPC

Associate a service with a VPC.

**Response:** `202 Accepted`

### Detach Service from VPC

Disassociate a service from its VPC.

**Response:** `202 Accepted`

### Read Replica Set Object

Tiger Cloud REST API uses standard HTTP status codes and returns error details in JSON format.

### Error Response Format

### Common Error Codes
- `400 Bad Request`: Invalid request parameters or malformed JSON
- `401 Unauthorized`: Missing or invalid authentication credentials
- `403 Forbidden`: Insufficient permissions for the requested operation
- `404 Not Found`: Requested resource does not exist
- `409 Conflict`: Request conflicts with current resource state
- `500 Internal Server Error`: Unexpected server error

### Example Error Response

===== PAGE: https://docs.tigerdata.com/api/glossary/ =====

**Examples:**

Example 1 (http):
```http
Authorization: Basic <base64(access_key:secret_key)>
```

Example 2 (bash):
```bash
curl -X GET "https://console.cloud.timescale.com/public/api/v1/projects/{project_id}/services" \
  -H "Authorization: Basic $(echo -n 'your_access_key:your_secret_key' | base64)"
```

Example 3 (http):
```http
GET /projects/{project_id}/services
```

Example 4 (json):
```json
[
  {
    "service_id": "p7zm9wqqii",
    "project_id": "jz22xtzemv",
    "name": "my-production-db",
    "region_code": "eu-central-1",
    "service_type": "TIMESCALEDB",
    "status": "READY",
    "created": "2024-01-15T10:30:00Z",
    "paused": false,
    "resources": [
      {
        "id": "resource-1",
        "spec": {
          "cpu_millis": 1000,
          "memory_gbs": 4,
          "volume_type": "gp2"
        }
      }
    ],
    "endpoint": {
      "host": "my-service.com",
      "port": 5432
    }
  }
]
```
