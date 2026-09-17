---
title: "@coze-workflow/test-run"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/workflow/test-run/README.md"
sourceRel: "frontend/packages/workflow/test-run/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/workflow/test-run/README.md"
sourceSha256: "fb71d838402d2e340c6e57bcd4fff74e772c58ac13cdafa281dd1778fe7ee972"
pageSha256: "fb71d838402d2e340c6e57bcd4fff74e772c58ac13cdafa281dd1778fe7ee972"
contentMode: "local-full"
zh: ""
---

# @coze-workflow/test-run

workflow test run

## Overview

This package is part of the Coze Studio monorepo and provides workflow functionality. It includes component, hook, adapter and more.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-workflow/test-run": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-workflow/test-run';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Component
- Hook
- Adapter
- Store
- Service
- Plugin
- Api

## API Reference

### Exports

- `FormPanelLayout,
  BaseTestButton,
  TraceIconButton,
  LogDetail,
  Collapse,
  ResizablePanel,
  TestsetManageProvider,
  TestsetSelect,
  TestsetEditPanel,
  InputFormEmpty,
  FileIcon,
  FileItemStatus,
  isImageFile,
  type TestsetSelectProps,
  type TestsetSelectAPI,
  useTestsetManageStore,`
- `InputNumberV2Adapter,
  InputNumberV2Props,`
- `LazyFormCore`
- `FormItemSchemaType, TESTSET_BOT_NAME, FieldName`
- `Tracker`
- `useDocumentContentChange`
- `QuestionForm`
- `InputForm`
- `//   TraceListPanel,
//   TraceDetailPanel,
//   type CustomTab,
//`
- `ProblemPanel`

*And more...*

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
