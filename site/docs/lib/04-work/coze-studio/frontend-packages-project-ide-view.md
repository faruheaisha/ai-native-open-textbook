---
title: "@coze-project-ide/view"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/project-ide/view/README.md"
sourceRel: "frontend/packages/project-ide/view/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/project-ide/view/README.md"
sourceSha256: "ed5d93a4ec8beae457611271fa127defbb4d9e27c21523762129f44face61e25"
pageSha256: "ed5d93a4ec8beae457611271fa127defbb4d9e27c21523762129f44face61e25"
contentMode: "local-full"
zh: ""
---

# @coze-project-ide/view

A ide features package for the Coze Studio monorepo

## Overview

This package is part of the Coze Studio monorepo and provides ide features functionality. It includes component, hook, store and more.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-project-ide/view": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-project-ide/view';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Component
- Hook
- Store
- Service
- Manager
- Plugin

## API Reference

### Exports

- `ReactWidget, ReactWidgetContext`
- `LayoutPanelType,
  ToolbarAlign,
  type ViewPluginOptions,
  type CustomTitleType,
  type CustomTitleChanged,
  type PresetConfigType,`
- `ViewManager`
- `WidgetManager`
- `createViewPlugin`
- `createContextMenuPlugin`
- `VIEW_CONTAINER_CLASS_NAME,
  HOVER_TOOLTIP_LABEL,
  DEBUG_BAR_DRAGGABLE,
  DISABLE_HANDLE_EVENT,`
- `WidgetFactory, type ToolbarItem`
- `HoverService`
- `DragService, type DragPropsType`

*And more...*

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript
- Vitest for testing
- ESLint for code quality
