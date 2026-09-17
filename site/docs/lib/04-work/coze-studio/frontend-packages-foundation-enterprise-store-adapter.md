---
title: "@coze-foundation/enterprise-store-adapter"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/foundation/enterprise-store-adapter/README.md"
sourceRel: "frontend/packages/foundation/enterprise-store-adapter/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/foundation/enterprise-store-adapter/README.md"
sourceSha256: "14a5b2766a96f894acc3ed48df7a168590230a407fd0cc79a52ce47a9fbc366c"
pageSha256: "14a5b2766a96f894acc3ed48df7a168590230a407fd0cc79a52ce47a9fbc366c"
contentMode: "local-full"
zh: ""
---

# @coze-foundation/enterprise-store-adapter

store for enterprise

## Overview

This package is part of the Coze Studio monorepo and provides state management functionality. It includes hook, store.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-foundation/enterprise-store-adapter": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-foundation/enterprise-store-adapter';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Hook
- Store

## API Reference

### Exports

- `PERSONAL_ENTERPRISE_ID`
- `useEnterpriseStore`
- `useEnterpriseList`
- `useCheckEnterpriseExist`
- `useCurrentEnterpriseInfo,
  useCurrentEnterpriseId,
  useIsCurrentPersonalEnterprise,
  useCurrentEnterpriseRoles,
  useIsEnterpriseLevel,
  useIsTeamLevel,
  useIsCurrentEnterpriseInit,
  CurrentEnterpriseInfoProps,`
- `switchEnterprise`
- `isPersonalEnterprise`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
