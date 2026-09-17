---
title: "Zustand Store"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/zustand-store-ts/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-typescript/skills/zustand-store-ts/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-typescript/skills/zustand-store-ts/SKILL.md"
sourceSha256: "dd69536e2f18a09eac999d036f963dbbf6874f44fe4ac73a6df89170de4a542b"
pageSha256: "dd69536e2f18a09eac999d036f963dbbf6874f44fe4ac73a6df89170de4a542b"
contentMode: "local-full"
zh: ""
---

# Zustand Store

Create Zustand stores following established patterns with proper TypeScript types and middleware.

## Quick Start

Copy the template from [assets/template.ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/zustand-store-ts/assets/template.ts) and replace placeholders:
- <code v-pre>{{StoreName}}</code> → PascalCase store name (e.g., `Project`)
- <code v-pre>{{description}}</code> → Brief description for JSDoc

## Always Use subscribeWithSelector

```typescript
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const useMyStore = create<MyStore>()(
  subscribeWithSelector((set, get) => ({
    // state and actions
  }))
);
```

## Separate State and Actions

```typescript
export interface MyState {
  items: Item[];
  isLoading: boolean;
}

export interface MyActions {
  addItem: (item: Item) => void;
  loadItems: () => Promise<void>;
}

export type MyStore = MyState & MyActions;
```

## Use Individual Selectors

```typescript
// Good - only re-renders when `items` changes
const items = useMyStore((state) => state.items);

// Avoid - re-renders on any state change
const { items, isLoading } = useMyStore();
```

## Subscribe Outside React

```typescript
useMyStore.subscribe(
  (state) => state.selectedId,
  (selectedId) => console.log('Selected:', selectedId)
);
```

## Integration Steps

1. Create store in `src/frontend/src/store/`
2. Export from `src/frontend/src/store/index.ts`
3. Add tests in `src/frontend/src/store/*.test.ts`
