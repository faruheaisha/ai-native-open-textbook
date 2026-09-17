---
title: "Delete Skill"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/skills/delete.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/skills/delete.md"
sourceSha256: "aa846c61c32f688c9c27e36af96a9c6dd3449cb017723d3aecf663410b0e8790"
pageSha256: "aa846c61c32f688c9c27e36af96a9c6dd3449cb017723d3aecf663410b0e8790"
contentMode: "local-full"
zh: ""
---

# Delete Skill

**DELETE** `/v1/skills/\{skill_id\}`

Delete Skill

## Path parameters

- `skill_id: string`

  Unique identifier for the skill.

  The format and length of IDs may change over time.

## Headers

- `"anthropic-workspace-id": optional string`

## Returns

- `DeletedSkill object`

  - `type: "skill_deleted"`

    Deleted object type.

    For Skills, this is always `"skill_deleted"`.

    default: skill_deleted

  - `id: string`

    Unique identifier for the skill.

    The format and length of IDs may change over time.

## Example

```bash
curl https://api.anthropic.com/v1/skills/$SKILL_ID \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

### Response (200)

```json
{
  "id": "skill_01JAbcdefghijklmnopqrstuvw",
  "type": "skill_deleted"
}
```
