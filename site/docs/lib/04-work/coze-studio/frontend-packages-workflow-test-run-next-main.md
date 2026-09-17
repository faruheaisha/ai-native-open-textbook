---
title: "@coze-workflow/test-run-next"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/workflow/test-run-next/main/README.md"
sourceRel: "frontend/packages/workflow/test-run-next/main/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/workflow/test-run-next/main/README.md"
sourceSha256: "6e49a0cd5fe483e78ace713b6378a36c47f08a3b2b11113db7d6b412458cf396"
pageSha256: "6e49a0cd5fe483e78ace713b6378a36c47f08a3b2b11113db7d6b412458cf396"
contentMode: "local-full"
zh: ""
---

# @coze-workflow/test-run-next

Workflow TestRun 入口包

## Overview

This package is part of the Coze Studio monorepo and provides workflow functionality. It includes component, hook, store.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-workflow/test-run-next": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-workflow/test-run-next';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Component
- Hook
- Store

## API Reference

### Exports

- `/** components */
  TestRunForm,
  FormBaseFieldItem,
  FormBaseInputJson,
  FormBaseGroupCollapse,
  TestRunFormProvider,
  /** hooks */
  useForm,
  useTestRunFormStore,
  useFormSchema,
  useCurrentFieldState,
  /** functions */
  createSchemaField,
  generateField,
  generateFieldValidator,
  isFormSchemaPropertyEmpty,
  stringifyFormValuesFromBacked,
  FormSchema,
  /** constants */
  TestFormFieldName,
  /** types */
  type FormModel,
  type TestRunFormState,
  type IFormSchema,`
- `safeJsonParse`
- `TraceListPanel,
  TraceDetailPanel,`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
