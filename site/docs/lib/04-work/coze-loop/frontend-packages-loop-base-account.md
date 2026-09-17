---
title: "@cozeloop/account"
sourceId: "04-work/coze-loop"
sourceTitle: "Coze Loop 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-loop"
entryUrl: "https://github.com/coze-dev/coze-loop/blob/5f1e4c234fc110c1bf674e882a6fd02109e1e1e6/frontend/packages/loop-base/account/README.md"
sourceRel: "frontend/packages/loop-base/account/README.md"
rawUrl: "/raw/04-work/coze-loop/frontend/packages/loop-base/account/README.md"
sourceSha256: "db7f14fc0e6d328812ba5db230867217d093b87b2902a656cbc6af38353192b8"
pageSha256: "db7f14fc0e6d328812ba5db230867217d093b87b2902a656cbc6af38353192b8"
contentMode: "local-full"
zh: ""
---

# @cozeloop/account

CozeLoop account

## Overview

This package is part of the Coze Loop monorepo and provides authentication functionality. It includes hook, store, service.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@cozeloop/account": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@cozeloop/account';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Hook
- Store
- Service

## API Reference

### Exports

- `useUserStore, setUserInfo`
- `useSpaceStore,
  setSpace,
  PERSONAL_ENTERPRISE_ID,`
- `useLogin`
- `useRegister`
- `useLoginStatus`
- `useLogout`
- `useCheckLogin`
- `userService`
- `authnService`
- `spaceService`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
