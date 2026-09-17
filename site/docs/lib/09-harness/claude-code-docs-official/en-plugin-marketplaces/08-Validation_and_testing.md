---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/plugin-marketplaces.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/plugin-marketplaces.md"
sourceSha256: "7912af9270337aa00dd39e74120a5aad65065f90b4a15c54eed99cec6ff6d960"
pageSha256: "4ce419578944b067d4fb3b52f1692b754790e1d46b7bfc25f28c567a3e660621"
contentMode: "local-full"
zh: ""
---

## Validation and testing

Test your marketplace before sharing.

From your marketplace directory, validate the JSON syntax:

```bash theme={null}
claude plugin validate .
```

Or from within Claude Code:

```shell theme={null}
/plugin validate .
```

Add the marketplace for testing:

```shell theme={null}
/plugin marketplace add ./path/to/marketplace
```

Install a test plugin to verify everything works:

```shell theme={null}
/plugin install test-plugin@marketplace-name
```

For complete plugin testing workflows, see [Test your plugins locally](https://code.claude.com/docs/en/plugins#test-your-plugins-locally). For technical troubleshooting, see [Plugins reference](https://code.claude.com/docs/en/plugins-reference).
