---
title: "JSON Schema Reference for M365 Copilot Agents"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/declarative-agent-developer/references/schema.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/declarative-agent-developer/references/schema.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/declarative-agent-developer/references/schema.md"
sourceSha256: "7b8cff6225891e407df5f8ea3dfc2a5d8c38ba5dec241007c88ecaebce386d06"
pageSha256: "7b8cff6225891e407df5f8ea3dfc2a5d8c38ba5dec241007c88ecaebce386d06"
contentMode: "local-full"
zh: ""
---

# JSON Schema Reference for M365 Copilot Agents

This document provides schema version information, compatibility rules, and links to the official documentation for M365 Copilot declarative agent and API plugin manifests.

For full property details, examples, and JSON structures, refer to the linked GitHub documentation below.

## Schema Resources

### Declarative Agent Manifest Versions

| Version | JSON Schema | Documentation |
|---------|-------------|---------------|
| **v1.6** | [schema.json](https://developer.microsoft.com/json-schemas/copilot/declarative-agent/v1.6/schema.json) | [declarative-agent-manifest-1.6.md](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/main/docs/declarative-agent-manifest-1.6.md) |
| v1.5 | [schema.json](https://developer.microsoft.com/json-schemas/copilot/declarative-agent/v1.5/schema.json) | [declarative-agent-manifest-1.5.md](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/main/docs/declarative-agent-manifest-1.5.md) |
| v1.4 | [schema.json](https://developer.microsoft.com/json-schemas/copilot/declarative-agent/v1.4/schema.json) | [declarative-agent-manifest-1.4.md](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/main/docs/declarative-agent-manifest-1.4.md) |
| v1.3 | [schema.json](https://developer.microsoft.com/json-schemas/copilot/declarative-agent/v1.3/schema.json) | [declarative-agent-manifest-1.3.md](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/main/docs/declarative-agent-manifest-1.3.md) |
| v1.2 | [schema.json](https://developer.microsoft.com/json-schemas/copilot/declarative-agent/v1.2/schema.json) | [declarative-agent-manifest-1.2.md](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/main/docs/declarative-agent-manifest-1.2.md) |
| v1.0 | [schema.json](https://developer.microsoft.com/json-schemas/copilot/declarative-agent/v1.0/schema.json) | [declarative-agent-manifest-1.0.md](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/main/docs/declarative-agent-manifest-1.0.md) |

### API Plugin Manifest Versions

| Version | JSON Schema | Documentation |
|---------|-------------|---------------|
| **v2.4** | [schema.json](https://aka.ms/json-schemas/copilot/plugin/v2.4/schema.json) | [plugin-manifest-2.4.md](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/main/docs/plugin-manifest-2.4.md) |
| v2.3 | [schema.json](https://aka.ms/json-schemas/copilot/plugin/v2.3/schema.json) | [plugin-manifest-2.3.md](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/main/docs/plugin-manifest-2.3.md) |
| v2.2 | [schema.json](https://aka.ms/json-schemas/copilot/plugin/v2.2/schema.json) | [plugin-manifest-2.2.md](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/main/docs/plugin-manifest-2.2.md) |
| v2.1 | [schema.json](https://aka.ms/json-schemas/copilot/plugin/v2.1/schema.json) | [plugin-manifest-2.1.md](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/main/docs/plugin-manifest-2.1.md) |

---

## How to Use These References

When building or editing an agent manifest, **fetch the documentation for the version you are using** from the links above. The linked docs contain:

- Complete property definitions with types, descriptions, and constraints
- JSON examples for every object type (capabilities, actions, runtimes, etc.)
- Capability configuration details (WebSearch sites, OneDriveAndSharePoint items_by_url, Email shared_mailbox, etc.)
- API plugin function and runtime structures
- Response semantics and Adaptive Card templates
- MCP Server (RemoteMCPServer) runtime configuration
