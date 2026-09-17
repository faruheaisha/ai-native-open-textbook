---
title: "@cozeloop/prompt-components"
sourceId: "04-work/coze-loop"
sourceTitle: "Coze Loop 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-loop"
entryUrl: "https://github.com/coze-dev/coze-loop/blob/5f1e4c234fc110c1bf674e882a6fd02109e1e1e6/frontend/packages/loop-components/prompt-components-v2/README.md"
sourceRel: "frontend/packages/loop-components/prompt-components-v2/README.md"
rawUrl: "/raw/04-work/coze-loop/frontend/packages/loop-components/prompt-components-v2/README.md"
sourceSha256: "50e3f1fc205b877e5271ff65765c1dd0152e9f77c7abff58e9ce51d77aae2a51"
pageSha256: "50e3f1fc205b877e5271ff65765c1dd0152e9f77c7abff58e9ce51d77aae2a51"
contentMode: "local-full"
zh: ""
---

# @cozeloop/prompt-components

Prompt common components for cozeloop

## Overview

This package is part of the Coze Loop monorepo and provides ui component functionality. It includes editor, prompt.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@cozeloop/prompt-components": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

```typescript
import { /* exported functions/components */ } from '@cozeloop/prompt-components';

// Example usage
// TODO: Add specific usage examples
```

## Features

- Editor
- Prompt

## API Reference

### Exports

- `PromptBasicEditor,
  PromptBasicEditorProps,
  PromptBasicEditorRef,`
- `PromptDiffEditor`
- `PromptEditor,
  PromptEditorProps,
  PromptMessage,`
- `PopoverModelConfigEditor`
- `PopoverModelConfigEditorQuery`
- `BasicModelConfigEditor`
- `ModelSelectWithObject`
- `DevLayout`
- `PromptCreate`
- `getPlaceholderErrorContent`

*And more...*

For detailed API documentation, please refer to the TypeScript definitions.

## Development

This package is built with:

- TypeScript
- React
- Vitest for testing
- ESLint for code quality
