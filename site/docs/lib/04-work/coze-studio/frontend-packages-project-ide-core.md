---
title: "@coze-project-ide/core"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/project-ide/core/README.md"
sourceRel: "frontend/packages/project-ide/core/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/project-ide/core/README.md"
sourceSha256: "4299adada45cc1918c2810f6e101c855e31a61046e0ae0f0315ce17044733b0e"
pageSha256: "4299adada45cc1918c2810f6e101c855e31a61046e0ae0f0315ce17044733b0e"
contentMode: "local-full"
zh: ""
---

# @coze-project-ide/core

A ide features package for the Coze Studio monorepo

## Overview

This package is part of the Coze Studio monorepo and provides ide features functionality. It includes adapter, service, plugin and more.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@coze-project-ide/core": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@coze-project-ide/core';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Adapter
- Service
- Plugin
- Logger

## API Reference

### Exports

- `Emitter,
  logger,
  useRefresh,
  Disposable,
  DisposableCollection,
  bindContributions,
  Event,`
- `createLifecyclePlugin,
  definePluginCreator,
  loadPlugins,
  Plugin,
  PluginContext,
  ContextKeyService,
  type PluginCreator,
  type PluginsProvider,
  type PluginConfig,
  type PluginBindConfig,
  type OpenerOptions,
  LifecycleContribution,
  OpenerService,
  OpenHandler,
  ContainerFactory,
  StorageService,
  WindowService,
  URI,
  URIHandler,
  prioritizeAllSync,
  prioritizeAll,`
- `Application, IDEContainerModule`
- `type ResourcePluginOptions,
  createResourcePlugin,
  type Resource,
  type ResourceInfo,
  ResourceError,
  ResourceHandler,
  ResourceService,
  AutoSaveResource,
  AutoSaveResourceOptions,`
- `Command,
  createCommandPlugin,
  CommandService,
  CommandContainerModule,
  CommandContribution,
  CommandRegistry,
  type CommandHandler,
  type CommandPluginOptions,
  CommandRegistryFactory,`
- `createShortcutsPlugin,
  ShortcutsContainerModule,
  type ShortcutsPluginOptions,
  ShortcutsContribution,
  ShortcutsService,
  type ShortcutsRegistry,
  Shortcuts,
  SHORTCUTS,
  domEditable,`
- `createPreferencesPlugin,
  PreferenceContribution,
  type PreferenceSchema,
  type PreferencesPluginOptions,`
- `createNavigationPlugin,
  type NavigationPluginOptions,
  NavigationService,
  NavigationHistory,`
- `createStylesPlugin,
  StylingContribution,
  type Collector,
  type ColorTheme,
  ThemeService,`
- `type LabelChangeEvent,
  LabelHandler,
  type LabelPluginOptions,
  LabelService,
  createLabelPlugin,
  URILabel,`

*And more...*

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- Modern JavaScript

- ESLint for code quality
