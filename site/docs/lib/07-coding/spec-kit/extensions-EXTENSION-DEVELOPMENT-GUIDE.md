---
title: "Extension Development Guide"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/EXTENSION-DEVELOPMENT-GUIDE.md"
sourceRel: "extensions/EXTENSION-DEVELOPMENT-GUIDE.md"
rawUrl: "/raw/07-coding/spec-kit/extensions/EXTENSION-DEVELOPMENT-GUIDE.md"
sourceSha256: "3c0315c06e6f0dc3160c0b27d2d41dd05f0ea3222b402d33457329d975ee41aa"
pageSha256: "3c0315c06e6f0dc3160c0b27d2d41dd05f0ea3222b402d33457329d975ee41aa"
contentMode: "local-full"
zh: ""
---

# Extension Development Guide

A guide for creating Spec Kit extensions.

---

## Quick Start

### 1. Create Extension Directory

```bash
mkdir my-extension
cd my-extension
```

### 2. Create `extension.yml` Manifest

```yaml
schema_version: "1.0"

extension:
  id: "my-ext"                          # Lowercase, alphanumeric + hyphens only
  name: "My Extension"
  version: "1.0.0"                      # Semantic versioning
  description: "My custom extension"
  author: "Your Name"
  repository: "https://github.com/you/spec-kit-my-ext"
  license: "MIT"

requires:
  speckit_version: ">=0.1.0"            # Minimum spec-kit version
  tools:                                # Optional: External tools required
    - name: "my-tool"
      required: true
      version: ">=1.0.0"
  commands:                             # Optional: Core commands needed
    - "speckit.tasks"

provides:
  commands:
    - name: "speckit.my-ext.hello"      # Must follow pattern: speckit.{ext-id}.{cmd}
      file: "commands/hello.md"
      description: "Say hello"
      aliases: ["speckit.my-ext.hi"]    # Optional aliases, same pattern

  config:                               # Optional: Config files
    - name: "my-ext-config.yml"
      template: "my-ext-config.template.yml"
      description: "Extension configuration"
      required: false

hooks:                                  # Optional: Integration hooks
  after_tasks:
    command: "speckit.my-ext.hello"
    optional: true
    prompt: "Run hello command?"

tags:                                   # Optional: For catalog search
  - "example"
  - "utility"
```

### 3. Create Commands Directory

```bash
mkdir commands
```

### 4. Create Command File

**File**: `commands/hello.md`

```markdown
---
description: "Say hello command"
tools:                              # Optional: AI tools this command uses
  - 'some-tool/function'
scripts:                            # Optional: Helper scripts
  sh: ../../scripts/bash/helper.sh
  ps: ../../scripts/powershell/helper.ps1
---

# Hello Command

This command says hello!

## User Input

$ARGUMENTS

## Steps

1. Greet the user
2. Show extension is working

```bash
echo "Hello from my extension!"
echo "Arguments: $ARGUMENTS"
```

## Extension Configuration

Load extension config from `.specify/extensions/my-ext/my-ext-config.yml`.

### 5. Test Locally

```bash
cd /path/to/spec-kit-project
specify extension add --dev /path/to/my-extension
```

### 6. Verify Installation

```bash
specify extension list

# Should show:
#  ✓ My Extension (v1.0.0)
#     My custom extension
#     Commands: 1 | Hooks: 1 | Status: Enabled
```

### 7. Test Command

If using Claude:

```bash
claude
> /speckit.my-ext.hello world
```

The command will be available in `.claude/commands/speckit.my-ext.hello.md`.

---

## Manifest Schema Reference

### Required Fields

#### `schema_version`

Extension manifest schema version. Currently: `"1.0"`

#### `extension`

Extension metadata block.

**Required sub-fields**:

- `id`: Extension identifier (lowercase, alphanumeric, hyphens)
- `name`: Human-readable name
- `version`: Semantic version (e.g., "1.0.0")
- `description`: Short description

**Optional sub-fields**:

- `author`: Extension author
- `repository`: Source code URL
- `license`: SPDX license identifier
- `homepage`: Extension homepage URL

#### `requires`

Compatibility requirements.

**Required sub-fields**:

- `speckit_version`: Semantic version specifier (e.g., ">=0.1.0,<2.0.0")

**Optional sub-fields**:

- `tools`: External tools required (array of tool objects)
- `commands`: Core spec-kit commands needed (array of command names)
- `scripts`: Core scripts required (array of script names)

#### `provides`

What the extension provides.

**Optional sub-fields:**

- `commands`: Array of command objects
- `templates`: Array of template objects
- `scripts`: Array of script objects

`hooks` and `events` are separate top-level manifest fields (siblings of
`provides`, not nested under it — see [`hooks`](#hooks) below). At least one
of `provides.commands`, `provides.templates`, `provides.scripts`, `hooks`, or
`events` is required.

**Command object**:

- `name`: Command name (must match `speckit.\{ext-id\}.\{command\}`)
- `file`: Path to command file (relative to extension root)
- `description`: Command description (optional)
- `aliases`: Alternative command names (optional, array; each must match `speckit.\{ext-id\}.\{command\}`)

**Template object**:

- `name`: Template name (lowercase, alphanumeric, hyphens — e.g. `myext-template`)
- `file`: Path to template file (relative to extension root)
- `description`: Template description (optional)

**Script object**:

- `name`: Script name (lowercase, alphanumeric, hyphens — e.g. `myext-collect`)
- `file`: Path to script file (relative to extension root)
- `description`: Script description (optional)
- `runtimes`: Runtimes the script supports (optional, array; subset of `bash`, `powershell`, `python` — informational only, not used to select or invoke the script)

Extension-provided templates and scripts always resolve as `replace`; a manifest that includes a `strategy` key on one of these entries is rejected with a `ValidationError`. Composable strategies (`wrap`/`prepend`/`append`) are preset-only.

### Optional Fields

#### `hooks`

Integration hooks for automatic execution.

Available hook points:

- `before_specify` / `after_specify`: Before/after specification generation
- `before_plan` / `after_plan`: Before/after implementation planning
- `before_tasks` / `after_tasks`: Before/after task generation
- `before_implement` / `after_implement`: Before/after implementation
- `before_analyze` / `after_analyze`: Before/after cross-artifact analysis
- `before_checklist` / `after_checklist`: Before/after checklist generation
- `before_clarify` / `after_clarify`: Before/after spec clarification
- `before_constitution` / `after_constitution`: Before/after constitution update
- `before_taskstoissues` / `after_taskstoissues`: Before/after tasks-to-issues conversion

Each event accepts a single hook object or a list of hook objects (multiple commands on one event).

Hook object:

- `command`: Command to execute (typically from `provides.commands`, but can reference any registered command)
- `priority`: Run order within the event (integer ≥ 1, default 10; lower runs first; equal priorities keep authoring order)
- `optional`: If true, prompt user before executing
- `prompt`: Prompt text for optional hooks
- `description`: Hook description
- `condition`: Execution condition (future)

#### `tags`

Array of tags for catalog discovery.

#### `defaults`

Default extension configuration values.

#### `config_schema`

JSON Schema for validating extension configuration.

---

## Command File Format

### Frontmatter (YAML)

```yaml
---
description: "Command description"          # Required
tools:                                      # Optional
  - 'tool-name/function'
scripts:                                    # Optional
  sh: ../../scripts/bash/helper.sh
  ps: ../../scripts/powershell/helper.ps1
---
```

### Body (Markdown)

Use standard Markdown with special placeholders:

- `$ARGUMENTS`: User-provided arguments
- `\{SCRIPT\}`: Replaced with script path during registration
- `__SPECKIT_COMMAND_<NAME>__`: Replaced with the invocation of another command, rendered using the active integration's separator (see [Referencing other commands](#referencing-other-commands))

**Example**:

````markdown
## Steps

1. Parse arguments
2. Execute logic

```bash
args="$ARGUMENTS"
echo "Running with args: $args"
```
````

### Referencing other commands

A command body is a *template* that Spec Kit renders once per agent. Different agents invoke commands with different surface syntax — for example `/speckit.plan` (dot separator) or `/speckit-plan` (hyphen separator). Some agents also use different prefixes in skills mode (e.g. Kimi `/skill:speckit-plan`, Codex/ZCode `$speckit-plan`). So when you reference a sibling command from a body, **do not hard-code a literal invocation** like `/speckit.my-ext.prepare`. A literal is correct for exactly one agent and breaks on the rest.

Instead use the agent-neutral token `__SPECKIT_COMMAND_<NAME>__`. Spec Kit resolves it to a `/speckit<separator>...` invocation using the active integration's `invoke_separator` (and integrations may post-process that further in skills output).

Encode the command name in upper case, dropping the `speckit.` prefix and turning each dotted segment separator into an underscore. A hyphen inside a segment is kept as a hyphen:

| Command file | Token |
| --- | --- |
| `speckit.plan.md` | `__SPECKIT_COMMAND_PLAN__` |
| `speckit.bug.fix.md` | `__SPECKIT_COMMAND_BUG_FIX__` |
| `speckit.git.commit.md` | `__SPECKIT_COMMAND_GIT_COMMIT__` |
| `speckit.agent-context.update.md` | `__SPECKIT_COMMAND_AGENT-CONTEXT_UPDATE__` |

The resolver maps each underscore back to the active agent's separator. An underscore separates segments and a hyphen belongs to the segment it sits in, so `AGENT-CONTEXT_UPDATE` is the two segments `agent-context` and `update` rather than three.

**Example** — a command body that points the user at the next step:

```markdown
Once the assessment exists, the next step is `__SPECKIT_COMMAND_BUG_FIX__ slug=<slug>`.
```

This renders as `/speckit.bug.fix slug=<slug>` for a slash-based agent, `/speckit-bug-fix slug=<slug>` for a skills-based agent, and so on — the author writes it once and it stays portable. The first-party `bug` and `git` extensions use this token exclusively; see `extensions/bug/commands/` for working examples.

> **Skills mode.** Token resolution runs in both paths, so the token is safe to
> use either way. Command files go through the command-rendering path
> (`CommandRegistrar`). Skill bodies go through `_resolve_command_ref_tokens` in
> `_register_extension_skills`, which resolves the same token shape against the
> active skill style, so `__SPECKIT_COMMAND_BUG_FIX__` renders as:
>
> | Agent | Rendered |
> | --- | --- |
> | Codex, ZCode, Command Code | `$speckit-bug-fix` |
> | Claude, Copilot, Cursor, Devin, Droid, Grok and the other slash agents | `/speckit-bug-fix` |
> | Kimi | `/skill:speckit-bug-fix` |
>
> Anything else falls through to the integration's own `build_command_invocation`.

### Script Path Rewriting

Extension commands use relative paths that get rewritten during registration:

**In extension**:

```yaml
scripts:
  sh: ../../scripts/bash/helper.sh
```

**After registration**:

```yaml
scripts:
  sh: .specify/scripts/bash/helper.sh
```

This allows scripts to reference core spec-kit scripts.

---

## Configuration Files

### Config Template

**File**: `my-ext-config.template.yml`

```yaml
# My Extension Configuration
# Copy this to my-ext-config.yml and customize

# Example configuration
api:
  endpoint: "https://api.example.com"
  timeout: 30

features:
  feature_a: true
  feature_b: false

credentials:
  # DO NOT commit credentials!
  # Use environment variables instead
  api_key: "${MY_EXT_API_KEY}"
```

### Config Loading

In your command, load config with layered precedence:

1. Extension defaults (`extension.yml` → `defaults`)
2. Project config (`.specify/extensions/my-ext/my-ext-config.yml`)
3. Local overrides (`.specify/extensions/my-ext/my-ext-config.local.yml` - gitignored)
4. Environment variables (`SPECKIT_MY_EXT_*`)

**Example loading script**:

```bash
#!/usr/bin/env bash
EXT_DIR=".specify/extensions/my-ext"

# Load and merge config
config=$(yq eval '.' "$EXT_DIR/my-ext-config.yml" -o=json)

# Apply env overrides
if [ -n "${SPECKIT_MY_EXT_API_KEY:-}" ]; then
  config=$(echo "$config" | jq ".api.api_key = \"$SPECKIT_MY_EXT_API_KEY\"")
fi

echo "$config"
```

---

## Excluding Files with `.extensionignore`

Extension authors can create a `.extensionignore` file in the extension root to exclude files and folders from being copied when a user installs the extension with `specify extension add`. This is useful for keeping development-only files (tests, CI configs, docs source, etc.) out of the installed copy.

### Format

The file uses `.gitignore`-compatible patterns (one per line), powered by the [`pathspec`](https://pypi.org/project/pathspec/) library:

- Blank lines are ignored
- Lines starting with `#` are comments
- `*` matches anything **except** `/` (does not cross directory boundaries)
- `**` matches zero or more directories (e.g., `docs/**/*.draft.md`)
- `?` matches any single character except `/`
- A trailing `/` restricts a pattern to directories only
- Patterns containing `/` (other than a trailing slash) are anchored to the extension root
- Patterns without `/` match at any depth in the tree
- `!` negates a previously excluded pattern (re-includes a file)
- Backslashes in patterns are normalised to forward slashes for cross-platform compatibility
- The `.extensionignore` file itself is always excluded automatically

### Example

```gitignore
# .extensionignore

# Development files
tests/
.github/
.gitignore

# Build artifacts
__pycache__/
*.pyc
dist/

# Documentation source (keep only the built README)
docs/
CONTRIBUTING.md
```

### Pattern Matching

| Pattern | Matches | Does NOT match |
|---------|---------|----------------|
| `*.pyc` | Any `.pyc` file in any directory | — |
| `tests/` | The `tests` directory (and all its contents) | A file named `tests` |
| `docs/*.draft.md` | `docs/api.draft.md` (directly inside `docs/`) | `docs/sub/api.draft.md` (nested) |
| `.env` | The `.env` file at any level | — |
| `!README.md` | Re-includes `README.md` even if matched by an earlier pattern | — |
| `docs/**/*.draft.md` | `docs/api.draft.md`, `docs/sub/api.draft.md` | — |

### Unsupported Features

The following `.gitignore` features are **not applicable** in this context:

- **Multiple `.extensionignore` files**: Only a single file at the extension root is supported (`.gitignore` supports files in subdirectories)
- **`$GIT_DIR/info/exclude` and `core.excludesFile`**: These are Git-specific and have no equivalent here
- **Negation inside excluded directories**: Because file copying uses `shutil.copytree`, excluding a directory prevents recursion into it entirely. A negation pattern cannot re-include a file inside a directory that was itself excluded. For example, the combination `tests/` followed by `!tests/important.py` will **not** preserve `tests/important.py` — the `tests/` directory is skipped at the root level and its contents are never evaluated. To work around this, exclude the directory's contents individually instead of the directory itself (e.g., `tests/*.pyc` and `tests/.cache/` rather than `tests/`).

---

## Validation Rules

### Extension ID

- **Pattern**: `^[a-z0-9-]+$`
- **Valid**: `my-ext`, `tool-123`, `awesome-plugin`
- **Invalid**: `MyExt` (uppercase), `my_ext` (underscore), `my ext` (space)

### Extension Version

- **Format**: Semantic versioning (MAJOR.MINOR.PATCH)
- **Valid**: `1.0.0`, `0.1.0`, `2.5.3`
- **Invalid**: `1.0`, `v1.0.0`, `1.0.0-beta`

### Command Name

- **Pattern**: `^speckit\.[a-z0-9-]+\.[a-z0-9-]+$`
- **Valid**: `speckit.my-ext.hello`, `speckit.tool.cmd`
- **Invalid**: `my-ext.hello` (missing prefix), `speckit.hello` (no extension namespace)

### Command File Path

- **Must be** relative to extension root
- **Valid**: `commands/hello.md`, `commands/subdir/cmd.md`
- **Invalid**: `/absolute/path.md`, `../outside.md`

---

## Testing Extensions

### Manual Testing

1. **Create test extension**
2. **Install locally**:

   ```bash
   specify extension add --dev /path/to/extension
   ```

3. **Verify installation**:

   ```bash
   specify extension list
   ```

4. **Test commands** with your AI agent
5. **Check command registration**:

   ```bash
   ls .claude/commands/speckit.my-ext.*
   ```

6. **Remove extension**:

   ```bash
   specify extension remove my-ext
   ```

### Automated Testing

Create tests for your extension:

```python
# tests/test_my_extension.py
import pytest
from pathlib import Path
from specify_cli.extensions import ExtensionManifest

def test_manifest_valid():
    """Test extension manifest is valid."""
    manifest = ExtensionManifest(Path("extension.yml"))
    assert manifest.id == "my-ext"
    assert len(manifest.commands) >= 1

def test_command_files_exist():
    """Test all command files exist."""
    manifest = ExtensionManifest(Path("extension.yml"))
    for cmd in manifest.commands:
        cmd_file = Path(cmd["file"])
        assert cmd_file.exists(), f"Command file not found: {cmd_file}"
```

---

## Distribution

### Option 1: GitHub Repository

1. **Create repository**: `spec-kit-my-ext`
2. **Add files**:

   ```text
   spec-kit-my-ext/
   ├── extension.yml
   ├── commands/
   ├── scripts/
   ├── docs/
   ├── README.md
   ├── LICENSE
   └── CHANGELOG.md
   ```

3. **Create release**: Tag with version (e.g., `v1.0.0`)
4. **Install from repo**:

   ```bash
   git clone https://github.com/you/spec-kit-my-ext
   specify extension add --dev spec-kit-my-ext/
   ```

### Option 2: ZIP Archive (Future)

Create ZIP archive and host on GitHub Releases:

```bash
zip -r spec-kit-my-ext-1.0.0.zip extension.yml commands/ scripts/ docs/
```

Users install with:

```bash
