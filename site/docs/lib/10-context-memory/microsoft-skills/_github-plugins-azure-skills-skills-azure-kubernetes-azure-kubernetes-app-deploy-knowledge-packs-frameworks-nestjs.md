---
title: "NestJS Knowledge Pack"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/knowledge-packs/frameworks/nestjs.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/knowledge-packs/frameworks/nestjs.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/knowledge-packs/frameworks/nestjs.md"
sourceSha256: "d79dea38ee39735e2f85b71a26a570e476258bd94166fe33aa3f0cfcf7edfa34"
pageSha256: "d79dea38ee39735e2f85b71a26a570e476258bd94166fe33aa3f0cfcf7edfa34"
contentMode: "local-full"
zh: ""
---

# NestJS Knowledge Pack

> **Applies to:** Projects detected with `package.json` containing `@nestjs/core` as a dependency

## Quick Reference

| Property | Value |
|----------|-------|
| Signal files | `package.json` containing `@nestjs/core` |
| Default port | `3000` |
| Health path | `/health` |
| Base template | `templates/dockerfiles/node.Dockerfile` (+ `references/base-images.md`) |

---

## Signal Handling

NestJS lifecycle events (`OnModuleDestroy`, `BeforeApplicationShutdown`) fire only when shutdown hooks are enabled. Call `app.enableShutdownHooks()` in `main.ts` so `SIGTERM` from Kubernetes triggers graceful teardown of HTTP connections, database pools, and message queue consumers:

```typescript
const app = await NestFactory.create(AppModule);
app.enableShutdownHooks();
await app.listen(process.env.PORT || 3000);
```

The base template uses `dumb-init` as the entrypoint to forward `SIGTERM` to the Node process when running as PID 1. Both are required: `dumb-init` routes the signal, `enableShutdownHooks()` handles it.

---

## Health Endpoints

NestJS provides health checks via the `@nestjs/terminus` package.

### Installation

```bash
npm install @nestjs/terminus
```

### HealthModule

```typescript
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
})
export class HealthModule {}
```

Register `HealthModule` in `AppModule` imports.

### HealthController with database check

```typescript
import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService, private db: TypeOrmHealthIndicator) {}
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.db.pingCheck('database')]);
  }
}
```

For Prisma, use `PrismaHealthIndicator`; for MikroORM, use `MikroOrmHealthIndicator`. If no database is used, omit the indicator and return a simple status check.

### Probe configuration in Deployment manifest

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 15
  timeoutSeconds: 3
  failureThreshold: 3
readinessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 3
```

**Note:** NestJS apps start quickly (typically under 2 seconds), so `initialDelaySeconds: 5` is sufficient. If the app performs heavy initialization (e.g., loading large config, running migrations), increase to 10–15s or add a `startupProbe`.

---

## Database Profiles

NestJS supports multiple ORM libraries. The standard pattern is a connection string or individual env vars injected via environment variables:

| ORM | Connection Pattern | Config Property |
|-----|-------------------|-----------------|
| TypeORM | `TypeOrmModule.forRoot(\{ url: process.env.DATABASE_URL \})` | `DATABASE_URL` |
| Prisma | `datasource db \{ url = env("DATABASE_URL") \}` in `schema.prisma` | `DATABASE_URL` |
| MikroORM | `MikroOrmModule.forRoot(\{ clientUrl: process.env.DATABASE_URL \})` | `DATABASE_URL` |
| Sequelize | `SequelizeModule.forRoot(\{ uri: process.env.DATABASE_URL \})` | `DATABASE_URL` |

### Environment variables for PostgreSQL on AKS

```yaml
env:
  - name: DATABASE_URL
    value: "postgresql://{{IDENTITY_NAME}}@{{PG_SERVER_NAME}}.postgres.database.azure.com:5432/{{DB_NAME}}?sslmode=require"
```

For Workload Identity, see `references/workload-identity.md`.

---

## Writable Paths (DS012 Compliance)

When `readOnlyRootFilesystem: true` is set, NestJS apps need only `/tmp` writable:

- **Multipart uploads** (e.g., `@nestjs/platform-express` with `multer`) stage files to `/tmp`
- **Logging libraries** that buffer to disk use `/tmp`
- **`node_modules` and `dist/`** are read-only at runtime

### Required volume mount

```yaml
volumes:
  - name: tmp
    emptyDir: {}
containers:
  - name: app
    volumeMounts:
      - name: tmp
        mountPath: /tmp
```

---

## Resource Sizing

NestJS is Node.js-based and single-threaded. Similar to Express/Fastify.

| Resource | Request | Limit |
|----------|---------|-------|
| CPU | 100m | 500m |
| Memory | 128Mi | 256Mi |

---

## Port Configuration

- **Default port:** 3000
- **Env var override:** `PORT=3000`
- **Code pattern:** `await app.listen(process.env.PORT || 3000)` in `main.ts`

NestJS (via Express adapter) binds to `0.0.0.0` by default. For Fastify adapter, pass `'0.0.0.0'` explicitly: `await app.listen(process.env.PORT || 3000, '0.0.0.0')`.

---

## Build Commands

| Scenario | Build Command | Output | Entrypoint |
|----------|---------------|--------|------------|
| Standard | `npm run build` (invokes `nest build`) | `dist/` | `node dist/main.js` |
