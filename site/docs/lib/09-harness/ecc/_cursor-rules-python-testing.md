---
title: "Python Testing"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/python-testing.md"
sourceRel: ".cursor/rules/python-testing.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/python-testing.md"
sourceSha256: "451ddfa2836e150888ae3b7cc585a069fe59f81367bc07aae52ee6083846c4f1"
pageSha256: "451ddfa2836e150888ae3b7cc585a069fe59f81367bc07aae52ee6083846c4f1"
contentMode: "local-full"
zh: ""
---

# Python Testing

> This file extends the common testing rule with Python specific content.

## Framework

Use **pytest** as the testing framework.

## Coverage

```bash
pytest --cov=src --cov-report=term-missing
```

## Test Organization

Use `pytest.mark` for test categorization:

```python
import pytest

@pytest.mark.unit
def test_calculate_total():
    ...

@pytest.mark.integration
def test_database_connection():
    ...
```

## Reference

See skill: `python-testing` for detailed pytest patterns and fixtures.
