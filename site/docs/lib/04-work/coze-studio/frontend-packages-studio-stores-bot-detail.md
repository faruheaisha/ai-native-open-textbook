---
title: "@coze-studio/bot-detail-store"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/studio/stores/bot-detail/README.md"
sourceRel: "frontend/packages/studio/stores/bot-detail/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/studio/stores/bot-detail/README.md"
sourceSha256: "41e3f1b3dfe527f13935334af05cab55c10344f3ed4eb62df6f071a50e27eb6e"
pageSha256: "41e3f1b3dfe527f13935334af05cab55c10344f3ed4eb62df6f071a50e27eb6e"
contentMode: "local-full"
zh: ""
---

# @coze-studio/bot-detail-store

bot detail store

## Overview

This package is part of the Coze Studio monorepo and provides state management functionality. It includes hook, store, manager and more.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-studio/bot-detail-store": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-studio/bot-detail-store';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Hook
- Store
- Manager
- Modal

## API Reference

### Exports

- `avatarBackgroundWebSocket`
- `useBotDetailIsReadonly`
- `TTSInfo,
  type VariableItem,
  VariableKeyErrType,
  type TableMemoryItem,
  type SuggestQuestionMessage,
  type BotDetailSkill,
  type WorkFlowItemType,
  type DatabaseInfo,
  type DatabaseList,
  type KnowledgeConfig,
  type TagListType,
  type ExtendOnboardingContent,
  TimeCapsuleOptionsEnum,`
- `updateHeaderStatus`
- `initBotDetailStore`
- `useBotDetailStoreSet`
- `autosaveManager,
  personaSaveManager,
  botSkillSaveManager,
  multiAgentSaveManager,
  registerMultiAgentConfig,
  getBotDetailDtoInfo,
  saveConnectorType,
  saveDeleteAgents,
  saveUpdateAgents,
  saveMultiAgentData,
  saveFileboxMode,
  saveTableMemory,
  saveTTSConfig,
  saveTimeCapsule,
  saveDevHooksConfig,
  updateShortcutSort,
  updateBotRequest,`
- `getBotDetailIsReadonly`
- `uniqMemoryList`
- `verifyBracesAndToast`

*And more...*

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
