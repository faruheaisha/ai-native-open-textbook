---
title: "TypeScript/JavaScript Patterns"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.kiro/steering/typescript-patterns.md"
sourceRel: ".kiro/steering/typescript-patterns.md"
rawUrl: "/raw/09-harness/ecc/.kiro/steering/typescript-patterns.md"
sourceSha256: "abce3f7a1f5e778f1950a2b79d16701e17d58641fce1211367d64d0ab9f13276"
pageSha256: "abce3f7a1f5e778f1950a2b79d16701e17d58641fce1211367d64d0ab9f13276"
contentMode: "local-full"
zh: ""
---

# TypeScript/JavaScript Patterns

> This file extends the common patterns rule with TypeScript/JavaScript specific content.

## API Response Format

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  meta?: {
    total: number
    page: number
    limit: number
  }
}
```

## Custom Hooks Pattern

```typescript
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}
```

## Repository Pattern

```typescript
interface Repository<T> {
  findAll(filters?: Filters): Promise<T[]>
  findById(id: string): Promise<T | null>
  create(data: CreateDto): Promise<T>
  update(id: string, data: UpdateDto): Promise<T>
  delete(id: string): Promise<void>
}
```
