---
title: "Using Plugins"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/units/en/unit3/using-plugins.mdx"
sourceRel: "units/en/unit3/using-plugins.mdx"
rawUrl: "/raw/10-context-memory/hf-context-course/units/en/unit3/using-plugins.mdx"
sourceSha256: "d3af1651d7f7c290c051925da954ba2ddb125f04da67be96472c9108ee898de0"
pageSha256: "d3af1651d7f7c290c051925da954ba2ddb125f04da67be96472c9108ee898de0"
contentMode: "local-full"
zh: ""
---

# Using Plugins

Now that you've built a plugin, let's learn how to install and use them, both your own and plugins from others. The process differs slightly across platforms, but the core idea is identical: **discover → install → configure → use**.

## Installing Plugins

### Installing Plugins in Claude Code

Claude Code installs plugins through marketplaces and the in-session `/plugin` command.

#### From a marketplace

```text
/plugin marketplace add <owner>/<repo>
