---
title: "D1 Gotchas & Troubleshooting"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/d1/gotchas.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/d1/gotchas.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/d1/gotchas.md"
sourceSha256: "1ffa594d0bdc7e02e64629c999f587119a5453a764bbf6ed69712ffc2c4c1f93"
pageSha256: "1ffa594d0bdc7e02e64629c999f587119a5453a764bbf6ed69712ffc2c4c1f93"
contentMode: "local-full"
zh: ""
---

# D1 Gotchas & Troubleshooting

## Common Errors

### "SQL Injection Vulnerability"

**Cause:** Using string interpolation instead of prepared statements with bind()  
**Solution:** ALWAYS use prepared statements: `env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(userId).all()` instead of string interpolation which allows attackers to inject malicious SQL

### "no such table"

**Cause:** Table doesn't exist because migrations haven't been run, or using wrong database binding
