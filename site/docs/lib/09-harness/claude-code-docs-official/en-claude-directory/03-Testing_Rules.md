---
title: "Testing Rules"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/claude-directory.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/claude-directory.md"
sourceSha256: "949efc8d560f951e3db828976f873ac73dcfc281133a9af1935690589ad97cd6"
pageSha256: "cf24528198a82724fb777c506bec47fb3ee48b1546c5a0ff0d2f851e9ba1a14f"
contentMode: "local-full"
zh: ""
---

# Testing Rules

- Use descriptive test names: "should [expected] when [condition]"
- Mock external dependencies, not internal modules
- Clean up side effects in afterEach`
          \}, \{
            id: 'rule-api',
            label: 'api-design.md',
            type: 'file',
            icon: 'md',
            color: '#9B7BC4',
            badge: 'committed',
            oneLiner: 'API conventions scoped to backend code',
            when: <>Loaded when Claude reads a file matching the &lt;C>paths:&lt;/C> glob below</>,
            description: <>A second example showing a rule scoped to backend code. The &lt;C>paths:&lt;/C> glob matches files under src/api/, so these conventions load only when Claude is editing API routes.</>,
            example: `---
paths:
  - "src/api/**/*.ts"
