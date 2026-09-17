---
title: "@coze-workflow/feature-encapsulate"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/workflow/feature-encapsulate/README.md"
sourceRel: "frontend/packages/workflow/feature-encapsulate/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/workflow/feature-encapsulate/README.md"
sourceSha256: "543da97e50d14e958877ad9e390f461821e11a5a8c6d7a0f833198d7af6026ee"
pageSha256: "543da97e50d14e958877ad9e390f461821e11a5a8c6d7a0f833198d7af6026ee"
contentMode: "local-full"
zh: ""
---

# @coze-workflow/feature-encapsulate

封装解封逻辑

## Overview

This package is part of the Coze Studio monorepo and provides workflow functionality. It includes service, plugin.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-workflow/feature-encapsulate": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-workflow/feature-encapsulate';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Service
- Plugin

## API Reference

### Exports

- `createWorkflowEncapsulatePlugin`
- `EncapsulateService`
- `EncapsulatePanel`
- `ENCAPSULATE_SHORTCUTS`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- React
- Vitest for testing
- ESLint for code quality
