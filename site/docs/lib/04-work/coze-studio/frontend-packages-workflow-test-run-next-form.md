---
title: "@coze-workflow/test-run-form"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/workflow/test-run-next/form/README.md"
sourceRel: "frontend/packages/workflow/test-run-next/form/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/workflow/test-run-next/form/README.md"
sourceSha256: "feb6fce481b65d94fcb3a96d6a4cbd3a515ee878eba056d2c525ee1665f9ce2d"
pageSha256: "feb6fce481b65d94fcb3a96d6a4cbd3a515ee878eba056d2c525ee1665f9ce2d"
contentMode: "local-full"
zh: ""
---

# @coze-workflow/test-run-form

Workflow TestRun Form

## Overview

This package is part of the Coze Studio monorepo and provides workflow functionality. It includes component, store.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-workflow/test-run-form": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-workflow/test-run-form';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Component
- Store

## API Reference

### Exports

- `createSchemaField,
  useFormSchema,
  useForm,
  useCurrentFieldState,
  FormSchema,
  type FormModel,
  type IFormSchema,`
- `TestRunForm`
- `InputJson as FormBaseInputJson,
  GroupCollapse as FormBaseGroupCollapse,
  FieldItem as FormBaseFieldItem,`
- `TestRunFormProvider,
  useTestRunFormStore,
  type TestRunFormState,`
- `generateField,
  generateFieldValidator,
  isFormSchemaPropertyEmpty,
  stringifyFormValuesFromBacked,`
- `TestFormFieldName`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
