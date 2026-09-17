---
title: "FastAPI Router"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/fastapi-router-py/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/fastapi-router-py/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/fastapi-router-py/SKILL.md"
sourceSha256: "a8c5911b2c67af768af99d0a1972e16c364ddd8194506d574ae90f375dca6bdf"
pageSha256: "a8c5911b2c67af768af99d0a1972e16c364ddd8194506d574ae90f375dca6bdf"
contentMode: "local-full"
zh: ""
---

# FastAPI Router

Create FastAPI routers following established patterns with proper authentication, response models, and HTTP status codes.

## Quick Start

Copy the template from [assets/template.py](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/fastapi-router-py/assets/template.py) and replace placeholders:
- <code v-pre>{{ResourceName}}</code> → PascalCase name (e.g., `Project`)
- <code v-pre>{{resource_name}}</code> → snake_case name (e.g., `project`)
- <code v-pre>{{resource_plural}}</code> → plural form (e.g., `projects`)

## Authentication Patterns

```python
# Optional auth - returns None if not authenticated
current_user: Optional[User] = Depends(get_current_user)

# Required auth - raises 401 if not authenticated
current_user: User = Depends(get_current_user_required)
```

## Response Models

```python
@router.get("/items/{item_id}", response_model=Item)
async def get_item(item_id: str) -> Item:
    ...

@router.get("/items", response_model=list[Item])
async def list_items() -> list[Item]:
    ...
```

## HTTP Status Codes

```python
@router.post("/items", status_code=status.HTTP_201_CREATED)
async def create_item(item: ItemCreate) -> Item:
  ...

@router.delete("/items/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(id: str) -> None:
  ...
```

## Integration Steps

1. Create router in `src/backend/app/routers/`
2. Mount in `src/backend/app/main.py`
3. Create corresponding Pydantic models
4. Create service layer if needed
5. Add frontend API functions

## Best Practices

1. **Pick `def` or `async def` per endpoint based on whether you call async I/O; do not call blocking I/O from an `async def` handler.**
2. **Manage long-lived resources (DB pools, HTTP clients) in `lifespan` and inject via `Depends`;** use `with`/`async with` for per-request resources.

## Reference Files

| File | Contents |
|------|----------|
| [references/capabilities.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-fastapi-router-py-references-capabilities) | Additional non-hero capabilities, operation-group coverage, and production checklists. |
