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
sourceRel: "en/claude-apps-gateway-config.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/claude-apps-gateway-config.md"
sourceSha256: "3257bfe37d57f4673a2bd0a0cd20daf9780ff3a718ac81280970d97368c04245"
pageSha256: "b72e8a3d1a411c227c92e52e0a6c790ca21d71f084fd358bca2c2331b1000d00"
contentMode: "local-full"
zh: ""
---

## Secret expansion

Don't write secrets such as `client_secret`, `jwt_secret`, or `postgres_url` directly in `gateway.yaml`. Reference them with one of the forms below, and the gateway resolves the value at boot from an environment variable or a file:

| Form            | Resolves to                                                                                                                                                                                                                                                 | Use for                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `${VAR}`        | The environment variable `VAR`. Boot fails if undefined.                                                                                                                                                                                                    | Container environment variables, AWS Secrets Manager via env injection |
| `${file:/path\}` | Contents of the file at that absolute path, trimmed. The reference must be the field's entire value: unlike `$\{VAR\}`, it isn't expanded inside a longer string, so for a database password set `store.password` rather than embedding it in `postgres_url`. | Kubernetes Secret volume mounts, Vault Agent, SOPS                     |
