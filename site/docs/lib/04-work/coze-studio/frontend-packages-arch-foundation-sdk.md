---
title: "@coze-arch/foundation-sdk"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/arch/foundation-sdk/README.md"
sourceRel: "frontend/packages/arch/foundation-sdk/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/arch/foundation-sdk/README.md"
sourceSha256: "8e9e342d14af273a54ea26e9c4b6cd871b39817ec5701fbed0556ad3cb9cfa6a"
pageSha256: "8e9e342d14af273a54ea26e9c4b6cd871b39817ec5701fbed0556ad3cb9cfa6a"
contentMode: "local-full"
zh: ""
---

# @coze-arch/foundation-sdk

SDK for interaction between the foundation and the business.

## Overview

This package is part of the Coze Studio monorepo and provides architecture functionality. It includes api.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-arch/foundation-sdk": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-arch/foundation-sdk';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Api

## API Reference

### Exports

- `type OAuth2RedirectConfig,
  type OAuth2StateType,
  type UserInfo,
  type UserConnectItem,
  type ThemeType,
  type LoginStatus,
  type BackButtonProps,
  type NavBtnProps,`
- `declare function useCurrentTheme(): ThemeType;`
- `declare function logoutOnly(): Promise<void>;`
- `declare function uploadAvatar(file: File): Promise< web_uri: string >;`
- `declare function refreshUserInfo(): Promise<void>;`
- `declare function getLoginStatus(): LoginStatus;`
- `declare function getIsSettled(): boolean;`
- `declare function getIsLogined(): boolean;`
- `declare function getUserInfo(): UserInfo | null;`
- `declare function getUserAuthInfos(): Promise<void>;`

*And more...*

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
