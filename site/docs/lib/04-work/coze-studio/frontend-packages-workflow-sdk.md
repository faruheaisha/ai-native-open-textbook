---
title: "@coze-workflow/sdk"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/workflow/sdk/README.md"
sourceRel: "frontend/packages/workflow/sdk/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/workflow/sdk/README.md"
sourceSha256: "d50bde7328105d52324becab62fc29ec76bb38b8191e7f096f01bf296638a9d2"
pageSha256: "d50bde7328105d52324becab62fc29ec76bb38b8191e7f096f01bf296638a9d2"
contentMode: "local-full"
zh: ""
---

# @coze-workflow/sdk

workflow对外sdk

## Overview

This package is part of the Coze Studio monorepo and provides architecture functionality. It includes component, editor.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-workflow/sdk": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-workflow/sdk';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Component
- Editor

## API Reference

### Exports

- `schemaExtractor, nodeResultExtractor`
- `ExpressionEditorEvent,
  ExpressionEditorToken,
  ExpressionEditorSegmentType,
  ExpressionEditorSignal,
  ExpressionEditorLeaf,
  ExpressionEditorSuggestion,
  ExpressionEditorCounter,
  ExpressionEditorRender,
  ExpressionEditorModel,
  ExpressionEditorParser,
  ExpressionEditorTreeHelper,
  ExpressionEditorValidator,
  useListeners,
  useSelectNode,
  useKeyboardSelect,
  useRenderEffect,
  useSuggestionReducer,`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
