---
title: "@coze-common/chat-core"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/common/chat-area/chat-core/README.md"
sourceRel: "frontend/packages/common/chat-area/chat-core/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/common/chat-area/chat-core/README.md"
sourceSha256: "ff82dc34643c9c8da5ea9ab53c98c67391d340caa9711dcef8dcece2486f10e6"
pageSha256: "ff82dc34643c9c8da5ea9ab53c98c67391d340caa9711dcef8dcece2486f10e6"
contentMode: "local-full"
zh: ""
---

# @coze-common/chat-core

bot chat core js

## Overview

This package is part of the Coze Studio monorepo and provides utilities functionality. It includes manager, plugin, api and more.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-common/chat-core": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-common/chat-core';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Manager
- Plugin
- Api
- Sdk

## API Reference

### Exports

- `TokenManager`
- `UploadPluginConstructor,
  UploadEventName,
  UploadResult,
  BaseEventInfo,
  CompleteEventInfo,
  ProgressEventInfo,
  EventPayloadMaps,
  UploadPluginInterface,`
- `type MsgParticipantType,
  type ParticipantInfo,
  GetHistoryMessageResponse,`
- `SdkEventsEnum`
- `default ChatCore;`
- `ChatCore ;`
- `Message,
  ContentType,
  VerboseContent,
  VerboseMsgType,
  AnswerFinishVerboseData,
  FinishReasonType,
  type MessageContent,
  type TextMixItem,
  type TextAndFileMixMessagePropsFilePayload,
  type TextAndFileMixMessagePropsImagePayload,
  type ImageModel,
  type ImageMixItem,
  type FileModel,
  type FileMixItem,
  messageSource,
  type MessageSource,
  type SendMessageOptions,
  type NormalizedMessageProps,
  type NormalizedMessagePropsPayload,
  type MessageMentionListFields,
  type TextAndFileMixMessageProps,
  type TextMessageProps,
  taskType,
  ChatMessageMetaType,
  type ChatMessageMetaInfo,
  type InterruptToolCallsType,`
- `ChatCoreError`
- `MessageFeedbackDetailType,
  MessageFeedbackType,
  ReportMessageAction,
  type ReportMessageProps,
  type ClearMessageContextParams,
  type ClearMessageContextProps,`
- `ChatCoreUploadPlugin`

*And more...*

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
