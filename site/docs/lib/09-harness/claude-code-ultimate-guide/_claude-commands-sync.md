---
title: "Synchronization Check"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/.claude/commands/sync.md"
sourceRel: ".claude/commands/sync.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/.claude/commands/sync.md"
sourceSha256: "4af05ec71829d72dba565722175d0c34225e73bc87ccf82473d6687c3415e0b0"
pageSha256: "4af05ec71829d72dba565722175d0c34225e73bc87ccf82473d6687c3415e0b0"
contentMode: "local-full"
zh: ""
---

# Synchronization Check

Run comprehensive sync verification between guide repository and landing site.

## What to Check

Execute `./scripts/check-landing-sync.sh` and display results with enhanced formatting.

## Output Format

```
🔄 Guide ↔ Landing Synchronization Check

═══════════════════════════════════════════════════════════

1️⃣ Guide Version
   Guide:   3.9.11
   Landing: 3.9.11
   Status:  ✅ Synchronized

2️⃣ Templates Count
   Guide Files:      65
   Landing (index):  65
   Landing (examples): 65
   Status:  ✅ Synchronized

3️⃣ Quiz Questions
   Source (JSON):     227
   Landing (index):   227
   Landing (quiz):    227
   Status:  ✅ Synchronized

4️⃣ Guide Lines
   Actual Count:      11,560
   Landing Display:   11,000+ (approximate)
   Status:  ✅ Within Tolerance

5️⃣ Claude Code Version
   Releases YAML:     v2.1.14
   Landing Badge:     v2.1.14
   Status:  ✅ Synchronized

═══════════════════════════════════════════════════════════

✅ All Components Synchronized

No action required. Guide and landing site are in sync.
```

## If Mismatches Detected

```
🔄 Guide ↔ Landing Synchronization Check

═══════════════════════════════════════════════════════════

1️⃣ Guide Version
   [... as above ...]

2️⃣ Templates Count
   Guide Files:      65
   Landing (index):  63
   Landing (examples): 65
   Status:  ⚠️ MISMATCH

3️⃣ Quiz Questions
   [... etc ...]

═══════════════════════════════════════════════════════════

❌ Synchronization Issues Detected (1 issue)

Issues to Fix:

1. Templates Count Mismatch
   Location: claude-code-ultimate-guide-landing/index.html
   Current:  63
   Expected: 65
   Action:   Update badge and meta tags with correct count

Quick Fixes:
   # Update landing templates count
   cd /Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide-landing
   # Edit index.html lines: 6, 9, 188, 204, 455
   # Change "63 templates" → "65 templates"
   git add index.html
   git commit -m "fix: sync templates count (63 → 65)"
   git push

Recommended:
   Run /update-infos-release to automate synchronization
```

## Implementation

1. Execute sync check script
2. Capture output and parse status codes
3. Format results with clear visual hierarchy
4. If issues detected:
   - List each mismatch
   - Provide file locations
   - Suggest exact fixes
   - Recommend automation commands
5. Color-code status indicators
6. Add actionable next steps

## Related Commands

- `/update-infos-release` - Automated sync + version management
- `/version` - View current versions
- `/changelog` - View recent CHANGELOG entries
