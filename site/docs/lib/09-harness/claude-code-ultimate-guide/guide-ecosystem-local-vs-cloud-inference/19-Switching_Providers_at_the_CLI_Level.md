---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/local-vs-cloud-inference.md"
sourceRel: "guide/ecosystem/local-vs-cloud-inference.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/local-vs-cloud-inference.md"
sourceSha256: "00496bd48f05d6c0aec914f5f08a661c246e97789034e76fdb1c297813f7a5d6"
pageSha256: "f7372ed918155dc9672c856c820abdd25ea4f61d6a3c5c5a811b668314988b49"
contentMode: "local-full"
zh: ""
---

## Switching Providers at the CLI Level

Everything above is about which hardware or API to run inference on. A separate, complementary problem is how to point Claude Code itself at whichever backend you picked without rewriting configuration every time. [cc-copilot-bridge](https://ccbridge.bruniaux.com/) is a routing layer for the Claude Code CLI that toggles between three backends with a three-character command: `ccd` for Anthropic direct (pay-per-token), `ccc` for a GitHub Copilot subscription, and `cco` for fully offline local inference via Ollama. It doesn't change any of the hardware-fit or cost math on this page, it changes which backend Claude Code talks to once you've decided. Current release is v1.5.3, with a v2 in progress. Worth flagging: the Copilot route relies on a reverse-engineered API, which the project's own documentation notes may violate GitHub Copilot's Terms of Service.
