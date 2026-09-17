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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md"
sourceRel: "guide/ultimate-guide.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ultimate-guide.md"
sourceSha256: "4d290b0171bbaaffd149d5d2e4da964392cb212d7357408df40d8f346f952dbc"
pageSha256: "ea3f244a98ea50d2905e0b30ba96d0509074ec14776999acf9d656d127ff20fc"
contentMode: "local-full"
zh: ""
---

#### Security Considerations

**Never commit these to Git**:
- API keys, tokens, passwords
- `.env` files with secrets
- `mcp.json` with resolved credentials
- Session history (may contain sensitive code)

**Always commit these**:
- Template files with `$\{VAR_NAME\}` placeholders
- `.gitignore` to prevent secret leaks
- Public agents/hooks/skills (if safe to share)

**Best practices**:
1. Use `settings.template.json` with placeholders → Generate `settings.json` via script
2. Run [pre-commit hook](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/pre-commit-secrets.sh) to detect secrets
3. For MCP secrets, see [Section 8.3.1 MCP Secrets Management](#831-mcp-secrets-management)
