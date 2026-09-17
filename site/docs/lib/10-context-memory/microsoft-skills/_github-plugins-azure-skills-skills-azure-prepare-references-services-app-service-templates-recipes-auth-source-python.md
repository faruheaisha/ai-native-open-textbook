---
title: "Auth Recipe — Python (FastAPI) — REFERENCE ONLY"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/auth/source/python.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/auth/source/python.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/auth/source/python.md"
sourceSha256: "4f56cd8061c275813013c06bc88f4f99405f41da0ac656ccb77aaaf349f00ae7"
pageSha256: "4f56cd8061c275813013c06bc88f4f99405f41da0ac656ccb77aaaf349f00ae7"
contentMode: "local-full"
zh: ""
---

# Auth Recipe — Python (FastAPI) — REFERENCE ONLY

## JWT Validation with PyJWT

### Requirements

Add to `requirements.txt`:

```
PyJWT[crypto]>=2.8
cryptography
fastapi
uvicorn
```

### Token Validation Middleware

Add `auth.py`:

```python
import os
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from jwt import PyJWKClient

security = HTTPBearer()
TENANT_ID = os.environ["AZURE_TENANT_ID"]
CLIENT_ID = os.environ["AZURE_CLIENT_ID"]
