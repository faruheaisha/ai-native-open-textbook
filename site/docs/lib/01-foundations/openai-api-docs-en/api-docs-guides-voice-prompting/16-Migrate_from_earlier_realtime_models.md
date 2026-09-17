---
title: "OpenAI API 文档（英文）"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/voice-prompting.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/voice-prompting.md"
sourceSha256: "5f08b8a5661181c66582baad274d7700e4aba37b4fd02cc2e4b41265a24ea075"
pageSha256: "9258a046460e72a4051ad5576ceee9f62eeb223e261390a94a7090f7231dfe5d"
contentMode: "local-full"
zh: ""
---

## Migrate from earlier realtime models

When migrating from earlier realtime models, treat the prompt as a behavior surface, not just text to port.

1. Use Codex or a strong reasoning model to restructure the prompt around the latest Realtime prompting guidance. Include a link to this prompting guide to ground the migration in best practices.
2. Set reasoning effort to `low` instead of the default. Increase only for workflows that require deeper planning.
3. Audit tool names, parameters, enums, JSON schemas, and other settings to make sure they match the expected implementation.
4. Remove stale examples. Add short examples for happy paths, ambiguity, interruptions, tool calls, and fallback behavior.
5. Compare representative conversations before and after migration. Check for regressions against an existing eval and document intentional behavior changes.
6. Run a final consistency pass. Confirm the prompt clearly separates hard requirements, defaults, tool rules, safety rules, and fallback behavior.
7. Run evals, inspect representative failures, and iterate on the prompt until the target behaviors are reliable.
