---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/README.md"
sourceRel: "09-advanced-features/README.md"
rawUrl: "/raw/09-harness/claude-howto/09-advanced-features/README.md"
sourceSha256: "988281137b2d4521b357f46ae4fdd619ac2b8be6a7500cb14375141641efbc65"
pageSha256: "65f691766ae9681160123606c8045b87586245378b47c16337ad706805ecbac4"
contentMode: "local-full"
zh: ""
---

## Managed Settings (Enterprise)

Managed Settings enable enterprise administrators to deploy Claude Code configuration across an organization using platform-native management tools.

### Deployment Methods

| Platform | Method | Since |
|----------|--------|-------|
| macOS | Managed plist files (MDM) | v2.1.51+ |
| Windows | Windows Registry | v2.1.51+ |
| Cross-platform | Managed configuration files | v2.1.51+ |
| Cross-platform | Managed drop-ins (`managed-settings.d/` directory) | v2.1.83+ |

### Managed Drop-ins

Since v2.1.83, administrators can deploy multiple managed settings files into a `managed-settings.d/` directory. Files are merged in alphabetical order, allowing modular configuration across teams:

```
~/.claude/managed-settings.d/
  00-org-defaults.json
  10-team-policies.json
  20-project-overrides.json
```

### Available Managed Settings

| Setting | Description |
|---------|-------------|
| `disableBypassPermissionsMode` | Prevent users from enabling bypass permissions |
| `availableModels` | Restrict which models users can select |
| `enforceAvailableModels` | (v2.1.175) When `true`, the `availableModels` allowlist *also* constrains the **Default** model — if the configured default is not in the list, Claude Code falls back to the first allowed model. User and project settings can no longer widen a managed `availableModels` list. |
| `allowedChannelPlugins` | Control which channel plugins are permitted |
| `autoMode.environment` | Configure trusted infrastructure for auto mode |
| `workflowSizeGuideline` | (v2.1.219) Set the advisory [dynamic workflow size guideline](#dynamic-workflows). Readable from any settings file, not just managed settings; while one sets it, the **Dynamic workflow size** row is hidden from `/config` |
| `wslInheritsWindowsSettings` | Windows/WSL only (v2.1.118+): when `true`, Claude Code running inside WSL inherits managed settings from the Windows host, so enterprise policies deployed via Registry/MDM apply uniformly across the Windows and WSL shells |
| `parentSettingsBehavior` | (v2.1.133+, admin-tier) Controls how the SDK's `managedSettings` merges with parent-process settings. `"first-wins"` keeps existing precedence (earlier setting wins on conflict); `"merge"` deep-merges values. |
| Custom policies | Organization-specific permission and tool policies |

### Example: macOS Plist

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>disableBypassPermissionsMode</key>
  <true/>
  <key>availableModels</key>
  <array>
    <string>claude-sonnet-4-6</string>
    <string>claude-haiku-4-5</string>
  </array>
</dict>
</plist>
```
