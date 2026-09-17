---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/CONTEXT.md"
sourceRel: "CONTEXT.md"
rawUrl: "/raw/10-context-memory/get-shit-done/CONTEXT.md"
sourceSha256: "5339f8a1f2c77cfdd65b419f1126cfd9d409f8ad3b5dbe31a8b51a34aff5d7d5"
pageSha256: "d8580a4bdba4c43657d11da6d45fea90bcfb3df7564bca96157ae9cacd5d53ed"
contentMode: "local-full"
zh: ""
---

## Release notes standard

`RELEASE-NOTES.SCOPE=GitHub Releases body for tags vX.Y.Z, vX.Y.Z-rcN; not CHANGELOG.md (changeset workflow owns that)`
`RELEASE-NOTES.DEFAULT-STATE=auto-generated body is "What's Changed" PR list + Full Changelog link; treat as draft, not final`
`RELEASE-NOTES.GATE.hotfix=manual edit required; auto-generated body for vX.Y.\{Z>0\} is "Full Changelog only" and must be replaced with structured body`
`RELEASE-NOTES.GATE.rc=manual edit recommended; auto-generated PR list is acceptable for early RCs but final RC before vX.Y.0 should match standard`
`RELEASE-NOTES.GATE.minor=auto-generated body acceptable when PR titles are clean; promote to structured body when >20 PRs or contains feature+refactor+fix mix`

`RELEASE-NOTES.STANDARD.taxonomy=Keep-a-Changelog 1.1.0: Added | Changed | Deprecated | Removed | Fixed | Security | Documentation`
`RELEASE-NOTES.STANDARD.heading-level=## for category, ### for subgroup (area), - for bullet`
`RELEASE-NOTES.STANDARD.bullet-shape=**Bold user-visible change** — explanation of what was broken or what's new, leading with symptom not implementation. Trailing (#NNN) PR ref.`
`RELEASE-NOTES.STANDARD.subgroups=phase-planning-state | workstream | query-dispatch-cli | code-review | install | capture | docs | architecture | security`
`RELEASE-NOTES.STANDARD.footer.hotfix=Install/upgrade: \`npx get-shit-done-cc@latest\``
`RELEASE-NOTES.STANDARD.footer.rc=Install for testing: \`npx get-shit-done-cc@next\` (per branch->dist-tag policy)`
`RELEASE-NOTES.STANDARD.footer.canary=Install: \`npx get-shit-done-cc@canary\``
`RELEASE-NOTES.STANDARD.footer.full-changelog=**Full Changelog**: https://github.com/gsd-build/get-shit-done/compare/<prev>...<this>`
`RELEASE-NOTES.STANDARD.intro=optional one-paragraph framing for RC/feature releases; omit for pure-fix hotfixes`
