---
title: "@coze-arch/bot-utils"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/arch/bot-utils/README.md"
sourceRel: "frontend/packages/arch/bot-utils/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/arch/bot-utils/README.md"
sourceSha256: "909f278ae47a9d7adc592f13c1be2389c50034e8147032abfebf55e7e031c7c9"
pageSha256: "909f278ae47a9d7adc592f13c1be2389c50034e8147032abfebf55e7e031c7c9"
contentMode: "local-full"
zh: ""
---

# @coze-arch/bot-utils

common utils extracts from apps/bot

## Overview

This package is part of the Coze Studio monorepo and provides utilities functionality. It includes modal, api.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-arch/bot-utils": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-arch/bot-utils';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Modal
- Api

## API Reference

### Exports

- `arrayBufferToObject`
- `isMobile`
- `safeJSONParse, typeSafeJSONParse`
- `type BytedUploader, upLoadFile`
- `messageReportEvent, type MessageReportEvent`
- `ArrayUtil`
- `skillKeyToApiStatusKeyTransformer`
- `loadImage`
- `renderHtmlTitle`
- `getParamsFromQuery, appendUrlParam, openUrl`

*And more...*

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
