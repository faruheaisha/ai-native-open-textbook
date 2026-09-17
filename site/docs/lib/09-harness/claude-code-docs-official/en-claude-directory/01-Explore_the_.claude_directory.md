---
title: "Explore the .claude directory"
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
pageSha256: "d7017c3f68cd65b867a405d41b7b754590b01f177dde6c59a26d6f087dc6fc7e"
contentMode: "local-full"
zh: ""
---

# Explore the .claude directory

> Where Claude Code reads CLAUDE.md, settings.json, hooks, skills, commands, subagents, workflows, rules, and auto memory. Explore the .claude directory in your project and ~/.claude in your home directory.

export const ClaudeExplorer = () => \{
  const A = useMemo(() => (\{href, children\}) => &lt;a href=\{href\} style=&#123;&#123;
    color: 'var(--ce-accent)',
    textDecoration: 'none',
    borderBottom: '1px dotted var(--ce-accent)'
  &#125;&#125;>\{children\}&lt;/a>, []);
  const C = useMemo(() => (\{children\}) => &lt;code style=&#123;&#123;
    fontFamily: 'var(--ce-mono)',
    fontSize: '0.92em',
    padding: '1px 4px',
    borderRadius: '3px',
    background: 'var(--ce-surface)',
    border: '0.5px solid var(--ce-border-subtle)'
  &#125;&#125;>\{children\}&lt;/code>, []);
  const commandsNote = useMemo(() => <>Commands and skills are now the same mechanism. For new workflows, use <A href="https://code.claude.com/docs/en/skills">skills/</A> instead: same &lt;C>/name&lt;/C> invocation, plus you can bundle supporting files.</>, []);
  const FILE_TREE = useMemo(() => (\{
    project: \{
      label: 'your-project/',
      children: [\{
        id: 'claude-md',
        label: 'CLAUDE.md',
        type: 'file',
        icon: 'md',
        color: '#6A9BCC',
        badge: 'committed',
        oneLiner: 'Project instructions Claude reads every session',
        when: 'Loaded into context at the start of every session',
        description: 'Project-specific instructions that shape how Claude works in this repository. Put your conventions, common commands, and architectural context here so Claude operates with the same assumptions your team does.',
        tips: ['Target under 200 lines. Longer files still load in full but may reduce adherence', <>CLAUDE.md loads into every session. If something only matters for specific tasks, move it to a <A href="https://code.claude.com/docs/en/skills">skill</A> or a path-scoped <A href="https://code.claude.com/docs/en/memory#organize-rules-with-claude/rules/">rule</A> so it loads only when needed</>, 'List the commands you run most, like build, test, and format, so Claude knows them without you spelling them out each time', <>Run &lt;C>/memory&lt;/C> to open and edit CLAUDE.md from within a session</>, <>Also works at &lt;C>.claude/CLAUDE.md&lt;/C> if you prefer to keep the project root clean</>],
        exampleIntro: 'This example is for a TypeScript and React project. It lists the build and test commands, the framework conventions Claude should follow, and project-specific rules like export style and file layout.',
        example: `# Project conventions

## Commands
- Build: \`npm run build\`
- Test: \`npm test\`
- Lint: \`npm run lint\`

## Stack
- TypeScript with strict mode
- React 19, functional components only

## Rules
- Named exports, never default exports
- Tests live next to source: \`foo.ts\` -> \`foo.test.ts\`
- All API routes return \`\{ data, error \}\` shape`,
        docsLink: '/en/memory'
      \}, \{
        id: 'mcp-json',
        label: '.mcp.json',
        type: 'file',
        icon: 'json',
        color: '#9B7BC4',
        badge: 'committed',
        oneLiner: 'Project-scoped MCP servers, shared with your team',
        when: <>Servers connect when the session begins. Tool schemas are deferred by default and load on demand via <A href="https://code.claude.com/docs/en/mcp#scale-with-mcp-tool-search">tool search</A></>,
        description: <>Configures Model Context Protocol (MCP) servers that give Claude access to external tools: databases, APIs, browsers, and more. This file holds the project-scoped servers your whole team uses. Personal servers you want to keep to yourself go in &lt;C>~/.claude.json&lt;/C> instead.</>,
        tips: [<>Use environment variable references for secrets: &lt;C>\{'${NOTION_TOKEN}'}&lt;/C></>, <>Lives at the project root, not inside &lt;C>.claude/&lt;/C></>, <>For servers only you need, run &lt;C>claude mcp add --scope user&lt;/C>. This writes to &lt;C>~/.claude.json&lt;/C> instead of &lt;C>.mcp.json&lt;/C></>],
        exampleIntro: <>This example configures the Notion MCP server so Claude can read and update pages in your workspace. The &lt;C>{'${NOTION_TOKEN\}'\}&lt;/C> reference is read from your shell environment when Claude Code starts the server, so the token never lands in the file.</>,
        example: `\{
  "mcpServers": \{
    "notion": \{
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": \{
        "NOTION_TOKEN": "\$\{NOTION_TOKEN\}"
      \}
    \}
  \}
\}`,
        docsLink: '/en/mcp'
      \}, \{
        id: 'worktreeinclude',
        label: '.worktreeinclude',
        type: 'file',
        icon: 'md',
        color: '#8FA876',
        badge: 'committed',
        oneLiner: 'Gitignored files to copy into new worktrees',
        when: <>Read when Claude creates a git worktree via &lt;C>--worktree&lt;/C>, the &lt;C>EnterWorktree&lt;/C> tool, or subagent &lt;C>isolation: worktree&lt;/C></>,
        description: <>Lists gitignored files to copy from your main repository into each new worktree. Worktrees are fresh checkouts, so untracked files like &lt;C>.env&lt;/C> are missing by default. Patterns here use &lt;C>.gitignore&lt;/C> syntax. Only files that match a pattern and are also gitignored get copied, so tracked files are never duplicated.</>,
        tips: [<>Lives at the project root, not inside &lt;C>.claude/&lt;/C></>, <>Git-only: if you configure a <A href="https://code.claude.com/docs/en/hooks#worktreecreate">WorktreeCreate hook</A> for a different VCS, this file is not read. Copy files inside your hook script instead</>, <>Also applies to parallel sessions in the <A href="https://code.claude.com/docs/en/desktop#work-in-parallel-with-sessions">desktop app</A></>],
        exampleIntro: 'This example copies your local environment files and a secrets config into every worktree Claude creates. Comments start with # and blank lines are ignored, same as .gitignore.',
        example: `# Local environment
.env
.env.local
