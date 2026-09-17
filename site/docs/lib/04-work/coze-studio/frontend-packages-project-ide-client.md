---
title: "@coze-project-ide/client"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/project-ide/client/README.md"
sourceRel: "frontend/packages/project-ide/client/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/project-ide/client/README.md"
sourceSha256: "70c45afb72634c0320967f67bed0551a8e4319e27de4ee828ebf574816ad23d9"
pageSha256: "70c45afb72634c0320967f67bed0551a8e4319e27de4ee828ebf574816ad23d9"
contentMode: "local-full"
zh: ""
---

# @coze-project-ide/client

A api & networking package for the Coze Studio monorepo

## Overview

This package is part of the Coze Studio monorepo and provides api & networking functionality. It includes component, store, service and more.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-project-ide/client": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-project-ide/client';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Component
- Store
- Service
- Manager

## API Reference

### Exports

- `*`
- `type CustomTitleType,
  type ViewOptionRegisterService,
  type CustomPreferenceConfig,
  type CustomTitleChanged,
  LayoutPanelType,
  ToolbarAlign,
  ReactWidget,
  ViewManager,
  WidgetFactory,
  WidgetManager,
  CurrentResourceContext,
  ReactWidgetContext,
  ViewContribution,
  useCurrentWidget,
  useCurrentWidgetFromArea,
  useCurrentResource,
  Widget,
  StatefulWidget,
  ApplicationShell,
  LayoutRestorer,
  CustomPreferenceContribution,
  ViewService,
  FlowDockPanel,
  HoverService,
  MenuService,
  DebugService,
  DEBUG_BAR_DRAGGABLE,
  SplitWidget,
  BoxLayout,
  DockLayout,
  BoxPanel,
  SplitLayout,
  SplitPanel,
  createBoxLayout,
  createSplitLayout,
  PerfectScrollbar,
  DISABLE_HANDLE_EVENT,
  TabBarToolbar,
  ACTIVITY_BAR_CONTENT,
  ViewRenderer,
  DragService,
  CustomTabBar,
  TabBar,
  type DragPropsType,
  type PresetConfigType,
  type ToolbarItem,`
- `createDefaultPreset`
- `type IDEClientOptions, IDEClientContext`
- `*`

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript

- ESLint for code quality
