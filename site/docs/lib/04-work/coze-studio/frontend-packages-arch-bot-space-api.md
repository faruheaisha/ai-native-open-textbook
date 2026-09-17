---
title: "@coze-arch/bot-space-api"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/arch/bot-space-api/README.md"
sourceRel: "frontend/packages/arch/bot-space-api/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/arch/bot-space-api/README.md"
sourceSha256: "1ccf33053d095b74652a4ff596742dc188a1b710f66126d7e8353bb83267d6d0"
pageSha256: "1ccf33053d095b74652a4ff596742dc188a1b710f66126d7e8353bb83267d6d0"
contentMode: "local-full"
zh: ""
---

# @coze-arch/bot-space-api

bot space api instance that extracts from apps/bot/src/services/api/space-api.ts

## Overview

This package is part of the Coze Studio monorepo and provides api & networking functionality. It includes store, service, plugin and more.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-arch/bot-space-api": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-arch/bot-space-api';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Store
- Service
- Plugin
- Api
- Validation

## API Reference

### Exports

- `type SpaceRequest<T> = Omit<T, 'space_id'>;`
- `const SpaceApi = spaceApiService;`
- `SpaceApiV2`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
