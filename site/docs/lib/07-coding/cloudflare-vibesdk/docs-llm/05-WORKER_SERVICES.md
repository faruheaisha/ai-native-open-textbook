---
title: "🛠️ WORKER SERVICES"
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
pageSha256: "c97b3763cf025aa4f5c8fd531ef4b6b1ece88d0f33b23487b9532b51e4c19d5b"
contentMode: "local-full"
zh: ""
---

# 🛠️ WORKER SERVICES

## Rate Limiting Service

**Location:** `/worker/services/rate-limit/`

**Purpose:** Prevent API abuse with bucketed sliding window rate limiting

### **Architecture**

**Storage Options:**
1. **Durable Objects** (Primary) - `rateLimitDO.ts`
   - Bucketed sliding window algorithm
   - Better consistency than KV
   - Per-key isolated storage
2. **KV Store** (Fallback) - `rateLimitKV.ts`
   - Global edge cache
   - Eventual consistency

### **Identifier Strategy**

```typescript
// User-based (authenticated)
user:abc123

// Token-based (JWT hash)
token:sha256_hash_16_chars

// IP-based (anonymous)
ip:192.168.1.1
```

### **Rate Limit Types**

**Location:** `/worker/services/rate-limit/config.ts`

1. **API_ENDPOINT** - HTTP endpoint rate limit
2. **LLM_REQUEST** - LLM inference rate limit
3. **AUTH_ATTEMPT** - Login/signup attempts
4. **APP_CREATION** - New app creation
5. **GITHUB_EXPORT** - GitHub push operations

### **Configuration Structure**

```typescript
interface DORateLimitConfig {
  limit: number;        // Max requests per period
  period: number;       // Time window in seconds
  burst?: number;       // Burst allowance
  burstWindow?: number; // Burst time window
  bucketSize: number;   // Bucket size for sliding window
  dailyLimit?: number;  // Optional daily cap
}
```

### **Usage**

```typescript
// In API route
const allowed = await RateLimitService.enforce(
  env,
  request,
  RateLimitType.API_ENDPOINT,
  user
);

if (!allowed) {
  throw new RateLimitExceededError('Too many requests');
}
```

### **LLM Model-Specific Rates**

Different models have different rate increments:
- GPT-4o: 10 units
- GPT-4o-mini: 1 unit
- Claude Sonnet: 15 units
- Gemini Pro: 20 units
- Gemini Flash: 5 units

**Why?** Expensive models consume more quota to prevent abuse.

---

## GitHub Service

**Location:** `/worker/services/github/GitHubService.ts`

**Purpose:** Export generated apps to GitHub repositories

### **Key Operations**

**1. Create Repository**
```typescript
static async createUserRepository(options: {
  token: string;           // User's GitHub PAT
  name: string;            // Repo name
  description?: string;
  private: boolean;        // Public or private
  auto_init?: boolean;     // Create with README
})
```

**2. Push Generated Code**
```typescript
static async pushCodeToRepository({
  token,
  owner,
  repo,
  gitObjects,           // Agent's git objects
  templateDetails,      // Template base
  appQuery,            // Original user prompt
  branch = 'main'
})
```

**Process:**
1. Build git repo with `GitCloneService` (rebases on template)
2. Push all commits to GitHub via Octokit
3. Add README with app description + Cloudflare deploy button
4. Return repository URL

**3. Add Deploy to Cloudflare Button**
```typescript
static async addCloudflareDeployButton({
  token,
  owner,
  repo,
  templateName
})
```

Appends markdown button to README for one-click Cloudflare deployment.

---

## OAuth Service

**Location:** `/worker/services/oauth/`

**Providers:** Google, GitHub

### **Base Pattern** (`base.ts`)

All providers extend `BaseOAuthProvider`:

```typescript
abstract class BaseOAuthProvider {
  abstract getAuthorizationUrl(params): string;
  abstract exchangeCodeForToken(code, verifier): Promise<TokenResponse>;
  abstract getUserInfo(token): Promise<UserInfo>;
}
```

### **OAuth Flow**

**Step 1: Generate Auth URL**
```typescript
const provider = OAuthProviderFactory.create('google', env);
const { url, state, codeVerifier } = await provider.getAuthorizationUrl({
  redirectUri: 'https://app.com/auth/callback',
  state: csrfToken,
  scopes: ['openid', 'email', 'profile']
});

// Store state + verifier in oauthStates table
// Redirect user to url
```

**Step 2: Handle Callback**
```typescript
// Verify state (CSRF protection)
const storedState = await db.getOAuthState(state);
if (!storedState || storedState.used) throw new Error('Invalid state');

// Exchange code for token
const tokenData = await provider.exchangeCodeForToken(
  code,
  storedState.codeVerifier
);

// Get user info
const userInfo = await provider.getUserInfo(tokenData.access_token);

// Create or update user
const user = await authService.findOrCreateOAuthUser({
  provider: 'google',
  providerId: userInfo.id,
  email: userInfo.email,
  displayName: userInfo.name
});

// Create session
const session = await sessionService.createSession(user);
```

**Step 3: Cleanup**
```typescript
// Mark state as used
await db.markOAuthStateUsed(state);

// Cleanup expired states (runs periodically)
await db.cleanupExpiredOAuthStates();
```

### **PKCE (Proof Key for Code Exchange)**

**Purpose:** Prevent authorization code interception

**Flow:**
1. Generate random `codeVerifier` (128 chars)
2. Create `codeChallenge` = SHA256(codeVerifier)
3. Send challenge in auth URL
4. Store verifier in oauthStates table
5. Send verifier in token exchange
6. Provider verifies: SHA256(verifier) == challenge

**Google Implementation:**
- Uses `code_challenge_method=S256`
- Requires `openid` scope

**GitHub Implementation:**
- Standard OAuth 2.0 (no PKCE)
- Uses `state` for CSRF only

---

## Analytics Service

**Location:** `/worker/services/analytics/`

**Purpose:** Track app views, stars, user activity

### **Database Service**

**File:** `/worker/database/services/AnalyticsService.ts`

**Key Operations:**

**1. Track View**
```typescript
await analyticsService.trackView(appId, userId, ipAddress);
```
- Creates view record
- Deduplicates by IP (1 view per IP per day)
- Updates app.viewsCount

**2. Star App**
```typescript
const result = await analyticsService.toggleStar(appId, userId);
// result: { starred: true } or { starred: false }
```
- Adds/removes star
- Updates app.starsCount
- Returns new state

**3. Get Activity Stats**
```typescript
const stats = await analyticsService.getUserActivity(userId, days = 30);
// Returns: appsCreated, totalViews, totalStars, recentActivity[]
```

### **Ranking Impact**

Views and stars affect app rankings:
- **Popular**: `(views × 1) + (stars × 3)` DESC
- **Trending**: `(recent_activity × 1000000 + recency_bonus)` DESC

---

## Cache Service

**Location:** `/worker/services/cache/`

**Purpose:** Cache expensive operations

### **Cache Strategies**

**1. Git Packfile Cache**
```typescript
// Cache generated packfiles for git clone
await cacheService.set(
  `git:packfile:${agentId}`,
  packfileBuffer,
  3600 // 1 hour TTL
);
```

**2. Static Analysis Cache**
```typescript
// Cache TypeScript analysis results
await cacheService.set(
  `analysis:${fileHash}`,
  analysisResults,
  300 // 5 min TTL
);
```

**3. Template Cache**
```typescript
// Cache template file trees
await cacheService.set(
  `template:${templateName}`,
  templateFiles,
  86400 // 24 hours
);
```

### **Implementation**

Uses Cloudflare Cache API:
```typescript
const cache = caches.default;
await cache.put(request, response);
const cached = await cache.match(request);
```

---

## CSRF Protection

**Location:** `/worker/services/csrf/`

**Purpose:** Prevent cross-site request forgery

### **Token Generation**

```typescript
// Generate token for OAuth state
const csrfToken = await crypto.subtle.digest(
  'SHA-256',
  crypto.getRandomValues(new Uint8Array(32))
);
```

### **Validation**

```typescript
// In OAuth callback
if (callbackState !== storedState.state) {
  throw new SecurityError('CSRF token mismatch');
}
```

### **Storage**

CSRF tokens stored in `oauthStates` table:
- `state` column = CSRF token
- `expiresAt` = 10 minutes
- `used` flag prevents replay

---

## User Secrets Store (Durable Object)

**Location:** `/worker/services/secrets/`

**Purpose:** Secure, encrypted storage for user API keys and secrets with key rotation support

### **Architecture**

**Storage:** Durable Object with SQLite backend
- One DO instance per user (userId as DO ID)
- XChaCha20-Poly1305 encryption (AEAD)
- Hierarchical key derivation: MEK → UMK → DEK
- Key rotation metadata tracking

**Core Components:**
1. **UserSecretsStore** (`UserSecretsStore.ts`) - Main DO class
2. **KeyDerivation** (`KeyDerivation.ts`) - PBKDF2-based key derivation
3. **EncryptionService** (`EncryptionService.ts`) - XChaCha20-Poly1305 encryption
4. **Types** (`types.ts`) - Type definitions

### **Key Features**

**1. Hierarchical Key Derivation**
```
Master Encryption Key (MEK)
    ↓ PBKDF2 with userId salt
User Master Key (UMK)
    ↓ PBKDF2 with secret-specific salt
Data Encryption Key (DEK) - unique per secret
```

**2. Encryption**
- Algorithm: XChaCha20-Poly1305 (AEAD)
- Unique salt per secret (16 bytes)
- Unique nonce per encryption (24 bytes)
- Authentication tag for integrity verification

**3. Key Rotation**
- Tracks master key fingerprint (SHA-256)
- Detects key changes automatically
- Re-encrypts all secrets with new key
- Maintains rotation statistics

**4. Security Features**
- Access counting (tracks how many times secret accessed)
- Secret expiration timestamps
- Soft deletion (90-day retention)
- Key preview masking (shows first/last 4 chars)

### **Database Schema**

**Tables:**
```sql
-- Main secrets table
CREATE TABLE secrets (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    secret_type TEXT NOT NULL,
    encrypted_value BLOB NOT NULL,
    nonce BLOB NOT NULL,
    salt BLOB NOT NULL,
    key_preview TEXT NOT NULL,
    metadata TEXT,
    access_count INTEGER DEFAULT 0,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    expires_at INTEGER,
    is_active INTEGER DEFAULT 1,
    key_fingerprint TEXT NOT NULL
);

-- Key rotation tracking
CREATE TABLE key_rotation_metadata (
    id INTEGER PRIMARY KEY DEFAULT 1,
    current_key_fingerprint TEXT NOT NULL,
    last_rotation_at INTEGER NOT NULL,
    rotation_count INTEGER DEFAULT 0
);
```

### **API Methods (RPC - No Exceptions)**

**Critical:** All DO RPC methods return `null` or `boolean` on error, never throw exceptions.

```typescript
// Store new secret
async storeSecret(request: StoreSecretRequest): Promise<SecretMetadata | null>

// Get decrypted value
async getSecretValue(secretId: string): Promise<SecretWithValue | null>

// List secrets (metadata only)
async listSecrets(): Promise<SecretMetadata[]>

// Update secret
async updateSecret(secretId: string, updates: UpdateSecretRequest): Promise<SecretMetadata | null>

// Delete secret (soft delete)
async deleteSecret(secretId: string): Promise<boolean>

// Get key rotation info
async getKeyRotationInfo(): Promise<KeyRotationInfo>
```

### **Type Definitions**

```typescript
interface StoreSecretRequest {
    name: string;
    secretType: 'api_key' | 'oauth_token' | 'webhook_secret' | 'encryption_key' | 'other';
    value: string;
    metadata?: Record<string, unknown>;
    expiresAt?: number;
}

interface SecretMetadata {
    id: string;
    userId: string;
    name: string;
    secretType: string;
    keyPreview: string;
    metadata?: Record<string, unknown>;
    accessCount: number;
    createdAt: number;
    updatedAt: number;
    expiresAt?: number;
}

interface SecretWithValue {
    value: string;
    metadata: SecretMetadata;
}

interface KeyRotationInfo {
    currentKeyFingerprint: string;
    lastRotationAt: number;
    rotationCount: number;
    totalSecrets: number;
    secretsRotated: number;
}
```

### **Usage Example**

```typescript
// Get DO stub
const id = env.UserSecretsStore.idFromName(user.id);
const store = env.UserSecretsStore.get(id);

// Store secret
const metadata = await store.storeSecret({
    name: 'OpenAI API Key',
    secretType: 'api_key',
    value: 'sk-...',
    metadata: { provider: 'openai' }
});

if (!metadata) {
    throw new Error('Failed to store secret');
}

// Retrieve decrypted value
const secret = await store.getSecretValue(metadata.id);

if (!secret) {
    throw new Error('Secret not found or expired');
}

console.log(secret.value); // Decrypted value
console.log(secret.metadata.accessCount); // Incremented on each access

// List all secrets (no values)
const secrets = await store.listSecrets();

// Update secret
const updated = await store.updateSecret(metadata.id, {
    name: 'OpenAI API Key (Production)',
    expiresAt: Date.now() + 86400000 // 24 hours
});

// Delete secret
const deleted = await store.deleteSecret(metadata.id);
```

### **Controller Integration**

**Location:** `/worker/api/controllers/user-secrets/controller.ts`

```typescript
// Example: Get secret value
static async getSecretValue(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
    context: RouteContext
): Promise<ControllerResponse<ApiResponse<UserSecretValueData>>> {
    const user = context.user!;
    const secretId = context.pathParams.secretId;
    
    const stub = this.getUserSecretsStub(env, user.id);
    const result = await stub.getSecretValue(secretId);
    
    if (!result) {
        return UserSecretsController.createErrorResponse(
            'Secret not found or has expired',
            404
        );
    }
    
    return UserSecretsController.createSuccessResponse(result);
}
```

### **Key Rotation Process**

**Automatic Detection:**
1. On DO initialization, checks current master key fingerprint
2. Compares with stored fingerprint in database
3. If different, triggers key rotation

**Re-encryption:**
```typescript
async performKeyRotation() {
    // 1. Fetch all active secrets
    const secrets = this.ctx.storage.sql.exec(`
        SELECT * FROM secrets WHERE is_active = 1
    `);
    
    // 2. Decrypt with old key, encrypt with new key
    for (const secret of secrets) {
        const decrypted = await this.decrypt(secret.encrypted_value, ...);
        const encrypted = await this.encrypt(decrypted);
        // 3. Update in database atomically
    }
    
    // 4. Update rotation metadata
}
```

### **Security Considerations**

**✅ Good Practices:**
- Master key stored in Worker environment variable
- Unique salt per secret
- AEAD encryption with integrity verification
- Key rotation support
- Soft deletion for recovery
- Access tracking for audit

**⚠️ Important Notes:**
- DO RPC methods return `null`/`boolean` instead of throwing exceptions
- Master key must be 64 hex characters (32 bytes)
- Expired secrets automatically filtered from results
- Soft deleted secrets retained for 90 days

### **Testing**

**Location:** `/test/worker/services/secrets/`

Comprehensive test suite with **90+ tests** (3 test files):
- **KeyDerivation.test.ts** - 17 unit tests for key derivation
- **EncryptionService.test.ts** - 18 unit tests for encryption/decryption
- **UserSecretsStore.test.ts** - 55+ E2E tests for full DO lifecycle

**Run tests:**
```bash
npm test test/worker/services/secrets
# Or with Bun:
bun run test:bun test/worker/services/secrets
```

**Test Coverage:**
- CRUD operations
- Encryption/decryption
- Key rotation
- Expiration handling
- Concurrency (10 parallel operations)
- Large scale (20+ secrets, 5KB values)
- Data integrity verification
- Error handling

### **Configuration**

**Wrangler Configuration:**
```jsonc
{
  "durable_objects": {
    "bindings": [
      {
        "name": "UserSecretsStore",
        "class_name": "UserSecretsStore"
      }
    ]
  },
  "migrations": [
    {
      "tag": "v3",
      "new_sqlite_classes": ["UserSecretsStore"]
    }
  ]
}
```
