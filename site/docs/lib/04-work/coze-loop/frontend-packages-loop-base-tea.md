---
title: "@cozeloop/tea-adapter"
sourceId: "04-work/coze-loop"
sourceTitle: "Coze Loop 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-loop"
entryUrl: "https://github.com/coze-dev/coze-loop/blob/5f1e4c234fc110c1bf674e882a6fd02109e1e1e6/frontend/packages/loop-base/tea/README.md"
sourceRel: "frontend/packages/loop-base/tea/README.md"
rawUrl: "/raw/04-work/coze-loop/frontend/packages/loop-base/tea/README.md"
sourceSha256: "0914608eca2407221ccae22e692a1237a5d9d889750e831f1feb002bdda798e7"
pageSha256: "0914608eca2407221ccae22e692a1237a5d9d889750e831f1feb002bdda798e7"
contentMode: "local-full"
zh: ""
---

# @cozeloop/tea-adapter

A community features package for the Coze Loop ecosystem

## Overview

This package is part of the Coze Loop monorepo and provides community features functionality. It serves as a core component in the Coze Loop ecosystem.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@cozeloop/tea-adapter": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@cozeloop/tea-adapter';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Core functionality for Coze Loop
- TypeScript support
- Modern ES modules

## API Reference

### Exports

- `start, init, config, stop, sendEvent, isStarted`
- `type ParamsTypeDefine = Record<string, Record<string, string>>;`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
