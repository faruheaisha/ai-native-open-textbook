---
title: "Azure Document Intelligence — TypeScript SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-document-intelligence-ts.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-document-intelligence-ts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-document-intelligence-ts.md"
sourceSha256: "4d0a21b9324676d2fb107d5e84e2d21c744aab0feeb9c879fe57412b0aaec47b"
pageSha256: "4d0a21b9324676d2fb107d5e84e2d21c744aab0feeb9c879fe57412b0aaec47b"
contentMode: "local-full"
zh: ""
---

# Azure Document Intelligence — TypeScript SDK Quick Reference

> Condensed from **azure-ai-document-intelligence-ts**. Full patterns (custom models, classifiers, batch polling)
> in the **azure-ai-document-intelligence-ts** plugin skill if installed.

## Install
```bash
npm install @azure-rest/ai-document-intelligence @azure/identity
```

## Quick Start

> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-ai-references-auth-best-practices) for production patterns.

```typescript
import DocumentIntelligence, { isUnexpected, getLongRunningPoller, AnalyzeOperationOutput } from "@azure-rest/ai-document-intelligence";
const client = DocumentIntelligence(endpoint, new DefaultAzureCredential());
```

## Non-Obvious Patterns
- REST client — `DocumentIntelligence` is a function, not a class
- Analyze path: `client.path("/documentModels/\{modelId\}:analyze", "prebuilt-layout").post(\{...\})`
- Must use `getLongRunningPoller(client, initialResponse)` then `poller.pollUntilDone()`
- Local file: send as `base64Source` in body, not as binary stream
- Pagination: `import \{ paginate \} from "@azure-rest/ai-document-intelligence"`

## Best Practices
1. Use `getLongRunningPoller()` — document analysis is async, always poll
2. Check `isUnexpected()` — type guard for proper error handling
3. Choose the right model — prebuilt when possible, custom for specialized docs
4. Handle confidence scores — set thresholds for your use case
5. Use `paginate()` helper for listing models
6. Prefer neural mode for custom models over template
