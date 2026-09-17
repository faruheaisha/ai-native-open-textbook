---
title: "API Design Rules"
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
pageSha256: "7d35dc182b34007a5713721f0c4aaa289acb847ba5fe17079c24d76bf867965d"
contentMode: "local-full"
zh: ""
---

# API Design Rules

- All endpoints must validate input with Zod schemas
- Return shape: \{ data: T \} | \{ error: string \}
- Rate limit all public endpoints`
          \}]
        \}, \{
          id: 'skills',
          label: 'skills/',
          type: 'folder',
          icon: 'folder',
          color: '#D4A843',
          oneLiner: 'Reusable prompts you or Claude invoke by name',
          when: <>Invoked with &lt;C>/skill-name&lt;/C> or when Claude matches the task to a skill</>,
          description: <>Each skill is a folder with a SKILL.md file plus any supporting files it needs. By default, both you and Claude can invoke a skill. Use frontmatter to control that: &lt;C>disable-model-invocation: true&lt;/C> for user-only workflows like &lt;C>/deploy&lt;/C>, or &lt;C>user-invocable: false&lt;/C> to hide from the &lt;C>/&lt;/C> menu while Claude can still invoke it.</>,
          tips: [<>Skills accept arguments: &lt;C>/deploy staging&lt;/C> passes "staging" as &lt;C>$ARGUMENTS&lt;/C>. Use &lt;C>$0&lt;/C>, &lt;C>$1&lt;/C>, and so on for positional access</>, <>The &lt;C>description&lt;/C> frontmatter determines when Claude auto-invokes the skill</>, 'Bundle reference docs alongside SKILL.md. Claude knows the skill directory path and can read supporting files when you mention them'],
          docsLink: '/en/skills',
          children: [{
            id: 'skill-review',
            label: 'security-review/',
            type: 'folder',
            icon: 'folder',
            color: '#D4A843',
            oneLiner: 'A skill bundling SKILL.md with supporting files',
            children: [{
              id: 'skill-review-md',
              label: 'SKILL.md',
              type: 'file',
              icon: 'md',
              color: '#D4A843',
              badge: 'committed',
              oneLiner: 'Entrypoint: trigger, invocability, instructions',
              when: <>User types &lt;C>/security-review &lt;target&gt;&lt;/C>; Claude cannot auto-invoke this skill</>,
              description: [<>This skill uses &lt;C>disable-model-invocation: true&lt;/C> so only you can trigger it; Claude never invokes it on its own.</>, <>The &lt;C>!`...`&lt;/C> line runs a shell command and injects its output into the prompt. &lt;C>$ARGUMENTS&lt;/C> substitutes whatever you typed after the skill name. Claude sees the skill directory path, so mentioning a bundled file like checklist.md lets Claude read it.</>],
              example: `---
description: Reviews code changes for security vulnerabilities, authentication gaps, and injection risks
disable-model-invocation: true
