---
title: "Browser Authentication Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-identity-ts/references/browser-auth.md"
sourceRel: ".github/plugins/azure-sdk-typescript/skills/azure-identity-ts/references/browser-auth.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-typescript/skills/azure-identity-ts/references/browser-auth.md"
sourceSha256: "ae12c4dfb043b5122cbc0ce7789dfda130b8688f94963dd1a298537de6e9c9a9"
pageSha256: "ae12c4dfb043b5122cbc0ce7789dfda130b8688f94963dd1a298537de6e9c9a9"
contentMode: "local-full"
zh: ""
---

# Browser Authentication Reference

Browser-based authentication for Azure services using the @azure/identity TypeScript SDK.

## Overview

Browser applications require special credential types that handle OAuth redirects and popup windows. This reference covers `InteractiveBrowserCredential`, `BrowserCustomizationOptions`, and SPA authentication patterns.

## Installation

```bash
npm install @azure/identity
```

**Note:** Browser credentials require a bundler (Vite, webpack, etc.) and won't work in Node.js.

## InteractiveBrowserCredential

The primary credential for browser applications.

```typescript
import { InteractiveBrowserCredential } from "@azure/identity";

const credential = new InteractiveBrowserCredential({
