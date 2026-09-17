---
title: "🎨 FRONTEND RENDERING PATTERNS"
sourceId: "07-coding/cloudflare-vibesdk"
sourceTitle: "Cloudflare VibeSDK"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/cloudflare/vibesdk"
entryUrl: "https://github.com/cloudflare/vibesdk/blob/9da158d82c597a0e8f4bf033cdccd1053fb6fb15/docs/llm.md"
sourceRel: "docs/llm.md"
rawUrl: "/raw/07-coding/cloudflare-vibesdk/docs/llm.md"
sourceSha256: "5cade1cd8dea6404f985f3f367e0c0233441fc841f741f71f3da1e6c1e0c9cf7"
pageSha256: "6ebc745ae4e4c65bd19f205b69df6fca42ad422a37eceda2c0b4272382f0fa0a"
contentMode: "local-full"
zh: ""
---

# 🎨 FRONTEND RENDERING PATTERNS

## Component Architecture

### **Atomic Design Structure**

**Hierarchy:**
```
1. Primitives (ui/) - shadcn/ui base components
   ↓
2. Shared (shared/) - App-specific reusable components
   ↓
3. Features (routes/) - Page-specific components
   ↓
4. Pages (routes/*.tsx) - Full page views
```

### **Example: Button Hierarchy**

```typescript
// 1. Primitive: /components/ui/button.tsx
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((
  { className, variant, size, ...props },
  ref
) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

// 2. Shared: /components/shared/AppCard.tsx
export function AppCard({ app }: { app: App }) {
  return (
        <h3>{app.title}</h3>
        <Button onClick={() => navigate(`/app/${app.id}`)}>
          View App
  );
}

// 3. Feature: /routes/apps/apps-list.tsx
export function AppsList() {
  const { apps } = useApps();
  
  return (
    <div>
      {apps.map(app => <AppCard key={app.id} app={app} />)}
    </div>
  );
}
```

---

## State Management Patterns

### **1. Local State (useState)**

**Use for:** UI-only state (modals, dropdowns, form inputs)

```typescript
const [isOpen, setIsOpen] = useState(false);
const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
```

### **2. Server State (Custom Hooks)**

**Use for:** Data from API

```typescript
// /hooks/use-apps.ts
export function useApps(filters?: AppFilters) {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    apiClient.getApps(filters).then(setApps);
  }, [filters]);
  
  return { apps, loading, refetch };
}

// Usage
const { apps, loading } = useApps({ sortBy: 'popular' });
```

### **3. Global State (Context)**

**Use for:** Cross-component shared state (auth, theme)

```typescript
// /contexts/auth-context.tsx
const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Usage
const { user } = useAuth();
```

### **4. WebSocket State (use-chat hook)**

**Use for:** Real-time agent state

**Location:** `/src/routes/chat/hooks/use-chat.ts`

**Pattern:**
```typescript
export function useChat(chatId: string) {
  // Local state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [files, setFiles] = useState<FileType[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // WebSocket connection
  const [websocket, setWebSocket] = useState<WebSocket | null>(null);
  
  // Message handler
  useEffect(() => {
    if (!websocket) return;
    
    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      handleWebSocketMessage(message, {
        setMessages,
        setFiles,
        setIsGenerating,
        // ... other setters
      });
    };
  }, [websocket]);
  
  return {
    messages,
    files,
    isGenerating,
    websocket,
    sendMessage: (text) => {
      websocket?.send(JSON.stringify({ type: 'USER_MESSAGE', text }));
    }
  };
}
```

---

## Rendering Optimization

### **1. useMemo for Expensive Computations**

```typescript
const sortedFiles = useMemo(() => {
  return files.sort((a, b) => a.path.localeCompare(b.path));
}, [files]);
```

### **2. useCallback for Event Handlers**

```typescript
const handleFileClick = useCallback((fileId: string) => {
  setSelectedFile(files.find(f => f.id === fileId));
}, [files]);
```

### **3. React.memo for Pure Components**

```typescript
export const FileTreeNode = memo(({ file, onSelect }: Props) => {
  return (
    <div onClick={() => onSelect(file.id)}>
      {file.name}
    </div>
  );
});
```

### **4. Virtual Scrolling for Large Lists**

```typescript
// For 1000+ items
import { useVirtualizer } from '@tanstack/react-virtual';

const virtualizer = useVirtualizer({
  count: apps.length,
  getScrollElement: () => containerRef.current,
  estimateSize: () => 200, // Card height
});
```

---

## Data Fetching Patterns

### **1. Single Resource**

```typescript
// /hooks/use-app.ts
export function useApp(appId?: string) {
  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    if (!appId) return;
    
    setLoading(true);
    apiClient.getApp(appId)
      .then(setApp)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [appId]);
  
  return { app, loading, error, refetch };
}
```

### **2. Paginated List**

```typescript
// /hooks/use-apps.ts
export function useApps(filters?: AppFilters) {
  const [apps, setApps] = useState<App[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const currentPageRef = useRef(1);
  const isLoadingMoreRef = useRef(false);
  
  const fetchApps = useCallback(async (loadMore = false) => {
    if (isLoadingMoreRef.current) return;
    isLoadingMoreRef.current = true;
    
    const page = loadMore ? currentPageRef.current + 1 : 1;
    const result = await apiClient.getApps({ ...filters, page });
    
    if (loadMore) {
      setApps(prev => [...prev, ...result.apps]);
    } else {
      setApps(result.apps);
    }
    
    setHasMore(result.hasMore);
    currentPageRef.current = page;
    isLoadingMoreRef.current = false;
  }, [filters]);
  
  const loadMore = () => fetchApps(true);
  
  return { apps, hasMore, loadMore };
}
```

### **3. Infinite Scroll**

```typescript
const { apps, hasMore, loadMore } = useApps();

const observerRef = useRef<IntersectionObserver>();
const sentinelRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  observerRef.current = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && hasMore) {
      loadMore();
    }
  });
  
  if (sentinelRef.current) {
    observerRef.current.observe(sentinelRef.current);
  }
  
  return () => observerRef.current?.disconnect();
}, [hasMore, loadMore]);

return (
  <div>
    {apps.map(app => <AppCard key={app.id} app={app} />)}
    <div ref={sentinelRef} /> {/* Sentinel element */}
  </div>
);
```

---

## Form Handling

### **Controlled Components**

```typescript
const [formData, setFormData] = useState({
  title: '',
  description: '',
  isPublic: true
});

const handleChange = (field: keyof typeof formData) => (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  setFormData(prev => ({ ...prev, [field]: e.target.value }));
};

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  await apiClient.createApp(formData);
};

return (
  <form onSubmit={handleSubmit}>
    <input value={formData.title} onChange={handleChange('title')} />
    <button type="submit">Create</button>
  </form>
);
```

### **Form Validation**

```typescript
const [errors, setErrors] = useState<Record<string, string>>({});

const validate = () => {
  const newErrors: Record<string, string> = {};
  
  if (!formData.title) {
    newErrors.title = 'Title is required';
  }
  if (formData.title.length < 3) {
    newErrors.title = 'Title must be at least 3 characters';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  if (!validate()) return;
  
  await apiClient.createApp(formData);
};
```

---

## Modal Patterns

### **Simple Modal State**

```typescript
const [isOpen, setIsOpen] = useState(false);

return (
  <>
    <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
    
          <DialogTitle>Modal Title</DialogTitle>
        {/* Modal content */}
  </>
);
```

### **Modal with Data**

```typescript
const [selectedApp, setSelectedApp] = useState<App | null>(null);

return (
  <>
    {apps.map(app => (
      <Button key={app.id} onClick={() => setSelectedApp(app)}>
        Edit
    ))}
    
    {selectedApp && (
      <EditAppModal
        app={selectedApp}
        onClose={() => setSelectedApp(null)}
      />
    )}
  </>
);
```

---

## Error Handling

### **Error Boundary**

```typescript
// /components/ErrorBoundary.tsx
export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to Sentry
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### **API Error Handling**

```typescript
try {
  const app = await apiClient.getApp(appId);
  setApp(app);
} catch (error) {
  if (error instanceof ApiError) {
    if (error.status === 404) {
      setError('App not found');
    } else if (error.status === 403) {
      setError('Access denied');
    } else {
      setError('Something went wrong');
    }
  }
}
```
