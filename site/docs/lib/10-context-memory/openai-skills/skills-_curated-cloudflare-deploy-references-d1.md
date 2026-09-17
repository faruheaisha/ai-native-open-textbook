---
title: "Cloudflare D1 Database"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/d1/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/d1/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/d1/README.md"
sourceSha256: "61b28faa4348cc80cd1296bc562fcba8205a131e73c9dc19a7da32e5c4b5f724"
pageSha256: "61b28faa4348cc80cd1296bc562fcba8205a131e73c9dc19a7da32e5c4b5f724"
contentMode: "local-full"
zh: ""
---

# Cloudflare D1 Database

Expert guidance for Cloudflare D1, a serverless SQLite database designed for horizontal scale-out across multiple databases.

## Overview

D1 is Cloudflare's managed, serverless database with:
- SQLite SQL semantics and compatibility
- Built-in disaster recovery via Time Travel (30-day point-in-time recovery)
- Horizontal scale-out architecture (10 GB per database)
- Worker and HTTP API access
- Pricing based on query and storage costs only

**Architecture Philosophy**: D1 is optimized for per-user, per-tenant, or per-entity database patterns rather than single large databases.

## Quick Start

```bash
# Create database
