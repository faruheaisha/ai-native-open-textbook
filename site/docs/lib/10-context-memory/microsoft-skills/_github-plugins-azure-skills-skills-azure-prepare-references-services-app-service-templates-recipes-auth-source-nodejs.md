---
title: "Auth Recipe — Node.js (Express) — REFERENCE ONLY"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/auth/source/nodejs.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/auth/source/nodejs.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/auth/source/nodejs.md"
sourceSha256: "fdce7b5e7367925474db775b7b6fa9d0549b552ceb870e76c23ad77ff31bf769"
pageSha256: "fdce7b5e7367925474db775b7b6fa9d0549b552ceb870e76c23ad77ff31bf769"
contentMode: "local-full"
zh: ""
---

# Auth Recipe — Node.js (Express) — REFERENCE ONLY

## JWT Validation with jsonwebtoken + jwks-rsa

### npm Packages

```bash
npm install jsonwebtoken jwks-rsa
```

### Auth Middleware

Add `middleware/auth.js`:

```javascript
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const client = jwksClient({
  jwksUri: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/discovery/v2.0/keys`,
  cache: true,
  rateLimit: true,
});
