---
title: "@coze-workflow/test-run-shared"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/workflow/test-run-next/shared/README.md"
sourceRel: "frontend/packages/workflow/test-run-next/shared/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/workflow/test-run-next/shared/README.md"
sourceSha256: "572a6833270b1c9b9c0bfe73e268fc9a67190863c5f426768a2fc37e58e5ed70"
pageSha256: "572a6833270b1c9b9c0bfe73e268fc9a67190863c5f426768a2fc37e58e5ed70"
contentMode: "local-full"
zh: ""
---

# @coze-workflow/test-run-shared

Workflow TestRun 公共包

## Overview

This package is part of the Coze Studio monorepo and provides workflow functionality. It includes component, editor.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-workflow/test-run-shared": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-workflow/test-run-shared';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Component
- Editor

## API Reference

### Exports

- `JsonEditor`
- `safeFormatJsonString, safeJsonParse, gotoDebugFlow`
- `BottomPanel`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
