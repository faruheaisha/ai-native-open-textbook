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
sourceRel: "docs/en/agents-and-tools/tool-use/text-editor-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/text-editor-tool.md"
sourceSha256: "177d2635fdb6362ac4880d096f3046f73bf79cc947c8abb6d8e5036e64835759"
pageSha256: "738231192bd04b864fa954e6225e9fda2d85ba0f75e4ef7fa47f431fea28ec33"
contentMode: "local-full"
zh: ""
---

## Use the text editor tool

Provide the text editor tool (named `str_replace_based_edit_tool`) to Claude using the Messages API.

You can optionally specify a `max_characters` parameter to control truncation when viewing large files.

  `max_characters` is only compatible with `text_editor_20250728` and later versions of the text editor tool.

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "tools": [
        {
          "type": "text_editor_20250728",
          "name": "str_replace_based_edit_tool",
          "max_characters": 10000
        }
      ],
      "messages": [
        {
          "role": "user",
          "content": "There'\''s a syntax error in my primes.py file. Can you help me fix it?"
        }
      ]
    }'
  ```

  ```bash CLI
  ant messages create \
    --model claude-opus-5 \
    --max-tokens 1024 \
    --tool '{type: text_editor_20250728, name: str_replace_based_edit_tool, max_characters: 10000}' \
    --message '{role: user, content: There is a syntax error in my primes.py file. Can you help me fix it?}'
  ```

  ```python Python
  client = anthropic.Anthropic()

  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      tools=[
          {
              "type": "text_editor_20250728",
              "name": "str_replace_based_edit_tool",
              "max_characters": 10000,
          }
      ],
      messages=[
          {
              "role": "user",
              "content": "There's a syntax error in my primes.py file. Can you help me fix it?",
          }
      ],
  )

  print(response)
  ```

  ```typescript TypeScript
  const anthropic = new Anthropic();

  const response = await anthropic.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: [
      {
        type: "text_editor_20250728",
        name: "str_replace_based_edit_tool",
        max_characters: 10000
      }
    ],
    messages: [
      {
        role: "user",
        content: "There's a syntax error in my primes.py file. Can you help me fix it?"
      }
    ]
  });

  console.log(response);
  ```

  ```csharp C#
  var client = new AnthropicClient();

  var response = await client.Messages.Create(
      new()
      {
          Model = Model.ClaudeOpus5,
          MaxTokens = 1024,
          Tools = [new ToolTextEditor20250728 { MaxCharacters = 10000 }],
          Messages =
          [
              new()
              {
                  Role = Role.User,
                  Content = "There's a syntax error in my primes.py file. Can you help me fix it?",
              },
          ],
      }
  );

  Console.WriteLine(response);
  ```

  ```go Go
  client := anthropic.NewClient()

  response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 1024,
  	Tools: []anthropic.ToolUnionParam{
  		{OfTextEditor20250728: &anthropic.ToolTextEditor20250728Param{
  			MaxCharacters: anthropic.Int(10000),
  		}},
  	},
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("There's a syntax error in my primes.py file. Can you help me fix it?")),
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(response)
  ```

  ```java Java
  import com.anthropic.models.messages.ToolTextEditor20250728;
  // ...
  void main() {
    AnthropicClient client = AnthropicOkHttpClient.fromEnv();

    ToolTextEditor20250728 editorTool =
      ToolTextEditor20250728.builder()
        .maxCharacters(10000L)
        .build();

    MessageCreateParams params = MessageCreateParams.builder()
      .model(Model.CLAUDE_OPUS_5)
      .maxTokens(1024)
      .addTool(editorTool)
      .addUserMessage("There's a syntax error in my primes.py file. Can you help me fix it?")
      .build();

    Message message = client.messages().create(params);
    IO.println(message);
  }
  ```

  ```php PHP
  $client = new Client();

  $response = $client->messages->create(
      model: 'claude-opus-5',
      maxTokens: 1024,
      tools: [ToolTextEditor20250728::with(maxCharacters: 10000)],
      messages: [
          [
              'role' => 'user',
              'content' => "There's a syntax error in my primes.py file. Can you help me fix it?",
          ],
      ],
  );

  echo $response;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: [
      {
        type: "text_editor_20250728",
        name: "str_replace_based_edit_tool",
        max_characters: 10000
      }
    ],
    messages: [
      {
        role: "user",
        content: "There's a syntax error in my primes.py file. Can you help me fix it?"
      }
    ]
  )

  puts response
  ```

Use the text editor tool in the following way:

    * Include the text editor tool in your API request
    * Provide a user prompt that may require examining or modifying files, such as "Can you fix the syntax error in my code?"

    * Claude assesses what it needs to look at and uses the `view` command to examine file contents or list directory contents
    * The API response will contain a `tool_use` content block with the `view` command

    * Extract the file or directory path from Claude's tool use request
    * Read the file's contents or list the directory contents
    * If a `max_characters` parameter was specified in the tool configuration, truncate the file contents to that length
    * Return the results to Claude by continuing the conversation with a new `user` message containing a `tool_result` content block

    * After examining the file or directory, Claude may use a command such as `str_replace` to make changes or `insert` to add text at a specific line number.
    * If Claude uses the `str_replace` command, Claude constructs a properly formatted tool use request with the old text and new text to replace it with

    * Extract the file path, old text, and new text from Claude's tool use request
    * Perform the text replacement in the file
    * Return the results to Claude

    * After examining and possibly editing the files, Claude provides a complete explanation of what it found and what changes it made

### Text editor tool commands

The text editor tool supports several commands for viewing and modifying files:

#### view

The `view` command allows Claude to examine the contents of a file or list the contents of a directory. It can read the entire file or a specific range of lines.

Parameters:

* `command`: Must be "view"
* `path`: The path to the file or directory to view
* `view_range` (optional): An array of two integers specifying the start and end line numbers to view. Line numbers are 1-indexed, and -1 for the end line means read to the end of the file. This parameter only applies when viewing files, not directories.

  Example for viewing a file:

  ```json
  {
    "type": "tool_use",
    "id": "toolu_01A09q90qw90lq917835lq9",
    "name": "str_replace_based_edit_tool",
    "input": {
      "command": "view",
      "path": "primes.py"
    }
  }
  ```

  Example for viewing a directory:

  ```json
  {
    "type": "tool_use",
    "id": "toolu_02B19r91rw91mr917835mr9",
    "name": "str_replace_based_edit_tool",
    "input": {
      "command": "view",
      "path": "src/"
    }
  }
  ```

#### str\_replace

The `str_replace` command allows Claude to replace a specific string in a file with a new string. This is used for making precise edits.

Parameters:

* `command`: Must be "str\_replace"
* `path`: The path to the file to modify
* `old_str`: The text to replace (must match exactly, including whitespace and indentation)
* `new_str`: The new text to insert in place of the old text

  ```json
  {
    "type": "tool_use",
    "id": "toolu_01A09q90qw90lq917835lq9",
    "name": "str_replace_based_edit_tool",
    "input": {
      "command": "str_replace",
      "path": "primes.py",
      "old_str": "for num in range(2, limit + 1)",
      "new_str": "for num in range(2, limit + 1):"
    }
  }
  ```

#### create

The `create` command allows Claude to create a new file with specified content.

Parameters:

* `command`: Must be "create"
* `path`: The path where the new file should be created
* `file_text`: The content to write to the new file

  ```json
  {
    "type": "tool_use",
    "id": "toolu_01A09q90qw90lq917835lq9",
    "name": "str_replace_based_edit_tool",
    "input": {
      "command": "create",
      "path": "test_primes.py",
      "file_text": "import unittest\nimport primes\n\nclass TestPrimes(unittest.TestCase):\n    def test_is_prime(self):\n        self.assertTrue(primes.is_prime(2))\n        self.assertTrue(primes.is_prime(3))\n        self.assertFalse(primes.is_prime(4))\n\nif __name__ == '__main__':\n    unittest.main()"
    }
  }
  ```

#### insert

The `insert` command allows Claude to insert text at a specific location in a file.

Parameters:

* `command`: Must be "insert"
* `path`: The path to the file to modify
* `insert_line`: The line number after which to insert the text (0 for beginning of file)
* `insert_text`: The text to insert

  ```json
  {
    "type": "tool_use",
    "id": "toolu_01A09q90qw90lq917835lq9",
    "name": "str_replace_based_edit_tool",
    "input": {
      "command": "insert",
      "path": "primes.py",
      "insert_line": 0,
      "insert_text": "\"\"\"Module for working with prime numbers.\n\nThis module provides functions to check if a number is prime\nand to generate a list of prime numbers up to a given limit.\n\"\"\"\n"
    }
  }
  ```

### Example: Fixing a syntax error with the text editor tool

This example demonstrates how Claude uses the text editor tool to fix a syntax error in a Python file.

First, your application provides Claude with the text editor tool and a prompt to fix a syntax error:

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "tools": [
        {
          "type": "text_editor_20250728",
          "name": "str_replace_based_edit_tool"
        }
      ],
      "messages": [
        {
          "role": "user",
          "content": "There'\''s a syntax error in my primes.py file. Can you help me fix it?"
        }
      ]
    }'
  ```

  ```bash CLI
  ant messages create \
    --model claude-opus-5 \
    --max-tokens 1024 \
    --tool '{type: text_editor_20250728, name: str_replace_based_edit_tool}' \
    --message '{role: user, content: There is a syntax error in my primes.py file. Can you help me fix it?}'
  ```

  ```python Python
  client = anthropic.Anthropic()

  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      tools=[{"type": "text_editor_20250728", "name": "str_replace_based_edit_tool"}],
      messages=[
          {
              "role": "user",
              "content": "There's a syntax error in my primes.py file. Can you help me fix it?",
          }
      ],
  )

  print(response)
  ```

  ```typescript TypeScript
  const anthropic = new Anthropic();

  const response = await anthropic.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: [
      {
        type: "text_editor_20250728",
        name: "str_replace_based_edit_tool"
      }
    ],
    messages: [
      {
        role: "user",
        content: "There's a syntax error in my primes.py file. Can you help me fix it?"
      }
    ]
  });

  console.log(response);
  ```

  ```csharp C#
  var client = new AnthropicClient();

  var response = await client.Messages.Create(
      new()
      {
          Model = Model.ClaudeOpus5,
          MaxTokens = 1024,
          Tools = [new ToolTextEditor20250728()],
          Messages =
          [
              new()
              {
                  Role = Role.User,
                  Content = "There's a syntax error in my primes.py file. Can you help me fix it?",
              },
          ],
      }
  );

  Console.WriteLine(response);
  ```

  ```go Go
  client := anthropic.NewClient()

  response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 1024,
  	Tools: []anthropic.ToolUnionParam{
  		{OfTextEditor20250728: &anthropic.ToolTextEditor20250728Param{}},
  	},
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("There's a syntax error in my primes.py file. Can you help me fix it?")),
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(response)
  ```

  ```java Java
  import com.anthropic.models.messages.ToolTextEditor20250728;
  // ...
  void main() {
    AnthropicClient client = AnthropicOkHttpClient.fromEnv();

    ToolTextEditor20250728 editorTool =
      ToolTextEditor20250728.builder().build();

    MessageCreateParams params = MessageCreateParams.builder()
      .model(Model.CLAUDE_OPUS_5)
      .maxTokens(1024)
      .addTool(editorTool)
      .addUserMessage("There's a syntax error in my primes.py file. Can you help me fix it?")
      .build();

    Message message = client.messages().create(params);
    IO.println(message);
  }
  ```

  ```php PHP
  $client = new Client();

  $response = $client->messages->create(
      model: 'claude-opus-5',
      maxTokens: 1024,
      tools: [new ToolTextEditor20250728()],
      messages: [
          [
              'role' => 'user',
              'content' => "There's a syntax error in my primes.py file. Can you help me fix it?",
          ],
      ],
  );

  echo $response;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: [{type: "text_editor_20250728", name: "str_replace_based_edit_tool"}],
    messages: [
      {
        role: "user",
        content: "There's a syntax error in my primes.py file. Can you help me fix it?"
      }
    ]
  )

  puts response
  ```

Claude uses the text editor tool first to view the file:

```json Output
{
  "id": "msg_01XAbCDeFgHiJkLmNoPQrStU",
  "model": "claude-opus-5",
  "stop_reason": "tool_use",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "I'll help you fix the syntax error in your primes.py file. First, let me take a look at the file to identify the issue."
    },
    {
      "type": "tool_use",
      "id": "toolu_01AbCdEfGhIjKlMnOpQrStU",
      "name": "str_replace_based_edit_tool",
      "input": {
        "command": "view",
        "path": "primes.py"
      }
    }
  ]
}
```

Your application should then read the file and return its contents to Claude:

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "tools": [
        {
          "type": "text_editor_20250728",
          "name": "str_replace_based_edit_tool"
        }
      ],
      "messages": [
        {
          "role": "user",
          "content": "There'\''s a syntax error in my primes.py file. Can you help me fix it?"
        },
        {
          "role": "assistant",
          "content": [
            {
              "type": "text",
              "text": "I'\''ll help you fix the syntax error in your primes.py file. First, let me take a look at the file to identify the issue."
            },
            {
              "type": "tool_use",
              "id": "toolu_01AbCdEfGhIjKlMnOpQrStU",
              "name": "str_replace_based_edit_tool",
              "input": {
                "command": "view",
                "path": "primes.py"
              }
            }
          ]
        },
        {
          "role": "user",
          "content": [
            {
              "type": "tool_result",
              "tool_use_id": "toolu_01AbCdEfGhIjKlMnOpQrStU",
              "content": "1: def is_prime(n):\n2:     \"\"\"Check if a number is prime.\"\"\"\n3:     if n <= 1:\n4:         return False\n5:     if n <= 3:\n6:         return True\n7:     if n % 2 == 0 or n % 3 == 0:\n8:         return False\n9:     i = 5\n10:     while i * i <= n:\n11:         if n % i == 0 or n % (i + 2) == 0:\n12:             return False\n13:         i += 6\n14:     return True\n15: \n16: def get_primes(limit):\n17:     \"\"\"Generate a list of prime numbers up to the given limit.\"\"\"\n18:     primes = []\n19:     for num in range(2, limit + 1)\n20:         if is_prime(num):\n21:             primes.append(num)\n22:     return primes\n23: \n24: def main():\n25:     \"\"\"Main function to demonstrate prime number generation.\"\"\"\n26:     limit = 100\n27:     prime_list = get_primes(limit)\n28:     print(f\"Prime numbers up to {limit}:\")\n29:     print(prime_list)\n30:     print(f\"Found {len(prime_list)} prime numbers.\")\n31: \n32: if __name__ == \"__main__\":\n33:     main()"
            }
          ]
        }
      ]
    }'
  ```

  ```bash CLI
  ant messages create <<'YAML'
  model: claude-opus-5
  max_tokens: 1024
  tools:
    - type: text_editor_20250728
      name: str_replace_based_edit_tool
  messages:
    - role: user
      content: There's a syntax error in my primes.py file. Can you help me fix it?
    - role: assistant
      content:
        - type: text
          text: >-
            I'll help you fix the syntax error in your primes.py file. First,
            let me take a look at the file to identify the issue.
        - type: tool_use
          id: toolu_01AbCdEfGhIjKlMnOpQrStU
          name: str_replace_based_edit_tool
          input:
            command: view
            path: primes.py
    - role: user
      content:
        - type: tool_result
          tool_use_id: toolu_01AbCdEfGhIjKlMnOpQrStU
          content: |-
            1: def is_prime(n):
            2:     """Check if a number is prime."""
            3:     if n <= 1:
            4:         return False
            5:     if n <= 3:
            6:         return True
            7:     if n % 2 == 0 or n % 3 == 0:
            8:         return False
            9:     i = 5
            10:     while i * i <= n:
            11:         if n % i == 0 or n % (i + 2) == 0:
            12:             return False
            13:         i += 6
            14:     return True
            15:
            16: def get_primes(limit):
            17:     """Generate a list of prime numbers up to the given limit."""
            18:     primes = []
            19:     for num in range(2, limit + 1)
            20:         if is_prime(num):
            21:             primes.append(num)
            22:     return primes
            23:
            24: def main():
            25:     """Main function to demonstrate prime number generation."""
            26:     limit = 100
            27:     prime_list = get_primes(limit)
            28:     print(f"Prime numbers up to {limit}:")
            29:     print(prime_list)
            30:     print(f"Found {len(prime_list)} prime numbers.")
            31:
            32: if __name__ == "__main__":
            33:     main()
  YAML
  ```

  ```python Python
  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      tools=[{"type": "text_editor_20250728", "name": "str_replace_based_edit_tool"}],
      messages=[
          {
              "role": "user",
              "content": "There's a syntax error in my primes.py file. Can you help me fix it?",
          },
          {
              "role": "assistant",
              "content": [
                  {
                      "type": "text",
                      "text": "I'll help you fix the syntax error in your primes.py file. First, let me take a look at the file to identify the issue.",
                  },
                  {
                      "type": "tool_use",
                      "id": "toolu_01AbCdEfGhIjKlMnOpQrStU",
                      "name": "str_replace_based_edit_tool",
                      "input": {"command": "view", "path": "primes.py"},
                  },
              ],
          },
          {
              "role": "user",
              "content": [
                  {
                      "type": "tool_result",
                      "tool_use_id": "toolu_01AbCdEfGhIjKlMnOpQrStU",
                      "content": '1: def is_prime(n):\n2:     """Check if a number is prime."""\n3:     if n <= 1:\n4:         return False\n5:     if n <= 3:\n6:         return True\n7:     if n % 2 == 0 or n % 3 == 0:\n8:         return False\n9:     i = 5\n10:     while i * i <= n:\n11:         if n % i == 0 or n % (i + 2) == 0:\n12:             return False\n13:         i += 6\n14:     return True\n15: \n16: def get_primes(limit):\n17:     """Generate a list of prime numbers up to the given limit."""\n18:     primes = []\n19:     for num in range(2, limit + 1)\n20:         if is_prime(num):\n21:             primes.append(num)\n22:     return primes\n23: \n24: def main():\n25:     """Main function to demonstrate prime number generation."""\n26:     limit = 100\n27:     prime_list = get_primes(limit)\n28:     print(f"Prime numbers up to {limit}:")\n29:     print(prime_list)\n30:     print(f"Found {len(prime_list)} prime numbers.")\n31: \n32: if __name__ == "__main__":\n33:     main()',
                  }
              ],
          },
      ],
  )

  print(response)
  ```

  ```typescript TypeScript
  const anthropic = new Anthropic();

  const response = await anthropic.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: [
      {
        type: "text_editor_20250728",
        name: "str_replace_based_edit_tool"
      }
    ],
    messages: [
      {
        role: "user",
        content: "There's a syntax error in my primes.py file. Can you help me fix it?"
      },
      {
        role: "assistant",
        content: [
          {
            type: "text",
            text: "I'll help you fix the syntax error in your primes.py file. First, let me take a look at the file to identify the issue."
          },
          {
            type: "tool_use",
            id: "toolu_01AbCdEfGhIjKlMnOpQrStU",
            name: "str_replace_based_edit_tool",
            input: {
              command: "view",
              path: "primes.py"
            }
          }
        ]
      },
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: "toolu_01AbCdEfGhIjKlMnOpQrStU",
            content:
              '1: def is_prime(n):\n2:     """Check if a number is prime."""\n3:     if n <= 1:\n4:         return False\n5:     if n <= 3:\n6:         return True\n7:     if n % 2 == 0 or n % 3 == 0:\n8:         return False\n9:     i = 5\n10:     while i * i <= n:\n11:         if n % i == 0 or n % (i + 2) == 0:\n12:             return False\n13:         i += 6\n14:     return True\n15: \n16: def get_primes(limit):\n17:     """Generate a list of prime numbers up to the given limit."""\n18:     primes = []\n19:     for num in range(2, limit + 1)\n20:         if is_prime(num):\n21:             primes.append(num)\n22:     return primes\n23: \n24: def main():\n25:     """Main function to demonstrate prime number generation."""\n26:     limit = 100\n27:     prime_list = get_primes(limit)\n28:     print(f"Prime numbers up to {limit}:")\n29:     print(prime_list)\n30:     print(f"Found {len(prime_list)} prime numbers.")\n31: \n32: if __name__ == "__main__":\n33:     main()'
          }
        ]
      }
    ]
  });

  console.log(response);
  ```

  ```csharp C#
  var client = new AnthropicClient();

  var response = await client.Messages.Create(
      new()
      {
          Model = Model.ClaudeOpus5,
          MaxTokens = 1024,
          Tools = [new ToolTextEditor20250728()],
          Messages =
          [
              new()
              {
                  Role = Role.User,
                  Content = "There's a syntax error in my primes.py file. Can you help me fix it?",
              },
              new()
              {
                  Role = Role.Assistant,
                  Content = new MessageParamContent(new List<ContentBlockParam>
                  {
                      new ContentBlockParam(new TextBlockParam()
                      {
                          Text = "I'll help you fix the syntax error in your primes.py file. First, let me take a look at the file to identify the issue.",
                      }),
                      new ContentBlockParam(new ToolUseBlockParam()
                      {
                          ID = "toolu_01AbCdEfGhIjKlMnOpQrStU",
                          Name = "str_replace_based_edit_tool",
                          Input = new Dictionary<string, JsonElement>
                          {
                              ["command"] = JsonSerializer.SerializeToElement("view"),
                              ["path"] = JsonSerializer.SerializeToElement("primes.py"),
                          },
                      }),
                  }),
              },
              new()
              {
                  Role = Role.User,
                  Content = new MessageParamContent(new List<ContentBlockParam>
                  {
                      new ContentBlockParam(new ToolResultBlockParam()
                      {
                          ToolUseID = "toolu_01AbCdEfGhIjKlMnOpQrStU",
                          Content = "1: def is_prime(n):\n2:     \"\"\"Check if a number is prime.\"\"\"\n3:     if n <= 1:\n4:         return False\n5:     if n <= 3:\n6:         return True\n7:     if n % 2 == 0 or n % 3 == 0:\n8:         return False\n9:     i = 5\n10:     while i * i <= n:\n11:         if n % i == 0 or n % (i + 2) == 0:\n12:             return False\n13:         i += 6\n14:     return True\n15: \n16: def get_primes(limit):\n17:     \"\"\"Generate a list of prime numbers up to the given limit.\"\"\"\n18:     primes = []\n19:     for num in range(2, limit + 1)\n20:         if is_prime(num):\n21:             primes.append(num)\n22:     return primes\n23: \n24: def main():\n25:     \"\"\"Main function to demonstrate prime number generation.\"\"\"\n26:     limit = 100\n27:     prime_list = get_primes(limit)\n28:     print(f\"Prime numbers up to {limit}:\")\n29:     print(prime_list)\n30:     print(f\"Found {len(prime_list)} prime numbers.\")\n31: \n32: if __name__ == \"__main__\":\n33:     main()",
                      }),
                  }),
              },
          ],
      }
  );

  Console.WriteLine(response);
  ```

  ```go Go
  client := anthropic.NewClient()

  response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 1024,
  	Tools: []anthropic.ToolUnionParam{
  		{OfTextEditor20250728: &anthropic.ToolTextEditor20250728Param{}},
  	},
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("There's a syntax error in my primes.py file. Can you help me fix it?")),
  		anthropic.NewAssistantMessage(
  			anthropic.NewTextBlock("I'll help you fix the syntax error in your primes.py file. First, let me take a look at the file to identify the issue."),
  			anthropic.NewToolUseBlock(
  				"toolu_01AbCdEfGhIjKlMnOpQrStU",
  				map[string]any{"command": "view", "path": "primes.py"},
  				"str_replace_based_edit_tool",
  			),
  		),
  		anthropic.NewUserMessage(
  			anthropic.NewToolResultBlock(
  				"toolu_01AbCdEfGhIjKlMnOpQrStU",
  				"1: def is_prime(n):\n2:     \"\"\"Check if a number is prime.\"\"\"\n3:     if n <= 1:\n4:         return False\n5:     if n <= 3:\n6:         return True\n7:     if n % 2 == 0 or n % 3 == 0:\n8:         return False\n9:     i = 5\n10:     while i * i <= n:\n11:         if n % i == 0 or n % (i + 2) == 0:\n12:             return False\n13:         i += 6\n14:     return True\n15: \n16: def get_primes(limit):\n17:     \"\"\"Generate a list of prime numbers up to the given limit.\"\"\"\n18:     primes = []\n19:     for num in range(2, limit + 1)\n20:         if is_prime(num):\n21:             primes.append(num)\n22:     return primes\n23: \n24: def main():\n25:     \"\"\"Main function to demonstrate prime number generation.\"\"\"\n26:     limit = 100\n27:     prime_list = get_primes(limit)\n28:     print(f\"Prime numbers up to {limit}:\")\n29:     print(prime_list)\n30:     print(f\"Found {len(prime_list)} prime numbers.\")\n31: \n32: if __name__ == \"__main__\":\n33:     main()",
  				false,
  			),
  		),
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(response)
  ```

  ```java Java
  AnthropicClient client = AnthropicOkHttpClient.fromEnv();

  MessageCreateParams params = MessageCreateParams.builder()
    .model(Model.CLAUDE_OPUS_5)
    .maxTokens(1024)
    .addTool(ToolTextEditor20250728.builder().build())
    .addUserMessage("There's a syntax error in my primes.py file. Can you help me fix it?")
    .addAssistantMessageOfBlockParams(
      List.of(
        ContentBlockParam.ofText(
          TextBlockParam.builder()
            .text("I'll help you fix the syntax error in your primes.py file. First, let me take a look at the file to identify the issue.")
            .build()
        ),
        ContentBlockParam.ofToolUse(
          ToolUseBlockParam.builder()
            .id("toolu_01AbCdEfGhIjKlMnOpQrStU")
            .name("str_replace_based_edit_tool")
            .input(
              ToolUseBlockParam.Input.builder()
                .putAdditionalProperty("command", JsonValue.from("view"))
                .putAdditionalProperty("path", JsonValue.from("primes.py"))
                .build()
            )
            .build()
        )
      )
    )
    .addUserMessageOfBlockParams(
      List.of(
        ContentBlockParam.ofToolResult(
          ToolResultBlockParam.builder()
            .toolUseId("toolu_01AbCdEfGhIjKlMnOpQrStU")
            .content("1: def is_prime(n):\n2:     \"\"\"Check if a number is prime.\"\"\"\n3:     if n <= 1:\n4:         return False\n5:     if n <= 3:\n6:         return True\n7:     if n % 2 == 0 or n % 3 == 0:\n8:         return False\n9:     i = 5\n10:     while i * i <= n:\n11:         if n % i == 0 or n % (i + 2) == 0:\n12:             return False\n13:         i += 6\n14:     return True\n15: \n16: def get_primes(limit):\n17:     \"\"\"Generate a list of prime numbers up to the given limit.\"\"\"\n18:     primes = []\n19:     for num in range(2, limit + 1)\n20:         if is_prime(num):\n21:             primes.append(num)\n22:     return primes\n23: \n24: def main():\n25:     \"\"\"Main function to demonstrate prime number generation.\"\"\"\n26:     limit = 100\n27:     prime_list = get_primes(limit)\n28:     print(f\"Prime numbers up to {limit}:\")\n29:     print(prime_list)\n30:     print(f\"Found {len(prime_list)} prime numbers.\")\n31: \n32: if __name__ == \"__main__\":\n33:     main()")
            .build()
        )
      )
    )
    .build();

  Message message = client.messages().create(params);
  System.out.println(message);
  ```

  ```php PHP
  $client = new Client();

  $response = $client->messages->create(
      model: 'claude-opus-5',
      maxTokens: 1024,
      tools: [new ToolTextEditor20250728()],
      messages: [
          [
              'role' => 'user',
              'content' => "There's a syntax error in my primes.py file. Can you help me fix it?",
          ],
          [
              'role' => 'assistant',
              'content' => [
                  [
                      'type' => 'text',
                      'text' => "I'll help you fix the syntax error in your primes.py file. First, let me take a look at the file to identify the issue.",
                  ],
                  [
                      'type' => 'tool_use',
                      'id' => 'toolu_01AbCdEfGhIjKlMnOpQrStU',
                      'name' => 'str_replace_based_edit_tool',
                      'input' => ['command' => 'view', 'path' => 'primes.py'],
                  ],
              ],
          ],
          [
              'role' => 'user',
              'content' => [
                  [
                      'type' => 'tool_result',
                      'tool_use_id' => 'toolu_01AbCdEfGhIjKlMnOpQrStU',
                      'content' => "1: def is_prime(n):\n2:     \"\"\"Check if a number is prime.\"\"\"\n3:     if n <= 1:\n4:         return False\n5:     if n <= 3:\n6:         return True\n7:     if n % 2 == 0 or n % 3 == 0:\n8:         return False\n9:     i = 5\n10:     while i * i <= n:\n11:         if n % i == 0 or n % (i + 2) == 0:\n12:             return False\n13:         i += 6\n14:     return True\n15: \n16: def get_primes(limit):\n17:     \"\"\"Generate a list of prime numbers up to the given limit.\"\"\"\n18:     primes = []\n19:     for num in range(2, limit + 1)\n20:         if is_prime(num):\n21:             primes.append(num)\n22:     return primes\n23: \n24: def main():\n25:     \"\"\"Main function to demonstrate prime number generation.\"\"\"\n26:     limit = 100\n27:     prime_list = get_primes(limit)\n28:     print(f\"Prime numbers up to {limit}:\")\n29:     print(prime_list)\n30:     print(f\"Found {len(prime_list)} prime numbers.\")\n31: \n32: if __name__ == \"__main__\":\n33:     main()",
                  ],
              ],
          ],
      ],
  );

  echo $response;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: [{type: "text_editor_20250728", name: "str_replace_based_edit_tool"}],
    messages: [
      {
        role: "user",
        content: "There's a syntax error in my primes.py file. Can you help me fix it?"
      },
      {
        role: "assistant",
        content: [
          {
            type: "text",
            text: "I'll help you fix the syntax error in your primes.py file. First, let me take a look at the file to identify the issue."
          },
          {
            type: "tool_use",
            id: "toolu_01AbCdEfGhIjKlMnOpQrStU",
            name: "str_replace_based_edit_tool",
            input: {command: "view", path: "primes.py"}
          }
        ]
      },
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: "toolu_01AbCdEfGhIjKlMnOpQrStU",
            content: "1: def is_prime(n):\n2:     \"\"\"Check if a number is prime.\"\"\"\n3:     if n <= 1:\n4:         return False\n5:     if n <= 3:\n6:         return True\n7:     if n % 2 == 0 or n % 3 == 0:\n8:         return False\n9:     i = 5\n10:     while i * i <= n:\n11:         if n % i == 0 or n % (i + 2) == 0:\n12:             return False\n13:         i += 6\n14:     return True\n15: \n16: def get_primes(limit):\n17:     \"\"\"Generate a list of prime numbers up to the given limit.\"\"\"\n18:     primes = []\n19:     for num in range(2, limit + 1)\n20:         if is_prime(num):\n21:             primes.append(num)\n22:     return primes\n23: \n24: def main():\n25:     \"\"\"Main function to demonstrate prime number generation.\"\"\"\n26:     limit = 100\n27:     prime_list = get_primes(limit)\n28:     print(f\"Prime numbers up to {limit}:\")\n29:     print(prime_list)\n30:     print(f\"Found {len(prime_list)} prime numbers.\")\n31: \n32: if __name__ == \"__main__\":\n33:     main()"
          }
        ]
      }
    ]
  )

  puts response
  ```

  **Line numbers**

  In the preceding example, the `view` tool result includes file contents with line numbers prepended to each line (for example, "1: def is\_prime(n):"). Line numbers are not required, but they are essential for successfully using the `view_range` parameter to examine specific sections of files and the `insert_line` parameter to add content at precise locations.

Claude identifies the syntax error and uses the `str_replace` command to fix it:

```json Output
{
  "id": "msg_01VwXyZAbCdEfGhIjKlMnO",
  "model": "claude-opus-5",
  "stop_reason": "tool_use",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "I found the syntax error in your primes.py file. In the `get_primes` function, there is a missing colon (:) at the end of the for loop line. Let me fix that for you."
    },
    {
      "type": "tool_use",
      "id": "toolu_01PqRsTuVwXyZAbCdEfGh",
      "name": "str_replace_based_edit_tool",
      "input": {
        "command": "str_replace",
        "path": "primes.py",
        "old_str": "    for num in range(2, limit + 1)",
        "new_str": "    for num in range(2, limit + 1):"
      }
    }
  ]
}
```

Your application should then make the edit and return the result:

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "tools": [
        {
          "type": "text_editor_20250728",
          "name": "str_replace_based_edit_tool"
        }
      ],
      "messages": [
        {
          "role": "assistant",
          "content": [
            {
              "type": "text",
              "text": "I found the syntax error in your primes.py file. In the `get_primes` function, there is a missing colon (:) at the end of the for loop line. Let me fix that for you."
            },
            {
              "type": "tool_use",
              "id": "toolu_01PqRsTuVwXyZAbCdEfGh",
              "name": "str_replace_based_edit_tool",
              "input": {
                "command": "str_replace",
                "path": "primes.py",
                "old_str": "    for num in range(2, limit + 1)",
                "new_str": "    for num in range(2, limit + 1):"
              }
            }
          ]
        },
        {
          "role": "user",
          "content": [
            {
              "type": "tool_result",
              "tool_use_id": "toolu_01PqRsTuVwXyZAbCdEfGh",
              "content": "Successfully replaced text at exactly one location."
            }
          ]
        }
      ]
    }'
  ```

  ```bash CLI
  ant messages create <<'YAML'
  model: claude-opus-5
  max_tokens: 1024
  tools:
    - type: text_editor_20250728
      name: str_replace_based_edit_tool
  messages:
    # Previous messages...
    - role: assistant
      content:
        - type: text
          text: >-
            I found the syntax error in your primes.py file. In the `get_primes`
            function, there is a missing colon (:) at the end of the for loop
            line. Let me fix that for you.
        - type: tool_use
          id: toolu_01PqRsTuVwXyZAbCdEfGh
          name: str_replace_based_edit_tool
          input:
            command: str_replace
            path: primes.py
            old_str: "    for num in range(2, limit + 1)"
            new_str: "    for num in range(2, limit + 1):"
    - role: user
      content:
        - type: tool_result
          tool_use_id: toolu_01PqRsTuVwXyZAbCdEfGh
          content: Successfully replaced text at exactly one location.
  YAML
  ```

  ```python Python
  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      tools=[{"type": "text_editor_20250728", "name": "str_replace_based_edit_tool"}],
      messages=[
          # Previous messages...
          {
              "role": "assistant",
              "content": [
                  {
                      "type": "text",
                      "text": "I found the syntax error in your primes.py file. In the `get_primes` function, there is a missing colon (:) at the end of the for loop line. Let me fix that for you.",
                  },
                  {
                      "type": "tool_use",
                      "id": "toolu_01PqRsTuVwXyZAbCdEfGh",
                      "name": "str_replace_based_edit_tool",
                      "input": {
                          "command": "str_replace",
                          "path": "primes.py",
                          "old_str": "    for num in range(2, limit + 1)",
                          "new_str": "    for num in range(2, limit + 1):",
                      },
                  },
              ],
          },
          {
              "role": "user",
              "content": [
                  {
                      "type": "tool_result",
                      "tool_use_id": "toolu_01PqRsTuVwXyZAbCdEfGh",
                      "content": "Successfully replaced text at exactly one location.",
                  }
              ],
          },
      ],
  )

  print(response)
  ```

  ```typescript TypeScript
  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: [
      {
        type: "text_editor_20250728",
        name: "str_replace_based_edit_tool"
      }
    ],
    messages: [
      // Previous messages...
      {
        role: "assistant",
        content: [
          {
            type: "text",
            text: "I found the syntax error in your primes.py file. In the `get_primes` function, there is a missing colon (:) at the end of the for loop line. Let me fix that for you."
          },
          {
            type: "tool_use",
            id: "toolu_01PqRsTuVwXyZAbCdEfGh",
            name: "str_replace_based_edit_tool",
            input: {
              command: "str_replace",
              path: "primes.py",
              old_str: "    for num in range(2, limit + 1)",
              new_str: "    for num in range(2, limit + 1):"
            }
          }
        ]
      },
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: "toolu_01PqRsTuVwXyZAbCdEfGh",
            content: "Successfully replaced text at exactly one location."
          }
        ]
      }
    ]
  });

  console.log(response);
  ```

  ```csharp C#
  var client = new AnthropicClient();

  var response = await client.Messages.Create(
      new()
      {
          Model = Model.ClaudeOpus5,
          MaxTokens = 1024,
          Tools = [new ToolTextEditor20250728()],
          Messages =
          [
              // Previous messages...
              new()
              {
                  Role = Role.Assistant,
                  Content = new MessageParamContent(new List<ContentBlockParam>
                  {
                      new ContentBlockParam(new TextBlockParam()
                      {
                          Text = "I found the syntax error in your primes.py file. In the `get_primes` function, there is a missing colon (:) at the end of the for loop line. Let me fix that for you.",
                      }),
                      new ContentBlockParam(new ToolUseBlockParam()
                      {
                          ID = "toolu_01PqRsTuVwXyZAbCdEfGh",
                          Name = "str_replace_based_edit_tool",
                          Input = new Dictionary<string, JsonElement>
                          {
                              ["command"] = JsonSerializer.SerializeToElement("str_replace"),
                              ["path"] = JsonSerializer.SerializeToElement("primes.py"),
                              ["old_str"] = JsonSerializer.SerializeToElement("    for num in range(2, limit + 1)"),
                              ["new_str"] = JsonSerializer.SerializeToElement("    for num in range(2, limit + 1):"),
                          },
                      }),
                  }),
              },
              new()
              {
                  Role = Role.User,
                  Content = new MessageParamContent(new List<ContentBlockParam>
                  {
                      new ContentBlockParam(new ToolResultBlockParam()
                      {
                          ToolUseID = "toolu_01PqRsTuVwXyZAbCdEfGh",
                          Content = "Successfully replaced text at exactly one location.",
                      }),
                  }),
              },
          ],
      }
  );

  Console.WriteLine(response);
  ```

  ```go Go
  client := anthropic.NewClient()

  response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 1024,
  	Tools: []anthropic.ToolUnionParam{
  		{OfTextEditor20250728: &anthropic.ToolTextEditor20250728Param{}},
  	},
  	Messages: []anthropic.MessageParam{
  		// Previous messages...
  		anthropic.NewAssistantMessage(
  			anthropic.NewTextBlock("I found the syntax error in your primes.py file. In the `get_primes` function, there is a missing colon (:) at the end of the for loop line. Let me fix that for you."),
  			anthropic.NewToolUseBlock(
  				"toolu_01PqRsTuVwXyZAbCdEfGh",
  				map[string]any{
  					"command": "str_replace",
  					"path":    "primes.py",
  					"old_str": "    for num in range(2, limit + 1)",
  					"new_str": "    for num in range(2, limit + 1):",
  				},
  				"str_replace_based_edit_tool",
  			),
  		),
  		anthropic.NewUserMessage(
  			anthropic.NewToolResultBlock(
  				"toolu_01PqRsTuVwXyZAbCdEfGh",
  				"Successfully replaced text at exactly one location.",
  				false,
  			),
  		),
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(response)
  ```

  ```java Java
  AnthropicClient client = AnthropicOkHttpClient.fromEnv();

  MessageCreateParams params = MessageCreateParams.builder()
    .model(Model.CLAUDE_OPUS_5)
    .maxTokens(1024)
    .addTool(ToolTextEditor20250728.builder().build())
    // Previous messages would go here
    .addAssistantMessageOfBlockParams(
      List.of(
        ContentBlockParam.ofText(
          TextBlockParam.builder()
            .text(
              "I found the syntax error in your primes.py file. In the `get_primes` function, there is a missing colon (:) at the end of the for loop line. Let me fix that for you."
            )
            .build()
        ),
        ContentBlockParam.ofToolUse(
          ToolUseBlockParam.builder()
            .id("toolu_01PqRsTuVwXyZAbCdEfGh")
            .name("str_replace_based_edit_tool")
            .input(
              ToolUseBlockParam.Input.builder()
                .putAdditionalProperty("command", JsonValue.from("str_replace"))
                .putAdditionalProperty("path", JsonValue.from("primes.py"))
                .putAdditionalProperty(
                  "old_str",
                  JsonValue.from("    for num in range(2, limit + 1)")
                )
                .putAdditionalProperty(
                  "new_str",
                  JsonValue.from("    for num in range(2, limit + 1):")
                )
                .build()
            )
            .build()
        )
      )
    )
    .addUserMessageOfBlockParams(
      List.of(
        ContentBlockParam.ofToolResult(
          ToolResultBlockParam.builder()
            .toolUseId("toolu_01PqRsTuVwXyZAbCdEfGh")
            .content("Successfully replaced text at exactly one location.")
            .build()
        )
      )
    )
    .build();

  Message message = client.messages().create(params);
  System.out.println(message);
  ```

  ```php PHP
  $client = new Client();

  $response = $client->messages->create(
      model: 'claude-opus-5',
      maxTokens: 1024,
      tools: [new ToolTextEditor20250728()],
      messages: [
          // Previous messages...
          [
              'role' => 'assistant',
              'content' => [
                  [
                      'type' => 'text',
                      'text' => 'I found the syntax error in your primes.py file. In the `get_primes` function, there is a missing colon (:) at the end of the for loop line. Let me fix that for you.',
                  ],
                  [
                      'type' => 'tool_use',
                      'id' => 'toolu_01PqRsTuVwXyZAbCdEfGh',
                      'name' => 'str_replace_based_edit_tool',
                      'input' => [
                          'command' => 'str_replace',
                          'path' => 'primes.py',
                          'old_str' => '    for num in range(2, limit + 1)',
                          'new_str' => '    for num in range(2, limit + 1):',
                      ],
                  ],
              ],
          ],
          [
              'role' => 'user',
              'content' => [
                  [
                      'type' => 'tool_result',
                      'tool_use_id' => 'toolu_01PqRsTuVwXyZAbCdEfGh',
                      'content' => 'Successfully replaced text at exactly one location.',
                  ],
              ],
          ],
      ],
  );

  echo $response;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: [{type: "text_editor_20250728", name: "str_replace_based_edit_tool"}],
    messages: [
      # Previous messages...
      {
        role: "assistant",
        content: [
          {
            type: "text",
            text: "I found the syntax error in your primes.py file. In the `get_primes` function, there is a missing colon (:) at the end of the for loop line. Let me fix that for you."
          },
          {
            type: "tool_use",
            id: "toolu_01PqRsTuVwXyZAbCdEfGh",
            name: "str_replace_based_edit_tool",
            input: {
              command: "str_replace",
              path: "primes.py",
              old_str: "    for num in range(2, limit + 1)",
              new_str: "    for num in range(2, limit + 1):"
            }
          }
        ]
      },
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: "toolu_01PqRsTuVwXyZAbCdEfGh",
            content: "Successfully replaced text at exactly one location."
          }
        ]
      }
    ]
  )

  puts response
  ```

Finally, Claude provides a complete explanation of the fix:

````json Output
{
  "id": "msg_01IjKlMnOpQrStUvWxYzAb",
  "model": "claude-opus-5",
  "stop_reason": "end_turn",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "I've fixed the syntax error in your primes.py file. The issue was in the `get_primes` function at line 19. There was a missing colon (:) at the end of the for loop line.\n\nHere's what I changed:\n\nFrom:\n```python\nfor num in range(2, limit + 1)\n```\n\nTo:\n```python\nfor num in range(2, limit + 1):\n```\n\nIn Python, a colon is required at the end of statements that start a new code block, such as for loops, if statements, function definitions, etc. Without the colon, Python raises a syntax error because it doesn't know where the code block begins.\n\nYour code should now run correctly. The function will properly generate a list of prime numbers up to the specified limit."
    }
  ]
}
````
