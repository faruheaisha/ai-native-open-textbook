---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/agents-and-tools/tool-use/bash-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/bash-tool.md"
sourceSha256: "d63bfc6cf76c6d6dd8a08c8fa3617a2fba9c13f554b11f823fc3892abe8b93e2"
pageSha256: "7c67abf218e59162583a57a434c707fb4273f6d6425f8a6573f0fa0e4a8d1d54"
contentMode: "local-full"
zh: ""
---

## Security

  Your application runs whatever command Claude requests. Run the session in an isolated environment, such as a container or a virtual machine, as the least-privileged user that can do the work. Treat every command as untrusted input.

Beyond isolation, add these controls:

* Validate commands before running them, with an allowlist rather than a blocklist. See [Implement the bash tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/bash-tool#implement-the-bash-tool).
* Set resource limits on the shell process (CPU, memory, and disk), for example with `ulimit`.
* Log every command and its output so you can audit what ran.
* Redact credentials and other secrets from output before returning it to Claude.
