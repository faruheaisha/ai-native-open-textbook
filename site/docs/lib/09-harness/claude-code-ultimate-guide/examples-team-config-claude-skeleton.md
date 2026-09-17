---
title: "AI Instructions: {{DEVELOPERNAME}}"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/team-config/claude-skeleton.md"
sourceRel: "examples/team-config/claude-skeleton.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/team-config/claude-skeleton.md"
sourceSha256: "a71279d2b9116a3076dd2672c86cd2f09ec56b958dd16ceb110b791f5a68559d"
pageSha256: "a71279d2b9116a3076dd2672c86cd2f09ec56b958dd16ceb110b791f5a68559d"
contentMode: "local-full"
zh: ""
---

# AI Instructions: &#123;&#123;DEVELOPER_NAME&#125;&#125;

---

## Project Context

&#123;&#123;MODULE:core-standards&#125;&#125;

---

## Git Workflow

&#123;&#123;MODULE:git-workflow&#125;&#125;

---

## Testing

&#123;&#123;MODULE:test-conventions&#125;&#125;

---

&#123;&#123;#if typescript&#125;&#125;
## TypeScript Rules

&#123;&#123;MODULE:typescript-rules&#125;&#125;

---
&#123;&#123;/if&#125;&#125;

&#123;&#123;#if python&#125;&#125;
## Python Rules

&#123;&#123;MODULE:python-rules&#125;&#125;

---
&#123;&#123;/if&#125;&#125;

## Environment & Paths

&#123;&#123;MODULE:&#123;&#123;OS&#125;&#125;-paths&#125;&#125;

---

&#123;&#123;#if cursor&#125;&#125;
## Cursor-Specific Instructions

&#123;&#123;MODULE:cursor-rules&#125;&#125;

---
&#123;&#123;/if&#125;&#125;

&#123;&#123;#if windsurf&#125;&#125;
## Windsurf-Specific Instructions

&#123;&#123;MODULE:windsurf-rules&#125;&#125;

---
&#123;&#123;/if&#125;&#125;

## Communication Style

&#123;&#123;#if verbose&#125;&#125;
Provide detailed explanations for each decision. Show alternatives considered. Include reasoning.
&#123;&#123;/if&#125;&#125;
&#123;&#123;#if concise&#125;&#125;
Be concise. One sentence per point. Skip obvious details.
&#123;&#123;/if&#125;&#125;
&#123;&#123;#if terse&#125;&#125;
Minimal output. Code only when possible. No explanations unless asked.
&#123;&#123;/if&#125;&#125;
