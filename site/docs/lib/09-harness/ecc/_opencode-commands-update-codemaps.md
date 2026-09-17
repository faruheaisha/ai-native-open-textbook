---
title: "Update Codemaps Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.opencode/commands/update-codemaps.md"
sourceRel: ".opencode/commands/update-codemaps.md"
rawUrl: "/raw/09-harness/ecc/.opencode/commands/update-codemaps.md"
sourceSha256: "197cef27eb72f207853e30dbcac99d3a4f6c553a073f5052ded71ca972a0694d"
pageSha256: "197cef27eb72f207853e30dbcac99d3a4f6c553a073f5052ded71ca972a0694d"
contentMode: "local-full"
zh: ""
---

# Update Codemaps Command

Update codemaps to reflect current codebase structure: $ARGUMENTS

## Your Task

Generate or update codemaps in `docs/CODEMAPS/` directory:

1. **Analyze codebase structure**
2. **Generate component maps**
3. **Document relationships**
4. **Update navigation guides**

## Codemap Types

### Architecture Map
```
docs/CODEMAPS/ARCHITECTURE.md
```
- High-level system overview
- Component relationships
- Data flow diagrams

### Module Map
```
docs/CODEMAPS/MODULES.md
```
- Module descriptions
- Public APIs
- Dependencies

### File Map
```
docs/CODEMAPS/FILES.md
```
- Directory structure
- File purposes
- Key files

## Codemap Format

### [Module Name]

**Purpose**: [Brief description]

**Location**: `src/[path]/`

**Key Files**:
- `file1.ts` - [purpose]
- `file2.ts` - [purpose]

**Dependencies**:
- [Module A]
- [Module B]

**Exports**:
- `functionName()` - [description]
- `ClassName` - [description]

**Usage Example**:
```typescript
import { functionName } from '@/module'
```

## Generation Process

1. Scan directory structure
2. Parse imports/exports
3. Build dependency graph
4. Generate markdown maps
5. Validate links

---

**TIP**: Keep codemaps updated when adding new modules or significant refactoring.
