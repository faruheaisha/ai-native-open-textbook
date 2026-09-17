---
title: "Example Command"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/template/commands/example.md"
sourceRel: "extensions/template/commands/example.md"
rawUrl: "/raw/07-coding/spec-kit/extensions/template/commands/example.md"
sourceSha256: "4d23361bc7b3111f47285d8f2c1bb8bee06c81f24571adcd1c4881d57b16cd56"
pageSha256: "4d23361bc7b3111f47285d8f2c1bb8bee06c81f24571adcd1c4881d57b16cd56"
contentMode: "local-full"
zh: ""
---

# Example Command

This is an example command that demonstrates how to create commands for Spec Kit extensions.

## Purpose

Describe what this command does and when to use it.

## Prerequisites

List requirements before using this command:

1. Prerequisite 1 (e.g., "MCP server configured")
2. Prerequisite 2 (e.g., "Configuration file exists")
3. Prerequisite 3 (e.g., "Valid API credentials")

## User Input

$ARGUMENTS

## Steps

### Step 1: Load Configuration

Load extension configuration from the project:

``bash
config_file=".specify/extensions/my-extension/my-extension-config.yml"

if [ ! -f "$config_file" ]; then
  echo "❌ Error: Configuration not found at $config_file"
  echo "Run 'specify extension add my-extension' to install and configure"
  exit 1
fi

# Read configuration values

setting_value=$(yq eval '.settings.key' "$config_file")

# Apply environment variable overrides

setting_value="${SPECKIT_MY_EXTENSION_KEY:-$setting_value}"

# Validate configuration

if [ -z "$setting_value" ]; then
  echo "❌ Error: Configuration value not set"
  echo "Edit $config_file and set 'settings.key'"
  exit 1
fi

echo "📋 Configuration loaded: $setting_value"
``

### Step 2: Perform Main Action

Describe what this step does:

``markdown
Use MCP tools to perform the main action:

- Tool: example-mcp-server example_tool
- Parameters: \{ "key": "$setting_value" }

This calls the MCP server tool to execute the operation.
``

### Step 3: Process Results

Process the results and provide output:

`` bash
echo ""
echo "✅ Command completed successfully!"
echo ""
echo "Results:"
echo "  • Item 1: Value"
echo "  • Item 2: Value"
echo ""
``

### Step 4: Save Output (Optional)

Save results to a file if needed:

``bash
output_file=".specify/my-extension-output.json"

cat > "$output_file" <&lt;EOF
\{
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "setting": "$setting_value",
  "results": []
\}
EOF

echo "💾 Output saved to $output_file"
``

## Configuration Reference

This command uses the following configuration from `my-extension-config.yml`:

- **settings.key**: Description of what this setting does
  - Type: string
  - Required: Yes
  - Example: `"example-value"`

- **settings.another_key**: Description of another setting
  - Type: boolean
  - Required: No
  - Default: `false`
  - Example: `true`

## Environment Variables

Configuration can be overridden with environment variables:

- `SPECKIT_MY_EXTENSION_KEY` - Overrides `settings.key`
- `SPECKIT_MY_EXTENSION_ANOTHER_KEY` - Overrides `settings.another_key`

Example:
``bash
export SPECKIT_MY_EXTENSION_KEY="override-value"
``

## Troubleshooting

### "Configuration not found"

**Solution**: Install the extension and create configuration:
``bash
specify extension add my-extension
cp .specify/extensions/my-extension/config-template.yml \
   .specify/extensions/my-extension/my-extension-config.yml
``

### "MCP tool not available"

**Solution**: Ensure MCP server is configured in your AI agent settings.

### "Permission denied"

**Solution**: Check credentials and permissions in the external service.

## Notes

- This command requires an active connection to the external service
- Results are cached for performance
- Re-run the command to refresh data

## Examples

### Example 1: Basic Usage

``bash

# Run with default configuration
>
> /speckit.my-extension.example
``

### Example 2: With Environment Override

``bash

# Override configuration with environment variable

export SPECKIT_MY_EXTENSION_KEY="custom-value"
> /speckit.my-extension.example
``

### Example 3: After Core Command

``bash

# Use as part of a workflow
>
> /speckit.tasks
> /speckit.my-extension.example
``

---

*For more information, see the extension README or run `specify extension info my-extension`*
