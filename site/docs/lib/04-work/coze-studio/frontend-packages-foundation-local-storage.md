---
title: "@coze-foundation/local-storage"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/foundation/local-storage/README.md"
sourceRel: "frontend/packages/foundation/local-storage/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/foundation/local-storage/README.md"
sourceSha256: "3a01836fd5a301f1299ce00415c8bbef6e7b789a700dbcfd3b5b8a300740310c"
pageSha256: "3a01836fd5a301f1299ce00415c8bbef6e7b789a700dbcfd3b5b8a300740310c"
contentMode: "local-full"
zh: ""
---

# @coze-foundation/local-storage

global local storage service

## Overview

This package is part of the Coze Studio monorepo and provides architecture functionality. It includes hook, service.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-foundation/local-storage": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-foundation/local-storage';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Hook
- Service

## API Reference

### Exports

- `localStorageService`
- `useValue as useLocalStorageValue`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
