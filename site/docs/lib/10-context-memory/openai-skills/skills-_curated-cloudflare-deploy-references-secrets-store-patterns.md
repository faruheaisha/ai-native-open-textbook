---
title: "Patterns"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/secrets-store/patterns.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/secrets-store/patterns.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/secrets-store/patterns.md"
sourceSha256: "60f60f7ef93d50208629a2e630d24f4758b1b995eab146395fc639844829058a"
pageSha256: "60f60f7ef93d50208629a2e630d24f4758b1b995eab146395fc639844829058a"
contentMode: "local-full"
zh: ""
---

# Patterns

## Secret Rotation

Zero-downtime rotation with versioned naming (`api_key_v1`, `api_key_v2`):

```typescript
interface Env {
  PRIMARY_KEY: { get(): Promise<string> };
  FALLBACK_KEY?: { get(): Promise<string> };
}

async function fetchWithAuth(url: string, key: string) {
  return fetch(url, { headers: { "Authorization": `Bearer ${key}` } });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    let resp = await fetchWithAuth("https://api.example.com", await env.PRIMARY_KEY.get());
    
    // Fallback during rotation
    if (!resp.ok && env.FALLBACK_KEY) {
      resp = await fetchWithAuth("https://api.example.com", await env.FALLBACK_KEY.get());
    }
    
    return resp;
  }
}
```

Workflow: Create `api_key_v2` → add fallback binding → deploy → swap primary → deploy → remove `v1`

## Encryption with KV

```typescript
interface Env {
  CACHE: KVNamespace;
  ENCRYPTION_KEY: { get(): Promise<string> };
}

async function encryptValue(value: string, key: string): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw", enc.encode(key), { name: "AES-GCM" }, false, ["encrypt"]
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv }, keyMaterial, enc.encode(value)
  );
  
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(encrypted), iv.length);
  return btoa(String.fromCharCode(...combined));
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const key = await env.ENCRYPTION_KEY.get();
    const encrypted = await encryptValue("sensitive-data", key);
    await env.CACHE.put("user:123:data", encrypted);
    return Response.json({ ok: true });
  }
}
```

## HMAC Signing

```typescript
interface Env {
  HMAC_SECRET: { get(): Promise<string> };
}

async function signRequest(data: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const secret = await env.HMAC_SECRET.get();
    const payload = await request.text();
    const signature = await signRequest(payload, secret);
    return Response.json({ signature });
  }
}
```

## Audit & Monitoring

```typescript
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const startTime = Date.now();
    try {
      const apiKey = await env.API_KEY.get();
      const resp = await fetch("https://api.example.com", {
        headers: { "Authorization": `Bearer ${apiKey}` }
      });
      
      ctx.waitUntil(
        fetch("https://log.example.com/log", {
          method: "POST",
          body: JSON.stringify({
            event: "secret_used",
            secret_name: "API_KEY",
            timestamp: new Date().toISOString(),
            duration_ms: Date.now() - startTime,
            success: resp.ok
          })
        })
      );
      return resp;
    } catch (error) {
      ctx.waitUntil(
        fetch("https://log.example.com/log", {
          method: "POST",
          body: JSON.stringify({
            event: "secret_access_failed",
            secret_name: "API_KEY",
            error: error instanceof Error ? error.message : "Unknown"
          })
        })
      );
      return new Response("Error", { status: 500 });
    }
  }
}
```

## Migration from Worker Secrets

Change `env.SECRET` (direct) to `await env.SECRET.get()` (async).

Steps:
