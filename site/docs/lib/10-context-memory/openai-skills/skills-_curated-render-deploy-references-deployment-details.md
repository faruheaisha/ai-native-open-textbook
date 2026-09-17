---
title: "Deployment Details"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/render-deploy/references/deployment-details.md"
sourceRel: "skills/.curated/render-deploy/references/deployment-details.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/render-deploy/references/deployment-details.md"
sourceSha256: "fa6aa90a707494fcc9438b65829ef4891b9ed03c1cf69d6323fbd997b1f6782a"
pageSha256: "fa6aa90a707494fcc9438b65829ef4891b9ed03c1cf69d6323fbd997b1f6782a"
contentMode: "local-full"
zh: ""
---

# Deployment Details

Use this reference for service discovery, configuration patterns, quick commands, and common issues.

## Service Discovery

**List all services:**
```
list_services()
```
Returns all services with IDs, names, types, and status.

**Get specific service details:**
```
get_service(serviceId: "<id>")
```
Returns full configuration including environment variables and build/start commands.

**List PostgreSQL databases:**
```
list_postgres_instances()
```

**List Key-Value stores:**
```
list_key_value()
```

## Configuration Details

### Environment Variables

**All environment variables must be declared in render.yaml.**

**Three patterns for environment variables:**

1. **Hardcoded values** (non-sensitive configuration):
```yaml
envVars:
  - key: NODE_ENV
    value: production
  - key: API_URL
    value: https://api.example.com
```

2. **Database connections** (auto-generated):
```yaml
envVars:
  - key: DATABASE_URL
    fromDatabase:
      name: postgres
      property: connectionString
  - key: REDIS_URL
    fromDatabase:
      name: redis
      property: connectionString
```

3. **Secrets** (user fills in Dashboard):
```yaml
envVars:
  - key: JWT_SECRET
    sync: false
  - key: API_KEY
    sync: false
  - key: STRIPE_SECRET_KEY
    sync: false
```

Complete environment variable guide: [configuration-guide.md](/lib/10-context-memory/openai-skills/skills-_curated-render-deploy-references-configuration-guide)

### Port Binding

**CRITICAL:** Web services must bind to `0.0.0.0:$PORT` (NOT `localhost`). Render sets the `PORT` environment variable.

**Node.js Example:**
```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
```

**Python Example:**
```python
import os

port = int(os.environ.get('PORT', 5000))
app.run(host='0.0.0.0', port=port)
```

**Go Example:**
```go
port := os.Getenv("PORT")
if port == "" {
    port = "3000"
}
http.ListenAndServe(":"+port, handler)
```

### Plan Defaults

**Use `plan: free` unless the user specifies otherwise.** Refer to Render pricing for current limits and capacity.

### Build Commands

**Use non-interactive flags to prevent build hangs:**
- npm: `npm ci`
- yarn: `yarn install --frozen-lockfile`
- pnpm: `pnpm install --frozen-lockfile`
- bun: `bun install --frozen-lockfile`
- pip: `pip install -r requirements.txt`
- uv: `uv sync`
- apt: `apt-get install -y <package>`
- bundler: `bundle install --jobs=4 --retry=3`

### Database Connections

When services connect to databases in the same Render account, use `fromDatabase` references for internal URLs.

### Health Checks

Optional but recommended: add a `/health` endpoint for faster deployment detection.

## Quick Reference

### MCP Tools (Preferred)
```
# Service Discovery
list_services()
get_service(serviceId: "<id>")
list_postgres_instances()
list_key_value()

# Service Creation
create_web_service(name, runtime, buildCommand, startCommand, ...)
create_static_site(name, buildCommand, publishPath, ...)
create_cron_job(name, runtime, schedule, buildCommand, startCommand, ...)
create_postgres(name, plan, region)
create_key_value(name, plan, region)

# Environment Variables
update_environment_variables(serviceId, envVars: [{key, value}, ...])

# Deployment & Monitoring
list_deploys(serviceId, limit)
list_logs(resource: ["<id>"], level: ["error"])
get_metrics(resourceId, metricTypes: [...])

# Workspace
get_selected_workspace()
list_workspaces()
```

### CLI Commands
```bash
# Validate Blueprint
render blueprints validate

# Check workspace
render workspace current -o json
render workspace set

# List services
render services -o json

# View deployment logs
