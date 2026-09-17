---
title: "Microsoft Agent Skills"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/skill-creator/SKILL.md"
sourceRel: ".github/skills/skill-creator/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/skills/skill-creator/SKILL.md"
sourceSha256: "15ce951aec071c813150e6794628664725c164223108792e15bd3db18e959da0"
pageSha256: "8f3a2e6d1c2048ace4389ba4990a932fa43d08b19f8d50a4f12e58da1f486e35"
contentMode: "local-full"
zh: ""
---

## Checklist

Before completing a skill:

**Prerequisites:**

- [ ] User provided SDK package name or documentation URL
- [ ] Verified SDK patterns via `microsoft-docs` MCP
- [ ] Verified every snippet's API surface against the current official language-specific API reference for that SDK (Microsoft Learn where available, otherwise the upstream SDK repo — see canonical sources above)

**Skill Creation:**

- [ ] Description includes what AND when (trigger phrases)
- [ ] SKILL.md under 500 lines
- [ ] Authentication follows language rules (`DefaultAzureCredential` for Python/.NET/Java/TS/Go local dev; `DeveloperToolsCredential` local dev + `ManagedIdentityCredential` production for Rust)
- [ ] Includes cleanup/delete in examples
- [ ] References organized by feature (`capabilities.md` index + dedicated deep-dive files)
- [ ] Hero scenarios from the current authoritative docs/samples for that SDK are explicitly covered in snippets and tests
- [ ] At least one high-value non-hero scenario is included when the SDK supports a distinct non-hero scenario (otherwise note that no distinct non-hero scenario applies)
- [ ] For Azure SDK skills, `references/capabilities.md` indexes hero/non-hero coverage and links to dedicated non-hero docs
- [ ] For Azure SDK skills, `references/non-hero-scenarios.md` contains concrete non-hero examples distinct from hero snippets
- [ ] For broad SDKs (especially management SDKs), operation-group coverage is explicit (covered in snippets vs. reference-only)
- [ ] **(Python skills only) Best Practices section contains the two user-facing rules** (sync-or-async consistency + context managers for clients and async credentials), using the variant matched to the skill type
- [ ] For Rust skills: `## Best Practices` starts with cargo dependency rule + `azure_core` direct-import rule

**Categorization:**
