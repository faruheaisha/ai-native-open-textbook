---
title: "Delete Skill Version"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/skills/versions/delete.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/skills/versions/delete.md"
sourceSha256: "f541f02f005ac59e121b82778c0b7cd67f59dfbe3bcadd6b40909939b959a9bb"
pageSha256: "f541f02f005ac59e121b82778c0b7cd67f59dfbe3bcadd6b40909939b959a9bb"
contentMode: "local-full"
zh: ""
---

# Delete Skill Version

**DELETE** `/v1/skills/\{skill_id\}/versions/\{version\}`

Delete Skill Version

## Path parameters

- `skill_id: string`

  Unique identifier for the skill.

  The format and length of IDs may change over time.

- `version: string`

  Identifies the skill version by its version ID.

  Requests carrying the `skills-2025-10-02` beta header address versions by their Unix epoch timestamp instead (e.g., "1759178010641129").

## Headers

- `"anthropic-workspace-id": optional string`

## Returns

- `DeletedSkillVersion object`

  - `type: "skill_version_deleted"`

    Deleted object type.

    For Skill Versions, this is always `"skill_version_deleted"`.

    default: skill_version_deleted

  - `id: string`

    Unique identifier for this Skill Version. The id addresses the version in
    paths and pins it in references.

## Example

```bash
curl https://api.anthropic.com/v1/skills/$SKILL_ID/versions/$VERSION \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

### Response (200)

```json
{
  "id": "id",
  "type": "skill_version_deleted"
}
```
