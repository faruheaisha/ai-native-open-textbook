---
title: "@coze-devops/testset-manage"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/devops/testset-manage/README.md"
sourceRel: "frontend/packages/devops/testset-manage/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/devops/testset-manage/README.md"
sourceSha256: "ba74898c5356d0ba76b4c72d09e52045e506b193130285393020b9e278b67bae"
pageSha256: "ba74898c5356d0ba76b4c72d09e52045e506b193130285393020b9e278b67bae"
contentMode: "local-full"
zh: ""
---

# @coze-devops/testset-manage

Testset manage for coze

## Overview

This package is part of the Coze Studio monorepo and provides library functionality. It includes component, hook, store.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-devops/testset-manage": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-devops/testset-manage';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Component
- Hook
- Store

## API Reference

### Exports

- `TestsetSideSheet,
  type TestsetSideSheetProps,`
- `TestsetSelect,
  type TestsetSelectProps,`
- `getTestsetNameRules`
- `TestsetManageProvider`
- `useTestsetManageStore, useCheckSchema`
- `FormItemSchemaType,
  type NodeFormItem,
  type NodeFormSchema,
  type TestsetData,
  type TestsetDatabase,`
- `TestsetManageEventName`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript

- ESLint for code quality
