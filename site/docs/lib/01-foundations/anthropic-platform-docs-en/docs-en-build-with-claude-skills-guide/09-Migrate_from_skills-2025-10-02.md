---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/build-with-claude/skills-guide.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/skills-guide.md"
sourceSha256: "920c3ac1bb9cf546c0c32c24f1318aa13e58fb4ebadca36bc8b51ea6bd1fb78f"
pageSha256: "2371c880f88cc72685ca0636d2e5bd654f0f161b0c5d00396a2d9b9203d1b26f"
contentMode: "local-full"
zh: ""
---

## Migrate from `skills-2025-10-02`

The Skills API is out of beta and needs no beta header. Migrating off `skills-2025-10-02` is optional: requests that still send it keep working and keep returning the beta response shapes, so an existing integration keeps working until you change it. Removing the header switches those requests to the shapes documented on this page:

|                                 | With `skills-2025-10-02`                                                        | Without the header                                                                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Skill label                     | `display_title` (up to 64 characters, unique per workspace)                     | `display_name` (up to 255 characters, not unique); derived from the `SKILL.md` `name` when omitted                                                |
| Newest version pointer          | `latest_version`, an epoch-microsecond string such as `"1759178010641129"`      | `latest_version_id`, a version ID such as `"skver_01AbCdEfGhIjKlMnOpQrStUv"`; `GET /v1/skills/\{skill_id\}/versions/latest` resolves it in one call |
| Version identifier in URLs      | Epoch-microsecond string                                                        | Version ID (`skver_...`). IDs captured under the beta with the `skill_version_` prefix are accepted as input.                                     |
| Version object                  | Includes `directory` (always equal to the Skill `name`)                         | No `directory` field                                                                                                                              |
| `source`                        | A string, `"custom"` or `"anthropic"`                                           | An object, for example `\{"type": "custom"\}`; the example catalog value is `"anthropic_example"`                                                   |
| List responses                  | `\{ data, has_more, next_page \}`                                                 | `\{ data, next_page \}`; `limit` from 1 to 1,000 (default 20)                                                                                       |
| Versions list order             | Oldest first                                                                    | Newest first, default `limit` 20. Page cursors from one shape are not valid on the other.                                                         |
| Deleting a Skill                | Returns a 400 error while any version exists                                    | Deletes the Skill and all of its versions                                                                                                         |
| Deleting a Skill's only version | Allowed, leaving a Skill with no versions                                       | Returns a 400 error; upload a replacement version first, or delete the Skill                                                                      |
| Upload layout                   | Files must sit inside a top-level directory whose name matches the Skill `name` | `SKILL.md` may sit at the root of the upload; stored paths are the same either way                                                                |
| Response types                  | `CreateSkillResponse`, `GetSkillResponse`, and one type per operation           | `Skill`, `SkillVersion`, `DeletedSkill`, `DeletedSkillVersion`                                                                                    |

To migrate:

1. **Remove the beta header.** Drop `anthropic-beta: skills-2025-10-02` from your requests. In the SDKs, call `client.skills` instead of `client.beta.skills`; keeping `client.beta.skills` works only on the [SDK releases that no longer send the header](https://platform.claude.com/docs/en/build-with-claude/skills-guide#sdk-beta-namespace). Earlier releases send it from `client.beta.skills` even with no `betas` argument.
2. **Rename fields** in your code: `display_title` to `display_name`, `latest_version` to `latest_version_id`, and read `source.type` instead of comparing `source` to a string.
3. **Use version IDs.** Wherever you stored an epoch-microsecond version, store the version's `id` instead, or use `latest`. Skill references in Messages requests accept a version ID, `latest`, or (for Anthropic Skills) the catalog version.
4. **Review delete calls.** `DELETE /v1/skills/\{skill_id\}` now removes every version with the Skill. If you relied on the beta's refusal as a safeguard, add your own check.

  After migrating, `client.skills.delete(skill_id)` and `client.beta.skills.delete(skill_id)` delete the Skill together with all of its versions in one call.

A Skill whose versions were all deleted under the beta has no current version to return: `GET /v1/skills/\{skill_id\}` returns a 400 error and the Skill is omitted from list responses until you upload a version to it. You can still delete it.

### SDK beta namespace

Starting with Python SDK 1.2.0, TypeScript SDK 0.122.0, Go SDK 1.68.0, Java SDK 2.59.0, Ruby SDK 1.67.0, and C# SDK 12.44.0, `client.beta.skills` no longer sends `skills-2025-10-02` and returns the same shapes as `client.skills`, with `Beta`-prefixed type names (`BetaSkill`, `BetaSkillVersion`, `BetaDeletedSkill`, `BetaDeletedSkillVersion`). It accepts a `betas` argument for Skills features that are still in beta. In the beta Messages types, the container Skill reference type is renamed from `BetaSkill` to `BetaContainerSkill` (same fields: `type`, `skill_id`, `version`); `BetaSkill` now names the Skill resource, matching `Skill` and `ContainerSkill` in the non-beta types. Earlier SDK releases are typed to the beta shapes; if you depend on those types, stay on an earlier release until you migrate.
