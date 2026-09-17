---
title: "API credentials"
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
pageSha256: "e57063cbf2197c82ae716cf9ebb86eb61dd731b4950bdacbb98a73856a942028"
contentMode: "local-full"
zh: ""
---

# API credentials
config/secrets.json`,
        docsLink: '/en/worktrees#copy-gitignored-files-into-worktrees'
      \}, \{
        id: 'dot-claude',
        label: '.claude/',
        type: 'folder',
        icon: 'folder',
        color: 'var(--ce-accent)',
        oneLiner: 'Project-level configuration, rules, and extensions',
        description: 'Everything Claude Code reads that is specific to this project. If you use git, commit most files here so your team shares them; a few, like settings.local.json, are gitignored when Claude Code saves settings to them. Each file badge shows which.',
        children: [\{
          id: 'settings-json',
          label: 'settings.json',
          type: 'file',
          icon: 'json',
          color: 'var(--ce-text-3)',
          badge: 'committed',
          oneLiner: 'Permissions, hooks, and configuration',
          when: <>Overrides global &lt;C>~/.claude/settings.json&lt;/C>. Local settings, CLI flags, and managed settings override this</>,
          description: 'Settings that Claude Code applies directly. Permissions control which commands and tools Claude can use; hooks run your scripts at specific points in a session. Unlike CLAUDE.md, which Claude reads as guidance, these are enforced whether Claude follows them or not.',
          contains: [<><A href="https://code.claude.com/docs/en/permissions">permissions</A>: allow, deny, or prompt before Claude uses specific tools or commands</>, <><A href="https://code.claude.com/docs/en/hooks">hooks</A>: run your own scripts on events like before a tool call or after a file edit</>, <><A href="https://code.claude.com/docs/en/statusline">statusLine</A>: customize the line shown at the bottom while Claude works</>, <><A href="https://code.claude.com/docs/en/settings-reference#available-settings">model</A>: pick a default model for this project</>, <><A href="https://code.claude.com/docs/en/settings-reference#environment-variables">env</A>: environment variables set in every session</>, <><A href="https://code.claude.com/docs/en/output-styles">outputStyle</A>: select a custom output style from output-styles/</>],
          tips: [<>Bash permission patterns support wildcards: &lt;C>Bash(npm test *)&lt;/C> matches any command starting with &lt;C>npm test&lt;/C></>, <>Array settings like &lt;C>permissions.allow&lt;/C> combine across all scopes; scalar settings like &lt;C>model&lt;/C> use the most specific value</>],
          exampleIntro: <>This example allows &lt;C>npm test&lt;/C> and &lt;C>npm run&lt;/C> commands without prompting, blocks &lt;C>rm -rf&lt;/C>, and runs Prettier on files after Claude edits or writes them.</>,
          example: `\{
  "permissions": \{
    "allow": [
      "Bash(npm test *)",
      "Bash(npm run *)"
    ],
    "deny": [
      "Bash(rm -rf *)"
    ]
  \},
  "hooks": \{
    "PostToolUse": [\{
      "matcher": "Edit|Write",
      "hooks": [\{
        "type": "command",
        "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"
      \}]
    \}]
  \}
\}`,
          docsLink: '/en/settings'
        \}, \{
          id: 'settings-local-json',
          label: 'settings.local.json',
          type: 'file',
          icon: 'json',
          color: 'var(--ce-text-3)',
          badge: 'gitignored',
          oneLiner: 'Your personal settings overrides for this project',
          when: 'Highest of the user-editable settings files; CLI flags and managed settings still take precedence',
          description: 'Personal settings that take precedence over the project defaults. Same JSON format as settings.json, gitignored when Claude Code saves a setting to it. Use this when you need different permissions or defaults than the team config.',
          tips: [<>Same schema as settings.json. Array settings like &lt;C>permissions.allow&lt;/C> combine across scopes; scalar settings like &lt;C>model&lt;/C> use the local value</>, <>When Claude Code saves a setting to this file in a repository that doesn't already ignore it, it adds &lt;C>**/.claude/settings.local.json&lt;/C> to your global git excludes file: &lt;C>core.excludesFile&lt;/C> from your global git config when it's set to an absolute or &lt;C>~&lt;/C>-prefixed path, otherwise &lt;C>$XDG_CONFIG_HOME/git/ignore&lt;/C>, or &lt;C>~/.config/git/ignore&lt;/C>. To share the ignore rule with your team, also add it to the project &lt;C>.gitignore&lt;/C></>],
          exampleIntro: 'This example adds Docker permissions on top of whatever the team settings.json allows.',
          example: `\{
  "permissions": \{
    "allow": [
      "Bash(docker *)"
    ]
  \}
\}`,
          docsLink: '/en/settings'
        \}, \{
          id: 'rules',
          label: 'rules/',
          type: 'folder',
          icon: 'folder',
          color: '#9B7BC4',
          oneLiner: 'Topic-scoped instructions, optionally gated by file paths',
          when: <>Rules without &lt;C>paths:&lt;/C> load at session start. Rules with &lt;C>paths:&lt;/C> load when a matching file enters context</>,
          description: [<>Project instructions split into topic files that can load conditionally based on file paths. A rule without &lt;C>paths:&lt;/C> frontmatter loads at session start like CLAUDE.md; a rule with &lt;C>paths:&lt;/C> loads only when Claude reads a matching file.</>, <>Like CLAUDE.md, rules are guidance Claude reads, not configuration Claude Code enforces. For guaranteed behavior use <A href="https://code.claude.com/docs/en/hooks">hooks</A> or <A href="https://code.claude.com/docs/en/permissions">permissions</A>.</>],
          tips: [<>Use &lt;C>paths:&lt;/C> frontmatter with globs to scope rules to directories or file types</>, <>Subdirectories work: &lt;C>.claude/rules/frontend/react.md&lt;/C> is discovered automatically</>, 'When CLAUDE.md approaches 200 lines, start splitting into rules'],
          docsLink: '/en/memory#organize-rules-with-claude/rules/',
          children: [\{
            id: 'rule-testing',
            label: 'testing.md',
            type: 'file',
            icon: 'md',
            color: '#9B7BC4',
            badge: 'committed',
            oneLiner: 'Test conventions scoped to test files',
            when: <>Loaded when Claude reads a file matching the &lt;C>paths:&lt;/C> globs below</>,
            description: <>An example rule that only loads when Claude is working on test files. The &lt;C>paths:&lt;/C> globs in the frontmatter define which files trigger it; here, anything ending in .test.ts or .test.tsx. For other files, this rule is not loaded into context.</>,
            example: `---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
