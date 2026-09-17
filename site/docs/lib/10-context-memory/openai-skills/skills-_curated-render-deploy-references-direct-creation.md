---
title: "Direct Creation (MCP) Details"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/render-deploy/references/direct-creation.md"
sourceRel: "skills/.curated/render-deploy/references/direct-creation.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/render-deploy/references/direct-creation.md"
sourceSha256: "3b148def3c12061582229599616b680f57972c86a8782e22a765cf261ec80adc"
pageSha256: "3b148def3c12061582229599616b680f57972c86a8782e22a765cf261ec80adc"
contentMode: "local-full"
zh: ""
---

# Direct Creation (MCP) Details

Use this reference for MCP direct-creation examples and follow-on configuration.

## Direct Creation Workflow

### Step 1: Analyze Codebase

Use [codebase-analysis.md](/lib/10-context-memory/openai-skills/skills-_curated-render-deploy-references-codebase-analysis) to determine runtime, build/start commands, env vars, and datastores.

### Step 2: Create Resources via MCP

**Create a Web Service:**
```
create_web_service(
  name: "my-api",
  runtime: "node",  # or python, go, rust, ruby, elixir, docker
  repo: "https://github.com/username/repo",
  branch: "main",  # optional, defaults to repo default branch
  buildCommand: "npm ci",
  startCommand: "npm start",
  plan: "free",  # free, starter, standard, pro, pro_max, pro_plus, pro_ultra
  region: "oregon",  # oregon, frankfurt, singapore, ohio, virginia
  envVars: [
    {"key": "NODE_ENV", "value": "production"}
  ]
)
```

**Create a Static Site:**
```
create_static_site(
  name: "my-frontend",
  repo: "https://github.com/username/repo",
  branch: "main",
  buildCommand: "npm run build",
  publishPath: "dist",  # or build, public, out
  envVars: [
    {"key": "VITE_API_URL", "value": "https://api.example.com"}
  ]
)
```

**Create a Cron Job:**
```
create_cron_job(
  name: "daily-cleanup",
  runtime: "node",
  repo: "https://github.com/username/repo",
  schedule: "0 0 * * *",  # Daily at midnight (cron syntax)
  buildCommand: "npm ci",
  startCommand: "node scripts/cleanup.js",
  plan: "free"
)
```

**Create a PostgreSQL Database:**
```
create_postgres(
  name: "myapp-db",
  plan: "free",  # free, basic_256mb, basic_1gb, basic_4gb, pro_4gb, etc.
  region: "oregon"
)
```

**Create a Key-Value Store (Redis):**
```
create_key_value(
  name: "myapp-cache",
  plan: "free",  # free, starter, standard, pro, pro_plus
  region: "oregon",
  maxmemoryPolicy: "allkeys_lru"  # eviction policy
)
```

### Step 3: Configure Environment Variables

After creating services, add environment variables:

```
update_environment_variables(
