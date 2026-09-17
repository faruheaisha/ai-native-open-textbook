---
title: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/RFC-EXTENSION-SYSTEM.md"
sourceRel: "extensions/RFC-EXTENSION-SYSTEM.md"
rawUrl: "/raw/07-coding/spec-kit/extensions/RFC-EXTENSION-SYSTEM.md"
sourceSha256: "5947ce6c3e36a91188a44748eaa424e512cef6d1069d9e5b7c61904b4df102eb"
pageSha256: "66dbeea7a6899e12dfa6765898e66e640a9ef8ae641ac7a32af6c8638ecb3a24"
contentMode: "local-full"
zh: ""
---

## Migration Strategy

### Backward Compatibility

**Goal**: Existing spec-kit projects work without changes.

**Strategy**:

1. **Core commands unchanged**: `/speckit.tasks`, `/speckit.implement`, etc. remain in core

2. **Optional extensions**: Users opt-in to extensions

3. **Gradual migration**: Existing `taskstoissues` stays in core, Jira extension is alternative

4. **Deprecation timeline**:
   - **v0.2.0**: Introduce extension system, keep core `taskstoissues`
   - **v0.3.0**: Mark core `taskstoissues` as "legacy" (still works)
   - **v1.0.0**: Consider removing core `taskstoissues` in favor of extension

### Migration Path for Users

**Scenario 1**: User has no `taskstoissues` usage

- No migration needed, extensions are opt-in

**Scenario 2**: User uses core `taskstoissues` (GitHub Issues)

- Works as before
- Optional: Migrate to `github-projects` extension for more features

**Scenario 3**: User wants Jira (new requirement)

- `specify extension add jira`
- Configure and use

**Scenario 4**: User has custom scripts calling `taskstoissues`

- Scripts still work (core command preserved)
- Migration guide shows how to call extension commands instead

### Extension Migration Guide

**For extension authors** (if core command becomes extension):

```bash
# Old (core command)
/speckit.taskstoissues

# New (extension command)
specify extension add github-projects
/speckit.github.taskstoissues
```

**Migration alias** (if needed):

```yaml
# extension.yml
provides:
  commands:
    - name: "speckit.github.taskstoissues"
      file: "commands/taskstoissues.md"
      aliases: ["speckit.github.sync-taskstoissues"]  # Alternate namespaced entry point
```

AI agents register both names, so callers can migrate to the alternate alias without relying on deprecated global shortcuts like `/speckit.taskstoissues`.
