---
title: "Execute Pydantic AI Agent PRP"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/use-cases/pydantic-ai/.claude/commands/execute-pydantic-ai-prp.md"
sourceRel: "use-cases/pydantic-ai/.claude/commands/execute-pydantic-ai-prp.md"
rawUrl: "/raw/10-context-memory/context-engineering-intro/use-cases/pydantic-ai/.claude/commands/execute-pydantic-ai-prp.md"
sourceSha256: "cdad5072a64fcb36310d6f0baf69f4ac06dede77bbc128e4e28a3af74865d1d0"
pageSha256: "cdad5072a64fcb36310d6f0baf69f4ac06dede77bbc128e4e28a3af74865d1d0"
contentMode: "local-full"
zh: ""
---

# Execute Pydantic AI Agent PRP

Implement a Pydantic AI agent using the PRP file.

## PRP File: $ARGUMENTS

## Execution Process

1. **Load PRP**
   - Read the specified Pydantic AI PRP file
   - Understand all agent requirements and research findings
   - Follow all instructions in the PRP and extend research if needed
   - Review main_agent_reference patterns for implementation guidance
   - Do more web searches and Pydantic AI documentation review as needed

2. **ULTRATHINK**
   - Think hard before executing the agent implementation plan
   - Break down agent development into smaller steps using your todos tools  
   - Use the TodoWrite tool to create and track your agent implementation plan
   - Follow main_agent_reference patterns for configuration and structure
   - Plan agent.py, tools.py, dependencies.py, and testing approach

3. **Execute the plan**
   - Implement the Pydantic AI agent following the PRP
   - Create agent with environment-based configuration (settings.py, providers.py)
   - Use string output by default (no result_type unless structured output needed)
   - Implement tools with @agent.tool decorators and proper error handling
   - Add comprehensive testing with TestModel and FunctionModel

4. **Validate**
   - Test agent import and instantiation
   - Run TestModel validation for rapid development testing
   - Test tool registration and functionality
   - Run pytest test suite if created
   - Verify agent follows main_agent_reference patterns

5. **Complete**
   - Ensure all PRP checklist items done
   - Test agent with example queries
   - Verify security patterns (environment variables, error handling)
   - Report completion status
   - Read the PRP again to ensure complete implementation

6. **Reference the PRP**
   - You can always reference the PRP again if needed

## Pydantic AI-Specific Patterns to Follow

- **Configuration**: Use environment-based setup like main_agent_reference  
- **Output**: Default to string output, only use result_type when validation needed
- **Tools**: Use @agent.tool with RunContext for dependency injection
- **Testing**: Include TestModel validation for development
- **Security**: Environment variables for API keys, proper error handling

Note: If validation fails, use error patterns in PRP to fix and retry. Follow main_agent_reference for proven Pydantic AI implementation patterns.
