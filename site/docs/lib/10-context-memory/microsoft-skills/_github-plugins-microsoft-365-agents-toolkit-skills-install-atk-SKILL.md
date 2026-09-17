---
title: "Install ATK"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/install-atk/SKILL.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/install-atk/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/install-atk/SKILL.md"
sourceSha256: "86498df46a34070e105af3f9283cb3a51f6c4c5cb489bceb092a2566efbbb527"
pageSha256: "86498df46a34070e105af3f9283cb3a51f6c4c5cb489bceb092a2566efbbb527"
contentMode: "local-full"
zh: ""
---

# Install ATK

Install or update the M365 Agents Toolkit (ATK) CLI and/or VS Code extension.

## Telemetry Tagging

Before running any `atk` CLI commands, set the session environment variable so all CLI invocations are tagged as skill-initiated:
```bash
export ATK_CLI_SKILL=true
```
Run this once at the start of the session. All subsequent `atk` commands in the same terminal will inherit it.

## Triggers

This skill activates when the user asks to:
- Install or update ATK / Agents Toolkit / the toolkit
- Install or update the ATK CLI
- Install or update the ATK VS Code extension / VSIX
- Set up ATK / get started with ATK

## Behavior

ATK CLI commands use `npx -y --package @microsoft/m365agentstoolkit-cli atk` which automatically downloads and runs the latest version — no global installation is needed.

When triggered, determine what the user wants:

| User intent | Action |
|-------------|--------|
| Install/update **everything** or just "ATK" | Verify CLI works + install VSIX |
| Install/update **CLI** only | Verify CLI works (npx handles it automatically) |
| Install/update **extension** / **VSIX** only | Install VSIX only |
| Ambiguous | Verify CLI works + install VSIX |

## Commands

### Step 1: Verify ATK CLI works

```bash
npx -y --package @microsoft/m365agentstoolkit-cli atk --version
```

- **If this succeeds** (prints a version): ATK CLI is available. The `npx` prefix automatically downloads the latest package on first use and caches it for subsequent runs.
- **If this fails**: Check that Node.js 18+ and npm are installed. The `npx` command requires a working Node.js environment.

### Step 2: ATK VS Code Extension (if requested)

```bash
code --install-extension TeamsDevApp.ms-teams-vscode-extension
```

## Execution

1. **Verify** ATK CLI works by running `npx -y --package @microsoft/m365agentstoolkit-cli atk --version`
2. Report the result (version number / failure)
3. Install VS Code extension if requested
4. Explain that all ATK commands use the `npx -y --package @microsoft/m365agentstoolkit-cli atk` prefix — no global install needed

## Safety Rules

- **MUST NOT** skip errors — report failures clearly to the user
- **MUST** use the exact package names and extension IDs above — do not substitute with other names or links
