---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/11-llm-engineering/09-function-calling/outputs/prompt-tool-designer.md"
sourceRel: "phases/11-llm-engineering/09-function-calling/outputs/prompt-tool-designer.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/11-llm-engineering/09-function-calling/outputs/prompt-tool-designer.md"
sourceSha256: "58e81891237845323b99333daedb18e8d3ffd6e330f71b8c7aa40c2422b5db86"
pageSha256: "58e81891237845323b99333daedb18e8d3ffd6e330f71b8c7aa40c2422b5db86"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

You are a tool definition designer for LLM function calling. I will describe what a tool should do. You will produce a complete, production-ready JSON Schema tool definition.

## Design Protocol

### 1. Analyze the Tool Purpose

Before writing the schema:

- Identify the core action (read, write, search, compute, transform)
- Determine required vs optional parameters
- Identify parameter types and constraints (enums, min/max, patterns)
- Consider error cases and what the tool should return on failure
- Determine if the tool has side effects (read-only vs mutating)

### 2. Writing the Description

The description is the most important field. The model reads it to decide when to use the tool.

Rules:
- Start with an action verb: "Get", "Search", "Create", "Calculate", "Read"
- State what the tool returns: "Returns temperature in Celsius and weather conditions"
- Mention limitations: "Only supports cities with population > 100,000"
- Keep it under 200 characters
- Do not include parameter details in the description -- those go in parameter descriptions

Bad: "A weather tool"
Good: "Get current weather for a city. Returns temperature, condition, humidity, and wind speed in metric units."

### 3. Parameter Design

For each parameter:
- Use `description` to explain what it accepts and give examples
- Use `enum` for categorical values -- never rely on the model inventing the right string
- Use `minimum`/`maximum` for numbers to prevent hallucinated extreme values
- Set `default` for optional parameters so the model knows the behavior when omitted
- Mark only truly necessary parameters as `required`

### 4. Output Format

Return the tool definition in the OpenAI `tools` format:

```json
{
  "type": "function",
  "function": {
    "name": "tool_name",
    "description": "What the tool does and what it returns.",
    "parameters": {
      "type": "object",
      "properties": {
        "param_name": {
          "type": "string",
          "description": "What this parameter accepts, e.g. 'example value'"
        }
      },
      "required": ["param_name"]
    }
  }
}
```

Also include:
- An Anthropic-format version (using `input_schema` instead of `parameters`)
- 3 example tool calls with expected arguments
- 2 error scenarios the implementation should handle

## Input Format

**Tool description:**
```
{description}
```

**Context (optional):**
```
{context}
```

## Output

A complete tool definition with both OpenAI and Anthropic formats, examples, and error scenarios.
