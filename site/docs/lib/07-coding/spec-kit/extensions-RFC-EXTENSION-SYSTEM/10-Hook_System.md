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
pageSha256: "8c64a3e9656caa2c6e341468604a86fb6f94943ca36a4106cb3a5f7d80571e3b"
contentMode: "local-full"
zh: ""
---

## Hook System

### Hook Definition

**In extension.yml:**

```yaml
hooks:
  after_tasks:
    command: "speckit.jira.specstoissues"
    optional: true
    prompt: "Create Jira issues from tasks?"
    description: "Automatically create Jira hierarchy"
    condition: "config.project.key is set"
```

### Hook Registration

**During extension installation**, record hooks in project config:

**File**: `.specify/extensions.yml` (project-level extension config)

```yaml
# Extensions installed in this project
installed:
  - jira
  - linear

# Global extension settings
settings:
  auto_execute_hooks: true  # Prompt for optional hooks after commands

# Hook configuration
hooks:
  after_tasks:
    - extension: jira
      command: speckit.jira.specstoissues
      enabled: true
      optional: true
      prompt: "Create Jira issues from tasks?"

  after_implement:
    - extension: jira
      command: speckit.jira.sync-status
      enabled: true
      optional: true
      prompt: "Sync completion status to Jira?"
```

### Hook Execution

**In core command** (e.g., `templates/commands/tasks.md`):

Add at end of command:

````markdown
## Extension Hooks

After task generation completes, check for registered hooks:

```bash
# Check if extensions.yml exists and has after_tasks hooks
if [ -f ".specify/extensions.yml" ]; then
  # Parse hooks for after_tasks
  hooks=$(yq eval '.hooks.after_tasks[] | select(.enabled == true)' .specify/extensions.yml -o=json)

  if [ -n "$hooks" ]; then
    echo ""
    echo "📦 Extension hooks available:"

    # Iterate hooks
    echo "$hooks" | jq -c '.' | while read -r hook; do
      extension=$(echo "$hook" | jq -r '.extension')
      command=$(echo "$hook" | jq -r '.command')
      optional=$(echo "$hook" | jq -r '.optional')
      prompt_text=$(echo "$hook" | jq -r '.prompt')

      if [ "$optional" = "true" ]; then
        # Prompt user
        echo ""
        read -p "$prompt_text (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
          echo "▶ Executing: $command"
          # Let AI agent execute the command
          # (AI agent will see this and execute)
          echo "EXECUTE_COMMAND: $command"
        fi
      else
        # Auto-execute mandatory hooks
        echo "▶ Executing: $command (required)"
        echo "EXECUTE_COMMAND: $command"
      fi
    done
  fi
fi
```
````

**AI Agent Handling:**

The AI agent sees `EXECUTE_COMMAND: speckit.jira.specstoissues` in output and automatically invokes that command.

**Alternative**: Direct call in agent context (if agent supports it):

```python
# In AI agent's command execution engine
def execute_command_with_hooks(command_name: str, args: str):
    # Execute main command
    result = execute_command(command_name, args)

    # Check for hooks
    hooks = load_hooks_for_phase(f"after_{command_name}")
    for hook in hooks:
        if hook.optional:
            if confirm(hook.prompt):
                execute_command(hook.command, args)
        else:
            execute_command(hook.command, args)

    return result
```

### Hook Conditions

Extensions can specify **conditions** for hooks:

```yaml
hooks:
  after_tasks:
    command: "speckit.jira.specstoissues"
    optional: true
    condition: "config.project.key is set and config.enabled == true"
```

**Condition evaluation** (in hook executor):

```python
def should_execute_hook(hook: dict, config: dict) -> bool:
    """Evaluate hook condition."""
    condition = hook.get('condition')
    if not condition:
        return True  # No condition = always eligible

    # Simple expression evaluator
    # "config.project.key is set" → check if config['project']['key'] exists
    # "config.enabled == true" → check if config['enabled'] is True

    return eval_condition(condition, config)
```
