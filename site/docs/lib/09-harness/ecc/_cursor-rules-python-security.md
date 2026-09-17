---
title: "Python Security"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/python-security.md"
sourceRel: ".cursor/rules/python-security.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/python-security.md"
sourceSha256: "738f9a38287a5f769df4ca0b50b142e8365393a9b6c1c8d8d226a1c67a3b352d"
pageSha256: "738f9a38287a5f769df4ca0b50b142e8365393a9b6c1c8d8d226a1c67a3b352d"
contentMode: "local-full"
zh: ""
---

# Python Security

> This file extends the common security rule with Python specific content.

## Secret Management

```python
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.environ["OPENAI_API_KEY"]  # Raises KeyError if missing
```

## Security Scanning

- Use **bandit** for static security analysis:
  ```bash
  bandit -r src/
  ```

## Reference

See skill: `django-security` for Django-specific security guidelines (if applicable).
