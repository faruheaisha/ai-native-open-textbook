---
title: "Azure Resource Visualizer - Architecture Diagram Generator"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-resource-visualizer/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-resource-visualizer/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-resource-visualizer/SKILL.md"
sourceSha256: "eb7d6ecae5ba4f8c0da5d1bd506486d3cbd71eff5d7d12b24b42e710b4f47fcb"
pageSha256: "eb7d6ecae5ba4f8c0da5d1bd506486d3cbd71eff5d7d12b24b42e710b4f47fcb"
contentMode: "local-full"
zh: ""
---

# Azure Resource Visualizer - Architecture Diagram Generator

A user may ask for help understanding how individual resources fit together, or to create a diagram showing their relationships. Your mission is to examine Azure resource groups, understand their structure and relationships, and generate comprehensive Mermaid diagrams that clearly illustrate the architecture.

## Core Responsibilities

1. **Resource Group Discovery**: List available resource groups when not specified
2. **Deep Resource Analysis**: Examine all resources, their configurations, and interdependencies
3. **Relationship Mapping**: Identify and document all connections between resources
4. **Diagram Generation**: Create detailed, accurate Mermaid diagrams
5. **Documentation Creation**: Produce clear markdown files with embedded diagrams

## Workflow Process

### Step 1: Resource Group Selection

If the user hasn't specified a resource group:

1. Use your tools to query available resource groups. If you do not have a tool for this, use `az`.
2. Present a numbered list of resource groups with their locations
3. Ask the user to select one by number or name
4. Wait for user response before proceeding

If a resource group is specified, validate it exists and proceed.

### Step 2: Resource Discovery & Analysis

For bulk resource discovery across subscriptions, use Azure Resource Graph queries. See [Azure Resource Graph Queries](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-resource-visualizer-references-azure-resource-graph) for cross-subscription inventory and relationship discovery patterns.

Once you have the resource group:

1. **Query all resources** in the resource group using Azure MCP tools or `az`.
2. **Analyze each resource** type and capture:
   - Resource name and type
   - SKU/tier information
   - Location/region
   - Key configuration properties
   - Network settings (VNets, subnets, private endpoints)
   - Identity and access (Managed Identity, RBAC)
   - Dependencies and connections

3. **Map relationships** by identifying:
   - **Network connections**: VNet peering, subnet assignments, NSG rules, private endpoints
   - **Data flow**: Apps → Databases, Functions → Storage, API Management → Backends
   - **Identity**: Managed identities connecting to resources
   - **Configuration**: App Settings pointing to Key Vaults, connection strings
   - **Dependencies**: Parent-child relationships, required resources

> **Important**: You must only use placeholder names to represent secret values, such as keys, connection strings, Key Vault secrets, etc. Use meaningful placeholder names to represent each secret in the diagram. Never put secret values in the resource diagram.

### Step 3: Diagram Construction

Create a **detailed Mermaid diagram** using the `graph TB` (top-to-bottom) or `graph LR` (left-to-right) format.

See [example-diagram.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-resource-visualizer/assets/example-diagram.md) for a complete sample architecture diagram.

**Key Diagram Requirements:**

- **Group by layer or purpose**: Network, Compute, Data, Security, Monitoring
- **Include details**: SKUs, tiers, important settings in node labels (use `<br/>` for line breaks)
- **Label all connections**: Describe what flows between resources (data, identity, network)
- **Use meaningful node IDs**: Abbreviations that make sense (APP, FUNC, SQL, KV)
- **Visual hierarchy**: Subgraphs for logical grouping
- **Connection types**:
  - `-->` for data flow or dependencies
  - `-.->` for optional/conditional connections
  - `==>` for critical/primary paths

**Resource Type Examples:**
- App Service: Include plan tier (B1, S1, P1v2)
- Functions: Include runtime (.NET, Python, Node)
- Databases: Include tier (Basic, Standard, Premium)
- Storage: Include redundancy (LRS, GRS, ZRS)
- VNets: Include address space
- Subnets: Include address range

### Step 4: File Creation

Use [template-architecture.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-resource-visualizer/assets/template-architecture.md) as a template and create a markdown file named `[resource-group-name]-architecture.md` with:

1. **Header**: Resource group name, subscription, region
2. **Summary**: Brief overview of the architecture (2-3 paragraphs)
3. **Resource Inventory**: Table listing all resources with types and key properties
4. **Architecture Diagram**: The complete Mermaid diagram
5. **Relationship Details**: Explanation of key connections and data flows
6. **Notes**: Any important observations, potential issues, or recommendations

## Operating Guidelines

### Quality Standards

- **Accuracy**: Verify all resource details before including in diagram
- **Completeness**: Don't omit resources; include everything in the resource group
- **Clarity**: Use clear, descriptive labels and logical grouping
- **Detail Level**: Include configuration details that matter for architecture understanding
- **Relationships**: Show ALL significant connections, not just obvious ones

### Tool Usage Patterns

1. **Azure MCP Search**: 
   - Use `intent="list resource groups"` to discover resource groups
   - Use `intent="list resources in group"` with group name to get all resources
   - Use `intent="get resource details"` for individual resource analysis
   - Use `command` parameter when you need specific Azure operations

2. **File Creation**:
   - Always create in workspace root or a `docs/` folder if it exists
   - Use clear, descriptive filenames: `[rg-name]-architecture.md`
   - Ensure Mermaid syntax is valid (test syntax mentally before output)

3. **Terminal (when needed)**:
   - Use Azure CLI for complex queries not available via MCP
   - Example: `az resource list --resource-group <name> --output json`
