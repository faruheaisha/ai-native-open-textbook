---
title: "@coze-arch/pkg-root-webpack-plugin"
sourceId: "04-work/coze-loop"
sourceTitle: "Coze Loop 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-loop"
entryUrl: "https://github.com/coze-dev/coze-loop/blob/5f1e4c234fc110c1bf674e882a6fd02109e1e1e6/frontend/infra/plugins/pkg-root-webpack-plugin/README.md"
sourceRel: "frontend/infra/plugins/pkg-root-webpack-plugin/README.md"
rawUrl: "/raw/04-work/coze-loop/frontend/infra/plugins/pkg-root-webpack-plugin/README.md"
sourceSha256: "417ee08a64e6ca7db5768c36e2856908bd0b77997e7a01f11d2da1eab605437a"
pageSha256: "417ee08a64e6ca7db5768c36e2856908bd0b77997e7a01f11d2da1eab605437a"
contentMode: "local-full"
zh: ""
---

# @coze-arch/pkg-root-webpack-plugin

> 用于支持 `@` 根目录引用的插件

## Overview

This package is part of the Coze Studio monorepo and provides architecture functionality. It includes hook, plugin.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-arch/pkg-root-webpack-plugin": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-arch/pkg-root-webpack-plugin';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Hook
- Plugin

## API Reference

### Exports

- `default PkgRootWebpackPlugin;`
- `PkgRootWebpackPlugin ;`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
