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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceRel: "i18n/zh/skills/timescaledb/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceSha256: "5b223f41e9b421d89aa3ada311e079bfcf943fd79ec6f83793d0e93a29f910da"
pageSha256: "632a550f2a5cabac00786ae3906d49d649f0b9c8a1cce3acc9e509b2dfec2719"
contentMode: "local-full"
zh: ""
---

#### Disable Connection Pooler

```http
POST /projects/{project_id}/services/{service_id}/disablePooler
```

Deactivate the connection pooler for a service.

**Response:** `200 OK`
```json
{
  "message": "Connection pooler disabled successfully"
}
```

### Fork a Service

```http
POST /projects/{project_id}/services/{service_id}/forkService
```

Create a new, independent service by taking a snapshot of an existing one.

**Request Body:**
```json
{
    "name": "fork-test2",
    "region_code": "eu-central-1",
    "cpu_millis": 1000,
    "memory_gbs": 4
}
```

**Response:** `202 Accepted`
```json
{
    "service_id": "otewd3pem2",
    "project_id": "jz22xtzemv",
    "name": "fork-test2",
    "region_code": "eu-central-1",
    "service_type": "TIMESCALEDB",
    "created": "2025-09-04T20:54:09.53380732Z",
    "paused": false,
    "status": "READY",
    "resources": [
        {
            "id": "100929",
            "spec": {
                "cpu_millis": 1000,
                "memory_gbs": 4,
                "volume_type": ""
            }
        }
    ],
    "forked_from": {
        "project_id": "jz22xtzemv",
        "service_id": "p7zm9wqqii",
        "is_standby": false
    },
    "initial_password": "ph33bl5juuri5gem"
}
```

## Read Replica Sets

Manage read replicas for improved read performance.

### List Read Replica Sets

```http
GET /projects/{project_id}/services/{service_id}/replicaSets
```

Retrieve all read replica sets associated with a primary service.

**Response:** `200 OK`
```json
[
  {
    "id": "l5alxb3s2g",
    "name": "replica-set-test2",
    "status": "active",
    "nodes": 1,
    "cpu_millis": 1000,
    "memory_gbs": 4,
    "endpoint": {
        "host": "l5alxb3s2g.jz4qxtzemv.tsdb.cloud.timescale.com",
        "port": 38448
    },
    "connection_pooler": {
        "endpoint": {
            "host": "l5alxb3s2g.jz4qxtzemv.tsdb.cloud.timescale.com",
            "port": 38543
        }
    },
    "metadata": {
        "environment": "DEV"
    }
  }
]
```

**Replica Set Status:**
- `creating`: Replica set is being created
- `active`: Replica set is active and ready
- `resizing`: Replica set is being resized
- `deleting`: Replica set is being deleted
- `error`: Replica set encountered an error

### Create a Read Replica Set

```http
POST /projects/{project_id}/services/{service_id}/replicaSets
```

Create a new read replica set. This is an asynchronous operation.

**Request Body:**
```json
{
  "name": "replica-set-test2",
  "cpu_millis": 1000,
  "memory_gbs": 4,
  "nodes": 1
}
```

**Response:** `202 Accepted`
```json
{
  "id": "dsldm715t2",
  "name": "replica-set-test2",
  "status": "active",
  "nodes": 1,
  "cpu_millis": 1000,
  "memory_gbs": 4
}
```

### Delete a Read Replica Set

```http
DELETE /projects/{project_id}/services/{service_id}/replicaSets/{replica_set_id}
```

Delete a specific read replica set. This is an asynchronous operation.

**Response:** `202 Accepted`

### Resize a Read Replica Set

```http
POST /projects/{project_id}/services/{service_id}/replicaSets/{replica_set_id}/resize
```

Change resource allocation for a read replica set. This operation is async.

**Request Body:**
```json
{
  "cpu_millis": 500,
  "memory_gbs": 2,
  "nodes": 2
}
```

**Response:** `202 Accepted`
```json
{
    "message": "Replica set resize request accepted"
}
```

### Read Replica Set Connection Pooler
