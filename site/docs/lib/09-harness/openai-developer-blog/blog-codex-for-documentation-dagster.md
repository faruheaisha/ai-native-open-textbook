---
title: "Using Codex for education at Dagster Labs"
sourceId: "09-harness/openai-developer-blog"
sourceTitle: "openai-developer-blog"
sourceKind: "官方博客"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://developers.openai.com/blog"
entryUrl: "https://developers.openai.com/blog"
sourceRel: "blog/codex-for-documentation-dagster.md"
rawUrl: "/raw/09-harness/openai-developer-blog/blog/codex-for-documentation-dagster.md"
sourceSha256: "ef9fd862f63b2bfc1a107d925b6a889b5217e4fc402d777a0e37b809cf065709"
pageSha256: "ef9fd862f63b2bfc1a107d925b6a889b5217e4fc402d777a0e37b809cf065709"
contentMode: "local-full"
zh: ""
---

# Using Codex for education at Dagster Labs

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

At [Dagster Labs](https://dagster.io), we produce a lot of technical educational content for data engineers, machine learning engineers, and analysts to better understand how to use Dagster, an open source workflow orchestration framework. Because our users come from varied technical backgrounds, we’ve found it essential to meet each persona at the right technical depth.

In this post, I’ll share how we use OpenAI’s Codex to accelerate documentation, translate content across mediums, and even measure how complete our docs are.

## The power of CONTRIBUTING.md files

To make it easier for our community members and internal engineers to contribute documentation, we overhauled our [CONTRIBUTING.md](https://github.com/dagster-io/dagster/blob/3c2d36054f4014ca8316e533975a538d6eff62c4/docs/CONTRIBUTING.md) file. To our surprise, we had inadvertently significantly improved the utility of Codex. It turns out there is serious value in clearly outlining the hierarchy, structure, and best practices for writing documentation in your code base. Both for humans and robots.

````markdown
