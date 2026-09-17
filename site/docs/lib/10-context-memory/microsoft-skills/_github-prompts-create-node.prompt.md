---
title: "Create New Node Type"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/prompts/create-node.prompt.md"
sourceRel: ".github/prompts/create-node.prompt.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/prompts/create-node.prompt.md"
sourceSha256: "7c1f27068db36cda49b3539e366c4ca86fe036e7d108d120f40128ec6a6d43c1"
pageSha256: "7c1f27068db36cda49b3539e366c4ca86fe036e7d108d120f40128ec6a6d43c1"
contentMode: "local-full"
zh: ""
---

# Create New Node Type

Create a new node type for the CoreAI DIY canvas following established patterns.

## Variables

- `NODE_TYPE`: The node type identifier (e.g., `my-node`)
- `NODE_NAME`: The display name (e.g., `MyNode`)
- `NODE_DESCRIPTION`: Brief description of the node's purpose
- `NODE_PROPERTIES`: Key properties the node needs

## Steps

### 1. Define Types

Add to `src/frontend/src/types/index.ts`:

```typescript
export interface ${NODE_NAME}Data extends Record<string, unknown> {
  title: string;
  // Add ${NODE_PROPERTIES}
}

export type ${NODE_NAME} = Node<${NODE_NAME}Data, '${NODE_TYPE}'>;
```

Update the `AppNode` union to include `${NODE_NAME}`.

### 2. Create Component

Create `src/frontend/src/components/nodes/${NODE_NAME\}.tsx`:

```typescript
import { memo, useCallback } from 'react';
import { NodeProps, Node, Handle, Position, NodeResizer } from '@xyflow/react';
import { ${NODE_NAME}Data } from '@/types';
import { useAppStore } from '@/store';

type ${NODE_NAME}Props = NodeProps<Node<${NODE_NAME}Data>>;

export const ${NODE_NAME} = memo(function ${NODE_NAME}({
  id,
  data,
  selected,
}: ${NODE_NAME}Props) {
  const updateNode = useAppStore((state) => state.updateNode);
  const canvasMode = useAppStore((state) => state.canvasMode);
  
  return (
    <>
      {canvasMode === 'editing' && (
      )}
      <div className="bg-[var(--frontier-surface)] border-2 border-[var(--frontier-border)] rounded-xl p-4">
        <h3 className="text-[var(--frontier-text)] font-medium">{data.title}</h3>
        {/* Add node content */}
      </div>
    </>
  );
});
```

### 3. Export from Barrel

Add to `src/frontend/src/components/nodes/index.ts`:

```typescript
export { ${NODE_NAME} } from './${NODE_NAME}';
```

### 4. Add Default Data

In `src/frontend/src/store/app-store.ts`, add to `getDefaultNodeData`:

```typescript
case '${NODE_TYPE}':
  return { title: 'New ${NODE_NAME}', ...data } as NodeDataMap[T];
```

### 5. Register Node Type

In canvas page, add to `nodeTypes`:

```typescript
const nodeTypes: NodeTypes = {
  // ...existing types
  '${NODE_TYPE}': ${NODE_NAME},
};
```

### 6. Add to Menus

Add entry to AddBlockMenu, ConnectMenu, and NodeContextMenu.

## Checklist

- [ ] Type definition in `types/index.ts`
- [ ] Component in `components/nodes/`
- [ ] Barrel export
- [ ] Default data in store
- [ ] Registered in nodeTypes
- [ ] Added to menus
- [ ] Keyboard shortcut (optional)
- [ ] Tests added
