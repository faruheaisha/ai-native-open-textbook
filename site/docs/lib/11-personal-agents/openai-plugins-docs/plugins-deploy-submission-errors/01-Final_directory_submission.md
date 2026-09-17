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
pageSha256: "e25aed23bea8c38438b01012a76e03b03e62510aeb14b616079157201aa59343"
contentMode: "local-full"
zh: ""
---

## Final directory submission

A package can pass upload validation and still fail final directory submission.
Final submission uses stricter listing limits and checks MCP configuration,
skill scans, test cases, and policy attestations.

| Field             | Final submission rule                                                                                                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Package name      | Required; at most 64 characters. Start with an ASCII letter or digit and use only ASCII letters, digits, `_`, and `-`.                                                                   |
| Version           | Required; use a semantic version of at most 64 characters.                                                                                                                               |
| Display name      | Required; one line; at most 30 characters.                                                                                                                                               |
| Short description | Required; one line; at most 30 characters.                                                                                                                                               |
| Long description  | Required; at most 4,000 characters. Line breaks are allowed.                                                                                                                             |
| Developer name    | Required; one line; at most 80 characters.                                                                                                                                               |
| Category          | Required; choose a supported category listed in the [Listing and interface errors](#listing-and-interface-errors) section.                                                               |
| Capabilities      | At most 20. Each capability must be non-empty, one line, and at most 120 characters.                                                                                                     |
| Starter prompts   | At most 3. Each prompt must be non-empty, unique after Unicode and whitespace normalization, one line, at most 128 characters, and contain no MCP server `@mention`.                     |
| URLs              | Required for remote MCP submissions; optional for ZIP uploads, for skills-only plugins. Website, support, privacy policy, and terms URLs must use HTTPS and be at most 1,024 characters. |
| Brand colors      | Optional six-digit hex colors. The light color must have at least 2:1 contrast against white, and the dark color must have at least 2:1 contrast against `#212121`.                      |

Every plugin submission also requires:

- Passing safety and security scans for every bundled skill. Scans can take up
  to 2 hours.
- A verified developer or business identity and all required policy
  attestations.

For a remote MCP plugin, final submission also requires:

- Website, support, privacy policy, and terms URLs that meet the rules above.
- A demo-recording URL that shows the main use cases and tools across supported
  platforms.
- Exactly five positive test cases, three negative test cases, and release
  notes.
- A production HTTPS MCP server URL, a completed domain-verification challenge,
  and a successful, current tool scan.
- Explicit `readOnlyHint`, `openWorldHint`, and `destructiveHint` values and a
  justification for each value on every MCP tool.
- Reviewer-ready demo credentials when the server uses OAuth.
- Screenshots only when the MCP server provides custom UI. If you add
  screenshots, provide one PNG or JPEG image for every starter prompt. Each
  screenshot must be exactly 706 pixels wide and 400–860 pixels tall.

### Final metadata errors

In these error names, `subtitle` means short description and `description`
means long description.

| Name                                              | Requirement                                                                                             |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `submission_display_name_required`                | Display name is required, non-empty, and single-line.                                                   |
| `submission_display_name_too_long`                | Display name must be 30 characters or fewer.                                                            |
| `submission_display_name_character_unsupported`   | Display name must use supported text and fit on one line.                                               |
| `submission_subtitle_required`                    | Short description is required, non-empty, and single-line.                                              |
| `submission_subtitle_too_long`                    | Short description must be 30 characters or fewer.                                                       |
| `submission_subtitle_character_unsupported`       | Short description must use supported text and fit on one line.                                          |
| `submission_description_required`                 | Long description is required and must be non-empty. Line breaks are allowed.                            |
| `submission_description_too_long`                 | Long description must be 4,000 characters or fewer.                                                     |
| `submission_description_character_unsupported`    | Long description must use supported text. Line breaks are allowed.                                      |
| `submission_developer_name_required`              | Developer name is required, non-empty, and single-line.                                                 |
| `submission_developer_name_too_long`              | Developer name must be 80 characters or fewer.                                                          |
| `submission_developer_name_character_unsupported` | Developer name must use supported text and fit on one line.                                             |
| `plugin_capability_invalid`                       | Each capability must be non-empty, use supported text, fit on one line, and be 120 characters or fewer. |
| `plugin_default_prompt_mention`                   | Starter prompts must not contain MCP server `@mentions`.                                                |
| `plugin_default_prompt_duplicate`                 | Starter prompts must be unique after Unicode and whitespace normalization.                              |

### MCP and review errors

These errors apply to remote MCP submissions.

| Name                                | Requirement                                                                                                                                                                       |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `annotations_required`              | Every MCP tool must set `readOnlyHint`, `openWorldHint`, and `destructiveHint` accurately.                                                                                        |
| `justification_required`            | Every MCP tool annotation must include a justification for its read-only, open-world, or destructive behavior.                                                                    |
| `scan_required`                     | MCP tools must have a successful, current scan of the production MCP server.                                                                                                      |
| `domain_verification_required`      | The exact verification token must be hosted at the generated `/.well-known/openai-apps-challenge` URL on the MCP host or an allowed parent host, and **Verify Domain** must pass. |
| `frame_domain_explanation_required` | Every external frame domain reported by the MCP tool scan must have an explanation of why the UI needs it and what content it provides.                                           |
| `screenshots_not_allowed`           | Screenshots are allowed only when the current MCP tool scan reports a UI output template.                                                                                         |
