---
title: "@coze-studio/tea-interface"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/arch/tea-interface/README.md"
sourceRel: "frontend/packages/arch/tea-interface/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/arch/tea-interface/README.md"
sourceSha256: "61d7bb3496dcc7ac9d400f6b7d24357814cd9b42d93de355b5a37d95d01f0aa2"
pageSha256: "61d7bb3496dcc7ac9d400f6b7d24357814cd9b42d93de355b5a37d95d01f0aa2"
contentMode: "local-full"
zh: ""
---

# @coze-studio/tea-interface

interface that descripts how to use tea

## Overview

This package is part of the Coze Studio monorepo and provides architecture functionality. It includes hook, plugin, api and more.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-studio/tea-interface": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-studio/tea-interface';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Hook
- Plugin
- Api
- Sdk

## API Reference

### Exports

- `type SdkOption = Omit<IInitParam, 'app_id'>;`
- `type SdkHookListener = (hookInfo?: any) => void;`
- `const Collector: SdkConstructor;`
- `default Sdk;`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
