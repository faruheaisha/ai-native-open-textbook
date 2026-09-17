---
title: "Data Access & Input Validation"
sourceId: "07-coding/vibe-security-skill"
sourceTitle: "Vibe Security（AI 编码安全技能）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/raroque/vibe-security-skill"
entryUrl: "https://github.com/raroque/vibe-security-skill/blob/850938f20f6915e7c3688d85c0a838f7909c87bb/vibe-security/references/data-access.md"
sourceRel: "vibe-security/references/data-access.md"
rawUrl: "/raw/07-coding/vibe-security-skill/vibe-security/references/data-access.md"
sourceSha256: "e69c2721958d9a82b362910da8fac151ecb7bfd37f987d1d997db36d99cefe7e"
pageSha256: "e69c2721958d9a82b362910da8fac151ecb7bfd37f987d1d997db36d99cefe7e"
contentMode: "local-full"
zh: ""
---

# Data Access & Input Validation

## SQL Injection

Always use parameterized queries or ORM methods. Never concatenate user input into SQL strings:

```typescript
// BAD: SQL injection via string concatenation
const result = await db.query(`SELECT * FROM users WHERE id = '${userId}'`);

// GOOD: parameterized query
const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
```

## ORM Safety (Prisma)

Even with an ORM, injection is possible:

- **Validate input types with Zod before passing to Prisma.** `findFirst` and similar methods are vulnerable to operator injection if unvalidated objects are passed as filter values. An attacker can send `\{ "email": \{ "contains": "" \} \}` to match all records.

```typescript
// BAD: raw request body passed directly to Prisma
const user = await prisma.user.findFirst({ where: req.body });

// GOOD: validate with Zod first
const schema = z.object({ email: z.string().email() });
const parsed = schema.parse(req.body);
const user = await prisma.user.findFirst({ where: { email: parsed.email } });
```

- **Never use `$queryRawUnsafe` or `$executeRawUnsafe` with user-supplied input.** These bypass Prisma's parameterization entirely.

```typescript
// BAD: raw SQL with user input
const results = await prisma.$queryRawUnsafe(
  `SELECT * FROM users WHERE name = '${name}'`
);

// GOOD: use the safe raw query with parameters
const results = await prisma.$queryRaw`
  SELECT * FROM users WHERE name = ${name}
`;
```

## Input Validation

Validate all external input at system boundaries using a runtime schema validator (Zod, Yup, Joi, etc.):

- API route handlers
- Server Actions
- Webhook handlers
- Form submissions
- URL parameters and query strings

Don't rely on TypeScript types alone — they're compile-time only and don't exist at runtime. An attacker sending a malformed request bypasses all TypeScript checks.

```typescript
// TypeScript type provides NO runtime protection
type CreateUserInput = { name: string; email: string };

// Zod schema provides ACTUAL runtime validation
const CreateUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
});
```

## Mass Assignment

Don't spread request bodies directly into database operations. An attacker can add unexpected fields:

```typescript
// BAD: attacker can add { isAdmin: true, credits: 99999 }
await db.users.update({ where: { id }, data: req.body });

// GOOD: pick only allowed fields
const { name, email } = validated.data;
await db.users.update({ where: { id }, data: { name, email } });
```
