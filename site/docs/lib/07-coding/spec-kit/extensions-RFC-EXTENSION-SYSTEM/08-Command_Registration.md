---
title: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/RFC-EXTENSION-SYSTEM.md"
sourceRel: "extensions/RFC-EXTENSION-SYSTEM.md"
rawUrl: "/raw/07-coding/spec-kit/extensions/RFC-EXTENSION-SYSTEM.md"
sourceSha256: "5947ce6c3e36a91188a44748eaa424e512cef6d1069d9e5b7c61904b4df102eb"
pageSha256: "8f01629628eac2de5ba21538d7a3ccef2148712b74b40700705c2927f5f82a40"
contentMode: "local-full"
zh: ""
---

## Command Registration

### Per-Agent Registration

Extensions provide **universal command format** (Markdown-based), and CLI converts to agent-specific format during registration.

#### Universal Command Format

**Location**: Extension's `commands/specstoissues.md`

```markdown
---
# Universal metadata (parsed by all agents)
description: "Create Jira hierarchy from spec and tasks"
tools:
  - 'jira-mcp-server/epic_create'
  - 'jira-mcp-server/story_create'
scripts:
  sh: ../../scripts/bash/check-prerequisites.sh --json
  ps: ../../scripts/powershell/check-prerequisites.ps1 -Json
---

# Command implementation
## User Input
$ARGUMENTS

## Steps
1. Load jira-config.yml
2. Parse spec.md and tasks.md
3. Create Jira items
```

#### Claude Code Registration

**Output**: `.claude/commands/speckit.jira.specstoissues.md`

```markdown
---
description: "Create Jira hierarchy from spec and tasks"
tools:
  - 'jira-mcp-server/epic_create'
  - 'jira-mcp-server/story_create'
scripts:
  sh: .specify/scripts/bash/check-prerequisites.sh --json
  ps: .specify/scripts/powershell/check-prerequisites.ps1 -Json
---

# Command implementation (copied from extension)
## User Input
$ARGUMENTS

## Steps
1. Load jira-config.yml from .specify/extensions/jira/
2. Parse spec.md and tasks.md
3. Create Jira items
```

**Transformation:**

- Copy frontmatter with adjustments
- Rewrite script paths (relative to repo root)
- Add extension context (config location)

#### Gemini CLI Registration

**Output**: `.gemini/commands/speckit.jira.specstoissues.toml`

```toml
[command]
name = "speckit.jira.specstoissues"
description = "Create Jira hierarchy from spec and tasks"

[command.tools]
tools = [
  "jira-mcp-server/epic_create",
  "jira-mcp-server/story_create"
]

[command.script]
sh = ".specify/scripts/bash/check-prerequisites.sh --json"
ps = ".specify/scripts/powershell/check-prerequisites.ps1 -Json"

[command.template]
content = """
# Command implementation
## User Input
{{args}}

## Steps
1. Load jira-config.yml from .specify/extensions/jira/
2. Parse spec.md and tasks.md
3. Create Jira items
"""
```

**Transformation:**

- Convert Markdown frontmatter to TOML
- Convert `$ARGUMENTS` to <code v-pre>{{args}}</code>
- Rewrite script paths

### Registration Code

**Location**: `src/specify_cli/extensions.py`

```python
def register_extension_commands(
    project_path: Path,
    ai_assistant: str,
    manifest: dict
) -> None:
    """Register extension commands with AI agent."""

    agent_config = AGENT_CONFIG.get(ai_assistant)
    if not agent_config:
        console.print(f"[yellow]Unknown agent: {ai_assistant}[/yellow]")
        return

    ext_id = manifest['extension']['id']
    ext_dir = project_path / ".specify" / "extensions" / ext_id
    agent_commands_dir = project_path / agent_config['folder'].rstrip('/') / "commands"
    agent_commands_dir.mkdir(parents=True, exist_ok=True)

    for cmd_info in manifest['provides']['commands']:
        cmd_name = cmd_info['name']
        source_file = ext_dir / cmd_info['file']

        if not source_file.exists():
            console.print(f"[red]Command file not found:[/red] {cmd_info['file']}")
            continue

        # Convert to agent-specific format
        if ai_assistant == "claude":
            dest_file = agent_commands_dir / f"{cmd_name}.md"
            convert_to_claude(source_file, dest_file, ext_dir)
        elif ai_assistant == "gemini":
            dest_file = agent_commands_dir / f"{cmd_name}.toml"
            convert_to_gemini(source_file, dest_file, ext_dir)
        elif ai_assistant == "copilot":
            dest_file = agent_commands_dir / f"{cmd_name}.md"
            convert_to_copilot(source_file, dest_file, ext_dir)
        # ... other agents

        console.print(f"  ✓ Registered: {cmd_name}")

def convert_to_claude(
    source: Path,
    dest: Path,
    ext_dir: Path
) -> None:
    """Convert universal command to Claude format."""

    # Parse universal command
    content = source.read_text()
    frontmatter, body = parse_frontmatter(content)

    # Adjust script paths (relative to repo root)
    if 'scripts' in frontmatter:
        for key in frontmatter['scripts']:
            frontmatter['scripts'][key] = adjust_path_for_repo_root(
                frontmatter['scripts'][key]
            )

    # Inject extension context
    body = inject_extension_context(body, ext_dir)

    # Write Claude command
    dest.write_text(render_frontmatter(frontmatter) + "\n" + body)
```
