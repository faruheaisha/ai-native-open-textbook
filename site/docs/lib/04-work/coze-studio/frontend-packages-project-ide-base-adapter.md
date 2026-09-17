---
title: "@coze-project-ide/base-adapter"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/project-ide/base-adapter/README.md"
sourceRel: "frontend/packages/project-ide/base-adapter/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/project-ide/base-adapter/README.md"
sourceSha256: "144bc1e81fd86cf4c37630c5c8bcd3b29d5b772cee6b50859eaf9a826658c530"
pageSha256: "144bc1e81fd86cf4c37630c5c8bcd3b29d5b772cee6b50859eaf9a826658c530"
contentMode: "local-full"
zh: ""
---

# @coze-project-ide/base-adapter

Adapter of coze ProjectIDE

## Overview

This package is part of the Coze Studio monorepo and provides ide features functionality. It includes hook, store, service.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-project-ide/base-adapter": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-project-ide/base-adapter';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Hook
- Store
- Service

## API Reference

### Exports

- `useCommitVersion`
- `IDEGlobalProvider,
  useIDEGlobalContext,
  useIDEGlobalStore,`
- `OptionsService, WsService`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
