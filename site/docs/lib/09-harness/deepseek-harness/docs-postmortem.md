---
title: "Post-mortems"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/README.md"
zh: ""
---

# Post-mortems

English | [中文](/lib/09-harness/deepseek-harness/docs-postmortem-README.zh)

Incident write-ups: a bug reached a place it shouldn't have (a real user, a merged PR, a release), and the interesting part is *why our process let it through*, not just the one-line fix.

A post-mortem is NOT an [Agent Note](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/README.md) (which records a deliberate design decision and its rejected alternatives, or proposes future work). It is a backward-looking record of a failure: what broke, the mechanism, why every safety net missed it, and the concrete guardrails added so the same class of bug fails loudly next time.

Write one when a bug is **subtle** (the mechanism is non-obvious and a careful engineer would re-derive it the hard way), **systemic** (the reason it escaped is a gap in tests/tooling/conventions, not a one-off typo), and **costly to rediscover** (it cost real debugging time, and would cost it again). Link the guardrails (tests, AGENTS.md rules, ADRs) the post-mortem motivated.

Every post-mortem opens with an **Executive summary**: one short paragraph a busy reader can absorb in thirty seconds — what broke, the root cause in plain terms, why it escaped, and the durable lesson — before the detailed Summary / Timeline / Root cause / Guardrails sections that follow.

| # | Title |
|---|---|
| [0001](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/docs/postmortem/0001-acp-default-export-drops-inject.md) | ACP server crashed on connect: `export default` dropped the plugin's `inject` |
| [0002](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/docs/postmortem/0002-js-expression-disabled-filesystem-tools.md) | Filesystem snapshot tools were permanently disabled by a literal `!!js` object |
| [0003](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/docs/postmortem/0003-web-agent-gui-feedback-loop.md) | Web agent validated a replacement server instead of the GUI hosting its session |
| [0004](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/docs/postmortem/0004-landlock-partial-notice-misclassified-child-failures.md) | Landlock partial-enforcement notice misclassified child failures |
