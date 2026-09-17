---
title: "@coze-arch/uploader-interface"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/common/uploader-interface/README.md"
sourceRel: "frontend/packages/common/uploader-interface/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/common/uploader-interface/README.md"
sourceSha256: "e4af8e5a81ee54dbfedce960efda24d9e9543e341f2eb4a25814b7b3fcd54a2c"
pageSha256: "e4af8e5a81ee54dbfedce960efda24d9e9543e341f2eb4a25814b7b3fcd54a2c"
contentMode: "local-full"
zh: ""
---

# @coze-arch/uploader-interface

uploader interface

## Overview

This package is part of the Coze Studio monorepo and provides utilities functionality. It includes store, service.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-arch/uploader-interface": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-arch/uploader-interface';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Store
- Service

## API Reference

### Exports

- `type ProgressEventInfo = BaseEventInfo;`
- `type StreamProgressEventInfo = BaseEventInfo;`
- `type ErrorEventInfo = BaseEventInfo;`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
