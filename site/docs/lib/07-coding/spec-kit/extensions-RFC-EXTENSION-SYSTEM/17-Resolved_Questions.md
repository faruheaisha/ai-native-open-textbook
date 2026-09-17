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
pageSha256: "e7033487a452dbe8c6f7ad705683e8af7fb606634dc40e061fe5ac89a5d3b6b1"
contentMode: "local-full"
zh: ""
---

## Resolved Questions

The following questions from the original RFC have been resolved during implementation:

### 1. Extension Namespace ✅ RESOLVED

**Question**: Should extension commands use namespace prefix?

**Decision**: **Option C** - Both prefixed and aliases are supported. Commands use `speckit.\{extension\}.\{command\}` as canonical name, with optional aliases defined in manifest.

**Implementation**: The `aliases` field in `extension.yml` allows extensions to register additional command names.

---

### 2. Config File Location ✅ RESOLVED

**Question**: Where should extension configs live?

**Decision**: **Option A** - Extension directory (`.specify/extensions/\{ext-id\}/\{ext-id\}-config.yml`). This keeps extensions self-contained and easier to manage.

**Implementation**: Each extension has its own config file within its directory, with layered resolution (defaults → project → local → env vars).

---

### 3. Command File Format ✅ RESOLVED

**Question**: Should extensions use universal format or agent-specific?

**Decision**: **Option A** - Universal Markdown format. Extensions write commands once, CLI converts to agent-specific format during registration.

**Implementation**: `CommandRegistrar` class handles conversion to 15+ agent formats (Claude, Copilot, Gemini, Cursor, etc.).

---

### 4. Hook Execution Model ✅ RESOLVED

**Question**: How should hooks execute?

**Decision**: **Option A** - Hooks are registered in `.specify/extensions.yml` and executed by the AI agent when it sees the hook trigger. Hook state (enabled/disabled) is managed per-extension.

**Implementation**: `HookExecutor` class manages hook registration and state in `extensions.yml`.

---

### 5. Extension Distribution ✅ RESOLVED

**Question**: How should extensions be packaged?

**Decision**: **Option A** - ZIP archives downloaded from GitHub releases (via catalog `download_url`). Local development uses `--dev` flag with directory path.

**Implementation**: `ExtensionManager.install_from_zip()` handles ZIP extraction and validation.

---

### 6. Multi-Version Support ✅ RESOLVED

**Question**: Can multiple versions of same extension coexist?

**Decision**: **Option A** - Single version only. Updates replace the existing version with atomic rollback on failure.

**Implementation**: `extension update` performs atomic backup/restore to ensure safe updates.
