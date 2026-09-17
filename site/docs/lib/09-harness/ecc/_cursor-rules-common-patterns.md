---
title: "Common Patterns"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/common-patterns.md"
sourceRel: ".cursor/rules/common-patterns.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/common-patterns.md"
sourceSha256: "ed73a02ca6fb3fa2e28bda6da8a16b46cd157150f5f3c580ecad5c748ad32b0a"
pageSha256: "ed73a02ca6fb3fa2e28bda6da8a16b46cd157150f5f3c580ecad5c748ad32b0a"
contentMode: "local-full"
zh: ""
---

# Common Patterns

## Skeleton Projects

When implementing new functionality:
1. Search for battle-tested skeleton projects
2. Use parallel agents to evaluate options:
   - Security assessment
   - Extensibility analysis
   - Relevance scoring
   - Implementation planning
3. Clone best match as foundation
4. Iterate within proven structure

## Design Patterns

### Repository Pattern

Encapsulate data access behind a consistent interface:
- Define standard operations: findAll, findById, create, update, delete
- Concrete implementations handle storage details (database, API, file, etc.)
- Business logic depends on the abstract interface, not the storage mechanism
- Enables easy swapping of data sources and simplifies testing with mocks

### API Response Format

Use a consistent envelope for all API responses:
- Include a success/status indicator
- Include the data payload (nullable on error)
- Include an error message field (nullable on success)
- Include metadata for paginated responses (total, page, limit)
