---
title: "Python Coding Style"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/python-coding-style.md"
sourceRel: ".cursor/rules/python-coding-style.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/python-coding-style.md"
sourceSha256: "d22ecd6b0cb332c517ad6dc0d0922ba254ea09c40d356c88979adf3cfac506a4"
pageSha256: "d22ecd6b0cb332c517ad6dc0d0922ba254ea09c40d356c88979adf3cfac506a4"
contentMode: "local-full"
zh: ""
---

# Python Coding Style

> This file extends the common coding style rule with Python specific content.

## Standards

- Follow **PEP 8** conventions
- Use **type annotations** on all function signatures

## Immutability

Prefer immutable data structures:

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class User:
    name: str
    email: str

from typing import NamedTuple

class Point(NamedTuple):
    x: float
    y: float
```

## Formatting

- **black** for code formatting
- **isort** for import sorting
- **ruff** for linting

## Reference

See skill: `python-patterns` for comprehensive Python idioms and patterns.
