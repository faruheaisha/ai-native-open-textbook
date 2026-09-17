---
title: "🗄️ DATABASE LAYER"
sourceId: "07-coding/cloudflare-vibesdk"
sourceTitle: "Cloudflare VibeSDK"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/cloudflare/vibesdk"
entryUrl: "https://github.com/cloudflare/vibesdk/blob/9da158d82c597a0e8f4bf033cdccd1053fb6fb15/docs/llm.md"
sourceRel: "docs/llm.md"
rawUrl: "/raw/07-coding/cloudflare-vibesdk/docs/llm.md"
sourceSha256: "5cade1cd8dea6404f985f3f367e0c0233441fc841f741f71f3da1e6c1e0c9cf7"
pageSha256: "74d9acc9b59f3035954c565627b0e5fdf5ad3d479cad0e5042acf8a5a559db2a"
contentMode: "local-full"
zh: ""
---

# 🗄️ DATABASE LAYER

## Overview

The database layer uses **Cloudflare D1** (SQLite) with **Drizzle ORM** for type-safe queries. All database operations are abstracted through service classes that extend `BaseService`.

**Key Technologies:**
- **D1 Database:** Serverless SQLite on Cloudflare's edge
- **Drizzle ORM:** Type-safe SQL query builder
- **D1 Sessions API:** Read replicas for lower latency
- **Migrations:** SQL-based schema migrations

---

## Database Architecture

```
┌────────────────────────────────────────────────────────────┐
│                     API Controllers                        │
│  (Handle HTTP requests, validate input)                   │
└──────────────────────┬─────────────────────────────────────┘
                       │
                       ↓
┌────────────────────────────────────────────────────────────┐
│                   Domain Services                          │
│  AppService │ UserService │ AuthService │ etc.            │
│  (Business logic, transaction management)                  │
└──────────────────────┬─────────────────────────────────────┘
                       │ extends
                       ↓
┌────────────────────────────────────────────────────────────┐
│                     BaseService                            │
│  - Database connection (DatabaseService)                   │
│  - Read replicas (D1 Sessions API)                         │
│  - Common utilities (buildWhereConditions)                 │
│  - Error handling                                          │
└──────────────────────┬─────────────────────────────────────┘
                       │
                       ↓
┌────────────────────────────────────────────────────────────┐
│                  DatabaseService                           │
│  - Primary database connection (writes)                    │
│  - Read replica connections (reads)                        │
│  - Drizzle ORM instance                                    │
└──────────────────────┬─────────────────────────────────────┘
                       │
                       ↓
┌────────────────────────────────────────────────────────────┐
│                Cloudflare D1 Database                      │
│  Primary + Read Replicas (Global Distribution)             │
└────────────────────────────────────────────────────────────┘
```

---

## BaseService Pattern

**Location:** `/worker/database/services/BaseService.ts`

### **Purpose**

Provides common database functionality to all domain services:
- Database connection management
- Read replica access (D1 Sessions API)
- Type-safe where condition building
- Error handling patterns
- Logging

### **Implementation**

```typescript
abstract class BaseService {
  protected logger = createLogger(this.constructor.name);
  protected db: DatabaseService;
  protected env: Env;
  
  constructor(env: Env) {
    this.db = createDatabaseService(env);
    this.env = env;
  }
  
  // Direct database access (primary)
  protected get database() {
    return this.db.db;
  }
  
  // Read replica access (optimized latency)
  protected getReadDb(strategy: 'fast' | 'fresh' = 'fast') {
    return this.db.getReadDb(strategy);
  }
  
  // Build type-safe WHERE conditions
  protected buildWhereConditions(
    conditions: (SQL<unknown> | undefined)[]
  ): SQL<unknown> | undefined {
    const validConditions = conditions.filter(
      (c): c is SQL<unknown> => c !== undefined
    );
    if (validConditions.length === 0) return undefined;
    if (validConditions.length === 1) return validConditions[0];
    return and(...validConditions);
  }
  
  // Standard error handling
  protected handleDatabaseError(
    error: unknown,
    operation: string,
    context?: Record<string, unknown>
  ): never {
    this.logger.error(`Database error in ${operation}`, { error, context });
    throw error;
  }
}
```

---

## D1 Sessions API - Read Replicas

### **What is D1 Sessions?**

Cloudflare D1 Sessions API provides **read replicas** for D1 databases distributed globally. This dramatically reduces latency for read queries by serving them from the nearest replica.

### **Strategies**

**Location:** `/worker/database/database.ts`

```typescript
class DatabaseService {
  getReadDb(strategy: 'fast' | 'fresh' = 'fast') {
    if (strategy === 'fast') {
      // Lowest latency - may be slightly stale
      return drizzle(this.env.DB, { ... });
    } else {
      // Latest data - may have higher latency
      return drizzle(this.env.DB.withSession({ strategy: 'fresh' }), { ... });
    }
  }
}
```

### **When to Use Each Strategy**

#### **'fast' Strategy (Default)**

**Use for:**
- Public app listings
- Public app details
- Analytics and stats
- Search results
- Any read-only public data

**Benefits:**
- **Lowest latency** (served from nearest replica)
- Suitable for data that can tolerate slight staleness (few seconds)
- Most queries should use this

**Example:**
```typescript
// Public apps - use fast replicas
async getPublicApps(options: PublicAppQueryOptions) {
  const readDb = this.getReadDb('fast');  // ← Use fast strategy
  
  const apps = await readDb
    .select()
    .from(schema.apps)
    .where(eq(schema.apps.visibility, 'public'));
}
```

#### **'fresh' Strategy**

**Use for:**
- User's own data (own apps, favorites)
- Immediately after writes (read-after-write)
- Auth/session validation
- Account settings
- Any data where staleness is unacceptable

**Benefits:**
- **Latest data** from primary or recent replica
- Ensures user sees their own changes immediately

**Example:**
```typescript
// User's own apps - use fresh data
async getUserApps(userId: string) {
  const readDb = this.getReadDb('fresh');  // ← Use fresh strategy
  
  const apps = await readDb
    .select()
    .from(schema.apps)
    .where(eq(schema.apps.userId, userId));
}
```

### **NEVER Use Read Replicas For:**

❌ **Write operations** - Always use primary (`this.database`)
❌ **Auth validation** - Use primary to avoid security issues
❌ **Immediately after INSERT/UPDATE** - Read from primary
❌ **Critical consistency** - Password changes, payments, etc.

---

## Drizzle ORM Patterns

### **Basic Queries**

#### **SELECT**

```typescript
// Simple select
const users = await db
  .select()
  .from(schema.users)
  .where(eq(schema.users.email, email));

// Select specific columns
const users = await db
  .select({
    id: schema.users.id,
    email: schema.users.email
  })
  .from(schema.users);

// With JOIN
const apps = await db
  .select({
    app: schema.apps,
    userName: schema.users.displayName
  })
  .from(schema.apps)
  .leftJoin(schema.users, eq(schema.apps.userId, schema.users.id));
```

#### **INSERT**

```typescript
// Insert one
const [user] = await db
  .insert(schema.users)
  .values({
    id: generateId(),
    email: 'user@example.com',
    displayName: 'User',
    createdAt: new Date()
  })
  .returning();

// Insert many
await db
  .insert(schema.apps)
  .values([
    { id: id1, title: 'App 1', ... },
    { id: id2, title: 'App 2', ... }
  ]);
```

#### **UPDATE**

```typescript
await db
  .update(schema.users)
  .set({ 
    displayName: 'New Name',
    updatedAt: new Date()
  })
  .where(eq(schema.users.id, userId));
```

#### **DELETE**

```typescript
// Hard delete
await db
  .delete(schema.sessions)
  .where(eq(schema.sessions.id, sessionId));

// Soft delete (preferred)
await db
  .update(schema.users)
  .set({ deletedAt: new Date() })
  .where(eq(schema.users.id, userId));
```

### **Complex Queries**

#### **Aggregations**

```typescript
// COUNT
const result = await db
  .select({ count: sql<number>`COUNT(*)` })
  .from(schema.apps)
  .where(eq(schema.apps.visibility, 'public'));

const total = result[0].count;

// SUM, AVG
const stats = await db
  .select({
    totalViews: sql<number>`SUM(${schema.appViews.id})`,
    avgViews: sql<number>`AVG(view_count)`
  })
  .from(schema.apps);
```

#### **Subqueries**

```typescript
// Subquery in WHERE
const apps = await db
  .select()
  .from(schema.apps)
  .where(
    inArray(
      schema.apps.id,
      db.select({ id: schema.favorites.appId })
        .from(schema.favorites)
        .where(eq(schema.favorites.userId, userId))
    )
  );
```

#### **Conditional WHERE Clauses**

```typescript
// Use BaseService.buildWhereConditions()
const conditions: WhereCondition[] = [];

if (framework) {
  conditions.push(eq(schema.apps.framework, framework));
}

if (search) {
  conditions.push(
    or(
      sql`LOWER(${schema.apps.title}) LIKE ${`%${search}%`}`,
      sql`LOWER(${schema.apps.description}) LIKE ${`%${search}%`}`
    )
  );
}

const whereClause = this.buildWhereConditions(conditions);

const apps = await db
  .select()
  .from(schema.apps)
  .where(whereClause);
```

---

## Domain Services

### **Available Services**

**Location:** `/worker/database/services/`

1. **AuthService** - Authentication, login, OAuth
2. **SessionService** - JWT sessions, token management
3. **UserService** - User CRUD, profiles
4. **AppService** - App CRUD, public listings, search, ranking
5. **AnalyticsService** - Views, stars, activity tracking
6. **SecretsService** - Encrypted secrets storage
7. **ModelConfigService** - User model overrides
8. **ApiKeyService** - API key generation, validation

Each extends BaseService, uses Drizzle ORM, follows standard CRUD patterns.

---

## AppService - Public App Ranking

**Key methods:** createApp, getPublicApps (paginated with filters), getUserAppsWithFavorites, toggleAppStar, updateDeploymentId, updateGitHubRepository, updateAppScreenshot

**Ranking algorithms:**
- **Popular:** (views × 1 + stars × 3) DESC
- **Trending:** (recent_activity × 1000000 + recency_bonus) DESC  
- **Recent:** updatedAt DESC
- **Starred:** COUNT(stars) DESC

**Read replica usage:** Public queries use 'fast', user's own data uses 'fresh'

---

## Database Migrations

**Location:** `/migrations/` (SQL files + meta snapshots)

**Commands:**
- `npm run db:generate` - Generate migration from schema changes
- `npm run db:migrate:local` - Apply to local D1
- `npm run db:migrate:remote` - Apply to production D1
- `npm run db:push:local` - Direct push (dev only)

**Tool:** Drizzle Kit with d1-http driver

---

## 📚 Key Files Reference

### **Frontend Core Files**
- `/src/api-types.ts` - ALL shared API types (single source of truth)
- `/src/lib/api-client.ts` - ALL API calls defined here
- `/src/routes/chat/chat.tsx` - Main chat interface (1208 lines)
- `/src/routes/chat/hooks/use-chat.ts` - Chat state management (BRAIN)
- `/src/routes/chat/utils/handle-websocket-message.ts` - WebSocket handler (831 lines)
- `/src/routes/chat/utils/deduplicate-messages.ts` - Message deduplication utilities
- `/src/routes/chat/components/phase-timeline.tsx` - Phase progress UI
- `/src/routes/chat/components/messages.tsx` - User/AI message rendering
- `/src/hooks/useAuthGuard.ts` - Authentication guards
- `/src/hooks/use-image-upload.ts` - Image upload handling

### **Backend Core Files**
- `/worker/agents/core/simpleGeneratorAgent.ts` - Base agent DO class
- `/worker/agents/core/state.ts` - CodeGenState interface
- `/worker/agents/core/websocket.ts` - WebSocket message handler (250 lines)
- `/worker/agents/constants.ts` - WebSocket message type constants
- `/worker/agents/inferutils/core.ts` - LLM inference engine
- `/worker/agents/inferutils/infer.ts` - Inference execution wrapper
- `/worker/agents/inferutils/config.ts` - Model configurations
- `/worker/agents/assistants/codeDebugger.ts` - Deep debugger assistant
- `/worker/agents/operations/UserConversationProcessor.ts` - Orange AI (818 lines)
- `/worker/agents/tools/customTools.ts` - Tool registration
- `/worker/api/routes/index.ts` - Main API router
- `/worker/database/schema.ts` - Database schema (618 lines)

### **Configuration Files**
- `/worker/agents/inferutils/config.ts` - LLM model configs
- `/wrangler.jsonc` - Cloudflare Workers config
- `/vite.config.ts` - Frontend build config
- `/tsconfig.json` - TypeScript config
- `/drizzle.config.local.ts` - Local database config
- `/drizzle.config.remote.ts` - Remote database config

---

## ✅ Checklist for Changes

Before submitting any change, verify:

- [ ] Types are properly defined (no `any`)
- [ ] Existing patterns are followed
- [ ] Code is DRY (no duplication)
- [ ] Comments are clear and concise
- [ ] File naming matches conventions
- [ ] API calls use `api-client.ts`
- [ ] Database operations use service classes
- [ ] Error handling is comprehensive
- [ ] AbortController lifecycle is correct (if applicable)
- [ ] WebSocket messages are handled (if applicable)
- [ ] This document is updated (if needed)

---

## 🔧 Troubleshooting Common Issues

### **Issue: "Cannot find module" errors**

**Cause:** Import path incorrect or module not installed

**Fix:**
1. Check import path matches file location
2. For workspace imports, use `worker/...` not `../../../...`
3. Run `npm install` if package missing
4. Check `tsconfig.json` path mappings

### **Issue: Durable Object not receiving WebSocket messages**

**Check:**
1. Message type in constants: `/worker/agents/constants.ts`
2. Handler in `/worker/agents/core/websocket.ts` → `handleWebSocketMessage()`
3. Frontend sending correct type (check browser console)
4. WebSocket connection established (check `agent_connected` received)

**Debug:**
```typescript
// Add to websocket.ts handleWebSocketMessage()
logger.info('Received WebSocket message', { type: message.type, data: message });
```

### **Issue: LLM not calling tools**

**Common causes:**
1. Tool description unclear → LLM doesn't know when to use it
2. Tool not registered in `buildTools()` or `buildDebugTools()`
3. Parameter schema too complex → simplify
4. System prompt doesn't mention tool

**Fix:**
- Keep tool description to 2-3 clear lines
- Make parameters simple (prefer strings over complex objects)
- Add tool to relevant system prompt

### **Issue: Database query returning stale data**

**Cause:** Using read replica for data that needs to be fresh

**Fix:**
```typescript
// WRONG - uses fast replica
const readDb = this.getReadDb('fast');

// RIGHT - uses fresh data
const readDb = this.getReadDb('fresh');

// OR use primary for critical consistency
const result = await this.database.select()...
```

### **Issue: "Rate limit exceeded" during development**

**Quick fix:**
```typescript
// In UserConversationProcessor.ts or codeDebugger.ts
// Temporarily increase max_tokens or reduce frequency
```

**Better fix:** Use cheaper model for testing
```typescript
// In config.ts
conversationalResponse: {
  name: GEMINI_2_5_FLASH,  // Fast & cheap
  max_tokens: 4000,
}
```

### **Issue: Type errors after schema change**

**Steps:**
1. Regenerate Drizzle types: `npm run db:generate`
2. Restart TypeScript server in IDE
3. Check migration applied: `npm run db:migrate:local`

### **Issue: Sandbox deployment failing**

**Check logs:**
```typescript
// In DeploymentManager.ts, enable verbose logging
this.logger.info('Deployment attempt', { 
  sessionId: this.getSessionId(),
  filesCount: files.length 
});
```

**Common causes:**
1. Sandbox service unreachable
2. Invalid template name
3. sessionId mismatch (check `agent.state.sessionId`)
4. npm install timeout → increase timeout or split commands

### **Issue: Agent state not persisting**

**Verify:**
1. Check DO storage: Cloudflare dashboard → Durable Objects
2. Ensure `setState()` called after changes
3. Check for exceptions in state serialization

**Test:**
```typescript
const currentState = this.getState();
this.logger().info('State before save', { currentState });
this.setState(newState);
this.logger().info('State after save', { newState });
```

### **Where to Look for Logs**

**Local development:**
- Frontend: Browser console
- Worker: Terminal where `npm run dev:worker` is running
- Durable Objects: Same terminal, prefixed with DO ID

**Production:**
- Cloudflare dashboard → Workers & Pages → Logs
- Real-time logs via `wrangler tail`
- Sentry (if configured)

### **Useful Debug Snippets**

**Log all WebSocket messages:**
```typescript
// In websocket.ts
logger.info('[WS_IN]', { type: message.type, keys: Object.keys(message) });
```

**Log all tool calls:**
```typescript
// In customTools.ts executeToolWithDefinition()
logger.info('[TOOL_CALL]', { name: toolDef.function.name, args });
```

**Log state transitions:**
```typescript
// In simpleGeneratorAgent.ts launchStateMachine()
logger.info('[STATE_TRANSITION]', { 
  from: currentDevState, 
  to: executionResults.currentDevState 
});
```
