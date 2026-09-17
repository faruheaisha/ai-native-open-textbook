---
title: "@coze-studio/slardar-adapter"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/arch/slardar-adapter/README.md"
sourceRel: "frontend/packages/arch/slardar-adapter/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/arch/slardar-adapter/README.md"
sourceSha256: "6f1d5687976c1b32e469bc4e616a9333964e275a8a5bbbda06313399df219f14"
pageSha256: "6f1d5687976c1b32e469bc4e616a9333964e275a8a5bbbda06313399df219f14"
contentMode: "local-full"
zh: ""
---

# @coze-studio/slardar-adapter

provide report adapter

## Overview

This package is part of the Coze Studio monorepo and provides architecture functionality. It includes plugin.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-studio/slardar-adapter": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-studio/slardar-adapter';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Plugin

## API Reference

### Exports

- `const jsErrorPlugin = () => ();`
- `const customPlugin = () => ();`
- `const createMinimalBrowserClient: () => any = () => slardarInstance;`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
