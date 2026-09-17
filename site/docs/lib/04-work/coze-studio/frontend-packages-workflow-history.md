---
title: "@coze-workflow/history"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/workflow/history/README.md"
sourceRel: "frontend/packages/workflow/history/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/workflow/history/README.md"
sourceSha256: "d947db9a309493de75068fffa7c0961c545766f4413975486330b52dc60407b2"
pageSha256: "d947db9a309493de75068fffa7c0961c545766f4413975486330b52dc60407b2"
contentMode: "local-full"
zh: ""
---

# @coze-workflow/history

A workflow package for the Coze Studio monorepo

## Overview

This package is part of the Coze Studio monorepo and provides workflow functionality. It includes hook, adapter, service and more.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-workflow/history": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-workflow/history';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Hook
- Adapter
- Service
- Editor
- Plugin

## API Reference

### Exports

- `WorkflowHistoryContainerModule`
- `useClearHistory`
- `WorkflowHistoryConfig`
- `createOperationReportPlugin`
- `HistoryService,
  createFreeHistoryPlugin,`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript

- ESLint for code quality
