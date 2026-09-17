---
title: "@cozeloop/toolkit"
sourceId: "04-work/coze-loop"
sourceTitle: "Coze Loop 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-loop"
entryUrl: "https://github.com/coze-dev/coze-loop/blob/5f1e4c234fc110c1bf674e882a6fd02109e1e1e6/frontend/packages/loop-base/toolkit/README.md"
sourceRel: "frontend/packages/loop-base/toolkit/README.md"
rawUrl: "/raw/04-work/coze-loop/frontend/packages/loop-base/toolkit/README.md"
sourceSha256: "a8a005f298714ab0f1aac24fe9d9dd9a45f7ec7876dfa0376c7e985573ad34ed"
pageSha256: "a8a005f298714ab0f1aac24fe9d9dd9a45f7ec7876dfa0376c7e985573ad34ed"
contentMode: "local-full"
zh: ""
---

# @cozeloop/toolkit

Toolkit For Devops

## Overview

This package is part of the Coze Loop monorepo and provides utilities functionality. It serves as a core component in the Coze Loop ecosystem.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@cozeloop/toolkit": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@cozeloop/toolkit';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Core functionality for Coze Loop
- TypeScript support
- Modern ES modules

## API Reference

### Exports

- `notEmpty`
- `getSafeFileName`
- `formatTimestampToString,
  safeParseJson,
  formateMsToSeconds,`
- `CozeLoopStorage`
- `type LocalStorageKeys`
- `formatNumberWithCommas,
  formatNumberInThousands,
  formatNumberInMillions,`
- `safeJsonParse`
- `fileDownload`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
