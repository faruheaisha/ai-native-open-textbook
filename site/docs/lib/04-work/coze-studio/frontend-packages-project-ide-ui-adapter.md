---
title: "@coze-project-ide/ui-adapter"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/project-ide/ui-adapter/README.md"
sourceRel: "frontend/packages/project-ide/ui-adapter/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/project-ide/ui-adapter/README.md"
sourceSha256: "b74943d0a4f484f784c1f5af34b59b5d231448fe979f785a0a08f85ea0f295e9"
pageSha256: "b74943d0a4f484f784c1f5af34b59b5d231448fe979f785a0a08f85ea0f295e9"
contentMode: "local-full"
zh: ""
---

# @coze-project-ide/ui-adapter

Adapter of coze ProjectIDE

## Overview

This package is part of the Coze Studio monorepo and provides ui component functionality. It includes component, hook, store.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-project-ide/ui-adapter": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-project-ide/ui-adapter';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Component
- Hook
- Store

## API Reference

### Exports

- `useCommitVersion`
- `IDEGlobalProvider,
  useIDEGlobalContext,
  useIDEGlobalStore,`
- `ModeTab,
  LeftContentButtons,
  SecondarySidebar,
  UIBuilder,`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- React
- Vitest for testing
- ESLint for code quality
