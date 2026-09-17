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
pageSha256: "6990686281634ff92e58c9059b0f0b075408f0e66d0106290f681dd1868d831e"
contentMode: "local-full"
zh: ""
---

## Implementation Phases

### Phase 1: Core Extension System ✅ COMPLETED

**Goal**: Basic extension infrastructure

**Deliverables**:

- [x] Extension manifest schema (`extension.yml`)
- [x] Extension directory structure
- [x] CLI commands:
  - [x] `specify extension list`
  - [x] `specify extension add` (from URL and local `--dev`)
  - [x] `specify extension remove`
- [x] Extension registry (`.specify/extensions/.registry`)
- [x] Command registration (Claude and 15+ other agents)
- [x] Basic validation (manifest schema, compatibility)
- [x] Documentation (extension development guide)

**Testing**:

- [x] Unit tests for manifest parsing
- [x] Integration test: Install dummy extension
- [x] Integration test: Register commands with Claude

### Phase 2: Jira Extension ✅ COMPLETED

**Goal**: First production extension

**Deliverables**:

- [x] Create `spec-kit-jira` repository
- [x] Port Jira functionality to extension
- [x] Create `jira-config.yml` template
- [x] Commands:
  - [x] `specstoissues.md`
  - [x] `discover-fields.md`
  - [x] `sync-status.md`
- [x] Helper scripts
- [x] Documentation (README, configuration guide, examples)
- [x] Release v3.0.0

**Testing**:

- [x] Test on `eng-msa-ts` project
- [x] Verify spec→Epic, phase→Story, task→Issue mapping
- [x] Test configuration loading and validation
- [x] Test custom field application

### Phase 3: Extension Catalog ✅ COMPLETED

**Goal**: Discovery and distribution

**Deliverables**:

- [x] Central catalog (`extensions/catalog.json` in spec-kit repo)
- [x] Community catalog (`extensions/catalog.community.json`)
- [x] Catalog fetch and parsing with multi-catalog support
- [x] CLI commands:
  - [x] `specify extension search`
  - [x] `specify extension info`
  - [x] `specify extension catalog list`
  - [x] `specify extension catalog add`
  - [x] `specify extension catalog remove`
- [x] Documentation (how to publish extensions)

**Testing**:

- [x] Test catalog fetch
- [x] Test extension search/filtering
- [x] Test catalog caching
- [x] Test multi-catalog merge with priority

### Phase 4: Advanced Features ✅ COMPLETED

**Goal**: Hooks, updates, multi-agent support

**Deliverables**:

- [x] Hook system (`hooks` in extension.yml)
- [x] Hook registration and execution
- [x] Project extensions config (`.specify/extensions.yml`)
- [x] CLI commands:
  - [x] `specify extension update` (with atomic backup/restore)
  - [x] `specify extension enable/disable`
- [x] Command registration for multiple agents (15+ agents including Claude, Copilot, Gemini, Cursor, etc.)
- [x] Extension update notifications (version comparison)
- [x] Configuration layer resolution (project, local, env)

**Additional features implemented beyond original RFC**:

- [x] **Display name resolution**: All commands accept extension display names in addition to IDs
- [x] **Ambiguous name handling**: User-friendly tables when multiple extensions match a name
- [x] **Atomic update with rollback**: Full backup of extension dir, commands, hooks, and registry with automatic rollback on failure
- [x] **Pre-install ID validation**: Validates extension ID from ZIP before installing (security)
- [x] **Enabled state preservation**: Disabled extensions stay disabled after update
- [x] **Registry update/restore methods**: Clean API for enable/disable and rollback operations
- [x] **Catalog error fallback**: `extension info` falls back to local info when catalog unavailable
- [x] **`_install_allowed` flag**: Discovery-only catalogs can't be used for installation
- [x] **Cache invalidation**: Cache invalidated when `SPECKIT_CATALOG_URL` changes

**Testing**:

- [x] Test hooks in core commands
- [x] Test extension updates (preserve config)
- [x] Test multi-agent registration
- [x] Test atomic rollback on update failure
- [x] Test enabled state preservation
- [x] Test display name resolution

### Phase 5: Polish & Documentation ✅ COMPLETED

**Goal**: Production ready

**Deliverables**:

- [x] Comprehensive documentation:
  - [x] User guide (EXTENSION-USER-GUIDE.md)
  - [x] Extension development guide (EXTENSION-DEV-GUIDE.md)
  - [x] Extension API reference (EXTENSION-API-REFERENCE.md)
- [x] Error messages and validation improvements
- [x] CLI help text updates

**Testing**:

- [x] End-to-end testing on multiple projects
- [x] 163 unit tests passing
