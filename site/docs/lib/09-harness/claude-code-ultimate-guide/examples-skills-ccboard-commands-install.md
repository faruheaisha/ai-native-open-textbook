---
title: "Install ccboard Command"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/ccboard/commands/install.md"
sourceRel: "examples/skills/ccboard/commands/install.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/ccboard/commands/install.md"
sourceSha256: "1c0036fcf744dbe9af7f1a83fa95333d69757be70432ba14e2f5d1a53b0475ac"
pageSha256: "1c0036fcf744dbe9af7f1a83fa95333d69757be70432ba14e2f5d1a53b0475ac"
contentMode: "local-full"
zh: ""
---

# Install ccboard Command

Install or update the ccboard binary via cargo.

## What is ccboard?

ccboard is a comprehensive TUI/Web dashboard for monitoring and managing Claude Code:

- **8 Interactive Tabs**: Dashboard, Sessions, Config, Hooks, Agents, Costs, History, MCP
- **Real-time Monitoring**: File watcher for live updates
- **MCP Management**: Server status and configuration
- **Cost Analytics**: Token usage and pricing tracking
- **Session Explorer**: Browse and search conversation history
- **Dual Interface**: Terminal (TUI) and Web UI

## Requirements

- **Rust**: Version 1.70 or higher
- **Cargo**: Rust package manager (comes with Rust)

If Rust is not installed:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## Usage

```bash
# Install ccboard
/ccboard-install

# Or manually
cargo install ccboard
```

## Installation Process

1. Checks if cargo is installed
2. Detects existing ccboard installation
3. Prompts for update confirmation if already installed
4. Installs via `cargo install ccboard --force`
5. Verifies installation and shows version

## After Installation

Once installed, use these commands:

- `/dashboard` - Launch TUI dashboard
- `/mcp-status` - Open MCP servers tab
- `/costs` - Open costs analysis
- `/sessions` - Browse sessions history
- `/ccboard-web` - Launch web interface

Or run directly:
```bash
ccboard              # Launch TUI
ccboard web          # Launch web UI
ccboard --help       # Show all options
```

## Troubleshooting

### Cargo not found
```bash
# Install Rust and cargo
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Reload shell
source $HOME/.cargo/env
```

### Installation fails
```bash
# Update Rust toolchain
rustup update

# Try manual installation from source
git clone https://github.com/{OWNER}/ccboard
cd ccboard
cargo install --path crates/ccboard
```

### Permission denied
```bash
# Ensure ~/.cargo/bin is in PATH
echo 'export PATH="$HOME/.cargo/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

## Implementation

```bash
#!/bin/bash

# Run installation script
exec "$(dirname "$0")/../scripts/install-ccboard.sh"
```

## Uninstallation

To remove ccboard:
```bash
cargo uninstall ccboard
```
