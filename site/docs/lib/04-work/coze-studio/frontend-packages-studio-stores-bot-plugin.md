---
title: "@coze-studio/bot-plugin-store"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/studio/stores/bot-plugin/README.md"
sourceRel: "frontend/packages/studio/stores/bot-plugin/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/studio/stores/bot-plugin/README.md"
sourceSha256: "fbc844c6c901026a1fe2e6459c2d7876e8c447191c433500177addeab1d96bbb"
pageSha256: "fbc844c6c901026a1fe2e6459c2d7876e8c447191c433500177addeab1d96bbb"
contentMode: "local-full"
zh: ""
---

# @coze-studio/bot-plugin-store

plugin store

## Overview

This package is part of the Coze Studio monorepo and provides state management functionality. It includes hook, store, plugin and more.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-studio/bot-plugin-store": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-studio/bot-plugin-store';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Hook
- Store
- Plugin
- Api

## API Reference

### Exports

- `BotPluginStoreProvider,
  usePluginStore,
  usePluginCallbacks,
  usePluginNavigate,
  useMemorizedPluginStoreSet,
  usePluginStoreInstance,
  usePluginHistoryController,
  usePluginHistoryControllerRegistry,`
- `ROLE_TAG_TEXT_MAP`
- `useUnmountUnlock`
- `checkOutPluginContext, unlockOutPluginContext`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- React
- Vitest for testing
- ESLint for code quality
