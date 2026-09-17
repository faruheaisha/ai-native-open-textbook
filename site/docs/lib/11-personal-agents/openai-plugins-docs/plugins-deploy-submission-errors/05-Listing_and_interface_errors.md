---
title: "openai-plugins-docs"
sourceId: "11-personal-agents/openai-plugins-docs"
sourceTitle: "openai-plugins-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "11-personal-agents"
sourceUrl: "https://developers.openai.com/plugins"
entryUrl: "https://developers.openai.com/plugins"
sourceRel: "plugins/deploy/submission-errors.md"
rawUrl: "/raw/11-personal-agents/openai-plugins-docs/plugins/deploy/submission-errors.md"
sourceSha256: "c475dca167f14136260f331f35c506f730e1c93d226a3ec5ebe9ce1e385f2380"
pageSha256: "ba570f31b60cb89f2c13608e5669011e81822150eed0a34ba771a8b88793759b"
contentMode: "local-full"
zh: ""
---

## Listing and interface errors

The plugin manifest's `interface` object defines the public listing shown to
users. It lives in `.codex-plugin/plugin.json` and uses fields such as
`displayName` and `shortDescription`:

```json
{
  "interface": {
    "displayName": "Example Plugin",
    "shortDescription": "Summarize documents",
    "longDescription": "Summarize and organize documents.",
    "developerName": "Example",
    "category": "Productivity",
    "capabilities": ["Summarize documents"]
  }
}
```

The four listing URLs (website, privacy policy, terms, and support) are
optional for ZIP uploads, for skills-only
plugins. They are required for remote MCP submissions. Their length limit is
2,048 characters for package validation and 1,024 characters for final
directory submission.

| Name                                             | Requirement                                                                                                                                                                                                                                     |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugin_interface_wrong_type`                    | The plugin manifest's `interface` field must be a JSON object.                                                                                                                                                                                  |
| `plugin_display_name_wrong_type`                 | `interface.displayName` must be a string.                                                                                                                                                                                                       |
| `plugin_display_name_empty`                      | `interface.displayName` is required and must be non-empty.                                                                                                                                                                                      |
| `plugin_display_name_too_long`                   | `interface.displayName` must be 80 characters or fewer for package validation and 30 characters or fewer for final directory submission.                                                                                                        |
| `plugin_display_name_character_unsupported`      | `interface.displayName` must use supported text.                                                                                                                                                                                                |
| `plugin_short_description_missing`               | `interface.shortDescription` is required, must fit on one line, and must be 240 characters or fewer for package validation and 30 characters or fewer for final directory submission.                                                           |
| `plugin_short_description_wrong_type`            | `interface.shortDescription` must be a string.                                                                                                                                                                                                  |
| `plugin_short_description_empty`                 | `interface.shortDescription` must be non-empty.                                                                                                                                                                                                 |
| `plugin_short_description_too_long`              | `interface.shortDescription` must be 240 characters or fewer for package validation and 30 characters or fewer for final directory submission.                                                                                                  |
| `plugin_short_description_character_unsupported` | `interface.shortDescription` must use supported text.                                                                                                                                                                                           |
| `plugin_long_description_wrong_type`             | `interface.longDescription` must be a string.                                                                                                                                                                                                   |
| `plugin_long_description_empty`                  | `interface.longDescription` is required and must be non-empty.                                                                                                                                                                                  |
| `plugin_long_description_too_long`               | `interface.longDescription` must be 4,000 characters or fewer.                                                                                                                                                                                  |
| `plugin_long_description_character_unsupported`  | `interface.longDescription` must use supported text. Line breaks are allowed.                                                                                                                                                                   |
| `plugin_developer_name_wrong_type`               | `interface.developerName` must be a string.                                                                                                                                                                                                     |
| `plugin_developer_name_empty`                    | `interface.developerName` is required and must be non-empty.                                                                                                                                                                                    |
| `plugin_developer_name_too_long`                 | `interface.developerName` must be 120 characters or fewer for package validation and 80 characters or fewer for final directory submission.                                                                                                     |
| `plugin_developer_name_character_unsupported`    | `interface.developerName` must use supported text.                                                                                                                                                                                              |
| `plugin_category_wrong_type`                     | `interface.category` must be a string.                                                                                                                                                                                                          |
| `plugin_category_empty`                          | `interface.category` must be non-empty when provided; omit it to use `Other`.                                                                                                                                                                   |
| `plugin_category_unknown`                        | `interface.category` must be `Productivity`, `Creativity`, `Developer Tools`, `Business & Operations`, `Data & Analytics`, `Communication`, `Education & Research`, `Security`, `Finance`, `Healthcare`, `Travel`, `Entertainment`, or `Other`. |
| `plugin_category_character_unsupported`          | `interface.category` must use supported text.                                                                                                                                                                                                   |
| `plugin_capabilities_wrong_type`                 | `interface.capabilities` must be a list of strings.                                                                                                                                                                                             |
| `plugin_capabilities_too_many`                   | `interface.capabilities` must contain 20 entries or fewer.                                                                                                                                                                                      |
| `plugin_capability_wrong_type`                   | Each `interface.capabilities` entry must be a string.                                                                                                                                                                                           |
| `plugin_capability_empty`                        | Each `interface.capabilities` entry must be non-empty when provided.                                                                                                                                                                            |
| `plugin_capability_too_long`                     | Each `interface.capabilities` entry must be 120 characters or fewer.                                                                                                                                                                            |
| `plugin_capability_character_unsupported`        | Each `interface.capabilities` entry must use supported text.                                                                                                                                                                                    |
| `plugin_website_url_wrong_type`                  | `interface.websiteURL` must be a string when provided.                                                                                                                                                                                          |
| `plugin_website_url_empty`                       | `interface.websiteURL` must be non-empty when provided.                                                                                                                                                                                         |
| `plugin_website_url_format`                      | `interface.websiteURL` must be an HTTPS URL.                                                                                                                                                                                                    |
| `plugin_website_url_too_long`                    | `interface.websiteURL` must meet the listing URL length limits.                                                                                                                                                                                 |
| `plugin_privacy_policy_url_wrong_type`           | `interface.privacyPolicyURL` must be a string when provided.                                                                                                                                                                                    |
| `plugin_privacy_policy_url_empty`                | `interface.privacyPolicyURL` must be non-empty when provided.                                                                                                                                                                                   |
| `plugin_privacy_policy_url_format`               | `interface.privacyPolicyURL` must be an HTTPS URL.                                                                                                                                                                                              |
| `plugin_privacy_policy_url_too_long`             | `interface.privacyPolicyURL` must meet the listing URL length limits.                                                                                                                                                                           |
| `plugin_terms_of_service_url_wrong_type`         | `interface.termsOfServiceURL` must be a string when provided.                                                                                                                                                                                   |
| `plugin_terms_of_service_url_empty`              | `interface.termsOfServiceURL` must be non-empty when provided.                                                                                                                                                                                  |
| `plugin_terms_of_service_url_format`             | `interface.termsOfServiceURL` must be an HTTPS URL.                                                                                                                                                                                             |
| `plugin_terms_of_service_url_too_long`           | `interface.termsOfServiceURL` must meet the listing URL length limits.                                                                                                                                                                          |
| `plugin_support_url_wrong_type`                  | `interface.supportURL` must be a string when provided.                                                                                                                                                                                          |
| `plugin_support_url_empty`                       | `interface.supportURL` must be non-empty when provided.                                                                                                                                                                                         |
| `plugin_support_url_format`                      | `interface.supportURL` must be an HTTPS URL.                                                                                                                                                                                                    |
| `plugin_support_url_too_long`                    | `interface.supportURL` must meet the listing URL length limits.                                                                                                                                                                                 |
| `plugin_homepage_wrong_type`                     | `homepage` must be a string when provided.                                                                                                                                                                                                      |
| `plugin_homepage_empty`                          | `homepage` must be non-empty when provided.                                                                                                                                                                                                     |
| `plugin_homepage_format`                         | `homepage` must be an HTTPS URL.                                                                                                                                                                                                                |
| `plugin_homepage_too_long`                       | `homepage` must be 2,048 characters or fewer.                                                                                                                                                                                                   |
| `plugin_brand_color_wrong_type`                  | `interface.brandColor` must be a string when provided.                                                                                                                                                                                          |
| `plugin_brand_color_empty`                       | `interface.brandColor` must be non-empty when provided.                                                                                                                                                                                         |
| `plugin_brand_color_format`                      | `interface.brandColor` must be a six-digit hex color, such as `#1ABCFE`.                                                                                                                                                                        |
| `plugin_brand_color_dark_wrong_type`             | `interface.brandColorDark` must be a string when provided.                                                                                                                                                                                      |
| `plugin_brand_color_dark_empty`                  | `interface.brandColorDark` must be non-empty when provided.                                                                                                                                                                                     |
| `plugin_brand_color_dark_format`                 | `interface.brandColorDark` must be a six-digit hex color, such as `#1ABCFE`.                                                                                                                                                                    |
| `plugin_brand_color_contrast`                    | `interface.brandColor` must have at least 2:1 contrast against white.                                                                                                                                                                           |
| `plugin_brand_color_dark_contrast`               | `interface.brandColorDark` must have at least 2:1 contrast against `#212121`.                                                                                                                                                                   |
| `plugin_default_prompt_wrong_type`               | `interface.defaultPrompt` must be a string or list of strings.                                                                                                                                                                                  |
| `plugin_default_prompt_too_many`                 | `interface.defaultPrompt` must contain at most three prompts.                                                                                                                                                                                   |
| `plugin_default_prompt_entry_wrong_type`         | Each `interface.defaultPrompt` entry must be a string.                                                                                                                                                                                          |
| `plugin_default_prompt_empty`                    | Each `interface.defaultPrompt` entry must be non-empty when provided.                                                                                                                                                                           |
| `plugin_default_prompt_too_long`                 | Each `interface.defaultPrompt` entry must be 512 characters or fewer for package validation and 128 characters or fewer for final directory submission.                                                                                         |
| `plugin_default_prompt_character_unsupported`    | Each `interface.defaultPrompt` entry must use supported text and fit on one line.                                                                                                                                                               |
