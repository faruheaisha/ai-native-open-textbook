---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/build-with-claude/mid-conversation-effort-example.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/mid-conversation-effort-example.md"
sourceSha256: "88a2fa6d07b354b90d37bbab7c6c1f65502776a31e4be76eaefe73d788798fbd"
pageSha256: "699f16dc5247aa772799cef20e6b8c16b7c047c33bd324d8f718071c867748c9"
contentMode: "local-full"
zh: ""
---

## Grant standing consent in the tool description

The Workflow tool carries the real behavioral contract: the opt-in rule, the standing consent that applies while the mode is on, granularity guidance for sizing the fan-out, and the quality patterns the model can reach for (a verification wave, a completeness critic, multiphase sequencing). Subagents also get a `report_findings` tool so their results come back as structured JSON instead of prose, and the bash tool is the Anthropic-defined `bash_20250124` tool run locally.

  ```python Python
  WORKFLOW_TOOL = {
      "name": "Workflow",
      "description": (
          "Orchestrate a multiagent workflow: split a large task into independent subtasks "
          "and run them as parallel agents, then collect their results.\n\n"
          "Opt-in: only use this tool when the user explicitly asks for a workflow, or when a "
          "system message confirms that orchestration mode is on.\n\n"
          "Quality patterns: adversarial verification (a second wave of agents checks the first "
          "wave's findings against the source), a completeness critic (one agent hunts for what "
          "the others missed), and multiphase sequencing (understand, design, implement, and "
          "review as separate workflow calls, reading results between phases). A useful default "
          "is hybrid: scout inline first to discover the work-list, then fan out over it.\n\n"
          "Granularity: scope each subtask to a distinct concern, component, or question rather "
          "than per line or per file section. Scale the count to what the user asked for: a "
          "focused review of a module of a few hundred lines rarely needs more than about ten "
          "subtasks; a broad audit of a large codebase can justify more.\n\n"
          "Standing consent: while a system message confirms orchestration mode is on, that "
          "opt-in is standing. Author and run a workflow for every substantive task by default, "
          "and lean toward verifying findings adversarially. Work solo only on conversational "
          "turns or trivial mechanical edits. When a system message says the mode is off, "
          "revert to the opt-in rule above."
      ),
      "input_schema": {
          "type": "object",
          "properties": {
              "subtasks": {
                  "type": "array",
                  "items": {"type": "string"},
                  "description": "Independent subtask prompts to run as parallel agents",
              }
          },
          "required": ["subtasks"],
      },
  }

  BASH_TOOL = {"type": "bash_20250124", "name": "bash"}

  REPORT_TOOL = {
      "name": "report_findings",
      "description": (
          "Report the final findings for your subtask. Call this exactly once, when you are "
          "done investigating; it ends your task."
      ),
      "input_schema": {
          "type": "object",
          "properties": {
              "summary": {"type": "string", "description": "Two or three sentences of synthesis"},
              "findings": {
                  "type": "array",
                  "items": {
                      "type": "object",
                      "properties": {
                          "claim": {"type": "string", "description": "The finding, one sentence"},
                          "evidence": {
                              "type": "string",
                              "description": "How it was verified (file, line, or command output)",
                          },
                          "severity": {"type": "string", "enum": ["high", "medium", "low", "info"]},
                      },
                      "required": ["claim", "evidence", "severity"],
                  },
              },
          },
          "required": ["summary", "findings"],
      },
  }
  ```

  ```typescript TypeScript
  const WORKFLOW_TOOL: Anthropic.Tool = {
    name: "Workflow",
    description:
      "Orchestrate a multiagent workflow: split a large task into independent subtasks " +
      "and run them as parallel agents, then collect their results.\n\n" +
      "Opt-in: only use this tool when the user explicitly asks for a workflow, or when a " +
      "system message confirms that orchestration mode is on.\n\n" +
      "Quality patterns: adversarial verification (a second wave of agents checks the first " +
      "wave's findings against the source), a completeness critic (one agent hunts for what " +
      "the others missed), and multiphase sequencing (understand, design, implement, and " +
      "review as separate workflow calls, reading results between phases). A useful default " +
      "is hybrid: scout inline first to discover the work-list, then fan out over it.\n\n" +
      "Granularity: scope each subtask to a distinct concern, component, or question rather " +
      "than per line or per file section. Scale the count to what the user asked for: a " +
      "focused review of a module of a few hundred lines rarely needs more than about ten " +
      "subtasks; a broad audit of a large codebase can justify more.\n\n" +
      "Standing consent: while a system message confirms orchestration mode is on, that " +
      "opt-in is standing. Author and run a workflow for every substantive task by default, " +
      "and lean toward verifying findings adversarially. Work solo only on conversational " +
      "turns or trivial mechanical edits. When a system message says the mode is off, " +
      "revert to the opt-in rule above.",
    input_schema: {
      type: "object",
      properties: {
        subtasks: {
          type: "array",
          items: { type: "string" },
          description: "Independent subtask prompts to run as parallel agents",
        },
      },
      required: ["subtasks"],
    },
  };

  const BASH_TOOL: Anthropic.ToolBash20250124 = { type: "bash_20250124", name: "bash" };

  const REPORT_TOOL: Anthropic.Tool = {
    name: "report_findings",
    description:
      "Report the final findings for your subtask. Call this exactly once, when you are " +
      "done investigating; it ends your task.",
    input_schema: {
      type: "object",
      properties: {
        summary: { type: "string", description: "Two or three sentences of synthesis" },
        findings: {
          type: "array",
          items: {
            type: "object",
            properties: {
              claim: { type: "string", description: "The finding, one sentence" },
              evidence: {
                type: "string",
                description: "How it was verified (file, line, or command output)",
              },
              severity: { type: "string", enum: ["high", "medium", "low", "info"] },
            },
            required: ["claim", "evidence", "severity"],
          },
        },
      },
      required: ["summary", "findings"],
    },
  };
  ```

  ```csharp C#
  Tool workflowTool = new()
  {
      Name = "Workflow",
      Description =
          "Orchestrate a multiagent workflow: split a large task into independent subtasks "
          + "and run them as parallel agents, then collect their results.\n\n"
          + "Opt-in: only use this tool when the user explicitly asks for a workflow, or when a "
          + "system message confirms that orchestration mode is on.\n\n"
          + "Quality patterns: adversarial verification (a second wave of agents checks the first "
          + "wave's findings against the source), a completeness critic (one agent hunts for what "
          + "the others missed), and multiphase sequencing (understand, design, implement, and "
          + "review as separate workflow calls, reading results between phases). A useful default "
          + "is hybrid: scout inline first to discover the work-list, then fan out over it.\n\n"
          + "Granularity: scope each subtask to a distinct concern, component, or question rather "
          + "than per line or per file section. Scale the count to what the user asked for: a "
          + "focused review of a module of a few hundred lines rarely needs more than about ten "
          + "subtasks; a broad audit of a large codebase can justify more.\n\n"
          + "Standing consent: while a system message confirms orchestration mode is on, that "
          + "opt-in is standing. Author and run a workflow for every substantive task by default, "
          + "and lean toward verifying findings adversarially. Work solo only on conversational "
          + "turns or trivial mechanical edits. When a system message says the mode is off, "
          + "revert to the opt-in rule above.",
      InputSchema = new InputSchema
      {
          Properties = new Dictionary<string, JsonElement>
          {
              ["subtasks"] = JsonSerializer.SerializeToElement(new
              {
                  type = "array",
                  items = new { type = "string" },
                  description = "Independent subtask prompts to run as parallel agents",
              }),
          },
          Required = ["subtasks"],
      },
  };

  ToolBash20250124 bashTool = new();

  Tool reportTool = new()
  {
      Name = "report_findings",
      Description =
          "Report the final findings for your subtask. Call this exactly once, when you are "
          + "done investigating; it ends your task.",
      InputSchema = new InputSchema
      {
          Properties = new Dictionary<string, JsonElement>
          {
              ["summary"] = JsonSerializer.SerializeToElement(new
              {
                  type = "string",
                  description = "Two or three sentences of synthesis",
              }),
              ["findings"] = JsonSerializer.SerializeToElement(new
              {
                  type = "array",
                  items = new
                  {
                      type = "object",
                      properties = new
                      {
                          claim = new { type = "string", description = "The finding, one sentence" },
                          evidence = new
                          {
                              type = "string",
                              description = "How it was verified (file, line, or command output)",
                          },
                          severity = new { type = "string", @enum = new[] { "high", "medium", "low", "info" } },
                      },
                      required = new[] { "claim", "evidence", "severity" },
                  },
              }),
          },
          Required = ["summary", "findings"],
      },
  };
  ```

  ```go Go
  var workflowTool = anthropic.ToolUnionParam{
  	OfTool: &anthropic.ToolParam{
  		Name: "Workflow",
  		Description: anthropic.String("Orchestrate a multiagent workflow: split a large task into independent subtasks " +
  			"and run them as parallel agents, then collect their results.\n\n" +
  			"Opt-in: only use this tool when the user explicitly asks for a workflow, or when a " +
  			"system message confirms that orchestration mode is on.\n\n" +
  			"Quality patterns: adversarial verification (a second wave of agents checks the first " +
  			"wave's findings against the source), a completeness critic (one agent hunts for what " +
  			"the others missed), and multiphase sequencing (understand, design, implement, and " +
  			"review as separate workflow calls, reading results between phases). A useful default " +
  			"is hybrid: scout inline first to discover the work-list, then fan out over it.\n\n" +
  			"Granularity: scope each subtask to a distinct concern, component, or question rather " +
  			"than per line or per file section. Scale the count to what the user asked for: a " +
  			"focused review of a module of a few hundred lines rarely needs more than about ten " +
  			"subtasks; a broad audit of a large codebase can justify more.\n\n" +
  			"Standing consent: while a system message confirms orchestration mode is on, that " +
  			"opt-in is standing. Author and run a workflow for every substantive task by default, " +
  			"and lean toward verifying findings adversarially. Work solo only on conversational " +
  			"turns or trivial mechanical edits. When a system message says the mode is off, " +
  			"revert to the opt-in rule above."),
  		InputSchema: anthropic.ToolInputSchemaParam{
  			Properties: map[string]any{
  				"subtasks": map[string]any{
  					"type":        "array",
  					"items":       map[string]any{"type": "string"},
  					"description": "Independent subtask prompts to run as parallel agents",
  				},
  			},
  			Required: []string{"subtasks"},
  		},
  	},
  }

  var bashTool = anthropic.ToolUnionParam{
  	OfBashTool20250124: &anthropic.ToolBash20250124Param{},
  }

  var reportTool = anthropic.ToolUnionParam{
  	OfTool: &anthropic.ToolParam{
  		Name: "report_findings",
  		Description: anthropic.String("Report the final findings for your subtask. Call this exactly once, when you are " +
  			"done investigating; it ends your task."),
  		InputSchema: anthropic.ToolInputSchemaParam{
  			Properties: map[string]any{
  				"summary": map[string]any{"type": "string", "description": "Two or three sentences of synthesis"},
  				"findings": map[string]any{
  					"type": "array",
  					"items": map[string]any{
  						"type": "object",
  						"properties": map[string]any{
  							"claim": map[string]any{"type": "string", "description": "The finding, one sentence"},
  							"evidence": map[string]any{
  								"type":        "string",
  								"description": "How it was verified (file, line, or command output)",
  							},
  							"severity": map[string]any{"type": "string", "enum": []string{"high", "medium", "low", "info"}},
  						},
  						"required": []string{"claim", "evidence", "severity"},
  					},
  				},
  			},
  			Required: []string{"summary", "findings"},
  		},
  	},
  }

  ```

  ```java Java
  static final Tool WORKFLOW_TOOL = Tool.builder()
          .name("Workflow")
          .description("Orchestrate a multiagent workflow: split a large task into independent subtasks "
                  + "and run them as parallel agents, then collect their results.\n\n"
                  + "Opt-in: only use this tool when the user explicitly asks for a workflow, or when a "
                  + "system message confirms that orchestration mode is on.\n\n"
                  + "Quality patterns: adversarial verification (a second wave of agents checks the first "
                  + "wave's findings against the source), a completeness critic (one agent hunts for what "
                  + "the others missed), and multiphase sequencing (understand, design, implement, and "
                  + "review as separate workflow calls, reading results between phases). A useful default "
                  + "is hybrid: scout inline first to discover the work-list, then fan out over it.\n\n"
                  + "Granularity: scope each subtask to a distinct concern, component, or question rather "
                  + "than per line or per file section. Scale the count to what the user asked for: a "
                  + "focused review of a module of a few hundred lines rarely needs more than about ten "
                  + "subtasks; a broad audit of a large codebase can justify more.\n\n"
                  + "Standing consent: while a system message confirms orchestration mode is on, that "
                  + "opt-in is standing. Author and run a workflow for every substantive task by default, "
                  + "and lean toward verifying findings adversarially. Work solo only on conversational "
                  + "turns or trivial mechanical edits. When a system message says the mode is off, "
                  + "revert to the opt-in rule above.")
          .inputSchema(Tool.InputSchema.builder()
                  .properties(JsonValue.from(Map.of(
                          "subtasks", Map.of(
                                  "type", "array",
                                  "items", Map.of("type", "string"),
                                  "description", "Independent subtask prompts to run as parallel agents"))))
                  .putAdditionalProperty("required", JsonValue.from(List.of("subtasks")))
                  .build())
          .build();

  static final ToolBash20250124 BASH_TOOL = ToolBash20250124.builder().build();

  static final Tool REPORT_TOOL = Tool.builder()
          .name("report_findings")
          .description("Report the final findings for your subtask. Call this exactly once, when you are "
                  + "done investigating; it ends your task.")
          .inputSchema(Tool.InputSchema.builder()
                  .properties(JsonValue.from(Map.of(
                          "summary", Map.of("type", "string", "description", "Two or three sentences of synthesis"),
                          "findings", Map.of(
                                  "type", "array",
                                  "items", Map.of(
                                          "type", "object",
                                          "properties", Map.of(
                                                  "claim", Map.of(
                                                          "type", "string",
                                                          "description", "The finding, one sentence"),
                                                  "evidence", Map.of(
                                                          "type", "string",
                                                          "description", "How it was verified (file, line, or command output)"),
                                                  "severity", Map.of(
                                                          "type", "string",
                                                          "enum", List.of("high", "medium", "low", "info"))),
                                          "required", List.of("claim", "evidence", "severity"))))))
                  .putAdditionalProperty("required", JsonValue.from(List.of("summary", "findings")))
                  .build())
          .build();
  ```

  ```php PHP
  const WORKFLOW_TOOL = [
      'name' => 'Workflow',
      'description' =>
          'Orchestrate a multiagent workflow: split a large task into independent subtasks '
          . "and run them as parallel agents, then collect their results.\n\n"
          . 'Opt-in: only use this tool when the user explicitly asks for a workflow, or when a '
          . "system message confirms that orchestration mode is on.\n\n"
          . 'Quality patterns: adversarial verification (a second wave of agents checks the first '
          . 'wave\'s findings against the source), a completeness critic (one agent hunts for what '
          . 'the others missed), and multiphase sequencing (understand, design, implement, and '
          . 'review as separate workflow calls, reading results between phases). A useful default '
          . "is hybrid: scout inline first to discover the work-list, then fan out over it.\n\n"
          . 'Granularity: scope each subtask to a distinct concern, component, or question rather '
          . 'than per line or per file section. Scale the count to what the user asked for: a '
          . 'focused review of a module of a few hundred lines rarely needs more than about ten '
          . "subtasks; a broad audit of a large codebase can justify more.\n\n"
          . 'Standing consent: while a system message confirms orchestration mode is on, that '
          . 'opt-in is standing. Author and run a workflow for every substantive task by default, '
          . 'and lean toward verifying findings adversarially. Work solo only on conversational '
          . 'turns or trivial mechanical edits. When a system message says the mode is off, '
          . 'revert to the opt-in rule above.',
      'input_schema' => [
          'type' => 'object',
          'properties' => [
              'subtasks' => [
                  'type' => 'array',
                  'items' => ['type' => 'string'],
                  'description' => 'Independent subtask prompts to run as parallel agents',
              ],
          ],
          'required' => ['subtasks'],
      ],
  ];

  const BASH_TOOL = ['type' => 'bash_20250124', 'name' => 'bash'];

  const REPORT_TOOL = [
      'name' => 'report_findings',
      'description' =>
          'Report the final findings for your subtask. Call this exactly once, when you are '
          . 'done investigating; it ends your task.',
      'input_schema' => [
          'type' => 'object',
          'properties' => [
              'summary' => ['type' => 'string', 'description' => 'Two or three sentences of synthesis'],
              'findings' => [
                  'type' => 'array',
                  'items' => [
                      'type' => 'object',
                      'properties' => [
                          'claim' => ['type' => 'string', 'description' => 'The finding, one sentence'],
                          'evidence' => [
                              'type' => 'string',
                              'description' => 'How it was verified (file, line, or command output)',
                          ],
                          'severity' => ['type' => 'string', 'enum' => ['high', 'medium', 'low', 'info']],
                      ],
                      'required' => ['claim', 'evidence', 'severity'],
                  ],
              ],
          ],
          'required' => ['summary', 'findings'],
      ],
  ];
  ```

  ```ruby Ruby
  WORKFLOW_TOOL = {
    name: "Workflow",
    description:
      "Orchestrate a multiagent workflow: split a large task into independent subtasks " \
      "and run them as parallel agents, then collect their results.\n\n" \
      "Opt-in: only use this tool when the user explicitly asks for a workflow, or when a " \
      "system message confirms that orchestration mode is on.\n\n" \
      "Quality patterns: adversarial verification (a second wave of agents checks the first " \
      "wave's findings against the source), a completeness critic (one agent hunts for what " \
      "the others missed), and multiphase sequencing (understand, design, implement, and " \
      "review as separate workflow calls, reading results between phases). A useful default " \
      "is hybrid: scout inline first to discover the work-list, then fan out over it.\n\n" \
      "Granularity: scope each subtask to a distinct concern, component, or question rather " \
      "than per line or per file section. Scale the count to what the user asked for: a " \
      "focused review of a module of a few hundred lines rarely needs more than about ten " \
      "subtasks; a broad audit of a large codebase can justify more.\n\n" \
      "Standing consent: while a system message confirms orchestration mode is on, that " \
      "opt-in is standing. Author and run a workflow for every substantive task by default, " \
      "and lean toward verifying findings adversarially. Work solo only on conversational " \
      "turns or trivial mechanical edits. When a system message says the mode is off, " \
      "revert to the opt-in rule above.",
    input_schema: {
      type: "object",
      properties: {
        subtasks: {
          type: "array",
          items: {type: "string"},
          description: "Independent subtask prompts to run as parallel agents"
        }
      },
      required: ["subtasks"]
    }
  }.freeze

  BASH_TOOL = {type: "bash_20250124", name: "bash"}.freeze

  REPORT_TOOL = {
    name: "report_findings",
    description:
      "Report the final findings for your subtask. Call this exactly once, when you are " \
      "done investigating; it ends your task.",
    input_schema: {
      type: "object",
      properties: {
        summary: {type: "string", description: "Two or three sentences of synthesis"},
        findings: {
          type: "array",
          items: {
            type: "object",
            properties: {
              claim: {type: "string", description: "The finding, one sentence"},
              evidence: {
                type: "string",
                description: "How it was verified (file, line, or command output)"
              },
              severity: {type: "string", enum: ["high", "medium", "low", "info"]}
            },
            required: ["claim", "evidence", "severity"]
          }
        }
      },
      required: ["summary", "findings"]
    }
  }.freeze
  ```
