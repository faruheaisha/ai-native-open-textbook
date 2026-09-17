---
title: "API Documentation Generator"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/01-slash-commands/generate-api-docs.md"
sourceRel: "01-slash-commands/generate-api-docs.md"
rawUrl: "/raw/09-harness/claude-howto/01-slash-commands/generate-api-docs.md"
sourceSha256: "b7068f984fdfaf3d16865b50157922151f5b8e520d927cdbe9ffaef25ef5a960"
pageSha256: "b7068f984fdfaf3d16865b50157922151f5b8e520d927cdbe9ffaef25ef5a960"
contentMode: "local-full"
zh: ""
---

# API Documentation Generator

Generate API documentation by:

1. Scanning all files in `/src/api/`
2. Extracting function signatures and JSDoc comments
3. Organizing by endpoint/module
4. Creating markdown with examples
5. Including request/response schemas
6. Adding error documentation

Output format:
- Markdown file in `/docs/api.md`
- Include curl examples for all endpoints
- Add TypeScript types

---
**Last Updated**: August 4, 2026
**Claude Code Version**: 2.1.220
**Sources**:
- https://code.claude.com/docs/en/commands
**Compatible Models**: Claude Fable 5, Claude Opus 5, Claude Sonnet 5, Claude Sonnet 4.6, Claude Opus 4.8, Claude Haiku 4.5
