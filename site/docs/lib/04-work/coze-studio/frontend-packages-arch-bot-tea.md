---
title: "@coze-arch/bot-tea"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/arch/bot-tea/README.md"
sourceRel: "frontend/packages/arch/bot-tea/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/arch/bot-tea/README.md"
sourceSha256: "0e5c067b23548344d1c40becb8be0cd8bf12ca9d9b38b44f7128d110e36b8e89"
pageSha256: "0e5c067b23548344d1c40becb8be0cd8bf12ca9d9b38b44f7128d110e36b8e89"
contentMode: "local-full"
zh: ""
---

# @coze-arch/bot-tea

bot tea wrapper

## Overview

This package is part of the Coze Studio monorepo and provides architecture functionality. It includes store, plugin, logger.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-arch/bot-tea": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-arch/bot-tea';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Store
- Plugin
- Logger

## API Reference

### Exports

- `EVENT_NAMES,
  AddWorkflowToStoreEntry,
  ExploreBotCardCommonParams,
  ShareRecallPageFrom,
  PluginMockSetCommonParams,
  SideNavClickCommonParams,
  AddPluginToStoreEntry,
  AddBotToStoreEntry,
  PublishAction,
  BotDetailPageAction,
  PluginPrivacyAction,
  PluginMockDataGenerateMode,
  ParamsTypeDefine,
  BotShareConversationClick,
  FlowStoreType,
  FlowResourceFrom,
  FlowDuplicateType,
  /**  product event types */
  ProductEventSource,
  ProductEventFilterTag,
  ProductEventEntityType,
  ProductShowFrontParams,
  DocClickCommonParams,`
- `const LANDING_PAGE_URL_KEY = 'coze_landing_page_url';`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
