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
pageSha256: "7ebc6102a40391a084acc3d19dbbcd32fb000ee81776afc859cc4bd3c8b28f26"
contentMode: "local-full"
zh: ""
---

## Tiger Cloud REST API reference

**URL:** llms-txt#tiger-cloud-rest-api-reference

**Contents:**
- Overview
- Authentication
  - Basic Authentication
  - Example
- Service Management
  - List All Services
  - Create a Service
  - Get a Service
  - Delete a Service
  - Resize a Service

A comprehensive RESTful API for managing Tiger Cloud resources including VPCs, services, and read replicas.

**API Version:** 1.0.0
**Base URL:** `https://console.cloud.timescale.com/public/api/v1`

The Tiger REST API uses HTTP Basic Authentication. Include your access key and secret key in the Authorization header.

### Basic Authentication
