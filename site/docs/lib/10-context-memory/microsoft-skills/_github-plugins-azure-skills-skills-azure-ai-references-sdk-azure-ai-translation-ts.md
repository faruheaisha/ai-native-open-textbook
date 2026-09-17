---
title: "Azure Translation — TypeScript SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-translation-ts.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-translation-ts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-translation-ts.md"
sourceSha256: "ba50ad65f29bf3c1707f638a47549627bd236b54538f2f64a6d726f1d245f2d0"
pageSha256: "ba50ad65f29bf3c1707f638a47549627bd236b54538f2f64a6d726f1d245f2d0"
contentMode: "local-full"
zh: ""
---

# Azure Translation — TypeScript SDK Quick Reference

> Condensed from **azure-ai-translation-ts**. Full patterns (document translation, batch SAS, transliterate)
> in the **azure-ai-translation-ts** plugin skill if installed.

## Install
```bash
npm install @azure-rest/ai-translation-text @azure/identity
```

## Quick Start
```typescript
import TextTranslationClient, { TranslatorCredential, isUnexpected } from "@azure-rest/ai-translation-text";
const credential: TranslatorCredential = { key: process.env.TRANSLATOR_SUBSCRIPTION_KEY!, region: process.env.TRANSLATOR_REGION! };
const client = TextTranslationClient(process.env.TRANSLATOR_ENDPOINT!, credential);
```

## Non-Obvious Patterns
- REST client — `TextTranslationClient` is a function, not a class
- Translate via `client.path("/translate").post(\{ body: \{ inputs: [...] \} \})`
- Document translation: separate package `@azure-rest/ai-translation-document`
- Batch docs require SAS URLs for source/target blob containers

## Best Practices
1. Auto-detect source — omit `language` parameter to auto-detect
2. Batch requests — translate multiple texts in one call for efficiency
3. Use SAS tokens — for document translation, use time-limited SAS URLs
4. Handle errors — always check `isUnexpected(response)` before accessing body
5. Regional endpoints — use regional endpoints for lower latency
