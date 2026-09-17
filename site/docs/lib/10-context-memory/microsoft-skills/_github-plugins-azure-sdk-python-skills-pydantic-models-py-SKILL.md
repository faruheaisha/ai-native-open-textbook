---
title: "Pydantic Models"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/pydantic-models-py/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/pydantic-models-py/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/pydantic-models-py/SKILL.md"
sourceSha256: "a0d914a4de405961e793895e027c43f34ef9306dc544de14ed5d17570c01a315"
pageSha256: "a0d914a4de405961e793895e027c43f34ef9306dc544de14ed5d17570c01a315"
contentMode: "local-full"
zh: ""
---

# Pydantic Models

Create Pydantic models following the multi-model pattern for clean API contracts.

## Quick Start

Copy the template from [assets/template.py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/pydantic-models-py/assets/template.py) and replace placeholders:
- <code v-pre>{{ResourceName}}</code> → PascalCase name (e.g., `Project`)
- <code v-pre>{{resource_name}}</code> → snake_case name (e.g., `project`)

## Multi-Model Pattern

| Model | Purpose |
|-------|---------|
| `Base` | Common fields shared across models |
| `Create` | Request body for creation (required fields) |
| `Update` | Request body for updates (all optional) |
| `Response` | API response with all fields |
| `InDB` | Database document with `doc_type` |

## camelCase Aliases

```python
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

class MyModel(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    workspace_id: str = Field(..., alias="workspaceId")
    created_at: datetime = Field(..., alias="createdAt")
```

## Optional Update Fields

```python
class MyUpdate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    name: Optional[str] = Field(None, min_length=1)
    description: Optional[str] = None
```

## Database Document

```python
class MyInDB(MyResponse):
    doc_type: str = "my_resource"
```

## Integration Steps

1. Create models in `src/backend/app/models/`
2. Export from `src/backend/app/models/__init__.py`
3. Add corresponding TypeScript types

## Reference Files

| File | Contents |
|------|----------|
| [references/capabilities.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-pydantic-models-py-references-capabilities) | Additional non-hero capabilities, operation-group coverage, and production checklists. |
