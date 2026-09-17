---
title: "@cozeloop/components"
sourceId: "04-work/coze-loop"
sourceTitle: "Coze Loop 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-loop"
entryUrl: "https://github.com/coze-dev/coze-loop/blob/5f1e4c234fc110c1bf674e882a6fd02109e1e1e6/frontend/packages/loop-base/components/README.md"
sourceRel: "frontend/packages/loop-base/components/README.md"
rawUrl: "/raw/04-work/coze-loop/frontend/packages/loop-base/components/README.md"
sourceSha256: "9b144668cb9a0fc2f222a418b3aa904ede2a3a6eca8eb7e83b8e1fbad2b26582"
pageSha256: "9b144668cb9a0fc2f222a418b3aa904ede2a3a6eca8eb7e83b8e1fbad2b26582"
contentMode: "local-full"
zh: ""
---

# @cozeloop/components

common components for cozeloop

## Overview

This package is part of the Coze Loop monorepo and provides ui component functionality. It serves as a core component in the Coze Loop ecosystem.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@cozeloop/components": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@cozeloop/components';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Core functionality for Coze Loop
- TypeScript support
- Modern ES modules

## API Reference

### Exports

- `ColumnSelector, type ColumnItem`
- `TooltipWhenDisabled`
- `LoopTable`
- `TableWithPagination,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,`
- `PageError,
  PageLoading,
  PageNoAuth,
  PageNoContent,
  PageNotFound,`
- `TableColActions`
- `LoopTabs`
- `LargeTxtRender`
- `InputSlider`
- `handleCopy, sleep`

*And more...*

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- React
- Vitest for testing
- ESLint for code quality
