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
sourceRel: "api/docs/guides/reasoning.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/reasoning.md"
sourceSha256: "cf636c88ee3feaf7cad399534f49fe70ca853728f4bd2f387c6295206c10e93d"
pageSha256: "2f6783f93f3740d590b451c48921fbf63e9c1e47f97e850bda8182a1f5ef3aef"
contentMode: "local-full"
zh: ""
---

## Advice on prompting

Consider these differences when prompting a reasoning model. Reasoning-capable GPT-5 models usually work best when you give them a clear goal, strong constraints, and an explicit output contract without prescribing every intermediate step.

- Give the model the task, constraints, and desired output format.
- Treat `reasoning.effort` as a tuning knob, not the primary way to recover quality.
- For agentic or research-heavy workflows, define what counts as done and how the model should verify its work.

For more information on best practices when using reasoning models, [refer to this guide](https://developers.openai.com/api/docs/guides/reasoning-best-practices).

### Prompt examples

Coding (refactoring)

    

OpenAI o-series models are able to implement complex algorithms and produce code. This prompt asks o1 to refactor a React component based on some specific criteria.

  Refactor code

```javascript
import OpenAI from "openai";

const openai = new OpenAI();

const prompt = `
Instructions:
- Given the React component below, change it so that nonfiction books have red
  text.
- Return only the code in your reply
- Do not include any additional formatting, such as markdown code blocks
- For formatting, use four space tabs, and do not allow any lines of code to
  exceed 80 columns

const books = [
  { title: 'Dune', category: 'fiction', id: 1 },
  { title: 'Frankenstein', category: 'fiction', id: 2 },
  { title: 'Moneyball', category: 'nonfiction', id: 3 },
];

export default function BookList() {
  const listItems = books.map(book =>
    <li>
      {book.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}
`.trim();

const response = await openai.responses.create({
  model: "gpt-6-astra",
  input: [
    {
      role: "user",
      content: prompt,
    },
  ],
});

console.log(response.output_text);
```

```python
from openai import OpenAI

client = OpenAI()

prompt = """
Instructions:
- Given the React component below, change it so that nonfiction books have red
  text.
- Return only the code in your reply
- Do not include any additional formatting, such as markdown code blocks
- For formatting, use four space tabs, and do not allow any lines of code to
  exceed 80 columns

const books = [
  { title: 'Dune', category: 'fiction', id: 1 },
  { title: 'Frankenstein', category: 'fiction', id: 2 },
  { title: 'Moneyball', category: 'nonfiction', id: 3 },
];

export default function BookList() {
  const listItems = books.map(book =>
    <li>
      {book.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}
"""

response = client.responses.create(
    model="gpt-6-astra",
    input=[
        {
            "role": "user",
            "content": prompt,
        }
    ],
)

print(response.output_text)
```

```go
package main

import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

func main() {
	client := openai.NewClient()
	prompt := `Instructions:
- Given the React component below, change it so that nonfiction books have red text.
- Return only the code in your reply.
- Do not include any additional formatting, such as markdown code blocks.

const books = [
  { title: 'Dune', category: 'fiction', id: 1 },
  { title: 'Frankenstein', category: 'fiction', id: 2 },
  { title: 'Moneyball', category: 'nonfiction', id: 3 },
];`

	response, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model: "gpt-6-astra",
		Input: responses.ResponseNewParamsInputUnion{
			OfString: openai.String(prompt),
		},
	})
	if err != nil {
		panic(err)
	}

	fmt.Println(response.OutputText())
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.responses.ResponseCreateParams;

String prompt =
    """
    Instructions:
    - Given the React component below, change it so that nonfiction books have red text.
    - Return only the code in your reply.
    - Do not include any additional formatting, such as markdown code blocks.

    const books = [
    { title: 'Dune', category: 'fiction', id: 1 },
    { title: 'Frankenstein', category: 'fiction', id: 2 },
    { title: 'Moneyball', category: 'nonfiction', id: 3 },
    ];
    """
        .strip();

ResponseCreateParams params =
    ResponseCreateParams.builder().model("gpt-6-astra").input(prompt).build();

client.responses().create(params).output().stream()
    .flatMap(item -> item.message().stream())
    .flatMap(message -> message.content().stream())
    .flatMap(content -> content.outputText().stream())
    .forEach(text -> System.out.println(text.text()));
```

```csharp
using OpenAI.Responses;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
ResponsesClient client = new(key);

string prompt =
    """
    Instructions:
    - Given the React component below, make nonfiction book titles red.
    - Return only the updated component code in your reply.
    - Do not include any additional formatting, such as markdown code blocks.
    - For formatting, use four space tabs, and do not allow any lines of code to
      exceed 80 columns.

    const books = [
      { title: 'Dune', category: 'fiction', id: 1 },
      { title: 'Frankenstein', category: 'fiction', id: 2 },
      { title: 'Moneyball', category: 'nonfiction', id: 3 },
    ];

    export default function BookList() {
      const listItems = books.map(book =>
        <li>
          {book.title}
        </li>
      );

      return (
        <ul>{listItems}</ul>
      );
    }
    """;
ResponseResult response = await client.CreateResponseAsync(
    "gpt-6-astra",
    [ResponseItem.CreateUserMessageItem(prompt)]
);
Console.WriteLine(response.GetOutputText());
```

```ruby
require "openai"

client = OpenAI::Client.new
prompt = <<~PROMPT
  Instructions:
  - Given the React component below, change it so that nonfiction books have red text.
  - Return only the code in your reply.
  - Do not include any additional formatting, such as markdown code blocks.

  const books = [
    { title: 'Dune', category: 'fiction', id: 1 },
    { title: 'Frankenstein', category: 'fiction', id: 2 },
    { title: 'Moneyball', category: 'nonfiction', id: 3 },
  ];
PROMPT

response = client.responses.create(
  model: "gpt-6-astra",
  input: prompt
)

puts(response.output_text)
```

  

  

    
Coding (planning)

    

OpenAI o-series models are also adept in creating multi-step plans. This example prompt asks o1 to create a filesystem structure for a full solution, along with Python code that implements the desired use case.

  Plan and create a Python project

```javascript
import OpenAI from "openai";

const openai = new OpenAI();

const prompt = `
I want to build a Python app that takes user questions and looks
them up in a database where they are mapped to answers. If there
is close match, it retrieves the matched answer. If there isn't,
it asks the user to provide an answer and stores the
question/answer pair in the database. Make a plan for the directory
structure you'll need, then return each file in full. Only supply
your reasoning at the beginning and end, not throughout the code.
`.trim();

const response = await openai.responses.create({
  model: "gpt-6-astra",
  input: [
    {
      role: "user",
      content: prompt,
    },
  ],
});

console.log(response.output_text);
```

```python
from openai import OpenAI

client = OpenAI()

prompt = """
I want to build a Python app that takes user questions and looks
them up in a database where they are mapped to answers. If there
is close match, it retrieves the matched answer. If there isn't,
it asks the user to provide an answer and stores the
question/answer pair in the database. Make a plan for the directory
structure you'll need, then return each file in full. Only supply
your reasoning at the beginning and end, not throughout the code.
"""

response = client.responses.create(
    model="gpt-6-astra",
    input=[
        {
            "role": "user",
            "content": prompt,
        }
    ],
)

print(response.output_text)
```

```go
package main

import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

func main() {
	client := openai.NewClient()
	prompt := `I want to build a Python app that takes user questions and looks them up
in a database where they are mapped to answers. If there is a close match, it
retrieves the matched answer. If there is not, it asks the user to provide an
answer and stores the question/answer pair in the database. Make a plan for the
directory structure you will need, then return each file in full.`

	response, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model: "gpt-6-astra",
		Input: responses.ResponseNewParamsInputUnion{
			OfString: openai.String(prompt),
		},
	})
	if err != nil {
		panic(err)
	}

	fmt.Println(response.OutputText())
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.responses.ResponseCreateParams;

String prompt =
    """
    I want to build a Python app that looks up user questions in a database where
    they are mapped to answers. If there is a close match, it retrieves the answer.
    Otherwise, it asks the user for an answer and stores the question and answer.
    Plan the directory structure, then return each file in full.
    """
        .strip();

ResponseCreateParams params =
    ResponseCreateParams.builder().model("gpt-6-astra").input(prompt).build();

client.responses().create(params).output().stream()
    .flatMap(item -> item.message().stream())
    .flatMap(message -> message.content().stream())
    .flatMap(content -> content.outputText().stream())
    .forEach(text -> System.out.println(text.text()));
```

```csharp
using OpenAI.Responses;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
ResponsesClient client = new(key);

string prompt =
    """
    I want to build a Python app that looks up user questions in a database where
    they are mapped to answers. If there is a close match, it retrieves the answer.
    Otherwise, it asks the user for an answer and stores the question and answer.
    Plan the directory structure, then return each file in full.
    Only supply your reasoning at the beginning and end, not throughout the code.
    """;
ResponseResult response = await client.CreateResponseAsync("gpt-6-astra", prompt);

Console.WriteLine(response.GetOutputText());
```

```ruby
require "openai"

client = OpenAI::Client.new
prompt = <<~PROMPT
  I want to build a Python app that looks up user questions in a database where
  they are mapped to answers. If there is a close match, it retrieves the answer.
  Otherwise, it asks the user for an answer and stores the question and answer.
  Plan the directory structure, then return each file in full.
PROMPT

response = client.responses.create(
  model: "gpt-6-astra",
  input: prompt
)

puts(response.output_text)
```

  

  

    
STEM Research

    

OpenAI o-series models have shown excellent performance in STEM research. Prompts asking for support of basic research tasks should show strong results.

  Ask questions related to basic scientific research

```javascript
import OpenAI from "openai";

const openai = new OpenAI();

const prompt = `
What are three compounds we should consider investigating to
advance research into new antibiotics? Why should we consider
them?
`;

const response = await openai.responses.create({
  model: "gpt-6-astra",
  input: [
    {
      role: "user",
      content: prompt,
    },
  ],
});

console.log(response.output_text);
```

```python
from openai import OpenAI

client = OpenAI()

prompt = """
What are three compounds we should consider investigating to
advance research into new antibiotics? Why should we consider
them?
"""

response = client.responses.create(
    model="gpt-6-astra", input=[{"role": "user", "content": prompt}]
)

print(response.output_text)
```

```go
package main

import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

func main() {
	client := openai.NewClient()
	prompt := `What are three compounds we should consider investigating to advance
research into new antibiotics? Why should we consider them?`

	response, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model: "gpt-6-astra",
		Input: responses.ResponseNewParamsInputUnion{
			OfString: openai.String(prompt),
		},
	})
	if err != nil {
		panic(err)
	}

	fmt.Println(response.OutputText())
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.responses.ResponseCreateParams;

String prompt =
    """
    What are three compounds we should consider investigating to advance research
    into new antibiotics? Why should we consider them?
    """
        .strip();

ResponseCreateParams params =
    ResponseCreateParams.builder().model("gpt-6-astra").input(prompt).build();

client.responses().create(params).output().stream()
    .flatMap(item -> item.message().stream())
    .flatMap(message -> message.content().stream())
    .flatMap(content -> content.outputText().stream())
    .forEach(text -> System.out.println(text.text()));
```

```csharp
using OpenAI.Responses;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
ResponsesClient client = new(key);

string prompt =
    """
    What are three compounds we should investigate to advance research into
    new antibiotics? Why should we consider them?
    """;
ResponseResult response = await client.CreateResponseAsync(
    "gpt-6-astra",
    [ResponseItem.CreateUserMessageItem(prompt)]
);
Console.WriteLine(response.GetOutputText());
```

```ruby
require "openai"

client = OpenAI::Client.new
prompt = <<~PROMPT
  What are three compounds we should consider investigating to advance research
  into new antibiotics? Why should we consider them?
PROMPT

response = client.responses.create(
  model: "gpt-6-astra",
  input: prompt
)

puts(response.output_text)
```
