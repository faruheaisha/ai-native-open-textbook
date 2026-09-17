---
title: "Skills"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/tools-skills.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/tools-skills.md"
sourceSha256: "7c216dd89141d6ded234b222576fb8d7f47c0e5238705cffb5667ee6c870e10d"
pageSha256: "7c216dd89141d6ded234b222576fb8d7f47c0e5238705cffb5667ee6c870e10d"
contentMode: "local-full"
zh: ""
---

# Skills

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Agent Skills give an agent reusable instructions and supporting files for a task. Use them with Responses API shell tools or make them available in an [Agents API sandbox](#agents-api).

The upload, attachment, and versioning instructions below describe Responses API shell tools. Agents API sessions discover skills from directories in their sandbox.

The Responses API supports Skills in two form factors: local execution and
  hosted, container-based execution. To run code on your own machine, use the
  local execution mode of the [shell tool](https://developers.openai.com/api/docs/guides/tools-shell).

## What's a skill

A skill is a directory of files with a `SKILL.md` manifest (front matter + instructions). Skills are modular instructions you can use to codify processes and conventions, from company style guides to multi-step workflows. Uploaded skills use versioned bundles.

Skills are compatible with the open [Agent Skills standard](https://agentskills.io/home).

Example SKILL.md

```markdown
---
name: basic-math
description: Add or multiply numbers.
---

Use this skill when you need a quick sum or product of numbers.
```

During skill discovery, the model sees the skill's name and description. Write a description that explains both what the skill does and when to use it. For example, "Review and redline vendor agreements using the fallback clauses" gives the model more useful context than "Helps with legal work."

Keep the main instructions in `SKILL.md` and link to supporting files as needed:

```text
review-pr/
├── SKILL.md
├── references/
│   └── review-guidelines.md
├── scripts/
│   └── check-changes.sh
└── assets/
    └── review-template.md
```

Use `references/` for background material, `scripts/` for repeatable actions, and `assets/` for reusable templates.

## Create a skill

You can upload a directory as multipart form data or upload a `.zip` that contains a single top-level folder.

### Option 1: Directory upload (multipart)

Upload multiple `files[]` parts. Each part includes the path inside a single top-level folder.

Create a skill (multipart)

```bash
curl -X POST 'https://api.openai.com/v1/skills' \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F 'files[]=@./basic_math/SKILL.md;filename=basic_math/SKILL.md;type=text/markdown' \
  -F 'files[]=@./basic_math/calculate.py;filename=basic_math/calculate.py;type=text/plain'
```

### Option 2: Zip upload

Zip the top-level folder and upload the zip file.

Create a skill (zip)

```bash
curl -X POST 'https://api.openai.com/v1/skills' \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F 'files=@./basic_math.zip;type=application/zip'
```

## Use skills with hosted shell

To mount skills in a hosted shell environment, attach them via `tools[].environment.skills` when calling the shell tool.

Use skills in hosted shell

```bash
curl -L 'https://api.openai.com/v1/responses' \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-6-astra",
    "tools": [
      {
        "type": "shell",
        "environment": {
          "type": "container_auto",
          "skills": [
            { "type": "skill_reference", "skill_id": "<skill_id>" },
            { "type": "skill_reference", "skill_id": "<skill_id>", "version": 2 }
          ]
        }
      }
    ],
    "input": "Use the skills to add 144 and 377, then compute triangle area with base 9 height 13."
  }'
```

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-6-astra",
  tools: [
    {
      type: "shell",
      environment: {
        type: "container_auto",
        skills: [
          { type: "skill_reference", skill_id: "<skill_id>" },
          { type: "skill_reference", skill_id: "<skill_id>", version: "2" },
        ],
      },
    },
  ],
  input:
    "Use the skills to add 144 and 377, then compute triangle area with base 9 height 13.",
});

console.log(response.output_text);
```

```python
response = client.responses.create(
    model="gpt-6-astra",
    tools=[
        {
            "type": "shell",
            "environment": {
                "type": "container_auto",
                "skills": [
                    {"type": "skill_reference", "skill_id": "<skill_id>"},
                    {
                        "type": "skill_reference",
                        "skill_id": "<skill_id>",
                        "version": 2,
                    },
                ],
            },
        }
    ],
    input="Use the skills to add 144 and 377, then compute triangle area with base 9 height 13.",
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
	tool := responses.ToolUnionParam{OfShell: &responses.FunctionShellToolParam{
		Environment: responses.FunctionShellToolEnvironmentUnionParam{OfContainerAuto: &responses.ContainerAutoParam{
			Skills: []responses.ContainerAutoSkillUnionParam{
				{OfSkillReference: &responses.SkillReferenceParam{SkillID: "<skill_id>"}},
				{OfSkillReference: &responses.SkillReferenceParam{SkillID: "<skill_id>", Version: openai.String("2")}},
			},
		}},
	}}
	response, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model: "gpt-6-astra",
		Tools: []responses.ToolUnionParam{tool},
		Input: responses.ResponseNewParamsInputUnion{OfString: openai.String("Use the skills to add 144 and 377, then compute triangle area with base 9 height 13.")},
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
import com.openai.core.JsonValue;
import com.openai.models.responses.ResponseCreateParams;
import java.util.List;
import java.util.Map;

String skillId = "<skill_id>";

ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-6-astra")
        .input(
            "Use the skills to add 144 and 377, then compute a triangle area with base 9 and height 13.")
        .putAdditionalBodyProperty(
            "tools",
            JsonValue.from(
                List.of(
                    Map.of(
                        "type",
                        "shell",
                        "environment",
                        Map.of(
                            "type",
                            "container_auto",
                            "skills",
                            List.of(
                                Map.of("type", "skill_reference", "skill_id", skillId),
                                Map.of(
                                    "type", "skill_reference",
                                    "skill_id", skillId,
                                    "version", "2")))))))
        .build();

client.responses().create(params).output().stream()
    .flatMap(item -> item.message().stream())
    .flatMap(message -> message.content().stream())
    .flatMap(content -> content.outputText().stream())
    .forEach(text -> System.out.println(text.text()));
```

```ruby
require "openai"

client = OpenAI::Client.new
response = client.responses.create(
  model: "gpt-6-astra",
  input: "Use the skills to add 144 and 377, then compute a triangle area with base 9 and height 13.",
  tools: [{
    type: :shell,
    environment: {
      type: :container_auto,
      skills: [
        {type: :skill_reference, skill_id: "<skill_id>"},
        {type: :skill_reference, skill_id: "<skill_id>", version: "2"}
      ]
    }
  }]
)

puts(response.output_text)
```

### Prompting behavior

Once a skill is mounted, the model can decide when to use it. If you want more deterministic behavior, explicitly instruct the model to "use the `<skill name>` skill" when appropriate.

## Use skills with local shell mode

Skills also work with local shell mode, but local shell and hosted shell do not accept the same skill attachment formats.

- Hosted shell supports uploaded `skill_reference` attachments, including curated skills and explicit versions.
- Local shell does not support `skill_reference` attachments. Instead, provide skill files from local file paths in the runtime you control.

Use the [Shell guide](https://developers.openai.com/api/docs/guides/tools-shell) for local shell execution details.

Use skills in local shell mode

```bash
curl -L 'https://api.openai.com/v1/responses' \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-6-astra",
    "tools": [
      {
        "type": "shell",
        "environment": {
          "type": "local",
          "skills": [
            {
              "name": "csv-insights",
              "description": "Summarize CSV files and produce a markdown report.",
