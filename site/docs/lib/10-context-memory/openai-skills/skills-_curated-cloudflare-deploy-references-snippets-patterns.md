---
title: "Snippets Patterns"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/snippets/patterns.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/snippets/patterns.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/snippets/patterns.md"
sourceSha256: "2b06454df89a837e16ae554769ad055e8de90d2c6bc19a81b4aeee0fc423029d"
pageSha256: "2b06454df89a837e16ae554769ad055e8de90d2c6bc19a81b4aeee0fc423029d"
contentMode: "local-full"
zh: ""
---

# Snippets Patterns

## Security Headers

```javascript
export default {
  async fetch(request) {
    const response = await fetch(request);
    const newResponse = new Response(response.body, response);
    newResponse.headers.set("X-Frame-Options", "DENY");
    newResponse.headers.set("X-Content-Type-Options", "nosniff");
    newResponse.headers.delete("X-Powered-By");
    return newResponse;
  }
}
```

**Rule:** `true` (all requests)

## Geo-Based Routing

```javascript
export default {
  async fetch(request) {
    const country = request.cf.country;
    if (["GB", "DE", "FR"].includes(country)) {
      const url = new URL(request.url);
      url.hostname = url.hostname.replace(".com", ".eu");
      return Response.redirect(url.toString(), 302);
    }
    return fetch(request);
  }
}
```

## A/B Testing

```javascript
export default {
  async fetch(request) {
    const cookies = request.headers.get("Cookie") || "";
    let variant = cookies.match(/ab_test=([AB])/)?.[1] || (Math.random() < 0.5 ? "A" : "B");
    
    const req = new Request(request);
    req.headers.set("X-Variant", variant);
    const response = await fetch(req);
    
    if (!cookies.includes("ab_test=")) {
      const newResponse = new Response(response.body, response);
      newResponse.headers.append("Set-Cookie", `ab_test=${variant}; Path=/; Secure`);
      return newResponse;
    }
    return response;
  }
}
```

## Bot Detection

```javascript
export default {
  async fetch(request) {
    const botScore = request.cf.botManagement?.score;
    if (botScore && botScore < 30) return new Response("Denied", { status: 403 });
    return fetch(request);
  }
}
```

**Requires:** Bot Management plan

## API Auth Header Injection

```javascript
export default {
  async fetch(request) {
    if (new URL(request.url).pathname.startsWith("/api/")) {
      const req = new Request(request);
      req.headers.set("X-Internal-Auth", "secret_token");
      req.headers.delete("Authorization");
      return fetch(req);
    }
    return fetch(request);
  }
}
```

## CORS Headers

```javascript
export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
      });
    }
    const response = await fetch(request);
    const newResponse = new Response(response.body, response);
    newResponse.headers.set("Access-Control-Allow-Origin", "*");
    return newResponse;
  }
}
```

## Maintenance Mode

```javascript
export default {
  async fetch(request) {
    if (request.headers.get("X-Bypass-Token") === "admin") return fetch(request);
    return new Response("<h1>Maintenance</h1>", {
      status: 503,
      headers: { "Content-Type": "text/html", "Retry-After": "3600" }
    });
  }
}
```

## Pattern Selection

| Pattern | Complexity | Use Case |
|---------|-----------|----------|
| Security Headers | Low | All sites |
| Geo-Routing | Low | Regional content |
| A/B Testing | Medium | Experiments |
| Bot Detection | Medium | Requires Bot Management |
| API Auth | Low | Backend protection |
| CORS | Low | API endpoints |
| Maintenance | Low | Deployments |
