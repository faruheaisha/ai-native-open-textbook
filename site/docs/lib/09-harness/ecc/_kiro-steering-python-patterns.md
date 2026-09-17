---
title: "Python Patterns"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.kiro/steering/python-patterns.md"
sourceRel: ".kiro/steering/python-patterns.md"
rawUrl: "/raw/09-harness/ecc/.kiro/steering/python-patterns.md"
sourceSha256: "6f6fab93935b9bc3fe0cc13a39c1f1cbadbf23e2c4243c1c8595e25c920acad6"
pageSha256: "6f6fab93935b9bc3fe0cc13a39c1f1cbadbf23e2c4243c1c8595e25c920acad6"
contentMode: "local-full"
zh: ""
---

# Python Patterns

> This file extends the common patterns rule with Python specific content.

## Protocol (Duck Typing)

```python
from typing import Protocol

class Repository(Protocol):
    def find_by_id(self, id: str) -> dict | None: ...
    def save(self, entity: dict) -> dict: ...
```

## Dataclasses as DTOs

```python
from dataclasses import dataclass

@dataclass
class CreateUserRequest:
    name: str
    email: str
    age: int | None = None
```

## Context Managers & Generators

- Use context managers (`with` statement) for resource management
- Use generators for lazy evaluation and memory-efficient iteration

## Reference

See skill: `python-patterns` for comprehensive patterns including decorators, concurrency, and package organization.
