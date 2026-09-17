---
title: "Create Zustand Store"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/prompts/create-store.prompt.md"
sourceRel: ".github/prompts/create-store.prompt.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/prompts/create-store.prompt.md"
sourceSha256: "d1f2e3d6ac3ba1fef106e85de351bd3bc21ed0c307d7ed0037577c76ec890eca"
pageSha256: "d1f2e3d6ac3ba1fef106e85de351bd3bc21ed0c307d7ed0037577c76ec890eca"
contentMode: "local-full"
zh: ""
---

# Create Zustand Store

Create a new Zustand store following CoreAI DIY patterns.

## Variables

- `STORE_NAME`: The store name (e.g., `settings`)
- `STORE_DESCRIPTION`: Brief description of what the store manages
- `STATE_FIELDS`: Key state fields
- `ACTIONS`: Key actions the store needs

## Steps

### 1. Create Store File

Create `src/frontend/src/store/$\{STORE_NAME\}-store.ts`:

```typescript
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// State interface
export interface ${STORE_NAME.charAt(0).toUpperCase() + STORE_NAME.slice(1)}State {
  // Add ${STATE_FIELDS}
  isLoading: boolean;
  error: string | null;
}

// Actions interface
export interface ${STORE_NAME.charAt(0).toUpperCase() + STORE_NAME.slice(1)}Actions {
  // Add ${ACTIONS}
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

// Combined store type
export type ${STORE_NAME.charAt(0).toUpperCase() + STORE_NAME.slice(1)}Store = 
  ${STORE_NAME.charAt(0).toUpperCase() + STORE_NAME.slice(1)}State & 
  ${STORE_NAME.charAt(0).toUpperCase() + STORE_NAME.slice(1)}Actions;

// Initial state
const initialState: ${STORE_NAME.charAt(0).toUpperCase() + STORE_NAME.slice(1)}State = {
  // Initialize ${STATE_FIELDS}
  isLoading: false,
  error: null,
};

// Create store with subscribeWithSelector
export const use${STORE_NAME.charAt(0).toUpperCase() + STORE_NAME.slice(1)}Store = create<${STORE_NAME.charAt(0).toUpperCase() + STORE_NAME.slice(1)}Store>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,
    
    // Add action implementations
    
    setLoading: (loading) => set({ isLoading: loading }),
    
    setError: (error) => set({ error }),
    
    reset: () => set(initialState),
  }))
);
```

### 2. Export from Barrel

Add to `src/frontend/src/store/index.ts`:

```typescript
export { use${STORE_NAME.charAt(0).toUpperCase() + STORE_NAME.slice(1)}Store } from './${STORE_NAME}-store';
export type {
  ${STORE_NAME.charAt(0).toUpperCase() + STORE_NAME.slice(1)}State,
  ${STORE_NAME.charAt(0).toUpperCase() + STORE_NAME.slice(1)}Actions,
  ${STORE_NAME.charAt(0).toUpperCase() + STORE_NAME.slice(1)}Store,
} from './${STORE_NAME}-store';
```

### 3. Usage in Components

```typescript
import { use${STORE_NAME.charAt(0).toUpperCase() + STORE_NAME.slice(1)}Store } from '@/store';

function MyComponent() {
  // Select specific state (prevents unnecessary re-renders)
  const value = use${STORE_NAME.charAt(0).toUpperCase() + STORE_NAME.slice(1)}Store((state) => state.value);
  const action = use${STORE_NAME.charAt(0).toUpperCase() + STORE_NAME.slice(1)}Store((state) => state.action);
  
  // Or use multiple selectors
  const { value, action } = use${STORE_NAME.charAt(0).toUpperCase() + STORE_NAME.slice(1)}Store((state) => ({
    value: state.value,
    action: state.action,
  }));
  
  return <button onClick={() => action(newValue)}>Update</button>;
}
```

### 4. Subscribe to Changes (optional)

```typescript
// Subscribe to specific state changes
use${STORE_NAME.charAt(0).toUpperCase() + STORE_NAME.slice(1)}Store.subscribe(
  (state) => state.value,
  (value, prevValue) => {
    console.log('Value changed from', prevValue, 'to', value);
  }
);
```

## Patterns

### Async Actions
```typescript
loadData: async () => {
  set({ isLoading: true, error: null });
  try {
    const data = await fetchData();
    set({ data, isLoading: false });
  } catch (error) {
    set({ error: error.message, isLoading: false });
  }
},
```

### Computed Values
```typescript
// Use get() to access current state
getFilteredItems: () => {
  const { items, filter } = get();
  return items.filter(item => item.matches(filter));
},
```

### Batch Updates
```typescript
// Single set() call for multiple updates
updateMultiple: (updates) => {
  set({
    field1: updates.field1,
    field2: updates.field2,
    field3: updates.field3,
  });
},
```

## Checklist

- [ ] Store file created with subscribeWithSelector
- [ ] State interface defined
- [ ] Actions interface defined
- [ ] Initial state defined
- [ ] Exported from barrel
- [ ] Tests added
