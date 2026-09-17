---
title: "Claude Code Guide（zebbern）"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/client-localstorage-schema.md"
sourceRel: "skills/react-best-practices/rules/client-localstorage-schema.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/client-localstorage-schema.md"
sourceSha256: "3dfb817d9027f0f942c6d595df956f22b2f4ced603d20ceb73e39396c0c68c1b"
pageSha256: "3dfb817d9027f0f942c6d595df956f22b2f4ced603d20ceb73e39396c0c68c1b"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Version and Minimize localStorage Data

Add version prefix to keys and store only needed fields. Prevents schema conflicts and accidental storage of sensitive data.

**Incorrect:**

```typescript
// No version, stores everything, no error handling
localStorage.setItem("userConfig", JSON.stringify(fullUserObject))
const data = localStorage.getItem("userConfig")
```

**Correct:**

```typescript
const VERSION = "v2"

function saveConfig(config: { theme: string; language: string }) {
  try {
    localStorage.setItem(`userConfig:${VERSION}`, JSON.stringify(config))
  } catch {
    // Throws in incognito/private browsing, quota exceeded, or disabled
  }
}

function loadConfig() {
  try {
    const data = localStorage.getItem(`userConfig:${VERSION}`)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

// Migration from v1 to v2
function migrate() {
  try {
    const v1 = localStorage.getItem("userConfig:v1")
    if (v1) {
      const old = JSON.parse(v1)
      saveConfig({ theme: old.darkMode ? "dark" : "light", language: old.lang })
      localStorage.removeItem("userConfig:v1")
    }
  } catch {}
}
```

**Store minimal fields from server responses:**

```typescript
// User object has 20+ fields, only store what UI needs
function cachePrefs(user: FullUser) {
  try {
    localStorage.setItem(
      "prefs:v1",
      JSON.stringify({
        theme: user.preferences.theme,
        notifications: user.preferences.notifications,
      })
    )
  } catch {}
}
```

**Always wrap in try-catch:** `getItem()` and `setItem()` throw in incognito/private browsing (Safari, Firefox), when quota exceeded, or when disabled.

**Benefits:** Schema evolution via versioning, reduced storage size, prevents storing tokens/PII/internal flags.
