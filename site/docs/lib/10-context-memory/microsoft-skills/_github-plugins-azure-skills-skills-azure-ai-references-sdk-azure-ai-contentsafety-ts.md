---
title: "Azure AI Content Safety — TypeScript SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-contentsafety-ts.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-contentsafety-ts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-contentsafety-ts.md"
sourceSha256: "556cad24ac915c99ad0d19bfcb153a8f9b2ac2750d8c4b78391d29b3d67f27d8"
pageSha256: "556cad24ac915c99ad0d19bfcb153a8f9b2ac2750d8c4b78391d29b3d67f27d8"
contentMode: "local-full"
zh: ""
---

# Azure AI Content Safety — TypeScript SDK Quick Reference

> Condensed from **azure-ai-contentsafety-ts**. Full patterns (blocklist CRUD, image moderation, severity thresholds)
> in the **azure-ai-contentsafety-ts** plugin skill if installed.

## Install
```bash
npm install @azure-rest/ai-content-safety @azure/identity @azure/core-auth
```

## Quick Start
```typescript
import ContentSafetyClient, { isUnexpected } from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";
const client = ContentSafetyClient(endpoint, new AzureKeyCredential(key));
```

## Non-Obvious Patterns
- REST client — `ContentSafetyClient` is a function, not a class
- Text: `client.path("/text:analyze").post(\{ body: \{ text, categories: [...] \} \})`
- Image: `client.path("/image:analyze").post(\{ body: \{ image: \{ content: base64 \} \} \})`
- Blocklist create: `.path("/text/blocklists/\{blocklistName\}", name).patch(\{...\})`
- API key import: `AzureKeyCredential` from `@azure/core-auth` (not `@azure/identity`)

## Best Practices
1. Always use `isUnexpected()` — type guard for error handling
2. Set appropriate thresholds — different categories may need different severity levels
3. Use blocklists for domain-specific terms to supplement AI detection
4. Log moderation decisions — keep audit trail for compliance
5. Handle edge cases — empty text, very long text, unsupported image formats
