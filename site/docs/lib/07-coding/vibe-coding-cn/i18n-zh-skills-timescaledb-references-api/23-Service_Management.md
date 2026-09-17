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
pageSha256: "16ebbc891b947f129a20bcb55d0cad37c1e6dda960ff2c83585a6c73ebfc06f0"
contentMode: "local-full"
zh: ""
---

## Service Management

You use this endpoint to create a Tiger Cloud service with one of more of the following addons:

- `time-series`: a Tiger Cloud service optimized for real-time analytics. For time-stamped data like events,
  prices, metrics, sensor readings, or any information that changes over time.
- `ai`: a Tiger Cloud service instance with vector extensions.

To have multiple addons when you create a new service, set `"addons": ["time-series", "ai"]`. To create a
vanilla Postgres instance, set `addons` to an empty list `[]`.

### List All Services

Retrieve all services within a project.

**Response:** `200 OK`

Create a new Tiger Cloud service. This is an asynchronous operation.

**Response:** `202 Accepted`

**Service Types:**
- `TIMESCALEDB`: a Tiger Cloud service instance optimized for real-time analytics service For time-stamped data like events,
   prices, metrics, sensor readings, or any information that changes over time
- `POSTGRES`: a vanilla Postgres instance
- `VECTOR`: a Tiger Cloud service instance with vector extensions

Retrieve details of a specific service.

**Response:** `200 OK`

**Service Status:**
- `QUEUED`: Service creation is queued
- `DELETING`: Service is being deleted
- `CONFIGURING`: Service is being configured
- `READY`: Service is ready for use
- `DELETED`: Service has been deleted
- `UNSTABLE`: Service is in an unstable state
- `PAUSING`: Service is being paused
- `PAUSED`: Service is paused
- `RESUMING`: Service is being resumed
- `UPGRADING`: Service is being upgraded
- `OPTIMIZING`: Service is being optimized

Delete a specific service. This is an asynchronous operation.

**Response:** `202 Accepted`

Change CPU and memory allocation for a service.

**Response:** `202 Accepted`

### Update Service Password

Set a new master password for the service.

**Response:** `204 No Content`

### Set Service Environment

Set the environment type for the service.

**Environment Values:**
- `PROD`: Production environment
- `DEV`: Development environment

**Response:** `200 OK`

### Configure High Availability

Change the HA configuration for a service. This is an asynchronous operation.

**Response:** `202 Accepted`

### Connection Pooler Management

#### Enable Connection Pooler

Activate the connection pooler for a service.

**Response:** `200 OK`

#### Disable Connection Pooler

Deactivate the connection pooler for a service.

**Response:** `200 OK`

Create a new, independent service by taking a snapshot of an existing one.

**Response:** `202 Accepted`

Manage read replicas for improved read performance.

### List Read Replica Sets

Retrieve all read replica sets associated with a primary service.

**Response:** `200 OK`

**Replica Set Status:**
- `creating`: Replica set is being created
- `active`: Replica set is active and ready
- `resizing`: Replica set is being resized
- `deleting`: Replica set is being deleted
- `error`: Replica set encountered an error

### Create a Read Replica Set

Create a new read replica set. This is an asynchronous operation.

**Response:** `202 Accepted`

### Delete a Read Replica Set

Delete a specific read replica set. This is an asynchronous operation.

**Response:** `202 Accepted`

### Resize a Read Replica Set

Change resource allocation for a read replica set. This operation is async.

**Response:** `202 Accepted`

### Read Replica Set Connection Pooler

#### Enable Replica Set Pooler

Activate the connection pooler for a read replica set.

**Response:** `200 OK`

#### Disable Replica Set Pooler

Deactivate the connection pooler for a read replica set.

**Response:** `200 OK`

### Set Replica Set Environment

Set the environment type for a read replica set.

**Response:** `200 OK`

Virtual Private Clouds (VPCs) provide network isolation for your TigerData services.

List all Virtual Private Clouds in a project.

**Response:** `200 OK`

**Response:** `201 Created`

Retrieve details of a specific VPC.

**Response:** `200 OK`

Update the name of a specific VPC.

**Response:** `200 OK`

Delete a specific VPC.

**Response:** `204 No Content`

Manage peering connections between VPCs across different accounts and regions.

### List VPC Peerings

Retrieve all VPC peering connections for a given VPC.

**Response:** `200 OK`

### Create VPC Peering

Create a new VPC peering connection.

**Response:** `201 Created`

Retrieve details of a specific VPC peering connection.

### Delete VPC Peering

Delete a specific VPC peering connection.

**Response:** `204 No Content`
