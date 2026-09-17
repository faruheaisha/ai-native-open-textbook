---
title: "Acceptance Criteria: azure-postgres-ts"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-postgres-ts/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-postgres-ts/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-postgres-ts/acceptance-criteria.md"
sourceSha256: "af301f2bd18791e2d9442378e9b1accd1cd4161774c2f293f98149c8f15cd036"
pageSha256: "af301f2bd18791e2d9442378e9b1accd1cd4161774c2f293f98149c8f15cd036"
contentMode: "local-full"
zh: ""
---

# Acceptance Criteria: azure-postgres-ts

## Correct Patterns

### Authentication

#### DefaultAzureCredential with Token (Recommended)
```typescript
import { Client, Pool } from "pg";
import { DefaultAzureCredential } from "@azure/identity";

const credential = new DefaultAzureCredential();
const tokenResponse = await credential.getToken(
  "https://ossrdbms-aad.database.windows.net/.default"
);

const client = new Client({
  host: process.env.AZURE_POSTGRESQL_HOST,
  database: process.env.AZURE_POSTGRESQL_DATABASE,
  user: process.env.AZURE_POSTGRESQL_USER,
  password: tokenResponse.token,
  port: 5432,
  ssl: { rejectUnauthorized: true }
});
```

#### Password Authentication
```typescript
const client = new Client({
  host: process.env.AZURE_POSTGRESQL_HOST,
  database: process.env.AZURE_POSTGRESQL_DATABASE,
  user: process.env.AZURE_POSTGRESQL_USER,
  password: process.env.AZURE_POSTGRESQL_PASSWORD,
  port: 5432,
  ssl: { rejectUnauthorized: true }
});
```

### Connection Pool Usage
```typescript
const pool = new Pool({
  host: process.env.AZURE_POSTGRESQL_HOST,
  database: process.env.AZURE_POSTGRESQL_DATABASE,
  user: process.env.AZURE_POSTGRESQL_USER,
  password: process.env.AZURE_POSTGRESQL_PASSWORD,
  port: 5432,
  ssl: { rejectUnauthorized: true },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});

// Auto-release with pool.query()
const result = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);

// Manual checkout
const client = await pool.connect();
try {
  await client.query("SELECT 1");
} finally {
  client.release();
}
```

### Parameterized Queries
```typescript
// Single parameter
await pool.query("SELECT * FROM users WHERE id = $1", [userId]);

// Multiple parameters
await pool.query(
  "INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *",
  [email, name]
);

// Array parameter
await pool.query("SELECT * FROM users WHERE id = ANY($1::int[])", [ids]);
```

### Transactions
```typescript
const client = await pool.connect();
try {
  await client.query("BEGIN");
  await client.query("INSERT INTO users (email) VALUES ($1)", [email]);
  await client.query("COMMIT");
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  client.release();
}
```

### SSL Configuration for Azure
```typescript
// Required - SSL must be enabled for Azure PostgreSQL
ssl: { rejectUnauthorized: true }

// Connection string format
connectionString: `postgres://user:password@server.postgres.database.azure.com:5432/db?sslmode=require`
```

### Resource Cleanup
```typescript
// Client cleanup
await client.end();

// Pool cleanup
await pool.end();
```

### Error Handling
```typescript
import { DatabaseError } from "pg";

try {
  await pool.query("INSERT INTO users (email) VALUES ($1)", [email]);
} catch (error) {
  if (error instanceof DatabaseError) {
    switch (error.code) {
      case "23505": // unique_violation
        break;
      case "23503": // foreign_key_violation
        break;
      case "42P01": // undefined_table
        break;
    }
  }
  throw error;
}
```

---

## Incorrect Patterns

### Missing SSL Configuration
```typescript
// WRONG: Missing ssl property entirely
ssl: false
rejectUnauthorized: false
sslmode=disable
```

### String Concatenation (SQL Injection Risk)
```typescript
// WRONG: SQL injection vulnerability - template literal with variable
`SELECT * FROM users WHERE id = ${userId}`
"SELECT * FROM users WHERE id = " + userId
```

### Wrong Token Scope for Entra ID
```typescript
// WRONG: Using wrong scope URL
"https://database.windows.net/.default"
```

### SSL Mode Disabled in Connection String
```typescript
// WRONG: SSL disabled in connection string
sslmode=disable
```

---

## Evaluation Criteria

| Criterion | Weight | Description |
|-----------|--------|-------------|
| SSL Enabled | 20% | Must include `ssl: \{ rejectUnauthorized: true \}` or `sslmode=require` |
| Parameterized Queries | 20% | Must use `$1, $2` placeholders, never string concatenation |
| Connection Cleanup | 15% | Must call `client.end()` or `client.release()` |
| Pool Usage | 15% | Should use Pool for production, Client only for scripts |
| Error Handling | 15% | Should handle DatabaseError with specific codes |
| Entra ID Auth | 10% | Should prefer DefaultAzureCredential when applicable |
| Transaction Safety | 5% | Must include ROLLBACK in catch block for transactions |
