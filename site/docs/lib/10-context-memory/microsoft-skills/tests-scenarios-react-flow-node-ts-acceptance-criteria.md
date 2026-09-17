---
title: "React Flow Node Acceptance Criteria (TypeScript)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/react-flow-node-ts/acceptance-criteria.md"
sourceRel: "tests/scenarios/react-flow-node-ts/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/react-flow-node-ts/acceptance-criteria.md"
sourceSha256: "3c4581b97c8d1b38d37bce85b1b62cf6318aae94d1819c9cedfeb5365e1815f4"
pageSha256: "3c4581b97c8d1b38d37bce85b1b62cf6318aae94d1819c9cedfeb5365e1815f4"
contentMode: "local-full"
zh: ""
---

# React Flow Node Acceptance Criteria (TypeScript)

**Library**: React Flow, @xyflow/react
**Purpose**: Skill testing acceptance criteria for validating generated code correctness

---

## 1. Correct Import Patterns

### 1.1 Core Imports

#### ✅ CORRECT: React Flow Imports
```typescript
import {
  Node,
  NodeProps,
  Handle,
  Position,
  NodeResizer,
  useReactFlow,
} from '@xyflow/react';
```

#### ✅ CORRECT: Component Imports
```typescript
import { memo, useCallback } from 'react';
```

### 1.2 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Old package name
```typescript
// WRONG - old package name
import { Node, Handle } from 'react-flow-renderer';
import { Node, Handle } from 'reactflow';

// CORRECT - new package
import { Node, Handle } from '@xyflow/react';
```

---

## 2. Node Type Definition Patterns

### 2.1 ✅ CORRECT: Node Data Interface
```typescript
export interface MyNodeData extends Record<string, unknown> {
  title: string;
  description?: string;
  status?: 'active' | 'inactive' | 'error';
}
```

### 2.2 ✅ CORRECT: Node Type
```typescript
export type MyNode = Node<MyNodeData, 'my-node'>;
```

### 2.3 ✅ CORRECT: Node Props Type
```typescript
export type MyNodeProps = NodeProps<MyNode>;
```

### 2.4 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Missing Record&lt;string, unknown> extension
```typescript
// WRONG - data interface should extend Record<string, unknown>
export interface MyNodeData {
  title: string;
}
```

---

## 3. Node Component Patterns

### 3.1 ✅ CORRECT: Basic Node Component
```typescript
import { memo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';

interface MyNodeData extends Record<string, unknown> {
  title: string;
}

type MyNode = Node<MyNodeData, 'my-node'>;
type MyNodeProps = NodeProps<MyNode>;

export const MyNode = memo(function MyNode({ id, data, selected }: MyNodeProps) {
  return (
    <div className="node-container">
      <div className="node-content">
        <h3>{data.title}</h3>
      </div>
    </div>
  );
});
```

### 3.2 ✅ CORRECT: Node with NodeResizer
```typescript
import { memo } from 'react';
import { Handle, Position, NodeProps, Node, NodeResizer } from '@xyflow/react';

export const ResizableNode = memo(function ResizableNode({
  id,
  data,
  selected,
  width,
  height,
}: MyNodeProps) {
  return (
    <>
      <div className="node-container" style={{ width, height }}>
        <div className="node-content">
          <h3>{data.title}</h3>
        </div>
      </div>
    </>
  );
});
```

### 3.3 ✅ CORRECT: Node with Multiple Handles
```typescript
export const MultiHandleNode = memo(function MultiHandleNode({ id, data }: MyNodeProps) {
  return (
    <div className="node-container">
      <div className="node-content">
        <h3>{data.title}</h3>
      </div>
    </div>
  );
});
```

### 3.4 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Not using memo
```typescript
// WRONG - node components should be memoized
export function MyNode({ id, data }: MyNodeProps) {
  return <div>...</div>;
}
```

#### ❌ INCORRECT: Missing Handle id for multiple handles
```typescript
// WRONG - multiple handles of same type/position need unique ids
```

---

## 4. Handle Patterns

### 4.1 ✅ CORRECT: Handle with Custom Style
```typescript
<Handle
  type="target"
  position={Position.Top}
  className="w-3 h-3 bg-blue-500 border-2 border-white"
/>
```

### 4.2 ✅ CORRECT: Handle with Connection Validation
```typescript
<Handle
  type="target"
  position={Position.Top}
  isValidConnection={(connection) => {
    return connection.sourceHandle !== connection.targetHandle;
  }}
/>
```

### 4.3 ✅ CORRECT: Handle with ID
```typescript
<Handle
  type="source"
  position={Position.Bottom}
  id="output-1"
/>
```

---

## 5. Node Update Patterns

### 5.1 ✅ CORRECT: Using useReactFlow for Updates
```typescript
import { useReactFlow } from '@xyflow/react';

export const EditableNode = memo(function EditableNode({ id, data }: MyNodeProps) {
  const { setNodes } = useReactFlow();

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, title: e.target.value } }
          : node
      )
    );
  }, [id, setNodes]);

  return (
    <div className="node-container">
      <input
        value={data.title}
        onChange={handleTitleChange}
        className="node-input"
      />
    </div>
  );
});
```

### 5.2 ✅ CORRECT: Using Zustand Store for Updates
```typescript
import { useAppStore } from '../store/app-store';

export const StoreNode = memo(function StoreNode({ id, data }: MyNodeProps) {
  const updateNode = useAppStore((state) => state.updateNode);

  const handleUpdate = useCallback(() => {
    updateNode(id, { title: 'Updated' });
  }, [id, updateNode]);

  return (
    <div className="node-container">
      <button onClick={handleUpdate}>{data.title}</button>
    </div>
  );
});
```

---

## 6. Node Registration Patterns

### 6.1 ✅ CORRECT: Export Node Types
```typescript
// components/nodes/index.ts
export { MyNode } from './MyNode';
export { ResizableNode } from './ResizableNode';

export const nodeTypes = {
  'my-node': MyNode,
  'resizable-node': ResizableNode,
};
```

### 6.2 ✅ CORRECT: Register with ReactFlow
```typescript
import { ReactFlow } from '@xyflow/react';
import { nodeTypes } from './components/nodes';

function Flow() {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
    />
  );
}
```

### 6.3 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Defining nodeTypes inline
```typescript
// WRONG - causes re-renders
<ReactFlow
  nodeTypes={{
    'my-node': MyNode,  // This creates new object on each render
  }}
/>
```

---

## 7. Node Defaults Patterns

### 7.1 ✅ CORRECT: Define Node Defaults
```typescript
export const defaultMyNodeData: MyNodeData = {
  title: 'New Node',
  description: '',
  status: 'inactive',
};

export function createMyNode(position: { x: number; y: number }): MyNode {
  return {
    id: `my-node-${Date.now()}`,
    type: 'my-node',
    position,
    data: { ...defaultMyNodeData },
  };
}
```

---

## 8. Conditional Rendering Patterns

### 8.1 ✅ CORRECT: Conditional Based on Canvas Mode
```typescript
export const ConditionalNode = memo(function ConditionalNode({
  id,
  data,
  selected,
}: MyNodeProps) {
  const canvasMode = useAppStore((state) => state.canvasMode);

  return (
    <>
      <div className="node-container">
        <div className="node-content">
          {canvasMode === 'editing' ? (
            <input value={data.title} />
          ) : (
            <span>{data.title}</span>
          )}
        </div>
      </div>
    </>
  );
});
```

---

## 9. Node Styling Patterns

### 9.1 ✅ CORRECT: CSS Classes for Nodes
```css
.node-container {
  @apply bg-neutral-bg2 rounded-lg border border-border p-4;
}

.node-container.selected {
  @apply border-brand shadow-glow;
}

.node-content {
  @apply text-text-primary;
}

.node-handle {
  @apply w-3 h-3 bg-brand border-2 border-neutral-bg1;
}
```

### 9.2 ✅ CORRECT: Dynamic Styling Based on Props
```typescript
<div
  className={clsx(
    'node-container',
    selected && 'selected',
    data.status === 'error' && 'border-status-error',
  )}
>
  ...
</div>
```

---

## 10. Anti-Patterns Summary

### 10.1 ❌ Common Mistakes
```typescript
// WRONG - Not using memo
export function MyNode() {}

// WRONG - Inline nodeTypes
nodeTypes={{ 'my-node': MyNode }}

// WRONG - Multiple handles without ids

// WRONG - Old package imports
import { Node } from 'reactflow';
```
