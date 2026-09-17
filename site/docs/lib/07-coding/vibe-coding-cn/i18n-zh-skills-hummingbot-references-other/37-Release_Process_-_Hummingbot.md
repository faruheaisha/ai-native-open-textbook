---
title: "Vibe Coding CN"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/other.md"
sourceRel: "i18n/zh/skills/hummingbot/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/other.md"
sourceSha256: "7bd57673fc3df5b901db36ae3eac6be136526e8e2dbb141702c9a6ebc26b607a"
pageSha256: "88b95816c306e6558615a49189592c1eb1725a59a12692c716efb619e460f5fa"
contentMode: "local-full"
zh: ""
---

## Release Process - Hummingbot

**URL:** https://hummingbot.org/governance/releases

**Contents:**
- Release Process
- Pull Request Status Board¶
- Review Process¶
- Branches¶
  - development¶
  - staging¶
  - master or main¶

Changes to the Hummingbot and Hummingbot Gateway codebases are made through pull requests, which undergo a thorough engineering and QA review before they are merged into the codebase, coordinated by the Foundation.

Only the following pull requests will be reviewed:

Hummingbot Foundation maintains a Github board in which you can see the status of all active pull requests, including ongoing PRPs, bug fixes, in review, etc.

While approval via HBOT voting signals that the community wants the fix or improvement to be added into the codebase, pull requests go through a series of automated and manual checks to ensure that the new code: * Does not conflict or cause problems with other parts of the codebase * Does not introduce security risks * Does not contain merge conflicts * Contains manual tests, documentation, and meets code quality guidelines * Passes automated testing

The Foundation Quality Assurance (QA) and Engineering team members coordinate this process, assisted by members of the community, such as Technical Review DAO.

After a pull request has been approved, it will go through the following development cycle:

The Hummingbot code repository has three main branches related to the development cycle of each monthly release:

All pull requests aiming to be included on the master branch must be targeted to the development branch. They are then promoted from development to staging before passing to master. Pull requests targeting the development branch will only be merged into staging only when there is an approved PRP related to it.

staging is used by the Foundation QA team to conduct a thorough test all code changes before adding them to the master or main branch.

master is the main release branch and contains the latest stable version of the Hummingbot software client and is released once per month.

Hummingbot Gateway's main branch serves the same purpose.

---

## 

**URL:** https://hummingbot.org/dashboard/deploy-1.png

---

## 

**URL:** https://hummingbot.org/dashboard/portfolio-4.png
