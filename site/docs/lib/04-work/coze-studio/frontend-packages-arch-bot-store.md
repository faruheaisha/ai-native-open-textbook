---
title: "@coze-arch/bot-studio-store"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/arch/bot-store/README.md"
sourceRel: "frontend/packages/arch/bot-store/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/arch/bot-store/README.md"
sourceSha256: "439dff3cad9dd7125199d20148cdc927e95db540c80e827ddbe50c13c8ee005d"
pageSha256: "439dff3cad9dd7125199d20148cdc927e95db540c80e827ddbe50c13c8ee005d"
contentMode: "local-full"
zh: ""
---

# @coze-arch/bot-studio-store

bot studio global store

## Overview

This package is part of the Coze Studio monorepo and provides state management functionality. It includes store, sdk.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-arch/bot-studio-store": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-arch/bot-studio-store';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Store
- Sdk

## API Reference

### Exports

- `/** @deprecated 该使用方式已废弃，后续请使用@coze-arch/foundation-sdk导出的方法*/
  useSpaceStore,
  /** @deprecated 该使用方式已废弃，后续请使用@coze-arch/foundation-sdk导出的方法*/
  useSpace,
  /** @deprecated 该使用方式已废弃，后续请使用@coze-arch/foundation-sdk导出的方法*/
  useSpaceList,`
- `useAuthStore`
- `clearStorage`
- `useSpaceGrayStore, TccKey`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
