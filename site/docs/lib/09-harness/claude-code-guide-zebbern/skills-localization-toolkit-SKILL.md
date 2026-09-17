---
title: "I18n Expert"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/localization-toolkit/SKILL.md"
sourceRel: "skills/localization-toolkit/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/localization-toolkit/SKILL.md"
sourceSha256: "c4f1e62132ddc0eaf7ead6097bc4b3e2565718cb1f98c648904601cb62b8c571"
pageSha256: "c4f1e62132ddc0eaf7ead6097bc4b3e2565718cb1f98c648904601cb62b8c571"
contentMode: "local-full"
zh: ""
---

# I18n Expert

## Overview

Deliver a complete i18n setup + audit pass: configure the i18n framework, replace user-facing strings with keys, ensure locale parity, and validate pluralization/formatting for en-US and zh-CN.

## Core Capabilities

- Library selection and setup (React, Next.js, Vue).
- Key architecture and locale file organization.
- Translation generation and quality strategy (AI, professional, manual).
- Routing and language detection/switching.
- SEO and metadata localization (when applicable).
- RTL support (only if RTL locales are in scope).

## Scope Inputs (ask if unclear)

- Framework and routing style.
- Existing i18n state (none, partial, legacy).
- Target locales (default: en-US + zh-CN).
- Translation quality needs (AI vs professional vs manual).
- Locale formats in use (JSON, YAML, PO, XLIFF).
- Formality/cultural requirements (if any).

## Workflow (Audit -> Fix -> Validate)

1) Confirm scope and locale targets
- Identify the i18n framework and locale locations.
- Confirm locales; default to en-US + zh-CN when specified.

2) Setup i18n baseline (if missing)
- Choose a framework-appropriate library (e.g., React: react-i18next; Next.js: next-intl; Vue: vue-i18n).
- Install packages and create the i18n entry/config file.
- Wire the provider at the app root and load locale resources.
- Add a language switcher and persistence (route/param/localStorage) as appropriate.
- Establish locale file layout and key namespaces.
- If routing is locale-aware, define the locale segment strategy early (subpath, subdomain, query param).
 - If metadata is user-facing, include translation for titles/descriptions.

3) Audit key usage and locale parity
- Run:
  ```bash
