---
title: "@coze-arch/tea"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/arch/tea/README.md"
sourceRel: "frontend/packages/arch/tea/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/arch/tea/README.md"
sourceSha256: "0eef7e13d72bda257860427f34297b6d4aebeb60ed3133184017fe65f2daf3e2"
pageSha256: "0eef7e13d72bda257860427f34297b6d4aebeb60ed3133184017fe65f2daf3e2"
contentMode: "local-full"
zh: ""
---

# @coze-arch/tea

Tea package for monorepo

## Overview

This package is part of the Coze Studio monorepo and provides architecture functionality. It includes adapter, store, plugin.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-arch/tea": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-arch/tea';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Adapter
- Store
- Plugin

## API Reference

### Exports

- `EVENT_NAMES,
  AddPluginToStoreEntry,
  AddWorkflowToStoreEntry,
  PublishAction,
  AddBotToStoreEntry,
  BotDetailPageAction,
  PluginPrivacyAction,
  PluginMockDataGenerateMode,
  BotShareConversationClick,
  FlowStoreType,
  FlowResourceFrom,
  FlowDuplicateType,`
- `default Tea;`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
