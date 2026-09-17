---
title: "pydantic-models-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/pydantic-models-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/pydantic-models-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/pydantic-models-py/references/capabilities.md"
sourceSha256: "058b0c69796b409f2e8aa174f7fc3978c078eabdd9f2a2e0534a40d9ed824ba1"
pageSha256: "058b0c69796b409f2e8aa174f7fc3978c078eabdd9f2a2e0534a40d9ed824ba1"
contentMode: "local-full"
zh: ""
---

# pydantic-models-py capability coverage

**SDK/package**: `pydantic`

This reference captures additional non-hero capabilities and API breadth so the main `SKILL.md` can stay focused on copy/paste hero flows.

## Hero scenarios covered in SKILL.md

- `Quick Start`
- `Multi-Model Pattern`
- `camelCase Aliases`
- `Optional Update Fields`

## Important non-hero scenarios to include when needed

- `Database Document`
- `Integration Steps`

## API breadth checklist

- Verify field validators (`@field_validator`) and model validators (`@model_validator`) cover all required constraints.
- Confirm serialization behavior: use `model_dump(mode="json")` for JSON-safe output and `model_dump(exclude_unset=True)` for partial updates.
- Include schema generation examples (`model_json_schema()`) when the model drives API contracts or documentation.
- Use `model_validate` when validating an existing dict or object; direct `BaseModel(...)` construction also runs validators and coercion.
- Ensure new code uses Pydantic v2 patterns (`@field_validator`, `model_config`) rather than deprecated v1 patterns (`@validator`, `orm_mode`).
