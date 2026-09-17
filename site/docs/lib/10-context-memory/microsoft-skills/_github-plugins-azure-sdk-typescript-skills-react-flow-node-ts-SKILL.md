---
title: "React Flow Node"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/react-flow-node-ts/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-typescript/skills/react-flow-node-ts/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-typescript/skills/react-flow-node-ts/SKILL.md"
sourceSha256: "f0a4f37df3e8e7ed9645e947c08470fd78483f18b9587ae8cd20720022110781"
pageSha256: "f0a4f37df3e8e7ed9645e947c08470fd78483f18b9587ae8cd20720022110781"
contentMode: "local-full"
zh: ""
---

# React Flow Node

Create React Flow node components following established patterns with proper TypeScript types and store integration.

## Quick Start

Copy templates from [assets/](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/react-flow-node-ts/assets/README.md) and replace placeholders:
- <code v-pre>{{NodeName}}</code> → PascalCase component name (e.g., `VideoNode`)
- <code v-pre>{{nodeType}}</code> → kebab-case type identifier (e.g., `video-node`)
- <code v-pre>{{NodeData}}</code> → Data interface name (e.g., `VideoNodeData`)

## Templates

- [assets/template.tsx](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/react-flow-node-ts/assets/template.tsx) - Node component
- [assets/types.template.ts](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/react-flow-node-ts/assets/types.template.ts) - TypeScript definitions

## Node Component Pattern

```tsx
export const MyNode = memo(function MyNode({
  id,
  data,
  selected,
  width,
  height,
}: MyNodeProps) {
  const updateNode = useAppStore((state) => state.updateNode);
  const canvasMode = useAppStore((state) => state.canvasMode);
  
  return (
    <>
      <div className="node-container">
        {/* Node content */}
      </div>
    </>
  );
});
```

## Type Definition Pattern

```typescript
export interface MyNodeData extends Record<string, unknown> {
  title: string;
  description?: string;
}

export type MyNode = Node<MyNodeData, 'my-node'>;
```

## Integration Steps

1. Add type to `src/frontend/src/types/index.ts`
2. Create component in `src/frontend/src/components/nodes/`
3. Export from `src/frontend/src/components/nodes/index.ts`
4. Add defaults in `src/frontend/src/store/app-store.ts`
5. Register in canvas `nodeTypes`
6. Add to AddBlockMenu and ConnectMenu
