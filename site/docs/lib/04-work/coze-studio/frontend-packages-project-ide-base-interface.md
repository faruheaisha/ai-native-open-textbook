---
title: "@coze-project-ide/base-interface"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/project-ide/base-interface/README.md"
sourceRel: "frontend/packages/project-ide/base-interface/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/project-ide/base-interface/README.md"
sourceSha256: "9eb25ad01cd9d70d9159075702b59e9f125b9aeb73b90d6562ffd528471b6d41"
pageSha256: "9eb25ad01cd9d70d9159075702b59e9f125b9aeb73b90d6562ffd528471b6d41"
contentMode: "local-full"
zh: ""
---

# @coze-project-ide/base-interface

Adapter of coze ProjectIDE

## Overview

This package is part of the Coze Studio monorepo and provides ide features functionality. It includes store.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-project-ide/base-interface": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-project-ide/base-interface';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Store

## API Reference

### Exports

- `IDEGlobalProvider,
  useIDEGlobalContext,
  useIDEGlobalStore,`
- `type WsMessageProps`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- React
- Vitest for testing
- ESLint for code quality
