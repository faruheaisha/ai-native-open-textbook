---
title: "@coze-project-ide/framework"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/project-ide/framework/README.md"
sourceRel: "frontend/packages/project-ide/framework/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/project-ide/framework/README.md"
sourceSha256: "e490b76ee97c710a4819ee045040b034d394fb14d66a1f5200565ba644ead75f"
pageSha256: "e490b76ee97c710a4819ee045040b034d394fb14d66a1f5200565ba644ead75f"
contentMode: "local-full"
zh: ""
---

# @coze-project-ide/framework

A ide features package for the Coze Studio monorepo

## Overview

This package is part of the Coze Studio monorepo and provides ide features functionality. It includes component, hook, adapter and more.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-project-ide/framework": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-project-ide/framework';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Component
- Hook
- Adapter
- Store
- Service
- Manager
- Modal
- Plugin
- Sdk

## API Reference

### Exports

- `IDEClient,
  ReactWidget,
  LayoutPanelType,
  URI,
  definePluginCreator,
  bindContributions,
  ViewContribution,
  LifecycleContribution,
  Emitter,
  Event,
  Disposable,
  DisposableCollection,
  useIDEService,
  useNavigation,
  LabelHandler,
  CommandContribution,
  ShortcutsContribution,
  OpenerService,
  useCurrentWidget,
  DISABLE_HANDLE_EVENT,
  ViewService,
  LayoutRestorer,
  ApplicationShell,
  WidgetManager,
  ViewRenderer,
  type PluginCreator,
  type ViewOptionRegisterService,
  type BoxPanel,
  ShortcutsService,
  CommandRegistry,
  useIDEContainer,
  TabBarToolbar,
  ContextKeyService,
  type ShortcutsRegistry,
  SplitWidget,
  Command,
  WindowService,
  type CustomTitleType,`
- `useCommitVersion`
- `useCurrentWidgetContext,
  useSpaceId,
  useProjectId,
  useProjectIDEServices,
  useActivateWidgetContext,
  useIDENavigate,
  useCurrentModeType,
  useSplitScreenArea,
  useTitle,
  useIDELocation,
  useIDEParams,
  useIDEServiceInBiz,
  useShortcuts,
  useListenMessageEvent,
  useWsListener,
  useSendMessageEvent,
  useViewService,
  useGetUIWidgetFromId,`
- `IDEGlobalProvider, WidgetContext`
- `UI_BUILDER_URI,
  MAIN_PANEL_DEFAULT_URI,
  SIDEBAR_URI,
  URI_SCHEME,
  SIDEBAR_CONFIG_URI,
  CONVERSATION_URI,
  SECONDARY_SIDEBAR_URI,
  CustomCommand,`
- `type  TitlePropsType, WidgetRegistry`
- `withLazyLoad,
  getResourceByPathname,
  getURIByResource,
  getResourceByURI,
  getURIPathByPathname,
  getURLByURI,
  getURIByPath,
  getPathnameByURI,
  compareURI,
  addPreservedSearchParams,`
- `ProjectIDEServices`
- `WidgetService`
- `ProjectIDEClient,
  ResourceFolder,
  mapResourceTree,
  ResourceTypeEnum,
  BaseResourceContextMenuBtnType,
  type CommonRenderProps,
  type ResourceType,
  type ResourceMapType,
  type ResourceFolderRefType,
  type RightPanelConfigType,
  type ResourceFolderShortCutContextType,
  type ResourceFolderProps,
  type RenderMoreSuffixType,
  type CreateResourcePropType,
  RESOURCE_FOLDER_CONTEXT_KEY,
  ROOT_KEY,
  type IdType,`

*And more...*

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript

- ESLint for code quality
