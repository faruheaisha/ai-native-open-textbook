---
title: "@cozeloop/biz-hooks-adapter"
sourceId: "04-work/coze-loop"
sourceTitle: "Coze Loop 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-loop"
entryUrl: "https://github.com/coze-dev/coze-loop/blob/5f1e4c234fc110c1bf674e882a6fd02109e1e1e6/frontend/packages/loop-base/route/README.md"
sourceRel: "frontend/packages/loop-base/route/README.md"
rawUrl: "/raw/04-work/coze-loop/frontend/packages/loop-base/route/README.md"
sourceSha256: "55105cfdd21df0767434c51a220b6d915e064dd203037b57f35fc2f1c4ebca1f"
pageSha256: "55105cfdd21df0767434c51a220b6d915e064dd203037b57f35fc2f1c4ebca1f"
contentMode: "local-full"
zh: ""
---

# @cozeloop/biz-hooks-adapter

Biz hooks for CozeLoop

## Overview

This package is part of the Coze Loop monorepo and provides community features functionality. It serves as a core component in the Coze Loop ecosystem.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@cozeloop/biz-hooks-adapter": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@cozeloop/biz-hooks-adapter';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Core functionality for Coze Loop
- TypeScript support
- Modern ES modules

## API Reference

### Exports

- `useSpace`
- `useUserInfo`
- `useNavigateModule`
- `useOpenWindow`
- `useRouteInfo`
- `useCozeLocation`
- `useBenefit, type BenefitConfig`
- `useFetchUserBenefit`
- `useDemoSpace`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
