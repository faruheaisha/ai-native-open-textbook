---
title: "Chapter 9: Functional Testing and Automation"
sourceId: "07-coding/vibe-vibe"
sourceTitle: "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/vibe-vibe"
entryUrl: "https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/en/Advanced/09-testing-automation/index.md"
sourceRel: "docs/en/Advanced/09-testing-automation/index.md"
rawUrl: "/raw/07-coding/vibe-vibe/docs/en/Advanced/09-testing-automation/index.md"
sourceSha256: "af830b15698091d3ead09dd401287c6ddce56d0f94fb841f98b848f3f4968b26"
pageSha256: "af830b15698091d3ead09dd401287c6ddce56d0f94fb841f98b848f3f4968b26"
contentMode: "local-full"
zh: ""
---

# Chapter 9: Functional Testing and Automation

![img](https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/vibe-vibe/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/public/images/Advanced/mll04yup-21b2fa96acf26358.jpg)

## Preface

Xiaoming's "Personal Douban" was starting to look pretty solid. The user system was working end to end, CRUD was fine, and basic security protections were in place. He decided to add a long-awaited feature: movie ratings. Users could give each movie 1 to 5 stars, and the page would display the average score.

The feature wasn't complicated. He told Claude Code what he needed, and it was up and running quickly—click stars, submit, and the average score appeared on the page. He tested it himself a few times, found no issues, and was very satisfied.

The next day, a friend sent him a message: "Search is broken. When I enter a keyword and click search, the page just goes blank."

Xiaoming was completely confused. He had only worked on the rating feature yesterday and hadn't touched search at all. He opened the code and found that the new data query function added for ratings had modified a shared database query module—and the search feature depended on that module too. While changing ratings, he had accidentally broken search.

It took him half an hour to fix search. The next day, someone else said, "The movie details page won't open." He investigated and discovered that while fixing search yesterday, he had accidentally changed the routing configuration. He fixed the details page, then tested everything himself that night—and the rating feature itself was broken again.

Three days, three bugs, and each one was introduced while fixing the previous one. He was playing "whack-a-mole"—hammer one down, and another pops up right next to it.

Seeing him overwhelmed and frazzled, the veteran said: "What you need isn't faster reaction time, but a safety net. Imagine that every time you finish changing code, something automatically checks all your features for you—does search still work? Can the details page still open? Are ratings still working properly? If anything breaks, it tells you immediately. You don't have to wait for friends to report bugs. The moment you finish changing code, you'll know whether you accidentally broke something else."

Xiaoming asked, "What's that called?"

The veteran replied, "Automated testing."

---

Starting from Xiaoming's "whack-a-mole" dilemma, this chapter will help you understand the core value of testing, master practical API and E2E testing methods, and ultimately build an automated workflow—so the machine can remember to "check every time" for you.

## Sections in This Chapter

| Section | Content |
|------|------|
| [9.1 Why Testing Is Necessary](/lib/07-coding/vibe-vibe/docs-en-Advanced-09-testing-automation-01-testing-strategy) | Regression testing, the testing pyramid, when to automate, and the right way to use AI-assisted testing |
| [9.2 API Testing and E2E Testing](/lib/07-coding/vibe-vibe/docs-en-Advanced-09-testing-automation-02-api-and-e2e-testing) | Hands-on API testing, Playwright E2E testing, flaky test troubleshooting, and reading logs |
| [9.3 Automated Workflow](/lib/07-coding/vibe-vibe/docs-en-Advanced-09-testing-automation-03-automation-workflow) | Git Hooks, GitHub Actions CI, TDD basics, and test maturity |

---

**Previous Chapter**: [Chapter 8: Security and User Authentication](/lib/07-coding/vibe-vibe/docs-en-Advanced-08-auth-security)

**Next Chapter**: [Chapter 10: Localhost and Public Internet Access](/lib/07-coding/vibe-vibe/docs-en-Advanced-10-localhost-public-access)
