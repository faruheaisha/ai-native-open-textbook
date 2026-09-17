---
title: "API Reference"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/r2-data-catalog/api.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/r2-data-catalog/api.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/r2-data-catalog/api.md"
sourceSha256: "d5389cca0a4151ba3d400bbb587bdf437cfd8f863f183469ad8457e2133dd46b"
pageSha256: "d5389cca0a4151ba3d400bbb587bdf437cfd8f863f183469ad8457e2133dd46b"
contentMode: "local-full"
zh: ""
---

# API Reference

R2 Data Catalog exposes standard [Apache Iceberg REST Catalog API](https://github.com/apache/iceberg/blob/main/open-api/rest-catalog-open-api.yaml).

## Quick Reference

**Most common operations:**

| Task | PyIceberg Code |
|------|----------------|
| Connect | `RestCatalog(name="r2", warehouse=bucket, uri=uri, token=token)` |
| List namespaces | `catalog.list_namespaces()` |
| Create namespace | `catalog.create_namespace("logs")` |
| Create table | `catalog.create_table(("ns", "table"), schema=schema)` |
| Load table | `catalog.load_table(("ns", "table"))` |
| Append data | `table.append(pyarrow_table)` |
| Query data | `table.scan().to_pandas()` |
| Compact files | `table.rewrite_data_files(target_file_size_bytes=128*1024*1024)` |
| Expire snapshots | `table.expire_snapshots(older_than=timestamp_ms, retain_last=10)` |

## REST Endpoints
