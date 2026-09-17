---
title: "Authentication & Authorization"
sourceId: "07-coding/vibe-security-skill"
sourceTitle: "Vibe Security（AI 编码安全技能）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/raroque/vibe-security-skill"
entryUrl: "https://github.com/raroque/vibe-security-skill/blob/850938f20f6915e7c3688d85c0a838f7909c87bb/vibe-security/references/authentication.md"
sourceRel: "vibe-security/references/authentication.md"
rawUrl: "/raw/07-coding/vibe-security-skill/vibe-security/references/authentication.md"
sourceSha256: "5f615d7f59f5f387459edb9a805eda42cf47b57e798f76b1fa24775274346049"
pageSha256: "5f615d7f59f5f387459edb9a805eda42cf47b57e798f76b1fa24775274346049"
contentMode: "local-full"
zh: ""
---

# Authentication & Authorization

## JWT Handling

- **Use `jwt.verify()`, never `jwt.decode()` alone.** `decode` reads the payload without checking the signature — an attacker can forge any payload.
- **Explicitly reject `"alg": "none"`.** Some JWT libraries accept unsigned tokens if the algorithm is set to `"none"`. Your verification must reject this.
- **Validate issuer, audience, and expiration** — not just the signature.

```typescript
// BAD: reads token without verifying signature
const payload = jwt.decode(token);

// GOOD: verifies signature, rejects tampered tokens
const payload = jwt.verify(token, secret, {
  algorithms: ['HS256'],
  issuer: 'your-app',
});
```

## Next.js Middleware Is Not Enough

Next.js middleware runs at the edge and is convenient for auth checks, but it is **not a reliable sole auth layer**. CVE-2025-29927 demonstrated that middleware could be completely bypassed via a spoofed `x-middleware-subrequest` header.

Always verify auth again in:
- Server Actions
- Route Handlers (`app/api/`)
- Data access functions / database queries

Middleware should be a convenience layer, not the only wall between an attacker and your data.

## Server Actions Are Public Endpoints

Server Actions compile into public POST endpoints. Anyone can call them with `curl`. AI assistants frequently generate Server Actions that assume they're only called by the UI:

```typescript
// BAD: no auth check, no input validation
'use server';
export async function deleteItem(id: string) {
  await db.items.delete({ where: { id } });
}

// GOOD: validates input, authenticates, and authorizes
'use server';
export async function deleteItem(input: unknown) {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { error: 'Invalid input' };

  const session = await auth();
  if (!session?.user) redirect('/login');

  // Authorize: verify ownership, not just login
  await db.items.deleteMany({
    where: { id: parsed.data.id, userId: session.user.id }
  });
}
```

Every Server Action needs three things at the top:
1. **Input validation** (Zod or similar runtime schema)
2. **Authentication** (verify the user is logged in)
3. **Authorization** (verify the user owns the resource)

## API Route Handlers

Same rules apply to `app/api/` route handlers. Every route handler is a public endpoint. Authenticate and authorize at the top of every handler.

## Data Leakage to Client Components

Never pass entire database objects to Client Components. They may contain sensitive fields (hashed passwords, internal IDs, admin flags). Select only the fields the client needs:

```typescript
// BAD: leaks all fields to the client
const user = await db.users.findUnique({ where: { id } });
return <UserProfile user={user} />;

// GOOD: select only needed fields
const user = await db.users.findUnique({
  where: { id },
  select: { name: true, avatarUrl: true }
});
return <UserProfile user={user} />;
```

Use `import 'server-only'` at the top of data access modules to prevent them from being accidentally imported into Client Components.

## Session & Token Storage

- Store tokens in `HttpOnly + Secure + SameSite=Lax` cookies, **not localStorage**.
- localStorage is accessible to any JavaScript on the page — a single XSS vulnerability exposes all tokens.
- `HttpOnly` cookies are invisible to JavaScript and sent automatically by the browser.
