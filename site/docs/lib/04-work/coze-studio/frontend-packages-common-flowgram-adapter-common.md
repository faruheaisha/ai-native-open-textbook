---
title: "@flowgram-adapter/common"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/common/flowgram-adapter/common/README.md"
sourceRel: "frontend/packages/common/flowgram-adapter/common/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/common/flowgram-adapter/common/README.md"
sourceSha256: "17a9946dd3d399b59fd07e5869427285dd8a32042f04281a7a75559cbd3b3c8e"
pageSha256: "17a9946dd3d399b59fd07e5869427285dd8a32042f04281a7a75559cbd3b3c8e"
contentMode: "local-full"
zh: ""
---

# @flowgram-adapter/common

对 flowgram 的封装

## Overview

This package is part of the Coze Studio monorepo and provides utilities functionality. It includes service, plugin, logger.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@flowgram-adapter/common": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@flowgram-adapter/common';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Service
- Plugin
- Logger

## API Reference

### Exports

- `useObserve, ReactiveState`
- `type IPoint,
  type PaddingSchema,
  type PositionSchema,
  type AsClass,
  type MaybePromise,
  type MaybeArray,
  type SchemaDecoration,
  type CancellationToken,
  type RecursivePartial,
  bindContributions,
  domUtils,
  Rectangle,
  DisposableCollection,
  delay,
  Emitter,
  logger,
  SizeSchema,
  Disposable,
  ContributionProvider,
  bindContributionProvider,
  pick,
  useRefresh,
  Event,
  addEventListener,
  isNumber,
  isObject,
  CancellationTokenSource,
  PromiseDeferred,
  Deferred,
  DecorationStyle,
  isFunction,
  compose,`
- `type HistoryPluginOptions,
  type Operation,
  createHistoryPlugin,
  HistoryService,
  OperationService,`
- `type CommandHandler,
  CommandContainerModule,
  CommandRegistry,
  Command,
  CommandService,
  CommandContribution,
  CommandRegistryFactory,`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
