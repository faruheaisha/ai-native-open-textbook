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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/USER-GUIDE.md"
sourceRel: "docs/USER-GUIDE.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/USER-GUIDE.md"
sourceSha256: "4550e970e63aa2066ecde7d4f8350d0d1c104699167310213bc4c5a9ca0fb7e4"
pageSha256: "47ba19c426c03a2642563574b27748bdf71bd2e01a9705d0c6755b21822d6d17"
contentMode: "local-full"
zh: ""
---

## Recovery Quick Reference

| Problem                              | Solution                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------ |
| Lost context / new session           | `/gsd-resume-work` or `/gsd-progress`                                    |
| Phase went wrong                     | `git revert` the phase commits, then re-plan                             |
| Need to change scope                 | `/gsd-phase` (default), `/gsd-phase --insert`, or `/gsd-phase --remove`  |
| Something broke                      | `/gsd-debug "description"` (add `--diagnose` for analysis without fixes) |
| STATE.md out of sync                 | `state validate` then `state sync`                                       |
| Workflow state seems corrupted       | `/gsd-forensics`                                                         |
| Quick targeted fix                   | `/gsd-quick`                                                             |
| Plan doesn't match your vision       | `/gsd-discuss-phase [N]` then re-plan                                    |
| Costs running high                   | `/gsd-config --profile budget` and `/gsd-settings` to toggle agents off  |
| Update broke local changes           | `/gsd-update --reapply`                                                  |
| Want session summary for stakeholder | `/gsd-pause-work --report`                                                    |
| Don't know what step is next         | `/gsd-progress --next`                                                              |
| Parallel execution build errors      | Update GSD or set `parallelization.enabled: false`                       |
