---
title: "Create MCP Server PRP"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/use-cases/mcp-server/.claude/commands/prp-mcp-create.md"
sourceRel: "use-cases/mcp-server/.claude/commands/prp-mcp-create.md"
rawUrl: "/raw/10-context-memory/context-engineering-intro/use-cases/mcp-server/.claude/commands/prp-mcp-create.md"
sourceSha256: "e0c579970885e6f09266b330fd909ddd4929346a05e546cc0254fbdb7d313224"
pageSha256: "e0c579970885e6f09266b330fd909ddd4929346a05e546cc0254fbdb7d313224"
contentMode: "local-full"
zh: ""
---

# Create MCP Server PRP

Create a comprehensive Product Requirement Prompt (PRP) for building Model Context Protocol (MCP) servers with authentication, database integration, and Cloudflare Workers deployment.

Before you start ensure that you read these key files to get an understanding about the goal of the PRP:
PRPs/README.md
PRPs/templates/prp_mcp_base.md (This base PRP is already partially filled out based on the project structure but please finish it specific to the user's use case for an MCP server)

## Users MCP use case: $ARGUMENTS

## Purpose

Generate context-rich PRPs specifically designed for MCP server development, using the proven patterns in this codebase that is a scaffolding of a MCP server setup that the user can build upon, including GitHub OAuth, and production-ready Cloudflare Workers deployment.

None of the existing tools will likely be reused and the tools should be created for the users use case specifically tailored to their needs.

## Execution Process

1. **Research & Context Gathering**
   - Create clear todos and spawn subagents to search the codebase for similar features/patterns Think hard and plan your approach
   - Gather relevant documentation about MCP tools, resources, and authentication flows
   - Research existing tool patterns to understand how to build the users specified use case
   - Study existing integration patterns in the codebase

2. **Generate Comprehensive PRP**
   - Use the specialized `PRPs/templates/prp_mcp_base.md` template as the foundation
   - Customize the template with specific server requirements and functionality
   - Include all necessary context from the codebase patterns and ai_docs
   - Add specific validation loops for MCP server development
   - Include database integration patterns and security considerations

3. **Enhance with AI docs**
   - The use might have added docs in PRPs/ai_docs/ directory that you should read
   - If there are docs in the PRPs/ai_docs/ directory, review them and take them into context as you build the PRP

## Implementation Details

### PRP Structure for MCP Servers

The generated PRP uses the specialized template `PRPs/templates/prp_mcp_base.md` and includes:

- **Goal**: Clear description of the MCP server to be built with authentication and database integration
- **Context**: All necessary documentation including PRPs/ai_docs/ references and existing codebase patterns
- **Implementation Blueprint**: Step-by-step TypeScript tasks following Cloudflare Workers patterns
- **Validation Loop**: Comprehensive MCP-specific testing from compilation to production deployment
- **Security Considerations**: GitHub OAuth flows, database access patterns, and SQL injection protection

### Key Features

- **Context-Rich**: Includes all patterns and references using relative paths from this proven codebase
- **Validation-Driven**: Multi-level validation from syntax to production deployment
- **Security-First**: Built-in authentication and authorization patterns
- **Production-Ready**: Cloudflare Workers deployment and monitoring

### Research Areas

1. **MCP Protocol Patterns**
   - Tool registration and validation
   - Resource serving and caching
   - Error handling and logging
   - Client communication patterns

2. **Authentication Integration**
   - GitHub OAuth implementation
   - User permission systems
   - Token management and validation
   - Session handling patterns

## Output

Creates a comprehensive PRP file in the PRPs/ directory with:

- All necessary context and code patterns
- Step-by-step implementation tasks
- Validation loops for MCP server development

## Validation

The command ensures:

- All referenced code patterns exist in the codebase
- Documentation links are valid and accessible
- Implementation tasks are specific and actionable
- Validation loops are comprehensive and executable by claude code (IMPORTANT)

## Integration with Existing Patterns

- Uses specialized MCP template from `PRPs/templates/prp_mcp_base.md`
- Follows the established directory structure and naming conventions
- Integrates with existing validation patterns and tools
- Leverages proven patterns from the current MCP server implementation in `src/`
