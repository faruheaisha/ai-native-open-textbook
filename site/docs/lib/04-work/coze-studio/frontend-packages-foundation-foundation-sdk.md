---
title: "@coze-foundation/foundation-sdk"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/foundation/foundation-sdk/README.md"
sourceRel: "frontend/packages/foundation/foundation-sdk/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/foundation/foundation-sdk/README.md"
sourceSha256: "8e01b416d7cac79f8bdda57fd32f90bdcd4485d8bbaf5757b30d465f5269bde7"
pageSha256: "8e01b416d7cac79f8bdda57fd32f90bdcd4485d8bbaf5757b30d465f5269bde7"
contentMode: "local-full"
zh: ""
---

# @coze-foundation/foundation-sdk

基座提供sdk的具体实现package

## Overview

This package is part of the Coze Studio monorepo and provides architecture functionality. It includes sdk.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-foundation/foundation-sdk": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-foundation/foundation-sdk';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Sdk

## API Reference

### Exports

- `logoutOnly, uploadAvatar`
- `getIsSettled,
  getIsLogined,
  getUserInfo,
  getUserAuthInfos,
  useIsSettled,
  useIsLogined,
  useUserInfo,
  useUserAuthInfo,
  useUserLabel,
  subscribeUserAuthInfos,
  refreshUserInfo,
  useLoginStatus,
  getLoginStatus,`
- `BackButton, SideSheetMenu`
- `useSpace`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
