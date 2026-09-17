---
title: "Settings files and precedence"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/settings.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/settings.md"
sourceSha256: "21ae4e9c5eb6ba961e39b6d2215344bd301f2a6313cbc18c4f107fdd3f73ff01"
pageSha256: "21ae4e9c5eb6ba961e39b6d2215344bd301f2a6313cbc18c4f107fdd3f73ff01"
contentMode: "local-full"
zh: ""
---

# Settings files and precedence

> Change Claude Code settings, pick the scope a key belongs in, verify the change, and learn which value Claude Code uses when a key is set in several places.

export const SettingsPrecedence = () => \{
  const LEVELS = [\{
    n: 1,
    name: 'Managed settings',
    file: 'managed-settings.json, MDM, or the claude.ai console',
    who: 'Your organization',
    w: 390
  \}, \{
    n: 2,
    name: 'Command line',
    file: 'claude --settings',
    who: 'You, this session',
    w: 420
  \}, \{
    n: 3,
    name: 'Project local',
    file: '.claude/settings.local.json',
    who: 'You, this project',
    w: 480
  \}, \{
    n: 4,
    name: 'Shared project',
    file: '.claude/settings.json',
    who: 'Everyone in the project',
    w: 540
  \}, \{
    n: 5,
    name: 'User',
    file: '~/.claude/settings.json',
    who: 'You, every project',
    w: 600
  \}];
  const W = 760;
  const ROW = 58;
  const GAP = 8;
  const TOP = 34;
  const H = TOP + LEVELS.length * (ROW + GAP) + 30;
  const cx = W / 2;
  const mono = 'var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)';
  const sans = 'var(--font-sans, system-ui, -apple-system, sans-serif)';
  return 
      
      &lt;svg viewBox=\{`0 0 ${W} ${H\}`\} xmlns="http://www.w3.org/2000/svg">
        &lt;text x=\{cx\} y=\{18\} textAnchor="middle" fontFamily=\{sans\} fontSize="12.5" fontWeight="600" fill="var(--sp-sub)">Highest precedence&lt;/text>
        \{LEVELS.map((l, i) => \{
    const y = TOP + i * (ROW + GAP);
    const x = cx - l.w / 2;
    const top = i === 0;
    return &lt;g key=\{l.n\}>
```
              <rect x={x} y={y} width={l.w} height={ROW} rx={10} fill={top ? 'var(--sp-top-fill)' : 'var(--sp-fill)'} stroke={top ? 'var(--sp-top)' : 'var(--sp-stroke)'} strokeWidth={top ? 1.5 : 1} />
              <text x={x + 14} y={y + 24} fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--sp-text)">{l.n}. {l.name}</text>
              <text x={x + 14} y={y + 43} fontFamily={mono} fontSize="11.5" fill="var(--sp-sub)">{l.file}</text>
              <text x={x + l.w - 14} y={y + 24} textAnchor="end" fontFamily={sans} fontSize="12" fill="var(--sp-faint)">{l.who}</text>
```
            &lt;/g>;
  \})\}
```
        <text x={cx} y={H - 10} textAnchor="middle" fontFamily={sans} fontSize="12.5" fontWeight="600" fill="var(--sp-sub)">Lowest precedence</text>
        <g stroke="var(--sp-arrow)" strokeWidth="1.5" fill="none">
          <line x1={W - 40} y1={TOP + 10} x2={W - 40} y2={H - 38} />
          <path d={`M ${W - 46} ${TOP + 18} L ${W - 40} ${TOP + 10} L ${W - 34} ${TOP + 18}`} />
        </g>
        <text x={W - 40} y={H - 22} textAnchor="middle" fontFamily={sans} fontSize="10.5" fill="var(--sp-faint)">overrides</text>
      </svg>
```
    ;
\};

export const SettingsScope = (\{defaultSelected = 'project'\}) => \{
  const FILES = [\{
    id: 'user',
    path: '~/.claude/settings.json'
  \}, \{
    id: 'project',
    path: 'acme-app/.claude/settings.json'
  \}, \{
    id: 'local',
    path: 'acme-app/.claude/settings.local.json'
  \}, \{
    id: 'managed',
    path: 'Managed settings',
    ring: 'managed-settings.json, MDM, or the claude.ai console'
  \}];
  const SHORT = \{
    user: '~/.claude/settings.json',
    project: 'acme-app/.claude/settings.json',
    local: 'acme-app/.claude/settings.local.json',
    managed: 'managed-settings.json, MDM, or the claude.ai console'
  \};
  const TILE_MARK = \{
    project: 'settings.json',
    local: 'settings.local.json'
  \};
  const initial = FILES.some(f => f.id === defaultSelected) ? defaultSelected : 'project';
  const [sel, setSel] = useState(initial);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const rootRef = useRef(null);
  const frameRef = useRef(null);
  const CANVAS_W = 862;
  const CANVAS_H = 240;
  useEffect(() => \{
    const el = frameRef.current;
    if (!el) return;
    const measure = () => setScale(Math.min(1, el.clientWidth / CANVAS_W));
    measure();
    if (typeof ResizeObserver === 'undefined') \{
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    \}
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  \}, []);
  useEffect(() => \{
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  \}, []);
  const toggleFullscreen = () => \{
    if (!rootRef.current) return;
    if (document.fullscreenElement) document.exitFullscreen(); else rootRef.current.requestFullscreen().catch(() => \{\});
  \};
  const COVERAGE = \{
    user: ['website', 'api', 'yacme'],
    project: ['yacme', 'tacme', 'cacme'],
    local: ['yacme'],
    managed: ['website', 'api', 'yacme', 'tacme', 'cacme']
  \};
  const RINGS = \{
    local: \{
      l: 282,
      t: 50,
      w: 142,
      h: 124
    \},
    project: \{
      l: 282,
      t: 50,
      w: 560,
      h: 124
    \},
    user: \{
      l: 2,
      t: 34,
      w: 446,
      h: 198
    \},
    managed: \{
      l: 0,
      t: 32,
      w: 862,
      h: 204
    \}
  \};
  const TILES = [\{
    id: 'website',
    name: 'website/',
    left: 30,
    caption: ''
  \}, \{
    id: 'api',
    name: 'api/',
    left: 160,
    caption: ''
  \}, \{
    id: 'yacme',
    name: 'acme-app/',
    left: 290,
    caption: ''
  \}, \{
    id: 'tacme',
    name: 'acme-app/',
    left: 497,
    caption: sel === 'project' ? 'their clone, once you commit the file' : 'their clone'
  \}, \{
    id: 'cacme',
    name: 'acme-app/',
    left: 704,
    caption: sel === 'project' ? 'fresh clone, once you commit the file' : sel === 'managed' ? 'server-managed only' : 'fresh clone'
  \}];
  const FILE_AT = \{
    user: \{
      machine: 'you',
      tiles: []
    \},
    project: \{
      machine: null,
      tiles: ['yacme', 'tacme', 'cacme']
    \},
    local: \{
      machine: null,
      tiles: ['yacme']
    \},
    managed: \{
      machine: null,
      tiles: []
    \}
  \};
  const fileAt = FILE_AT[sel];
  const coverage = COVERAGE[sel];
  const ring = RINGS[sel];
  const selFile = FILES.find(f => f.id === sel);
  const FolderIcon = (\{open\}) => &lt;svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true">
      &lt;path d="M1.5 4.5a1 1 0 0 1 1-1h3.2l1.3 1.5h6a1 1 0 0 1 1 1V12a1 1 0 0 1-1 1h-10.5a1 1 0 0 1-1-1z" />
      \{open && &lt;path d="M1.5 7.5h13" />\}
    &lt;/svg>;
  const FileIcon = () => &lt;svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true">
      &lt;path d="M4 1.5h5.5L13 5v9.5H4z" />
      &lt;path d="M9.5 1.5V5H13" />
    &lt;/svg>;
  const CloudIcon = () => &lt;svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true">
      &lt;path d="M4.5 12.5h7a2.5 2.5 0 0 0 .4-4.97A3.5 3.5 0 0 0 5.2 6.6 3 3 0 0 0 4.5 12.5z" />
    &lt;/svg>;
  const LaptopIcon = () => &lt;svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true">
      &lt;rect x="2.5" y="3" width="11" height="7.5" rx="1" />
      &lt;path d="M1 12.5h14" />
    &lt;/svg>;
  return &lt;div ref=\{rootRef\} className=\{'ssc-root not-prose' + (isFullscreen ? ' ssc-fs' : '')\}>
      

      <div className="ssc-head">
        <div className="ssc-files" role="group" aria-label="Settings file">
          \{FILES.map(f => &lt;button key=\{f.id\} type="button" className="ssc-file ssc-mono" aria-pressed=\{f.id === sel\} onClick=\{() => setSel(f.id)\}>\{f.path\}&lt;/button>)\}
        </div>
        &lt;button type="button" className="ssc-fsbtn" onClick=\{toggleFullscreen\} aria-label=\{isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'\} title=\{isFullscreen ? 'Exit fullscreen' : 'Fullscreen'\}>\{isFullscreen ? '⤡' : '⛶'\}&lt;/button>
      </div>

      &lt;div ref=\{frameRef\} className="ssc-frame" style=&#123;&#123;
    height: CANVAS_H * scale + 'px'
  &#125;&#125;>
        &lt;div className="ssc-canvas" style=&#123;&#123;
    transform: 'scale(' + scale + ')'
  &#125;&#125;>
          &lt;div className="ssc-machine" style=&#123;&#123;
    left: '10px',
    width: '430px'
  &#125;&#125; />
          &lt;span className="ssc-machine-label" style=&#123;&#123;
    left: '30px'
  &#125;&#125;>&lt;LaptopIcon />Your machine\{fileAt.machine === 'you' && <span className="ssc-machine-filemark ssc-mono">&lt;FileIcon />\{selFile.path\}</span>\}&lt;/span>
          &lt;div className="ssc-machine" style=&#123;&#123;
    left: '460px',
    width: '200px'
  &#125;&#125; />
          &lt;span className="ssc-machine-label" style=&#123;&#123;
    left: '470px'
  &#125;&#125;>&lt;LaptopIcon />A teammate’s machine&lt;/span>
          &lt;div className="ssc-machine" style=&#123;&#123;
    left: '682px',
    width: '170px'
  &#125;&#125; />
          &lt;span className="ssc-machine-label" style=&#123;&#123;
    left: '692px'
  &#125;&#125;>&lt;CloudIcon />A cloud session&lt;/span>

          \{TILES.map(t => \{
    const on = coverage.includes(t.id);
    return &lt;div key=\{t.id\} className=\{'ssc-tile' + (on ? ' ssc-on' : '')\} style=&#123;&#123;
      left: t.left + 'px'
    &#125;&#125;>
                <div className="ssc-tile-name">&lt;FolderIcon open=\{on\} /><span className="ssc-mono">\{t.name\}</span></div>
                \{t.caption && <div className="ssc-tile-caption">\{t.caption\}</div>\}
                \{fileAt.tiles.includes(t.id) && &lt;span className="ssc-filemark ssc-mono" title=\{SHORT[sel]\}>&lt;FileIcon />\{TILE_MARK[sel]\}&lt;/span>\}
              ;
  \})\}

          &lt;div className="ssc-ring" style=&#123;&#123;
    left: ring.l + 'px',
    top: ring.t + 'px',
    width: ring.w + 'px',
    height: ring.h + 'px'
  &#125;&#125; />
          &lt;span className="ssc-ring-label ssc-mono" style=&#123;&#123;
    left: ring.l + 14 + 'px',
    top: ring.t - 26 + 'px'
  &#125;&#125;>\{selFile.ring || selFile.path\}&lt;/span>
        
      
    ;
\};

Settings are the JSON keys that change how Claude Code behaves: which model it starts with, what it can run without asking, which files it can't read, how it looks in your terminal, and what your organization enforces.

  To look up a specific key, go to [All settings](https://code.claude.com/docs/en/settings-reference), which lists every key with the file you set it in, its default, and an example.

Claude Code reads settings from JSON settings files such as `~/.claude/settings.json`. It looks for them in a few locations, and [the file it reads a setting from decides who the setting applies to](#settings-files-and-who-they-affect). This page covers those files: which one to put a setting in, how to change a setting and confirm it applied, and which value Claude Code uses when the same key is set in more than one file. [Configure permissions](https://code.claude.com/docs/en/permissions) covers what Claude Code can run without asking and how to write `allow`, `ask`, and `deny` rules.

  This page covers Claude Code running on your machine: the terminal, the [VS Code](https://code.claude.com/docs/en/vs-code) and [JetBrains](https://code.claude.com/docs/en/jetbrains) extensions, and the [desktop app](https://code.claude.com/docs/en/desktop), which all read the same settings files. A cloud session on [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) runs on a different machine and reads only some of them; see [Settings in cloud sessions](#settings-in-cloud-sessions).

&lt;span id="settings-files" />

&lt;span id="configuration-scopes" />

&lt;span id="available-scopes" />

&lt;span id="when-to-use-each-scope" />

&lt;span id="what-uses-scopes" />

&lt;span id="subagent-configuration" />

&lt;span id="where-settings-live" />

## Settings files and who they affect

Claude Code reads settings from four files, and an organization can also deliver managed settings from the claude.ai console. Each source has a scope: the set of people and projects a setting saved in it applies to, whether that's just you, everyone in a project, or everyone in your organization.

| Scope          | File                                                                                          | Who it affects                                                                                                                                                       | Use it for                                                                         |
| :------------- | :-------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| User           | `~/.claude/settings.json`                                                                     | You, in every project on this machine                                                                                                                                | Personal preferences: theme, editor mode, default model, your own permission rules |
| Shared project | `.claude/settings.json`                                                                       | Everyone working in the folder that contains it. In a git repository, commit it so teammates get it                                                                  | Team permissions, hooks, plugins, and the environment variables the project needs  |
| Project local  | `.claude/settings.local.json`                                                                 | You, in this one project only. Claude Code keeps it out of git when it creates the file; if you create it by hand, add it to `.gitignore` yourself                   | Personal overrides for one project, and testing before you share                   |
| Managed        | `managed-settings.json` and other [managed sources](https://code.claude.com/docs/en/managed-settings#delivery-mechanisms) | Everyone your organization deploys it to; nothing you set overrides it, apart from a few [security-sensitive exceptions](#exceptions-to-managed-settings-precedence) | Security policy and compliance requirements                                        |

In the File column, `~/.claude` is the `.claude` folder in your home directory, and a bare `.claude` is the `.claude` folder inside your project.

&lt;span id="where-each-file-applies" />

&lt;span id="compare-what-each-file-reaches" />

### Compare the scope of each settings file

Suppose you have three projects on your machine, `website/`, `api/`, and `acme-app/`, a teammate has their own clone of `acme-app/`, and you start a [cloud session](#settings-in-cloud-sessions) on `acme-app/`.

The graphic below shows which of those folders a setting applies in when you start Claude Code from them. Click a settings file to see the folders it reaches.

* **`~/.claude/settings.json`**: every project on your machine, and nothing on your teammate's or in the cloud session
* **`acme-app/.claude/settings.json`**: your `acme-app/`. It reaches your teammate's clone and the cloud session only if you commit the file to version control; until you do, it's a file on your disk like any other and nobody else has it
* **`acme-app/.claude/settings.local.json`**: your `acme-app/` only. Claude Code adds it to your global git excludes the first time it writes the file, so it stays out of your commits; if you create the file by hand, [add it to `.gitignore` yourself](#keep-personal-settings-out-of-a-repository)
* **Managed settings**, whether a `managed-settings.json` file, an MDM policy, or [server-managed settings](https://code.claude.com/docs/en/server-managed-settings) from the claude.ai console: every project on every machine your organization deploys it to, or that you sign in to with your organization account. Only server-managed settings reach the cloud session

&lt;span id="which-files-you-have" />

### Find or create your settings files

Installing Claude Code doesn't create any settings file. If your machine or project already has one, it came from one of these sources:

* **Managed**: your organization deploys it. You don't create or edit it.
* **Shared project**: a project that already uses Claude Code may have one committed. If not, create it at `.claude/settings.json` in the project folder.
* **User** and **Project local**: create them yourself, or let Claude Code create them. It writes `~/.claude/settings.json` the first time you change an option in the `/config` menu that it stores in user settings, such as the theme, and `.claude/settings.local.json` the first time you give a standing approval on a permission prompt, such as "Yes, and don't ask again" for a Bash command. A few `/config` options, including **Show tips**, save to `.claude/settings.local.json` instead of the user file.

  On Windows, `~/.claude` means `%USERPROFILE%\.claude`. To keep the home-directory files somewhere else, set [`CLAUDE_CONFIG_DIR`](https://code.claude.com/docs/en/env-vars); Claude Code then stores your settings, session history, and plugins there instead.

Claude Code also keeps a fifth file, [`~/.claude.json`](https://code.claude.com/docs/en/claude-directory#ce-claude-json), that it writes for itself; you don't need to edit it. It holds your sign-in session, [MCP server](https://code.claude.com/docs/en/mcp) configurations, per-project state such as trust decisions, and the [global config keys](https://code.claude.com/docs/en/settings-reference#global-config-settings) that `/config` writes for you.

### Share settings with your team

Commit `.claude/settings.json` so everyone who clones the repository gets the same permissions, hooks, telemetry, and plugins. Each teammate can still override it for themselves in their own `.claude/settings.local.json`, so personal exceptions don't need a commit. For a complete team file, see [a team's shared settings](https://code.claude.com/docs/en/settings-example#a-teams-shared-settings).

Some of what you commit waits until each teammate [trusts the folder](https://code.claude.com/docs/en/permissions#project-allow-rules-and-workspace-trust), and a few keys never take effect from a repository file; [Troubleshoot a setting that doesn't apply](#common-cases) covers both.

&lt;span id="local-settings-file" />

&lt;span id="where-claude-code-saves-the-project-local-file" />

&lt;span id="the-project-local-file" />

&lt;span id="keep-personal-settings-out-of-the-repository" />

### Keep personal settings out of a repository

To change a setting for yourself in one project without changing it for your teammates, save it in `.claude/settings.local.json` inside the project. Claude Code applies that file over the committed `.claude/settings.json`, so if your team's file sets `"model": "claude-sonnet-5"` and you want Opus, put `"model": "claude-opus-4-8"` in your local file and only your sessions change.

Three things to know about the local file:

* **Claude Code writes it too.** When Claude asks permission to run a Bash command and you choose "Yes, and don't ask again", Claude Code saves that [permission approval](https://code.claude.com/docs/en/permissions#permission-system) here as an `allow` rule.
* **You don't need to gitignore it yourself, unless you created it by hand.** The first time Claude Code writes the file in a git repository that doesn't already ignore it, it adds `**/.claude/settings.local.json` to your global git excludes file, so the file stays out of your commits in every repository. That file is `core.excludesFile` when your global git config sets it to an absolute or `~`-prefixed path; otherwise it's `$XDG_CONFIG_HOME/git/ignore`, or `~/.config/git/ignore` when `XDG_CONFIG_HOME` is unset. If you created the file by hand and Claude Code hasn't written to it yet, add it to `.gitignore` yourself.
* **Its allow rules don't wait for trust while the file stays untracked.** Because the file is yours and not the repository's, Claude Code applies its `allow` rules without the [workspace trust](https://code.claude.com/docs/en/permissions#project-allow-rules-and-workspace-trust) step it requires for the committed file. If the file is tracked by git, the trust step applies to it too; see [When your local settings file needs trust](https://code.claude.com/docs/en/permissions#when-your-local-settings-file-needs-trust).

&lt;span id="where-claude-code-looks-for-each-file" />

&lt;span id="how-claude-code-keeps-the-local-file-out-of-git" />

&lt;span id="local-allow-rules-dont-wait-for-workspace-trust" />

#### Where Claude Code keeps the local file in a git repository

When Claude asks permission to run a Bash command and you choose "Yes, and don't ask again", Claude Code saves that approval as an `allow` rule in `.claude/settings.local.json`. If you start Claude Code in a subdirectory of a git repository, it reads and writes that file at the repository root and applies the approval across the whole repository. In a [worktree](https://code.claude.com/docs/en/worktrees), it uses the file at the main checkout's root.

Two rules qualify the root location:

* **When the file stays with `.claude/settings.json` instead**: outside a git repository, when the repository root is your home directory, on Windows, or when the repository root or its `.git` or `.claude` entry isn't owned by your user.
* **Paths in the file don't anchor at the repository root**: a permission rule that starts with `/` or a relative sandbox path [anchors at the session's primary working directory](https://code.claude.com/docs/en/permissions#read-and-edit) instead.

Before v2.1.211, Claude Code kept the file in the starting directory. It still reads a file an earlier version left there alongside the root file; where both set the same key, the root's value applies, and permission rules from both files apply. The Agent SDK's [`resolveSettings()`](https://code.claude.com/docs/en/agent-sdk/typescript#resolvesettings) helper always reads the file from the starting directory.

Claude Code reads the shared `.claude/settings.json` from the session's [primary working directory](https://code.claude.com/docs/en/permissions#working-directories), so to use a file committed at the repository root, start Claude Code there. After you [move the session with `/cd`](https://code.claude.com/docs/en/permissions#move-the-session-to-another-directory), Claude Code reads both project files from the new directory instead, placing the local file by the same rules. Reading them from the directory you moved to requires Claude Code v2.1.246 or later.

&lt;span id="managed-settings-delivery" />

&lt;span id="precedence-within-the-managed-tier" />

&lt;span id="parent-settings-from-embedding-hosts" />

&lt;span id="enforce-settings-for-an-organization" />

&lt;span id="settings-your-organization-manages" />

### Check what your organization enforces

If your organization manages Claude Code, some settings are decided for you and nothing you put in your own files changes them. To see which, run `/status`: the `Setting sources` line names the managed source that applies to you. Managed settings apply wherever Claude Code runs on this machine; [What a developer can change](https://code.claude.com/docs/en/managed-settings#what-a-developer-can-change) covers local admin rights and tools other than Claude Code.

Managed settings reach you through the [delivery mechanisms](https://code.claude.com/docs/en/managed-settings#delivery-mechanisms) on the managed settings page, most commonly:

* [Server-managed settings](https://code.claude.com/docs/en/server-managed-settings), which Claude Code fetches from the claude.ai admin console or a self-hosted [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway)
* MDM or OS-level policies, and `managed-settings.json` files in a system directory
* An embedding host such as Claude Desktop, through the SDK `managedSettings` option; see [Control policy from an embedding host](https://code.claude.com/docs/en/managed-settings#parent-settings-from-embedding-hosts)

In a [Cowork](https://claude.com/docs/cowork/overview) session that runs on your machine in the Claude Desktop app, Claude Code doesn't fetch server-managed settings from the claude.ai admin console, and it reads policy deployed to your device unless your organization's Claude Desktop configuration sets `requireCoworkFullVmSandbox`. [Where and when a policy applies](https://code.claude.com/docs/en/managed-settings#where-and-when-a-policy-applies) covers Cowork and cloud sessions.

If you're the administrator, [Set up Claude Code for your organization](https://code.claude.com/docs/en/admin-setup) walks through choosing what to enforce, and [Deploy managed settings](https://code.claude.com/docs/en/managed-settings) covers delivery and how to confirm a policy is in force.

## Change a setting

You can change a setting from the `/config` menu, by editing a settings file, or for one session from the command line.

&lt;span id="system-prompt" />

Claude Code's system prompt isn't published. To give Claude standing instructions, use [`CLAUDE.md` files](https://code.claude.com/docs/en/memory) or the `--append-system-prompt` flag.

### Use the /config menu

Run `/config` inside Claude Code and open the **Config** tab. It lists a short set of personal options such as theme, editor mode, and verbose output, not every settings key. Select an option to change it; Claude Code saves it for you:

* **Most options**: `~/.claude/settings.json`
* **A few options, such as Show tips**: `.claude/settings.local.json`
* **The [global config options](https://code.claude.com/docs/en/settings-reference#global-config-settings)**: `~/.claude.json`

To set one option without the menu, pass `key=value`, such as `/config verbose=true`.

  `/config` is part of the terminal interface. The [VS Code](https://code.claude.com/docs/en/vs-code) chat panel and the [desktop app](https://code.claude.com/docs/en/desktop) don't open it; change settings there by editing a settings file or through those apps' own settings.

### Edit a settings file

Open the settings file for the scope you want in your editor and add or change a key. Settings files are strict JSON: a `//` comment or a trailing comma is a syntax error, and Claude Code reports the file as a [Settings Error](#fix-a-broken-settings-file) at the next start. For example, to let Claude Code run your lint and test commands without asking and stop it reading `.env` files, add this to `~/.claude/settings.json`:

```json ~/.claude/settings.json theme={null}
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run test *)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)"
    ]
  }
}
```

Each entry under `permissions` is a rule that names a tool and what it may do; [Configure permissions](https://code.claude.com/docs/en/permissions) explains the syntax. The `$schema` line points to the [published JSON schema](https://json.schemastore.org/claude-code-settings.json) for Claude Code settings, which gives you autocomplete and inline validation in VS Code, Cursor, and any other editor that supports JSON schema. The schema can lag behind the newest CLI releases, so a validation warning on a recently documented key doesn't mean your configuration is invalid.

After you save, run `/status` inside Claude Code to confirm the file loaded; [Confirm what loaded](#check-what-loaded) says what the `Setting sources` line shows and how a broken file is reported.

For a complete personal file, team file, and organization file, each shown with a comment on every key it sets, see the [example settings files](https://code.claude.com/docs/en/settings-example).

&lt;span id="pass-settings-for-one-session" />

### Change a setting for one session

To try a value without saving it, set it when you start Claude Code. The value applies to that session and your settings files stay as they were. You have three ways to do it:

* **`--settings`**: pass a key as JSON, inline or as a path to a file. Claude Code applies it above your user, project, and local files and below managed settings. It can set any key your user settings file can set; it can't set `Managed` or `Global config` keys.
* **A flag for that key**: some keys have their own flag, such as `--model` for `model` and `--effort` for `effortLevel` and `modelSettings`.
* **An environment variable**: export the key's paired variable before you run `claude`, such as `ANTHROPIC_MODEL` for `model`.

Each key's entry on the [settings reference](https://code.claude.com/docs/en/settings-reference) lists its per-session overrides and which one takes precedence, so check the entry for the key you want to change.

Commands you run inside a session mostly save your choice: when you change a setting in `/config`, Claude Code writes it to your settings files, and `/model` saves the value as your default for new sessions.

If you press `s` in the `/model` picker, Claude Code switches the model without saving it as your user default. [Adjust effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) says which `/effort` picks Claude Code saves as your default for the model you're using and which apply to the current session only.

For example, to start one session on Opus without changing your default:

```bash theme={null}
claude --settings '{"model": "claude-opus-4-8"}'
```

### When edits take effect

Claude Code watches your settings files and reloads them when they change, so it applies most edits to the running session without a restart, including edits to `permissions`, `hooks`, and credential helpers such as `apiKeyHelper`. Claude Code also loads a settings file you create mid-session if its folder existed when the session started. For the project's `.claude/` folder, it loads the file even when you create the folder in the same session.

The reload covers user, project, local, and managed settings, and Claude Code runs the [`ConfigChange` hook](https://code.claude.com/docs/en/hooks#configchange) for each settings-file change it detects, not for managed settings that arrive from MDM or the claude.ai console. Managed settings that arrive through MDM or from the claude.ai console reach a running session on a schedule rather than on save; the [delivery table](https://code.claude.com/docs/en/managed-settings#choose-a-delivery-mechanism) gives it per source.

Claude Code reads some keys only once, at session start, so an edit to one of them doesn't reach the running session. Admin-side keys that also wait for a restart, such as `requiredMinimumVersion`, are listed under [where and when a policy applies](https://code.claude.com/docs/en/managed-settings#where-and-when-a-policy-applies). The ones you're most likely to edit mid-session:

* [`model`](https://code.claude.com/docs/en/settings-reference#model): use [`/model`](https://code.claude.com/docs/en/model-config#setting-your-model) to switch mid-session. Each model has its own prompt cache, so the first request after a switch re-reads the whole conversation uncached; see [Switching models](https://code.claude.com/docs/en/prompt-caching#switching-models)
* [`effortLevel`](https://code.claude.com/docs/en/settings-reference#effortlevel) and [`modelSettings`](https://code.claude.com/docs/en/settings-reference#modelsettings): use [`/effort`](https://code.claude.com/docs/en/model-config#adjust-effort-level) to change effort mid-session

&lt;span id="verify-active-settings" />

&lt;span id="check-what-loaded" />

### Confirm what loaded

Run `/status` inside Claude Code to see which settings sources are active. The **Status** tab includes a `Setting sources` line that lists each settings file Claude Code loaded for the current session, such as `User settings` or `Project local settings`. When [managed settings](https://code.claude.com/docs/en/admin-setup#decide-how-settings-reach-devices) are in effect, the managed settings entry shows in parentheses how they reached your machine.

The line confirms which files Claude Code read; it doesn't show which file supplied each key. To list entries Claude Code rejected, run [`claude doctor`](https://code.claude.com/docs/en/debug-your-config); for a model that project or managed settings set, the startup header names the file that set it. `/status` and `/config` open the same dialog on different tabs, and the **Config** tab isn't a view of your `settings.json` contents.

### Fix a broken settings file

If you mistype JSON or set a key to a value Claude Code doesn't accept, Claude Code tells you at the start of an interactive session. What it shows depends on how much of the file is affected:

* **Settings Error**: a user, project, or local file has invalid JSON or a value the schema rejects. At the start of an interactive session Claude Code shows a dialog that lets you fix the file with Claude's help, exit, or continue without the broken settings.
* **Settings Warning**: only individual entries fail, such as a malformed permission rule or an unknown hook event name. Claude Code skips those values and keeps the rest of the file in effect.
* **Managed settings**: Claude Code keeps enforcing the rest of the file. [Invalid entries in managed settings](https://code.claude.com/docs/en/managed-settings#invalid-entries-in-managed-settings) says what it drops and which keys fall back to a stricter value until you fix them. For a managed settings document that isn't valid JSON, see [Managed settings document could not be parsed](https://code.claude.com/docs/en/errors#managed-settings-document-could-not-be-parsed).
* **Configuration error**: `~/.claude.json` can't be parsed. Claude Code copies the broken file to `~/.claude/backups/.claude.json.corrupted.<timestamp>` and asks whether to exit and fix it by hand or reset to the default configuration; a `-p` run prints the error and exits. To recover your previous state, copy back one of the five most recent `.claude.json.backup.<timestamp>` files in `~/.claude/backups/`, which Claude Code saves before it writes the file.

After you continue, run `/status` to see the affected files and `claude doctor` for the details of each error.

A `-p` run shows no dialog. Unless [a managed settings document can't be parsed](https://code.claude.com/docs/en/errors#managed-settings-document-could-not-be-parsed), Claude Code skips the broken file or values and continues with the rest, so after a `-p` run that ignores a setting, run `claude doctor` to see what it dropped.

&lt;span id="how-scopes-interact" />

&lt;span id="key-points-about-the-configuration-system" />

&lt;span id="which-value-claude-code-uses" />

&lt;span id="which-value-wins" />

## Settings precedence

When the same key appears in more than one place, Claude Code uses the value from the highest level that sets it. The stack below shows the levels, highest on top; a key at a higher level overrides the same key anywhere below it.

In order, highest precedence first:

1. **Managed settings**: settings your organization deploys, by a `managed-settings.json` file, an MDM policy, or [server-managed settings](https://code.claude.com/docs/en/server-managed-settings) from the claude.ai console. Nothing you set overrides them: a key you pass with `--settings` doesn't override the same managed key, and a flag such as `--model` picks only from the models your organization allows. A managed `model` sets the model each session starts with, and you can still switch with `/model`; the lock is [`availableModels`](https://code.claude.com/docs/en/settings-reference#availablemodels), which constrains `/model`, `--model`, and the `model` key in your own files. When your organization delivers more than one managed source, the rules for [precedence within the managed tier](https://code.claude.com/docs/en/managed-settings#precedence-within-the-managed-tier) say what Claude Code reads from each.
