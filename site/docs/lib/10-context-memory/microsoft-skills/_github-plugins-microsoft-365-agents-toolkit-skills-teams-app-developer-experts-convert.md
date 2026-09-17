---
title: "convert-router"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/convert/index.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/convert/index.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/convert/index.md"
sourceSha256: "131e12c4d2db4140cff59a4256778b0b78297394f75fa56f8f3b46c54763b882"
pageSha256: "131e12c4d2db4140cff59a4256778b0b78297394f75fa56f8f3b46c54763b882"
contentMode: "local-full"
zh: ""
---

# convert-router

## purpose

Route language-conversion tasks to the minimal set of micro-expert files. Each expert covers rewriting source code from one language into idiomatic TypeScript.

## task clusters

### JS → TypeScript
When: converting JavaScript files to TypeScript, adding types, modernizing imports, enabling strict mode
Read:
- `js-to-ts-ts.md`
Depends on: `type-mapping-ts.md` (type system reference)

### Ruby → TypeScript
When: rewriting Ruby code in TypeScript, translating Ruby idioms, converting gems to npm
Read:
- `ruby-to-ts-ts.md`
- `dependency-mapping-ts.md`
Depends on: `type-mapping-ts.md` (type system reference)

### Java → TypeScript
When: rewriting Java code in TypeScript, translating Java OOP patterns, Lombok annotations, CompletableFuture async, converting Maven/Gradle deps to npm
Read:
- `java-to-ts-ts.md`
- `json-serialization-ts.md`
- `dependency-mapping-ts.md`
Depends on: `type-mapping-ts.md` (type system reference)

### Kotlin → TypeScript
When: rewriting Kotlin code in TypeScript, trailing lambdas, SAM conversions, `it` implicit parameter, string templates, `trimIndent()`, null-safety operators (`?.`, `!!`, `?:`), `when` expressions, extension functions, data classes, companion objects, sealed classes, `::class.java` references
Read:
- `kotlin-to-ts-ts.md`
- `java-to-ts-ts.md` (Kotlin uses Java SDK types)
- `dependency-mapping-ts.md`
Depends on: `type-mapping-ts.md` (type system reference)

### JSON serialization conversion
When: converting Gson/Jackson serialization to TypeScript JSON + Zod, polymorphic deserialization, @SerializedName mapping
Read:
- `json-serialization-ts.md`
Depends on: `type-mapping-ts.md` (type system reference)

### Bulk/large-scale conversion
When: converting 50+ source files, planning phased conversion, tracking progress across many files
Read:
- `bulk-conversion-strategy-ts.md`
Depends on: The appropriate language-specific expert

### Cross-language dependency mapping
When: finding npm equivalents for gems, Maven artifacts, or pip packages
Read:
- `dependency-mapping-ts.md`

### Cross-language type mapping
When: translating type systems between languages, mapping nullable/generic/enum patterns to TypeScript
Read:
- `type-mapping-ts.md`

### Composite: Full language conversion
When: complete end-to-end source rewrite from any supported language to TypeScript
Read:
- The appropriate language-specific expert (`js-to-ts-ts.md`, `ruby-to-ts-ts.md`, `java-to-ts-ts.md`, or `kotlin-to-ts-ts.md`)
- `json-serialization-ts.md` (if Java source with Gson/Jackson)
- `bulk-conversion-strategy-ts.md` (if 50+ source files)
- `dependency-mapping-ts.md`
- `type-mapping-ts.md`
Cross-domain deps: If also bridging platforms, pair with `../bridge/index.md` for Slack↔Teams or AWS↔Azure concerns.

## combining rule

If a request involves **language conversion** and **platform bridging**, read the language-specific expert here first (to rewrite the source), then route through `../bridge/index.md` for platform-specific mapping.

## file inventory

`bulk-conversion-strategy-ts.md` | `dependency-mapping-ts.md` | `java-to-ts-ts.md` | `js-to-ts-ts.md` | `json-serialization-ts.md` | `kotlin-to-ts-ts.md` | `ruby-to-ts-ts.md` | `type-mapping-ts.md`
