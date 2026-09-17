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
pageSha256: "21bc0f95b147aa1ac543012d3c68f84ce3d808329c356da433c4f3f3b69b1718"
contentMode: "local-full"
zh: ""
---

## Anti-Patterns

| Don't                                                                          | Why                                                                                 |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Create skill without SDK context                                               | Users must provide package name/docs URL                                            |
| Put "when to use" in body                                                      | Body loads AFTER triggering                                                         |
| Hardcode credentials                                                           | Security risk                                                                       |
| Skip authentication section                                                    | Agents will improvise poorly                                                        |
| Use outdated SDK patterns                                                      | APIs change; search docs first                                                      |
| Include README.md                                                              | Agents don't need meta-docs                                                         |
| Deeply nest references                                                         | Keep one level deep                                                                 |
| Skip acceptance criteria                                                       | Skills without tests can't be validated                                             |
| Skip symlink categorization                                                    | Skills won't be discoverable by category                                            |
| Use wrong import paths                                                         | Azure SDKs have specific module structures                                          |
| Omit sync/async + context-manager bullets from Best Practices in Python skills | End users won't follow rules that aren't written down; examples alone aren't enough |
| Mix sync and async in the same Python example                                  | Demonstrates the anti-pattern the skill is supposed to prevent                      |
| Ship regenerated skills with zero test scenarios                               | Hero workflows and regressions cannot be validated                                  |
| Claim full API coverage from a single happy-path sample                        | Hides operation-group and non-hero gaps users need for production                   |
| Omit `references/*.md` coverage for non-hero capabilities                      | Forces advanced capabilities out of context and leaves API breadth undocumented     |
