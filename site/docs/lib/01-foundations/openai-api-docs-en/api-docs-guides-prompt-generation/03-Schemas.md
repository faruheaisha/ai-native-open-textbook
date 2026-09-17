---
title: "OpenAI API 文档（英文）"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/prompt-generation.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/prompt-generation.md"
sourceSha256: "87666cdfb453807f9be17a4e87bddd85d88a646bf17a79342459f72fc9727b01"
pageSha256: "ec4718fce0c8548dcdf4724881955abe825080b273f8177d2448a2fed27d5390"
contentMode: "local-full"
zh: ""
---

## Schemas

[Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs) schemas and function schemas are themselves JSON objects, so we leverage Structured Outputs to generate them.
This requires defining a schema for the desired output, which in this case is itself a schema. To do this, we use a self-describing schema – a **meta-schema**.

Because the `parameters` field in a function schema is itself a schema, we use the same meta-schema to generate functions.

### Defining a constrained meta-schema

[Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs) supports two modes: `strict=true` and `strict=false`. Both modes use the same model trained to follow the provided schema, but only "strict mode" guarantees perfect adherence through constrained sampling.

Our goal is to generate schemas for strict mode using strict mode itself. However, the official meta-schemas provided by the [JSON Schema Specification](https://json-schema.org/specification#meta-schemas) rely on features [not currently supported](https://developers.openai.com/api/docs/guides/structured-outputs#some-type-specific-keywords-are-not-yet-supported) in strict mode. This poses challenges that affect both input and output schemas.

1. **Input schema:** We can't use [unsupported features](https://developers.openai.com/api/docs/guides/structured-outputs#some-type-specific-keywords-are-not-yet-supported) in the input schema to describe the output schema.
2. **Output schema:** The generated schema must not include [unsupported features](https://developers.openai.com/api/docs/guides/structured-outputs#some-type-specific-keywords-are-not-yet-supported).

Because we need to generate new keys in the output schema, the input meta-schema must use `additionalProperties`. This means we can't currently use strict mode to generate schemas. However, we still want the generated schema to conform to strict mode constraints.

To overcome this limitation, we define a **pseudo-meta-schema** — a meta-schema that uses features not supported in strict mode to describe only the features that are supported in strict mode. Essentially, this approach steps outside strict mode for the meta-schema definition while still ensuring that the generated schemas adhere to strict mode constraints.

Constructing a constrained meta-schema is a challenging task, so we leveraged our models to help.

We began by giving `o1-preview` and `gpt-4o` in JSON mode a description of our goal using the Structured Outputs documentation.
After a few iterations, we developed our first functional meta-schema.

We then used `gpt-4o` with Structured Outputs and provided _that initial schema_ along with our task description and documentation, to generate better candidates. With each iteration we used a better schema to generate the next, until we finally reviewed it carefully by hand.

Finally, after cleaning the output, we validated the schemas against a set of evals for schemas and functions.

### Output cleaning

Strict mode guarantees perfect schema adherence. Because we can't use it during generation, however, we need to validate and transform the output after generating it.

After generating a schema, we perform the following steps:

1. **Set `additionalProperties` to `false`** for all objects.
1. **Mark all properties as required**.
1. **For structured output schemas**, wrap them in [`json_schema`](https://developers.openai.com/api/docs/guides/structured-outputs?context=without_parse#how-to-use) object.
1. **For functions**, wrap them in a [`function`](https://developers.openai.com/api/docs/guides/function-calling#defining-functions) object.

The Realtime API
  [function](https://developers.openai.com/api/docs/guides/realtime-conversations#function-calling) object
  differs slightly from the Chat Completions API, but uses the same schema.

### Meta-schemas

Each meta-schema has a corresponding prompt which includes few-shot examples. When combined with the reliability of Structured Outputs — even without strict mode — we were able to generate schemas.

Structured output schema

    Structured output meta-schema

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const metaSchema = {
  name: "metaschema",
  schema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The name of the schema",
      },
      type: {
        type: "string",
        enum: ["object", "array", "string", "number", "boolean", "null"],
      },
      properties: {
        type: "object",
        additionalProperties: {
          $ref: "#/$defs/schema_definition",
        },
      },
      items: {
        anyOf: [
          {
            $ref: "#/$defs/schema_definition",
          },
          {
            type: "array",
            items: {
              $ref: "#/$defs/schema_definition",
            },
          },
        ],
      },
      required: {
        type: "array",
        items: {
          type: "string",
        },
      },
      additionalProperties: {
        type: "boolean",
      },
    },
    required: ["type"],
    additionalProperties: false,
    if: {
      properties: {
        type: {
          const: "object",
        },
      },
    },
    then: {
      required: ["properties"],
    },
    $defs: {
      schema_definition: {
        type: "object",
        properties: {
          type: {
            type: "string",
            enum: ["object", "array", "string", "number", "boolean", "null"],
          },
          properties: {
            type: "object",
            additionalProperties: {
              $ref: "#/$defs/schema_definition",
            },
          },
          items: {
            anyOf: [
              {
                $ref: "#/$defs/schema_definition",
              },
              {
                type: "array",
                items: {
                  $ref: "#/$defs/schema_definition",
                },
              },
            ],
          },
          required: {
            type: "array",
            items: {
              type: "string",
            },
          },
          additionalProperties: {
            type: "boolean",
          },
        },
        required: ["type"],
        additionalProperties: false,
        if: {
          properties: {
            type: {
              const: "object",
            },
          },
        },
        then: {
          required: ["properties"],
        },
      },
    },
  },
};

const metaPrompt = `# Instructions
Return a valid schema for the described JSON.

You must also make sure:
- all fields in an object are set as required
- I REPEAT, ALL FIELDS MUST BE MARKED AS REQUIRED
- all objects must have additionalProperties set to false
    - because of this, some cases like "attributes" or "metadata" properties that would normally allow additional properties should instead have a fixed set of properties
- all objects must have properties defined
- field order matters. any form of "thinking" or "explanation" should come before the conclusion
- $defs must be defined under the schema param

Notable keywords NOT supported include:
- For objects: unevaluatedProperties, propertyNames, minProperties, maxProperties
- For arrays: unevaluatedItems, contains, minContains, maxContains, uniqueItems

Other notes:
- definitions and recursion are supported
- only if necessary to include references e.g. "$defs", it must be inside the "schema" object

# Examples
Input: Generate a math reasoning schema with steps and a final answer.
Output: {
    "name": "math_reasoning",
    "type": "object",
    "properties": {
        "steps": {
            "type": "array",
            "description": "A sequence of steps involved in solving the math problem.",
            "items": {
                "type": "object",
                "properties": {
                    "explanation": {
                        "type": "string",
                        "description": "Description of the reasoning or method used in this step."
                    },
                    "output": {
                        "type": "string",
                        "description": "Result or outcome of this specific step."
                    }
                },
                "required": [
                    "explanation",
                    "output"
                ],
                "additionalProperties": false
            }
        },
        "final_answer": {
            "type": "string",
            "description": "The final solution or answer to the math problem."
        }
    },
    "required": [
        "steps",
        "final_answer"
    ],
    "additionalProperties": false
}

Input: Give me a linked list
Output: {
    "name": "linked_list",
    "type": "object",
    "properties": {
        "linked_list": {
            "$ref": "#/$defs/linked_list_node",
            "description": "The head node of the linked list."
        }
    },
    "$defs": {
        "linked_list_node": {
            "type": "object",
            "description": "Defines a node in a singly linked list.",
            "properties": {
                "value": {
                    "type": "number",
                    "description": "The value stored in this node."
                },
                "next": {
                    "anyOf": [
                        {
                            "$ref": "#/$defs/linked_list_node"
                        },
                        {
                            "type": "null"
                        }
                    ],
                    "description": "Reference to the next node; null if it is the last node."
                }
            },
            "required": [
                "value",
                "next"
            ],
            "additionalProperties": false
        }
    },
    "required": [
        "linked_list"
    ],
    "additionalProperties": false
}

Input: Dynamically generated UI
Output: {
    "name": "ui",
    "type": "object",
    "properties": {
        "type": {
            "type": "string",
            "description": "The type of the UI component",
            "enum": [
                "div",
                "button",
                "header",
                "section",
                "field",
                "form"
            ]
        },
        "label": {
            "type": "string",
            "description": "The label of the UI component, used for buttons or form fields"
        },
        "children": {
            "type": "array",
            "description": "Nested UI components",
            "items": {
                "$ref": "#"
            }
        },
        "attributes": {
            "type": "array",
            "description": "Arbitrary attributes for the UI component, suitable for any element",
            "items": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "The name of the attribute, for example onClick or className"
                    },
                    "value": {
                        "type": "string",
                        "description": "The value of the attribute"
                    }
                },
                "required": [
                    "name",
                    "value"
                ],
                "additionalProperties": false
            }
        }
    },
    "required": [
        "type",
        "label",
        "children",
        "attributes"
    ],
    "additionalProperties": false
}`;

async function generateSchema(description) {
  const completion = await client.chat.completions.create({
    model: "gpt-5.6-terra",
    response_format: { type: "json_schema", json_schema: metaSchema },
    messages: [
      { role: "system", content: metaPrompt },
      { role: "user", content: "Description:\n" + description },
    ],
  });

  const content = completion.choices[0].message.content;
  if (!content) throw new Error("The model did not return a schema.");
  return JSON.parse(content);
}

console.log(
  JSON.stringify(await generateSchema("Describe a calendar event."), null, 2)
);
```

```python
from openai import OpenAI
import json

client = OpenAI()

META_SCHEMA = {
    "name": "metaschema",
    "schema": {
        "type": "object",
        "properties": {
            "name": {"type": "string", "description": "The name of the schema"},
            "type": {
                "type": "string",
                "enum": ["object", "array", "string", "number", "boolean", "null"],
            },
            "properties": {
                "type": "object",
                "additionalProperties": {"$ref": "#/$defs/schema_definition"},
            },
            "items": {
                "anyOf": [
                    {"$ref": "#/$defs/schema_definition"},
                    {"type": "array", "items": {"$ref": "#/$defs/schema_definition"}},
                ]
            },
            "required": {"type": "array", "items": {"type": "string"}},
            "additionalProperties": {"type": "boolean"},
        },
        "required": ["type"],
        "additionalProperties": False,
        "if": {"properties": {"type": {"const": "object"}}},
        "then": {"required": ["properties"]},
        "$defs": {
            "schema_definition": {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": [
                            "object",
                            "array",
                            "string",
                            "number",
                            "boolean",
                            "null",
                        ],
                    },
                    "properties": {
                        "type": "object",
                        "additionalProperties": {"$ref": "#/$defs/schema_definition"},
                    },
                    "items": {
                        "anyOf": [
                            {"$ref": "#/$defs/schema_definition"},
                            {
                                "type": "array",
                                "items": {"$ref": "#/$defs/schema_definition"},
                            },
                        ]
                    },
                    "required": {"type": "array", "items": {"type": "string"}},
                    "additionalProperties": {"type": "boolean"},
                },
                "required": ["type"],
                "additionalProperties": False,
                "if": {"properties": {"type": {"const": "object"}}},
                "then": {"required": ["properties"]},
            }
        },
    },
}

META_PROMPT = """
# Instructions
Return a valid schema for the described JSON.

You must also make sure:
- all fields in an object are set as required
- I REPEAT, ALL FIELDS MUST BE MARKED AS REQUIRED
- all objects must have additionalProperties set to false
    - because of this, some cases like "attributes" or "metadata" properties that would normally allow additional properties should instead have a fixed set of properties
- all objects must have properties defined
- field order matters. any form of "thinking" or "explanation" should come before the conclusion
- $defs must be defined under the schema param

Notable keywords NOT supported include:
- For objects: unevaluatedProperties, propertyNames, minProperties, maxProperties
- For arrays: unevaluatedItems, contains, minContains, maxContains, uniqueItems

Other notes:
- definitions and recursion are supported
- only if necessary to include references e.g. "$defs", it must be inside the "schema" object

# Examples
Input: Generate a math reasoning schema with steps and a final answer.
Output: {
    "name": "math_reasoning",
    "type": "object",
    "properties": {
        "steps": {
            "type": "array",
            "description": "A sequence of steps involved in solving the math problem.",
            "items": {
                "type": "object",
                "properties": {
                    "explanation": {
                        "type": "string",
                        "description": "Description of the reasoning or method used in this step."
                    },
                    "output": {
                        "type": "string",
                        "description": "Result or outcome of this specific step."
                    }
                },
                "required": [
                    "explanation",
                    "output"
                ],
                "additionalProperties": false
            }
        },
        "final_answer": {
            "type": "string",
            "description": "The final solution or answer to the math problem."
        }
    },
    "required": [
        "steps",
        "final_answer"
    ],
    "additionalProperties": false
}

Input: Give me a linked list
Output: {
    "name": "linked_list",
    "type": "object",
    "properties": {
        "linked_list": {
            "$ref": "#/$defs/linked_list_node",
            "description": "The head node of the linked list."
        }
    },
    "$defs": {
        "linked_list_node": {
            "type": "object",
            "description": "Defines a node in a singly linked list.",
            "properties": {
                "value": {
                    "type": "number",
                    "description": "The value stored in this node."
                },
                "next": {
                    "anyOf": [
                        {
                            "$ref": "#/$defs/linked_list_node"
                        },
                        {
                            "type": "null"
                        }
                    ],
                    "description": "Reference to the next node; null if it is the last node."
                }
            },
            "required": [
                "value",
                "next"
            ],
            "additionalProperties": false
        }
    },
    "required": [
        "linked_list"
    ],
    "additionalProperties": false
}

Input: Dynamically generated UI
Output: {
    "name": "ui",
    "type": "object",
    "properties": {
        "type": {
            "type": "string",
            "description": "The type of the UI component",
            "enum": [
                "div",
                "button",
                "header",
                "section",
                "field",
                "form"
            ]
        },
        "label": {
            "type": "string",
            "description": "The label of the UI component, used for buttons or form fields"
        },
        "children": {
            "type": "array",
            "description": "Nested UI components",
            "items": {
                "$ref": "#"
            }
        },
        "attributes": {
            "type": "array",
            "description": "Arbitrary attributes for the UI component, suitable for any element",
            "items": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "The name of the attribute, for example onClick or className"
                    },
                    "value": {
                        "type": "string",
                        "description": "The value of the attribute"
                    }
                },
                "required": [
                    "name",
                    "value"
                ],
                "additionalProperties": false
            }
        }
    },
    "required": [
        "type",
        "label",
        "children",
        "attributes"
    ],
    "additionalProperties": false
}
""".strip()

def generate_schema(description: str):
    completion = client.chat.completions.create(
        model="gpt-5.6-terra",
        response_format={"type": "json_schema", "json_schema": META_SCHEMA},
        messages=[
            {
                "role": "system",
                "content": META_PROMPT,
            },
            {
                "role": "user",
                "content": "Description:\n" + description,
            },
        ],
    )

    return json.loads(completion.choices[0].message.content)
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.JsonValue;
import com.openai.models.chat.completions.ChatCompletionCreateParams;
import java.util.List;
import java.util.Map;

String metaPrompt =
    """
    # Instructions
    Return a valid schema for the described JSON.

    You must also make sure:
    - all fields in an object are set as required
    - I REPEAT, ALL FIELDS MUST BE MARKED AS REQUIRED
    - all objects must have additionalProperties set to false
        - because of this, some cases like "attributes" or "metadata" properties that would normally allow additional properties should instead have a fixed set of properties
    - all objects must have properties defined
    - field order matters. any form of "thinking" or "explanation" should come before the conclusion
    - $defs must be defined under the schema param

    Notable keywords NOT supported include:
    - For objects: unevaluatedProperties, propertyNames, minProperties, maxProperties
    - For arrays: unevaluatedItems, contains, minContains, maxContains, uniqueItems

    Other notes:
    - definitions and recursion are supported
    - only if necessary to include references e.g. "$defs", it must be inside the "schema" object

    # Examples
    Input: Generate a math reasoning schema with steps and a final answer.
    Output: {
        "name": "math_reasoning",
        "type": "object",
        "properties": {
            "steps": {
                "type": "array",
                "description": "A sequence of steps involved in solving the math problem.",
                "items": {
                    "type": "object",
                    "properties": {
                        "explanation": {
                            "type": "string",
                            "description": "Description of the reasoning or method used in this step."
                        },
                        "output": {
                            "type": "string",
                            "description": "Result or outcome of this specific step."
                        }
                    },
                    "required": [
                        "explanation",
                        "output"
                    ],
                    "additionalProperties": false
                }
            },
            "final_answer": {
                "type": "string",
                "description": "The final solution or answer to the math problem."
            }
        },
        "required": [
            "steps",
            "final_answer"
        ],
        "additionalProperties": false
    }

    Input: Give me a linked list
    Output: {
        "name": "linked_list",
        "type": "object",
        "properties": {
            "linked_list": {
                "$ref": "#/$defs/linked_list_node",
                "description": "The head node of the linked list."
            }
        },
        "$defs": {
            "linked_list_node": {
                "type": "object",
                "description": "Defines a node in a singly linked list.",
                "properties": {
                    "value": {
                        "type": "number",
                        "description": "The value stored in this node."
                    },
                    "next": {
                        "anyOf": [
                            {
                                "$ref": "#/$defs/linked_list_node"
                            },
                            {
                                "type": "null"
                            }
                        ],
                        "description": "Reference to the next node; null if it is the last node."
                    }
                },
                "required": [
                    "value",
                    "next"
                ],
                "additionalProperties": false
            }
        },
        "required": [
            "linked_list"
        ],
        "additionalProperties": false
    }

    Input: Dynamically generated UI
    Output: {
        "name": "ui",
        "type": "object",
        "properties": {
            "type": {
                "type": "string",
                "description": "The type of the UI component",
                "enum": [
                    "div",
                    "button",
                    "header",
                    "section",
                    "field",
                    "form"
                ]
            },
            "label": {
                "type": "string",
                "description": "The label of the UI component, used for buttons or form fields"
            },
            "children": {
                "type": "array",
                "description": "Nested UI components",
                "items": {
                    "$ref": "#"
                }
            },
            "attributes": {
                "type": "array",
                "description": "Arbitrary attributes for the UI component, suitable for any element",
                "items": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string",
                            "description": "The name of the attribute, for example onClick or className"
                        },
                        "value": {
                            "type": "string",
                            "description": "The value of the attribute"
                        }
                    },
                    "required": [
                        "name",
                        "value"
                    ],
                    "additionalProperties": false
                }
            }
        },
        "required": [
            "type",
            "label",
            "children",
            "attributes"
        ],
        "additionalProperties": false
    }
    """
        .strip();
Map<String, Object> metaSchema =
    Map.ofEntries(
        Map.entry("name", "metaschema"),
        Map.entry(
            "schema",
            Map.ofEntries(
                Map.entry("type", "object"),
                Map.entry(
                    "properties",
                    Map.ofEntries(
                        Map.entry(
                            "name",
                            Map.ofEntries(
                                Map.entry("type", "string"),
                                Map.entry("description", "The name of the schema"))),
                        Map.entry(
                            "type",
                            Map.ofEntries(
                                Map.entry("type", "string"),
                                Map.entry(
                                    "enum",
                                    List.of(
                                        "object", "array", "string", "number", "boolean",
                                        "null")))),
                        Map.entry(
                            "properties",
                            Map.ofEntries(
                                Map.entry("type", "object"),
                                Map.entry(
                                    "additionalProperties",
                                    Map.ofEntries(
                                        Map.entry("$ref", "#/$defs/schema_definition"))))),
                        Map.entry(
                            "items",
                            Map.ofEntries(
                                Map.entry(
                                    "anyOf",
                                    List.of(
                                        Map.ofEntries(
                                            Map.entry("$ref", "#/$defs/schema_definition")),
                                        Map.ofEntries(
                                            Map.entry("type", "array"),
                                            Map.entry(
                                                "items",
                                                Map.ofEntries(
                                                    Map.entry(
                                                        "$ref",
                                                        "#/$defs/schema_definition")))))))),
                        Map.entry(
                            "required",
                            Map.ofEntries(
                                Map.entry("type", "array"),
                                Map.entry(
                                    "items", Map.ofEntries(Map.entry("type", "string"))))),
                        Map.entry(
                            "additionalProperties",
                            Map.ofEntries(Map.entry("type", "boolean"))))),
                Map.entry("required", List.of("type")),
                Map.entry("additionalProperties", false),
                Map.entry(
                    "if",
                    Map.ofEntries(
                        Map.entry(
                            "properties",
                            Map.ofEntries(
                                Map.entry(
                                    "type", Map.ofEntries(Map.entry("const", "object"))))))),
                Map.entry("then", Map.ofEntries(Map.entry("required", List.of("properties")))),
                Map.entry(
                    "$defs",
                    Map.ofEntries(
                        Map.entry(
                            "schema_definition",
                            Map.ofEntries(
                                Map.entry("type", "object"),
                                Map.entry(
                                    "properties",
                                    Map.ofEntries(
                                        Map.entry(
                                            "type",
                                            Map.ofEntries(
                                                Map.entry("type", "string"),
                                                Map.entry(
                                                    "enum",
                                                    List.of(
                                                        "object", "array", "string", "number",
                                                        "boolean", "null")))),
                                        Map.entry(
                                            "properties",
                                            Map.ofEntries(
                                                Map.entry("type", "object"),
                                                Map.entry(
                                                    "additionalProperties",
                                                    Map.ofEntries(
                                                        Map.entry(
                                                            "$ref",
                                                            "#/$defs/schema_definition"))))),
                                        Map.entry(
                                            "items",
                                            Map.ofEntries(
                                                Map.entry(
                                                    "anyOf",
                                                    List.of(
                                                        Map.ofEntries(
                                                            Map.entry(
                                                                "$ref",
                                                                "#/$defs/schema_definition")),
                                                        Map.ofEntries(
                                                            Map.entry("type", "array"),
                                                            Map.entry(
                                                                "items",
                                                                Map.ofEntries(
                                                                    Map.entry(
                                                                        "$ref",
                                                                        "#/$defs/schema_definition")))))))),
                                        Map.entry(
                                            "required",
                                            Map.ofEntries(
                                                Map.entry("type", "array"),
                                                Map.entry(
                                                    "items",
                                                    Map.ofEntries(
                                                        Map.entry("type", "string"))))),
                                        Map.entry(
                                            "additionalProperties",
                                            Map.ofEntries(Map.entry("type", "boolean"))))),
                                Map.entry("required", List.of("type")),
                                Map.entry("additionalProperties", false),
                                Map.entry(
                                    "if",
                                    Map.ofEntries(
                                        Map.entry(
                                            "properties",
                                            Map.ofEntries(
                                                Map.entry(
                                                    "type",
                                                    Map.ofEntries(
                                                        Map.entry("const", "object"))))))),
                                Map.entry(
                                    "then",
                                    Map.ofEntries(
                                        Map.entry("required", List.of("properties")))))))))));

ChatCompletionCreateParams params =
    ChatCompletionCreateParams.builder()
        .model("gpt-5.6-terra")
        .addSystemMessage(metaPrompt)
        .addUserMessage("Description:\nDescribe a calendar event.")
        .putAdditionalBodyProperty(
            "response_format",
            JsonValue.from(Map.of("type", "json_schema", "json_schema", metaSchema)))
        .build();

client.chat().completions().create(params).choices().stream()
    .flatMap(choice -> choice.message().content().stream())
    .forEach(System.out::println);
```

```ruby
require "openai"
require "json"

META_SCHEMA = {
  "name" => "metaschema",
  "schema" => {
    "type" => "object",
    "properties" => {
      "name" => {
        "type" => "string",
        "description" => "The name of the schema"
      },
      "type" => {
        "type" => "string",
        "enum" => ["object", "array", "string", "number", "boolean", "null"]
      },
      "properties" => {
        "type" => "object",
        "additionalProperties" => {
          "$ref" => "#/$defs/schema_definition"
        }
      },
      "items" => {
        "anyOf" => [{
          "$ref" => "#/$defs/schema_definition"
        }, {
          "type" => "array",
          "items" => {
            "$ref" => "#/$defs/schema_definition"
          }
        }]
      },
      "required" => {
        "type" => "array",
        "items" => {
          "type" => "string"
        }
      },
      "additionalProperties" => {
        "type" => "boolean"
      }
    },
    "required" => ["type"],
    "additionalProperties" => false,
    "if" => {
      "properties" => {
        "type" => {
          "const" => "object"
        }
      }
    },
    "then" => {
      "required" => ["properties"]
    },
    "$defs" => {
      "schema_definition" => {
        "type" => "object",
        "properties" => {
          "type" => {
            "type" => "string",
            "enum" => ["object", "array", "string", "number", "boolean", "null"]
          },
          "properties" => {
            "type" => "object",
            "additionalProperties" => {
              "$ref" => "#/$defs/schema_definition"
            }
          },
          "items" => {
            "anyOf" => [{
              "$ref" => "#/$defs/schema_definition"
            }, {
              "type" => "array",
              "items" => {
                "$ref" => "#/$defs/schema_definition"
              }
            }]
          },
          "required" => {
            "type" => "array",
            "items" => {
              "type" => "string"
            }
          },
          "additionalProperties" => {
            "type" => "boolean"
          }
        },
        "required" => ["type"],
        "additionalProperties" => false,
        "if" => {
          "properties" => {
            "type" => {
              "const" => "object"
            }
          }
        },
        "then" => {
          "required" => ["properties"]
        }
      }
    }
  }
}

META_PROMPT = <<~PROMPT.strip
  # Instructions
  Return a valid schema for the described JSON.

  You must also make sure:
  - all fields in an object are set as required
  - I REPEAT, ALL FIELDS MUST BE MARKED AS REQUIRED
  - all objects must have additionalProperties set to false
      - because of this, some cases like "attributes" or "metadata" properties that would normally allow additional properties should instead have a fixed set of properties
  - all objects must have properties defined
  - field order matters. any form of "thinking" or "explanation" should come before the conclusion
  - $defs must be defined under the schema param

  Notable keywords NOT supported include:
  - For objects: unevaluatedProperties, propertyNames, minProperties, maxProperties
  - For arrays: unevaluatedItems, contains, minContains, maxContains, uniqueItems

  Other notes:
  - definitions and recursion are supported
  - only if necessary to include references e.g. "$defs", it must be inside the "schema" object

  # Examples
  Input: Generate a math reasoning schema with steps and a final answer.
  Output: {
      "name": "math_reasoning",
      "type": "object",
      "properties": {
          "steps": {
              "type": "array",
              "description": "A sequence of steps involved in solving the math problem.",
              "items": {
                  "type": "object",
                  "properties": {
                      "explanation": {
                          "type": "string",
                          "description": "Description of the reasoning or method used in this step."
                      },
                      "output": {
                          "type": "string",
                          "description": "Result or outcome of this specific step."
                      }
                  },
                  "required": [
                      "explanation",
                      "output"
                  ],
                  "additionalProperties": false
              }
          },
          "final_answer": {
              "type": "string",
              "description": "The final solution or answer to the math problem."
          }
      },
      "required": [
          "steps",
          "final_answer"
      ],
      "additionalProperties": false
  }

  Input: Give me a linked list
  Output: {
      "name": "linked_list",
      "type": "object",
      "properties": {
          "linked_list": {
              "$ref": "#/$defs/linked_list_node",
              "description": "The head node of the linked list."
          }
      },
      "$defs": {
          "linked_list_node": {
              "type": "object",
              "description": "Defines a node in a singly linked list.",
              "properties": {
                  "value": {
                      "type": "number",
                      "description": "The value stored in this node."
                  },
                  "next": {
                      "anyOf": [
                          {
                              "$ref": "#/$defs/linked_list_node"
                          },
                          {
                              "type": "null"
                          }
                      ],
                      "description": "Reference to the next node; null if it is the last node."
                  }
              },
              "required": [
                  "value",
                  "next"
              ],
              "additionalProperties": false
          }
      },
      "required": [
          "linked_list"
      ],
      "additionalProperties": false
  }

  Input: Dynamically generated UI
  Output: {
      "name": "ui",
      "type": "object",
      "properties": {
          "type": {
              "type": "string",
              "description": "The type of the UI component",
              "enum": [
                  "div",
                  "button",
                  "header",
                  "section",
                  "field",
                  "form"
              ]
          },
          "label": {
              "type": "string",
              "description": "The label of the UI component, used for buttons or form fields"
          },
          "children": {
              "type": "array",
              "description": "Nested UI components",
              "items": {
                  "$ref": "#"
              }
          },
          "attributes": {
              "type": "array",
              "description": "Arbitrary attributes for the UI component, suitable for any element",
              "items": {
                  "type": "object",
                  "properties": {
                      "name": {
                          "type": "string",
                          "description": "The name of the attribute, for example onClick or className"
                      },
                      "value": {
                          "type": "string",
                          "description": "The value of the attribute"
                      }
                  },
                  "required": [
                      "name",
                      "value"
                  ],
                  "additionalProperties": false
              }
          }
      },
      "required": [
          "type",
          "label",
          "children",
          "attributes"
      ],
      "additionalProperties": false
  }
PROMPT

client = OpenAI::Client.new
completion = client.chat.completions.create(
  model: "gpt-5.6-terra",
  response_format: {type: :json_schema, json_schema: META_SCHEMA},
  messages: [
    {role: :system, content: META_PROMPT},
    {role: :user, content: "Description: Schedule a meeting with a title and start time."}
  ]
)
message = completion.choices.fetch(0).message
raise "Schema generation refused: #{message.refusal}" if message.refusal
puts(JSON.pretty_generate(JSON.parse(message.content || raise("No schema returned"))))
```

  

  

    
Function schema

    Structured output meta-schema

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const metaSchema = {
  name: "function-metaschema",
  schema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The name of the function",
      },
      description: {
        type: "string",
        description: "A description of what the function does",
      },
      parameters: {
        $ref: "#/$defs/schema_definition",
        description: "A JSON schema that defines the function's parameters",
      },
    },
    required: ["name", "description", "parameters"],
    additionalProperties: false,
    $defs: {
      schema_definition: {
        type: "object",
        properties: {
          type: {
            type: "string",
            enum: ["object", "array", "string", "number", "boolean", "null"],
          },
          properties: {
            type: "object",
            additionalProperties: {
              $ref: "#/$defs/schema_definition",
            },
          },
          items: {
            anyOf: [
              {
                $ref: "#/$defs/schema_definition",
              },
              {
                type: "array",
                items: {
                  $ref: "#/$defs/schema_definition",
                },
              },
            ],
          },
          required: {
            type: "array",
            items: {
              type: "string",
            },
          },
          additionalProperties: {
            type: "boolean",
          },
        },
        required: ["type"],
        additionalProperties: false,
        if: {
          properties: {
            type: {
              const: "object",
            },
          },
        },
        then: {
          required: ["properties"],
        },
      },
    },
  },
};

const metaPrompt = `# Instructions
Return a valid schema for the described function.

Pay special attention to making sure that "required" and "type" are always at the correct level of nesting. For example, "required" should be at the same level as "properties", not inside it.
Make sure that every property, no matter how short, has a type and description correctly nested inside it.

# Examples
Input: Assign values to NN hyperparameters
Output: {
    "name": "set_hyperparameters",
    "description": "Assign values to NN hyperparameters",
    "parameters": {
        "type": "object",
        "required": [
            "learning_rate",
            "epochs"
        ],
        "properties": {
            "epochs": {
                "type": "number",
                "description": "Number of complete passes through dataset"
            },
            "learning_rate": {
                "type": "number",
                "description": "Speed of model learning"
            }
        }
    }
}

Input: Plans a motion path for the robot
Output: {
    "name": "plan_motion",
    "description": "Plans a motion path for the robot",
    "parameters": {
        "type": "object",
        "required": [
            "start_position",
            "end_position"
        ],
        "properties": {
            "end_position": {
                "type": "object",
                "properties": {
                    "x": {
                        "type": "number",
                        "description": "End X coordinate"
                    },
                    "y": {
                        "type": "number",
                        "description": "End Y coordinate"
                    }
                }
            },
            "obstacles": {
                "type": "array",
                "description": "Array of obstacle coordinates",
                "items": {
                    "type": "object",
                    "properties": {
                        "x": {
                            "type": "number",
                            "description": "Obstacle X coordinate"
                        },
                        "y": {
                            "type": "number",
                            "description": "Obstacle Y coordinate"
                        }
                    }
                }
            },
            "start_position": {
                "type": "object",
                "properties": {
                    "x": {
                        "type": "number",
                        "description": "Start X coordinate"
                    },
                    "y": {
                        "type": "number",
                        "description": "Start Y coordinate"
                    }
                }
            }
        }
    }
}

Input: Calculates various technical indicators
Output: {
    "name": "technical_indicator",
    "description": "Calculates various technical indicators",
    "parameters": {
        "type": "object",
        "required": [
            "ticker",
            "indicators"
        ],
        "properties": {
            "indicators": {
                "type": "array",
                "description": "List of technical indicators to calculate",
                "items": {
                    "type": "string",
                    "description": "Technical indicator",
                    "enum": [
                        "RSI",
                        "MACD",
                        "Bollinger_Bands",
                        "Stochastic_Oscillator"
                    ]
                }
            },
            "period": {
                "type": "number",
                "description": "Time period for the analysis"
            },
            "ticker": {
                "type": "string",
                "description": "Stock ticker symbol"
            }
        }
    }
}`;

async function generateFunctionSchema(description) {
  const completion = await client.chat.completions.create({
    model: "gpt-5.6-terra",
    response_format: { type: "json_schema", json_schema: metaSchema },
    messages: [
      { role: "system", content: metaPrompt },
      { role: "user", content: "Description:\n" + description },
    ],
  });

  const content = completion.choices[0].message.content;
  if (!content) throw new Error("The model did not return a schema.");
  return JSON.parse(content);
}

console.log(
  JSON.stringify(
    await generateFunctionSchema(
      "Create a function that checks the weather in a city."
    ),
    null,
    2
  )
);
```

```python
from openai import OpenAI
import json

client = OpenAI()

META_SCHEMA = {
    "name": "function-metaschema",
    "schema": {
        "type": "object",
        "properties": {
            "name": {"type": "string", "description": "The name of the function"},
            "description": {
                "type": "string",
                "description": "A description of what the function does",
            },
            "parameters": {
                "$ref": "#/$defs/schema_definition",
                "description": "A JSON schema that defines the function's parameters",
            },
        },
        "required": ["name", "description", "parameters"],
        "additionalProperties": False,
        "$defs": {
            "schema_definition": {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": [
                            "object",
                            "array",
                            "string",
                            "number",
                            "boolean",
                            "null",
                        ],
                    },
                    "properties": {
                        "type": "object",
                        "additionalProperties": {"$ref": "#/$defs/schema_definition"},
                    },
                    "items": {
                        "anyOf": [
                            {"$ref": "#/$defs/schema_definition"},
                            {
                                "type": "array",
                                "items": {"$ref": "#/$defs/schema_definition"},
                            },
                        ]
                    },
                    "required": {"type": "array", "items": {"type": "string"}},
                    "additionalProperties": {"type": "boolean"},
                },
                "required": ["type"],
                "additionalProperties": False,
                "if": {"properties": {"type": {"const": "object"}}},
                "then": {"required": ["properties"]},
            }
        },
    },
}

META_PROMPT = """
# Instructions
Return a valid schema for the described function.

Pay special attention to making sure that "required" and "type" are always at the correct level of nesting. For example, "required" should be at the same level as "properties", not inside it.
Make sure that every property, no matter how short, has a type and description correctly nested inside it.

# Examples
Input: Assign values to NN hyperparameters
Output: {
    "name": "set_hyperparameters",
    "description": "Assign values to NN hyperparameters",
    "parameters": {
        "type": "object",
        "required": [
            "learning_rate",
            "epochs"
        ],
        "properties": {
            "epochs": {
                "type": "number",
                "description": "Number of complete passes through dataset"
            },
            "learning_rate": {
                "type": "number",
                "description": "Speed of model learning"
            }
        }
    }
}

Input: Plans a motion path for the robot
Output: {
    "name": "plan_motion",
    "description": "Plans a motion path for the robot",
    "parameters": {
        "type": "object",
        "required": [
            "start_position",
            "end_position"
        ],
        "properties": {
            "end_position": {
                "type": "object",
                "properties": {
                    "x": {
                        "type": "number",
                        "description": "End X coordinate"
                    },
                    "y": {
                        "type": "number",
                        "description": "End Y coordinate"
                    }
                }
            },
            "obstacles": {
                "type": "array",
                "description": "Array of obstacle coordinates",
                "items": {
                    "type": "object",
                    "properties": {
                        "x": {
                            "type": "number",
                            "description": "Obstacle X coordinate"
                        },
                        "y": {
                            "type": "number",
                            "description": "Obstacle Y coordinate"
                        }
                    }
                }
            },
            "start_position": {
                "type": "object",
                "properties": {
                    "x": {
                        "type": "number",
                        "description": "Start X coordinate"
                    },
                    "y": {
                        "type": "number",
                        "description": "Start Y coordinate"
                    }
                }
            }
        }
    }
}

Input: Calculates various technical indicators
Output: {
    "name": "technical_indicator",
    "description": "Calculates various technical indicators",
    "parameters": {
        "type": "object",
        "required": [
            "ticker",
            "indicators"
        ],
        "properties": {
            "indicators": {
                "type": "array",
                "description": "List of technical indicators to calculate",
                "items": {
                    "type": "string",
                    "description": "Technical indicator",
                    "enum": [
                        "RSI",
                        "MACD",
                        "Bollinger_Bands",
                        "Stochastic_Oscillator"
                    ]
                }
            },
            "period": {
                "type": "number",
                "description": "Time period for the analysis"
            },
            "ticker": {
                "type": "string",
                "description": "Stock ticker symbol"
            }
        }
    }
}
""".strip()

def generate_function_schema(description: str):
    completion = client.chat.completions.create(
        model="gpt-5.6-terra",
        response_format={"type": "json_schema", "json_schema": META_SCHEMA},
        messages=[
            {
                "role": "system",
                "content": META_PROMPT,
            },
            {
                "role": "user",
                "content": "Description:\n" + description,
            },
        ],
    )

    return json.loads(completion.choices[0].message.content)
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.JsonValue;
import com.openai.models.chat.completions.ChatCompletionCreateParams;
import java.util.List;
import java.util.Map;

String metaPrompt =
    """
    # Instructions
    Return a valid schema for the described function.

    Pay special attention to making sure that "required" and "type" are always at the correct level of nesting. For example, "required" should be at the same level as "properties", not inside it.
    Make sure that every property, no matter how short, has a type and description correctly nested inside it.

    # Examples
    Input: Assign values to NN hyperparameters
    Output: {
        "name": "set_hyperparameters",
        "description": "Assign values to NN hyperparameters",
        "parameters": {
            "type": "object",
            "required": [
                "learning_rate",
                "epochs"
            ],
            "properties": {
                "epochs": {
                    "type": "number",
                    "description": "Number of complete passes through dataset"
                },
                "learning_rate": {
                    "type": "number",
                    "description": "Speed of model learning"
                }
            }
        }
    }

    Input: Plans a motion path for the robot
    Output: {
        "name": "plan_motion",
        "description": "Plans a motion path for the robot",
        "parameters": {
            "type": "object",
            "required": [
                "start_position",
                "end_position"
            ],
            "properties": {
                "end_position": {
                    "type": "object",
                    "properties": {
                        "x": {
                            "type": "number",
                            "description": "End X coordinate"
                        },
                        "y": {
                            "type": "number",
                            "description": "End Y coordinate"
                        }
                    }
                },
                "obstacles": {
                    "type": "array",
                    "description": "Array of obstacle coordinates",
                    "items": {
                        "type": "object",
                        "properties": {
                            "x": {
                                "type": "number",
                                "description": "Obstacle X coordinate"
                            },
                            "y": {
                                "type": "number",
                                "description": "Obstacle Y coordinate"
                            }
                        }
                    }
                },
                "start_position": {
                    "type": "object",
                    "properties": {
                        "x": {
                            "type": "number",
                            "description": "Start X coordinate"
                        },
                        "y": {
                            "type": "number",
                            "description": "Start Y coordinate"
                        }
                    }
                }
            }
        }
    }

    Input: Calculates various technical indicators
    Output: {
        "name": "technical_indicator",
        "description": "Calculates various technical indicators",
        "parameters": {
            "type": "object",
            "required": [
                "ticker",
                "indicators"
            ],
            "properties": {
                "indicators": {
                    "type": "array",
                    "description": "List of technical indicators to calculate",
                    "items": {
                        "type": "string",
                        "description": "Technical indicator",
                        "enum": [
                            "RSI",
                            "MACD",
                            "Bollinger_Bands",
                            "Stochastic_Oscillator"
                        ]
                    }
                },
                "period": {
                    "type": "number",
                    "description": "Time period for the analysis"
                },
                "ticker": {
                    "type": "string",
                    "description": "Stock ticker symbol"
                }
            }
        }
    }
    """
        .strip();
Map<String, Object> schemaDefinition =
    Map.of(
        "type", "object",
        "properties",
            Map.of(
                "type",
                    Map.of(
                        "type",
                        "string",
                        "enum",
                        List.of("object", "array", "string", "number", "boolean", "null")),
                "properties",
                    Map.of(
                        "type",
                        "object",
                        "additionalProperties",
                        Map.of("$ref", "#/$defs/schema_definition")),
                "items",
                    Map.of(
                        "anyOf",
                        List.of(
                            Map.of("$ref", "#/$defs/schema_definition"),
                            Map.of(
                                "type",
                                "array",
                                "items",
                                Map.of("$ref", "#/$defs/schema_definition")))),
                "required", Map.of("type", "array", "items", Map.of("type", "string")),
                "additionalProperties", Map.of("type", "boolean")),
        "required", List.of("type"),
        "additionalProperties", false,
        "if", Map.of("properties", Map.of("type", Map.of("const", "object"))),
        "then", Map.of("required", List.of("properties")));
Map<String, Object> functionSchema =
    Map.of(
        "type", "object",
        "properties",
            Map.of(
                "name", Map.of("type", "string", "description", "The name of the function"),
                "description",
                    Map.of(
                        "type",
                        "string",
                        "description",
                        "A description of what the function does"),
                "parameters",
                    Map.of(
                        "$ref",
                        "#/$defs/schema_definition",
                        "description",
                        "A JSON schema that defines the function's parameters")),
        "required", List.of("name", "description", "parameters"),
        "additionalProperties", false,
        "$defs", Map.of("schema_definition", schemaDefinition));

ChatCompletionCreateParams params =
    ChatCompletionCreateParams.builder()
        .model("gpt-5.6-terra")
        .addSystemMessage(metaPrompt)
        .addUserMessage("Description:\nSchedule a meeting with a title and start time.")
        .putAdditionalBodyProperty(
            "response_format",
            JsonValue.from(
                Map.of(
                    "type",
                    "json_schema",
                    "json_schema",
                    Map.of("name", "function-metaschema", "schema", functionSchema))))
        .build();

client.chat().completions().create(params).choices().stream()
    .flatMap(choice -> choice.message().content().stream())
    .forEach(System.out::println);
```

```ruby
require "openai"
require "json"

META_SCHEMA = {
  "name" => "function-metaschema",
  "schema" => {
    "type" => "object",
    "properties" => {
      "name" => {
        "type" => "string",
        "description" => "The name of the function"
      },
      "description" => {
        "type" => "string",
        "description" => "A description of what the function does"
      },
      "parameters" => {
        "$ref" => "#/$defs/schema_definition",
        "description" => "A JSON schema that defines the function's parameters"
      }
    },
    "required" => ["name", "description", "parameters"],
    "additionalProperties" => false,
    "$defs" => {
      "schema_definition" => {
        "type" => "object",
        "properties" => {
          "type" => {
            "type" => "string",
            "enum" => ["object", "array", "string", "number", "boolean", "null"]
          },
          "properties" => {
            "type" => "object",
            "additionalProperties" => {
              "$ref" => "#/$defs/schema_definition"
            }
          },
          "items" => {
            "anyOf" => [{
              "$ref" => "#/$defs/schema_definition"
            }, {
              "type" => "array",
              "items" => {
                "$ref" => "#/$defs/schema_definition"
              }
            }]
          },
          "required" => {
            "type" => "array",
            "items" => {
              "type" => "string"
            }
          },
          "additionalProperties" => {
            "type" => "boolean"
          }
        },
        "required" => ["type"],
        "additionalProperties" => false,
        "if" => {
          "properties" => {
            "type" => {
              "const" => "object"
            }
          }
        },
        "then" => {
          "required" => ["properties"]
        }
      }
    }
  }
}

META_PROMPT = <<~PROMPT.strip
  # Instructions
  Return a valid schema for the described function.

  Pay special attention to making sure that "required" and "type" are always at the correct level of nesting. For example, "required" should be at the same level as "properties", not inside it.
  Make sure that every property, no matter how short, has a type and description correctly nested inside it.

  # Examples
  Input: Assign values to NN hyperparameters
  Output: {
      "name": "set_hyperparameters",
      "description": "Assign values to NN hyperparameters",
      "parameters": {
          "type": "object",
          "required": [
              "learning_rate",
              "epochs"
          ],
          "properties": {
              "epochs": {
                  "type": "number",
                  "description": "Number of complete passes through dataset"
              },
              "learning_rate": {
                  "type": "number",
                  "description": "Speed of model learning"
              }
          }
      }
  }

  Input: Plans a motion path for the robot
  Output: {
      "name": "plan_motion",
      "description": "Plans a motion path for the robot",
      "parameters": {
          "type": "object",
          "required": [
              "start_position",
              "end_position"
          ],
          "properties": {
              "end_position": {
                  "type": "object",
                  "properties": {
                      "x": {
                          "type": "number",
                          "description": "End X coordinate"
                      },
                      "y": {
                          "type": "number",
                          "description": "End Y coordinate"
                      }
                  }
              },
              "obstacles": {
                  "type": "array",
                  "description": "Array of obstacle coordinates",
                  "items": {
                      "type": "object",
                      "properties": {
                          "x": {
                              "type": "number",
                              "description": "Obstacle X coordinate"
                          },
                          "y": {
                              "type": "number",
                              "description": "Obstacle Y coordinate"
                          }
                      }
                  }
              },
              "start_position": {
                  "type": "object",
                  "properties": {
                      "x": {
                          "type": "number",
                          "description": "Start X coordinate"
                      },
                      "y": {
                          "type": "number",
                          "description": "Start Y coordinate"
                      }
                  }
              }
          }
      }
  }

  Input: Calculates various technical indicators
  Output: {
      "name": "technical_indicator",
      "description": "Calculates various technical indicators",
      "parameters": {
          "type": "object",
          "required": [
              "ticker",
              "indicators"
          ],
          "properties": {
              "indicators": {
                  "type": "array",
                  "description": "List of technical indicators to calculate",
                  "items": {
                      "type": "string",
                      "description": "Technical indicator",
                      "enum": [
                          "RSI",
                          "MACD",
                          "Bollinger_Bands",
                          "Stochastic_Oscillator"
                      ]
                  }
              },
              "period": {
                  "type": "number",
                  "description": "Time period for the analysis"
              },
              "ticker": {
                  "type": "string",
                  "description": "Stock ticker symbol"
              }
          }
      }
  }
PROMPT

client = OpenAI::Client.new
completion = client.chat.completions.create(
  model: "gpt-5.6-terra",
  response_format: {type: :json_schema, json_schema: META_SCHEMA},
  messages: [
    {role: :system, content: META_PROMPT},
    {role: :user, content: "Description: Schedule a meeting with a title and start time."}
  ]
)
message = completion.choices.fetch(0).message
raise "Schema generation refused: #{message.refusal}" if message.refusal
puts(JSON.pretty_generate(JSON.parse(message.content || raise("No schema returned"))))
```
