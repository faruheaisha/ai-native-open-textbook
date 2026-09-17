---
title: "@coze-arch/bot-flags"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/arch/bot-flags/README.md"
sourceRel: "frontend/packages/arch/bot-flags/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/arch/bot-flags/README.md"
sourceSha256: "c5e11d6f214145016a089ec06dfc48bd804bfb1d3f1cdb9b906b01f634774fd9"
pageSha256: "c5e11d6f214145016a089ec06dfc48bd804bfb1d3f1cdb9b906b01f634774fd9"
contentMode: "local-full"
zh: ""
---

# @coze-arch/bot-flags

feature gating for bot studio

## Overview

This package is part of the Coze Studio monorepo and provides architecture functionality. It serves as a core component in the Coze ecosystem.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-arch/bot-flags": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-arch/bot-flags';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Core functionality for Coze Studio
- TypeScript support
- Modern ES modules

## API Reference

### Exports

- `type FEATURE_FLAGS, type FetchFeatureGatingFunction`
- `getFlags`
- `useFlags`
- `pullFeatureFlags`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
