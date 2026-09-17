---
title: "@coze-common/auth"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/common/auth/README.md"
sourceRel: "frontend/packages/common/auth/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/common/auth/README.md"
sourceSha256: "1f3d1bf0f8be419baa331911dc414ebab7efd1c9fc144fc0e3d5a0c1a1e8e316"
pageSha256: "1f3d1bf0f8be419baa331911dc414ebab7efd1c9fc144fc0e3d5a0c1a1e8e316"
contentMode: "local-full"
zh: ""
---

# @coze-common/auth

统一的权限控制逻辑

## Overview

This package is part of the Coze Studio monorepo and provides utilities functionality. It includes store.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-common/auth": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-common/auth';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Store

## API Reference

### Exports

- `useDestorySpace`
- `useSpaceAuth`
- `ESpacePermisson, SpaceRoleType`
- `useSpaceRole`
- `useSpaceAuthStore`
- `useProjectAuth`
- `useDestoryProject`
- `EProjectPermission, ProjectRoleType`
- `useProjectRole`
- `useProjectAuthStore`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- React
- Vitest for testing
- ESLint for code quality
