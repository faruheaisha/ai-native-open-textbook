---
title: "🔐 AUTHENTICATION & AUTHORIZATION SYSTEM"
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
pageSha256: "3ef88f7821545ea265abe34f20da149bdc575beec2fa5eee8d6424cf8e7cc2f1"
contentMode: "local-full"
zh: ""
---

# 🔐 AUTHENTICATION & AUTHORIZATION SYSTEM

## Overview

The auth system implements a **comprehensive JWT-based authentication** with **OAuth 2.0 social login** (Google, GitHub), **session management**, **API keys**, and **security auditing**. All auth operations are centralized through services that interact with D1 database.

**Core Components:**
1. **AuthService** - Main authentication orchestrator
2. **SessionService** - JWT session management with D1 persistence
3. **JWTUtils** - Token creation, verification, signing
4. **OAuth Providers** - Google & GitHub implementations with PKCE
5. **Middleware** - Route protection and token extraction
6. **Security** - Password hashing, rate limiting, audit logs

---

## Auth Architecture Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT REQUEST                           │
│  (Browser / API Client / WebSocket)                         │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────────┐
│            TOKEN EXTRACTION (authUtils.ts)                  │
│  Priority:                                                  │
│  1. Authorization: Bearer <token>  (most secure)            │
│  2. Cookie: accessToken            (browser)                │
│  3. Query: ?token=<token>          (WebSocket)              │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────────┐
│              JWT VERIFICATION (JWTUtils)                    │
│  • Verify signature with JWT_SECRET                         │
│  • Check expiration (exp claim)                             │
│  • Validate payload structure                               │
│  • Extract: userId, email, sessionId                        │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────────┐
│          SESSION VALIDATION (SessionService)                │
│  • Query sessions table in D1                               │
│  • Check: isRevoked = false                                 │
│  • Check: expiresAt > now                                   │
│  • Update lastActivity timestamp                            │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────────┐
│           USER LOOKUP (AuthService)                         │
│  • Query users table with userId                            │
│  • Check: deletedAt IS NULL                                 │
│  • Return AuthUser object                                   │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────────┐
│            REQUEST CONTEXT ENRICHED                         │
│  request.user = { id, email, displayName, ... }             │
│  request.session = { sessionId, expiresAt }                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Database Tables

### **users Table**

Stores user identity, OAuth provider info, preferences, and security settings.

**Key fields:**
- Identity: id, email, username, displayName, avatarUrl
- OAuth: provider (github/google/email), providerId, emailVerified
- Security: passwordHash (email provider only), failedLoginAttempts, lockedUntil
- Preferences: theme, timezone
- Timestamps: createdAt, updatedAt, deletedAt (soft delete)

**Indexed on:** email, provider+providerId (unique), username

### **sessions Table**

Manages JWT sessions with device tracking and revocation support.

**Key fields:**
- Session ID, userId (FK to users)
- Device tracking: deviceInfo, userAgent, ipAddress
- Token hashes: accessTokenHash, refreshTokenHash (SHA-256)
- Revocation: isRevoked, revokedAt, revokedReason
- Expiry: expiresAt (default 3 days), lastActivity

**Configuration:** Max 5 sessions per user, 3 concurrent devices

### **oauthStates Table**

Temporary storage for OAuth flow state tokens (CSRF protection).

**Key fields:**
- state (unique CSRF token), provider (google/github)
- codeVerifier (PKCE), redirectUri
- isUsed (one-time use), expiresAt (10 minutes)

**Security:** Prevents CSRF attacks, implements PKCE flow

### **apiKeys Table**

Stores hashed API keys for programmatic access.

**Key fields:**
- name, keyHash (SHA-256), keyPreview
- scopes (JSON array), isActive
- Usage: lastUsed, requestCount
- Optional: expiresAt

### **authAttempts Table**

Audit log for all authentication attempts.

**Purpose:** Track login/register attempts, detect suspicious activity
**Fields:** identifier (email), attemptType, success, ipAddress, timestamp

### **verificationOtps Table**

Email verification codes. The email-OTP verification flow has been removed (users are auto-verified on registration), so nothing reads or writes this table; the table is retained only to avoid a destructive migration.

**Fields:** email, otp (hashed), used, expiresAt (15 min)

### **auditLogs Table**

Detailed audit trail for security events.

**Fields:** userId, entityType/entityId, action, oldValues/newValues (JSON), ipAddress, userAgent

---

## AuthService - Core Operations

**Location:** `/worker/database/services/AuthService.ts`

Handles all authentication operations (login, register, OAuth) and delegates session management to SessionService.

### **register() Flow**

1. Validate email format and password strength (min 8 chars, mixed case, numbers)
2. Check email doesn't already exist
3. Hash password with bcrypt (12 rounds)
4. Create user with emailVerified=true (no OTP currently)
5. Auto-login: create session + generate JWT
6. Log attempt to authAttempts table
7. Return user + accessToken + sessionId

### **login() Flow**

1. Find user by email (case-insensitive), check not deleted
2. Verify passwordHash exists
3. Compare password with bcrypt.verify()
4. Create session + generate JWT
5. Log attempt (success/fail) with IP + user agent
6. Return user + accessToken + sessionId

**Security:** Failed attempts logged, passwords never logged

### **OAuth Flow**

**Step 1: getOAuthAuthorizationUrl()**
1. Cleanup expired OAuth states
2. Validate redirect URL (same-origin only)
3. Generate CSRF state token + PKCE code verifier
4. Store in oauthStates table (10 min expiry)
5. Build authorization URL with state + code_challenge
6. Return URL to redirect user to provider

**Step 2: handleOAuthCallback()**
1. Verify state token (not used, not expired)
2. Mark state as used
3. Exchange code for tokens using PKCE verifier
4. Fetch user info from provider
5. Find or create user (update OAuth info if exists)
6. Create session + JWT
7. Return user + token + intended redirectUrl

**Security:** CSRF protected, PKCE prevents code interception, one-time state tokens

### **Other Key Methods**

**getUserForAuth(userId):** Fetch user by ID (checks not deleted) - used by middleware

**validateTokenAndGetUser(token):** Complete pipeline: verify JWT signature → check expiration → fetch user → return user + sessionId

---

## JWTUtils - Token Management

**Location:** `/worker/utils/jwtUtils.ts`

Singleton class for JWT operations using `jose` library.

**Token payload contains:** userId (sub), email, sessionId, type (access/refresh), iat/exp timestamps

**Key operations:**
- **createAccessToken()** - Sign JWT with HS256, 3-day expiry
- **verifyToken()** - Verify signature, check expiration, return payload
- **hashToken()** - SHA-256 hash for database storage (security: prevents token leakage from DB breaches)

---

## SessionService - Session Management

**Location:** `/worker/database/services/SessionService.ts`

**Config:** Max 5 sessions/user, 3-day TTL, max 3 concurrent devices

**Key operations:**

1. **createSession()** - Cleanup old sessions (keep 5 most recent) → generate session ID → create JWT → hash token → extract request metadata (IP, user agent, Cloudflare headers) → store in D1

2. **revokeUserSession()** - Mark session as revoked with reason

3. **revokeAllUserSessions()** - Revoke all user sessions (for password change, security breach)

4. **getUserSessions()** - List active sessions (not revoked, not expired)

5. **getUserSecurityStatus()** - Analyze security: count active sessions + recent security events → calculate risk level (high: >5 events/24h or hijacking; medium: >2 events or >3 devices; low: normal)

6. **forceLogoutAllOtherSessions()** - Delete all sessions except current (for suspected compromise)

7. **cleanupExpiredSessions()** - Delete expired sessions (run via cron)

---

## OAuth Providers

**Location:** `/worker/services/oauth/`

Abstract base class provides common OAuth 2.0 flow with PKCE.

**PKCE Flow:**
1. Generate code_verifier (random 32 bytes)
2. Hash to create code_challenge (SHA-256)
3. Send challenge in authorization URL
4. Provider stores challenge
5. Exchange code + verifier for tokens
6. Provider verifies: hash(verifier) === stored_challenge

**Purpose:** Prevents authorization code interception attacks

### **Google OAuth**
- Scopes: openid, email, profile
- Fetches user info from Google API
- Returns: id, email, name, picture, verified_email
- Env vars: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET

### **GitHub OAuth**
- Scopes: read:user, user:email (minimal, no repo access)
- Special handling: Email not always in /user endpoint, fetches from /user/emails if needed
- Returns: id, email (primary verified), name, avatar_url
- Env vars: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET

---

## Authentication Middleware

**Location:** `/worker/middleware/auth/routeAuth.ts`

**Three auth levels:**
1. **public** - No auth required
2. **authenticated** - Requires valid JWT
3. **owner-only** - Requires ownership of resource (e.g., user can only edit their own apps)

**Flow:**
1. Route declares auth level via `setAuthLevel()` middleware
2. `enforceAuthRequirement()` checks:
   - Public: pass through
   - Authenticated/Owner: extract token → validate JWT → fetch user → check ownership if needed
3. User injected into request context: `c.set('user', user)`
4. Route handler executes with authenticated user

**Token extraction priority:** Authorization header (APIs) → Cookie (browser) → Query param (WebSocket)

---

## Security Features

### **Password Security**
- **Hashing:** bcrypt with 12 rounds (~250ms, intentionally slow to prevent brute force)
- **Validation:** Min 8 chars, mixed case, numbers, special chars, not common password, no sequential patterns (12345)
- **Strength scoring:** 0-4 scale

### **Rate Limiting**
- User-configurable limits (default: 100 requests/min)
- Separate limits for auth endpoints
- Tracked per user/IP in Durable Objects or KV

### **CSRF Protection**
- OAuth state tokens: cryptographically random, 10-min expiry, one-time use
- Verified on callback to prevent cross-site request forgery

### **Session Security**
- Tokens hashed (SHA-256) in database
- 3-day expiry by default
- Device + IP tracking
- Max 5 sessions per user, 3 concurrent devices
- Force logout feature for security incidents

### **Audit Logging**
- All auth attempts logged to `authAttempts` table
- Includes: IP, user agent, timestamp, success/failure
- Used for security analysis and anomaly detection
